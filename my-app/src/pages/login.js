import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel'; // why this is here?
import Checkbox from '@material-ui/core/Checkbox'; // why this is here?
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box'; // why this is here?
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify'


/**
 * You declared a constant without using it.
 */
const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));



class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            redirectToReferrer: false

        }
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    /**
     * WHY YOU LEFT THIS HERE? If you aren't using it why you declare it?
     * Other thing, why you use arrow function?!
     */
    componentDidMount = () => {


    }

    login = () => {
        //  console.log("hello");
        let { password, email } = this.state
        fetch('https://engine-staging.viame.ae/assessment/login', {
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

            /**
             * Another bad pratice, left consoles in the system.
             * This is horrible and raises a lot browser memory.
             */
            console.log("check", response);


            let resJson = await response.json()
            if (resJson.error == true) {

                toast.error("Email or password incorrect");
            }
            else {

                toast.success("success");
                localStorage.email = resJson.email;
                localStorage.token = resJson.token;
                this.setState({ redirectToReferrer: true });

            }


            /**
             * Another bad pratice, left consoles in the system.
             * This is horrible and raises a lot browser memory.
             */
            console.log("ff", resJson);
        }).catch(error => {
            toast.error("user already exist");
        })

    }



    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value

        }, () => {
            /**
             * Another bad pratice, left consoles in the system.
             * This is horrible and raises a lot browser memory.
             */
            console.log("stgate: ", this.state)
        })
    }



    render() {
        if (this.state.redirectToReferrer) {
            return (<Redirect to={'/todo'} />)
        }

        if (localStorage.token != null) {
            return (<Redirect to={'/todo'} />)
        }
        return (
            <div>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className="paperContainer">
                        <Avatar className="centerContent">
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography className="centerContent" component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form  noValidate>
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
                                value = {this.state.email}

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
                                value = {this.state.password}

                            />
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={this.login}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
            </div>

        );

    }

}

export default Login;