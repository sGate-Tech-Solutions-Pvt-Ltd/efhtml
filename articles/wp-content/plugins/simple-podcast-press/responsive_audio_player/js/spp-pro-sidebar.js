	var startCoords = {}, endCoords = {}; var totalwidth; var oldXPos;
		jQuery("#spp-pro-sidebar .sm2-progress-track").bind("touchstart", function(event) {
				
				jQuery('#spp-pro-sidebar .sm2-inline-time').css('display', 'none');
				jQuery('#spp-pro-sidebar .sm2-inline-time1').css('display', 'table-cell');


				jQuery('#spp-pro-sidebar .sm2-progress-bar').css('display', 'none');
				jQuery('#spp-pro-sidebar .sm2-progress-bar1').css('display', 'block');

				for (ids = window.soundManager.soundIDs.length-1; ids >= 0; ids--) {
					soundId = window.soundManager.soundIDs[ids];
					 i = window.soundManager.getSoundById(soundId);
					if (null != i &&  i.loaded) {
						isDragging = true;
					}else{
						isDragging = false;
					}
				}
			
			endCoords = event.originalEvent.targetTouches[0];
			oldXPos  = event.originalEvent.targetTouches[0].pageX;
			startCoords.pageX = event.originalEvent.targetTouches[0].pageX;
			startCoords.pageY = event.originalEvent.targetTouches[0].pageY;
		});

		jQuery("#spp-pro-sidebar .sm2-progress-track").bind("touchmove", function(event) {
			event.preventDefault();
					 if (isDragging)
					{
						 var touch = event.originalEvent.touches[0];
						  var elm = jQuery(this).offset();
						  var x = touch.pageX - elm.left;
						  var y = touch.pageY - elm.top;
						  totalwidth = jQuery('#spp-pro-sidebar .sm2-progress').width();
						  var percent =	x  /  totalwidth * 100;
							

						  if(x < jQuery(this).width() && x > 0){
							  if(y < jQuery(this).height() && y > 0){
									jQuery('#spp-pro-sidebar .sm2-progress-bar1').width(percent + '%');
									 jQuery('#spp-pro-sidebar .sm2-inline-time1').text(secsToTime(x));
							  }
						  }

								  
					}

			
			
		});

		jQuery("#spp-pro-sidebar .sm2-progress-track").bind("touchend", function(event) {
						var e = event.originalEvent.changedTouches[event.originalEvent.changedTouches.length - 1];
                                var n = jQuery(this).offset();
                                    pageX = e.pageX - n.left;
									var elm = jQuery(this).offset();
									var x = e.pageX - elm.left;
									var y = e.pageY - elm.top;
						if(x < jQuery(this).width() && x > 0){
							if(y < jQuery(this).height() && y > 0){
								for (ids = window.soundManager.soundIDs.length-1; ids >= 0; ids--) {
									soundId = window.soundManager.soundIDs[ids];
									var outerw = jQuery("#spp-pro-sidebar .sm2-progress").outerWidth();
									sound = window.soundManager.getSoundById(soundId);
										 
													if (sound.playState === 1) {
														if (null != i) var s = null !== sound.duration ? sound.duration : sound.durationEstimate;
														axes = pageX / outerw;
														sound.setPosition(axes*s);
														isDragging = false;
														setTimeout(function (){
															jQuery('#spp-pro-sidebar .sm2-progress-bar').css('display', 'block');
															jQuery('#spp-pro-sidebar .sm2-progress-bar1').css('display', 'none');
															jQuery('#spp-pro-sidebar .sm2-inline-time1').css('display', 'none');
															jQuery('#spp-pro-sidebar .sm2-inline-time').css('display', 'table-cell');
														;}, 1500);

													}
										}

									}
							}
		});

		jQuery("#spp-pro-sidebar .eq").on('click',function(){	  
				 for (i = window.soundManager.soundIDs.length-1; i >= 0; i--) {
						soundId = window.soundManager.soundIDs[i];
						soundManager.getSoundById(soundId).pause();
				}
						
		  });
			jQuery("#spp-pro-sidebar .bar").each(function(i) {
				fluctuate(jQuery(this));
			});
			jQuery(".timestamp").removeAttr("href");
