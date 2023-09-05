import { Route, createRoutesFromElements } from "react-router-dom";
import { Homepage } from "../pages/Home";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import { HomepageView } from "../views/Home";
import { Onboarding } from "../pages/Onboarding";
import { Verified } from "../pages/Verified";
import { ProfileView } from "../views/Profile";

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
    </>
);

export const routes = createRoutesFromElements(Routes);
