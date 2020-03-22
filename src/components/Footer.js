import React from 'react';
import styled from "styled-components";

const StyledFooter = styled.footer`
    background-color: #999;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: auto;
`;

const Links = styled.div`
    background-color: #cccccc;
    width: 100%;
    @media screen and (min-width: 800px) {
        padding: 1em 16em;
    }
    @media screen and (max-width: 800px) {
        padding: 1em 2em;
    }  
    box-sizing: border-box;
    font-size: 12px;
    a {
        color: #ffffff;
        margin-right: 0.5em;
        &:hover {
            background-color: #999999;
        }
    }
    span { margin-right: 1em; }
`;

const CopyrightInfo = styled.div`
    height: 4em;
    @media screen and (min-width: 800px) {
        width: 100%;
        padding: 1em 16em;
        .left { float: left; }
        .right { float: right; }
    }
    @media screen and (max-width: 800px) {
        padding: 1em 2em;
        .left { float: left; }
        .right { float: right; }
    }
    @media screen and (max-width: 450px) {
        padding: 1em 2em;
        .left { float: none; }
        .right { float: none; }
    }
    box-sizing: border-box;
    color: #EEE;
    font-size: 12px;
`;

const Footer = (props) => {
    const year = new Date().getFullYear();
    return (
        <StyledFooter>
            <Links>
                <span>友情链接</span>
                <a target="_blank" rel="noopener noreferrer" href="http://www.snang.cc/">山岚幽阳</a>
                <a target="_blank" rel="noopener noreferrer" href="http://x-y.studio/">平衍之域</a>
                <a target="_blank" rel="noopener noreferrer" href="http://www.skyju.cc/">居正网站</a>
                <a target="_blank" rel="noopener noreferrer" href="http://ptree.top/">淀粉月刊</a>
                <a target="_blank" rel="noopener noreferrer" href="https://www.boulkoo.com/">BOULKOO</a>
            </Links>
            <CopyrightInfo>
                <div className="left">© INFINIDEAS 2015 - {year}</div>
                <div className="right">Site content under CC BY-SA 3.0 Unported.</div>
            </CopyrightInfo>
        </StyledFooter>
    )
};

export default Footer;

