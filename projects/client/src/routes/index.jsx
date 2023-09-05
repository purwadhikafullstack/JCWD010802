import { Route, createRoutesFromElements } from "react-router-dom";

import Homepage from "../pages/Home";
import { Verified } from "../pages/Verified";
import { ProfileView } from "../views/Profile";

const Routes = (
  <>
    <Route path="/" element={<Homepage />}>
      <Route path="profile" element={<ProfileView />} />
    </Route>
    <Route path="/verified/:token" element={<Verified />} />
  </>
);

export const routes = createRoutesFromElements(Routes);
