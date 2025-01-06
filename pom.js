class AutomationPracticePage {
    locators = {
        radioButtons: '[type="radio"]',
        autocompleteInput: '.inputs.ui-autocomplete-input',
        suggestionList: '#ui-id-1',
        dropdown: '#dropdown-class-example',
        checkboxes: {
            option1: '#checkBoxOption1',
            option2: '#checkBoxOption2',
            option3: '#checkBoxOption3',
        },
        nameField: '#name',
        confirmButton: '#confirmbtn',
        hideTextboxButton: '#hide-textbox',
        displayedTextbox: '#displayed-text',
        showTextboxButton: '#show-textbox',
        hoverButton: '#mousehover',
        mouseHoverContent: '.mouse-hover-content',
        webTable: '.table-display',
        footerLinks: '.gf-li',
    };

    visit() {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
        return this;
    }

    checkRadioButtons() {
        cy.get(this.locators.radioButtons).check();
        return this;
    }

    typeInAutocomplete(input) {
        cy.get(this.locators.autocompleteInput).clear().type(input);
        return this;
    }

    selectSuggestion(suggestion) {
        cy.get(this.locators.suggestionList).contains(suggestion).click();
        return this;
    }

    selectDropdown(option) {
        cy.get(this.locators.dropdown).select(option);
        return this;
    }

    toggleCheckbox(option) {
        cy.get(this.locators.checkboxes[option]).click();
        return this;
    }

    fillNameAndConfirm(name) {
        cy.get(this.locators.nameField).clear().type(name);
        cy.get(this.locators.confirmButton).click();
        return this;
    }

    hideTextbox() {
        cy.get(this.locators.hideTextboxButton).click();
        return this;
    }

    showTextbox() {
        cy.get(this.locators.showTextboxButton).click();
        return this;
    }

    hoverAndClick(option) {
        cy.get(this.locators.hoverButton).realHover();
        cy.get(this.locators.mouseHoverContent).contains(option).click();
        return this;
    }

    validateWebTable(course, expectedValue) {
        cy.get(this.locators.webTable)
            .contains(course)
            .parent()
            .children()
            .eq(2)
            .should('contain', expectedValue);
        return this;
    }

    validateBrokenLink(linkText) {
        cy.get(this.locators.footerLinks)
            .contains(linkText)
            .invoke('attr', 'href')
            .then((url) => {
                cy.request({ url: url, failOnStatusCode: false }).its('status').should('equal', 404);
            });
        return this;
    }
}

export default new AutomationPracticePage();
