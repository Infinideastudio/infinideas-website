import React from 'react';
import logo from './../assests/logo.svg';
import styled from "styled-components";

const NavigationBar = styled.div`
    color: #ffffff;
    background-color: #0099ff;
    border-bottom: 4px solid #80ccff;
    box-shadow: 0 0 5px #999999;
    
    #title { color: #ffffff; }
    
    #title:hover { color: #80ccff; }
    
    a {
        text-decoration: none;
        color: #0099ff;
        transition: 0.1s;
    }
    
    a:hover { color: #cccccc; }
    
    .hamburger_button { 
        background-color: #0099ff; 
        width: 34px;
        height: 34px;
        margin: 0;
        padding: 5% 10%; 
        position: absolute;
        left: 0;
        top: 0;
        border: 0;
        padding: 0;
        cursor: pointer;
    }
    
    .hamburger_button .inner {
        width: 34px;
        height: 34px;
        margin: 0;
        padding: 5% 10%;
    }

    .hamburger_button .inner .bar {
        background-color: #80ccff;
        border-radius: 1px;
        width: 90%;
        height: 15%;
        margin: 15% 5%;
    }
    
    @media screen and (min-width: 1200px) {
        height: 50px;
        line-height: 50px;
        padding: 0 10%;       
        #title { font-size: 30px; }
        .hamburger_button { display: none; }
    }
    
    @media screen and (max-width: 1200px) {
        height: 40px;
        line-height: 40px;
        padding: 0 5%;       
        #title { font-size: 20px; }
        .hamburger_button { display: none; }
    }
    
    @media screen and (max-width: 800px) {
        height: 40px;
        line-height: 40px;
        text-align: center;
        #title { font-size: 20px; }   
        .hamburger_button { display: inline; }
    }
`;

const NavigationLinks = styled.div`
    background-color: #0099ff;
    transition: 0.25s;
    float: right;

    li {
        display: inline;
        height: 100%;
    }
    
    li a {
        color: #ffffff;
        transition: background-color 0.25s;
        display: inline-block;
        height: 100%;
        padding: 0 1em;
    }
    
    li a:hover {
        background-color: #80ccff;
    }
    
    @media screen and (max-width: 800px) {
        float: none;
        position: fixed;
        left: 0;
        top: 40px;
        bottom: 0;
        width: 0;
        max-width: 250px;
        overflow: hidden;
        float: none;
        box-shadow: 0 10px 10px #999999;

        li {
            float: none;
            display: block;
            width: 100%;
            height: 36px;
            line-height: 36px;
            float: left;
        }

        li a {
            width: 100%;
            height: 40px;
            line-height: 40px;
            padding: 0;
            font-size: 13px;
        }
    }
`;

const Logo = styled.img`
    @media screen and (min-width: 1200px) { 
        float: left;
        height: 30px;
        padding: 9px 15px 9px 0;
    }
    
    @media screen and (max-width: 1200px) { 
        float: left;
        height: 20px;
        padding: 9px 5px 9px 0;
    }
    
    @media screen and (max-width: 800px) { display: none; }
`;

function navClick() {
    let nav = document.getElementById("nav_container");
    let width = nav.style.width;
    if (width.localeCompare("90%") !== 0) {
        nav.style.width = "90%"
    } else {
        nav.style.width = "0";
    }
}

const Header = () => {
    return (
        <NavigationBar>
            <div className="hamburger_button" onClick={navClick}>
                <div className="inner">
                    <div className="bar"/>
                    <div className="bar"/>
                    <div className="bar"/>
                </div>
            </div>
            <a id="title" href="/">
                <Logo src={logo} alt="logo"/>
                新创无际 INFINIDEAS
            </a>
            <NavigationLinks id="nav_container">
                <li>
                    <a href="/">主页</a>
                </li>
                <li>
                    <a href={"/mc_server"}>MC服务器</a>
                </li>
                <li>
                    <a target="_blank" rel="noopener noreferrer" href={"/myomyw/index.html"}>Myomyw</a>
                </li>
                <li>
                    <a href={"/about"}>关于</a>
                </li>
                <li>
                    <a href={"/intro"}>新创简史</a>
                </li>
            </NavigationLinks>
        </NavigationBar>
    )
};

export default Header;

