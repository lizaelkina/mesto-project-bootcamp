(()=>{"use strict";var e,t,n,r={url:"https://mesto.nomoreparties.co/v1/wbf-cohort-5",headers:{"Content-Type":"application/json",authorization:"96531009-4ee7-4854-9cab-762893291a9b"}},o=document.querySelector(".page"),c=o.querySelector(".content"),a=o.querySelector(".popup_type_edit-profile"),u=c.querySelector(".profile__btn-edit"),i=a.querySelector(".form"),s=i.querySelector(".form__input_type_profile-name"),l=i.querySelector(".form__input_type_profile-description"),d=a.querySelector(".popup__btn_type_form"),f=c.querySelector(".profile__title"),_=c.querySelector(".profile__subtitle"),p=o.querySelector(".popup_type_update-avatar"),m=c.querySelector(".profile__avatar-btn-add"),y=c.querySelector(".profile__avatar"),h=p.querySelector(".form"),v=p.querySelector(".form__input_type_avatar-url"),S=p.querySelector(".popup__btn_type_form"),q=o.querySelector(".popup_type_add-photo"),b=c.querySelector(".profile__btn-add"),k=q.querySelector(".form"),E=q.querySelector(".form__input_type_photo-name"),L=q.querySelector(".form__input_type_photo-url"),x=q.querySelector(".popup__btn_type_form"),C=c.querySelector(".gallery__cards"),g=document.querySelector("#card-item-template").content,j=o.querySelector(".popup_type_viewer-photo"),T=j.querySelector(".viewer__photo"),P=j.querySelector(".viewer__caption"),A=o.querySelector(".popup_type_confirm"),w=A.querySelector(".popup__btn_type_confirm"),B={formSelector:".form",inputSelector:".form__input",inputErrorClass:"form__input_error",textErrorClass:"form__error_active",submitButtonSelector:".popup__btn_type_form",inactiveButtonClass:"popup__btn_disabled"};function D(e,t,n){e.textContent=n,e.disabled=!!t&&"disabled"}function N(e,t){D(e,t,t?"Сохранение...":"Сохранить")}function O(e){"Escape"===e.key&&G(o.querySelector(".popup_opened"))}function J(e){e.classList.add("popup_opened"),document.addEventListener("keydown",O)}function G(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",O)}function H(e,t,n,o){var c=g.querySelector(".card").cloneNode(!0);e.element=c;var a=c.querySelector(".card__photo"),u=c.querySelector(".card__text"),i=c.querySelector(".card__btn-like"),s=c.querySelector(".card__like-counter"),l=c.querySelector(".card__btn-delete");return a.src=e.link,a.setAttribute("alt",e.name),u.textContent=e.name,s.textContent=e.likes.length,a.addEventListener("click",(function(){n(e)})),function(e,t){return e.likes.some((function(e){return e._id===t}))}(e,t)&&i.classList.add("card__btn-like_active"),i.addEventListener("click",(function(){var t;i.classList.contains("card__btn-like_active")?(t=e._id,fetch("".concat(r.url,"/cards/likes/").concat(t),{method:"DELETE",headers:r.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка удаления лайка: ".concat(e.status," ").concat(e.statusText))}))).then((function(e){i.classList.remove("card__btn-like_active"),s.textContent=e.likes.length})).catch((function(e){return console.log(e)})):function(e){return fetch("".concat(r.url,"/cards/likes/").concat(e),{method:"PUT",headers:r.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка установки лайка: ".concat(e.status," ").concat(e.statusText))}))}(e._id).then((function(e){i.classList.add("card__btn-like_active"),s.textContent=e.likes.length})).catch((function(e){return console.log(e)}))})),function(e,t){return e.owner._id===t}(e,t)?l.addEventListener("click",(function(){o(e,c)})):l.remove(),c}function M(e,t,n){e.classList.remove(n.inputErrorClass),t.classList.remove(n.textErrorClass),t.textContent=e.validationMessage}function z(e,t,n){t?(e.disabled=!1,e.classList.remove(n.inactiveButtonClass)):(e.disabled="disabled",e.classList.add(n.inactiveButtonClass))}function U(e,t){e.querySelectorAll(".form__input").forEach((function(n){M(n,e.querySelector(".".concat(n.id,"-error")),t)}))}function V(e){T.src=e.link,T.setAttribute("alt",e.name),P.textContent=e.name,J(j)}function F(n,r){e=n,t=r,J(A)}function I(e){f.textContent=e}function K(e){_.textContent=e}function Q(e){y.src=e}o.querySelectorAll(".popup").forEach((function(e){e.querySelector(".popup__btn-close").addEventListener("click",(function(){return G(e)})),e.addEventListener("mousedown",(function(t){t.target===e&&G(e)}))})),w.addEventListener("click",(function(){var n;D(w,!0,"Удаление..."),(n=e._id,fetch("".concat(r.url,"/cards/").concat(n),{method:"DELETE",headers:r.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка удаления карточки: ".concat(e.status," ").concat(e.statusText))}))).then((function(){t.remove(),G(A)})).catch((function(e){return console.log(e)})).finally((function(){return D(w,!1,"Да")}))})),Promise.all([fetch("".concat(r.url,"/users/me"),{method:"GET",headers:r.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка получения данных профиля: ".concat(e.status," ").concat(e.statusText))})),fetch("".concat(r.url,"/cards"),{method:"GET",headers:r.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка получения карточек: ".concat(e.status," ").concat(e.statusText))}))]).then((function(e){var t=e[0];n=t._id,Q(t.avatar),I(t.name),K(t.about),e[1].forEach((function(e){var t=H(e,n,V,F);C.append(t)}))})).catch((function(e){return console.log(e)})),u.addEventListener("click",(function(){s.value=f.textContent,l.value=_.textContent,U(i,B),z(d,!1,B),J(a)})),i.addEventListener("submit",(function(e){var t,n;e.preventDefault(),N(d,!0),(t=s.value,n=l.value,fetch("".concat(r.url,"/users/me1"),{method:"PATCH",headers:r.headers,body:JSON.stringify({name:t,about:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка обновления профиля: ".concat(e.status," ").concat(e.statusText))}))).then((function(e){I(e.name),K(e.about),G(a)})).catch((function(e){return console.log(e)})).finally((function(){return N(d,!1)}))})),m.addEventListener("click",(function(){h.reset(),U(h,B),z(S,!1,B),J(p)})),h.addEventListener("submit",(function(e){var t;e.preventDefault(),N(S,!0),(t=v.value,fetch("".concat(r.url,"/users/me/avatar"),{method:"PATCH",headers:r.headers,body:JSON.stringify({avatar:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка обновления аватара: ".concat(e.status," ").concat(e.statusText))}))).then((function(e){Q(e.avatar),G(p)})).catch((function(e){return console.log(e)})).finally((function(){return N(S,!1)}))})),b.addEventListener("click",(function(){k.reset(),U(k,B),z(x,!1,B),J(q)})),k.addEventListener("submit",(function(e){var t,o;e.preventDefault(),N(x,!0),(t=E.value,o=L.value,fetch("".concat(r.url,"/cards"),{method:"POST",headers:r.headers,body:JSON.stringify({name:t,link:o})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка добавления карточки: ".concat(e.status," ").concat(e.statusText))}))).then((function(e){var t=H(e,n,V,F);C.prepend(t),G(q)})).catch((function(e){return console.log(e)})).finally((function(){return N(x,!1)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){return function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){n.addEventListener("input",(function(){z(r,e.checkValidity(),t),function(e,t,n){var r=t.querySelector(".".concat(e.id,"-error"));e.validity.valid?M(e,r,n):function(e,t,n){e.classList.add(n.inputErrorClass),t.classList.add(n.textErrorClass),t.textContent=e.validationMessage}(e,r,n)}(n,e,t)}))}))}(t,e)}))}(B)})();