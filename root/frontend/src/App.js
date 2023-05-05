import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './Navba';
import SearchBox from "./SearchBox";
import  WidgetList from "./FrequentlyUsedWidgets";
import DisplayPosts from "./DisplayPosts";
import backgroundImage from '../img/widget2.png';
import { motion} from "framer-motion";
import Posts from './Posts';



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
               <Posts/>
            </>
          } />

          <Route path="/posts" component={DisplayPosts} />

      </Routes>
    </BrowserRouter>

  );
}

export default App;
