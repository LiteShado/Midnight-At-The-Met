import "./App.css";
import SearchInfo from "./components/SearchInfo.js";

function App() {
  return (
    <div className="App">
      <div className="title">Welcome to The Met</div>
      <div className="underTitle">
        What would you like to learn about today?
      </div>
   
      <SearchInfo />

    </div>
  );
}

export default App;
