import React from 'react';
import {motion} from "framer-motion";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navigation from './Navba';
import AboutUsPage from './About';
import ImpressPage from "./Impressum";
import SearchBox from "./SearchBox";
import WidgetList from "./FrequentlyUsedWidgets";
import DisplayPosts from "./DisplayPosts";
import backgroundImage from './img/widget2.png';

function HomePage() {
    return (
        <>
            <Navigation/>
            <div className="header-container" style={{
                background: `url(${backgroundImage}) no-repeat center center fixed`,
                backgroundSize: "cover",
                padding: "50px 0",
                textAlign: "center",
                color: "white"
            }}>
                <motion.span
                    style={{display: "inline-block"}}
                    animate={{x: [null, 60, 0]}}
                    transition={{duration: 5, repeat: 2}}
                >
                    <h1><b>Widget &nbsp;  </b></h1>
                </motion.span>

                <motion.span
                    style={{display: "inline-block"}}
                    animate={{y: [null, 60, 0]}}
                    transition={{duration: 5, repeat: 2}}
                >
                    <h1><b>Generator</b></h1>
                </motion.span>

                <SearchBox/>

            </div>
            <WidgetList/>
        </>
    );
}


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/about" element={<AboutUsPage/>}/>
                <Route path="/impress" element={<ImpressPage/>}/>
                <Route path="/reddit" element={<DisplayPosts/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
