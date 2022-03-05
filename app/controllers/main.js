var danhSachSanPham = new SanPhamServices()
var validation = new Validation()

function getEle(id) {
    return document.getElementById(id)
}

function getData() {
    danhSachSanPham.getListProductAPI()
    .then(function(result){
        renderListProduct(result.data)
    })
    .catch(function(error){
        console.log(error);
    })
}
getData()

function renderListProduct(list) {
    var content = "";
    for(var i = 0; i < list.length; i++){
        content += `
            <tr>
                <td>${i+1}</td>
                <td>${list[i].name}</td>
                <td>${list[i].price}</td>
                <td>${list[i].cauhinh}</td>
                <td>${list[i].moTa}</td>
                <td>${list[i].manhinh}</td>
                <td>
                    <button class="btn btn-warning" onclick="editProduct(${list[i].id})" data-toggle="modal" data-target="#myModal">Sửa</button>
                    <button class="btn btn-danger" onclick="deleteProduct(${list[i].id})">Xóa</button>
                </td>
            </tr>
        `
    }
    document.getElementById("tblDanhSachSP").innerHTML=content
}

getEle("btnThemSP").addEventListener("click", function(){
    document.getElementsByClassName("modal-title")[0].innerHTML="Thêm sản phẩm"
    var btnAddProduct = '<button class="btn btn-success" onclick="addProduct()">Thêm sản phẩm</button>'
    document.getElementsByClassName("modal-footer")[0].innerHTML=btnAddProduct
})

function getDataImport(isAdd) {
    var tenSP = getEle("TenSP").value
    var giaSP = getEle("GiaSP").value
    var cauhinhSP = getEle("CauhHinhSP").value
    var motaSP = getEle("moTaSP").value
    var manhinhSP = getEle("ManHinhSP").value
    var isValid = true
    if(isAdd) {
        isValid&=validation.checkEmpty(tenSP, "tbTen", "* Tên sản phẩm không được trống")
        isValid&=validation.checkEmpty(giaSP, "tbGiaSP", "* Giá sản phẩm không được trống")
        isValid&=validation.checkEmpty(cauhinhSP, "tbCauhHinhSP", "* Cấu hình sản phẩm không được trống")
        isValid&=validation.checkEmpty(motaSP, "tbmoTaSP", "* Mô tả sản phẩm không được trống")
        isValid&=validation.checkEmpty(manhinhSP, "tbManHinhSP", "* Màn hình sản phẩm không được trống")
    }
    if(isValid) {
        var sanPham = new SanPham("", tenSP, giaSP, cauhinhSP, motaSP, manhinhSP)
        return sanPham
    }
    return null
}

function addProduct() {
    var getDataProducts = getDataImport(true)
    if(getDataProducts) {
        danhSachSanPham.addProductAPI(getDataProducts)
        .then(function(){
            document.getElementsByClassName("close")[0].click()
            getData()
            clearData()
        })
        .catch(function(error){
            console.log(error)
        })
    }
}

function deleteProduct(id) {
    danhSachSanPham.deleteProductAPI(id)
    .then(function(){
        getData()
    })
    .catch(function(error){
        console.log(error)
    })
}

function editProduct(id) {
    document.getElementsByClassName("modal-title")[0].innerHTML="Sửa sản phẩm"
    var btnEditProduct = `<button class="btn btn-success" onclick="updateProduct(${id})">Sửa sản phẩm</button>`
    document.getElementsByClassName("modal-footer")[0].innerHTML=btnEditProduct

    danhSachSanPham.getProductIDAPI(id)
    .then(function(result){
        getEle("TenSP").value = result.data.name
        getEle("GiaSP").value = result.data.price
        getEle("CauhHinhSP").value = result.data.cauhinh
        getEle("moTaSP").value = result.data.moTa
        getEle("ManHinhSP").value = result.data.manhinh
    })
    .catch(function(error){
        console.log(error);
    })
}

function updateProduct(id) {
    var tenSP = getEle("TenSP").value
    var giaSP = getEle("GiaSP").value
    var cauhinhSP = getEle("CauhHinhSP").value
    var motaSP = getEle("moTaSP").value
    var manhinhSP = getEle("ManHinhSP").value

    var sanPham = new SanPham(id, tenSP, giaSP, cauhinhSP, motaSP, manhinhSP)
    danhSachSanPham.updateProductAPI(sanPham)
    .then(function(){
        document.getElementsByClassName("close")[0].click()
        getData()
        clearData()
    })
    .catch(function(error){
        console.log(error);
    })
}

getEle("enter").addEventListener("click", function(){
    var keywordSearch = getEle("txtSearch").value
    danhSachSanPham.searchProdcutIDAPI(keywordSearch)
    .then(function(rs){
        table(rs.data)
    })
    .catch(function(error){
        console.log(error);
    })
})

function table(rs) {
    var content = "";
    content += `
        <tr>
            <td>${rs.id}</td>
            <td>${rs.name}</td>
            <td>${rs.price}</td>
            <td>${rs.cauhinh}</td>
            <td>${rs.moTa}</td>
            <td>${rs.manhinh}</td>
            <td>
                <button class="btn btn-warning" onclick="editProduct(${rs.id})" data-toggle="modal" data-target="#myModal">Sửa</button>
                <button class="btn btn-danger" onclick="deleteProduct(${rs.id})">Xóa</button>
            </td>
        </tr>
    `
    document.getElementById("tblDanhSachSP").innerHTML=content
}

function clearData() {
    getEle("TenSP").value = ""
    getEle("GiaSP").value = ""
    getEle("CauhHinhSP").value = ""
    getEle("moTaSP").value = ""
    getEle("ManHinhSP").value = ""
}