import React from 'react';
import ContentBox from "../components/ContentBox";
import Section from "../components/Section";
import { withRouter } from "react-router-dom";
import {API_BASE} from "../Settings";

class ContentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    componentDidMount() {
        const pageName = this.props.location.pathname !== "/" ? encodeURIComponent(this.props.location.pathname.substr(1)) : "index";
        const requestPath = API_BASE + "/doc" + (isNaN(pageName)? "/name/" + pageName : "/id/" + (+pageName));

        fetch(requestPath)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(Array.isArray(data)) data = data[0];
                this.setState({data: JSON.parse(data["content"])});
            })
            .catch((err)=>{
                console.error(err);
                this.setState({data: {"Main":{"Lines":["Page \""+pageName+"\" not found"]}, "Sections":[]}});
            });
    }

    arrayToHtml(arr){
        if(!arr) return (<p/>)
        return arr.map((value, i) => {
            return <p key={i}>{value}</p>
        });
    }

    render() {
        if(Object.keys(this.state.data).length === 0) return (<div/>);
        return (
            <div>
                <ContentBox>
                    {this.arrayToHtml(this.state.data["Main"]["Lines"])}
                </ContentBox>

                {
                    this.state.data["Sections"]?
                        (this.state.data["Sections"].map((value, i) => {
                    return (
                    <Section key={i} name={value["Primary"]["Text"]} link={value["Primary"]["Address"]} description={value["Description"]}>
                        {this.arrayToHtml(value["Comments"])}
                        {
                            value["Links"].map((link, j) => {
                                return <a key={j} target="_blank" rel="noopener noreferrer" href={link["Address"]}>{link["Text"]}</a>
                            })
                        }
                    </Section>);})):(<div/>)
                }
            </div>
        );
    }
}

export default withRouter(ContentPage);
