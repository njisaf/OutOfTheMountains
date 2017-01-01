'use strict';

module.exports = function LinkedList() {

  let Node = function(element) {
    this.element = element;
    this.next = null;
  };

  let length = 0;
  let head = null;

  this.append = function(element) {
    let node = new Node(element);
    let current = null;

    if(!head) {
      console.log('No list head. New node will be head;');
      head = node;
    } else {
      current = head;
      while(current.next) {
        current = current.next;
      }
      current.next = node;
    }
    ++length;
  };

  this.insertAt = function(position, element) {
    if(position < 0 || position > length) {
      console.log('Position is out of bounds;');
      return false;
    }

    let node = new Node(element);
    let current = head;
    let previous = null;
    let index = 0;

    if(position === 0) {
      console.log('Inserting new node at head. Previous head will be next node;');
      node.next = current;
      head = node;
    } else {
      while(++index < position) {
        previous = current;
        current = current.next;
      }
      node.next = current;
      previous.next = node;
    }
    ++length;
    return true;
  };

  this.removeAt = function(position) {
    if(position < 0 || position > length) {
      console.log('Position is out of bounds;');
      return false;
    }

    let current = head;
    let previous = null;
    let index = 0;

    if(position === 0) {
      console.log('Removing head. Next item in list will be assigned as head;');
      head = current.next;
    } else {
      while(++index < position) {
        previous = current;
        current = current.next;
      }
      previous.next = current.next;
    }
    --length;
    return current.element;
  };

  this.indexOf = function(element) {
    let current = head;
    let index = -1;

    while(current) {
      if(element === current.element) {
        return index;
      }
      ++index;
      current = current.next;
    }
    return -1;
  };

  this.remove = function(element) {
    let index = this.indexOf(element);
    return this.removeAt(index);
  };

  this.isEmpty = function() {
    return length === 0;
  };

  this.getHead = function() {
    return head;
  };

  this.size = function() {
    return length;
  };

  this.removeDuplicates = function() {
    if (!head || !head.next) {
      console.log('List is either empty or contains a single node. No duplicates.');
      return;
    }

    let previous = head;
    let current = head.next;
    let nodes = {};

    while(current) {
      if(!nodes[current.element]) {
        nodes[current.element] = true;
      } else {
        previous.next = current.next;
        --length;
      }
      previous = current;
      current = current.next;
    }

  };

};
