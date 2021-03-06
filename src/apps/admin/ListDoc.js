import React from 'react';
import {withRouter} from "react-router-dom";
import Base from "./Base";
import {ADMIN_API_BASE} from "./Settings";

class ListDoc extends Base {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    componentDidMount() {
        fetch(ADMIN_API_BASE + "/doc/list", {
            method: 'get',
            headers: this.getRequestHeader()
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({data: data})
            })
            .catch(() => {
            });

    }

    render() {
        if(Object.keys(this.state.data).length === 0) return (<div/>);
        return (
            <div style={{"textAlign":"center"}}>
                <p><a href={"/admin/new"}>* New Page *</a></p>
                {
                    this.state.data.map((value, i) => {
                        return (<p key={i}><a href={"/admin/"+value.id}>{value.id+": "+value.name.replace("$", "/")}</a></p>);
                    })
                }
            </div>
        );
    }
}

export default withRouter(ListDoc);
