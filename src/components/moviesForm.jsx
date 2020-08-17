import React, { Component } from "react";

class MoviesForm extends Component {
  render() {
    return (
      <div>
        <h1>Movies Form {this.props.match.params.id} </h1>
        <button
          className="btn btn-primary"
          onClick={() => this.props.history.push("/movies")}
        >
          Save
        </button>
      </div>
    );
  }
}

export default MoviesForm;
