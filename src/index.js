"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var core_1 = require("@material-ui/core");
var ThumbDown_1 = require("@material-ui/icons/ThumbDown");
var ThumbUp_1 = require("@material-ui/icons/ThumbUp");
var ArrowLeft_1 = require("@material-ui/icons/ArrowLeft");
var ArrowRight_1 = require("@material-ui/icons/ArrowRight");
var Star_1 = require("@material-ui/icons/Star");
var RecordVoiceOver_1 = require("@material-ui/icons/RecordVoiceOver");
require("typeface-roboto");
var yellow_1 = require("@material-ui/core/colors/yellow");
var grey_1 = require("@material-ui/core/colors/grey");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.voice = function () {
        var u = new SpeechSynthesisUtterance();
        u.text = "Ti si napisao: slon.";
        u.lang = "sr-RS";
        u.volume = 1; // 0 to 1
        u.rate = 0.7; // 0.1 to 1
        u.pitch = 2; //0 to 2
        speechSynthesis.speak(u);
    };
    App.prototype.render = function () {
        var hit = { color: yellow_1.default[700] };
        var miss = { color: grey_1.default[500] };
        return (React.createElement(core_1.Container, null,
            React.createElement(core_1.Paper, { elevation: 3, style: { padding: "1em" } },
                React.createElement(core_1.Grid, { container: true },
                    React.createElement(core_1.Grid, { item: true, xs: 12 },
                        React.createElement(core_1.Typography, { variant: 'h1', align: 'center' }, "Bukvarko")),
                    React.createElement(core_1.Grid, { item: true, xs: 1 },
                        React.createElement(core_1.IconButton, null,
                            React.createElement(ArrowLeft_1.default, { fontSize: 'large' }))),
                    React.createElement(core_1.Grid, { item: true, xs: 3 },
                        React.createElement("img", { src: "./media/slon.jpeg", alt: "Slon", style: { width: "90%", border: "1px solid black" } })),
                    React.createElement(core_1.Grid, { item: true, xs: 7 },
                        React.createElement(core_1.TextField, { variant: "outlined", inputProps: {
                                maxLength: 30, size: 30
                            } }),
                        React.createElement(core_1.IconButton, { style: { marginLeft: "1em" }, onClick: this.voice },
                            React.createElement(RecordVoiceOver_1.default, null)),
                        React.createElement("div", { style: { marginTop: "1em" } },
                            React.createElement(ThumbUp_1.default, { style: { color: "green" } }),
                            React.createElement(ThumbDown_1.default, { style: { color: "red" } }))),
                    React.createElement(core_1.Grid, { item: true, xs: 1 },
                        React.createElement(core_1.IconButton, null,
                            React.createElement(ArrowRight_1.default, { fontSize: 'large' })))),
                React.createElement(core_1.Grid, { container: true, style: { marginTop: '2em' } },
                    React.createElement(core_1.Grid, { item: true, xs: 12, alignContent: "center" },
                        React.createElement(Star_1.default, { style: hit }),
                        React.createElement(Star_1.default, { style: miss }),
                        React.createElement(Star_1.default, { style: miss }),
                        React.createElement(Star_1.default, { style: hit }),
                        React.createElement(Star_1.default, { style: hit }),
                        React.createElement(Star_1.default, { style: hit }),
                        React.createElement(Star_1.default, { style: hit }),
                        React.createElement(Star_1.default, { style: hit }),
                        React.createElement(Star_1.default, { style: hit }),
                        React.createElement(Star_1.default, { style: hit }),
                        React.createElement(Star_1.default, { style: hit }),
                        React.createElement(Star_1.default, { style: hit }),
                        React.createElement(Star_1.default, { style: hit }),
                        React.createElement(Star_1.default, { style: hit }),
                        React.createElement(Star_1.default, { style: hit }),
                        React.createElement(Star_1.default, { style: hit }))))));
    };
    return App;
}(react_1.Component));
react_dom_1.render(React.createElement(App, null), document.getElementById("root"));
