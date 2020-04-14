import React from 'react';
import {withRouter} from "react-router-dom";
import Base from "./Base";
import {ADMIN_API_BASE} from "./Settings";

class EditDoc extends Base {
    constructor(props) {
        super(props);
        this.state = {
            data: "Loading..."
        };
    }

    getPageId(){
        return +this.props.match.params.page;
    }

    componentDidMount() {
        if(isNaN(this.getPageId())) this.returnToAdminPage();

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
            <div>
                <textarea style={{"width":"80%","height":"80vh"}}
                          value={this.state.data}
                          onChange={(e)=>{this.setState({data: e.target.value})}} />
                <p>
                    <button onClick={this.submitChanges.bind(this)}>Submit</button>
                    <button onClick={this.deleteContent.bind(this)}>Delete</button>
                    <button onClick={this.returnToAdminPage.bind(this)}>Cancel</button>
                    <a href={"/"+this.getPageId()}>Goto that page</a>
                </p>
            </div>
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
