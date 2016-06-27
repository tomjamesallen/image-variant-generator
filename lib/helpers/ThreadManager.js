'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = function (maxThreadsInput) {
  // We need to keep track of threads.
  // Each thread has a means of being resolved, and on resolving it's removed
  // from the queue.
  //
  // When a thread is resolved we check the queue for any unresolved threads.

  var maxThreads = maxThreadsInput || 1;
  var activeThreads = 0;
  var threadCounter = 0;

  function newThreadId() {
    return threadCounter++;
  }

  function onThreadResolved() {
    activeThreads--;

    // Call next thread.
    _underscore2.default.find(api.threads, function (thread) {
      if (thread.state === null) {
        thread._call();
        return true;
      }
    });
  }

  var api = {
    threads: {},
    newThread: function newThread(callback) {
      var threadApi = {
        id: newThreadId(),
        callback: callback || function () {},
        state: null, // null, 'active', 'resolved'
        _call: function _call() {
          this.state = 'active';
          this.callback(this);
          activeThreads++;
        },
        resolve: function resolve() {
          this.state = 'resolved';
          onThreadResolved();
        }
      };

      if (activeThreads < maxThreads) {
        threadApi._call();
      }

      api.threads[threadApi.id] = threadApi;

      return threadApi;
    },
    resolveThread: function resolveThread(id) {
      if (_typeof(api.threads[id]) === 'object') {
        api.threads[id].resolve();
      }
    }
  };

  return api;
};

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }