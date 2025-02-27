document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".security").style.display = "block";
    const paymentOptions = document.querySelectorAll(".payment-option input");
    const paymentInfo = document.querySelector(".payment-info");
    const qrContainer = document.querySelector(".qrContainer");
    const checkIcons = document.querySelectorAll(".circle-check");

    // Ocultar info y QR
    paymentInfo.style.display = "none";
    if (qrContainer) qrContainer.style.display = "none";
    checkIcons.forEach(icon => icon.style.display = "none");

    paymentOptions.forEach(option => {
        option.addEventListener("change", function () {
            // Mostrar el check-circle al dar click
            checkIcons.forEach(icon => icon.style.display = "none");
            this.closest(".payment-option").querySelector(".circle-check").style.display = "inline-block";

            if (this.value === "visa" || this.value === "mastercard" || this.value === "paypal") {
                paymentInfo.style.display = "block";
                if (qrContainer) qrContainer.style.display = "none";
            } else if (this.value === "pagoefectivo") {
                paymentInfo.style.display = "none";
                if (qrContainer) qrContainer.style.display = "block";
            }
        });
    });
});
