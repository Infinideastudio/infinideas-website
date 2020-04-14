import React from 'react';
import { withRouter } from "react-router-dom";
import Section from "./components/Section";
import ContentBox from "./components/ContentBox";
import { DOC_API_BASE } from "./Settings";
import Link from './components/Link';

const pTagHtml = (val, key) => <p key={key} dangerouslySetInnerHTML={{ __html: val }} />

const arrayToHtml = (arr) => arr ? arr.map(pTagHtml) : <p />

const contentHtml = (html) => <ContentBox>{pTagHtml(html, 0)}</ContentBox>

const contentLines = (lines) => <ContentBox>{arrayToHtml(lines)}</ContentBox>

const contentSection = (section, i) =>
    <Section key={i} primary={section.Primary} description={section.Description}>
        {arrayToHtml(section.Comments)}
        {section.Links.map((link, j) => <Link key={j} hyper={link} />)}
    </Section>

const contentSections = (sections) => sections.map(contentSection)

const content = (content) => {
    switch (content.Type) {
        case "Html": return contentHtml(content.Content)
        case "Lines": return contentLines(content.Content)
        case "Sections": return contentSections(content.Content)
        default: return <div/>
    }
}

const contents = (object) => {
    if (!object) return <div/>
    if (Array.isArray(object)) return object.length !== 0 ? object.map((value, i)=>content(value)) : <div/>
    return content(object)
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }

    componentDidMount() {
        const pageName = this.props.location.pathname !== "/" ? this.props.location.pathname.substr(1) : "index";
        const requestPath = DOC_API_BASE + (isNaN(pageName) ? "/name/" + pageName.replace("/", "$") : "/id/" + (+pageName));

        fetch(requestPath)
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) data = data[0];
                this.setState({ data: JSON.parse(data["content"]) });
            })
            .catch((err) => {
                console.error(err);
                this.setState({ data: [ {"Type":"Lines", "Content":["Page \"" + pageName + "\" not found"]}]});
            });
    }

    render() {
        return contents(this.state.data);
    }
}

export default withRouter(App);
