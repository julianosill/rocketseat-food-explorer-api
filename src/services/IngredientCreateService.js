class IngredientCreateService {
  constructor(ingredientsRepository) {
    this.ingredientsRepository = ingredientsRepository
  }

  async execute({ ingredients, product_id }) {
    const tags = ingredients.map(name => {
      return { name, product_id }
    })

    await this.ingredientsRepository.create(tags)

    return tags
  }
}

module.exports = IngredientCreateService
