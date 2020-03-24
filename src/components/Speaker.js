"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const RecordVoiceOver_1 = require("@material-ui/icons/RecordVoiceOver");
const React = require("react");
const react_redux_1 = require("react-redux");
const mapStateToProps = (state) => {
    const answer = state.answers.get(state.currentQuestion);
    const text = answer ? `Ovde piše: ${answer}` : "Ovde ništa ne piše.";
    return { text };
};
const connector = react_redux_1.connect(mapStateToProps);
function speak(text) {
    const u = new SpeechSynthesisUtterance();
    u.text = text;
    u.lang = "sr-RS";
    u.volume = 1; // 0 to 1
    u.rate = 0.7; // 0.1 to 1
    u.pitch = 2; //0 to 2
    speechSynthesis.speak(u);
}
const component = (props) => (React.createElement(core_1.IconButton, { style: { marginLeft: "1em" }, onClick: () => speak(props.text) },
    React.createElement(RecordVoiceOver_1.default, null)));
exports.Speaker = connector(component);
