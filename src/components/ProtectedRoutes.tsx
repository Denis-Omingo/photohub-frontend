import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";


const ProtectedRoute = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return currentUser ? (<div className=""><Outlet/></div>): (<Navigate to="/" replace />)
}
export default ProtectedRoute;
