import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Category = string;
export interface ShoppingItem {
  'id' : bigint,
  'name' : string,
  'completed' : boolean,
  'category' : Category,
}
export interface _SERVICE {
  'addItem' : ActorMethod<[string, Category], bigint>,
  'deleteItem' : ActorMethod<[bigint], boolean>,
  'getCategories' : ActorMethod<[], Array<Category>>,
  'getItems' : ActorMethod<[], Array<ShoppingItem>>,
  'toggleItem' : ActorMethod<[bigint], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
