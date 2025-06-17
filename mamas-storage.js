import uuid from "uuid";

class InMemeoryStorage {
  constructor() {
    self.storage = {};
  }
  create(collectionName, item) {
    if (!self.storage[collectionName]) {
      self.storage[collectionName] = [];
    }
    const newUser = {
      id: uuid.v4(),
      ...item,
    };
    self.storage[collectionName].push(newUser);
    return newUser;
  }

  find(collectionName, findFunc) {
    if (!self.storage[collectionName]) {
      return [];
    }
    return self.storage[collectionName].filter(findFunc);
  }
  where(collectionName, where) {
    if (!self.storage[collectionName]) {
      return [];
    }
    return this.find(collectionName, (item) => {
      return Object.keys(where).every((key) => item[key] === where[key]);
    });
  }

  remove(collectionName, findFunc) {
    if (!self.storage[collectionName]) {
      return [];
    }
    const items = this.find(collectionName, findFunc);
    self.storage[collectionName] = self.storage[collectionName].filter(
      (item) => !items.includes(item)
    );
    return items;
  }
}

export class InMemeorySharedStorage {
  static storage = {};
  constructor() {
    self.storage = InMemeorySharedStorage.storage;
    
  }
  create(collectionName, item) {
    if (!self.storage[collectionName]) {
      self.storage[collectionName] = [];
    }
    const newUser = {
      id: uuid.v4(),
      ...item,
    };
    self.storage[collectionName].push(newUser);
    return newUser;
  }

  find(collectionName, findFunc) {
    if (!self.storage[collectionName]) {
      return [];
    }
    return self.storage[collectionName].filter(findFunc);
  }
  where(collectionName, where) {
    if (!self.storage[collectionName]) {
      return [];
    }
    return this.find(collectionName, (item) => {
      return Object.keys(where).every((key) => item[key] === where[key]);
    });
  }

  remove(collectionName, findFunc) {
    if (!self.storage[collectionName]) {
      return [];
    }
    const items = this.find(collectionName, findFunc);
    self.storage[collectionName] = self.storage[collectionName].filter(
      (item) => !items.includes(item)
    );
    return items;
  }
}

module.exports = { InMemoryStorage, InMemorySharedStorage };  