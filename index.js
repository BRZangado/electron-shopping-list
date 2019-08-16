const url = require('url');
const path = require('path');
const {app, BrowserWindow, Menu} = require('electron')


function createWindow(){
    let mainWindow = new BrowserWindow({});
    // Load HTML File into the window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'main_window.html'),
        protocol:'file',
        slashes:true
    }));

    //Quit app on close
    mainWindow.on('closed', function(){
        app.quit();
    })

    var menu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(menu); 
}

// Listen for the app to be ready
app.on('ready', createWindow);

//Handle create add window
function createAddWindow(){
    let addWindow = new BrowserWindow({
        width:300,
        height:200,
        title:'Add Item'
    });
    // Load HTML File into the window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'add_window.html'),
        protocol:'file',
        slashes:true
    }));
}

let menuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label:'Add item',
                click(){
                    createAddWindow();
                }
            },
            {
                label:'Exit',
                //Keyboard shortcuts
                accelerator: process.platform == 'darwin' ? "Command+Q" : "Ctrl+Q",
                click(){
                    app.quit();
                }
            }
        ]
    },
]