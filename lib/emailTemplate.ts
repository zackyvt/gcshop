const email_template = `
<div class="border border-gray-300 p-12 rounded-md">
  <h1 class="font-bold text-lg">Your purchase has arrived!</h1>
  <p class="mt-8"><span class="font-bold">Item:</span> item_name</p>
  <p class="mt-1"><span class="font-bold">Quantity:</span> quantity_number</p>
  <p class="mt-1"><span class="font-bold">Cost:</span> cost_number</p>
    <p class="mt-1"><span class="font-bold">Delivery Address:</span> email_address</p>
  <p class="mt-16 mb-25">Your giftcard number:</p>
  <p class="p-15 text-center text-sm bg-gray-300">giftcard_number</p>
  <p class="mt-16">Thank you for purchasing from GCShop</p>
</div>

    <style>
    body, html, p, h1 {
        margin: 0;
      }
      
      * {
        font-size: 1rem;
        line-height: 1.5rem;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      font-serif	font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
      font-mono	font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      }
      
      .border {
        border-width: 1px;
      }
      
      .border-gray-300 {
        border-color: rgb(209 213 219);
      }
      
      .p-12 {
        padding: 3rem;
      }
      
      .rounded-md {
        border-radius: 0.375rem;
      }
      
      .text-lg {
        font-size: 1.125rem;
      line-height: 1.75rem;
      }
      
      .mt-8 {
        margin-top: 2rem;
      }
      
      .font-bold {
        font-weight: bold;
      }
      
      .mt-1 {
        margin-top: 0.25rem;
      }
      
      .mt-16 {
        margin-top: 4rem;
      }
      
      .mb-25 {
        margin-bottom: 0.625rem;
      }
      
      .p-15 {
        padding: 0.375rem;
      }
      
      .text-center {
        text-align: center;
      }
      
      .bg-gray-300 {
        background-color: rgb(209 213 219);
      }
    </style>
`;

export default email_template;