/*global define */
define(function (require) {
  'use strict';

  return {
    welcome: require('hbs!../templates/welcome'),
    results: require('hbs!../templates/results'),
    layout: require('hbs!../templates/layout')
  }
})