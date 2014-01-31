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
     
      var delay = 500;
      var steps = 5;

      // draw the state to the screen
      var display = function(state) {
        // override me
        console.log(state); 
      };

      var rule = function(w, c, e) {
        return (w + c + e) % 2;
      };

      var mapping = function(cell, idx, arr) {
          var west = idx > 0 ? arr[idx - 1] : 0;
          var east = idx < state.length - 1 ? arr[idx + 1] : 0;
          return rule(west, cell, east);
      };

      // simple 1D grid
      function applyRule(state) {
        return state.map(mapping);
      }

      // `rule` is a map from state to state
      // `state` is the current state of the automaton
      // `steps` is the number of iterations to run
      function run(rule, state, steps) {
        display(state);
        if (steps > 0) {
          setTimeout(function() {
            run(rule, applyRule(state), steps - 1);
          }, delay);
        } else {
          console.log('done');
        }
      }

      return {
        run: run,
        setDelay: function(n) {
          delay = n;
        },
        setDisplay: function(fn) {
          display = fn;
        },
        setMapping: function(fn) {
          mapping = fn;
        },
        setRule: function(fn) {
          rule = fn;
        },
        setSteps: function(n) {
          steps = n;
        }
      };

    }());
}));
