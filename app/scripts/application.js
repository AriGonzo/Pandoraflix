define([
	'jquery',
	'backbone.marionette',
	'communicator',
	'templates',
	'hbs!tmpl/welcome',
	'hbs!tmpl/landing'
],

function($, Marionette, Communicator, templates, Welcome_tmpl, Landing_tmpl ) {
    'use strict';
	console.log(templates)
	var welcomeTmpl = Welcome_tmpl;
	var landingTmpl = Landing_tmpl;

	var App = new Marionette.Application();

	/* Add application regions here */
	App.addRegions({
		main: '#main'
	});

	/* Add initializers here */
	App.addInitializer( function () {
		//$.material.init()
	});

	App.navigate = function(route,  options){
		options || (options = {});
		Backbone.history.navigate(route, options);
	};

	App.on('start', function(){
		Backbone.history.start();
		App.trigger('start:welcome')
	})

	return window.app = App

});
