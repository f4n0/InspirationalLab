const html5QrCode = new Html5Qrcode("reader");
var resultContainer = document.getElementById('qr-reader-results');
var submitContainer = document.getElementById('ResponseSubmitContainer');
var StartScanningBtn = document.getElementById('StartScanning');

submitContainer.style.display = "none";


const qrCodeSuccessCallback = (decodedText, decodedResult) => {
    window.navigator.vibrate(200);

    /* handle success */
    resultContainer.innerText = decodedText;
    console.log(`Scan result ${decodedText}`, decodedResult);

    submitContainer.style.display = "block";
    StartScanningBtn.style.display = "block";
    html5QrCode.stop().then((ignore) => {
        // QR Code scanning is stopped.
    }).catch((err) => {
        // Stop failed, handle it.
    });
};
let qrboxFunction = function(viewfinderWidth, viewfinderHeight) {
    let minEdgePercentage = 0.7; // 70%
    let minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
    let qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
    return {
        width: qrboxSize,
        height: qrboxSize
    };
}
const config = { fps: 10, qrbox: qrboxFunction };


function StartScanning() {
    //only to see if has permission
    getLocation();
    html5QrCode.start({ facingMode: "environment" }, config, qrCodeSuccessCallback);
    resultContainer.innerText = "";
    StartScanningBtn.style.display = "none";
    submitContainer.style.display = "none";
}

async function SendResponse() {
    var oldtext = resultContainer.innerText;
    getLocation().then((position) => {
        var waLink = "https://wa.me/?text=";
        waLink += encodeURIComponent("Ciao, ho appena scansionato questo QR code: \n ");
        waLink += encodeURIComponent(resultContainer.innerText);
        waLink += encodeURIComponent("\n\nhttp://www.google.com/maps/place/" + position.coords.latitude + "," + position.coords.longitude + "");
        window.open(waLink, '_blank');
        resultContainer.innerText = oldtext;  
    });
      
}


function getLocation() {
    return new Promise(result => {
        if (navigator.geolocation) {
            var position;
            navigator.geolocation.getCurrentPosition((position) => {
                result(position);
                //geolocation.innerText = "http://www.google.com/maps/place/" + position.coords.latitude + "," + position.coords.longitude + "";
            });
    
        } else {
            result("");
        }
    })
    
}