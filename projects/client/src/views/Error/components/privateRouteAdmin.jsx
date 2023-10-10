import { useSelector } from 'react-redux';

const useAdminAuthentication = () => {
  const user = useSelector(state => state.user.value);
  const token = localStorage.getItem("token");
  const isAdminAuthenticated = () => {
    return token && (user.roleId === 2 || user.roleId === 3)
  };

  return isAdminAuthenticated;
};

export default useAdminAuthentication;
