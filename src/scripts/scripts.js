// Header

(function () {
  const menuButton = document.querySelector('.header__menu-button');
  const isMenuButtonMode = window.innerWidth > 802 ? false : true;
  let url = document.querySelector('.languages__flag').getAttribute('href');
  const isRussianPage = !url.includes('/en') ? false : true;
  if (isMenuButtonMode) {
    const menuTitle = document.querySelector('.button__title');
    menuButton.addEventListener('click', () => {
      const menu = document.querySelector('.header__navigation');
      menu.classList.toggle('header__navigation--open');
      if (menu.classList.contains('header__navigation--open')) {
        menuTitle.innerHTML = isRussianPage ? 'Назад' : 'Back';
      } else {
        menuTitle.innerHTML = isRussianPage ? 'Меню' : 'Menu';
      }
    });
  } else {
    if (isRussianPage) {
      url = url.replace('/en', '');
      menuButton.setAttribute('title', 'Перейти на главную страницу');
    } else {
      menuButton.setAttribute('title', 'Go to Home page');
      url = '/en' + url;
    }
    menuButton.addEventListener('click', () => {
      location.href = url;
    });
  }
}());
