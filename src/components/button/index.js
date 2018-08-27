import PropTypes from "prop-types";
import { Component } from "react";
import { getButtonProps } from "../../util/button";

class Button extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired
  };

  getProps = ({ onClick, ...restOfUserProps } = {}) => ({
    ...restOfUserProps,
    ...getButtonProps(onClick, restOfUserProps)
  });

  render() {
    return this.props.children({
      getProps: this.getProps
    });
  }
}

export default Button;
