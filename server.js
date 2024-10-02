import { html } from "lit";
import express from "express";
import { render } from "@lit-labs/ssr";
import { collectResult } from "@lit-labs/ssr/lib/render-result.js";
import "./src/my-element.js"; // Import LitElement component

const app = express();
const port = 3000;

// Simple route to render the LitElement component on the server
app.get("/", async (req, res) => {
  const litHtml = await collectResult(render(html`<my-element></my-element>`));

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>LitElement SSR</title>
    </head>
    <body>
      ${litHtml}
      <!-- Include the client-side hydration script -->
      <script type="module" src="/hydrate.js"></script>
      <!-- Include the JavaScript file -->
      <script type="module" src="/my-element.js"></script>
    </body>
    </html>
  `);
});

// Serve static files (for hydration on the client side)
app.use(express.static("dist"));

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
