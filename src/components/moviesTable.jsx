import React, { Component } from "react";
import Like from "./common/like";
import DisLike from "./common/disLike";
import Table from "./common/table";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "Like",
      content: (movie) => (
        <button className="btn btn-default btn-sm">
          <Like onClick={() => this.props.onLike(movie)} liked={movie.liked} />
        </button>
      ),
    },
    {
      key: "DisLike",
      content: (movie) => (
        <button className="btn btn-default btn-sm">
          <DisLike
            onClick={() => this.props.onDisLike(movie)}
            disLiked={movie.disLiked}
          />
        </button>
      ),
    },
    {
      key: "Delete",
      content: (movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];
  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
        data={movies}
      />
    );
  }
}

export default MoviesTable;
