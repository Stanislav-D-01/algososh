export class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null;
  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

type TArray<T> = {
  val: T;
  head: string | null;
  tail: string | null;
};

export interface ILinkedList<T> {
  append: (element: T) => void;
  getSize: () => number;
  print: () => void;
  getHead: () => LinkedListNode<T> | null;
  toArray: () => TArray<T>[];
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  append(element: T) {
    const node = new LinkedListNode(element);
    if (this.head === null) {
      this.head = node;
      this.size++;
    } else {
      let currentNode = this.head;
      while (currentNode.next) {
        currentNode = currentNode.next;
      }
      currentNode.next = node;
      this.size++;
    }
  }

  prepend(element: T) {
    const node = new LinkedListNode(element);
    if (this.head === null) {
      this.head = node;
      this.size++;
    } else {
      let currentNode = this.head;
      this.head = node;
      node.next = currentNode;

      this.size++;
    }
  }

  addByIndex(index: number, element: T) {
    if (index < 0 || index > this.size) {
      return;
    } else {
      const node = new LinkedListNode(element);
      if (index === 0) {
        console.log("1234");
        node.next = this.head;
        this.head = node;
        this.size++;
      } else {
        let curr = this.head;
        let currIndex = 0;

        while (currIndex < index - 1) {
          curr = curr && curr.next;
          currIndex++;
        }
        if (curr) {
          node.next = curr.next;
          curr.next = node;
          this.size++;
        }
      }
    }
  }

  deleteHead = () => {
    if (this.head === null) {
      return;
    } else {
      const currentNode = this.head;
      const nextNode = currentNode.next;
      currentNode.next = null;
      this.head = nextNode;
    }
  };

  deleteTail = () => {
    if (this.head === null) {
      return;
    } else {
      let currentNode = this.head;
      let prevNode = null;
      while (currentNode && currentNode.next) {
        prevNode = currentNode;
        currentNode = currentNode.next;
      }
      if (prevNode !== null) {
        prevNode.next = null;
      }
    }
  };

  deleteByIndex = (index: number) => {
    if (index < 0 || index > this.size) {
      return;
    }

    if (index == 0) {
      this.deleteHead();
      return;
    }
    if (index === this.size - 1) {
      this.deleteTail();
      return;
    } else {
      let currentElement = this.head;
      let prevElement = null;
      let currentIndex = 0;
      while (currentIndex < index && currentElement) {
        prevElement = currentElement;
        currentElement = currentElement.next;
        currentIndex++;
      }
      if (currentElement && prevElement) {
        prevElement.next = currentElement.next;
        currentElement.next = null;
      }
    }
  };

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) {
      return;
    } else {
      const node = new LinkedListNode(element);

      if (index === 0) {
        node.next = this.head;
        this.head = node;
        this.size++;
      } else {
        let curr = this.head;
        let currIndex = 0;

        while (currIndex < index - 1) {
          if (curr) {
            curr = curr.next;
            currIndex++;
          }
        }
        if (curr) {
          node.next = curr.next;
          curr.next = node;
          this.size++;
        }
      }
    }
  }

  getSize() {
    return this.size;
  }

  getHead() {
    return this.head;
  }

  getElements() {
    let curr = this.head;
    const arr = [];
    if (curr) {
      while (curr.next) {}
    }
  }

  toArray() {
    const array = [];
    let currentElement = this.head;
    while (currentElement && currentElement.next) {
      array.push({
        val: currentElement.value,
        head: currentElement === this.head ? "head" : "",
        tail: "",
      });
      currentElement = currentElement.next;
    }
    currentElement &&
      array.push({
        val: currentElement.value,
        head: "",
        tail: "tail",
      });
    return array;
  }
  print() {
    let curr = this.head;
    let res = "";
    while (curr) {
      res += `${curr.value} `;
      curr = curr.next;
    }
    console.log(res);
  }
}
