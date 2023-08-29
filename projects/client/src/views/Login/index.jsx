import LoginTitle from "./components/LoginTitle";

const LoginView = () => {
  return (
    <div>
      <LoginTitle />
      <input placeholder="email" />
      <input placeholder="password" />
    </div>
  );
};

export default LoginView;
