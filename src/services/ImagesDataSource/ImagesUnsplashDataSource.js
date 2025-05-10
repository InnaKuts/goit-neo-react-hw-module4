import axios from "axios";

const BASE_URL = "https://api.unsplash.com";

export class ImagesUnsplashDataSource {
  constructor(accessKey, baseUrl = BASE_URL) {
    this.accessKey = accessKey;
    this.api = axios.create({
      baseURL: baseUrl,
      headers: {
        Authorization: `Client-ID ${this.accessKey}`,
      },
    });
  }

  async getImages(query, page = 1) {
    const response = await this.api.get("/search/photos", {
      params: {
        query,
        page,
        per_page: 12,
      },
    });

    return response.data.results.map((image) => ({
      id: image.id,
      url: image.urls.regular,
      alt: image.alt_description || "Unsplash image",
      likes: image.likes,
      author: image.user.name,
    }));
  }
}
