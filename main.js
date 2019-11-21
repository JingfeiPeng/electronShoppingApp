const electron =  require('electron');
const url = require('url');
const path = require('path')

const { app, BrowserWindow, Menu } =  electron;

let mainWindow;

// create menu template
const mainMenuTemplate = [
    {
        label: "File",
        submenu: [{role: 'TODO'}]
    },
    {
        label: "Menu1",
        submenu: [{role: 'TODO'}]
    },
    {
        label: "Menu2",
        submenu: [{role: 'TODO'}]
    },
    {
        label:"menu3",
        submenu:[{role:"wa"}]
    }
];

// listen for app to be ready
app.on('ready', function(){
    // create new window
    mainWindow = new BrowserWindow({});
    // load HTML into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    // build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    // insert menu
    Menu.setApplicationMenu(mainMenu)
})
