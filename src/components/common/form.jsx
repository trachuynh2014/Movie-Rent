import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    //properties of data are the data that we need to render label and input field accordingly
    data: {},
    // errors will happen of input field
    errors: {},
  };

  validate = () => {
    // its gonna list all the errors of all input field
    const options = { abortEarly: false };
    // destructuring
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};
    // set value for errors property
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  handleSubmit = (e) => {
    // this action will prevent page from reloading again
    e.preventDefault();

    const errors = this.validate();
    // this action will prevent the case that if there is no errors, the errors object will be an empty
    // object, not a null
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };
  // destructuring the currentTarget property of an event function and change its name to input
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    // set the errors for every input field dynamically
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    // set the data for every input field dynamically

    data[input.name] = input.value;

    this.setState({ data, errors });
  };
  renderInput = (name, label, type = "text") => {
    // get data from the state, therefore, if data's property's value is not "", the initial value of
    // input field will be the same. For example, if username: '1', the input field of username will be
    // initially set to 1
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        errors={errors[name]}
      />
    );
  };
  renderSelect = (name, label, options) => {
    // same thing as render Input but dropdown List (personally I dont think I need errors for this
    //method (maybe I'm wrong))
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        errors={errors[name]}
      />
    );
  };
  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };
}

export default Form;
