var SETTINGS = {
  Authority: "//192.168.179.129:3002",
  ClientRefreshRate: 1,
  ServerRefreshRate: 1000 // 3 seconds
}

if(app)
  app.constant("SETTINGS",SETTINGS);