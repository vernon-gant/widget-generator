import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLongArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import React from "react";

export default function BackButton() {
    return (
        <Link to="/" element="{<HomePage/>}" role="button">
            <FontAwesomeIcon icon={faLongArrowLeft} className="back-button"/>
        </Link>
    );
}