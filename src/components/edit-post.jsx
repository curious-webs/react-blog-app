import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { apiURL } from "./../config.json";
import Joi from "joi-browser";
import AdminSidebar from "./admin-sidebar";
import GoBack from "./goback";

class EditPost extends Component {
  state = {
    errors: [],
    posts: [],
  };
  constructor(props) {
    super(props);
  }
  schema = {
    author: Joi.required().label("Author"),
    title: Joi.string().required().label("Post Title"),
    body: Joi.string().required().label("Post Content"),
    id : Joi.required().label("Id")
  };
  async componentDidMount() {
    const post_id = this.props.match.params.id;
    const postURL = apiURL + "/posts/" + post_id;
    const { data: posts } = await axios.get(postURL);

    this.setState({ posts });
  }
  updatePost = async (e) => {
    e.preventDefault();
    const options = { abortEarly: false };

    const post = {
      author: "10",
      title: e.currentTarget.post_title.value,
      body: e.currentTarget.post_content.value,
      id: this.props.match.params.id,
    };
    const result = Joi.validate(post, this.schema, options);
   
    if (result.error) {
      toast("All fields are required");
      const errors = {};
      for (let item of result.error.details) {
        errors[item.path[0]] = item.message;
      }

      this.setState({ errors: errors });
    } else {
      const { id } = post;
      const postURL = apiURL + `/posts/${id}`;
      axios.put(postURL, { post }).then((res) => {
        if (res.status === 200) {
          let postId = res.data.id;
          const posts = this.state.posts;
          const postEdit = this.state.posts.id;
          this.setState({
            posts: post,
          });
          toast("Post updated Successfully!!");
        } else {
          toast("Something Went Wrong");
        }
      });
    }
  };
  render() {
    const { posts } = this.state;
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
                  <h1 className="h2 mb-4 mt-4">Edit Post</h1>
                  <div className="edit-form-wrapper">
                    <form className="" onSubmit={(e) => this.updatePost(e)}>
                      <div
                        className="wrap-input1 validate-input form-group"
                        data-validate="Name is required"
                      >
                        <input
                          className="input1 form-control"
                          type="text"
                          name="post_title"
                          placeholder="Post Title"
                          defaultValue={posts.title}
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
                          defaultValue={posts.body}
                        ></textarea>
                      </div>
                      <div className="container-contact1-form-btn form-group">
                        <button
                          type="submit"
                          className="contact1-form-btn btn btn-default btn-primary"
                        >
                          <span>Update Post</span>
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

export default EditPost;
