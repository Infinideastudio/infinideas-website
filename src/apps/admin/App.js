import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ListDoc from "./ListDoc";
import EditDoc from "./EditDoc";
import NewDoc from "./NewDoc";

class App extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/admin/new">
                    <NewDoc />
                </Route>
                <Route path="/admin/:page">
                    <EditDoc />
                </Route>
                <Route path="/admin">
                    <ListDoc />
                </Route>
            </Switch>
        );
    }
}

export default App;
