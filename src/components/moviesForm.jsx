import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovie, saveMovie } from "./../services/fakeMovieService";
import { getGenres } from "./../services/fakeGenreService";
class MoviesForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    // việc đề cập genres ở đây là cho cái renderSelect (là 1 dropdownList với các genres)
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genres"),
    numberInStock: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .min(0)
      .max(10)
      .required()
      .label("Daily Rental Rate"),
  };

  componentDidMount() {
    const genres = getGenres();
    // re-render lần 1
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");
    // re-render lần 2 với các properties của movie object
    this.setState({ data: this.mapToViewModel(movie) });
  }
  // việc tạo ra method này nhằm mục đích thể hiện dữ liệu specifically ở cái logic Form. Tại vì
  // database của t mang 1 mục đích general. Do đó, để phục vụ cho việc display properties ở cái form này,
  // t cần 1 method sao cho t phải tạo ra một object với các property giống với data ở state
  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }
  doSubmit = () => {
    // lưu một bộ phim và sẽ push nó vào cái array movies.
    saveMovie(this.state.data);
    // sau khi lưu xong sẽ điều hướng quay về movie
    this.props.history.push("/movies");
  };
  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Daily Rental Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MoviesForm;
