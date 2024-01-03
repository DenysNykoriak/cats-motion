import { getCatBreedsPageData } from "@/services/catsService";

import HomeView from "./home/HomeView";

const HomePage = async () => {
  const { breeds, breedImages } = await getCatBreedsPageData();

  return <HomeView breeds={breeds} breedImages={breedImages} />;
};

export default HomePage;
