function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) return element;
  throw new Error(
    `Please check "${selection}" selector, no such element exists`
  );
}
function Gallery(element) {
  this.container = element;
  this.list = element.querySelectorAll('.img');
  // this.list = [...element.querySelectorAll('.img')]
  this.list = [...this.list];
  // target
  this.modal = getElement('.modal');
  this.modalMainImg = getElement('.main-img');
  this.imageName = getElement('.image-name');
  this.modalImages = getElement('.modal-images');
  this.closeBtn = getElement('.close-btn');
  this.prevBtn = getElement('.prev-btn');
  this.nextBtn = getElement('.next-btn');
  // let self = this;
  //bind functions
  // this.openModal = this.openModal.bind(this);
  // binded the selected Modal Image
  this.selectedModalImage = this.selectedModalImage.bind(this);
  this.closeModal = this.closeModal.bind(this);
  this.nextImage = this.nextImage.bind(this);
  this.prevImage = this.prevImage.bind(this);
  // this.selectedModalImage = this.selectedModalImage.bind(this);
  // container event
  this.container.addEventListener(
    'click',
    function (e) {
      // console.log(this);
      if (e.target.classList.contains('img')) {
        this.openModal(e.target, this.list);
      }
    }.bind(this)
  );
}
Gallery.prototype.openModal = function (selectedImage, list) {
  // console.log(this);
  // console.log('OPEN MODAL');
  // console.log(selectedImage, list);
  this.setMainImage(selectedImage);
  // console.log(list);
  // list is a local variable , parameter to the function
  this.modalImages.innerHTML = list
    .map(function (image) {
      return `<img src="${
        image.src
      }" title="${image.title}" data-id="${image.dataset.id}" class="${selectedImage.dataset.id === image.dataset.id ? 'modal-img selected' : 'modal-img'}"/>`;
    })
    .join('');

  this.modal.classList.add('open');
  this.closeBtn.addEventListener('click', this.closeModal);
  this.nextBtn.addEventListener('click', this.nextImage);
  this.prevBtn.addEventListener('click', this.prevImage);
  this.modalImages.addEventListener('click', this.selectedModalImage);
};
// piling up event listeners is not a good practice
Gallery.prototype.setMainImage = function (selectedImage) {
  this.modalMainImg.src = selectedImage.src;
  this.imageName.textContent = selectedImage.title;
  // console.log(this.modalImg);
};
Gallery.prototype.closeModal = function () {
  this.modal.classList.remove('open');
  this.closeBtn.removeEventListener('click', this.closeModal);
  this.nextBtn.removeEventListener('click', this.nextImage);
  this.prevBtn.removeEventListener('click', this.prevImage);
  this.modalImages.removeEventListener('click', this.selectedModalImage);
};
Gallery.prototype.nextImage = function () {
  // console.log(this.modalImages.childNodes);
  // console.log(this.modalImages.firstChild);
  const selected = this.modalImages.querySelector('.selected');
  const next =
    selected.nextElementSibling || this.modalImages.firstElementChild;
  selected.classList.remove('selected');
  next.classList.add('selected');
  this.setMainImage(next);
};
Gallery.prototype.prevImage = function () {
  const selected = this.modalImages.querySelector('.selected');
  const prev =
    selected.previousElementSibling || this.modalImages.lastElementChild;
  selected.classList.remove('selected');
  prev.classList.add('selected');
  this.setMainImage(prev);
};
Gallery.prototype.selectedModalImage = function (e) {
  // the if condition is important here
  if (e.target.classList.contains('modal-img')) {
    this.setMainImage(e.target);
    const selected = this.modalImages.querySelector('.selected');
    selected.classList.remove('selected');
    e.target.classList.add('selected');
  }
};
const city = new Gallery(getElement('.city'));
const nature = new Gallery(getElement('.nature'));
