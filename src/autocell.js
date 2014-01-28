//     autocell.js 0.0.1
//     https://github.com/buzzdecafe/autocell
//     (c) 2014 Michael Hurley
//     AutoCell may be freely distributed under the MIT license.
//
// AutoCell
// -----
// Tinkering with cellular automata.
//
// Basic Setup
// -----------
// Uses a technique from the [Universal Module Definition][umd] to wrap this up for use in Node.js or in the browser,
// with or without an AMD-style loader.
//
//  [umd]: https://github.com/umdjs/umd/blob/master/returnExports.js

(function (root, factory) {if (typeof exports === 'object') {module.exports = factory(root);} else if (typeof define === 'function' && define.amd) {define(factory);} else {root.autocell = factory(root);}}(this, function (global) {

    return  (function() {
     
      function trampoline(fn) {
        var result = fn.apply(this, [].slice.call(arguments, 1));
        while (typeof result === 'function') {
          result = result();
        }
        return result;
      }

      // draw the state to the screen
      function display(state) {
        // override me
        console.log(state); 
      }

      // simple 1D grid
      function applyRule(rule, state) {
        return state.map(function(cell, idx, arr) {
          var west = idx > 0 ? arr[idx - 1] : 0;
          var east = idx < state.length - 1 ? arr[idx + 1] : 0;
          return rule(west, cell, east);
        });
      }

      // `rule` is a map from state to state
      // `state` is the current state of the automaton
      // `steps` is the number of iterations to run
      function autocell(rule, state, steps) {
        var ac = function(r, s, t) {
          display(s);
          return (t <= 0) ? s : function() { setTimeout(function () { ac(r, applyRule(r, s), t - 1); }, 500); };
        };
        return trampoline(ac, rule, state, steps);
      }

      return autocell;

    }());
}));
