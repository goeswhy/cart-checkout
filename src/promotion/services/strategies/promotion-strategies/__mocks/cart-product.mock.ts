import { CartProduct } from "src/cart/entities/cart-product.entity"
import { Product } from "src/product/entities/product.entity"

export const productMock: Product = {
  id: 1,
  name: 'Macbook Pro',
  sku: 'sku-1',
  stock: 5,
  price: 300,
}

export const cartProductMock: CartProduct = {
  id: 1,
  price: 300,
  quantity: 1,
  product: productMock,
}
