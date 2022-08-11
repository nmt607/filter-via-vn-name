// regex init
const regexVnChar = new RegExp(/[àáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ]/)

// variable init
const btnFilter = $("#btnFilter")

// filter VN Character action
btnFilter.on("click", function () {
    let viaData = $("#viaData").val()
    let arrVia = viaData.split(/\r?\n/)
    let arrViaVN = []
    let arrViaForeign = []
    if (viaData) {
        //clear data before run
        $("#amountViaVn").text("")
        $("#amountViaForeign").text("")
        $("#ViaVN").val("")
        $("#ViaForeign").val("")

        // statistical
        $("#totalVia").text(arrVia.length)

        // message error
        $(".message-erorr").css("display", "none")

        // loading button
        $(".btn-filter").css("display", "none")
        $(".loading-filter").css("display", "block")

        // logic code
        arrVia.forEach(via => {
            let isVN = regexVnChar.test(via)
            if (isVN) {
                arrViaVN.push(via)
            } else {
                arrViaForeign.push(via)
            }
        });

        // finish loading button      
        $(".btn-filter").css("display", "block")
        $(".loading-filter").css("display", "none")

        //export result
        let viaVNStr = arrViaVN.join("\n")
        $("#ViaVN").val(viaVNStr)
        let viaForeignStr = arrViaForeign.join("\n")
        $("#ViaForeign").val(viaForeignStr)

        // clear data and result area
        $("#viaData").val("")

        // show copy button
        if (arrViaVN.length > 0) {
            $(".copy-btn-vn").css("display", "block")
        }
        $(".copy-btn-foreign").css("display", "block")

        // statistical result
        $("#amountViaVn").text(arrViaVN.length)
        $("#amountViaForeign").text(arrViaForeign.length)
    } else {
        $(".message-erorr").css("display", "block")
    }
})

// Copy action
$(".copy-btn").on("click", function () {
    const copyContent = $(this).find(".copy-content")
    const copySuccess = $(this).find(".copy-success")
    const viaResultArea = $(this).parent('.header-top').next().children('textarea')
    const fakeAsynchronous = async () => {
        await new Promise(function (res, error) {
            copyContent.css('display', "none")
            copySuccess.css("display", "block")
            viaResultArea.select()
            navigator.clipboard.writeText(viaResultArea.val());
            return setTimeout(res, 1000)
        })
        copyContent.css('display', "block")
        copySuccess.css("display", "none")
    };
    fakeAsynchronous()
})