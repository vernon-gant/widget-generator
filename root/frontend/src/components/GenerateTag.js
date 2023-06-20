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
            <Button className='button-85'variant={copied ? "outline-info" : "info"} onClick={handleButtonClick}>
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
      <li> <i><b>Copy the generated code snippet of the wall widget:</b> </i> </li>
        <br/>
      <code>
      <pre className="bg-light p-3 shadow">
    <code>{`<smedia-widget data-subreddit="${getSubreddit()}"></smedia-widget>
<script src="http://127.0.0.1:4000/templates/news_wall.js" type="text/javascript" async></script>`}</code>
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
        <br/><br/>
      <li> <i> <b>Paste the code snippet to your HTML webpage:</b> </i> </li>
      <p className="mt-3 p-3">
  Copy the generated code snippet.
Open your website or app's development environment.
Paste the code snippet into the appropriate section of your website or app where you want the widget to appear.
Save and deploy your changes.
</p>
    </ol>
  </div>
</Modal.Body>

                <Modal.Footer>
                    <Button variant="outline-danger" onClick={handleCloseModal}>
                        Close
                    </Button>
                    {/* Add any additional buttons or actions here */}
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default GenerateTag;
