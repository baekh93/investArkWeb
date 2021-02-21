
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
        // $("#" + name + "_wrapper").show();
        var $table = $("#" + name + "_wrapper");
        if ($table.hasClass('off')) {
            $table.removeClass('off');
        } else {
            $table.addClass('off');
        }

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
            // $('#' + fund + '_wrapper').hide();
            $('#' + fund + '_wrapper').addClass('off');
        })
    }

    function tableClear() {
        _.each(funds, function (fund) {
            // $('#' + fund).
        })
    }

    function addComma(value) {
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
        if(inputdata) { //검색데이터가 있을시만
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
                    var loadingHtml = ' <div id="loading" style="z-index: 1005;position: absolute; top:33%;left:25%; text-align:center;">' +
                        '<div className="loading_box"><img src="assets/images/loading.gif"/></div>' +
                        '</div>'
                    $('.ark-search').fadeTo("fast", 0.7).append(loadingHtml);
                },// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
                success: function (jqXHR) {
                    _.each(funds, function (fund) {

                        if (jqXHR[fund].length !== 0) {
                            if (dt[fund]) {
                                dt[fund].destroy();
                            }
                            $(".ticker-company")[0].innerText = jqXHR[fund][0].company;
                            $('#' + fund).show();
                            $('.ark-tab-' + fund).removeClass('btn-dark');
                            $('.ark-tab-' + fund).addClass('btn-success font-weigt-bold');
                            // $('.ark-tab-' + fund ).;
                            // $.fn.dataTable.moment( 'DD/MM/YYYY HH:mm:ss' );    //Formatação com Hora
                            // $.fn.dataTable.moment('DD/MM/YYYY');
                            var dataTable = $('#' + fund).DataTable({
                                data: jqXHR[fund],
                                columns: [
                                    {
                                        "type": "date-eu",
                                        "data": "date"
                                    },
                                    {"data": "shares"},
                                    {"data": "value"},
                                    {"data": "percent"}
                                ],
                                columnDefs: [
                                    {
                                        "render": function (data, type, row) {
                                            var sp = data.split("/");
                                            return sp[1] + "/" + sp[0] + "/" + sp[2];
                                        },
                                        "targets": 0
                                    },

                                    {
                                        "render": function (data, type, row) {
                                            if (row.change < 0.0) {
                                                return '<a style="color: red">' + addComma(data.toString()) + '</a>';
                                            } else if (row.change > 0.0) {
                                                return '<a style="color: #28a745">' + addComma(data.toString()) + '</a>';
                                            } else {

                                                return '<a>' + addComma(data.toString()) + '</a>';
                                            }
                                        },
                                        "targets": 1
                                    },

                                    {
                                        "render": function (data, type, row) {

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
                                scrollY: "500px",
                                scrollX: false,
                                scrollCollapse: true,
                                lengthChange: false,
                                order: [[0, "desc"]]
                            })
                            dt[fund] = dataTable;
                            // $($.fn.dataTable.tables(true)).DataTable()
                            //     .columns.adjust();

                        } else {
                            $('.ark-tab-' + fund).removeClass('btn-success font-weigt-bold');
                            $('.ark-tab-' + fund).addClass('btn-dark');
                            $('#' + fund).hide();
                        }
                    })
                    if (jqXHR.ARKF.length + jqXHR.ARKG.length + jqXHR.ARKK.length + jqXHR.ARKQ.length + jqXHR.ARKW.length === 0) {
                        toast.toast("error", "검색결과가 없습니다.","center");
                        $(".ticker-company")[0].innerText = "No result.."
                    }

                },// 요청 완료 시
                error: function (jqXHR) {
                    // console.log("error");
                    toast.toast("error", "error","center");
                },// 요청 실패.
                complete: function (jqXHR) {
                    $('.ark-search').fadeTo( "slow", 1 ).find('#loading').remove();
                    tabHide();
                }// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
            });
        }else {
            toast.toast("warning", "내용을 입력하세요.","center");
        }

    }

    $("#BlackNWhite").change(function (e){
        if(this.checked) {//화이트
            $(".welcome-area")[0].style.background = "white"
            $(document.body)[0].style.background="white"
            $("#BWspan")[0].style.background ="black";
            $("#ck-label")[0].style.background="white"
            $("#logo-black").hide();
            $("#logo-White").show();
            $(".ark-search").addClass("black-font");
        }else {//블랙
            $(".welcome-area")[0].style.background = "black"
            $(document.body)[0].style.background="black"
            $("#BWspan")[0].style.background ="white";
            $("#ck-label")[0].style.background="black"
            $("#logo-black").show();
            $("#logo-White").hide();
            $(".ark-search").removeClass("black-font");
        }
    })
    $('#readJson').on('click', searchTicker);
    $('#tickerText').keydown(function (key) {
        // if (key.keyCode === 13) {
        //     searchTicker();
        // }
    })

})(window.jQuery);