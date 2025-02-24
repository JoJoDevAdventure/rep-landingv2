import NavBar from "@/Components/NavBar"
import ComparisonChart from "./Comparison"
import LiveTranscription from "./LiveTranscription"

const page = () => {
  return (
    <main>
        <NavBar/>
        <LiveTranscription/>
        <ComparisonChart/>
    </main>
  )
}

export default page