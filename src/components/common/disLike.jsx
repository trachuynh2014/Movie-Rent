import React, { Component } from "react";
import PropTypes from "prop-types";

class DisLike extends Component {
  render() {
    const { onClick, disLiked } = this.props;
    let name = "fa fa-thumbs";
    if (!disLiked) name += "-o-down";
    else name += "-down";
    return <i onClick={onClick} className={name} aria-hidden="true"></i>;
  }
}
DisLike.propTypes = {
  onClick: PropTypes.func.isRequired,
  disLiked: PropTypes.bool,
};
export default DisLike;
