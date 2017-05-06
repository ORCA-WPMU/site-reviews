!function(e,t,r){"use strict";var s=function(e,t){this.el=e,this.options=t,this.metadata=this.el.getAttribute("data-options"),this.stars=0,this.events={mousemove:this.move.bind(this)},this.init()};s.prototype={defaults:{clearable:!0,initialText:"Click to Rate",onClick:null,showText:!0},init:function(){if("SELECT"===this.el.tagName){for(var e=0;e<this.el.length;e++)if(""!==this.el[e].value){if(isNaN(parseFloat(this.el[e].value))||!isFinite(this.el[e].value))return;this.stars++}if(!(this.stars<1||this.stars>10)){this.config=this._extend({},this.defaults,this.options,this.metadata);var t=this.el.closest("form");return this.build(),this._on("change",this.el,this.change.bind(this)),this._on("mouseenter",this.wrap,this.enter.bind(this)),this._on("mouseleave",this.wrap,this.leave.bind(this)),this._on("click",this.wrap,this.select.bind(this)),t&&this._on("reset",this.el.closest("form"),this.clear.bind(this)),this.current=this.el.options[this.el.selectedIndex].value,this.selected=this.current,this.select(),this}}},build:function(){var e={},t={},r=this._createEl("span",{"class":"gl-star-rating","data-star-rating":""});this.el.parentNode.insertBefore(r,this.el),r.appendChild(this.el),this.wrap=this._insertAfterEl(this.el,"span",{"class":"gl-star-rating-stars"}),this.config.showText&&(this.text=this._insertAfterEl(this.wrap,"span",{"class":"gl-star-rating-text"}));for(var s=0;s<this.el.length;s++)""!==this.el[s].value&&(t[this.el[s].value]=this.el[s].text);Object.keys(t).sort().forEach(function(r){e[r]=t[r]});for(var i in e)this._appendTo(this.wrap,"span",{"data-value":i,"data-text":e[i]})},change:function(){this.show(this.el.options[this.el.selectedIndex].value)},clear:function(e){(this.config.clearable||e!==r)&&(this.el.value="",this.selected="",this.show(0))},enter:function(){var e=this.wrap.getBoundingClientRect();this._on("mousemove",this.wrap,this.events.mousemove),this.offsetLeft=e.left+t.body.scrollLeft},getIndexFromPosition:function(e){return this.star=Math.round(this.wrap.offsetWidth/this.stars),Math.min(Math.ceil(Math.max(e-this.offsetLeft,1)/this.star),this.stars)},leave:function(){this._off("mousemove",this.wrap,this.events.mousemove),this.show(this.selected)},move:function(e){this.show(this.getIndexFromPosition(e.pageX))},select:function(e){var t=this.current;return e!==r&&(t=this.getIndexFromPosition(e.pageX),""!==this.current&&parseFloat(this.selected)===t)?void this.clear():(this.el.value=t,this.selected=t,this.show(t),void(e!==r&&"function"==typeof this.config.onClick&&this.config.onClick(this.el)))},show:function(e){(e<0||""===e)&&(e=0),e>this.stars&&(e=this.stars),this._removeClass(this.wrap,"s"+10*this.current),this._addClass(this.wrap,"s"+10*e),this.config.showText&&(this.text.textContent=e<1?this.config.initialText:this.wrap.childNodes[e-1].dataset.text),this.current=e},_addClass:function(e,t){e.classList?e.classList.add(t):this._hasClass(e,t)||(e.className+=" "+t)},_appendTo:function(e,t,r){var s=this._createEl(t,r);e.innerHTML+=s.outerHTML},_createEl:function(e,r){var s="string"==typeof e?t.createElement(e):e;r=r||{};for(var i in r)s.setAttribute(i,r[i]);return s},_extend:function(){var e=[].slice.call(arguments),t=!1;"boolean"==typeof e[0]&&(t=e.shift());for(var r=e[0],s=e.slice(1),i=s.length,n=0;n<i;n++){var a=s[n];for(var o in a){var c=a[o];if(t&&c&&"object"==typeof c){var l=Array.isArray(c)?[]:{};r[o]=this._extend(!0,l,c)}else r[o]=c}}return r},_hasClass:function(e,t){return e.classList?e.classList.contains(t):new RegExp("\\b"+t+"\\b").test(e.className)},_insertAfterEl:function(e,t,r){var s=this._createEl(t,r);return e.parentNode.insertBefore(s,e.nextSibling),s},_off:function(e,t,r){t.detachEvent?t.detachEvent("on"+e,r):t.removeEventListener(e,r)},_on:function(e,t,r){t.attachEvent?t.attachEvent("on"+e,r):t.addEventListener(e,r)},_removeClass:function(e,t){e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp("\\b"+t+"\\b","g"),"")}},s.defaults=s.prototype.defaults,e.jQuery&&(jQuery.fn.starrating=function(e){return this.each(function(){jQuery.data(this,"plugin_starrating")||jQuery.data(this,"plugin_starrating",new s(this,e))})}),e.StarRating=s}(window,document),this.Element&&!function(e){e.matches=e.matches||e.matchesSelector||e.webkitMatchesSelector||e.msMatchesSelector||function(e){for(var t=this,r=(t.parentNode||t.document).querySelectorAll(e),s=-1;r[++s]&&r[s]!==t;);return!!r[s]},e.closest=e.closest||function(e){for(var t=this;t.matches&&!t.matches(e);)t=t.parentNode;return t.matches?t:null}}(Element.prototype);var GLSR={};GLSR.addClass=function(e,t){e.classList?e.classList.add(t):GLSR.hasClass(e,t)||(e.className+=" "+t)},GLSR.convertValue=function(e){if(GLSR.isNumeric(e))return parseFloat(e);if("true"===e)return!0;if("false"===e)return!1;if(""!==e&&null!==e)return e},GLSR.hasClass=function(e,t){return e.classList?e.classList.contains(t):new RegExp("\\b"+t+"\\b").test(e.className)},GLSR.inArray=function(e,t){for(var r=t.length;r--;)if(t[r]===e)return!0;return!1},GLSR.isNumeric=function(e){return!(isNaN(parseFloat(e))||!isFinite(e))},GLSR.on=function(e,t,r){[].forEach.call(document.querySelectorAll(t),function(t){t.attachEvent?t.attachEvent("on"+e,r):t.addEventListener(e,r)})},GLSR.off=function(e,t,r){[].forEach.call(document.querySelectorAll(t),function(t){t.detachEvent?t.detachEvent("on"+e,r):t.removeEventListener(e,r)})},GLSR.parseFormData=function(e,t){t=!!t||!1;for(var r=/[^\[\]]+/g,s={},i={},n=(function(e,r,s,a){var o=s.shift();if(a=a?a+"."+o:o,s.length)r[o]||(r[o]={}),n(e,r[o],s,a);else{var c=t?GLSR.convertValue(e.value):e.value;if(a in i&&"radio"!==e.type&&!r[o].isArray()?o in r?r[o]=[r[o]]:r[o]=[]:i[a]=!0,GLSR.inArray(e.type,["radio","checkbox"])&&!e.checked)return;r[o]?r[o].push(c):r[o]=c}}),a=0;a<e.length;a++){var o=e[a];if(o.name&&!o.disabled&&!GLSR.inArray(o.type,["file","reset","submit","button"])){var c=o.name.match(r);c.length||(c=[o.name]),n(o,s,c)}}return s},GLSR.postAjax=function(e,t,r){var s="string"!=typeof t?GLSR.serialize(t):t,i=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");return i.open("POST",e),i.onreadystatechange=function(){i.readyState>3&&200===i.status&&r(JSON.parse(i.responseText))},i.setRequestHeader("X-Requested-With","XMLHttpRequest"),i.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),i.send(s),i},GLSR.ready=function(e){"function"==typeof e&&("loading"!==document.readyState?e():document.addEventListener?document.addEventListener("DOMContentLoaded",e):document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&e()}))},GLSR.removeClass=function(e,t){e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp("\\b"+t+"\\b","g"),"")},GLSR.serialize=function(e,t){var r=[];for(var s in e)if(e.hasOwnProperty(s)){var i=t?t+"["+s+"]":s,n=e[s];r.push("object"==typeof n?GLSR.serialize(n,i):encodeURIComponent(i)+"="+encodeURIComponent(n))}return r.join("&")},GLSR.insertAfter=function(e,t,r){var s=GLSR.createEl(t,r);return e.parentNode.insertBefore(s,e.nextSibling),s},GLSR.appendTo=function(e,t,r){var s=GLSR.createEl(t,r);return e.appendChild(s),s},GLSR.createEl=function(e,t){var r="string"==typeof e?document.createElement(e):e;t=t||{};for(var s in t)t.hasOwnProperty(s)&&r.setAttribute(s,t[s]);return r},GLSR.activeForm=null,GLSR.recaptcha={},GLSR.buildFormData=function(e){return void 0===e&&(e=""),{action:site_reviews.action,request:GLSR.parseFormData(GLSR.activeForm),"g-recaptcha-response":e}},GLSR.clearFieldError=function(e){var t=e.closest(".glsr-field");if(null!==t){var r=t.querySelector(".glsr-field-errors");GLSR.removeClass(t,"glsr-has-error"),null!==r&&r.parentNode.removeChild(r)}},GLSR.clearFormErrors=function(){var e=GLSR.activeForm;GLSR.clearFormMessages();for(var t=0;t<e.length;t++)GLSR.clearFieldError(e[t])},GLSR.clearFormMessages=function(){var e=GLSR.activeForm.querySelector(".glsr-form-messages");e&&(e.innerHTML="")},GLSR.enableSubmitButton=function(){GLSR.activeForm.querySelector('[type="submit"]').removeAttribute("disabled")},GLSR.recaptcha.addListeners=function(){var e=GLSR.recaptcha.overlay();"[object HTMLDivElement]"===Object.prototype.toString.call(e)&&(e.addEventListener("click",GLSR.enableSubmitButton,!1),window.addEventListener("keyup",GLSR.recaptcha.onKeyup.bind(e),!1))},GLSR.recaptcha.execute=function(){var e=GLSR.recaptcha.id();return e!==-1?grecaptcha.execute(e):GLSR.submitForm(!1)},GLSR.recaptcha.id=function(){return GLSR.recaptcha.search(function(e,t){if("[object HTMLDivElement]"===Object.prototype.toString.call(e))return e.closest("form")===GLSR.activeForm?t:void 0})},GLSR.recaptcha.onKeyup=function(e){27===e.keyCode&&(GLSR.enableSubmitButton(),GLSR.recaptcha.removeListeners(this))},GLSR.recaptcha.overlay=function(){return GLSR.recaptcha.search(function(e){if("[object Object]"===Object.prototype.toString.call(e)){for(var t in e)if("[object HTMLDivElement]"===Object.prototype.toString.call(e[t])&&""===e[t].className)return e[t].firstChild;return!1}})},GLSR.recaptcha.removeListeners=function(e){e.removeEventListener("click",GLSR.enableSubmitButton,!1),window.removeEventListener("keyup",GLSR.recaptcha.onKeyup,!1)},GLSR.recaptcha.reset=function(){var e=GLSR.recaptcha.id();e!==-1&&grecaptcha.reset(e)},GLSR.recaptcha.search=function(e){var t=-1;if(window.hasOwnProperty("___grecaptcha_cfg")){var r,s,i=window.___grecaptcha_cfg.clients;for(r in i)for(s in i[r])if(t=e(i[r][s],r))return t}return t},GLSR.showFormErrors=function(e){if(e){var t,r;for(var s in e)if(e.hasOwnProperty(s)){t=GLSR.activeForm.querySelector('[name="'+s+'"]').closest(".glsr-field"),GLSR.addClass(t,"glsr-has-error"),r=t.querySelector(".glsr-field-errors"),null===r&&(r=GLSR.appendTo(t,"span",{"class":"glsr-field-errors"}));for(var i=0;i<e[s].errors.length;i++)null!==e[s].errors[i]&&(r.innerHTML+='<span class="glsr-field-error">'+e[s].errors[i]+"</span>")}}},GLSR.showFormMessage=function(e){var t=GLSR.activeForm.querySelector('input[name="form_id"]'),r=GLSR.activeForm.querySelector(".glsr-form-messages");null===r&&(r=GLSR.insertAfter(t,"div",{"class":"glsr-form-messages"})),e.errors?GLSR.addClass(r,"gslr-has-errors"):GLSR.removeClass(r,"gslr-has-errors"),r.innerHTML="<p>"+e.message+"</p>"},GLSR.submitForm=function(e){GLSR.activeForm.querySelector('[type="submit"]').setAttribute("disabled",""),GLSR.postAjax(site_reviews.ajaxurl,GLSR.buildFormData(e),function(e){return e.recaptcha===!0?GLSR.recaptcha.execute():("reset"===e.recaptcha&&GLSR.recaptcha.reset(),e.errors===!1&&(GLSR.recaptcha.reset(),GLSR.activeForm.reset()),GLSR.showFormErrors(e.errors),GLSR.showFormMessage(e),GLSR.enableSubmitButton(),e.form=GLSR.activeForm,document.dispatchEvent(new CustomEvent("site-reviews/after/submission",{detail:e})),void(GLSR.activeForm=null))})},GLSR.on("change","form.glsr-submit-review-form",function(e){GLSR.clearFieldError(e.target)}),GLSR.on("submit","form.glsr-submit-review-form",function(e){GLSR.hasClass(this,"no-ajax")||(e.preventDefault(),GLSR.activeForm=this,GLSR.recaptcha.addListeners(),GLSR.clearFormErrors(),GLSR.submitForm())}),GLSR.on("click",'.glsr-field [type="submit"]',function(){this.closest("form").onsubmit=null,HTMLFormElement.prototype._submit=HTMLFormElement.prototype.submit,HTMLFormElement.prototype.submit=function(){var e=this.querySelector("#g-recaptcha-response");null!==e&&null!==this.querySelector(".glsr-field")||this._submit(),GLSR.submitForm(e.value)}}),GLSR.ready(function(){for(var e=document.querySelectorAll("select.glsr-star-rating"),t=0;t<e.length;t++)new StarRating(e[t],{clearable:!1,showText:!1,onClick:GLSR.clearFieldError})});