function Acl_show_Image_3() {
	var img_src= document.getElementById("logo-image").value;
	jQuery("#logo_img_prev").attr('src',img_src);   
}
//button Button-font-size slider
jQuery(function() {
	jQuery( "#logo-width-slider" ).slider({
		orientation: "horizontal",
		range: "min",
		max: 500,
		min:0,
		slide: function( event, ui ) {
			jQuery( "#logo-width-text-box" ).val( ui.value );
		}
	});	
	var logo_width = page_settings_object.logo_width;
	if(logo_width != ""){
		jQuery( "#logo-width-slider" ).slider("value",logo_width);
	}else {
		logo_width = "200";
	}
	jQuery( "#logo-width-text-box" ).val( jQuery( "#logo-width-slider" ).slider( "value") );
});

//button Button-font-size slider
jQuery(function() {
	jQuery( "#logo-height-slider" ).slider({
		orientation: "horizontal",
		range: "min",
		max: 500,
		min:0,
		slide: function(event,ui){
			jQuery( "#logo-height-text-box" ).val( ui.value );
		}
	});
	var logo_height = page_settings_object.logo_height;
	if(logo_height != ""){
		jQuery( "#logo-height-slider" ).slider("value",logo_height);
	}else {
		logo_height = "60";
	}
	jQuery( "#logo-height-text-box" ).val( jQuery( "#logo-height-slider" ).slider( "value") );
});


function Custom_login_logo(Action, id){
	if(Action == "logoSave") {
		(function(){
			var dlgtrigger = document.querySelector( '[data-dialog4]' ),
				somedialog = document.getElementById( dlgtrigger.getAttribute( 'data-dialog4' ) ),
				// svg..
				morphEl = somedialog.querySelector( '.morph-shape' ),
				s = Snap( morphEl.querySelector( 'svg' ) ),
				path = s.select( 'path' ),
				steps = { 
					open : morphEl.getAttribute( 'data-morph-open' ),
					close : morphEl.getAttribute( 'data-morph-close' )
				},
				dlg = new DialogFx( somedialog, {
					onOpenDialog : function( instance ) {
						// animate path instantly
						path.stop().animate( { 'path' : steps.open }, 300, mina.easeout );
					},
					onCloseDialog : function( instance ) {
						// animate path
						path.stop().animate( { 'path' : steps.close }, 200, mina.easeout );
					}
				} );
			dlgtrigger.addEventListener( 'click', dlg.toggle.bind(dlg) );
		})();

		var logo_image     = jQuery("#logo-image").val();
		var logo_show      = jQuery('input[name=show_logo]:checked').val();
		var logo_width     = jQuery("#logo-width-text-box").val();
		var logo_height    = jQuery("#logo-height-text-box").val();
		var logo_url       = jQuery("#log-url").val();
		var logo_url_title = jQuery("#log-url-title").val();
		//var PostData = "Action=" + Action + "&logo_image=" + logo_image + "&logo_show=" + logo_show + "&logo_width=" + logo_width + "&logo_height=" + logo_height + "&logo_url=" + logo_url + "&logo_url_title=" + logo_url_title;
		// Save message box open instantly
		jQuery(".dialog-button4").click();
		// Function to close message box
		setTimeout(function(){
			jQuery("#dialog-close-button4").click();
		}, 1000);

		jQuery.ajax({
			dataType : 'html',
			type: 'POST',
			url : location.href,
			cache: false,
			data: {
				nonce_ajax : WEBLIZARADMINNONCE.adminsecurity,
				Action : Action,
				logo_image : logo_image,
				logo_show : logo_show,
				logo_width : logo_width,
				logo_height : logo_height,
				logo_url : logo_url,
				logo_url_title : logo_url_title,
			},
			complete : function() {  },
			success: function(data) {
			}
		});
	}
	
	// Save Message box Close On Mouse Hover
	document.getElementById('dialog-close-button4').disabled = false;
	jQuery('#dialog-close-button4').hover(function () {
		jQuery("#dialog-close-button4").click();
		document.getElementById('dialog-close-button4').disabled = true; 
	});
	 
	// Reset Message box Close On Mouse Hover
	document.getElementById('dialog-close-button10').disabled = false;
	jQuery('#dialog-close-button10').hover(function () {
	   jQuery("#dialog-close-button10").click();
	   document.getElementById('dialog-close-button10').disabled = true; 
	});
	
	if(Action == "logoReset") {		
		(function(){
			var dlgtrigger = document.querySelector( '[data-dialog10]' ),
				somedialog = document.getElementById( dlgtrigger.getAttribute( 'data-dialog10' ) ),
				// svg..
				morphEl = somedialog.querySelector( '.morph-shape' ),
				s = Snap( morphEl.querySelector( 'svg' ) ),
				path = s.select( 'path' ),
				steps = { 
					open : morphEl.getAttribute( 'data-morph-open' ),
					close : morphEl.getAttribute( 'data-morph-close' )
				},
				dlg = new DialogFx( somedialog, {
					onOpenDialog : function( instance ) {
						// animate path instantly
						path.stop().animate( { 'path' : steps.open }, 300, mina.easeout );
					},
					onCloseDialog : function( instance ) {
						// animate path
						path.stop().animate( { 'path' : steps.close }, 200, mina.easeout );
					}
				} );
			dlgtrigger.addEventListener( 'click', dlg.toggle.bind(dlg) );
		})();

		// Update UI values immediately on reset
		jQuery( "#logo-width-slider" ).slider("value",274 );
		jQuery( "#logo-width-text-box" ).val( jQuery( "#logo-width-slider" ).slider( "value") );

		jQuery( "#logo-height-slider" ).slider("value",63);
		jQuery( "#logo-height-text-box" ).val( jQuery( "#logo-height-slider" ).slider( "value") );

		document.getElementById("log-url-title").value ="Your Site Name and Info";

		// Reset message box open instantly
		jQuery(".dialog-button10").click();
		// Function to close message box
		setTimeout(function(){
			jQuery("#dialog-close-button10").click();
		}, 1000);
		
		var PostData = "Action=" + Action ;
		jQuery.ajax({
			dataType : 'html',
			type: 'POST',
			url : location.href,
			cache: false,
			//data : PostData,
			data: {
				nonce_ajax : WEBLIZARADMINNONCE.adminsecurity,
				Action : Action,
			},
			complete : function() {  },
			success: function(data) {
			}
		});
	}
}
// Font awsome icon picker
  jQuery(function() {
	jQuery('.icp').iconpicker({
			title: 'Font Awesome 5 Free', // Popover title (optional) only if specified in the template
			selected: false, // use this value as the current item and ignore the original
			defaultValue: true, // use this value as the current item if input or element value is empty
			placement: 'topRight', // (has some issues with auto and CSS). auto, top, bottom, left, right
			showFooter: true,
			mustAccept:false,
		});              
    });

jQuery(document).ready(function() {
	if (jQuery('.recaptcha_keys_v2').length) {
		var recaptcha_keys_v2 = jQuery('.recaptcha_keys_v2');
		var recaptcha_keys_v3 = jQuery('.recaptcha_keys_v3');
		recaptcha_keys_v2.hide();
		recaptcha_keys_v3.hide();
		var current_recaptcha_v = page_settings_object.login_v_gcaptcha;
		if('v2' == current_recaptcha_v) {
			recaptcha_keys_v2.show();
		} else {
			recaptcha_keys_v3.show();
		}
	}
});

jQuery(document).on('change', 'input[name="v_gacptcha"]', function() {
	var recaptcha_keys_v2 = jQuery('.recaptcha_keys_v2');
	var recaptcha_keys_v3 = jQuery('.recaptcha_keys_v3');
	if('v3' === this.value) {
		recaptcha_keys_v2.hide();
		recaptcha_keys_v3.show();
	} else {
		recaptcha_keys_v3.hide();
		recaptcha_keys_v2.show();
	}
});

function Custom_gcaptcha(Action, id){
	if(Action == "googleSave") {
		(function(){
			var dlgtrigger = document.querySelector( '[data-dialog49]' ),
				somedialog = document.getElementById( dlgtrigger.getAttribute( 'data-dialog49' ) ),
				// svg..
				morphEl = somedialog.querySelector( '.morph-shape' ),
				s = Snap( morphEl.querySelector( 'svg' ) ),
				path = s.select( 'path' ),
				steps = { 
					open : morphEl.getAttribute( 'data-morph-open' ),
					close : morphEl.getAttribute( 'data-morph-close' )
				},
				dlg = new DialogFx( somedialog, {
					onOpenDialog : function( instance ) {
						// animate path instantly
						path.stop().animate( { 'path' : steps.open }, 300, mina.easeout );
					},
					onCloseDialog : function( instance ) {
						// animate path
						path.stop().animate( { 'path' : steps.close }, 200, mina.easeout );
					}
				} );
			dlgtrigger.addEventListener( 'click', dlg.toggle.bind(dlg) );
		})();

		var site_key = jQuery("#site-key").val();
		var secret_key = jQuery("#secret-key").val();
		var site_key_v3 = jQuery("#site-key-v3").val();
		var secret_key_v3 = jQuery("#secret-key-v3").val();
		if (document.getElementById('login_v_gcaptcha1').checked) {
			var login_v_gcaptcha = document.getElementById('login_v_gcaptcha1').value;
		} else {
			var login_v_gcaptcha = document.getElementById('login_v_gcaptcha2').value;
		}
		if (document.getElementById('login_enable_gcaptcha1').checked) {
			var login_enable_gcaptcha = document.getElementById('login_enable_gcaptcha1').value;
		} else {
			var login_enable_gcaptcha = document.getElementById('login_enable_gcaptcha2').value;
		}

		if (document.getElementById('acl_gcaptcha_theme1').checked) {
			var acl_gcaptcha_theme = document.getElementById('acl_gcaptcha_theme1').value;
		} else {
			var acl_gcaptcha_theme = document.getElementById('acl_gcaptcha_theme2').value;
		}
		
		// Save message box open instantly
		jQuery(".dialog-button49").click();
		// Function to close message box
		setTimeout(function(){
			jQuery("#dialog-close-button49").click();
		}, 1000);

		jQuery.ajax({
			dataType : 'html',
			type: 'POST',
			url : location.href,
			cache: false,
			data: {
				nonce_ajax : WEBLIZARADMINNONCE.adminsecurity,
				Action : Action,
				site_key : site_key,
				secret_key : secret_key,
				site_key_v3 : site_key_v3,
				secret_key_v3 : secret_key_v3,
				login_v_gcaptcha : login_v_gcaptcha,
				login_enable_gcaptcha : login_enable_gcaptcha,
				acl_gcaptcha_theme : acl_gcaptcha_theme,
			},
			complete : function() { },
			success: function(data) {
			}
		});
	}
	
	// Save Message box Close On Mouse Hover
	document.getElementById('dialog-close-button49').disabled = false;
	jQuery('#dialog-close-button49').hover(function () {
		jQuery("#dialog-close-button49").click();
		document.getElementById('dialog-close-button49').disabled = true; 
	});
	
	// Reset Message box Close On Mouse Hover
	document.getElementById('dialog-close-button109').disabled = false;
	jQuery('#dialog-close-button109').hover(function () {
		jQuery("#dialog-close-button109").click();
		document.getElementById('dialog-close-button109').disabled = true; 
	});
	
	if(Action == "googleReset") {		
		(function(){
			var dlgtrigger = document.querySelector( '[data-dialog109]' ),
				somedialog = document.getElementById( dlgtrigger.getAttribute( 'data-dialog109' ) ),
				// svg..
				morphEl = somedialog.querySelector( '.morph-shape' ),
				s = Snap( morphEl.querySelector( 'svg' ) ),
				path = s.select( 'path' ),
				steps = { 
					open : morphEl.getAttribute( 'data-morph-open' ),
					close : morphEl.getAttribute( 'data-morph-close' )
				},
				dlg = new DialogFx( somedialog, {
					onOpenDialog : function( instance ) {
						// animate path instantly
						path.stop().animate( { 'path' : steps.open }, 300, mina.easeout );
					},
					onCloseDialog : function( instance ) {
						// animate path
						path.stop().animate( { 'path' : steps.close }, 200, mina.easeout );
					}
				} );
			dlgtrigger.addEventListener( 'click', dlg.toggle.bind(dlg) );
		})();
		
		// Reset message box open instantly
		jQuery(".dialog-button109").click();
		// Function to close message box
		setTimeout(function(){
			jQuery("#dialog-close-button109").click();
		}, 1000);

		jQuery.ajax({
			dataType : 'html',
			type: 'POST',
			url : location.href,
			cache: false,
			data: {
				nonce_ajax : WEBLIZARADMINNONCE.adminsecurity,
				Action : Action,
			},
			complete : function() {  },
			success: function(data) {
				document.getElementById("site-key").value ="";
				document.getElementById("secret-key").value ="";
				document.getElementById("site-key-v3").value ="";
				document.getElementById("secret-key-v3").value ="";
				jQuery('input[name=enable_gcaptcha]').val(['yes']);
				jQuery('input[name=acl_gcaptcha_theme]').val(['yes']);
			}
		});
	}
}