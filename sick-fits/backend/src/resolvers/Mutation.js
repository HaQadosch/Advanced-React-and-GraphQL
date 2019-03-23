const Mutation = {
  async createItem (parent, args, { db: { mutation, query, ...dbRest }, ...ctx }, info) {
    const item = await mutation.createItem({ data: { ...args } }, info)
    return item
  }
}

module.exports = Mutation
