(function() {
	'use strict';

	var root = this;

	root.define([
		'views/composite/peopleview'
		],
		function( Peopleview ) {

			describe('Peopleview Compositeview', function () {

				it('should be an instance of Peopleview Compositeview', function () {
					var peopleview = new Peopleview();
					expect( peopleview ).to.be.an.instanceof( Peopleview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );