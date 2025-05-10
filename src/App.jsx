import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <SearchBar />
    </div>
  );
}

export default App;
