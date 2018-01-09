!function(t,e,s){"use strict";var n=function(t,e){this.el=t,this.options=e,this.metadata=this.el.getAttribute("data-options"),this.stars=0,this.events={mousemove:this.move.bind(this)},this.init()};n.prototype={defaults:{clearable:!0,initialText:"Click to Rate",onClick:null,showText:!0},init:function(){if("SELECT"===this.el.tagName){for(var t=0;t<this.el.length;t++)if(""!==this.el[t].value){if(isNaN(parseFloat(this.el[t].value))||!isFinite(this.el[t].value))return;this.stars++}if(!(this.stars<1||this.stars>10)){this.config=this._extend({},this.defaults,this.options,this.metadata);var e=this.el.closest("form");return this.build(),this._on("change",this.el,this.change.bind(this)),this._on("mouseenter",this.wrap,this.enter.bind(this)),this._on("mouseleave",this.wrap,this.leave.bind(this)),this._on("click",this.wrap,this.select.bind(this)),e&&this._on("reset",this.el.closest("form"),this.clear.bind(this)),this.current=this.el.options[this.el.selectedIndex].value,this.selected=this.current,this.select(),this}}},build:function(){var t={},e={},s=this._createEl("span",{"class":"gl-star-rating","data-star-rating":""});this.el.parentNode.insertBefore(s,this.el),s.appendChild(this.el),this.wrap=this._insertAfterEl(this.el,"span",{"class":"gl-star-rating-stars"}),this.config.showText&&(this.text=this._insertAfterEl(this.wrap,"span",{"class":"gl-star-rating-text"}));for(var n=0;n<this.el.length;n++)""!==this.el[n].value&&(e[this.el[n].value]=this.el[n].text);Object.keys(e).sort().forEach(function(s){t[s]=e[s]});for(var i in t)this._appendTo(this.wrap,"span",{"data-value":i,"data-text":t[i]})},change:function(){this.show(this.el.options[this.el.selectedIndex].value)},clear:function(t){(this.config.clearable||t!==s)&&(this.el.value="",this.selected="",this.show(0))},enter:function(){var t=this.wrap.getBoundingClientRect();this._on("mousemove",this.wrap,this.events.mousemove),this.offsetLeft=t.left+e.body.scrollLeft},getIndexFromPosition:function(t){return this.star=Math.round(this.wrap.offsetWidth/this.stars),Math.min(Math.ceil(Math.max(t-this.offsetLeft,1)/this.star),this.stars)},leave:function(){this._off("mousemove",this.wrap,this.events.mousemove),this.show(this.selected)},move:function(t){this.show(this.getIndexFromPosition(t.pageX))},select:function(t){var e=this.current;return t!==s&&(e=this.getIndexFromPosition(t.pageX),""!==this.current&&parseFloat(this.selected)===e)?void this.clear():(this.el.value=e,this.selected=e,this.show(e),void(t!==s&&"function"==typeof this.config.onClick&&this.config.onClick(this.el)))},show:function(t){(t<0||""===t)&&(t=0),t>this.stars&&(t=this.stars),this._removeClass(this.wrap,"s"+10*this.current),this._addClass(this.wrap,"s"+10*t),this.config.showText&&(this.text.textContent=t<1?this.config.initialText:this.wrap.childNodes[t-1].dataset.text),this.current=t},_addClass:function(t,e){t.classList?t.classList.add(e):this._hasClass(t,e)||(t.className+=" "+e)},_appendTo:function(t,e,s){var n=this._createEl(e,s);t.innerHTML+=n.outerHTML},_createEl:function(t,s){var n="string"==typeof t?e.createElement(t):t;s=s||{};for(var i in s)n.setAttribute(i,s[i]);return n},_extend:function(){var t=[].slice.call(arguments),e=!1;"boolean"==typeof t[0]&&(e=t.shift());for(var s=t[0],n=t.slice(1),i=n.length,r=0;r<i;r++){var a=n[r];for(var o in a){var l=a[o];if(e&&l&&"object"==typeof l){var c=Array.isArray(l)?[]:{};s[o]=this._extend(!0,c,l)}else s[o]=l}}return s},_hasClass:function(t,e){return t.classList?t.classList.contains(e):new RegExp("\\b"+e+"\\b").test(t.className)},_insertAfterEl:function(t,e,s){var n=this._createEl(e,s);return t.parentNode.insertBefore(n,t.nextSibling),n},_off:function(t,e,s){e.detachEvent?e.detachEvent("on"+t,s):e.removeEventListener(t,s)},_on:function(t,e,s){e.attachEvent?e.attachEvent("on"+t,s):e.addEventListener(t,s)},_removeClass:function(t,e){t.classList?t.classList.remove(e):t.className=t.className.replace(new RegExp("\\b"+e+"\\b","g"),"")}},n.defaults=n.prototype.defaults,t.jQuery&&(jQuery.fn.starrating=function(t){return this.each(function(){jQuery.data(this,"plugin_starrating")||jQuery.data(this,"plugin_starrating",new n(this,t))})}),t.StarRating=n}(window,document),this.Element&&!function(t){t.matches=t.matches||t.matchesSelector||t.webkitMatchesSelector||t.msMatchesSelector||function(t){for(var e=this,s=(e.parentNode||e.document).querySelectorAll(t),n=-1;s[++n]&&s[n]!==e;);return!!s[n]},t.closest=t.closest||function(t){for(var e=this;e.matches&&!e.matches(t);)e=e.parentNode;return e.matches?e:null}}(Element.prototype);var GLSR={};GLSR.addClass=function(t,e){t.classList?t.classList.add(e):GLSR.hasClass(t,e)||(t.className+=" "+e)},GLSR.convertValue=function(t){if(GLSR.isNumeric(t))return parseFloat(t);if("true"===t)return!0;if("false"===t)return!1;if(""!==t&&null!==t)return t},GLSR.getAjax=function(t,e){var s=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");return s.open("GET",t),s.onreadystatechange=function(){s.readyState>3&&200===s.status&&e(s.responseText)},s.setRequestHeader("X-Requested-With","XMLHttpRequest"),s.send(),s},GLSR.hasClass=function(t,e){return t.classList?t.classList.contains(e):new RegExp("\\b"+e+"\\b").test(t.className)},GLSR.inArray=function(t,e){for(var s=e.length;s--;)if(e[s]===t)return!0;return!1},GLSR.isNumeric=function(t){return!(isNaN(parseFloat(t))||!isFinite(t))},GLSR.isString=function(t){return"[object String]"===Object.prototype.toString.call(t)},GLSR.on=function(t,e,s){GLSR.isString(e)&&(e=document.querySelectorAll(e)),[].forEach.call(e,function(e){e.addEventListener(t,s)})},GLSR.off=function(t,e,s){GLSR.isString(e)&&(e=document.querySelectorAll(e)),[].forEach.call(e,function(e){e.removeEventListener(t,s)})},GLSR.parseFormData=function(t,e){e=!!e||!1;for(var s=/[^\[\]]+/g,n={},i={},r=(function(t,s,n,a){var o=n.shift();if(a=a?a+"."+o:o,n.length)s[o]||(s[o]={}),r(t,s[o],n,a);else{var l=e?GLSR.convertValue(t.value):t.value;if(a in i&&"radio"!==t.type&&!s[o].isArray()?o in s?s[o]=[s[o]]:s[o]=[]:i[a]=!0,GLSR.inArray(t.type,["radio","checkbox"])&&!t.checked)return;s[o]?s[o].push(l):s[o]=l}}),a=0;a<t.length;a++){var o=t[a];if(o.name&&!o.disabled&&!GLSR.inArray(o.type,["file","reset","submit","button"])){var l=o.name.match(s);l.length||(l=[o.name]),r(o,n,l)}}return n},GLSR.postAjax=function(t,e,s){var n="string"!=typeof e?GLSR.serialize(e):e,i=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP");return i.open("POST",t),i.onreadystatechange=function(){i.readyState>3&&200===i.status&&s(JSON.parse(i.responseText))},i.setRequestHeader("X-Requested-With","XMLHttpRequest"),i.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),i.send(n),i},GLSR.ready=function(t){"function"==typeof t&&("loading"!==document.readyState?t():document.addEventListener?document.addEventListener("DOMContentLoaded",t):document.attachEvent("onreadystatechange",function(){"complete"===document.readyState&&t()}))},GLSR.removeClass=function(t,e){t.classList?t.classList.remove(e):t.className=t.className.replace(new RegExp("\\b"+e+"\\b","g"),"")},GLSR.serialize=function(t,e){var s=[];for(var n in t)if(t.hasOwnProperty(n)){var i=e?e+"["+n+"]":n,r=t[n];s.push("object"==typeof r?GLSR.serialize(r,i):encodeURIComponent(i)+"="+encodeURIComponent(r))}return s.join("&")},GLSR.toggleClass=function(t,e){GLSR.hasClass(t,e)?GLSR.removeClass(t,e):GLSR.addClass(t,e)},GLSR.insertAfter=function(t,e,s){var n=GLSR.createEl(e,s);return t.parentNode.insertBefore(n,t.nextSibling),n},GLSR.appendTo=function(t,e,s){var n=GLSR.createEl(e,s);return t.appendChild(n),n},GLSR.createEl=function(t,e){var s="string"==typeof t?document.createElement(t):t;e=e||{};for(var n in e)e.hasOwnProperty(n)&&s.setAttribute(n,e[n]);return s},GLSR.SCROLL_TIME=468,GLSR.createExceprts=function(t){t=t||document;for(var e=t.querySelectorAll(".glsr-hidden-text"),s=0;s<e.length;s++){var n=GLSR.insertAfter(e[s],"span",{"class":"glsr-read-more"}),i=GLSR.appendTo(n,"a",{href:"#","data-text":e[s].getAttribute("data-show-less")});i.innerHTML=e[s].getAttribute("data-show-more")}GLSR.on("click",".glsr-read-more a",GLSR.onClickReadMore)},GLSR.createStarRatings=function(){for(var t=document.querySelectorAll("select.glsr-star-rating"),e=0;e<t.length;e++)new StarRating(t[e],{clearable:!1,showText:!1,onClick:GLSR.clearFieldError})},GLSR.getSelectorOfElement=function(t){if(t&&t.nodeType===t.ELEMENT_NODE)return t.nodeName.toLowerCase()+(t.id?"#"+t.id.trim():"")+(t.className?"."+t.className.trim().replace(/\s+/g,"."):"")},GLSR.now=function(){return window.performance&&window.performance.now?window.performance.now():Date.now()},GLSR.onClickPagination=function(t){t.preventDefault();var e=this.closest(".glsr-reviews"),s=GLSR.getSelectorOfElement(e);GLSR.addClass(e,"glsr-hide"),GLSR.getAjax(this.href,function(n){var i=document.implementation.createHTMLDocument("new");i.documentElement.innerHTML=n;var r=s?i.querySelectorAll(s):"";return 1===r.length?(e.innerHTML=r[0].innerHTML,GLSR.scrollToTop(e),GLSR.removeClass(e,"glsr-hide"),GLSR.on("click",".glsr-ajax-navigation a",GLSR.onClickPagination),window.history.pushState(null,"",t.target.href),void GLSR.createExceprts(e)):void(window.location=t.target.href)})},GLSR.onClickReadMore=function(t){t.preventDefault();var e=t.target,s=e.parentNode.previousSibling,n=e.getAttribute("data-text");GLSR.toggleClass(s,"glsr-hidden"),GLSR.toggleClass(s,"glsr-visible"),e.setAttribute("data-text",e.innerText),e.innerText=n},GLSR.scrollToTop=function(t,e){e=e||16;for(var s,n=0;n<site_reviews.ajaxpagination.length;n++)s=document.querySelector(site_reviews.ajaxpagination[n]),s&&"fixed"===window.getComputedStyle(s).getPropertyValue("position")&&(e+=s.clientHeight);var i=t.getBoundingClientRect(),r=i.top-e;if(!(r>0))return"requestAnimationFrame"in window==!1?void window.scroll(0,window.pageYOffset+r):void GLSR.scrollToTopStep({endY:r,offset:window.pageYOffset,startTime:GLSR.now(),startY:t.scrollTop})},GLSR.scrollToTopStep=function(t){var e=(GLSR.now()-t.startTime)/GLSR.SCROLL_TIME;e=e>1?1:e;var s=.5*(1-Math.cos(Math.PI*e)),n=t.startY+(t.endY-t.startY)*s;window.scroll(0,t.offset+n),n!==t.endY&&window.requestAnimationFrame(GLSR.scrollToTopStep.bind(window,t))},GLSR.on("click",".glsr-ajax-navigation a",GLSR.onClickPagination),GLSR.ready(function(){GLSR.createExceprts(),GLSR.createStarRatings()});