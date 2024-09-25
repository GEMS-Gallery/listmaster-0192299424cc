import Bool "mo:base/Bool";
import Func "mo:base/Func";
import List "mo:base/List";
import Nat "mo:base/Nat";
import Text "mo:base/Text";

import Array "mo:base/Array";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Option "mo:base/Option";

actor ShoppingList {
  // Define the ShoppingItem type
  public type ShoppingItem = {
    id: Int;
    name: Text;
    completed: Bool;
  };

  // Use a stable variable to store the shopping list
  stable var shoppingList: [ShoppingItem] = [];
  stable var nextId: Int = 0;

  // Function to add a new item to the shopping list
  public func addItem(name: Text) : async Int {
    let id = nextId;
    let newItem: ShoppingItem = {
      id = id;
      name = name;
      completed = false;
    };
    shoppingList := Array.append(shoppingList, [newItem]);
    nextId += 1;
    id
  };

  // Function to toggle the completion status of an item
  public func toggleItem(id: Int) : async Bool {
    let index = Array.indexOf<ShoppingItem>({ id = id; name = ""; completed = false }, shoppingList, func(a, b) { a.id == b.id });
    switch (index) {
      case null { false };
      case (?i) {
        let item = shoppingList[i];
        let updatedItem = {
          id = item.id;
          name = item.name;
          completed = not item.completed;
        };
        shoppingList := Array.tabulate(shoppingList.size(), func (j: Nat) : ShoppingItem {
          if (j == i) { updatedItem } else { shoppingList[j] }
        });
        true
      };
    };
  };

  // Function to delete an item from the shopping list
  public func deleteItem(id: Int) : async Bool {
    let newList = Array.filter(shoppingList, func(item: ShoppingItem) : Bool { item.id != id });
    if (newList.size() < shoppingList.size()) {
      shoppingList := newList;
      true
    } else {
      false
    };
  };

  // Function to get all items in the shopping list
  public query func getItems() : async [ShoppingItem] {
    shoppingList
  };
}
