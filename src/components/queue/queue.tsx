export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  clear: () => void;
  elements: () => (T | null)[];
  headValue: () => number;
  tailValue: () => number;
  sizeValue: () => number;
  isEmpty: () => boolean;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.tail === this.size) {
      return;
    }
    if (this.container[this.head] === null && this.tail !== 0) {
      this.container[this.tail % this.size] = item;
      this.tail++;
      this.length++;
      this.head++;
    } else {
      this.container[this.tail % this.size] = item;
      this.tail++;
      this.length++;
    }
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    this.container[this.head] = null;
    if (this.head !== this.size - 1 && this.head !== this.tail - 1) {
      console.log(this.head);
      this.head++;
    }
    this.length--;
  };

  clear = () => {
    if (!this.isEmpty()) {
      for (let i = 0; i < this.size; i++) this.container[i] = null;
    }
    this.head = 0;
    this.length = 0;
    this.tail = 0;
  };

  elements() {
    return this.container;
  }

  headValue() {
    return this.head;
  }

  tailValue() {
    return this.tail;
  }

  sizeValue() {
    return this.size;
  }
  lengthValue() {
    return this.length;
  }

  isEmpty = () => this.length === 0;
}
