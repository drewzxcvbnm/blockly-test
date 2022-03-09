import "./App.css";
import "./blockly/Liquid";
import "./blockly/Example";
import React, {useState} from "react";
import {BlocklyWorkspace} from "react-blockly";
import Blockly from "blockly";

export default function App() {
    const [xml, setXml] = useState("");
    const [javascriptCode, setJavascriptCode] = useState("");

    const initialXml =
        '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="text" x="70" y="30"><field name="TEXT"></field></block></xml>';
    const toolboxCategories = {
        kind: "categoryToolbox",
        contents: [
            {
                kind: "category",
                name: "Logic",
                colour: "#5C81A6",
                contents: [
                    {
                        kind: "block",
                        type: "controls_if",
                    },
                    {
                        kind: "block",
                        type: "logic_compare",
                    },
                ],
            },
            {
                kind: "category",
                name: "Time",
                colour: "#5CA65C",
                contents: [
                    {
                        kind: "block",
                        type: "math_round",
                    },
                    {
                        kind: "block",
                        type: "math_number",
                    },
                ],
            },
            {
                kind: "category",
                name: "Liquid",
                colour: "#5CA699",
                contents: [
                    {kind: "block", type: "liquid-v1"},
                    {kind: "block", type: "liquid-v2"},
                    {kind: "block", type: "liquid-wash"},
                ],
            },
            {
                kind: "category",
                name: "Example",
                colour: "#5CA699",
                contents: [
                    {kind: "block", type: "mySampleBlock"},
                ],
            },
        ],
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