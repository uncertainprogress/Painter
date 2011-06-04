
PIXELSPERINCH = 8


$(function(){
  Painter.init();
})

Painter = {
  
  
  init: function() {
    $("#reset").hide()
    
    
    for(i=3; i<= 9; i++) {
			$('#numsquares').addOption(i, i);
		}
		$('#numsquares').selectOptions("7", true);
		
		for(i=3; i<=12; i++) {
		  $("#tapewidth").addOption(i*0.25, i*0.25);
		}
		$("#tapewidth").selectOptions("2", true);
		
    $("#start").button().click(Painter.start);
    
    $("#resetbutton").button().click(Painter.reset);
  },
  
  
  start: function() {
    
    
    $("#setup").slideUp()
    $("#reset").slideDown();
  },
  
  reset: function() {
    $("#reset").slideUp()
    $("#setup").slideDown();
    
    
  }
  
}