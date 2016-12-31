'use strict';

module.exports = function LinkedList() {

  var Node = function(element) {
    this.element = element;
    this.next = null;
  };

  var length = 0;
  var head = null;

  this.append = function(element) {
    var node = new Node(element);
    var current = null;

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

    var node = new Node(element);
    var current = head;
    var previous = null;
    var index = 0;

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

    var current = head;
    var previous = null;
    var index = 0;

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



};
