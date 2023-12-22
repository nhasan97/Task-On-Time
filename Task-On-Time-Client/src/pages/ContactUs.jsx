import { Helmet } from "react-helmet-async";
import Container from "../components/shared/Container";
import Title from "../components/shared/Title/Title";
import contactImg from "../assets/undraw_Contact_us_re_4qqt.png";

const ContactUs = () => {
  const title = {
    mainTitle: "Contact Us",
    subTitle: "We would love to hear you",
  };

  return (
    <Container>
      <Helmet>
        <title>TaskOnTime | Contact Us</title>
      </Helmet>

      <div className="min-h-screen flex flex-col justify-center items-center pt-16 pb-5 space-y-6">
        <Title title={title}></Title>

        <div className="flex flex-col lg:flex-row justify-center items-center">
          <div className="w-full lg:w-1/2 h-fit relative">
            <img src={contactImg} alt="" className="w-full" />
            <h4 className="text-[#727272] text-base lg:text-lg absolute top-0 right-0 md:translate-x-[-50%] md:translate-y-[100%]">
              +7354674534
            </h4>
            <h4 className="text-[#727272] text-base lg:text-lg absolute lg:bottom-24 lg:left-48">
              scc@gmail.com
            </h4>
          </div>

          <div className="divider lg:divider-horizontal m-10">OR</div>

          <div className="w-full lg:w-1/2 h-fit ">
            <div className="w-full p-5 border rounded-lg">
              <form className="w-full flex flex-col gap-4 text-left">
                <div className="relative">
                  <div className="h-[48px] w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#B398F6] rounded-lg">
                    <i className="fa-solid fa-t text-xl text-white"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Your Email"
                    required
                    className="input bg-[#b398f636] w-full pl-16 rounded-lg border focus:border-[#B398F6] focus:outline-none"
                  />
                </div>

                <div className="relative">
                  <div className="h-20 w-[48px] flex justify-center items-center absolute top-0 left-0 bg-[#B398F6] rounded-lg">
                    <i className="fa-solid fa-envelope text-xl text-white"></i>
                  </div>
                  <textarea
                    type="email"
                    placeholder="Message"
                    required
                    className="input bg-[#b398f636] w-full h-20 pl-16 py-3 rounded-lg border focus:border-[#B398F6] focus:outline-none"
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="btn w-1/2 mx-auto bg-[#F89E1E] text-lg font-medium text-white hover:text-[#FE7E51] normal-case rounded-lg"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ContactUs;
