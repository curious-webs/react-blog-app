import React, { Component } from "react";

const GoBack = (props) => {
  const onClick = (e) => {
    const { history } = props.propsVal;
    if (history) {
      history.goBack();
    }
  };
  return (
    <button className="btn btn-md btn-primary" onClick={onClick}>
      Go Back
    </button>
  );
};

export default GoBack;
