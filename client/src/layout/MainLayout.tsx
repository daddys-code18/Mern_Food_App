import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen m-2 md:m-0">
        <header>
          <Header />
        </header>
        <div className="felx-1">
          <Outlet />
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default MainLayout;
