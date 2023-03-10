// const { defineConfig } = require("cypress");
import { defineConfig } from "cypress";


export default defineConfig({
  projectId: "i5iedp",
  "env": {
    "googleUrl": "https://store.google.com/us"
  },
  "e2e": {
    "baseUrl": "https://reqres.in",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
