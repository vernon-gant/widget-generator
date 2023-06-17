import React, {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faCopy} from "@fortawesome/free-solid-svg-icons";

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
            <Button variant={copied ? "success" : "primary"} onClick={handleButtonClick}>
                <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="mr-2"/>
                {copied ? "Copied!" : "Generate Tag"}
            </Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Generate Tag</Modal.Title>
                </Modal.Header>
                <Modal.Body>
          <pre>
            <code>{`<smedia-widget data-subreddit="${getSubreddit()}"></smedia-widget>
<script src="http://127.0.0.1:4000/templates/news_wall.js" type="text/javascript" async></script>`}</code>
          </pre>
                    <Button
                        variant={copied ? "success" : "secondary"}
                        onClick={handleCopyCode}
                        className="mt-3"
                    >
                        <FontAwesomeIcon icon={faCopy} className="mr-2"/>
                        {copied ? "Copied!" : "Copy Code"}
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    {/* Add any additional buttons or actions here */}
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default GenerateTag;
