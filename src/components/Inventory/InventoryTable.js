import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Cookies from 'js-cookie'
import Container from '@material-ui/core/Container'
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
import InventoryEdit from './InventoryEdit.js'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import { Typography } from '@material-ui/core';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import './styles.css';
import Grid from '@material-ui/core/Grid';

function InventoryTable({listItems, posts, handleOpenAlert}) {
    
    const [openDelete, setOpenDelete] = React.useState(false)
    const [openEdit, setOpenEdit] = React.useState(false)
    const [deleteID, setDeleteID] = React.useState('')
    const [editID, setEditID] = React.useState('')

    // load database entries when page loads
    useEffect(() => listItems(), [])

    const handleClickOpen = (post_id) => {
      setOpenDelete(true)
      setDeleteID(post_id)
    };
  
    const handleClickEdit = (post_id) => {
        setOpenEdit(true)
        setEditID(post_id)
      };
        
    const handleClose = () => {
      setOpenDelete(false)
      setOpenEdit(false)
    };

    const handleClickSold = (item_id) => {
        handleOpenAlert("The status of your item has been changed!")
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
                {posts &&
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

                    <TransitionGroup component="tbody">

                    {posts.map(item=> 
                                <CSSTransition
                                key={item._id}
                                timeout={500}
                                classNames="item"
                                >
                                    <TableRow key={item._id}> 
                                    <TableCell align="left"> {item.category} </TableCell>
                                    <TableCell align="left"> {item.brand} </TableCell>
                                    <TableCell align="left"> {item.description} </TableCell>
                                    <TableCell align="center"> {item.category!= "Other" ? item.size : "-"} </TableCell>
                                    <TableCell align="left"> {item.condition} </TableCell>
                                    
                                    <TableCell align="center"> 
                                        <IconButton size="small" onClick={() => handleClickSold(item._id)}>
                                            {item.sold ? <AttachMoneyIcon/> : <MoneyOffIcon/>}
                                        </IconButton>
                                        <IconButton size="small" onClick={() => handleClickEdit(item)}><EditIcon /></IconButton> 
                                        <IconButton size="small" onClick={() => handleClickOpen(item._id)}><DeleteIcon /></IconButton>
                                
                                    </TableCell>
                                    </TableRow>        
                                 </CSSTransition>
                            )
                        }

                    </TransitionGroup>
                </Table>

            }
            {!posts &&
            <Container>
            <Typography style={{marginTop:20}} align="center">
                It looks like you have no inventory 
                <SentimentVeryDissatisfiedIcon style={{paddingTop:10}}/>
            </Typography>
            <Typography style={{marginTop:8}} align="center">
                Let's get started! Click the create icon.
            </Typography>        
            </Container>
        }

                <InventoryEdit
                    openEdit={openEdit}
                    handleClose={handleClose}
                    post_id={editID}
                    listItems={listItems}
                    handleOpenAlert={handleOpenAlert}
                    >    
                </InventoryEdit>    
                <InventoryDelete 
                    openDelete={openDelete}
                    handleClose={handleClose}
                    post_id={deleteID}
                    listItems={listItems}
                    handleOpenAlert={handleOpenAlert}
                    >
                </InventoryDelete>

            </TableContainer>
        
    )
}

export default InventoryTable