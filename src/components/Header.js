import React from 'react';
import logo from './../assests/logo.svg';
import styled from "styled-components";

const NavigationBar = styled.div`
    color: #ffffff;
    background-color: #0099ff;
    border-bottom: 4px solid #80ccff;
    box-shadow: 0 0 5px #999999;
    padding: 0 10%;
    height: 50px;
    line-height: 50px;
    
    #title {
        color: #ffffff;
        font-size: 30px;
    }
    
    #title:hover {
        color: #80ccff;
    }
    
    a {
        text-decoration: none;
        color: #0099ff;
        transition: 0.1s;
    }
    
    a:hover {
        color: #cccccc;
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
`;

const Logo = styled.img`
    float: left;
    height: 30px;
    padding: 9px 15px 9px 0;
`;

const Header = ()=>{
    return (
        <NavigationBar>
            <a id="title" href="/">
                <Logo src={logo} alt="logo"/>
                INFINIDEAS
            </a>
            <NavigationLinks>
                <li>
                    <a href="/">主页</a>
                </li>
                <li>
                    <a href="/mc_server">MC服务器</a>
                </li>
                <li>
                    <a target="_blank" href="/myomyw/index.html">Myomyw</a>
                </li>
                <li>
                    <a href="/about">关于</a>
                </li>
                <li>
                    <a href="/intro">新创简史</a>
                </li>
            </NavigationLinks>
        </NavigationBar>
    )
};

export default Header;

