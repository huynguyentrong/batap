function Validation() {
     this.kiemTraRong = function (input, divId, mess) {
         if (input === "") {
             //show thong bao
             getEle(divId).innerHTML = mess;
             return false;
         }
 
         getEle(divId).innerHTML = "";
         return true;
     };

     this.kiemTraDoDaiKyTu = function (input, divId, mess, min, max) {
         if (input.trim().length >= min && input.trim().length <= max) {
             //Đúng
             getEle(divId).innerHTML = "";
             return true;
         }
         //Sai
         getEle(divId).innerHTML = mess;
         return false;
     };
 
     this.kiemTraKyTu = function (input, divId, mess) {
         var letter =
             "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
             "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
             "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
 
         if (input.match(letter)) {
             //Đúng
             getEle(divId).innerHTML = "";
             return true;
         }
 
         //Sai
         getEle(divId).innerHTML = mess;
         return false;
     };
 
     this.kiemTraEmail = function (input, divId, mess) {
         var letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 
         if (input.match(letter)) {
             //Đúng
             getEle(divId).innerHTML = "";
             return true;
         }
 
         //Sai
         getEle(divId).innerHTML = mess;
         return false;
     };


     this.kiemtraSo = (input, divId, mess) => {
        var number =  /^[0-9]+$/;
        if (input.test(number)) {
            //Đúng
            getEle(divId).innerHTML = '';
            return true; // 
        }

        //Sai đúng cũng chịu inner, sai cũng ko inner
        getEle(divId).innerHTML = mess;
        return false;
     }

     this.kiemTraMatKhau = function (input, divId, mess) {
         var letter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
 
         if (input.match(letter)) {
             //Đúng
             getEle(divId).innerHTML = "";
             return true;
         }
 
         //Sai
         getEle(divId).innerHTML = mess;
         return false;
     };
 
     this.kiemTraLoai = function (idSelect, divId, mess) {
         if (getEle(idSelect).selectedIndex !== 0) {
             //Đúng
             getEle(divId).innerHTML = "";
             return true;
         }
         //Sai
         getEle(divId).innerHTML = mess;
         return false;
     };
 
     this.kiemTraMaTrung = function (input, divId, mess, list) {
         var status = true;
 
         for (var i = 0; i < list.length; i++) {
             if (list[i].maSV === input) {
                 status = false;
                 break;
             }
         }
 
         if (status) {
             //Đúng
             getEle(divId).innerHTML = "";
             return true;
         }
 
         //Sai
         getEle(divId).innerHTML = mess;
         return false;
     };
 }
 