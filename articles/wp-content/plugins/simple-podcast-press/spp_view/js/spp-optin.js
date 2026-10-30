jQuery(document).ready(function($) {
    jQuery( '#jwsqz_autocode' ).blur( function() {
        var thehtml = "<div>" + $( '#jwsqz_autocode' ).val() + "</div>";
        var arcode = $( thehtml );
        
        $('#jwsqz_autoformurl').val( arcode.find('form').attr('action') );
        $('#jwsqz_arnameinput').val(
            arcode.find('[type="text"]').filter(function(){return /name/i.test(this.name);}).attr('name') );
		$('#jwsqz_aremailinput').val(
             arcode.find('[type="text"]').filter(function(){return /email/i.test(this.name);}).attr('name')  ); 
       if ($('#jwsqz_aremailinput').val() =='')
       {
        $('#jwsqz_aremailinput').val(
             arcode.find('[type="email"]').filter(function(){return /email/i.test(this.name);}).attr('name')  ); 
        }
              
        var hiddens = "";
         
        arcode.find( '[type="hidden"]' ).each( function() {
           hiddens += jQuery( this ).prop( 'outerHTML' ) + "\n";
        });
            

        
    });
});