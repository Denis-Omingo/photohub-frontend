import "@testing-library/jest-dom";
import { beforeAll } from "vitest"; 

beforeAll(() => {
  const rootElement = document.createElement("div"); 
  rootElement.id = "root"; 
  document.body.appendChild(rootElement); 
});
