"use strict";
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
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
var fs = require("fs");
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    electron_1.app.quit();
}
var createWindow = function () {
    // Create the browser window.
    var mainWindow = new electron_1.BrowserWindow({
        height: 600,
        width: 800,
        minWidth: 500,
        minHeight: 500,
        autoHideMenuBar: true,
        darkTheme: true,
        icon: '..\\\\Assets\\Vector 2.icns',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, '../src/index.html'));
    try {
        console.log("reading file system");
        fs.readFile('./settings', 'utf-8', function (e, data) {
            if (e) {
                fs.writeFile('./settings', '0', function () {
                    mainWindow.setAlwaysOnTop(true, 'floating');
                });
                console.log(e);
                return;
            }
            if (data == "0") {
                mainWindow.setAlwaysOnTop(true, 'floating');
            }
            else {
                mainWindow.setAlwaysOnTop(false, 'floating');
            }
        });
    }
    catch (e) {
    }
    //Checks top var every second
    setInterval(function () {
        checkTop(mainWindow);
    }, 1000);
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
};
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on('ready', createWindow);
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
// Scripts
//Script to check the top variable every second this removes the need to restart the application
function checkTop(winProcess) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                // console.log(`reading file system`);
                fs.readFile('./settings', 'utf-8', function (e, data) {
                    if (e) {
                        fs.writeFile('./settings', '0', function () {
                            winProcess.setAlwaysOnTop(true, 'floating');
                        });
                        console.log(e);
                        return;
                    }
                    if (data == "0") {
                        winProcess.setAlwaysOnTop(true, 'floating');
                    }
                    else {
                        winProcess.setAlwaysOnTop(false, 'floating');
                    }
                });
            }
            catch (e) {
                console.log(e);
            }
            return [2 /*return*/];
        });
    });
}
//# sourceMappingURL=index.js.map