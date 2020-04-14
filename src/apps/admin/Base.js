import React from 'react';
import Cookies from "universal-cookie";

class Base extends React.Component {
    constructor(props) {
        super(props);
        if (new Cookies().get("credential") === undefined)
            this.props.history.push("/login");
    }

    getRequestHeader(){
        return {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + new Cookies().get("credential")
        };
    }

    returnToAdminPage() {
        this.props.history.push("/admin/");
    }
}

export default Base;
