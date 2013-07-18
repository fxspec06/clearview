function ClearviewAssistant() {
}

ClearviewAssistant.prototype.setup = function() {
	timer = window.setInterval(this.getWallpaper.bind(this), 10000);
	isMaximized = isFullScreen = false;
	this.getWallpaper();
	this.activateWindow = this.refreshUp.bind(this);
	Mojo.Event.listen(this.controller.stageController.document, Mojo.Event.stageActivate, this.activateWindow);
	this.deactivateWindow = this.refreshDown.bind(this);
	Mojo.Event.listen(this.controller.stageController.document, Mojo.Event.stageDeactivate, this.deactivateWindow);
	this.handleWindowResizeHandler = this.getWallpaper.bindAsEventListener(this);
    this.controller.listen(this.controller.window, 'resize', this.handleWindowResizeHandler);
};
ClearviewAssistant.prototype.refreshDown = function(event) {
	isMaximized = false;
	this.getWallpaper();
};
ClearviewAssistant.prototype.refreshUp = function(event) {
	isMaximized = true;
	this.getWallpaper();
};
ClearviewAssistant.prototype.getWallpaper = function(event) {
	isFullScreen ? window.PalmSystem.enableFullScreenMode(true) : window.PalmSystem.enableFullScreenMode(false);
	this.controller.serviceRequest('palm://com.palm.systemservice', {
		method : "getPreferences",
		parameters : {
			"keys" : ["wallpaper"],
			"subscribe" : false
		},
		onSuccess : this.wallpaperSuccess.bind(this),
		onFailure : this.wallpaperFailure.bind(this)
	});
};
ClearviewAssistant.prototype.wallpaperSuccess = function(responseData) {
	this.currentWallpaper = "file://" + responseData.wallpaper.wallpaperFile;
	$("clearviewDiv").innerHTML = '<img id="clearview" src="' + this.currentWallpaper + '">';
	newImg = new Image();
	newImg.src = this.currentWallpaper;
	oldHeight = newImg.height;
	oldWidth = newImg.width;
	isMaximized ? this.maximize() : this.minimize();
	this.controller.listen(this.controller.get("clearview"), Mojo.Event.tap, this.divTap.bind(this));
};
ClearviewAssistant.prototype.wallpaperFailure = function(responseData) {
	this.currentWallpaper = "file://" + responseData.wallpaper.wallpaperFile;
};
ClearviewAssistant.prototype.divTap = function(event) {
	isFullScreen ? isFullScreen = false : isFullScreen = true;
	this.getWallpaper();
};
ClearviewAssistant.prototype.minimize = function() {
	isMaximized = false;
	var newWidth;
	var newHeight;
	var numToDivideBy1 = .973075 * oldWidth;
	var numToDivideBy2 = .973075 * oldHeight;
	var factorHeight = 768;
	if(oldWidth < 1024 || oldHeight === oldWidth) {
		factorHeight = oldHeight;
	} else if(oldWidth < oldWidth * (oldWidth / oldHeight) && oldWidth / oldHeight < 4 / 3) {
		factorHeight = 1024 / (oldWidth / oldHeight);
	}
	var factorX = factorHeight * (oldWidth / oldHeight);
	var factorY = factorHeight;
	var adjustX = (( factorX - 1024) / 2) * .973075;
	numToDivideBy1 = numToDivideBy1 * 2 * (factorX / oldWidth);
	numToDivideBy2 = numToDivideBy2 * 2 * (factorY / oldHeight);
	var aspectRatio1 = oldWidth / numToDivideBy1;
	var aspectRatio2 = oldHeight / numToDivideBy2;
	newWidth = oldWidth / aspectRatio1;
	newHeight = oldHeight / aspectRatio2;
	$("clearview").style.width = newWidth + "px";
	$("clearview").style.height = newHeight + "px";
	var newLeft = newWidth / 4;
	var newTop = newHeight / 4 + ((newHeight / 2) - 768) / 2;
	newLeft = newLeft - 14 + adjustX;
	newTop = newTop - 47;
	//if(isFullScreen){newTop = newTop - 12};
	$("clearview").style.top = 0 - newTop + "px";
	$("clearview").style.left = 0 - newLeft + "px";
	if(window.innerWidth < 1024) {this.isRotated(null, false);}
};
ClearviewAssistant.prototype.maximize = function() {
	isMaximized = true;
	var newWidth;
	var newHeight;
	var numToDivideBy1 = .973075 * oldWidth / 1.9379;
	var numToDivideBy2 = .973075 * oldHeight / 1.9379;
	var factorHeight = 768;
	if(oldWidth < 1024 || oldHeight === oldWidth) {
		factorHeight = oldHeight;
	} else if(oldWidth < oldWidth * (oldWidth / oldHeight) && oldWidth / oldHeight < 4 / 3) {
		factorHeight = 1024 / (oldWidth / oldHeight);
	}
	var factorX = factorHeight * (oldWidth / oldHeight);
	var factorY = factorHeight;
	var adjustX = (( factorX - 1024) / 2) * .973075 / 1.9379;
	var adjustY = 0;
	numToDivideBy1 = numToDivideBy1 * 2 * (factorX / oldWidth);
	numToDivideBy2 = numToDivideBy2 * 2 * (factorY / oldHeight);
	var aspectRatio1 = oldWidth / numToDivideBy1;
	var aspectRatio2 = oldHeight / numToDivideBy2;
	newWidth = oldWidth / aspectRatio1;
	newHeight = oldHeight / aspectRatio2;
	$("clearview").style.width = newWidth + "px";
	$("clearview").style.height = newHeight + "px";
	var newLeft = newWidth / 4;
	var newTop = newHeight / 4 + ((newHeight / 2) - 768) / 2;
	newLeft = newLeft - 254 + adjustX;
	newTop = newTop + 29 + adjustY;
	if(isFullScreen){newTop = newTop - 28};
	$("clearview").style.top = 0 - newTop + "px";
	$("clearview").style.left = 0 - newLeft + "px";
	if(window.innerWidth < 1024) {this.isRotated(null, true)}
};
ClearviewAssistant.prototype.isRotated = function(event, maximize) {
	var adjustY = -97;
	if(maximize) {adjustY = 27;}
	var multiplier = .75;
	var newHeight = parseInt($("clearview").style.height);
	var newWidth = parseInt($("clearview").style.width);
	if(oldHeight < 768 && oldWidth < 1024 || newWidth === newHeight) {
		multiplier = 1;
	} else if(oldWidth < oldWidth * (oldWidth / oldHeight) && oldWidth / oldHeight < 4 / 3) {
		multiplier = oldHeight / oldWidth;
	}
	newWidth = newWidth / multiplier;
	newHeight = newHeight / multiplier;
	var factorWidth = 1024;
	if(newHeight < 1024) {factorWidth = newHeight;}
	var factorX = factorWidth * (newWidth / newHeight);
	var factorY = factorWidth;
	if(oldHeight < 768 && oldWidth < 1024) {
		adjustY = (newHeight / 8 - 491) / 4;
		if(maximize) {
			adjustY = (newHeight / 8 + 28) / 4;
		}
		adjustY = adjustY - (newHeight / 4 + ((newHeight / 2) - 1024) / 2);
	}
	adjustY = adjustY + ((factorY - 1024) / 2) * .973075;
	$("clearview").style.height = newHeight + "px";
	$("clearview").style.width = newWidth + "px";
	var newLeft = newWidth / 2 - 384;
	var newTop = newHeight / 4 + ((newHeight / 2) - 1024) / 2;
	newTop = newTop + adjustY;
	if(isFullScreen){
		newTop = newTop - 28;
		if(!isMaximized){newTop = newTop + 28}
	}
	$("clearview").style.top = 0 - newTop + "px";
	$("clearview").style.left = 0 - newLeft + "px";
};