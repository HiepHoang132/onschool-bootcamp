$(document).ready(function () {
  /*** REGION 1 - Global variables - Vùng khai báo biến, hằng số, tham số TOÀN CỤC */
  var gJsonStudents = `{
      "description": "Data student",
      "Students": [
        {
          "studentId": 1,
          "firstname": "Test1",
          "lastname": "User1",
          "grade": 8
        },
        {
          "studentId": 2,
          "firstname": "Test2",
          "lastname": "User2",
          "grade": 9
        },
        {
          "studentId": 3,
          "firstname": "Test3",
          "lastname": "User3",
          "grade": 7
        },
        {
          "studentId": 4,
          "firstname": "Test4",
          "lastname": "User4",
          "grade": 10
        },
        {
          "studentId": 5,
          "firstname": "Test5",
          "lastname": "User5",
          "grade": 6
        },
        {
          "studentId": 6,
          "firstname": "Test6",
          "lastname": "User6",
          "grade": 10
        },
        {
          "studentId": 7,
          "firstname": "Test6",
          "lastname": "User6",
          "grade": 5
        }
      ]
    }`;

  var gListStudents = JSON.parse(gJsonStudents);
  console.log(gListStudents);
  var gNameCol = [
    "studentId",
    "firstname",
    "lastname",
    "grade",
    "xephang",
    "action",
  ]; //cột điểm sẽ là dữ liệu để tính ra cột xếp hạng

  const gSTUDENT_ID_COL = 0;
  const gFIRST_NAME_COL = 1;
  const gLAST_NAME_COL = 2;
  const gGRADE_COL = 3;
  const gXEP_HANG_COL = 4; // ta có cột tứ 4 là xếp hạng, ko có dữ liệu nhưng sẽ được tính ra từu cột điểm (grade)
  const gACTION_COL = 5;

  onPageLoading(); //gọi onpage loading để tạo bảng

  $(document).on("click", "#student-table .btn-detail", function () {
    //gán sự kiện xử lý onclick cho các button trong bảng user table, có class là btn-detail
    onBtnDetailClick(this);
  });

  function onPageLoading() {
    /* Hãy đổ dữ liệu vào table và thực hiện nút information (chi tiết)
     * dùng cách khai báo data source ngay từ đầu */
    $("#student-table").DataTable({
      data: gListStudents.Students,
      columns: [
        { data: gNameCol[gSTUDENT_ID_COL] },
        { data: gNameCol[gFIRST_NAME_COL] },
        { data: gNameCol[gLAST_NAME_COL] },
        { data: gNameCol[gGRADE_COL] },
        { data: gNameCol[gGRADE_COL] }, // giá trị của cột xếp hạng ta mặc định lấy là cột điểm (lấy luôn giá trị đó, khi hiện thị ta mới xử lý)
        { data: gNameCol[gACTION_COL] },
      ],
      columnDefs: [
        //định nghia các cột cần hiện ra
        {
          targets: gSTUDENT_ID_COL, //cột ID
          className: "text-center text-primary",
        },
        {
          targets: gGRADE_COL, //cột Age
          className: "text-right",
        },
        {
          targets: gXEP_HANG_COL,
          className: "text-right",
          render: chuyenDiemThanhXepHang, //tuy dữ liệu lấy vào ô vẫn là điểm (grade), nhưng ta đã xử lý bằng function chuyenDiemThanhXepHang để thay đỏi hiện thị
        },
        {
          targets: gACTION_COL, //cột Action
          className: "text-center",
          defaultContent:
            "<button class='btn btn-primary btn-detail'> Chi tiết </button>", //nội dung html của cột là nút button, class btn-detail để đánh dấu các nút hiện information
        },
      ],
    });
  }

  function onBtnDetailClick(paramElement) {
    "use strict";
    var vRowClick = $(paramElement).closest("tr"); // Xác định tr chứa nút bấm được click
    var vTable = $("#student-table ").DataTable(); // tạo biện truy xuất đến datatable
    var vDataRow = vTable.row(vRowClick).data(); // Lấy dữ liệu của hàng dữ liệu chứa nút bấm được click
    console.log(vDataRow);
  }

  //chuyển điểm thành xếp hạng
  // input:
  // * Data: là data của cột đó (data là chính là điểm)
  // * type: display/filter/sort để làm gì
  // * row: là cả hàng (HÃY NHÌN KĨ CONSOLE.LOG)
  function chuyenDiemThanhXepHang(paramData, paramType, paramRow) {
    var vXepHang = "CHUA_XEP";
    console.log("Param data:", paramData);
    console.log("Param row: ", paramRow);
    console.log("type = " + paramType); //type có thể là display (dữ liệu hiện thị), filter (dữ liệu khi lọc), sort (dữ liệu khi sắp xếp); TRONG BÀI NÀY, ta trả về giống nhau

    if (paramData < 5) {
      //nếu điểm <5 ta sẽ trả về Kém
      vXepHang = "Kém";
    } else if (paramData >= 5 && paramData < 7) {
      vXepHang = "Trung bình";
    } else if (paramData >= 7 && paramData < 9) {
      vXepHang = "Khá";
    } else if (paramData >= 9) {
      vXepHang = "Tốt";
    }
    return vXepHang;
  }
});
