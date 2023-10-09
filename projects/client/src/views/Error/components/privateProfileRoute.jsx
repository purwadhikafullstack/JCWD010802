import { useSelector } from 'react-redux';

const useProfileAuthentication = () => {
  const user = useSelector(state => state.user.value);
  const token = localStorage.getItem("token");
  const isProfileAuthenticated = () => {
    return token && user.isVerified === true 
  };

  return isProfileAuthenticated;
};

export default useProfileAuthentication;
