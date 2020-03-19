import React from 'react';
import ContentBox from "../components/ContentBox";
import Section from "../components/Section";
import {withRouter} from "react-router-dom";
import Cookies from "universal-cookie";
import {API_BASE} from "../Settings";

class AdminContentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "Loading..."
        };
        if (new Cookies().get("credential") === undefined)
            this.props.history.push("/login");
    }

    getPageId(){
        return +this.props.match.params.page;
    }

    componentDidMount() {
        const _this = this;
        fetch(API_BASE + "/doc/id/" + this.getPageId())
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                _this.setState({data: JSON.stringify(JSON.parse(data["content"]), null, 4)});
            })
            .catch(() => {
                _this.setState({data: "Page " + this.getPageId() + " not found"});
            });
    }

    render() {
        return (
            <div>
                <textarea style={{"width":"80%","height":"80vh"}}
                          value={this.state.data}
                          onChange={(e)=>{this.setState({data: e.target.value})}} />
                <p>
                    <button onClick={this.submitChanges}>Submit</button>
                    <button onClick={this.deleteContent}>Delete</button>
                    <button onClick={this.returnToAdminPage}>Cancel</button>
                </p>
            </div>
        );
    }

    returnToAdminPage() {
        this.props.history.push("/admin/");
    }

    deleteContent() {
        let init = {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + new Cookies().get("credential")
            }
        };
        fetch(API_BASE + "/doc/id/" + this.getPageId(), init)
            .then((response) => {this.returnToAdminPage()});
    }

    submitChanges() {
        let init = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + new Cookies().get("credential")
            },
            body: JSON.stringify(this.state.data)
        };
        fetch(API_BASE + "/doc/id/" + this.getPageId(), init)
            .then((response) => {this.returnToAdminPage()});
    }
}

export default withRouter(AdminContentPage);
