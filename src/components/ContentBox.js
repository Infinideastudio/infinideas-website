import styled from "styled-components";

const ContentBox = styled.div`
    text-align: center;
    color: #999999;
    border: 6px solid #fbfbfb;
    background-color: #ffffff;
    overflow: hidden;
    
    @media screen and (min-width: 1000px) {
        font-size: 18px;
        line-height: 48px;
        width: 70%;
        margin: 50px auto;
        p { margin: 16px 0px; }
    }
    @media screen and (max-width: 1000px) {
        font-size: 18px;
        line-height: 48px;
        width: 85%;
        margin: 50px auto;
        p { margin: 10px 0px; }
    } 
    @media screen and (max-width: 800px) {
        font-size: 16px;
        line-height: 36px;
        width: 100%;
        margin: 36px auto;
        p { margin: 8px 0px; }
    }
`;

export default ContentBox;
