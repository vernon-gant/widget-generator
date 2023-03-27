import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowError(false);
        setShowSuccess(false);

        if (password !== confirmPassword) {
            setShowError(true);
        } else {
            // Hier kannst du die Formularübermittlung implementieren
            setShowSuccess(true);
            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        }
    };

    return (
        <div>
            <h1>Signup</h1>
            {showError && (
                <Alert variant="danger">Die Passwörter stimmen nicht überein.</Alert>
            )}
            {showSuccess && (
                <Alert variant="success">Registrierung erfolgreich!</Alert>
            )}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" value={username} onChange={handleUsernameChange} required />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" value={email} onChange={handleEmailChange} required />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" value={password} onChange={handlePasswordChange} required />
                </Form.Group>

                <Form.Group controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Signup
                </Button>
            </Form>
        </div>
    );
}

export default Signup;
