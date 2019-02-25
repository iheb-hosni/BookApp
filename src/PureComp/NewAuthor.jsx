import React, { Component } from "react";
import axios from "axios";

class NewAuthor extends Component{
 constructor(props){
   super(props);
   this.state={
    name:"",
    familyname:"",
    birthday:"",
   }
 }
 handleInputChange = event => {
  const target = event.target;
  const value = target.type === "checkbox" ? target.checked : target.value;
  const name = target.name;

  this.setState({
    [name]: value
  });
};
 handleAddAuthor =(e)=>{
  e.preventDefault()
  console.log(this.state)
  axios.post(`http://localhost:3000/api/Authors`
  ,{
   
    name:this.state.name,
    familyname:this.state.familyname,
    birthday:this.state.birthday,
   
  }).then(res=>res.data)
  .catch(err=>alert(err))
}
    render(){
        return(
            <div>
            <form onSubmit={this.handleAddAuthor}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            placeholder="please enter the author Name"
            onChange={this.handleInputChange}

           
          />
        </label>
        <br />
        <label>
          Family Name:
          <input
            type="text"
            name="familyname"
            placeholder="please enter the author FamilyName"
            onChange={this.handleInputChange}
            
          />
        </label>
        <br />
        <label>
          birthday:
          <input
            type="date"
            name="birthday"
            onChange={this.handleInputChange}
            
          />
        </label>
        <br />
       
        <br />
       
        <input type="submit" className="btn btn-primary"/>
        <input type="button" className="btn btn-primary" value="edit"/>
      </form>
            </div>
        )
    }
}
export default NewAuthor