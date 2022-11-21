// Binary search Tree//

//Node class creates the foundataion for the Node object//
class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(data) {
    const node = this.root;
    //assign root node if there isnt one present//
    if ((node == null)) {
      this.root = new Node(data);
      return;
    } else {
      //if there is a root node determine where it should go based on its value//
      const searchTree = function (node) {
        //if the entered node is less than the root it should be placed to the left node//
        if (data < node.data) {
          if (node.left === null) {
            node.left = new Node(data);
            return;
          }
          //if the left node has a value rerun the searchTree function with the left node as the parameter//
          else if (node.left !== null) {
            return searchTree(node.left);
          }
        }
        //if the node entered is greater than the root node place the node to the right//
        else if (data > node.data) {
          if (node.right === null) {
            node.right = new Node(data);
            return;
          }
          //if the right node has a value rerun the searchTree function with the right node as the parameter//
          else if (node.right !== null) {
            return searchTree(node.right);
          }
        }
        //for any other cases//
        else {
          return null;
        }
      };
      return searchTree(node);
    }
  }

  //This function finds the lowest number in the tree//
  findMinNum() {
    let current = this.root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  //This function finds the greatest number in the tree//
  findMaxNum() {
    let current = this.root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }

  //This function checks if the number is present in the tree//
  isPresent(data) {
    let current = this.root;
    //if the root node isnt null execute these conditionals//
    while (current) {
      //if the node is found return true//
      if (data === current.data) {
        return true;
      }
      //if the number being searched is less than the current node move down to the left//
      if (data < current.data) {
        current = current.left;
      }
      //if the number being searched is greater than the current node move down to the right//
      else {
        current = current.right;
      }
    }
    return false;
  }

  //This function extracts a node from a binary tree//
  remove(data) {
    const removeNode = function (node, data) {
      // if the root node is null, it is an empty tree so null is returned//
      if (node === null) {
        return null;
      }
      //if the node requested to be removed is the current node
      if (data == node.data) {
        //if the parent has no children//
        if (node.left == null && node.right == null) {
          return null;
        }
        //if there is no left child, replace the current node with the child to the right//
        if (node.left == null) {
          return node.right;
        }
        //if there is no right child, replace the current node with the child to the left//
        if (node.right == null) {
          return node.left;
        }
        /*if the node has 2 children, you must go to the right 
            node of the current node then go to the left most node in order to
             replace the current node with 2 children*/
        var tempNode = node.right;
        while (tempNode !== null) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
      } else if (data < node.data) {
        /*if the node requested to be removed is less than the current node
         replace the current node with the left node and repeat*/
        //replaces the current node with the left node and repeats//
        node.left = removeNode(node.left, data);
        return node;
      }
      //if the node requested to be removed is greater than the current node//
      else {
        node.right = removeNode(node.right, data);
        return node;
      }
    };
    this.root = removeNode(this.root, data);
  }
}
//creates the tree object
const bst = new BST();

// gives vales to the tree
function createTree() {
  let x = 0;
  while (x !== 10) {
    bst.insert(x);
    x++;
  }
}

createTree();
// bst.insert(1);
// bst.insert(2);
// bst.insert(3);
console.log(bst.findMinNum());
console.log(bst.findMaxNum());
bst.remove(bst.findMaxNum());
bst.remove(bst.findMinNum());
console.log(bst.findMinNum());
console.log(bst.findMaxNum());
console.log(bst.isPresent(5));
