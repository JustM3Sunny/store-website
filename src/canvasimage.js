const BASE_URL = "https://thirtysixstudio.com/peppers";

/**
 * Generates an array of image URLs for a given pepper type and count.
 *
 * @param {string} pepperType - The type of pepper.
 * @param {number} count - The number of images to generate.
 * @returns {string[]} An array of image URLs.
 */
function generateImageUrls(pepperType, count) {
  if (!pepperType || typeof pepperType !== 'string') {
    console.error("Invalid pepperType:", pepperType);
    return []; // Or throw an error, depending on desired behavior
  }

  if (!Number.isInteger(count) || count <= 0) {
    console.error("Invalid count:", count);
    return []; // Or throw an error, depending on desired behavior
  }

  return Array.from({ length: count }, (_, i) => `${BASE_URL}/${pepperType}/${i}.png`);
}

const pepperTypes = ["pepperA", "pepperB", "pepperC", "pepperD", "pepperE", "pepperF", "pepperG"];
const imageCounts = 150;
const imageUrls = pepperTypes.flatMap(pepperType => generateImageUrls(pepperType, imageCounts));

export default imageUrls;