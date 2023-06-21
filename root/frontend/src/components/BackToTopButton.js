import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLongArrowUp} from "@fortawesome/free-solid-svg-icons";
import '../css/DisplayPosts.css';

export default function BackToTopButton() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleBackToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return showButton ? (
        <div className="back-to-top-button ">
            <button onClick={handleBackToTop}>
                <FontAwesomeIcon icon={faLongArrowUp}/>
            </button>
        </div>
    ) : null;
}

