!function(){var e={237:function(){const e=document.querySelector(".search__input-wrapper"),t=e.querySelector("#search"),a=document.querySelector(".history__list"),n=document.querySelector(".search__error"),r=document.querySelector(".search__suggest"),o=document.querySelector(".result"),s=o.querySelector(".result__table"),i=o.querySelector(".result__map"),l=document.querySelector(".settings"),c=(()=>{try{return!!window.localStorage}catch(e){return console.debug(e),!1}})(),u=()=>r.innerHTML="",d=()=>o.classList.remove("result_active"),g=function(){let a=arguments.length>0&&void 0!==arguments[0]&&arguments[0];e.classList.add("search__input-wrapper_loading"),a&&(t.disabled=!0)},h=()=>{e.classList.remove("search__input-wrapper_loading"),t.disabled=!1},p=e=>n.textContent=e,m=()=>{const e=window.localStorage.getItem("search-history");if(!e)return[];try{return JSON.parse(e)}catch(e){return window.localStorage.removeItem("search-history"),console.debug("histoty cleared",e),[]}},v=()=>{if(!c)return void(a.innerHTML='<span style="color: var(--c-main);">В вашем бразуере отключен localStorage :(</span>');a.innerHTML="";let e=m();e=e.slice(0,5),e.forEach((e=>{const t=document.createElement("div");t.textContent=e,t.classList.add("sidebar__block-item"),t.setAttribute("onclick","window.renderResult(this.textContent);"),a.append(t)}))};v();const _=()=>{const e=l.querySelector('input[name="language"]:checked');return e?.value||"en"},y=()=>t.value,f={method:"POST",mode:"cors",headers:{"Content-Type":"application/json",Accept:"application/json",Authorization:"Token 89147d67ecec30829c71feb6b8ebc352a7dd4e7a"},count:10,get body(){return JSON.stringify({query:y(),language:_(),count:this.count,locations:{country:"*"}})}},w=async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10;f.count=e;try{const e=await fetch("https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",f);return e.ok?e.json():void p("Ошибка, проверьте подключение к Интернету и попробуйте снова")}catch(e){return p("Что-то пошло не так, попробуйте обновить страницу"),void console.debug(e)}},b=(S=async()=>{u(),d();const e=y().length;if(!e)return;if(e<3)return void p("Пожалуйста, введите не менее 3 символов в поисковой строке");g();const t=await(async()=>{const e=y();let t=[];if(c){const a=m(),n=new RegExp(`.*(${e}).*`,"i");a.forEach((e=>{n.test(e)&&t.push({history:!0,value:e})})),t=t.slice(0,5)}try{const e=(await w()).suggestions;if(!e)return void p("Ошибка, попробуйте изменить запрос или обновить страницу");if(!e.length)return void p("Не удалось ничего найти, измените запрос и попробуйте снова");for(const a in e)t.push({history:!1,value:e[a].value});return t=t.reduce(((e,t)=>(e.find((e=>e.value===t.value))||e.push(t),e)),[]),t.slice(0,10)}catch(e){return p("Что-то пошло не так, попробуйте обновить страницу"),void console.debug(e)}})();t?(t.forEach((e=>{const t=document.createElement("div");t.textContent=e.value,t.classList.add("search__suggest-item"),e.history&&t.classList.add("search__suggest-item_history"),t.setAttribute("onclick","window.renderResult(this.textContent);"),r.append(t)})),h()):h()},1e3,function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];let n=this.lastCall;this.lastCall=Date.now(),n&&this.lastCall-n<=1e3&&clearTimeout(this.lastCallTimer),this.lastCallTimer=setTimeout((()=>S(...t)),1e3)});var S;window.renderResult=async e=>{t.value=e,u(),g(!0);const a=await(async()=>{try{const e=await w(1);return e.suggestions&&e.suggestions[0]?e.suggestions[0]:void p("Ошибка, попробуйте изменить запрос или обновить страницу")}catch(e){return p("Что-то пошло не так, попробуйте обновить страницу"),void console.debug(e)}})();s.innerHTML="";const n=a.data.geo_lat&&a.data.geo_lon?`${a.data.geo_lat}, ${a.data.geo_lon}`:null;let r=a.data.fias_id,l="ФИАС";r&&(/^\d+$/.test(r)?(r=`<a href="https://www.geonames.org/${r}/" target="_blank">${r}</a>`,l="GeoNames"):/^relation:\d+$/.test(r)?(r=`<a href="https://www.openstreetmap.org/${r.replace(":","/")}/" target="_blank">${r}</a>`,l="OpenStreetMap"):r=`<a href="http://basicdata.ru/online/fias/${r}/" target="_blank">${r}</a>`),[{name:"Полный адрес",value:a.unrestricted_value},{name:"Координаты",value:n?`<a href="https://yandex.ru/maps/?text=${a.data.geo_lat}%2C${a.data.geo_lon}" target="_blank">${n}</a>`:null},{name:"Индекс",value:a.data.postal_code},{name:"Страна",value:a.data.country},{name:"ISO код страны",value:a.data.country_iso_code},{name:"Федеральный округ",value:a.data.federal_district},{name:"Регион",value:a.data.region_with_type},{name:"ISO код региона",value:a.data.region_iso_code},{name:"Город",value:a.data.city},{name:"Улица",value:a.data.street},{name:"Земельный участок",value:a.data.stead},{name:"Дом",value:a.data.house},{name:"Квартира",value:a.data.flat},{name:l,value:r},{name:"КЛАДР",value:a.data.kladr_id},{name:"ОКАТО",value:a.data.okato},{name:"ОКТМО",value:a.data.oktmo},{name:"ИФНС",value:a.data.tax_office}].forEach((e=>{if(!e.value)return;const t=document.createElement("div"),a=document.createElement("div");t.textContent=e.name,a.innerHTML=e.value,s.append(t),s.append(a)})),n?(window.resultMap.setCenter([a.data.geo_lat,a.data.geo_lon],15,{checkZoomRange:!0}),i.classList.add("result__map_active")):i.classList.remove("result__map_active"),c&&(e=>{if(!e)return;const t=m();let a=[e],n=a;if(t.length>0){if(t.includes(e))return;t.unshift(e),n=t}n=JSON.stringify(n);try{window.localStorage.setItem("search-history",n)}catch(e){n=a.slice(0,a.length/2),n=JSON.stringify(n),window.localStorage.setItem("search-history",n),console.debug("reduce history length",e)}v()})(a.value),o.classList.add("result_active"),h()};const k=()=>{h(),n.textContent="",u(),d(),b()};t.addEventListener("input",(()=>k())),t.addEventListener("keyup",(e=>{"Enter"===e.key&&k()})),window.addEventListener("storage",(e=>{console.debug(e),"search-history"===e.key&&v()})),ymaps.ready((()=>{window.resultMap=new ymaps.Map("result-map",{center:["55.608475","-27.669462"],zoom:2,controls:["zoomControl"]},{suppressMapOpenBlock:!0})}))}},t={};function a(n){var r=t[n];if(void 0!==r)return r.exports;var o=t[n]={exports:{}};return e[n](o,o.exports,a),o.exports}a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,{a:t}),t},a.d=function(e,t){for(var n in t)a.o(t,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){"use strict";a(237)}()}();
//# sourceMappingURL=main.22ff7d25ae9f6af6432e.js.map