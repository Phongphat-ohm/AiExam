import Navbar from "@/components/Navbar";
import Title from "@/components/title";
import Background from "@/components/background";

export default function Home() {
  return (
    <>
      <nav>
        <Navbar />
      </nav>

      <Background>
        <div className="relative z-10">
          <Title />
        </div>
      </Background>

    </>
  );
}