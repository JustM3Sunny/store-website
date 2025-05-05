const BASE_URL = "https://thirtysixstudio.com/peppers";

/**
 * Generates an array of image URLs for a given pepper type and count.
 *
 * @param {string} pepperType - The type of pepper.
 * @param {number} count - The number of images to generate.
 * @returns {string[]} An array of image URLs.
 * @throws {TypeError} If pepperType is not a string.
 * @throws {TypeError} If count is not a positive integer.
 */
function generateImageUrls(pepperType, count) {
  if (typeof pepperType !== 'string') {
    throw new TypeError("pepperType must be a string.");
  }

  if (!Number.isInteger(count) || count <= 0) {
    throw new TypeError("count must be a positive integer.");
  }

  const imageUrls = new Array(count);
  for (let i = 0; i < count; i++) {
    imageUrls[i] = `${BASE_URL}/${pepperType}/${i}.png`;
  }
  return imageUrls;
}

const pepperTypes = ["pepperA", "pepperB", "pepperC", "pepperD", "pepperE", "pepperF", "pepperG"];
const imageCounts = 150;

let imageUrls = [];
try {
  imageUrls = pepperTypes.flatMap(pepperType => generateImageUrls(pepperType, imageCounts));
} catch (error) {
  console.error("Error generating image URLs:", error);
  imageUrls = []; // Or handle the error as appropriate for your application
}

export default imageUrls;