import { Link } from "react-router-dom";
import pic from "../../../../public/banner-bg.png";
import gear from "../../../assets/gear.png";
import gear2 from "../../../assets/gear2.png";
import "./Banner.css";
import Container from "../../shared/Container";
import useUserRole from "../../../hooks/useUserRole";

const Banner = () => {
  const [role] = useUserRole();

  return (
    <div className="h-fit bg-[#E1D3FA] py-28">
      <Container>
        <div className="relative">
          <img
            src={gear}
            alt=""
            className="gear absolute left-0 top-0 w-[20%] z-0"
          />
          <div className="z-10">
            <div className="flex flex-col items-center gap-6 pt-10">
              <h1 className="text-center text-[#262626] text-xl md:text-4xl lg:text-5xl font-bold md:leading-[50px] lg:leading-[60px]">
                Let's make your tasks <br></br>easy, simple and<br></br>{" "}
                organized.
              </h1>

              <Link
                to={role === "admin" ? "/dashboard/manage-users" : "/dashboard"}
                className="btn bg-[#F89E1E] hover:bg-white text-lg text-white hover:text-[#F89E1E] border-none"
              >
                Let’s Explore <i className="fa-solid fa-arrow-right"></i>
              </Link>
            </div>
          </div>
          <div className="z-10">
            <img
              src={pic}
              alt=""
              className="mx-auto mt-10"
              data-aos="zoom-in"
              data-aos-delay="50"
              data-aos-duration="1000"
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
            />
          </div>
          <img
            src={gear2}
            alt=""
            className="gear absolute right-0 md:right-8 lg:right-0 bottom-0 w-[30%] z-0"
          />
        </div>
      </Container>
    </div>
  );
};

export default Banner;
