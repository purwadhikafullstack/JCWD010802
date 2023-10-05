import { useSelector } from 'react-redux';

const useUserAuthentication = () => {
  const user = useSelector(state => state.user.value);
  const token = localStorage.getItem("token");
  const isUserAuthenticated = () => {
    return token && user.isVerified === true && user.roleId===1;
  };

  return isUserAuthenticated;
};

export default useUserAuthentication;
