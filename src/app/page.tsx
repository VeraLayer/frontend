import Image from "next/image";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import FooterSection from "./components/FooterSection";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <HeroSection />
      <FeaturesSection  />
      <FooterSection />
    </div>
  );
}
