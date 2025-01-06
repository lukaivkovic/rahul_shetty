Cypress.Commands.add('assertElementVisibility', (selector, isVisible = true) => {
    cy.get(selector).should(isVisible ? 'be.visible' : 'not.be.visible');
});

Cypress.Commands.add('assertDropdownValue', (selector, value) => {
    cy.get(selector).should('have.value', value);
});

Cypress.Commands.add('checkRadioButtonCount', (expectedCount) => {
    cy.get('input[type="radio"]')
        .should('have.length', expectedCount)
        .each(($radio) => {
            cy.wrap($radio)
                .should('be.visible')
                .should('not.be.disabled');
        });
});
