(()=>{"use strict";var e,t,r,o={url:"https://mesto.nomoreparties.co/v1/wbf-cohort-5",headers:{"Content-Type":"application/json",authorization:"96531009-4ee7-4854-9cab-762893291a9b"}},n=document.querySelector(".root"),c=document.querySelector(".page"),a=document.querySelector(".content"),i=c.querySelector(".popup_type_edit-profile"),u=a.querySelector(".profile__btn-edit"),l=i.querySelector(".form"),s=l.querySelector(".form__input_type_profile-name"),_=l.querySelector(".form__input_type_profile-description"),p=i.querySelector(".popup__btn_type_form"),d=i.querySelector(".popup__error"),f=a.querySelector(".profile__title"),v=a.querySelector(".profile__subtitle"),y=c.querySelector(".popup_type_update-avatar"),m=a.querySelector(".profile__avatar-btn-add"),h=a.querySelector(".profile__avatar"),S=y.querySelector(".form"),q=y.querySelector(".form__input_type_avatar-url"),k=y.querySelector(".popup__btn_type_form"),b=y.querySelector(".popup__error"),E=c.querySelector(".popup_type_add-photo"),L=a.querySelector(".profile__btn-add"),C=E.querySelector(".form"),g=E.querySelector(".form__input_type_photo-name"),x=E.querySelector(".form__input_type_photo-url"),j=E.querySelector(".popup__btn_type_form"),P=E.querySelector(".popup__error"),T=a.querySelector(".gallery__cards"),A=document.querySelector("#card-item-template").content,w=c.querySelector(".popup_type_viewer-photo"),B=w.querySelector(".viewer__photo"),D=w.querySelector(".viewer__caption"),N=c.querySelector(".popup_type_confirm"),O=N.querySelector(".popup__btn_type_confirm"),J=N.querySelector(".popup__error"),G={formSelector:".form",inputSelector:".form__input",inputErrorClass:"form__input_error",textErrorClass:"form__error_active",submitButtonSelector:".popup__btn_type_form",inactiveButtonClass:"popup__btn_disabled"};function H(e,t,r){e.textContent=r,e.disabled=!!t&&"disabled"}function M(e,t){H(e,t,t?"Сохранение...":"Сохранить")}function z(e,t,r){e.classList.add(t),e.textContent=r}function U(e,t){e.classList.remove(t),e.textContent=""}function V(e){"Escape"===e.key&&I(c.querySelector(".popup_opened"))}function F(e){e.classList.add("popup_opened"),n.classList.add("root_popup-open"),document.addEventListener("keydown",V)}function I(e){e.classList.remove("popup_opened"),n.classList.remove("root_popup-open"),document.removeEventListener("keydown",V)}function K(e,t,r,o,n){var c=A.querySelector(".card").cloneNode(!0);e.element=c;var a=c.querySelector(".card__photo"),i=c.querySelector(".card__text"),u=c.querySelector(".card__btn-like"),l=c.querySelector(".card__like-counter"),s=c.querySelector(".card__btn-delete");return a.src=e.link,a.setAttribute("alt",e.name),i.textContent=e.name,l.textContent=e.likes.length,function(e,t){return e.likes.some((function(e){return e._id===t}))}(e,t)&&u.classList.add("card__btn-like_active"),function(e,t){return e.owner._id===t}(e,t)?s.addEventListener("click",(function(){o(e,c)})):s.remove(),a.addEventListener("click",(function(){r(e)})),u.addEventListener("click",(function(){n(e,c,u.classList.contains("card__btn-like_active"))})),c}function Q(e,t){var r=e.querySelector(".card__btn-like"),o=e.querySelector(".card__like-counter");r.classList.toggle("card__btn-like_active"),o.textContent=t.length}function R(e,t,r){e.classList.remove(r.inputErrorClass),t.classList.remove(r.textErrorClass),t.textContent=e.validationMessage}function W(e,t,r){t?(e.disabled=!1,e.classList.remove(r.inactiveButtonClass)):(e.disabled="disabled",e.classList.add(r.inactiveButtonClass))}function X(e,t){e.querySelectorAll(".form__input").forEach((function(r){R(r,e.querySelector(".".concat(r.id,"-error")),t)}))}function Y(e){B.src=e.link,B.setAttribute("alt",e.name),D.textContent=e.name,F(w)}function Z(r,o){e=r,t=o,U(J,"popup__error_active"),F(N)}function $(e,t,r){var n,c=t.querySelector(".card__error-like");r?(n=e._id,fetch("".concat(o.url,"/cards/likes/").concat(n),{method:"DELETE",headers:o.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка удаления лайка: ".concat(e.status,"."))}))).then((function(e){Q(t,e.likes)})).catch((function(e){console.log(e),z(c,"card__error-like_active",e)})).finally((function(){setTimeout((function(){return U(c,"card__error-like_active")}),1500)})):function(e){return fetch("".concat(o.url,"/cards/likes/").concat(e),{method:"PUT",headers:o.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка установки лайка: ".concat(e.status,"."))}))}(e._id).then((function(e){Q(t,e.likes)})).catch((function(e){console.log(e),z(c,"card__error-like_active",e)})).finally((function(){setTimeout((function(){return U(c,"card__error-like_active")}),1500)}))}function ee(e){f.textContent=e}function te(e){v.textContent=e}function re(e){h.src=e}c.querySelectorAll(".popup").forEach((function(e){e.querySelector(".popup__btn-close").addEventListener("click",(function(){return I(e)})),e.addEventListener("mousedown",(function(t){t.target===e&&I(e)}))})),O.addEventListener("click",(function(){var r;H(O,!0,"Удаление..."),U(J,"popup__error_active"),(r=e._id,fetch("".concat(o.url,"/cards/").concat(r),{method:"DELETE",headers:o.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка удаления карточки: ".concat(e.status,". Попробуйте ещё раз."))}))).then((function(){t.remove(),I(N)})).catch((function(e){console.log(e),z(J,"popup__error_active",e)})).finally((function(){return H(O,!1,"Да")}))})),Promise.all([fetch("".concat(o.url,"/users/me"),{method:"GET",headers:o.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка отображения данных: ".concat(e.status,". Попробуйте перезагрузить страницу."))})),fetch("".concat(o.url,"/cards"),{method:"GET",headers:o.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка отображения данных: ".concat(e.status,". Попробуйте перезагрузить страницу."))}))]).then((function(e){var t=e[0];r=t._id,re(t.avatar),ee(t.name),te(t.about),e[1].forEach((function(e){var t=K(e,r,Y,Z,$);T.append(t)}))})).catch((function(e){console.log(e),function(e){a.classList.add("content_inactive");var t=document.createElement("section");t.classList.add("content__error"),t.textContent=e,a.prepend(t)}(e)})),u.addEventListener("click",(function(){s.value=f.textContent,_.value=v.textContent,X(l,G),U(d,"popup__error_active"),W(p,!1,G),F(i)})),l.addEventListener("submit",(function(e){var t,r;e.preventDefault(),M(p,!0),U(d,"popup__error_active"),(t=s.value,r=_.value,fetch("".concat(o.url,"/users/me"),{method:"PATCH",headers:o.headers,body:JSON.stringify({name:t,about:r})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка обновления профиля: ".concat(e.status,". Попробуйте ещё раз."))}))).then((function(e){ee(e.name),te(e.about),I(i)})).catch((function(e){console.log(e),z(d,"popup__error_active",e)})).finally((function(){M(p,!1)}))})),m.addEventListener("click",(function(){S.reset(),X(S,G),U(b,"popup__error_active"),W(k,!1,G),F(y)})),S.addEventListener("submit",(function(e){var t;e.preventDefault(),M(k,!0),U(b,"popup__error_active"),(t=q.value,fetch("".concat(o.url,"/users/me/avatar"),{method:"PATCH",headers:o.headers,body:JSON.stringify({avatar:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка обновления аватара: ".concat(e.status,". Попробуйте ещё раз."))}))).then((function(e){re(e.avatar),I(y)})).catch((function(e){console.log(e),z(b,"popup__error_active",e)})).finally((function(){M(k,!1)}))})),L.addEventListener("click",(function(){C.reset(),X(C,G),U(P,"popup__error_active"),W(j,!1,G),F(E)})),C.addEventListener("submit",(function(e){var t,n;e.preventDefault(),M(j,!0),U(P,"popup__error_active"),(t=g.value,n=x.value,fetch("".concat(o.url,"/cards"),{method:"POST",headers:o.headers,body:JSON.stringify({name:t,link:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка добавления карточки: ".concat(e.status,". Попробуйте ещё раз."))}))).then((function(e){var t=K(e,r,Y,Z,$);T.prepend(t),I(E)})).catch((function(e){console.log(e),z(P,"popup__error_active",e)})).finally((function(){M(j,!1)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){return function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);r.forEach((function(r){r.addEventListener("input",(function(){W(o,e.checkValidity(),t),function(e,t,r){var o=t.querySelector(".".concat(e.id,"-error"));e.validity.valid?R(e,o,r):function(e,t,r){e.classList.add(r.inputErrorClass),t.classList.add(r.textErrorClass),t.textContent=e.validationMessage}(e,o,r)}(r,e,t)}))}))}(t,e)}))}(G)})();