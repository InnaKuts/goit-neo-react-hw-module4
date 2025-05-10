import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import mockData from "./data/mock_response.json";

function App() {
  return (
    <div className="app">
      <SearchBar />
      <main className="main">
        <ImageGallery images={mockData.results} />
      </main>
    </div>
  );
}

export default App;
