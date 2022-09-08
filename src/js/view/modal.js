import modalTemplateSrc from "../../html/modal-template.html";
import modalCloseButtonSrc from "../../html/modal-close-button.html";
import { getComponent } from "../util/component";
import { Modal } from "bootstrap";

export const getModalComponent = (message = "", links = {}) => {
  const baseModal = getComponent(modalTemplateSrc);
  const closeButton = getComponent(modalCloseButtonSrc);
  const modalBody = baseModal.querySelector(".modal-body");
  const modalFooter = baseModal.querySelector(".modal-footer");

  const messageParagraph = document.createElement("p");
  messageParagraph.innerText = message;

  const additionalLinks = Object.entries(links).map(([label, url]) => {
    const element = document.createElement("a");
    element.classList.add("btn", "btn-secondary");
    element.href = url;
    element.innerText = label;

    return element;
  });

  modalBody.replaceChildren(messageParagraph);
  modalFooter.replaceChildren(...additionalLinks, closeButton);

  const modalComponent = new Modal(baseModal, { backdrop: "static" });
  return modalComponent;
};
