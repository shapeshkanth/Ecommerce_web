import product from "../models/productModel.js"

export const allproduct =  async (req,res) =>{

    const products = await product.find()
    console.log("All product")
    return res.json({
    products
    })
}

 export const singleproduct = (req,res)=>{
  console.log("single porduct")
  return res.json({
    success:true,
    message:"single producrt"
  })
 }

 export const addproduct = async (req,res)=>{

    const products = req.body
    const addproduct = await product.create(products)
    //console.log(products)
    return res.json({
        success:true,
        message:"Product successfully added"
    })

 }

 export const updateproduct = (req,res)=>{
    console.log("Product Updated")
    return res.json({
        success:true,
        message:"Product updated"
    })

 }

 export const deleteproduct = (req,res)=>{
    console.log("product deleted")
    return res.json({
        success:true,
        message:"Product deleted"
    })

 }
