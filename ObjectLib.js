var ArrayList = function(){
	var data = [];
	var count = 0;
	
	this.get = function(index){
		return data[index];
	};
	
	this.add = function(val){
		data.push(val);
		count++;
	};
	
	this.addAll = function(collection){
		for(var item in collection){
			this.add(item);
		}
	};
	
	this.indexOf = function(val){
		return data.indexOf(val);
	};
	
	this.contains = function(val){
		return this.indexOf(val)!==-1;
	};
	
	this.removeFirst = function(){
		if(count>0){
			return data.shift();
		} else {
			throw new NoSuchElementException('Array is empty');
		}
	};
	
	this.remove = function(index){
		if(count==0){
			throw new NoSuchElementException('Array is empty');
		}
		if(count==1){
			data = [];
			count = 0;
		} else {
			var front = data.slice(0, index);
			var back = data.slice(index, data.length);
			data = front.concat(back);
			count--;
		}
	};
	
	this.removeLast = function(){
		if(count>0){
			return data.pop();
		} else {
			throw new NoSuchElementException('Array is empty');
		}
	};
	
	this.size = function(){
		return count;
	};
	
	this.getData = function(){
		var res = [];
		for(var item in data){
			res.push(item);
		}
		return res;
	};
};

var BinarySearchTree = function(){
	var root;
  
	var size = 0;
	
	this.add = function(item){
		if(!item){
			throw new NullPointerException('item cannot be empty');
		}
		if(size===0){
			root = new Node(item);
			size++;
			return true;
		} else {
			return addLoopingMethod(item);
		}
	};
	
	var addLoopingMethod = function(item){
		var insertPoint = findPosition(item);
		if (insertPoint.data== item) {
			return false;
		}
		return addChild(insertPoint, item);
	};

	var addChild = function(parent, item) {
		if (item < parent.data) {
			var newNode = new Node(item);
			parent.left = newNode;
			newNode.parent = parent;
		} else if (item > parent.data) {
			var newNode = new Node(item);
			parent.right = newNode;
			newNode.parent = parent;
		} else {
			return false;
		}
		size++;
		return true;
	};
	
	var findPosition = function(item) {
		var tNode = root; 
		var previous = undefined;
		while (tNode !== undefined) {
			previous = tNode;
			if (item < tNode.data) {
				tNode = tNode.left;
			} else if (item > tNode.data) {
				tNode = tNode.right;
			} else {
				return tNode;
			}
		}
		return previous;
	};
	
	this.addAll = function(items){
		var flag = false;
		for (var item in items) {
			if (this.add(item)) {
				flag = true;
			}
		}
		return flag;
	};
	
	this.clear = function(){
		root = null;
		size = 0;
	};
	
	this.contains = function(item){
		if (!item) {
			throw new NullPointerException('Item must have a value');
		}
		if (size === 0) {
			return false;
		}
		if (findPosition(item).data == item) {
			return true;
		} else {
			return false;
		}
	};
	
	this.containsAll = function(items){
		var flag = true;
		for (var item in items) {
			if (!this.contains(item)) {
				flag = false;
			}
		}
		return flag;
	};
	
	this.first = function(){
		if (size === 0) {
			throw new NoSuchElementException('Tree is Empty');
		}
		return this.getLeftMostNode(root).data;
	};
	
	this.isEmpty = function(){
		return size === 0;
	};
	
	this.last = function(){
		if (this.size === 0) {
			throw new NoSuchElementException('Tree is Empty');
		}
		return this.getRightMostNode(root).data;
	};
	
	this.remove = function(item){
		if (item === undefined) {
			throw new NullPointerException('Item must have a value.');
		}
		if (size === 0) {
			return false;
		}
		var temp = findPosition(item);
		if (temp.data == item) {
			if (temp.left === undefined || temp.right === undefined) {
				splice(temp);
			} else {
				var w = temp.right;
				w = this.getLeftMostNode(w);
				temp.data = w.data;
				splice(w);
			}
			size--;
			return true;
		}
		return false;
	};
	
	this.getLeftMostNode = function(node){
		if (node.left === undefined) {
			return node;
		} else {
			return this.getLeftMostNode(node.left);
		}
	};
	
	this.getRightMostNode = function(node){
		if (node.right === undefined) {
			return node;
		} else {
			return this.getRightMostNode(node.right);
		}
	};
	
	var splice = function(node){
		var temp, parent;
		// Set temp to node's child.
		if (node.left !== undefined) {
			temp = node.left;
		} else {
			temp = node.right;
		}

		/*
		 * If node is equal to root, set temp as the new root and set the parent
		 * placeholder node variable to null.
		 */
		if (node == root) {
			root = temp;
			parent = undefined;
		} else {
			/*
			 * Otherwise, set the parent placeholder to the node's parent
			 */
			parent = node.parent;
			/*
			 * Then check which side node was on and set that side to temp,
			 * thereby dereferencing node and deleting it.
			 */
			if (parent.left == node) {
				parent.left = temp;
			} else {
				parent.right = temp;
			}
		}
		/*
		 * Set up the reference from the temp back to the parent if temp is not
		 * null.
		 */
		if (temp !== undefined) {
			temp.parent = parent;
		}
	};
	
	this.removeAll = function(items){
		var flag = false;
		for (var item in items) {
			if (this.remove(item)) {
				flag = true;
			}
		}
		return flag;
	};
	
	this.size = function(){
		return size;
	};
	
	this.toArrayList = function(){
		var list = new ArrayList();
		toArrayRecursive(list, root);
		return list;
	};
	
	var toArrayRecursive = function(list, node){
		if (node === undefined) {
			return;
		} else {
			toArrayRecursive(list, node.left);
			list.add(node.data);
			toArrayRecursive(list, node.right);
		}
	};
	
  this.getTreeData = function(){
		return root;
	};
  
	var Node = function(data){
		this.data = data;
		this.parent=undefined;
		this.left=undefined;
		this.right=undefined;
	};
};

var Map = function(){
	var data = [];
	
	
};
