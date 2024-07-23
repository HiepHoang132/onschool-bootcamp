const BASE_URL_COMBOS = "https://647406377de100807b1a4df4.mockapi.io/combos";
const BASE_URL_TYPES = "https://647406377de100807b1a4df4.mockapi.io/types";
const BASE_URL_DRINKS = "http://203.171.20.210:8080/devcamp-pizza365/drinks";

$(document).ready(() => {
  $.ajax({
    url: BASE_URL_COMBOS,
    type: "GET",
    datatype: "json",
    success: loadComboToCard,
    error: (ajaxContent) => console.log(ajaxContent.responseText),
  });

  $.ajax({
    url: BASE_URL_TYPES,
    type: "GET",
    datatype: "json",
    success: loadTypeToCard,
    error: (ajaxContent) => console.log(ajaxContent.responseText),
  });

  $.ajax({
    url: BASE_URL_DRINKS,
    type: "GET",
    datatype: "json",
    success: loadDrinkToSelect,
    error: (ajaxContent) => console.log(ajaxContent.responseText),
  });
});

function loadComboToCard(res) {
  $.each(res, loadOneComboToCard);
  $.each(res, displayConsoleCombo);
}

function displayConsoleCombo(index, combo) {
  console.log("%cThông tin pizza combo", "color: red");
  console.log(`Kích cỡ: ${combo.kichCo}`);
  console.log(`Đường kính: ${combo.duongKinh}`);
  console.log(`Sườn nướng: ${combo.suonNuong}`);
  console.log(`Salad: ${combo.salad}`);
  console.log(`Nước ngọt ${combo.nuocNgot}`);
  console.log(`Thành tiền: ${combo.thanhTien}`);
}

function loadOneComboToCard(index, combo) {
  const $card = $("#combos .card").eq(index);
  $card.find("#kich-co").html(displayKichCo(combo.kichCo));
  $card.find("#duong-kinh").html(combo.duongKinh);
  $card.find("#suon").html(combo.suonNuong);
  $card.find("#salad").html(combo.salad);
  $card.find("#nuoc-ngot").html(combo.nuocNgot);
  $card.find("#thanh-tien").html(displayThanhTien(combo.thanhTien));
}

function displayKichCo(kichCo) {
  const sizes = {
    S: "Small",
    M: "Medium",
    L: "Large",
  };
  return `${kichCo} (${sizes[kichCo]})`;
}

function displayThanhTien(tien) {
  return tien.replace(/\./g, ",") + " VND";
}

function loadTypeToCard(res) {
  $.each(res, loadOneTypeToCard);
  $.each(res, displayConsoleType);
}

function displayConsoleType(index, type) {
  console.log("%cThông tin pizza type", "color: blue");
  console.log(`Name: ${type.name}`);
  console.log(`Note: ${type.note}`);
  console.log(`Description: ${type.description}`);
}

function loadOneTypeToCard(index, type) {
  const $card = $("#types .card").eq(index);
  $card.find("#pizza-name").html(type.name);
  $card.find("#note").html(type.note);
  $card.find("#description").html(type.description);
}

function loadDrinkToSelect(res) {
  $.each(res, loadDrinkToOption);
  $.each(res, displayConsoleDrink);
}

function loadDrinkToOption(index, drink) {
  var $selectElement = $("#select-drink");
  var $option = $("<option></option>");
  $option.val(drink.maNuocUong).text(drink.tenNuocUong);
  $selectElement.append($option)
}

function displayConsoleDrink(index, drink) {
  console.log("%cThông tin nước uống", "color: green");
  console.log(`Mã nước uống: ${drink.maNuocUong}`);
  console.log(`Tên nước uống: ${drink.tenNuocUong}`);
  console.log(`Đơn giá: ${drink.donGia}`);
  console.log(`Ghi chú: ${drink.ghiChu}`);
  console.log(`Ngày tạo: ${drink.ngayTao}`);
  console.log(`Ngày cập nhật: ${drink.ngayCapNhat}`);
}