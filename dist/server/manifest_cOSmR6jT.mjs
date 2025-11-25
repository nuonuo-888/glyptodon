import 'kleur/colors';
import { l as decodeKey } from './chunks/astro/server_CHn6-p_H.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_C23ILtuB.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/astro-blogs-collections/glyptodon/","cacheDir":"file:///Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/astro-blogs-collections/glyptodon/node_modules/.astro/","outDir":"file:///Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/astro-blogs-collections/glyptodon/dist/","srcDir":"file:///Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/astro-blogs-collections/glyptodon/src/","publicDir":"file:///Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/astro-blogs-collections/glyptodon/public/","buildClientDir":"file:///Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/astro-blogs-collections/glyptodon/dist/client/","buildServerDir":"file:///Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/astro-blogs-collections/glyptodon/dist/server/","adapterName":"@edgeone/astro","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.md","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.md","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"finds/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/finds","isIndex":true,"type":"page","pattern":"^\\/finds\\/?$","segments":[[{"content":"finds","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/finds/index.astro","pathname":"/finds","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"now/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/now","isIndex":false,"type":"page","pattern":"^\\/now\\/?$","segments":[[{"content":"now","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/now.md","pathname":"/now","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"posts/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/posts","isIndex":true,"type":"page","pattern":"^\\/posts\\/?$","segments":[[{"content":"posts","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/posts/index.astro","pathname":"/posts","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"robots.txt","links":[],"scripts":[],"styles":[],"routeData":{"route":"/robots.txt","isIndex":false,"type":"endpoint","pattern":"^\\/robots\\.txt\\/?$","segments":[[{"content":"robots.txt","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/robots.txt.ts","pathname":"/robots.txt","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.js","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://www.yoursite.dev","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/astro-blogs-collections/glyptodon/src/components/PostCard.astro",{"propagation":"in-tree","containsHead":false}],["/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/astro-blogs-collections/glyptodon/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/astro-blogs-collections/glyptodon/src/pages/posts/[page].astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/posts/[page]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/astro-blogs-collections/glyptodon/src/pages/404.md",{"propagation":"in-tree","containsHead":true}],["/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/astro-blogs-collections/glyptodon/src/pages/about.md",{"propagation":"in-tree","containsHead":true}],["/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/astro-blogs-collections/glyptodon/src/pages/now.md",{"propagation":"in-tree","containsHead":true}],["/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/astro-blogs-collections/glyptodon/src/pages/finds/[page].astro",{"propagation":"in-tree","containsHead":true}],["/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/astro-blogs-collections/glyptodon/src/pages/posts/[slug].astro",{"propagation":"in-tree","containsHead":true}],["/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/astro-blogs-collections/glyptodon/src/layouts/Layout.astro",{"propagation":"in-tree","containsHead":false}],["/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/astro-blogs-collections/glyptodon/src/layouts/PageLayout.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/404@_@md",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/about@_@md",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/now@_@md",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/finds/[page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/posts/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/astro-blogs-collections/glyptodon/src/pages/rss.xml.js",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@js",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/404@_@md":"pages/404.astro.mjs","\u0000@astro-page:src/pages/about@_@md":"pages/about.astro.mjs","\u0000@astro-page:src/pages/finds/[page]@_@astro":"pages/finds/_page_.astro.mjs","\u0000@astro-page:src/pages/finds/index@_@astro":"pages/finds.astro.mjs","\u0000@astro-page:src/pages/now@_@md":"pages/now.astro.mjs","\u0000@astro-page:src/pages/posts/[page]@_@astro":"pages/posts/_page_.astro.mjs","\u0000@astro-page:src/pages/posts/[slug]@_@astro":"pages/posts/_slug_.astro.mjs","\u0000@astro-page:src/pages/posts/index@_@astro":"pages/posts.astro.mjs","\u0000@astro-page:src/pages/robots.txt@_@ts":"pages/robots.txt.astro.mjs","\u0000@astro-page:src/pages/rss.xml@_@js":"pages/rss.xml.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_cOSmR6jT.mjs","/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/astro-blogs-collections/glyptodon/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/astro-blogs-collections/glyptodon/.astro/content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_BvQvh3Yt.mjs","/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/astro-blogs-collections/glyptodon/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BKuGgQrz.mjs","/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/astro-blogs-collections/glyptodon/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.BQUSSn-Q.js","/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/astro-blogs-collections/glyptodon/src/components/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.D3cKLRbd.js","/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/astro-blogs-collections/glyptodon/src/components/ScrollToTop.astro?astro&type=script&index=0&lang.ts":"_astro/ScrollToTop.astro_astro_type_script_index_0_lang.vgbisJ9f.js","/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/astro-blogs-collections/glyptodon/src/components/PerformanceMonitor.astro?astro&type=script&index=0&lang.ts":"_astro/PerformanceMonitor.astro_astro_type_script_index_0_lang.B1TRSeS8.js","/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/astro-blogs-collections/glyptodon/src/components/ThemeToggle.astro?astro&type=script&index=0&lang.ts":"_astro/ThemeToggle.astro_astro_type_script_index_0_lang.CJhB2U1X.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/astro-blogs-collections/glyptodon/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts","\"serviceWorker\"in navigator&&window.addEventListener(\"load\",()=>{navigator.serviceWorker.register(\"/sw.js\").then(e=>{console.log(\"SW registered: \",e)}).catch(e=>{console.log(\"SW registration failed: \",e)})});"],["/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/astro-blogs-collections/glyptodon/src/components/Header.astro?astro&type=script&index=0&lang.ts","const c=document.querySelector(\".hamburger\"),e=document.querySelector(\".menu\");c?.addEventListener(\"click\",()=>{e?.classList.toggle(\"active\")});document.addEventListener(\"click\",t=>{!t.target.closest(\".nav\")&&e?.classList.contains(\"active\")&&e.classList.remove(\"active\")});"],["/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/astro-blogs-collections/glyptodon/src/components/ScrollToTop.astro?astro&type=script&index=0&lang.ts","class s{button;scrollThreshold=300;constructor(){this.button=document.getElementById(\"scroll-to-top\"),this.init()}init(){this.button&&(window.addEventListener(\"scroll\",()=>{this.toggleVisibility()}),this.button.addEventListener(\"click\",()=>{this.scrollToTop()}),this.button.addEventListener(\"keydown\",t=>{(t.key===\"Enter\"||t.key===\" \")&&(t.preventDefault(),this.scrollToTop())}))}toggleVisibility(){if(!this.button)return;window.scrollY>this.scrollThreshold?(this.button.classList.add(\"visible\"),this.button.style.display=\"flex\"):(this.button.classList.remove(\"visible\"),setTimeout(()=>{window.scrollY<=this.scrollThreshold&&(this.button.style.display=\"none\")},300))}scrollToTop(){window.scrollTo({top:0,behavior:\"smooth\"})}}document.addEventListener(\"DOMContentLoaded\",()=>{new s});"],["/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/astro-blogs-collections/glyptodon/src/components/PerformanceMonitor.astro?astro&type=script&index=0&lang.ts","class n{observer=null;constructor(){this.init()}init(){this.observeWebVitals(),this.observePerformanceMetrics(),this.logPerformanceData()}observeWebVitals(){if(\"PerformanceObserver\"in window)try{this.observer=new PerformanceObserver(e=>{for(const t of e.getEntries())this.handleWebVital(t)}),this.observer.observe({entryTypes:[\"largest-contentful-paint\",\"first-input\",\"layout-shift\"]})}catch(e){console.warn(\"PerformanceObserver not supported:\",e)}}observePerformanceMetrics(){if(\"PerformanceObserver\"in window)try{new PerformanceObserver(t=>{for(const r of t.getEntries())r.entryType===\"resource\"&&this.handleResourceTiming(r)}).observe({entryTypes:[\"resource\"]})}catch(e){console.warn(\"Resource timing observer not supported:\",e)}}handleWebVital(e){const t={name:e.name,value:e.startTime,timestamp:Date.now()};this.sendToAnalytics(\"web-vital\",t)}handleResourceTiming(e){const t={name:e.name,duration:e.duration,transferSize:e.transferSize,initiatorType:e.initiatorType,timestamp:Date.now()};e.duration>1e3&&console.warn(\"Slow resource loaded:\",t),this.sendToAnalytics(\"resource-timing\",t)}logPerformanceData(){if(\"performance\"in window){const e=performance.getEntriesByType(\"navigation\")[0];if(e){const t={domContentLoaded:e.domContentLoadedEventEnd-e.domContentLoadedEventStart,loadComplete:e.loadEventEnd-e.loadEventStart,domInteractive:e.domInteractive,timestamp:Date.now()};this.sendToAnalytics(\"navigation-timing\",t)}}}sendToAnalytics(e,t){\"gtag\"in window&&window.gtag(\"event\",e,t)}}document.addEventListener(\"DOMContentLoaded\",()=>{new n});"],["/Users/tomcomtang/VscodeProjects/video_fe/edgeone-pages-templates/astro-blogs-collections/glyptodon/src/components/ThemeToggle.astro?astro&type=script&index=0&lang.ts","class t{button;currentTheme;constructor(){this.button=document.getElementById(\"theme-toggle\"),this.currentTheme=this.getStoredTheme()||this.getSystemTheme(),this.init()}getStoredTheme(){return localStorage.getItem(\"theme\")}getSystemTheme(){return window.matchMedia(\"(prefers-color-scheme: dark)\").matches?\"dark\":\"light\"}setTheme(e){document.documentElement.setAttribute(\"data-theme\",e),localStorage.setItem(\"theme\",e),this.currentTheme=e}toggleTheme(){const e=this.currentTheme===\"dark\"?\"light\":\"dark\";this.setTheme(e)}init(){this.setTheme(this.currentTheme),this.button?.addEventListener(\"click\",()=>{this.toggleTheme()}),window.matchMedia(\"(prefers-color-scheme: dark)\").addEventListener(\"change\",e=>{this.getStoredTheme()||this.setTheme(e.matches?\"dark\":\"light\")})}}document.addEventListener(\"DOMContentLoaded\",()=>{new t});"]],"assets":["/_astro/about.BLBGCPA3.css","/_astro/about.CsWAGidm.css","/apple-touch-icon.png","/favicon-96x96.png","/favicon.ico","/favicon.svg","/og-default.jpg","/site.webmanifest","/sw.js","/web-app-manifest-192x192.png","/web-app-manifest-512x512.png","/assets/avatar.jpg","/fonts/radiocanada-webfont.woff","/fonts/solway-bold-webfont.woff","/404.html","/about/index.html","/finds/index.html","/now/index.html","/posts/index.html","/robots.txt","/rss.xml","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"f4w7HkDr90uaOOiKYkqmrHrsV7b8sjneYVTSXzzMuhI="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
