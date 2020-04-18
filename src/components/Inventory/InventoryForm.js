import React from 'react'
import Axios from 'axios'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import Cookies from 'js-cookie'
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

function InventoryForm({listItems, onClose, handleOpenAlert}) { 

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

    const handleSubmit = (event) => {
        Axios.post("http://localhost:8000/api/item",  fields, {headers: {"Authorization":"Bearer " + Cookies.get("token")}})
        .then(response => {
            event.preventDefault()            
            onClose()
            handleOpenAlert("Your item has been created!")
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

                <FormControl style={{minWidth: 160}}>

                    <InputLabel id="demo-dialog-select-label">Category</InputLabel>

                    <Select
                    label="Category"
                    onChange={changeHandler}
                    name="category"
                    input={<Input/>}>

                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Shoe"}>Shoe</MenuItem>
                    <MenuItem value={"Clothing"}>Clothing</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                    </Select>

                </FormControl>

                <div>
                <TextField id="standard-basic" label="Brand" name="brand" value={fields.brand} onChange={changeHandler}></TextField>
                </div>

                <div>
                <TextField id="standard-basic" label="Description" name="description" value={fields.description} onChange={changeHandler}></TextField>
                </div>

                <div>
                    {fields.category === '' && <TextField id="standard-basic" label="Size" name="size" value={fields.size} onChange={changeHandler}></TextField>}

                    {fields.category === 'Shoe' && 
                    <FormControl style={{minWidth: 160}}>

                        <InputLabel id="demo-dialog-select-label">Size</InputLabel>

                        <Select
                        label="Size"
                        onChange={changeHandler}
                        name="size"
                        input={<Input/>}>
    
                        <MenuItem value="">
                        <em>None</em>
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
                    <FormControl style={{minWidth: 160}}>

                        <InputLabel id="demo-dialog-select-label">Size</InputLabel>

                        <Select
                        label="Size"
                        onChange={changeHandler}
                        name="size"
                        input={<Input/>}>
    
                        <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        <MenuItem value={"S"}>S</MenuItem>
                        <MenuItem value={"M"}>M</MenuItem>
                        <MenuItem value={"L"}>L</MenuItem>
                        <MenuItem value={"XL"}>XL</MenuItem>
                        </Select>
                    
                    </FormControl>
                    }
                </div>

                <FormControl style={{minWidth: 160}}>

                    <InputLabel id="demo-dialog-select-label">Condition</InputLabel>

                    <Select
                    label="Condition"
                    onChange={changeHandler}
                    name="condition"
                    input={<Input/>}>

                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Deadstock"}>Deadstock</MenuItem>
                    <MenuItem value={"VNDS"}>VNDS</MenuItem>
                    <MenuItem value={"USED"}>Used</MenuItem>
                    </Select>

                </FormControl>
    
            </div>
            <Button variant="contained" color="primary" type="submit" style={{"margin-top":20}}>
            Submit
            </Button>
        </form>
    )
    
}

export default InventoryForm 