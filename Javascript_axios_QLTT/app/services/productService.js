function ProductService() {   
     this.getListProductApi = function(){
          return axios({
               url: "https://60db09fa801dcb0017290db5.mockapi.io/api/demo",
               method: "GET",
          });
     };
     this.addProductApi = function(demo){
           return axios({
               url: "https://60db09fa801dcb0017290db5.mockapi.io/api/demo",
               // đẩy data từ client lên server
               method: "POST",
               data: demo
          });
     };
     this.deleteProductApi = function(id){
           return axios({
               url:`https://60db09fa801dcb0017290db5.mockapi.io/api/demo/${id}`,
               method: "DELETE",
          })
     }
     this.getUserById = function(id){
          return axios({
               url:`https://60db09fa801dcb0017290db5.mockapi.io/api/demo/${id}`,
               method: "GET",
          });
     }
     // làm mới sản phẩm
     this.updateApi = function(product){
           return axios({
               url: `https://60db09fa801dcb0017290db5.mockapi.io/api/demo/${product.id}`,
               method: "PUT",
               data: product,
          })
     }
}