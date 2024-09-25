import Bool "mo:base/Bool";
import List "mo:base/List";
import Nat "mo:base/Nat";

import Array "mo:base/Array";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import Text "mo:base/Text";

actor ShoppingList {
  public type Category = Text;
  
  public type ShoppingItem = {
    id: Int;
    name: Text;
    category: Category;
    completed: Bool;
  };

  stable var shoppingList: [ShoppingItem] = [];
  stable var nextId: Int = 0;

  let categories: [Category] = ["Dairy", "Meat", "Bakery", "Produce", "Pantry", "Other"];

  public query func getCategories() : async [Category] {
    categories
  };

  public func addItem(name: Text, category: Category) : async Int {
    let id = nextId;
    let newItem: ShoppingItem = {
      id = id;
      name = name;
      category = category;
      completed = false;
    };
    shoppingList := Array.append(shoppingList, [newItem]);
    nextId += 1;
    id
  };

  public func toggleItem(id: Int) : async Bool {
    let index = Array.indexOf<ShoppingItem>({ id = id; name = ""; category = ""; completed = false }, shoppingList, func(a, b) { a.id == b.id });
    switch (index) {
      case null { false };
      case (?i) {
        let item = shoppingList[i];
        let updatedItem = {
          id = item.id;
          name = item.name;
          category = item.category;
          completed = not item.completed;
        };
        shoppingList := Array.tabulate(shoppingList.size(), func (j: Nat) : ShoppingItem {
          if (j == i) { updatedItem } else { shoppingList[j] }
        });
        true
      };
    };
  };

  public func deleteItem(id: Int) : async Bool {
    let newList = Array.filter(shoppingList, func(item: ShoppingItem) : Bool { item.id != id });
    if (newList.size() < shoppingList.size()) {
      shoppingList := newList;
      true
    } else {
      false
    };
  };

  public query func getItems() : async [ShoppingItem] {
    shoppingList
  };
}
