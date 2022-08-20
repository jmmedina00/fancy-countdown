import "./style.scss";
import * as bootstrap from "bootstrap";
import strComponent from "./html/test.html";

console.log("Hello World!");
const component = new DOMParser().parseFromString(strComponent, "text/html");
document.body.appendChild(component.body.firstElementChild);
