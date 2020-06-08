import React, { Component } from "react";
import _ from "lodash"; 

const Pagination = (props) => {
  const { postsCount, postsPerPage, currentPage,onPageChange } = props;
  const pagesCount = Math.ceil(postsCount / postsPerPage);
  if (pagesCount == 1) return null;
  const pages = _.range(1,pagesCount+1);
  console.log("posts per page");
  console.log(pages);
  return (
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        {pages.map((page) => (
          <li className={currentPage === page ? "active page-item" : "page-item"}>
            <a className="page-link" onClick={()=> onPageChange(page)}>
              {page} 
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
