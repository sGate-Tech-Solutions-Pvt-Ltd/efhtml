jQuery(document).ready(function ($) {     

  $('.accordion-toggle').on('click', function(event){
    	event.preventDefault();
    	// create accordion variables
    	var accordion = $(this);
    	var accordionaccordion_content = accordion.next('.accordion-accordion_content');
    	var accordionToggleIcon = $(this).children('.toggle-icon');
    	
    	// toggle accordion link open class
    	accordion.toggleClass("open");
    	// toggle accordion accordion_content
    	accordionaccordion_content.slideToggle(250);
    	
    	// change plus/minus icon
    	if (accordion.hasClass("open")) {
    		accordionToggleIcon.html("<i class='fa fa-angle-double-up'></i>");
    	} else {
    		accordionToggleIcon.html("<i class='fa fa-angle-double-down'></i>");
    	}
    });

});
