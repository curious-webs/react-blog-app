import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import GoBack from './goback';

import { apiURL } from "./../config.json";
import axios from "axios";
class Blog extends Component {
  state = { post_data: [] };
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    const blog_id = this.props.match.params.id;
    const postURL = apiURL + '/posts/' + blog_id;
    const { data: post_data } = await axios.get(
      postURL
    );

    this.setState({ post_data });
  }
  // goPrev = () => {
  //   const { history } = this.props;
  //   console.log(history);
  //   if (history) {
  //   //  history.push("/home");
  //   history.goBack();
  //   }
  // };
  render() {
    const { post_data } = this.state;
    return (
      <div className="blog-detail-page py-5">
        <div className="container">
          <div className="py-5">
           <GoBack propsVal = {this.props} />
            <div className="post-content-wrap py-2">
              <h1>{post_data.title}</h1>
              <p>{post_data.body}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Blog;
