import React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLongArrowLeft} from "@fortawesome/free-solid-svg-icons";


export default function BackButton() {
    return (
        <Link to="/" element="{<HomePage/>}" role="button">
            <FontAwesomeIcon icon={faLongArrowLeft} className="back-button"/>
        </Link>

    );
}