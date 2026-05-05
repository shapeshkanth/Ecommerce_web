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
        const removefields = ["keyword","page"];

        removefields.forEach((key)=> delete querystring[key])
        this.query = this.query.find(querystring)
        return this    
    }
    
    pagination(resultPerPage){
      const currentPage = Number(this.queryparams.page) || 1 ;
      const skip = resultPerPage*(currentPage-1);
      this.query = this.query.limit(resultPerPage).skip(skip);
      return this
    }

}

export default ProductListing;