import { getCatBreedsRequest } from "@/services/catsService";

import HomeView from "./home/HomeView";

const HomePage = async () => {
  const breeds = await getCatBreedsRequest();

  return <HomeView breeds={breeds} />;
};

export default HomePage;
