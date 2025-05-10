import { ImagesDataSource } from "./ImagesDataSource";
import mockData from "../../data/mock_response.json";
import mockDataPage2 from "../../data/mock_response_page_2.json";
import { AxiosError } from "axios";

export class ImagesMockDataSource extends ImagesDataSource {
  constructor(
    delay = 500,
    mockPages = [mockData, mockDataPage2],
    error = null
  ) {
    super();
    this.delay = delay;
    this.mockPages = mockPages;
    this.mockError = error;
  }

  setMockError(error) {
    this.mockError = error;
  }

  toggleMockError(
    error = new AxiosError(
      "Sorry, there was an error loading images. Please try again later."
    )
  ) {
    this.mockError = this.mockError ? null : error;
  }

  async getImages(query, page = 1) {
    await new Promise((resolve) => setTimeout(resolve, this.delay));

    if (this.mockError) {
      throw this.mockError;
    }

    if (page > this.mockPages.length) {
      throw new Error(`Page ${page} not found`);
    }

    return this.mockPages[page - 1].results;
  }
}
