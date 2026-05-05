import ErrorHandler from "../helper/ErrorHandler.js"
import ProductListing from "../helper/ProductListing.js"
import product from "../models/productModel.js"

export const allproduct =  async (req,res) =>{
    const params = req.query;

    const ProductList = new ProductListing(product.find(),params).search()

    const products = await ProductList.query
    //console.log("All product")
    return res.json({
    products
    })
}

 export const singleproduct = async (req,res,next)=>{
   const pro_id = req.params.id
   const singleproduct = await product.findById(pro_id)
  //console.log(req.params.id)
  if(!singleproduct)
  {
    return next(new ErrorHandler(404, "product not found"))
  }
  return res.json({
    success:true,
    singleproduct
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

 export const updateproduct = async (req,res,next)=>{
    const pro_id = req.params.id
    const newproduct = req.body
    const updateproduct = await product.findByIdAndUpdate(pro_id,newproduct,{new:true})
    //console.log("Product Updated")
    if(!updateproduct)
    {
        return next(new ErrorHandler(404,"product not found"))
    }
    return res.json({
        success:true,
        message:"Product updated",
        updateproduct
    })

 }

 export const deleteproduct = async (req,res,next)=>{
    const pro_id = req.params.id
    const deleteproduct = await product.findByIdAndDelete(pro_id)

    if(!deleteproduct)
    {
        return next(new ErrorHandler(404,"product not found"))
    }
   // console.log("product deleted")
    return res.json({
        success:true,
        message:"Product deleted",
        deleteproduct
    })

 }
