import React, { useEffect } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import InventoryDelete from './InventoryDelete.js'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

function InventoryTable() {
    
    const [posts, setPosts] = React.useState([])
    const [open, setOpen] = React.useState(false)
    const [deleteID, setDeleteID] = React.useState('')

    // load database entries when page loads
    useEffect(() => listItems(), [])

    const handleClickOpen = (post_id) => {
      setOpen(true);
      setDeleteID(post_id)
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    const listItems = () => {axios.get('http://localhost:8000/api/item', {headers: {"Authorization":"Bearer " + Cookies.get("token")}})
                            .then(response =>{
                                setPosts(response.data)
                            })
                            .catch(error=>{
                                console.log(error)
                            })
                        }

    const handleSoldClick = (item_id) => {
        deleteRequest(item_id)
    }
    
    const deleteRequest = (item_id) => {
        axios.post("http://localhost:8000/api/item/updatestatus", {"_id": item_id}, {headers: {"Authorization":"Bearer " + Cookies.get("token")}})
        .then(response => {
            console.log(response)
            listItems()
        })
        .catch(error =>{
            console.log(error)
        })
    }

    return (
            <TableContainer>
                <Table aria-label="simple table" style={{minWidth:650}}>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Category</b></TableCell>
                            <TableCell align="left"><b>Brand</b></TableCell>
                            <TableCell align="left"><b>Description</b></TableCell>
                            <TableCell align="right"><b>Size</b></TableCell>
                            <TableCell align="left"><b>Condition</b></TableCell>
                            <TableCell align="left"><b>Status</b></TableCell>
                            <TableCell align="center"><b></b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts.map(item=> <TableRow key={item._id}> 
                                            <TableCell align="left"> {item.category} </TableCell>
                                            <TableCell align="left"> {item.brand} </TableCell>
                                            <TableCell align="left"> {item.description} </TableCell>
                                            <TableCell align="right"> {item.size} </TableCell>
                                            <TableCell align="left"> {item.condition} </TableCell>
                                            <TableCell align="left"> 
                                                <IconButton size="small" onClick={() => handleSoldClick(item._id)}>
                                                    <AttachMoneyIcon/>{item.sold ? "sold" : "unsold" }
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="center"> 
                                                <IconButton size="small"><EditIcon /></IconButton> 
                                                <IconButton size="small" onClick={() => handleClickOpen(item._id)}><DeleteIcon /></IconButton>
                                            
                                            
                                            </TableCell>
                                            </TableRow>)
                        }
                    </TableBody>
                </Table>
                            
                <InventoryDelete 
                    open={open}
                    handleClose={handleClose}
                    post_id={deleteID}>
                </InventoryDelete>
            </TableContainer>
        
    )
}

export default InventoryTable