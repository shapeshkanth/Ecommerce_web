class ProductListing {
    constructor(query,queryparams){
     this.query = query
     this.queryparams = queryparams
    }
    

    search(){
        const keyword = this.queryparams.keyword ? {
            name : {
                $regex : this.queryparams.keyword,
                $options : "i"
            }
        } : {};
     this.query = this.query.find({...keyword})
     return this
    }
}

export default ProductListing;