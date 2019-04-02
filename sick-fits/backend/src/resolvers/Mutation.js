const Mutation = {
  async createItem (parent, args, { db: { mutation, query, ...dbRest }, ...ctx }, info) {
    const item = await mutation.createItem({ data: { ...args } }, info)
    return item
  },
  updateItem (parent, { id, ...args }, { db: { mutation: { updateItem, ...mutation }, ...db }, ...ctx }, info) {
    const update = args
    return updateItem({
      data: update,
      where: { id }
    }, info)
  },
  async deleteItem (parent, { id, ...args }, { db: { mutation: { deleteItem, ...mutation }, query: { item, ...query }, ...db }, ...ctx }, info) {
    const where = { id }

    const found = await item({ where }, '{ id, title }')
    return deleteItem({ where }, info)
  }
}

module.exports = Mutation
