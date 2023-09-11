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
import { WarehousePageView } from "../views/Admin/Warehouse";
import { Verified } from "../pages/Verified";
import { ProfileView } from "../views/Profile";
import { AdminProducts } from "../views/Admin/Products";

const Routes = (
    <>
 <Route path="/" element={<Homepage />}>
 <Route path="" element={<HomepageView />} />
 <Route path="profile" element={<ProfileView />} />

 </Route>
 <Route path="/login" element={<Login />} />
 <Route path="/register" element={<Register />} />
 <Route path="/verified/:token" element={<Verified />} />
 <Route path="/onboard" element={<Onboarding />} />
 <Route path="/forgot-password" element={<ForgotPass/>}/>
 <Route path="/reset-password/:token" element={<ResetPass/>}/>
   
<Route path="/admin" element={<Admin/>}>
<Route path="list-user" element={<UserCard/>}/>
<Route path="list-admin" element={<WarehouseAdmin/>}/>
<Route path="warehouse" element={<WarehousePageView/>}/>
<Route path="product-list" element={<AdminProducts />}/>
</Route>
    </>
) 




export const routes = createRoutesFromElements(Routes);
