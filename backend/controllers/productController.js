import ErrorHandler from "../helper/ErrorHandler.js"
import ProductListing from "../helper/ProductListing.js"
import product from "../models/productModel.js"
import { v2 as cloudinary} from "cloudinary"

export const allproduct =  async (req,res,next) =>{
    const params = req.query;
    const perPage = 6
    const ProductList = new ProductListing(product.find(),params).search().filter()

    const queryCopy = ProductList.query.clone()
    const Totalproduct = await queryCopy.countDocuments()
    const TotalPages = Math.ceil(Totalproduct/perPage)

    const page = Number(req.query.page) || 1
    
    if(TotalPages <=0 || page < 0 || page > TotalPages )
    {
        return next(new ErrorHandler(404,"Page does not exist"))
    }

    ProductList.pagination(perPage)
    const products = await ProductList.query

    //console.log("All product")
    return res.json({
        page,
        TotalPages,
        products,
        Totalproduct,
        perPage,
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

    let image = [];
    if(typeof req.body.image ==="string")
    {
        image.push(req.body.image)
    }else{
        image = req.body.image;
    }

   const imageLinks=[];

    for(let i=1; i<image.length; i++)
    {
        const result = await cloudinary.uploader.upload(image[i],{folder : "products"});

        imageLinks.push({
          public_id:result.public_id,
          url:result.secure_url
        })
        
    }
    req.body.image=imageLinks;
    req.body.user = req.user.id 
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
