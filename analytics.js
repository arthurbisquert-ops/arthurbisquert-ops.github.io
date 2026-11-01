/* MacroArthur — Google Analytics 4 + bandeau de consentement (RGPD / CNIL)
   Google Analytics ne se charge QU'APRES acceptation. */
(function () {
  var GA_ID = 'G-P1EYCGQX6K';
  var KEY = 'ma_cookie_consent';

  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function loadGA() {
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });
  }

  function banner() {
    var b = document.createElement('div');
    b.id = 'ma-cookie-banner';
    b.setAttribute('role', 'dialog');
    b.setAttribute('aria-label', 'Cookies');
    b.style.cssText = 'position:fixed;left:16px;right:16px;bottom:16px;max-width:520px;margin:0 auto;z-index:99999;background:#1F1B15;border:1px solid #C9A24B;color:#EFE7D6;font:14px/1.6 Inter,Arial,sans-serif;padding:18px 20px;box-shadow:0 8px 30px rgba(0,0,0,.5);';
    b.innerHTML =
      '<p style="margin:0 0 14px;color:#B9AE9A;">Ce site utilise des cookies de mesure d\'audience (Google Analytics) pour comprendre comment il est utilisé. Tu peux les accepter ou les refuser.</p>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap;">' +
      '<button id="ma-cookie-yes" style="flex:1;min-width:130px;background:#C9A24B;color:#16130F;border:0;padding:11px 16px;font:700 14px Inter,Arial,sans-serif;cursor:pointer;">Accepter</button>' +
      '<button id="ma-cookie-no" style="flex:1;min-width:130px;background:transparent;color:#EFE7D6;border:1px solid #8A7E6B;padding:11px 16px;font:600 14px Inter,Arial,sans-serif;cursor:pointer;">Refuser</button>' +
      '</div>';
    document.body.appendChild(b);
    document.getElementById('ma-cookie-yes').onclick = function () { save('yes'); b.remove(); loadGA(); };
    document.getElementById('ma-cookie-no').onclick = function () { save('no'); b.remove(); };
  }

  // Permet de rouvrir le choix : window.maCookies()
  window.maCookies = function () {
    var old = document.getElementById('ma-cookie-banner');
    if (old) old.remove();
    banner();
  };

  function init() {
    var c = read();
    if (c === 'yes') loadGA();
    else if (c !== 'no') banner();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
