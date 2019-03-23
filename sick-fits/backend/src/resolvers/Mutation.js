const Mutation = {
  createDog (parent, { name, ...args }, context, info) {
    global.dogs = global.dogs || []
    const newDog = { name }
    global.dogs.push(newDog)
    return newDog
  }
}

module.exports = Mutation
