/* ===============================
   1. Модальное окно заказа
   (только index.html / catalog.html)
   =============================== */

const orderDialog = document.getElementById('order-dialog');

if (orderDialog) {
  const orderButtons = document.querySelectorAll('.product-card__button');
  const closeDialogButton = document.getElementById('close-order-dialog');
  const selectedProductInput = document.getElementById('selected-product');
  const orderForm = document.getElementById('order-form');
  const successMessage = document.getElementById('success-message');

  orderButtons.forEach((button) => {
    button.addEventListener('click', () => {
      selectedProductInput.value = button.dataset.product;
      orderDialog.showModal();
    });
  });

  closeDialogButton.addEventListener('click', () => {
    orderDialog.close();
  });

  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formElements = Array.from(orderForm.elements);
    formElements.forEach((element) => {
      if (element.willValidate) {
        element.removeAttribute('aria-invalid');
      }
    });

    if (!orderForm.checkValidity()) {
      formElements.forEach((element) => {
        if (element.willValidate && !element.checkValidity()) {
          element.setAttribute('aria-invalid', 'true');
        }
      });
      orderForm.reportValidity();
      return;
    }

    successMessage.hidden = false;
    orderForm.reset();
    orderDialog.close();
  });
}


/* ===============================
   2. Переход на страницу товара
   (только index.html / catalog.html)
   =============================== */

const productCards = document.querySelectorAll('.product-card');

if (productCards.length) {
  productCards.forEach((card) => {
    card.addEventListener('click', (event) => {
      if (event.target.closest('.product-card__button')) return;

      const productId = card.dataset.id;
      if (productId) {
        window.location.href = `product.html?id=${productId}`;
      }
    });
  });
}


/* ===============================
   3. Страница товара: чтение ?id=
   (только product.html)
   =============================== */

const products = {
  '1': {
    title: 'Sony PlayStation 5',
    price: 59990,
    description: 'PlayStation 5 — флагманская игровая консоль Sony с дисководом для Blu-ray. Благодаря мощному SSD игры загружаются очень быстро, а поддержка 4K при 120 Гц и трассировки лучей обеспечивает высокую графику. Консоль поддерживает 3D-звук Tempest, обратную совместимость с большинством игр PS4 и фирменный геймпад DualSense с тактильной отдачей и адаптивными триггерами. Подойдёт для эксклюзивов PlayStation, мультиплатформенных игр и просмотра фильмов.',
    manufacturer: 'Sony',
    color: 'Белый',
    weight: '4,5 кг',
    warranty: '12 месяцев',
  },
  '2': {
    title: 'Sony WH-1000XM5',
    price: 29990,
    description: 'Sony WH-1000XM5 — полноразмерные наушники премиум-класса с одним из лучших активных шумоподавлений на рынке. Они оснащены 8 микрофонами, системой Auto NC Optimizer и поддерживают кодек LDAC для качественного звука по Bluetooth. До 30 часов работы с включённым шумоподавлением, быстрая зарядка (3 минуты дают около 3 часов работы), мультиточечное подключение и функция Speak-to-Chat делают их удобными для поездок, работы и повседневного использования.',
    manufacturer: 'Sony',
    color: 'Чёрный',
    weight: '250 г',
    warranty: '12 месяцев',
  },
  '3': {
    title: 'Dyson V15 Detect Absolute',
    price: 64990,
    description: 'Dyson V15 Detect Absolute — мощный беспроводной пылесос для сухой уборки. Лазерная насадка подсвечивает мелкую пыль, а пьезодатчик автоматически измеряет количество частиц и отображает данные на LCD-экране. Мощность всасывания достигает 240 аВт, есть HEPA-фильтрация и до 60 минут работы от аккумулятора. Подходит для пола, ковров, мебели и труднодоступных мест. В комплекте обычно идут несколько насадок, включая Motorbar и насадку для щелей.',
    manufacturer: 'Dyson',
    color: 'никель/жёлтый',
    weight: '3,1 кг',
    warranty: '24 месяца',
  },
};

const productTitleEl = document.getElementById('product-title');

if (productTitleEl) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || '1';
  const product = products[id] || products['1'];

  document.getElementById('product-title').textContent = product.title;
  document.getElementById('product-article').textContent = 'Артикул: SKU-00' + id;
  document.getElementById('product-price').textContent = product.price + ' руб.';
  document.getElementById('product-old-price').textContent =
    product.oldPrice ? product.oldPrice + ' руб.' : '';
  document.getElementById('product-description').textContent = product.description;

  document.title = product.title + ' — страница товара';

  const crumb = document.querySelector('.breadcrumbs__current');
  if (crumb) crumb.textContent = product.title;

  // Характеристики
  const manufacturerCell = document.getElementById('spec-manufacturer');
  const modelCell = document.getElementById('spec-model');
  const colorCell = document.getElementById('spec-color');
  const weightCell = document.getElementById('spec-weight');
  const warrantyCell = document.getElementById('spec-warranty');

  if (manufacturerCell) manufacturerCell.textContent = product.manufacturer || '—';
  if (modelCell) modelCell.textContent = product.title;
  if (colorCell) colorCell.textContent = product.color || '—';
  if (weightCell) weightCell.textContent = product.weight || '—';
  if (warrantyCell) warrantyCell.textContent = product.warranty || '—';
}