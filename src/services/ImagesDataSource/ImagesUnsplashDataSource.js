import { ImagesDataSource } from "./ImagesDataSource";

export class ImagesUnsplashDataSource extends ImagesDataSource {
  constructor(apiKey) {
    super();
    this.apiKey = apiKey;
    this.baseUrl = "https://api.unsplash.com";
  }

  async getImages(query, page = 1) {
    const response = await fetch(
      `${this.baseUrl}/search/photos?query=${query}&page=${page}`,
      {
        headers: {
          Authorization: `Client-ID ${this.apiKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch images from Unsplash");
    }

    const data = await response.json();
    return data;
  }
}
