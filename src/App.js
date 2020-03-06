import React from 'react';
import styled from "styled-components";
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import Header from './components/Header';
import Footer from './components/Footer';

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
