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

    filter(){
        
        const querystring = {...this.queryparams}
        const removefields = ["keyword","page","limit"];

        removefields.forEach((key)=> delete querystring[key])

        this.query = this.query.find(querystring)
        return this    
    }
}

export default ProductListing;