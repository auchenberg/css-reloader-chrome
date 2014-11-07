(function() {

  var shortcutSettings;
	function initialize() {
    document.addEventListener("keydown", onWindowKeyUp, false);
    chrome.extension.onRequest.addListener(onExtensionRequest);
    chrome.extension.sendRequest({'action' : 'getSettings'}, onGetSettings);
	}

	function reload() {
		var elements = document.querySelectorAll('link[rel=stylesheet][href]');
		for (var i = 0, element; element = elements[i]; i++) {
			var href = element.href.replace(/[?&]cssReloader=([^&$]*)/,'');
			element.href = href + (href.indexOf('?')>=0?'&':'?') + 'cssReloader=' + (new Date().valueOf());
		}
	}

  function onGetSettings(settings) {
    shortcutSettings = settings;
  }

	function onWindowKeyUp(e) {
		if(e.keyIdentifier == shortcutSettings["keyIdentifier"] &&
       e.shiftKey ===  shortcutSettings["shiftKeySelected"] &&
       e.altKey === shortcutSettings["altKeySelected"] &&
       e.ctrlKey === shortcutSettings["controlKeySelected"])
    {
			reload();
		}
	}

	function onExtensionRequest(request, sender) {
    if (request.action == "reload") {
		 reload();
	  }
	}

	CSSreloader = {
		reload : reload,
		initialize: initialize
	};

	CSSreloader.initialize();

})();




