import {
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import Form from "./Form";

export default function App(): JSX.Element {
  return (
    <div> 
      <Router>
        <Routes>
          Stable-diffsuion
          <Route path="/" element={<Form />} />
        </Routes>
      </Router>
    </div>
  )
}
  