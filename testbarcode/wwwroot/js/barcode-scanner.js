window.startBarcodeScanner = () => {
    // Yêu cầu quyền truy cập camera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            // Hiển thị video từ camera
            const videoElement = document.querySelector('#video');
            videoElement.srcObject = stream;

            // Khởi chạy Quagga sau khi có quyền
            Quagga.init({
                inputStream: {
                    type: "LiveStream",
                    target: videoElement,
                },
                decoder: {
                    readers: ["code_128_reader", "ean_reader"],
                }
            }, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                Quagga.start();
            });

            Quagga.onDetected((data) => {
                console.log(data.codeResult.code);
                DotNet.invokeMethodAsync("testbarcode.Components.Pages.Barcode", "OnBarcodeScanned", data.codeResult.code);
                Quagga.stop();
                stream.getTracks().forEach(track => track.stop()); // Dừng camera sau khi quét xong
            });
        })
        .catch((err) => {
            console.error("Lỗi truy cập camera:", err);
            alert("Không thể truy cập camera. Vui lòng kiểm tra quyền!");
        });
};

