(function ($) {
    var url = 'https://paladin.mobi:5000';
    var funds = ['ARKK', 'ARKW', 'ARKQ', 'ARKG', 'ARKF'];
    var dt = {
        'ARKK': undefined,
        'ARKW': undefined,
        'ARKQ': undefined,
        'ARKG': undefined,
        'ARKF': undefined
    };
    $(".ark-search .ark-tab").on('click', function (e) {
        var name = this.innerText;
        $("#" + name + "_wrapper").show();

    })

    // ARKW_wrapper
    function tabShow() {
        _.each(funds, function (fund) {
            $('#' + fund).show();
        })
    }

    function tabTableShow() {
        _.each(funds, function (fund) {
            $('#' + fund + '_wrapper').show();
        })
    }

    function tabHide() {
        _.each(funds, function (fund) {
            $('#' + fund + '_wrapper').hide();
        })
    }

    function tableClear() {
        _.each(funds, function (fund) {
            // $('#' + fund).
        })
    }

    function addComma(value){
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return value;
    }

    //객체로 보낼 때
    // data: JSON.stringify({
    //     "ticker": inputdata.toUpperCase()
    // }),// 전송할 데이터
    function searchTicker() {
        var inputdata = $('.tickerText').val();
        // tabShow();
        $.ajax({
            url: url + "/ticker", // 요청 할 주소
            async: true, // false 일 경우 동기 요청으로 변경
            type: 'GET', // GET, PUT
            contentType: 'application/json',
            data: {
                name: inputdata.toUpperCase()
            },
            dataType: 'json',// xml, json, script, html
            beforeSend: function (jqXHR) {
                // console.log("beforeSend");
            },// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
            success: function (jqXHR) {

                _.each(funds, function (fund) {
                    if (dt[fund]) {
                        dt[fund].destroy();
                    }
                    if (jqXHR[fund].length !== 0) {
                        $(".ticker-company")[0].innerText = jqXHR[fund][0].company;
                        $('#' + fund).show();
                        $('.ark-tab-' + fund).removeClass('btn-dark');
                        $('.ark-tab-' + fund).addClass('btn-danger');
                        // $('.ark-tab-' + fund ).;
                        var dataTable = $('#' + fund).DataTable({
                            data: jqXHR[fund],
                            columns: [
                                // {"data": "company"},
                                {"data": "date"},
                                {"data": "shares"},
                                {"data": "value"},
                                {"data": "percent"}
                            ],
                            columnDefs : [
                                {
                                    "render": function ( data, type, row ) {
                                        var sp = data.split("/");
                                        return sp[2]+ "-"+ sp[0] + "-" +sp[1];
                                    },
                                    "targets": 0
                                },

                                {
                                    "render": function ( data, type, row ) {
                                        if(row.change < 0.0) {
                                            return '<a style="color: red">'+addComma(data.toString())+'</a>';
                                        }else if(row.change > 0.0) {
                                            return '<a style="color: green">'+addComma(data.toString())+'</a>';
                                        }else {

                                            return '<a style="color: black">'+addComma(data.toString())+'</a>';
                                        }
                                    },
                                    "targets": 1
                                },

                                {
                                    "render": function ( data, type, row ) {

                                      return addComma(data.toString());
                                    },
                                    "targets": 2
                                }

                                // { "visible": false,  "targets": [ 3 ] }
                            ],

                            select: false,
                            info: false,
                            searching: false,
                            paging: false,
                            // pageLength: 5,
                            scrollY: "300px",
                            scrollX: false,
                            scrollCollapse: true,
                            lengthChange: false,
                            order: [[0, "desc"]]
                        })
                        dt[fund] = dataTable;
                        $($.fn.dataTable.tables(true)).DataTable()
                            .columns.adjust();


                    } else {
                        $('.ark-tab-' + fund).removeClass('btn-danger');
                        $('.ark-tab-' + fund).addClass('btn-dark');
                        $('#' + fund).hide();
                    }
                })

            },// 요청 완료 시
            error: function (jqXHR) {
                // console.log("error");
                alert('error');
            },// 요청 실패.
            complete: function (jqXHR) {
                // console.log("complete");
                tabHide();
            }// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
        });

    }

    $('#readJson').on('click', searchTicker);
    $('#tickerText').keydown(function (key) {
        // if (key.keyCode === 13) {
        //     searchTicker();
        // }
    })

})(window.jQuery);