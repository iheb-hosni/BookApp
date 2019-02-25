import React, { Component } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

class AuthorListElem extends Component{
constructor(props){
    super(props);
    this.state={
        authors:[],
        name:"",
        familyname:"",
        birthday:"",
        id:""
    }
}

async componentDidMount() {
    
    const response = await axios.get("http://localhost:3000/api/Authors"
    
    );
    if (response.status === 200) {
      var authors = [];
      response.data.map(prop => {
        var author = {       
          name: prop.name,
          birthday:prop.birthday,
          familyname: prop.familyname,
          id:prop.id
        };
        authors.push(author);
       
        
      });
      
   
      this.setState({ authors: authors });
    } else {
      // handle error
      console.log(response.status);
    }
    
  }
  render() {
    return(
<div>
<ul> 
            {this.state.authors.map(el => {
              return <li><Link to={`/authorbooks/${el.id}`}>{el.name} {el.familyname}</Link></li>;
              
            })}
          </ul>
</div>
    )
}
}

export default AuthorListElem