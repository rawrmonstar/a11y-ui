import PropTypes from "prop-types";
import React, { Component } from "react";
import { noop } from "../../util/fn";

/**
 * Helper HOC to wrap every parent render prop component. Manages state and the
 * calling of any onChange callback provided. Highly influenced by Kent C Dodd's
 * workshops and work with Downshift.
 */
const withRenderPropUtils = (initState = {}) => Comp => {
  class RenderPropUtils extends Component {
    static displayName = `withRenderPropUtils(${Comp.displayName ||
      Comp.name})`;

    static propTypes = {
      onChange: PropTypes.func
    };

    static defaultProps = {
      onChange: noop
    };

    state = initState;

    isControlled = prop => {
      return this.props[prop] !== undefined;
    };

    getState = (state = this.state) => {
      return Object.entries(state).reduce((combinedState, [key, val]) => {
        combinedState[key] = this.isControlled(key) ? this.props[key] : val;
        return combinedState;
      }, {});
    };

    internalSetState = (changes, callback = noop) => {
      let allChanges;
      this.setState(
        state => {
          const changesObj =
            typeof changes === "function"
              ? changes(this.getState(state))
              : changes;
          allChanges = changesObj;

          let hasNonControlledChanges = false;
          const nonControlledChanges = Object.keys(changesObj).reduce(
            (newChanges, key) => {
              if (!this.isControlled(key)) {
                newChanges[key] = changesObj[key];
                hasNonControlledChanges = true;
              }
              return newChanges;
            },
            {}
          );

          return hasNonControlledChanges ? nonControlledChanges : null;
        },
        () => {
          this.props.onChange(allChanges);
          callback();
        }
      );
    };

    render() {
      const { onChange, ...rest } = this.props; // eslint-disable-line no-unused-vars
      return (
        <Comp
          {...rest}
          {...this.getState()}
          internalSetState={this.internalSetState}
        />
      );
    }
  }

  return RenderPropUtils;
};

export default withRenderPropUtils;
