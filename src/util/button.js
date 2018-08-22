export function makeButtonHandlers(handleEvent) {
  return {
    onClick: handleEvent,
    onKeyDown: event => {
      if (event.key === " ") {
        // Space bar normally causes a page down scroll on non-interactive
        // elements (e.g., a span), so we want to prevent it.
        event.preventDefault();
      }

      if (event.key !== "Enter") return;

      event.preventDefault();
      return handleEvent(event);
    },
    onKeyUp: event => {
      if (event.key !== " ") return;

      event.preventDefault();
      return handleEvent(event);
    }
  };
}
