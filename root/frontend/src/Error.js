import BackButton from "./BackButton";
import Navigation from "./Navba";
import {Container, ModalTitle} from "react-bootstrap";

function Error({error}) {
    return (
        <div>
            <Navigation/>
            <Container>
                <ModalTitle className={"text-center"}>Error</ModalTitle>
                <p className={"text-center"}>{error}</p>
                <BackButton/>
            </Container>
        </div>
    );
}

export default Error;