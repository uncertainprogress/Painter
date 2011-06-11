function Pattern(colors) {
	this.colors = colors //ARRAY
}

Pattern.prototype = {
	
	getColor: function() {
		var rnd = Math.floor(Math.random()*this.colors.length);
		return this.colors[rnd];
	}
}