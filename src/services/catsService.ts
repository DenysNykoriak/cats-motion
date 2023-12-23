import { catsApi } from "@/api/catsApi";
import { CatBreed } from "@/models/cats";

export const getCatBreedsRequest = async () => {
  const response = await catsApi.get<CatBreed[]>("/v1/breeds", {
    params: {
      limit: 100,
      order: "ASC",
      page: 0,
    },
  });

  return response.data;
};
