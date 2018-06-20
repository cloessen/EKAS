const {app, BrowserWindow, Menu} = require('electron');
// const path = require('path');
// const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

const URL = 'http://localhost:4200/Altenholz';

function createWindows () {

  // Create the browser window.
  mainWindow = new BrowserWindow({title: 'EKAS - Einsatz Kräfte Anzeige System', icon: 'assets/icons/EKAS_bg.png'});
  mainWindow.maximize();
  // and load the index.html of the app.
  mainWindow.loadURL(URL);
  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    mainWindow = null
  });
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  // const menu = Menu.buildFromTemplate(template);
  const menu = null;
  Menu.setApplicationMenu(menu);
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindows);

// Quit when all windows are closed.
app.on('window-all-closed', () => {

  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindows()
  }
});
