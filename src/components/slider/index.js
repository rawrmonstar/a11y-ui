import PropTypes from "prop-types";
import { Component } from "react";
import { noop } from "../../util/fn";
import { generateID } from "../../util/id";
import withRenderPropUtils from "../with-render-prop-utils";

const initialState = {};

class Slider extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    orientation: PropTypes.oneOf(["horizontal", "vertical"]),
    min: PropTypes.number.isRequired,
    value: PropTypes.number,
    max: PropTypes.number.isRequired,
    step: PropTypes.number,
    getValueText: PropTypes.func,
    labelText: PropTypes.string,
    internalSetState: PropTypes.func.isRequired // from HOC
  };

  static defaultProps = {
    orientation: "horizontal",
    getValueText: noop,
    step: 1
  };

  labelID = `${generateID("slider")}--label`;

  getThumbControlProps = (userProps = {}) => {
    const label = this.props.labelText
      ? { "aria-label": this.props.labelText }
      : { "aria-labelledby": this.labelID };

    return {
      role: "slider",
      "aria-valuemin": this.props.min,
      "aria-valuenow": this.props.value,
      "aria-valuemax": this.props.max,
      "aria-valuetext": this.props.getValueText(this.props.value),
      "aria-orientation": this.props.orientation,
      ...label,
      ...userProps
    };
  };

  getLabelProps = () => {
    // If a label is provided as a prop, we will use that instead,
    // we do not need to id an element to be used as label text.
    if (this.props.labelText) return {};

    return {
      id: this.labelID
    };
  };

  render() {
    return this.props.children({
      getThumbControlProps: this.getThumbControlProps,
      getLabelProps: this.getLabelProps
    });
  }
}

export default withRenderPropUtils(initialState)(Slider);
