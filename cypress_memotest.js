const URL = '127.0.0.1:8080/src/memotest.html';
const CANTIDAD_CUADROS =12;

context('memotest', () => {

	before(() => {
		cy.visit(URL);
	});

	it('la cantidad de cuadros debe ser 12', ()=> {
		cy.get('#tablero-juego').find('.cuadro').should('have.length', CANTIDAD_CUADROS);
	});
});