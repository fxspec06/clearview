



	var adjustY = -220;//-690;
	var adjustX = -10;//-663;
	if (maximize){
		adjustX = -332;
		adjustY = -101;
	}
	var multiplier = .75;
	
	var newHeight = parseInt($("clearview").style.height);
	var newWidth = parseInt($("clearview").style.width);
	
	
	
	
	
	
	
	if (newHeight < 1024 || newWidth === newHeight){
		multiplier = 1;
	}
	newWidth = newWidth / multiplier;
	newHeight = newHeight / multiplier;
	var factorWidth = 1024;
	if (newHeight < 1024){
		factorWidth = oldWidth;
		adjustY = 220;
		if(maximize){
			adjustY = 332;
			adjustX = -101;
		}
	}
	
	
	
	
	
	
	var factorX = factorWidth * (newWidth / newHeight);
	var factorY = factorWidth;
	adjustX = adjustX + ((factorX - 768) / 2) * .973075;
	adjustY = adjustY + ((factorY - 1024) / 2) * .973075;
	
	$("clearview").style.height = newHeight + "px";
	$("clearview").style.width = newWidth + "px";
	
	newLeft = newWidth / 4;
	newTop = newHeight / 4 + ((newHeight / 2) - 768) / 2;
	newLeft = newLeft + adjustX;
	newTop = newTop + adjustY;
	$("clearview").style.top = 0 - newTop + "px";
	$("clearview").style.left = 0 - newLeft + "px";
	














/////////////////////////////////////////////////////////////////^^ works vv doesn't work, but does mini shit


	var adjustY = -220;//-690;
	var adjustX = -10;//-663;
	if (maximize){
		adjustX = -332;
		adjustY = -101;
	}
	var multiplier = .75;
	
	var newHeight = parseInt($("clearview").style.height);
	var newWidth = parseInt($("clearview").style.width);
	
	newWidth = newWidth / multiplier;
	newHeight = newHeight / multiplier;
	var factorWidth = 1024;
	if (newHeight < 1024){
		factorWidth = newHeight;
	}
	var factorX = factorWidth * (newWidth / newHeight);
	var factorY = factorWidth;
	adjustX = adjustX + ((factorX - 768) / 2) * .973075;
	adjustY = adjustY + ((factorY - 1024) / 2) * .973075;
	
	$("clearview").style.height = newHeight + "px";
	$("clearview").style.width = newWidth + "px";
	
	newLeft = newWidth / 4;
	newTop = newHeight / 4 + ((newHeight / 2) - 768) / 2;
	newLeft = newLeft + adjustX;
	newTop = newTop + adjustY;
	$("clearview").style.top = 0 - newTop + "px";
	$("clearview").style.left = 0 - newLeft + "px";
	




















