import React, { Component } from "react";
import Joi from "joi-browser";
import contactImg from "../images/img-01.png";
class Contact extends Component {
  state = { fname: "", email: "", subject: "", message: "", errors: {} };
  constructor(props) {
    super(props);
  }
  schema = {
    fname: Joi.string().required().label("Username"),
    email: Joi.string().required().email().label("Email"),
    subject: Joi.string().required().label("Subject"),
    message: Joi.string().required().label("Message"),
  };
  validateForm = () => {
    const options = { abortEarly: false };
    console.log("in validated form ");
    console.log(this.state);
    const result = Joi.validate(this.state, this.schema, options);
    console.log("results is:");
    console.log(result);

    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }

    this.setState({ errors: errors });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    await this.setState({
      fname: e.target.elements.fname.value,
      email: e.target.elements.email.value,
      subject: e.target.elements.subject.value,
      message: e.target.elements.message.value,
    });
    console.log("state values are");
    console.log(this.state);

    this.validateForm();
  };
  render() {
    const { errors } = this.state;

    return (
      <React.Fragment>
        <div className="contact1 py-5">
          <div className="container">
            <div className="row pt-5 mt-5 align-items-center">
              <div
                className="contact1-pic js-tilt col-md-5 col-lg-4"
                data-tilt=""
              >
                <img src={contactImg} alt="IMG" />
              </div>
              <form
                className="contact1-form validate-form col-md-7 col-lg-8"
                onSubmit={this.handleSubmit}
              >
                <h2 className="contact1-form-title mb-3">Get in touch</h2>
                <div className="row">
                  <div className="col-md-4 align-items-center mb-3">
                    <span className="fa fa-envelope"></span>
                    <a className="px-2" href="mailto:dummy@ff.cc">
                      dummy@ff.cc
                    </a>
                  </div>
                  <div className="col-md-4 align-items-center mb-3">
                    <span className="fa fa-phone"></span>
                    <a className="px-2" href="tel:+91 1234 578 90">
                      +91 1234 578 90
                    </a>
                  </div>
                  <div className="col-md-4 align-items-center mb-3">
                    <a className="px-2" href="#">
                      <span className="fa fa-facebook"></span>
                    </a>
                    <a className="px-2" href="#">
                      <span className="fa fa-twitter"></span>
                    </a>
                    <a className="px-2" href="#">
                      <span className="fa fa-instagram"></span>
                    </a>
                    <a className="px-2" href="#">
                      <span className="fa fa-youtube"></span>
                    </a>
                    <a className="px-2" href="#">
                      <span className="fa fa-linkedin"></span>
                    </a>
                  </div>
                </div>
                <div
                  className="wrap-input1 validate-input form-group"
                  data-validate="Name is required"
                >
                  <input
                    className="input1 form-control"
                    type="text"
                    name="fname"
                    placeholder="Name"
                  />
                  {errors.fname && (
                    <div className="alert alert-danger">{errors.fname}</div>
                  )}
                </div>
                <div
                  className="wrap-input1 validate-input form-group"
                  data-validate="Valid email is required: ex@abc.xyz"
                >
                  <input
                    className="input1 form-control"
                    type="text"
                    name="email"
                    placeholder="Email"
                  />
                  {errors.email && (
                    <div className="alert alert-danger">{errors.email}</div>
                  )}
                </div>
                <div
                  className="wrap-input1 validate-input form-group"
                  data-validate="Subject is required"
                >
                  <input
                    className="input1 form-control"
                    type="text"
                    name="subject"
                    placeholder="Subject"
                  />
                  {errors.subject && (
                    <div className="alert alert-danger">{errors.subject}</div>
                  )}
                </div>
                <div
                  className="wrap-input1 validate-input form-group"
                  data-validate="Message is required"
                >
                  <textarea
                    className="input1 form-control"
                    name="message"
                    placeholder="Message"
                  ></textarea>
                  {errors.message && (
                    <div className="alert alert-danger">{errors.message}</div>
                  )}
                </div>
                <div className="container-contact1-form-btn form-group">
                  <button className="contact1-form-btn btn btn-default btn-primary">
                    <span>
                      Send Email
                      <i
                        className="fa fa-long-arrow-right"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Contact;
