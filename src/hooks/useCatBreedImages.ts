import useQuery from "swr";

import { getCatBreedImagesAction } from "@/app/actions";
import { CatBreed } from "@/models/cats";

export const useCatBreedImages = (catBreedId: CatBreed["id"]) => {
  const { isLoading, data } = useQuery(
    `${catBreedId}-images`,
    () => getCatBreedImagesAction(catBreedId),
    {
      throwOnError: false,
      revalidateOnFocus: false,
    },
  );

  return { isLoading, images: data ?? [] };
};
