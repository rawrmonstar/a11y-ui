import PropTypes from "prop-types";
import { Component } from "react";

class Alert extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired
  };

  getProps = (userProps = {}) => ({
    role: "alert",
    ...userProps
  });

  render() {
    return this.props.children({
      getProps: this.getProps
    });
  }
}

export default Alert;
