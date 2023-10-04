
const useLoginAuthentication = () => {
  const token = localStorage.getItem("token");
  const isLoginAuthenticated = () => {
    return token 
  };

  return isLoginAuthenticated;
};

export default useLoginAuthentication;
