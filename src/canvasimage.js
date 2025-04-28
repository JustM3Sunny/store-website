const BASE_URL = "https://thirtysixstudio.com/peppers";

/**
 * Generates an array of image URLs for a given pepper type and count.
 *
 * @param {string} pepperType - The type of pepper.
 * @param {number} count - The number of images to generate.
 * @returns {string[]} An array of image URLs.
 */
function generateImageUrls(pepperType, count) {
  const imageUrls = Array.from({ length: count }, (_, i) => `${BASE_URL}/${pepperType}/${i}.png`);
  return imageUrls;
}

const pepperTypes = ["pepperA", "pepperB", "pepperC", "pepperD", "pepperE", "pepperF", "pepperG"];
const imageUrls = pepperTypes.flatMap(pepperType => generateImageUrls(pepperType, 150));

export default imageUrls;