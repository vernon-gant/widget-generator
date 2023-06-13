import React, { useState } from 'react';
import { Button, Form, FormControl } from "react-bootstrap";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const SearchInput = styled.input`
  padding: 100px;
  border: none;
  border-radius: 40px 0 0 40px;
`;

const SearchButton = styled(motion.button)`
  padding: 10px 20px;
  background-color: #166b62;
  border: none;
  border-radius: 0 40px 40px 0;
  color: white;
  font-weight: bold;
`;

const SearchBox = () => {
  const [subreddit, setSubreddit] = useState('');

  const handleInputChange = (event) => setSubreddit(event.target.value);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      window.location.href = `/reddit?subreddit=${subreddit}`;
    }
  };

  return (
    <SearchContainer>
      <Form inline>
        <FormControl
          id="search"
          type="text"
          placeholder=" Enter Subreddit"
          className="mr-sm-4"
          value={subreddit}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // Handle Enter key press
          style={{
            textAlign: "center",
            borderRadius: "40px",
            width: "280px",
            height: "50px",
          }}
        />
        <br /> <br />
        <Link to={`/reddit?subreddit=${subreddit}`}>
          <Button variant="outline-info">Generate</Button>
        </Link>
      </Form>
      <br />
    </SearchContainer>
  );
};

export default SearchBox;
