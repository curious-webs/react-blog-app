import React, { Component } from "react";
import Joi from "joi-browser";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { apiURL } from "./../config.json";
import AdminSidebar from "./admin-sidebar";

import GoBack from "./goback";
class AddPost extends Component {
  state = {
    posts: [],
  };
  constructor(props) {
    super(props);
  }
  schema = {
    author: Joi.required().label("Author"),
    title: Joi.string().required().label("Post Title"),
    body: Joi.string().required().label("Post Content")
  };
  async componentDidMount() {
    const postsURL = apiURL + "/posts";
    console.log(postsURL);
    const { data: posts } = await axios.get(postsURL);
    this.setState({ posts });
  }
  addNewPost = async (e) => {
    e.preventDefault();
    const options = { abortEarly: false };
    const post = {
      author: "10",
      title: e.currentTarget.post_title.value,
      body: e.currentTarget.post_content.value,
    };
    const result = Joi.validate(post, this.schema, options);
    if (result.error) {
      toast("All fields are required");
    }else{
      const postsURL = apiURL + "/posts";
      await axios
        .post(postsURL, {
          post,
        })
        .then((res) => {
          if (res.status === 201) {
            toast("New Post Created.");
            let postId = { id: res.data.id };
            const newPost = Object.assign({}, res.data.post, postId);
  
            this.setState((prevState) => ({
              posts: [...prevState.posts, newPost],
            }));
          } else {
            toast("Something Went Wrong!!!");
          }
        });
    }
    
  };
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <div className="dashboard-template my-5">
          <div className="container-fluid">
            <div className="row">
              <AdminSidebar />
              <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                <div className="d-block my-5">
                  <GoBack propsVal={this.props} />
                  <h1 className="h2 mt-4 mb-4">Add Post</h1>

                  <div className="edit-form-wrapper">
                    <form className="" onSubmit={this.addNewPost}>
                      <div
                        className="wrap-input1 validate-input form-group"
                        data-validate="Name is required"
                      >
                        <input
                          className="input1 form-control"
                          type="text"
                          name="post_title"
                          placeholder="Post Title"
                        />
                      </div>

                      <div
                        className="wrap-input1 validate-input form-group"
                        data-validate="Message is required"
                      >
                        <textarea
                          className="input1 form-control"
                          name="post_content"
                          placeholder="Post Content"
                        ></textarea>
                      </div>
                      <div className="container-contact1-form-btn form-group">
                        <button
                          type="submit"
                          className="contact1-form-btn btn btn-default btn-primary"
                        >
                          <span>Add New Post</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AddPost;
