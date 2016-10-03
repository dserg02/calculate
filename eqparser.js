
function eqParser() {
	
	this.expression = "";
	this.et = new tree();
	this.et.setExpression(this.expression);
	
}

eqParser.prototype = {
	
	setExpression: function(expression) {
		this.expression = expression;
	},
	
	isParen: function(s) {
		
		return !(s.match(/[()\[\]]/) == null);
		
	},
	
	firstParen: function(s) {
		
		for (var i = 0; i < s.length; i++) {
			if (s[i] == '(' || s[i] == '[')
				return i;
		}
		return -1;
		
	},
	
	lastParen: function(s, first) {
		
		var count = 0;
		
		for (var j = first; j < s.length; j++) {
			if ((s[j] == '(') || (s[j] == '['))
				count++;
			if ((s[j] == ')') || (s[j] == ']')) {
				count--;
				if (count == 0) {
					return j;
				}
			}
		}
		return -1;
		
	},
	
	isValid: function() {
		
		var s = this.expression;
		
		var count = 0;
		
		for (var i in s) {
			
			if (s[i] == '(' || s[i] == '[') {
				count++;
			} else if (s[i] == ')' || s[i] == ']') {
				count--;
			}
			if (count < 0)
				return false;
		}
		return (count == 0);
	},
	
	
	parseEq: function(s) {
		
		if (!this.isParen(s)) {
			
			this.et.setExpression(s);
			this.et.setTree();
			return this.et.evaluate();
			
		} else {
			
			if (!this.isValid())
				return "Invalid Expression";
			
			var first = this.firstParen(s);
			var last = this.lastParen(s, first);
			
			var str1 = s.substring(0, first);
			var str2 = s.substring(first + 1, last);
			var str3 = s.substring(last, s.length - 1);
						
			var first1 = 0, last1 = 0, first3 = 0, last3 = 0;
			var str1B = false;
			var str3B = false;
			
			var str11 = "";
			var str21 = "";
			var str31 = "";
			
			var str12 = "";
			var str22 = "";
			var str32 = "";
			
			if (this.isParen(str1)) {
				
				first1 = this.firstParen(str1);
				last1 = this.lastParen(str1, first1);
				str1B = true;
				
				str11 = str1.substring(0, first1);
				str21 = str1.substring(first1 + 1, last1 - first1 - 1);
				str31 = str1.substring(last1 + 1, str1.length - last1 - 1);
				
			}
			if (this.isParen(str3)) {
				
				first3 = this.firstParen(str3);
				last3 = this.lastParen(str3, first3);
				str3B = true;
				
				str12 = str3.substring(0, first3);
				str22 = str3.substring(first3 + 1, last3 - first3 - 1);
				str32 = str3.substring(last3 + 1, str3.length - last3 - 1);
			}			
			var t =
					((str1B) ? str11 + this.parseEq(str21) + str31 : str1) +
					this.parseEq(str2) +
					((str3B) ? str12 + this.parseEq(str22) + str32 : str3);
						
			this.et.setExpression(t);
			this.et.setTree();
			return this.et.evaluate();
		}
		
	},
	
	answer: function() {
		
		var str = document.getElementById("output").innerHTML;
		
		document.getElementById("output").innerHTML = "<br /><br />Expression: " 
			+ this.expression + "<br />Answer: " + this.parseEq(this.expression) + "<br />"
			+ str;
	}
	
	
	
};
