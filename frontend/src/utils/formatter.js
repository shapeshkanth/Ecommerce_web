export const calculateDiscount = (selling,mrp) => {
   const  price = Math.ceil(((mrp-selling)/mrp)*100);
   
   return price;
}
