import modalTemplateSrc from "../../html/modal-template.html";
import { getComponent } from "../util/component";
import { Modal } from "bootstrap";

export const getModalComponent = (message = "") => {
  const baseModal = getComponent(modalTemplateSrc);
  const modalBody = baseModal.querySelector(".modal-body");

  const messageParagraph = document.createElement("p");
  messageParagraph.innerHTML = message;
  modalBody.replaceChildren(messageParagraph);

  const modalComponent = new Modal(baseModal, { backdrop: "static" });
  return modalComponent;
};
