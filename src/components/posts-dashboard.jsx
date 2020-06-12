import React, { Component } from "react";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { apiURL } from "./../config.json";
import AdminSidebar from "./admin-sidebar";
import Pagination from "./common/pagination";

import { ToastContainer, toast } from "react-toastify";
import { paginate } from "../utils/paginate";
class PostsDashboard extends Component {
  state = {
    posts: [],
    currentPage: 1,
    postsPerPage: 10,
  };
  async componentDidMount() {
    const postsURL = apiURL + "/posts";
    console.log(postsURL);
    const { data: posts } = await axios.get(postsURL);
    this.setState({ posts });
  }
  deletePost = async (id) => {
    console.log("delete post called");
    const postsURL = apiURL + "/posts/" + id;
    console.log(postsURL);
    axios
      .delete(postsURL) // <-- remove ;
      .then(() => {
        const postsURL = apiURL + "/posts";
        console.log(postsURL);
        return axios.get(postsURL);
      })
      .then((res) => {
        console.log(res.data);
        const posts = res.data;
        const posts2 = posts.filter((post) => post.id != id);
        this.setState({ posts: posts2 });
        toast("Deleted Successfully!!!");
      });
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
    const { currentPage, postsPerPage } = this.state;
    // const { posts } = this.state;
    // console.log(posts);
    return (
      <React.Fragment>
        <ToastContainer/>
        <div className="dashboard-template my-5">
          <div className="container-fluid">
            <div className="row">
              <AdminSidebar />
              <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                  <h1 className="h2">Posts</h1>
                  <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group mr-2">
                      <Link
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        to="/blog/new"
                      >
                        Add New
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-striped table-sm">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.data.map((post) => (
                        <tr>
                          <td>{post.title}</td>
                          <td>
                            <Link
                              to={`/blog/${post.id}`}
                              className="btn btn-primary"
                            >
                              <span className="fa fa-eye"></span>
                            </Link>
                            <Link
                              to={`/blog/edit=${post.id}`}
                              className="btn btn-primary mx-2"
                            >
                              <span className="fa fa-edit"></span>
                            </Link>
                            <div className="btn btn-primary">
                              <span
                                className="fa fa-trash"
                                onClick={() => this.deletePost(post.id)}
                              ></span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <Pagination
                    postsCount={totalCount}
                    postsPerPage={postsPerPage}
                    onPageChange={this.handlePageChange}
                    currentPage={currentPage}
                  />
                </div>
              </main>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PostsDashboard;
