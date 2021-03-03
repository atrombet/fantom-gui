const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs");

let win;
function createWindow() {
  win = new BrowserWindow({ 
    width: 1400,
    height: 1000,
    webPreferences: { 
      nodeIntegration: true
    }
  });
  // load the dist folder from Angular
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, '/dist/fantom-gui/index.html'),
      protocol: "file:",
      slashes: true
    })
  );
  // The following is optional and will open the DevTools:
  // win.webContents.openDevTools()
  win.on("closed", () => {
    win = null;
  });
}

/**
 * Saves files to the file system. 
 * Expects an array of objects.
 * [
 *  { filepath: './xml/environment/file1.xml', content: '<root>XML 1 Content.</root>' }
 *  { filepath: './xml/environment/file2.xml', content: '<root>XML 2 Content.</root>' }
 * ]
 */
ipcMain.on('EXPORT_XML', async (event, files) => {
  // Get a location to save the export.
  const { canceled, filePaths } = await dialog.showOpenDialog(win, { properties: ['openDirectory'] });
  const folder = filePaths[0];

  // If the user didn't cancel the save.
  if (!canceled) {
    let results = { succeeded: [], failed: [] };
    // Write each file.
    files.forEach(file => {
      // Remove the filename from the filepath.
      const segments = file.filepath.split('/').slice(0, -1);
      // Recursively create all directories.
      segments.reduce((path, segment) => {
        const folderPath = `${path}${segment}/`;
        // Check if the directory exists.
        if (!fs.existsSync(folderPath)) {
          // Make the directory if it doesn't exist.
          fs.mkdirSync(folderPath);
        }
        return folderPath;
      }, `${folder}/`)
      // Write the file.
      fs.writeFileSync(`${folder}/${file.filepath}`, file.content, err => {
        // Track success or failure of file write operation.
        if (err) {
          results.failed.push(file.filepath)
        } else {
          results.succeeded.push(file.filepath);
        }
      });
    });
    // Check results of file save.
    if (!!results.failed.length) {
      // Throw error and list failed files.
      const failedFilenames = results.failed.reduce((str, failedFile) => { return `${str} \n ${failedFile}`; }, '');
      const message = `The following files failed to save: \n ${failedFilenames}`;
      throw message;
    } else {
      // TODO: send response to Angular.
      const succeededFilenames = results.succeeded.reduce((str, file) => { return `${str} \n ${file}`; }, '');
      const message = `The following ${results.succeeded.length} files were created: \n ${succeededFilenames}`;
    }
  }
})

app.on("ready", createWindow);
// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
