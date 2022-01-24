var loader = setInterval(function () {
	// check if doc is ready
	if(document.readyState !== "complete") return
	clearInterval(loader)
	docReady()
}, 300)


let docReady = () => {
	let vid = document.querySelector(".mainVidWrapper > video")
	prepareVid(vid)
	prepareScrollmagic()
}

let isElement = (el) => {
	//If it isn't "undefined" and it isn't "null", then it exists.
	if(typeof(el) != 'undefined' && el != null){
		return true
	} else{
		return false
	}
}


let prepareVid = (vid) => {
	if (isElement(vid)) {
		vid.volume = 0.4
	}
}

let prepareScrollmagic = () => {
	let controller = new ScrollMagic.Controller({
		globalSceneOptions: {
			triggerHook: 'onLeave',
			duration: "100%" // this works just fine with duration 0 as well
			// However with large numbers (>20) of pinned sections display errors can occur so every section should be unpinned once it's covered by the next section.
			// Normally 100% would work for this, but here 200% is used, as Panel 3 is shown for more than 100% of scrollheight due to the pause.
		}
	});

	// get all slides
	let slides = document.querySelectorAll(".snapContainer > section");

	// create scene for every slide
	for (let i=0; i<slides.length; i++) {
		new ScrollMagic.Scene({
				triggerElement: slides[i]
			})
			.setPin(slides[i], {pushFollowers: false})
			// .addIndicators() // add indicators (requires plugin)
			.addTo(controller);
	}
}
