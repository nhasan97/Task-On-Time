import { Helmet } from "react-helmet-async";
import Banner from "../../components/Home/Banner/Banner";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>PanaPoll | Home</title>
      </Helmet>

      <Banner></Banner>
    </div>
  );
};

export default Home;
