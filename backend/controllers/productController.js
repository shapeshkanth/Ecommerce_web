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

    for(let i=0; i<image.length; i++)
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
   let product_Details = await product.findById(req.params.id);
 
   if(!product_Details)
   {
    return next(new ErrorHandler(404,"Product not found"));
   }
   let images = [];
   
   if (req.body.image) {
      if(typeof req.body.image === "string")
      {
        images.push(req.body.image);
      }else{
        images = req.body.image;
      }

  }
   if(images.length> 0)
   {
    
    for(let i=0; i<product_Details.image.length; i++)
    {
      await cloudinary.uploader.destroy(product_Details.image[i].public_id);
    }

    const imageLinks = [];
    for(let i=0; i<images.length; i++)
    {
      const result = await cloudinary.uploader.upload(images[i],{
        folder : "products"
      });
      imageLinks.push({
        public_id:result.public_id,
        url:result.secure_url
      });
    }
 req.body.image = imageLinks;
   }

   product_Details=await product.findByIdAndUpdate(req.params.id,req.body,{new:true,
    runValidators:true
   });

   res.status(200).json({
    success:true,
    product_Details
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
