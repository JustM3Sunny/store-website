const BASE_URL = "https://thirtysixstudio.com";

function generateImageUrls(baseUrl, pepperType, count) {
  const imageUrls = Array.from({ length: count }, (_, i) => `${baseUrl}/peppers/${pepperType}/${i}.png`);
  return imageUrls;
}

const pepperTypes = ["pepperA", "pepperB", "pepperC", "pepperD", "pepperE", "pepperF", "pepperG"];
const imageUrls = pepperTypes.flatMap(pepperType => generateImageUrls(BASE_URL, pepperType, 150));

export default imageUrls;