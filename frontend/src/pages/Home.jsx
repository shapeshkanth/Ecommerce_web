import Footer from "../components/Footer"
import ImageSlider from "../components/ImageSlider"
import Navbar from "../components/Navbar"
import Product from "../components/Product"

const products = [
  {
    name: "Women dress",
    description: "Stylish black leather dress with spaghetti straps, designed for parties and special occasions with a modern and elegant look.",
    price: 1299,
    rating: 4.7,
    image: [
      {
        public_id: "products/laptop_1",
        url: "https://plus.unsplash.com/premium_photo-1683141052679-942eb9e77760?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
    ],
    category: "Electronics",
    stock: 10,
    numOfReviews: 4,
    reviews: []
  },
  {
    name: "Premium Wireless Headphones",
    description: "High-quality wireless headphones with active noise cancellation, deep bass sound, and long battery life for an immersive audio experience.",
    price: 899,
    rating: 4.6,
    image: [
      {
        public_id: "products/phone_1",
        url: "https://images.unsplash.com/photo-1549206464-82c129240d11?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }
    ],
    category: "Electronics",
    stock: 25,
    numOfReviews: 0,
    reviews: []
  },
  {
    name: "I phone",
    description: "Modern smartphone placed on stylish surface.",
    price: 199,
    rating: 4.5,
    image: [
      {
        public_id: "products/fashion_1",
        url: "https://images.unsplash.com/photo-1757710436034-f1d7372ec1be?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
    ],
    category: "Fashion",
    stock: 15,
    numOfReviews: 0,
    reviews: []
  },
  {
    name: "Laptop",
    description: "Modern laptop setup for productivity and development.",
    price: 799,
    rating: 4.4,
    image: [
      {
        public_id: "products/phone_2",
        url: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
    ],
    category: "Electronics",
    stock: 18,
    numOfReviews: 0,
    reviews: []
  }];

const Home = ()=>{
    return(
        <>
        <Navbar/>
        <ImageSlider/>
        <div className="mt-12 p-8 flex flex-col items-center justify-around text-gray-900">
             <h1 className="text-2xl font-semibold text-blue-700 pb-5">Latest Collections</h1>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product,index)=>
                  <Product key={index} product={product}/>
                 
                )}

             </div>
        </div>
        <Footer/>
        </>
    
    )
    
}

export default Home