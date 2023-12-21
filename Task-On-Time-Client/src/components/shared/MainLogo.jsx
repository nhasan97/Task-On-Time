import logo from "../../assets/logo2.png";
import PropTypes from "prop-types";

const MainLogo = ({ caller }) => {
  return (
    <a
      href="/"
      className={`w-fit flex ${
        caller === "d" ? "justify-center" : "justify-start"
      } items-center text-2xl hidden md:flex`}
    >
      <img src={logo} alt="" className="w-[60%] mr-2" />
    </a>
  );
};
MainLogo.propTypes = {
  caller: PropTypes.string.isRequired,
};
export default MainLogo;
