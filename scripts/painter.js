
PIXELSPERINCH = 8

WIDTH = 133.5*PIXELSPERINCH
HEIGHT = 94*PIXELSPERINCH

PATTERNS = ['Random', 'Alternating']

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
		
		for(var p in PATTERNS) {
			$("#pattern").addOption(PATTERNS[p], PATTERNS[p]);
			$.getScript("scripts/Pattern" + PATTERNS[p] + ".js");
		}
		
    $("#start").button().click(Painter.start);
    
    $("#resetbutton").button().click(Painter.reset);
		$("#reloadbutton").button().click(Painter.reload);
    
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

		$("#mainCanvas").css("height", HEIGHT);
		$("#mainCanvas").css("width", WIDTH);
		
		var tapewidth = $("#tapewidth").val()*PIXELSPERINCH;
		var numsquares = $("#numsquares").val();
		var squarewidth = WIDTH/numsquares;
		squarewidth = squarewidth - ($("#tapewidth").val() * PIXELSPERINCH);
		
		var squareshigh = Math.ceil(HEIGHT/squarewidth);
		
		console.log(squarewidth/PIXELSPERINCH);
		console.log(squareshigh);
		console.log(tapewidth);
		
		//set the top and left padding on the main canvas to be the tape width
		$("#mainCanvas").css("padding", tapewidth +"px 0px 0px " + tapewidth + "px");
		//set the bottom and right padding on the squares to the tapewidth
		
		for(var j=0; j<squareshigh; j++) {
			for(var i=0; i<numsquares; i++) {
				var id = i + "-" + j;
				$("#mainCanvas").append("<div id='" + id + "' class='square'></div>");
				$("#"+id).css("height", squarewidth);
				$("#"+id).css("width", squarewidth);
				$("#"+id).css("margin", "0px " + tapewidth + "px "+ tapewidth + "px 0px");
			}
		}
		
		for(i=0; i<numsquares; i++) {
			for(j=0; j< squareshigh; j++) {
				id = i + "-" + j;
				$("#" + id).css("backgroundColor", "#0000ff")
			}
		}
		
		
		
  },
  
  reset: function() {
    $("#reset").slideUp()
    $("#setup").slideDown();
    
    
  },

	reload: function() {
		
	}
  
}