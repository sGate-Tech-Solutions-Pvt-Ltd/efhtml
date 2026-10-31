// Local fixes for missing autoptimize bundle: lazyload swap + sidenav toggle.
(function () {
  function swapLazy(el) {
    if (el.dataset.src) { el.src = el.dataset.src; el.removeAttribute('data-src'); }
    if (el.dataset.srcset) { el.srcset = el.dataset.srcset; el.removeAttribute('data-srcset'); }
    el.classList.remove('lazyload');
    el.classList.add('lazyloaded');
  }

  function swapAllLazy() {
    document.querySelectorAll('.lazyload[data-src], .lazyload[data-srcset]').forEach(swapLazy);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', swapAllLazy);
  } else {
    swapAllLazy();
  }

  if (window.MutationObserver) {
    new MutationObserver(swapAllLazy).observe(document.documentElement, { childList: true, subtree: true });
  }

  window.openNav = function (e) {
    if (e) e.stopPropagation();
    var nav = document.getElementById('mySidenav');
    if (nav) nav.style.width = '250px';
  };

  window.closeNav = function () {
    var nav = document.getElementById('mySidenav');
    if (nav) nav.style.width = '0';
  };

  // Post-carousel plugin's own init script (missing autoptimize JS bundle
  // normally loads jQuery/Swiper/pcp_vars/scripts.js together).
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.body.appendChild(s);
    });
  }

  function loadStyle(href) {
    if (document.querySelector('link[href="' + href + '"]')) return;
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href;
    document.head.appendChild(l);
  }

  function initCarousel() {
    if (!document.querySelector('.pcp-carousel-wrapper')) return;
    loadStyle('/wp-content/plugins/post-carousel/public/assets/css/swiper-bundle.min.css');
    Promise.resolve()
      .then(function () {
        if (!window.jQuery) return loadScript('/wp-includes/js/jquery/jquery.min.js');
      })
      .then(function () {
        return loadScript('/wp-content/plugins/post-carousel/public/assets/js/swiper-bundle.min.js');
      })
      .then(function () {
        window.pcp_vars = window.pcp_vars || { swiperEnqueue: 1 };
        return loadScript('/wp-content/plugins/post-carousel/public/assets/js/scripts.js');
      })
      .catch(function (err) { console.error('carousel init failed', err); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
  } else {
    initCarousel();
  }
})();
