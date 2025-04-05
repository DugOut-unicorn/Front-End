// import Header from "./Header";
// import Footer from "./Footer";

// type LayoutProps = {
//   children: React.ReactNode;
// };

// export default function Layout({ children }: LayoutProps) {
//   return (
//     <div className="flex min-h-screen flex-col">
//       <Header />
//       <main className="flex-1">{children}</main>
//       <Footer />
//     </div>
//   );
// }


import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => { 
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
export default Layout;

