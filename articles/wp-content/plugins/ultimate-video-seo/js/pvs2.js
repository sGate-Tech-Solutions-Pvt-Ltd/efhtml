jQuery(document).ready(function($) {


    $('#_xmltitletrcheckbox').change(function(){
        if(this.checked) {
		    
            $('#_xmltitletr').show('slow');
			
			 
		}	
			 
        else {
            $('#_xmltitletr').hide('slow');
			
            
			}

    });
	
	    $('#_multiplecheckbox').change(function(){
        if(this.checked) {
		    
            $('#_multipletr').show('slow');
			$('#_multipletr2').show('slow');
			 
		}	
			 
        else {
            $('#_multipletr').hide('slow');
			$('#_multipletr2').hide('slow');
            
			}

    });
	
		    $('#_foldernamecheckbox').change(function(){
        if(this.checked) {
		    
            $('#_foldernametr').show('slow');
		}	
			 
        else {
            $('#_foldernametr').hide('slow');
            }

    });
});