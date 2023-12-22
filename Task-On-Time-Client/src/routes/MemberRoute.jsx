import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import useUserRole from "../hooks/useUserRole";
import Loading from "../components/shared/Loading";

const MemberRoute = ({ children }) => {
  const [role, roleLoading] = useUserRole();

  if (roleLoading) {
    return <Loading />;
  }

  if (role === "surveyor") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

MemberRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default MemberRoute;
