(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),window.addEventListener("keydown",n)}function t(e){e.classList.remove("popup_is-opened"),window.removeEventListener("keydown",n)}function n(e){if("Escape"===e.key){var n=document.querySelector(".popup_is-opened");n&&t(n)}}function r(e){e.target.classList.contains("popup_is-opened")&&t(e.target)}var o={baseUrl:"https://nomoreparties.co/v1/wff-cohort-33",headers:{authorization:"b06e1f78-c3e2-417a-bad6-e3883c876980","Content-Type":"application/json"}};function c(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.removeCardCb,r=t.openImageCb,c=t.toggleLikeCb,a=t.cardTemplate,u=t.userId,i=a.content.querySelector(".card").cloneNode(!0),s=i.querySelector(".card__delete-button"),l=i.querySelector(".card__like-button"),d=i.querySelector(".card__title"),p=i.querySelector(".card__image"),f=i.querySelector(".card__like-count"),m=e.likes.length;f.textContent=m,e.likes.some((function(e){return e._id===u}))&&l.classList.add("card__like-button_is-active");var v=e.owner._id===u;return v||s.remove(),p.src=e.link,p.alt=e.name,d.textContent=e.name,v&&s.addEventListener("click",(function(){var t;(t=e._id,fetch("".concat(o.baseUrl,"/cards/").concat(t),{headers:o.headers,method:"DELETE"}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){n(i)})).catch((function(e){console.log(e)}))})),l.addEventListener("click",(function(){c(l,e._id,f)})),p.addEventListener("click",(function(){return r(e)})),i}function a(e){e.remove()}function u(e,t,n){e.classList.toggle("card__like-button_is-active"),e.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e," "),{headers:o.headers,method:"PUT"}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(t).then((function(e){var t=e.likes.length;n.textContent=t})).catch((function(e){console.log(e)})):function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e," "),{headers:o.headers,method:"DELETE"}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(t).then((function(e){var t=e.likes.length;n.textContent=t})).catch((function(e){console.log(e)}))}var i=function(e,t,n){var r=e.querySelector(".".concat(t.name,"-input-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},s=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n.inactiveButtonClass),t.removeAttribute("disabled")):(t.classList.add(n.inactiveButtonClass),t.setAttribute("disabled",!0))},l=function(e,t){Array.from(e.querySelectorAll(t.inputSelector)).forEach((function(n){return i(e,n,t)}));var n=e.querySelector(t.submitButtonSelector);n.classList.add(t.inactiveButtonClass),n.setAttribute("disabled",!0)};function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}Promise.all([fetch("".concat(o.baseUrl,"/users/me"),{headers:o.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(o.baseUrl,"/cards"),{headers:o.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){s=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],i=r[1];y.textContent=o.name,p.style.backgroundImage="url(".concat(o.avatar,")"),h.textContent=o.about,window.userId=o._id,i.forEach((function(e){var t=c(e,{removeCardCb:a,openImageCb:O,toggleLikeCb:u,userId:window.userId,cardTemplate:B});w.appendChild(t)}))})).catch((function(e){console.log(e)}));var p=document.querySelector(".profile__image"),f=document.querySelector(".popup_type_new-card"),m=document.querySelector(".popup_type_edit"),v=document.querySelector(".popup_type_image"),_=document.querySelector(".popup_type_avatar"),y=document.querySelector(".profile__title"),h=document.querySelector(".profile__description"),b=v.querySelector(".popup__caption"),S=document.querySelector('form[name="edit-profile"]'),C=document.querySelector('form[name="new-place"]'),g=document.querySelector('form[name="edit-avatar"]'),k=S.querySelector(".popup__input_type_name"),q=S.querySelector(".popup__input_type_description"),E=C.querySelector(".popup__input_type_card-name"),L=C.querySelector(".popup__input_type_url"),j=g.querySelector(".popup__input_type_avatar_url"),w=document.querySelector(".places__list"),x=document.querySelector(".profile__edit-button"),A=document.querySelector(".profile__add-button"),I=S.querySelector(".popup__button"),P=C.querySelector(".popup__button"),T=g.querySelector(".popup__button"),U=v.querySelector(".popup__image"),B=document.getElementById("card-template");function O(t){U.setAttribute("src",t.link),U.setAttribute("alt",t.name),b.textContent=t.name,e(v)}function D(e){e.reset()}x.addEventListener("click",(function(){k.value=y.textContent,q.value=h.textContent,l(S,N),e(m)})),A.addEventListener("click",(function(){D(C),l(C,N),e(f)})),p.addEventListener("click",(function(){D(g),l(g,N),e(_)})),S.addEventListener("submit",(function(e){var n,r,c;e.preventDefault(),I.textContent="Сохранение...",I.style.pointerEvents="none",(n={name:k.value,about:q.value},r=n.name,c=n.about,fetch("".concat(o.baseUrl,"/users/me"),{headers:o.headers,method:"PATCH",body:JSON.stringify({name:r,about:c})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){y.textContent=k.value,h.textContent=q.value,t(m)})).catch((function(e){console.log(e)})).finally((function(){I.textContent="Сохранить",I.style.pointerEvents="all"}))})),C.addEventListener("submit",(function(e){var n,r,i;e.preventDefault(),P.textContent="Создание...",P.style.pointerEvents="none",(n={name:E.value,link:L.value},r=n.name,i=n.link,fetch("".concat(o.baseUrl,"/cards"),{headers:o.headers,method:"POST",body:JSON.stringify({name:r,link:i})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){var n=c(e,{removeCardCb:a,openImageCb:O,toggleLikeCb:u,userId:window.userId,cardTemplate:B});w.prepend(n),D(C),t(f)})).catch((function(e){console.log(e)})).finally((function(){P.textContent="Создать",P.style.pointerEvents="all"}))})),g.addEventListener("submit",(function(e){var n;e.preventDefault(),T.textContent="Сохранение...",T.style.pointerEvents="none",(n=j.value,fetch("".concat(o.baseUrl,"/users/me/avatar "),{headers:o.headers,method:"PATCH",body:JSON.stringify({avatar:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){p.style.backgroundImage="url(".concat(j.value,")"),t(_)})).catch((function(e){console.log(e)})).finally((function(){T.textContent="Сохранить",T.style.pointerEvents="all"}))})),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("mousedown",r),e.querySelector(".popup__close").addEventListener("click",(function(){return t(e)}))}));var N={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){return e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);s(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы"):t.setCustomValidity(""),t.validity.valid?i(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.name,"-input-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),s(n,r,t)}))}))}(t,e)}))}(N)})();