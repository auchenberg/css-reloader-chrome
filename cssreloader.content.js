(function() {

    var shortcutSettings;
    
    var blacklist = [
        new Regexp('^https?://use\.typekit\.net\/'),
        new Regexp('^https?://fonts\.googleapis\.com\/')
    ];
    
    function initialize() {
        document.addEventListener("keydown", onWindowKeyDown, false);
        chrome.extension.onRequest.addListener(onExtensionRequest);
        chrome.extension.sendRequest({'action' : 'getSettings'}, onGetSettings);
    }

    function reload() {
        var elements = document.querySelectorAll('link[rel=stylesheet][href]');
        for (var i = 0, element; element = elements[i]; i++) {
            if (isBlacklisted(element.href)) continue;
            var href = element.href.replace(/[?&]cssReloader=([^&$]*)/,'');
            element.href = href + (href.indexOf('?')>=0?'&':'?') + 'cssReloader=' + (new Date().valueOf());
        }
    }
    
    function isBlacklisted(href) {
        for (var i = 0, len = blacklist.length; i < len; i++) {
            if (blacklist[i].test(href)) return true;
        }
    }

    function onGetSettings(settings) {
        shortcutSettings = settings;
    }

    function onWindowKeyDown(e) {
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




