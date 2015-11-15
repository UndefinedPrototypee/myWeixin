define(['jquery', 'jutil'], function($, JU) {
	var go = function() {
		console.log("Go go go a la a la  a la...");
	};
	
	function move() {
		console.info("Move Move Move .now ");
	}
	
	return {
		helloRequireJs : function() {
			debugger;
			console.info("My First RequireJS ... ");
			this.say();
			go();
			move();
		}, 
		hello : function () {
			console.info("Say Hello to World");
		},
		say : function () {
			console.info("I Fall in Love With You in the First Sight !");
		},
		seeJQuery : function () {
			console.info("$符号代表:" + $);
		}
	}
});