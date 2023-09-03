import { Route, createRoutesFromElements } from "react-router-dom";

import { Homepage } from "../pages/Home";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import { HomepageView } from "../views/Home";
import { Onboarding } from "../pages/Onboarding";

const Routes = (
    <>
        <Route path="/" element={<Homepage />}>
            <Route path="" element={<HomepageView />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/onboard" element={<Onboarding />} /> 
    </>
);

export const routes = createRoutesFromElements(Routes);
