import React, { Component } from "react";
import "./App.css";
import BooksList from "./PureComp/BooksList";
import NewBook from "./PureComp/NewBook";
import {  BrowserRouter as Router , Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import NewAuthor from "./PureComp/NewAuthor";
import AuthorListElem from "./PureComp/AuthorListElem";
import AuthorBook from "./PureComp/AuthorBooksList";
import Pagination from "./PureComp/pagination"
import PaginationData from "./PureComp/paginationData2"
 const size = 2
 
class App extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      
      books: [],
      idx: "",
      title: "",
      author: "",
      price: "",
      isbn: "",
      description: "",
      id: "",
      // image:""
      totalPages: "",
      currentPage: 0,
    count: 0,
    offset: 2
    };

    // this.handleClick = this.handleClick.bind(this);
    this.updateBookList = this.updateBookList.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    // this.deleteBook=this.deleteBook.bind(this)
    this.handleChange = this.handleChange.bind(this)
    // this.handleAddAuthor=this.handleAddAuthor.bind(this)
  }

  async componentDidMount() {
    let skip = 0;
    const pageSize = 0

    const response = await axios.get("http://localhost:3000/api/mybooks"
      // , {
      //   params: {
      //     filter: {

      //       "limit": pageSize,
      //       "skip": skip
      //     }
      //   }
      // }
    );
    if (response.status === 200) {
      const books = [];
      response.data.map(prop => {
        const book = {
          title: prop.title,
          author: prop.author,
          isbn: prop.isbn,
          price: prop.price,
          description: prop.description,
          id: prop.id,

        };
        books.push(book);
      });

      this.setState({ books: books ,
        count:response.data.length,
        // data:response.data
      });
      console.log(this.state.books)
    } else {
      // handle error
      // console.log(response.status);
    }
    /*
    try{

    }catch(e){

    }

    */
  }

  // handleClick(id) {
  //   const booksCopy = Array.from(this.state.books);
  //   booksCopy.splice(id, 1);

  //   this.setState({ books: booksCopy });
  // }
  handleChange = idx => {
    const selectedBook = this.state.books[idx];

    this.setState({
      idx: idx,
      title: selectedBook.title,
      author: selectedBook.author,
      price: selectedBook.price,
      isbn: selectedBook.isbn,
      description: selectedBook.description
    });
  };
  async handleDelete(idx, id) {
    console.log(id)
    const booksCopy = Array.from(this.state.books)
    const response = await axios.delete(`http://localhost:3000/api/mybooks/${id}`)
    if (response.status === 200) {
      booksCopy.splice(idx, 1)
      this.setState({ books: booksCopy })
      // console.log(this.state.books)
    }
    else { alert(response.status) }
  }


  updateBookList = value => {
    this.setState({
      books: value
    })
  }
  // handelPagination=e=>{
  //   let skip =0;
  //   const pageSize =2 ;
  //   axios.get()

  // }
  async componentWillMount() {
    const Response = await axios.get("http://localhost:3000/api/mybooks/count")
    if (Response.status === 200) {
      this.setState(
        { totalPages: Math.ceil((Response.data.count) / size) }
      )

    }
    console.log(this.state.totalPages)


  }
  changePage = n => {
    this.setState({
      currentPage: n
    });
  };
  render() {
    const { books, offset, currentPage, count } = this.state;
    const start = currentPage * offset;
    const end =  (+currentPage+1) * offset;
    return (
      <div className="App">
<Router>
        
          <div>
            <ul className="link">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/new">NewBook</Link>
              </li>
              <li>
                <Link to="/new-author">NewAuthor</Link>
              </li>
              <li>
                <Link to="/authorList">AuthorList</Link>
              </li>
            </ul>

            <hr />
<Switch>
            <Route exact path="/home" >
              <BooksList
                books={this.state.books}
                handleClick={this.handleClick}
                handleChange={this.handleChange}
                handleDelete={this.handleDelete}
                // pages={Math.ceil(count / offset)}
                // current={currentPage}
                // onChangePage={this.changePage}
                // margin={5}
                start={start}
                end={end}
              /> 
              
              
            </Route>
            <Route  path="/new" component={NewBook}>
              <NewBook updateBookList={(value) => this.updateBookList(value)} />
            </Route>


            <Route path="/new-author" component={NewAuthor}>
              {/* <NewAuthor 
              handleAddAuthor={this.handleAddAuthor}
              /> */}
            </Route>
            <Route path="/authorList" component={AuthorListElem} />
            <Route path="/authorbooks/:authorId" component={AuthorBook} />
            </Switch>
          </div>
        
        </Router>
        {/* <nav aria-label="Page navigation">
  <ul className="pagination">
    <li>
      <a href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li><a href="#">1</a></li>
    <li><a href="#">2</a></li>
    <li><a href="#">3</a></li>
  
    <li>
      <a href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav> */}


 {/* <ul>
          {books.length && books.slice(start,end).map((item, i) => {
              return <li className="comment" key={i}  >{item.title}{item.price}$</li>;
            })}
        </ul> */}
{/* <Pagination /> */}
        <PaginationData
         pages={Math.ceil(count / offset)}
         current={currentPage}
         onChangePage={this.changePage}
         margin={5}
    />
 
      </div>
    );
  }
}

export default App;
