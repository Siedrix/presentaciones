function someThing() {
	this.someProperty = '';
}

someThing.prototype = {
	setValue : function(str){
		this.someProperty = str;
	},
	getValue : function(){
		return this.someProperty;
	}
}
module.exports = new someThing();
