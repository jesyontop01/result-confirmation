/*!
 * Font Awesome Free 5.15.1 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 */

!function() {
    "use strict";
    function r(t) {
        return (r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
            return typeof t;
        } : function(t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        })(t);
    }
    function i(t, n) {
        for (var e = 0; e < n.length; e++) {
            var a = n[e];
            a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
            Object.defineProperty(t, a.key, a);
        }
    }
    function $(r) {
        for (var t = 1; t < arguments.length; t++) {
            var i = null != arguments[t] ? arguments[t] : {}, n = Object.keys(i);
            "function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(i).filter(function(t) {
                return Object.getOwnPropertyDescriptor(i, t).enumerable;
            }))), n.forEach(function(t) {
                var n, e, a;
                n = r, a = i[e = t], e in n ? Object.defineProperty(n, e, {
                    value: a,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : n[e] = a;
            });
        }
        return r;
    }
    function p(t, n) {
        return function(t) {
            if (Array.isArray(t)) return t;
        }(t) || function(t, n) {
            var e = [], a = !0, r = !1, i = void 0;
            try {
                for (var o, c = t[Symbol.iterator](); !(a = (o = c.next()).done) && (e.push(o.value), 
                !n || e.length !== n); a = !0) ;
            } catch (t) {
                r = !0, i = t;
            } finally {
                try {
                    a || null == c.return || c.return();
                } finally {
                    if (r) throw i;
                }
            }
            return e;
        }(t, n) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }();
    }
    function d(t) {
        return function(t) {
            if (Array.isArray(t)) {
                for (var n = 0, e = new Array(t.length); n < t.length; n++) e[n] = t[n];
                return e;
            }
        }(t) || function(t) {
            if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) return Array.from(t);
        }(t) || function() {
            throw new TypeError("Invalid attempt to spread non-iterable instance");
        }();
    }
    var t = function() {}, n = {}, e = {}, a = null, o = {
        mark: t,
        measure: t
    };
    try {
        "undefined" != typeof window && (n = window), "undefined" != typeof document && (e = document), 
        "undefined" != typeof MutationObserver && (a = MutationObserver), "undefined" != typeof performance && (o = performance);
    } catch (t) {}
    var c = (n.navigator || {}).userAgent, s = void 0 === c ? "" : c, v = n, b = e, l = a, f = o, u = !!v.document, m = !!b.documentElement && !!b.head && "function" == typeof b.addEventListener && "function" == typeof b.createElement, k = ~s.indexOf("MSIE") || ~s.indexOf("Trident/"), h = "___FONT_AWESOME___", A = 16, g = "fa", y = "svg-inline--fa", tt = "data-fa-i2svg", w = "data-fa-pseudo-element", x = "data-fa-pseudo-element-pending", C = "data-prefix", M = "data-icon", O = "fontawesome-i2svg", P = "async", S = [ "HTML", "HEAD", "STYLE", "SCRIPT" ], N = function() {
        try {
            return !1;
        } catch (t) {
            return !1;
        }
    }(), z = {
        fas: "solid",
        far: "regular",
        fal: "light",
        fad: "duotone",
        fab: "brands",
        fak: "kit",
        fa: "solid"
    }, E = {
        solid: "fas",
        regular: "far",
        light: "fal",
        duotone: "fad",
        brands: "fab",
        kit: "fak"
    }, I = "fa-layers-text", j = /Font Awesome ([5 ]*)(Solid|Regular|Light|Duotone|Brands|Free|Pro|Kit).*/, L = {
        900: "fas",
        400: "far",
        normal: "far",
        300: "fal"
    }, R = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ], T = R.concat([ 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ]), _ = [ "class", "data-prefix", "data-icon", "data-fa-transform", "data-fa-mask" ], D = {
        GROUP: "group",
        SWAP_OPACITY: "swap-opacity",
        PRIMARY: "primary",
        SECONDARY: "secondary"
    }, F = [ "xs", "sm", "lg", "fw", "ul", "li", "border", "pull-left", "pull-right", "spin", "pulse", "rotate-90", "rotate-180", "rotate-270", "flip-horizontal", "flip-vertical", "flip-both", "stack", "stack-1x", "stack-2x", "inverse", "layers", "layers-text", "layers-counter", D.GROUP, D.SWAP_OPACITY, D.PRIMARY, D.SECONDARY ].concat(R.map(function(t) {
        return "".concat(t, "x");
    })).concat(T.map(function(t) {
        return "w-".concat(t);
    })), Y = v.FontAwesomeConfig || {};
    if (b && "function" == typeof b.querySelector) {
        [ [ "data-family-prefix", "familyPrefix" ], [ "data-replacement-class", "replacementClass" ], [ "data-auto-replace-svg", "autoReplaceSvg" ], [ "data-auto-add-css", "autoAddCss" ], [ "data-auto-a11y", "autoA11y" ], [ "data-search-pseudo-elements", "searchPseudoElements" ], [ "data-observe-mutations", "observeMutations" ], [ "data-mutate-approach", "mutateApproach" ], [ "data-keep-original-source", "keepOriginalSource" ], [ "data-measure-performance", "measurePerformance" ], [ "data-show-missing-icons", "showMissingIcons" ] ].forEach(function(t) {
            var n, e = p(t, 2), a = e[0], r = e[1], i = "" === (n = function(t) {
                var n = b.querySelector("script[" + t + "]");
                if (n) return n.getAttribute(t);
            }(a)) || "false" !== n && ("true" === n || n);
            null != i && (Y[r] = i);
        });
    }
    var H = $({}, {
        familyPrefix: g,
        replacementClass: y,
        autoReplaceSvg: !0,
        autoAddCss: !0,
        autoA11y: !0,
        searchPseudoElements: !1,
        observeMutations: !0,
        mutateApproach: "async",
        keepOriginalSource: !0,
        measurePerformance: !1,
        showMissingIcons: !0
    }, Y);
    H.autoReplaceSvg || (H.observeMutations = !1);
    var nt = $({}, H);
    v.FontAwesomeConfig = nt;
    var U = v || {};
    U[h] || (U[h] = {}), U[h].styles || (U[h].styles = {}), U[h].hooks || (U[h].hooks = {}), 
    U[h].shims || (U[h].shims = []);
    var X = U[h], B = [], W = !1;
    function q(t) {
        m && (W ? setTimeout(t, 0) : B.push(t));
    }
    m && ((W = (b.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(b.readyState)) || b.addEventListener("DOMContentLoaded", function t() {
        b.removeEventListener("DOMContentLoaded", t), W = 1, B.map(function(t) {
            return t();
        });
    }));
    var K, V = "pending", G = "settled", J = "fulfilled", Q = "rejected", Z = function() {}, et = "undefined" != typeof global && void 0 !== global.process && "function" == typeof global.process.emit, at = "undefined" == typeof setImmediate ? setTimeout : setImmediate, rt = [];
    function it() {
        for (var t = 0; t < rt.length; t++) rt[t][0](rt[t][1]);
        K = !(rt = []);
    }
    function ot(t, n) {
        rt.push([ t, n ]), K || (K = !0, at(it, 0));
    }
    function ct(t) {
        var n = t.owner, e = n._state, a = n._data, r = t[e], i = t.then;
        if ("function" == typeof r) {
            e = J;
            try {
                a = r(a);
            } catch (t) {
                ut(i, t);
            }
        }
        st(i, a) || (e === J && lt(i, a), e === Q && ut(i, a));
    }
    function st(n, e) {
        var a;
        try {
            if (n === e) throw new TypeError("A promises callback cannot return that same promise.");
            if (e && ("function" == typeof e || "object" === r(e))) {
                var t = e.then;
                if ("function" == typeof t) return t.call(e, function(t) {
                    a || (a = !0, e === t ? ft(n, t) : lt(n, t));
                }, function(t) {
                    a || (a = !0, ut(n, t));
                }), !0;
            }
        } catch (t) {
            return a || ut(n, t), !0;
        }
        return !1;
    }
    function lt(t, n) {
        t !== n && st(t, n) || ft(t, n);
    }
    function ft(t, n) {
        t._state === V && (t._state = G, t._data = n, ot(mt, t));
    }
    function ut(t, n) {
        t._state === V && (t._state = G, t._data = n, ot(pt, t));
    }
    function dt(t) {
        t._then = t._then.forEach(ct);
    }
    function mt(t) {
        t._state = J, dt(t);
    }
    function pt(t) {
        t._state = Q, dt(t), !t._handled && et && global.process.emit("unhandledRejection", t._data, t);
    }
    function ht(t) {
        global.process.emit("rejectionHandled", t);
    }
    function gt(t) {
        if ("function" != typeof t) throw new TypeError("Promise resolver " + t + " is not a function");
        if (this instanceof gt == !1) throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
        this._then = [], function(t, n) {
            function e(t) {
                ut(n, t);
            }
            try {
                t(function(t) {
                    lt(n, t);
                }, e);
            } catch (t) {
                e(t);
            }
        }(t, this);
    }
    gt.prototype = {
        constructor: gt,
        _state: V,
        _then: null,
        _data: void 0,
        _handled: !1,
        then: function(t, n) {
            var e = {
                owner: this,
                then: new this.constructor(Z),
                fulfilled: t,
                rejected: n
            };
            return !n && !t || this._handled || (this._handled = !0, this._state === Q && et && ot(ht, this)), 
            this._state === J || this._state === Q ? ot(ct, e) : this._then.push(e), e.then;
        },
        catch: function(t) {
            return this.then(null, t);
        }
    }, gt.all = function(c) {
        if (!Array.isArray(c)) throw new TypeError("You must pass an array to Promise.all().");
        return new gt(function(e, t) {
            var a = [], r = 0;
            function n(n) {
                return r++, function(t) {
                    a[n] = t, --r || e(a);
                };
            }
            for (var i, o = 0; o < c.length; o++) (i = c[o]) && "function" == typeof i.then ? i.then(n(o), t) : a[o] = i;
            r || e(a);
        });
    }, gt.race = function(r) {
        if (!Array.isArray(r)) throw new TypeError("You must pass an array to Promise.race().");
        return new gt(function(t, n) {
            for (var e, a = 0; a < r.length; a++) (e = r[a]) && "function" == typeof e.then ? e.then(t, n) : t(e);
        });
    }, gt.resolve = function(n) {
        return n && "object" === r(n) && n.constructor === gt ? n : new gt(function(t) {
            t(n);
        });
    }, gt.reject = function(e) {
        return new gt(function(t, n) {
            n(e);
        });
    };
    var vt = "function" == typeof Promise ? Promise : gt, bt = A, yt = {
        size: 16,
        x: 0,
        y: 0,
        rotate: 0,
        flipX: !1,
        flipY: !1
    };
    function wt(t) {
        if (t && m) {
            var n = b.createElement("style");
            n.setAttribute("type", "text/css"), n.innerHTML = t;
            for (var e = b.head.childNodes, a = null, r = e.length - 1; -1 < r; r--) {
                var i = e[r], o = (i.tagName || "").toUpperCase();
                -1 < [ "STYLE", "LINK" ].indexOf(o) && (a = i);
            }
            return b.head.insertBefore(n, a), t;
        }
    }
    var xt = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    function kt() {
        for (var t = 12, n = ""; 0 < t--; ) n += xt[62 * Math.random() | 0];
        return n;
    }
    function At(t) {
        for (var n = [], e = (t || []).length >>> 0; e--; ) n[e] = t[e];
        return n;
    }
    function Ct(t) {
        return t.classList ? At(t.classList) : (t.getAttribute("class") || "").split(" ").filter(function(t) {
            return t;
        });
    }
    function Mt(t, n) {
        var e, a = n.split("-"), r = a[0], i = a.slice(1).join("-");
        return r !== t || "" === i || (e = i, ~F.indexOf(e)) ? null : i;
    }
    function Ot(t) {
        return "".concat(t).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    function Pt(e) {
        return Object.keys(e || {}).reduce(function(t, n) {
            return t + "".concat(n, ": ").concat(e[n], ";");
        }, "");
    }
    function St(t) {
        return t.size !== yt.size || t.x !== yt.x || t.y !== yt.y || t.rotate !== yt.rotate || t.flipX || t.flipY;
    }
    function Nt(t) {
        var n = t.transform, e = t.containerWidth, a = t.iconWidth, r = {
            transform: "translate(".concat(e / 2, " 256)")
        }, i = "translate(".concat(32 * n.x, ", ").concat(32 * n.y, ") "), o = "scale(".concat(n.size / 16 * (n.flipX ? -1 : 1), ", ").concat(n.size / 16 * (n.flipY ? -1 : 1), ") "), c = "rotate(".concat(n.rotate, " 0 0)");
        return {
            outer: r,
            inner: {
                transform: "".concat(i, " ").concat(o, " ").concat(c)
            },
            path: {
                transform: "translate(".concat(a / 2 * -1, " -256)")
            }
        };
    }
    var zt = {
        x: 0,
        y: 0,
        width: "100%",
        height: "100%"
    };
    function Et(t) {
        var n = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
        return t.attributes && (t.attributes.fill || n) && (t.attributes.fill = "black"), 
        t;
    }
    function It(t) {
        var n = t.icons, e = n.main, a = n.mask, r = t.prefix, i = t.iconName, o = t.transform, c = t.symbol, s = t.title, l = t.maskId, f = t.titleId, u = t.extra, d = t.watchable, m = void 0 !== d && d, p = a.found ? a : e, h = p.width, g = p.height, v = "fak" === r, b = v ? "" : "fa-w-".concat(Math.ceil(h / g * 16)), y = [ nt.replacementClass, i ? "".concat(nt.familyPrefix, "-").concat(i) : "", b ].filter(function(t) {
            return -1 === u.classes.indexOf(t);
        }).filter(function(t) {
            return "" !== t || !!t;
        }).concat(u.classes).join(" "), w = {
            children: [],
            attributes: $({}, u.attributes, {
                "data-prefix": r,
                "data-icon": i,
                class: y,
                role: u.attributes.role || "img",
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 ".concat(h, " ").concat(g)
            })
        }, x = v && !~u.classes.indexOf("fa-fw") ? {
            width: "".concat(h / g * 16 * .0625, "em")
        } : {};
        m && (w.attributes[tt] = ""), s && w.children.push({
            tag: "title",
            attributes: {
                id: w.attributes["aria-labelledby"] || "title-".concat(f || kt())
            },
            children: [ s ]
        });
        var k, A, C, M, O, P, S, N, z, E, I, j, L, R, T, _, D, F, Y, H, U, X, B, W, q, K, V, G = $({}, w, {
            prefix: r,
            iconName: i,
            main: e,
            mask: a,
            maskId: l,
            transform: o,
            symbol: c,
            styles: $({}, x, u.styles)
        }), J = a.found && e.found ? (C = (k = G).children, M = k.attributes, O = k.main, 
        P = k.mask, S = k.maskId, N = k.transform, z = O.width, E = O.icon, I = P.width, 
        j = P.icon, L = Nt({
            transform: N,
            containerWidth: I,
            iconWidth: z
        }), R = {
            tag: "rect",
            attributes: $({}, zt, {
                fill: "white"
            })
        }, T = E.children ? {
            children: E.children.map(Et)
        } : {}, _ = {
            tag: "g",
            attributes: $({}, L.inner),
            children: [ Et($({
                tag: E.tag,
                attributes: $({}, E.attributes, L.path)
            }, T)) ]
        }, D = {
            tag: "g",
            attributes: $({}, L.outer),
            children: [ _ ]
        }, F = "mask-".concat(S || kt()), Y = "clip-".concat(S || kt()), H = {
            tag: "mask",
            attributes: $({}, zt, {
                id: F,
                maskUnits: "userSpaceOnUse",
                maskContentUnits: "userSpaceOnUse"
            }),
            children: [ R, D ]
        }, U = {
            tag: "defs",
            children: [ {
                tag: "clipPath",
                attributes: {
                    id: Y
                },
                children: (A = j, "g" === A.tag ? A.children : [ A ])
            }, H ]
        }, C.push(U, {
            tag: "rect",
            attributes: $({
                fill: "currentColor",
                "clip-path": "url(#".concat(Y, ")"),
                mask: "url(#".concat(F, ")")
            }, zt)
        }), {
            children: C,
            attributes: M
        }) : function(t) {
            var n = t.children, e = t.attributes, a = t.main, r = t.transform, i = Pt(t.styles);
            if (0 < i.length && (e.style = i), St(r)) {
                var o = Nt({
                    transform: r,
                    containerWidth: a.width,
                    iconWidth: a.width
                });
                n.push({
                    tag: "g",
                    attributes: $({}, o.outer),
                    children: [ {
                        tag: "g",
                        attributes: $({}, o.inner),
                        children: [ {
                            tag: a.icon.tag,
                            children: a.icon.children,
                            attributes: $({}, a.icon.attributes, o.path)
                        } ]
                    } ]
                });
            } else n.push(a.icon);
            return {
                children: n,
                attributes: e
            };
        }(G), Q = J.children, Z = J.attributes;
        return G.children = Q, G.attributes = Z, c ? (B = (X = G).prefix, W = X.iconName, 
        q = X.children, K = X.attributes, V = X.symbol, [ {
            tag: "svg",
            attributes: {
                style: "display: none;"
            },
            children: [ {
                tag: "symbol",
                attributes: $({}, K, {
                    id: !0 === V ? "".concat(B, "-").concat(nt.familyPrefix, "-").concat(W) : V
                }),
                children: q
            } ]
        } ]) : function(t) {
            var n = t.children, e = t.main, a = t.mask, r = t.attributes, i = t.styles, o = t.transform;
            if (St(o) && e.found && !a.found) {
                var c = e.width / e.height / 2, s = .5;
                r.style = Pt($({}, i, {
                    "transform-origin": "".concat(c + o.x / 16, "em ").concat(s + o.y / 16, "em")
                }));
            }
            return [ {
                tag: "svg",
                attributes: r,
                children: n
            } ];
        }(G);
    }
    function jt(t) {
        var n = t.content, e = t.width, a = t.height, r = t.transform, i = t.title, o = t.extra, c = t.watchable, s = void 0 !== c && c, l = $({}, o.attributes, i ? {
            title: i
        } : {}, {
            class: o.classes.join(" ")
        });
        s && (l[tt] = "");
        var f, u, d, m, p, h, g, v, b, y = $({}, o.styles);
        St(r) && (y.transform = (u = (f = {
            transform: r,
            startCentered: !0,
            width: e,
            height: a
        }).transform, d = f.width, m = void 0 === d ? A : d, p = f.height, h = void 0 === p ? A : p, 
        g = f.startCentered, b = "", b += (v = void 0 !== g && g) && k ? "translate(".concat(u.x / bt - m / 2, "em, ").concat(u.y / bt - h / 2, "em) ") : v ? "translate(calc(-50% + ".concat(u.x / bt, "em), calc(-50% + ").concat(u.y / bt, "em)) ") : "translate(".concat(u.x / bt, "em, ").concat(u.y / bt, "em) "), 
        b += "scale(".concat(u.size / bt * (u.flipX ? -1 : 1), ", ").concat(u.size / bt * (u.flipY ? -1 : 1), ") "), 
        b += "rotate(".concat(u.rotate, "deg) ")), y["-webkit-transform"] = y.transform);
        var w = Pt(y);
        0 < w.length && (l.style = w);
        var x = [];
        return x.push({
            tag: "span",
            attributes: l,
            children: [ n ]
        }), i && x.push({
            tag: "span",
            attributes: {
                class: "sr-only"
            },
            children: [ i ]
        }), x;
    }
    var Lt = function() {}, Rt = nt.measurePerformance && f && f.mark && f.measure ? f : {
        mark: Lt,
        measure: Lt
    }, Tt = 'FA "5.15.1"', _t = function(t) {
        Rt.mark("".concat(Tt, " ").concat(t, " ends")), Rt.measure("".concat(Tt, " ").concat(t), "".concat(Tt, " ").concat(t, " begins"), "".concat(Tt, " ").concat(t, " ends"));
    }, Dt = {
        begin: function(t) {
            return Rt.mark("".concat(Tt, " ").concat(t, " begins")), function() {
                return _t(t);
            };
        },
        end: _t
    }, Ft = function(t, n, e, a) {
        var r, i, o, c, s, l = Object.keys(t), f = l.length, u = void 0 !== a ? (c = n, 
        s = a, function(t, n, e, a) {
            return c.call(s, t, n, e, a);
        }) : n;
        for (o = void 0 === e ? (r = 1, t[l[0]]) : (r = 0, e); r < f; r++) o = u(o, t[i = l[r]], i, t);
        return o;
    };
    function Yt(t) {
        for (var n = "", e = 0; e < t.length; e++) {
            n += ("000" + t.charCodeAt(e).toString(16)).slice(-4);
        }
        return n;
    }
    var Ht = X.styles, Ut = X.shims, Xt = {}, Bt = {}, Wt = {}, qt = function() {
        var t = function(a) {
            return Ft(Ht, function(t, n, e) {
                return t[e] = Ft(n, a, {}), t;
            }, {});
        };
        Xt = t(function(t, n, e) {
            return n[3] && (t[n[3]] = e), t;
        }), Bt = t(function(n, t, e) {
            var a = t[2];
            return n[e] = e, a.forEach(function(t) {
                n[t] = e;
            }), n;
        });
        var i = "far" in Ht;
        Wt = Ft(Ut, function(t, n) {
            var e = n[0], a = n[1], r = n[2];
            return "far" !== a || i || (a = "fas"), t[e] = {
                prefix: a,
                iconName: r
            }, t;
        }, {});
    };
    function Kt(t, n) {
        return (Xt[t] || {})[n];
    }
    qt();
    var Vt = X.styles, Gt = function() {
        return {
            prefix: null,
            iconName: null,
            rest: []
        };
    };
    function Jt(t) {
        return t.reduce(function(t, n) {
            var e = Mt(nt.familyPrefix, n);
            if (Vt[n]) t.prefix = n; else if (nt.autoFetchSvg && -1 < Object.keys(z).indexOf(n)) t.prefix = n; else if (e) {
                var a = "fa" === t.prefix ? Wt[e] || {
                    prefix: null,
                    iconName: null
                } : {};
                t.iconName = a.iconName || e, t.prefix = a.prefix || t.prefix;
            } else n !== nt.replacementClass && 0 !== n.indexOf("fa-w-") && t.rest.push(n);
            return t;
        }, Gt());
    }
    function Qt(t, n, e) {
        if (t && t[n] && t[n][e]) return {
            prefix: n,
            iconName: e,
            icon: t[n][e]
        };
    }
    function Zt(t) {
        var e, n = t.tag, a = t.attributes, r = void 0 === a ? {} : a, i = t.children, o = void 0 === i ? [] : i;
        return "string" == typeof t ? Ot(t) : "<".concat(n, " ").concat((e = r, Object.keys(e || {}).reduce(function(t, n) {
            return t + "".concat(n, '="').concat(Ot(e[n]), '" ');
        }, "").trim()), ">").concat(o.map(Zt).join(""), "</").concat(n, ">");
    }
    var $t = function() {};
    function tn(t) {
        return "string" == typeof (t.getAttribute ? t.getAttribute(tt) : null);
    }
    var nn = {
        replace: function(t) {
            var n = t[0], e = t[1].map(function(t) {
                return Zt(t);
            }).join("\n");
            if (n.parentNode && n.outerHTML) n.outerHTML = e + (nt.keepOriginalSource && "svg" !== n.tagName.toLowerCase() ? "\x3c!-- ".concat(n.outerHTML, " Font Awesome fontawesome.com --\x3e") : ""); else if (n.parentNode) {
                var a = document.createElement("span");
                n.parentNode.replaceChild(a, n), a.outerHTML = e;
            }
        },
        nest: function(t) {
            var n = t[0], e = t[1];
            if (~Ct(n).indexOf(nt.replacementClass)) return nn.replace(t);
            var a = new RegExp("".concat(nt.familyPrefix, "-.*"));
            delete e[0].attributes.style, delete e[0].attributes.id;
            var r = e[0].attributes.class.split(" ").reduce(function(t, n) {
                return n === nt.replacementClass || n.match(a) ? t.toSvg.push(n) : t.toNode.push(n), 
                t;
            }, {
                toNode: [],
                toSvg: []
            });
            e[0].attributes.class = r.toSvg.join(" ");
            var i = e.map(function(t) {
                return Zt(t);
            }).join("\n");
            n.setAttribute("class", r.toNode.join(" ")), n.setAttribute(tt, ""), n.innerHTML = i;
        }
    };
    function en(t) {
        t();
    }
    function an(e, t) {
        var a = "function" == typeof t ? t : $t;
        if (0 === e.length) a(); else {
            var n = en;
            nt.mutateApproach === P && (n = v.requestAnimationFrame || en), n(function() {
                var t = !0 === nt.autoReplaceSvg ? nn.replace : nn[nt.autoReplaceSvg] || nn.replace, n = Dt.begin("mutate");
                e.map(t), n(), a();
            });
        }
    }
    var rn = !1;
    function on() {
        rn = !1;
    }
    var cn = null;
    function sn(t) {
        if (l && nt.observeMutations) {
            var r = t.treeCallback, i = t.nodeCallback, o = t.pseudoElementsCallback, n = t.observeMutationsRoot, e = void 0 === n ? b : n;
            cn = new l(function(t) {
                rn || At(t).forEach(function(t) {
                    if ("childList" === t.type && 0 < t.addedNodes.length && !tn(t.addedNodes[0]) && (nt.searchPseudoElements && o(t.target), 
                    r(t.target)), "attributes" === t.type && t.target.parentNode && nt.searchPseudoElements && o(t.target.parentNode), 
                    "attributes" === t.type && tn(t.target) && ~_.indexOf(t.attributeName)) if ("class" === t.attributeName) {
                        var n = Jt(Ct(t.target)), e = n.prefix, a = n.iconName;
                        e && t.target.setAttribute("data-prefix", e), a && t.target.setAttribute("data-icon", a);
                    } else i(t.target);
                });
            }), m && cn.observe(e, {
                childList: !0,
                attributes: !0,
                characterData: !0,
                subtree: !0
            });
        }
    }
    function ln(t) {
        var n, e, a = t.getAttribute("data-prefix"), r = t.getAttribute("data-icon"), i = void 0 !== t.innerText ? t.innerText.trim() : "", o = Jt(Ct(t));
        return a && r && (o.prefix = a, o.iconName = r), o.prefix && 1 < i.length ? o.iconName = (n = o.prefix, 
        e = t.innerText, (Bt[n] || {})[e]) : o.prefix && 1 === i.length && (o.iconName = Kt(o.prefix, Yt(t.innerText))), 
        o;
    }
    var fn = function(t) {
        var n = {
            size: 16,
            x: 0,
            y: 0,
            flipX: !1,
            flipY: !1,
            rotate: 0
        };
        return t ? t.toLowerCase().split(" ").reduce(function(t, n) {
            var e = n.toLowerCase().split("-"), a = e[0], r = e.slice(1).join("-");
            if (a && "h" === r) return t.flipX = !0, t;
            if (a && "v" === r) return t.flipY = !0, t;
            if (r = parseFloat(r), isNaN(r)) return t;
            switch (a) {
              case "grow":
                t.size = t.size + r;
                break;

              case "shrink":
                t.size = t.size - r;
                break;

              case "left":
                t.x = t.x - r;
                break;

              case "right":
                t.x = t.x + r;
                break;

              case "up":
                t.y = t.y - r;
                break;

              case "down":
                t.y = t.y + r;
                break;

              case "rotate":
                t.rotate = t.rotate + r;
            }
            return t;
        }, n) : n;
    };
    function un(t) {
        var n, e, a, r, i, o, c, s, l = ln(t), f = l.iconName, u = l.prefix, d = l.rest, m = (n = t.getAttribute("style"), 
        e = [], n && (e = n.split(";").reduce(function(t, n) {
            var e = n.split(":"), a = e[0], r = e.slice(1);
            return a && 0 < r.length && (t[a] = r.join(":").trim()), t;
        }, {})), e), p = fn(t.getAttribute("data-fa-transform")), h = null !== (a = t.getAttribute("data-fa-symbol")) && ("" === a || a), g = (i = At((r = t).attributes).reduce(function(t, n) {
            return "class" !== t.name && "style" !== t.name && (t[n.name] = n.value), t;
        }, {}), o = r.getAttribute("title"), c = r.getAttribute("data-fa-title-id"), nt.autoA11y && (o ? i["aria-labelledby"] = "".concat(nt.replacementClass, "-title-").concat(c || kt()) : (i["aria-hidden"] = "true", 
        i.focusable = "false")), i), v = (s = t.getAttribute("data-fa-mask")) ? Jt(s.split(" ").map(function(t) {
            return t.trim();
        })) : Gt();
        return {
            iconName: f,
            title: t.getAttribute("title"),
            titleId: t.getAttribute("data-fa-title-id"),
            prefix: u,
            transform: p,
            symbol: h,
            mask: v,
            maskId: t.getAttribute("data-fa-mask-id"),
            extra: {
                classes: d,
                styles: m,
                attributes: g
            }
        };
    }
    function dn(t) {
        this.name = "MissingIcon", this.message = t || "Icon unavailable", this.stack = new Error().stack;
    }
    (dn.prototype = Object.create(Error.prototype)).constructor = dn;
    var mn = {
        fill: "currentColor"
    }, pn = {
        attributeType: "XML",
        repeatCount: "indefinite",
        dur: "2s"
    }, hn = {
        tag: "path",
        attributes: $({}, mn, {
            d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"
        })
    }, gn = $({}, pn, {
        attributeName: "opacity"
    }), vn = {
        tag: "g",
        children: [ hn, {
            tag: "circle",
            attributes: $({}, mn, {
                cx: "256",
                cy: "364",
                r: "28"
            }),
            children: [ {
                tag: "animate",
                attributes: $({}, pn, {
                    attributeName: "r",
                    values: "28;14;28;28;14;28;"
                })
            }, {
                tag: "animate",
                attributes: $({}, gn, {
                    values: "1;0;1;1;0;1;"
                })
            } ]
        }, {
            tag: "path",
            attributes: $({}, mn, {
                opacity: "1",
                d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
            }),
            children: [ {
                tag: "animate",
                attributes: $({}, gn, {
                    values: "1;0;0;0;0;1;"
                })
            } ]
        }, {
            tag: "path",
            attributes: $({}, mn, {
                opacity: "0",
                d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
            }),
            children: [ {
                tag: "animate",
                attributes: $({}, gn, {
                    values: "0;0;1;1;0;0;"
                })
            } ]
        } ]
    }, bn = X.styles;
    function yn(t) {
        var n = t[0], e = t[1], a = p(t.slice(4), 1)[0];
        return {
            found: !0,
            width: n,
            height: e,
            icon: Array.isArray(a) ? {
                tag: "g",
                attributes: {
                    class: "".concat(nt.familyPrefix, "-").concat(D.GROUP)
                },
                children: [ {
                    tag: "path",
                    attributes: {
                        class: "".concat(nt.familyPrefix, "-").concat(D.SECONDARY),
                        fill: "currentColor",
                        d: a[0]
                    }
                }, {
                    tag: "path",
                    attributes: {
                        class: "".concat(nt.familyPrefix, "-").concat(D.PRIMARY),
                        fill: "currentColor",
                        d: a[1]
                    }
                } ]
            } : {
                tag: "path",
                attributes: {
                    fill: "currentColor",
                    d: a
                }
            }
        };
    }
    function wn(a, r) {
        return new vt(function(t, n) {
            var e = {
                found: !1,
                width: 512,
                height: 512,
                icon: vn
            };
            if (a && r && bn[r] && bn[r][a]) return t(yn(bn[r][a]));
            !function() {
                var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, n = 1 < arguments.length ? arguments[1] : void 0;
                if (n && function(t) {
                    if (1 !== t.length) return !1;
                    var n, e, a, r, i, o = (e = 0, r = (n = t).length, 55296 <= (i = n.charCodeAt(e)) && i <= 56319 && e + 1 < r && 56320 <= (a = n.charCodeAt(e + 1)) && a <= 57343 ? 1024 * (i - 55296) + a - 56320 + 65536 : i);
                    return 57344 <= o && o <= 63743;
                }(n)) {
                    if (t && t.iconUploads) {
                        var e = t.iconUploads, a = Object.keys(e).find(function(t) {
                            return e[t] && e[t].u && e[t].u === Yt(n);
                        });
                        if (a) e[a].v;
                    }
                } else if (t && t.iconUploads && t.iconUploads[n] && t.iconUploads[n].v) t.iconUploads[n].v;
            }(v.FontAwesomeKitConfig, a);
            v.FontAwesomeKitConfig && v.FontAwesomeKitConfig.token && v.FontAwesomeKitConfig.token, 
            a && r && !nt.showMissingIcons ? n(new dn("Icon is missing for prefix ".concat(r, " with icon name ").concat(a))) : t(e);
        });
    }
    var xn = X.styles;
    function kn(t) {
        var i, n, o, c, s, l, f, u, e, d, m, a = un(t);
        return ~a.extra.classes.indexOf(I) ? function(t, n) {
            var e = n.title, a = n.transform, r = n.extra, i = null, o = null;
            if (k) {
                var c = parseInt(getComputedStyle(t).fontSize, 10), s = t.getBoundingClientRect();
                i = s.width / c, o = s.height / c;
            }
            return nt.autoA11y && !e && (r.attributes["aria-hidden"] = "true"), vt.resolve([ t, jt({
                content: t.innerHTML,
                width: i,
                height: o,
                transform: a,
                title: e,
                extra: r,
                watchable: !0
            }) ]);
        }(t, a) : (i = t, o = (n = a).iconName, c = n.title, s = n.titleId, l = n.prefix, 
        f = n.transform, u = n.symbol, e = n.mask, d = n.maskId, m = n.extra, new vt(function(r, t) {
            vt.all([ wn(o, l), wn(e.iconName, e.prefix) ]).then(function(t) {
                var n = p(t, 2), e = n[0], a = n[1];
                r([ i, It({
                    icons: {
                        main: e,
                        mask: a
                    },
                    prefix: l,
                    iconName: o,
                    transform: f,
                    symbol: u,
                    mask: a,
                    maskId: d,
                    title: c,
                    titleId: s,
                    extra: m,
                    watchable: !0
                }) ]);
            });
        }));
    }
    function An(t) {
        var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null;
        if (m) {
            var n = b.documentElement.classList, a = function(t) {
                return n.add("".concat(O, "-").concat(t));
            }, r = function(t) {
                return n.remove("".concat(O, "-").concat(t));
            }, i = nt.autoFetchSvg ? Object.keys(z) : Object.keys(xn), o = [ ".".concat(I, ":not([").concat(tt, "])") ].concat(i.map(function(t) {
                return ".".concat(t, ":not([").concat(tt, "])");
            })).join(", ");
            if (0 !== o.length) {
                var c = [];
                try {
                    c = At(t.querySelectorAll(o));
                } catch (t) {}
                if (0 < c.length) {
                    a("pending"), r("complete");
                    var s = Dt.begin("onTree"), l = c.reduce(function(t, n) {
                        try {
                            var e = kn(n);
                            e && t.push(e);
                        } catch (t) {
                            N || t instanceof dn && console.error(t);
                        }
                        return t;
                    }, []);
                    return new vt(function(n, t) {
                        vt.all(l).then(function(t) {
                            an(t, function() {
                                a("active"), a("complete"), r("pending"), "function" == typeof e && e(), s(), n();
                            });
                        }).catch(function() {
                            s(), t();
                        });
                    });
                }
            }
        }
    }
    function Cn(t) {
        var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : null;
        kn(t).then(function(t) {
            t && an([ t ], n);
        });
    }
    function Mn(p, h) {
        var g = "".concat(x).concat(h.replace(":", "-"));
        return new vt(function(a, t) {
            if (null !== p.getAttribute(g)) return a();
            var n = At(p.children).filter(function(t) {
                return t.getAttribute(w) === h;
            })[0], e = v.getComputedStyle(p, h), r = e.getPropertyValue("font-family").match(j), i = e.getPropertyValue("font-weight"), o = e.getPropertyValue("content");
            if (n && !r) return p.removeChild(n), a();
            if (r && "none" !== o && "" !== o) {
                var c = e.getPropertyValue("content"), s = ~[ "Solid", "Regular", "Light", "Duotone", "Brands", "Kit" ].indexOf(r[2]) ? E[r[2].toLowerCase()] : L[i], l = Yt(3 === c.length ? c.substr(1, 1) : c), f = Kt(s, l), u = f;
                if (!f || n && n.getAttribute(C) === s && n.getAttribute(M) === u) a(); else {
                    p.setAttribute(g, u), n && p.removeChild(n);
                    var d = {
                        iconName: null,
                        title: null,
                        titleId: null,
                        prefix: null,
                        transform: yt,
                        symbol: !1,
                        mask: null,
                        maskId: null,
                        extra: {
                            classes: [],
                            styles: {},
                            attributes: {}
                        }
                    }, m = d.extra;
                    m.attributes[w] = h, wn(f, s).then(function(t) {
                        var n = It($({}, d, {
                            icons: {
                                main: t,
                                mask: Gt()
                            },
                            prefix: s,
                            iconName: u,
                            extra: m,
                            watchable: !0
                        })), e = b.createElement("svg");
                        ":before" === h ? p.insertBefore(e, p.firstChild) : p.appendChild(e), e.outerHTML = n.map(function(t) {
                            return Zt(t);
                        }).join("\n"), p.removeAttribute(g), a();
                    }).catch(t);
                }
            } else a();
        });
    }
    function On(t) {
        return vt.all([ Mn(t, ":before"), Mn(t, ":after") ]);
    }
    function Pn(t) {
        return !(t.parentNode === document.head || ~S.indexOf(t.tagName.toUpperCase()) || t.getAttribute(w) || t.parentNode && "svg" === t.parentNode.tagName);
    }
    function Sn(r) {
        if (m) return new vt(function(t, n) {
            var e = At(r.querySelectorAll("*")).filter(Pn).map(On), a = Dt.begin("searchPseudoElements");
            rn = !0, vt.all(e).then(function() {
                a(), on(), t();
            }).catch(function() {
                a(), on(), n();
            });
        });
    }
    var Nn = 'svg:not(:root).svg-inline--fa {\n  overflow: visible;\n}\n\n.svg-inline--fa {\n  display: inline-block;\n  font-size: inherit;\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.225em;\n}\n.svg-inline--fa.fa-w-1 {\n  width: 0.0625em;\n}\n.svg-inline--fa.fa-w-2 {\n  width: 0.125em;\n}\n.svg-inline--fa.fa-w-3 {\n  width: 0.1875em;\n}\n.svg-inline--fa.fa-w-4 {\n  width: 0.25em;\n}\n.svg-inline--fa.fa-w-5 {\n  width: 0.3125em;\n}\n.svg-inline--fa.fa-w-6 {\n  width: 0.375em;\n}\n.svg-inline--fa.fa-w-7 {\n  width: 0.4375em;\n}\n.svg-inline--fa.fa-w-8 {\n  width: 0.5em;\n}\n.svg-inline--fa.fa-w-9 {\n  width: 0.5625em;\n}\n.svg-inline--fa.fa-w-10 {\n  width: 0.625em;\n}\n.svg-inline--fa.fa-w-11 {\n  width: 0.6875em;\n}\n.svg-inline--fa.fa-w-12 {\n  width: 0.75em;\n}\n.svg-inline--fa.fa-w-13 {\n  width: 0.8125em;\n}\n.svg-inline--fa.fa-w-14 {\n  width: 0.875em;\n}\n.svg-inline--fa.fa-w-15 {\n  width: 0.9375em;\n}\n.svg-inline--fa.fa-w-16 {\n  width: 1em;\n}\n.svg-inline--fa.fa-w-17 {\n  width: 1.0625em;\n}\n.svg-inline--fa.fa-w-18 {\n  width: 1.125em;\n}\n.svg-inline--fa.fa-w-19 {\n  width: 1.1875em;\n}\n.svg-inline--fa.fa-w-20 {\n  width: 1.25em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: 0.3em;\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: 0.3em;\n  width: auto;\n}\n.svg-inline--fa.fa-border {\n  height: 1.5em;\n}\n.svg-inline--fa.fa-li {\n  width: 2em;\n}\n.svg-inline--fa.fa-fw {\n  width: 1.25em;\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: #ff253a;\n  border-radius: 1em;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: #fff;\n  height: 1.5em;\n  line-height: 1;\n  max-width: 5em;\n  min-width: 1.5em;\n  overflow: hidden;\n  padding: 0.25em;\n  right: 0;\n  text-overflow: ellipsis;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: 0;\n  right: 0;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: 0;\n  left: 0;\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  right: 0;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: 0;\n  right: auto;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top left;\n          transform-origin: top left;\n}\n\n.fa-lg {\n  font-size: 1.3333333333em;\n  line-height: 0.75em;\n  vertical-align: -0.0667em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: 2.5em;\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: -2em;\n  position: absolute;\n  text-align: center;\n  width: 2em;\n  line-height: inherit;\n}\n\n.fa-border {\n  border: solid 0.08em #eee;\n  border-radius: 0.1em;\n  padding: 0.2em 0.25em 0.15em;\n}\n\n.fa-pull-left {\n  float: left;\n}\n\n.fa-pull-right {\n  float: right;\n}\n\n.fa.fa-pull-left,\n.fas.fa-pull-left,\n.far.fa-pull-left,\n.fal.fa-pull-left,\n.fab.fa-pull-left {\n  margin-right: 0.3em;\n}\n.fa.fa-pull-right,\n.fas.fa-pull-right,\n.far.fa-pull-right,\n.fal.fa-pull-right,\n.fab.fa-pull-right {\n  margin-left: 0.3em;\n}\n\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n          animation: fa-spin 2s infinite linear;\n}\n\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n          animation: fa-spin 1s infinite steps(8);\n}\n\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=1)";\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2)";\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=3)";\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)";\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1);\n}\n\n.fa-flip-both, .fa-flip-horizontal.fa-flip-vertical {\n  -ms-filter: "progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)";\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1);\n}\n\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical,\n:root .fa-flip-both {\n  -webkit-filter: none;\n          filter: none;\n}\n\n.fa-stack {\n  display: inline-block;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: #fff;\n}\n\n.sr-only {\n  border: 0;\n  clip: rect(0, 0, 0, 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px;\n}\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  clip: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  position: static;\n  width: auto;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: 1;\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: 0.4;\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: 0.4;\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: 1;\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}\n\n.fad.fa-inverse {\n  color: #fff;\n}';
    function zn() {
        var t = g, n = y, e = nt.familyPrefix, a = nt.replacementClass, r = Nn;
        if (e !== t || a !== n) {
            var i = new RegExp("\\.".concat(t, "\\-"), "g"), o = new RegExp("\\--".concat(t, "\\-"), "g"), c = new RegExp("\\.".concat(n), "g");
            r = r.replace(i, ".".concat(e, "-")).replace(o, "--".concat(e, "-")).replace(c, ".".concat(a));
        }
        return r;
    }
    function En() {
        nt.autoAddCss && !Tn && (wt(zn()), Tn = !0);
    }
    function In(n, t) {
        return Object.defineProperty(n, "abstract", {
            get: t
        }), Object.defineProperty(n, "html", {
            get: function() {
                return n.abstract.map(function(t) {
                    return Zt(t);
                });
            }
        }), Object.defineProperty(n, "node", {
            get: function() {
                if (m) {
                    var t = b.createElement("div");
                    return t.innerHTML = n.html, t.children;
                }
            }
        }), n;
    }
    function jn(t) {
        var n = t.prefix, e = void 0 === n ? "fa" : n, a = t.iconName;
        if (a) return Qt(Rn.definitions, e, a) || Qt(X.styles, e, a);
    }
    var Ln, Rn = new (function() {
        function t() {
            !function(t, n) {
                if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
            }(this, t), this.definitions = {};
        }
        var n, e, a;
        return n = t, (e = [ {
            key: "add",
            value: function() {
                for (var n = this, t = arguments.length, e = new Array(t), a = 0; a < t; a++) e[a] = arguments[a];
                var r = e.reduce(this._pullDefinitions, {});
                Object.keys(r).forEach(function(t) {
                    n.definitions[t] = $({}, n.definitions[t] || {}, r[t]), function t(n, a) {
                        var e = (2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}).skipHooks, r = void 0 !== e && e, i = Object.keys(a).reduce(function(t, n) {
                            var e = a[n];
                            return e.icon ? t[e.iconName] = e.icon : t[n] = e, t;
                        }, {});
                        "function" != typeof X.hooks.addPack || r ? X.styles[n] = $({}, X.styles[n] || {}, i) : X.hooks.addPack(n, i), 
                        "fas" === n && t("fa", a);
                    }(t, r[t]), qt();
                });
            }
        }, {
            key: "reset",
            value: function() {
                this.definitions = {};
            }
        }, {
            key: "_pullDefinitions",
            value: function(i, t) {
                var o = t.prefix && t.iconName && t.icon ? {
                    0: t
                } : t;
                return Object.keys(o).map(function(t) {
                    var n = o[t], e = n.prefix, a = n.iconName, r = n.icon;
                    i[e] || (i[e] = {}), i[e][a] = r;
                }), i;
            }
        } ]) && i(n.prototype, e), a && i(n, a), t;
    }())(), Tn = !1, _n = {
        i2svg: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            if (m) {
                En();
                var n = t.node, e = void 0 === n ? b : n, a = t.callback, r = void 0 === a ? function() {} : a;
                return nt.searchPseudoElements && Sn(e), An(e, r);
            }
            return vt.reject("Operation requires a DOM of some kind.");
        },
        css: zn,
        insertCss: function() {
            Tn || (wt(zn()), Tn = !0);
        },
        watch: function() {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, n = t.autoReplaceSvgRoot, e = t.observeMutationsRoot;
            !1 === nt.autoReplaceSvg && (nt.autoReplaceSvg = !0), nt.observeMutations = !0, 
            q(function() {
                Yn({
                    autoReplaceSvgRoot: n
                }), sn({
                    treeCallback: An,
                    nodeCallback: Cn,
                    pseudoElementsCallback: Sn,
                    observeMutationsRoot: e
                });
            });
        }
    }, Dn = (Ln = function(t) {
        var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, e = n.transform, a = void 0 === e ? yt : e, r = n.symbol, i = void 0 !== r && r, o = n.mask, c = void 0 === o ? null : o, s = n.maskId, l = void 0 === s ? null : s, f = n.title, u = void 0 === f ? null : f, d = n.titleId, m = void 0 === d ? null : d, p = n.classes, h = void 0 === p ? [] : p, g = n.attributes, v = void 0 === g ? {} : g, b = n.styles, y = void 0 === b ? {} : b;
        if (t) {
            var w = t.prefix, x = t.iconName, k = t.icon;
            return In($({
                type: "icon"
            }, t), function() {
                return En(), nt.autoA11y && (u ? v["aria-labelledby"] = "".concat(nt.replacementClass, "-title-").concat(m || kt()) : (v["aria-hidden"] = "true", 
                v.focusable = "false")), It({
                    icons: {
                        main: yn(k),
                        mask: c ? yn(c.icon) : {
                            found: !1,
                            width: null,
                            height: null,
                            icon: {}
                        }
                    },
                    prefix: w,
                    iconName: x,
                    transform: $({}, yt, a),
                    symbol: i,
                    title: u,
                    maskId: l,
                    titleId: m,
                    extra: {
                        attributes: v,
                        styles: y,
                        classes: h
                    }
                });
            });
        }
    }, function(t) {
        var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, e = (t || {}).icon ? t : jn(t || {}), a = n.mask;
        return a && (a = (a || {}).icon ? a : jn(a || {})), Ln(e, $({}, n, {
            mask: a
        }));
    }), Fn = {
        noAuto: function() {
            nt.autoReplaceSvg = !1, nt.observeMutations = !1, cn && cn.disconnect();
        },
        config: nt,
        dom: _n,
        library: Rn,
        parse: {
            transform: function(t) {
                return fn(t);
            }
        },
        findIconDefinition: jn,
        icon: Dn,
        text: function(t) {
            var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, e = n.transform, a = void 0 === e ? yt : e, r = n.title, i = void 0 === r ? null : r, o = n.classes, c = void 0 === o ? [] : o, s = n.attributes, l = void 0 === s ? {} : s, f = n.styles, u = void 0 === f ? {} : f;
            return In({
                type: "text",
                content: t
            }, function() {
                return En(), jt({
                    content: t,
                    transform: $({}, yt, a),
                    title: i,
                    extra: {
                        attributes: l,
                        styles: u,
                        classes: [ "".concat(nt.familyPrefix, "-layers-text") ].concat(d(c))
                    }
                });
            });
        },
        counter: function(t) {
            var n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}, e = n.title, a = void 0 === e ? null : e, r = n.classes, i = void 0 === r ? [] : r, o = n.attributes, c = void 0 === o ? {} : o, s = n.styles, l = void 0 === s ? {} : s;
            return In({
                type: "counter",
                content: t
            }, function() {
                return En(), function(t) {
                    var n = t.content, e = t.title, a = t.extra, r = $({}, a.attributes, e ? {
                        title: e
                    } : {}, {
                        class: a.classes.join(" ")
                    }), i = Pt(a.styles);
                    0 < i.length && (r.style = i);
                    var o = [];
                    return o.push({
                        tag: "span",
                        attributes: r,
                        children: [ n ]
                    }), e && o.push({
                        tag: "span",
                        attributes: {
                            class: "sr-only"
                        },
                        children: [ e ]
                    }), o;
                }({
                    content: t.toString(),
                    title: a,
                    extra: {
                        attributes: c,
                        styles: l,
                        classes: [ "".concat(nt.familyPrefix, "-layers-counter") ].concat(d(i))
                    }
                });
            });
        },
        layer: function(t) {
            var n = (1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}).classes, e = void 0 === n ? [] : n;
            return In({
                type: "layer"
            }, function() {
                En();
                var n = [];
                return t(function(t) {
                    Array.isArray(t) ? t.map(function(t) {
                        n = n.concat(t.abstract);
                    }) : n = n.concat(t.abstract);
                }), [ {
                    tag: "span",
                    attributes: {
                        class: [ "".concat(nt.familyPrefix, "-layers") ].concat(d(e)).join(" ")
                    },
                    children: n
                } ];
            });
        },
        toHtml: Zt
    }, Yn = function() {
        var t = (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}).autoReplaceSvgRoot, n = void 0 === t ? b : t;
        (0 < Object.keys(X.styles).length || nt.autoFetchSvg) && m && nt.autoReplaceSvg && Fn.dom.i2svg({
            node: n
        });
    };
    !function(t) {
        try {
            t();
        } catch (t) {
            if (!N) throw t;
        }
    }(function() {
        u && (v.FontAwesome || (v.FontAwesome = Fn), q(function() {
            Yn(), sn({
                treeCallback: An,
                nodeCallback: Cn,
                pseudoElementsCallback: Sn
            });
        })), X.hooks = $({}, X.hooks, {
            addPack: function(t, n) {
                X.styles[t] = $({}, X.styles[t] || {}, n), qt(), Yn();
            },
            addShims: function(t) {
                var n;
                (n = X.shims).push.apply(n, d(t)), qt(), Yn();
            }
        });
    });
}();