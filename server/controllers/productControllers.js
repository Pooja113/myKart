import User from "../models/userModel.js";
import Products from "../models/productModel.js";


export const productControllers = {
  createProduct: async (req, res) => {
    try {
      const data = req.body;
      const user = await User.findById(req.user._id)
      if (data.productReviews) {
        data.productReviews = JSON.parse(data.productReviews)
      }
      if (user.role !== "admin") {
        return res.status(401).json({
          message: "You do not have permission to add products"
        })
      } else {
        let imageUrl = []
        if (req.files) {
          req.files.map((eachfile) => {
            imageUrl.push(`${process.env.BASE_URL}/uploads/` + eachfile.path.split('\\').slice(-1))
          })
        }
        const product = await Products.create({
          ...data,
          productImages: imageUrl
        })
        return res.status(201).json({
          message: "Product Created!",
          product
        })
      }
    } catch (error) {
      console.log('Error in edit product api')
       return res.status(400).json({
        message: error.message
      })
    }
  },

  // editProduct: async (req, res) => {
  //   try {
  //     const data = req.params;
  //     const user = await User.findById(req.user._id)
  
  //     if (user.role !== "admin") {
  //       return res.status(401).json({
  //         message: "You do not have permission to delete any product"
  //       })
  //     } else {
  //       const product = await Products.findOne({productId})

  //       if (!product) {
  //         return res.status(404).json({
  //           message: "No product Found!"
  //         })
  //       }
  //       await Products.deleteOne({productId})
  //       return res.status(201).json({
  //         message: "Product Successfully deleted!",
  //       })
  //     }
  //   } catch (error) {
  //     console.log('Error in edit product api')
  //      return res.status(400).json({
  //       message: error.message
  //     })
  //   }
  // },
  deleteProduct: async (req, res) => {
    try {
      const {productId} = req.params;
      const user = await User.findById(req.user._id)
  
      if (user.role !== "admin") {
        return res.status(401).json({
          message: "You do not have permission to delete any product"
        })
      } else {
        const product = await Products.findOne({productId})

        if (!product) {
          return res.status(404).json({
            message: "No product Found!"
          })
        }
        await Products.deleteOne({productId})
        return res.status(201).json({
          message: "Product Successfully deleted!",
        })
      }
    } catch (error) {
      console.log('Error in edit product api')
       return res.status(400).json({
        message: error.message
      })
    }
  },

}