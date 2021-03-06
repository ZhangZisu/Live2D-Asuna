var live2DHelper;
/**
 * InitLive2D
 * @param {String} modelName 
 */
function initLive2D(modelName) {
	if ($("#glcanvas").length == 0) {
		return;
	}
	loadModel(modelName);
}
/**
 * loadModel
 * @param {String} modelName 
 */
function loadModel(modelName) {
	live2DHelper = new Live2DHelper({ canvas: 'glcanvas' });
	console.info("Model : " + modelName);
	var path = `https://zhangzisu.cn/static/live2d/asuna/asuna_${modelName}/asuna_${modelName}.model.json`;
	live2DHelper.loadModel(path, function () {
		live2DHelper.startMotion("", "0");
		live2DHelper.startTurnHead();
		followMouse();

		if (!$("#glcanvas").hasClass("animated")) {
			$("#glcanvas").addClass("animated fadeIn");
		}
	});
}

function followMouse() {
	// head follow mouse
	var isMouseDown = false;
	$("#glcanvas").mousedown(function (e) {
		isMouseDown = true;
	})
		.mouseup(function (e) {
			isMouseDown = false;
		})
		.mouseout(function (e) {
			isMouseDown = false;
			if (live2DHelper != null) {
				live2DHelper.viewPointer(0, 0);
			}
		})
		.mousemove(function (e) {
			if (live2DHelper != null) {
				live2DHelper.followPointer(e);
				//console.log("---"  + e.pageX + "   " + e.pageY)
			}
		});
}

/**
 * --------------------------------------------------
 *                       tool
 * --------------------------------------------------
 */

/**
 * return a random number
 * @param  {int} min number
 * @param  {int} max number
 * @return {int} random number
 */
function getRandomNum(min, max) {
	var range = max - min;
	return (min + Math.round(Math.random() * range));
}

/**
 * return a random array
 * @param  {int} min number
 * @param  {int} max number
 * @return {Array} shuffle array
 */
function getRandomArr(min, max) {
	var arr = [];
	for (var i = 0; i <= max - min; i++) {
		arr[i] = min + i;
	}
	// arr.sort(function(){
	//   return 0.5-Math.random();
	// });
	shuffle(arr);
	return arr;
}

/**
 * shuffle
 * @param  {Array} 
 * @return {Array} 
 */
function shuffle(arr) {
	var length = arr.length,
		temp,
		random;
	while (0 != length) {
		random = Math.floor(Math.random() * length)
		length--;
		// swap
		temp = arr[length];
		arr[length] = arr[random];
		arr[random] = temp;
	}
	return arr;
}
