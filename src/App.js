import "./App.css";
import "./blockly/Library";
import "./blockly/Example";
import React, {useState} from "react";
import {BlocklyWorkspace} from "react-blockly";
import Blockly from "blockly";

export default function App() {
    const [xml, setXml] = useState("");
    const [javascriptCode, setJavascriptCode] = useState("");

    // const initialXml =
        // '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="text" x="70" y="30"><field name="TEXT"></field></block></xml>';
    const initialXml =
        '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="begin_protocol" x="70" y="30"></block></xml>';
    const toolboxCategories = 
    {
        // kind: "categoryToolbox",
        contents:
         [
            // {
            //     kind: "category",
            //     name: "Liquid Application",
            //     colour: "#5CA699",
            //     contents: [
                    {kind: "block", type: "apply_liquid"},
                    {kind: "block", type: "apply_washing_liquid"},
                    {kind: "block", type: "apply_parafinization_liquid"},
                // ],
            // },
            // {
                // kind: "category",
                // name: "Other",
                // colour: "#5CA699",
                // contents: [
                    // {kind: "block", type: "begin_protocol"},
                    {kind: "block", type: "repeat"},
                    {kind: "block", type: "set_temperature"},
                    {kind: "block", type: "normalize_temperature"},
                // ],
            // },
        ]
    };

    function workspaceDidChange(workspace) {
        const code = Blockly.Python.workspaceToCode(workspace);
        setJavascriptCode(code);
    }

    return (
        <>
            <BlocklyWorkspace
                toolboxConfiguration={toolboxCategories}
                initialXml={initialXml}
                className="fill-height"
                workspaceConfiguration={{
                    grid: {
                        spacing: 20,
                        length: 3,
                        colour: "#ccc",
                        snap: true,
                    },
                }}
                onWorkspaceChange={workspaceDidChange}
                onXmlChange={setXml}
            />
            <pre id="generated-xml">{xml}</pre>
            <textarea
                id="code"
                style={{height: "200px", width: "400px"}}
                value={javascriptCode}
                readOnly
            >

        </textarea>
        </>
    );
}