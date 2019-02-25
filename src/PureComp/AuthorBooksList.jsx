import React, { Component } from "react";
import axios from "axios";
 
class AuthorBook extends Component{
    constructor(props){
        super(props);
 this.state={
     authorBook:[],
     authorBookId:""
    //  params:this.props.match.params.id
      
 }
}
 
  async  componentDidMount (){
       
    let id=this.state.authorBook
    id=this.props.match.params.authorId
      
   const response= await axios.get('http://localhost:3000/api/Authors/'+id+'/mybooks',
    //  {
    //      params:{
    //          filter:{
    //              "limit":"5",
    //              "fields":"title"
    //          }
    //      }
    //  }
   )
      if(response.status===200){
        const authorsBook=[];
        response.data.map(el=>{
            const authorbooks={
                title:el.title,
                price:el.price
            }
            authorsBook.push(authorbooks)
            console.log(response.data)
        })
        this.setState({ authorBook:authorsBook });
    }
    else {alert (response.status)}
    
}
render(){
    console.log(this.props)

    return(
        <div>
<ul>
            {this.state.authorBook.map(el => {
              return <li>title:{el.title}<br/>
              </li>;
            })}
          </ul>
        </div>
    )
}
}
export default AuthorBook