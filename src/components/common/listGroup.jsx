import React, { Component } from "react";
import PropTypes from "prop-types";

class ListGroup extends Component {
  render() {
    const {
      items,
      textProperty,
      valueProperty,
      selectedItem,
      onItemSelect,
    } = this.props;
    return (
      <ul className="list-group">
        {items.map((item) => (
          <li
            style={{ cursor: "pointer" }}
            onClick={() => onItemSelect(item)}
            key={item[valueProperty]}
            className={
              item === selectedItem
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    );
  }
}
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  textProperty: PropTypes.string.isRequired,
  valueProperty: PropTypes.string.isRequired,
  selectedItem: PropTypes.string,
  onItemSelect: PropTypes.func.isRequired,
};
export default ListGroup;
