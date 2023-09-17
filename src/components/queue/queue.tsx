export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  clear: () => void;
  elements: () => (T | null)[];
  headValue: () => number;
  tailValue: () => number;
  sizeValue: () => number;
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
      throw new Error("Maximum length exceeded");
    }

    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }

    this.container[this.head] = null;
    this.head++;
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

  isEmpty = () => this.length === 0;
}
