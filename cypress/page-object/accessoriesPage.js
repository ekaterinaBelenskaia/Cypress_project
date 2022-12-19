import SearchResultsPage from './searchResultsPage'

class AccessoriesPage {
	open() {
		cy.visit(`${Cypress.env('googleUrl')}/collection/accessories_wall?hl=en-US`);
	}

	get searchIcon() {
		return cy.get('div[data-test="header-search"]');
	}
	get searchInput() {
		return cy.get('input[placeholder="Search Google Store"]');
	}

	performSearch(productToSearch) {
		this.searchIcon.click();
		this.searchInput.type(`${productToSearch}{enter}`);
	}
}
module.exports = new AccessoriesPage();
