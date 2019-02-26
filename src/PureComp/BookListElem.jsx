import React, { Component } from "react";

class BookListElem extends Component {
  render() {
    return (
      <div>
      <li>
        {this.props.idx} | {this.props.title}  |
        {this.props.price}$ |{this.props.isbn}|{<img src="http://localhost:3000/api/photos/profil/download/l'alchimiste.jpg" alt="bookpicture"/>}
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
