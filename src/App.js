import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";
import Header from "./pages/Header";
import IndexPage from "./pages/IndexPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Collections from "./pages/Collections";
import Footer from "./pages/Footer";
import CreateCollection from "./pages/CreateCollection";

function App() {
    return (
        <BrowserRouter>
            <div className={"d-flex flex-column min-vh-100"}>
                <Header/>
                <Route exact path="/">
                    <IndexPage/>
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/sign-up">
                    <SignUp/>
                </Route>
                <Route path={"/all-collections"}>
                    <Collections/>
                </Route>
                <Route path={"/collection/create"}>
                    <CreateCollection/>
                </Route>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default App;
