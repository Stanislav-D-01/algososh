import React, { useState, useEffect } from "react";

interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  clear: () => void;
}

export class Stack<T> implements IStack<T> {
  stack: T[] = [];
  constructor(stack: T[]) {
    this.stack = stack;
  }

  push(element: T) {
    this.stack.push(element);
  }

  pop() {
    this.stack.pop();
  }

  clear() {
    this.stack = [];
  }

  get elements() {
    return this.stack;
  }

  get size() {
    return this.stack.length;
  }
}
