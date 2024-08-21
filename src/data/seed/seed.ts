import { CategoryModel, MongoDatabase, ProductModel, UserModel, seedData } from '..'
import { envs } from '../../config'
;(async () => {
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL
  })

  await main()

  MongoDatabase.disconnect()
})()

async function main() {
  /* 
    Todo: delete all data from the database

    Todo: create users

    Todo: create categories

    Todo: create products
  
  */

  const randomBetween0andX = (x: number) => Math.floor(Math.random() * x)

  await Promise.all([UserModel.deleteMany(), CategoryModel.deleteMany(), ProductModel.deleteMany()])

  const users = await UserModel.insertMany(seedData.users)

  const categories = await CategoryModel.insertMany(
    seedData.categories.map((category) => ({
      ...category,
      user: users[randomBetween0andX(users.length)]._id
    }))
  )

  const products = await ProductModel.insertMany(
    seedData.products.map((product) => ({
      ...product,
      user: users[randomBetween0andX(users.length -1)]._id,
      category: categories[randomBetween0andX(categories.length -1)]._id
    }))
  )
}
