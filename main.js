const electron =  require('electron');
const url = require('url');
const path = require('path')

const { app, BrowserWindow, Menu } =  electron;

let mainWindow;
let addWindow;

// create menu template
const mainMenuTemplate = [
    {
        label: "File"
    },
    {
        label: "File",
        submenu: [
            { 
                label:"Add Item",
                click(){
                    createAddWindow()
                }
            },
            { label:"Clear Items" },
            {
                label: "Quit",
                accelerator: process.platform == 'darwin' ? "Command+Q": "Ctrl+Q",
                click(){
                    app.quit();
                }
            }
        ]
    },
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
    // Quit App when closed
    mainWindow.on('closed', function(){
        app.quit()
    })
    // build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    // insert menu
    Menu.setApplicationMenu(mainMenu)
})


// handle create add window
function createAddWindow(){
    addWindow = new BrowserWindow({
        width:300,
        height:200,
        title: "Add Shopping List item"
    });
    // load HTML into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
}