import { useEffect } from "react";
import Process from "./component/Process/Process";
import About from "./component/about/About";
import Banner from "./component/banner/Banner";
import CallToAction from "./component/call to action/CallToAction";
import Category from "./component/category/Category";
import CountUpProcess from "./component/countUp/CountUpProcess";
import HappyComments from "./component/heppyComments/HeppyComments";
import WantPet from "./component/wantPet/WantPet";
import { Helmet } from "react-helmet-async";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="">
      <Helmet>
        <title>Pet House | Home</title>
      </Helmet>

      <Banner />

      <div className="container mx-auto p-2">
        <Category />
        <CallToAction />
        <WantPet />
        <Process />
        <About />
        <CountUpProcess />
        <HappyComments />
      </div>
    </div>
  );
};

export default Home;
