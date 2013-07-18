function StageAssistant() {
	/* this is the creator function for your stage assistant object */
}

StageAssistant.prototype.setup = function() {
	x = 0;
	y = 0;
	
	/* this function is for setup tasks that have to happen when the stage is first created */
	Mojo.Controller.stageController.pushScene("clearview");
};
