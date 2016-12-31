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
  };

};
