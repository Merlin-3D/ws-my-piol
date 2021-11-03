"use strict";

var getStandardReponse = function getStandardReponse(status, message, data) {
  return {
    status: status,
    message: message,
    content: data
  };
};

module.exports = getStandardReponse;