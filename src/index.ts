import { app, BrowserWindow, desktopCapturer } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}
const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
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
      enableRemoteModule: true,
      // uncomment the line below before production
      // devTools: false
    }
  });
  
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, '../src/index.html'))
  try{
    console.log(`reading file system`);
    fs.readFile('./settings','utf-8',(e,data) => {
      if(e){
        fs.writeFile('./settings','0',() => {
          mainWindow.setAlwaysOnTop(true, 'floating');
        });
        console.log(e);
        return
      }
      if(data == "0"){
        mainWindow.setAlwaysOnTop(true, 'floating');
      } else {
        mainWindow.setAlwaysOnTop(false, 'floating');
      }
    });
  }catch(e){

  }
  //Checks top var every second
  setInterval(() => {
    checkTop(mainWindow);
  }, 1000);


  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


// Scripts

//Script to check the top variable every second this removes the need to restart the application

async function checkTop(winProcess: BrowserWindow){
  try{
    // console.log(`reading file system`);
    fs.readFile('./settings','utf-8',(e,data) => {
      if(e){
        fs.writeFile('./settings','0',() => {
          winProcess.setAlwaysOnTop(true, 'floating');
        });
        console.log(e);
        return
      }
      if(data == "0"){
        winProcess.setAlwaysOnTop(true, 'floating');
      } else {
        winProcess.setAlwaysOnTop(false, 'floating');
      }
    });
  }catch(e){
    console.log(e);
  }
}