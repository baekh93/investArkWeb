(function ($) {

    $(".ark-search .ark-tab").on('click', function (e) {
        var name = this.innerText;
        $("#" + name + "_wrapper").show();
        debugger
    })

    // ARKW_wrapper
    function tabShow() {
        $('#ARKF').show();
        $('#ARKG').show();
        $('#ARKK').show();
        $('#ARKW').show();
        $('#ARKQ').show();
    }

    function tabTableShow() {
        $('#ARKF_wrapper').show();
        $('#ARKG_wrapper').show();
        $('#ARKK_wrapper').show();
        $('#ARKW_wrapper').show();
        $('#ARKQ_wrapper').show();
    }

    function tabHide() {
        $('#ARKF_wrapper').hide();
        $('#ARKG_wrapper').hide();
        $('#ARKK_wrapper').hide();
        $('#ARKW_wrapper').hide();
        $('#ARKQ_wrapper').hide();
    }

    $('#readJson').on('click', function () {
        var inputdata = $('.tickerText').val();
        tabShow()
        $.ajax({
            url: "https://paladin.mobi/ticker", // 요청 할 주소
            async: true,// false 일 경우 동기 요청으로 변경
            type: 'GET', // GET, PUT
            contentType: 'application/json',
            // data: JSON.stringify({
            //     "ticker": inputdata.toUpperCase()
            // }),// 전송할 데이터
            data : {
                name : inputdata.toUpperCase()
            },
            dataType: 'json',// xml, json, script, html
            beforeSend: function (jqXHR) {
                console.log("beforeSend");
            },// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
            success: function (jqXHR) {
                console.log("success");
                $('#ARKG').DataTable({
                    data: jqXHR.ARKG,
                    columns: [
                        {"data": "company"},
                        {"data": "date"},
                        {"data": "percent"},
                        {"data": "shares"}
                    ],
                    select: false,
                    info: false,
                    searching: false,
                    // scrollY: "300px",
                    scrollX: true,
                    scrollCollapse: true,
                    lengthChange: false
                });
                $('#ARKK').DataTable({
                    data: jqXHR.ARKK,
                    columns: [
                        {"data": "company"},
                        {"data": "date"},
                        {"data": "percent"},
                        {"data": "shares"}
                    ],
                    select: false,
                    info: false,
                    searching: false,
                    // scrollY: "300px",
                    scrollX: true,
                    scrollCollapse: true,
                    lengthChange: false
                });
                $('#ARKQ').DataTable({
                    data: jqXHR.ARKQ,
                    columns: [
                        {"data": "company"},
                        {"data": "date"},
                        {"data": "percent"},
                        {"data": "shares"}
                    ],
                    select: false,
                    info: false,
                    searching: false,
                    // scrollY: "300px",
                    scrollX: true,
                    scrollCollapse: true,
                    lengthChange: false
                });
                $('#ARKF').DataTable({
                    data: jqXHR.ARKF,
                    columns: [
                        {"data": "company"},
                        {"data": "date"},
                        {"data": "percent"},
                        {"data": "shares"}
                    ],
                    select: false,
                    info: false,
                    searching: false,
                    // scrollY: "300px",
                    scrollX: true,
                    scrollCollapse: true,
                    lengthChange: false
                });
                $('#ARKW').DataTable({
                    data: jqXHR.ARKW,
                    columns: [
                        {"data": "company"},
                        {"data": "date"},
                        {"data": "percent"},
                        {"data": "shares"}
                    ],
                    select: false,
                    info: false,
                    searching: false,
                    // scrollY: "300px",
                    scrollX: true,
                    scrollCollapse: true,
                    lengthChange: false
                });


            },// 요청 완료 시
            error: function (jqXHR) {
                console.log("error");
                alert('error');
            },// 요청 실패.
            complete: function (jqXHR) {
                console.log("complete");
                tabHide();
            }// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
        });

    })


})(window.jQuery);