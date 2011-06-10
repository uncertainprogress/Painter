
PIXELSPERINCH = 8

WIDTH = 133.5*PIXELSPERINCH
HEIGHT = 94*PIXELSPERINCH

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
		$("#reloadbutton").button().click(Painter.reload)
    
    Painter.setupColorPicker('#color1');
		Painter.setupColorPicker('#color2');
		Painter.setupColorPicker('#color3');
		Painter.setupColorPicker('#color4');
  },
  
  setupColorPicker: function(id) {
		var cl = '#0000ff'
		
		if($.cookie(id)) {
			cl = "#" + $.cookie(id);
		}
		
		$(id + " div").css('backgroundColor', cl);
		
	
    $(id).ColorPicker({
    	color: cl,
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
				$.cookie(id, hex)
    	}
    });
  },
  
  start: function() {
    $("#setup").slideUp()
    $("#reset").slideDown();

		$("#mainCanvas").css("height", HEIGHT)
		$("#mainCanvas").css("width", WIDTH)
  },
  
  reset: function() {
    $("#reset").slideUp()
    $("#setup").slideDown();
    
    
  },

	reload: function() {
		
	}
  
}