const {app, BrowserWindow, Menu} = require('electron');
// const path = require('path');
// const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let newPersonalWindow;
let editPersonalWindow;

const URL = 'http://localhost:4200';

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
  // win.webContents.openDevTools()

}

function createNewPersonalWindow(){
  newPersonalWindow = new BrowserWindow({
    width:1200,
    height:800,
    parent:mainWindow,
    modal:true,
    show:false,
    center:true,
    alwaysOnTop:true,
    backgroundColor: '#868e96'

  });
  newPersonalWindow.loadURL(URL + '/newPersonal');  
  newPersonalWindow.show();
}

function createEditPersonalWindow(){
  editPersonalWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    parent: mainWindow,
    modal: true,
    show: false,
    center: true,
    alwaysOnTop: true,
    backgroundColor: '#868e96'

  });
  editPersonalWindow.loadURL(URL + '/editPersonal');
  editPersonalWindow.show();
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const template = [
  {
    label: 'Navivgation',
    submenu: [
      {
        label: 'Übersicht',
        click() {mainWindow.loadURL(URL)}
        }
      ]
  },
  {
    label: 'Kameraden',
    submenu: [
      {
        label: 'hinzufügen',
        click() { createNewPersonalWindow() }
        },
      {
        label: 'ansehen/bearbeiten',
        click() { createEditPersonalWindow() }
      }
      ]
  },
  {
    role: 'window',
    submenu: [
      {role: 'toggledevtools'},
      {role: 'minimize'},
      {role: 'close'}
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        // click () { require('electron').shell.openExternal('https://electron.atom.io') }
      }
    ]
  }
];
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu)
