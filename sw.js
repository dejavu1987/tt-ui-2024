if(!self.define){let e,i={};const s=(s,r)=>(s=new URL(s+".js",r).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(r,n)=>{const d=e||("document"in self?document.currentScript.src:"")||location.href;if(i[d])return;let o={};const a=e=>s(e,d),c={module:{uri:d},exports:o,require:a};i[d]=Promise.all(r.map((e=>c[e]||a(e)))).then((e=>(n(...e),o)))}}define(["./workbox-7cfec069"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"android-chrome-192x192.png",revision:"e97985c09335a92cd20481434b730499"},{url:"android-chrome-512x512.png",revision:"081057f0bed1c480c8dd6f7d2efd03d4"},{url:"assets/ajax-loader-BcnMEykj.gif",revision:null},{url:"assets/index-CnXoSSTr.css",revision:null},{url:"assets/index-DUXTThMs.js",revision:null},{url:"assets/slick-BlzDm7g2.svg",revision:null},{url:"assets/versus-Cxi9ND2I.svg",revision:null},{url:"CNAME",revision:"a1524bab68387272b2199df69eb5102d"},{url:"favicon.ico",revision:"4a2c8420d2d4b15bf64a72313ad123da"},{url:"index.html",revision:"f912ad19d8c5f952698308ad0e821981"},{url:"manifest.webmanifest",revision:"551867f0a00030ca646f91c27456c4a4"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"vite.svg",revision:"8e3a10e157f75ada21ab742c022d5430"},{url:"android-chrome-192x192.png",revision:"e97985c09335a92cd20481434b730499"},{url:"CNAME",revision:"a1524bab68387272b2199df69eb5102d"},{url:"android-chrome-512x512.png",revision:"081057f0bed1c480c8dd6f7d2efd03d4"},{url:"favicon.ico",revision:"4a2c8420d2d4b15bf64a72313ad123da"},{url:"vite.svg",revision:"8e3a10e157f75ada21ab742c022d5430"},{url:"manifest.webmanifest",revision:"551867f0a00030ca646f91c27456c4a4"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
