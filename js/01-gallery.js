import { galleryItems } from './gallery-items.js';
// Change code below this line

const createGalleryItem = (preview, original, description) =>
  `<a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>`;

const renderList = (img) =>
  img.reduce(
    (acc, { preview, original, description }) =>
      acc + createGalleryItem(preview, original, description),
    ''
  );

const gallery = document.querySelector('.gallery');

const insertGalleryItems = (string) => {
  gallery.insertAdjacentHTML('beforeend', string);
};

const result = renderList(galleryItems);
insertGalleryItems(result);

let modal = {};

const showModal = (original) => {
  modal = basicLightbox.create(
    `
  <img src="${original}" width="800" height="600">
`,
    {
      onClose: (instance) => {
        window.removeEventListener('keydown', onEscKeyPress);
      },
    }
  );

  modal.show();
};

const onCloseModal = () => {
  modal.close();
};

const onEscKeyPress = (e) => {
  const ESC_KEY_CODE = 'Escape';
  if (e.code === ESC_KEY_CODE) {
    onCloseModal();
  }
};

gallery.addEventListener('click', (e) => {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }
  showModal(e.target.dataset.source);
  window.addEventListener('keydown', onEscKeyPress);
});

console.log(galleryItems);
