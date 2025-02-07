
import { useDispatch } from "react-redux";
import loginWithGoogle from "./auth/AOuth";

interface AuthButtonProps {
  children: React.ReactNode;
}

const AuthButton: React.FC<AuthButtonProps> = ({ children }) => {
  const dispatch = useDispatch();

  const handleClick = async () => {
    await loginWithGoogle(dispatch);
  };

  return (
    <span onClick={handleClick}>{children}</span>
  );
};

export default AuthButton;
