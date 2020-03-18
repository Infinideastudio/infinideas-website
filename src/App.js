import React from 'react';
import styled from "styled-components";
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import AdminContentPage from "./pages/AdminContentPage";

const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};

const PageContainer = styled.div`
    position: relative;
    min-height: 100vh;
    padding-bottom: 10em;
`;

class App extends React.Component {
  render() {
    return (
        <BrowserRouter basename={getBasename()}>
            <PageContainer>
            <Header />
            <Switch>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/admin/:page">
                    <AdminContentPage />
                </Route>
                <Route path="/admin">
                    <AdminPage />
                </Route>
                <Route path="/:page">
                    <IndexPage />
                </Route>
                <Route>
                    <IndexPage />
                </Route>
            </Switch>
            <Footer />
            </PageContainer>
        </BrowserRouter>
    );
  }
}

export default App;
