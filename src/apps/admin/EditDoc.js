import React from 'react';
import {withRouter} from "react-router-dom";
import AceEditor from "react-ace";
import styled from "styled-components";
import Base from "./Base";
import {ADMIN_API_BASE} from "./Settings";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";

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
        margin: 20px auto;
        p { margin: 16px 0px; }
    }
    @media screen and (max-width: 1000px) {
        font-size: 18px;
        line-height: 48px;
        width: 85%;
        margin: 20px auto;
        p { margin: 10px 0px; }
    } 
    @media screen and (max-width: 800px) {
        font-size: 16px;
        line-height: 36px;
        width: 95%;
        margin: 20px auto;
        p { margin: 8px 0px; }
    }
`;

const FlatButton = styled.button`
    padding: 10px;
    font-size: 18px;
    border-right: 2px solid #808080;
    color: #808080;
    transition: background-color 0.25s;
`;

class EditDoc extends Base {
    constructor(props) {
        super(props);
        this.state = {
            data: "Loading..."
        };
    }

    getPageId() {
        return +this.props.match.params.page;
    }

    componentDidMount() {
        if (isNaN(this.getPageId())) this.returnToAdminPage();

        fetch(ADMIN_API_BASE + "/doc/id/" + this.getPageId())
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({data: JSON.stringify(JSON.parse(data["content"]), null, 4)});
            })
            .catch(() => {
                this.setState({data: "Page " + this.getPageId() + " not found"});
                this.returnToAdminPage();
            });
    }

    render() {
        return (
            <ContentBox>
                <AceEditor
                    mode="json"
                    theme="github"
                    value={this.state.data}
                    style={{"width": "100%", "height": "80vh"}}
                    onChange={(e) => {
                        this.setState({data: e.target.value})
                    }}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{$blockScrolling: true}}
                />
                <p>
                    <FlatButton onClick={this.submitChanges.bind(this)}>Submit</FlatButton>
                    <FlatButton onClick={this.deleteContent.bind(this)}>Delete</FlatButton>
                    <FlatButton onClick={this.returnToAdminPage.bind(this)}>Cancel</FlatButton>
                    <a href={"/" + this.getPageId()}><FlatButton>Goto that page</FlatButton></a>
                </p>
            </ContentBox>
        );
    }

    returnToAdminPage() {
        this.props.history.push("/admin/");
    }

    deleteContent() {
        fetch(ADMIN_API_BASE + "/doc/id/" + this.getPageId(), {
            method: 'DELETE',
            headers: this.getRequestHeader(),
        }).then((response) => {
            this.returnToAdminPage();
        });
    }

    submitChanges() {
        fetch(ADMIN_API_BASE + "/doc/id/" + this.getPageId(), {
            method: 'PUT',
            headers: this.getRequestHeader(),
            body: JSON.stringify(JSON.stringify(JSON.parse(this.state.data)))
        }).then((response) => {
            this.returnToAdminPage();
        });
    }
}

export default withRouter(EditDoc);
