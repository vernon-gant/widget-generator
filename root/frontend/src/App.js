import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './home/Navba';
import SearchBox from "./home/SearchBox";
import  WidgetList from "./home/FrequentlyUsedWidgets";
import DisplayPosts from "./home/DisplayPosts";
import backgroundImage from './img/widget2.png';
import { motion} from "framer-motion";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
              <Navigation />
              <div className="header-container" style={{
                  background: `url(${backgroundImage}) no-repeat center center fixed`,
                  backgroundSize: "cover",
                  padding: "50px 0",
                  textAlign: "center",
                  color: "white"
                }}>
                  <motion.span
                    style={{ display: "inline-block" }}
                    animate={{ x: [null, 60, 0] }}
                    transition={{ duration: 5, repeat: 2 }}
                >
                  <h1><b>Widget &nbsp;  </b></h1>
                </motion.span>

                <motion.span
                    style={{ display: "inline-block" }}
                    animate={{ y: [null, 60, 0] }}
                    transition={{ duration: 5, repeat: 2 }}
                  >
                  <h1><b>Generator</b></h1>
                </motion.span>


                <SearchBox />
              </div>

              <WidgetList />
            </>
          } />

        <Route path="/posts/:subredditName" element={<DisplayPosts />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
