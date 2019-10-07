import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles'; // import without use
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton'; // import without use
import MenuIcon from '@material-ui/icons/Menu'; // import without use
import Button from '@material-ui/core/Button';

import { Redirect } from 'react-router-dom';



export default class MenuAppBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            redirectToReferrer: false
        }
    }


    logout = () => {
        localStorage.clear();
        this.setState({ redirectToReferrer: true });
    }

    render() {
        const { redirectToReferrer } = this.state

        if (redirectToReferrer) {
            return (<Redirect to={'/login'} />)
        }

        return (
            <div>
                <AppBar position="static" className="appBar">
                    <Toolbar>
                        <Typography variant="h6" >
                            TODO APP
                         </Typography>

                        <div className="logoutContainer">
                            <Button className="logoutBtn" variant="contained" onClick={this.logout}>
                                Logout
                                </Button>
                        </div>

                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

