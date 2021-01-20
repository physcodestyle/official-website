// Header

(function () {
  const menuButton = document.querySelector('.header__menu-button');
  const isMenuButtonMode = window.innerWidth > 802 ? false : true;
  let url = document.querySelector('.languages__flag').getAttribute('href');
  const isRussianPage = !url.includes('/en') ? false : true;
  if (isMenuButtonMode) {
    const menuTitle = document.querySelector('.button__title');
    const menuIcon = document.querySelector('.header__menu-button .button__icon');
    menuButton.addEventListener('click', () => {
      const menu = document.querySelector('.header__navigation');
      const page = document.querySelector('.page');
      menu.classList.toggle('header__navigation--open');
      if (menu.classList.contains('header__navigation--open')) {
        menuTitle.innerHTML = isRussianPage ? 'Закрыть' : 'Close';
        menuIcon.setAttribute('src', '/assets/Icon/Close.svg');
        menuIcon.setAttribute('width', '24');
        menuIcon.setAttribute('height', '24');
        page.setAttribute('style', 'overflow-y: hidden;');
      } else {
        menuTitle.innerHTML = isRussianPage ? 'Меню' : 'Menu';
        menuIcon.setAttribute('src', '/assets/Logo/logo.svg');
        menuIcon.setAttribute('width', '32');
        menuIcon.setAttribute('height', '32');
        page.setAttribute('style', '');
      }
    });
  } else {
    if (isRussianPage) {
      url = '/';
      menuButton.setAttribute('title', 'Перейти на главную страницу');
    } else {
      menuButton.setAttribute('title', 'Go to Home page');
      url = '/en';
    }
    menuButton.addEventListener('click', () => {
      location.href = url;
    });
  }
}());
