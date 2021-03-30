const { app, BrowserWindow, ipcMain, dialog } = require('electron');

if (require('electron-squirrel-startup')) return;

const path = require('path');
const url = require('url');
const fs = require('fs');
const cp = require('child_process');
const os = require('os');

if (handleSquirrelEvent()) {
  // squirrel event handled and app will exit in 1000ms, so don't do anything else
  return;
}

function reverseSlashesForWindows(path) {
  return path.split('/').join('\\');
}

function handleSquirrelEvent() {
  if (process.argv.length === 1) {
    return false;
  }

  const appFolder = path.resolve(process.execPath, '..');
  const rootAtomFolder = path.resolve(appFolder, '..');
  const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
  const exeName = path.basename(process.execPath);

  const spawn = function(command, args) {
    let spawnedProcess, error;

    try {
      spawnedProcess = cp.spawn(command, args, {detached: true});
    } catch (error) {}

    return spawnedProcess;
  };

  const spawnUpdate = function(args) {
    return spawn(updateDotExe, args);
  };

  const squirrelEvent = process.argv[1];
  switch (squirrelEvent) {
    case '--squirrel-install':
    case '--squirrel-updated':
      // Install desktop and start menu shortcuts
      spawnUpdate(['--createShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-uninstall':
      // Undo anything you did in the --squirrel-install and
      // --squirrel-updated handlers

      // Remove desktop and start menu shortcuts
      spawnUpdate(['--removeShortcut', exeName]);

      setTimeout(app.quit, 1000);
      return true;

    case '--squirrel-obsolete':
      // This is called on the outgoing version of your app before
      // we update to the new version - it's the opposite of
      // --squirrel-updated

      app.quit();
      return true;
  }
};

let win;

/**
 * Create the main application window.
 */
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
ipcMain.on('EXPORT_XML', async (event, { files, simName }) => {
  // Get a location to save the export.
  const { canceled, filePaths } = await dialog.showOpenDialog(win, { properties: ['openDirectory'] });
  const folder = filePaths[0];

  // If the user didn't cancel the save.
  if (!canceled) {
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
      fs.writeFileSync(`${folder}/${file.filepath}`, file.content, err => {});
    });
    // send response to client.
    const simRootFolder = `${folder}/${simName}`;
    event.reply('EXPORT_XML', simRootFolder);
  }
});

ipcMain.on('SELECT_SIM_LOCATION', (event) => replyWithPathCallback('SELECT_SIM_LOCATION', event));
ipcMain.on('SELECT_OUTPUT_LOCATION', (event) => replyWithPathCallback('SELECT_OUTPUT_LOCATION', event));

async function replyWithPathCallback(channel, event) {
  // Get a location to save the export.
  const { canceled, filePaths } = await dialog.showOpenDialog(win, { properties: ['openDirectory'] });
  const path = filePaths[0];

  if (!canceled) {
    event.reply(channel, path);
  }
}

ipcMain.on('EXECUTE_SIMULATION', async (event, { pathToSimConfig, simFile, outputPath }) => {
  let fantomLocation = './fantom.exe';

  console.log('Path to sim:', pathToSimConfig);
  console.log('Sim File:', simFile);
  console.log('Output path:', outputPath);

  if (os.platform() === 'win32') {
    pathToSimConfig = reverseSlashesForWindows(pathToSimConfig);
    outputPath = reverseSlashesForWindows(outputPath);
    fantomLocation = reverseSlashesForWindows(fantomLocation);
  }

  cp.exec(`${fantomLocation} -i ${pathToSimConfig} -f ${simFile} -o ${outputPath}`, (error) => {
    if (error) {
      console.error(error);
    }
  });

});

app.on("ready", createWindow);
// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
