import React, { Component } from 'react'
import Axios from 'axios'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'

class CreateForm extends Component { 

    constructor(props) {
        super(props)
        this.state = {
            ss: '',
            firstname: '',
            lastname: ''
        }
    }  

    changeHandler = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = event => {
        console.log(this.state)
        Axios.post("http://localhost:8000/api/people", this.state)
        .then(response => {
            console.log(response)
        })
        .catch(error =>{
            console.log(error)
        })
    }


    render () {
        const { ss, firstname, lastname } = this.state

        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <div>
                    <TextField id="standard-basic" label="Social Security" name="ss" value={ss} onChange={this.changeHandler}></TextField>
                    </div>

                    <div>
                    <TextField id="standard-basic" label="First Name" name="firstname" value={firstname} onChange={this.changeHandler}></TextField>
                    </div>

                    <div>
                    <TextField id="standard-basic" label="Last Name" name="lastname" value={lastname} onChange={this.changeHandler}></TextField>
                    </div>

                </div>
                <Button variant="contained" color="primary" type="submit">
                Submit
                </Button>
            </form>
        )
    }
}

export default CreateForm 