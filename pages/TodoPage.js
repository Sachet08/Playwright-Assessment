class TodoPage {
    constructor(page) {
        this.page = page;

        this.todoInput = page.locator('.new-todo');
        this.todoListItems = page.locator('.todo-list li');
        this.activeTodoCount = page.locator('.todo-count');
    }

    async goto() {
        await this.page.goto(
            'https://todomvc.com/examples/angular/dist/browser/#/all'
        );
    }

    async addTodo(todo) {
        await this.todoInput.fill(todo);
        await this.todoInput.press('Enter');
    }
    async markTodoCompleted(index) {
        await this.todoListItems.nth(index).locator('.toggle').check();
    }
    async deleteTodo(index) {
        await this.todoListItems.nth(index).hover();
        await this.todoListItems.nth(index).locator('.destroy').click();
    }
}
module.exports = { TodoPage };