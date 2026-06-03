import { onRequestPost as __submit_js_onRequestPost } from "/Users/eric/Projects/pestem/functions/submit.js"

export const routes = [
    {
      routePath: "/submit",
      mountPath: "/",
      method: "POST",
      middlewares: [],
      modules: [__submit_js_onRequestPost],
    },
  ]