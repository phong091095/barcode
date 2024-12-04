
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace testbarcode.Components.Pages
{
    public partial class Barcode
    {
        [Inject]
        public  IJSRuntime JSRuntime { get; set; }

        private string Result { get; set; } = "Chưa có kết quả";

        private async Task StartScan()
        {
            await JSRuntime.InvokeVoidAsync("startBarcodeScanner");
        }

        //[JSInvokable]
        //public void OnBarcodeScanned(string scannedCode)
        //{
        //    Result = scannedCode;
        //    StateHasChanged();
        //}
    }
}
