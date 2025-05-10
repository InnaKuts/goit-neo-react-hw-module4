import { ImagesDataSource } from "./ImagesDataSource";
import mockData from "../../data/mock_response.json";
import mockDataPage2 from "../../data/mock_response_page_2.json";

export class ImagesMockDataSource extends ImagesDataSource {
  constructor(delay = 500, mockPages = [mockData, mockDataPage2]) {
    super();
    this.delay = delay;
    this.mockPages = mockPages;
  }

  async getImages(query, page = 1) {
    await new Promise((resolve) => setTimeout(resolve, this.delay));

    if (page > this.mockPages.length) {
      throw new Error(`Page ${page} not found`);
    }

    return this.mockPages[page - 1].results;
  }
}
