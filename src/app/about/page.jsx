import Footer from "@/Components/Footer";
import NavBar from "@/Components/NavBar";
import Members from "./Members";
import UseCase from "./UseCase";
import Values from "./Values";
import VisionMission from "./VisionMission";
import What from "./What";

const About = () => {
  return (
    <div>
      <NavBar/>
      <section className="container min-h-[100vh] pt-48 max-md:pt-32 flex flex-col gap-20">
        <VisionMission/>
        <Members/>
        <What/>
        <Values/>
        <UseCase/>
      </section>
      <Footer/>
    </div>
  );
};

export default About;
