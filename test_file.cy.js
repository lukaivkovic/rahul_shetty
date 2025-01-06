import automationPracticePage from "../../support/page_objects/automationPracticePage"
import '../../support/custom_commands/commands'

describe('Automation Practice Tests', () => {
    beforeEach(() => {
        automationPracticePage.visit()
        // Load the test data from fixture file and alias it for easier access
        cy.fixture('testData.json').as('testData')
    })

    // Validate radio button functionality
    it('Step 2 - Radio Button Example', function () {
        // Check all available radio buttons
        automationPracticePage.checkRadioButtons()
        cy.checkRadioButtonCount(3) 
    })

    // Validate autocomplete functionality
    it('Step 3 - Suggestion Class Example', function () {
        automationPracticePage.typeInAutocomplete(this.testData.autocompleteInput.validInput)
            .selectSuggestion(this.testData.autocompleteInput.suggestion);
    })

    // Validate dropdown selection functionality
    it('Step 4 - Dropdown Example', function () {
        this.testData.dropdownOptions.forEach((option) => {
            automationPracticePage.selectDropdown(option)
            cy.assertDropdownValue('#dropdown-class-example', option.toLowerCase())
        })
    })

    // Validate checkbox functionality
    it('Step 5 - Checkbox Example', function () {
        // Log all available checkboxes for debugging purposes
        cy.get('input[type="checkbox"]').then($boxes => {
            cy.log('Available checkboxes:', $boxes.map((_, el) => el.id).get())
        })
    
        // Iterate through each checkbox option and ensure it's checked
        this.testData.checkboxOptions.forEach((option) => {
            cy.log(`Checking option: ${option}`)
            
            // Locate the checkbox, ensure it is visible, and check it if not already checked
            cy.get(`input[type="checkbox"][value="${option}"]`)
              .should('be.visible')
              .then($checkbox => {
                  if (!$checkbox.is(':checked')) {
                      automationPracticePage.toggleCheckbox(option)
                  }
              })
              .should('be.checked'); // Verify that the checkbox is checked
        })
    })

    // Validate alert box functionality
    it('Step 6 - Switch to Alert Example', function () {
        automationPracticePage.fillNameAndConfirm(this.testData.alertName)
        cy.on('window:confirm', (text) => {
            expect(text).to.include(`Hello ${this.testData.alertName}, Are you sure you want to confirm?`)
        })
    })

    // Validate the visibility toggle functionality
    it('Step 7 - Element Displayed Example', function () {
        automationPracticePage.hideTextbox()
        cy.assertElementVisibility('#displayed-text', false)
        automationPracticePage.showTextbox()
        cy.assertElementVisibility('#displayed-text')
    })

    // Validate mouse hover functionality
    it('Step 8 - Mouse Hover Example', function () {
        automationPracticePage.hoverAndClick('Top');
        cy.window().its('scrollY').should('equal', 0)
    })

    // Validate web table data
    it('Step 9 - Web Table Example', function () {
        automationPracticePage.validateWebTable(this.testData.webTableCourse, this.testData.webTablePrice);
    })

    // Validate handling of broken links
    it('Step 10 - Broken Link', function () {
        // Check if a specified link is broken by verifying its status code
        automationPracticePage.validateBrokenLink(this.testData.brokenLinkText)
    })
})
