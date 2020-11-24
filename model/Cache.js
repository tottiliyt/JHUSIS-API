class Cache{
    constructor(){
        this.cache = [];
    } 

    has(){
        return this.cache.length!=0;
    }

    get(){
        return this.cache;
    }

    //store fetched data to local
    set(data){
        let mySet = new Set();

        for(let i = data.length-1 ; i>=0; i--){
            if(data[i].SectionName === "01"){
                var course = {};
                course.title = data[i].Title;
                course.number = data[i].OfferingName.substring(3);
                course.term = data[i].Term;
                this.cache.push(course);
            }
        }
    }

    //get query data from local variable 
    get(query="",page=1, limit=10){
        let response = {};
        let pagination = {};
        let links = {};
        let data = [];

        if(query.length == 0){
            data = this.cache;
        }
        //if query is number
        else if(query.charAt(0)<='9'&&query.charAt(0)>='0'){
            for(let i = 0; i< this.cache.length; i++){
                if (this.cache[i].number.includes(query)){
                    data.push(this.cache[i]);
                }
            }
        }
        //if query is keyword
        else{
            for(let i = 0; i< this.cache.length; i++){
                if (this.cache[i].title.toLowerCase().includes(query.toLowerCase())){
                    data.push(this.cache[i]);
                }
            }
        }

        //get page data
        let pageData = [];
        for(let i = (parseInt(page)-1)*parseInt(limit); i<Math.min(parseInt(page)*parseInt(limit),data.length);i++){
            pageData.push(data[i]);
        }
        

        //pagination info
        pagination.page = parseInt(page);
        pagination.limit = parseInt(limit);
        pagination.last = Math.ceil(data.length/parseInt(limit));
        pagination.total = data.length;

        var next = page == pagination.last? page : (parseInt(page) + 1);
        //link info

        if(process.env.PORT){
            links.first = "http://localhost:"+process.env.PORT+"/api/search?query="+query+"&page=1&limit="+limit;
            links.last = "http://localhost:"+process.env.PORT+"/api/search?query="+query+"&page="+pagination.last+"&limit="+limit;
            links.next = "http://localhost:"+process.env.PORT+"/api/search?query="+query+"&page="+next+"&limit="+limit;
        }
        else{
            links.first = "http://localhost:4567/api/search?query="+query+"&page=1&limit="+limit;
            links.last = "http://localhost:4567/api/search?query="+query+"&page="+pagination.last+"&limit="+limit;
            links.next = "http://localhost:4567/api/search?query="+query+"&page="+next+"&limit="+limit;
        }

        response.pagination = pagination;
        response.links = links;
        response.data = pageData;
        response.query = query;
        return response;
    }
}


module.exports =  Cache ;

