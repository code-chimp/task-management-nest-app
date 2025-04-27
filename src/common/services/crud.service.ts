import { NotFoundException } from '@nestjs/common';

/**
 * Abstract class providing generic CRUD operations for managing items of type T.
 * T must extend an object with an `id` property of type string.
 */
export abstract class CrudService<T extends { id: string }> {
  /**
   * Array to store items of type T.
   */
  protected items: T[] = [];

  /**
   * Retrieves all items.
   * @returns {T[]} An array of all items.
   */
  getAll(): T[] {
    return this.items;
  }

  /**
   * Retrieves a single item by its ID.
   * @param {string} id - The ID of the item to retrieve.
   * @returns {T} The item with the specified ID.
   * @throws {NotFoundException} If the item with the specified ID is not found.
   */
  get(id: string): T {
    const item = this.items.find(item => item.id === id);
    if (!item) {
      throw new NotFoundException(`Item with ID "${id}" not found`);
    }
    return item;
  }

  /**
   * Creates a new item and adds it to the collection.
   * @param {Omit<T, 'id'>} item - The item to create, excluding the `id` field.
   * @returns {T} The newly created item with a generated ID.
   */
  create(item: Omit<T, 'id'>): T {
    const newItem = { ...item, id: crypto.randomUUID() } as T;
    this.items.push(newItem);
    return newItem;
  }

  /**
   * Updates an existing item by its ID.
   * @param {string} id - The ID of the item to update.
   * @param {Partial<T>} updatedItem - Partial object containing the fields to update.
   * @returns {T} The updated item.
   * @throws {NotFoundException} If the item with the specified ID is not found.
   */
  update(id: string, updatedItem: Partial<T>): T {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Item with ID "${id}" not found`);
    }
    this.items[index] = { ...this.items[index], ...updatedItem };
    return this.items[index];
  }

  /**
   * Patches an existing item by its ID.
   * @param {string} id - The ID of the item to patch.
   * @param {Partial<T>} updatedItem - Partial object containing the fields to update.
   * @returns {T} The patched item.
   * @throws {NotFoundException} If the item with the specified ID is not found.
   */
  patch(id: string, updatedItem: Partial<T>): T {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Item with ID "${id}" not found`);
    }
    this.items[index] = { ...this.items[index], ...updatedItem };
    return this.items[index];
  }

  /**
   * Deletes an item by its ID.
   * @param {string} id - The ID of the item to delete.
   * @returns {boolean} True if the item was successfully deleted.
   * @throws {NotFoundException} If the item with the specified ID is not found.
   */
  delete(id: string): boolean {
    const index = this.items.findIndex(item => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Item with ID "${id}" not found`);
    }
    this.items.splice(index, 1);
    return true;
  }
}
