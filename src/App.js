import React from 'react';
import styled from "styled-components";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from "./pages/LoginPage";
import AdminApp from "./apps/admin/App"
import ViewDocApp from './apps/document/App';

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
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/admin">
                    <AdminApp />
                </Route>
                <Route path="/:page">
                    <ViewDocApp />
                </Route>
                <Route>
                    <ViewDocApp />
                </Route>
            </Switch>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <BrowserRouter basename={getBasename()}>
                <PageContainer>
                    <Header />
                    <AppMux />
                    <Footer />
                </PageContainer>
            </BrowserRouter>
        );
    }
}

export default App;
