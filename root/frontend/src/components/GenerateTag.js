import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faCopy} from "@fortawesome/free-solid-svg-icons";
import '../css/Error.css'

function GenerateTag() {
    const [showModal, setShowModal] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCopied(false); // Reset the copied state when the modal is closed
    };

    const handleCopyCode = () => {
        const codeToCopy = `<smedia-widget data-subreddit="${getSubreddit()}"></smedia-widget>
<script src="http://127.0.0.1:4000/templates/news_wall.js" type="text/javascript" async></script>`;
        navigator.clipboard.writeText(codeToCopy)
            .then(() => setCopied(true))
            .catch((error) => console.error("Error copying code:", error));
    };

    const getSubreddit = () => {
        const url = new URL(window.location.href);
        const subreddit = url.searchParams.get("subreddit");
        return subreddit || "default"; // Replace "default" with a fallback subreddit if needed
    };


    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Button className='button-85' variant={copied ? "outline-info" : "info"} onClick={handleButtonClick}>
                <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="mr-2"/>
                {copied ? "Copied!" : "Generate Tag"}
            </Button>

            <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title><b>Generate Tag</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="mt-3">
                        <ol>
                            <b className="heading">
                                <li><i> Copy the generated code snippet of the wall widget</i></li>
                            </b>
                            <br/>
                            <code>
      <pre className="bg-light p-3 shadow">
    <code>{`<smedia-widget data-subreddit="${getSubreddit()}"></smedia-widget>
<script src="http://127.0.0.1/templates/news_wall.js" type="text/javascript" async></script>`}</code>
  </pre>
                            </code>
                            <Button
                                variant={copied ? "success" : "info"}
                                onClick={handleCopyCode}
                                className="mt-3"
                            >
                                <FontAwesomeIcon icon={faCopy} className="mr-2"/>
                                {copied ? "Copied!" : "Copy Code"}
                            </Button>
                            <br/><br/><br/>
                            <b className="heading">
                                <li><i>Paste the code snippet to your HTML webpage</i></li>
                            </b>
                            <p className="mt-2 p-2">
                                To add your newly-generated widget to your website or app,
                                begin by copying the code snippet. Next, navigate to the desired location in your
                                development environment, paste the code snippet, and save and deploy your changes to
                                complete the integration.
                            </p>
                        </ol>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="outline-danger" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
}

export default GenerateTag;
