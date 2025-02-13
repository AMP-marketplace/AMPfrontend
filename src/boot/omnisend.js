export default async () => {
  return new Promise((resolve) => {
    if (window.omnisend) {
      console.log("Omnisend already loaded.");
      resolve();
      return;
    }

    // Initialize Omnisend array
    window.omnisend = window.omnisend || [];
    window.omnisend.push(["brandID", "67866a3e4543f76d6f62f90a"]);
    window.omnisend.push(["track", "$pageViewed"]);

    // Create the script element
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://omnisnippet1.com/inshop/launcher-v2.js";

    script.onload = () => {
      // console.log("Omnisend script loaded.");
      resolve();
    };

    script.onerror = () => {
      console.error("Omnisend script failed to load.");
      resolve();
    };

    // Append the script to the document
    document.head.appendChild(script);
  });
};
