import Marquee from "react-fast-marquee";
import Header from "./Header";

const Slide = () => (
    <Marquee autoFill={true} gradient={false} speed={40}>
        <Header/>
    </Marquee>
  );

  export default Slide;