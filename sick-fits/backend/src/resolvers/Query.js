const { forwardTo } = require('prisma-binding')

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db')
  // async items (parent, args, { db: { query, mutation, ...dbRest }, ...ctx }, info) {
  //   const items = await query.items(args)
  //   return items
  // }
}

module.exports = Query
