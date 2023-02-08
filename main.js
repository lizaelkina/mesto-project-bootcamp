(()=>{"use strict";var e={url:"https://mesto.nomoreparties.co/v1/wbf-cohort-5",headers:{"Content-Type":"application/json",authorization:"96531009-4ee7-4854-9cab-762893291a9b"}},t=document.querySelector(".page"),n=t.querySelector(".content"),r=n.querySelector(".gallery__cards"),o={formSelector:".form",inputSelector:".form__input",inputErrorClass:"form__input_error",textErrorClass:"form__error_active",submitButtonSelector:".popup__btn_type_form",inactiveButtonClass:"popup__btn_disabled"};function c(e,t){t?(e.disabled="disabled",e.textContent="Сохранение..."):(e.disabled=!1,e.textContent="Сохранить")}function a(e){"Escape"===e.key&&s(t.querySelector(".popup_opened"))}function u(){s(t.querySelector(".popup_opened"),!0)}function i(e,t){e.classList.add("popup_opened"),document.addEventListener("keydown",a),e.callback=t;var n=e.querySelector(".popup__btn_type_confirm");null!==n&&n.addEventListener("click",u)}function s(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];e.classList.remove("popup_opened"),document.removeEventListener("keydown",a);var n=e.querySelector(".popup__btn_type_confirm");null!==n&&n.removeEventListener("click",u),void 0!==e.callback&&e.callback(t)}t.querySelectorAll(".popup").forEach((function(e){e.querySelector(".popup__btn-close").addEventListener("click",(function(){return s(e)})),e.addEventListener("mousedown",(function(t){t.target===e&&s(e)}))}));var l,d=document.querySelector("#card-item-template").content,p=t.querySelector(".popup_type_viewer-photo"),_=p.querySelector(".viewer__photo"),f=p.querySelector(".viewer__caption"),y=t.querySelector(".popup_type_confirm");function m(t){var n=d.querySelector(".card").cloneNode(!0),r=n.querySelector(".card__photo"),o=n.querySelector(".card__text"),c=n.querySelector(".card__btn-like"),a=n.querySelector(".card__like-counter"),u=n.querySelector(".card__btn-delete");return r.src=t.link,r.setAttribute("alt",t.name),o.textContent=t.name,a.textContent=t.likes.length,r.addEventListener("click",(function(){_.src=t.link,_.setAttribute("alt",t.name),f.textContent=t.name,i(p)})),t.isLiked&&c.classList.add("card__btn-like_active"),c.addEventListener("click",(function(){var n;t.isLiked?(n=t._id,fetch("".concat(e.url,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка удаления лайка: ".concat(e.status," ").concat(e.statusText))}))).then((function(e){t.isLiked=!1,c.classList.remove("card__btn-like_active"),a.textContent=e.likes.length})).catch((function(e){return console.log(e)})):function(t){return fetch("".concat(e.url,"/cards/likes/").concat(t),{method:"PUT",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка установки лайка: ".concat(e.status," ").concat(e.statusText))}))}(t._id).then((function(e){t.isLiked=!0,c.classList.add("card__btn-like_active"),a.textContent=e.likes.length})).catch((function(e){return console.log(e)}))})),t.isMy?u.addEventListener("click",(function(){i(y,(function(r){var o;r&&(o=t._id,fetch("".concat(e.url,"/cards/").concat(o),{method:"DELETE",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка удаления карточки: ".concat(e.status," ").concat(e.statusText))}))).then((function(){n.remove()})).catch((function(e){return console.log(e)}))}))})):u.remove(),n}function v(e,t,n){e.classList.remove(n.inputErrorClass),t.classList.remove(n.textErrorClass),t.textContent=e.validationMessage}function h(e,t,n){t?(e.disabled=!1,e.classList.remove(n.inactiveButtonClass)):(e.disabled="disabled",e.classList.add(n.inactiveButtonClass))}function S(e,t){e.querySelectorAll(".form__input").forEach((function(n){v(n,e.querySelector(".".concat(n.id,"-error")),t)}))}function q(e){e.isMy=e.owner._id===l._id}function b(e){e.isLiked=e.likes.some((function(e){return e._id===l._id}))}var k=t.querySelector(".popup_type_edit-profile"),E=n.querySelector(".profile__btn-edit"),L=k.querySelector(".form"),x=L.querySelector(".form__input_type_profile-name"),C=L.querySelector(".form__input_type_profile-description"),g=k.querySelector(".popup__btn_type_form"),j=n.querySelector(".profile__title"),T=n.querySelector(".profile__subtitle");function P(e){j.textContent=e}function A(e){T.textContent=e}var w=t.querySelector(".popup_type_update-avatar"),B=n.querySelector(".profile__avatar-btn-add"),D=n.querySelector(".profile__avatar"),M=w.querySelector(".form"),N=w.querySelector(".form__input_type_avatar-url"),O=w.querySelector(".popup__btn_type_form");function J(e){D.src=e}var G=t.querySelector(".popup_type_add-photo"),H=n.querySelector(".profile__btn-add"),z=G.querySelector(".form"),U=G.querySelector(".form__input_type_photo-name"),V=G.querySelector(".form__input_type_photo-url"),F=G.querySelector(".popup__btn_type_form");fetch("".concat(e.url,"/users/me"),{method:"GET",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка получения данных профиля: ".concat(e.status," ").concat(e.statusText))})).then((function(t){l=t,J(t.avatar),P(t.name),A(t.about),fetch("".concat(e.url,"/cards"),{method:"GET",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка получения карточек: ".concat(e.status," ").concat(e.statusText))})).then((function(e){e.forEach((function(e){q(e),b(e);var t=m(e);r.append(t)}))})).catch((function(e){return console.log(e)}))})).catch((function(e){return console.log(e)})),E.addEventListener("click",(function(){x.value=j.textContent,C.value=T.textContent,S(L,o),c(g,!1),h(g,!1,o),i(k)})),L.addEventListener("submit",(function(t){var n,r;t.preventDefault(),c(g,!0),(n=x.value,r=C.value,fetch("".concat(e.url,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:n,about:r})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка обновления профиля: ".concat(e.status," ").concat(e.statusText))}))).then((function(e){P(e.name),A(e.about),s(k)})).catch((function(e){return console.log(e)}))})),B.addEventListener("click",(function(){M.reset(),S(M,o),c(O,!1),h(O,!1,o),i(w)})),M.addEventListener("submit",(function(t){var n;t.preventDefault(),c(O,!0),(n=N.value,fetch("".concat(e.url,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка обновления аватара: ".concat(e.status," ").concat(e.statusText))}))).then((function(e){J(e.avatar),s(w)})).catch((function(e){return console.log(e)}))})),H.addEventListener("click",(function(){z.reset(),S(z,o),c(F,!1),h(F,!1,o),i(G)})),z.addEventListener("submit",(function(t){var n,o;t.preventDefault(),c(F,!0),(n=U.value,o=V.value,fetch("".concat(e.url,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:n,link:o})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка добавления карточки: ".concat(e.status," ").concat(e.statusText))}))).then((function(e){q(e),b(e);var t=m(e);r.prepend(t),s(G)})).catch((function(e){return console.log(e)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){return function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){n.addEventListener("input",(function(){h(r,e.checkValidity(),t),function(e,t,n){var r=t.querySelector(".".concat(e.id,"-error"));e.validity.valid?v(e,r,n):function(e,t,n){e.classList.add(n.inputErrorClass),t.classList.add(n.textErrorClass),t.textContent=e.validationMessage}(e,r,n)}(n,e,t)}))}))}(t,e)}))}(o)})();