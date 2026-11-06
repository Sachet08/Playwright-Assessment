const { test, expect } = require('@playwright/test');
const { TodoPage } = require('../pages/TodoPage');

let todoPage;

test.beforeEach(async ({ page }) => {
  todoPage = new TodoPage(page);
  await todoPage.goto();

});

test('Add a new todo item', async ({ page }) => {
    await todoPage.addTodo('Drink Water');
    await expect(todoPage.todoListItems).toHaveCount(1);
    await expect(todoPage.todoListItems.first()).toHaveText('Drink Water');
});
test('Add multiple todo items', async ({ page }) => {
    await todoPage.addTodo('Drink Water');
    await todoPage.addTodo('Eat Food');
    await expect(todoPage.todoListItems).toHaveCount(2);
    await expect(todoPage.todoListItems.nth(0)).toHaveText('Drink Water');
    await expect(todoPage.todoListItems.nth(1)).toHaveText('Eat Food');
});
test('Mark a todo item as completed', async ({ page }) => {
    await todoPage.addTodo('Drink Water');
    await todoPage.todoListItems.first().locator('.toggle').check();
    await expect(todoPage.todoListItems.first()).toHaveClass(/completed/);
});
test('Delete a todo item', async ({ page }) => {
    await todoPage.addTodo('Drink Water');
    await todoPage.deleteTodo(0);
    await expect(todoPage.todoListItems).toHaveCount(0);    
});
test('Active todo count is updated correctly', async ({ page }) => {
    await todoPage.addTodo('Drink Water');
    await todoPage.addTodo('Eat Food');
    await todoPage.todoListItems.first().locator('.toggle').check();
    await expect(todoPage.activeTodoCount).toHaveText('1 item left');
});
test('COmpleted todo count is updated correctly', async ({ page }) => {
    await todoPage.addTodo('Drink Water');
    await todoPage.addTodo('Eat Food');
    await todoPage.todoListItems.first().locator('.toggle').check();
    await expect(todoPage.activeTodoCount).toHaveText('1 item left');
});