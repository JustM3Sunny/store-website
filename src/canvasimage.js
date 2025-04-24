function generateImageUrls(baseUrl, pepperType, count) {
  const imageUrls = [];
  for (let i = 0; i < count; i++) {
    imageUrls.push(`${baseUrl}/peppers/${pepperType}/${i}.png`);
  }
  return imageUrls;
}

const baseUrl = "https://thirtysixstudio.com";

export default [
  ...generateImageUrls(baseUrl, "pepperA", 150),
  ...generateImageUrls(baseUrl, "pepperB", 150),
  ...generateImageUrls(baseUrl, "pepperC", 150),
  ...generateImageUrls(baseUrl, "pepperD", 150),
  ...generateImageUrls(baseUrl, "pepperE", 150),
  ...generateImageUrls(baseUrl, "pepperF", 150),
  ...generateImageUrls(baseUrl, "pepperG", 150),
];