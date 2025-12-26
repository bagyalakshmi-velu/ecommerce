import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Admin from "./Pages/Admin/Admin";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Redirect root */}
        <Route path="/" element={<Navigate to="/admin/listproduct" />} />

        {/* Admin routes */}
        <Route path="/admin/*" element={<Admin />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
