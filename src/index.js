import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Route} from 'react-router-dom'
import AdditionalPage from "./pages/AdditionalPage";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import IndexPage from "./pages/IndexPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Collections from "./pages/Collections";


const app = document.getElementById('root');
ReactDOM.render(
    <BrowserRouter>
        <div>
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
            <br/><br/><br/><br/><br/><br/><br/><br/>
            <Footer/>
        </div>
    </BrowserRouter>
    ,
    app)


