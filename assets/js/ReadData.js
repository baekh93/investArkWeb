(function ($) {

    var url = 'https://paladin.mobi:5000';

 /*   $('.tickerText').autocomplete({
       source: function (request, response) {
           $.ajax({
               type :'GET',
               url : url + "/start",
               async: true,
               dataType: 'json',
               contentType: 'application/json',
               success: function (data){
                   response(
                       $.map(data, function (item) {
                           return {
                               label : item.company,
                               value : item.ticker
                           }
                       })
                   )
               }
           })
       },
       autoFocus: true,
        minLength: 1

    });*/
    $.ajax({
        url: url + "/start", // 요청 할 주소
        async: true, // false 일 경우 동기 요청으로 변경
        type: 'GET', // GET, PUT
        contentType: 'application/json',
        dataType: 'json',// xml, json, script, html
        beforeSend: function (jqXHR) {
        },// 서버 요청 전 호출 되는 함수 return false; 일 경우 요청 중단
        success: function (jqXHR) {
            $('.tickerText').autocomplete({
                source :  jqXHR,
                autoFocus: true,
                minLength: 1

            })
            debugger
        },// 요청 완료 시
        error: function (jqXHR) {
            toast.toast("error", "error","center");
        },// 요청 실패.
        complete: function (jqXHR) {

        }// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
    });


    // target: document.getElementById('roadview-div')

    var module = {
        toast: toast
    };

    return module;


})(window.jQuery);
