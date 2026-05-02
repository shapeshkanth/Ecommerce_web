import product from "../models/productModel.js"

export const allproduct =  async (req,res) =>{

    const products = await product.find()
    console.log("All product")
    return res.json({
    products
    })
}

 export const singleproduct = async (req,res)=>{
   const pro_id = req.params.id
   const singleproduct = await product.findById(pro_id)
  //console.log(req.params.id)
  if(!singleproduct)
  {
    return res.json({success : false, message : "product not available"})
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

 export const updateproduct = (req,res)=>{
    console.log("Product Updated")
    return res.json({
        success:true,
        message:"Product updated"
    })

 }

 export const deleteproduct = async (req,res)=>{
    const pro_id = req.params.id
    const deleteproduct = await product.findByIdAndDelete(pro_id)

    if(!deleteproduct)
    {
        return res.json({success:false, message : "product not available"})
    }
    console.log("product deleted")
    return res.json({
        success:true,
        message:"Product deleted",
        deleteproduct
    })

 }
