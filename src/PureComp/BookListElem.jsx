import React, { Component } from "react";

class BookListElem extends Component {
  render() {
    return (
      <div>
      <li>
      
          {/* {this.props.books.length && this.props.books.slice(this.props.start,this.props.end).map((item, i) => {
              return <div>
              <li className="comment" key={i}  >{item.title} {item.price}$  {item.isbn} </li>
              </div>
            })} */}
        {this.props.idx} | {this.props.title}  |
        {this.props.price}$ |{this.props.isbn}|{<img src="http://localhost:3000/api/photos/profil/download/La Promesse.jpg" alt="bookpicture"/>}
        
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
