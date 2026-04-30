export const allproduct =  (req,res) =>{
   console.log("All product")
   return res.json({
    success:true,
    message:"get all producrt"
})
}

 export const singleproduct = (req,res)=>{
  console.log("single porduct")
  return res.json({
    success:true,
    message:"single producrt"
  })
 }

 export const addproduct = (req,res)=>{
    console.log("Product added")
    return res.json({
        success:true,
        message:"Product added"
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
