import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { showAlertOnError } from "../../utilities/displaySweetAlert";
import useAuth from "../../hooks/useAuth";
import MainLogo from "../shared/mainLogo";
import Container from "../shared/Container";
import useUserRole from "../../hooks/useUserRole";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [role] = useUserRole();

  const links = (
    <div className="text-[#757575] text-base font-medium space-x-8">
      <NavLink to="/">Home</NavLink>
      {user && (
        <NavLink
          to={role === "admin" ? "/dashboard/manage-users" : "/dashboard"}
        >
          Dashboard
        </NavLink>
      )}
      <NavLink to="/about">About</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </div>
  );

  const handleLogout = () => {
    logoutUser()
      .then()
      .catch((err) => {
        showAlertOnError(err.message);
      });
  };

  return (
    <div className="w-full h-fit py-2 bg-[rgba(255,255,255,.5)] absolute z-10">
      <Container>
        <div className="navbar p-0 text-[#101322]">
          <div className="navbar-start">
            <div className="hidden dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {links}
              </ul>
            </div>

            <MainLogo caller={"n"}></MainLogo>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{links}</ul>
          </div>
          <div className="navbar-end">
            {user?.email ? (
              <div className="flex justify-center items-center gap-2">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={user.photoURL} />
                  </div>
                </label>
                <p className="hidden md:flex border-l-2 p-2 text-lg">
                  {user.displayName}
                </p>
                <button
                  className="btn btn-circle border-none bg-[#B398F6] text-white hover:text-[#B398F6]"
                  onClick={handleLogout}
                >
                  <AiOutlineLogout className="text-2xl"></AiOutlineLogout>
                </button>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-2">
                <Link
                  className="btn border-none bg-[#F89E1E] text-white hover:text-[#F89E1E]"
                  to="/login"
                >
                  <AiOutlineLogin className="text-2xl"></AiOutlineLogin>
                </Link>
                <Link
                  className="btn border-none bg-[#F89E1E] text-white hover:text-[#F89E1E]"
                  to="/register"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
