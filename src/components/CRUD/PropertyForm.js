import React, { Component } from 'react'
import Axios from 'axios'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Cookies from 'js-cookie'

class PropertyForm extends Component { 

    constructor(props) {
        super(props)
        this.state = {
            address: '',
            zipcode: '',
            price: '',
            category:''
        }
    }  

    changeHandler = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit = event => {
        console.log(Cookies.get("token"))
        console.log(Cookies.get("token"))
        Axios.post("http://localhost:8000/api/property",  this.state, {headers: {"Authorization":"Bearer " + Cookies.get("token")}})
        .then(response => {
            console.log(response)
        })
        .catch(error =>{
            console.log(error)
        })
    }


    render () {
        const { address, zipcode, price, category } = this.state

        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <div>
                    <TextField id="standard-basic" label="Address" name="address" value={address} onChange={this.changeHandler}></TextField>
                    </div>

                    <div>
                    <TextField id="standard-basic" label="Zipcode" name="zipcode" value={zipcode} onChange={this.changeHandler}></TextField>
                    </div>

                    <div>
                    <TextField id="standard-basic" label="Purchase Price" name="price" value={price} onChange={this.changeHandler}></TextField>
                    </div>
                    <div>
                    <TextField id="standard-basic" label="Category" name="category" value={category} onChange={this.changeHandler}></TextField>
                    </div>
       
                </div>
                <Button variant="contained" color="primary" type="submit" style={{"margin-top":20}}>
                Submit
                </Button>
            </form>
        )
    }
}

export default PropertyForm 