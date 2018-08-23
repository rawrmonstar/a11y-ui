import PropTypes from "prop-types";
import { Component } from "react";
import { getButtonProps } from "../../util/button";

class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.func.isRequired
  };

  getProps = (userProps = {}) => ({
    ...userProps,
    ...getButtonProps(this.props.onClick, userProps)
  });

  render() {
    return this.props.children({
      getProps: this.getProps
    });
  }
}

export default Button;
