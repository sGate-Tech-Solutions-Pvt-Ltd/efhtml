/*  function secsToTime(e){
		for (ids = window.soundManager.soundIDs.length-1; ids >= 0; ids--) {
			soundId = window.soundManager.soundIDs[ids];
			//soundId = window.soundManager.soundIDs[0];
			i = window.soundManager.getSoundById(soundId);
		
			
			if (null != i) var s = null !== i.duration ? i.duration : i.durationEstimate;
			if (null != i && null !== s && s > 0 &&  i.loaded) {
				var n = jQuery("#spp-pro-sidebar .sm2-progress").outerWidth();
				a = s * e / n / 1e3;
				o = Math.floor(a % 60);
				r = Math.floor(a / 60 % 60);
				l = Math.floor(a / 3600);
				p = r + ":";
				p += o > 9 ? o : "0" + o, l > 0 && (p = r > 9 ? l + ":" + p : l + ":0" + p);
				return p;
			}
		}//end for
	}//end function */
	function fluctuate(bar) {
		var height = Math.floor(Math.random() * 25) + 1;
		//Animate the equalizer bar repeatedly
		bar.animate({
			height: height
		},150, function() {
			fluctuate(jQuery(this));
		});
	}
