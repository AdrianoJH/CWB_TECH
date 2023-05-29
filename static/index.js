!(function (t, e, i, n) {
    "use strict";
    function s(t, e, i) {
        return setTimeout(c(t, i), e);
    }
    function r(t, e, i) {
        return !!Array.isArray(t) && (o(t, i[e], i), !0);
    }
    function o(t, e, i) {
        var s;
        if (t)
            if (t.forEach) t.forEach(e, i);
            else if (t.length !== n) for (s = 0; s < t.length;) e.call(i, t[s], s, t), s++;
            else for (s in t) t.hasOwnProperty(s) && e.call(i, t[s], s, t);
    }
    function a(e, i, n) {
        var s = "DEPRECATED METHOD: " + i + "\n" + n + " AT \n";
        return function () {
            var i = new Error("get-stack-trace"),
                n =
                    i && i.stack
                        ? i.stack
                            .replace(/^[^\(]+?[\n$]/gm, "")
                            .replace(/^\s+at\s+/gm, "")
                            .replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@")
                        : "Unknown Stack Trace",
                r = t.console && (t.console.warn || t.console.log);
            return r && r.call(t.console, s, n), e.apply(this, arguments);
        };
    }
    function l(t, e, i) {
        var n,
            s = e.prototype;
        ((n = t.prototype = Object.create(s)).constructor = t), (n._super = s), i && nt(n, i);
    }
    function c(t, e) {
        return function () {
            return t.apply(e, arguments);
        };
    }
    function h(t, e) {
        return typeof t == ot ? t.apply((e && e[0]) || n, e) : t;
    }
    function u(t, e) {
        return t === n ? e : t;
    }
    function d(t, e, i) {
        o(m(e), function (e) {
            t.addEventListener(e, i, !1);
        });
    }
    function p(t, e, i) {
        o(m(e), function (e) {
            t.removeEventListener(e, i, !1);
        });
    }
    function f(t, e) {
        for (; t;) {
            if (t == e) return !0;
            t = t.parentNode;
        }
        return !1;
    }
    function v(t, e) {
        return t.indexOf(e) > -1;
    }
    function m(t) {
        return t.trim().split(/\s+/g);
    }
    function g(t, e, i) {
        if (t.indexOf && !i) return t.indexOf(e);
        for (var n = 0; n < t.length;) {
            if ((i && t[n][i] == e) || (!i && t[n] === e)) return n;
            n++;
        }
        return -1;
    }
    function T(t) {
        return Array.prototype.slice.call(t, 0);
    }
    function y(t, e, i) {
        for (var n = [], s = [], r = 0; r < t.length;) {
            var o = e ? t[r][e] : t[r];
            g(s, o) < 0 && n.push(t[r]), (s[r] = o), r++;
        }
        return (
            i &&
            (n = e
                ? n.sort(function (t, i) {
                    return t[e] > i[e];
                })
                : n.sort()),
            n
        );
    }
    function C(t, e) {
        for (var i, s, r = e[0].toUpperCase() + e.slice(1), o = 0; o < st.length;) {
            if ((s = (i = st[o]) ? i + r : e) in t) return s;
            o++;
        }
        return n;
    }
    function E(e) {
        var i = e.ownerDocument || e;
        return i.defaultView || i.parentWindow || t;
    }
    function x(t, e) {
        var i = this;
        (this.manager = t),
            (this.callback = e),
            (this.element = t.element),
            (this.target = t.options.inputTarget),
            (this.domHandler = function (e) {
                h(t.options.enable, [t]) && i.handler(e);
            }),
            this.init();
    }
    function $(t, e, i) {
        var n = i.pointers.length,
            s = i.changedPointers.length,
            r = e & yt && n - s == 0,
            o = e & (Et | xt) && n - s == 0;
        (i.isFirst = !!r),
            (i.isFinal = !!o),
            r && (t.session = {}),
            (i.eventType = e),
            (function (t, e) {
                var i = t.session,
                    n = e.pointers,
                    s = n.length;
                i.firstInput || (i.firstInput = w(e)), s > 1 && !i.firstMultiple ? (i.firstMultiple = w(e)) : 1 === s && (i.firstMultiple = !1);
                var r = i.firstInput,
                    o = i.firstMultiple,
                    a = o ? o.center : r.center,
                    l = (e.center = A(n));
                (e.timeStamp = ct()),
                    (e.deltaTime = e.timeStamp - r.timeStamp),
                    (e.angle = b(a, l)),
                    (e.distance = S(a, l)),
                    (function (t, e) {
                        var i = e.center,
                            n = t.offsetDelta || {},
                            s = t.prevDelta || {},
                            r = t.prevInput || {};
                        (e.eventType !== yt && r.eventType !== Et) || ((s = t.prevDelta = { x: r.deltaX || 0, y: r.deltaY || 0 }), (n = t.offsetDelta = { x: i.x, y: i.y })), (e.deltaX = s.x + (i.x - n.x)), (e.deltaY = s.y + (i.y - n.y));
                    })(i, e),
                    (e.offsetDirection = _(e.deltaX, e.deltaY));
                var c = D(e.deltaTime, e.deltaX, e.deltaY);
                (e.overallVelocityX = c.x),
                    (e.overallVelocityY = c.y),
                    (e.overallVelocity = lt(c.x) > lt(c.y) ? c.x : c.y),
                    (e.scale = o
                        ? (function (t, e) {
                            return S(e[0], e[1], Ot) / S(t[0], t[1], Ot);
                        })(o.pointers, n)
                        : 1),
                    (e.rotation = o
                        ? (function (t, e) {
                            return b(e[1], e[0], Ot) + b(t[1], t[0], Ot);
                        })(o.pointers, n)
                        : 0),
                    (e.maxPointers = i.prevInput ? (e.pointers.length > i.prevInput.maxPointers ? e.pointers.length : i.prevInput.maxPointers) : e.pointers.length),
                    I(i, e);
                var h = t.element;
                f(e.srcEvent.target, h) && (h = e.srcEvent.target), (e.target = h);
            })(t, i),
            t.emit("hammer.input", i),
            t.recognize(i),
            (t.session.prevInput = i);
    }
    function I(t, e) {
        var i,
            s,
            r,
            o,
            a = t.lastInterval || e,
            l = e.timeStamp - a.timeStamp;
        if (e.eventType != xt && (l > Tt || a.velocity === n)) {
            var c = e.deltaX - a.deltaX,
                h = e.deltaY - a.deltaY,
                u = D(l, c, h);
            (s = u.x), (r = u.y), (i = lt(u.x) > lt(u.y) ? u.x : u.y), (o = _(c, h)), (t.lastInterval = e);
        } else (i = a.velocity), (s = a.velocityX), (r = a.velocityY), (o = a.direction);
        (e.velocity = i), (e.velocityX = s), (e.velocityY = r), (e.direction = o);
    }
    function w(t) {
        for (var e = [], i = 0; i < t.pointers.length;) (e[i] = { clientX: at(t.pointers[i].clientX), clientY: at(t.pointers[i].clientY) }), i++;
        return { timeStamp: ct(), pointers: e, center: A(e), deltaX: t.deltaX, deltaY: t.deltaY };
    }
    function A(t) {
        var e = t.length;
        if (1 === e) return { x: at(t[0].clientX), y: at(t[0].clientY) };
        for (var i = 0, n = 0, s = 0; e > s;) (i += t[s].clientX), (n += t[s].clientY), s++;
        return { x: at(i / e), y: at(n / e) };
    }
    function D(t, e, i) {
        return { x: e / t || 0, y: i / t || 0 };
    }
    function _(t, e) {
        return t === e ? $t : lt(t) >= lt(e) ? (0 > t ? It : wt) : 0 > e ? At : Dt;
    }
    function S(t, e, i) {
        i || (i = Pt);
        var n = e[i[0]] - t[i[0]],
            s = e[i[1]] - t[i[1]];
        return Math.sqrt(n * n + s * s);
    }
    function b(t, e, i) {
        i || (i = Pt);
        var n = e[i[0]] - t[i[0]],
            s = e[i[1]] - t[i[1]];
        return (180 * Math.atan2(s, n)) / Math.PI;
    }
    function P() {
        (this.evEl = Mt), (this.evWin = zt), (this.pressed = !1), x.apply(this, arguments);
    }
    function O() {
        (this.evEl = Yt), (this.evWin = kt), x.apply(this, arguments), (this.store = this.manager.session.pointerEvents = []);
    }
    function R() {
        (this.evTarget = Ft), (this.evWin = Wt), (this.started = !1), x.apply(this, arguments);
    }
    function M(t, e) {
        var i = T(t.touches),
            n = T(t.changedTouches);
        return e & (Et | xt) && (i = y(i.concat(n), "identifier", !0)), [i, n];
    }
    function z() {
        (this.evTarget = Lt), (this.targetIds = {}), x.apply(this, arguments);
    }
    function N(t, e) {
        var i = T(t.touches),
            n = this.targetIds;
        if (e & (yt | Ct) && 1 === i.length) return (n[i[0].identifier] = !0), [i, i];
        var s,
            r,
            o = T(t.changedTouches),
            a = [],
            l = this.target;
        if (
            ((r = i.filter(function (t) {
                return f(t.target, l);
            })),
                e === yt)
        )
            for (s = 0; s < r.length;) (n[r[s].identifier] = !0), s++;
        for (s = 0; s < o.length;) n[o[s].identifier] && a.push(o[s]), e & (Et | xt) && delete n[o[s].identifier], s++;
        return a.length ? [y(r.concat(a), "identifier", !0), a] : void 0;
    }
    function X() {
        x.apply(this, arguments);
        var t = c(this.handler, this);
        (this.touch = new z(this.manager, t)), (this.mouse = new P(this.manager, t)), (this.primaryTouch = null), (this.lastTouches = []);
    }
    function Y(t, e) {
        t & yt ? ((this.primaryTouch = e.changedPointers[0].identifier), k.call(this, e)) : t & (Et | xt) && k.call(this, e);
    }
    function k(t) {
        var e = t.changedPointers[0];
        if (e.identifier === this.primaryTouch) {
            var i = { x: e.clientX, y: e.clientY };
            this.lastTouches.push(i);
            var n = this.lastTouches;
            setTimeout(function () {
                var t = n.indexOf(i);
                t > -1 && n.splice(t, 1);
            }, Vt);
        }
    }
    function q(t) {
        for (var e = t.srcEvent.clientX, i = t.srcEvent.clientY, n = 0; n < this.lastTouches.length; n++) {
            var s = this.lastTouches[n],
                r = Math.abs(e - s.x),
                o = Math.abs(i - s.y);
            if (Ut >= r && Ut >= o) return !0;
        }
        return !1;
    }
    function F(t, e) {
        (this.manager = t), this.set(e);
    }
    function W(t) {
        (this.options = nt({}, this.defaults, t || {})), (this.id = dt++), (this.manager = null), (this.options.enable = u(this.options.enable, !0)), (this.state = ie), (this.simultaneous = {}), (this.requireFail = []);
    }
    function H(t) {
        return t & ae ? "cancel" : t & re ? "end" : t & se ? "move" : t & ne ? "start" : "";
    }
    function L(t) {
        return t == Dt ? "down" : t == At ? "up" : t == It ? "left" : t == wt ? "right" : "";
    }
    function V(t, e) {
        var i = e.manager;
        return i ? i.get(t) : t;
    }
    function U() {
        W.apply(this, arguments);
    }
    function j() {
        U.apply(this, arguments), (this.pX = null), (this.pY = null);
    }
    function G() {
        U.apply(this, arguments);
    }
    function B() {
        W.apply(this, arguments), (this._timer = null), (this._input = null);
    }
    function Z() {
        U.apply(this, arguments);
    }
    function J() {
        U.apply(this, arguments);
    }
    function K() {
        W.apply(this, arguments), (this.pTime = !1), (this.pCenter = !1), (this._timer = null), (this._input = null), (this.count = 0);
    }
    function Q(t, e) {
        return ((e = e || {}).recognizers = u(e.recognizers, Q.defaults.preset)), new tt(t, e);
    }
    function tt(t, e) {
        (this.options = nt({}, Q.defaults, e || {})),
            (this.options.inputTarget = this.options.inputTarget || t),
            (this.handlers = {}),
            (this.session = {}),
            (this.recognizers = []),
            (this.oldCssProps = {}),
            (this.element = t),
            (this.input = (function (t) {
                return new (t.options.inputClass || (ft ? O : vt ? z : pt ? X : P))(t, $);
            })(this)),
            (this.touchAction = new F(this, this.options.touchAction)),
            et(this, !0),
            o(
                this.options.recognizers,
                function (t) {
                    var e = this.add(new t[0](t[1]));
                    t[2] && e.recognizeWith(t[2]), t[3] && e.requireFailure(t[3]);
                },
                this
            );
    }
    function et(t, e) {
        var i,
            n = t.element;
        n.style &&
            (o(t.options.cssProps, function (s, r) {
                (i = C(n.style, r)), e ? ((t.oldCssProps[i] = n.style[i]), (n.style[i] = s)) : (n.style[i] = t.oldCssProps[i] || "");
            }),
                e || (t.oldCssProps = {}));
    }
    function it(t, i) {
        var n = e.createEvent("Event");
        n.initEvent(t, !0, !0), (n.gesture = i), i.target.dispatchEvent(n);
    }
    var nt,
        st = ["", "webkit", "Moz", "MS", "ms", "o"],
        rt = e.createElement("div"),
        ot = "function",
        at = Math.round,
        lt = Math.abs,
        ct = Date.now;
    nt =
        "function" != typeof Object.assign
            ? function (t) {
                if (t === n || null === t) throw new TypeError("Cannot convert undefined or null to object");
                for (var e = Object(t), i = 1; i < arguments.length; i++) {
                    var s = arguments[i];
                    if (s !== n && null !== s) for (var r in s) s.hasOwnProperty(r) && (e[r] = s[r]);
                }
                return e;
            }
            : Object.assign;
    var ht = a(
        function (t, e, i) {
            for (var s = Object.keys(e), r = 0; r < s.length;) (!i || (i && t[s[r]] === n)) && (t[s[r]] = e[s[r]]), r++;
            return t;
        },
        "extend",
        "Use `assign`."
    ),
        ut = a(
            function (t, e) {
                return ht(t, e, !0);
            },
            "merge",
            "Use `assign`."
        ),
        dt = 1,
        pt = "ontouchstart" in t,
        ft = C(t, "PointerEvent") !== n,
        vt = pt && /mobile|tablet|ip(ad|hone|od)|android/i.test(navigator.userAgent),
        mt = "touch",
        gt = "mouse",
        Tt = 25,
        yt = 1,
        Ct = 2,
        Et = 4,
        xt = 8,
        $t = 1,
        It = 2,
        wt = 4,
        At = 8,
        Dt = 16,
        _t = It | wt,
        St = At | Dt,
        bt = _t | St,
        Pt = ["x", "y"],
        Ot = ["clientX", "clientY"];
    x.prototype = {
        handler: function () { },
        init: function () {
            this.evEl && d(this.element, this.evEl, this.domHandler), this.evTarget && d(this.target, this.evTarget, this.domHandler), this.evWin && d(E(this.element), this.evWin, this.domHandler);
        },
        destroy: function () {
            this.evEl && p(this.element, this.evEl, this.domHandler), this.evTarget && p(this.target, this.evTarget, this.domHandler), this.evWin && p(E(this.element), this.evWin, this.domHandler);
        },
    };
    var Rt = { mousedown: yt, mousemove: Ct, mouseup: Et },
        Mt = "mousedown",
        zt = "mousemove mouseup";
    l(P, x, {
        handler: function (t) {
            var e = Rt[t.type];
            e & yt && 0 === t.button && (this.pressed = !0),
                e & Ct && 1 !== t.which && (e = Et),
                this.pressed && (e & Et && (this.pressed = !1), this.callback(this.manager, e, { pointers: [t], changedPointers: [t], pointerType: gt, srcEvent: t }));
        },
    });
    var Nt = { pointerdown: yt, pointermove: Ct, pointerup: Et, pointercancel: xt, pointerout: xt },
        Xt = { 2: mt, 3: "pen", 4: gt, 5: "kinect" },
        Yt = "pointerdown",
        kt = "pointermove pointerup pointercancel";
    t.MSPointerEvent && !t.PointerEvent && ((Yt = "MSPointerDown"), (kt = "MSPointerMove MSPointerUp MSPointerCancel")),
        l(O, x, {
            handler: function (t) {
                var e = this.store,
                    i = !1,
                    n = t.type.toLowerCase().replace("ms", ""),
                    s = Nt[n],
                    r = Xt[t.pointerType] || t.pointerType,
                    o = r == mt,
                    a = g(e, t.pointerId, "pointerId");
                s & yt && (0 === t.button || o) ? 0 > a && (e.push(t), (a = e.length - 1)) : s & (Et | xt) && (i = !0),
                    0 > a || ((e[a] = t), this.callback(this.manager, s, { pointers: e, changedPointers: [t], pointerType: r, srcEvent: t }), i && e.splice(a, 1));
            },
        });
    var qt = { touchstart: yt, touchmove: Ct, touchend: Et, touchcancel: xt },
        Ft = "touchstart",
        Wt = "touchstart touchmove touchend touchcancel";
    l(R, x, {
        handler: function (t) {
            var e = qt[t.type];
            if ((e === yt && (this.started = !0), this.started)) {
                var i = M.call(this, t, e);
                e & (Et | xt) && i[0].length - i[1].length == 0 && (this.started = !1), this.callback(this.manager, e, { pointers: i[0], changedPointers: i[1], pointerType: mt, srcEvent: t });
            }
        },
    });
    var Ht = { touchstart: yt, touchmove: Ct, touchend: Et, touchcancel: xt },
        Lt = "touchstart touchmove touchend touchcancel";
    l(z, x, {
        handler: function (t) {
            var e = Ht[t.type],
                i = N.call(this, t, e);
            i && this.callback(this.manager, e, { pointers: i[0], changedPointers: i[1], pointerType: mt, srcEvent: t });
        },
    });
    var Vt = 2500,
        Ut = 25;
    l(X, x, {
        handler: function (t, e, i) {
            var n = i.pointerType == mt,
                s = i.pointerType == gt;
            if (!(s && i.sourceCapabilities && i.sourceCapabilities.firesTouchEvents)) {
                if (n) Y.call(this, e, i);
                else if (s && q.call(this, i)) return;
                this.callback(t, e, i);
            }
        },
        destroy: function () {
            this.touch.destroy(), this.mouse.destroy();
        },
    });
    var jt = C(rt.style, "touchAction"),
        Gt = jt !== n,
        Bt = "compute",
        Zt = "auto",
        Jt = "manipulation",
        Kt = "none",
        Qt = "pan-x",
        te = "pan-y",
        ee = (function () {
            if (!Gt) return !1;
            var e = {},
                i = t.CSS && t.CSS.supports;
            return (
                ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function (n) {
                    e[n] = !i || t.CSS.supports("touch-action", n);
                }),
                e
            );
        })();
    F.prototype = {
        set: function (t) {
            t == Bt && (t = this.compute()), Gt && this.manager.element.style && ee[t] && (this.manager.element.style[jt] = t), (this.actions = t.toLowerCase().trim());
        },
        update: function () {
            this.set(this.manager.options.touchAction);
        },
        compute: function () {
            var t = [];
            return (
                o(this.manager.recognizers, function (e) {
                    h(e.options.enable, [e]) && (t = t.concat(e.getTouchAction()));
                }),
                (function (t) {
                    if (v(t, Kt)) return Kt;
                    var e = v(t, Qt),
                        i = v(t, te);
                    return e && i ? Kt : e || i ? (e ? Qt : te) : v(t, Jt) ? Jt : Zt;
                })(t.join(" "))
            );
        },
        preventDefaults: function (t) {
            var e = t.srcEvent,
                i = t.offsetDirection;
            if (!this.manager.session.prevented) {
                var n = this.actions,
                    s = v(n, Kt) && !ee[Kt],
                    r = v(n, te) && !ee[te],
                    o = v(n, Qt) && !ee[Qt];
                if (s) {
                    var a = 1 === t.pointers.length,
                        l = t.distance < 2,
                        c = t.deltaTime < 250;
                    if (a && l && c) return;
                }
                return o && r ? void 0 : s || (r && i & _t) || (o && i & St) ? this.preventSrc(e) : void 0;
            }
            e.preventDefault();
        },
        preventSrc: function (t) {
            (this.manager.session.prevented = !0), t.preventDefault();
        },
    };
    var ie = 1,
        ne = 2,
        se = 4,
        re = 8,
        oe = re,
        ae = 16,
        le = 32;
    (W.prototype = {
        defaults: {},
        set: function (t) {
            return nt(this.options, t), this.manager && this.manager.touchAction.update(), this;
        },
        recognizeWith: function (t) {
            if (r(t, "recognizeWith", this)) return this;
            var e = this.simultaneous;
            return e[(t = V(t, this)).id] || ((e[t.id] = t), t.recognizeWith(this)), this;
        },
        dropRecognizeWith: function (t) {
            return r(t, "dropRecognizeWith", this) || ((t = V(t, this)), delete this.simultaneous[t.id]), this;
        },
        requireFailure: function (t) {
            if (r(t, "requireFailure", this)) return this;
            var e = this.requireFail;
            return -1 === g(e, (t = V(t, this))) && (e.push(t), t.requireFailure(this)), this;
        },
        dropRequireFailure: function (t) {
            if (r(t, "dropRequireFailure", this)) return this;
            t = V(t, this);
            var e = g(this.requireFail, t);
            return e > -1 && this.requireFail.splice(e, 1), this;
        },
        hasRequireFailures: function () {
            return this.requireFail.length > 0;
        },
        canRecognizeWith: function (t) {
            return !!this.simultaneous[t.id];
        },
        emit: function (t) {
            function e(e) {
                i.manager.emit(e, t);
            }
            var i = this,
                n = this.state;
            re > n && e(i.options.event + H(n)), e(i.options.event), t.additionalEvent && e(t.additionalEvent), n >= re && e(i.options.event + H(n));
        },
        tryEmit: function (t) {
            return this.canEmit() ? this.emit(t) : void (this.state = le);
        },
        canEmit: function () {
            for (var t = 0; t < this.requireFail.length;) {
                if (!(this.requireFail[t].state & (le | ie))) return !1;
                t++;
            }
            return !0;
        },
        recognize: function (t) {
            var e = nt({}, t);
            return h(this.options.enable, [this, e]) ? (this.state & (oe | ae | le) && (this.state = ie), (this.state = this.process(e)), void (this.state & (ne | se | re | ae) && this.tryEmit(e))) : (this.reset(), void (this.state = le));
        },
        process: function (t) { },
        getTouchAction: function () { },
        reset: function () { },
    }),
        l(U, W, {
            defaults: { pointers: 1 },
            attrTest: function (t) {
                var e = this.options.pointers;
                return 0 === e || t.pointers.length === e;
            },
            process: function (t) {
                var e = this.state,
                    i = t.eventType,
                    n = e & (ne | se),
                    s = this.attrTest(t);
                return n && (i & xt || !s) ? e | ae : n || s ? (i & Et ? e | re : e & ne ? e | se : ne) : le;
            },
        }),
        l(j, U, {
            defaults: { event: "pan", threshold: 10, pointers: 1, direction: bt },
            getTouchAction: function () {
                var t = this.options.direction,
                    e = [];
                return t & _t && e.push(te), t & St && e.push(Qt), e;
            },
            directionTest: function (t) {
                var e = this.options,
                    i = !0,
                    n = t.distance,
                    s = t.direction,
                    r = t.deltaX,
                    o = t.deltaY;
                return (
                    s & e.direction || (e.direction & _t ? ((s = 0 === r ? $t : 0 > r ? It : wt), (i = r != this.pX), (n = Math.abs(t.deltaX))) : ((s = 0 === o ? $t : 0 > o ? At : Dt), (i = o != this.pY), (n = Math.abs(t.deltaY)))),
                    (t.direction = s),
                    i && n > e.threshold && s & e.direction
                );
            },
            attrTest: function (t) {
                return U.prototype.attrTest.call(this, t) && (this.state & ne || (!(this.state & ne) && this.directionTest(t)));
            },
            emit: function (t) {
                (this.pX = t.deltaX), (this.pY = t.deltaY);
                var e = L(t.direction);
                e && (t.additionalEvent = this.options.event + e), this._super.emit.call(this, t);
            },
        }),
        l(G, U, {
            defaults: { event: "pinch", threshold: 0, pointers: 2 },
            getTouchAction: function () {
                return [Kt];
            },
            attrTest: function (t) {
                return this._super.attrTest.call(this, t) && (Math.abs(t.scale - 1) > this.options.threshold || this.state & ne);
            },
            emit: function (t) {
                if (1 !== t.scale) {
                    var e = t.scale < 1 ? "in" : "out";
                    t.additionalEvent = this.options.event + e;
                }
                this._super.emit.call(this, t);
            },
        }),
        l(B, W, {
            defaults: { event: "press", pointers: 1, time: 251, threshold: 9 },
            getTouchAction: function () {
                return [Zt];
            },
            process: function (t) {
                var e = this.options,
                    i = t.pointers.length === e.pointers,
                    n = t.distance < e.threshold,
                    r = t.deltaTime > e.time;
                if (((this._input = t), !n || !i || (t.eventType & (Et | xt) && !r))) this.reset();
                else if (t.eventType & yt)
                    this.reset(),
                        (this._timer = s(
                            function () {
                                (this.state = oe), this.tryEmit();
                            },
                            e.time,
                            this
                        ));
                else if (t.eventType & Et) return oe;
                return le;
            },
            reset: function () {
                clearTimeout(this._timer);
            },
            emit: function (t) {
                this.state === oe && (t && t.eventType & Et ? this.manager.emit(this.options.event + "up", t) : ((this._input.timeStamp = ct()), this.manager.emit(this.options.event, this._input)));
            },
        }),
        l(Z, U, {
            defaults: { event: "rotate", threshold: 0, pointers: 2 },
            getTouchAction: function () {
                return [Kt];
            },
            attrTest: function (t) {
                return this._super.attrTest.call(this, t) && (Math.abs(t.rotation) > this.options.threshold || this.state & ne);
            },
        }),
        l(J, U, {
            defaults: { event: "swipe", threshold: 10, velocity: 0.3, direction: _t | St, pointers: 1 },
            getTouchAction: function () {
                return j.prototype.getTouchAction.call(this);
            },
            attrTest: function (t) {
                var e,
                    i = this.options.direction;
                return (
                    i & (_t | St) ? (e = t.overallVelocity) : i & _t ? (e = t.overallVelocityX) : i & St && (e = t.overallVelocityY),
                    this._super.attrTest.call(this, t) && i & t.offsetDirection && t.distance > this.options.threshold && t.maxPointers == this.options.pointers && lt(e) > this.options.velocity && t.eventType & Et
                );
            },
            emit: function (t) {
                var e = L(t.offsetDirection);
                e && this.manager.emit(this.options.event + e, t), this.manager.emit(this.options.event, t);
            },
        }),
        l(K, W, {
            defaults: { event: "tap", pointers: 1, taps: 1, interval: 300, time: 250, threshold: 9, posThreshold: 10 },
            getTouchAction: function () {
                return [Jt];
            },
            process: function (t) {
                var e = this.options,
                    i = t.pointers.length === e.pointers,
                    n = t.distance < e.threshold,
                    r = t.deltaTime < e.time;
                if ((this.reset(), t.eventType & yt && 0 === this.count)) return this.failTimeout();
                if (n && r && i) {
                    if (t.eventType != Et) return this.failTimeout();
                    var o = !this.pTime || t.timeStamp - this.pTime < e.interval,
                        a = !this.pCenter || S(this.pCenter, t.center) < e.posThreshold;
                    if (((this.pTime = t.timeStamp), (this.pCenter = t.center), a && o ? (this.count += 1) : (this.count = 1), (this._input = t), 0 === this.count % e.taps))
                        return this.hasRequireFailures()
                            ? ((this._timer = s(
                                function () {
                                    (this.state = oe), this.tryEmit();
                                },
                                e.interval,
                                this
                            )),
                                ne)
                            : oe;
                }
                return le;
            },
            failTimeout: function () {
                return (
                    (this._timer = s(
                        function () {
                            this.state = le;
                        },
                        this.options.interval,
                        this
                    )),
                    le
                );
            },
            reset: function () {
                clearTimeout(this._timer);
            },
            emit: function () {
                this.state == oe && ((this._input.tapCount = this.count), this.manager.emit(this.options.event, this._input));
            },
        }),
        (Q.VERSION = "2.0.8"),
        (Q.defaults = {
            domEvents: !1,
            touchAction: Bt,
            enable: !0,
            inputTarget: null,
            inputClass: null,
            preset: [[Z, { enable: !1 }], [G, { enable: !1 }, ["rotate"]], [J, { direction: _t }], [j, { direction: _t }, ["swipe"]], [K], [K, { event: "doubletap", taps: 2 }, ["tap"]], [B]],
            cssProps: { userSelect: "none", touchSelect: "none", touchCallout: "none", contentZooming: "none", userDrag: "none", tapHighlightColor: "rgba(0,0,0,0)" },
        });
    (tt.prototype = {
        set: function (t) {
            return nt(this.options, t), t.touchAction && this.touchAction.update(), t.inputTarget && (this.input.destroy(), (this.input.target = t.inputTarget), this.input.init()), this;
        },
        stop: function (t) {
            this.session.stopped = t ? 2 : 1;
        },
        recognize: function (t) {
            var e = this.session;
            if (!e.stopped) {
                this.touchAction.preventDefaults(t);
                var i,
                    n = this.recognizers,
                    s = e.curRecognizer;
                (!s || (s && s.state & oe)) && (s = e.curRecognizer = null);
                for (var r = 0; r < n.length;) (i = n[r]), 2 === e.stopped || (s && i != s && !i.canRecognizeWith(s)) ? i.reset() : i.recognize(t), !s && i.state & (ne | se | re) && (s = e.curRecognizer = i), r++;
            }
        },
        get: function (t) {
            if (t instanceof W) return t;
            for (var e = this.recognizers, i = 0; i < e.length; i++) if (e[i].options.event == t) return e[i];
            return null;
        },
        add: function (t) {
            if (r(t, "add", this)) return this;
            var e = this.get(t.options.event);
            return e && this.remove(e), this.recognizers.push(t), (t.manager = this), this.touchAction.update(), t;
        },
        remove: function (t) {
            if (r(t, "remove", this)) return this;
            if ((t = this.get(t))) {
                var e = this.recognizers,
                    i = g(e, t);
                -1 !== i && (e.splice(i, 1), this.touchAction.update());
            }
            return this;
        },
        on: function (t, e) {
            if (t !== n && e !== n) {
                var i = this.handlers;
                return (
                    o(m(t), function (t) {
                        (i[t] = i[t] || []), i[t].push(e);
                    }),
                    this
                );
            }
        },
        off: function (t, e) {
            if (t !== n) {
                var i = this.handlers;
                return (
                    o(m(t), function (t) {
                        e ? i[t] && i[t].splice(g(i[t], e), 1) : delete i[t];
                    }),
                    this
                );
            }
        },
        emit: function (t, e) {
            this.options.domEvents && it(t, e);
            var i = this.handlers[t] && this.handlers[t].slice();
            if (i && i.length) {
                (e.type = t),
                    (e.preventDefault = function () {
                        e.srcEvent.preventDefault();
                    });
                for (var n = 0; n < i.length;) i[n](e), n++;
            }
        },
        destroy: function () {
            this.element && et(this, !1), (this.handlers = {}), (this.session = {}), this.input.destroy(), (this.element = null);
        },
    }),
        nt(Q, {
            INPUT_START: yt,
            INPUT_MOVE: Ct,
            INPUT_END: Et,
            INPUT_CANCEL: xt,
            STATE_POSSIBLE: ie,
            STATE_BEGAN: ne,
            STATE_CHANGED: se,
            STATE_ENDED: re,
            STATE_RECOGNIZED: oe,
            STATE_CANCELLED: ae,
            STATE_FAILED: le,
            DIRECTION_NONE: $t,
            DIRECTION_LEFT: It,
            DIRECTION_RIGHT: wt,
            DIRECTION_UP: At,
            DIRECTION_DOWN: Dt,
            DIRECTION_HORIZONTAL: _t,
            DIRECTION_VERTICAL: St,
            DIRECTION_ALL: bt,
            Manager: tt,
            Input: x,
            TouchAction: F,
            TouchInput: z,
            MouseInput: P,
            PointerEventInput: O,
            TouchMouseInput: X,
            SingleTouchInput: R,
            Recognizer: W,
            AttrRecognizer: U,
            Tap: K,
            Pan: j,
            Swipe: J,
            Pinch: G,
            Rotate: Z,
            Press: B,
            on: d,
            off: p,
            each: o,
            merge: ut,
            extend: ht,
            assign: nt,
            inherit: l,
            bindFn: c,
            prefixed: C,
        }),
        ((void 0 !== t ? t : "undefined" != typeof self ? self : {}).Hammer = Q),
        "function" == typeof define && define.amd
            ? define(function () {
                return Q;
            })
            : "undefined" != typeof module && module.exports
                ? (module.exports = Q)
                : (t.Hammer = Q);
})(window, document),
    $(document).ready(function () {
        function t(t) {
            var n = $(".side-nav").find(".is-active"),
                s = $(".side-nav").children().index(n),
                r = $(".side-nav").children().length - 1,
                o = 0;
            "swipeup" === t.type || 40 === t.keyCode || t > 0
                ? s !== r
                    ? (e((o = s + 1)), i(s, o, r))
                    : (e(o), i(s, o, r))
                : ("swipedown" === t.type || 38 === t.keyCode || 0 > t) && (0 !== s ? (e((o = s - 1)), i(s, o, r)) : (e((o = r)), i(s, o, r)));
        }
        function e(t) {
            $(".side-nav, .outer-nav").children().removeClass("is-active"), $(".side-nav").children().eq(t).addClass("is-active"), $(".outer-nav").children().eq(t).addClass("is-active");
        }
        function i(t, e, i) {
            $(".main-content").children().removeClass("section--is-active"),
                $(".main-content").children().eq(e).addClass("section--is-active"),
                $(".main-content .section").children().removeClass("section--next section--prev"),
                (t === i && 0 === e) || (0 === t && e === i)
                    ? $(".main-content .section").children().removeClass("section--next section--prev")
                    : e > t
                        ? $(".main-content").children().eq(t).children().addClass("section--next")
                        : $(".main-content").children().eq(t).children().addClass("section--prev"),
                0 !== e && e !== i ? $(".header--cta").addClass("is-active") : $(".header--cta").removeClass("is-active");
        }
        var n = !0,
            s = null;
        $(this).on("mousewheel DOMMouseScroll", function (e) {
            if (!$(".outer-nav").hasClass("is-vis")) {
                e.preventDefault();
                var i = e.originalEvent.wheelDelta ? -e.originalEvent.wheelDelta : 20 * e.originalEvent.detail;
                i > 50 && n
                    ? ((n = !1),
                        clearTimeout(s),
                        (s = setTimeout(function () {
                            n = !0;
                        }, 800)),
                        t(1))
                    : -50 > i &&
                    n &&
                    ((n = !1),
                        clearTimeout(s),
                        (s = setTimeout(function () {
                            n = !0;
                        }, 800)),
                        t(-1));
            }
        }),
            $(".side-nav li, .outer-nav li").click(function () {
                if (!$(this).hasClass("is-active")) {
                    var t = $(this),
                        n = t.parent().find(".is-active"),
                        s = t.parent().children().index(n),
                        r = t.parent().children().index(t),
                        o = $(this).parent().children().length - 1;
                    e(r), i(s, r, o);
                }
            }),
            $(".cta").click(function () {
                var t = $(".side-nav").find(".is-active"),
                    n = $(".side-nav").children().index(t),
                    s = $(".side-nav").children().length - 1,
                    r = s;
                e(s), i(n, r, s);
            });
        var r = document.getElementById("viewport"),
            o = new Hammer(r);
        o.get("swipe").set({ direction: Hammer.DIRECTION_VERTICAL }),
            o.on("swipeup swipedown", function (e) {
                t(e);
            }),
            $(document).keyup(function (e) {
                $(".outer-nav").hasClass("is-vis") || (e.preventDefault(), t(e));
            }),
            $(".header--nav-toggle").click(function () {
                $(".perspective").addClass("perspective--modalview"),
                    setTimeout(function () {
                        $(".perspective").addClass("effect-rotate-left--animate");
                    }, 25),
                    $(".outer-nav, .outer-nav li, .outer-nav--return").addClass("is-vis");
            }),
            $(".outer-nav--return, .outer-nav li").click(function () {
                $(".perspective").removeClass("effect-rotate-left--animate"),
                    setTimeout(function () {
                        $(".perspective").removeClass("perspective--modalview");
                    }, 400),
                    $(".outer-nav, .outer-nav li, .outer-nav--return").removeClass("is-vis");
            }),
            $(document).ready(function () {
                let itemWidth = $(".carousel-items .item").outerWidth(true);
                let itemCount = $(".carousel-items .item").length;
                let visibleItems = 3;
                let responsiveThreshold1 = 500;
                let responsiveThreshold2 = 768;

                $(".carousel-items").width(itemWidth * itemCount);

                function moveCarousel(isNext) {
                    let currentPosition = parseInt($(".carousel-items").css("left"));

                    if (isNext) {
                        $(".carousel-items").animate(
                            {
                                opacity: 0,
                            },
                            500,
                            function () {
                                $(".carousel-items .item:first").appendTo(".carousel-items");
                                $(".carousel-items").css("left", 0);
                                $(".carousel-items").animate({ opacity: 1 }, 500);
                                updateActiveItem();
                            }
                        );
                    } else {
                        $(".carousel-items .item:last").prependTo(".carousel-items");
                        $(".carousel-items").css("left", -itemWidth);
                        $(".carousel-items").animate({ opacity: 0 }, 500, function () {
                            $(".carousel-items").animate({ left: 0, opacity: 1 }, 500);
                            updateActiveItem();
                        });
                    }

                    $(".carousel-items .item").css("opacity", 0.3);
                    $(".carousel-items .item:nth-child(2)").css("opacity", 1);
                }

                function updateActiveItem() {
                    let activeItem = Math.ceil(visibleItems / 2);
                    let currentItem = $(".carousel-items .item:nth-child(" + activeItem + ")");

                    $(".carousel-items .item").css("opacity", 0.3);
                    $(".carousel-items .item").removeClass("active");
                    currentItem.css("opacity", 1);
                    currentItem.addClass("active");
                    currentItem.css("width", itemWidth * 1.5);
                }

                function adjustCarousel() {
                    let windowWidth = $(window).width();

                    if (windowWidth <= responsiveThreshold1) {
                        visibleItems = 1;
                    } else if (windowWidth <= responsiveThreshold2) {
                        visibleItems = 2;
                    } else {
                        visibleItems = 3;
                    }

                    itemWidth = $(".carousel-items .item").outerWidth(true);
                    $(".carousel-items").width(itemWidth * itemCount);

                    let middleItemWidth = itemWidth * 1.5;
                    $(".carousel-items .item").css("width", itemWidth);
                    $(".carousel-items .item:nth-child(2)").css("width", middleItemWidth);

                    let currentPosition = parseInt($(".carousel-items").css("left"));
                    let newPosition = -itemWidth * (visibleItems - 1);

                    if (currentPosition < newPosition) {
                        $(".carousel-items").css("left", newPosition);
                    }

                    updateActiveItem();
                }

                adjustCarousel();

                $(window).resize(function () {
                    adjustCarousel();
                });

                $(".slider-prev").click(function () {
                    moveCarousel(true);
                });

                $(".slider-next").click(function () {
                    moveCarousel(true);
                });
            });
        $(".work-request--information input").focusout(function () {
            "" === $(this).val() ? $(this).removeClass("has-value") : $(this).addClass("has-value"), window.scrollTo(0, 0);
        });
    });
