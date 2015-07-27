(function() {
	'use strict';

	var root = this;

	root.define([
		'controllers/welcomeController'
		],
		function( Welcomecontroller ) {

			describe('Welcomecontroller Controller', function () {

				it('should be an instance of Welcomecontroller Controller', function () {
					var welcomeController = new Welcomecontroller();
					expect( welcomeController ).to.be.an.instanceof( Welcomecontroller );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );