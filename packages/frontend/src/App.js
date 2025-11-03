import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopDetailPage from "./pages/ShopDetailPage";
const App = () => {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/shops/:id", element: _jsx(ShopDetailPage, {}) })] }));
};
export default App;
