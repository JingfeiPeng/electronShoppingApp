const electron =  require('electron');
const url = require('url');
const path = require('path')

// set ENV
process.env.NODE_ENV = 'production';


const { app, BrowserWindow, Menu, ipcMain } =  electron;

let mainWindow;
let addWindow;

// catch item:add
ipcMain.on("item:add", function(e, item){
    console.log(item)
    mainWindow.webContents.send("item:add", item);
    addWindow.close();
})

// create menu template
const mainMenuTemplate = [
    {
        label: "File",
        submenu: [
            { 
                label:"Add Item",
                click(){
                    createAddWindow()
                }
            },
            { 
                label:"Clear Items",
                click(){
                    // send an event to mainWindow.html
                    mainWindow.webContents.send('item:clear');
                }
             },
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

// if mac, add a placeholder menu at beginning
if (process.platform === 'darwin'){
    mainMenuTemplate.unshift({ // unshift push to front of an arrary
        label: "File"
    })
}

if (process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({ // unshift push to front of an arrary
        label: "Developer Tools",
        submenu:[
            {            
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? "Command+I": "Ctrl+I",
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role:"reload"
            }
        ]
        
    })
}

// listen for app to be ready
app.on('ready', function(){
    // create new window
    mainWindow = new BrowserWindow({
        //The lines below allow require to be used in html
        webPreferences: {
            nodeIntegration: true
        }
    });
    // load HTML into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true,
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
        title: "Add Shopping List item",
        //The lines below solved the issue
        webPreferences: {
            nodeIntegration: true
        }
    });
    // load HTML into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    // helps memory garbage collection
    addWindow.on('closed', function(){
        addWindow = null;
    })
}