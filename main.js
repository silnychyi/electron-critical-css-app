const path = require('path');
const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const generator = require('./critical');

let mainWindow;
const isMac = process.platform === 'darwin';
const isDev = false;

function createWindow() {
    mainWindow = new BrowserWindow({
        title: 'Critical CSS Generator',
        width: isDev ? 1000 : 500,
        height: 500,
        resizable: false,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        },
        icon: '/assets/icon/critical-css'
    });

    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

app.whenReady().then(() => {
    createWindow();

    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);

    mainWindow.on('closed', () => (mainWindow = null))

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});


const menu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                click: () => app.quit()
            }
        ]
    },
    {
        label: "Edit",
        submenu: [
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]
    }
];

app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit();
    }
});

async function generateCss(url) {
    try {
        const css = await generator.generateCritical(url)
        mainWindow.webContents.send('css:done', { css })
    } catch (error) {
        mainWindow.webContents.send('css:done', { error: true })
        console.log('error')
    }
}

ipcMain.on('css:generate', (e, options) => {
    generateCss(options.url);
})
