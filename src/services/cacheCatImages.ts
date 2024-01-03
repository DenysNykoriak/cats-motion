import fs from "fs/promises";
import path from "path";

import { CatBreedWithImage } from "@/models/cats";

import { CAT_IMAGES_CACHE_DIR } from "./catBreedsManifest";

const getImageExtension = (url: string) => {
  const extension = url.split(".").pop()?.split("?")[0];

  return extension && extension.length <= 4 ? extension : "jpg";
};

export const cacheCatImage = async (
  image: CatBreedWithImage["image"],
): Promise<CatBreedWithImage["image"]> => {
  await fs.mkdir(CAT_IMAGES_CACHE_DIR, { recursive: true });

  const extension = getImageExtension(image.url);
  const fileName = `${image.id}.${extension}`;
  const localUrl = `/cached-cats/${fileName}`;
  const filePath = path.join(CAT_IMAGES_CACHE_DIR, fileName);

  try {
    await fs.access(filePath);
  } catch {
    const response = await fetch(image.url);

    if (!response.ok) {
      return image;
    }

    const buffer = new Uint8Array(await response.arrayBuffer());

    await fs.writeFile(filePath, buffer);
  }

  return {
    ...image,
    url: localUrl,
  };
};

export const cacheCatImages = (images: CatBreedWithImage["image"][]) =>
  Promise.all(images.map(cacheCatImage));
