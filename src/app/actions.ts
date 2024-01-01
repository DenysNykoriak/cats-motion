"use server";

import { CatBreed, CatBreedWithImage } from "@/models/cats";
import { getCatBreedImagesServerRequest } from "@/services/catsService";

export const getCatBreedImagesAction = async (
  catBreedId: CatBreed["id"],
): Promise<CatBreedWithImage["image"][]> => {
  try {
    return getCatBreedImagesServerRequest(catBreedId);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);

    return [];
  }
};
