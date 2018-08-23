import { callEach } from "./fn";

const makeOnKeyDownHandler = handleEvent => event => {
  if (event.key === " ") {
    // Space bar normally causes a page down scroll on non-interactive
    // elements (e.g., a span), so we want to prevent it.
    event.preventDefault();
  }

  if (event.key !== "Enter") return;

  event.preventDefault();
  return handleEvent(event);
};

const makeOnKeyUpHandler = handleEvent => event => {
  if (event.key !== " ") return;

  event.preventDefault();
  return handleEvent(event);
};

export const getButtonProps = (handleEvent, userProps = {}) => {
  const props = {
    "aria-disabled": userProps.disabled,
    role: "button",
    tabIndex: userProps.disabled ? "-1" : "0"
  };

  if (userProps.disabled) return props;

  return {
    ...props,
    onClick: callEach(handleEvent, userProps.onClick),
    onKeyDown: callEach(makeOnKeyDownHandler(handleEvent), userProps.onKeyDown),
    onKeyUp: callEach(makeOnKeyUpHandler(handleEvent), userProps.onKeyUp)
  };
};
