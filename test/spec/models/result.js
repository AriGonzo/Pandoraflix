(function() {
	'use strict';

	var root = this;

	root.define([
		'models/result'
		],
		function( Result ) {

			describe('Result Model', function () {

				it('should be an instance of Result Model', function () {
					var result = new Result();
					expect( result ).to.be.an.instanceof( Result );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );