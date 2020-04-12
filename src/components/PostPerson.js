import React, { Component } from 'react';
import axios from 'axios'


class PostPerson extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
          posts:[]
        }
      }
      
    componentDidMount() {
        axios.get('http://localhost:8000/api/people')
        .then(response =>{
            console.log(response)
            this.setState({posts: response.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
      
    render() {
        const {posts} = this.state
        return (
            <div>
                List Of People 
                {
                    posts.length ?
                    posts.map(post=> <div key={post.ss}>{post.firstname}</div>) :
                    null
                }
            </div>
        );
    }
}

export default PostPerson;