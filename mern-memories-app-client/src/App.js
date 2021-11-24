import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import HomeScreen from "./Screens/HomeScreen";
import CreateScreen from "./Screens/CreateScreen";
import UpdateScreen from "./Screens/UpdateScreen";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />

      <main className="py-5">
        <Container>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/create" component={CreateScreen}></Route>
          <Route path="/update/:id" component={UpdateScreen}></Route>
        </Container>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
