import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AppIcon from '../images/brain.png'
import axios from 'axios'
import {Link} from 'react-router-dom'

//MUI
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
form:{
    textAlign: 'center'
},
logo:{
    margin: '20px auto 15px auto',
    width: 50,
},

pageTitle:{
    fontSize: 30,
    margin: '10px auto 10px auto'
},

TextField:{
    margin: '10px auto 10px auto'
},
button:{
    marginTop: 20,
    position: 'relative'
},
customError:{
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
},

progress:{
    position: 'absolute'
}

}

export class login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: []
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({
            loading: true,
        })
        const userData = {
            email: this.state.email,
            password: this.state.password,
        }
        axios.post('/login', userData)
            .then(res => {
                console.log(res.data)
                this.setState({
                    loading: false
                })
                this.props.history.push('/')
            }).catch(err => {
                this.setState({
                    errors: err.response.data,
                    loading: false
                })
            })
    }
   
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        const {classes} = this.props
        const {errors, loading} = this.state;
        return (
            <Grid container className={classes.form} spacing ={10}>
                <Grid item sm/>                 
                <Grid item sm>
                    <img src={AppIcon} className={classes.logo} alt="logo"></img>
                    <Typography variant="h3" className={classes.pageTitle}>Login</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name ="email" type="email" label="email"className={classes.TextField} helperText={errors.email} 
                        value={this.state.email} onChange={this.handleChange} error={errors.email ? true: false}fullWidth/>
                        <TextField id="password" name ="password" type="password" label="password"className={classes.TextField} helperText={errors.password} error={errors.password ? true: false}
                        value={this.state.password} onChange={this.handleChange} fullWidth/>
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                                </Typography>
                        )}
                        <Button type="submit" variant='contained' color="primary" className={classes.button} disabled={loading}>Login{loading && (<CircularProgress size={30}className={classes.progress}/>)}</Button>
                        <br></br>
                        <small>Don't have an account? sign up <Link to ='/signup'>here</Link></small>
                    </form>
                </Grid>
                <Grid item sm/>                    
            </Grid>

    );
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(login)

