import Brain from "./components/brain"
import HeroSection from "./components/hero-section"
import Ipr from "./components/ipr"
// import Chatbot from "./components/page"
export default function Home() {
  return (
    <main>
      <HeroSection />
      <Brain/>
      <Ipr/>
      {/* <Chatbot/> */}
    </main>
  )
}

