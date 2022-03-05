function SanPhamServices() {
    this.getListProductAPI = function(){
        return axios({
            url : "https://621b7e12faa12ee4500f16b8.mockapi.io/manager/user",
            method : "GET",
        })
    }
    this.addProductAPI = function(product) {
        return axios({
            url : "https://621b7e12faa12ee4500f16b8.mockapi.io/manager/user",
            method : "POST",
            data : product,
        })
    }
    this.deleteProductAPI = function(id) {
        return axios({
            url : `https://621b7e12faa12ee4500f16b8.mockapi.io/manager/user/${id}`,
            method : "DELETE",
        })
    }
    this.getProductIDAPI = function(id) {
        return axios({
            url : `https://621b7e12faa12ee4500f16b8.mockapi.io/manager/user/${id}`,
            method : "GET",
        })
    }
    this.updateProductAPI = function(product) {
        return axios({
            url : `https://621b7e12faa12ee4500f16b8.mockapi.io/manager/user/${product.id}`,
            method : "PUT",
            data : product,
        })
    }
}