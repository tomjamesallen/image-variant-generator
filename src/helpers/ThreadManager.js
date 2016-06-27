import _ from 'underscore'

export default function(maxThreadsInput) {
  // We need to keep track of threads.
  // Each thread has a means of being resolved, and on resolving it's removed
  // from the queue.
  //
  // When a thread is resolved we check the queue for any unresolved threads.

  var maxThreads = maxThreadsInput || 1
  var activeThreads = 0
  var threadCounter = 0

  function newThreadId() {
    return threadCounter++
  }

  function onThreadResolved() {
    activeThreads--

    // Call next thread.
    _.find(api.threads, function(thread) {
      if (thread.state === null) {
        thread._call()
        return true
      }
    })
  }

  var api = {
    threads: {},
    newThread(callback) {
      var threadApi = {
        id: newThreadId(),
        callback: callback || function() {},
        state: null, // null, 'active', 'resolved'
        _call() {
          this.state = 'active'
          this.callback(this)
          activeThreads++
        },
        resolve() {
          this.state = 'resolved'
          onThreadResolved()
        }
      }

      if (activeThreads < maxThreads) {
        threadApi._call()
      }

      api.threads[threadApi.id] = threadApi

      return threadApi
    },
    resolveThread(id) {
      if (typeof api.threads[id] === 'object') {
        api.threads[id].resolve()
      }
    }
  }

  return api
}
