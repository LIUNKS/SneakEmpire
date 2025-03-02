document.addEventListener("DOMContentLoaded", function() {
    // Elementos del DOM
    const paymentOptions = document.querySelectorAll('.payment-option__input');
    const paymentForm = document.querySelector('.payment-form');
    const qrPayment = document.querySelector('.qr-payment');
    const checkoutForm = document.getElementById('paymentForm');
    const cardNumberInput = document.getElementById('cardNumber');
    const cvvInput = document.getElementById('cvv');
    
    // Ocultar formularios inicialmente
    paymentForm.style.display = 'none';
    qrPayment.style.display = 'none';
    
    // Manejador de selección de método de pago
    paymentOptions.forEach(option => {
      option.addEventListener('change', function() {
        // Gestionar marcas de verificación
        document.querySelectorAll('.payment-option__check').forEach(check => {
          check.style.display = 'none';
        });
        
        this.parentElement.querySelector('.payment-option__check').style.display = 'block';
        
        // Mostrar formulario correspondiente
        if (this.value === 'visa' || this.value === 'mastercard' || this.value === 'paypal') {
          paymentForm.style.display = 'block';
          qrPayment.style.display = 'none';
        } else if (this.value === 'pagoefectivo') {
          paymentForm.style.display = 'none';
          qrPayment.style.display = 'block';
        }
      });
    });
    
    // Formateo de número de tarjeta
    if (cardNumberInput) {
      cardNumberInput.addEventListener('input', function() {
        // Eliminar caracteres no numéricos
        let value = this.value.replace(/\D/g, '');
        
        // Agregar espacios cada 4 dígitos
        if (value.length > 0) {
          value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
        }
        
        this.value = value;
      });
    }
    
    // Validación de CVV
    if (cvvInput) {
      cvvInput.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '');
      });
    }
    
    // Manejo del envío del formulario
    if (checkoutForm) {
      checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validación del formulario
        let isValid = true;
        const requiredInputs = this.querySelectorAll('[required]');
        
        requiredInputs.forEach(input => {
          if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'var(--color-error)';
          } else {
            input.style.borderColor = 'var(--color-border)';
          }
        });
        
        // Validación específica para tarjetas
        const selectedPayment = document.querySelector('.payment-option__input:checked');
        if (selectedPayment && (selectedPayment.value === 'visa' || selectedPayment.value === 'mastercard')) {
          // Validar número de tarjeta
          if (cardNumberInput.value.replace(/\s/g, '').length < 16) {
            isValid = false;
            cardNumberInput.style.borderColor = 'var(--color-error)';
          }
          
          // Validar CVV
          if (cvvInput.value.length < 3) {
            isValid = false;
            cvvInput.style.borderColor = 'var(--color-error)';
          }
          
          // Validar fecha de caducidad
          const expiryMonth = document.getElementById('expiryMonth');
          const expiryYear = document.getElementById('expiryYear');
          
          if (!expiryMonth.value || !expiryYear.value) {
            isValid = false;
            expiryMonth.style.borderColor = !expiryMonth.value ? 'var(--color-error)' : '';
            isValid = false;
            expiryMonth.style.borderColor = !expiryMonth.value ? 'var(--color-error)' : '';
            expiryYear.style.borderColor = !expiryYear.value ? 'var(--color-error)' : '';
          }
        }
        
        if (isValid) {
          // Mostrar mensaje de éxito
          alert('¡Pago procesado con éxito! Gracias por su compra.');
          
          // Reiniciar formulario
          this.reset();
          
          // Ocultar formularios
          paymentForm.style.display = 'none';
          qrPayment.style.display = 'none';
          
          // Desmarcar opciones de pago
          paymentOptions.forEach(option => {
            option.checked = false;
          });
          
          // Ocultar marcas de verificación
          document.querySelectorAll('.payment-option__check').forEach(check => {
            check.style.display = 'none';
          });
        } else {
          alert('Por favor, complete todos los campos requeridos correctamente.');
        }
      });
    }
  });