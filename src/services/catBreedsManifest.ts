import fs from "fs/promises";
import path from "path";

import { CatBreed, CatBreedImagesMap } from "@/models/cats";

export const CAT_IMAGES_CACHE_DIR = path.join(
  process.cwd(),
  "public",
  "cached-cats",
);

export const CAT_IMAGES_MANIFEST_PATH = path.join(
  CAT_IMAGES_CACHE_DIR,
  "manifest.json",
);

export type CatBreedsPageData = {
  breeds: CatBreed[];
  breedImages: CatBreedImagesMap;
};

export const loadCatBreedsPageDataManifest =
  async (): Promise<CatBreedsPageData | null> => {
    try {
      const raw = await fs.readFile(CAT_IMAGES_MANIFEST_PATH, "utf-8");

      return JSON.parse(raw) as CatBreedsPageData;
    } catch {
      return null;
    }
  };

export const saveCatBreedsPageDataManifest = async (
  data: CatBreedsPageData,
) => {
  await fs.mkdir(CAT_IMAGES_CACHE_DIR, { recursive: true });
  await fs.writeFile(CAT_IMAGES_MANIFEST_PATH, JSON.stringify(data));
};
