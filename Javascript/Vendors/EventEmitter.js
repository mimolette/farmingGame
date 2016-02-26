// eventEmitter.js
function EventEmitter(){
  this.events = {}; // associative array : event => functions to call
}

// Add a function to the event
EventEmitter.prototype.on = function(eventName, fn){
  this.events[eventName] = this.events[eventName] || [];
  this.events[eventName].push(fn);
};

// Remove a function to the event
EventEmitter.prototype.off = function(eventName, fn){
  var idx = this.events[eventName].indexOf(fn);
  if(idx !== -1){
    this.events[eventName].splice(idx, 1);
  }
};

// Trigger the event (call all the functions linked)
EventEmitter.prototype.emit = function(eventName, data){
  if(this.events[eventName]){
    this.events[eventName].forEach(function(fn){
      fn(data);
    });
  }
};
