import React from 'react';


import ApplicationRoutes from "./ApplicationRoutes";
import {BrowserRouter} from "react-router-dom";
import {Layout} from "./context/Layout";

function App() {
    return (
        <BrowserRouter>
           <Layout>
               <ApplicationRoutes/>
           </Layout>
        </BrowserRouter>

    );
}

export default App;