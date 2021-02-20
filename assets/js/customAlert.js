
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

    var module = {
        toast: toast
    };

    return module;
})();
