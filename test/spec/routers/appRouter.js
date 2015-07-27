(function() {
	'use strict';

	var root = this;

	root.define([
		'routers/appRouter'
		],
		function( Approuter ) {

			describe('Approuter Router', function () {

				it('should be an instance of Approuter Router', function () {
					var appRouter = new Approuter();
					expect( appRouter ).to.be.an.instanceof( Approuter );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );