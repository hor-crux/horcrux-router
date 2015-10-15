System.config({
  defaultJSExtensions: true,
  transpiler: "none",
  paths: {
    "*": "dist/*",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "horcrux-core": "github:hor-crux/horcrux-core@master",
    "horcrux-di": "github:hor-crux/horcrux-di@master",
    "horcrux-flux": "github:hor-crux/horcrux-flux@master",
    "github:hor-crux/horcrux-core@master": {
      "horcrux-event": "github:hor-crux/horcrux-event@master",
      "html": "github:hor-crux/html@master",
      "observejs": "github:polymer/observe-js@0.5.6",
      "webcomponents": "github:webcomponents/webcomponentsjs@0.7.14"
    },
    "github:hor-crux/horcrux-di@master": {
      "horcrux-core": "github:hor-crux/horcrux-core@master"
    },
    "github:hor-crux/horcrux-event@master": {
      "horcrux-di": "github:hor-crux/horcrux-di@master"
    },
    "github:hor-crux/horcrux-flux@master": {
      "horcrux-core": "github:hor-crux/horcrux-core@master",
      "horcrux-di": "github:hor-crux/horcrux-di@master"
    }
  }
});
