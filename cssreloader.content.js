(function() {

    var allSettings;
    
    function initialize() {
        document.addEventListener("keydown", onWindowKeyDown, false);
        chrome.extension.onRequest.addListener(onExtensionRequest);
        chrome.extension.sendRequest({'action' : 'getSettings'}, onGetSettings);
    }

    function reload() {
        var elements = document.querySelectorAll('link[rel=stylesheet][href]');
        for (var i = 0, element; element = elements[i]; i++) {
            var href = element.href;
            if (!domainIsBlacklisted(getDomain(href))) {
                var href = href.replace(/[?&]cssReloader=([^&$]*)/,'');
                element.href = href + (href.indexOf('?')>=0?'&':'?') + 'cssReloader=' + (new Date().valueOf());
            }
        }
    }

    function getDomain(url) {
        return url.replace('http://','').replace('https://','').split('/')[0];
    }

    function domainIsBlacklisted(domain) {
        if (allSettings["blacklist"]) {
            for (var i = 0; i < allSettings["blacklist"].length; i++) {
                if (allSettings["blacklist"][i] == domain) {
                    return true;
                }
            }
        }
        return false;
    }

    function onGetSettings(settings) {
        allSettings = settings;
    }

    function onWindowKeyDown(e) {
        if(e.key == allSettings["keyIdentifier"] &&
        e.shiftKey ===  allSettings["shiftKeySelected"] &&
        e.altKey === allSettings["altKeySelected"] &&
        e.ctrlKey === allSettings["controlKeySelected"])
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




