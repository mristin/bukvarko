"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@material-ui/core");
const React = require("react");
const react_1 = require("react");
const Answer_1 = require("./Answer");
const Judge_1 = require("./Judge");
const NextQuestion_1 = require("./NextQuestion");
const PreviousQuestion_1 = require("./PreviousQuestion");
const Question_1 = require("./Question");
const Score_1 = require("./Score");
const Speaker_1 = require("./Speaker");
class App extends react_1.Component {
    render() {
        return (React.createElement(core_1.Container, null,
            React.createElement(core_1.Paper, { elevation: 3, style: { padding: "1em" } },
                React.createElement(core_1.Grid, { container: true },
                    React.createElement(core_1.Grid, { item: true, xs: 12 },
                        React.createElement(core_1.Typography, { variant: "h1", align: "center" }, "Bukvarko")),
                    React.createElement(core_1.Grid, { item: true, xs: 1 },
                        React.createElement(PreviousQuestion_1.PreviousQuestion, null)),
                    React.createElement(core_1.Grid, { item: true, xs: 3 },
                        React.createElement(Question_1.Question, null)),
                    React.createElement(core_1.Grid, { item: true, xs: 7 },
                        React.createElement(Answer_1.Answer, null),
                        React.createElement(Speaker_1.Speaker, null),
                        React.createElement("div", { style: { marginTop: "1em" } },
                            React.createElement(Judge_1.Judge, null))),
                    React.createElement(core_1.Grid, { item: true, xs: 1 },
                        React.createElement(NextQuestion_1.NextQuestion, null))),
                React.createElement(core_1.Grid, { container: true, style: { marginTop: "2em" } },
                    React.createElement(core_1.Grid, { item: true, xs: 12 },
                        React.createElement("div", { style: { textAlign: "center" } },
                            React.createElement(Score_1.Score, null)))))));
    }
}
exports.App = App;
