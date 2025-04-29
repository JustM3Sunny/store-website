const BASE_URL = "https://thirtysixstudio.com/peppers";

/**
 * Generates an array of image URLs for a given pepper type and count.
 *
 * @param {string} pepperType - The type of pepper.
 * @param {number} count - The number of images to generate.
 * @returns {string[]} An array of image URLs.
 */
function generateImageUrls(pepperType, count) {
  const imageUrls = [];
  for (let i = 0; i < count; i++) {
    imageUrls.push(`${BASE_URL}/${pepperType}/${i}.png`);
  }
  return imageUrls;
}

const pepperTypes = ["pepperA", "pepperB", "pepperC", "pepperD", "pepperE", "pepperF", "pepperG"];
const imageCounts = 150; // Moved the count to a named constant
const imageUrls = pepperTypes.flatMap(pepperType => generateImageUrls(pepperType, imageCounts));

export default imageUrls;