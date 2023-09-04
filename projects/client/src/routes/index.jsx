import { Route, createRoutesFromElements } from "react-router-dom";

import { Homepage } from "../pages/Home";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import { HomepageView } from "../views/Home";
import { Admin } from "../pages/Admin";
import { WarehouseAdmin } from "../views/Admin/Warehouse Admin/warehouseAdmin";
import { UserCard } from "../views/Admin/components/User/userCard";

const Routes = (
    <>
 <Route path="/" element={<Homepage />}>
 <Route path="" element={<HomepageView />} />
 </Route>
 <Route path="/login" element={<Login />} />
 <Route path="/register" element={<Register />} /><Route path="/admin" element={<Admin/>}>
<Route path="list-user" element={<UserCard/>}/>
<Route path="list-admin" element={<WarehouseAdmin/>}/>
</Route>
{/* <Route path="/forgot-password" element={<ForgotPass/>}/> */}
{/* <Route path="/reset-password/:token" element={<ResetPass/>}/> */}
    </>
) 




export const routes = createRoutesFromElements(Routes);
