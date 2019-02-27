import React, { Component } from 'react';

class PaginationData extends React.Component {
    onChangePage = e => {
      const id = e.target.dataset.page;
      this.props.onChangePage(id);
    };
    render() {
      const { pages, current,margin } = this.props;
      console.log(current)
      let a = [];
      for (let i = 0; i < pages; i++) {
        a.push(
          <li
            data-page={i}
            onClick={this.onChangePage}
            key={i}
            className={"item" + (i == current ? " active" : "")}
          >
            {i}
          </li>
        );
      }
      
      
      
      return <ul className="pagi">{a}</ul>;
    }
  }
  export default PaginationData