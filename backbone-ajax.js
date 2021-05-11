const Backbone = require("backbone");
const fetch = require("cross-fetch");

Backbone.ajax = function (request) {
  fetch(request.url, {
    method: request.type,
  })
    .then((response) => response.json())
    .then(request.success)
    .catch(request.error);
};
