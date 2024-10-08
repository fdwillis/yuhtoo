window.mr = window.mr || {},
mr = function(a, b, c, d) {
    "use strict";
    function e(c) {
        c = "undefined" == typeof c ? b : c,
        g.documentReady.concat(g.documentReadyDeferred).forEach(function(a) {
            a(c)
        }),
        a.status.documentReadyRan = !0,
        a.status.windowLoadPending && f(a.setContext())
    }
    function f(c) {
        a.status.documentReadyRan ? (a.status.windowLoadPending = !1, c = "object" == typeof c ? b : c, g.windowLoad.concat(g.windowLoadDeferred).forEach(function(a) {
            a(c)
        })) : a.status.windowLoadPending = !0
    }
    a = a || {};
    var g = {
        documentReady: [],
        documentReadyDeferred: [],
        windowLoad: [],
        windowLoadDeferred: []
    };
    return a.status = {
        documentReadyRan: !1,
        windowLoadPending: !1
    }, b(d).ready(e), b(c).on("load", f), a.setContext = function(a) {
        var c = b;
        return "undefined" != typeof a ? function(c) {
            return b(a).find(c)
        } : c
    }, a.components = g, a.documentReady = e, a.windowLoad = f, a
}(window.mr, jQuery, window, document),
mr = function(a, b, c, d) {
    "use strict";
    return a.util = {}, a.util.requestAnimationFrame = c.requestAnimationFrame || c.mozRequestAnimationFrame || c.webkitRequestAnimationFrame || c.msRequestAnimationFrame, a.util.documentReady = function(a) {
        var b = new Date,
            c = b.getFullYear();
        a(".update-year").text(c)
    }, a.util.windowLoad = function(a) {
        a("[data-delay-src]").each(function() {
            var b = a(this);
            b.attr("src", b.attr("data-delay-src")),
            b.removeAttr("data-delay-src")
        })
    }, a.util.getURLParameter = function(a) {
        return decodeURIComponent((new RegExp("[?|&]" + a + "=([^&;]+?)(&|#|;|$)").exec(location.search) || [void 0, ""])[1].replace(/\+/g, "%20")) || null
    }, a.util.capitaliseFirstLetter = function(a) {
        return a.charAt(0).toUpperCase() + a.slice(1)
    }, a.util.slugify = function(a, b) {
        return "undefined" != typeof b ? a.replace(/ +/g, "") : a.toLowerCase().replace(/[\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\]\[\}\{\'\"\;\\\:\?\/\>\<\.\,]+/g, "").replace(/ +/g, "-")
    }, a.util.sortChildrenByText = function(a, c) {
        var d = b(a),
            e = d.children().get(),
            f = -1,
            g = 1;
        "undefined" != typeof c && (f = 1, g = -1),
        e.sort(function(a, c) {
            var d = b(a).text(),
                e = b(c).text();
            return e > d ? f : d > e ? g : 0
        }),
        d.empty(),
        b(e).each(function(a, b) {
            d.append(b)
        })
    }, a.util.idleSrc = function(a, c) {
        c = "undefined" != typeof c ? c : "";
        var d = a.is(c + "[src]") ? a : a.find(c + "[src]");
        d.each(function(a, c) {
            c = b(c);
            var d = c.attr("src"),
                e = c.attr("data-src");
            "undefined" == typeof e && c.attr("data-src", d),
            c.attr("src", "")
        })
    }, a.util.activateIdleSrc = function(a, c) {
        c = "undefined" != typeof c ? c : "";
        var d = a.is(c + "[data-src]") ? a : a.find(c + "[data-src]");
        d.each(function(a, c) {
            c = b(c);
            var d = c.attr("data-src");
            c.attr("src", d)
        })
    }, a.util.pauseVideo = function(a) {
        var c = a.is("video") ? a : a.find("video");
        c.each(function(a, c) {
            var d = b(c).get(0);
            d.pause()
        })
    }, a.util.parsePixels = function(a) {
        var d,
            e = b(c).height();
        return /^[1-9]{1}[0-9]*[p][x]$/.test(a) ? parseInt(a.replace("px", ""), 10) : /^[1-9]{1}[0-9]*[v][h]$/.test(a) ? (d = parseInt(a.replace("vh", ""), 10), e * (d / 100)) : -1
    }, a.util.removeHash = function() {
        history.pushState("", d.title, c.location.pathname + c.location.search)
    }, a.components.documentReady.push(a.util.documentReady), a.components.windowLoad.push(a.util.windowLoad), a
}(mr, jQuery, window, document),
mr = function(a, b, c, d) {
    "use strict";
    return a.window = {}, a.window.height = b(c).height(), a.window.width = b(c).width(), b(c).on("resize", function() {
        a.window.height = b(c).height(),
        a.window.width = b(c).width()
    }), a
}(mr, jQuery, window, document),
mr = function(a, b, c, d) {
    "use strict";
    a.scroll = {};
    var e = c.requestAnimationFrame || c.mozRequestAnimationFrame || c.webkitRequestAnimationFrame || c.msRequestAnimationFrame;
    a.scroll.listeners = [],
    a.scroll.busy = !1,
    a.scroll.y = 0,
    a.scroll.x = 0;
    var f = function(b) {
        jQuery(c).off("scroll.mr"),
        jQuery(c).on("scroll.mr", function(b) {
            a.scroll.busy === !1 && (a.scroll.busy = !0, e(function(b) {
                a.scroll.update(b)
            })),
            b.stopPropagation && b.stopPropagation()
        })
    };
    return a.scroll.update = function(b) {
        var d = "undefined" != typeof c.mr_parallax ? !0 : !1;
        if (a.scroll.y = d ? mr_parallax.mr_getScrollPosition() : c.pageYOffset, a.scroll.busy = !1, d && mr_parallax.mr_parallaxBackground(), a.scroll.listeners.length > 0)
            for (var e = 0, f = a.scroll.listeners.length; f > e; e++)
                a.scroll.listeners[e](b)
    }, a.scroll.documentReady = f, a.components.documentReady.push(f), a
}(mr, jQuery, window, document),
mr = function(a, b, c, d) {
    "use strict";
    a.scroll.classModifiers = {},
    a.scroll.classModifiers.rules = [],
    a.scroll.classModifiers.parseScrollRules = function(b) {
        var c = b.attr("data-scroll-class"),
            d = c.split(";");
        return d.forEach(function(c) {
            var d,
                e,
                f = {};
            if (d = c.replace(/\s/g, "").split(":"), 2 === d.length) {
                if (e = a.util.parsePixels(d[0]), !(e > -1))
                    return !1;
                if (f.scrollPoint = e, !d[1].length)
                    return !1;
                var g = d[1];
                f.toggleClass = g,
                f.hasClass = b.hasClass(g),
                f.element = b.get(0),
                a.scroll.classModifiers.rules.push(f)
            }
        }), a.scroll.classModifiers.rules.length ? !0 : !1
    },
    a.scroll.classModifiers.update = function(b) {
        for (var c, d = a.scroll.y, e = a.scroll.classModifiers.rules, f = e.length; f--;)
            c = e[f],
            d > c.scrollPoint && !c.hasClass && (c.element.classList.add(c.toggleClass), c.hasClass = a.scroll.classModifiers.rules[f].hasClass = !0),
            d < c.scrollPoint && c.hasClass && (c.element.classList.remove(c.toggleClass), c.hasClass = a.scroll.classModifiers.rules[f].hasClass = !1)
    };
    var e = function() {
            b('.main-container [data-scroll-class*="pos-fixed"]').each(function() {
                var a = b(this);
                a.css("max-width", a.parent().outerWidth()),
                a.parent().css("min-height", a.outerHeight())
            })
        },
        f = function(b) {
            b("[data-scroll-class]").each(function() {
                var c = b(this);
                !a.scroll.classModifiers.parseScrollRules(c)
            }),
            e(),
            b(c).on("resize", e),
            a.scroll.classModifiers.rules.length && a.scroll.listeners.push(a.scroll.classModifiers.update)
        };
    return a.components.documentReady.push(f), a.scroll.classModifiers.documentReady = f, a
}(mr, jQuery, window, document),
mr = function(a, b, c, d) {
    "use strict";
    return a.accordions = a.accordions || {}, a.accordions.documentReady = function(b) {
        b(".accordion__title").on("click", function() {
            a.accordions.activatePanel(b(this))
        }),
        b(".accordion").each(function() {
            var a = b(this),
                c = a.outerHeight(!0);
            a.css("min-height", c)
        }),
        "" !== c.location.hash && "#" !== c.location.hash && null === c.location.hash.match(/#\/.*/) && b(".accordion > li > .accordion__title" + c.location.hash).length && a.accordions.activatePanelById(c.location.hash, !0),
        jQuery(d).on("click", 'a[href^="#"]:not(a[href="#"])', function() {
            b(".accordion > li > .accordion__title" + b(this).attr("href")).length && a.accordions.activatePanelById(b(this).attr("href"), !0)
        })
    }, a.accordions.activatePanel = function(a, c) {
        var e = b(a),
            f = e.closest(".accordion"),
            g = e.closest("li"),
            h = d.createEvent("Event"),
            i = d.createEvent("Event");
        if (h.initEvent("panelOpened.accordions.mr", !0, !0), i.initEvent("panelClosed.accordions.mr", !0, !0), g.hasClass("active"))
            c !== !0 && (g.removeClass("active"), e.trigger("panelClosed.accordions.mr").get(0).dispatchEvent(i));
        else if (f.hasClass("accordion--oneopen")) {
            var j = f.find("li.active");
            j.length && (j.removeClass("active"), j.trigger("panelClosed.accordions.mr").get(0).dispatchEvent(i)),
            g.addClass("active"),
            g.trigger("panelOpened.accordions.mr").get(0).dispatchEvent(h)
        } else
            g.is(".active") || g.trigger("panelOpened.accordions.mr").get(0).dispatchEvent(h),
            g.addClass("active")
    }, a.accordions.activatePanelById = function(c, d) {
        var e;
        "" !== c && "#" !== c && null === c.match(/#\/.*/) && (e = b(".accordion > li > .accordion__title#" + c.replace("#", "")), e.length && (b("html, body").stop(!0).animate({
            scrollTop: e.offset().top - 50
        }, 1200), a.accordions.activatePanel(e, d)))
    }, a.components.documentReady.push(a.accordions.documentReady), a
}(mr, jQuery, window, document),
mr = function(a, b, c, d) {
    "use strict";
    return a.alerts = a.alerts || {}, a.alerts.documentReady = function(a) {
        a(".alert__close").on("click touchstart", function() {
            jQuery(this).closest(".alert").addClass("alert--dismissed")
        })
    }, a.components.documentReady.push(a.alerts.documentReady), a
}(mr, jQuery, window, document),
mr = function(a, b, c, d) {
    "use strict";
    return a.backgrounds = a.backgrounds || {}, a.backgrounds.documentReady = function(a) {
        a(".background-image-holder").each(function() {
            var b = a(this).children("img").attr("src");
            a(this).css("background", 'url("' + b + '")').css("background-position", "initial").css("opacity", "1")
        })
    }, a.components.documentReady.push(a.backgrounds.documentReady), a
}(mr, jQuery, window, document),
mr = function(a, b, c, d) {
    "use strict";
    return a.bars = a.bars || {}, a.bars.documentReady = function(a) {
        a('.nav-container .bar[data-scroll-class*="fixed"]:not(.bar--absolute)').each(function() {
            var b = a(this),
                c = b.outerHeight(!0);
            b.closest(".nav-container").css("min-height", c)
        })
    }, a.components.documentReady.push(a.bars.documentReady), a
}(mr, jQuery, window, document),
mr = function(a, b, c, d) {
    "use strict";
    return a.cookies = {
        getItem: function(a) {
            return a ? decodeURIComponent(d.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(a).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null : null
        },
        setItem: function(a, b, c, e, f, g) {
            if (!a || /^(?:expires|max\-age|path|domain|secure)$/i.test(a))
                return !1;
            var h = "";
            if (c)
                switch (c.constructor) {
                case Number:
                    h = c === 1 / 0 ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + c;
                    break;
                case String:
                    h = "; expires=" + c;
                    break;
                case Date:
                    h = "; expires=" + c.toUTCString()
                }
            return d.cookie = encodeURIComponent(a) + "=" + encodeURIComponent(b) + h + (f ? "; domain=" + f : "") + (e ? "; path=" + e : "") + (g ? "; secure" : ""), !0
        },
        removeItem: function(a, b, c) {
            return this.hasItem(a) ? (d.cookie = encodeURIComponent(a) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (c ? "; domain=" + c : "") + (b ? "; path=" + b : ""), !0) : !1
        },
        hasItem: function(a) {
            return a ? new RegExp("(?:^|;\\s*)" + encodeURIComponent(a).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(d.cookie) : !1
        },
        keys: function() {
            for (var a = d.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/), b = a.length, c = 0; b > c; c++)
                a[c] = decodeURIComponent(a[c]);
            return a
        }
    }, a
}(mr, jQuery, window, document),
mr = function(a, b, c, d) {
    "use strict";
    return a.countdown = a.countdown || {}, a.countdown.options = a.countdown.options || {}, a.countdown.documentReady = function(b) {
        b(".countdown[data-date]").each(function() {
            var c,
                d = b(this),
                e = d.attr("data-date"),
                f = "undefined" != typeof d.attr("data-days-text") ? "%D " + d.attr("data-days-text") + " %H:%M:%S" : "%D days %H:%M:%S",
                f = "undefined" != typeof a.countdown.options.format ? a.countdown.options.format : f,
                g = "undefined" != typeof d.attr("data-date-format") ? d.attr("data-date-format") : f;
            "undefined" != typeof d.attr("data-date-fallback") && (c = d.attr("data-date-fallback") || "Timer Done"),
            d.countdown(e, function(a) {
                a.elapsed ? d.text(c) : d.text(a.strftime(g))
            })
        })
    }, a.components.documentReadyDeferred.push(a.countdown.documentReady), a
}(mr, jQuery, window, document),
mr = function(a, b, c, d) {
    "use strict";
    a.datepicker = a.datepicker || {};
    var e = a.datepicker.options || {};
    return a.datepicker.documentReady = function(a) {
        a(".datepicker").length && a(".datepicker").pickadate(e)
    }, a.components.documentReadyDeferred.push(a.datepicker.documentReady), a
}(mr, jQuery, window, document),
mr = function(a, b, c, d) {
    "use strict";
    return a.dropdowns = a.dropdowns || {}, a.dropdowns.done = !1, a.dropdowns.documentReady = function(b) {
        var e = !1;
        b('html[dir="rtl"]').length && (e = !0),
        a.dropdowns.done || (jQuery(d).on("click", "body:not(.dropdowns--hover) .dropdown, body.dropdowns--hover .dropdown.dropdown--click", function(a) {
            var c = jQuery(this);
            jQuery(a.target).is(".dropdown--active > .dropdown__trigger") ? (c.siblings().removeClass("dropdown--active").find(".dropdown").removeClass("dropdown--active"), c.toggleClass("dropdown--active")) : (b(".dropdown--active").removeClass("dropdown--active"), c.addClass("dropdown--active"))
        }), jQuery(d).on("click touchstart", "body:not(.dropdowns--hover)", function(a) {
            jQuery(a.target).is('[class*="dropdown"], [class*="dropdown"] *') || b(".dropdown--active").removeClass("dropdown--active")
        }), jQuery("body.dropdowns--hover .dropdown").on("click", function(a) {
            a.stopPropagation();
            var b = jQuery(this);
            b.toggleClass("dropdown--active")
        }), jQuery("body").append('<div class="container containerMeasure" style="opacity:0;pointer-events:none;"></div>'), e === !1 ? (a.dropdowns.repositionDropdowns(b), jQuery(c).on("resize", function() {
            a.dropdowns.repositionDropdowns(b)
        })) : (a.dropdowns.repositionDropdownsRtl(b), jQuery(c).on("resize", function() {
            a.dropdowns.repositionDropdownsRtl(b)
        })), a.dropdowns.done = !0)
    }, a.dropdowns.repositionDropdowns = function(a) {
        a(".dropdown__container").each(function() {
            var a,
                b,
                c,
                d,
                e;
            jQuery(this).css("left", ""),
            a = jQuery(this),
            b = a.offset().left,
            c = jQuery(".containerMeasure").offset().left,
            d = a.closest(".dropdown").offset().left,
            e = null,
            a.css("left", -b + c),
            a.find('.dropdown__content:not([class*="lg-12"])').length && (e = a.find(".dropdown__content"), e.css("left", d - c))
        }),
        a(".dropdown__content").each(function() {
            var a,
                b,
                d,
                e,
                f,
                g;
            a = jQuery(this),
            b = a.offset().left,
            d = a.outerWidth(!0),
            e = b + d,
            f = jQuery(c).outerWidth(!0),
            g = jQuery(".containerMeasure").outerWidth() - d,
            e > f && a.css("left", g)
        })
    }, a.dropdowns.repositionDropdownsRtl = function(a) {
        var b = jQuery(c).width();
        a(".dropdown__container").each(function() {
            var a,
                c,
                d,
                e,
                f;
            jQuery(this).css("left", ""),
            a = jQuery(this),
            c = b - (a.offset().left + a.outerWidth(!0)),
            d = jQuery(".containerMeasure").offset().left,
            e = b - (a.closest(".dropdown").offset().left + a.closest(".dropdown").outerWidth(!0)),
            f = null,
            a.css("right", -c + d),
            a.find('.dropdown__content:not([class*="lg-12"])').length && (f = a.find(".dropdown__content"), f.css("right", e - d))
        }),
        a(".dropdown__content").each(function() {
            var a,
                d,
                e,
                f,
                g,
                h;
            a = jQuery(this),
            d = b - (a.offset().left + a.outerWidth(!0)),
            e = a.outerWidth(!0),
            f = d + e,
            g = jQuery(c).outerWidth(!0),
            h = jQuery(".containerMeasure").outerWidth() - e,
            f > g && a.css("right", h)
        })
    }, a.components.documentReady.push(a.dropdowns.documentReady), a
}(mr, jQuery, window, document),
mr = function(a, b, c, d) {
    "use strict";
    return a.forms = a.forms || {}, a.forms.captcha = {}, a.forms.captcha.widgets = [], a.forms.captcha.done = !1, a.forms.documentReady = function(b) {
        a.forms.captcha.widgets = [],
        b('.input-checkbox input[type="checkbox"], .input-radio input[type="radio"]').each(function(a) {
            var c = b(this),
                d = c.siblings("label"),
                e = "input-assigned-" + a;
            "undefined" == typeof c.attr("id") || "" === c.attr("id") ? (c.attr("id", e), d.attr("for", e)) : (e = c.attr("id"), d.attr("for", e))
        }),
        b(".input-number__controls > span").off("click.mr").on("click.mr", function() {
            var a = jQuery(this),
                b = a.closest(".input-number"),
                c = b.find('input[type="number"]'),
                d = c.attr("max"),
                e = c.attr("min"),
                f = 1,
                g = parseInt(c.val(), 10);
            b.is("[data-step]") && (f = parseInt(b.attr("data-step"), 10)),
            a.hasClass("input-number__increase") ? d >= g + f && c.val(g + f) : g - f >= e && c.val(g - f)
        }),
        b(".input-file .btn").off("click.mr").on("click.mr", function() {
            return b(this).siblings("input").trigger("click"), !1
        }),
        b('form.form-email, form[action*="list-manage.com"], form[action*="createsend.com"]').attr("novalidate", !0).off("submit").on("submit", a.forms.submit),
        b(d).on("change, input, paste, keyup", ".attempted-submit .field-error", function() {
            b(this).removeClass("field-error")
        }),
        b('form[data-recaptcha-sitekey]:not([data-recaptcha-sitekey=""])').each(function() {
            var b,
                c,
                d,
                e,
                f,
                g,
                h,
                i = jQuery(this),
                j = i.find("div.recaptcha");
            g = i.attr("data-recaptcha-theme"),
            g = "undefined" != typeof g ? g : "",
            h = i.attr("data-recaptcha-size"),
            h = "undefined" != typeof h ? h : "",
            a.forms.captcha.sitekey = i.attr("data-recaptcha-sitekey"),
            j.length || (b = i.find("button[type=submit]").closest('[class*="col-"]'), j = jQuery("<div>").addClass("recaptcha"), c = jQuery("<div>").addClass("col-12").append(j), c.insertBefore(b)),
            d = {
                element: j.get(0),
                parentForm: i,
                theme: g,
                size: h
            },
            a.forms.captcha.widgets.push(d),
            a.forms.captcha.done === !1 ? jQuery('script[src*="recaptcha/api.js"]').length || (e = jQuery("<script async defer>"), f = "https://www.google.com/recaptcha/api.js?onload=mrFormsCaptchaInit&render=explicit", e.attr("src", f), jQuery("body").append(e), a.forms.captcha.done = !0) : "undefined" != typeof grecaptcha && a.forms.captcha.renderWidgets()
        })
    }, a.forms.submit = function(d) {
        d.preventDefault ? d.preventDefault() : d.returnValue = !1;
        var e,
            f,
            g,
            h,
            i,
            j = b("body"),
            k = b(d.target).closest("form"),
            l = "undefined" != typeof k.attr("action") ? k.attr("action") : "",
            m = k.find('button[type="submit"], input[type="submit"]'),
            n = 0,
            o = k.attr("original-error"),
            p = k.find("div.recaptcha").length ? !0 : !1;
        if (j.find(".form-error, .form-success").remove(), m.attr("data-text", m.text()), h = k.attr("data-error") ? k.attr("data-error") : "Please fill all fields correctly", i = k.attr("data-success") ? k.attr("data-success") : "Thanks, we'll be in touch shortly", j.append('<div class="form-error" style="display: none;">' + h + "</div>"), j.append('<div class="form-success" style="display: none;">' + i + "</div>"), f = j.find(".form-error"), g = j.find(".form-success"), k.addClass("attempted-submit"), -1 !== l.indexOf("createsend.com") || -1 !== l.indexOf("list-manage.com"))
            if ("undefined" != typeof o && o !== !1 && f.html(o), 1 !== a.forms.validateFields(k)) {
                k.removeClass("attempted-submit"),
                f.fadeOut(200),
                m.addClass("btn--loading");
                try {
                    b.ajax({
                        url: k.attr("action"),
                        crossDomain: !0,
                        data: k.serialize(),
                        method: "GET",
                        cache: !1,
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        success: function(b) {
                            "success" !== b.result && 200 !== b.Status ? (f.attr("original-error", f.text()), f.html(b.msg).stop(!0).fadeIn(1e3), g.stop(!0).fadeOut(1e3), m.removeClass("btn--loading")) : (m.removeClass("btn--loading"), e = k.attr("data-success-redirect"), "undefined" != typeof e && e !== !1 && "" !== e ? c.location = e : (a.forms.resetForm(k), a.forms.showFormSuccess(g, f, 1e3, 5e3, 500)))
                        }
                    })
                } catch (q) {
                    f.attr("original-error", f.text()),
                    f.html(q.message),
                    a.forms.showFormError(g, f, 1e3, 5e3, 500),
                    m.removeClass("btn--loading")
                }
            } else
                a.forms.showFormError(g, f, 1e3, 5e3, 500);
        else
            "undefined" != typeof o && o !== !1 && f.text(o),
            n = a.forms.validateFields(k),
            1 === n ? a.forms.showFormError(g, f, 1e3, 5e3, 500) : (k.removeClass("attempted-submit"), f.fadeOut(200), m.addClass("btn--loading"), jQuery.ajax({
                type: "POST",
                url: "" !== l ? l : "http://mailform.mediumra.re/stack/mail.php",
                data: k.serialize() + "&url=" + c.location.href + "&captcha=" + p,
                success: function(d) {
                    m.removeClass("btn--loading"),
                    b.isNumeric(d) ? parseInt(d, 10) > 0 && (e = k.attr("data-success-redirect"), "undefined" != typeof e && e !== !1 && "" !== e && (c.location = e), a.forms.resetForm(k), a.forms.showFormSuccess(g, f, 1e3, 5e3, 500), a.forms.captcha.resetWidgets()) : (f.attr("original-error", f.text()), f.text(d).stop(!0).fadeIn(1e3), g.stop(!0).fadeOut(1e3))
                },
                error: function(a, b, c) {
                    f.attr("original-error", f.text()),
                    f.text(c).stop(!0).fadeIn(1e3),
                    g.stop(!0).fadeOut(1e3),
                    m.removeClass("btn--loading")
                }
            }));
        return !1
    }, a.forms.validateFields = function(a) {
        var c,
            d,
            e = b(e),
            f = !1;
        if (a = b(a), a.find('.validate-required[type="checkbox"]').each(function() {
            var a = b(this);
            b('[name="' + b(this).attr("name") + '"]:checked').length || (f = 1, c = b(this).attr("data-name") || "check", a.parent().addClass("field-error"))
        }), a.find(".validate-required, .required, [required]").not('input[type="checkbox"]').each(function() {
            "" === b(this).val() ? (b(this).addClass("field-error"), f = 1) : b(this).removeClass("field-error")
        }), a.find('.validate-email, .email, [name*="cm-"][type="email"]').each(function() {
            /(.+)@(.+){2,}\.(.+){2,}/.test(b(this).val()) ? b(this).removeClass("field-error") : (b(this).addClass("field-error"), f = 1)
        }), a.find(".validate-number-dash").each(function() {
            /^[0-9][0-9-]+[0-9]$/.test(b(this).val()) ? b(this).removeClass("field-error") : (b(this).addClass("field-error"), f = 1)
        }), a.find("div.recaptcha").length && "undefined" != typeof a.attr("data-recaptcha-sitekey") && (d = b(a.find("div.recaptcha")), "" !== grecaptcha.getResponse(a.data("recaptchaWidgetID")) ? d.removeClass("field-error") : (d.addClass("field-error"), f = 1)), a.find(".field-error").length) {
            var g = b(a).find(".field-error:first");
            g.length && b("html, body").stop(!0).animate({
                scrollTop: g.offset().top - 100
            }, 1200, function() {
                g.focus()
            })
        } else
            e.find(".form-error").fadeOut(1e3);
        return f
    }, a.forms.showFormSuccess = function(a, b, c, d, e) {
        a.stop(!0).fadeIn(c),
        b.stop(!0).fadeOut(c),
        setTimeout(function() {
            a.stop(!0).fadeOut(e)
        }, d)
    }, a.forms.showFormError = function(a, b, c, d, e) {
        b.stop(!0).fadeIn(c),
        a.stop(!0).fadeOut(c),
        setTimeout(function() {
            b.stop(!0).fadeOut(e)
        }, d)
    }, a.forms.resetForm = function(a) {
        a = b(a),
        a.get(0).reset(),
        a.find(".input-radio, .input-checkbox").removeClass("checked"),
        a.find("[data-default-value]").filter('[type="text"],[type="number"],[type="email"],[type="url"],[type="search"],[type="tel"]').each(function() {
            var a = jQuery(this);
            a.val(a.attr("data-default-value"))
        })
    }, c.mrFormsCaptchaInit = function() {
        a.forms.captcha.renderWidgets()
    }, a.forms.captcha.renderWidgets = function() {
        a.forms.captcha.widgets.forEach(function(b) {
            "" === b.element.innerHTML.replace(/[\s\xA0]+/g, "") && (b.id = grecaptcha.render(b.element, {
                sitekey: a.forms.captcha.sitekey,
                theme: b.theme,
                size: b.size,
                callback: a.forms.captcha.setHuman
            }), b.parentForm.data("recaptchaWidgetID", b.id))
        })
    }, a.forms.captcha.resetWidgets = function() {
        a.forms.captcha.widgets.forEach(function(a) {
            grecaptcha.reset(a.id)
        })
    }, a.forms.captcha.setHuman = function() {
        jQuery("div.recaptcha.field-error").removeClass("field-error")
    }, a.components.documentReadyDeferred.push(a.forms.documentReady), a
}(mr, jQuery, window, document),
mr = function(a, b, c, d) {
    "use strict";
    return a.granim = a.granim || {}, a.granim.documentReady = function(b) {
        b("[data-gradient-bg]").each(function(c, d) {
            var e,
                f,
                g,
                h,
                i,
                j = b(this),
                k = "granim-" + c,
                l = j.attr("data-gradient-bg"),
                m = [],
                n = [],
                o = {};
            if (j.prepend('<canvas id="' + k + '"></canvas>'), f = /^(#[0-9|a-f|A-F]{6}){1}([ ]*,[ ]*#[0-9|a-f|A-F]{6})*$/.test(l), f === !0) {
                for (l = l.replace(" ", ""), l = l.split(","), e = l.length, e % 2 !== 0 && l.push(l[e - 1]), g = 0; e / 2 > g; g++)
                    n = [],
                    n.push(l.shift()),
                    n.push(l.shift()),
                    m.push(n);
                o.states = {
                    "default-state": {
                        gradients: m
                    }
                }
            }
            h = {
                element: "#" + k,
                name: "basic-gradient",
                direction: "left-right",
                opacity: [1, 1],
                isPausedWhenNotInView: !0,
                states: {
                    "default-state": {
                        gradients: m
                    }
                }
            },
            i = jQuery.extend({}, h, a.granim.options, o),
            b(this).data("gradientOptions", i);
            b(this),
            new Granim(i)
        })
    }, a.components.documentReadyDeferred.push(a.granim.documentReady), a
}(mr, jQuery, window, document),
mr = function(a, b, c, d) {
    "use strict";
    return a.instagram = a.instagram || {}, a.instagram.documentReady = function(b) {
        var c,
            d,
            e = {};
        if (b(".instafeed").length) {
            var f,
                g,
                h = "4079540202.b9b1d8a.1d13c245c68d4a17bfbff87919aaeb14",
                i = "b9b1d8ae049d4153b24a6332f0088686";
            b(".instafeed[data-access-token][data-client-id]").length && (f = b(".instafeed[data-access-token][data-client-id]").first().attr("data-access-token"), g = b(".instafeed[data-access-token][data-client-id]").first().attr("data-client-id"), "" !== f && (h = f), "" !== g && (i = g)),
            jQuery.fn.spectragram.accessData = {
                accessToken: h,
                clientID: i
            }
        }
        b(".instafeed").each(function() {
            var f = b(this);
            f.attr("data-user-name");
            c = {
                query: "mediumrarethemes",
                max: 12
            },
            e.max = f.attr("data-amount"),
            e.query = f.attr("data-user-name"),
            d = jQuery.extend({}, c, a.instagram.options, e),
            f.append("<ul></ul>"),
            f.children("ul").spectragram("getUserFeed", d)
        })
    }, a.components.documentReadyDeferred.push(a.instagram.documentReady), a
}(mr, jQuery, window, document),
mr = function(a, b, c, d) {
    "use strict";
    return a.maps = a.maps || {}, a.maps.options = a.maps.options || {}, a.maps.documentReady = function(b) {
        b(".map-holder").on("click", function() {
            b(this).addClass("interact")
        }).removeClass("interact");
        var c = b(".map-container[data-maps-api-key]");
        c.length && (c.addClass("gmaps-active"), a.maps.initAPI(b), a.maps.init())
    }, a.maps.initAPI = function(a) {
        if (d.querySelector("[data-maps-api-key]") && !d.querySelector(".gMapsAPI") && a("[data-maps-api-key]").length) {
            var b = d.createElement("script"),
                c = a("[data-maps-api-key]:first").attr("data-maps-api-key");
            c = "undefined" != typeof c ? c : "",
            "" !== c && (b.type = "text/javascript", b.src = "https://maps.googleapis.com/maps/api/js?key=" + c + "&callback=mr.maps.init", b.className = "gMapsAPI", d.body.appendChild(b))
        }
    }, a.maps.init = function() {
        "undefined" != typeof c.google && "undefined" != typeof c.google.maps && (a.maps.instances = [], jQuery(".gmaps-active").each(function() {
            var b,
                c,
                e,
                f,
                g,
                h,
                i,
                j = this,
                k = jQuery(this),
                l = jQuery(d).width() > 766 ? !0 : !1,
                m = ("undefined" != typeof k.attr("data-zoom-controls") ? !0 : !1, "undefined" != typeof k.attr("data-zoom-controls") ? k.attr("data-zoom-controls") : !1),
                n = "undefined" != typeof k.attr("data-latlong") ? k.attr("data-latlong") : !1,
                o = n ? 1 * n.substr(0, n.indexOf(",")) : !1,
                p = n ? 1 * n.substr(n.indexOf(",") + 1) : !1,
                q = new google.maps.Geocoder,
                r = "undefined" != typeof k.attr("data-address") ? k.attr("data-address").split(";") : [""],
                s = {},
                t = {};
            i = d.createEvent("Event"),
            i.initEvent("mapCreated.maps.mr", !0, !0),
            f = {
                disableDefaultUI: !0,
                draggable: l,
                scrollwheel: !1,
                styles: [{
                    featureType: "landscape",
                    stylers: [{
                        saturation: -100
                    }, {
                        lightness: 65
                    }, {
                        visibility: "on"
                    }]
                }, {
                    featureType: "poi",
                    stylers: [{
                        saturation: -100
                    }, {
                        lightness: 51
                    }, {
                        visibility: "simplified"
                    }]
                }, {
                    featureType: "road.highway",
                    stylers: [{
                        saturation: -100
                    }, {
                        visibility: "simplified"
                    }]
                }, {
                    featureType: "road.arterial",
                    stylers: [{
                        saturation: -100
                    }, {
                        lightness: 30
                    }, {
                        visibility: "on"
                    }]
                }, {
                    featureType: "road.local",
                    stylers: [{
                        saturation: -100
                    }, {
                        lightness: 40
                    }, {
                        visibility: "on"
                    }]
                }, {
                    featureType: "transit",
                    stylers: [{
                        saturation: -100
                    }, {
                        visibility: "simplified"
                    }]
                }, {
                    featureType: "administrative.province",
                    stylers: [{
                        visibility: "off"
                    }]
                }, {
                    featureType: "water",
                    elementType: "labels",
                    stylers: [{
                        visibility: "on"
                    }, {
                        lightness: -25
                    }, {
                        saturation: -100
                    }]
                }, {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{
                        hue: "#ffff00"
                    }, {
                        lightness: -25
                    }, {
                        saturation: -97
                    }]
                }],
                zoom: 17,
                zoomControl: !1
            },
            s.styles = "undefined" != typeof k.attr("data-map-style") ? JSON.parse(k.attr("data-map-style")) : void 0,
            s.zoom = k.attr("data-map-zoom") ? parseInt(k.attr("data-map-zoom"), 10) : void 0,
            s.zoomControlOptions = m !== !1 ? {
                position: google.maps.ControlPosition[m]
            } : void 0,
            e = {
                icon: {
                    url: ("undefined" != typeof mr_variant ? "../" : "") + "img/mapmarker.png",
                    scaledSize: new google.maps.Size(50, 50)
                },
                title: "We Are Here",
                optimised: !1
            },
            t.icon = "undefined" != typeof k.attr("data-marker-image") ? {
                url: k.attr("data-marker-image"),
                scaledSize: new google.maps.Size(50, 50)
            } : void 0,
            t.title = k.attr("data-marker-title"),
            g = jQuery.extend({}, f, a.maps.options.map, s),
            h = jQuery.extend({}, e, a.maps.options.marker, t),
            void 0 !== r && "" !== r[0] ? q.geocode({
                address: r[0].replace("[nomarker]", "")
            }, function(c, d) {
                d === google.maps.GeocoderStatus.OK && (b = new google.maps.Map(j, g), a.maps.instances.push(b), jQuery(j).trigger("mapCreated.maps.mr").get(0).dispatchEvent(i), b.setCenter(c[0].geometry.location), r.forEach(function(a) {
                    var c;
                    if (/(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)/.test(a))
                        var d = a.split(","),
                            e = new google.maps.Marker(jQuery.extend({}, h, {
                                position: {
                                    lat: 1 * d[0],
                                    lng: 1 * d[1]
                                },
                                map: b
                            }));
                    else
                        a.indexOf("[nomarker]") < 0 && (c = new google.maps.Geocoder, c.geocode({
                            address: a.replace("[nomarker]", "")
                        }, function(a, c) {
                            c === google.maps.GeocoderStatus.OK && (e = new google.maps.Marker(jQuery.extend({}, h, {
                                map: b,
                                position: a[0].geometry.location
                            })))
                        }))
                }))
            }) : "undefined" != typeof o && "" !== o && o !== !1 && "undefined" != typeof p && "" !== p && p !== !1 && (g.center = {
                lat: o,
                lng: p
            }, b = new google.maps.Map(j, g), c = new google.maps.Marker(jQuery.extend({}, h, {
                position: {
                    lat: o,
                    lng: p
                },
                map: b
            })), a.maps.instances.push(b), jQuery(j).trigger("mapCreated.maps.mr").get(0).dispatchEvent(i))
        }))
    }, a.components.documentReady.push(a.maps.documentReady), a
}(mr, jQuery, window, document),
mr = function(a, b, c, d) {
    "use strict";
    return a.masonry = a.masonry || {}, a.masonry.documentReady = function(b) {
        a.masonry.updateFilters(),
        b(d).on("click touchstart", ".masonry__filters li:not(.js-no-action)", function() {
            var a = b(this),
                c = a.closest(".masonry").find(".masonry__container"),
                d = "*";
            "*" !== a.attr("data-masonry-filter") && (d = ".filter-" + a.attr("data-masonry-filter")),
            a.siblings("li").removeClass("active"),
            a.addClass("active"),
            c.removeClass("masonry--animate"),
            c.on("layoutComplete", function() {
                b(this).addClass("masonry--active"),
                "undefined" != typeof mr_parallax && setTimeout(function() {
                    mr_parallax.profileParallaxElements()
                }, 100)
            }),
            c.isotope({
                filter: d
            })
        })
    }, a.masonry.windowLoad = function() {
        b(".masonry").each(function() {
            var c,
                d = b(this).find(".masonry__container"),
                e = b(this),
                f = "*",
                g = {};
            c = {
                itemSelector: ".masonry__item",
                filter: "*",
                masonry: {
                    columnWidth: ".masonry__item"
                }
            },
            e.is("[data-default-filter]") && (f = e.attr("data-default-filter").toLowerCase(), f = ".filter-" + f, e.find("li[data-masonry-filter]").removeClass("active"), e.find('li[data-masonry-filter="' + e.attr("data-default-filter").toLowerCase() + '"]').addClass("active")),
            g.filter = "*" !== f ? f : void 0,
            d.on("layoutComplete", function() {
                d.addClass("masonry--active"),
                "undefined" != typeof mr_parallax && setTimeout(function() {
                    mr_parallax.profileParallaxElements()
                }, 100)
            }),
            d.isotope(jQuery.extend({}, c, a.masonry.options, g))
        })
    }, a.masonry.updateFilters = function(c) {
        c = "undefined" != typeof c ? c : ".masonry";
        var d = b(c);
        d.each(function() {
            var c,
                d = b(this),
                e = d.find(".masonry__container"),
                f = d.find(".masonry__filters"),
                g = "undefined" != typeof f.attr("data-filter-all-text") ? f.attr("data-filter-all-text") : "All";
            d.is(".masonry") && e.find(".masonry__item[data-masonry-filter]").length && (c = f.find("> ul"), c.length || (c = f.append("<ul></ul>").find("> ul")), e.find(".masonry__item[data-masonry-filter]").each(function() {
                var d = b(this),
                    e = d.attr("data-masonry-filter"),
                    f = [];
                "undefined" != typeof e && "" !== e && (f = e.split(",")),
                b(f).each(function(b, e) {
                    var f = a.util.slugify(e);
                    d.addClass("filter-" + f),
                    c.find('[data-masonry-filter="' + f + '"]').length || c.append('<li data-masonry-filter="' + f + '">' + e + "</li>")
                })
            }), c.find("[data-masonry-filter]").each(function() {
                var a = b(this),
                    c = a.text();
                "*" !== b(this).attr("data-masonry-filter") && (d.find('.masonry__item[data-masonry-filter*="' + c + '"]').length || a.remove())
            }), a.util.sortChildrenByText(b(this).find(".masonry__filters ul")), c.find('[data-masonry-filter="*"]').length || c.prepend('<li class="active" data-masonry-filter="*">' + g + "</li>"))
        })
    }, a.masonry.updateLayout = function(a) {
        a = "undefined" != typeof a ? a : ".masonry";
        var c = b(a);
        c.each(function() {
            var a = b(this),
                c = a.find(".masonry__item:not([style])"),
                d = a.find(".masonry__container");
            a.is(".masonry") && (c.length && d.isotope("appended", c).isotope("layout"), d.isotope("layout"))
        })
    }, a.components.documentReady.push(a.masonry.documentReady), a.components.windowLoad.push(a.masonry.windowLoad), a
}(mr, jQuery, window, document),
mr = function(a, b, c, d) {
    "use strict";
    return a.modals = a.modals || {}, a.modals.documentReady = function(b) {
        var e = '<div class="all-page-modals"></div>',
            f = b("div.main-container");
        if (f.length ? (jQuery(e).insertAfter(f), a.modals.allModalsContainer = b("div.all-page-modals")) : (jQuery("body").append(e), a.modals.allModalsContainer = jQuery("body div.all-page-modals")), b(".modal-container").each(function() {
            var d = b(this),
                e = (b(c), d.find(".modal-content"));
            if (d.find(".modal-close").length || d.find(".modal-content").append('<div class="modal-close modal-close-cross"></div>'), void 0 !== e.attr("data-width")) {
                var f = 1 * e.attr("data-width").substr(0, e.attr("data-width").indexOf("%"));
                e.css("width", f + "%")
            }
            if (void 0 !== e.attr("data-height")) {
                var g = 1 * e.attr("data-height").substr(0, e.attr("data-height").indexOf("%"));
                e.css("height", g + "%")
            }
            a.util.idleSrc(d, "iframe")
        }), b(".modal-instance").each(function(c) {
            var d = b(this),
                e = d.find(".modal-container"),
                f = (d.find(".modal-content"), d.find(".modal-trigger"));
            f.attr("data-modal-index", c),
            e.attr("data-modal-index", c),
            "undefined" != typeof e.attr("data-modal-id") && f.attr("data-modal-id", e.attr("data-modal-id")),
            e = e.detach(),
            a.modals.allModalsContainer.append(e)
        }), b(".modal-trigger").on("click", function() {
            var c,
                d,
                e = b(this);
            return "undefined" != typeof e.attr("data-modal-id") ? (c = e.attr("data-modal-id"), d = a.modals.allModalsContainer.find('.modal-container[data-modal-id="' + c + '"]')) : (c = b(this).attr("data-modal-index"), d = a.modals.allModalsContainer.find('.modal-container[data-modal-index="' + c + '"]')), a.util.activateIdleSrc(d, "iframe"), a.modals.autoplayVideo(d), a.modals.showModal(d), !1
        }), jQuery(d).on("click", ".modal-close", a.modals.closeActiveModal), jQuery(d).keyup(function(b) {
            27 === b.keyCode && a.modals.closeActiveModal()
        }), b(".modal-container:not(.modal--prevent-close)").on("click", function(b) {
            b.target === this && a.modals.closeActiveModal()
        }), b(".modal-container[data-autoshow]").each(function() {
            var c = b(this),
                d = 1 * c.attr("data-autoshow");
            a.util.activateIdleSrc(c),
            a.modals.autoplayVideo(c),
            "undefined" != typeof c.attr("data-cookie") ? a.cookies.hasItem(c.attr("data-cookie")) || a.modals.showModal(c, d) : a.modals.showModal(c, d)
        }), b(".modal-container[data-show-on-exit]").each(function() {
            var c = jQuery(this),
                e = c.attr("data-show-on-exit"),
                f = 0;
            c.attr("data-delay") && (f = parseInt(c.attr("data-delay"), 10) || 0),
            b(e).length && (c.prepend(b('<i class="ti-close close-modal">')), jQuery(d).on("mouseleave", e, function() {
                b(".modal-active").length || ("undefined" != typeof c.attr("data-cookie") ? a.cookies.hasItem(c.attr("data-cookie")) || a.modals.showModal(c, f) : a.modals.showModal(c, f))
            }))
        }), 2 === c.location.href.split("#").length) {
            var g = c.location.href.split("#").pop();
            b('[data-modal-id="' + g + '"]').length && (a.modals.closeActiveModal(), a.modals.showModal(b('[data-modal-id="' + g + '"]')))
        }
        jQuery(d).on("click", 'a[href^="#"]', function() {
            var c = b(this).attr("href").replace("#", "");
            b('[data-modal-id="' + c + '"]').length && (a.modals.closeActiveModal(), setTimeout(a.modals.showModal, 500, '[data-modal-id="' + c + '"]', 0))
        }),
        jQuery(d).on("wheel mousewheel scroll", ".modal-content, .modal-content .scrollable", function(a) {
            a.preventDefault && a.preventDefault(),
            a.stopPropagation && a.stopPropagation(),
            this.scrollTop += a.originalEvent.deltaY
        })
    }, a.modals.showModal = function(a, c) {
        var e = "undefined" != typeof c ? 1 * c : 0,
            f = b(a);
        f.length && setTimeout(function() {
            var c = d.createEvent("Event");
            c.initEvent("modalOpened.modals.mr", !0, !0),
            b(a).addClass("modal-active").trigger("modalOpened.modals.mr").get(0).dispatchEvent(c)
        }, e)
    }, a.modals.closeActiveModal = function() {
        var b = jQuery("body div.modal-active"),
            e = d.createEvent("Event");
        a.util.idleSrc(b, "iframe"),
        a.util.pauseVideo(b),
        "undefined" != typeof b.attr("data-cookie") && a.cookies.setItem(b.attr("data-cookie"), "true", 1 / 0, "/"),
        b.length && (b.is("[data-modal-id]") && c.location.hash === "#" + b.attr("data-modal-id") && a.util.removeHash(), e.initEvent("modalClosed.modals.mr", !0, !0), b.removeClass("modal-active").trigger("modalClosed.modals.mr").get(0).dispatchEvent(e))
    }, a.modals.autoplayVideo = function(a) {
        if (a.find("video[autoplay]").length) {
            var b = a.find("video").get(0);
            b.play()
        }
    }, a.components.documentReady.push(a.modals.documentReady), a
}(mr, jQuery, window, document),
mr = function(a, b, c, d) {
    "use strict";
    return a.newsletters = a.newsletters || {}, a.newsletters.documentReady = function(b) {
        var c,
            d,
            e,
            f,
            g,
            h;
        b('form[action*="createsend.com"]').each(function() {
            c = b(this),
            c.attr("novalidate", "novalidate"),
            c.is(".form--no-placeholders") ? c.find("input[placeholder]").removeAttr("placeholder") : c.find("input:not([checkbox]):not([radio])").each(function() {
                var a = b(this);
                "undefined" != typeof a.attr("placeholder") ? "" === a.attr("placeholder") && a.siblings("label").length && (a.attr("placeholder", a.siblings("label").first().text()), c.is(".form--no-labels") && a.siblings("label").first().remove()) : a.siblings("label").length && (a.attr("placeholder", a.siblings("label").first().text()), c.is(".form--no-labels") && a.siblings("label").first().remove()),
                a.parent().is("p") && a.unwrap()
            }),
            c.find("select").wrap('<div class="input-select"></div>'),
            c.find('input[type="radio"]').wrap('<div class="input-radio"></div>'),
            c.find('input[type="checkbox"]').each(function() {
                d = b(this),
                f = d.attr("id"),
                e = c.find("label[for=" + f + "]"),
                e.length || (e = b('<label for="' + f + '"></label>')),
                d.before('<div class="input-checkbox" data-id="' + f + '"></div>'),
                b('.input-checkbox[data-id="' + f + '"]').prepend(d),
                b('.input-checkbox[data-id="' + f + '"]').prepend(e)
            }),
            c.find('button[type="submit"]').each(function() {
                var a = b(this);
                a.addClass("btn"),
                a.parent().is("p") && a.unwrap()
            }),
            c.find("[required]").attr("required", "required").addClass("validate-required"),
            c.addClass("form--active"),
            a.newsletters.prepareAjaxAction(c)
        }),
        b('form[action*="list-manage.com"]').each(function() {
            c = b(this),
            c.attr("novalidate", "novalidate"),
            c.is(".form--no-placeholders") ? c.find("input[placeholder]").removeAttr("placeholder") : c.find("input:not([checkbox]):not([radio])").each(function() {
                var a = b(this);
                "undefined" != typeof a.attr("placeholder") ? "" === a.attr("placeholder") && a.siblings("label").length && (a.attr("placeholder", a.siblings("label").first().text()), c.is(".form--no-labels") && a.siblings("label").first().remove()) : a.siblings("label").length && (a.attr("placeholder", a.siblings("label").first().text()), c.is(".form--no-labels") && a.siblings("label").first().remove())
            }),
            c.is(".form--no-labels") && c.find("input:not([checkbox]):not([radio])").each(function() {
                var a = b(this);
                a.siblings("label").length && a.siblings("label").first().remove()
            }),
            c.find("select").wrap('<div class="input-select"></div>'),
            c.find('input[type="checkbox"]').each(function() {
                d = jQuery(this),
                g = d.parent(),
                e = g.find("label"),
                e.length || (e = jQuery("<label>")),
                d.before('<div class="input-checkbox"></div>'),
                g.find(".input-checkbox").append(d),
                g.find(".input-checkbox").append(e)
            }),
            c.find('input[type="radio"]').each(function() {
                h = jQuery(this),
                g = h.closest("li"),
                e = g.find("label"),
                e.length || (e = jQuery("<label>")),
                h.before('<div class="input-radio"></div>'),
                g.find(".input-radio").prepend(h),
                g.find(".input-radio").prepend(e)
            }),
            c.find('input[type="submit"]').each(function() {
                var a = b(this),
                    c = jQuery("<button/>").attr("type", "submit").attr("class", a.attr("class")).addClass("btn").text(a.attr("value"));
                a.parent().is("div.clear") && a.unwrap(),
                c.insertBefore(a),
                a.remove()
            }),
            c.find("input").each(function() {
                var a = b(this);
                a.hasClass("required") && a.removeClass("required").addClass("validate-required")
            }),
            c.find('input[type="email"]').removeClass("email").addClass("validate-email"),
            c.find("#mce-responses").remove(),
            c.find(".mc-field-group").each(function() {
                b(this).children().first().unwrap()
            }),
            c.find("[required]").attr("required", "required").addClass("validate-required"),
            c.addClass("form--active"),
            a.newsletters.prepareAjaxAction(c)
        }),
        a.forms.documentReady(a.setContext("form.form--active"))
    }, a.newsletters.prepareAjaxAction = function(a) {
        var c = b(a).attr("action");
        /list-manage\.com/.test(c) && (c = c.replace("/post?", "/post-json?") + "&c=?", "//" === c.substr(0, 2) && (c = "http:" + c)),
        /createsend\.com/.test(c) && (c += "?callback=?"),
        b(a).attr("action", c)
    }, a.components.documentReady.push(a.newsletters.documentReady), a
}(mr, jQuery, window, document),
mr = function(a, b, c, d) {
    "use strict";
    return a.notifications = a.notifications || {}, a.notifications.documentReady = function(b) {
        b(".notification").each(function() {
            var a = b(this);
            a.find(".notification-close").length || a.append('<div class="notification-close-cross notification-close"></div>')
        }),
        b(".notification[data-autoshow]").each(function() {
            var c = b(this),
                d = parseInt(c.attr("data-autoshow"), 10);
            "undefined" != typeof c.attr("data-cookie") ? a.cookies.hasItem(c.attr("data-cookie")) || a.notifications.showNotification(c, d) : a.notifications.showNotification(c, d)
        }),
        b("[data-notification-link]:not(.notification)").on("click", function() {
            var c = jQuery(this).attr("data-notification-link"),
                d = b('.notification[data-notification-link="' + c + '"]');
            return jQuery(".notification--reveal").addClass("notification--dismissed"), d.removeClass("notification--dismissed"), a.notifications.showNotification(d, 0), !1
        }),
        b(".notification-close").on("click", function() {
            var b = jQuery(this);
            return a.notifications.closeNotification(b), "#" === b.attr("href") ? !1 : void 0
        }),
        b(".notification .inner-link").on("click", function() {
            var b = jQuery(this).closest(".notification").attr("data-notification-link");
            a.notifications.closeNotification(b)
        })
    }, a.notifications.showNotification = function(b, c) {
        var e = jQuery(b),
            f = "undefined" != typeof c ? 1 * c : 0,
            g = d.createEvent("Event");
        if (setTimeout(function() {
            g.initEvent("notificationOpened.notifications.mr", !0, !0),
            e.addClass("notification--reveal").trigger("notificationOpened.notifications.mr").get(0).dispatchEvent(g),
            e.closest("nav").addClass("notification--reveal"),
            e.find("input").length && e.find("input").first().focus()
        }, f), b.is("[data-autohide]")) {
            var h = parseInt(b.attr("data-autohide"), 10);
            setTimeout(function() {
                a.notifications.closeNotification(b)
            }, h + f)
        }
    }, a.notifications.closeNotification = function(c) {
        var e = jQuery(c),
            f = d.createEvent("Event");
        c = e.is(".notification") ? e : e.is(".notification-close") ? e.closest(".notification") : b('.notification[data-notification-link="' + c + '"]'),
        f.initEvent("notificationClosed.notifications.mr", !0, !0),
        c.addClass("notification--dismissed").trigger("notificationClosed.notifications.mr").get(0).dispatchEvent(f),
        c.closest("nav").removeClass("notification--reveal"),
        "undefined" != typeof c.attr("data-cookie") && a.cookies.setItem(c.attr("data-cookie"), "true", 1 / 0, "/")
    }, a.components.documentReady.push(a.notifications.documentReady), a
}(mr, jQuery, window, document),
mr = function(a, b, c, d) {
    "use strict";
    return a.parallax = a.parallax || {}, a.parallax.documentReady = function(a) {
        var b = a(c),
            d = b.width(),
            e = b.height(),
            f = a("nav").outerHeight(!0);
        if (d > 768) {
            var g = a(".parallax:nth-of-type(1)"),
                h = a(".parallax:nth-of-type(1) .background-image-holder");
            h.css("top", -f),
            g.outerHeight(!0) === e && h.css("height", e + f)
        }
    }, a.parallax.update = function() {
        "undefined" != typeof mr_parallax && (mr_parallax.profileParallaxElements(), mr_parallax.mr_parallaxBackground())
    }, a.components.documentReady.push(a.parallax.documentReady), a
}(mr, jQuery, window, document),
mr = function(a, b, c, d) {
    "use strict";
    return a.progressHorizontal = a.progressHorizontal || {}, a.progressHorizontal.documentReady = function(a) {
        var b = [];
        a(".progress-horizontal").each(function() {
            var a = jQuery(this).find(".progress-horizontal__bar"),
                c = {},
                d = jQuery('<div class="progress-horizontal__progress"></div>');
            a.prepend(d),
            c.element = a,
            c.progress = d,
            c.value = parseInt(a.attr("data-value"), 10) + "%",
            c.offsetTop = a.offset().top,
            c.animate = !1,
            jQuery(this).hasClass("progress-horizontal--animate") ? c.animate = !0 : d.css("width", c.value),
            b.push(c)
        })
    }, a.components.documentReady.push(a.progressHorizontal.documentReady), a
}(mr, jQuery, window, document),
mr = function(a, b, c, d) {
    "use strict";
    return a.easypiecharts = a.easypiecharts || {}, a.easypiecharts.pies = [], a.easypiecharts.options = a.easypiecharts.options || {}, a.easypiecharts.documentReady = function(b) {
        b(".radial").each(function() {
            var b,
                c = jQuery(this),
                d = "#000000",
                e = 2e3,
                f = 110,
                g = 3,
                h = {},
                i = {};
            h = {
                animate: {
                    duration: e,
                    enabled: !0
                },
                barColor: d,
                scaleColor: !1,
                size: f,
                lineWidth: g
            },
            "undefined" != typeof a.easypiecharts.options.size && (f = a.easypiecharts.options.size),
            "undefined" != typeof c.attr("data-timing") && (i.animate = {
                duration: parseInt(c.attr("data-timing"), 10),
                enabled: !0
            }),
            "undefined" != typeof c.attr("data-color") && (i.barColor = c.attr("data-color")),
            "undefined" != typeof c.attr("data-size") && (f = i.size = parseInt(c.attr("data-size"), 10)),
            "undefined" != typeof c.attr("data-bar-width") && (i.lineWidth = parseInt(c.attr("data-bar-width"), 10)),
            c.css("height", f).css("width", f),
            "object" == typeof a.easypiecharts.options && (b = jQuery.extend({}, h, a.easypiecharts.options, i)),
            c.easyPieChart(b),
            c.data("easyPieChart").update(0)
        }),
        b(".radial").length && (a.easypiecharts.init(b), a.easypiecharts.activate(), a.scroll.listeners.push(a.easypiecharts.activate))
    }, a.easypiecharts.init = function(b) {
        a.easypiecharts.pies = [],
        b(".radial").each(function() {
            var b = {},
                c = jQuery(this);
            b.element = c,
            b.value = parseInt(c.attr("data-value"), 10),
            b.top = c.offset().top,
            b.height = c.height() / 2,
            b.active = !1,
            a.easypiecharts.pies.push(b)
        })
    }, a.easypiecharts.activate = function() {
        a.easypiecharts.pies.forEach(function(b) {
            Math.round(a.scroll.y + a.window.height) >= Math.round(b.top + b.height) && b.active === !1 && (b.element.data("easyPieChart").enableAnimation(), b.element.data("easyPieChart").update(b.value), b.element.addClass("radial--active"), b.active = !0)
        })
    }, a.components.documentReadyDeferred.push(a.easypiecharts.documentReady), a
}(mr, jQuery, window, document),
mr = function(a, b, c, d) {
    "use strict";
    return a.sliders = a.sliders || {}, a.sliders.documentReady = function(b) {
        b(".slider").each(function(c) {
            var d = b(this),
                e = d.find("ul.slides");
            e.find(">li").addClass("slide");
            var f = e.find("li").length,
                g = {
                    cellSelector: ".slide",
                    cellAlign: "left",
                    wrapAround: !0,
                    pageDots: !1,
                    prevNextButtons: !1,
                    autoPlay: !0,
                    draggable: 2 > f ? !1 : !0,
                    imagesLoaded: !0,
                    accessibility: !0,
                    rightToLeft: !1,
                    initialIndex: 0,
                    freeScroll: !1
                },
                h = {};
            h.pageDots = "true" === d.attr("data-paging") && e.find("li").length > 1 ? !0 : void 0,
            h.prevNextButtons = "true" === d.attr("data-arrows") ? !0 : void 0,
            h.draggable = "false" === d.attr("data-draggable") ? !1 : void 0,
            h.autoPlay = "false" === d.attr("data-autoplay") ? !1 : d.attr("data-timing") ? parseInt(d.attr("data-timing"), 10) : void 0,
            h.accessibility = "false" === d.attr("data-accessibility") ? !1 : void 0,
            h.rightToLeft = "true" === d.attr("data-rtl") ? !0 : void 0,
            h.initialIndex = d.attr("data-initial") ? parseInt(d.attr("data-initial"), 10) : void 0,
            h.freeScroll = "true" === d.attr("data-freescroll") ? !0 : void 0,
            d.attr("data-children", f),
            b(this).data("sliderOptions", jQuery.extend({}, g, a.sliders.options, h)),
            b(e).flickity(b(this).data("sliderOptions")),
            b(e).on("scroll.flickity", function(a, b) {
                d.find(".is-selected").hasClass("controls--dark") ? d.addClass("controls--dark") : d.removeClass("controls--dark")
            })
        }),
        a.parallax.update && a.parallax.update()
    }, a.components.documentReadyDeferred.push(a.sliders.documentReady), a
}(mr, jQuery, window, document),
mr = function(a, b, c, d) {
    "use strict";
    return a.smoothscroll = a.smoothscroll || {}, a.smoothscroll.sections = [], a.smoothscroll.init = function() {
        a.smoothscroll.sections = [],
        b("a.inner-link").each(function() {
            var c = {},
                d = b(this),
                e = d.attr("href"),
                f = new RegExp("^#[^\r\n	\f#.]+$", "gm");
            f.test(e) && b("section" + e).length && (c.id = e, c.top = Math.round(b(e).offset().top), c.height = Math.round(b(e).outerHeight()), c.link = d.get(0), c.active = !1, a.smoothscroll.sections.push(c))
        }),
        a.smoothscroll.highlight()
    }, a.smoothscroll.highlight = function() {
        a.smoothscroll.sections.forEach(function(b) {
            a.scroll.y >= b.top && a.scroll.y < b.top + b.height ? b.active === !1 && (b.link.classList.add("inner-link--active"), b.active = !0) : (b.link.classList.remove("inner-link--active"), b.active = !1)
        })
    }, a.scroll.listeners.push(a.smoothscroll.highlight), a.smoothscroll.documentReady = function(b) {
        var d,
            e,
            f = b("a.inner-link"),
            g = {};
        e = {
            selector: ".inner-link",
            selectorHeader: null,
            speed: 750,
            easing: "easeInOutCubic",
            offset: 0
        },
        f.length && (f.each(function(a) {
            var c = b(this),
                d = c.attr("href");
            "#" !== d.charAt(0) && c.removeClass("inner-link")
        }), a.smoothscroll.init(), b(c).on("resize", a.smoothscroll.init), d = 0, b("body[data-smooth-scroll-offset]").length && (d = b("body").attr("data-smooth-scroll-offset"), d = 1 * d), g.offset = 0 !== d ? d : void 0, smoothScroll.init(jQuery.extend({}, e, a.smoothscroll.options, g)))
    }, a.components.documentReady.push(a.smoothscroll.documentReady), a.components.windowLoad.push(a.smoothscroll.init), a
}(mr, jQuery, window, document),
mr = function(a, b, c, d) {
    "use strict";
    return a.tabs = a.tabs || {}, a.tabs.documentReady = function(b) {
        b(".tabs").each(function() {
            var a = b(this);
            a.after('<ul class="tabs-content">'),
            a.find("li").each(function() {
                var a = b(this),
                    c = a.find(".tab__content").wrap("<li></li>").parent(),
                    d = c.clone(!0, !0);
                c.remove(),
                a.closest(".tabs-container").find(".tabs-content").append(d)
            })
        }),
        b(".tabs > li").on("click", function() {
            var c,
                d = b(this);
            a.tabs.activateTab(d),
            d.is("[id]") && (c = "#" + d.attr("id"), history.pushState ? history.pushState(null, null, c) : location.hash = c)
        }),
        b(".tabs li.active").each(function() {
            a.tabs.activateTab(this)
        }),
        "" !== c.location.hash && a.tabs.activateTabById(c.location.hash),
        b('a[href^="#"]').on("click", function() {
            a.tabs.activateTabById(b(this).attr("href"))
        })
    }, a.tabs.activateTab = function(a) {
        var c,
            e = b(a),
            f = e.closest(".tabs-container"),
            g = 1 * e.index() + 1,
            h = f.find("> .tabs-content > li:nth-of-type(" + g + ")"),
            i = d.createEvent("Event");
        i.initEvent("tabOpened.tabs.mr", !0, !0),
        f.find("> .tabs > li").removeClass("active"),
        f.find("> .tabs-content > li").removeClass("active"),
        e.addClass("active").trigger("tabOpened.tabs.mr").get(0).dispatchEvent(i),
        h.addClass("active"),
        c = h.find("iframe"),
        c.length && c.attr("src", c.attr("src"))
    }, a.tabs.activateTabById = function(a) {
        "" !== a && "#" !== a && null === a.match(/#\/.*/) && b(".tabs > li#" + a.replace("#", "")).length && b(".tabs > li#" + a.replace("#", "")).click()
    }, a.components.documentReady.push(a.tabs.documentReady), a
}(mr, jQuery, window, document),
mr = function(a, b, c, d) {
    "use strict";
    return a.toggleClass = a.toggleClass || {}, a.toggleClass.documentReady = function(a) {
        a("[data-toggle-class]").each(function() {
            var b = a(this),
                c = b.attr("data-toggle-class").split("|");
            a(c).each(function() {
                var c = b,
                    d = [],
                    e = "",
                    f = "",
                    d = this.split(";");
                2 === d.length && (f = d[0], e = d[1], a(c).on("click", function() {
                    return c.hasClass("toggled-class") ? c.removeClass("toggled-class") : c.toggleClass("toggled-class"), a(f).toggleClass(e), !1
                }))
            })
        })
    }, a.components.documentReady.push(a.toggleClass.documentReady), a
}(mr, jQuery, window, document),
mr = function(a, b, c, d) {
    "use strict";
    return a.typed = a.typed || {}, a.typed.documentReady = function(b) {
        b(".typed-text").each(function() {
            var c = b(this),
                d = (c.attr("data-typed-strings") ? c.attr("data-typed-strings").split(",") : [], {
                    strings: [],
                    typeSpeed: 100,
                    loop: !0,
                    showCursor: !1
                }),
                e = {};
            e.strings = c.attr("data-typed-strings") ? c.attr("data-typed-strings").split(",") : void 0,
            b(c).typed(jQuery.extend({}, d, a.typed.options, e))
        })
    }, a.components.documentReady.push(a.typed.documentReady), a
}(mr, jQuery, window, document),
mr = function(a, b, c, d) {
    "use strict";
    return a.twitter = a.twitter || {}, a.twitter.options = a.twitter.options || {}, a.twitter.documentReady = function(b) {
        b(".tweets-feed").each(function(a) {
            b(this).attr("id", "tweets-" + a)
        }).each(function(c) {
            function d(b) {
                for (var c = b.length, d = 0, f = '<ul class="slides">'; c > d;)
                    f += "<li>" + b[d] + "</li>",
                    d++;
                return f += "</ul>", e.html(f), e.closest(".slider").length ? (a.sliders.documentReady(a.setContext()), f) : void 0
            }
            var e = b("#tweets-" + c),
                f = {
                    domId: "",
                    maxTweets: 6,
                    enableLinks: !0,
                    showUser: !0,
                    showTime: !0,
                    dateFunction: "",
                    showRetweet: !1,
                    customCallback: d
                };
            f = jQuery.extend(f, a.twitter.options),
            "undefined" != typeof e.attr("data-widget-id") ? f.id = e.attr("data-widget-id") : "undefined" != typeof e.attr("data-feed-name") && "" !== e.attr("data-feed-name") ? f.profile = {
                screenName: e.attr("data-feed-name").replace("@", "")
            } : "undefined" != typeof a.twitter.options.profile ? f.profile = {
                screenName: a.twitter.options.profile.replace("@", "")
            } : f.profile = {
                screenName: "twitter"
            },
            f.maxTweets = e.attr("data-amount") ? e.attr("data-amount") : f.maxTweets,
            e.closest(".twitter-feed--slider").length && e.addClass("slider"),
            twitterFetcher.fetch(f)
        })
    }, a.components.documentReady.push(a.twitter.documentReady), a
}(mr, jQuery, window, document),
mr = function(a, b, c, d) {
    "use strict";
    return a.video = a.video || {}, a.video.options = a.video.options || {}, a.video.options.ytplayer = a.video.options.ytplayer || {}, a.video.documentReady = function(b) {
        b(".youtube-background").length && b(".youtube-background").each(function() {
            var c = b(this),
                d = {
                    containment: "self",
                    autoPlay: !0,
                    mute: !0,
                    opacity: 1
                },
                e = {};
            e.videoURL = b(this).attr("data-video-url"),
            e.startAt = b(this).attr("data-start-at") ? parseInt(b(this).attr("data-start-at"), 10) : void 0,
            c.closest(".videobg").append('<div class="loading-indicator"></div>'),
            c.YTPlayer(jQuery.extend({}, d, a.video.options.ytplayer, e)),
            c.on("YTPStart", function() {
                c.closest(".videobg").addClass("video-active")
            })
        }),
        b(".videobg").find("video").length && b(".videobg").find("video").closest(".videobg").addClass("video-active"),
        b(".video-cover").each(function() {
            var a = b(this);
            a.find("iframe[src]").length && (a.find("iframe").attr("data-src", a.find("iframe").attr("src")), a.find("iframe").attr("src", ""))
        }),
        b(".video-cover .video-play-icon").on("click", function() {
            var a = b(this),
                c = a.closest(".video-cover");
            if (c.find("video").length) {
                var d = c.find("video").get(0);
                return c.addClass("reveal-video"), d.play(), !1
            }
            if (c.find("iframe").length) {
                var e = c.find("iframe");
                return e.attr("src", e.attr("data-src")), c.addClass("reveal-video"), !1
            }
        })
    }, a.components.documentReady.push(a.video.documentReady), a
}(mr, jQuery, window, document),
mr = function(a, b, c, d) {
    "use strict";
    return a.wizard = a.wizard || {}, a.wizard.documentReady = function(b) {
        b(".wizard").each(function() {
            var b = jQuery(this),
                c = {};
            c = {
                headerTag: "h5",
                bodyTag: "section",
                transitionEffect: "slideLeft",
                autoFocus: !0
            },
            b.is('[role="application"][id^="steps-uid"]') || (b.steps(jQuery.extend({}, c, a.wizard.options)), b.addClass("active"))
        })
    }, a.components.documentReady.push(a.wizard.documentReady), a
}(mr, jQuery, window, document),
function(a, b, c, d, e, f, g) {
    a.GoogleAnalyticsObject = e,
    a[e] = a[e] || function() {
        (a[e].q = a[e].q || []).push(arguments)
    },
    a[e].l = 1 * new Date,
    f = b.createElement(c),
    g = b.getElementsByTagName(c)[0],
    f.async = 1,
    f.src = d,
    g.parentNode.insertBefore(f, g)
}(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga"),
ga("create", "UA-52115242-5", "auto"),
ga("send", "pageview");
