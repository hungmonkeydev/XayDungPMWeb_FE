import { RouterProvider } from "react-router-dom";
import router from "./router";
import Footer from "./components/layout/Footer.jsx";
import Header from "./components/layout/Header.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";

function App() {
  return (
    <div>
      <Header />
      <RouterProvider router={router} />
    </div>
  );

export default App;
