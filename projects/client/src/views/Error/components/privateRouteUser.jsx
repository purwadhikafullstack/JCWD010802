import { useSelector } from "react-redux";

const useUserAuthentication = () => {
  const user = useSelector(state => state.user.value);
  const token = localStorage.getItem("token");
  const isUser = user.isVerified === true && user.roleId === 1;

  const isUserAuthenticated = () => {
    return token && isUser;
  };

  return isUserAuthenticated;
};

export default useUserAuthentication;
