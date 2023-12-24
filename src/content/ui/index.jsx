import { createRoot } from "react-dom/client";
import App from './App';

const root = document.createElement("div");
root.id = "cover-letter-root";

const placeContentSectionToDOM = () => {
    document.body.append(root);
    createRoot(root).render(<App />);

};

placeContentSectionToDOM();



const observer = new MutationObserver((mutationsList, observer) => {
    // Look through all mutations that just occured
    for (const mutation of mutationsList) {
      // If the addedNode property has a value
      if (mutation.addedNodes.length) {
        const rootOld = document.getElementById(root.id);
        if (!rootOld) {
            placeContentSectionToDOM();
        }
      }
    }
  });
  
  // Start observing the document with the configured parameters
  observer.observe(document, { childList: true, subtree: true });