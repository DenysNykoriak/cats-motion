import { getCatBreedsServerRequest } from "@/services/catsService";

import HomeView from "./home/HomeView";

const HomePage = async () => {
  const breeds = await getCatBreedsServerRequest();

  return <HomeView breeds={breeds} />;
};

export default HomePage;
