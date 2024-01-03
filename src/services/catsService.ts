import axios from "axios";

import { catsApi } from "@/api/catsApi";
import { CatBreed, CatBreedImagesMap, CatBreedWithImage } from "@/models/cats";

import { cacheCatImage, cacheCatImages } from "./cacheCatImages";
import {
  CatBreedsPageData,
  loadCatBreedsPageDataManifest,
  saveCatBreedsPageDataManifest,
} from "./catBreedsManifest";

const API_REQUEST_DELAY_MS = 500;
const MAX_RETRIES = 6;

const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const withRetry = async <T>(request: () => Promise<T>) => {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      return await request();
    } catch (error) {
      const isRateLimited =
        axios.isAxiosError(error) && error.response?.status === 429;

      if (!isRateLimited || attempt === MAX_RETRIES) {
        throw error;
      }

      await wait((attempt + 1) * 2000);
    }
  }

  throw new Error("Retry limit exceeded");
};

export const getCatBreedsServerRequest = async () => {
  const response = await withRetry(() =>
    catsApi.get<CatBreed[]>("/v1/breeds", {
      params: {
        limit: 100,
        order: "ASC",
        page: 0,
      },
    }),
  );

  return response.data;
};

export const getCatBreedImagesServerRequest = async (
  catBreedId: CatBreed["id"],
) => {
  const response = await withRetry(() =>
    catsApi.get<CatBreedWithImage["image"][]>("/v1/images/search", {
      params: {
        limit: 10,
        // eslint-disable-next-line camelcase
        breed_ids: catBreedId,
      },
    }),
  );

  return response.data;
};

export const buildCatBreedsCache = async () => {
  const existing = await loadCatBreedsPageDataManifest();
  const breedImages: CatBreedImagesMap = { ...(existing?.breedImages ?? {}) };

  const breeds = await getCatBreedsServerRequest();

  const cachedBreeds = await Promise.all(
    breeds.map(async (breed) => {
      if (!breed.image) {
        return breed;
      }

      const existingBreed = existing?.breeds.find(
        (cachedBreed) => cachedBreed.id === breed.id,
      );

      if (existingBreed?.image?.url.startsWith("/cached-cats/")) {
        return {
          ...breed,
          image: existingBreed.image,
        };
      }

      return {
        ...breed,
        image: await cacheCatImage(breed.image),
      };
    }),
  );

  const breedsWithImages = breeds.filter(
    (breed): breed is CatBreedWithImage => !!breed.image,
  );

  for (const breed of breedsWithImages) {
    if (breedImages[breed.id]?.length) {
      continue;
    }

    const images = await getCatBreedImagesServerRequest(breed.id);

    breedImages[breed.id] = await cacheCatImages(images);

    const pageData: CatBreedsPageData = {
      breeds: cachedBreeds,
      breedImages,
    };

    await saveCatBreedsPageDataManifest(pageData);
    await wait(API_REQUEST_DELAY_MS);
  }

  return {
    breeds: cachedBreeds,
    breedImages,
  };
};

export const getCatBreedsPageData = async () => {
  const manifest = await loadCatBreedsPageDataManifest();

  if (!manifest) {
    throw new Error('Cat breeds cache missing. Run "yarn cache-cats" first.');
  }

  return manifest;
};
