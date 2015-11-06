define(['jquery', 'jutil'], function($, JU) {
	return {
		helloRequireJs : function() {
			alert("My First RequireJS ... ");
		}, 
		hello : function () {
			alert("Say Hello to World");
		},
		say : function () {
			alert("I Fall in Love With You in the First Sight !");
		},
		seeJQuery : function () {
			alert("$符号代表:" + $);
		}
	}
});