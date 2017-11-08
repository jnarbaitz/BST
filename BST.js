"use strict";

class BTNode{
  constructor(value){
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST{
  constructor(){
    this.root = null;
  }

  add(value){
    var node = new BTNode(value);
    var temp;

    if(this.root === null){
      this.root = node;
    }else{
      temp = this.root;

      while(true){

        if(value < temp.value){ //new value less than node's value
          if(temp.left === null){//if no left
            temp.left = node;
            break;
          }else{
            temp = temp.left;
          }

        }else if(value > temp.value){//new value greater than node's value
          if(temp.right === null){    //if no right
            temp.right = node;
            break;
          }else{
            temp = temp.right;
          }

        }else{                      //new value is equal case
          break;
        }
      }
    }
    return this;
  }//add

  remove(value){

    function findMin(node){
      while(node.left !== null){
        node = node.left;
      }
      return node;
    }//findMin

    function removeNode(node, value){

      if(node === null){
        return null;
      }

      if(value === node.value){
        //console.log("value === node.value");
        if(node.left === null && node.right === null){
          //console.log("rN1");
          return null;
        }else if(node.left === null){
          //console.log("rN2");
          return node.right;
        }else if(node.right === null){
          //console.log("rN3");
          return node.left;
        }else{
          //console.log("rN4");
          var temp = findMin(node.right);
          node.value = temp.value;
          node.right = removeNode(node.right, temp.value);
          return node;
        }
      }else if(value < node.value){
        //console.log("value < node.value");
        node.left = removeNode(node.left, value);
        return node;
      }else{
        //console.log("value > node.value");
        node.right = removeNode(node.right, value);
        return node;
      }
    }//removeNode

    if(this.root !== null)
      this.root = removeNode(this.root, value);
    return this;
  }//remove

  height(){
    function getHeight(node){

      if(node === null){
        return -1;
      }

      var leftHeight = getHeight(node.left);
      var rightHeight = getHeight(node.right);


      if(leftHeight > rightHeight){
        return leftHeight + 1;
      }else{
        return rightHeight + 1;
      }
    }//getHeight

    if(this.root === null){
      return 0;
    }else{
      var temp = this.root
      return getHeight(temp);
    }
  }//height
}//BST

const binaryTree = new BST();

binaryTree.add(1).add(2).add(3).add(4);
console.log(binaryTree.height());

binaryTree.add(9).add(2).add(7).add(6).add(5).add(8);
console.log(binaryTree.height());

binaryTree.remove(1).remove(6).remove(10);
console.log(binaryTree.height());

binaryTree.remove(10);
console.log(binaryTree.height());
