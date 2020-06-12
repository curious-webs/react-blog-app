import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
class PostListContent extends Component {
  state = {};
  render() {
   const postContent = this.props.postsContent;
    return (
      <React.Fragment>
       
        {postContent.map((post) => (
                  <div className="card mb-4">
                    <img
                      className="card-img-top"
                      src="http://placehold.it/750x300"
                      alt="Card image cap"
                    />
                    <div className="card-body">
                      <h2 className="card-title">{post.title}</h2>
                      <p className="card-text">{post.body}</p>
                      <Link to={`/blog/${post.id}`} className="btn btn-primary">
                        Read More &rarr;
                      </Link>
                    </div>
                    <div className="card-footer text-muted">
                      Posted on January 1, 2017 by
                      <a href="#">Start Bootstrap</a>
                    </div>
                  </div>
                ))}
      </React.Fragment>
    );
  }
}

export default PostListContent;
