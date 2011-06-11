
PIXELSPERINCH = 8

WIDTH = 133.5*PIXELSPERINCH
HEIGHT = 94*PIXELSPERINCH

PATTERNS = ['Alternating', 'Random']

var colorHolder = ""

$(function(){
  Painter.init();
})

Painter = {
  colors: [],
  
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
		$("#mainCanvas").html("");
		
		var tapewidth = $("#tapewidth").val()*PIXELSPERINCH;
		var numsquares = $("#numsquares").val();
		var squarewidth = WIDTH/numsquares;
		squarewidth = squarewidth - ($("#tapewidth").val() * PIXELSPERINCH);
		var squareshigh = Math.ceil(HEIGHT/squarewidth);
		
		//set the top and left padding on the main canvas to be the tape width
		$("#mainCanvas").css("padding", tapewidth +"px 0px 0px " + tapewidth + "px");
		
		
		for(var j=0; j<squareshigh; j++) {
			for(var i=0; i<numsquares; i++) {
				var id = i + "-" + j;
				$("#mainCanvas").append("<div id='" + id + "' class='square'></div>");
				$("#"+id).css("height", squarewidth);
				$("#"+id).css("width", squarewidth);
				//set the bottom and right margin on the squares to the tapewidth
				$("#"+id).css("margin", "0px " + tapewidth + "px "+ tapewidth + "px 0px");
			}
		}
		
		Painter.colors = [];
		for(i=1; i<=4; i++) {
			Painter.colors.push($("#color" + i +" div").css("backgroundColor"));
		}
		
		$.getScript("scripts/Pattern" + $("#pattern").val() + ".js", function() {
			
			var pattern = new Pattern(Painter.colors);
			for(i=0; i<numsquares; i++) {
				for(j=0; j< squareshigh; j++) {
					id = i + "-" + j;
					$("#" + id).css("backgroundColor", pattern.getColor())
				}
			}
		});
		
		$(".square").draggable({
			revert: 'true',
			cursor: "move",
			cursorAt: { top: -8, left: -10 },
			helper: function( event ) {
				return $( "<div class='ui-widget-header'>Swap With</div>" );
			},
			stop: function( event ) {
				var color = $(this).css('backgroundColor');
				$(this).css('backgroundColor', colorHolder.css('backgroundColor'));
				colorHolder.css('backgroundColor', color);
			}
		});
		
		$(".square").droppable({
			drop: function(event, ui) {
				colorHolder = $(this)
			}
		})
		
		$(".square").click(function() {
			var clicked = $(this);
			var html = "";
			for(var c in Painter.colors) {
				html = html + "<div class='colorpick'></div>";
			}
			$("#newcolordialog").html($(html));
			var ct = 0;
			$("#newcolordialog .colorpick").each(function() {
				$(this).css("backgroundColor", Painter.colors[ct]);
				ct = ct + 1;
			})
			
			$("#newcolordialog .colorpick").click(function() {
				$("#newcolordialog").dialog('destroy');
				clicked.css('backgroundColor', $(this).css('backgroundColor'));
			})
			console.log($("#newcolordialog"))
			$('#newcolordialog').dialog({
				closeOnEscape: true,
				position: "center",
				resize: false,
		    height:300,
		    width:300,
		    modal:true,
		    title: "Pick a New Color",
				buttons: {"Cancel": function(){$(this).dialog('destroy');}},
		   });
		})
		
		$("#infotable").html("<h2>Square Size: " + Math.floor((squarewidth/PIXELSPERINCH)*1000)/1000 + "</h2><h2>" + squareshigh + " Squares High and "+ numsquares +" Squares Wide</h2>")
		
  },
  
  reset: function() {
    $("#reset").slideUp()
    $("#setup").slideDown();
    
    
  },

	reload: function() {
		Painter.start();
	}
  
}