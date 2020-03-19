import React from 'react';
import {withRouter} from "react-router-dom";
import {API_BASE} from "../Settings";
import AuthenticatedPage from "../components/AuthenticatedPage";

class AdminNewContentPage extends AuthenticatedPage {
    constructor(props) {
        super(props);
        this.state = {
            data: "{}",
            pageName: "",
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <textarea style={{"width":"80%","height":"80vh"}}
                          value={this.state.data}
                          onChange={(e)=>{this.setState({data: e.target.value})}} />
                <p>
                    <input type="text" placeholder="Enter page name" name="name" onInput={e => this.setState({pageName: e.target.value})} required/>
                    <button onClick={this.createNewPage.bind(this)}>Create</button>
                    <button onClick={this.returnToAdminPage.bind(this)}>Cancel</button>
                </p>
            </div>
        );
    }

    createNewPage() {
        if(this.state.pageName==="") {
            alert("The page name can't be empty");
            return;
        }
        fetch(API_BASE + "/doc/name/" + encodeURIComponent(this.state.pageName), {
            method: 'POST',
            headers: this.getRequestHeader(),
            body: JSON.stringify(JSON.stringify(JSON.parse(this.state.data)))
        }).then((response) => {
            this.props.history.push("/" + this.state.pageName);
        });
    }
}

export default withRouter(AdminNewContentPage);
