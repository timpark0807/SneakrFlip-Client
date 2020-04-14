import React, { useState, useEffect } from 'react';
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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import Axios from 'axios'

function PropertyTable() {
    
    const [posts, setPosts] = React.useState([])
  
    useEffect(() => { axios.get('http://localhost:8000/api/property', {headers: {"Authorization":"Bearer " + Cookies.get("token")}})
                    .then(response =>{
                        setPosts(response.data)
                    })
                    .catch(error=>{
                        console.log(error)
                    }
                )
                })

    const handleDelete= (post_id) => {
        alert("http://localhost:8000/api/property/" + post_id)

          axios.delete("http://localhost:8000/api/property/" + post_id, {headers: {"Authorization":"Bearer " + Cookies.get("token")}})
          .then(response => {
              console.log(response)
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
                            <TableCell><b>Address</b></TableCell>
                            <TableCell align="right"><b>Zipcode</b></TableCell>
                            <TableCell align="right"><b>Price</b></TableCell>
                            <TableCell align="right"><b>Category</b></TableCell>
                            <TableCell align="center"><b></b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts.map(post=> <TableRow key={post._id}> 
                                            <TableCell> {post.address} </TableCell>
                                            <TableCell align="right"> {post.zipcode} </TableCell>
                                            <TableCell align="right"> {post.price} </TableCell>
                                            <TableCell align="right"> {post.category} </TableCell>
                                            <TableCell align="center"> 
                                                <IconButton size="small"><EditIcon /></IconButton> 
                                            
                                                <IconButton size="small" onClick={() => handleDelete(post._id)}><DeleteIcon /></IconButton>
                                            </TableCell>
                                            </TableRow>)
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        
    )
}

export default PropertyTable