import fs from "fs";
import path from "path";

const loadEnvLocal = () => {
  const envPath = path.join(process.cwd(), ".env.local");

  if (!fs.existsSync(envPath)) {
    return;
  }

  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const value = trimmedLine.slice(separatorIndex + 1).trim();

    process.env[key] = value;
  }
};

const main = async () => {
  loadEnvLocal();

  const { buildCatBreedsCache } = await import("../src/services/catsService");
  const { loadCatBreedsPageDataManifest } = await import(
    "../src/services/catBreedsManifest"
  );

  const shouldRefresh = process.env.FORCE_CAT_API_REFRESH === "true";

  if (!shouldRefresh) {
    const manifest = await loadCatBreedsPageDataManifest();

    if (manifest) {
      console.log("Cat breeds cache found, skipping fetch.");
      return;
    }
  }

  console.log("Building cat breeds cache...");
  await buildCatBreedsCache();
  console.log("Cat breeds cache ready.");
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
