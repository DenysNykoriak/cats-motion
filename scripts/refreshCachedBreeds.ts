import fs from "fs/promises";
import path from "path";

const loadEnvLocal = () => {
  const envPath = path.join(process.cwd(), ".env.local");

  const readSync = require("fs").readFileSync;

  let content: string;

  try {
    content = readSync(envPath, "utf8");
  } catch {
    return;
  }

  for (const line of content.split("\n")) {
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

const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|gif|bmp|tiff|webp)$/i;
const NON_WEBP_EXTENSIONS = /\.(jpg|jpeg|png|gif|bmp|tiff)$/i;
const MAX_DIMENSION = 900;
const WEBP_QUALITY = 80;

const optimizeCachedImages = async (cacheDir: string) => {
  const sharp = (await import("sharp")).default;

  const files = await fs.readdir(cacheDir);
  const imageFiles = files.filter(
    (f) => NON_WEBP_EXTENSIONS.test(f) && f !== "manifest.json",
  );

  if (!imageFiles.length) {
    console.log("All images already optimized.");

    return;
  }

  console.log(`Optimizing ${imageFiles.length} images to WebP...`);

  for (const file of imageFiles) {
    const inputPath = path.join(cacheDir, file);
    const baseName = file.replace(IMAGE_EXTENSIONS, "");
    const outputPath = path.join(cacheDir, `${baseName}.webp`);

    await sharp(inputPath)
      .resize(MAX_DIMENSION, MAX_DIMENSION, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outputPath);

    await fs.unlink(inputPath);
  }

  console.log(`Optimized ${imageFiles.length} images.`);

  const manifestPath = path.join(cacheDir, "manifest.json");
  const raw = await fs.readFile(manifestPath, "utf-8");
  const updated = raw.replace(
    /\/cached-cats\/([^"]+)\.(jpg|jpeg|png|gif|bmp|tiff)/gi,
    "/cached-cats/$1.webp",
  );

  await fs.writeFile(manifestPath, updated);

  console.log("Manifest updated with WebP paths.");
};

const main = async () => {
  loadEnvLocal();

  const { buildCatBreedsCache } = await import("../src/services/catsService");
  const { loadCatBreedsPageDataManifest, CAT_IMAGES_CACHE_DIR } = await import(
    "../src/services/catBreedsManifest"
  );

  const shouldRefresh = process.env.FORCE_CAT_API_REFRESH === "true";

  if (!shouldRefresh) {
    const manifest = await loadCatBreedsPageDataManifest();

    if (manifest) {
      console.log("Cat breeds cache found, skipping fetch.");
      await optimizeCachedImages(CAT_IMAGES_CACHE_DIR);

      return;
    }
  }

  console.log("Building cat breeds cache...");
  await buildCatBreedsCache();
  console.log("Cat breeds cache ready.");

  await optimizeCachedImages(CAT_IMAGES_CACHE_DIR);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
