const { cartItem, product, cart } = require('../models');
const { Sequelize } = require('sequelize');

const updateCartItemQuantity = async (cartItemId, newQuantity) => {
  try {
    const cartItemToUpdate = await cartItem.findOne({
      where: { id: cartItemId },
    });

    if (!cartItemToUpdate) {
      throw new Error('Cart item not found');
    }

    await cartItem.update(
      { quantity: newQuantity },
      { where: { id: cartItemId } }
    );

    const cartItems = await cartItem.findAll({
      where: { cartId: cartItemToUpdate.cartId },
    });

    let totalCartPrice = 0;
    for (const item of cartItems) {
      const sproduct = await product.findOne({ where: { id: item.productId } });
      totalCartPrice += item.quantity * sproduct.price;
    }

    await cart.update(
      { totalPrice: totalCartPrice },
      { where: { id: cartItemToUpdate.cartId } }
    );
  } catch (error) {
    throw error;
  }
};


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
      const [userCart] = await cart.findOrCreate({where:{userId:req.user.id, isCheckOut:false}})
      
      const existingCartItem = await cartItem.findOne({
        where: { productId: id, cartId:userCart.id  },
      })
      if (existingCartItem) {
        const updatedQuantity = Sequelize.literal(`quantity + ${quantity}`);
        await existingCartItem.update({ quantity: updatedQuantity });
      } else {
       
        await cartItem.create({
          cartId:userCart.id,
          productId: id,
          quantity,
        });
      }
      const cartItems = await cartItem.findAll({
        where: { cartId: userCart.id },
      });
  
      let totalCartPrice = 0;
      for (const item of cartItems) {
        const sproduct = await product.findOne({ where: { id: item.productId } });
        totalCartPrice += item.quantity * sproduct.price;
      }
  
      await cart.update(
        { totalPrice: totalCartPrice },
        { where: { id: userCart.id } } 
      );      
    
      res.status(200).send({
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
      const userCart = await cart.findOne({where:{userId:userId, isCheckOut:false}})
  
      const cartItems = await cartItem.findAll({
        where: { cartId:userCart.id  },
        include: [{ model: product }],
      });
  
  
      res.status(200).json({
        status: true,
        totalPrice: userCart.totalPrice,
        message: 'User cart retrieved successfully',
        result: cartItems,
        Cart:userCart
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

  removeFromCart : async (req, res) => {
    try {
      const  id  = req.params.id
      const userId = req.user.id;
  
      const cekproduct = await product.findOne({ where: { id: id } });
  
      if (!cekproduct) {
        return res.status(404).send({
          status: false,
          message: 'Product not found',
        });
      }
  
      const userCart = await cart.findOne({ where: { userId, isCheckOut:false} });
  
      if (!userCart) {
        return res.status(404).send({
          status: false,
          message: 'User cart not found',
        });
      }
  
      const existingCartItem = await cartItem.findOne({
        where: { productId:id, cartId: userCart.id },
      });
  
      if (!existingCartItem) {
        return res.status(404).send({
          status: false,
          message: 'Product not found in the cart',
        });
      }
  
      await existingCartItem.destroy();
  
      const cartItems = await cartItem.findAll({
        where: { cartId: userCart.id },
      });
  
      let totalCartPrice = 0;
      for (const item of cartItems) {
        const sproduct = await product.findOne({ where: { id: item.productId } });
        totalCartPrice += item.quantity * sproduct.price;
      }
  
      await cart.update(
        { totalPrice: totalCartPrice },
        { where: { id: userCart.id } }
      );
  
      res.status(200).send({
        status: true,
        message: 'Product removed from the cart',
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        status: false,
        message: 'Error removing product from the cart',
        error: error.message,
      });
    }
  },

  editCartItemQuantity: async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      await updateCartItemQuantity(id, quantity);

      res.status(200).json({
        status: true,
        message: 'Cart item quantity updated successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: false,
        message: 'Error updating cart item quantity',
        error: error.message,
      });
    }
  },
};

