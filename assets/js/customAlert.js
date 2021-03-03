
window.toast = window.toast || {};

toast = (function () {

    var toast = function (icon, msg, location) {
        var tst = SweetAlert.mixin({
            toast: true,
            position: location,
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: false,
            onOpen: function (toast) {
                toast.addEventListener('mouseenter', SweetAlert.stopTimer)
                toast.addEventListener('mouseleave', SweetAlert.resumeTimer)
            }
        });
        //타겟없을시 : 기본
        tst.fire({
            icon: icon,
            title: msg,
        });
    };
    // target: document.getElementById('roadview-div')

    var radioAlert = async () => {
        const inputOptions = new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    'LANGUAGE_ENGLISH': 'English',
                    'LANGUAGE_KOREAN': 'Korean',
                    'LANGUAGE_CHINA': 'China'
                })
            }, 1000)
        })
        const { value: language } = await Swal.fire({
            title: '언어를 선택하세요.',
            input: 'radio',
            inputOptions: inputOptions,
            closeOnEsc: false,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to choose something!'
                }
            }
        })
        if (language) {
            Swal.fire({ html: `You selected: ${language}` })
        }
    }
var notice = () => {
    Swal.fire({
        icon: 'info',
        title: arker_lan.popTit,
        html: arker_lan.popMsg
        // footer: '<a href>Why do I have this issue?</a>'
    })

}

    var module = {
        toast: toast,
        notice: notice,
        radioAlert:radioAlert
    };

    return module;
})();
