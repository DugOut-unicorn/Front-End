import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex-col ">
        <Outlet />
      </main>
      {isHome && <Footer />}
    </div>
  );
};
export default Layout;
