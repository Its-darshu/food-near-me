import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopDetailPage from "./pages/ShopDetailPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shops/:id" element={<ShopDetailPage />} />
    </Routes>
  );
};

export default App;
