// variables and imports
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var desktopCapturer = require('electron').desktopCapturer;
var fs = require("fs");
var portAudio = require('naudiodon');
var settingsVisible = true;
var currentSource = "";
var audioId = '';
//classes
var desktop = /** @class */ (function () {
    function desktop() {
    }
    desktop.prototype.updateSources = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, desktopCapturer.getSources({ types: ['window', 'screen', 'audio'] }).then(function (sources) { return __awaiter(_this, void 0, void 0, function () {
                            var list, ele, _i, sources_1, source;
                            return __generator(this, function (_a) {
                                list = document.getElementById("win-drop");
                                list.innerHTML = " ";
                                ele = "";
                                for (_i = 0, sources_1 = sources; _i < sources_1.length; _i++) {
                                    source = sources_1[_i];
                                    if (source.name === currentSource) {
                                        ele = "<li><a class=\"dropdown-item active\" onclick=\"setStream('" + source.name + "','" + source.id + "')\">" + source.name + "</a></li>";
                                    }
                                    else {
                                        ele = "<li><a class=\"dropdown-item\" onclick=\"setStream('" + source.name + "','" + source.id + "')\">" + source.name + "</a></li>";
                                    }
                                    list.innerHTML += ele;
                                }
                                return [2 /*return*/];
                            });
                        }); })["catch"](function (err) {
                            console.error("There has been an error getting the window sources:\n " + err);
                            return "error";
                        })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return desktop;
}());
var desk = new desktop();
//Video streaming and miscelanious code goes here
document.addEventListener("keydown", function (event) {
    if (event.key == "Tab") {
        windowToggle();
    }
});
function load() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            desk.updateSources();
            window.alert("You can press Tab to toggle the settings panel");
            setInterval(function () { desk.updateSources(); }, 1000);
            readTop();
            return [2 /*return*/];
        });
    });
}
function readTop() {
    var check = document.getElementById('Chck');
    fs.readFile('./settings', 'utf-8', function (e, data) {
        console.log(data);
        if (data == "0") {
            check.checked = true;
        }
        else {
            check.checked = false;
        }
    });
}
function writeTop() {
    var check = document.getElementById('Chck');
    if (check.checked) {
        fs.writeFile('./settings', "0", function () { });
    }
    else {
        fs.writeFile('./settings', "1", function () { });
    }
}
function setStream(name, id) {
    return __awaiter(this, void 0, void 0, function () {
        var listItems, _i, listItems_1, ele, constraints, stream, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    listItems = document.getElementById("win-drop").childNodes;
                    for (_i = 0, listItems_1 = listItems; _i < listItems_1.length; _i++) {
                        ele = listItems_1[_i];
                        if (ele.innerHTML === name) {
                            ele.classList.add("active");
                        }
                        else {
                            try {
                                ele.classList.remove("active");
                            }
                            catch (e) {
                                console.log(e);
                            }
                        }
                    }
                    currentSource = name;
                    if (name === "full") {
                        console.log("desktop");
                        constraints = {
                            audio: {
                                mandatory: {
                                    chromeMediaSource: 'desktop',
                                    echoCancellation: true
                                }
                            },
                            video: {
                                mandatory: {
                                    chromeMediaSource: 'desktop',
                                    chromeMediaSourceId: 'screen:0:0'
                                }
                            }
                        };
                    }
                    else {
                        console.log("single app");
                        constraints = {
                            audio: {
                                mandatory: {
                                    chromeMediaSource: 'desktop',
                                    chromeMediaSourceId: id,
                                    echoCancellation: true
                                }
                            },
                            video: {
                                mandatory: {
                                    chromeMediaSource: 'desktop',
                                    chromeMediaSourceId: id
                                }
                            }
                        };
                    }
                    return [4 /*yield*/, navigator.mediaDevices.getUserMedia(constraints)];
                case 1:
                    stream = _a.sent();
                    handleStream(stream);
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function handleStream(stream) {
    var vid = document.querySelector('video');
    console.log("setting stream:\nname:\nObject:");
    console.log(stream);
    vid.srcObject = stream;
    vid.volume = 0.5;
    vid.onloadedmetadata = function (e) { return vid.play(); };
}
function windowToggle() {
    return __awaiter(this, void 0, void 0, function () {
        var win;
        return __generator(this, function (_a) {
            console.log("toggled settings:\t" + settingsVisible);
            win = Array.from(document.getElementsByClassName("settings"))[0];
            if (settingsVisible) {
                win.style.top = "100%";
            }
            else {
                win.style.top = "0";
            }
            settingsVisible = !settingsVisible;
            return [2 /*return*/];
        });
    });
}
// Audio based code goes here
function getAudioSources() {
    return __awaiter(this, void 0, void 0, function () {
        var sources, sourceList, _i, sources_2, i;
        return __generator(this, function (_a) {
            sources = portAudio.getDevices();
            for (_i = 0, sources_2 = sources; _i < sources_2.length; _i++) {
                i = sources_2[_i];
                sourceList = sourceList + "<li value=\"" + i + "\">" + i.name + "</li>";
            }
            window.alert("<div><h1>Please select a audio source</h1><ul>" + sourceList + "</ul></div>");
            return [2 /*return*/];
        });
    });
}
//# sourceMappingURL=scripts.js.map