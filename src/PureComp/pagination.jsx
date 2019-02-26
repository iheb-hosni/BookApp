import React, { Component } from 'react';
import paginate from 'paginate-array';
import Axios from 'axios';

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      book: [],
      size: 2,
      page: 1,
      currPage: null
    }

    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  componentDidMount() {
    Axios.get(`http://localhost:3000/api/mybooks`)
      .then(response => response.data)
      .then(book => {
        const { page, size } = this.state;

        const currPage = paginate(book, page, size);

        this.setState({
          ...this.state,
          book,
          currPage
        });
      });
  }

  previousPage() {
    const { currPage, page, size, book } = this.state;

    if (page > 1) {
      const newPage = page - 1;
      const newCurrPage = paginate(book, newPage, size);

      this.setState({
        ...this.state,
        page: newPage,
        currPage: newCurrPage
      });
    }
  }

  nextPage() {
    const { currPage, page, size, book } = this.state;

    if (page < currPage.totalPages) {
      const newPage = page + 1;
      const newCurrPage = paginate(book, newPage, size);
      this.setState({ ...this.state, page: newPage, currPage: newCurrPage });
    }
  }

  render() {
    const { page, size, currPage } = this.state;

    return (
      <div>
       
        {currPage &&
          <ul>
            {currPage.data.map(el => <li key={el.id}>{el.title}</li>)}
          </ul>
        }
         <nav aria-label="Page navigation">
  <ul className="pagination">
    <li>
      <a href="#" aria-label="Previous" onClick={this.previousPage}>
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li><a href="#">1</a></li>
    <li><a href="#">2</a></li>
    <li><a href="#">3</a></li>
  
    <li>
      <a href="#" aria-label="Next"onClick={this.nextPage} >
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
         
      </div>
    )
  }
}

export default Pagination;