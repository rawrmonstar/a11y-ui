import { callEach } from "./fn";

function makeOnKeyDownHandler(handleEvent) {
  return function(event) {
    if (event.key === " ") {
      // Space bar normally causes a page down scroll on non-interactive
      // elements (e.g., a span), so we want to prevent it.
      event.preventDefault();
    }

    if (event.key !== "Enter") return;

    event.preventDefault();
    return handleEvent(event);
  };
}

function makeOnKeyUpHandler(handleEvent) {
  return function(event) {
    if (event.key !== " ") return;

    event.preventDefault();
    return handleEvent(event);
  };
}

export function makeButtonHandlers(handleEvent, userProps = {}) {
  return {
    onClick: callEach(handleEvent, userProps.onClick),
    onKeyDown: callEach(makeOnKeyDownHandler(handleEvent), userProps.onKeyDown),
    onKeyUp: callEach(makeOnKeyUpHandler(handleEvent), userProps.onKeyUp)
  };
}
