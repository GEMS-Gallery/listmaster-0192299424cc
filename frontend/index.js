import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
  const shoppingList = document.getElementById('shopping-list');
  const addItemForm = document.getElementById('add-item-form');
  const newItemInput = document.getElementById('new-item');
  const itemCategorySelect = document.getElementById('item-category');

  // Populate category dropdown
  async function populateCategories() {
    const categories = await backend.getCategories();
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      itemCategorySelect.appendChild(option);
    });
  }

  // Function to render the shopping list
  async function renderShoppingList() {
    const items = await backend.getItems();
    shoppingList.innerHTML = '';

    const itemsByCategory = items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});

    for (const [category, categoryItems] of Object.entries(itemsByCategory)) {
      const categoryDiv = document.createElement('div');
      categoryDiv.className = 'category';
      categoryDiv.innerHTML = `<h2>${category}</h2>`;

      const ul = document.createElement('ul');
      categoryItems.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span class="${item.completed ? 'completed' : ''}">${item.name}</span>
          <button class="toggle-btn"><i class="fas fa-check"></i></button>
          <button class="delete-btn"><i class="fas fa-trash"></i></button>
        `;
        li.dataset.id = item.id;
        ul.appendChild(li);
      });

      categoryDiv.appendChild(ul);
      shoppingList.appendChild(categoryDiv);
    }
  }

  // Add new item
  addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = newItemInput.value.trim();
    const category = itemCategorySelect.value;
    if (name && category) {
      await backend.addItem(name, category);
      newItemInput.value = '';
      itemCategorySelect.value = '';
      await renderShoppingList();
    }
  });

  // Toggle item completion
  shoppingList.addEventListener('click', async (e) => {
    if (e.target.closest('.toggle-btn')) {
      const li = e.target.closest('li');
      const id = parseInt(li.dataset.id);
      await backend.toggleItem(id);
      await renderShoppingList();
    }
  });

  // Delete item
  shoppingList.addEventListener('click', async (e) => {
    if (e.target.closest('.delete-btn')) {
      const li = e.target.closest('li');
      const id = parseInt(li.dataset.id);
      await backend.deleteItem(id);
      await renderShoppingList();
    }
  });

  // Initial setup
  await populateCategories();
  await renderShoppingList();
});
