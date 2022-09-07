const colorsExported = [
  "primary",
  "warning",
  "danger",
  "success",
  "indigo",
  "purple",
  "pink",
  "orange",
  "teal",
  "cyan",
];

const style = getComputedStyle(document.body);

export const colors = colorsExported.reduce((colorObject, colorName) => {
  colorObject[colorName] = style.getPropertyValue(`--bs-${colorName}`);
  return colorObject;
}, {});
