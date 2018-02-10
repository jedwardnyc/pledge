'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

function $Promise(executor){
  if(typeof executor !== 'function'){
    throw new TypeError('some error with executor and function');
  }
  this._state = 'pending';
  this._handlerGroups = [];
  executor(this._internalResolve.bind(this),this._internalReject.bind(this))
}

// $Promise.prototype._state = "pending";

$Promise.prototype._internalResolve = function(input){
  if(this._state === 'pending'){
    this._state = 'fulfilled';
    this._value = input;
  };
};

$Promise.prototype._internalReject = function(reason){
  if(this._state === 'pending'){
    this._state = 'rejected';
    this._value = reason;
  };
};

$Promise.prototype.then = function (success,error){
  if (typeof success !== 'function') success = null;
  if (typeof error !== 'function') error = null;
  this._handlerGroups.push({successCb: success, errorCb: error})
  if(this._state !== 'pending'){
    this._callHandlers();
  }

}

$Promise.prototype._callHandlers = function(){
  const val = this._value
  this._handlerGroups[0].successCb(val)
  this._handlerGroups.shift();
}



/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = $Promise;

So in a Node-based project we could write things like this:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
