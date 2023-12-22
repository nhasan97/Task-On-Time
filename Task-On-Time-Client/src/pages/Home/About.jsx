import { Helmet } from "react-helmet-async";
import Container from "../../components/shared/Container";
import Title from "../../components/shared/Title/Title";
import aboutImg from "../../assets/about.png";
import gear from "../../assets/gear.png";
import { Link } from "react-router-dom";

const About = () => {
  const title = {
    mainTitle: "About",
    subTitle: "",
  };
  return (
    <Container>
      <Helmet>
        <title>TaskOnTime | About</title>
      </Helmet>

      <div className="min-h-screen flex flex-col-reverse justify-center items-center pt-20 pb-5 space-y-6">
        <div className="w-full">
          <img src={aboutImg} alt="" className="w-full" />
        </div>

        <div className="w-full flex flex-col justify-center items-center">
          <div className="flex justify-center items-center gap-1">
            <img src={gear} alt="" className="gear w-8 h-8 -mt-2" />
            <Title title={title}></Title>
          </div>

          <p className="lg:w-1/2 mx-auto text-[#727272] text-base leading-7 text-center">
            "TimeOnTask" makes corporate tasks simple, fun and easy by allowing
            task creation with deadline, assigning task to members and
            monitoring progress. Also offers the easiest way to organize the
            tasks by the drag and drop feature. Let "TimeOnTask" handle all your
            burden.
          </p>

          <Link
            to="/login"
            className="btn bg-[#F89E1E] hover:bg-white text-lg text-white hover:text-[#F89E1E] mt-6 border-none"
          >
            Let’s Explore <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default About;
