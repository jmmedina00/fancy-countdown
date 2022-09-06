export const redirectToTimer = (seconds) => {
  window.location.href += `?time=${seconds}`;
};
