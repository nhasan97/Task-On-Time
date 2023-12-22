import { Helmet } from "react-helmet-async";
import Banner from "../../components/Home/Banner/Banner";
import ClientSection from "../../components/Home/ClientSection/ClientSection";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>TaskOnTime | Home</title>
      </Helmet>

      <Banner></Banner>
      <ClientSection></ClientSection>
    </div>
  );
};

export default Home;
