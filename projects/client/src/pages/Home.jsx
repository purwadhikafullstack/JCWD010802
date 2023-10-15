import { Outlet } from "react-router-dom";
import { Footer } from "../components/navigation/Footer";
import { MobileNav } from "../components/navigation/MobileNav";
import { Navbar } from "../components/navigation/Navbar";

export const Homepage = () => {
  return (
    <>
      <Navbar/>
      <Outlet />
      <Footer />
      <MobileNav />
    </>
  );
};
