import mongoose from "mongose"
const productModel = new mongoose.schema({
    name : {
        type : String,
        required : [true , "Please enter product name"]
    },
    description : {
        type : String,
        required : [true, "Please enter procust description "]
    },
    price : {
        type : Number,
        required : [true, "Please enter price"]
    },
    rating : {
        type : Number,
        default : 0
    },
    image : [
        {
        public_id : {
        type : String,
        required : true
        },
        url : {
            type : String,
            required : true
        }

        }
    ],
    category : {
        type : String,
        required :[true,"Please enter product category"]
    },
    stock : {
        type : Number,
        required : [true, "Please enter product stock"],
        default : 0
    },
    numOfReviews : {
        type : Number,
        default : 0
    },
    reviews : [
        {
            name : {
                type : String,
                required : true
            },
            rating : {
                type : Number,
                required : true
            },
            comment : {
                type : String,
                required : true

            }
        }
    ]

},
{timestamp : true}
);

export default mongoose.model("Product",productModel)