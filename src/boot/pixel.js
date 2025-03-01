export default async ({ app, router }) => {
  if (process.env.PROD) {
    // Facebook Pixel
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      "script",
      "https://connect.facebook.net/en_US/fbevents.js"
    );

    window.fbq("init", "827755466143323");
    window.fbq("track", "PageView");

    // Google Ads Pixel
    let gtagScript = document.createElement("script");
    gtagScript.async = true;
    gtagScript.src =
      "https://www.googletagmanager.com/gtag/js?id=YOUR_GOOGLE_ADS_ID";
    document.head.appendChild(gtagScript);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", "720-008-0394");

    // TikTok Pixel
    !(function (w, d, t) {
      w.TiktokAnalyticsObject = t;
      var ttq = (w[t] = w[t] || []);
      ttq.methods = [
        "page",
        "track",
        "identify",
        "instances",
        "debug",
        "on",
        "off",
        "once",
        "ready",
        "alias",
        "group",
        "enableCookie",
        "disableCookie",
      ];
      ttq.setAndDefer = function (t, e) {
        t[e] = function () {
          t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
        };
      };
      for (var i = 0; i < ttq.methods.length; i++)
        ttq.setAndDefer(ttq, ttq.methods[i]);
      ttq.instance = function (t) {
        var e = ttq._i[t] || [];
        return function () {
          return (
            ttq.push([t].concat(Array.prototype.slice.call(arguments, 0))), e
          );
        };
      };
      ttq.load = function (e, n) {
        var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
        ttq._i = ttq._i || {};
        ttq._i[e] = [];
        ttq._i[e]._i = e;
        ttq._i[e]._a = n;
        ttq._i[e]._d = 1;
        var o = d.createElement("script");
        o.type = "text/javascript";
        o.async = !0;
        o.src = i + "?sdkid=" + e + "&lib=" + t;
        var a = d.getElementsByTagName("script")[0];
        a.parentNode.insertBefore(o, a);
      };
      ttq.load("YOUR_TIKTOK_PIXEL_ID");
      ttq.page();
    })(window, document, "ttq");

    // Track route changes
    router.afterEach((to) => {
      window.fbq && window.fbq("track", "PageView");
      window.gtag &&
        window.gtag("event", "page_view", { page_path: to.fullPath });
      window.ttq && window.ttq.page();
    });
  }
};
