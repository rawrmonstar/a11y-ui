import PropTypes from "prop-types";
import { Component } from "react";
import { getButtonProps } from "../../util/button";
import { generateID } from "../../util/id";
import withRenderPropUtils from "../with-render-prop-utils";

const initialState = { isExpanded: false };

class Disclosure extends Component {
  static propTypes = {
    isExpanded: PropTypes.bool,
    internalSetState: PropTypes.func,
    children: PropTypes.func.isRequired
  };

  contentID = `${generateID("disclosure")}--content`;

  getControlProps = (userProps = {}) => ({
    "aria-controls": this.contentID,
    "aria-expanded": `${this.props.isExpanded}`,
    ...userProps,
    ...getButtonProps(this.toggleExpanded, userProps)
  });

  getContentProps = (userProps = {}) => ({
    id: this.contentID,
    ...userProps
  });

  toggleExpanded = () => {
    this.props.internalSetState({ isExpanded: !this.props.isExpanded });
  };

  render() {
    return this.props.children({
      getControlProps: this.getControlProps,
      getContentProps: this.getContentProps,
      isExpanded: this.props.isExpanded
    });
  }
}

export default withRenderPropUtils(initialState)(Disclosure);
