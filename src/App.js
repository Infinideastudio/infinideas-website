import React, { Suspense, lazy } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import styled from "styled-components";
import Header from './components/Header';
import Footer from './components/Footer';

const LoginApp = lazy(() => import('./apps/login/App'));
const AdminApp = lazy(() => import('./apps/admin/App'));
const ViewDocApp = lazy(() => import('./apps/document/App'));

const getBasename = () => {
    return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

const PageContainer = styled.div`
    position: relative;
    min-height: 100vh;
    padding-bottom: 10em;
`;

class AppMux extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/login" component={LoginApp}/>
                <Route path="/admin" component={AdminApp}/>
                <Route path="/:page" component={ViewDocApp}/>
                <Route component={ViewDocApp}/>
            </Switch>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <Router basename={getBasename()}>
                <PageContainer>
                    <Header/>
                    <Suspense fallback={<div/>}>
                        <AppMux/>
                    </Suspense>
                    <Footer/>
                </PageContainer>
            </Router>
        );
    }
}

export default App;
