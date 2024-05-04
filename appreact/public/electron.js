const { app, BrowserWindow, Menu, Tray } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
const { spawn } = require("node-spawn");
const { MongoMemoryServer } = require("mongodb-memory-server");

let tray = null;

function createTray() {
  tray = new Tray(path.join(__dirname, "thisicon.png"));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Quit",
      click: () => {
        app.quit();
      },
    },
  ]);
  tray.setToolTip("My App");
  tray.setContextMenu(contextMenu);
}

app.on("ready", () => {
  createWindow();
  createTray();
});

let mongod, mongoUri;

async function startServer() {
  mongod = new MongoMemoryServer();
  mongoUri = await mongod.getConnectionString();

  const nodeProcess = spawn("node", ["../Backend-Invoice-App/server.js"], {
    env: { MONGODB_URI: "mongodb://localhost:27017/InvoiceApp" },
  });

  nodeProcess.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  nodeProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  nodeProcess.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

startServer();

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const url = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "./build/index.html")}`;

  mainWindow.loadURL(url);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
