(()=>{var t={10:(t,e,n)=>{"use strict";n.d(e,{Z:()=>a});var i=n(537),s=n.n(i),r=n(645),o=n.n(r)()(s());o.push([t.id,".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n","",{version:3,sources:["webpack://./src/framework/view/abstract-view.css"],names:[],mappings:"AAAA;EACE,qBAAqB;EACrB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE;;IAEE,wBAAwB;EAC1B;;EAEA;;;;;IAKE,2BAA2B;EAC7B;;EAEA;;;;IAIE,0BAA0B;EAC5B;AACF",sourcesContent:[".shake {\n  animation: shake 0.6s;\n  position: relative;\n  z-index: 10;\n}\n\n@keyframes shake {\n  0%,\n  100% {\n    transform: translateX(0);\n  }\n\n  10%,\n  30%,\n  50%,\n  70%,\n  90% {\n    transform: translateX(-5px);\n  }\n\n  20%,\n  40%,\n  60%,\n  80% {\n    transform: translateX(5px);\n  }\n}\n"],sourceRoot:""}]);const a=o},645:t=>{"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",i=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),i&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),i&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,i,s,r){"string"==typeof t&&(t=[[null,t,void 0]]);var o={};if(i)for(var a=0;a<this.length;a++){var l=this[a][0];null!=l&&(o[l]=!0)}for(var c=0;c<t.length;c++){var d=[].concat(t[c]);i&&o[d[0]]||(void 0!==r&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=r),n&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=n):d[2]=n),s&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=s):d[4]="".concat(s)),e.push(d))}},e}},537:t=>{"use strict";t.exports=function(t){var e=t[1],n=t[3];if(!n)return e;if("function"==typeof btoa){var i=btoa(unescape(encodeURIComponent(JSON.stringify(n)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(i),r="/*# ".concat(s," */");return[e].concat([r]).join("\n")}return[e].join("\n")}},484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",i="second",s="minute",r="hour",o="day",a="week",l="month",c="quarter",d="year",u="date",p="Invalid Date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,f=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(n)+t},_={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),i=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+m(i,2,"0")+":"+m(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var i=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(i,l),r=n-s<0,o=e.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-o:o-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:d,w:a,d:o,D:u,h:r,m:s,s:i,ms:n,Q:c}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",g={};g[y]=v;var b=function(t){return t instanceof D},$=function t(e,n,i){var s;if(!e)return y;if("string"==typeof e){var r=e.toLowerCase();g[r]&&(s=r),n&&(g[r]=n,s=r);var o=e.split("-");if(!s&&o.length>1)return t(o[0])}else{var a=e.name;g[a]=e,s=a}return!i&&s&&(y=s),s||!i&&y},C=function(t,e){if(b(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new D(n)},M=_;M.l=$,M.i=b,M.w=function(t,e){return C(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var D=function(){function v(t){this.$L=$(t.locale,null,!0),this.parse(t)}var m=v.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(M.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(h);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return M},m.isValid=function(){return!(this.$d.toString()===p)},m.isSame=function(t,e){var n=C(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return C(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<C(t)},m.$g=function(t,e,n){return M.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,c=!!M.u(e)||e,p=M.p(t),h=function(t,e){var i=M.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return c?i:i.endOf(o)},f=function(t,e){return M.w(n.toDate()[t].apply(n.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},v=this.$W,m=this.$M,_=this.$D,y="set"+(this.$u?"UTC":"");switch(p){case d:return c?h(1,0):h(31,11);case l:return c?h(1,m):h(0,m+1);case a:var g=this.$locale().weekStart||0,b=(v<g?v+7:v)-g;return h(c?_-b:_+(6-b),m);case o:case u:return f(y+"Hours",0);case r:return f(y+"Minutes",1);case s:return f(y+"Seconds",2);case i:return f(y+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var a,c=M.p(t),p="set"+(this.$u?"UTC":""),h=(a={},a[o]=p+"Date",a[u]=p+"Date",a[l]=p+"Month",a[d]=p+"FullYear",a[r]=p+"Hours",a[s]=p+"Minutes",a[i]=p+"Seconds",a[n]=p+"Milliseconds",a)[c],f=c===o?this.$D+(e-this.$W):e;if(c===l||c===d){var v=this.clone().set(u,1);v.$d[h](f),v.init(),this.$d=v.set(u,Math.min(this.$D,v.daysInMonth())).$d}else h&&this.$d[h](f);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[M.p(t)]()},m.add=function(n,c){var u,p=this;n=Number(n);var h=M.p(c),f=function(t){var e=C(p);return M.w(e.date(e.date()+Math.round(t*n)),p)};if(h===l)return this.set(l,this.$M+n);if(h===d)return this.set(d,this.$y+n);if(h===o)return f(1);if(h===a)return f(7);var v=(u={},u[s]=t,u[r]=e,u[i]=1e3,u)[h]||1,m=this.$d.getTime()+n*v;return M.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||p;var i=t||"YYYY-MM-DDTHH:mm:ssZ",s=M.z(this),r=this.$H,o=this.$m,a=this.$M,l=n.weekdays,c=n.months,d=function(t,n,s,r){return t&&(t[n]||t(e,i))||s[n].slice(0,r)},u=function(t){return M.s(r%12||12,t,"0")},h=n.meridiem||function(t,e,n){var i=t<12?"AM":"PM";return n?i.toLowerCase():i},v={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:M.s(a+1,2,"0"),MMM:d(n.monthsShort,a,c,3),MMMM:d(c,a),D:this.$D,DD:M.s(this.$D,2,"0"),d:String(this.$W),dd:d(n.weekdaysMin,this.$W,l,2),ddd:d(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:M.s(r,2,"0"),h:u(1),hh:u(2),a:h(r,o,!0),A:h(r,o,!1),m:String(o),mm:M.s(o,2,"0"),s:String(this.$s),ss:M.s(this.$s,2,"0"),SSS:M.s(this.$ms,3,"0"),Z:s};return i.replace(f,(function(t,e){return e||v[t]||s.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,u,p){var h,f=M.p(u),v=C(n),m=(v.utcOffset()-this.utcOffset())*t,_=this-v,y=M.m(this,v);return y=(h={},h[d]=y/12,h[l]=y,h[c]=y/3,h[a]=(_-m)/6048e5,h[o]=(_-m)/864e5,h[r]=_/e,h[s]=_/t,h[i]=_/1e3,h)[f]||_,p?y:M.a(y)},m.daysInMonth=function(){return this.endOf(l).$D},m.$locale=function(){return g[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),i=$(t,e,!0);return i&&(n.$L=i),n},m.clone=function(){return M.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},v}(),w=D.prototype;return C.prototype=w,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",o],["$M",l],["$y",d],["$D",u]].forEach((function(t){w[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),C.extend=function(t,e){return t.$i||(t(e,D,C),t.$i=!0),C},C.locale=$,C.isDayjs=b,C.unix=function(t){return C(1e3*t)},C.en=g[y],C.Ls=g,C.p={},C}()},379:t=>{"use strict";var e=[];function n(t){for(var n=-1,i=0;i<e.length;i++)if(e[i].identifier===t){n=i;break}return n}function i(t,i){for(var r={},o=[],a=0;a<t.length;a++){var l=t[a],c=i.base?l[0]+i.base:l[0],d=r[c]||0,u="".concat(c," ").concat(d);r[c]=d+1;var p=n(u),h={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==p)e[p].references++,e[p].updater(h);else{var f=s(h,i);i.byIndex=a,e.splice(a,0,{identifier:u,updater:f,references:1})}o.push(u)}return o}function s(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,s){var r=i(t=t||[],s=s||{});return function(t){t=t||[];for(var o=0;o<r.length;o++){var a=n(r[o]);e[a].references--}for(var l=i(t,s),c=0;c<r.length;c++){var d=n(r[c]);0===e[d].references&&(e[d].updater(),e.splice(d,1))}r=l}}},569:t=>{"use strict";var e={};t.exports=function(t,n){var i=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(n)}},216:t=>{"use strict";t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},565:(t,e,n)=>{"use strict";t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},795:t=>{"use strict";t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var i="";n.supports&&(i+="@supports (".concat(n.supports,") {")),n.media&&(i+="@media ".concat(n.media," {"));var s=void 0!==n.layer;s&&(i+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),i+=n.css,s&&(i+="}"),n.media&&(i+="}"),n.supports&&(i+="}");var r=n.sourceMap;r&&"undefined"!=typeof btoa&&(i+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleTagTransform(i,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},589:t=>{"use strict";t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function n(i){var s=e[i];if(void 0!==s)return s.exports;var r=e[i]={id:i,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nc=void 0,(()=>{"use strict";var t=n(379),e=n.n(t),i=n(795),s=n.n(i),r=n(569),o=n.n(r),a=n(565),l=n.n(a),c=n(216),d=n.n(c),u=n(589),p=n.n(u),h=n(10),f={};f.styleTagTransform=p(),f.setAttributes=l(),f.insert=o().bind(null,"head"),f.domAPI=s(),f.insertStyleElement=d(),e()(h.Z,f),h.Z&&h.Z.locals&&h.Z.locals;const v="shake";class m{#t=null;constructor(){if(new.target===m)throw new Error("Can't instantiate AbstractView, only concrete one.")}get element(){return this.#t||(this.#t=function(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}(this.template)),this.#t}get template(){throw new Error("Abstract method not implemented: get template")}removeElement(){this.#t=null}shake(t){this.element.classList.add(v),setTimeout((()=>{this.element.classList.remove(v),t?.()}),600)}}function _(t,e,n="beforeend"){if(!(t instanceof m))throw new Error("Can render only components");if(null===e)throw new Error("Container element doesn't exist");e.insertAdjacentElement(n,t.element)}function y(t,e){if(!(t instanceof m&&e instanceof m))throw new Error("Can replace only components");const n=t.element,i=e.element,s=i.parentElement;if(null===s)throw new Error("Parent element doesn't exist");s.replaceChild(n,i)}function g(t){if(null!==t){if(!(t instanceof m))throw new Error("Can remove only components");t.element.remove(),t.removeElement()}}class b extends m{get template(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n    <div class="trip-sort__item  trip-sort__item--day">\n      <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>\n      <label class="trip-sort__btn" for="sort-day">Day</label>\n    </div>\n    <div class="trip-sort__item  trip-sort__item--event">\n      <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n      <label class="trip-sort__btn" for="sort-event">Event</label>\n    </div>\n    <div class="trip-sort__item  trip-sort__item--time">\n      <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n      <label class="trip-sort__btn" for="sort-time">Time</label>\n    </div>\n    <div class="trip-sort__item  trip-sort__item--price">\n      <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">\n      <label class="trip-sort__btn" for="sort-price">Price</label>\n    </div>\n    <div class="trip-sort__item  trip-sort__item--offer">\n      <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n      <label class="trip-sort__btn" for="sort-offer">Offers</label>\n    </div>\n  </form>'}}class $ extends m{get template(){return'\n    <ul class="trip-events__list"></ul>\n  '}}class C extends m{get template(){return'\n    <p class="trip-events__msg">Click New Event to create your first point</p>\n  '}}var M=n(484),D=n.n(M);const w=["Rubcovsk","Novosibirsk","Barnaul","Moscow","London","Rome","Saint-Petersburg"],k=["Lorem ipsum dolor sit amet.","Phasellus eros mauris.","In rutrum ac purus sit amet tempus."],S=["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.","Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.","Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus."],E=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"],A="DD/MM/YY HH:mm",O="HH:mm",x={basePrice:0,dateFrom:null,dateTo:null,destination:null,isFavorite:!1,offers:[],type:"flight"},F=t=>t[Math.floor(Math.random()*t.length)],P=(t,e)=>(t=Math.ceil(t))>(e=Math.floor(e))||t<0||e<0?NaN:Math.floor(Math.random()*(e-t+1))+t,L=({next:t})=>{let e=D()().subtract(P(0,7),"day").toDate();const n=P(0,59),i=P(0,23),s=P(0,7);return t&&(e=D()().add(n,"minute").add(i,"hour").subtract(s,"day").toDate()),e},T=(t,e)=>t?D()(t).format(e):"";class I extends m{#e=null;#n=null;#i=null;#s=null;#r=null;#o=null;constructor({point:t=x,pointDestinations:e,pointOffers:n,onFormSubmit:i,onCloseClick:s,onDeleteClick:r}){super(),this.#e=t,this.#n=e,this.#i=n,this.#s=i,this.#r=s,this.#o=r,this.element.querySelector("form").addEventListener("submit",this.#a),this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#l),this.element.querySelector(".event__reset-btn").addEventListener("click",this.#c)}get template(){return(({point:t=x,pointDestinations:e,pointOffers:n})=>{const{dateFrom:i,dateTo:s,type:r,basePrice:o}=t,a=n.find((t=>t.type===r)).offers,l=e.find((e=>e.id===t.destination));return`<li class="trip-events__item">\n    <form class="event event--edit" action="#" method="post">\n      <header class="event__header">\n      ${((t,e)=>{const n=0===t.length?"":t.map((t=>{return`<div class="event__type-item">\n        <input\n          id="event-type-${t.type}-1"\n          class="event__type-input  visually-hidden"\n          type="radio"\n          name="event-type"\n          value="${t.type}"\n          ${t.type===e?"checked":""}\n        >\n        <label class="event__type-label  event__type-label--${t.type}" for="event-type-${t.type}-1">${n=t.type,n.charAt(0).toUpperCase()+n.slice(1)}</label>\n      </div>`;var n})).join("");return`<div class="event__type-wrapper">\n        <label class="event__type  event__type-btn" for="event-type-toggle-1">\n          <span class="visually-hidden">Choose event type</span>\n          <img class="event__type-icon" width="17" height="17" src="img/icons/${e}.png" alt="Event type icon">\n        </label>\n        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n        <div class="event__type-list">\n          <fieldset class="event__type-group">\n            <legend class="visually-hidden">Event type</legend>\n              ${n}\n        </div>\n     </div>`})(n,r)}\n\n        <div class="event__field-group  event__field-group--destination">\n          <label class="event__label  event__type-output" for="event-destination-1">\n          ${r}\n          </label>\n          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${l.name}" list="destination-list-1">\n          <datalist id="destination-list-1">\n            <option value="Amsterdam"></option>\n            <option value="Geneva"></option>\n            <option value="Chamonix"></option>\n          </datalist>\n        </div>\n\n        <div class="event__field-group  event__field-group--time">\n          <label class="visually-hidden" for="event-start-time-1">From</label>\n          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${T(i,A)}">\n          &mdash;\n          <label class="visually-hidden" for="event-end-time-1">To</label>\n          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${T(s,A)}">\n        </div>\n\n        <div class="event__field-group  event__field-group--price">\n          <label class="event__label" for="event-price-1">\n            <span class="visually-hidden">Price</span>\n            &euro;\n          </label>\n          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${o}">\n        </div>\n\n        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n        <button class="event__reset-btn" type="reset">Delete</button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </header>\n      <section class="event__details">\n        <section class="event__section  event__section--offers">\n          <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n          <div class="event__available-offers">\n          ${d=a,d.map((t=>{const e=d.includes(t.id)?"":"checked";return`<div class="event__offer-selector">\n        <input class="event__offer-checkbox  visually-hidden" id="${t.id}" type="checkbox" name="${t.id}" ${e}>\n        <label class="event__offer-label" for="${t.id}">\n        <span class="event__offer-title">${t.title}</span>\n          &plus;&euro;&nbsp;\n        <span class="event__offer-price">${t.price}</span>\n        </label>\n      </div>`})).join("")}\n          </div>\n        </section>\n        <section class="event__section  event__section--destination">\n          <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n          <p class="event__destination-description">${l.description}</p>\n          <div class="event__photos-container">\n            ${c=l.pictures,c?`<div class="event__photos-tape">\n    ${c.map((t=>`<img class="event__photo" src="${t.src}" alt="${t.description}">`)).join("")}\n      </div>`:""}\n          </div>\n        </section>\n      </section>\n    </form>\n  </li>`;var c,d})({point:this.#e,pointDestinations:this.#n,pointOffers:this.#i})}#a=t=>{t.preventDefault(),this.#s(this.#e)};#l=t=>{t.preventDefault(),this.#r()};#c=t=>{t.preventDefault(),this.#o()}}class H extends m{#e=null;#d=null;#u=null;#p=null;#h=null;constructor({point:t=x,pointDestination:e,pointOffer:n,onOpenClick:i,onFavoriteClick:s}){super(),this.#e=t,this.#d=e,this.#u=n,this.#p=i,this.#h=s,this.element.querySelector(".event__rollup-btn").addEventListener("click",this.#f),this.element.querySelector(".event__favorite-btn").addEventListener("click",this.#v)}get template(){return(({point:t=x,pointDestination:e,pointOffer:n})=>{const{dateFrom:i,dateTo:s,type:r,basePrice:o,isFavorite:a}=t,l=T(i,O),c=((t,e)=>{const n=D()(t),i=D()(e).diff(n,"minutes"),s=Math.floor(i/1440),r=i-1440*s,o=Math.floor(r/60),a=r-60*o;let l="";return i<=0?"wrong date":(0!==s&&(l=`${s.toString().padStart(2,"0")}d `),0!==o&&(l+=`${o.toString().padStart(2,"0")}h `),0!==a&&(l+=`${a.toString().padStart(2,"0")}m`),l)})(i,s),d=T(s,O),u=a?"event__favorite-btn event__favorite-btn--active":"event__favorite-btn";return`<li class="trip-events__item">\n      <div class="event">\n        <time class="event__date" datetime="${i}">${T(i,"MMM DD")}</time>\n        <div class="event__type">\n          <img class="event__type-icon" width="42" height="42" src="img/icons/${r}.png" alt="Event type icon">\n        </div>\n        <h3 class="event__title">${r} ${e.name}</h3>\n        <div class="event__schedule">\n          <p class="event__time">\n            <time class="event__start-time" datetime="${i}">${l}</time>\n              &mdash;\n            <time class="event__end-time" datetime="${s}">${d}</time>\n          </p>\n          <p class="event__duration">${c}</p>\n        </div>\n        <p class="event__price">\n          &euro;&nbsp;<span class="event__price-value">${o}</span>\n        </p>\n        <h4 class="visually-hidden">Offers:</h4>\n          ${p=n,`<ul class="event__selected-offers">\n    ${p?`${p.offers.map((t=>`<li class="event__offer">\n        <span class="event__offer-title">${t.title}</span>\n          &plus;&euro;&nbsp;\n        <span class="event__offer-price">${t.price}</span>\n      </li>`)).join("")}`:""}\n  </ul>`}\n        <button class="${u}" type="button">\n          <span class="visually-hidden">Add to favorite</span>\n          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n          </svg>\n        </button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </div>\n    </li>`;var p})({point:this.#e,pointDestination:this.#d,pointOffer:this.#u})}#f=t=>{t.preventDefault(),this.#p()};#v=t=>{t.preventDefault(),this.#h()}}const B="DEFAULT",N="EDITING";class q{#m=null;#_=null;#y=null;#g=null;#b=null;#$=null;#C=null;#e=null;#M=B;constructor({tripListContainer:t,offersModel:e,destinationsModel:n,onDataChange:i,onModeChange:s}){this.#m=t,this.#_=e,this.#y=n,this.#g=i,this.#b=s}init(t){this.#e=t;const e=this.#$,n=this.#C;this.#$=new I({point:this.#e,pointDestinations:this.#y.destinations,pointOffers:this.#_.offers,onFormSubmit:this.#s,onCloseClick:this.#r,onDeleteClick:this.#o}),this.#C=new H({point:this.#e,pointDestination:this.#y.getById(this.#e.destination),pointOffer:this.#_.getByType(this.#e.type),onOpenClick:this.#p,onFavoriteClick:this.#h}),null!==e&&null!==n?(this.#M===B&&y(this.#C,n),this.#M===N&&y(this.#$,e),g(n),g(e)):_(this.#C,this.#m.element)}resetView(){this.#M!==B&&this.#D()}#w=t=>{"Escape"===t.key&&(t.preventDefault(),this.#D(),document.removeEventListener("keydown",this.#w))};#k(){y(this.#$,this.#C),document.addEventListener("keydown",this.#w),this.#b(),this.#M=N}#D(){y(this.#C,this.#$),document.removeEventListener("keydown",this.#w),this.#M=B}#s=t=>{this.#D(),this.#g(t)};#r=()=>{this.#D()};#o=()=>{document.removeEventListener("keydown",this.#w),g(this.#$)};#p=()=>{this.#k()};#h=()=>{this.#g({...this.#e,isFavorite:!this.#e.isFavorite})}}class j extends m{get template(){return'\n    <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow">New event<button>\n  '}}class U extends m{get template(){return'<section class="trip-main__trip-info  trip-info">\n    <div class="trip-info__main">\n      <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>\n    </div>\n    <p class="trip-info__cost">\n      Total: &euro;&nbsp;\n      <span class="trip-info__cost-value">1230</span>\n    </p>\n  </section>'}}class Y extends m{#S=[];constructor({filters:t}){super(),this.#S=t}get template(){return(t=>{const e=this.#S.map(((t,e)=>((t,e)=>{const{type:n,count:i}=t;return`<div class="trip-filters__filter">\n      <input\n        id="filter-${n}"\n        class="trip-filters__filter-input  visually-hidden"\n        type="radio"\n        name="trip-filter"\n        value="${n}"\n        ${e?"checked":""}\n        ${0===i?"disabled":""}\n      >\n        <label class="trip-filters__filter-label" for="filter-${n}">${n}</label>\n    </div>`})(t,0===e))).join("");return`<form class="trip-filters" action="#" method="get">\n        ${e}\n      <button class="visually-hidden" type="submit">Accept filter</button>\n    </form>`})()}}const W={everything:t=>[...t],future:t=>t.filter((t=>D()(t.dateFrom).isAfter(D()()))),past:t=>t.filter((t=>D()(t.dateFrom).isBefore(D()()))),present:t=>t.filter((t=>D()(t.dateFrom).isSame(D()())))},Z=document.querySelector(".page-header").querySelector(".trip-main"),R=document.querySelector(".trip-controls__filters"),z=document.querySelector(".trip-events"),J=new class{#E=[];#A=[];#O=[];constructor(){this.#E=this.generateDestination(),this.#A=this.generateOffers(),this.#O=this.generatePoints()}getDestinations(){return this.#E}getOffers(){return this.#A}getPoints(){return this.#O}generateDestination(){return Array.from({length:5},(()=>(()=>{const t=F(w),e=F(S),n=F(k);return{id:crypto.randomUUID(),description:e,name:t,pictures:[{src:`https://loremflickr.com/248/152?${P(1,400)}`,description:n}]}})()))}generateOffers(){return E.map((t=>({type:t,offers:Array.from({length:P(0,5)},(()=>(t=>({id:crypto.randomUUID(),title:`Offer ${t}`,price:P(1,100)}))(t)))})))}generatePoints(){return Array.from({length:5},(()=>{const t=F(E),e=F(this.#E),n=P(0,1),i=this.#A.find((e=>e.type===t)),s=n?i.offers.slice(0,P(0,5)).map((t=>t.id)):[];return((t,e,n)=>({id:crypto.randomUUID(),basePrice:P(1,1e4),dateFrom:L({next:!1}),dateTo:L({next:!0}),destination:e,isFavorite:!!P(0,1),offers:n,type:t}))(t,e.id,s)}))}},K=new class{#x=null;#O=null;constructor(t){this.#x=t,this.#O=this.#x.getPoints()}get points(){return this.#O}}(J),V=new class{#x=null;#A=null;constructor(t){this.#x=t,this.#A=this.#x.getOffers()}get offers(){return this.#A}getByType(t){return this.#A.find((e=>e.type===t))}}(J),X=new class{#x=null;#E=null;constructor(t){this.#x=t,this.#E=this.#x.getDestinations()}get destinations(){return this.#E}getById(t){return this.#E.find((e=>e.id===t))}}(J),G=new class{#F=null;#P=null;#_=null;#y=null;#L=new $;#O=[];#T=new Map;constructor({boardContainer:t,pointsModel:e,offersModel:n,destinationsModel:i}){this.#F=t,this.#P=e,this.#_=n,this.#y=i,this.#O=[...this.#P.points]}init(){this.#I()}#I(){this.#H(),_(this.#L,this.#F),this.#B(),this.#N()}#b=()=>{this.#T.forEach((t=>t.resetView()))};#H(){_(new b,this.#F)}#B(){0===this.#O.length&&_(new C,this.#F)}#q=t=>{var e,n;this.#O=(e=this.#O,n=t,e.map((t=>t.id===n.id?n:t))),this.#T.get(t.id).init(t)};#N(){this.#O.length&&this.#O.forEach((t=>{this.#j(t)}))}#j(t){const e=new q({tripListContainer:this.#L,offersModel:this.#_,destinationsModel:this.#y,onDataChange:this.#q,onModeChange:this.#b});e.init(t),this.#T.set(t.id,e)}}({boardContainer:z,destinationsModel:X,pointsModel:K,offersModel:V}),Q=new class{#U=null;#Y=null;#P=null;#S=[];constructor({tripFilterElement:t,tripMainElement:e,pointsModel:n}){var i;this.#U=e,this.#Y=t,this.#P=n,this.#S=(i=this.#P.points,Object.entries(W).map((([t,e])=>({type:t,count:e(i).length}))))}init(){this.#W()}#W(){this.#Z(),this.#R(),this.#z()}#Z(){_(new Y({filters:this.#S}),this.#Y)}#R(){_(new U,this.#U,"afterbegin")}#z(){_(new j,this.#U)}}({tripFilterElement:R,tripMainElement:Z,pointsModel:K});G.init(),Q.init()})()})();
//# sourceMappingURL=bundle.fa8dd81d0a4c77325fe4.js.map