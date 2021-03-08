


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
            $("#" + name + "-AD").show();
        } else {
            $table.addClass('off');
            $("#" + name + "-AD").hide();

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
            $('#'+fund + '-AD').hide();
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
                    var loadingHtml = ' <div id="loading" style="z-index: 1005;position: absolute; top:15%;left:23%; text-align:center;">' +
                        '<div className="loading_box"><img src="assets/images/loading.gif"></div>' +
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
                                dom : 'Bfrtip',
                                select: false,
                                info: false,
                                searching: false,
                                paging: false,
                                // pageLength: 5,
                                scrollY: "450px",
                                scrollX: true,
                                scrollCollapse: true,
                                lengthChange: false,
                                order: [[0, "desc"]],
                                // fixedColumns: {
                                //     leftColumns: 1
                                // },
                                data: jqXHR[fund],
                                columns: [
                                    {
                                        "type": "date-eu",
                                        "data": "date"
                                    },
                                    {"data": "shares"},
                                    {"data": "value"},
                                    {"data": "percent"},
                                    {"data": "change_shares"},
                                    {"data": "change_value"},
                                    {"data": "change_percent"}
                                ],
                                columnDefs: [
                                    // Date 2021-03-05
                                    {
                                        "render": function (data, type, row) {
                                            var sp = data.split("-");
                                            return sp[2] + "/" + sp[1] + "/" + sp[0];
                                        },
                                        "width": "20%;",
                                        "targets": 0,
                                        "className": "column-text-center"
                                    },
                                    // Shares
                                    {
                                        "render": function (data, type, row) { //row에 요청 데이터 포
                                            if (row.change_shares < 0.0) {
                                                return '<a style="color: red">' + addComma(data.toString()) + '</a>';
                                            } else if (row.change_shares > 0.0) {
                                                return '<a style="color: #28a745">' + addComma(data.toString()) + '</a>';
                                            } else {

                                                return '<a>' + addComma(data.toString()) + '</a>';
                                            }
                                        },
                                        "targets": 1,
                                        "className": "column-text-center"
                                    },
                                    // Value
                                    {
                                        "render": function (data, type, row) {

                                            return addComma(data.toString());
                                        },
                                        "targets": 2,
                                        "className": "column-text-center"
                                    },

                                    // Weight
                                    // { "visible": false,  "targets": [ 3 ] }
                                    {
                                        "targets": 3,
                                        "className": "column-text-center"
                                    },
                                    { // Change Shares
                                        "render": function (data, type, row) { //row에 요청 데이터 포
                                            if (row.change_shares < 0.0) {
                                                return '<a style="color: red">' + addComma(data.toString()) + '</a>';
                                            } else if (row.change_shares > 0.0) {
                                                return '<a style="color: #28a745">' + addComma(data.toString()) + '</a>';
                                            } else {

                                                return '<a>' + addComma(data.toString()) + '</a>';
                                            }
                                        },
                                        "targets": 4,
                                        "className": "column-text-center",
                                        "visible" : false

                                    },
                                    { // Change Value
                                        "render": function (data, type, row) {
                                            return addComma(data.toString());
                                        },
                                        "targets": 5,
                                        "className": "column-text-center",
                                        "visible" : false

                                    },
                                    { // Change Weight
                                        "targets": 6,
                                        "className": "column-text-center",
                                        "visible" : false
                                    }
                                ],
                                buttons : [
                                    {
                                        extend: 'colvisGroup',
                                        text: 'BASIC',
                                        show: [1,2,3],
                                        hide:[4,5,6]

                                    },
                                    {
                                        extend: 'colvisGroup',
                                        text: 'CHANGE',
                                        show: [4,5,6],
                                        hide: [1,2,3]
                                    }

                                ],

                            })
                            dt[fund] = dataTable;

                        } else {
                            $('.ark-tab-' + fund).removeClass('btn-success font-weigt-bold');
                            $('.ark-tab-' + fund).addClass('btn-dark');
                            $('#' + fund).hide();
                        }
                    })
                    if (jqXHR.ARKF.length + jqXHR.ARKG.length + jqXHR.ARKK.length + jqXHR.ARKQ.length + jqXHR.ARKW.length === 0) {
                        toast.toast("error", arker_lan.noResult ,"center");
                        $(".ticker-company")[0].innerText = arker_lan.noResult +".."
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
            toast.toast("warning", "no result","center");
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

    $(".selecetLan").change(function (e) {
        switch (e.target.value) {
            case "kor":
                arker_lan = LANGUAGE.KOREAN;
                break;
            case "eng":
                arker_lan = LANGUAGE.ENGLISH;
                break;
            case "chi":
                arker_lan =LANGUAGE.CHINESE;
                break;
        }
        $(".ticker-company")[0].innerText = "";
    })
    $('#readJson').on('click', searchTicker);

    $('#srcShowHide').on('click', function () {
$('#srcBox').slideToggle();
    })
    $('#tickerText').keydown(function (key) {
        // if (key.keyCode === 13) {
        //     searchTicker();
        // }
    })

})(window.jQuery);
