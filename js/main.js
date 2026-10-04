// Получаем модальное окно по id.
const orderDialog = document.getElementById('order-dialog');

// Получаем все кнопки заказа в карточках товаров.
const orderButtons = document.querySelectorAll('.product-card__button');

// Получаем кнопку закрытия модального окна.
const closeDialogButton = document.getElementById('close-order-dialog');

// Получаем скрытое поле, в которое будет записан выбранный товар.
const selectedProductInput = document.getElementById('selected-product');

// Перебираем все кнопки «Заказать».
orderButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Получаем название товара из data-атрибута.
    const productName = button.dataset.product;

    // Записываем название товара в скрытое поле формы.
    selectedProductInput.value = productName;

    // Открываем модальное окно.
    orderDialog.showModal();
  });
});

// Закрываем модальное окно по кнопке «Закрыть».
closeDialogButton.addEventListener('click', () => {
  orderDialog.close();
});

// Получаем форму заявки.
const orderForm = document.getElementById('order-form');

// Получаем сообщение об успешной отправке.
const successMessage = document.getElementById('success-message');

// Обрабатываем отправку формы.
orderForm.addEventListener('submit', (event) => {
  // Отменяем стандартную отправку формы,
  // потому что backend пока не подключён.
  event.preventDefault();

  // Сбрасываем предыдущие признаки ошибок.
  const formElements = Array.from(orderForm.elements);

  formElements.forEach((element) => {
    if (element.willValidate) {
      element.removeAttribute('aria-invalid');
    }
  });

  // Проверяем встроенные HTML-ограничения формы.
  if (!orderForm.checkValidity()) {
    formElements.forEach((element) => {
      if (element.willValidate && !element.checkValidity()) {
        element.setAttribute('aria-invalid', 'true');
      }
    });

    // Показываем стандартные сообщения браузера.
    orderForm.reportValidity();
    return;
  }

  // Показываем сообщение об успешной отправке.
  successMessage.hidden = false;

  // Очищаем форму.
  orderForm.reset();

  // Закрываем модальное окно.
  orderDialog.close();
});


document.addEventListener('DOMContentLoaded', () => {
  const orderDialog = document.getElementById('order-dialog');
  const orderButtons = document.querySelectorAll('.product-card__button');
  const feedbackBtn = document.getElementById('open-feedback-btn'); // Кнопка обратной связи
  const closeDialogButton = document.getElementById('close-order-dialog');
  const selectedProductInput = document.getElementById('selected-product');
  const orderForm = document.getElementById('order-form');
  const successMessage = document.getElementById('success-message');

  // 1. Открытие модального окна из карточек товаров
  if (orderButtons.length > 0 && orderDialog) {
    orderButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        if (selectedProductInput) {
          selectedProductInput.value = button.dataset.product;
        }
        orderDialog.showModal();
      });
    });
  }

  // 2. Открытие модального окна по кнопке "Обратная связь"
  if (feedbackBtn && orderDialog) {
    feedbackBtn.addEventListener('click', () => {
      if (selectedProductInput) {
        selectedProductInput.value = 'Обратная связь / Консультация';
      }
      orderDialog.showModal();
    });
  }

  // 3. Закрытие модального окна
  if (closeDialogButton && orderDialog) {
    closeDialogButton.addEventListener('click', () => {
      orderDialog.close();
    });
  }

  // 4. Валидация и отправка формы
  if (orderForm) {
    orderForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!orderForm.checkValidity()) {
        orderForm.reportValidity();
        return;
      }

      if (successMessage) {
        successMessage.hidden = false;
      }

      orderForm.reset();
      
      if (orderDialog && typeof orderDialog.close === 'function' && orderDialog.open) {
        orderDialog.close();
      }
    });
  }
});