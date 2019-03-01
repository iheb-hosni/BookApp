import React, { Component } from "react";

class BookListElem extends Component {
    
   render() {
     var image=this.props.image
     return (
       
      <div>
      <li>
      
          {/* {this.props.books.length && this.props.books.slice(this.props.start,this.props.end).map((item, i) => {
              return <div>
              <li className="comment" key={i}  >{item.title} {item.price}$  {item.isbn} </li>
              </div>
            })} */}
        {/* {this.props.idx} <br/> */}
        
        title: {this.props.title} <br/>
        price :{this.props.price}$  <br/>
        {/* image :{this.props.image} <br/> */} <br/>
      
        <img  src={'http://localhost:3000/api/photos/profil/download/' +image}  alt="bookpicture"/>
        <br/>
        
        <button className="btn"
          onClick={() => {
            this.props.handleDelete(this.props.idx , this.props.id);
          }}
        >
          X 
        </button>
        <button className="btn"
          onClick={() => {
            this.props.handleChange(this.props.idx);
          }}
        >
          (--!--)
        </button>
        
      </li>
      </div>
    );
  }
}

export default BookListElem;
