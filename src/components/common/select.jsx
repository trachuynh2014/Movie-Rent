import React, { Component } from "react";

class Select extends Component {
  render() {
    const { name, label, options, errors, ...rest } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select name={name} id={name} {...rest} className="form-control">
          <option value="" />
          {options.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
        {errors && <div className="alert alert-danger">{errors}</div>}
      </div>
    );
  }
}

export default Select;
