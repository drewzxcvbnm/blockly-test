import Blockly from 'blockly';
import 'blockly/python';

Blockly.Blocks['mySampleBlock'] = {

    typeOptions: [['Card', 'card'], ['View', 'view']],
    selectedTempMode: 'view',

    renderRoomTemperatureInput: function () {
        this.appendDummyInput()
            .appendField("Temperature:")
            .appendField(new Blockly.FieldDropdown(this.typeOptions, this.handleTypeSelection.bind(this)), 'typeSelector')
            .appendField(new Blockly.FieldNumber(0, 0, 110, 0.1), "slot-temp")
            .appendField("°C")
    },

    renderSetTemperatureInput: function () {
        const tempOptions = new Blockly.FieldDropdown(this.typeOptions, this.handleTypeSelection.bind(this))
        this.appendDummyInput()
            .appendField("Temperature:")
            .appendField(tempOptions, 'typeSelector');
    },

    /**
     * Initiate the block. This runs before domToMutation.
     */

    init: function () {
        this.appendDummyInput()
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('Type ')
            .appendField(new Blockly.FieldDropdown(this.typeOptions, this.handleTypeSelection.bind(this)), 'typeSelector');

        this.selectedTempMode = this.getFieldValue('typeSelector');
        this.updateShape();
    },
    /**
     * This function runs each time you select a new value in your type selection dropdown field.
     * @param {string} newType This is the new value that the field will be set to.
     *
     * Important note: this function will run BEFORE the field's value is updated. This means that if you call
     * this.getFieldValue('typeSelector') within here, it will reflect the OLD value.
     *
     */
    handleTypeSelection: function (newType) {
        if (this.selectedTempMode !== newType) {
            this.selectedTempMode = newType;
            this.updateShape();
        }
    },
    /**
     * This will remove old inputs and add new inputs as you need, based on the columnType value selected
     */
    updateShape: function () {
        // Remove the old input (so that you don't have inputs stack repeatedly)
        if (this.getInput('appendToMe')) {
            this.removeInput('appendToMe');
        }
        // Append the new input based on the value of this.columnType
        if (this.selectedTempMode === 'card') {
            // if columnType = Card, show the following:
            //@TODO: define values in cardsList here
            var cardsList = [['Dummy Option', 'option']];
            this.appendDummyInput('appendToMe')
                .appendField(' Card: ')
                .appendField(new Blockly.FieldDropdown(cardsList), 'cardValue');
        } else if (this.selectedTempMode === 'view') {
            //  if columnType = view, show the following:
            //@TODO: define values in viewsList here
            var viewsList = [['Dummy Option', 'option']];
            this.appendDummyInput('appendToMe')
                .appendField(' View ')
                .appendField(new Blockly.FieldDropdown(viewsList), 'viewValue');
        }
    },


    /**
     * This function runs when saving your block to XML. This is important if you need to save your block to XML at any point and then either
     * generate code from that XML or repopulate your workspace from that XML
     */
    mutationToDom: function () {
        var container = document.createElement('mutation');
        // Do not use camelCase values for attribute names.
        container.setAttribute('column_type', this.columnType);
        // ALWAYS return container; this will be the input for domToMutation.
        return container;
    },
    /**
     * This function runs when loading your block from XML, after running init.
     * It's very important for updating your block in response to values selected in a field.
     */
    domToMutation: function (xmlElement) {
        // This attribute should match the one you used in mutationToDom
        var columnType = xmlElement.getAttribute('column_type');
        // If, for whatever reason, you try to save an undefined value in column_type, it will actually be saved as the string 'undefined'
        // If this is not an acceptable value, filter it out
        if (columnType && columnType !== 'undefined') {
            this.columnType = columnType;
        }
        // Run updateShape to append block values as needed
        this.updateShape();
    }

};


Blockly.Python['mySampleBlock'] = function (block) {
    const text_name = block.getFieldValue('Name');
    const statements_content = Blockly.Python.statementToCode(block, 'Content');
    return 'def ' + text_name + '(_object,**kwargs):\n' + statements_content + '\n';
};