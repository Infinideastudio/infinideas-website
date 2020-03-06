import React from 'react';
import ContentBox from "../components/ContentBox";
import Section from "../components/Section";
import { withRouter } from "react-router-dom";

class IndexPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    componentDidMount() {
        const pageName = this.props.match.params["page"] ? this.props.match.params["page"] : "Index";
        const _this = this;
        fetch(pageName+".json")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                _this.setState({data: data});
            })
            .catch(()=>{
                _this.setState({data: {"Main":{"Lines":["Page \""+pageName+"\" not found"]}, "Sections":[]}});
            });
    }

    arrayToHtml(arr){
        return arr.map((value) => {
            return <p>{value}</p>
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
