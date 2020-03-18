import React from 'react';
import ContentBox from "../components/ContentBox";
import Section from "../components/Section";
import {withRouter} from "react-router-dom";
import Cookies from "universal-cookie";
import {API_BASE} from "../Settings";

class AdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
        if (new Cookies().get("credential") === undefined)
            this.props.history.push("/login");
    }

    componentDidMount() {
        const _this = this;
        fetch(API_BASE + "/static/list", {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + new Cookies().get("credential")
            }})
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
                {
                    this.state.data.map((value, i) => {
                        return (<p key={i}><a href={"/admin/"+value.id}>{value.id+": "+value.name}</a></p>);
                    })
                }
            </div>
        );
    }
}

export default withRouter(AdminPage);
