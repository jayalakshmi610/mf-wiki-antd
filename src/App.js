//wiki-app
import React from "react";
import "./index.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import SideNav from "./components/Sidenavbar/SideNav";
import styles from "./components/styles/App.module.css";
import { EditorProvider } from "./components/BlocksuiteEditor/EditorProvider";

import EditorContainer from "./components/BlocksuiteEditor/EditorContainer";
import NewPage from "./components/Sidenavbar/NewPage";
import PageCreator from "./components/Sidenav_icons//PageCreator/PageCreator";
import Test from "./components/Test";
import { NavDataProvider } from "./components/Sidenavbar/Navdataprovider";

const App = () => {
  console.log("hello world");

  return (
    <EditorProvider>
      <NavDataProvider>
        <div className={styles.App}>
          <Router>
            <div className={styles.Container}>
              <div className={styles.contentWrapper}>
                {/* <Test /> */}
                <SideNav />
                <Routes>
                  <Route path="/" element={<EditorContainer />} />
                  <Route path="/:section" element={<EditorContainer />} />
                  <Route
                    path="/:section/:subsection"
                    element={<EditorContainer />}
                  />
                  <Route path="*" element={<EditorContainer />} />

                  <Route path="/NewPage" element={<NewPage />} />
                </Routes>
              </div>
            </div>
          </Router>
        </div>
      </NavDataProvider>
    </EditorProvider>
  );
};

export default App;
