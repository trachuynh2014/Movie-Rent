import React, { Component } from "react";
import PropTypes from "prop-types";

class Like extends Component {
  render() {
    const { onClick, liked } = this.props;
    let classesName = "fa fa-heart";
    if (!liked) classesName += "-o";
    return <i onClick={onClick} className={classesName} aria-hidden="true"></i>;
  }
}
Like.propTypes = {
  onClick: PropTypes.func.isRequired,
  liked: PropTypes.bool,
};
export default Like;
