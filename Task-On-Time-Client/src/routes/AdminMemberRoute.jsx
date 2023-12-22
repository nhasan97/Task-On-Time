import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";
import Loading from "../components/shared/Loading";

const AdminMemberRoute = ({ children }) => {
  const [role, roleLoading] = useUserRole();

  if (roleLoading) {
    return <Loading />;
  }

  if (role === "admin" || role === "surveyor") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

AdminMemberRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminMemberRoute;
