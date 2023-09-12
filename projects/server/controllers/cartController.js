const {product,cartItem} = require("../models")
const {Sequelize} = require("sequelize")
module.exports = {
    addToCart : async (req, res) => {
        try {
          const { quantity } = req.body;
          const id = req.params.id
      
          const cekproduct = await product.findOne({ where: { id: id } });
      
          if (!cekproduct) {
            return res.status(404).json({
              status: false,
              message: 'Product not found',
            });
          }
      
          const existingCartItem = await cartItem.findOne({
            where: { productId: id, userId: req.user.id },
          });
          if (existingCartItem) {
            const updatedQuantity = Sequelize.literal(`quantity + ${quantity}`);
            await existingCartItem.update({ quantity: updatedQuantity });
          } else {
           
            await cartItem.create({
              userId: req.user.id,
              productId: id,
              quantity,
            });
          }
      
          res.status(200).json({
            status: true,
            message: 'Product added to the cart',
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({
            status: false,
            message: 'Error adding product to the cart',
            error: error.message,
          });
        }
      },
       getUserCart: async (req, res) => {
        try {
          const userId = req.user.id;
          const cartItems = await cartItem.findAll({
            where: { userId },
            include: [{ model: product }],
          });
      
      
          res.status(200).json({
            status: true,
            message: 'User cart retrieved successfully',
            result: cartItems,
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({
            status: false,
            message: 'Error retrieving user cart',
            error: error.message,
          });
        }
      },
}