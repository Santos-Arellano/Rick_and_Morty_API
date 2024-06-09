//src/public/js/main.js
document.addEventListener('DOMContentLoaded', function () {
    var alertList = document.querySelectorAll('.alert');
    alertList.forEach(function (alert) {
        var bsAlert = new bootstrap.Alert(alert);
    });
});
