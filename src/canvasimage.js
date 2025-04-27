const BASE_URL = "https://thirtysixstudio.com/peppers"; // Optimized BASE_URL

/**
 * Generates an array of image URLs for a given pepper type and count.
 *
 * @param {string} baseUrl - The base URL for the images.
 * @param {string} pepperType - The type of pepper.
 * @param {number} count - The number of images to generate.
 * @returns {string[]} An array of image URLs.
 */
function generateImageUrls(baseUrl, pepperType, count) {
  const imageUrls = [];
  for (let i = 0; i < count; i++) {
    imageUrls.push(`${baseUrl}/${pepperType}/${i}.png`);
  }
  return imageUrls;
}

const pepperTypes = ["pepperA", "pepperB", "pepperC", "pepperD", "pepperE", "pepperF", "pepperG"];
const imageUrls = pepperTypes.flatMap(pepperType => generateImageUrls(BASE_URL, pepperType, 150));

export default imageUrls;