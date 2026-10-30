jQuery(document).ready(function($){
    $('#btn_download_color').wpColorPicker();
    $('#btn_itunes_color').wpColorPicker();
    $('#btn_stiticher_color').wpColorPicker();
    $('#btn_soundcloud_color').wpColorPicker();
     $('#btn_spplisten_color').wpColorPicker();
    $('#btn_sppreview_color').wpColorPicker();
    $('#btn_sppandroid_color').wpColorPicker();
    $('#btn_spprss_color').wpColorPicker();
   $('#transcript_color').wpColorPicker();
   $('#headline_text_color').wpColorPicker();
   $('#submit_button_color').wpColorPicker();
   $('#submit_button_text').wpColorPicker();
   $('#opt_container_color').wpColorPicker();
   $('#twitter_text_color').wpColorPicker();
   $('#btn_spotify_color').wpColorPicker();
   $('#btn_spp_custom_color1').wpColorPicker();
   $('#btn_spp_custom_color2').wpColorPicker();
   $('#btn_spp_custom_color3').wpColorPicker();
   $('#btn_spp_custom_color4').wpColorPicker();
   $('#btn_spp_custom_color5').wpColorPicker();
   $('#btn_spp_custom_color6').wpColorPicker();
   $('#player_bar_color').wpColorPicker();
   $('#progress_bar_color').wpColorPicker();
   $('#player_text_color').wpColorPicker();
   $('#spp_LeadBox_btn_color').wpColorPicker();
   $('#btn_share_color').wpColorPicker();
   $('#btn_g_play_color').wpColorPicker();
   $('#btn_embed_color').wpColorPicker();


		
		
		$("#sortable").sortable({
				opacity: 0.6,
				revert: true,
				cursor:'move',
				update:function(){
				var order=$(this).sortable('toArray').toString(); 
					jQuery.ajax({
						type: "POST",
						url: sppajaxurl.spp_ajax_url,
						data: "action=buttons_order_list_update&buttonorder=" + order
					});
			}
		});
		$('.ep_specific_date').datepicker({
			dateFormat : 'D, d M yy'
		});
      // Uploading files
    var file_frame;
    jQuery('#upload_image_button').live('click', function(e) {

        e.preventDefault();

        // If the media frame already exists, reopen it.
        if (file_frame) {
            file_frame.open();
            return;
        }

        // Create the media frame.
        file_frame = wp.media.frames.file_frame = wp.media({
            title: jQuery(this).data('uploader_title'),
            button: {
                text: jQuery(this).data('uploader_button_text'),
            },
            multiple: false // Set to true to allow multiple files to be selected
        });

        // When a file is selected, run a callback.
        file_frame.on('select', function(){
            // We set multiple to false so only get one image from the uploader
            attachment = file_frame.state().get('selection').first().toJSON();
            var url = attachment.url;
            var field = document.getElementById("gift_file");
            field.value = url; //set which variable you want the field to have
        });

        // Finally, open the modal
        file_frame.open();
    });
});