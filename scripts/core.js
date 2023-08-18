const html5QrCode = new Html5Qrcode("reader");
var resultContainer = document.getElementById('qr-reader-results');
var submitContainer = document.getElementById('ResponseSubmitContainer');

submitContainer.style.display = "none";


const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    window.navigator.vibrate(200);

    /* handle success */
    resultContainer.innerText = decodedText;
    getLocation(true);
    console.log(`Scan result ${decodedText}`, decodedResult);

    submitContainer.style.display = "block";
    html5QrCode.stop().then((ignore) => {
        // QR Code scanning is stopped.
    }).catch((err) => {
        // Stop failed, handle it.
    });
};
const config = { fps: 10, qrbox: { width: 250, height: 250 } };


function StartScanning() {
    getLocation(false);
    html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);
    resultContainer.innerText = "";

    submitContainer.style.display = "none";
}

function SendResponse() {
    var waLink = "https://wa.me/?text=";
    waLink += "Ciao, ho appena scansionato questo QR code: \n ";
    waLink += encodeURIComponent(resultContainer.innerText);
    window.open(waLink, '_blank');
}


function getLocation(writeResult) {
    if (navigator.geolocation) {
        var position;
        navigator.geolocation.getCurrentPosition((position) => {
            if (writeResult)
                resultContainer.innerText += "\n\nhttp://www.google.com/maps/place/" + position.coords.latitude + "," + position.coords.longitude + "";
        });

    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}