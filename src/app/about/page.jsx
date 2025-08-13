import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import Members from "./Members";
import UseCase from "./UseCase";
import Values from "./Values";
import VisionMission from "./VisionMission";

const About = () => {
  return (
    <div>
      <NavBar/>
      <section className="container min-h-[100vh] pt-48 max-md:pt-32 flex flex-col gap-20">
        <VisionMission/>
        <Members/>
        <Values/>
        <UseCase/>
      </section>
      <Footer/>
    </div>
  );
};

export default About;
