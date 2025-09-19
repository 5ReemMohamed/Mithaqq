document.addEventListener("DOMContentLoaded", function() {
  const nav = document.querySelector(".custom-navbar");
  const navbarLinks = document.querySelectorAll('.navbar-nav .nav-link');
  const navbarCollapse = document.getElementById('mainNav');
  const toggleButton = document.querySelector('.navbar-toggler');
  const sections = document.querySelectorAll('section[id]');

  const isLargeScreen = () => window.innerWidth >= 992;

  const updateActiveLink = () => {
    const scrollPos = window.scrollY;

    if (scrollPos < 50) {
      navbarLinks.forEach(link => link.classList.remove('active'));
      const homeLink = document.querySelector('.navbar-nav .nav-link[href="#"]');
      if (homeLink) homeLink.classList.add('active');
      return;
    }

    let activeSet = false;
    sections.forEach(section => {
      if (scrollPos + nav.offsetHeight >= section.offsetTop &&
          scrollPos < section.offsetTop + section.offsetHeight) {
        const id = section.getAttribute('id');
        navbarLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.navbar-nav .nav-link[href="#${id}"]`);
        if (activeLink) activeLink.classList.add('active');
        activeSet = true;
      }
    });

    if (!activeSet) {
      navbarLinks.forEach(link => link.classList.remove('active'));
      const homeLink = document.querySelector('.navbar-nav .nav-link[href="#"]');
      if (homeLink) homeLink.classList.add('active');
    }
  };

  const updateNavbarBackground = () => {
    const scrollPos = window.scrollY;
    if (scrollPos > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  const updateNavbar = () => {
    updateNavbarBackground();
    updateActiveLink();
  };

  document.addEventListener('scroll', updateNavbar);
  window.addEventListener('resize', () => {
    updateNavbar();
    if (isLargeScreen()) {
      navbarCollapse.style.backgroundColor = '';
    }
  });

  navbarLinks.forEach(link => {
    link.addEventListener('click', function() {
      navbarLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');

      if (!isLargeScreen()) {
        new bootstrap.Collapse(navbarCollapse).hide();
      }
    });
  });

  toggleButton.addEventListener('click', () => {
    if (!navbarCollapse.classList.contains('show')) {
      navbarCollapse.style.backgroundColor = '#121E47';
    } else {
      navbarCollapse.style.backgroundColor = '';
      if (isLargeScreen() && window.scrollY < 50) {
        nav.classList.remove('scrolled');
      }
    }
  });

  AOS.init({
    duration: 1000,
    once: false,
    offset: 100,
  });

  updateNavbar();
});
