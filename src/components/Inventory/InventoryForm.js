import React from 'react'
import Axios from 'axios'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Cookies from 'js-cookie'

function InventoryForm({listItems, onClose, handleOpenAlert, setMessageAlert}) { 

    const [fields, setFields] = React.useState({category: '',
                                                brand: '',
                                                description: '',
                                                size:'',
                                                condition:''
                                            })

    const changeHandler = (event) => {
            setFields({
                ...fields,
                [event.target.name] : event.target.value
            })
        }

    const handleSubmit = (event) => {
        Axios.post("http://localhost:8000/api/item",  fields, {headers: {"Authorization":"Bearer " + Cookies.get("token")}})
        .then(response => {
            event.preventDefault()
            setMessageAlert("Your item has been created!")
            
            onClose()

            handleOpenAlert()

            listItems()
            console.log(response)
        })
        .catch(error =>{
            console.log(error)
        })

    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                <TextField id="standard-basic" label="Category" name="category" value={fields.category} onChange={changeHandler}></TextField>
                </div>

                <div>
                <TextField id="standard-basic" label="Brand" name="brand" value={fields.brand} onChange={changeHandler}></TextField>
                </div>

                <div>
                <TextField id="standard-basic" label="Title" name="description" value={fields.description} onChange={changeHandler}></TextField>
                </div>

                <div>
                <TextField id="standard-basic" label="Size" name="size" value={fields.size} onChange={changeHandler}></TextField>
                </div>

                <div>
                <TextField id="standard-basic" label="Condition" name="condition" value={fields.condition} onChange={changeHandler}></TextField>
                </div>
    
            </div>
            <Button variant="contained" color="primary" type="submit" style={{"margin-top":20}}>
            Submit
            </Button>
        </form>
    )
    
}

export default InventoryForm 