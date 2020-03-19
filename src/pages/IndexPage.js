import React from 'react';
import ContentBox from "../components/ContentBox";
import Section from "../components/Section";
import { withRouter } from "react-router-dom";
import {API_BASE} from "../Settings";

class IndexPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    componentDidMount() {
        const pageName = this.props.location.pathname !== "/" ? encodeURIComponent(this.props.location.pathname.substr(1)) : "index";
        const _this = this;
        const requestPath = API_BASE + "/doc" + (isNaN(pageName)? "/name/" + pageName : "/id/" + (+pageName));

        fetch(requestPath)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data[0]["content"]);
                _this.setState({data: JSON.parse(data[0]["content"])});
            })
            .catch(()=>{
                _this.setState({data: {"Main":{"Lines":["Page \""+pageName+"\" not found"]}, "Sections":[]}});
            });
    }

    arrayToHtml(arr){
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

                {this.state.data["Sections"].map((value) => {
                    return (
                    <Section name={value["Primary"]["Text"]} link={value["Primary"]["Address"]} description={value["Description"]}>
                        {this.arrayToHtml(value["Comments"])}
                        {
                            value["Links"].map((link) => {
                                return <a target="_blank" rel="noopener noreferrer" href={link["Address"]}>{link["Text"]}</a>
                            })
                        }
                    </Section>);
                })
                }
            </div>
        );
    }
}

export default withRouter(IndexPage);
