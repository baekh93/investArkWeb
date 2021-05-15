(function ($) {

    var url = 'https://paladin.mobi:11202';
    // var loadingHtml = ' <div id="loading" style="z-index: 1005;position: absolute; top:33%;left:25%; text-align:center;">' +
    //     '<div className="loading_box"><img src="assets/images/loading.gif"/></div>' +
    //     '</div>'
    // $('html').fadeTo("fast", 1).append(loadingHtml);
 /*   $('.tickerText').autocomplete({
       source: function (request, response) {
           $.ajax({
               type :'GET',
               url : url + "/start",FF
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

        },// 요청 완료 시
        error: function (jqXHR) {
            toast.toast("error", "error","center");
        },// 요청 실패.
        complete: function (jqXHR) {
            $('html').fadeTo( "slow", 1 ).find('#loading').remove();//
            toast.notice();

            const $swal = $('#swal2-content');
            if($swal) {

            }
            $(".selecetLanNotice").change(function (e) {
                switch (e.target.value) {
                    case "kor":
                        $swal[0].innerHTML = LANGUAGE.KOREAN.popMsg;
                        arker_lan = LANGUAGE.KOREAN;
                        break;
                    case "eng":
                        $swal[0].innerHTML = LANGUAGE.ENGLISH.popMsg;
                        arker_lan =LANGUAGE.ENGLISH;
                        break;
                    case "chi":
                        $swal[0].innerHTML =LANGUAGE.CHINESE.popMsg;
                        arker_lan = LANGUAGE.CHINESE;
                        break;
                }
            })
            // toast.radioAlert();
        }// 요청의 실패, 성공과 상관 없이 완료 될 경우 호출
    });

    function onSignIn(googleUser) {
        debugger
        var profile = googleUser.getBasicProfile();
        debugger
            console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    }
    // $('.g-signin2').on('click', onSignIn);



    // target: document.getElementById('roadview-div')



})(window.jQuery);
