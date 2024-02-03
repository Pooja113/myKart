import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
  productName: { type: String, required: true },
  productDesc: { type: String, required: true },
  productId: { type: String, required: true, unique: true },
  productImages: [{ type: String }],
  productInStock: { type: String, default: 1 },
  productCategory: { type: String },
  productReviews: [ 
    {
      review: { type: Number },
      comment: { type: String },
    }
  ],  
},
  {
    timestamps: true
  }
)

const productModel = mongoose.model('Products', productSchema)
export default productModel

