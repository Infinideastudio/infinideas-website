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
        fetch(API_BASE + "/static/id/" + this.getPageId())
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
                </p>
            </div>
        );
    }

    deleteContent() {
        fetch(API_BASE + "/static/id/" + this.getPageId())
            .then((response) => {
                this.props.history.push("/admin/");
            });
    }

    submitChanges() {
        fetch(API_BASE + "/static/id/" + this.getPageId())
            .then((response) => {
                this.props.history.push("/admin/");
            });
    }
}

export default withRouter(AdminContentPage);
