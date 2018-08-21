export function makeButtonHandlers(handleEvent) {
  return {
    onClick: handleEvent,
    onKeyDown: event => {
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
