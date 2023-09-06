import { Route, createRoutesFromElements } from "react-router-dom";

import { Homepage } from "../pages/Home";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import { HomepageView } from "../views/Home";
import { Onboarding } from "../pages/Onboarding";
import { WarehousePageView } from "../views/Admin/Warehouse";

const Routes = (
    <>
        <Route path="/" element={<Homepage />}>
            <Route path="" element={<HomepageView />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/onboard" element={<Onboarding />} /> 
        <Route path="/warehouse" element={<WarehousePageView/>}/>
    </>
);

export const routes = createRoutesFromElements(Routes);
