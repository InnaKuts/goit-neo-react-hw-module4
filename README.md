# Image Search App

A React application for searching and viewing images.

## Data Sources

The app supports two data sources for images:

### 1. Unsplash API (Production)

To use the Unsplash API:

1. Create a `.env` file in the root directory
2. Add your Unsplash API key:

```
VITE_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

3. Use the Unsplash data source in `App.jsx`:

```jsx
import { ImagesUnsplashDataSource } from "./services/ImagesDataSource/ImagesUnsplashDataSource";

const imagesDataSource = new ImagesUnsplashDataSource(
  import.meta.env.VITE_UNSPLASH_ACCESS_KEY
);
```

### 2. Mock Data (Development)

To use mock data for development:

1. Import the mock data source in `App.jsx`:

```jsx
import { ImagesMockDataSource } from "./services/ImagesDataSource/ImagesMockDataSource";

const imagesDataSource = new ImagesMockDataSource();
```

2. To simulate errors during development, you can use `toggleMockError`:

```jsx
// In your error handling block
try {
  // ... your code
} catch (error) {
  // ... error handling
} finally {
  imagesDataSource.toggleMockError(); // Toggle error state for next request
}
```

This will alternate between successful responses and errors for testing error handling.

## Features

- Image search with pagination
- Modal view for full-size images
- Error handling with toast notifications
- Responsive design
- Loading states
- Development error simulation
