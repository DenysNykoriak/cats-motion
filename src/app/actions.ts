"use server";

import { CatBreed } from "@/models/cats";
import { getCatBreedImagesServerRequest } from "@/services/catsService";

export const getCatBreedImagesAction = (catBreedId: CatBreed["id"]) =>
  getCatBreedImagesServerRequest(catBreedId);
