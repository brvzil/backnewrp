(function () {
    'use strict';

    var root = document.documentElement;
    var themeToggle = document.getElementById('themeToggle');

    themeToggle.addEventListener('click', function () {
        if (root.classList.contains('light')) {
            root.classList.remove('light');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.add('light');
            localStorage.setItem('theme', 'light');
        }
    });

    var toggles = document.querySelectorAll('[data-toggle]');
    toggles.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            var item = this.closest('.sidebar-item');
            item.classList.toggle('open');
        });
    });

    var pages = document.querySelectorAll('.page-section');
    var allLinks = document.querySelectorAll('[data-page]');
    var overlay = document.getElementById('overlay');
    var sidebar = document.getElementById('sidebar');
    var mobileMenuBtn = document.getElementById('mobileMenuBtn');

    function showPage(pageId) {
        pages.forEach(function (page) { page.classList.remove('active'); });
        var target = document.getElementById('page-' + pageId);
        if (target) target.classList.add('active');

        document.querySelectorAll('.sidebar-link[data-page], .sidebar-sublink[data-page]').forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
                var parent = link.closest('.sidebar-item');
                if (parent && parent.hasAttribute('data-group')) {
                    parent.classList.add('open');
                }
            }
        });

        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (history.pushState) {
            history.pushState(null, null, '#' + pageId);
        } else {
            window.location.hash = pageId;
        }
    }

    allLinks.forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            showPage(this.getAttribute('data-page'));
        });
    });

    function getInitialPage() {
        var hash = window.location.hash.replace('#', '');
        if (hash && document.getElementById('page-' + hash)) return hash;
        return 'home';
    }

    showPage(getInitialPage());

    window.addEventListener('popstate', function () {
        showPage(getInitialPage());
    });

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', function () {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        });
    }

})();