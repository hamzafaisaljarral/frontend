import React from 'react';
import { toast } from 'react-toastify'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';


class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            email: '',
            password: '',
            redirectToReferrer: false


        }
        this.register = this.register.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount = () => {




    }

    register = () => {
        let { userName, password, email } = this.state
        fetch('https://engine-staging.viame.ae/assessment/users', {
            method: 'POST',
            body: JSON.stringify({
                users: {
                    email: email,
                    password: password
                }

            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(async response => {
            console.log("check", response);
            let resJson = await response.json()
            if (response.status == 500) {
                toast.error("user already exist");
            }
            else {

                toast.success("success");
                localStorage.email = resJson.email;
                localStorage.token = resJson.token;
                this.setState({ redirectToReferrer: true });

            }

            return response.json()

        }).catch(error => {
            toast.error("user already exist");
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value

        }, () => {
            
        })
    }


    render() {
        if (localStorage.token != null) {
            return (<Redirect to={'/todo'} />)
        }
        if (this.state.redirectToReferrer) {
            return (<Redirect to={'/todo'} />)
        }
        return (
            <div>  <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className="paperContainer">
                    <Avatar className="centerContent">
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography className="centerContent" component="h1" variant="h5">
                        Sign Up
                        </Typography>
                    <form noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="User name"
                            name="userName"
                            autoComplete="username"
                            autoFocus
                            value={this.state.userName}
                            onChange={this.handleChange}


                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={this.handleChange}
                            value={this.state.email}

                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={this.handleChange}
                            value={this.state.password}

                        />
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={this.register}
                        >
                            Sign Up
                            </Button>
                        <Grid container>

                        </Grid>
                    </form>
                </div>
            </Container></div>

        );

    }

}

export default Signup;