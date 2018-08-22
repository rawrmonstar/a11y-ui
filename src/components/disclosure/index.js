import PropTypes from "prop-types";
import { Component } from "react";
import { makeButtonHandlers } from "../../util/button";
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

  getControlProps = () => ({
    "aria-controls": this.contentID,
    "aria-expanded": `${this.props.isExpanded}`,
    role: "button",
    tabIndex: "0",
    ...makeButtonHandlers(this.toggleExpanded)
  });

  getContentProps = () => ({
    id: this.contentID
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
