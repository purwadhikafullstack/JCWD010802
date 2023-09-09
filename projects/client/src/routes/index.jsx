import { Route, createRoutesFromElements } from "react-router-dom";
import { Homepage } from "../pages/Home";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import { HomepageView } from "../views/Home";
import { Admin } from "../pages/Admin";
import { WarehouseAdmin } from "../views/Admin/Warehouse Admin";
import { UserCard } from "../views/Admin/components/User/userCard";
import { ForgotPass } from "../pages/ForgotPass";
import { ResetPass } from "../pages/ResetPass";
import { Onboarding } from "../pages/Onboarding";
import { Verified } from "../pages/Verified";
import { ProfileView } from "../views/Profile";
import { Product } from "../pages/Product";
import { AllProduct } from "../views/Product/components/AllProduct";
import { DetailProduct } from "../pages/ProductDetail";

const Routes = (
  <>
    <Route path="/" element={<Homepage />}>
      <Route path="" element={<HomepageView />} />
      <Route path="profile" element={<ProfileView />} />
      <Route path="/" element={<Product />}>
        <Route path="product" element={<AllProduct />} />
      </Route>
      <Route path="/product/:id" element={<DetailProduct />} />
    </Route>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/verified/:token" element={<Verified />} />
    <Route path="/onboard" element={<Onboarding />} />
    <Route path="/forgot-password" element={<ForgotPass />} />
    <Route path="/reset-password/:token" element={<ResetPass />} />

    <Route path="/admin" element={<Admin />}>
      <Route path="list-user" element={<UserCard />} />
      <Route path="list-admin" element={<WarehouseAdmin />} />
    </Route>
  </>
);

export const routes = createRoutesFromElements(Routes);
