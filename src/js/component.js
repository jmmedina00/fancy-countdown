export const getComponent = (imported) =>
  new DOMParser().parseFromString(imported, "text/html").body.firstElementChild;

export const addToBody = (node) => document.body.appendChild(node);
