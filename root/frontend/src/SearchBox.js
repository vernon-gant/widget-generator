import React, {useState} from 'react';
import {Button, Form, FormControl} from "react-bootstrap";
import {motion} from "framer-motion";
import styled from "styled-components";
import {Link} from "react-router-dom";


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
    const [subreddit, setSubreddit] = useState(''); // Create state for subreddit
    const handleInputChange = (event) => setSubreddit(event.target.value);

    return (
        <SearchContainer>
            <Form inline>
                <FormControl
                    id="search"
                    type="text"
                    placeholder="Enter subreddit"
                    className="mr-sm-4"
                    value={subreddit} // Set value of the form control
                    onChange={handleInputChange} // Set function to handle form input changes
                /><br/> <br/>
                <Link to={`/reddit?subreddit=${subreddit}`}>
                    <Button variant="outline-info">Generate</Button>
                </Link>
            </Form><br/>
        </SearchContainer>

    );
};

export default SearchBox;
