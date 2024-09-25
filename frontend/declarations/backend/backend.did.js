export const idlFactory = ({ IDL }) => {
  const Category = IDL.Text;
  const ShoppingItem = IDL.Record({
    'id' : IDL.Int,
    'name' : IDL.Text,
    'completed' : IDL.Bool,
    'category' : Category,
  });
  return IDL.Service({
    'addItem' : IDL.Func([IDL.Text, Category], [IDL.Int], []),
    'deleteItem' : IDL.Func([IDL.Int], [IDL.Bool], []),
    'getCategories' : IDL.Func([], [IDL.Vec(Category)], ['query']),
    'getItems' : IDL.Func([], [IDL.Vec(ShoppingItem)], ['query']),
    'toggleItem' : IDL.Func([IDL.Int], [IDL.Bool], []),
  });
};
export const init = ({ IDL }) => { return []; };
