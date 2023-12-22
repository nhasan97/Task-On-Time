import PropTypes from "prop-types";
import "./Title.css";

const Title = ({ title }) => {
  const { mainTitle, subTitle } = title;
  return (
    <div className="flex flex-col justify-center items-center gap-2 my-3">
      <h1 className="title-grad text-[#101322] text-xl md:text-2xl lg:text-4xl font-bold">
        {mainTitle}
      </h1>
      <p className="text-[#727272] text-base">{subTitle}</p>
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.object.isRequired,
};
export default Title;
