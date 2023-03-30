import './App.css';
import {Container} from "react-bootstrap";
import Dashboard from "./home/Dashboard";

const App = () => (
    <Container className="p-3">
        <Container className="p-5 mb-4 bg-light rounded-3">
            <h1 className="header text-center">Welcome To Widget-Generator</h1>
            <Dashboard/>
        </Container>
    </Container>
);

export default App;
