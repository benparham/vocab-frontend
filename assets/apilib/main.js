'use strict'

var API_BASE_URL = 'http://localhost:8000/';

var Cookies = require('cookies-js');

var _statusIsSuccess = function(status) {
  return (status >= 200 && status <= 208) || status == 226;
}

window.Vocab = (function() {
  var authToken = Cookies.get('authToken');

  function _setAuth(token) {
    authToken = token;
    Cookies.set('authToken', token);
  }

  function _send_request(method, params) {

    var url = params.url;

    return new Promise(function(resolve, reject) {
      if (!authToken) {
        reject({
          status: 401,
          message: 'Not Authenticated'
        });
        return;
      }

      var req = new XMLHttpRequest();
      req.open(method, url);
      req.setRequestHeader('Authorization', 'Token ' + authToken);
      req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      req.setRequestHeader('Accept', 'application/json');

      req.onload = function() {
        if (_statusIsSuccess(req.status)) {
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

      if (params.hasOwnProperty('data')) {
        req.send(JSON.stringify(params.data));
        // var formData = new FormData();
        // for (var key in params.data) {
        //   formData.append(key, params.data[key]);
        // }
        // req.send(formData);
      } else {
        req.send();
      }
    });
  }

  return {
    hasToken: function() {return !!authToken;},

    login: function(username, password) {
      return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('POST', API_BASE_URL + 'token/');
        req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        req.setRequestHeader('Accept', 'application/json');

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

    getSession: function() {
      return _send_request('GET', {url: API_BASE_URL + 'user/'});
    },

    getAllEntries: function() {
      return _send_request('GET', {url: API_BASE_URL + 'entries/'});
    },

    addWord: function(word) {
      return _send_request(
        'POST',
        {
          url: API_BASE_URL + 'entries/',
          data: {word: word}
        }
      );
    }
  }
})();
