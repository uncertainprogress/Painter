function Pattern(colors) {
	this.colors = colors //ARRAY
	this.count = 0;
	this.swap = false;
}

Pattern.prototype = {
	
	getColor: function() {
		if(this.swap) {
			this.count = this.count - 1;
			if(this.count == 0) {
				this.swap = false;
			}
			return this.colors[this.count];
		}
		
		var color = this.colors[this.count]
		this.count = this.count + 1
		if(this.count == this.colors.length) {
			this.swap = true
			this.count = this.count - 1
		}
		return color
	}
}