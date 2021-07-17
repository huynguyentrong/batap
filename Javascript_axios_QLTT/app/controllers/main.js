
var service = new ProductService();
var validation = new Validation();
function getEle(id) {
     return document.getElementById(id);
}   
// lấy ra các danh sách
function getListProduct() {
     service.getListProductApi()
     // xử lý bất đồng bộ
     .then(function(result){
        console.log(result.data);
        renderTable(result.data);
     })
     .catch(function(error){
          console.log(error);
     })
}
getListProduct();
function renderTable(list) {
     var contentHTML = "";
     list.forEach(function(item, index) {
          contentHTML +=`
          <tr>
               <td>${index + 1}</td>
               <td>${item.taiKhoan}</td>
               <td>${item.matKhau}</td>
               <td>${item.hoTen}</td>
               <td>${item.email}</td>
               <td>${item.ngonNgu}</td>
               <td>${item.loaiND}</td>
               <td>${item.moTa}</td>
               <td>
                    <img src="./../../assets/img/${item.hinhAnh}" width = "50"/>
               </td>
               <td>
                    <button class="btn btn-info"data-toggle="modal"
                    data-target="#myModal" onclick="editUser(${item.id})">Sửa</button>
                    <button class="btn btn-danger" onclick="deleteUser(${item.id})">Xóa</button>
               </td>
          </tr>
          `;
     });
     getEle("tblDanhSachNguoiDung").innerHTML = contentHTML;
}


getEle("btnThemNguoiDung").addEventListener("click", function(event) {
     event.preventDefault();
     document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm Nguoi dùng"
     var footer = '<button class="btn btn-success" onclick="addUser()">Thêm</button>';
     document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
})
// thêm Người dùng
function addUser(){
     var taiKhoan = getEle("TaiKhoan").value;
     var hoTen = getEle("HoTen").value;
     var matKhau = getEle("MatKhau").value;
     var email = getEle("Email").value;
     var loaiND = getEle("loaiNguoiDung").value;
     var ngonNgu = getEle("loaiNgonNgu").value;
     var moTa = getEle("MoTa").value;
     var hinhAnh = getEle("HinhAnh").value;
     var product = new Product("",taiKhoan,hoTen,matKhau,email,loaiND,ngonNgu,moTa,hinhAnh);
     // câu thông báo
var isValid = true;
//check validation tài khoản
isValid &=
    validation.kiemTraRong(taiKhoan, "tk", "(*) Vui lòng không được để trống!")
//check validation Họ và tên
isValid &=
    validation.kiemTraRong(
        hoTen,
        "divHoTen",
        "(*) Vui lòng không để trống!"
    ) &&
    validation.kiemTraKyTu(
        hoTen,
        "divHoTen",
        "(*) Vui lòng nhập vào chữ!"
    ) &&
    validation.kiemtraSo(
      hoTen,
      "divHoTen",
      "(*) Vui lòng  không nhập số!"
    );
    
    

     //check validation email
isValid &=
    validation.kiemTraRong(
        email,
        "divEmail",
        "(*) Vui lòng nhập email!"
    ) &&
    validation.kiemTraEmail(
        email,
        "divEmail",
        "(*) Email k đúng định dạng"
    );

//check validation matKhau
isValid &=
    validation.kiemTraRong(
        matKhau,
        "password",
        "(*) Vui lòng nhập pass!"
    ) &&
    validation.kiemTraMatKhau(
        matKhau,
        "password",
        "(*)Mật khẩu có ít nhất 1 ký tự viết hoa,1 ký tự đặc biệt, 1 ký tự số!"
    ) &&
    validation.kiemTraDoDaiKyTu(
     matKhau,
     "password",
     "(*) Vui lòng nhập từ 6 - 8 ký tự",
     6,
     8
    )
//check validation hình ảnh
isValid &= validation.kiemTraRong(
    hinhAnh,
    "divhinhAnh",
    "(*) Vui lòng không để trống!"
);

// check validation loại người dùng
isValid &= validation.kiemTraLoai(
     //ID của thẻ select
    "loaiNguoiDung",
    "LoaiND",
    "(*) Vui lòng chọn Loại người dùng"
);
 // check validation loại ngôn ngữ
isValid &= validation.kiemTraLoai(
 //ID của thẻ select
"loaiNgonNgu",
"NgonNgu",
"(*) Vui lòng chọn Loại Ngôn ngữ"
);
// check moTa
isValid &=
validation.kiemTraRong(
moTa,
"divMoTa",
"(*) Vui lòng nhập mô tả người dùng!"
) &&
validation.kiemTraDoDaiKyTu(
     moTa,
     "divMoTa",
     "(*) Vui lòng nhập từ 0 - 60 ký tự",
     0,
     60,
    )
if(isValid === true) {
     service.addProductApi(product)
     .then(function(){
      getListProduct();
      // tắt modal
      document.getElementsByClassName("close")[0].click();   
    })
    .catch(function(error){
         console.log(error);
    })  
  }
}
// xóa
function deleteUser(id){
     service.deleteProductApi(id)
     .then(function(){
          getListProduct();
          alert("Delete success!")
     })
     .catch(function(error){
          console.log(error);
     })     
}
// sửa
function editUser(id){
     document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa danh sách người dùng"
     var footer = `<button class="btn btn-success" onclick="Update(${id})">Cập nhật</button>`;
     document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
     service.getUserById(id)
     .then(function(result) {
          console.log(result.data);
          getEle("TaiKhoan").value = result.data.taiKhoan;
          getEle("HoTen").value = result.data.hoTen;
          getEle("MatKhau").value = result.data.matKhau;
          getEle("Email").value = result.data.email;
          getEle("loaiNguoiDung").value = result.data.loaiND;
          getEle("loaiNgonNgu").value = result.data.ngonNgu;
          getEle("MoTa").value = result.data.moTa;
          getEle("HinhAnh").value = result.data.hinhAnh;
     })
     .catch(function(error){
          console.log(error);
     })   
}

// cập nhật
function Update(id){
     // lấy lại những thông tin mới nhất
     var taiKhoan = getEle("TaiKhoan").value;
     var hoTen = getEle("HoTen").value;
     var matKhau = getEle("MatKhau").value;
     var email = getEle("Email").value;
     var loaiND = getEle("loaiNguoiDung").value;
     var ngonNgu = getEle("loaiNgonNgu").value;
     var moTa = getEle("MoTa").value;
     var hinhAnh = getEle("HinhAnh").value;
     var product = new Product(id,taiKhoan,hoTen,matKhau,email,loaiND,ngonNgu,moTa,hinhAnh);
     // câu thông báo
     var isValid = true;
     //check validation tài khoản
     isValid &=
    validation.kiemTraRong(taiKhoan, "tk", "(*) Vui lòng không được để trống!")
     //check validation Họ và tên
     isValid &=
         validation.kiemTraKyTu(
             hoTen,
             "divHoTen",
             "(*) Vui lòng nhập vào chữ!"
         ) &&
         validation.kiemtraSo(
           hoTen,
           "divHoTen",
           "(*) Vui lòng  không nhập số!"
         );
         
         
     
          //check validation email
     isValid &=
         validation.kiemTraEmail(
             email,
             "divEmail",
             "(*) Email k đúng định dạng"
         );
     
     //check validation matKhau
     isValid &=
         validation.kiemTraMatKhau(
             matKhau,
             "password",
             "(*)Mật khẩu có ít nhất 1 ký tự viết hoa,1 ký tự đặc biệt, 1 ký tự số!"
         ) &&
         validation.kiemTraDoDaiKyTu(
          matKhau,
          "password",
          "(*) Vui lòng nhập từ 6 - 8 ký tự",
          6,
          8
         )
     //check validation hình ảnh
     isValid &= validation.kiemTraRong(
         hinhAnh,
         "divhinhAnh",
         "(*) Vui lòng không để trống!"
     );
     
     // check validation loại người dùng
     isValid &= validation.kiemTraLoai(
          //ID của thẻ select
         "loaiNguoiDung",
         "LoaiND",
         "(*) Vui lòng chọn Loại người dùng"
     );
      // check validation loại ngôn ngữ
     isValid &= validation.kiemTraLoai(
      //ID của thẻ select
     "loaiNgonNgu",
     "NgonNgu",
     "(*) Vui lòng chọn Loại Ngôn ngữ"
     );
     isValid &=
     validation.kiemTraRong(
     moTa,
     "divMoTa",
     "(*) Vui lòng nhập mô tả người dùng!"
     ) &&
     validation.kiemTraDoDaiKyTu(
          moTa,
          "divMoTa",
          "(*) Vui lòng nhập từ 0 - 60 ký tự",
          0,
          60
         )
     if(isValid === true) {
          service.updateApi(product)
     .then(()=>{
          getListProduct();
          alert("Update success!");
          document.getElementsByClassName("close")[0].click();  
     })
     .catch(function(error){
          console.log(error);
     })
       }
}