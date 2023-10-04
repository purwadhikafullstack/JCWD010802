import { Navigate, Route, createRoutesFromElements, useLocation, useParams } from "react-router-dom";
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
import { Product } from "../pages/Product";
import { AllProduct } from "../views/Product/components/AllProduct";
import { DetailProduct } from "../pages/ProductDetail";
import { CategoryView } from "../views/Admin/Category";
import { AdminProducts } from "../views/Admin/Products";
import { Cart } from "../pages/Cart";
import { Checkout } from "../pages/CheckOut";
import { StockView } from "../views/Admin/Stock";
import ManualStockMutationForm from "../views/Admin/components/Mutation/stockMutationForm";
import { MutationView } from "../views/Admin/Mutation";
import { Mutation } from "../pages/Mutation";
import { Order } from "../pages/Order";
import {Dashboard} from "../views/Admin/Dashboard";
import { OrderDetailView } from "../views/Admin/components/Order/OrderDetail";
import useAdminAuthentication from "../views/Error/components/privateRouteAdmin";
import useUserAuthentication from "../views/Error/components/privateRouteUser";
import { NotFound } from "../pages/Error";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useLoginAuthentication from "../views/Error/components/privateRoutelogin";
import useProfileAuthentication from "../views/Error/components/privateProfileRoute";
import useIdValidation from "../views/Error/components/privateProductRoute";
import { ProductNotFound } from "../views/Error/components/productNotFound";


const AdminGuardedRoute = ({ element }) => {
  const isAdminAuthenticated = useAdminAuthentication(); 

  if (isAdminAuthenticated()) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
};
const UserGuardedRoute = ({ element }) => {
  const isUserAuthenticated = useUserAuthentication(); 

  if (isUserAuthenticated()) {
    return element;
  } else {
    

    return <NotFound/>; 
  }
};
const ProfileGuardedRoute = ({ element }) => {
  const isProfileAuthenticated = useProfileAuthentication(); 

  if (isProfileAuthenticated()) {
    return element;
  } else {
    

    return <NotFound/>; 
  }
};
const ProductDetailGuardedRoute = ({ element }) => {
  const { id } = useParams();
  const product = useIdValidation(id);

  if (product === null) {
    return <ProductNotFound />; 
  }

  
  return element;
};
const LoginGuardedRoute = ({ element }) => {
  const isLoginAuthenticated = useLoginAuthentication();

  if (isLoginAuthenticated()) {
    const isAdmin = useAdminAuthentication;
    
    if (isAdmin) {
      return <Navigate to="/admin" />;
    } else {
      return <Navigate to="/" />;
    }
  } else {
    return element;
  }
};

const Routes = (
  <>
    <Route path="/" element={<Homepage />}>
      <Route path="" element={<HomepageView />} />
      <Route path="profile" element={<ProfileGuardedRoute element={<ProfileView />}/>} />
      <Route path="cart" element={<UserGuardedRoute element={<Cart />}/>} />
      <Route path="/" element={<Product />}>
        <Route path="product" element={<AllProduct />} />
      </Route>
      <Route path="/product/:id" element={<ProductDetailGuardedRoute element={<DetailProduct />}/>} />
    </Route>

    <Route path="/login" element={<LoginGuardedRoute element={<Login />}/>} />
    <Route path="/register" element={<LoginGuardedRoute element={<Register />}/>} />
    <Route path="/verified/:token" element={<Verified />} />
    <Route path="/onboard" element={<LoginGuardedRoute element={<Onboarding />}/>} />
    <Route path="/forgot-password" element={<LoginGuardedRoute element={<ForgotPass />}/>} />
    <Route path="/reset-password/:token" element={<ResetPass />} />
    <Route path="/checkout" element={<UserGuardedRoute element={<Checkout />}/>} />

    <Route path="/admin" element={<AdminGuardedRoute element={<Admin />} />}>
      <Route path="" element={<Dashboard />} />
      <Route path="list-user" element={<UserCard />} />
      <Route path="list-admin" element={<WarehouseAdmin />} />
      <Route path="list-category" element={<CategoryView />} />
      <Route path="warehouse" element={<WarehousePageView />} />
      <Route path="product-list" element={<AdminProducts />} />
      <Route path="warehouse-stock" element={<StockView />} />
      <Route path="mutation" element={<Mutation />} />
      <Route path="order" element={<Order />} />
      <Route path="detail-order" element={<OrderDetailView />} />
    </Route>
    <Route path="*" element={<NotFound/>}/>
  </>
);
export const routes = createRoutesFromElements(Routes);
