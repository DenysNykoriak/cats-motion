import { catsApi } from "@/api/catsApi";
import { CatBreed, CatBreedWithImage } from "@/models/cats";

export const getCatBreedsServerRequest = async () => {
  const response = await catsApi.get<CatBreed[]>("/v1/breeds", {
    params: {
      limit: 100,
      order: "ASC",
      page: 0,
    },
  });

  return response.data;
};

export const getCatBreedImagesServerRequest = async (
  catBreedId: CatBreed["id"],
) => {
  const response = await catsApi.get<CatBreedWithImage["image"][]>(
    "/v1/images/search",
    {
      params: {
        limit: 10,
        // eslint-disable-next-line camelcase
        breed_ids: catBreedId,
      },
    },
  );

  return response.data;
};
