import React, { Component } from "react";
import BookListElem from "./BookListElem";

class BooksList extends Component {
  render() {
    return (
      <ul>
        {this.props.books.length&&this.props.books.slice(this.props.start,this.props.end).map((elem, key) => {
          return (
            <BookListElem
              title={elem.title}
              author={elem.author}
              price={elem.price}
              isbn={elem.isbn}
              key={key}
              idx={key}
              id={elem.id}
              handleClick={this.props.handleClick}
              handleChange={this.props.handleChange}
              handleDelete={this.props.handleDelete}
              start={this.props.start}
              end={this.props.end}
              books={this.props.books}
            />
          );
        })}
      </ul>
    );
  }
}

export default BooksList;
