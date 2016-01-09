'use strict'

var API_BASE_URL = 'https://localhost:8000/';

var Cookies = require('cookies-js');

window.Vocab = (function() {
  var authToken = Cookies.get('authToken');

  function _setAuth(token) {
    authToken = token;
    Cookies.set('authToken', token);
  }

  return {
    hasToken: function() {return !!authToken;},

    login: function(username, password) {
      return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('POST', API_BASE_URL + 'token/');

        req.onload = function() {
          if (req.status == 200) {
            var result = JSON.parse(req.response);
            _setAuth(result.token);
            resolve({
              status: req.status,
              message: req.statusText,
              response: result
            });
          } else {
            reject({
              status: req.status,
              message: req.statusText
            });
          }
        };

        req.onerror = function() {
          reject({
            status: 0,
            message: 'Network Error'
          })
        };

        req.send(JSON.stringify({
          username: username,
          password: password
        }));
      });
    },

    logout: function() {
      authToken = undefined;
      Cookies.expire('authToken');
    },

    getAllEntries: function() {
      return new Promise(function(resolve, reject) {
        if (!authToken) {
          reject({
            status: 401,
            message: 'Not Authenticated'
          });
          return;
        }

        var req = new XMLHttpRequest();
        req.open('GET', API_BASE_URL + 'entries/');
        req.setRequestHeader('Authorization', 'Token ' + authToken);

        req.onload = function() {
          if (req.status == 200) {
            var result = JSON.parse(req.response);
            resolve({
              status: req.status,
              message: req.statusText,
              response: result
            });
          } else {
            reject({
              status: req.status,
              message: req.statusText
            });
          }
        };

        req.onerror = function() {
          reject({
            status: 0,
            message: 'Network Error'
          })
        };

        req.send();
      });
    },

    // get: function(urlPath, params) {
    //   return new Promise(function(resolve, reject) {
    //     var req = new XMLHttpRequest();
    //     req.open('GET', _buildUrl(urlPath, params));
    //     if (authToken) {
    //       req.setRequestHeader('Authorization', 'Bearer ' + authToken);
    //     }
    //     _handler(req, resolve, reject);
    //     req.send();
    //   });
    // },
    //
    // getFile: function(url) {
    //   return new Promise(function(resolve, reject) {
    //     var req = new XMLHttpRequest();
    //     req.open('GET', url);
    //
    //     req.onload = function() {
    //       if (_statusIsSuccess(req.status)) {
    //         resolve({
    //           status: req.status,
    //           message: req.statusText,
    //           response: req.response
    //         });
    //       } else {
    //         reject({
    //           status: req.status,
    //           message: req.statusText,
    //           response: req.response
    //         });
    //       }
    //     }
    //
    //     req.onerror = function() {
    //       reject({
    //         status: 0,
    //         message: 'Network Error'
    //       });
    //     }
    //     req.send();
    //   });
    // },
    //
    // post: function(urlPath, data, params) {
    //   return new Promise(function(resolve, reject) {
    //     var req = new XMLHttpRequest();
    //     req.open('POST', _buildUrl(urlPath, params));
    //     if (authToken) {
    //       req.setRequestHeader('Authorization', 'Bearer ' + authToken);
    //     }
    //     req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    //     _handler(req, resolve, reject);
    //     req.send(JSON.stringify(data));
    //   });
    // },
    //
    // postFormData: function(urlPath, data, params) {
    //   return new Promise(function(resolve, reject) {
    //     var req = new XMLHttpRequest();
    //     req.open('POST', _buildUrl(urlPath, params));
    //     if (authToken) {
    //       req.setRequestHeader('Authorization', 'Bearer ' + authToken);
    //     }
    //     _handler(req, resolve, reject);
    //     var formData = new FormData();
    //     for (var key in data) {
    //       formData.append(key, data[key]);
    //     }
    //     req.send(formData);
    //   });
    // },
    //
    // // TODO: this is not DRY. Should merge with get/post/etc,
    // // and pass method as argument
    // delete: function(urlPath, params) {
    //   return new Promise(function(resolve, reject) {
    //     var req = new XMLHttpRequest();
    //     req.open('DELETE', _buildUrl(urlPath, params));
    //     if (authToken) {
    //       req.setRequestHeader('Authorization', 'Bearer ' + authToken);
    //     }
    //     _handler(req, resolve, reject);
    //     req.send();
    //   });
    // }
  }
})();
