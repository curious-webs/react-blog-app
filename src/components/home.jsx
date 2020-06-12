import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { apiURL } from "./../config.json";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import PostListContent from "./post-list-content";
class Home extends Component {
  state = {
    posts: [],
    currentPage: 1,
    postsPerPage: 10,
    searchQuery: "",
  };
  async componentDidMount() {
    const postsURL = apiURL + "/posts";
    console.log(postsURL);
    const { data: posts } = await axios.get(postsURL);
    this.setState({ posts });
  }

  handleSearch = (searchQuery) => {
    this.setState({ searchQuery: searchQuery, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      postsPerPage,
      currentPage,
      searchQuery,
      posts: allPosts,
    } = this.state;
    let filtered = allPosts;
    if (searchQuery)
      filtered = allPosts.filter((post) =>
        post.title.toLowerCase().startsWith(searchQuery.toLocaleLowerCase())
      );

    const posts = paginate(filtered, currentPage, postsPerPage);

    return { totalCount: filtered.length, data: posts };
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  render() {
    const { totalCount, data: posts } = this.getPagedData();
    const { currentPage, postsPerPage, searchQuery } = this.state;
    console.log("totalcoujt is:");
    console.log(totalCount);
    return (
      <React.Fragment>
        <div className="blog-list-section py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="row align-items-center py-5">
                  <div className="col-md-6">
                    <h1 className="my-4">Blogs</h1>
                    <h5 class="mb-4">Total Posts : {totalCount}</h5>
                  </div>
                  <div className="col-md-6">
                    <div className="card my-4">
                      <h5 className="card-header">Search</h5>
                      <div className="card-body">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search for..."
                            value={searchQuery}
                            onChange={(e) =>
                              this.handleSearch(e.currentTarget.value)
                            }
                          />
                          <span className="input-group-btn">
                            <button className="btn btn-secondary" type="button">
                              Go!
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <PostListContent postsContent={posts.data} />
                <Pagination
                  postsCount={totalCount}
                  postsPerPage={postsPerPage}
                  onPageChange={this.handlePageChange}
                  currentPage={currentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
