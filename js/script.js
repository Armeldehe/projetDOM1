document.addEventListener('DOMContentLoaded', function () {
  // Variables globales pour le panier
  var cart = [];
  var cartItemsContainer = document.getElementById('cartItems');
  var validateBtn = document.getElementById('validateCart');
  var clearBtn = document.getElementById('clearCart');

  // Fonction pour les cœurs
  var heartIcons = document.querySelectorAll('.fa-heart');

  heartIcons.forEach(function (icon) {
    icon.addEventListener('click', function () {
      if (icon.style.color === 'red') {
        icon.style.color = 'black';
      } else {
        icon.style.color = 'red';
      }
    });
  });

  // Fonction pour gérer les quantités et le prix total
  var plusButtons = document.querySelectorAll('.fa-plus-circle');
  var minusButtons = document.querySelectorAll('.fa-minus-circle');
  var totalElement = document.querySelector('.total');

  // Fonction pour calculer le prix total
  function calculateTotal() {
    var total = 0;
    var quantities = document.querySelectorAll('.quantity');
    var unitPrices = document.querySelectorAll('.unit-price');

    quantities.forEach(function (quantity, index) {
      var qty = parseInt(quantity.textContent);
      var price = parseInt(unitPrices[index].textContent.replace(' $', ''));
      total += qty * price;
    });

    totalElement.textContent = total + ' $';
  }

  // Fonction pour mettre à jour le panier
  function updateCart() {
    cart = [];
    var quantities = document.querySelectorAll('.quantity');
    var unitPrices = document.querySelectorAll('.unit-price');
    var productNames = document.querySelectorAll('.card-title');
    var productImages = document.querySelectorAll('.card-img-top');

    quantities.forEach(function (quantity, index) {
      var qty = parseInt(quantity.textContent);
      if (qty > 0) {
        var price = parseInt(unitPrices[index].textContent.replace(' $', ''));
        cart.push({
          name: productNames[index].textContent,
          price: price,
          quantity: qty,
          total: qty * price,
          image: productImages[index].src
        });
      }
    });

    displayCart();
    updateCartButtons();
  }

  // Fonction pour afficher le panier
  function displayCart() {
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
    } else {
      var cartHTML = '';
      cart.forEach(function (item) {
        cartHTML += `
          <div class="cart-item">
            <div class="cart-item-info">
              <img src="${item.image}" alt="${item.name}" class="cart-item-image">
              <div class="cart-item-details">
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-price">${item.price} $</p>
              </div>
            </div>
            <div class="cart-item-quantity">
              <span>${item.quantity}</span>
            </div>
            <div class="cart-item-total">${item.total} $</div>
          </div>
        `;
      });
      cartItemsContainer.innerHTML = cartHTML;
    }
  }

  // Fonction pour mettre à jour l'état des boutons du panier
  function updateCartButtons() {
    var hasItems = cart.length > 0;
    validateBtn.disabled = !hasItems;
    clearBtn.disabled = !hasItems;
  }

  // Gestion des boutons plus
  plusButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var quantityElement = button.parentElement.querySelector('.quantity');
      var currentQuantity = parseInt(quantityElement.textContent);
      quantityElement.textContent = currentQuantity + 1;
      calculateTotal();
      updateCart();
    });
  });

  // Gestion des boutons moins
  minusButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var quantityElement = button.parentElement.querySelector('.quantity');
      var currentQuantity = parseInt(quantityElement.textContent);
      if (currentQuantity > 0) {
        quantityElement.textContent = currentQuantity - 1;
        calculateTotal();
        updateCart();
      }
    });
  });

  // Fonction pour supprimer un article du panier (remettre quantité à 0)
  var trashButtons = document.querySelectorAll('.fa-trash-alt');
  var modal = document.getElementById('deleteModal');
  var confirmBtn = document.getElementById('confirmDelete');
  var cancelBtn = document.getElementById('cancelDelete');
  var currentQuantityElement = null;

  trashButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      // Trouver l'élément quantité dans la même carte
      currentQuantityElement = button.closest('.card').querySelector('.quantity');
      
      // Afficher la modal
      modal.style.display = 'block';
    });
  });

  // Gestion des boutons de la modal
  confirmBtn.addEventListener('click', function () {
    if (currentQuantityElement) {
      // Remettre la quantité à 0
      currentQuantityElement.textContent = '0';
      
      // Recalculer le prix total après suppression
      calculateTotal();
      updateCart();
    }
    
    // Fermer la modal
    modal.style.display = 'none';
    currentQuantityElement = null;
  });

  cancelBtn.addEventListener('click', function () {
    // Fermer la modal sans rien faire
    modal.style.display = 'none';
    currentQuantityElement = null;
  });

  // Fermer la modal en cliquant à l'extérieur
  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
      currentQuantityElement = null;
    }
  });

  // Gestion des boutons du panier
  validateBtn.addEventListener('click', function () {
    if (cart.length > 0) {
      var total = cart.reduce(function (sum, item) {
        return sum + item.total;
      }, 0);
      
      alert('Commande validée !\n\nTotal: ' + total + ' $\n\nMerci pour votre achat !');
      
      // Vider le panier après validation
      clearCart();
    }
  });

  clearBtn.addEventListener('click', function () {
    if (confirm('Êtes-vous sûr de vouloir vider le panier ?')) {
      clearCart();
    }
  });

  // Fonction pour vider le panier
  function clearCart() {
    var quantities = document.querySelectorAll('.quantity');
    quantities.forEach(function (quantity) {
      quantity.textContent = '0';
    });
    calculateTotal();
    updateCart();
  }
});


