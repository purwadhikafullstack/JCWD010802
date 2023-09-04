import { Route, createRoutesFromElements } from "react-router-dom";

import Homepage from "../pages/Home";
import { Admin } from "../pages/Admin";
import { WarehouseAdmin } from "../views/Admin/Warehouse Admin/warehouseAdmin";
import { UserCard } from "../views/Admin/components/User/userCard";
// import { ForgotPass } from "../pages/ForgotPass";
// import { ResetPass } from "../pages/ResetPass";

const Routes = (
    <>
<Route path="/" element={<Homepage />} />;
<Route path="/admin" element={<Admin/>}>
<Route path="list-user" element={<UserCard/>}/>
<Route path="list-admin" element={<WarehouseAdmin/>}/>
</Route>
{/* <Route path="/forgot-password" element={<ForgotPass/>}/> */}
{/* <Route path="/reset-password/:token" element={<ResetPass/>}/> */}
    </>
) 

export const routes = createRoutesFromElements(Routes);
