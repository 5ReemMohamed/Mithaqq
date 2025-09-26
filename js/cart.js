document.addEventListener("DOMContentLoaded", () => {
  const deliveryCost = 25;
  const tax = 14;
  const discount = 60;

  function recalcTotals() {
    let subtotal = 0;
    let totalItems = 0;
    let productCount = 0;

    document.querySelectorAll(".cart-item").forEach(item => {
      productCount++;
      let qty = parseInt(item.querySelector(".qty-input").value) || 0;
      let priceText = item.querySelector("small").innerText;
      let unitPrice = parseFloat(priceText.match(/(\d+(\.\d+)?)/)[0]);

      let itemTotal = qty * unitPrice;
      totalItems += qty;
      subtotal += itemTotal;

      item.querySelector(".item-total").innerText = itemTotal.toFixed(2) + " USD";
    });

    document.querySelector(".cart-summary").innerHTML = `
      <div class="d-flex justify-content-between"><span>${totalItems} items:</span><span>$${subtotal.toFixed(2)}</span></div>
      <div class="d-flex justify-content-between"><span>Delivery cost:</span><span>$${deliveryCost}</span></div>
      <div class="d-flex justify-content-between"><span>Tax:</span><span>$${tax}</span></div>
      <div class="d-flex justify-content-between text-success"><span>Discount:</span><span>-$${discount}</span></div>
      <hr>
      <div class="d-flex justify-content-between fw-bold"><span>Total:</span><span>$${(subtotal + deliveryCost + tax - discount).toFixed(2)}</span></div>
      <button class="btn btn-primary mt-3">Checkout →</button>
    `;

    document.querySelector(".cart-header").innerText = `${productCount} Products in Your cart`;
  }

  document.querySelectorAll(".btn-plus").forEach(btn => {
    btn.addEventListener("click", function() {
      let input = this.parentElement.querySelector(".qty-input");
      input.value = parseInt(input.value) + 1;
      recalcTotals();
    });
  });

  document.querySelectorAll(".btn-minus").forEach(btn => {
    btn.addEventListener("click", function() {
      let input = this.parentElement.querySelector(".qty-input");
      let value = parseInt(input.value);
      if (value > 1) input.value = value - 1;
      recalcTotals();
    });
  });

  document.querySelectorAll(".qty-input").forEach(input => {
    input.addEventListener("input", () => {
      let value = parseInt(input.value);
      if (isNaN(value) || value < 1) input.value = 1;
      recalcTotals();
    });
  });

  document.querySelectorAll(".cart-item .btn-outline-danger").forEach(btn => {
    btn.addEventListener("click", function() {
      this.closest(".cart-item").remove();
      recalcTotals();
    });
  });

  document.querySelector(".text-danger.btn").addEventListener("click", () => {
    document.querySelectorAll(".cart-item").forEach(item => item.remove());
    recalcTotals();
  });

  recalcTotals();
});