const { app, BrowserWindow } = require("electron");
const path = require("path");
let mainWindow, mainWindow2;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
	app.quit();
}

const createWindow = () => {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		x: 0,
		y: 0,
		width: 1024,
		height: 768,
    	//frame: false,
		webPreferences: {
			preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
		},
	});

	// and load the index.html of the app.
	mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
	//mainWindow.setFullScreen(true);

	// Open the DevTools.
	// mainWindow.webContents.openDevTools();

	mainWindow.on("close", () => {
		mainWindow = null;
		mainWindow2 = null;
		app.quit();
	});


	mainWindow2 = new BrowserWindow({
		x: 1024,
		y: 0,
		width: 1024,
		height: 600,
    	//frame: false,
		webPreferences: {
			preload: MAIN_WINDOW2_PRELOAD_WEBPACK_ENTRY,
		},
	});

	// and load the index.html of the app.
	mainWindow2.loadURL(MAIN_WINDOW2_WEBPACK_ENTRY);
	//mainWindow2.setFullScreen(true);
	// Open the DevTools.
	//mainWindow2.webContents.openDevTools();

  mainWindow2.on("close", () => {
		mainWindow = null;
		mainWindow2 = null;
		app.quit();
	});
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
	createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
