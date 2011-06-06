
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
    
    Painter.setupColorPicker('#color1');
    
    
  },
  
  setupColorPicker: function(id) {
    $(id).ColorPicker({
    	color: '#0000ff',
    	onShow: function (colpkr) {
    		$(colpkr).fadeIn(500);
    		return false;
    	},
    	onHide: function (colpkr) {
    		$(colpkr).fadeOut(500);
    		return false;
    	},
    	onChange: function (hsb, hex, rgb) {
    		$(id + ' div').css('backgroundColor', '#' + hex);
    	}
    });
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