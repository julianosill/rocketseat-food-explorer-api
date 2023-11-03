class IngredientUpdateService {
  constructor(ingredientsRepository) {
    this.ingredientsRepository = ingredientsRepository
  }

  async execute({ ingredients, product_id }) {
    if (!ingredients) {
      return
    }

    const currentIngredients = await this.ingredientsRepository.findByProductId(
      product_id
    )

    const tagsToRemove = currentIngredients
      .filter(tag => !ingredients.includes(tag.name))
      .map(tag => tag.name)

    const tagsNotInDatabase = ingredients.filter(
      tag => !currentIngredients.some(productTag => productTag.name === tag)
    )

    const tagsToAdd = tagsNotInDatabase.map(name => {
      return { name, product_id }
    })

    await this.ingredientsRepository.update({
      product_id,
      tagsToRemove,
      tagsToAdd,
    })

    return ingredients
  }
}

module.exports = IngredientUpdateService
