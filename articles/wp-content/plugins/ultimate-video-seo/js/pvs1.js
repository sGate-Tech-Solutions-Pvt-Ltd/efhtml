jQuery(document).ready(function($) {


$('#pvsgeneratesitemap').click(function() {
       document.getElementById('pvsgenerate').style.display = "block";
	   document.getElementById('pvsgeneratesitemap').value= "Generating Sitemap";
	   console.log('Generating Sitemap');
	  

        $.ajax({
            data: {action: "update_pvssitemap" },
            type: 'POST',
            url: ajaxurl,
            success: function( response ) { 
			 document.getElementById('pvssitemapgeneratestatus').innerHTML = response;
	         document.getElementById('pvsgenerate').style.display = "none";
			 document.getElementById('pvssitemapgeneratestatus').style.display = "block";
			 document.getElementById('pvsgeneratesitemap').value= "Re-generate sitemap";
			 
			console.log('your sitemap has been generated successfully  ' + response); 
			 
			 }
        });
});






$('#pvspingsitemap').click(function() {
       document.getElementById('pvsping').style.display = "block";
	   document.getElementById('pvspingsitemap').value= "Generating Sitemap";
	   console.log('Generating Sitemap');
	  

        $.ajax({
            data: {action: "ping_videositemap" },
            type: 'POST',
            url: ajaxurl,
            success: function( response ) { 
			 document.getElementById('pvssitemapgeneratestatus').innerHTML = response;
	         document.getElementById('pvsping').style.display = "none";
			 document.getElementById('pvssitemapgeneratestatus').style.display = "block";
			 document.getElementById('pvspingsitemap').value= "Notified";
			 
			console.log('your sitemap has been  successfully notified ' + response);
               setTimeout(function(){
             location.reload();
             }, 5000);
			}
        });
});


});