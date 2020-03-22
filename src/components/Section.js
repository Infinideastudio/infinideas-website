import React from 'react';
import styled from "styled-components";

const StyledSection = styled.div`
    padding: 20px;
    font-size: 12px;
    border-right: 2px solid #80ccff;
    color: #aaaaaa;
    transition: background-color 0.25s;
    
    .description {
        color: #777;
        width: 70%;
        margin: 10px auto;
        font-size: 16px;
    }
    
    &:hover { background-color: #aedfff; }
    
    a {
        margin-right: 10px;
        font-size: 14px
    }
    
    .link {
        width: 100%;
        margin: 30px 0;
        text-align: center;
        text-decoration: none;
        color: #0099ff;
        transition: 0.1s;
    }
    
    .link a {
        &:hover { color: #0099ff; }
        @media (min-width: 800px) { & { font-size: 64px } }
        @media (max-width: 800px) { & { font-size: 48px } }
        @media (max-width: 600px) { & { font-size: 32px } }
    }
    
    @media screen and (min-width: 1000px) { margin: 50px 20%; }
    @media screen and (max-width: 1000px) { margin: 40px 10%; } 
    @media screen and (max-width: 800px) { margin: 20px 15px; }
    @media screen and (max-width: 600px) { margin: 10px 10px; }
`;

const Section = (props) => {
    return (
        <StyledSection>
            <div className="description">{props.description}</div>
            <div className="link"><a href={props.link}>{props.name}</a></div>
            {props.children}
        </StyledSection>
    )
};

export default Section;
