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
  }
}

module.exports = Mutation
