import PropTypes from "prop-types";
const NoData = ({ text }) => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-6xl font-semibold">{text}</h1>
    </div>
  );
};

NoData.propTypes = {
  text: PropTypes.string.isRequired,
};
export default NoData;
