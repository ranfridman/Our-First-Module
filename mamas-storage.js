import { v4 } from "uuid";


export class InMemoryStorage {
  constructor() {
    this.storage = {};
  }
  create(collectionName, item) {
    if (!this.storage[collectionName]) {
      this.storage[collectionName] = [];
    }
    
    const newUser = {
      id: v4(),
      ...item,
    };
    this.storage[collectionName].push(newUser);
    return newUser;
  }

  find(collectionName, findFunc) {
    if (!this.storage[collectionName]) {
      return [];
    }
    return this.storage[collectionName].filter(findFunc);
  }

  where(collectionName, where) {
    if (!this.storage[collectionName]) {
      return [];
    }
    console.log(this.storage[collectionName]);
    console.log(where);
    
    return this.find(collectionName, (item) => {
      return Object.keys(where).every((key) => item[key] == where[key]);
    });
  }

  remove(collectionName, findFunc) {
    if (!this.storage[collectionName]) {
      return [];
    }
    const items = this.find(collectionName, findFunc);
    this.storage[collectionName] = this.storage[collectionName].filter(
      (item) => !items.includes(item)
    );
    return items;
  }
}

export class InMemorySharedStorage {
  static storage = {};
  constructor() {
    this.storage = InMemorySharedStorage.storage;
  }
  create(collectionName, item) {
    if (!this.storage[collectionName]) {
      this.storage[collectionName] = [];
    }
    const newUser = {
      id: v4(),
      ...item,
    };
    this.storage[collectionName].push(newUser);
    return newUser;
  }

  find(collectionName, findFunc) {
    if (!this.storage[collectionName]) {
      return [];
    }
    return this.storage[collectionName].filter(findFunc);
  }
  where(collectionName, where) {
    if (!this.storage[collectionName]) {
      return [];
    }
    return this.find(collectionName, (item) => {
      return Object.keys(where).every((key) => item[key] === where[key]);
    });
  }

  remove(collectionName, findFunc) {
    if (!this.storage[collectionName]) {
      return [];
    }
    const items = this.find(collectionName, findFunc);
    this.storage[collectionName] = this.storage[collectionName].filter(
      (item) => !items.includes(item)
    );
    return items;
  }
}

