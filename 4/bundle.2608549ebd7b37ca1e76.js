(()=>{var t={484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",i="second",s="minute",r="hour",a="day",o="week",l="month",u="quarter",c="year",f="date",d="Invalid Date",p=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(n)+t},_={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),i=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+m(i,2,"0")+":"+m(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var i=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(i,l),r=n-s<0,a=e.clone().add(i+(r?-1:1),l);return+(-(i+(n-s)/(r?s-a:a-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:c,w:o,d:a,D:f,h:r,m:s,s:i,ms:n,Q:u}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},$="en",g={};g[$]=v;var y=function(t){return t instanceof O},b=function t(e,n,i){var s;if(!e)return $;if("string"==typeof e){var r=e.toLowerCase();g[r]&&(s=r),n&&(g[r]=n,s=r);var a=e.split("-");if(!s&&a.length>1)return t(a[0])}else{var o=e.name;g[o]=e,s=o}return!i&&s&&($=s),s||!i&&$},M=function(t,e){if(y(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new O(n)},D=_;D.l=b,D.i=y,D.w=function(t,e){return M(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var O=function(){function v(t){this.$L=b(t.locale,null,!0),this.parse(t)}var m=v.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(D.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(p);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return D},m.isValid=function(){return!(this.$d.toString()===d)},m.isSame=function(t,e){var n=M(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return M(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<M(t)},m.$g=function(t,e,n){return D.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,u=!!D.u(e)||e,d=D.p(t),p=function(t,e){var i=D.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return u?i:i.endOf(a)},h=function(t,e){return D.w(n.toDate()[t].apply(n.toDate("s"),(u?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},v=this.$W,m=this.$M,_=this.$D,$="set"+(this.$u?"UTC":"");switch(d){case c:return u?p(1,0):p(31,11);case l:return u?p(1,m):p(0,m+1);case o:var g=this.$locale().weekStart||0,y=(v<g?v+7:v)-g;return p(u?_-y:_+(6-y),m);case a:case f:return h($+"Hours",0);case r:return h($+"Minutes",1);case s:return h($+"Seconds",2);case i:return h($+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var o,u=D.p(t),d="set"+(this.$u?"UTC":""),p=(o={},o[a]=d+"Date",o[f]=d+"Date",o[l]=d+"Month",o[c]=d+"FullYear",o[r]=d+"Hours",o[s]=d+"Minutes",o[i]=d+"Seconds",o[n]=d+"Milliseconds",o)[u],h=u===a?this.$D+(e-this.$W):e;if(u===l||u===c){var v=this.clone().set(f,1);v.$d[p](h),v.init(),this.$d=v.set(f,Math.min(this.$D,v.daysInMonth())).$d}else p&&this.$d[p](h);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[D.p(t)]()},m.add=function(n,u){var f,d=this;n=Number(n);var p=D.p(u),h=function(t){var e=M(d);return D.w(e.date(e.date()+Math.round(t*n)),d)};if(p===l)return this.set(l,this.$M+n);if(p===c)return this.set(c,this.$y+n);if(p===a)return h(1);if(p===o)return h(7);var v=(f={},f[s]=t,f[r]=e,f[i]=1e3,f)[p]||1,m=this.$d.getTime()+n*v;return D.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||d;var i=t||"YYYY-MM-DDTHH:mm:ssZ",s=D.z(this),r=this.$H,a=this.$m,o=this.$M,l=n.weekdays,u=n.months,c=function(t,n,s,r){return t&&(t[n]||t(e,i))||s[n].slice(0,r)},f=function(t){return D.s(r%12||12,t,"0")},p=n.meridiem||function(t,e,n){var i=t<12?"AM":"PM";return n?i.toLowerCase():i},v={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:D.s(o+1,2,"0"),MMM:c(n.monthsShort,o,u,3),MMMM:c(u,o),D:this.$D,DD:D.s(this.$D,2,"0"),d:String(this.$W),dd:c(n.weekdaysMin,this.$W,l,2),ddd:c(n.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(r),HH:D.s(r,2,"0"),h:f(1),hh:f(2),a:p(r,a,!0),A:p(r,a,!1),m:String(a),mm:D.s(a,2,"0"),s:String(this.$s),ss:D.s(this.$s,2,"0"),SSS:D.s(this.$ms,3,"0"),Z:s};return i.replace(h,(function(t,e){return e||v[t]||s.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,f,d){var p,h=D.p(f),v=M(n),m=(v.utcOffset()-this.utcOffset())*t,_=this-v,$=D.m(this,v);return $=(p={},p[c]=$/12,p[l]=$,p[u]=$/3,p[o]=(_-m)/6048e5,p[a]=(_-m)/864e5,p[r]=_/e,p[s]=_/t,p[i]=_/1e3,p)[h]||_,d?$:D.a($)},m.daysInMonth=function(){return this.endOf(l).$D},m.$locale=function(){return g[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),i=b(t,e,!0);return i&&(n.$L=i),n},m.clone=function(){return D.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},v}(),w=O.prototype;return M.prototype=w,[["$ms",n],["$s",i],["$m",s],["$H",r],["$W",a],["$M",l],["$y",c],["$D",f]].forEach((function(t){w[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),M.extend=function(t,e){return t.$i||(t(e,O,M),t.$i=!0),M},M.locale=b,M.isDayjs=y,M.unix=function(t){return M(1e3*t)},M.en=g[$],M.Ls=g,M.p={},M}()},178:function(t){t.exports=function(){"use strict";var t="minute",e=/[+-]\d\d(?::?\d\d)?/g,n=/([+-]|\d\d)/g;return function(i,s,r){var a=s.prototype;r.utc=function(t){return new s({date:t,utc:!0,args:arguments})},a.utc=function(e){var n=r(this.toDate(),{locale:this.$L,utc:!0});return e?n.add(this.utcOffset(),t):n},a.local=function(){return r(this.toDate(),{locale:this.$L,utc:!1})};var o=a.parse;a.parse=function(t){t.utc&&(this.$u=!0),this.$utils().u(t.$offset)||(this.$offset=t.$offset),o.call(this,t)};var l=a.init;a.init=function(){if(this.$u){var t=this.$d;this.$y=t.getUTCFullYear(),this.$M=t.getUTCMonth(),this.$D=t.getUTCDate(),this.$W=t.getUTCDay(),this.$H=t.getUTCHours(),this.$m=t.getUTCMinutes(),this.$s=t.getUTCSeconds(),this.$ms=t.getUTCMilliseconds()}else l.call(this)};var u=a.utcOffset;a.utcOffset=function(i,s){var r=this.$utils().u;if(r(i))return this.$u?0:r(this.$offset)?u.call(this):this.$offset;if("string"==typeof i&&(i=function(t){void 0===t&&(t="");var i=t.match(e);if(!i)return null;var s=(""+i[0]).match(n)||["-",0,0],r=s[0],a=60*+s[1]+ +s[2];return 0===a?0:"+"===r?a:-a}(i),null===i))return this;var a=Math.abs(i)<=16?60*i:i,o=this;if(s)return o.$offset=a,o.$u=0===i,o;if(0!==i){var l=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(o=this.local().add(a+l,t)).$offset=a,o.$x.$localOffset=l}else o=this.utc();return o};var c=a.format;a.format=function(t){var e=t||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return c.call(this,e)},a.valueOf=function(){var t=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*t},a.isUTC=function(){return!!this.$u},a.toISOString=function(){return this.toDate().toISOString()},a.toString=function(){return this.toDate().toUTCString()};var f=a.toDate;a.toDate=function(t){return"s"===t&&this.$offset?r(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():f.call(this)};var d=a.diff;a.diff=function(t,e,n){if(t&&this.$u===t.$u)return d.call(this,t,e,n);var i=this.local(),s=r(t).local();return d.call(i,s,e,n)}}}()}},e={};function n(i){var s=e[i];if(void 0!==s)return s.exports;var r=e[i]={exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";function t(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}function e(t,e,n="beforeend"){e.insertAdjacentElement(n,t.getElement())}class i{getTemplate(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n      <div class="trip-sort__item  trip-sort__item--day">\n        <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>\n        <label class="trip-sort__btn" for="sort-day">Day</label>\n      </div>\n      <div class="trip-sort__item  trip-sort__item--event">\n        <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n        <label class="trip-sort__btn" for="sort-event">Event</label>\n      </div>\n      <div class="trip-sort__item  trip-sort__item--time">\n        <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n        <label class="trip-sort__btn" for="sort-time">Time</label>\n      </div>\n      <div class="trip-sort__item  trip-sort__item--price">\n        <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price">\n        <label class="trip-sort__btn" for="sort-price">Price</label>\n      </div>\n      <div class="trip-sort__item  trip-sort__item--offer">\n        <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n        <label class="trip-sort__btn" for="sort-offer">Offers</label>\n      </div>\n    </form>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}var s=n(484),r=n.n(s),a=n(178),o=n.n(a);const l=["Rubcovsk","Novosibirsk","Barnaul","Moscow","London","Rome","Saint-Petersburg"],u=["Lorem ipsum dolor sit amet.","Phasellus eros mauris.","In rutrum ac purus sit amet tempus."],c=["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.","Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.","Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus."],f=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"],d="DD/MM/YY HH:mm",p="HH:mm",h={basePrice:0,dateFrom:null,dateTo:null,destination:null,isFavorite:!1,offers:[],type:"flight"};r().extend(o());const v=t=>t[Math.floor(Math.random()*t.length)];function m(t,e){return(t=Math.ceil(t))>(e=Math.floor(e))||t<0||e<0?NaN:Math.floor(Math.random()*(e-t+1))+t}const _=({next:t})=>{let e=r()().subtract(m(0,7),"day").toDate();const n=m(0,59),i=m(0,23),s=m(0,7);return t&&(e=r()().add(n,"minute").add(i,"hour").subtract(s,"day").toDate()),e},$=(t,e)=>t?r()(t).format(e):"",g=(t,e)=>t?r()(t).utcOffset(0).format(e):"";class y{constructor({point:t=h,pointDestination:e,pointOffer:n}){this.point=t,this.pointDestination=e,this.pointOffer=n}getTemplate(){return(({point:t=h,pointDestination:e,pointOffer:n})=>{const{dateFrom:i,dateTo:s,type:r,basePrice:a}=t,o=n.find((t=>t.type===r)).offers,l=e.find((e=>e.id===t.destination));return`<li class="trip-events__item">\n    <form class="event event--edit" action="#" method="post">\n      <header class="event__header">\n      ${((t,e)=>{const n=0===t.length?"":t.map((t=>{return`<div class="event__type-item">\n        <input\n          id="event-type-${t.type}-1"\n          class="event__type-input  visually-hidden"\n          type="radio"\n          name="event-type"\n          value="${t.type}"\n          ${t.type===e?"checked":""}\n        >\n        <label class="event__type-label  event__type-label--${t.type}" for="event-type-${t.type}-1">${n=t.type,n.charAt(0).toUpperCase()+n.slice(1)}</label>\n      </div>`;var n})).join("");return`<div class="event__type-wrapper">\n        <label class="event__type  event__type-btn" for="event-type-toggle-1">\n          <span class="visually-hidden">Choose event type</span>\n          <img class="event__type-icon" width="17" height="17" src="img/icons/${e}.png" alt="Event type icon">\n        </label>\n        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">\n        <div class="event__type-list">\n          <fieldset class="event__type-group">\n            <legend class="visually-hidden">Event type</legend>\n              ${n}\n        </div>\n     </div>`})(n,r)}\n\n        <div class="event__field-group  event__field-group--destination">\n          <label class="event__label  event__type-output" for="event-destination-1">\n          ${r}\n          </label>\n          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${l.name}" list="destination-list-1">\n          <datalist id="destination-list-1">\n            <option value="Amsterdam"></option>\n            <option value="Geneva"></option>\n            <option value="Chamonix"></option>\n          </datalist>\n        </div>\n\n        <div class="event__field-group  event__field-group--time">\n          <label class="visually-hidden" for="event-start-time-1">From</label>\n          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${$(i,d)}">\n          &mdash;\n          <label class="visually-hidden" for="event-end-time-1">To</label>\n          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${$(s,d)}">\n        </div>\n\n        <div class="event__field-group  event__field-group--price">\n          <label class="event__label" for="event-price-1">\n            <span class="visually-hidden">Price</span>\n            &euro;\n          </label>\n          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${a}">\n        </div>\n\n        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>\n        <button class="event__reset-btn" type="reset">Cancel</button>\n      </header>\n      <section class="event__details">\n        <section class="event__section  event__section--offers">\n          <h3 class="event__section-title  event__section-title--offers">Offers</h3>\n          <div class="event__available-offers">\n          ${c=o,c.map((t=>{const e=c.includes(t.id)?"":"checked";return`<div class="event__offer-selector">\n    <input class="event__offer-checkbox  visually-hidden" id="${t.id}" type="checkbox" name="${t.id}" ${e}>\n    <label class="event__offer-label" for="${t.id}">\n      <span class="event__offer-title">${t.title}</span>\n      &plus;&euro;&nbsp;\n      <span class="event__offer-price">${t.price}</span>\n    </label>\n      </div>`})).join("")}\n          </div>\n        </section>\n        <section class="event__section  event__section--destination">\n          <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n          <p class="event__destination-description">${l.description}</p>\n          <div class="event__photos-container">\n            ${u=l.pictures,u?`<div class="event__photos-tape">\n    ${u.map((t=>`<img class="event__photo" src="${t.src}" alt="${t.description}">`)).join("")}\n      </div>`:""}\n          </div>\n        </section>\n      </section>\n    </form>\n  </li>`;var u,c})({point:this.point,pointDestination:this.pointDestination,pointOffer:this.pointOffer})}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class b{constructor({point:t=h,pointDestination:e,pointOffer:n}){this.point=t,this.pointDestination=e,this.pointOffer=n}getTemplate(){return(({point:t=h,pointDestination:e,pointOffer:n})=>{const{dateFrom:i,dateTo:s,type:r,basePrice:a,isFavorite:o}=t,l=$(i,p),u=((t,e)=>{let n="";const i=e-t,s=g(i,"HH"),r=g(i,"mm"),a=g(i,"DD");return i<=0?"wrong date":(0!==a&&(n=`${a}d `),0!==s&&(n+=`${s}h `),0!==r&&(n+=`${r}m`),n)})(i,s),c=$(s,p),f=o?"event__favorite-btn event__favorite-btn--active":"event__favorite-btn";return`<li class="trip-events__item">\n      <div class="event">\n        <time class="event__date" datetime="${i}">${$(i,"MMM DD")}</time>\n        <div class="event__type">\n          <img class="event__type-icon" width="42" height="42" src="img/icons/${r}.png" alt="Event type icon">\n        </div>\n        <h3 class="event__title">${r} ${e.name}</h3>\n        <div class="event__schedule">\n          <p class="event__time">\n            <time class="event__start-time" datetime="${i}">${l}</time>\n              &mdash;\n            <time class="event__end-time" datetime="${s}">${c}</time>\n          </p>\n          <p class="event__duration">${u}</p>\n        </div>\n        <p class="event__price">\n          &euro;&nbsp;<span class="event__price-value">${a}</span>\n        </p>\n        <h4 class="visually-hidden">Offers:</h4>\n          ${d=n,`<ul class="event__selected-offers">\n    ${d?`${d.offers.map((t=>`<li class="event__offer">\n        <span class="event__offer-title">${t.title}</span>\n          &plus;&euro;&nbsp;\n        <span class="event__offer-price">${t.price}</span>\n      </li>`)).join("")}`:""}\n  </ul>`}\n        <button class="${f}" type="button">\n          <span class="visually-hidden">Add to favorite</span>\n          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n          </svg>\n        </button>\n        <button class="event__rollup-btn" type="button">\n          <span class="visually-hidden">Open event</span>\n        </button>\n      </div>\n    </li>`;var d})({point:this.point,pointDestination:this.pointDestination,pointOffer:this.pointOffer})}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class M{getTemplate(){return'<ul class="trip-events__list"></ul>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}class D{getTemplate(){return'<div class="point-list-absence">\n      <p>«Click New Event to create your first point»<p>\n     </div>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}}const O=document.querySelector(".page-header").querySelector(".trip-main"),w=document.querySelector(".trip-controls__filters"),S=document.querySelector(".trip-events"),T=new class{constructor(){this.destinations=this.generateDestination(),this.offers=this.generateOffers(),this.points=this.generatePoints()}getDestinations(){return this.destinations}getOffers(){return this.offers}getPoints(){return this.points}generateDestination(){return Array.from({length:5},(()=>(()=>{const t=v(l),e=v(c),n=v(u);return{id:crypto.randomUUID(),description:e,name:t,pictures:[{src:`https://loremflickr.com/248/152?${m(1,400)}`,description:n}]}})()))}generateOffers(){return f.map((t=>({type:t,offers:Array.from({length:m(0,5)},(()=>(t=>({id:crypto.randomUUID(),title:`Offer ${t}`,price:m(1,100)}))(t)))})))}generatePoints(){return Array.from({length:5},(()=>{const t=v(f),e=v(this.destinations),n=m(0,1),i=this.offers.find((e=>e.type===t)),s=n?i.offers.slice(0,m(0,5)).map((t=>t.id)):[];return((t,e,n)=>({id:crypto.randomUUID(),basePrice:m(1,1e4),dateFrom:_({next:!1}),dateTo:_({next:!0}),destination:e,isFavorite:!!m(0,1),offers:n,type:t}))(t,e.id,s)}))}},C=new class{constructor(t){this.service=t,this.points=this.service.getPoints()}get(){return this.points}}(T),x=new class{constructor(t){this.service=t,this.offers=this.service.getOffers()}get(){return this.offers}getByType(t){return this.offers.find((e=>e.type===t))}}(T),E=new class{constructor(t){this.service=t,this.destinations=this.service.getDestinations()}get(){return this.destinations}getById(t){return this.destinations.find((e=>e.id===t))}}(T),H=new class{tripListComponent=new M;constructor({boardContainer:t,pointsModel:e,offersModel:n,destinationsModel:i}){this.boardContainer=t,this.pointsModel=e,this.offersModel=n,this.destinationsModel=i,this.points=[...this.pointsModel.get()]}init(){e(new y({point:this.points[0],pointDestination:this.destinationsModel.get(),pointOffer:this.offersModel.get()}),this.tripListComponent.getElement()),e(new i,this.boardContainer),e(this.tripListComponent,this.boardContainer),this.points.length?this.points.forEach((t=>{e(new b({point:t,pointDestination:this.destinationsModel.getById(t.destination),pointOffer:this.offersModel.getByType(t.type)}),this.tripListComponent.getElement())})):e(new D,this.boardContainer)}}({boardContainer:S,destinationsModel:E,pointsModel:C,offersModel:x});e(new class{getTemplate(){return'<form class="trip-filters" action="#" method="get">\n      <div class="trip-filters__filter">\n        <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>\n          <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n      </div>\n      <div class="trip-filters__filter">\n        <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n        <label class="trip-filters__filter-label" for="filter-future">Future</label>\n      </div>\n      <div class="trip-filters__filter">\n        <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n        <label class="trip-filters__filter-label" for="filter-present">Present</label>\n      </div>\n      <div class="trip-filters__filter">\n        <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">\n        <label class="trip-filters__filter-label" for="filter-past">Past</label>\n      </div>\n      <button class="visually-hidden" type="submit">Accept filter</button>\n    </form>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}},w),e(new class{getTemplate(){return'<section class="trip-main__trip-info  trip-info">\n      <div class="trip-info__main">\n        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n          <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>\n      </div>\n      <p class="trip-info__cost">\n        Total: &euro;&nbsp;\n        <span class="trip-info__cost-value">1230</span>\n      </p>\n    </section>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}},O,"afterbegin"),e(new class{getTemplate(){return'<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow">New event<button>'}getElement(){return this.element||(this.element=t(this.getTemplate())),this.element}removeElement(){this.element=null}},O),H.init()})()})();
//# sourceMappingURL=bundle.2608549ebd7b37ca1e76.js.map