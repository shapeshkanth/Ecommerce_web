export const calculateDiscount = (selling,mrp) => {
   const  price = Math.ceil(((mrp-selling)/mrp)*100);
   
   return price;
}

export const formatDate = (inputDate)=>{
   const date = new Date(inputDate);
   return date.toLocaleDateString("en-IN",{
      day:"2-digit",
      month:"short",
      year:"numeric"
   });
};