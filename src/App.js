import React, { Component } from "react";
import "./App.css";
import BooksList from "./PureComp/BooksList";
import NewBook from "./PureComp/NewBook";
import { BrowserRouter as Router, Route, Link , Switch} from "react-router-dom";
import axios from "axios";
import NewAuthor from "./PureComp/NewAuthor";
import AuthorListElem from "./PureComp/AuthorListElem";
import AuthorBook from "./PureComp/AuthorBooksList"
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
      id:"",
      // image:""
      
    };
    // this.handleClick = this.handleClick.bind(this);
    this.updateBookList=this.updateBookList.bind(this);
    this.handleDelete=this.handleDelete.bind(this);
    // this.deleteBook=this.deleteBook.bind(this)
    // this.handleChange=this.handleChange.bind(this)
    // this.handleAddAuthor=this.handleAddAuthor.bind(this)
  }

  async componentDidMount() {
    
    const response = await axios.get("http://localhost:3000/api/mybooks"
    
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
          id:prop.id,
          image:this.props.image
        };
        books.push(book);
      });

      this.setState({ books: books });
    } else {
      // handle error
      console.log(response.status);
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
  
  async handleDelete (idx,id) {
    console.log(id)
    const booksCopy=Array.from(this.state.books)
   const response=await axios.delete(`http://localhost:3000/api/mybooks/${id}`)
   if (response.status === 200) {
       booksCopy.splice(idx, 1)
       this.setState({books: booksCopy})
// console.log(this.state.books)
 }
 else {alert (response.status)}
 }
  

  updateBookList = value =>{
   this.setState({
     books:value
   })
  }
  render() {
    return (
      <div className="App">
        
          <Switch>
          <div>
            <ul className="link">
              <li>
                <Link to="/">Home</Link>
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

            <Route exact path="/" >
              <BooksList
                books={this.state.books}
                handleClick={this.handleClick}
                handleChange={this.handleChange}
                handleDelete={this. handleDelete}
              />
            </Route>
            <Route exact path="/new" component={NewBook}>
            <NewBook updateBookList={(value)=>this.updateBookList(value)}/>
            </Route>
          
             
            <Route exact path="/new-author" component={NewAuthor}>
              {/* <NewAuthor 
              handleAddAuthor={this.handleAddAuthor}
              /> */}
              </Route>
              <Route exact path="/authorList" component={AuthorListElem}/>
              <Route path="/authorbooks/:authorId" component={AuthorBook} />
          </div>
          </Switch>
          <nav aria-label="Page navigation">
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
</nav>
        
        {/**/}
      </div>
    );
  }
}

export default App;
