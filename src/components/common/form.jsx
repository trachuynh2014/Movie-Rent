import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    //data là dữ liệu mà t cần để t render label và input field tương ứng
    data: {},
    // là lỗi sẽ xảy ra của các input field.
    errors: {},
  };

  validate = () => {
    // việc này sẽ list ra tất cả các lỗi của tất cả input field
    const options = { abortEarly: false };
    // destructuring
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};
    // set value cho cái errors property
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
    // điều này sẽ ngăn reload toàn bộ page
    e.preventDefault();

    const errors = this.validate();
    // việc này ngăn chặn chuyện nếu k có lỗi xảy ra thì errors sẽ là empty object chứ k phải null
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };
  renderInput = (name, label, type = "text") => {
    // lấy dữ liệu từ state, vì thế, nếu property của data có giá trị k phải "", thì ban đầu giá trị của
    // input field này cũng thế. Ví dụ username: "1" thì khi tạo ra input field thì giá trị ban đầu
    // của username là 1
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
