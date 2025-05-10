import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import testData from "./data/test_response.json";

function App() {
  return (
    <div className="app">
      <SearchBar />
      <main className="main">
        <ImageGallery images={testData} />
      </main>
    </div>
  );
}

export default App;
