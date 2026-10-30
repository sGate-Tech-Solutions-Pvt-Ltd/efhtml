jQuery( document ).ready( function($) {
	
	/* --------------------------------------------------------- */
	/* !Edit page functionality - 2.0.0 */
	/* --------------------------------------------------------- */

	// Set the format field depending on the post type
	function mtphr_dnt_posts_format_field( type ) {
		
		if( $('.mtphr-dnt-field-mtphr_dnt_posts_format').length > 0 ) {
			if( type == 'post' ) {
				$('.mtphr-dnt-field-mtphr_dnt_posts_format').show();
			} else {
				$('.mtphr-dnt-field-mtphr_dnt_posts_format').hide();
			}
		}
	}
	
	// Set the fields depending on the orderby value
	function mtphr_dnt_posts_settings_fields( orderby ) {

		switch( orderby ) {
			
			case 'meta_value':
				
				// Show fields
				$('.mtphr-dnt-field-mtphr_dnt_posts_orderby_meta_key').show();
				
				break;
				
			case 'meta_value_num':
			
				// Show fields
				$('.mtphr-dnt-field-mtphr_dnt_posts_orderby_meta_key').show();	
			
				break;
				
			case 'popular':
			
				// Show fields
				$('input[name="_mtphr_dnt_posts_order"][value="DESC"]').trigger('click');	
			
				break;
				
			default:

				// Hide fields
				$('.mtphr-dnt-field-mtphr_dnt_posts_orderby_meta_key').hide();
			
				break;
		}	
	}
	
	function mtphr_dnt_posts_advanced_fields() {
		
		if( $('input[name="_mtphr_dnt_posts_advanced_args_toggle"]').is(':checked') ) {
			
			// Show the advanced fields
			$('#mtphr-dnt-posts-advanced-query-settings').show();

		} else {
			
			// Hide the advanced fields
			$('#mtphr-dnt-posts-advanced-query-settings').hide();
		}
	}
	
	function mtphr_dnt_posts_update_query_help( $item ) {
		
		var $selected = $item.find(' option:selected'),
				$value = $item.find('.mtphr-dnt-list-field-mtphr_dnt_posts_query_args_value input'),
				$helper = $item.find('.mtphr-dnt-list-field-mtphr_dnt_posts_query_args_value .mtphr-dnt-help'),
				help = $selected.data('help');

		$value.attr('placeholder', help);
		
		var qtipConfig = {
			content: {
			  attr: 'data-tooltip' // Tell qTip2 to look inside this attr for its content
	    },
	    style: 'qtip-light qtip-rounded qtip-shadow'
		}
		$helper.attr('data-tooltip', help).qtip( qtipConfig );
	}
	
	// Initialize checks and user clicks	
	function mtphr_dnt_posts_settings() {
	
		// Set the initial format field
		var type = $('select[name="_mtphr_dnt_posts_type"]').val();
		mtphr_dnt_posts_format_field( type );

		// Listen for the post type change
		$('select[name="_mtphr_dnt_posts_type"]').change( function(e) {
			mtphr_dnt_posts_format_field( $(this).val() );		
		});
		
		// Listen for the post orderby change
		var orderby = $('select[name="_mtphr_dnt_posts_orderby"]').val();
		if( orderby ) {
			mtphr_dnt_posts_settings_fields( orderby );
		} else {
			mtphr_dnt_posts_settings_fields( 'date' );
		}
		$('select[name="_mtphr_dnt_posts_orderby"]').change( function(e) {
			mtphr_dnt_posts_settings_fields( $(this).val() );		
		});
		
		// Listen for the advanced fields toggle
		mtphr_dnt_posts_advanced_fields();
		$('input[name="_mtphr_dnt_posts_advanced_args_toggle"]').click( function(e) {
			mtphr_dnt_posts_advanced_fields();		
		});
		
		// Listen for the query parameter change
		$('.mtphr-dnt-field-mtphr_dnt_posts_query_args_parameter').each( function(index) {
			mtphr_dnt_posts_update_query_help( $(this).parents('.mtphr-dnt-list-item') );
		});
		$('.mtphr-dnt-field-mtphr_dnt_posts_query_args_parameter select').live('change', function(e) {
			mtphr_dnt_posts_update_query_help( $(this).parents('.mtphr-dnt-list-item') );
		});
	}
	if( $('#mtphr-dnt-posts-metabox').length > 0 ) {
		mtphr_dnt_posts_settings();
	}

});