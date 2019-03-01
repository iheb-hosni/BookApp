import React, { Component } from "react";
import axios from "axios";

class NewBook extends Component {
  constructor(prop) {
    super(prop);
  this.state = {
    authorData:[],
    idx: "",
    title: "",
    author: "",
    price: "",
    isbn: "",
    description: "",
    image:""
  };
}
componentDidMount() {
  axios.get('http://localhost:3000/api/Authors')

        .then((response)=> {
          if(response.status===200){
          this.setState({authorData:response.data})
          }
          }
          )
        .catch((error)=> {
          console.log(error)
        })
}
  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };
  // handleSubmit = e => {
  //   e.preventDefault();

  //   const book = {
  //     title: this.state.title,
  //     author: this.state.author,
  //     isbn: this.state.isbn,
  //     price: this.state.price,
  //     description: this.state.description
  //   };

  //   this.setState({ books: [...this.state.books, book] });
  // };
   
  onAddBook =(e) =>{
    e.preventDefault();
    const id=document.getElementById('select').value

    console.log(id)
    console.log(this.state.image)
    const fd = new FormData();
       fd.append('file' , this.state.image , this.state.image.name)
       axios.post(`http://localhost:3000/api/photos/profil/upload`,fd
       ).then(res=> axios.post(`http://localhost:3000/api/Authors/${id}/mybooks`
       ,{
     
        title:this.state.title,
        author:this.state.author,
        price:this.state.price,
        isbn:this.state.isbn,
        description:this.state.description,
        image:this.state.image
       }
       )

     
    ).then(res=>res.data)
    
    .catch(err => alert(err))
    // window.location.reload();
  }
  // handleSubmit = e => {
  //   e.preventDefault();
 
  //   const book = {
  //     title:this.state.title,
  //     author:this.state.author,
  //     isbn:this.state.isbn,
  //     price:this.state.price,
  //     description:this.state.description,

  //   };
  //   const id=document.getElementById('select').value
  //   console.log(id)
  //   this.props.onAddBook(book,id);
  //   window.location.reload();
  // };
  // onAddBook=(book,id) =>{
  //   console.log(id)
  //    axios.post(`http://localhost:3000/api/Authors/${id}/mybooks`,
  //    {
  //       title:this.state.title,
  //         author:this.state.author,
  //         price:this.state.price,
  //         isbn:this.state.isbn,
  //         description:this.state.description,
  //         image:this.state.image
  //    }
  //    )
  //    .then(res=> res.data )
  //   .catch(err => alert(err))
  // }
//  handelAddFile =(e)=>{
       
//       const fd = new FormData();
//        fd.append('file' , this.state.image , this.state.image.name)
//        axios.post(`http://localhost:3000/api/photos/profil/upload`,fd
//        ).then(res=>res.data)
//         .catch(err=>(err))
//  }
// handleSubmit = e => {
//   e.preventDefault();

//   const book = {
//     title: this.state.title,
//     author: this.state.author,
//     isbn: this.state.isbn,
//     price: this.state.price,
//     description: this.state.description,
//     image:this.state.image
//   };
//   const id=document.getElementById('select').value
//   console.log(id)
//   this.props.onAddBook(book,id);

//   window.location.reload();
// };
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

  handleFileChange = e => {
    // console.log(e.target.files)
  
      this.setState({
       image: e.target.files[0],
      })
    }
    selectChange=(e)=>{
      const value=e.target.value;
      console.log(value)
      // console.log(this.state.authorData)
       }
  
  // handleEdit = () => {
  //   const book = {
  //     title: this.state.title,
  //     author: this.state.author,
  //     isbn: this.state.isbn,
  //     price: this.state.price,
  //     description: this.state.description
  //   };

  //   const booksCopy = Array.from(this.state.books);
  //   // booksCopy[this.state.idx] = book;
  //   booksCopy.splice(this.state.idx, 1);
  //   booksCopy.splice(this.state.idx, 0, book);

  //   this.setState({ books: booksCopy });
  // };
  render() {
    return (
      <form onSubmit={this.onAddBook}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            placeholder="please enter the title"
            onChange={this.handleInputChange}
            value={this.state.title}
          />
        </label>
        <br/>
        <label>
          Author:
          <select name="author" id="select" onChange={this.selectChange} 
           
          >
         {this.state.authorData.map(el=><option value={el.id}>{el.name} {el.familyname}</option>)}
            {/* // type="text"
            // name="author"
            // placeholder="please enter the author"
            // onChange={this.handleInputChange}
            // value={this.state.author} */}
            </select>
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            name="price"
            placeholder="please enter the price"
            onChange={this.handleInputChange}
            // value={this.state.price}
          />
        </label>
        <br />
        <label>
          ISBN:
          <input
            type="number"
            name="isbn"
            placeholder="please enter the isbn"
            onChange={this.handleInputChange}
            // value={this.state.isbn}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            placeholder="please enter the description"
            name="description"
            onChange={this.handleInputChange}
            // value={this.state.description}
          />
        </label>
        <br/>
        <label>
            Image:
          <input 
          type="file"
          name="image"
          onChange={this.handleFileChange}
          />
        </label>
        <br />
        <input type="submit" className="btn btn-primary" />
        <input type="button" className="btn btn-primary" value="edit" onClick={this.handleEdit} />
      </form>
    );
  }
}

export default NewBook;
