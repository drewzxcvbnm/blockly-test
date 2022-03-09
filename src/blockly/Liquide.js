import Blockly from 'blockly';
import 'blockly/python';

Blockly.Blocks['liquide-v1'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Use liquide:")
            .appendField(new Blockly.FieldLabelSerializable("type:"), "liquide-type-label")
            .appendField(new Blockly.FieldDropdown([["type_1", "OPTION_1"], ["type_2", "OPTION_2"], ["type_3", "OPTION_3"]]), "liquide-type")
            .appendField("name:")
            .appendField(new Blockly.FieldTextInput("liquide name"), "liquide-name");
        this.appendDummyInput()
            .appendField("Temperature:")
            .appendField(new Blockly.FieldNumber(0, 0, 110, 0.1), "slot-temp")
            .appendField("°C")
            .appendField("Incubation time: ")
            .appendField(new Blockly.FieldNumber(0, 0, Infinity, 0.1), "incubation")
            .appendField("ms");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
    },

};

Blockly.Python['liquide-v1'] = function (block) {
    const text_name = block.getFieldValue('liquide-type');
    const statements_content = Blockly.Python.statementToCode(block, 'Content');
    console.log(text_name)
    return text_name;
};


Blockly.Blocks['liquide-v2'] = {

    validate: function (newValue) {
        this.getSourceBlock().updateConnections(newValue);
        return newValue;
    },


    init: function () {

        // Go to database;

        this.appendDummyInput()
            .appendField("Use liquide:")
            .appendField(new Blockly.FieldTextInput("liquide name"), "liquide-name");
        this.appendDummyInput()
            .appendField("Temperature:")
            .appendField(new Blockly.FieldNumber(0, 0, 110, 0.1), "slot-temp")
            .appendField(new Blockly.FieldDropdown([["spec", "SET-TEMP"], ["room", "ROOM-TEMP"]]), "TEMP-SELECT")
            .appendField("°C")
            .appendField("Incubation time: ")
            .appendField(new Blockly.FieldNumber(0, 0, Infinity, 0.1), "incubation")
            .appendField("ms");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(210);
    },
};

Blockly.Python['liquide-v2'] = function (block) {
    const text_name = block.getFieldValue('Name');
    const statements_content = Blockly.Python.statementToCode(block, 'Content');
    return 'def ' + text_name + '(_object,**kwargs):\n' + statements_content + '\n';
};

Blockly.Blocks['liquide-wash'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Run washing:")
            .appendField(new Blockly.FieldDropdown([["wash_1", "OPTION_1"], ["wash_2", "OPTION_2"]]), "wash-liquid-type")

        this.appendDummyInput()
            .appendField("Temperature:")
            .appendField(new Blockly.FieldNumber(0, 0, 110, 0.1), "slot-temp")
            .appendField("°C")
            .appendField("Incubation time: ")
            .appendField(new Blockly.FieldNumber(0, 0, Infinity, 0.1), "incubation")
            .appendField("ms");

        this.appendDummyInput()
            .appendField("Repeat: ")
            .appendField(new Blockly.FieldNumber(0, 0, 100, 0), "wash-repeat")
            .appendField("times");


        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(100);
    },
};

Blockly.Python['liquide-wash'] = function (block) {
    const text_name = block.getFieldValue('Name');
    const statements_content = Blockly.Python.statementToCode(block, 'Content');
    return 'def ' + text_name + '(_object,**kwargs):\n' + statements_content + '\n';
};


Blockly.Blocks['exp-v1'] = {

    updateConnections: function (newValue) {
        this.removeInput('STATEMENT', /* no error */ true);
        this.removeInput('VALUE', /* no error */ true);
        if (newValue === 'STATEMENT') {
            this.appendStatementInput('STATEMENT');
        } else if (newValue === 'VALUE') {
            this.appendValueInput('VALUE');
        }
    },

    validate: function (newValue) {
        this.getSourceBlock().updateConnections(newValue);
        return newValue;
    },

    init: function () {
        const options = [
            ['has neither', 'NEITHER'],
            ['has statement', 'STATEMENT'],
            ['has value', 'VALUE'],
        ];

        this.appendDummyInput()
            // Pass the field constructor the options list, the validator, and the name.
            .appendField(new Blockly.FieldDropdown(options, this.validate), 'MODE');
    },
};

Blockly.Python['exp-v1'] = function (block) {
    const text_name = block.getFieldValue('Name');
    const statements_content = Blockly.Python.statementToCode(block, 'Content');
    return 'def ' + text_name + '(_object,**kwargs):\n' + statements_content + '\n';
};

