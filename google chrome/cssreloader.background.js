(function () {

  var storageKey = "shortcutOptions";
  var defaultShortcutOptions = {
    "keyIdentifier" :  'F9',
    "altKeySelected": false,
    "controlKeySelected" : false,
    "shiftKeySelected": false
  };
  
	function initialize() {
		chrome.contextMenus.create({"title": "Reload CSS", "type": "normal", "onclick": onContextMenuClicked});
	  chrome.extension.onRequest.addListener(onExtensionRequest);
  }

  function onExtensionRequest(request, sender, callback) {
    if (request.action == 'getSettings') {
        callback(getSettings());
    }
    if (request.action == 'saveSettings') {
        saveSettings(request.data);
    }
  }
	
	function onContextMenuClicked(info, tab) {
		chrome.tabs.sendRequest(tab.id, {action: "reload"});	
	}

  function saveSettings(settings) {
    if(settings) {
      localStorage[storageKey] = JSON.stringify(settings);     
    }
  }
  function getSettings() {
    var storedObject = localStorage[storageKey];
    var settings;
    
    if(storedObject) {
      settings = JSON.parse(storedObject);
    } else {
      // Going for default settings
      settings = defaultShortcutOptions;
      saveSettings(settings);
    }

    return settings;
  }

	initialize();
	
})();





