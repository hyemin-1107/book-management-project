import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Main from "./pages/main/Main";
import AddBookPage from "./pages/addBookPage/AddBookPage";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/add-book" element={<AddBookPage />} />
        </Routes>
      </Router>
    </RecoilRoot>
    
  )
};

export default App;
