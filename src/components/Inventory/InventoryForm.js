import React, { useEffect } from 'react'
import Axios from 'axios'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Cookies from 'js-cookie'
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';

function InventoryForm({action, post_id, listItems, onClose, handleOpenAlert}) { 

    const [fields, setFields] = React.useState({type:'',
                                                category: '',
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

    useEffect(() => {
        // Update the document title using the browser API
        if (post_id) {
            setFields(post_id)
        }}, [])

          
    const handleSubmitCreate = (event) => {
        handleOpenAlert("Your item has been created!")

        Axios.post("http://localhost:8000/api/item",  fields, {headers: {"Authorization":"Bearer " + Cookies.get("token")}})
        .then(response => {
            event.preventDefault()            
            onClose()
            listItems()
            console.log(response)
        })
        .catch(error =>{
            console.log(error)
        })
    }

    const handleSubmitEdit = (event) => {
        handleOpenAlert("Your item has been edited!")

        Axios.put("http://localhost:8000/api/item",  fields, {headers: {"Authorization":"Bearer " + Cookies.get("token")}})
        .then(response => {
            event.preventDefault()            
            onClose()
            listItems()
            console.log(response)
        })
        .catch(error =>{
            console.log(error)
        })    }

    const handleSubmit = (event) => {
        event.preventDefault()            
        if (action == "create") {
            handleSubmitCreate(event)
        }
        if (action == "edit") {
            handleSubmitEdit(event)
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <div>

                <FormControl style={{minWidth: 250}}>

                    <InputLabel id="demo-dialog-select-label">Category</InputLabel>

                    <Select
                    label="Category"
                    onChange={changeHandler}
                    name="category"
                    value={fields.category}
                    input={<Input/>}>

                    <MenuItem value={fields.category}>
                    <em>{fields.category}</em>
                    </MenuItem>
                    <MenuItem value={"Shoe"}>Shoe</MenuItem>
                    <MenuItem value={"Clothing"}>Clothing</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                    </Select>

                </FormControl>

                <div>
                <TextField fullWidth id="standard-basic" label="Brand" name="brand" value={fields.brand} onChange={changeHandler}></TextField>
                </div>

                <div>
                <TextField fullWidth id="standard-basic" label="Description" name="description" value={fields.description} onChange={changeHandler}></TextField>
                </div>

                <div>
                    {fields.category === '' && <TextField fullWidth id="standard-basic" label="Size" name="size" value={fields.size} onChange={changeHandler}></TextField>}

                    {fields.category === 'Shoe' && 
                    <FormControl style={{minWidth: 250}}>

                        <InputLabel id="demo-dialog-select-label">Size</InputLabel>

                        <Select
                        label="Size"
                        onChange={changeHandler}
                        name="size"
                        value={fields.size}
                        input={<Input/>}>
    
                        <MenuItem value={fields.size}>
                        <em>{fields.size}</em>
                        </MenuItem>
                        <MenuItem value={"7"}>7</MenuItem>
                        <MenuItem value={"9"}>8</MenuItem>
                        <MenuItem value={"9"}>9</MenuItem>
                        <MenuItem value={"10"}>10</MenuItem>
                        <MenuItem value={"11"}>11</MenuItem>
                        <MenuItem value={"12"}>12</MenuItem>
                        </Select>
                    
                    </FormControl>

                    }
                    {fields.category === 'Clothing' && 
                    <FormControl style={{minWidth: 250}}>

                        <InputLabel id="demo-dialog-select-label">Size</InputLabel>

                        <Select
                        label="Size"
                        onChange={changeHandler}
                        name="size"
                        value={fields.size}
                        input={<Input/>}>
    
                        <MenuItem value={fields.size}>
                        <em>{fields.size}</em>
                        </MenuItem>
                        <MenuItem value={"S"}>S</MenuItem>
                        <MenuItem value={"M"}>M</MenuItem>
                        <MenuItem value={"L"}>L</MenuItem>
                        <MenuItem value={"XL"}>XL</MenuItem>
                        </Select>
                    
                    </FormControl>
                    }
                </div>

                <FormControl style={{minWidth: 250}}>

                    <InputLabel id="demo-dialog-select-label">Condition</InputLabel>

                    <Select
                    label="Condition"
                    onChange={changeHandler}
                    name="condition"
                    value={fields.condition}
                    input={<Input/>}>

                    <MenuItem value={fields.condition}>
                    <em>{fields.condition}</em>
                    </MenuItem>
                    <MenuItem value={"Deadstock"}>Deadstock</MenuItem>
                    <MenuItem value={"VNDS"}>VNDS</MenuItem>
                    <MenuItem value={"Used"}>Used</MenuItem>
                    </Select>

                </FormControl>
    
            </div>
            <Grid container justify="center">
                <Grid item>
                    <Button variant="outlined" type="cancel" style={{"margin-top":20, "margin-right":20}} onClick={(event) => { event.preventDefault(); onClose()}}>
                    Cancel
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" type="submit" style={{"margin-top":20}}>
                    Submit
                    </Button>
                </Grid>
            </Grid>
            
        </form>
    )
    
}

export default InventoryForm 