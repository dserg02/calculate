
function treenode() {
	this.expr = "";
	this.op = "";
	this.left = null;
	this.right = null;
}

function tree() {
	this.root = null;
}

tree.prototype = {
	
	setExpression: function(expression) {
		var node1 = new treenode();
		node1.expr = expression;
		this.root = node1;
	},
	
	calcFunctions: function() {
		
		m = this.root.expr.match(/sin[+-]*[.]*[0-9]+[.]*[0-9]*|sin[+-]*[.]*[0-9]*[.]*[0-9]+/);
		if (m != null) {
			for (var i = 0; i < m.length; i++) {
				var res = Math.sin(m[i].replace("sin", ""));
				this.root.expr = this.root.expr.replace(m[i], res);
			}
		}
		m = this.root.expr.match(/cos[+-]*[.]*[0-9]+[.]*[0-9]*|cos[+-]*[.]*[0-9]*[.]*[0-9]+/);
		if (m != null) {
			for (var i = 0; i < m.length; i++) {
				var res = Math.cos(m[i].replace("cos", ""));
				this.root.expr = this.root.expr.replace(m[i], res);
			}
		}
		m = this.root.expr.match(/tan[+-]*[.]*[0-9]+[.]*[0-9]*|tan[+-]*[.]*[0-9]*[.]*[0-9]+/);
		if (m != null) {
			for (var i = 0; i < m.length; i++) {
				var res = Math.tan(m[i].replace("tan", ""));
				this.root.expr = this.root.expr.replace(m[i], res);
			}
		}
		m = this.root.expr.match(/exp[+-]*[.]*[0-9]+[.]*[0-9]*|exp[+-]*[.]*[0-9]*[.]*[0-9]+/);
		if (m != null) {
			for (var i = 0; i < m.length; i++) {
				var res = Math.exp(m[i].replace("exp", ""));
				this.root.expr = this.root.expr.replace(m[i], res);
			}
		}
		
	},
	
	setTree: function() {
		
		this.calcFunctions();
		
		this.setTreeR(this.root);
	},
	
	setTreeR: function(node) {
		
		this.clean();
		
		str = node.expr;
		
		m = str.match(/[0-9][+][0-9]|[0-9][+][0-9]*[.][0-9]+|[0-9][+][0-9]+[.][0-9]*|[0-9]*[.][0-9]+[+][0-9]|[0-9]*[.][0-9]+[+][0-9]*[.][0-9]+|[0-9]*[.][0-9]+[+][0-9]+[.][0-9]*|[0-9]+[.][0-9]*[+][0-9]|[0-9]+[.][0-9]*[+][0-9]*[.][0-9]+|[0-9]+[.][0-9]*[+][0-9]+[.][0-9]*/);
		m1 = str.match(/[0-9][-][0-9]|[0-9][-][0-9]*[.][0-9]+|[0-9][-][0-9]+[.][0-9]*|[0-9]*[.][0-9]+[-][0-9]|[0-9]*[.][0-9]+[-][0-9]*[.][0-9]+|[0-9]*[.][0-9]+[-][0-9]+[.][0-9]*|[0-9]+[.][0-9]*[-][0-9]|[0-9]+[.][0-9]*[-][0-9]*[.][0-9]+|[0-9]+[.][0-9]*[-][0-9]+[.][0-9]*/);
		m2 = str.match(/[0-9][*][-]?[0-9]|[0-9][*][-]?[0-9]*[.][0-9]+|[0-9][*][-]?[0-9]+[.][0-9]*|[0-9]*[.][0-9]+[*][-]?[0-9]|[0-9]*[.][0-9]+[*][-]?[0-9]*[.][0-9]+|[0-9]*[.][0-9]+[*][-]?[0-9]+[.][0-9]*|[0-9]+[.][0-9]*[*][-]?[0-9]|[0-9]+[.][0-9]*[*][-]?[0-9]*[.][0-9]+|[0-9]+[.][0-9]*[*][-]?[0-9]+[.][0-9]*/);
		m3 = str.match(/[0-9][\/][-]?[0-9]|[0-9][\/][-]?[0-9]*[.][0-9]+|[0-9][\/][-]?[0-9]+[.][0-9]*|[0-9]*[.][0-9]+[\/][-]?[0-9]|[0-9]*[.][0-9]+[\/][-]?[0-9]*[.][0-9]+|[0-9]*[.][0-9]+[\/][-]?[0-9]+[.][0-9]*|[0-9]+[.][0-9]*[\/][-]?[0-9]|[0-9]+[.][0-9]*[\/][-]?[0-9]*[.][0-9]+|[0-9]+[.][0-9]*[\/][-]?[0-9]+[.][0-9]*/);
		
		if (m != null) {
			node.op = "+";
			
			var index = str.indexOf(m[0]) + m[0].indexOf("+");
			
			str1 = str.substring(0, index);
			str2 = str.substring(index + 1);
			
			var nodeLeft = new treenode();
			var nodeRight = new treenode();
			nodeLeft.expr = str1;
			nodeRight.expr = str2;
			node.left = nodeLeft;
			node.right = nodeRight;
			
			this.setTreeR(node.left);
			this.setTreeR(node.right);
		} else if (m1 != null) {
			node.op = "-";
			
			var index = str.indexOf(m1[0]) + m1[0].indexOf("-");
			
			str1 = str.substring(0, index);
			str2 = str.substring(index + 1);
			
			var nodeLeft = new treenode();
			var nodeRight = new treenode();
			nodeLeft.expr = str1;
			nodeRight.expr = str2;
			node.left = nodeLeft;
			node.right = nodeRight;
			
			this.setTreeR(node.left);
			this.setTreeR(node.right);
		} else if (m2 != null) {
			node.op = "*";
			
			var index = str.indexOf(m2[0]) + m2[0].indexOf("*");
			
			str1 = str.substring(0, index);
			str2 = str.substring(index + 1);
			
			var nodeLeft = new treenode();
			var nodeRight = new treenode();
			nodeLeft.expr = str1;
			nodeRight.expr = str2;
			node.left = nodeLeft;
			node.right = nodeRight;
			
			this.setTreeR(node.left);
			this.setTreeR(node.right);
		} else if (m3 != null) {
			node.op = "/";
			
			var index = str.indexOf(m3[0]) + m3[0].indexOf("/");
			
			str1 = str.substring(0, index);
			str2 = str.substring(index + 1);
			
			var nodeLeft = new treenode();
			var nodeRight = new treenode();
			nodeLeft.expr = str1;
			nodeRight.expr = str2;
			node.left = nodeLeft;
			node.right = nodeRight;
			
			this.setTreeR(node.left);
			this.setTreeR(node.right);
		}
		
	},
	
	display: function() {
		document.getElementById("output").innerHTML = "tree: <br />";
		this.displayR(this.root);
	},
	
	displayR: function(node) {
		
		document.getElementById("output").innerHTML += node.expr + "<br />";
		if (node.left != null)
			this.displayR(node.left);
		if (node.right != null)
			this.displayR(node.right);
		
	},
	
	clean: function() {
		
		while (this.root.expr.indexOf("--") != -1 || this.root.expr.indexOf("+-") != -1 ||
			this.root.expr.indexOf("-+") != -1) {
			
			this.root.expr = this.root.expr.replace("--", "+");
			this.root.expr = this.root.expr.replace("-+", "-");
			this.root.expr = this.root.expr.replace("+-", "-");
		}
		
		if (this.root.expr[0] == '+')
			this.root.expr = this.root.expr.substring(1, this.root.expr.length - 1);
	},
	
	evaluate: function() {
		return this.evaluateR(this.root);
	},
	
	evaluateR: function(node) {
		if (node.op == "+") {
			return (parseFloat(this.evaluateR(node.left)) + parseFloat(this.evaluateR(node.right)));
		} else if (node.op == "-") {
			return (parseFloat(this.evaluateR(node.left)) - parseFloat(this.evaluateR(node.right)));
		} else  if (node.op == "*") {
			return (parseFloat(this.evaluateR(node.left)) * parseFloat(this.evaluateR(node.right)));
		} else if (node.op == "/") {
			return (parseFloat(this.evaluateR(node.left)) / parseFloat(this.evaluateR(node.right)));
		} else {
			return node.expr;
		}
	}
		
};
