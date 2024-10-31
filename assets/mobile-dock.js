class MobileDock extends HTMLElement {
  constructor() {
    super();

    new theme.initWhenVisible(this.init.bind(this));
  }

  get section() {
    return this.closest('.mobile-dock-section');
  }

  init() {
    const header = document.querySelector('.header-section');
    if (header === null) {
      this.section.classList.add('active');
    }
    else if (!header.classList.contains('header-sticky')) {
      this.scrollY  = parseInt(header.getBoundingClientRect().bottom);
      window.addEventListener('scroll', theme.utils.throttle(this.onScroll.bind(this)), false);
    }

    setTimeout(() => {
      document.documentElement.style.setProperty('--mobile-dock-height', `${this.offsetHeight}px`);
    });
  }

  onScroll() {
    if (window.scrollY >= this.scrollY) {
      this.section.classList.add('active');
    }
    else {
      this.section.classList.remove('active');
    }
  }
}
customElements.define('mobile-dock', MobileDock);
