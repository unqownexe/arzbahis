window["comm100main"] = (function (bundleJsName) {
	window["Comm100API"] = window["Comm100API"] || {};
	var api = window["Comm100API"];
	api.call = function (name) {
		return (new Function('return ' + name)).call();
	};
	api.chat_buttons = api.chat_buttons || [];
	window["brandingNameLowerCase"] = "comm100";
	window["brandingName"] = "Comm100";
	return function (main, standby, vue, others) {
		api.main = main;
        api.standby = standby;
		api.vue = vue;
		api.others = others;
		var src = vue + '/visitorside/js/' + bundleJsName;

		var iframe = document.createElement('iframe');
		iframe.style.display = 'none';
		iframe.id = "comm100-iframe";
		document.body.appendChild(iframe);
		var innerDoc = iframe.contentDocument;
		innerDoc.open();
		innerDoc.write('<!doctype html><head><script src="' + src + '" async type="text/javascript" charset="utf-8"></script></head><body></body>');
		innerDoc.close();
	};
}('bundle.07a87bf28975143a3c0d8afc74e64628.js'));
window["comm100main"]('https://chatserver15.comm100.io','https://max15.comm100.io/chatserver','https://vue.comm100.com');
delete window["comm100main"];