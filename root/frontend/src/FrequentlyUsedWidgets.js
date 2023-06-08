import React from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {Container} from "react-bootstrap";
import {Link} from 'react-router-dom';

const WidgetContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 50px;
`;

const Widget = styled(motion.div)`
  background-color: white;
  margin: 10px;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 0px rgba(20, 224, 168, 0.2);
`;

const WidgetTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
`;

const WidgetLink = styled(Link)`
  color: #3c2a64;
  text-decoration: none;
`;

const widgets = [
    {id: 1, title: 'Trending', link: '/reddit?subreddit=trending'},
    {id: 2, title: 'Sports', link: '/reddit?subreddit=sports'},
    {id: 3, title: 'Gaming', link: '/reddit?subreddit=gaming'},
];

const widgetVariants = {
    hidden: {opacity: 0, y: 50},
    visible: {
        opacity: 1,
        y: 0,
        transition: {duration: 0.5, ease: 'easeOut'},
    },
};

const WidgetList = () => {
    return (
        <Container className={'mt-4'}>
            <br/><h2 col style={{textAlign: 'center'}}><b>Frequently Used </b></h2>

            <WidgetContainer>
                {widgets.map((widget) => (
                    <Widget
                        key={widget.id}
                        variants={widgetVariants}
                        initial="hidden"
                        animate="visible"
                        textAlign="center"
                    >
                        <WidgetTitle> <b><WidgetLink to={widget.link}>{widget.title}</WidgetLink></b></WidgetTitle>
                    </Widget>
                ))}
            </WidgetContainer>
        </Container>
    );
};

export default WidgetList;
