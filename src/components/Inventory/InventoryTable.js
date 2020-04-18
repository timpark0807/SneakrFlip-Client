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
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InventoryDelete from './InventoryDelete.js'
import {CSSTransition, TransitionGroup} from 'react-transition-group' 
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import MoneyOffIcon from '@material-ui/icons/MoneyOff';

function InventoryTable({listItems, posts, handleOpenAlert, setMessageAlert}) {
    
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


    const handleSoldClick = (item_id) => {
        deleteRequest(item_id)
    }
    
    const deleteRequest = (item_id) => {
        setMessageAlert("The status of your item has been changed!")
        handleOpenAlert()
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
                            <TableCell align="left"><b>Category</b></TableCell>
                            <TableCell align="left"><b>Brand</b></TableCell>
                            <TableCell align="left"><b>Description</b></TableCell>
                            <TableCell align="center"><b>Size</b></TableCell>
                            <TableCell align="left"><b>Condition</b></TableCell>
                            <TableCell align="center"><b>Options</b></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {posts.map(item=> 
                                            <TableRow key={item._id}> 
                                            <TableCell align="left"> {item.category} </TableCell>
                                            <TableCell align="left"> {item.brand} </TableCell>
                                            <TableCell align="left"> {item.description} </TableCell>
                                            <TableCell align="center"> {item.size} </TableCell>
                                            <TableCell align="left"> {item.condition} </TableCell>
                                           
                                            <TableCell align="center"> 
                                                <IconButton size="small" onClick={() => handleSoldClick(item._id)}>
                                                    {item.sold ? <AttachMoneyIcon/> : <MoneyOffIcon/>}
                                                </IconButton>
                                                <IconButton size="small"><EditIcon /></IconButton> 
                                                <IconButton size="small" onClick={() => handleClickOpen(item._id)}><DeleteIcon /></IconButton>
                                        
                                            </TableCell>
                                            </TableRow>
                                          
                                            
                                            
                                            )
                        }

                    </TableBody>
  
                </Table>
                            
                <InventoryDelete 
                    open={open}
                    handleClose={handleClose}
                    post_id={deleteID}
                    listItems={listItems}
                    handleOpenAlert={handleOpenAlert}
                    setMessageAlert={setMessageAlert}             
                    >
                </InventoryDelete>
            </TableContainer>
        
    )
}

export default InventoryTable