import React from 'react';
import {Button, Container, Form, FormControl} from "react-bootstrap";
import {motion} from "framer-motion";
import styled from "styled-components";


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
  return (
     <SearchContainer>
           <Form inline>
              <FormControl type="text" placeholder="Enter URL" className="mr-sm-4" /><br /> <br />
              <Button variant="outline-info">Generate</Button>
            </Form><br />
    </SearchContainer>

  );
};

export default SearchBox;
