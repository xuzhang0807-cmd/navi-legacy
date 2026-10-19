var eC = Object.defineProperty;
var tC = (e, r, a) => r in e ? eC(e, r, {
 enumerable: !0,
 configurable: !0,
 writable: !0,
 value: a
}) : e[r] = a;
var la = (e, r, a) => tC(e, typeof r != "symbol" ? r + "" : r, a);

function nC(e, r) {
 for (var a = 0; a < r.length; a++) {
  const i = r[a];
  if (typeof i != "string" && !Array.isArray(i)) {
   for (const s in i)
    if (s !== "default" && !(s in e)) {
     const c = Object.getOwnPropertyDescriptor(i, s);
     c && Object.defineProperty(e, s, c.get ? c : {
      enumerable: !0,
      get: () => i[s]
     })
    }
  }
 }
 return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, {
  value: "Module"
 }))
}(function() {
 const r = document.createElement("link").relList;
 if (r && r.supports && r.supports("modulepreload")) return;
 for (const s of document.querySelectorAll('link[rel="modulepreload"]')) i(s);
 new MutationObserver(s => {
  for (const c of s)
   if (c.type === "childList")
    for (const d of c.addedNodes) d.tagName === "LINK" && d.rel === "modulepreload" && i(d)
 }).observe(document, {
  childList: !0,
  subtree: !0
 });

 function a(s) {
  const c = {};
  return s.integrity && (c.integrity = s.integrity), s.referrerPolicy && (c.referrerPolicy = s.referrerPolicy), s.crossOrigin === "use-credentials" ? c.credentials = "include" : s.crossOrigin === "anonymous" ? c.credentials = "omit" : c.credentials = "same-origin", c
 }

 function i(s) {
  if (s.ep) return;
  s.ep = !0;
  const c = a(s);
  fetch(s.href, c)
 }
})();

function $b(e) {
 return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}
var dp = {
  exports: {}
 },
 Nl = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Iy;

function rC() {
 if (Iy) return Nl;
 Iy = 1;
 var e = Symbol.for("react.transitional.element"),
  r = Symbol.for("react.fragment");

 function a(i, s, c) {
  var d = null;
  if (c !== void 0 && (d = "" + c), s.key !== void 0 && (d = "" + s.key), "key" in s) {
   c = {};
   for (var f in s) f !== "key" && (c[f] = s[f])
  } else c = s;
  return s = c.ref, {
   $$typeof: e,
   type: i,
   key: d,
   ref: s !== void 0 ? s : null,
   props: c
  }
 }
 return Nl.Fragment = r, Nl.jsx = a, Nl.jsxs = a, Nl
}
var Py;

function oC() {
 return Py || (Py = 1, dp.exports = rC()), dp.exports
}
var v = oC(),
 fp = {
  exports: {}
 },
 nt = {};
/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Hy;

function aC() {
 if (Hy) return nt;
 Hy = 1;
 var e = Symbol.for("react.transitional.element"),
  r = Symbol.for("react.portal"),
  a = Symbol.for("react.fragment"),
  i = Symbol.for("react.strict_mode"),
  s = Symbol.for("react.profiler"),
  c = Symbol.for("react.consumer"),
  d = Symbol.for("react.context"),
  f = Symbol.for("react.forward_ref"),
  h = Symbol.for("react.suspense"),
  m = Symbol.for("react.memo"),
  g = Symbol.for("react.lazy"),
  b = Symbol.iterator;

 function w(j) {
  return j === null || typeof j != "object" ? null : (j = b && j[b] || j["@@iterator"], typeof j == "function" ? j : null)
 }
 var R = {
   isMounted: function() {
    return !1
   },
   enqueueForceUpdate: function() {},
   enqueueReplaceState: function() {},
   enqueueSetState: function() {}
  },
  T = Object.assign,
  C = {};

 function D(j, q, ee) {
  this.props = j, this.context = q, this.refs = C, this.updater = ee || R
 }
 D.prototype.isReactComponent = {}, D.prototype.setState = function(j, q) {
  if (typeof j != "object" && typeof j != "function" && j != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, j, q, "setState")
 }, D.prototype.forceUpdate = function(j) {
  this.updater.enqueueForceUpdate(this, j, "forceUpdate")
 };

 function k() {}
 k.prototype = D.prototype;

 function N(j, q, ee) {
  this.props = j, this.context = q, this.refs = C, this.updater = ee || R
 }
 var E = N.prototype = new k;
 E.constructor = N, T(E, D.prototype), E.isPureReactComponent = !0;
 var A = Array.isArray,
  O = {
   H: null,
   A: null,
   T: null,
   S: null,
   V: null
  },
  L = Object.prototype.hasOwnProperty;

 function U(j, q, ee, ne, ce, le) {
  return ee = le.ref, {
   $$typeof: e,
   type: j,
   key: q,
   ref: ee !== void 0 ? ee : null,
   props: le
  }
 }

 function _(j, q) {
  return U(j.type, q, void 0, void 0, void 0, j.props)
 }

 function G(j) {
  return typeof j == "object" && j !== null && j.$$typeof === e
 }

 function S(j) {
  var q = {
   "=": "=0",
   ":": "=2"
  };
  return "$" + j.replace(/[=:]/g, function(ee) {
   return q[ee]
  })
 }
 var $ = /\/+/g;

 function H(j, q) {
  return typeof j == "object" && j !== null && j.key != null ? S("" + j.key) : q.toString(36)
 }

 function V() {}

 function X(j) {
  switch (j.status) {
   case "fulfilled":
    return j.value;
   case "rejected":
    throw j.reason;
   default:
    switch (typeof j.status == "string" ? j.then(V, V) : (j.status = "pending", j.then(function(q) {
      j.status === "pending" && (j.status = "fulfilled", j.value = q)
     }, function(q) {
      j.status === "pending" && (j.status = "rejected", j.reason = q)
     })), j.status) {
     case "fulfilled":
      return j.value;
     case "rejected":
      throw j.reason
    }
  }
  throw j
 }

 function W(j, q, ee, ne, ce) {
  var le = typeof j;
  (le === "undefined" || le === "boolean") && (j = null);
  var re = !1;
  if (j === null) re = !0;
  else switch (le) {
   case "bigint":
   case "string":
   case "number":
    re = !0;
    break;
   case "object":
    switch (j.$$typeof) {
     case e:
     case r:
      re = !0;
      break;
     case g:
      return re = j._init, W(re(j._payload), q, ee, ne, ce)
    }
  }
  if (re) return ce = ce(j), re = ne === "" ? "." + H(j, 0) : ne, A(ce) ? (ee = "", re != null && (ee = re.replace($, "$&/") + "/"), W(ce, q, ee, "", function(Te) {
   return Te
  })) : ce != null && (G(ce) && (ce = _(ce, ee + (ce.key == null || j && j.key === ce.key ? "" : ("" + ce.key).replace($, "$&/") + "/") + re)), q.push(ce)), 1;
  re = 0;
  var ye = ne === "" ? "." : ne + ":";
  if (A(j))
   for (var ge = 0; ge < j.length; ge++) ne = j[ge], le = ye + H(ne, ge), re += W(ne, q, ee, le, ce);
  else if (ge = w(j), typeof ge == "function")
   for (j = ge.call(j), ge = 0; !(ne = j.next()).done;) ne = ne.value, le = ye + H(ne, ge++), re += W(ne, q, ee, le, ce);
  else if (le === "object") {
   if (typeof j.then == "function") return W(X(j), q, ee, ne, ce);
   throw q = String(j), Error("Objects are not valid as a React child (found: " + (q === "[object Object]" ? "object with keys {" + Object.keys(j).join(", ") + "}" : q) + "). If you meant to render a collection of children, use an array instead.")
  }
  return re
 }

 function z(j, q, ee) {
  if (j == null) return j;
  var ne = [],
   ce = 0;
  return W(j, ne, "", "", function(le) {
   return q.call(ee, le, ce++)
  }), ne
 }

 function I(j) {
  if (j._status === -1) {
   var q = j._result;
   q = q(), q.then(function(ee) {
    (j._status === 0 || j._status === -1) && (j._status = 1, j._result = ee)
   }, function(ee) {
    (j._status === 0 || j._status === -1) && (j._status = 2, j._result = ee)
   }), j._status === -1 && (j._status = 0, j._result = q)
  }
  if (j._status === 1) return j._result.default;
  throw j._result
 }
 var Q = typeof reportError == "function" ? reportError : function(j) {
  if (typeof window == "object" && typeof window.ErrorEvent == "function") {
   var q = new window.ErrorEvent("error", {
    bubbles: !0,
    cancelable: !0,
    message: typeof j == "object" && j !== null && typeof j.message == "string" ? String(j.message) : String(j),
    error: j
   });
   if (!window.dispatchEvent(q)) return
  } else if (typeof process == "object" && typeof process.emit == "function") {
   process.emit("uncaughtException", j);
   return
  }
  console.error(j)
 };

 function Z() {}
 return nt.Children = {
  map: z,
  forEach: function(j, q, ee) {
   z(j, function() {
    q.apply(this, arguments)
   }, ee)
  },
  count: function(j) {
   var q = 0;
   return z(j, function() {
    q++
   }), q
  },
  toArray: function(j) {
   return z(j, function(q) {
    return q
   }) || []
  },
  only: function(j) {
   if (!G(j)) throw Error("React.Children.only expected to receive a single React element child.");
   return j
  }
 }, nt.Component = D, nt.Fragment = a, nt.Profiler = s, nt.PureComponent = N, nt.StrictMode = i, nt.Suspense = h, nt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = O, nt.__COMPILER_RUNTIME = {
  __proto__: null,
  c: function(j) {
   return O.H.useMemoCache(j)
  }
 }, nt.cache = function(j) {
  return function() {
   return j.apply(null, arguments)
  }
 }, nt.cloneElement = function(j, q, ee) {
  if (j == null) throw Error("The argument must be a React element, but you passed " + j + ".");
  var ne = T({}, j.props),
   ce = j.key,
   le = void 0;
  if (q != null)
   for (re in q.ref !== void 0 && (le = void 0), q.key !== void 0 && (ce = "" + q.key), q) !L.call(q, re) || re === "key" || re === "__self" || re === "__source" || re === "ref" && q.ref === void 0 || (ne[re] = q[re]);
  var re = arguments.length - 2;
  if (re === 1) ne.children = ee;
  else if (1 < re) {
   for (var ye = Array(re), ge = 0; ge < re; ge++) ye[ge] = arguments[ge + 2];
   ne.children = ye
  }
  return U(j.type, ce, void 0, void 0, le, ne)
 }, nt.createContext = function(j) {
  return j = {
   $$typeof: d,
   _currentValue: j,
   _currentValue2: j,
   _threadCount: 0,
   Provider: null,
   Consumer: null
  }, j.Provider = j, j.Consumer = {
   $$typeof: c,
   _context: j
  }, j
 }, nt.createElement = function(j, q, ee) {
  var ne, ce = {},
   le = null;
  if (q != null)
   for (ne in q.key !== void 0 && (le = "" + q.key), q) L.call(q, ne) && ne !== "key" && ne !== "__self" && ne !== "__source" && (ce[ne] = q[ne]);
  var re = arguments.length - 2;
  if (re === 1) ce.children = ee;
  else if (1 < re) {
   for (var ye = Array(re), ge = 0; ge < re; ge++) ye[ge] = arguments[ge + 2];
   ce.children = ye
  }
  if (j && j.defaultProps)
   for (ne in re = j.defaultProps, re) ce[ne] === void 0 && (ce[ne] = re[ne]);
  return U(j, le, void 0, void 0, null, ce)
 }, nt.createRef = function() {
  return {
   current: null
  }
 }, nt.forwardRef = function(j) {
  return {
   $$typeof: f,
   render: j
  }
 }, nt.isValidElement = G, nt.lazy = function(j) {
  return {
   $$typeof: g,
   _payload: {
    _status: -1,
    _result: j
   },
   _init: I
  }
 }, nt.memo = function(j, q) {
  return {
   $$typeof: m,
   type: j,
   compare: q === void 0 ? null : q
  }
 }, nt.startTransition = function(j) {
  var q = O.T,
   ee = {};
  O.T = ee;
  try {
   var ne = j(),
    ce = O.S;
   ce !== null && ce(ee, ne), typeof ne == "object" && ne !== null && typeof ne.then == "function" && ne.then(Z, Q)
  } catch (le) {
   Q(le)
  } finally {
   O.T = q
  }
 }, nt.unstable_useCacheRefresh = function() {
  return O.H.useCacheRefresh()
 }, nt.use = function(j) {
  return O.H.use(j)
 }, nt.useActionState = function(j, q, ee) {
  return O.H.useActionState(j, q, ee)
 }, nt.useCallback = function(j, q) {
  return O.H.useCallback(j, q)
 }, nt.useContext = function(j) {
  return O.H.useContext(j)
 }, nt.useDebugValue = function() {}, nt.useDeferredValue = function(j, q) {
  return O.H.useDeferredValue(j, q)
 }, nt.useEffect = function(j, q, ee) {
  var ne = O.H;
  if (typeof ee == "function") throw Error("useEffect CRUD overload is not enabled in this build of React.");
  return ne.useEffect(j, q)
 }, nt.useId = function() {
  return O.H.useId()
 }, nt.useImperativeHandle = function(j, q, ee) {
  return O.H.useImperativeHandle(j, q, ee)
 }, nt.useInsertionEffect = function(j, q) {
  return O.H.useInsertionEffect(j, q)
 }, nt.useLayoutEffect = function(j, q) {
  return O.H.useLayoutEffect(j, q)
 }, nt.useMemo = function(j, q) {
  return O.H.useMemo(j, q)
 }, nt.useOptimistic = function(j, q) {
  return O.H.useOptimistic(j, q)
 }, nt.useReducer = function(j, q, ee) {
  return O.H.useReducer(j, q, ee)
 }, nt.useRef = function(j) {
  return O.H.useRef(j)
 }, nt.useState = function(j) {
  return O.H.useState(j)
 }, nt.useSyncExternalStore = function(j, q, ee) {
  return O.H.useSyncExternalStore(j, q, ee)
 }, nt.useTransition = function() {
  return O.H.useTransition()
 }, nt.version = "19.1.0", nt
}
var qy;

function gh() {
 return qy || (qy = 1, fp.exports = aC()), fp.exports
}
var y = gh();
const It = $b(y),
 Pp = nC({
  __proto__: null,
  default: It
 }, [y]);
var pp = {
  exports: {}
 },
 Ll = {},
 hp = {
  exports: {}
 },
 mp = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vy;

function iC() {
 return Vy || (Vy = 1, function(e) {
  function r(z, I) {
   var Q = z.length;
   z.push(I);
   e: for (; 0 < Q;) {
    var Z = Q - 1 >>> 1,
     j = z[Z];
    if (0 < s(j, I)) z[Z] = I, z[Q] = j, Q = Z;
    else break e
   }
  }

  function a(z) {
   return z.length === 0 ? null : z[0]
  }

  function i(z) {
   if (z.length === 0) return null;
   var I = z[0],
    Q = z.pop();
   if (Q !== I) {
    z[0] = Q;
    e: for (var Z = 0, j = z.length, q = j >>> 1; Z < q;) {
     var ee = 2 * (Z + 1) - 1,
      ne = z[ee],
      ce = ee + 1,
      le = z[ce];
     if (0 > s(ne, Q)) ce < j && 0 > s(le, ne) ? (z[Z] = le, z[ce] = Q, Z = ce) : (z[Z] = ne, z[ee] = Q, Z = ee);
     else if (ce < j && 0 > s(le, Q)) z[Z] = le, z[ce] = Q, Z = ce;
     else break e
    }
   }
   return I
  }

  function s(z, I) {
   var Q = z.sortIndex - I.sortIndex;
   return Q !== 0 ? Q : z.id - I.id
  }
  if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
   var c = performance;
   e.unstable_now = function() {
    return c.now()
   }
  } else {
   var d = Date,
    f = d.now();
   e.unstable_now = function() {
    return d.now() - f
   }
  }
  var h = [],
   m = [],
   g = 1,
   b = null,
   w = 3,
   R = !1,
   T = !1,
   C = !1,
   D = !1,
   k = typeof setTimeout == "function" ? setTimeout : null,
   N = typeof clearTimeout == "function" ? clearTimeout : null,
   E = typeof setImmediate < "u" ? setImmediate : null;

  function A(z) {
   for (var I = a(m); I !== null;) {
    if (I.callback === null) i(m);
    else if (I.startTime <= z) i(m), I.sortIndex = I.expirationTime, r(h, I);
    else break;
    I = a(m)
   }
  }

  function O(z) {
   if (C = !1, A(z), !T)
    if (a(h) !== null) T = !0, L || (L = !0, H());
    else {
     var I = a(m);
     I !== null && W(O, I.startTime - z)
    }
  }
  var L = !1,
   U = -1,
   _ = 5,
   G = -1;

  function S() {
   return D ? !0 : !(e.unstable_now() - G < _)
  }

  function $() {
   if (D = !1, L) {
    var z = e.unstable_now();
    G = z;
    var I = !0;
    try {
     e: {
      T = !1,
      C && (C = !1, N(U), U = -1),
      R = !0;
      var Q = w;
      try {
       t: {
        for (A(z), b = a(h); b !== null && !(b.expirationTime > z && S());) {
         var Z = b.callback;
         if (typeof Z == "function") {
          b.callback = null, w = b.priorityLevel;
          var j = Z(b.expirationTime <= z);
          if (z = e.unstable_now(), typeof j == "function") {
           b.callback = j, A(z), I = !0;
           break t
          }
          b === a(h) && i(h), A(z)
         } else i(h);
         b = a(h)
        }
        if (b !== null) I = !0;
        else {
         var q = a(m);
         q !== null && W(O, q.startTime - z), I = !1
        }
       }
       break e
      }
      finally {
       b = null, w = Q, R = !1
      }
      I = void 0
     }
    }
    finally {
     I ? H() : L = !1
    }
   }
  }
  var H;
  if (typeof E == "function") H = function() {
   E($)
  };
  else if (typeof MessageChannel < "u") {
   var V = new MessageChannel,
    X = V.port2;
   V.port1.onmessage = $, H = function() {
    X.postMessage(null)
   }
  } else H = function() {
   k($, 0)
  };

  function W(z, I) {
   U = k(function() {
    z(e.unstable_now())
   }, I)
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(z) {
   z.callback = null
  }, e.unstable_forceFrameRate = function(z) {
   0 > z || 125 < z ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : _ = 0 < z ? Math.floor(1e3 / z) : 5
  }, e.unstable_getCurrentPriorityLevel = function() {
   return w
  }, e.unstable_next = function(z) {
   switch (w) {
    case 1:
    case 2:
    case 3:
     var I = 3;
     break;
    default:
     I = w
   }
   var Q = w;
   w = I;
   try {
    return z()
   } finally {
    w = Q
   }
  }, e.unstable_requestPaint = function() {
   D = !0
  }, e.unstable_runWithPriority = function(z, I) {
   switch (z) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
     break;
    default:
     z = 3
   }
   var Q = w;
   w = z;
   try {
    return I()
   } finally {
    w = Q
   }
  }, e.unstable_scheduleCallback = function(z, I, Q) {
   var Z = e.unstable_now();
   switch (typeof Q == "object" && Q !== null ? (Q = Q.delay, Q = typeof Q == "number" && 0 < Q ? Z + Q : Z) : Q = Z, z) {
    case 1:
     var j = -1;
     break;
    case 2:
     j = 250;
     break;
    case 5:
     j = 1073741823;
     break;
    case 4:
     j = 1e4;
     break;
    default:
     j = 5e3
   }
   return j = Q + j, z = {
    id: g++,
    callback: I,
    priorityLevel: z,
    startTime: Q,
    expirationTime: j,
    sortIndex: -1
   }, Q > Z ? (z.sortIndex = Q, r(m, z), a(h) === null && z === a(m) && (C ? (N(U), U = -1) : C = !0, W(O, Q - Z))) : (z.sortIndex = j, r(h, z), T || R || (T = !0, L || (L = !0, H()))), z
  }, e.unstable_shouldYield = S, e.unstable_wrapCallback = function(z) {
   var I = w;
   return function() {
    var Q = w;
    w = I;
    try {
     return z.apply(this, arguments)
    } finally {
     w = Q
    }
   }
  }
 }(mp)), mp
}
var Gy;

function lC() {
 return Gy || (Gy = 1, hp.exports = iC()), hp.exports
}
var gp = {
  exports: {}
 },
 An = {};
/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yy;

function sC() {
 if (Yy) return An;
 Yy = 1;
 var e = gh();

 function r(h) {
  var m = "https://react.dev/errors/" + h;
  if (1 < arguments.length) {
   m += "?args[]=" + encodeURIComponent(arguments[1]);
   for (var g = 2; g < arguments.length; g++) m += "&args[]=" + encodeURIComponent(arguments[g])
  }
  return "Minified React error #" + h + "; visit " + m + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
 }

 function a() {}
 var i = {
   d: {
    f: a,
    r: function() {
     throw Error(r(522))
    },
    D: a,
    C: a,
    L: a,
    m: a,
    X: a,
    S: a,
    M: a
   },
   p: 0,
   findDOMNode: null
  },
  s = Symbol.for("react.portal");

 function c(h, m, g) {
  var b = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
   $$typeof: s,
   key: b == null ? null : "" + b,
   children: h,
   containerInfo: m,
   implementation: g
  }
 }
 var d = e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;

 function f(h, m) {
  if (h === "font") return "";
  if (typeof m == "string") return m === "use-credentials" ? m : ""
 }
 return An.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, An.createPortal = function(h, m) {
  var g = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!m || m.nodeType !== 1 && m.nodeType !== 9 && m.nodeType !== 11) throw Error(r(299));
  return c(h, m, null, g)
 }, An.flushSync = function(h) {
  var m = d.T,
   g = i.p;
  try {
   if (d.T = null, i.p = 2, h) return h()
  } finally {
   d.T = m, i.p = g, i.d.f()
  }
 }, An.preconnect = function(h, m) {
  typeof h == "string" && (m ? (m = m.crossOrigin, m = typeof m == "string" ? m === "use-credentials" ? m : "" : void 0) : m = null, i.d.C(h, m))
 }, An.prefetchDNS = function(h) {
  typeof h == "string" && i.d.D(h)
 }, An.preinit = function(h, m) {
  if (typeof h == "string" && m && typeof m.as == "string") {
   var g = m.as,
    b = f(g, m.crossOrigin),
    w = typeof m.integrity == "string" ? m.integrity : void 0,
    R = typeof m.fetchPriority == "string" ? m.fetchPriority : void 0;
   g === "style" ? i.d.S(h, typeof m.precedence == "string" ? m.precedence : void 0, {
    crossOrigin: b,
    integrity: w,
    fetchPriority: R
   }) : g === "script" && i.d.X(h, {
    crossOrigin: b,
    integrity: w,
    fetchPriority: R,
    nonce: typeof m.nonce == "string" ? m.nonce : void 0
   })
  }
 }, An.preinitModule = function(h, m) {
  if (typeof h == "string")
   if (typeof m == "object" && m !== null) {
    if (m.as == null || m.as === "script") {
     var g = f(m.as, m.crossOrigin);
     i.d.M(h, {
      crossOrigin: g,
      integrity: typeof m.integrity == "string" ? m.integrity : void 0,
      nonce: typeof m.nonce == "string" ? m.nonce : void 0
     })
    }
   } else m == null && i.d.M(h)
 }, An.preload = function(h, m) {
  if (typeof h == "string" && typeof m == "object" && m !== null && typeof m.as == "string") {
   var g = m.as,
    b = f(g, m.crossOrigin);
   i.d.L(h, g, {
    crossOrigin: b,
    integrity: typeof m.integrity == "string" ? m.integrity : void 0,
    nonce: typeof m.nonce == "string" ? m.nonce : void 0,
    type: typeof m.type == "string" ? m.type : void 0,
    fetchPriority: typeof m.fetchPriority == "string" ? m.fetchPriority : void 0,
    referrerPolicy: typeof m.referrerPolicy == "string" ? m.referrerPolicy : void 0,
    imageSrcSet: typeof m.imageSrcSet == "string" ? m.imageSrcSet : void 0,
    imageSizes: typeof m.imageSizes == "string" ? m.imageSizes : void 0,
    media: typeof m.media == "string" ? m.media : void 0
   })
  }
 }, An.preloadModule = function(h, m) {
  if (typeof h == "string")
   if (m) {
    var g = f(m.as, m.crossOrigin);
    i.d.m(h, {
     as: typeof m.as == "string" && m.as !== "script" ? m.as : void 0,
     crossOrigin: g,
     integrity: typeof m.integrity == "string" ? m.integrity : void 0
    })
   } else i.d.m(h)
 }, An.requestFormReset = function(h) {
  i.d.r(h)
 }, An.unstable_batchedUpdates = function(h, m) {
  return h(m)
 }, An.useFormState = function(h, m, g) {
  return d.H.useFormState(h, m, g)
 }, An.useFormStatus = function() {
  return d.H.useHostTransitionStatus()
 }, An.version = "19.1.0", An
}
var Xy;

function _b() {
 if (Xy) return gp.exports;
 Xy = 1;

 function e() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
   __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)
  } catch (r) {
   console.error(r)
  }
 }
 return e(), gp.exports = sC(), gp.exports
}
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Wy;

function cC() {
 if (Wy) return Ll;
 Wy = 1;
 var e = lC(),
  r = gh(),
  a = _b();

 function i(t) {
  var n = "https://react.dev/errors/" + t;
  if (1 < arguments.length) {
   n += "?args[]=" + encodeURIComponent(arguments[1]);
   for (var o = 2; o < arguments.length; o++) n += "&args[]=" + encodeURIComponent(arguments[o])
  }
  return "Minified React error #" + t + "; visit " + n + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
 }

 function s(t) {
  return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11)
 }

 function c(t) {
  var n = t,
   o = t;
  if (t.alternate)
   for (; n.return;) n = n.return;
  else {
   t = n;
   do n = t, (n.flags & 4098) !== 0 && (o = n.return), t = n.return; while (t)
  }
  return n.tag === 3 ? o : null
 }

 function d(t) {
  if (t.tag === 13) {
   var n = t.memoizedState;
   if (n === null && (t = t.alternate, t !== null && (n = t.memoizedState)), n !== null) return n.dehydrated
  }
  return null
 }

 function f(t) {
  if (c(t) !== t) throw Error(i(188))
 }

 function h(t) {
  var n = t.alternate;
  if (!n) {
   if (n = c(t), n === null) throw Error(i(188));
   return n !== t ? null : t
  }
  for (var o = t, l = n;;) {
   var u = o.return;
   if (u === null) break;
   var p = u.alternate;
   if (p === null) {
    if (l = u.return, l !== null) {
     o = l;
     continue
    }
    break
   }
   if (u.child === p.child) {
    for (p = u.child; p;) {
     if (p === o) return f(u), t;
     if (p === l) return f(u), n;
     p = p.sibling
    }
    throw Error(i(188))
   }
   if (o.return !== l.return) o = u, l = p;
   else {
    for (var x = !1, M = u.child; M;) {
     if (M === o) {
      x = !0, o = u, l = p;
      break
     }
     if (M === l) {
      x = !0, l = u, o = p;
      break
     }
     M = M.sibling
    }
    if (!x) {
     for (M = p.child; M;) {
      if (M === o) {
       x = !0, o = p, l = u;
       break
      }
      if (M === l) {
       x = !0, l = p, o = u;
       break
      }
      M = M.sibling
     }
     if (!x) throw Error(i(189))
    }
   }
   if (o.alternate !== l) throw Error(i(190))
  }
  if (o.tag !== 3) throw Error(i(188));
  return o.stateNode.current === o ? t : n
 }

 function m(t) {
  var n = t.tag;
  if (n === 5 || n === 26 || n === 27 || n === 6) return t;
  for (t = t.child; t !== null;) {
   if (n = m(t), n !== null) return n;
   t = t.sibling
  }
  return null
 }
 var g = Object.assign,
  b = Symbol.for("react.element"),
  w = Symbol.for("react.transitional.element"),
  R = Symbol.for("react.portal"),
  T = Symbol.for("react.fragment"),
  C = Symbol.for("react.strict_mode"),
  D = Symbol.for("react.profiler"),
  k = Symbol.for("react.provider"),
  N = Symbol.for("react.consumer"),
  E = Symbol.for("react.context"),
  A = Symbol.for("react.forward_ref"),
  O = Symbol.for("react.suspense"),
  L = Symbol.for("react.suspense_list"),
  U = Symbol.for("react.memo"),
  _ = Symbol.for("react.lazy"),
  G = Symbol.for("react.activity"),
  S = Symbol.for("react.memo_cache_sentinel"),
  $ = Symbol.iterator;

 function H(t) {
  return t === null || typeof t != "object" ? null : (t = $ && t[$] || t["@@iterator"], typeof t == "function" ? t : null)
 }
 var V = Symbol.for("react.client.reference");

 function X(t) {
  if (t == null) return null;
  if (typeof t == "function") return t.$$typeof === V ? null : t.displayName || t.name || null;
  if (typeof t == "string") return t;
  switch (t) {
   case T:
    return "Fragment";
   case D:
    return "Profiler";
   case C:
    return "StrictMode";
   case O:
    return "Suspense";
   case L:
    return "SuspenseList";
   case G:
    return "Activity"
  }
  if (typeof t == "object") switch (t.$$typeof) {
   case R:
    return "Portal";
   case E:
    return (t.displayName || "Context") + ".Provider";
   case N:
    return (t._context.displayName || "Context") + ".Consumer";
   case A:
    var n = t.render;
    return t = t.displayName, t || (t = n.displayName || n.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
   case U:
    return n = t.displayName || null, n !== null ? n : X(t.type) || "Memo";
   case _:
    n = t._payload, t = t._init;
    try {
     return X(t(n))
    } catch {}
  }
  return null
 }
 var W = Array.isArray,
  z = r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
  I = a.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
  Q = {
   pending: !1,
   data: null,
   method: null,
   action: null
  },
  Z = [],
  j = -1;

 function q(t) {
  return {
   current: t
  }
 }

 function ee(t) {
  0 > j || (t.current = Z[j], Z[j] = null, j--)
 }

 function ne(t, n) {
  j++, Z[j] = t.current, t.current = n
 }
 var ce = q(null),
  le = q(null),
  re = q(null),
  ye = q(null);

 function ge(t, n) {
  switch (ne(re, n), ne(le, t), ne(ce, null), n.nodeType) {
   case 9:
   case 11:
    t = (t = n.documentElement) && (t = t.namespaceURI) ? hy(t) : 0;
    break;
   default:
    if (t = n.tagName, n = n.namespaceURI) n = hy(n), t = my(n, t);
    else switch (t) {
     case "svg":
      t = 1;
      break;
     case "math":
      t = 2;
      break;
     default:
      t = 0
    }
  }
  ee(ce), ne(ce, t)
 }

 function Te() {
  ee(ce), ee(le), ee(re)
 }

 function fe(t) {
  t.memoizedState !== null && ne(ye, t);
  var n = ce.current,
   o = my(n, t.type);
  n !== o && (ne(le, t), ne(ce, o))
 }

 function Oe(t) {
  le.current === t && (ee(ce), ee(le)), ye.current === t && (ee(ye), Ol._currentValue = Q)
 }
 var we = Object.prototype.hasOwnProperty,
  Se = e.unstable_scheduleCallback,
  Re = e.unstable_cancelCallback,
  ze = e.unstable_shouldYield,
  it = e.unstable_requestPaint,
  Ne = e.unstable_now,
  Je = e.unstable_getCurrentPriorityLevel,
  Ke = e.unstable_ImmediatePriority,
  Pe = e.unstable_UserBlockingPriority,
  He = e.unstable_NormalPriority,
  Ee = e.unstable_LowPriority,
  mt = e.unstable_IdlePriority,
  ot = e.log,
  de = e.unstable_setDisableYieldValue,
  me = null,
  ve = null;

 function De(t) {
  if (typeof ot == "function" && de(t), ve && typeof ve.setStrictMode == "function") try {
   ve.setStrictMode(me, t)
  } catch {}
 }
 var be = Math.clz32 ? Math.clz32 : Qe,
  xe = Math.log,
  he = Math.LN2;

 function Qe(t) {
  return t >>>= 0, t === 0 ? 32 : 31 - (xe(t) / he | 0) | 0
 }
 var Be = 256,
  Xe = 4194304;

 function Me(t) {
  var n = t & 42;
  if (n !== 0) return n;
  switch (t & -t) {
   case 1:
    return 1;
   case 2:
    return 2;
   case 4:
    return 4;
   case 8:
    return 8;
   case 16:
    return 16;
   case 32:
    return 32;
   case 64:
    return 64;
   case 128:
    return 128;
   case 256:
   case 512:
   case 1024:
   case 2048:
   case 4096:
   case 8192:
   case 16384:
   case 32768:
   case 65536:
   case 131072:
   case 262144:
   case 524288:
   case 1048576:
   case 2097152:
    return t & 4194048;
   case 4194304:
   case 8388608:
   case 16777216:
   case 33554432:
    return t & 62914560;
   case 67108864:
    return 67108864;
   case 134217728:
    return 134217728;
   case 268435456:
    return 268435456;
   case 536870912:
    return 536870912;
   case 1073741824:
    return 0;
   default:
    return t
  }
 }

 function tt(t, n, o) {
  var l = t.pendingLanes;
  if (l === 0) return 0;
  var u = 0,
   p = t.suspendedLanes,
   x = t.pingedLanes;
  t = t.warmLanes;
  var M = l & 134217727;
  return M !== 0 ? (l = M & ~p, l !== 0 ? u = Me(l) : (x &= M, x !== 0 ? u = Me(x) : o || (o = M & ~t, o !== 0 && (u = Me(o))))) : (M = l & ~p, M !== 0 ? u = Me(M) : x !== 0 ? u = Me(x) : o || (o = l & ~t, o !== 0 && (u = Me(o)))), u === 0 ? 0 : n !== 0 && n !== u && (n & p) === 0 && (p = u & -u, o = n & -n, p >= o || p === 32 && (o & 4194048) !== 0) ? n : u
 }

 function gt(t, n) {
  return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & n) === 0
 }

 function rn(t, n) {
  switch (t) {
   case 1:
   case 2:
   case 4:
   case 8:
   case 64:
    return n + 250;
   case 16:
   case 32:
   case 128:
   case 256:
   case 512:
   case 1024:
   case 2048:
   case 4096:
   case 8192:
   case 16384:
   case 32768:
   case 65536:
   case 131072:
   case 262144:
   case 524288:
   case 1048576:
   case 2097152:
    return n + 5e3;
   case 4194304:
   case 8388608:
   case 16777216:
   case 33554432:
    return -1;
   case 67108864:
   case 134217728:
   case 268435456:
   case 536870912:
   case 1073741824:
    return -1;
   default:
    return -1
  }
 }

 function On() {
  var t = Be;
  return Be <<= 1, (Be & 4194048) === 0 && (Be = 256), t
 }

 function Jn() {
  var t = Xe;
  return Xe <<= 1, (Xe & 62914560) === 0 && (Xe = 4194304), t
 }

 function jn(t) {
  for (var n = [], o = 0; 31 > o; o++) n.push(t);
  return n
 }

 function Fe(t, n) {
  t.pendingLanes |= n, n !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0)
 }

 function lt(t, n, o, l, u, p) {
  var x = t.pendingLanes;
  t.pendingLanes = o, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= o, t.entangledLanes &= o, t.errorRecoveryDisabledLanes &= o, t.shellSuspendCounter = 0;
  var M = t.entanglements,
   B = t.expirationTimes,
   K = t.hiddenUpdates;
  for (o = x & ~o; 0 < o;) {
   var ie = 31 - be(o),
    ue = 1 << ie;
   M[ie] = 0, B[ie] = -1;
   var J = K[ie];
   if (J !== null)
    for (K[ie] = null, ie = 0; ie < J.length; ie++) {
     var te = J[ie];
     te !== null && (te.lane &= -536870913)
    }
   o &= ~ue
  }
  l !== 0 && Pt(t, l, 0), p !== 0 && u === 0 && t.tag !== 0 && (t.suspendedLanes |= p & ~(x & ~n))
 }

 function Pt(t, n, o) {
  t.pendingLanes |= n, t.suspendedLanes &= ~n;
  var l = 31 - be(n);
  t.entangledLanes |= n, t.entanglements[l] = t.entanglements[l] | 1073741824 | o & 4194090
 }

 function Vt(t, n) {
  var o = t.entangledLanes |= n;
  for (t = t.entanglements; o;) {
   var l = 31 - be(o),
    u = 1 << l;
   u & n | t[l] & n && (t[l] |= n), o &= ~u
  }
 }

 function pt(t) {
  switch (t) {
   case 2:
    t = 1;
    break;
   case 8:
    t = 4;
    break;
   case 32:
    t = 16;
    break;
   case 256:
   case 512:
   case 1024:
   case 2048:
   case 4096:
   case 8192:
   case 16384:
   case 32768:
   case 65536:
   case 131072:
   case 262144:
   case 524288:
   case 1048576:
   case 2097152:
   case 4194304:
   case 8388608:
   case 16777216:
   case 33554432:
    t = 128;
    break;
   case 268435456:
    t = 134217728;
    break;
   default:
    t = 0
  }
  return t
 }

 function je(t) {
  return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2
 }

 function kt() {
  var t = I.p;
  return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : Ny(t.type))
 }

 function En(t, n) {
  var o = I.p;
  try {
   return I.p = t, n()
  } finally {
   I.p = o
  }
 }
 var vt = Math.random().toString(36).slice(2),
  zt = "__reactFiber$" + vt,
  jt = "__reactProps$" + vt,
  pn = "__reactContainer$" + vt,
  Nn = "__reactEvents$" + vt,
  Yr = "__reactListeners$" + vt,
  er = "__reactHandles$" + vt,
  Mr = "__reactResources$" + vt,
  Sr = "__reactMarker$" + vt;

 function Pi(t) {
  delete t[zt], delete t[jt], delete t[Nn], delete t[Yr], delete t[er]
 }

 function oe(t) {
  var n = t[zt];
  if (n) return n;
  for (var o = t.parentNode; o;) {
   if (n = o[pn] || o[zt]) {
    if (o = n.alternate, n.child !== null || o !== null && o.child !== null)
     for (t = by(t); t !== null;) {
      if (o = t[zt]) return o;
      t = by(t)
     }
    return n
   }
   t = o, o = t.parentNode
  }
  return null
 }

 function $e(t) {
  if (t = t[zt] || t[pn]) {
   var n = t.tag;
   if (n === 5 || n === 6 || n === 13 || n === 26 || n === 27 || n === 3) return t
  }
  return null
 }

 function dt(t) {
  var n = t.tag;
  if (n === 5 || n === 26 || n === 27 || n === 6) return t.stateNode;
  throw Error(i(33))
 }

 function st(t) {
  var n = t[Mr];
  return n || (n = t[Mr] = {
   hoistableStyles: new Map,
   hoistableScripts: new Map
  }), n
 }

 function wt(t) {
  t[Sr] = !0
 }
 var Zt = new Set,
  tr = {};

 function Vo(t, n) {
  Ra(t, n), Ra(t + "Capture", n)
 }

 function Ra(t, n) {
  for (tr[t] = n, t = 0; t < n.length; t++) Zt.add(n[t])
 }
 var Yx = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),
  am = {},
  im = {};

 function Xx(t) {
  return we.call(im, t) ? !0 : we.call(am, t) ? !1 : Yx.test(t) ? im[t] = !0 : (am[t] = !0, !1)
 }

 function js(t, n, o) {
  if (Xx(n))
   if (o === null) t.removeAttribute(n);
   else {
    switch (typeof o) {
     case "undefined":
     case "function":
     case "symbol":
      t.removeAttribute(n);
      return;
     case "boolean":
      var l = n.toLowerCase().slice(0, 5);
      if (l !== "data-" && l !== "aria-") {
       t.removeAttribute(n);
       return
      }
    }
    t.setAttribute(n, "" + o)
   }
 }

 function Ns(t, n, o) {
  if (o === null) t.removeAttribute(n);
  else {
   switch (typeof o) {
    case "undefined":
    case "function":
    case "symbol":
    case "boolean":
     t.removeAttribute(n);
     return
   }
   t.setAttribute(n, "" + o)
  }
 }

 function Xr(t, n, o, l) {
  if (l === null) t.removeAttribute(o);
  else {
   switch (typeof l) {
    case "undefined":
    case "function":
    case "symbol":
    case "boolean":
     t.removeAttribute(o);
     return
   }
   t.setAttributeNS(n, o, "" + l)
  }
 }
 var od, lm;

 function Ea(t) {
  if (od === void 0) try {
   throw Error()
  } catch (o) {
   var n = o.stack.trim().match(/\n( *(at )?)/);
   od = n && n[1] || "", lm = -1 < o.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < o.stack.indexOf("@") ? "@unknown:0:0" : ""
  }
  return `
` + od + t + lm
 }
 var ad = !1;

 function id(t, n) {
  if (!t || ad) return "";
  ad = !0;
  var o = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
   var l = {
    DetermineComponentFrameRoot: function() {
     try {
      if (n) {
       var ue = function() {
        throw Error()
       };
       if (Object.defineProperty(ue.prototype, "props", {
         set: function() {
          throw Error()
         }
        }), typeof Reflect == "object" && Reflect.construct) {
        try {
         Reflect.construct(ue, [])
        } catch (te) {
         var J = te
        }
        Reflect.construct(t, [], ue)
       } else {
        try {
         ue.call()
        } catch (te) {
         J = te
        }
        t.call(ue.prototype)
       }
      } else {
       try {
        throw Error()
       } catch (te) {
        J = te
       }(ue = t()) && typeof ue.catch == "function" && ue.catch(function() {})
      }
     } catch (te) {
      if (te && J && typeof te.stack == "string") return [te.stack, J.stack]
     }
     return [null, null]
    }
   };
   l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
   var u = Object.getOwnPropertyDescriptor(l.DetermineComponentFrameRoot, "name");
   u && u.configurable && Object.defineProperty(l.DetermineComponentFrameRoot, "name", {
    value: "DetermineComponentFrameRoot"
   });
   var p = l.DetermineComponentFrameRoot(),
    x = p[0],
    M = p[1];
   if (x && M) {
    var B = x.split(`
`),
     K = M.split(`
`);
    for (u = l = 0; l < B.length && !B[l].includes("DetermineComponentFrameRoot");) l++;
    for (; u < K.length && !K[u].includes("DetermineComponentFrameRoot");) u++;
    if (l === B.length || u === K.length)
     for (l = B.length - 1, u = K.length - 1; 1 <= l && 0 <= u && B[l] !== K[u];) u--;
    for (; 1 <= l && 0 <= u; l--, u--)
     if (B[l] !== K[u]) {
      if (l !== 1 || u !== 1)
       do
        if (l--, u--, 0 > u || B[l] !== K[u]) {
         var ie = `
` + B[l].replace(" at new ", " at ");
         return t.displayName && ie.includes("<anonymous>") && (ie = ie.replace("<anonymous>", t.displayName)), ie
        } while (1 <= l && 0 <= u);
      break
     }
   }
  } finally {
   ad = !1, Error.prepareStackTrace = o
  }
  return (o = t ? t.displayName || t.name : "") ? Ea(o) : ""
 }

 function Wx(t) {
  switch (t.tag) {
   case 26:
   case 27:
   case 5:
    return Ea(t.type);
   case 16:
    return Ea("Lazy");
   case 13:
    return Ea("Suspense");
   case 19:
    return Ea("SuspenseList");
   case 0:
   case 15:
    return id(t.type, !1);
   case 11:
    return id(t.type.render, !1);
   case 1:
    return id(t.type, !0);
   case 31:
    return Ea("Activity");
   default:
    return ""
  }
 }

 function sm(t) {
  try {
   var n = "";
   do n += Wx(t), t = t.return; while (t);
   return n
  } catch (o) {
   return `
Error generating stack: ` + o.message + `
` + o.stack
  }
 }

 function nr(t) {
  switch (typeof t) {
   case "bigint":
   case "boolean":
   case "number":
   case "string":
   case "undefined":
    return t;
   case "object":
    return t;
   default:
    return ""
  }
 }

 function cm(t) {
  var n = t.type;
  return (t = t.nodeName) && t.toLowerCase() === "input" && (n === "checkbox" || n === "radio")
 }

 function Fx(t) {
  var n = cm(t) ? "checked" : "value",
   o = Object.getOwnPropertyDescriptor(t.constructor.prototype, n),
   l = "" + t[n];
  if (!t.hasOwnProperty(n) && typeof o < "u" && typeof o.get == "function" && typeof o.set == "function") {
   var u = o.get,
    p = o.set;
   return Object.defineProperty(t, n, {
    configurable: !0,
    get: function() {
     return u.call(this)
    },
    set: function(x) {
     l = "" + x, p.call(this, x)
    }
   }), Object.defineProperty(t, n, {
    enumerable: o.enumerable
   }), {
    getValue: function() {
     return l
    },
    setValue: function(x) {
     l = "" + x
    },
    stopTracking: function() {
     t._valueTracker = null, delete t[n]
    }
   }
  }
 }

 function Ls(t) {
  t._valueTracker || (t._valueTracker = Fx(t))
 }

 function um(t) {
  if (!t) return !1;
  var n = t._valueTracker;
  if (!n) return !0;
  var o = n.getValue(),
   l = "";
  return t && (l = cm(t) ? t.checked ? "true" : "false" : t.value), t = l, t !== o ? (n.setValue(t), !0) : !1
 }

 function Bs(t) {
  if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
  try {
   return t.activeElement || t.body
  } catch {
   return t.body
  }
 }
 var Kx = /[\n"\\]/g;

 function rr(t) {
  return t.replace(Kx, function(n) {
   return "\\" + n.charCodeAt(0).toString(16) + " "
  })
 }

 function ld(t, n, o, l, u, p, x, M) {
  t.name = "", x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" ? t.type = x : t.removeAttribute("type"), n != null ? x === "number" ? (n === 0 && t.value === "" || t.value != n) && (t.value = "" + nr(n)) : t.value !== "" + nr(n) && (t.value = "" + nr(n)) : x !== "submit" && x !== "reset" || t.removeAttribute("value"), n != null ? sd(t, x, nr(n)) : o != null ? sd(t, x, nr(o)) : l != null && t.removeAttribute("value"), u == null && p != null && (t.defaultChecked = !!p), u != null && (t.checked = u && typeof u != "function" && typeof u != "symbol"), M != null && typeof M != "function" && typeof M != "symbol" && typeof M != "boolean" ? t.name = "" + nr(M) : t.removeAttribute("name")
 }

 function dm(t, n, o, l, u, p, x, M) {
  if (p != null && typeof p != "function" && typeof p != "symbol" && typeof p != "boolean" && (t.type = p), n != null || o != null) {
   if (!(p !== "submit" && p !== "reset" || n != null)) return;
   o = o != null ? "" + nr(o) : "", n = n != null ? "" + nr(n) : o, M || n === t.value || (t.value = n), t.defaultValue = n
  }
  l = l ?? u, l = typeof l != "function" && typeof l != "symbol" && !!l, t.checked = M ? t.checked : !!l, t.defaultChecked = !!l, x != null && typeof x != "function" && typeof x != "symbol" && typeof x != "boolean" && (t.name = x)
 }

 function sd(t, n, o) {
  n === "number" && Bs(t.ownerDocument) === t || t.defaultValue === "" + o || (t.defaultValue = "" + o)
 }

 function Ta(t, n, o, l) {
  if (t = t.options, n) {
   n = {};
   for (var u = 0; u < o.length; u++) n["$" + o[u]] = !0;
   for (o = 0; o < t.length; o++) u = n.hasOwnProperty("$" + t[o].value), t[o].selected !== u && (t[o].selected = u), u && l && (t[o].defaultSelected = !0)
  } else {
   for (o = "" + nr(o), n = null, u = 0; u < t.length; u++) {
    if (t[u].value === o) {
     t[u].selected = !0, l && (t[u].defaultSelected = !0);
     return
    }
    n !== null || t[u].disabled || (n = t[u])
   }
   n !== null && (n.selected = !0)
  }
 }

 function fm(t, n, o) {
  if (n != null && (n = "" + nr(n), n !== t.value && (t.value = n), o == null)) {
   t.defaultValue !== n && (t.defaultValue = n);
   return
  }
  t.defaultValue = o != null ? "" + nr(o) : ""
 }

 function pm(t, n, o, l) {
  if (n == null) {
   if (l != null) {
    if (o != null) throw Error(i(92));
    if (W(l)) {
     if (1 < l.length) throw Error(i(93));
     l = l[0]
    }
    o = l
   }
   o == null && (o = ""), n = o
  }
  o = nr(n), t.defaultValue = o, l = t.textContent, l === o && l !== "" && l !== null && (t.value = l)
 }

 function Aa(t, n) {
  if (n) {
   var o = t.firstChild;
   if (o && o === t.lastChild && o.nodeType === 3) {
    o.nodeValue = n;
    return
   }
  }
  t.textContent = n
 }
 var Qx = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));

 function hm(t, n, o) {
  var l = n.indexOf("--") === 0;
  o == null || typeof o == "boolean" || o === "" ? l ? t.setProperty(n, "") : n === "float" ? t.cssFloat = "" : t[n] = "" : l ? t.setProperty(n, o) : typeof o != "number" || o === 0 || Qx.has(n) ? n === "float" ? t.cssFloat = o : t[n] = ("" + o).trim() : t[n] = o + "px"
 }

 function mm(t, n, o) {
  if (n != null && typeof n != "object") throw Error(i(62));
  if (t = t.style, o != null) {
   for (var l in o) !o.hasOwnProperty(l) || n != null && n.hasOwnProperty(l) || (l.indexOf("--") === 0 ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "");
   for (var u in n) l = n[u], n.hasOwnProperty(u) && o[u] !== l && hm(t, u, l)
  } else
   for (var p in n) n.hasOwnProperty(p) && hm(t, p, n[p])
 }

 function cd(t) {
  if (t.indexOf("-") === -1) return !1;
  switch (t) {
   case "annotation-xml":
   case "color-profile":
   case "font-face":
   case "font-face-src":
   case "font-face-uri":
   case "font-face-format":
   case "font-face-name":
   case "missing-glyph":
    return !1;
   default:
    return !0
  }
 }
 var Zx = new Map([
   ["acceptCharset", "accept-charset"],
   ["htmlFor", "for"],
   ["httpEquiv", "http-equiv"],
   ["crossOrigin", "crossorigin"],
   ["accentHeight", "accent-height"],
   ["alignmentBaseline", "alignment-baseline"],
   ["arabicForm", "arabic-form"],
   ["baselineShift", "baseline-shift"],
   ["capHeight", "cap-height"],
   ["clipPath", "clip-path"],
   ["clipRule", "clip-rule"],
   ["colorInterpolation", "color-interpolation"],
   ["colorInterpolationFilters", "color-interpolation-filters"],
   ["colorProfile", "color-profile"],
   ["colorRendering", "color-rendering"],
   ["dominantBaseline", "dominant-baseline"],
   ["enableBackground", "enable-background"],
   ["fillOpacity", "fill-opacity"],
   ["fillRule", "fill-rule"],
   ["floodColor", "flood-color"],
   ["floodOpacity", "flood-opacity"],
   ["fontFamily", "font-family"],
   ["fontSize", "font-size"],
   ["fontSizeAdjust", "font-size-adjust"],
   ["fontStretch", "font-stretch"],
   ["fontStyle", "font-style"],
   ["fontVariant", "font-variant"],
   ["fontWeight", "font-weight"],
   ["glyphName", "glyph-name"],
   ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
   ["glyphOrientationVertical", "glyph-orientation-vertical"],
   ["horizAdvX", "horiz-adv-x"],
   ["horizOriginX", "horiz-origin-x"],
   ["imageRendering", "image-rendering"],
   ["letterSpacing", "letter-spacing"],
   ["lightingColor", "lighting-color"],
   ["markerEnd", "marker-end"],
   ["markerMid", "marker-mid"],
   ["markerStart", "marker-start"],
   ["overlinePosition", "overline-position"],
   ["overlineThickness", "overline-thickness"],
   ["paintOrder", "paint-order"],
   ["panose-1", "panose-1"],
   ["pointerEvents", "pointer-events"],
   ["renderingIntent", "rendering-intent"],
   ["shapeRendering", "shape-rendering"],
   ["stopColor", "stop-color"],
   ["stopOpacity", "stop-opacity"],
   ["strikethroughPosition", "strikethrough-position"],
   ["strikethroughThickness", "strikethrough-thickness"],
   ["strokeDasharray", "stroke-dasharray"],
   ["strokeDashoffset", "stroke-dashoffset"],
   ["strokeLinecap", "stroke-linecap"],
   ["strokeLinejoin", "stroke-linejoin"],
   ["strokeMiterlimit", "stroke-miterlimit"],
   ["strokeOpacity", "stroke-opacity"],
   ["strokeWidth", "stroke-width"],
   ["textAnchor", "text-anchor"],
   ["textDecoration", "text-decoration"],
   ["textRendering", "text-rendering"],
   ["transformOrigin", "transform-origin"],
   ["underlinePosition", "underline-position"],
   ["underlineThickness", "underline-thickness"],
   ["unicodeBidi", "unicode-bidi"],
   ["unicodeRange", "unicode-range"],
   ["unitsPerEm", "units-per-em"],
   ["vAlphabetic", "v-alphabetic"],
   ["vHanging", "v-hanging"],
   ["vIdeographic", "v-ideographic"],
   ["vMathematical", "v-mathematical"],
   ["vectorEffect", "vector-effect"],
   ["vertAdvY", "vert-adv-y"],
   ["vertOriginX", "vert-origin-x"],
   ["vertOriginY", "vert-origin-y"],
   ["wordSpacing", "word-spacing"],
   ["writingMode", "writing-mode"],
   ["xmlnsXlink", "xmlns:xlink"],
   ["xHeight", "x-height"]
  ]),
  Jx = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;

 function $s(t) {
  return Jx.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t
 }
 var ud = null;

 function dd(t) {
  return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t
 }
 var Ma = null,
  Oa = null;

 function gm(t) {
  var n = $e(t);
  if (n && (t = n.stateNode)) {
   var o = t[jt] || null;
   e: switch (t = n.stateNode, n.type) {
    case "input":
     if (ld(t, o.value, o.defaultValue, o.defaultValue, o.checked, o.defaultChecked, o.type, o.name), n = o.name, o.type === "radio" && n != null) {
      for (o = t; o.parentNode;) o = o.parentNode;
      for (o = o.querySelectorAll('input[name="' + rr("" + n) + '"][type="radio"]'), n = 0; n < o.length; n++) {
       var l = o[n];
       if (l !== t && l.form === t.form) {
        var u = l[jt] || null;
        if (!u) throw Error(i(90));
        ld(l, u.value, u.defaultValue, u.defaultValue, u.checked, u.defaultChecked, u.type, u.name)
       }
      }
      for (n = 0; n < o.length; n++) l = o[n], l.form === t.form && um(l)
     }
     break e;
    case "textarea":
     fm(t, o.value, o.defaultValue);
     break e;
    case "select":
     n = o.value, n != null && Ta(t, !!o.multiple, n, !1)
   }
  }
 }
 var fd = !1;

 function vm(t, n, o) {
  if (fd) return t(n, o);
  fd = !0;
  try {
   var l = t(n);
   return l
  } finally {
   if (fd = !1, (Ma !== null || Oa !== null) && (Cc(), Ma && (n = Ma, t = Oa, Oa = Ma = null, gm(n), t)))
    for (n = 0; n < t.length; n++) gm(t[n])
  }
 }

 function Hi(t, n) {
  var o = t.stateNode;
  if (o === null) return null;
  var l = o[jt] || null;
  if (l === null) return null;
  o = l[n];
  e: switch (n) {
   case "onClick":
   case "onClickCapture":
   case "onDoubleClick":
   case "onDoubleClickCapture":
   case "onMouseDown":
   case "onMouseDownCapture":
   case "onMouseMove":
   case "onMouseMoveCapture":
   case "onMouseUp":
   case "onMouseUpCapture":
   case "onMouseEnter":
    (l = !l.disabled) || (t = t.type, l = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !l;
    break e;
   default:
    t = !1
  }
  if (t) return null;
  if (o && typeof o != "function") throw Error(i(231, n, typeof o));
  return o
 }
 var Wr = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
  pd = !1;
 if (Wr) try {
  var qi = {};
  Object.defineProperty(qi, "passive", {
   get: function() {
    pd = !0
   }
  }), window.addEventListener("test", qi, qi), window.removeEventListener("test", qi, qi)
 } catch {
  pd = !1
 }
 var mo = null,
  hd = null,
  _s = null;

 function ym() {
  if (_s) return _s;
  var t, n = hd,
   o = n.length,
   l, u = "value" in mo ? mo.value : mo.textContent,
   p = u.length;
  for (t = 0; t < o && n[t] === u[t]; t++);
  var x = o - t;
  for (l = 1; l <= x && n[o - l] === u[p - l]; l++);
  return _s = u.slice(t, 1 < l ? 1 - l : void 0)
 }

 function Us(t) {
  var n = t.keyCode;
  return "charCode" in t ? (t = t.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0
 }

 function Is() {
  return !0
 }

 function bm() {
  return !1
 }

 function Ln(t) {
  function n(o, l, u, p, x) {
   this._reactName = o, this._targetInst = u, this.type = l, this.nativeEvent = p, this.target = x, this.currentTarget = null;
   for (var M in t) t.hasOwnProperty(M) && (o = t[M], this[M] = o ? o(p) : p[M]);
   return this.isDefaultPrevented = (p.defaultPrevented != null ? p.defaultPrevented : p.returnValue === !1) ? Is : bm, this.isPropagationStopped = bm, this
  }
  return g(n.prototype, {
   preventDefault: function() {
    this.defaultPrevented = !0;
    var o = this.nativeEvent;
    o && (o.preventDefault ? o.preventDefault() : typeof o.returnValue != "unknown" && (o.returnValue = !1), this.isDefaultPrevented = Is)
   },
   stopPropagation: function() {
    var o = this.nativeEvent;
    o && (o.stopPropagation ? o.stopPropagation() : typeof o.cancelBubble != "unknown" && (o.cancelBubble = !0), this.isPropagationStopped = Is)
   },
   persist: function() {},
   isPersistent: Is
  }), n
 }
 var Go = {
   eventPhase: 0,
   bubbles: 0,
   cancelable: 0,
   timeStamp: function(t) {
    return t.timeStamp || Date.now()
   },
   defaultPrevented: 0,
   isTrusted: 0
  },
  Ps = Ln(Go),
  Vi = g({}, Go, {
   view: 0,
   detail: 0
  }),
  eS = Ln(Vi),
  md, gd, Gi, Hs = g({}, Vi, {
   screenX: 0,
   screenY: 0,
   clientX: 0,
   clientY: 0,
   pageX: 0,
   pageY: 0,
   ctrlKey: 0,
   shiftKey: 0,
   altKey: 0,
   metaKey: 0,
   getModifierState: yd,
   button: 0,
   buttons: 0,
   relatedTarget: function(t) {
    return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget
   },
   movementX: function(t) {
    return "movementX" in t ? t.movementX : (t !== Gi && (Gi && t.type === "mousemove" ? (md = t.screenX - Gi.screenX, gd = t.screenY - Gi.screenY) : gd = md = 0, Gi = t), md)
   },
   movementY: function(t) {
    return "movementY" in t ? t.movementY : gd
   }
  }),
  xm = Ln(Hs),
  tS = g({}, Hs, {
   dataTransfer: 0
  }),
  nS = Ln(tS),
  rS = g({}, Vi, {
   relatedTarget: 0
  }),
  vd = Ln(rS),
  oS = g({}, Go, {
   animationName: 0,
   elapsedTime: 0,
   pseudoElement: 0
  }),
  aS = Ln(oS),
  iS = g({}, Go, {
   clipboardData: function(t) {
    return "clipboardData" in t ? t.clipboardData : window.clipboardData
   }
  }),
  lS = Ln(iS),
  sS = g({}, Go, {
   data: 0
  }),
  Sm = Ln(sS),
  cS = {
   Esc: "Escape",
   Spacebar: " ",
   Left: "ArrowLeft",
   Up: "ArrowUp",
   Right: "ArrowRight",
   Down: "ArrowDown",
   Del: "Delete",
   Win: "OS",
   Menu: "ContextMenu",
   Apps: "ContextMenu",
   Scroll: "ScrollLock",
   MozPrintableKey: "Unidentified"
  },
  uS = {
   8: "Backspace",
   9: "Tab",
   12: "Clear",
   13: "Enter",
   16: "Shift",
   17: "Control",
   18: "Alt",
   19: "Pause",
   20: "CapsLock",
   27: "Escape",
   32: " ",
   33: "PageUp",
   34: "PageDown",
   35: "End",
   36: "Home",
   37: "ArrowLeft",
   38: "ArrowUp",
   39: "ArrowRight",
   40: "ArrowDown",
   45: "Insert",
   46: "Delete",
   112: "F1",
   113: "F2",
   114: "F3",
   115: "F4",
   116: "F5",
   117: "F6",
   118: "F7",
   119: "F8",
   120: "F9",
   121: "F10",
   122: "F11",
   123: "F12",
   144: "NumLock",
   145: "ScrollLock",
   224: "Meta"
  },
  dS = {
   Alt: "altKey",
   Control: "ctrlKey",
   Meta: "metaKey",
   Shift: "shiftKey"
  };

 function fS(t) {
  var n = this.nativeEvent;
  return n.getModifierState ? n.getModifierState(t) : (t = dS[t]) ? !!n[t] : !1
 }

 function yd() {
  return fS
 }
 var pS = g({}, Vi, {
   key: function(t) {
    if (t.key) {
     var n = cS[t.key] || t.key;
     if (n !== "Unidentified") return n
    }
    return t.type === "keypress" ? (t = Us(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? uS[t.keyCode] || "Unidentified" : ""
   },
   code: 0,
   location: 0,
   ctrlKey: 0,
   shiftKey: 0,
   altKey: 0,
   metaKey: 0,
   repeat: 0,
   locale: 0,
   getModifierState: yd,
   charCode: function(t) {
    return t.type === "keypress" ? Us(t) : 0
   },
   keyCode: function(t) {
    return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0
   },
   which: function(t) {
    return t.type === "keypress" ? Us(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0
   }
  }),
  hS = Ln(pS),
  mS = g({}, Hs, {
   pointerId: 0,
   width: 0,
   height: 0,
   pressure: 0,
   tangentialPressure: 0,
   tiltX: 0,
   tiltY: 0,
   twist: 0,
   pointerType: 0,
   isPrimary: 0
  }),
  Cm = Ln(mS),
  gS = g({}, Vi, {
   touches: 0,
   targetTouches: 0,
   changedTouches: 0,
   altKey: 0,
   metaKey: 0,
   ctrlKey: 0,
   shiftKey: 0,
   getModifierState: yd
  }),
  vS = Ln(gS),
  yS = g({}, Go, {
   propertyName: 0,
   elapsedTime: 0,
   pseudoElement: 0
  }),
  bS = Ln(yS),
  xS = g({}, Hs, {
   deltaX: function(t) {
    return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0
   },
   deltaY: function(t) {
    return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0
   },
   deltaZ: 0,
   deltaMode: 0
  }),
  SS = Ln(xS),
  CS = g({}, Go, {
   newState: 0,
   oldState: 0
  }),
  wS = Ln(CS),
  RS = [9, 13, 27, 32],
  bd = Wr && "CompositionEvent" in window,
  Yi = null;
 Wr && "documentMode" in document && (Yi = document.documentMode);
 var ES = Wr && "TextEvent" in window && !Yi,
  wm = Wr && (!bd || Yi && 8 < Yi && 11 >= Yi),
  Rm = " ",
  Em = !1;

 function Tm(t, n) {
  switch (t) {
   case "keyup":
    return RS.indexOf(n.keyCode) !== -1;
   case "keydown":
    return n.keyCode !== 229;
   case "keypress":
   case "mousedown":
   case "focusout":
    return !0;
   default:
    return !1
  }
 }

 function Am(t) {
  return t = t.detail, typeof t == "object" && "data" in t ? t.data : null
 }
 var Da = !1;

 function TS(t, n) {
  switch (t) {
   case "compositionend":
    return Am(n);
   case "keypress":
    return n.which !== 32 ? null : (Em = !0, Rm);
   case "textInput":
    return t = n.data, t === Rm && Em ? null : t;
   default:
    return null
  }
 }

 function AS(t, n) {
  if (Da) return t === "compositionend" || !bd && Tm(t, n) ? (t = ym(), _s = hd = mo = null, Da = !1, t) : null;
  switch (t) {
   case "paste":
    return null;
   case "keypress":
    if (!(n.ctrlKey || n.altKey || n.metaKey) || n.ctrlKey && n.altKey) {
     if (n.char && 1 < n.char.length) return n.char;
     if (n.which) return String.fromCharCode(n.which)
    }
    return null;
   case "compositionend":
    return wm && n.locale !== "ko" ? null : n.data;
   default:
    return null
  }
 }
 var MS = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0
 };

 function Mm(t) {
  var n = t && t.nodeName && t.nodeName.toLowerCase();
  return n === "input" ? !!MS[t.type] : n === "textarea"
 }

 function Om(t, n, o, l) {
  Ma ? Oa ? Oa.push(l) : Oa = [l] : Ma = l, n = Mc(n, "onChange"), 0 < n.length && (o = new Ps("onChange", "change", null, o, l), t.push({
   event: o,
   listeners: n
  }))
 }
 var Xi = null,
  Wi = null;

 function OS(t) {
  cy(t, 0)
 }

 function qs(t) {
  var n = dt(t);
  if (um(n)) return t
 }

 function Dm(t, n) {
  if (t === "change") return n
 }
 var km = !1;
 if (Wr) {
  var xd;
  if (Wr) {
   var Sd = "oninput" in document;
   if (!Sd) {
    var zm = document.createElement("div");
    zm.setAttribute("oninput", "return;"), Sd = typeof zm.oninput == "function"
   }
   xd = Sd
  } else xd = !1;
  km = xd && (!document.documentMode || 9 < document.documentMode)
 }

 function jm() {
  Xi && (Xi.detachEvent("onpropertychange", Nm), Wi = Xi = null)
 }

 function Nm(t) {
  if (t.propertyName === "value" && qs(Wi)) {
   var n = [];
   Om(n, Wi, t, dd(t)), vm(OS, n)
  }
 }

 function DS(t, n, o) {
  t === "focusin" ? (jm(), Xi = n, Wi = o, Xi.attachEvent("onpropertychange", Nm)) : t === "focusout" && jm()
 }

 function kS(t) {
  if (t === "selectionchange" || t === "keyup" || t === "keydown") return qs(Wi)
 }

 function zS(t, n) {
  if (t === "click") return qs(n)
 }

 function jS(t, n) {
  if (t === "input" || t === "change") return qs(n)
 }

 function NS(t, n) {
  return t === n && (t !== 0 || 1 / t === 1 / n) || t !== t && n !== n
 }
 var qn = typeof Object.is == "function" ? Object.is : NS;

 function Fi(t, n) {
  if (qn(t, n)) return !0;
  if (typeof t != "object" || t === null || typeof n != "object" || n === null) return !1;
  var o = Object.keys(t),
   l = Object.keys(n);
  if (o.length !== l.length) return !1;
  for (l = 0; l < o.length; l++) {
   var u = o[l];
   if (!we.call(n, u) || !qn(t[u], n[u])) return !1
  }
  return !0
 }

 function Lm(t) {
  for (; t && t.firstChild;) t = t.firstChild;
  return t
 }

 function Bm(t, n) {
  var o = Lm(t);
  t = 0;
  for (var l; o;) {
   if (o.nodeType === 3) {
    if (l = t + o.textContent.length, t <= n && l >= n) return {
     node: o,
     offset: n - t
    };
    t = l
   }
   e: {
    for (; o;) {
     if (o.nextSibling) {
      o = o.nextSibling;
      break e
     }
     o = o.parentNode
    }
    o = void 0
   }
   o = Lm(o)
  }
 }

 function $m(t, n) {
  return t && n ? t === n ? !0 : t && t.nodeType === 3 ? !1 : n && n.nodeType === 3 ? $m(t, n.parentNode) : "contains" in t ? t.contains(n) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(n) & 16) : !1 : !1
 }

 function _m(t) {
  t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
  for (var n = Bs(t.document); n instanceof t.HTMLIFrameElement;) {
   try {
    var o = typeof n.contentWindow.location.href == "string"
   } catch {
    o = !1
   }
   if (o) t = n.contentWindow;
   else break;
   n = Bs(t.document)
  }
  return n
 }

 function Cd(t) {
  var n = t && t.nodeName && t.nodeName.toLowerCase();
  return n && (n === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || n === "textarea" || t.contentEditable === "true")
 }
 var LS = Wr && "documentMode" in document && 11 >= document.documentMode,
  ka = null,
  wd = null,
  Ki = null,
  Rd = !1;

 function Um(t, n, o) {
  var l = o.window === o ? o.document : o.nodeType === 9 ? o : o.ownerDocument;
  Rd || ka == null || ka !== Bs(l) || (l = ka, "selectionStart" in l && Cd(l) ? l = {
   start: l.selectionStart,
   end: l.selectionEnd
  } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
   anchorNode: l.anchorNode,
   anchorOffset: l.anchorOffset,
   focusNode: l.focusNode,
   focusOffset: l.focusOffset
  }), Ki && Fi(Ki, l) || (Ki = l, l = Mc(wd, "onSelect"), 0 < l.length && (n = new Ps("onSelect", "select", null, n, o), t.push({
   event: n,
   listeners: l
  }), n.target = ka)))
 }

 function Yo(t, n) {
  var o = {};
  return o[t.toLowerCase()] = n.toLowerCase(), o["Webkit" + t] = "webkit" + n, o["Moz" + t] = "moz" + n, o
 }
 var za = {
   animationend: Yo("Animation", "AnimationEnd"),
   animationiteration: Yo("Animation", "AnimationIteration"),
   animationstart: Yo("Animation", "AnimationStart"),
   transitionrun: Yo("Transition", "TransitionRun"),
   transitionstart: Yo("Transition", "TransitionStart"),
   transitioncancel: Yo("Transition", "TransitionCancel"),
   transitionend: Yo("Transition", "TransitionEnd")
  },
  Ed = {},
  Im = {};
 Wr && (Im = document.createElement("div").style, "AnimationEvent" in window || (delete za.animationend.animation, delete za.animationiteration.animation, delete za.animationstart.animation), "TransitionEvent" in window || delete za.transitionend.transition);

 function Xo(t) {
  if (Ed[t]) return Ed[t];
  if (!za[t]) return t;
  var n = za[t],
   o;
  for (o in n)
   if (n.hasOwnProperty(o) && o in Im) return Ed[t] = n[o];
  return t
 }
 var Pm = Xo("animationend"),
  Hm = Xo("animationiteration"),
  qm = Xo("animationstart"),
  BS = Xo("transitionrun"),
  $S = Xo("transitionstart"),
  _S = Xo("transitioncancel"),
  Vm = Xo("transitionend"),
  Gm = new Map,
  Td = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
 Td.push("scrollEnd");

 function Cr(t, n) {
  Gm.set(t, n), Vo(n, [t])
 }
 var Ym = new WeakMap;

 function or(t, n) {
  if (typeof t == "object" && t !== null) {
   var o = Ym.get(t);
   return o !== void 0 ? o : (n = {
    value: t,
    source: n,
    stack: sm(n)
   }, Ym.set(t, n), n)
  }
  return {
   value: t,
   source: n,
   stack: sm(n)
  }
 }
 var ar = [],
  ja = 0,
  Ad = 0;

 function Vs() {
  for (var t = ja, n = Ad = ja = 0; n < t;) {
   var o = ar[n];
   ar[n++] = null;
   var l = ar[n];
   ar[n++] = null;
   var u = ar[n];
   ar[n++] = null;
   var p = ar[n];
   if (ar[n++] = null, l !== null && u !== null) {
    var x = l.pending;
    x === null ? u.next = u : (u.next = x.next, x.next = u), l.pending = u
   }
   p !== 0 && Xm(o, u, p)
  }
 }

 function Gs(t, n, o, l) {
  ar[ja++] = t, ar[ja++] = n, ar[ja++] = o, ar[ja++] = l, Ad |= l, t.lanes |= l, t = t.alternate, t !== null && (t.lanes |= l)
 }

 function Md(t, n, o, l) {
  return Gs(t, n, o, l), Ys(t)
 }

 function Na(t, n) {
  return Gs(t, null, null, n), Ys(t)
 }

 function Xm(t, n, o) {
  t.lanes |= o;
  var l = t.alternate;
  l !== null && (l.lanes |= o);
  for (var u = !1, p = t.return; p !== null;) p.childLanes |= o, l = p.alternate, l !== null && (l.childLanes |= o), p.tag === 22 && (t = p.stateNode, t === null || t._visibility & 1 || (u = !0)), t = p, p = p.return;
  return t.tag === 3 ? (p = t.stateNode, u && n !== null && (u = 31 - be(o), t = p.hiddenUpdates, l = t[u], l === null ? t[u] = [n] : l.push(n), n.lane = o | 536870912), p) : null
 }

 function Ys(t) {
  if (50 < Sl) throw Sl = 0, Lf = null, Error(i(185));
  for (var n = t.return; n !== null;) t = n, n = t.return;
  return t.tag === 3 ? t.stateNode : null
 }
 var La = {};

 function US(t, n, o, l) {
  this.tag = t, this.key = o, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = n, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null
 }

 function Vn(t, n, o, l) {
  return new US(t, n, o, l)
 }

 function Od(t) {
  return t = t.prototype, !(!t || !t.isReactComponent)
 }

 function Fr(t, n) {
  var o = t.alternate;
  return o === null ? (o = Vn(t.tag, n, t.key, t.mode), o.elementType = t.elementType, o.type = t.type, o.stateNode = t.stateNode, o.alternate = t, t.alternate = o) : (o.pendingProps = n, o.type = t.type, o.flags = 0, o.subtreeFlags = 0, o.deletions = null), o.flags = t.flags & 65011712, o.childLanes = t.childLanes, o.lanes = t.lanes, o.child = t.child, o.memoizedProps = t.memoizedProps, o.memoizedState = t.memoizedState, o.updateQueue = t.updateQueue, n = t.dependencies, o.dependencies = n === null ? null : {
   lanes: n.lanes,
   firstContext: n.firstContext
  }, o.sibling = t.sibling, o.index = t.index, o.ref = t.ref, o.refCleanup = t.refCleanup, o
 }

 function Wm(t, n) {
  t.flags &= 65011714;
  var o = t.alternate;
  return o === null ? (t.childLanes = 0, t.lanes = n, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = o.childLanes, t.lanes = o.lanes, t.child = o.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = o.memoizedProps, t.memoizedState = o.memoizedState, t.updateQueue = o.updateQueue, t.type = o.type, n = o.dependencies, t.dependencies = n === null ? null : {
   lanes: n.lanes,
   firstContext: n.firstContext
  }), t
 }

 function Xs(t, n, o, l, u, p) {
  var x = 0;
  if (l = t, typeof t == "function") Od(t) && (x = 1);
  else if (typeof t == "string") x = P2(t, o, ce.current) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
  else e: switch (t) {
   case G:
    return t = Vn(31, o, n, u), t.elementType = G, t.lanes = p, t;
   case T:
    return Wo(o.children, u, p, n);
   case C:
    x = 8, u |= 24;
    break;
   case D:
    return t = Vn(12, o, n, u | 2), t.elementType = D, t.lanes = p, t;
   case O:
    return t = Vn(13, o, n, u), t.elementType = O, t.lanes = p, t;
   case L:
    return t = Vn(19, o, n, u), t.elementType = L, t.lanes = p, t;
   default:
    if (typeof t == "object" && t !== null) switch (t.$$typeof) {
     case k:
     case E:
      x = 10;
      break e;
     case N:
      x = 9;
      break e;
     case A:
      x = 11;
      break e;
     case U:
      x = 14;
      break e;
     case _:
      x = 16, l = null;
      break e
    }
    x = 29, o = Error(i(130, t === null ? "null" : typeof t, "")), l = null
  }
  return n = Vn(x, o, n, u), n.elementType = t, n.type = l, n.lanes = p, n
 }

 function Wo(t, n, o, l) {
  return t = Vn(7, t, l, n), t.lanes = o, t
 }

 function Dd(t, n, o) {
  return t = Vn(6, t, null, n), t.lanes = o, t
 }

 function kd(t, n, o) {
  return n = Vn(4, t.children !== null ? t.children : [], t.key, n), n.lanes = o, n.stateNode = {
   containerInfo: t.containerInfo,
   pendingChildren: null,
   implementation: t.implementation
  }, n
 }
 var Ba = [],
  $a = 0,
  Ws = null,
  Fs = 0,
  ir = [],
  lr = 0,
  Fo = null,
  Kr = 1,
  Qr = "";

 function Ko(t, n) {
  Ba[$a++] = Fs, Ba[$a++] = Ws, Ws = t, Fs = n
 }

 function Fm(t, n, o) {
  ir[lr++] = Kr, ir[lr++] = Qr, ir[lr++] = Fo, Fo = t;
  var l = Kr;
  t = Qr;
  var u = 32 - be(l) - 1;
  l &= ~(1 << u), o += 1;
  var p = 32 - be(n) + u;
  if (30 < p) {
   var x = u - u % 5;
   p = (l & (1 << x) - 1).toString(32), l >>= x, u -= x, Kr = 1 << 32 - be(n) + u | o << u | l, Qr = p + t
  } else Kr = 1 << p | o << u | l, Qr = t
 }

 function zd(t) {
  t.return !== null && (Ko(t, 1), Fm(t, 1, 0))
 }

 function jd(t) {
  for (; t === Ws;) Ws = Ba[--$a], Ba[$a] = null, Fs = Ba[--$a], Ba[$a] = null;
  for (; t === Fo;) Fo = ir[--lr], ir[lr] = null, Qr = ir[--lr], ir[lr] = null, Kr = ir[--lr], ir[lr] = null
 }
 var Dn = null,
  Yt = null,
  bt = !1,
  Qo = null,
  Or = !1,
  Nd = Error(i(519));

 function Zo(t) {
  var n = Error(i(418, ""));
  throw Ji(or(n, t)), Nd
 }

 function Km(t) {
  var n = t.stateNode,
   o = t.type,
   l = t.memoizedProps;
  switch (n[zt] = t, n[jt] = l, o) {
   case "dialog":
    ut("cancel", n), ut("close", n);
    break;
   case "iframe":
   case "object":
   case "embed":
    ut("load", n);
    break;
   case "video":
   case "audio":
    for (o = 0; o < wl.length; o++) ut(wl[o], n);
    break;
   case "source":
    ut("error", n);
    break;
   case "img":
   case "image":
   case "link":
    ut("error", n), ut("load", n);
    break;
   case "details":
    ut("toggle", n);
    break;
   case "input":
    ut("invalid", n), dm(n, l.value, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name, !0), Ls(n);
    break;
   case "select":
    ut("invalid", n);
    break;
   case "textarea":
    ut("invalid", n), pm(n, l.value, l.defaultValue, l.children), Ls(n)
  }
  o = l.children, typeof o != "string" && typeof o != "number" && typeof o != "bigint" || n.textContent === "" + o || l.suppressHydrationWarning === !0 || py(n.textContent, o) ? (l.popover != null && (ut("beforetoggle", n), ut("toggle", n)), l.onScroll != null && ut("scroll", n), l.onScrollEnd != null && ut("scrollend", n), l.onClick != null && (n.onclick = Oc), n = !0) : n = !1, n || Zo(t)
 }

 function Qm(t) {
  for (Dn = t.return; Dn;) switch (Dn.tag) {
   case 5:
   case 13:
    Or = !1;
    return;
   case 27:
   case 3:
    Or = !0;
    return;
   default:
    Dn = Dn.return
  }
 }

 function Qi(t) {
  if (t !== Dn) return !1;
  if (!bt) return Qm(t), bt = !0, !1;
  var n = t.tag,
   o;
  if ((o = n !== 3 && n !== 27) && ((o = n === 5) && (o = t.type, o = !(o !== "form" && o !== "button") || Qf(t.type, t.memoizedProps)), o = !o), o && Yt && Zo(t), Qm(t), n === 13) {
   if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(i(317));
   e: {
    for (t = t.nextSibling, n = 0; t;) {
     if (t.nodeType === 8)
      if (o = t.data, o === "/$") {
       if (n === 0) {
        Yt = Rr(t.nextSibling);
        break e
       }
       n--
      } else o !== "$" && o !== "$!" && o !== "$?" || n++;
     t = t.nextSibling
    }
    Yt = null
   }
  } else n === 27 ? (n = Yt, ko(t.type) ? (t = tp, tp = null, Yt = t) : Yt = n) : Yt = Dn ? Rr(t.stateNode.nextSibling) : null;
  return !0
 }

 function Zi() {
  Yt = Dn = null, bt = !1
 }

 function Zm() {
  var t = Qo;
  return t !== null && (_n === null ? _n = t : _n.push.apply(_n, t), Qo = null), t
 }

 function Ji(t) {
  Qo === null ? Qo = [t] : Qo.push(t)
 }
 var Ld = q(null),
  Jo = null,
  Zr = null;

 function go(t, n, o) {
  ne(Ld, n._currentValue), n._currentValue = o
 }

 function Jr(t) {
  t._currentValue = Ld.current, ee(Ld)
 }

 function Bd(t, n, o) {
  for (; t !== null;) {
   var l = t.alternate;
   if ((t.childLanes & n) !== n ? (t.childLanes |= n, l !== null && (l.childLanes |= n)) : l !== null && (l.childLanes & n) !== n && (l.childLanes |= n), t === o) break;
   t = t.return
  }
 }

 function $d(t, n, o, l) {
  var u = t.child;
  for (u !== null && (u.return = t); u !== null;) {
   var p = u.dependencies;
   if (p !== null) {
    var x = u.child;
    p = p.firstContext;
    e: for (; p !== null;) {
     var M = p;
     p = u;
     for (var B = 0; B < n.length; B++)
      if (M.context === n[B]) {
       p.lanes |= o, M = p.alternate, M !== null && (M.lanes |= o), Bd(p.return, o, t), l || (x = null);
       break e
      } p = M.next
    }
   } else if (u.tag === 18) {
    if (x = u.return, x === null) throw Error(i(341));
    x.lanes |= o, p = x.alternate, p !== null && (p.lanes |= o), Bd(x, o, t), x = null
   } else x = u.child;
   if (x !== null) x.return = u;
   else
    for (x = u; x !== null;) {
     if (x === t) {
      x = null;
      break
     }
     if (u = x.sibling, u !== null) {
      u.return = x.return, x = u;
      break
     }
     x = x.return
    }
   u = x
  }
 }

 function el(t, n, o, l) {
  t = null;
  for (var u = n, p = !1; u !== null;) {
   if (!p) {
    if ((u.flags & 524288) !== 0) p = !0;
    else if ((u.flags & 262144) !== 0) break
   }
   if (u.tag === 10) {
    var x = u.alternate;
    if (x === null) throw Error(i(387));
    if (x = x.memoizedProps, x !== null) {
     var M = u.type;
     qn(u.pendingProps.value, x.value) || (t !== null ? t.push(M) : t = [M])
    }
   } else if (u === ye.current) {
    if (x = u.alternate, x === null) throw Error(i(387));
    x.memoizedState.memoizedState !== u.memoizedState.memoizedState && (t !== null ? t.push(Ol) : t = [Ol])
   }
   u = u.return
  }
  t !== null && $d(n, t, o, l), n.flags |= 262144
 }

 function Ks(t) {
  for (t = t.firstContext; t !== null;) {
   if (!qn(t.context._currentValue, t.memoizedValue)) return !0;
   t = t.next
  }
  return !1
 }

 function ea(t) {
  Jo = t, Zr = null, t = t.dependencies, t !== null && (t.firstContext = null)
 }

 function Tn(t) {
  return Jm(Jo, t)
 }

 function Qs(t, n) {
  return Jo === null && ea(t), Jm(t, n)
 }

 function Jm(t, n) {
  var o = n._currentValue;
  if (n = {
    context: n,
    memoizedValue: o,
    next: null
   }, Zr === null) {
   if (t === null) throw Error(i(308));
   Zr = n, t.dependencies = {
    lanes: 0,
    firstContext: n
   }, t.flags |= 524288
  } else Zr = Zr.next = n;
  return o
 }
 var IS = typeof AbortController < "u" ? AbortController : function() {
   var t = [],
    n = this.signal = {
     aborted: !1,
     addEventListener: function(o, l) {
      t.push(l)
     }
    };
   this.abort = function() {
    n.aborted = !0, t.forEach(function(o) {
     return o()
    })
   }
  },
  PS = e.unstable_scheduleCallback,
  HS = e.unstable_NormalPriority,
  cn = {
   $$typeof: E,
   Consumer: null,
   Provider: null,
   _currentValue: null,
   _currentValue2: null,
   _threadCount: 0
  };

 function _d() {
  return {
   controller: new IS,
   data: new Map,
   refCount: 0
  }
 }

 function tl(t) {
  t.refCount--, t.refCount === 0 && PS(HS, function() {
   t.controller.abort()
  })
 }
 var nl = null,
  Ud = 0,
  _a = 0,
  Ua = null;

 function qS(t, n) {
  if (nl === null) {
   var o = nl = [];
   Ud = 0, _a = Hf(), Ua = {
    status: "pending",
    value: void 0,
    then: function(l) {
     o.push(l)
    }
   }
  }
  return Ud++, n.then(eg, eg), n
 }

 function eg() {
  if (--Ud === 0 && nl !== null) {
   Ua !== null && (Ua.status = "fulfilled");
   var t = nl;
   nl = null, _a = 0, Ua = null;
   for (var n = 0; n < t.length; n++)(0, t[n])()
  }
 }

 function VS(t, n) {
  var o = [],
   l = {
    status: "pending",
    value: null,
    reason: null,
    then: function(u) {
     o.push(u)
    }
   };
  return t.then(function() {
   l.status = "fulfilled", l.value = n;
   for (var u = 0; u < o.length; u++)(0, o[u])(n)
  }, function(u) {
   for (l.status = "rejected", l.reason = u, u = 0; u < o.length; u++)(0, o[u])(void 0)
  }), l
 }
 var tg = z.S;
 z.S = function(t, n) {
  typeof n == "object" && n !== null && typeof n.then == "function" && qS(t, n), tg !== null && tg(t, n)
 };
 var ta = q(null);

 function Id() {
  var t = ta.current;
  return t !== null ? t : $t.pooledCache
 }

 function Zs(t, n) {
  n === null ? ne(ta, ta.current) : ne(ta, n.pool)
 }

 function ng() {
  var t = Id();
  return t === null ? null : {
   parent: cn._currentValue,
   pool: t
  }
 }
 var rl = Error(i(460)),
  rg = Error(i(474)),
  Js = Error(i(542)),
  Pd = {
   then: function() {}
  };

 function og(t) {
  return t = t.status, t === "fulfilled" || t === "rejected"
 }

 function ec() {}

 function ag(t, n, o) {
  switch (o = t[o], o === void 0 ? t.push(n) : o !== n && (n.then(ec, ec), n = o), n.status) {
   case "fulfilled":
    return n.value;
   case "rejected":
    throw t = n.reason, lg(t), t;
   default:
    if (typeof n.status == "string") n.then(ec, ec);
    else {
     if (t = $t, t !== null && 100 < t.shellSuspendCounter) throw Error(i(482));
     t = n, t.status = "pending", t.then(function(l) {
      if (n.status === "pending") {
       var u = n;
       u.status = "fulfilled", u.value = l
      }
     }, function(l) {
      if (n.status === "pending") {
       var u = n;
       u.status = "rejected", u.reason = l
      }
     })
    }
    switch (n.status) {
     case "fulfilled":
      return n.value;
     case "rejected":
      throw t = n.reason, lg(t), t
    }
    throw ol = n, rl
  }
 }
 var ol = null;

 function ig() {
  if (ol === null) throw Error(i(459));
  var t = ol;
  return ol = null, t
 }

 function lg(t) {
  if (t === rl || t === Js) throw Error(i(483))
 }
 var vo = !1;

 function Hd(t) {
  t.updateQueue = {
   baseState: t.memoizedState,
   firstBaseUpdate: null,
   lastBaseUpdate: null,
   shared: {
    pending: null,
    lanes: 0,
    hiddenCallbacks: null
   },
   callbacks: null
  }
 }

 function qd(t, n) {
  t = t.updateQueue, n.updateQueue === t && (n.updateQueue = {
   baseState: t.baseState,
   firstBaseUpdate: t.firstBaseUpdate,
   lastBaseUpdate: t.lastBaseUpdate,
   shared: t.shared,
   callbacks: null
  })
 }

 function yo(t) {
  return {
   lane: t,
   tag: 0,
   payload: null,
   callback: null,
   next: null
  }
 }

 function bo(t, n, o) {
  var l = t.updateQueue;
  if (l === null) return null;
  if (l = l.shared, (Rt & 2) !== 0) {
   var u = l.pending;
   return u === null ? n.next = n : (n.next = u.next, u.next = n), l.pending = n, n = Ys(t), Xm(t, null, o), n
  }
  return Gs(t, l, n, o), Ys(t)
 }

 function al(t, n, o) {
  if (n = n.updateQueue, n !== null && (n = n.shared, (o & 4194048) !== 0)) {
   var l = n.lanes;
   l &= t.pendingLanes, o |= l, n.lanes = o, Vt(t, o)
  }
 }

 function Vd(t, n) {
  var o = t.updateQueue,
   l = t.alternate;
  if (l !== null && (l = l.updateQueue, o === l)) {
   var u = null,
    p = null;
   if (o = o.firstBaseUpdate, o !== null) {
    do {
     var x = {
      lane: o.lane,
      tag: o.tag,
      payload: o.payload,
      callback: null,
      next: null
     };
     p === null ? u = p = x : p = p.next = x, o = o.next
    } while (o !== null);
    p === null ? u = p = n : p = p.next = n
   } else u = p = n;
   o = {
    baseState: l.baseState,
    firstBaseUpdate: u,
    lastBaseUpdate: p,
    shared: l.shared,
    callbacks: l.callbacks
   }, t.updateQueue = o;
   return
  }
  t = o.lastBaseUpdate, t === null ? o.firstBaseUpdate = n : t.next = n, o.lastBaseUpdate = n
 }
 var Gd = !1;

 function il() {
  if (Gd) {
   var t = Ua;
   if (t !== null) throw t
  }
 }

 function ll(t, n, o, l) {
  Gd = !1;
  var u = t.updateQueue;
  vo = !1;
  var p = u.firstBaseUpdate,
   x = u.lastBaseUpdate,
   M = u.shared.pending;
  if (M !== null) {
   u.shared.pending = null;
   var B = M,
    K = B.next;
   B.next = null, x === null ? p = K : x.next = K, x = B;
   var ie = t.alternate;
   ie !== null && (ie = ie.updateQueue, M = ie.lastBaseUpdate, M !== x && (M === null ? ie.firstBaseUpdate = K : M.next = K, ie.lastBaseUpdate = B))
  }
  if (p !== null) {
   var ue = u.baseState;
   x = 0, ie = K = B = null, M = p;
   do {
    var J = M.lane & -536870913,
     te = J !== M.lane;
    if (te ? (ht & J) === J : (l & J) === J) {
     J !== 0 && J === _a && (Gd = !0), ie !== null && (ie = ie.next = {
      lane: 0,
      tag: M.tag,
      payload: M.payload,
      callback: null,
      next: null
     });
     e: {
      var We = t,
       _e = M;J = n;
      var Ot = o;
      switch (_e.tag) {
       case 1:
        if (We = _e.payload, typeof We == "function") {
         ue = We.call(Ot, ue, J);
         break e
        }
        ue = We;
        break e;
       case 3:
        We.flags = We.flags & -65537 | 128;
       case 0:
        if (We = _e.payload, J = typeof We == "function" ? We.call(Ot, ue, J) : We, J == null) break e;
        ue = g({}, ue, J);
        break e;
       case 2:
        vo = !0
      }
     }
     J = M.callback, J !== null && (t.flags |= 64, te && (t.flags |= 8192), te = u.callbacks, te === null ? u.callbacks = [J] : te.push(J))
    } else te = {
     lane: J,
     tag: M.tag,
     payload: M.payload,
     callback: M.callback,
     next: null
    }, ie === null ? (K = ie = te, B = ue) : ie = ie.next = te, x |= J;
    if (M = M.next, M === null) {
     if (M = u.shared.pending, M === null) break;
     te = M, M = te.next, te.next = null, u.lastBaseUpdate = te, u.shared.pending = null
    }
   } while (!0);
   ie === null && (B = ue), u.baseState = B, u.firstBaseUpdate = K, u.lastBaseUpdate = ie, p === null && (u.shared.lanes = 0), Ao |= x, t.lanes = x, t.memoizedState = ue
  }
 }

 function sg(t, n) {
  if (typeof t != "function") throw Error(i(191, t));
  t.call(n)
 }

 function cg(t, n) {
  var o = t.callbacks;
  if (o !== null)
   for (t.callbacks = null, t = 0; t < o.length; t++) sg(o[t], n)
 }
 var Ia = q(null),
  tc = q(0);

 function ug(t, n) {
  t = io, ne(tc, t), ne(Ia, n), io = t | n.baseLanes
 }

 function Yd() {
  ne(tc, io), ne(Ia, Ia.current)
 }

 function Xd() {
  io = tc.current, ee(Ia), ee(tc)
 }
 var xo = 0,
  rt = null,
  At = null,
  on = null,
  nc = !1,
  Pa = !1,
  na = !1,
  rc = 0,
  sl = 0,
  Ha = null,
  GS = 0;

 function Jt() {
  throw Error(i(321))
 }

 function Wd(t, n) {
  if (n === null) return !1;
  for (var o = 0; o < n.length && o < t.length; o++)
   if (!qn(t[o], n[o])) return !1;
  return !0
 }

 function Fd(t, n, o, l, u, p) {
  return xo = p, rt = n, n.memoizedState = null, n.updateQueue = null, n.lanes = 0, z.H = t === null || t.memoizedState === null ? Xg : Wg, na = !1, p = o(l, u), na = !1, Pa && (p = fg(n, o, l, u)), dg(t), p
 }

 function dg(t) {
  z.H = cc;
  var n = At !== null && At.next !== null;
  if (xo = 0, on = At = rt = null, nc = !1, sl = 0, Ha = null, n) throw Error(i(300));
  t === null || hn || (t = t.dependencies, t !== null && Ks(t) && (hn = !0))
 }

 function fg(t, n, o, l) {
  rt = t;
  var u = 0;
  do {
   if (Pa && (Ha = null), sl = 0, Pa = !1, 25 <= u) throw Error(i(301));
   if (u += 1, on = At = null, t.updateQueue != null) {
    var p = t.updateQueue;
    p.lastEffect = null, p.events = null, p.stores = null, p.memoCache != null && (p.memoCache.index = 0)
   }
   z.H = ZS, p = n(o, l)
  } while (Pa);
  return p
 }

 function YS() {
  var t = z.H,
   n = t.useState()[0];
  return n = typeof n.then == "function" ? cl(n) : n, t = t.useState()[0], (At !== null ? At.memoizedState : null) !== t && (rt.flags |= 1024), n
 }

 function Kd() {
  var t = rc !== 0;
  return rc = 0, t
 }

 function Qd(t, n, o) {
  n.updateQueue = t.updateQueue, n.flags &= -2053, t.lanes &= ~o
 }

 function Zd(t) {
  if (nc) {
   for (t = t.memoizedState; t !== null;) {
    var n = t.queue;
    n !== null && (n.pending = null), t = t.next
   }
   nc = !1
  }
  xo = 0, on = At = rt = null, Pa = !1, sl = rc = 0, Ha = null
 }

 function Bn() {
  var t = {
   memoizedState: null,
   baseState: null,
   baseQueue: null,
   queue: null,
   next: null
  };
  return on === null ? rt.memoizedState = on = t : on = on.next = t, on
 }

 function an() {
  if (At === null) {
   var t = rt.alternate;
   t = t !== null ? t.memoizedState : null
  } else t = At.next;
  var n = on === null ? rt.memoizedState : on.next;
  if (n !== null) on = n, At = t;
  else {
   if (t === null) throw rt.alternate === null ? Error(i(467)) : Error(i(310));
   At = t, t = {
    memoizedState: At.memoizedState,
    baseState: At.baseState,
    baseQueue: At.baseQueue,
    queue: At.queue,
    next: null
   }, on === null ? rt.memoizedState = on = t : on = on.next = t
  }
  return on
 }

 function Jd() {
  return {
   lastEffect: null,
   events: null,
   stores: null,
   memoCache: null
  }
 }

 function cl(t) {
  var n = sl;
  return sl += 1, Ha === null && (Ha = []), t = ag(Ha, t, n), n = rt, (on === null ? n.memoizedState : on.next) === null && (n = n.alternate, z.H = n === null || n.memoizedState === null ? Xg : Wg), t
 }

 function oc(t) {
  if (t !== null && typeof t == "object") {
   if (typeof t.then == "function") return cl(t);
   if (t.$$typeof === E) return Tn(t)
  }
  throw Error(i(438, String(t)))
 }

 function ef(t) {
  var n = null,
   o = rt.updateQueue;
  if (o !== null && (n = o.memoCache), n == null) {
   var l = rt.alternate;
   l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (n = {
    data: l.data.map(function(u) {
     return u.slice()
    }),
    index: 0
   })))
  }
  if (n == null && (n = {
    data: [],
    index: 0
   }), o === null && (o = Jd(), rt.updateQueue = o), o.memoCache = n, o = n.data[n.index], o === void 0)
   for (o = n.data[n.index] = Array(t), l = 0; l < t; l++) o[l] = S;
  return n.index++, o
 }

 function eo(t, n) {
  return typeof n == "function" ? n(t) : n
 }

 function ac(t) {
  var n = an();
  return tf(n, At, t)
 }

 function tf(t, n, o) {
  var l = t.queue;
  if (l === null) throw Error(i(311));
  l.lastRenderedReducer = o;
  var u = t.baseQueue,
   p = l.pending;
  if (p !== null) {
   if (u !== null) {
    var x = u.next;
    u.next = p.next, p.next = x
   }
   n.baseQueue = u = p, l.pending = null
  }
  if (p = t.baseState, u === null) t.memoizedState = p;
  else {
   n = u.next;
   var M = x = null,
    B = null,
    K = n,
    ie = !1;
   do {
    var ue = K.lane & -536870913;
    if (ue !== K.lane ? (ht & ue) === ue : (xo & ue) === ue) {
     var J = K.revertLane;
     if (J === 0) B !== null && (B = B.next = {
      lane: 0,
      revertLane: 0,
      action: K.action,
      hasEagerState: K.hasEagerState,
      eagerState: K.eagerState,
      next: null
     }), ue === _a && (ie = !0);
     else if ((xo & J) === J) {
      K = K.next, J === _a && (ie = !0);
      continue
     } else ue = {
      lane: 0,
      revertLane: K.revertLane,
      action: K.action,
      hasEagerState: K.hasEagerState,
      eagerState: K.eagerState,
      next: null
     }, B === null ? (M = B = ue, x = p) : B = B.next = ue, rt.lanes |= J, Ao |= J;
     ue = K.action, na && o(p, ue), p = K.hasEagerState ? K.eagerState : o(p, ue)
    } else J = {
     lane: ue,
     revertLane: K.revertLane,
     action: K.action,
     hasEagerState: K.hasEagerState,
     eagerState: K.eagerState,
     next: null
    }, B === null ? (M = B = J, x = p) : B = B.next = J, rt.lanes |= ue, Ao |= ue;
    K = K.next
   } while (K !== null && K !== n);
   if (B === null ? x = p : B.next = M, !qn(p, t.memoizedState) && (hn = !0, ie && (o = Ua, o !== null))) throw o;
   t.memoizedState = p, t.baseState = x, t.baseQueue = B, l.lastRenderedState = p
  }
  return u === null && (l.lanes = 0), [t.memoizedState, l.dispatch]
 }

 function nf(t) {
  var n = an(),
   o = n.queue;
  if (o === null) throw Error(i(311));
  o.lastRenderedReducer = t;
  var l = o.dispatch,
   u = o.pending,
   p = n.memoizedState;
  if (u !== null) {
   o.pending = null;
   var x = u = u.next;
   do p = t(p, x.action), x = x.next; while (x !== u);
   qn(p, n.memoizedState) || (hn = !0), n.memoizedState = p, n.baseQueue === null && (n.baseState = p), o.lastRenderedState = p
  }
  return [p, l]
 }

 function pg(t, n, o) {
  var l = rt,
   u = an(),
   p = bt;
  if (p) {
   if (o === void 0) throw Error(i(407));
   o = o()
  } else o = n();
  var x = !qn((At || u).memoizedState, o);
  x && (u.memoizedState = o, hn = !0), u = u.queue;
  var M = gg.bind(null, l, u, t);
  if (ul(2048, 8, M, [t]), u.getSnapshot !== n || x || on !== null && on.memoizedState.tag & 1) {
   if (l.flags |= 2048, qa(9, ic(), mg.bind(null, l, u, o, n), null), $t === null) throw Error(i(349));
   p || (xo & 124) !== 0 || hg(l, n, o)
  }
  return o
 }

 function hg(t, n, o) {
  t.flags |= 16384, t = {
   getSnapshot: n,
   value: o
  }, n = rt.updateQueue, n === null ? (n = Jd(), rt.updateQueue = n, n.stores = [t]) : (o = n.stores, o === null ? n.stores = [t] : o.push(t))
 }

 function mg(t, n, o, l) {
  n.value = o, n.getSnapshot = l, vg(n) && yg(t)
 }

 function gg(t, n, o) {
  return o(function() {
   vg(n) && yg(t)
  })
 }

 function vg(t) {
  var n = t.getSnapshot;
  t = t.value;
  try {
   var o = n();
   return !qn(t, o)
  } catch {
   return !0
  }
 }

 function yg(t) {
  var n = Na(t, 2);
  n !== null && Fn(n, t, 2)
 }

 function rf(t) {
  var n = Bn();
  if (typeof t == "function") {
   var o = t;
   if (t = o(), na) {
    De(!0);
    try {
     o()
    } finally {
     De(!1)
    }
   }
  }
  return n.memoizedState = n.baseState = t, n.queue = {
   pending: null,
   lanes: 0,
   dispatch: null,
   lastRenderedReducer: eo,
   lastRenderedState: t
  }, n
 }

 function bg(t, n, o, l) {
  return t.baseState = o, tf(t, At, typeof l == "function" ? l : eo)
 }

 function XS(t, n, o, l, u) {
  if (sc(t)) throw Error(i(485));
  if (t = n.action, t !== null) {
   var p = {
    payload: u,
    action: t,
    next: null,
    isTransition: !0,
    status: "pending",
    value: null,
    reason: null,
    listeners: [],
    then: function(x) {
     p.listeners.push(x)
    }
   };
   z.T !== null ? o(!0) : p.isTransition = !1, l(p), o = n.pending, o === null ? (p.next = n.pending = p, xg(n, p)) : (p.next = o.next, n.pending = o.next = p)
  }
 }

 function xg(t, n) {
  var o = n.action,
   l = n.payload,
   u = t.state;
  if (n.isTransition) {
   var p = z.T,
    x = {};
   z.T = x;
   try {
    var M = o(u, l),
     B = z.S;
    B !== null && B(x, M), Sg(t, n, M)
   } catch (K) {
    of(t, n, K)
   } finally {
    z.T = p
   }
  } else try {
   p = o(u, l), Sg(t, n, p)
  } catch (K) {
   of(t, n, K)
  }
 }

 function Sg(t, n, o) {
  o !== null && typeof o == "object" && typeof o.then == "function" ? o.then(function(l) {
   Cg(t, n, l)
  }, function(l) {
   return of(t, n, l)
  }) : Cg(t, n, o)
 }

 function Cg(t, n, o) {
  n.status = "fulfilled", n.value = o, wg(n), t.state = o, n = t.pending, n !== null && (o = n.next, o === n ? t.pending = null : (o = o.next, n.next = o, xg(t, o)))
 }

 function of(t, n, o) {
  var l = t.pending;
  if (t.pending = null, l !== null) {
   l = l.next;
   do n.status = "rejected", n.reason = o, wg(n), n = n.next; while (n !== l)
  }
  t.action = null
 }

 function wg(t) {
  t = t.listeners;
  for (var n = 0; n < t.length; n++)(0, t[n])()
 }

 function Rg(t, n) {
  return n
 }

 function Eg(t, n) {
  if (bt) {
   var o = $t.formState;
   if (o !== null) {
    e: {
     var l = rt;
     if (bt) {
      if (Yt) {
       t: {
        for (var u = Yt, p = Or; u.nodeType !== 8;) {
         if (!p) {
          u = null;
          break t
         }
         if (u = Rr(u.nextSibling), u === null) {
          u = null;
          break t
         }
        }
        p = u.data,
        u = p === "F!" || p === "F" ? u : null
       }
       if (u) {
        Yt = Rr(u.nextSibling), l = u.data === "F!";
        break e
       }
      }
      Zo(l)
     }
     l = !1
    }
    l && (n = o[0])
   }
  }
  return o = Bn(), o.memoizedState = o.baseState = n, l = {
   pending: null,
   lanes: 0,
   dispatch: null,
   lastRenderedReducer: Rg,
   lastRenderedState: n
  }, o.queue = l, o = Vg.bind(null, rt, l), l.dispatch = o, l = rf(!1), p = uf.bind(null, rt, !1, l.queue), l = Bn(), u = {
   state: n,
   dispatch: null,
   action: t,
   pending: null
  }, l.queue = u, o = XS.bind(null, rt, u, p, o), u.dispatch = o, l.memoizedState = t, [n, o, !1]
 }

 function Tg(t) {
  var n = an();
  return Ag(n, At, t)
 }

 function Ag(t, n, o) {
  if (n = tf(t, n, Rg)[0], t = ac(eo)[0], typeof n == "object" && n !== null && typeof n.then == "function") try {
   var l = cl(n)
  } catch (x) {
   throw x === rl ? Js : x
  } else l = n;
  n = an();
  var u = n.queue,
   p = u.dispatch;
  return o !== n.memoizedState && (rt.flags |= 2048, qa(9, ic(), WS.bind(null, u, o), null)), [l, p, t]
 }

 function WS(t, n) {
  t.action = n
 }

 function Mg(t) {
  var n = an(),
   o = At;
  if (o !== null) return Ag(n, o, t);
  an(), n = n.memoizedState, o = an();
  var l = o.queue.dispatch;
  return o.memoizedState = t, [n, l, !1]
 }

 function qa(t, n, o, l) {
  return t = {
   tag: t,
   create: o,
   deps: l,
   inst: n,
   next: null
  }, n = rt.updateQueue, n === null && (n = Jd(), rt.updateQueue = n), o = n.lastEffect, o === null ? n.lastEffect = t.next = t : (l = o.next, o.next = t, t.next = l, n.lastEffect = t), t
 }

 function ic() {
  return {
   destroy: void 0,
   resource: void 0
  }
 }

 function Og() {
  return an().memoizedState
 }

 function lc(t, n, o, l) {
  var u = Bn();
  l = l === void 0 ? null : l, rt.flags |= t, u.memoizedState = qa(1 | n, ic(), o, l)
 }

 function ul(t, n, o, l) {
  var u = an();
  l = l === void 0 ? null : l;
  var p = u.memoizedState.inst;
  At !== null && l !== null && Wd(l, At.memoizedState.deps) ? u.memoizedState = qa(n, p, o, l) : (rt.flags |= t, u.memoizedState = qa(1 | n, p, o, l))
 }

 function Dg(t, n) {
  lc(8390656, 8, t, n)
 }

 function kg(t, n) {
  ul(2048, 8, t, n)
 }

 function zg(t, n) {
  return ul(4, 2, t, n)
 }

 function jg(t, n) {
  return ul(4, 4, t, n)
 }

 function Ng(t, n) {
  if (typeof n == "function") {
   t = t();
   var o = n(t);
   return function() {
    typeof o == "function" ? o() : n(null)
   }
  }
  if (n != null) return t = t(), n.current = t,
   function() {
    n.current = null
   }
 }

 function Lg(t, n, o) {
  o = o != null ? o.concat([t]) : null, ul(4, 4, Ng.bind(null, n, t), o)
 }

 function af() {}

 function Bg(t, n) {
  var o = an();
  n = n === void 0 ? null : n;
  var l = o.memoizedState;
  return n !== null && Wd(n, l[1]) ? l[0] : (o.memoizedState = [t, n], t)
 }

 function $g(t, n) {
  var o = an();
  n = n === void 0 ? null : n;
  var l = o.memoizedState;
  if (n !== null && Wd(n, l[1])) return l[0];
  if (l = t(), na) {
   De(!0);
   try {
    t()
   } finally {
    De(!1)
   }
  }
  return o.memoizedState = [l, n], l
 }

 function lf(t, n, o) {
  return o === void 0 || (xo & 1073741824) !== 0 ? t.memoizedState = n : (t.memoizedState = o, t = Iv(), rt.lanes |= t, Ao |= t, o)
 }

 function _g(t, n, o, l) {
  return qn(o, n) ? o : Ia.current !== null ? (t = lf(t, o, l), qn(t, n) || (hn = !0), t) : (xo & 42) === 0 ? (hn = !0, t.memoizedState = o) : (t = Iv(), rt.lanes |= t, Ao |= t, n)
 }

 function Ug(t, n, o, l, u) {
  var p = I.p;
  I.p = p !== 0 && 8 > p ? p : 8;
  var x = z.T,
   M = {};
  z.T = M, uf(t, !1, n, o);
  try {
   var B = u(),
    K = z.S;
   if (K !== null && K(M, B), B !== null && typeof B == "object" && typeof B.then == "function") {
    var ie = VS(B, l);
    dl(t, n, ie, Wn(t))
   } else dl(t, n, l, Wn(t))
  } catch (ue) {
   dl(t, n, {
    then: function() {},
    status: "rejected",
    reason: ue
   }, Wn())
  } finally {
   I.p = p, z.T = x
  }
 }

 function FS() {}

 function sf(t, n, o, l) {
  if (t.tag !== 5) throw Error(i(476));
  var u = Ig(t).queue;
  Ug(t, u, n, Q, o === null ? FS : function() {
   return Pg(t), o(l)
  })
 }

 function Ig(t) {
  var n = t.memoizedState;
  if (n !== null) return n;
  n = {
   memoizedState: Q,
   baseState: Q,
   baseQueue: null,
   queue: {
    pending: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: eo,
    lastRenderedState: Q
   },
   next: null
  };
  var o = {};
  return n.next = {
   memoizedState: o,
   baseState: o,
   baseQueue: null,
   queue: {
    pending: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: eo,
    lastRenderedState: o
   },
   next: null
  }, t.memoizedState = n, t = t.alternate, t !== null && (t.memoizedState = n), n
 }

 function Pg(t) {
  var n = Ig(t).next.queue;
  dl(t, n, {}, Wn())
 }

 function cf() {
  return Tn(Ol)
 }

 function Hg() {
  return an().memoizedState
 }

 function qg() {
  return an().memoizedState
 }

 function KS(t) {
  for (var n = t.return; n !== null;) {
   switch (n.tag) {
    case 24:
    case 3:
     var o = Wn();
     t = yo(o);
     var l = bo(n, t, o);
     l !== null && (Fn(l, n, o), al(l, n, o)), n = {
      cache: _d()
     }, t.payload = n;
     return
   }
   n = n.return
  }
 }

 function QS(t, n, o) {
  var l = Wn();
  o = {
   lane: l,
   revertLane: 0,
   action: o,
   hasEagerState: !1,
   eagerState: null,
   next: null
  }, sc(t) ? Gg(n, o) : (o = Md(t, n, o, l), o !== null && (Fn(o, t, l), Yg(o, n, l)))
 }

 function Vg(t, n, o) {
  var l = Wn();
  dl(t, n, o, l)
 }

 function dl(t, n, o, l) {
  var u = {
   lane: l,
   revertLane: 0,
   action: o,
   hasEagerState: !1,
   eagerState: null,
   next: null
  };
  if (sc(t)) Gg(n, u);
  else {
   var p = t.alternate;
   if (t.lanes === 0 && (p === null || p.lanes === 0) && (p = n.lastRenderedReducer, p !== null)) try {
    var x = n.lastRenderedState,
     M = p(x, o);
    if (u.hasEagerState = !0, u.eagerState = M, qn(M, x)) return Gs(t, n, u, 0), $t === null && Vs(), !1
   } catch {} finally {}
   if (o = Md(t, n, u, l), o !== null) return Fn(o, t, l), Yg(o, n, l), !0
  }
  return !1
 }

 function uf(t, n, o, l) {
  if (l = {
    lane: 2,
    revertLane: Hf(),
    action: l,
    hasEagerState: !1,
    eagerState: null,
    next: null
   }, sc(t)) {
   if (n) throw Error(i(479))
  } else n = Md(t, o, l, 2), n !== null && Fn(n, t, 2)
 }

 function sc(t) {
  var n = t.alternate;
  return t === rt || n !== null && n === rt
 }

 function Gg(t, n) {
  Pa = nc = !0;
  var o = t.pending;
  o === null ? n.next = n : (n.next = o.next, o.next = n), t.pending = n
 }

 function Yg(t, n, o) {
  if ((o & 4194048) !== 0) {
   var l = n.lanes;
   l &= t.pendingLanes, o |= l, n.lanes = o, Vt(t, o)
  }
 }
 var cc = {
   readContext: Tn,
   use: oc,
   useCallback: Jt,
   useContext: Jt,
   useEffect: Jt,
   useImperativeHandle: Jt,
   useLayoutEffect: Jt,
   useInsertionEffect: Jt,
   useMemo: Jt,
   useReducer: Jt,
   useRef: Jt,
   useState: Jt,
   useDebugValue: Jt,
   useDeferredValue: Jt,
   useTransition: Jt,
   useSyncExternalStore: Jt,
   useId: Jt,
   useHostTransitionStatus: Jt,
   useFormState: Jt,
   useActionState: Jt,
   useOptimistic: Jt,
   useMemoCache: Jt,
   useCacheRefresh: Jt
  },
  Xg = {
   readContext: Tn,
   use: oc,
   useCallback: function(t, n) {
    return Bn().memoizedState = [t, n === void 0 ? null : n], t
   },
   useContext: Tn,
   useEffect: Dg,
   useImperativeHandle: function(t, n, o) {
    o = o != null ? o.concat([t]) : null, lc(4194308, 4, Ng.bind(null, n, t), o)
   },
   useLayoutEffect: function(t, n) {
    return lc(4194308, 4, t, n)
   },
   useInsertionEffect: function(t, n) {
    lc(4, 2, t, n)
   },
   useMemo: function(t, n) {
    var o = Bn();
    n = n === void 0 ? null : n;
    var l = t();
    if (na) {
     De(!0);
     try {
      t()
     } finally {
      De(!1)
     }
    }
    return o.memoizedState = [l, n], l
   },
   useReducer: function(t, n, o) {
    var l = Bn();
    if (o !== void 0) {
     var u = o(n);
     if (na) {
      De(!0);
      try {
       o(n)
      } finally {
       De(!1)
      }
     }
    } else u = n;
    return l.memoizedState = l.baseState = u, t = {
     pending: null,
     lanes: 0,
     dispatch: null,
     lastRenderedReducer: t,
     lastRenderedState: u
    }, l.queue = t, t = t.dispatch = QS.bind(null, rt, t), [l.memoizedState, t]
   },
   useRef: function(t) {
    var n = Bn();
    return t = {
     current: t
    }, n.memoizedState = t
   },
   useState: function(t) {
    t = rf(t);
    var n = t.queue,
     o = Vg.bind(null, rt, n);
    return n.dispatch = o, [t.memoizedState, o]
   },
   useDebugValue: af,
   useDeferredValue: function(t, n) {
    var o = Bn();
    return lf(o, t, n)
   },
   useTransition: function() {
    var t = rf(!1);
    return t = Ug.bind(null, rt, t.queue, !0, !1), Bn().memoizedState = t, [!1, t]
   },
   useSyncExternalStore: function(t, n, o) {
    var l = rt,
     u = Bn();
    if (bt) {
     if (o === void 0) throw Error(i(407));
     o = o()
    } else {
     if (o = n(), $t === null) throw Error(i(349));
     (ht & 124) !== 0 || hg(l, n, o)
    }
    u.memoizedState = o;
    var p = {
     value: o,
     getSnapshot: n
    };
    return u.queue = p, Dg(gg.bind(null, l, p, t), [t]), l.flags |= 2048, qa(9, ic(), mg.bind(null, l, p, o, n), null), o
   },
   useId: function() {
    var t = Bn(),
     n = $t.identifierPrefix;
    if (bt) {
     var o = Qr,
      l = Kr;
     o = (l & ~(1 << 32 - be(l) - 1)).toString(32) + o, n = "«" + n + "R" + o, o = rc++, 0 < o && (n += "H" + o.toString(32)), n += "»"
    } else o = GS++, n = "«" + n + "r" + o.toString(32) + "»";
    return t.memoizedState = n
   },
   useHostTransitionStatus: cf,
   useFormState: Eg,
   useActionState: Eg,
   useOptimistic: function(t) {
    var n = Bn();
    n.memoizedState = n.baseState = t;
    var o = {
     pending: null,
     lanes: 0,
     dispatch: null,
     lastRenderedReducer: null,
     lastRenderedState: null
    };
    return n.queue = o, n = uf.bind(null, rt, !0, o), o.dispatch = n, [t, n]
   },
   useMemoCache: ef,
   useCacheRefresh: function() {
    return Bn().memoizedState = KS.bind(null, rt)
   }
  },
  Wg = {
   readContext: Tn,
   use: oc,
   useCallback: Bg,
   useContext: Tn,
   useEffect: kg,
   useImperativeHandle: Lg,
   useInsertionEffect: zg,
   useLayoutEffect: jg,
   useMemo: $g,
   useReducer: ac,
   useRef: Og,
   useState: function() {
    return ac(eo)
   },
   useDebugValue: af,
   useDeferredValue: function(t, n) {
    var o = an();
    return _g(o, At.memoizedState, t, n)
   },
   useTransition: function() {
    var t = ac(eo)[0],
     n = an().memoizedState;
    return [typeof t == "boolean" ? t : cl(t), n]
   },
   useSyncExternalStore: pg,
   useId: Hg,
   useHostTransitionStatus: cf,
   useFormState: Tg,
   useActionState: Tg,
   useOptimistic: function(t, n) {
    var o = an();
    return bg(o, At, t, n)
   },
   useMemoCache: ef,
   useCacheRefresh: qg
  },
  ZS = {
   readContext: Tn,
   use: oc,
   useCallback: Bg,
   useContext: Tn,
   useEffect: kg,
   useImperativeHandle: Lg,
   useInsertionEffect: zg,
   useLayoutEffect: jg,
   useMemo: $g,
   useReducer: nf,
   useRef: Og,
   useState: function() {
    return nf(eo)
   },
   useDebugValue: af,
   useDeferredValue: function(t, n) {
    var o = an();
    return At === null ? lf(o, t, n) : _g(o, At.memoizedState, t, n)
   },
   useTransition: function() {
    var t = nf(eo)[0],
     n = an().memoizedState;
    return [typeof t == "boolean" ? t : cl(t), n]
   },
   useSyncExternalStore: pg,
   useId: Hg,
   useHostTransitionStatus: cf,
   useFormState: Mg,
   useActionState: Mg,
   useOptimistic: function(t, n) {
    var o = an();
    return At !== null ? bg(o, At, t, n) : (o.baseState = t, [t, o.queue.dispatch])
   },
   useMemoCache: ef,
   useCacheRefresh: qg
  },
  Va = null,
  fl = 0;

 function uc(t) {
  var n = fl;
  return fl += 1, Va === null && (Va = []), ag(Va, t, n)
 }

 function pl(t, n) {
  n = n.props.ref, t.ref = n !== void 0 ? n : null
 }

 function dc(t, n) {
  throw n.$$typeof === b ? Error(i(525)) : (t = Object.prototype.toString.call(n), Error(i(31, t === "[object Object]" ? "object with keys {" + Object.keys(n).join(", ") + "}" : t)))
 }

 function Fg(t) {
  var n = t._init;
  return n(t._payload)
 }

 function Kg(t) {
  function n(Y, P) {
   if (t) {
    var F = Y.deletions;
    F === null ? (Y.deletions = [P], Y.flags |= 16) : F.push(P)
   }
  }

  function o(Y, P) {
   if (!t) return null;
   for (; P !== null;) n(Y, P), P = P.sibling;
   return null
  }

  function l(Y) {
   for (var P = new Map; Y !== null;) Y.key !== null ? P.set(Y.key, Y) : P.set(Y.index, Y), Y = Y.sibling;
   return P
  }

  function u(Y, P) {
   return Y = Fr(Y, P), Y.index = 0, Y.sibling = null, Y
  }

  function p(Y, P, F) {
   return Y.index = F, t ? (F = Y.alternate, F !== null ? (F = F.index, F < P ? (Y.flags |= 67108866, P) : F) : (Y.flags |= 67108866, P)) : (Y.flags |= 1048576, P)
  }

  function x(Y) {
   return t && Y.alternate === null && (Y.flags |= 67108866), Y
  }

  function M(Y, P, F, se) {
   return P === null || P.tag !== 6 ? (P = Dd(F, Y.mode, se), P.return = Y, P) : (P = u(P, F), P.return = Y, P)
  }

  function B(Y, P, F, se) {
   var ke = F.type;
   return ke === T ? ie(Y, P, F.props.children, se, F.key) : P !== null && (P.elementType === ke || typeof ke == "object" && ke !== null && ke.$$typeof === _ && Fg(ke) === P.type) ? (P = u(P, F.props), pl(P, F), P.return = Y, P) : (P = Xs(F.type, F.key, F.props, null, Y.mode, se), pl(P, F), P.return = Y, P)
  }

  function K(Y, P, F, se) {
   return P === null || P.tag !== 4 || P.stateNode.containerInfo !== F.containerInfo || P.stateNode.implementation !== F.implementation ? (P = kd(F, Y.mode, se), P.return = Y, P) : (P = u(P, F.children || []), P.return = Y, P)
  }

  function ie(Y, P, F, se, ke) {
   return P === null || P.tag !== 7 ? (P = Wo(F, Y.mode, se, ke), P.return = Y, P) : (P = u(P, F), P.return = Y, P)
  }

  function ue(Y, P, F) {
   if (typeof P == "string" && P !== "" || typeof P == "number" || typeof P == "bigint") return P = Dd("" + P, Y.mode, F), P.return = Y, P;
   if (typeof P == "object" && P !== null) {
    switch (P.$$typeof) {
     case w:
      return F = Xs(P.type, P.key, P.props, null, Y.mode, F), pl(F, P), F.return = Y, F;
     case R:
      return P = kd(P, Y.mode, F), P.return = Y, P;
     case _:
      var se = P._init;
      return P = se(P._payload), ue(Y, P, F)
    }
    if (W(P) || H(P)) return P = Wo(P, Y.mode, F, null), P.return = Y, P;
    if (typeof P.then == "function") return ue(Y, uc(P), F);
    if (P.$$typeof === E) return ue(Y, Qs(Y, P), F);
    dc(Y, P)
   }
   return null
  }

  function J(Y, P, F, se) {
   var ke = P !== null ? P.key : null;
   if (typeof F == "string" && F !== "" || typeof F == "number" || typeof F == "bigint") return ke !== null ? null : M(Y, P, "" + F, se);
   if (typeof F == "object" && F !== null) {
    switch (F.$$typeof) {
     case w:
      return F.key === ke ? B(Y, P, F, se) : null;
     case R:
      return F.key === ke ? K(Y, P, F, se) : null;
     case _:
      return ke = F._init, F = ke(F._payload), J(Y, P, F, se)
    }
    if (W(F) || H(F)) return ke !== null ? null : ie(Y, P, F, se, null);
    if (typeof F.then == "function") return J(Y, P, uc(F), se);
    if (F.$$typeof === E) return J(Y, P, Qs(Y, F), se);
    dc(Y, F)
   }
   return null
  }

  function te(Y, P, F, se, ke) {
   if (typeof se == "string" && se !== "" || typeof se == "number" || typeof se == "bigint") return Y = Y.get(F) || null, M(P, Y, "" + se, ke);
   if (typeof se == "object" && se !== null) {
    switch (se.$$typeof) {
     case w:
      return Y = Y.get(se.key === null ? F : se.key) || null, B(P, Y, se, ke);
     case R:
      return Y = Y.get(se.key === null ? F : se.key) || null, K(P, Y, se, ke);
     case _:
      var at = se._init;
      return se = at(se._payload), te(Y, P, F, se, ke)
    }
    if (W(se) || H(se)) return Y = Y.get(F) || null, ie(P, Y, se, ke, null);
    if (typeof se.then == "function") return te(Y, P, F, uc(se), ke);
    if (se.$$typeof === E) return te(Y, P, F, Qs(P, se), ke);
    dc(P, se)
   }
   return null
  }

  function We(Y, P, F, se) {
   for (var ke = null, at = null, Le = P, qe = P = 0, gn = null; Le !== null && qe < F.length; qe++) {
    Le.index > qe ? (gn = Le, Le = null) : gn = Le.sibling;
    var yt = J(Y, Le, F[qe], se);
    if (yt === null) {
     Le === null && (Le = gn);
     break
    }
    t && Le && yt.alternate === null && n(Y, Le), P = p(yt, P, qe), at === null ? ke = yt : at.sibling = yt, at = yt, Le = gn
   }
   if (qe === F.length) return o(Y, Le), bt && Ko(Y, qe), ke;
   if (Le === null) {
    for (; qe < F.length; qe++) Le = ue(Y, F[qe], se), Le !== null && (P = p(Le, P, qe), at === null ? ke = Le : at.sibling = Le, at = Le);
    return bt && Ko(Y, qe), ke
   }
   for (Le = l(Le); qe < F.length; qe++) gn = te(Le, Y, qe, F[qe], se), gn !== null && (t && gn.alternate !== null && Le.delete(gn.key === null ? qe : gn.key), P = p(gn, P, qe), at === null ? ke = gn : at.sibling = gn, at = gn);
   return t && Le.forEach(function(Bo) {
    return n(Y, Bo)
   }), bt && Ko(Y, qe), ke
  }

  function _e(Y, P, F, se) {
   if (F == null) throw Error(i(151));
   for (var ke = null, at = null, Le = P, qe = P = 0, gn = null, yt = F.next(); Le !== null && !yt.done; qe++, yt = F.next()) {
    Le.index > qe ? (gn = Le, Le = null) : gn = Le.sibling;
    var Bo = J(Y, Le, yt.value, se);
    if (Bo === null) {
     Le === null && (Le = gn);
     break
    }
    t && Le && Bo.alternate === null && n(Y, Le), P = p(Bo, P, qe), at === null ? ke = Bo : at.sibling = Bo, at = Bo, Le = gn
   }
   if (yt.done) return o(Y, Le), bt && Ko(Y, qe), ke;
   if (Le === null) {
    for (; !yt.done; qe++, yt = F.next()) yt = ue(Y, yt.value, se), yt !== null && (P = p(yt, P, qe), at === null ? ke = yt : at.sibling = yt, at = yt);
    return bt && Ko(Y, qe), ke
   }
   for (Le = l(Le); !yt.done; qe++, yt = F.next()) yt = te(Le, Y, qe, yt.value, se), yt !== null && (t && yt.alternate !== null && Le.delete(yt.key === null ? qe : yt.key), P = p(yt, P, qe), at === null ? ke = yt : at.sibling = yt, at = yt);
   return t && Le.forEach(function(J2) {
    return n(Y, J2)
   }), bt && Ko(Y, qe), ke
  }

  function Ot(Y, P, F, se) {
   if (typeof F == "object" && F !== null && F.type === T && F.key === null && (F = F.props.children), typeof F == "object" && F !== null) {
    switch (F.$$typeof) {
     case w:
      e: {
       for (var ke = F.key; P !== null;) {
        if (P.key === ke) {
         if (ke = F.type, ke === T) {
          if (P.tag === 7) {
           o(Y, P.sibling), se = u(P, F.props.children), se.return = Y, Y = se;
           break e
          }
         } else if (P.elementType === ke || typeof ke == "object" && ke !== null && ke.$$typeof === _ && Fg(ke) === P.type) {
          o(Y, P.sibling), se = u(P, F.props), pl(se, F), se.return = Y, Y = se;
          break e
         }
         o(Y, P);
         break
        } else n(Y, P);
        P = P.sibling
       }
       F.type === T ? (se = Wo(F.props.children, Y.mode, se, F.key), se.return = Y, Y = se) : (se = Xs(F.type, F.key, F.props, null, Y.mode, se), pl(se, F), se.return = Y, Y = se)
      }
      return x(Y);
     case R:
      e: {
       for (ke = F.key; P !== null;) {
        if (P.key === ke)
         if (P.tag === 4 && P.stateNode.containerInfo === F.containerInfo && P.stateNode.implementation === F.implementation) {
          o(Y, P.sibling), se = u(P, F.children || []), se.return = Y, Y = se;
          break e
         } else {
          o(Y, P);
          break
         }
        else n(Y, P);
        P = P.sibling
       }
       se = kd(F, Y.mode, se),
       se.return = Y,
       Y = se
      }
      return x(Y);
     case _:
      return ke = F._init, F = ke(F._payload), Ot(Y, P, F, se)
    }
    if (W(F)) return We(Y, P, F, se);
    if (H(F)) {
     if (ke = H(F), typeof ke != "function") throw Error(i(150));
     return F = ke.call(F), _e(Y, P, F, se)
    }
    if (typeof F.then == "function") return Ot(Y, P, uc(F), se);
    if (F.$$typeof === E) return Ot(Y, P, Qs(Y, F), se);
    dc(Y, F)
   }
   return typeof F == "string" && F !== "" || typeof F == "number" || typeof F == "bigint" ? (F = "" + F, P !== null && P.tag === 6 ? (o(Y, P.sibling), se = u(P, F), se.return = Y, Y = se) : (o(Y, P), se = Dd(F, Y.mode, se), se.return = Y, Y = se), x(Y)) : o(Y, P)
  }
  return function(Y, P, F, se) {
   try {
    fl = 0;
    var ke = Ot(Y, P, F, se);
    return Va = null, ke
   } catch (Le) {
    if (Le === rl || Le === Js) throw Le;
    var at = Vn(29, Le, null, Y.mode);
    return at.lanes = se, at.return = Y, at
   } finally {}
  }
 }
 var Ga = Kg(!0),
  Qg = Kg(!1),
  sr = q(null),
  Dr = null;

 function So(t) {
  var n = t.alternate;
  ne(un, un.current & 1), ne(sr, t), Dr === null && (n === null || Ia.current !== null || n.memoizedState !== null) && (Dr = t)
 }

 function Zg(t) {
  if (t.tag === 22) {
   if (ne(un, un.current), ne(sr, t), Dr === null) {
    var n = t.alternate;
    n !== null && n.memoizedState !== null && (Dr = t)
   }
  } else Co()
 }

 function Co() {
  ne(un, un.current), ne(sr, sr.current)
 }

 function to(t) {
  ee(sr), Dr === t && (Dr = null), ee(un)
 }
 var un = q(0);

 function fc(t) {
  for (var n = t; n !== null;) {
   if (n.tag === 13) {
    var o = n.memoizedState;
    if (o !== null && (o = o.dehydrated, o === null || o.data === "$?" || ep(o))) return n
   } else if (n.tag === 19 && n.memoizedProps.revealOrder !== void 0) {
    if ((n.flags & 128) !== 0) return n
   } else if (n.child !== null) {
    n.child.return = n, n = n.child;
    continue
   }
   if (n === t) break;
   for (; n.sibling === null;) {
    if (n.return === null || n.return === t) return null;
    n = n.return
   }
   n.sibling.return = n.return, n = n.sibling
  }
  return null
 }

 function df(t, n, o, l) {
  n = t.memoizedState, o = o(l, n), o = o == null ? n : g({}, n, o), t.memoizedState = o, t.lanes === 0 && (t.updateQueue.baseState = o)
 }
 var ff = {
  enqueueSetState: function(t, n, o) {
   t = t._reactInternals;
   var l = Wn(),
    u = yo(l);
   u.payload = n, o != null && (u.callback = o), n = bo(t, u, l), n !== null && (Fn(n, t, l), al(n, t, l))
  },
  enqueueReplaceState: function(t, n, o) {
   t = t._reactInternals;
   var l = Wn(),
    u = yo(l);
   u.tag = 1, u.payload = n, o != null && (u.callback = o), n = bo(t, u, l), n !== null && (Fn(n, t, l), al(n, t, l))
  },
  enqueueForceUpdate: function(t, n) {
   t = t._reactInternals;
   var o = Wn(),
    l = yo(o);
   l.tag = 2, n != null && (l.callback = n), n = bo(t, l, o), n !== null && (Fn(n, t, o), al(n, t, o))
  }
 };

 function Jg(t, n, o, l, u, p, x) {
  return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(l, p, x) : n.prototype && n.prototype.isPureReactComponent ? !Fi(o, l) || !Fi(u, p) : !0
 }

 function ev(t, n, o, l) {
  t = n.state, typeof n.componentWillReceiveProps == "function" && n.componentWillReceiveProps(o, l), typeof n.UNSAFE_componentWillReceiveProps == "function" && n.UNSAFE_componentWillReceiveProps(o, l), n.state !== t && ff.enqueueReplaceState(n, n.state, null)
 }

 function ra(t, n) {
  var o = n;
  if ("ref" in n) {
   o = {};
   for (var l in n) l !== "ref" && (o[l] = n[l])
  }
  if (t = t.defaultProps) {
   o === n && (o = g({}, o));
   for (var u in t) o[u] === void 0 && (o[u] = t[u])
  }
  return o
 }
 var pc = typeof reportError == "function" ? reportError : function(t) {
  if (typeof window == "object" && typeof window.ErrorEvent == "function") {
   var n = new window.ErrorEvent("error", {
    bubbles: !0,
    cancelable: !0,
    message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
    error: t
   });
   if (!window.dispatchEvent(n)) return
  } else if (typeof process == "object" && typeof process.emit == "function") {
   process.emit("uncaughtException", t);
   return
  }
  console.error(t)
 };

 function tv(t) {
  pc(t)
 }

 function nv(t) {
  console.error(t)
 }

 function rv(t) {
  pc(t)
 }

 function hc(t, n) {
  try {
   var o = t.onUncaughtError;
   o(n.value, {
    componentStack: n.stack
   })
  } catch (l) {
   setTimeout(function() {
    throw l
   })
  }
 }

 function ov(t, n, o) {
  try {
   var l = t.onCaughtError;
   l(o.value, {
    componentStack: o.stack,
    errorBoundary: n.tag === 1 ? n.stateNode : null
   })
  } catch (u) {
   setTimeout(function() {
    throw u
   })
  }
 }

 function pf(t, n, o) {
  return o = yo(o), o.tag = 3, o.payload = {
   element: null
  }, o.callback = function() {
   hc(t, n)
  }, o
 }

 function av(t) {
  return t = yo(t), t.tag = 3, t
 }

 function iv(t, n, o, l) {
  var u = o.type.getDerivedStateFromError;
  if (typeof u == "function") {
   var p = l.value;
   t.payload = function() {
    return u(p)
   }, t.callback = function() {
    ov(n, o, l)
   }
  }
  var x = o.stateNode;
  x !== null && typeof x.componentDidCatch == "function" && (t.callback = function() {
   ov(n, o, l), typeof u != "function" && (Mo === null ? Mo = new Set([this]) : Mo.add(this));
   var M = l.stack;
   this.componentDidCatch(l.value, {
    componentStack: M !== null ? M : ""
   })
  })
 }

 function JS(t, n, o, l, u) {
  if (o.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
   if (n = o.alternate, n !== null && el(n, o, u, !0), o = sr.current, o !== null) {
    switch (o.tag) {
     case 13:
      return Dr === null ? $f() : o.alternate === null && Xt === 0 && (Xt = 3), o.flags &= -257, o.flags |= 65536, o.lanes = u, l === Pd ? o.flags |= 16384 : (n = o.updateQueue, n === null ? o.updateQueue = new Set([l]) : n.add(l), Uf(t, l, u)), !1;
     case 22:
      return o.flags |= 65536, l === Pd ? o.flags |= 16384 : (n = o.updateQueue, n === null ? (n = {
       transitions: null,
       markerInstances: null,
       retryQueue: new Set([l])
      }, o.updateQueue = n) : (o = n.retryQueue, o === null ? n.retryQueue = new Set([l]) : o.add(l)), Uf(t, l, u)), !1
    }
    throw Error(i(435, o.tag))
   }
   return Uf(t, l, u), $f(), !1
  }
  if (bt) return n = sr.current, n !== null ? ((n.flags & 65536) === 0 && (n.flags |= 256), n.flags |= 65536, n.lanes = u, l !== Nd && (t = Error(i(422), {
   cause: l
  }), Ji(or(t, o)))) : (l !== Nd && (n = Error(i(423), {
   cause: l
  }), Ji(or(n, o))), t = t.current.alternate, t.flags |= 65536, u &= -u, t.lanes |= u, l = or(l, o), u = pf(t.stateNode, l, u), Vd(t, u), Xt !== 4 && (Xt = 2)), !1;
  var p = Error(i(520), {
   cause: l
  });
  if (p = or(p, o), xl === null ? xl = [p] : xl.push(p), Xt !== 4 && (Xt = 2), n === null) return !0;
  l = or(l, o), o = n;
  do {
   switch (o.tag) {
    case 3:
     return o.flags |= 65536, t = u & -u, o.lanes |= t, t = pf(o.stateNode, l, t), Vd(o, t), !1;
    case 1:
     if (n = o.type, p = o.stateNode, (o.flags & 128) === 0 && (typeof n.getDerivedStateFromError == "function" || p !== null && typeof p.componentDidCatch == "function" && (Mo === null || !Mo.has(p)))) return o.flags |= 65536, u &= -u, o.lanes |= u, u = av(u), iv(u, t, o, l), Vd(o, u), !1
   }
   o = o.return
  } while (o !== null);
  return !1
 }
 var lv = Error(i(461)),
  hn = !1;

 function xn(t, n, o, l) {
  n.child = t === null ? Qg(n, null, o, l) : Ga(n, t.child, o, l)
 }

 function sv(t, n, o, l, u) {
  o = o.render;
  var p = n.ref;
  if ("ref" in l) {
   var x = {};
   for (var M in l) M !== "ref" && (x[M] = l[M])
  } else x = l;
  return ea(n), l = Fd(t, n, o, x, p, u), M = Kd(), t !== null && !hn ? (Qd(t, n, u), no(t, n, u)) : (bt && M && zd(n), n.flags |= 1, xn(t, n, l, u), n.child)
 }

 function cv(t, n, o, l, u) {
  if (t === null) {
   var p = o.type;
   return typeof p == "function" && !Od(p) && p.defaultProps === void 0 && o.compare === null ? (n.tag = 15, n.type = p, uv(t, n, p, l, u)) : (t = Xs(o.type, null, l, n, n.mode, u), t.ref = n.ref, t.return = n, n.child = t)
  }
  if (p = t.child, !Sf(t, u)) {
   var x = p.memoizedProps;
   if (o = o.compare, o = o !== null ? o : Fi, o(x, l) && t.ref === n.ref) return no(t, n, u)
  }
  return n.flags |= 1, t = Fr(p, l), t.ref = n.ref, t.return = n, n.child = t
 }

 function uv(t, n, o, l, u) {
  if (t !== null) {
   var p = t.memoizedProps;
   if (Fi(p, l) && t.ref === n.ref)
    if (hn = !1, n.pendingProps = l = p, Sf(t, u))(t.flags & 131072) !== 0 && (hn = !0);
    else return n.lanes = t.lanes, no(t, n, u)
  }
  return hf(t, n, o, l, u)
 }

 function dv(t, n, o) {
  var l = n.pendingProps,
   u = l.children,
   p = t !== null ? t.memoizedState : null;
  if (l.mode === "hidden") {
   if ((n.flags & 128) !== 0) {
    if (l = p !== null ? p.baseLanes | o : o, t !== null) {
     for (u = n.child = t.child, p = 0; u !== null;) p = p | u.lanes | u.childLanes, u = u.sibling;
     n.childLanes = p & ~l
    } else n.childLanes = 0, n.child = null;
    return fv(t, n, l, o)
   }
   if ((o & 536870912) !== 0) n.memoizedState = {
    baseLanes: 0,
    cachePool: null
   }, t !== null && Zs(n, p !== null ? p.cachePool : null), p !== null ? ug(n, p) : Yd(), Zg(n);
   else return n.lanes = n.childLanes = 536870912, fv(t, n, p !== null ? p.baseLanes | o : o, o)
  } else p !== null ? (Zs(n, p.cachePool), ug(n, p), Co(), n.memoizedState = null) : (t !== null && Zs(n, null), Yd(), Co());
  return xn(t, n, u, o), n.child
 }

 function fv(t, n, o, l) {
  var u = Id();
  return u = u === null ? null : {
   parent: cn._currentValue,
   pool: u
  }, n.memoizedState = {
   baseLanes: o,
   cachePool: u
  }, t !== null && Zs(n, null), Yd(), Zg(n), t !== null && el(t, n, l, !0), null
 }

 function mc(t, n) {
  var o = n.ref;
  if (o === null) t !== null && t.ref !== null && (n.flags |= 4194816);
  else {
   if (typeof o != "function" && typeof o != "object") throw Error(i(284));
   (t === null || t.ref !== o) && (n.flags |= 4194816)
  }
 }

 function hf(t, n, o, l, u) {
  return ea(n), o = Fd(t, n, o, l, void 0, u), l = Kd(), t !== null && !hn ? (Qd(t, n, u), no(t, n, u)) : (bt && l && zd(n), n.flags |= 1, xn(t, n, o, u), n.child)
 }

 function pv(t, n, o, l, u, p) {
  return ea(n), n.updateQueue = null, o = fg(n, l, o, u), dg(t), l = Kd(), t !== null && !hn ? (Qd(t, n, p), no(t, n, p)) : (bt && l && zd(n), n.flags |= 1, xn(t, n, o, p), n.child)
 }

 function hv(t, n, o, l, u) {
  if (ea(n), n.stateNode === null) {
   var p = La,
    x = o.contextType;
   typeof x == "object" && x !== null && (p = Tn(x)), p = new o(l, p), n.memoizedState = p.state !== null && p.state !== void 0 ? p.state : null, p.updater = ff, n.stateNode = p, p._reactInternals = n, p = n.stateNode, p.props = l, p.state = n.memoizedState, p.refs = {}, Hd(n), x = o.contextType, p.context = typeof x == "object" && x !== null ? Tn(x) : La, p.state = n.memoizedState, x = o.getDerivedStateFromProps, typeof x == "function" && (df(n, o, x, l), p.state = n.memoizedState), typeof o.getDerivedStateFromProps == "function" || typeof p.getSnapshotBeforeUpdate == "function" || typeof p.UNSAFE_componentWillMount != "function" && typeof p.componentWillMount != "function" || (x = p.state, typeof p.componentWillMount == "function" && p.componentWillMount(), typeof p.UNSAFE_componentWillMount == "function" && p.UNSAFE_componentWillMount(), x !== p.state && ff.enqueueReplaceState(p, p.state, null), ll(n, l, p, u), il(), p.state = n.memoizedState), typeof p.componentDidMount == "function" && (n.flags |= 4194308), l = !0
  } else if (t === null) {
   p = n.stateNode;
   var M = n.memoizedProps,
    B = ra(o, M);
   p.props = B;
   var K = p.context,
    ie = o.contextType;
   x = La, typeof ie == "object" && ie !== null && (x = Tn(ie));
   var ue = o.getDerivedStateFromProps;
   ie = typeof ue == "function" || typeof p.getSnapshotBeforeUpdate == "function", M = n.pendingProps !== M, ie || typeof p.UNSAFE_componentWillReceiveProps != "function" && typeof p.componentWillReceiveProps != "function" || (M || K !== x) && ev(n, p, l, x), vo = !1;
   var J = n.memoizedState;
   p.state = J, ll(n, l, p, u), il(), K = n.memoizedState, M || J !== K || vo ? (typeof ue == "function" && (df(n, o, ue, l), K = n.memoizedState), (B = vo || Jg(n, o, B, l, J, K, x)) ? (ie || typeof p.UNSAFE_componentWillMount != "function" && typeof p.componentWillMount != "function" || (typeof p.componentWillMount == "function" && p.componentWillMount(), typeof p.UNSAFE_componentWillMount == "function" && p.UNSAFE_componentWillMount()), typeof p.componentDidMount == "function" && (n.flags |= 4194308)) : (typeof p.componentDidMount == "function" && (n.flags |= 4194308), n.memoizedProps = l, n.memoizedState = K), p.props = l, p.state = K, p.context = x, l = B) : (typeof p.componentDidMount == "function" && (n.flags |= 4194308), l = !1)
  } else {
   p = n.stateNode, qd(t, n), x = n.memoizedProps, ie = ra(o, x), p.props = ie, ue = n.pendingProps, J = p.context, K = o.contextType, B = La, typeof K == "object" && K !== null && (B = Tn(K)), M = o.getDerivedStateFromProps, (K = typeof M == "function" || typeof p.getSnapshotBeforeUpdate == "function") || typeof p.UNSAFE_componentWillReceiveProps != "function" && typeof p.componentWillReceiveProps != "function" || (x !== ue || J !== B) && ev(n, p, l, B), vo = !1, J = n.memoizedState, p.state = J, ll(n, l, p, u), il();
   var te = n.memoizedState;
   x !== ue || J !== te || vo || t !== null && t.dependencies !== null && Ks(t.dependencies) ? (typeof M == "function" && (df(n, o, M, l), te = n.memoizedState), (ie = vo || Jg(n, o, ie, l, J, te, B) || t !== null && t.dependencies !== null && Ks(t.dependencies)) ? (K || typeof p.UNSAFE_componentWillUpdate != "function" && typeof p.componentWillUpdate != "function" || (typeof p.componentWillUpdate == "function" && p.componentWillUpdate(l, te, B), typeof p.UNSAFE_componentWillUpdate == "function" && p.UNSAFE_componentWillUpdate(l, te, B)), typeof p.componentDidUpdate == "function" && (n.flags |= 4), typeof p.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024)) : (typeof p.componentDidUpdate != "function" || x === t.memoizedProps && J === t.memoizedState || (n.flags |= 4), typeof p.getSnapshotBeforeUpdate != "function" || x === t.memoizedProps && J === t.memoizedState || (n.flags |= 1024), n.memoizedProps = l, n.memoizedState = te), p.props = l, p.state = te, p.context = B, l = ie) : (typeof p.componentDidUpdate != "function" || x === t.memoizedProps && J === t.memoizedState || (n.flags |= 4), typeof p.getSnapshotBeforeUpdate != "function" || x === t.memoizedProps && J === t.memoizedState || (n.flags |= 1024), l = !1)
  }
  return p = l, mc(t, n), l = (n.flags & 128) !== 0, p || l ? (p = n.stateNode, o = l && typeof o.getDerivedStateFromError != "function" ? null : p.render(), n.flags |= 1, t !== null && l ? (n.child = Ga(n, t.child, null, u), n.child = Ga(n, null, o, u)) : xn(t, n, o, u), n.memoizedState = p.state, t = n.child) : t = no(t, n, u), t
 }

 function mv(t, n, o, l) {
  return Zi(), n.flags |= 256, xn(t, n, o, l), n.child
 }
 var mf = {
  dehydrated: null,
  treeContext: null,
  retryLane: 0,
  hydrationErrors: null
 };

 function gf(t) {
  return {
   baseLanes: t,
   cachePool: ng()
  }
 }

 function vf(t, n, o) {
  return t = t !== null ? t.childLanes & ~o : 0, n && (t |= cr), t
 }

 function gv(t, n, o) {
  var l = n.pendingProps,
   u = !1,
   p = (n.flags & 128) !== 0,
   x;
  if ((x = p) || (x = t !== null && t.memoizedState === null ? !1 : (un.current & 2) !== 0), x && (u = !0, n.flags &= -129), x = (n.flags & 32) !== 0, n.flags &= -33, t === null) {
   if (bt) {
    if (u ? So(n) : Co(), bt) {
     var M = Yt,
      B;
     if (B = M) {
      e: {
       for (B = M, M = Or; B.nodeType !== 8;) {
        if (!M) {
         M = null;
         break e
        }
        if (B = Rr(B.nextSibling), B === null) {
         M = null;
         break e
        }
       }
       M = B
      }
      M !== null ? (n.memoizedState = {
       dehydrated: M,
       treeContext: Fo !== null ? {
        id: Kr,
        overflow: Qr
       } : null,
       retryLane: 536870912,
       hydrationErrors: null
      }, B = Vn(18, null, null, 0), B.stateNode = M, B.return = n, n.child = B, Dn = n, Yt = null, B = !0) : B = !1
     }
     B || Zo(n)
    }
    if (M = n.memoizedState, M !== null && (M = M.dehydrated, M !== null)) return ep(M) ? n.lanes = 32 : n.lanes = 536870912, null;
    to(n)
   }
   return M = l.children, l = l.fallback, u ? (Co(), u = n.mode, M = gc({
    mode: "hidden",
    children: M
   }, u), l = Wo(l, u, o, null), M.return = n, l.return = n, M.sibling = l, n.child = M, u = n.child, u.memoizedState = gf(o), u.childLanes = vf(t, x, o), n.memoizedState = mf, l) : (So(n), yf(n, M))
  }
  if (B = t.memoizedState, B !== null && (M = B.dehydrated, M !== null)) {
   if (p) n.flags & 256 ? (So(n), n.flags &= -257, n = bf(t, n, o)) : n.memoizedState !== null ? (Co(), n.child = t.child, n.flags |= 128, n = null) : (Co(), u = l.fallback, M = n.mode, l = gc({
    mode: "visible",
    children: l.children
   }, M), u = Wo(u, M, o, null), u.flags |= 2, l.return = n, u.return = n, l.sibling = u, n.child = l, Ga(n, t.child, null, o), l = n.child, l.memoizedState = gf(o), l.childLanes = vf(t, x, o), n.memoizedState = mf, n = u);
   else if (So(n), ep(M)) {
    if (x = M.nextSibling && M.nextSibling.dataset, x) var K = x.dgst;
    x = K, l = Error(i(419)), l.stack = "", l.digest = x, Ji({
     value: l,
     source: null,
     stack: null
    }), n = bf(t, n, o)
   } else if (hn || el(t, n, o, !1), x = (o & t.childLanes) !== 0, hn || x) {
    if (x = $t, x !== null && (l = o & -o, l = (l & 42) !== 0 ? 1 : pt(l), l = (l & (x.suspendedLanes | o)) !== 0 ? 0 : l, l !== 0 && l !== B.retryLane)) throw B.retryLane = l, Na(t, l), Fn(x, t, l), lv;
    M.data === "$?" || $f(), n = bf(t, n, o)
   } else M.data === "$?" ? (n.flags |= 192, n.child = t.child, n = null) : (t = B.treeContext, Yt = Rr(M.nextSibling), Dn = n, bt = !0, Qo = null, Or = !1, t !== null && (ir[lr++] = Kr, ir[lr++] = Qr, ir[lr++] = Fo, Kr = t.id, Qr = t.overflow, Fo = n), n = yf(n, l.children), n.flags |= 4096);
   return n
  }
  return u ? (Co(), u = l.fallback, M = n.mode, B = t.child, K = B.sibling, l = Fr(B, {
   mode: "hidden",
   children: l.children
  }), l.subtreeFlags = B.subtreeFlags & 65011712, K !== null ? u = Fr(K, u) : (u = Wo(u, M, o, null), u.flags |= 2), u.return = n, l.return = n, l.sibling = u, n.child = l, l = u, u = n.child, M = t.child.memoizedState, M === null ? M = gf(o) : (B = M.cachePool, B !== null ? (K = cn._currentValue, B = B.parent !== K ? {
   parent: K,
   pool: K
  } : B) : B = ng(), M = {
   baseLanes: M.baseLanes | o,
   cachePool: B
  }), u.memoizedState = M, u.childLanes = vf(t, x, o), n.memoizedState = mf, l) : (So(n), o = t.child, t = o.sibling, o = Fr(o, {
   mode: "visible",
   children: l.children
  }), o.return = n, o.sibling = null, t !== null && (x = n.deletions, x === null ? (n.deletions = [t], n.flags |= 16) : x.push(t)), n.child = o, n.memoizedState = null, o)
 }

 function yf(t, n) {
  return n = gc({
   mode: "visible",
   children: n
  }, t.mode), n.return = t, t.child = n
 }

 function gc(t, n) {
  return t = Vn(22, t, null, n), t.lanes = 0, t.stateNode = {
   _visibility: 1,
   _pendingMarkers: null,
   _retryCache: null,
   _transitions: null
  }, t
 }

 function bf(t, n, o) {
  return Ga(n, t.child, null, o), t = yf(n, n.pendingProps.children), t.flags |= 2, n.memoizedState = null, t
 }

 function vv(t, n, o) {
  t.lanes |= n;
  var l = t.alternate;
  l !== null && (l.lanes |= n), Bd(t.return, n, o)
 }

 function xf(t, n, o, l, u) {
  var p = t.memoizedState;
  p === null ? t.memoizedState = {
   isBackwards: n,
   rendering: null,
   renderingStartTime: 0,
   last: l,
   tail: o,
   tailMode: u
  } : (p.isBackwards = n, p.rendering = null, p.renderingStartTime = 0, p.last = l, p.tail = o, p.tailMode = u)
 }

 function yv(t, n, o) {
  var l = n.pendingProps,
   u = l.revealOrder,
   p = l.tail;
  if (xn(t, n, l.children, o), l = un.current, (l & 2) !== 0) l = l & 1 | 2, n.flags |= 128;
  else {
   if (t !== null && (t.flags & 128) !== 0) e: for (t = n.child; t !== null;) {
    if (t.tag === 13) t.memoizedState !== null && vv(t, o, n);
    else if (t.tag === 19) vv(t, o, n);
    else if (t.child !== null) {
     t.child.return = t, t = t.child;
     continue
    }
    if (t === n) break e;
    for (; t.sibling === null;) {
     if (t.return === null || t.return === n) break e;
     t = t.return
    }
    t.sibling.return = t.return, t = t.sibling
   }
   l &= 1
  }
  switch (ne(un, l), u) {
   case "forwards":
    for (o = n.child, u = null; o !== null;) t = o.alternate, t !== null && fc(t) === null && (u = o), o = o.sibling;
    o = u, o === null ? (u = n.child, n.child = null) : (u = o.sibling, o.sibling = null), xf(n, !1, u, o, p);
    break;
   case "backwards":
    for (o = null, u = n.child, n.child = null; u !== null;) {
     if (t = u.alternate, t !== null && fc(t) === null) {
      n.child = u;
      break
     }
     t = u.sibling, u.sibling = o, o = u, u = t
    }
    xf(n, !0, o, null, p);
    break;
   case "together":
    xf(n, !1, null, null, void 0);
    break;
   default:
    n.memoizedState = null
  }
  return n.child
 }

 function no(t, n, o) {
  if (t !== null && (n.dependencies = t.dependencies), Ao |= n.lanes, (o & n.childLanes) === 0)
   if (t !== null) {
    if (el(t, n, o, !1), (o & n.childLanes) === 0) return null
   } else return null;
  if (t !== null && n.child !== t.child) throw Error(i(153));
  if (n.child !== null) {
   for (t = n.child, o = Fr(t, t.pendingProps), n.child = o, o.return = n; t.sibling !== null;) t = t.sibling, o = o.sibling = Fr(t, t.pendingProps), o.return = n;
   o.sibling = null
  }
  return n.child
 }

 function Sf(t, n) {
  return (t.lanes & n) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Ks(t)))
 }

 function e2(t, n, o) {
  switch (n.tag) {
   case 3:
    ge(n, n.stateNode.containerInfo), go(n, cn, t.memoizedState.cache), Zi();
    break;
   case 27:
   case 5:
    fe(n);
    break;
   case 4:
    ge(n, n.stateNode.containerInfo);
    break;
   case 10:
    go(n, n.type, n.memoizedProps.value);
    break;
   case 13:
    var l = n.memoizedState;
    if (l !== null) return l.dehydrated !== null ? (So(n), n.flags |= 128, null) : (o & n.child.childLanes) !== 0 ? gv(t, n, o) : (So(n), t = no(t, n, o), t !== null ? t.sibling : null);
    So(n);
    break;
   case 19:
    var u = (t.flags & 128) !== 0;
    if (l = (o & n.childLanes) !== 0, l || (el(t, n, o, !1), l = (o & n.childLanes) !== 0), u) {
     if (l) return yv(t, n, o);
     n.flags |= 128
    }
    if (u = n.memoizedState, u !== null && (u.rendering = null, u.tail = null, u.lastEffect = null), ne(un, un.current), l) break;
    return null;
   case 22:
   case 23:
    return n.lanes = 0, dv(t, n, o);
   case 24:
    go(n, cn, t.memoizedState.cache)
  }
  return no(t, n, o)
 }

 function bv(t, n, o) {
  if (t !== null)
   if (t.memoizedProps !== n.pendingProps) hn = !0;
   else {
    if (!Sf(t, o) && (n.flags & 128) === 0) return hn = !1, e2(t, n, o);
    hn = (t.flags & 131072) !== 0
   }
  else hn = !1, bt && (n.flags & 1048576) !== 0 && Fm(n, Fs, n.index);
  switch (n.lanes = 0, n.tag) {
   case 16:
    e: {
     t = n.pendingProps;
     var l = n.elementType,
      u = l._init;
     if (l = u(l._payload), n.type = l, typeof l == "function") Od(l) ? (t = ra(l, t), n.tag = 1, n = hv(null, n, l, t, o)) : (n.tag = 0, n = hf(null, n, l, t, o));
     else {
      if (l != null) {
       if (u = l.$$typeof, u === A) {
        n.tag = 11, n = sv(null, n, l, t, o);
        break e
       } else if (u === U) {
        n.tag = 14, n = cv(null, n, l, t, o);
        break e
       }
      }
      throw n = X(l) || l, Error(i(306, n, ""))
     }
    }
    return n;
   case 0:
    return hf(t, n, n.type, n.pendingProps, o);
   case 1:
    return l = n.type, u = ra(l, n.pendingProps), hv(t, n, l, u, o);
   case 3:
    e: {
     if (ge(n, n.stateNode.containerInfo), t === null) throw Error(i(387));l = n.pendingProps;
     var p = n.memoizedState;u = p.element,
     qd(t, n),
     ll(n, l, null, o);
     var x = n.memoizedState;
     if (l = x.cache, go(n, cn, l), l !== p.cache && $d(n, [cn], o, !0), il(), l = x.element, p.isDehydrated)
      if (p = {
        element: l,
        isDehydrated: !1,
        cache: x.cache
       }, n.updateQueue.baseState = p, n.memoizedState = p, n.flags & 256) {
       n = mv(t, n, l, o);
       break e
      } else if (l !== u) {
      u = or(Error(i(424)), n), Ji(u), n = mv(t, n, l, o);
      break e
     } else {
      switch (t = n.stateNode.containerInfo, t.nodeType) {
       case 9:
        t = t.body;
        break;
       default:
        t = t.nodeName === "HTML" ? t.ownerDocument.body : t
      }
      for (Yt = Rr(t.firstChild), Dn = n, bt = !0, Qo = null, Or = !0, o = Qg(n, null, l, o), n.child = o; o;) o.flags = o.flags & -3 | 4096, o = o.sibling
     } else {
      if (Zi(), l === u) {
       n = no(t, n, o);
       break e
      }
      xn(t, n, l, o)
     }
     n = n.child
    }
    return n;
   case 26:
    return mc(t, n), t === null ? (o = wy(n.type, null, n.pendingProps, null)) ? n.memoizedState = o : bt || (o = n.type, t = n.pendingProps, l = Dc(re.current).createElement(o), l[zt] = n, l[jt] = t, Cn(l, o, t), wt(l), n.stateNode = l) : n.memoizedState = wy(n.type, t.memoizedProps, n.pendingProps, t.memoizedState), null;
   case 27:
    return fe(n), t === null && bt && (l = n.stateNode = xy(n.type, n.pendingProps, re.current), Dn = n, Or = !0, u = Yt, ko(n.type) ? (tp = u, Yt = Rr(l.firstChild)) : Yt = u), xn(t, n, n.pendingProps.children, o), mc(t, n), t === null && (n.flags |= 4194304), n.child;
   case 5:
    return t === null && bt && ((u = l = Yt) && (l = M2(l, n.type, n.pendingProps, Or), l !== null ? (n.stateNode = l, Dn = n, Yt = Rr(l.firstChild), Or = !1, u = !0) : u = !1), u || Zo(n)), fe(n), u = n.type, p = n.pendingProps, x = t !== null ? t.memoizedProps : null, l = p.children, Qf(u, p) ? l = null : x !== null && Qf(u, x) && (n.flags |= 32), n.memoizedState !== null && (u = Fd(t, n, YS, null, null, o), Ol._currentValue = u), mc(t, n), xn(t, n, l, o), n.child;
   case 6:
    return t === null && bt && ((t = o = Yt) && (o = O2(o, n.pendingProps, Or), o !== null ? (n.stateNode = o, Dn = n, Yt = null, t = !0) : t = !1), t || Zo(n)), null;
   case 13:
    return gv(t, n, o);
   case 4:
    return ge(n, n.stateNode.containerInfo), l = n.pendingProps, t === null ? n.child = Ga(n, null, l, o) : xn(t, n, l, o), n.child;
   case 11:
    return sv(t, n, n.type, n.pendingProps, o);
   case 7:
    return xn(t, n, n.pendingProps, o), n.child;
   case 8:
    return xn(t, n, n.pendingProps.children, o), n.child;
   case 12:
    return xn(t, n, n.pendingProps.children, o), n.child;
   case 10:
    return l = n.pendingProps, go(n, n.type, l.value), xn(t, n, l.children, o), n.child;
   case 9:
    return u = n.type._context, l = n.pendingProps.children, ea(n), u = Tn(u), l = l(u), n.flags |= 1, xn(t, n, l, o), n.child;
   case 14:
    return cv(t, n, n.type, n.pendingProps, o);
   case 15:
    return uv(t, n, n.type, n.pendingProps, o);
   case 19:
    return yv(t, n, o);
   case 31:
    return l = n.pendingProps, o = n.mode, l = {
     mode: l.mode,
     children: l.children
    }, t === null ? (o = gc(l, o), o.ref = n.ref, n.child = o, o.return = n, n = o) : (o = Fr(t.child, l), o.ref = n.ref, n.child = o, o.return = n, n = o), n;
   case 22:
    return dv(t, n, o);
   case 24:
    return ea(n), l = Tn(cn), t === null ? (u = Id(), u === null && (u = $t, p = _d(), u.pooledCache = p, p.refCount++, p !== null && (u.pooledCacheLanes |= o), u = p), n.memoizedState = {
     parent: l,
     cache: u
    }, Hd(n), go(n, cn, u)) : ((t.lanes & o) !== 0 && (qd(t, n), ll(n, null, null, o), il()), u = t.memoizedState, p = n.memoizedState, u.parent !== l ? (u = {
     parent: l,
     cache: l
    }, n.memoizedState = u, n.lanes === 0 && (n.memoizedState = n.updateQueue.baseState = u), go(n, cn, l)) : (l = p.cache, go(n, cn, l), l !== u.cache && $d(n, [cn], o, !0))), xn(t, n, n.pendingProps.children, o), n.child;
   case 29:
    throw n.pendingProps
  }
  throw Error(i(156, n.tag))
 }

 function ro(t) {
  t.flags |= 4
 }

 function xv(t, n) {
  if (n.type !== "stylesheet" || (n.state.loading & 4) !== 0) t.flags &= -16777217;
  else if (t.flags |= 16777216, !My(n)) {
   if (n = sr.current, n !== null && ((ht & 4194048) === ht ? Dr !== null : (ht & 62914560) !== ht && (ht & 536870912) === 0 || n !== Dr)) throw ol = Pd, rg;
   t.flags |= 8192
  }
 }

 function vc(t, n) {
  n !== null && (t.flags |= 4), t.flags & 16384 && (n = t.tag !== 22 ? Jn() : 536870912, t.lanes |= n, Fa |= n)
 }

 function hl(t, n) {
  if (!bt) switch (t.tailMode) {
   case "hidden":
    n = t.tail;
    for (var o = null; n !== null;) n.alternate !== null && (o = n), n = n.sibling;
    o === null ? t.tail = null : o.sibling = null;
    break;
   case "collapsed":
    o = t.tail;
    for (var l = null; o !== null;) o.alternate !== null && (l = o), o = o.sibling;
    l === null ? n || t.tail === null ? t.tail = null : t.tail.sibling = null : l.sibling = null
  }
 }

 function Gt(t) {
  var n = t.alternate !== null && t.alternate.child === t.child,
   o = 0,
   l = 0;
  if (n)
   for (var u = t.child; u !== null;) o |= u.lanes | u.childLanes, l |= u.subtreeFlags & 65011712, l |= u.flags & 65011712, u.return = t, u = u.sibling;
  else
   for (u = t.child; u !== null;) o |= u.lanes | u.childLanes, l |= u.subtreeFlags, l |= u.flags, u.return = t, u = u.sibling;
  return t.subtreeFlags |= l, t.childLanes = o, n
 }

 function t2(t, n, o) {
  var l = n.pendingProps;
  switch (jd(n), n.tag) {
   case 31:
   case 16:
   case 15:
   case 0:
   case 11:
   case 7:
   case 8:
   case 12:
   case 9:
   case 14:
    return Gt(n), null;
   case 1:
    return Gt(n), null;
   case 3:
    return o = n.stateNode, l = null, t !== null && (l = t.memoizedState.cache), n.memoizedState.cache !== l && (n.flags |= 2048), Jr(cn), Te(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (t === null || t.child === null) && (Qi(n) ? ro(n) : t === null || t.memoizedState.isDehydrated && (n.flags & 256) === 0 || (n.flags |= 1024, Zm())), Gt(n), null;
   case 26:
    return o = n.memoizedState, t === null ? (ro(n), o !== null ? (Gt(n), xv(n, o)) : (Gt(n), n.flags &= -16777217)) : o ? o !== t.memoizedState ? (ro(n), Gt(n), xv(n, o)) : (Gt(n), n.flags &= -16777217) : (t.memoizedProps !== l && ro(n), Gt(n), n.flags &= -16777217), null;
   case 27:
    Oe(n), o = re.current;
    var u = n.type;
    if (t !== null && n.stateNode != null) t.memoizedProps !== l && ro(n);
    else {
     if (!l) {
      if (n.stateNode === null) throw Error(i(166));
      return Gt(n), null
     }
     t = ce.current, Qi(n) ? Km(n) : (t = xy(u, l, o), n.stateNode = t, ro(n))
    }
    return Gt(n), null;
   case 5:
    if (Oe(n), o = n.type, t !== null && n.stateNode != null) t.memoizedProps !== l && ro(n);
    else {
     if (!l) {
      if (n.stateNode === null) throw Error(i(166));
      return Gt(n), null
     }
     if (t = ce.current, Qi(n)) Km(n);
     else {
      switch (u = Dc(re.current), t) {
       case 1:
        t = u.createElementNS("http://www.w3.org/2000/svg", o);
        break;
       case 2:
        t = u.createElementNS("http://www.w3.org/1998/Math/MathML", o);
        break;
       default:
        switch (o) {
         case "svg":
          t = u.createElementNS("http://www.w3.org/2000/svg", o);
          break;
         case "math":
          t = u.createElementNS("http://www.w3.org/1998/Math/MathML", o);
          break;
         case "script":
          t = u.createElement("div"), t.innerHTML = "<script><\/script>", t = t.removeChild(t.firstChild);
          break;
         case "select":
          t = typeof l.is == "string" ? u.createElement("select", {
           is: l.is
          }) : u.createElement("select"), l.multiple ? t.multiple = !0 : l.size && (t.size = l.size);
          break;
         default:
          t = typeof l.is == "string" ? u.createElement(o, {
           is: l.is
          }) : u.createElement(o)
        }
      }
      t[zt] = n, t[jt] = l;
      e: for (u = n.child; u !== null;) {
       if (u.tag === 5 || u.tag === 6) t.appendChild(u.stateNode);
       else if (u.tag !== 4 && u.tag !== 27 && u.child !== null) {
        u.child.return = u, u = u.child;
        continue
       }
       if (u === n) break e;
       for (; u.sibling === null;) {
        if (u.return === null || u.return === n) break e;
        u = u.return
       }
       u.sibling.return = u.return, u = u.sibling
      }
      n.stateNode = t;
      e: switch (Cn(t, o, l), o) {
       case "button":
       case "input":
       case "select":
       case "textarea":
        t = !!l.autoFocus;
        break e;
       case "img":
        t = !0;
        break e;
       default:
        t = !1
      }
      t && ro(n)
     }
    }
    return Gt(n), n.flags &= -16777217, null;
   case 6:
    if (t && n.stateNode != null) t.memoizedProps !== l && ro(n);
    else {
     if (typeof l != "string" && n.stateNode === null) throw Error(i(166));
     if (t = re.current, Qi(n)) {
      if (t = n.stateNode, o = n.memoizedProps, l = null, u = Dn, u !== null) switch (u.tag) {
       case 27:
       case 5:
        l = u.memoizedProps
      }
      t[zt] = n, t = !!(t.nodeValue === o || l !== null && l.suppressHydrationWarning === !0 || py(t.nodeValue, o)), t || Zo(n)
     } else t = Dc(t).createTextNode(l), t[zt] = n, n.stateNode = t
    }
    return Gt(n), null;
   case 13:
    if (l = n.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
     if (u = Qi(n), l !== null && l.dehydrated !== null) {
      if (t === null) {
       if (!u) throw Error(i(318));
       if (u = n.memoizedState, u = u !== null ? u.dehydrated : null, !u) throw Error(i(317));
       u[zt] = n
      } else Zi(), (n.flags & 128) === 0 && (n.memoizedState = null), n.flags |= 4;
      Gt(n), u = !1
     } else u = Zm(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = u), u = !0;
     if (!u) return n.flags & 256 ? (to(n), n) : (to(n), null)
    }
    if (to(n), (n.flags & 128) !== 0) return n.lanes = o, n;
    if (o = l !== null, t = t !== null && t.memoizedState !== null, o) {
     l = n.child, u = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (u = l.alternate.memoizedState.cachePool.pool);
     var p = null;
     l.memoizedState !== null && l.memoizedState.cachePool !== null && (p = l.memoizedState.cachePool.pool), p !== u && (l.flags |= 2048)
    }
    return o !== t && o && (n.child.flags |= 8192), vc(n, n.updateQueue), Gt(n), null;
   case 4:
    return Te(), t === null && Yf(n.stateNode.containerInfo), Gt(n), null;
   case 10:
    return Jr(n.type), Gt(n), null;
   case 19:
    if (ee(un), u = n.memoizedState, u === null) return Gt(n), null;
    if (l = (n.flags & 128) !== 0, p = u.rendering, p === null)
     if (l) hl(u, !1);
     else {
      if (Xt !== 0 || t !== null && (t.flags & 128) !== 0)
       for (t = n.child; t !== null;) {
        if (p = fc(t), p !== null) {
         for (n.flags |= 128, hl(u, !1), t = p.updateQueue, n.updateQueue = t, vc(n, t), n.subtreeFlags = 0, t = o, o = n.child; o !== null;) Wm(o, t), o = o.sibling;
         return ne(un, un.current & 1 | 2), n.child
        }
        t = t.sibling
       }
      u.tail !== null && Ne() > xc && (n.flags |= 128, l = !0, hl(u, !1), n.lanes = 4194304)
     }
    else {
     if (!l)
      if (t = fc(p), t !== null) {
       if (n.flags |= 128, l = !0, t = t.updateQueue, n.updateQueue = t, vc(n, t), hl(u, !0), u.tail === null && u.tailMode === "hidden" && !p.alternate && !bt) return Gt(n), null
      } else 2 * Ne() - u.renderingStartTime > xc && o !== 536870912 && (n.flags |= 128, l = !0, hl(u, !1), n.lanes = 4194304);
     u.isBackwards ? (p.sibling = n.child, n.child = p) : (t = u.last, t !== null ? t.sibling = p : n.child = p, u.last = p)
    }
    return u.tail !== null ? (n = u.tail, u.rendering = n, u.tail = n.sibling, u.renderingStartTime = Ne(), n.sibling = null, t = un.current, ne(un, l ? t & 1 | 2 : t & 1), n) : (Gt(n), null);
   case 22:
   case 23:
    return to(n), Xd(), l = n.memoizedState !== null, t !== null ? t.memoizedState !== null !== l && (n.flags |= 8192) : l && (n.flags |= 8192), l ? (o & 536870912) !== 0 && (n.flags & 128) === 0 && (Gt(n), n.subtreeFlags & 6 && (n.flags |= 8192)) : Gt(n), o = n.updateQueue, o !== null && vc(n, o.retryQueue), o = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (o = t.memoizedState.cachePool.pool), l = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (l = n.memoizedState.cachePool.pool), l !== o && (n.flags |= 2048), t !== null && ee(ta), null;
   case 24:
    return o = null, t !== null && (o = t.memoizedState.cache), n.memoizedState.cache !== o && (n.flags |= 2048), Jr(cn), Gt(n), null;
   case 25:
    return null;
   case 30:
    return null
  }
  throw Error(i(156, n.tag))
 }

 function n2(t, n) {
  switch (jd(n), n.tag) {
   case 1:
    return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
   case 3:
    return Jr(cn), Te(), t = n.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (n.flags = t & -65537 | 128, n) : null;
   case 26:
   case 27:
   case 5:
    return Oe(n), null;
   case 13:
    if (to(n), t = n.memoizedState, t !== null && t.dehydrated !== null) {
     if (n.alternate === null) throw Error(i(340));
     Zi()
    }
    return t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
   case 19:
    return ee(un), null;
   case 4:
    return Te(), null;
   case 10:
    return Jr(n.type), null;
   case 22:
   case 23:
    return to(n), Xd(), t !== null && ee(ta), t = n.flags, t & 65536 ? (n.flags = t & -65537 | 128, n) : null;
   case 24:
    return Jr(cn), null;
   case 25:
    return null;
   default:
    return null
  }
 }

 function Sv(t, n) {
  switch (jd(n), n.tag) {
   case 3:
    Jr(cn), Te();
    break;
   case 26:
   case 27:
   case 5:
    Oe(n);
    break;
   case 4:
    Te();
    break;
   case 13:
    to(n);
    break;
   case 19:
    ee(un);
    break;
   case 10:
    Jr(n.type);
    break;
   case 22:
   case 23:
    to(n), Xd(), t !== null && ee(ta);
    break;
   case 24:
    Jr(cn)
  }
 }

 function ml(t, n) {
  try {
   var o = n.updateQueue,
    l = o !== null ? o.lastEffect : null;
   if (l !== null) {
    var u = l.next;
    o = u;
    do {
     if ((o.tag & t) === t) {
      l = void 0;
      var p = o.create,
       x = o.inst;
      l = p(), x.destroy = l
     }
     o = o.next
    } while (o !== u)
   }
  } catch (M) {
   Nt(n, n.return, M)
  }
 }

 function wo(t, n, o) {
  try {
   var l = n.updateQueue,
    u = l !== null ? l.lastEffect : null;
   if (u !== null) {
    var p = u.next;
    l = p;
    do {
     if ((l.tag & t) === t) {
      var x = l.inst,
       M = x.destroy;
      if (M !== void 0) {
       x.destroy = void 0, u = n;
       var B = o,
        K = M;
       try {
        K()
       } catch (ie) {
        Nt(u, B, ie)
       }
      }
     }
     l = l.next
    } while (l !== p)
   }
  } catch (ie) {
   Nt(n, n.return, ie)
  }
 }

 function Cv(t) {
  var n = t.updateQueue;
  if (n !== null) {
   var o = t.stateNode;
   try {
    cg(n, o)
   } catch (l) {
    Nt(t, t.return, l)
   }
  }
 }

 function wv(t, n, o) {
  o.props = ra(t.type, t.memoizedProps), o.state = t.memoizedState;
  try {
   o.componentWillUnmount()
  } catch (l) {
   Nt(t, n, l)
  }
 }

 function gl(t, n) {
  try {
   var o = t.ref;
   if (o !== null) {
    switch (t.tag) {
     case 26:
     case 27:
     case 5:
      var l = t.stateNode;
      break;
     case 30:
      l = t.stateNode;
      break;
     default:
      l = t.stateNode
    }
    typeof o == "function" ? t.refCleanup = o(l) : o.current = l
   }
  } catch (u) {
   Nt(t, n, u)
  }
 }

 function kr(t, n) {
  var o = t.ref,
   l = t.refCleanup;
  if (o !== null)
   if (typeof l == "function") try {
    l()
   } catch (u) {
    Nt(t, n, u)
   } finally {
    t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null)
   } else if (typeof o == "function") try {
    o(null)
   } catch (u) {
    Nt(t, n, u)
   } else o.current = null
 }

 function Rv(t) {
  var n = t.type,
   o = t.memoizedProps,
   l = t.stateNode;
  try {
   e: switch (n) {
    case "button":
    case "input":
    case "select":
    case "textarea":
     o.autoFocus && l.focus();
     break e;
    case "img":
     o.src ? l.src = o.src : o.srcSet && (l.srcset = o.srcSet)
   }
  }
  catch (u) {
   Nt(t, t.return, u)
  }
 }

 function Cf(t, n, o) {
  try {
   var l = t.stateNode;
   w2(l, t.type, o, n), l[jt] = n
  } catch (u) {
   Nt(t, t.return, u)
  }
 }

 function Ev(t) {
  return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && ko(t.type) || t.tag === 4
 }

 function wf(t) {
  e: for (;;) {
   for (; t.sibling === null;) {
    if (t.return === null || Ev(t.return)) return null;
    t = t.return
   }
   for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18;) {
    if (t.tag === 27 && ko(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue e;
    t.child.return = t, t = t.child
   }
   if (!(t.flags & 2)) return t.stateNode
  }
 }

 function Rf(t, n, o) {
  var l = t.tag;
  if (l === 5 || l === 6) t = t.stateNode, n ? (o.nodeType === 9 ? o.body : o.nodeName === "HTML" ? o.ownerDocument.body : o).insertBefore(t, n) : (n = o.nodeType === 9 ? o.body : o.nodeName === "HTML" ? o.ownerDocument.body : o, n.appendChild(t), o = o._reactRootContainer, o != null || n.onclick !== null || (n.onclick = Oc));
  else if (l !== 4 && (l === 27 && ko(t.type) && (o = t.stateNode, n = null), t = t.child, t !== null))
   for (Rf(t, n, o), t = t.sibling; t !== null;) Rf(t, n, o), t = t.sibling
 }

 function yc(t, n, o) {
  var l = t.tag;
  if (l === 5 || l === 6) t = t.stateNode, n ? o.insertBefore(t, n) : o.appendChild(t);
  else if (l !== 4 && (l === 27 && ko(t.type) && (o = t.stateNode), t = t.child, t !== null))
   for (yc(t, n, o), t = t.sibling; t !== null;) yc(t, n, o), t = t.sibling
 }

 function Tv(t) {
  var n = t.stateNode,
   o = t.memoizedProps;
  try {
   for (var l = t.type, u = n.attributes; u.length;) n.removeAttributeNode(u[0]);
   Cn(n, l, o), n[zt] = t, n[jt] = o
  } catch (p) {
   Nt(t, t.return, p)
  }
 }
 var oo = !1,
  en = !1,
  Ef = !1,
  Av = typeof WeakSet == "function" ? WeakSet : Set,
  mn = null;

 function r2(t, n) {
  if (t = t.containerInfo, Ff = Bc, t = _m(t), Cd(t)) {
   if ("selectionStart" in t) var o = {
    start: t.selectionStart,
    end: t.selectionEnd
   };
   else e: {
    o = (o = t.ownerDocument) && o.defaultView || window;
    var l = o.getSelection && o.getSelection();
    if (l && l.rangeCount !== 0) {
     o = l.anchorNode;
     var u = l.anchorOffset,
      p = l.focusNode;
     l = l.focusOffset;
     try {
      o.nodeType, p.nodeType
     } catch {
      o = null;
      break e
     }
     var x = 0,
      M = -1,
      B = -1,
      K = 0,
      ie = 0,
      ue = t,
      J = null;
     t: for (;;) {
      for (var te; ue !== o || u !== 0 && ue.nodeType !== 3 || (M = x + u), ue !== p || l !== 0 && ue.nodeType !== 3 || (B = x + l), ue.nodeType === 3 && (x += ue.nodeValue.length), (te = ue.firstChild) !== null;) J = ue, ue = te;
      for (;;) {
       if (ue === t) break t;
       if (J === o && ++K === u && (M = x), J === p && ++ie === l && (B = x), (te = ue.nextSibling) !== null) break;
       ue = J, J = ue.parentNode
      }
      ue = te
     }
     o = M === -1 || B === -1 ? null : {
      start: M,
      end: B
     }
    } else o = null
   }
   o = o || {
    start: 0,
    end: 0
   }
  } else o = null;
  for (Kf = {
    focusedElem: t,
    selectionRange: o
   }, Bc = !1, mn = n; mn !== null;)
   if (n = mn, t = n.child, (n.subtreeFlags & 1024) !== 0 && t !== null) t.return = n, mn = t;
   else
    for (; mn !== null;) {
     switch (n = mn, p = n.alternate, t = n.flags, n.tag) {
      case 0:
       break;
      case 11:
      case 15:
       break;
      case 1:
       if ((t & 1024) !== 0 && p !== null) {
        t = void 0, o = n, u = p.memoizedProps, p = p.memoizedState, l = o.stateNode;
        try {
         var We = ra(o.type, u, o.elementType === o.type);
         t = l.getSnapshotBeforeUpdate(We, p), l.__reactInternalSnapshotBeforeUpdate = t
        } catch (_e) {
         Nt(o, o.return, _e)
        }
       }
       break;
      case 3:
       if ((t & 1024) !== 0) {
        if (t = n.stateNode.containerInfo, o = t.nodeType, o === 9) Jf(t);
        else if (o === 1) switch (t.nodeName) {
         case "HEAD":
         case "HTML":
         case "BODY":
          Jf(t);
          break;
         default:
          t.textContent = ""
        }
       }
       break;
      case 5:
      case 26:
      case 27:
      case 6:
      case 4:
      case 17:
       break;
      default:
       if ((t & 1024) !== 0) throw Error(i(163))
     }
     if (t = n.sibling, t !== null) {
      t.return = n.return, mn = t;
      break
     }
     mn = n.return
    }
 }

 function Mv(t, n, o) {
  var l = o.flags;
  switch (o.tag) {
   case 0:
   case 11:
   case 15:
    Ro(t, o), l & 4 && ml(5, o);
    break;
   case 1:
    if (Ro(t, o), l & 4)
     if (t = o.stateNode, n === null) try {
      t.componentDidMount()
     } catch (x) {
      Nt(o, o.return, x)
     } else {
      var u = ra(o.type, n.memoizedProps);
      n = n.memoizedState;
      try {
       t.componentDidUpdate(u, n, t.__reactInternalSnapshotBeforeUpdate)
      } catch (x) {
       Nt(o, o.return, x)
      }
     }
    l & 64 && Cv(o), l & 512 && gl(o, o.return);
    break;
   case 3:
    if (Ro(t, o), l & 64 && (t = o.updateQueue, t !== null)) {
     if (n = null, o.child !== null) switch (o.child.tag) {
      case 27:
      case 5:
       n = o.child.stateNode;
       break;
      case 1:
       n = o.child.stateNode
     }
     try {
      cg(t, n)
     } catch (x) {
      Nt(o, o.return, x)
     }
    }
    break;
   case 27:
    n === null && l & 4 && Tv(o);
   case 26:
   case 5:
    Ro(t, o), n === null && l & 4 && Rv(o), l & 512 && gl(o, o.return);
    break;
   case 12:
    Ro(t, o);
    break;
   case 13:
    Ro(t, o), l & 4 && kv(t, o), l & 64 && (t = o.memoizedState, t !== null && (t = t.dehydrated, t !== null && (o = f2.bind(null, o), D2(t, o))));
    break;
   case 22:
    if (l = o.memoizedState !== null || oo, !l) {
     n = n !== null && n.memoizedState !== null || en, u = oo;
     var p = en;
     oo = l, (en = n) && !p ? Eo(t, o, (o.subtreeFlags & 8772) !== 0) : Ro(t, o), oo = u, en = p
    }
    break;
   case 30:
    break;
   default:
    Ro(t, o)
  }
 }

 function Ov(t) {
  var n = t.alternate;
  n !== null && (t.alternate = null, Ov(n)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (n = t.stateNode, n !== null && Pi(n)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null
 }
 var Ht = null,
  $n = !1;

 function ao(t, n, o) {
  for (o = o.child; o !== null;) Dv(t, n, o), o = o.sibling
 }

 function Dv(t, n, o) {
  if (ve && typeof ve.onCommitFiberUnmount == "function") try {
   ve.onCommitFiberUnmount(me, o)
  } catch {}
  switch (o.tag) {
   case 26:
    en || kr(o, n), ao(t, n, o), o.memoizedState ? o.memoizedState.count-- : o.stateNode && (o = o.stateNode, o.parentNode.removeChild(o));
    break;
   case 27:
    en || kr(o, n);
    var l = Ht,
     u = $n;
    ko(o.type) && (Ht = o.stateNode, $n = !1), ao(t, n, o), El(o.stateNode), Ht = l, $n = u;
    break;
   case 5:
    en || kr(o, n);
   case 6:
    if (l = Ht, u = $n, Ht = null, ao(t, n, o), Ht = l, $n = u, Ht !== null)
     if ($n) try {
      (Ht.nodeType === 9 ? Ht.body : Ht.nodeName === "HTML" ? Ht.ownerDocument.body : Ht).removeChild(o.stateNode)
     } catch (p) {
      Nt(o, n, p)
     } else try {
      Ht.removeChild(o.stateNode)
     } catch (p) {
      Nt(o, n, p)
     }
    break;
   case 18:
    Ht !== null && ($n ? (t = Ht, yy(t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, o.stateNode), jl(t)) : yy(Ht, o.stateNode));
    break;
   case 4:
    l = Ht, u = $n, Ht = o.stateNode.containerInfo, $n = !0, ao(t, n, o), Ht = l, $n = u;
    break;
   case 0:
   case 11:
   case 14:
   case 15:
    en || wo(2, o, n), en || wo(4, o, n), ao(t, n, o);
    break;
   case 1:
    en || (kr(o, n), l = o.stateNode, typeof l.componentWillUnmount == "function" && wv(o, n, l)), ao(t, n, o);
    break;
   case 21:
    ao(t, n, o);
    break;
   case 22:
    en = (l = en) || o.memoizedState !== null, ao(t, n, o), en = l;
    break;
   default:
    ao(t, n, o)
  }
 }

 function kv(t, n) {
  if (n.memoizedState === null && (t = n.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null)))) try {
   jl(t)
  } catch (o) {
   Nt(n, n.return, o)
  }
 }

 function o2(t) {
  switch (t.tag) {
   case 13:
   case 19:
    var n = t.stateNode;
    return n === null && (n = t.stateNode = new Av), n;
   case 22:
    return t = t.stateNode, n = t._retryCache, n === null && (n = t._retryCache = new Av), n;
   default:
    throw Error(i(435, t.tag))
  }
 }

 function Tf(t, n) {
  var o = o2(t);
  n.forEach(function(l) {
   var u = p2.bind(null, t, l);
   o.has(l) || (o.add(l), l.then(u, u))
  })
 }

 function Gn(t, n) {
  var o = n.deletions;
  if (o !== null)
   for (var l = 0; l < o.length; l++) {
    var u = o[l],
     p = t,
     x = n,
     M = x;
    e: for (; M !== null;) {
     switch (M.tag) {
      case 27:
       if (ko(M.type)) {
        Ht = M.stateNode, $n = !1;
        break e
       }
       break;
      case 5:
       Ht = M.stateNode, $n = !1;
       break e;
      case 3:
      case 4:
       Ht = M.stateNode.containerInfo, $n = !0;
       break e
     }
     M = M.return
    }
    if (Ht === null) throw Error(i(160));
    Dv(p, x, u), Ht = null, $n = !1, p = u.alternate, p !== null && (p.return = null), u.return = null
   }
  if (n.subtreeFlags & 13878)
   for (n = n.child; n !== null;) zv(n, t), n = n.sibling
 }
 var wr = null;

 function zv(t, n) {
  var o = t.alternate,
   l = t.flags;
  switch (t.tag) {
   case 0:
   case 11:
   case 14:
   case 15:
    Gn(n, t), Yn(t), l & 4 && (wo(3, t, t.return), ml(3, t), wo(5, t, t.return));
    break;
   case 1:
    Gn(n, t), Yn(t), l & 512 && (en || o === null || kr(o, o.return)), l & 64 && oo && (t = t.updateQueue, t !== null && (l = t.callbacks, l !== null && (o = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = o === null ? l : o.concat(l))));
    break;
   case 26:
    var u = wr;
    if (Gn(n, t), Yn(t), l & 512 && (en || o === null || kr(o, o.return)), l & 4) {
     var p = o !== null ? o.memoizedState : null;
     if (l = t.memoizedState, o === null)
      if (l === null)
       if (t.stateNode === null) {
        e: {
         l = t.type,
         o = t.memoizedProps,
         u = u.ownerDocument || u;t: switch (l) {
          case "title":
           p = u.getElementsByTagName("title")[0], (!p || p[Sr] || p[zt] || p.namespaceURI === "http://www.w3.org/2000/svg" || p.hasAttribute("itemprop")) && (p = u.createElement(l), u.head.insertBefore(p, u.querySelector("head > title"))), Cn(p, l, o), p[zt] = t, wt(p), l = p;
           break e;
          case "link":
           var x = Ty("link", "href", u).get(l + (o.href || ""));
           if (x) {
            for (var M = 0; M < x.length; M++)
             if (p = x[M], p.getAttribute("href") === (o.href == null || o.href === "" ? null : o.href) && p.getAttribute("rel") === (o.rel == null ? null : o.rel) && p.getAttribute("title") === (o.title == null ? null : o.title) && p.getAttribute("crossorigin") === (o.crossOrigin == null ? null : o.crossOrigin)) {
              x.splice(M, 1);
              break t
             }
           }
           p = u.createElement(l), Cn(p, l, o), u.head.appendChild(p);
           break;
          case "meta":
           if (x = Ty("meta", "content", u).get(l + (o.content || ""))) {
            for (M = 0; M < x.length; M++)
             if (p = x[M], p.getAttribute("content") === (o.content == null ? null : "" + o.content) && p.getAttribute("name") === (o.name == null ? null : o.name) && p.getAttribute("property") === (o.property == null ? null : o.property) && p.getAttribute("http-equiv") === (o.httpEquiv == null ? null : o.httpEquiv) && p.getAttribute("charset") === (o.charSet == null ? null : o.charSet)) {
              x.splice(M, 1);
              break t
             }
           }
           p = u.createElement(l), Cn(p, l, o), u.head.appendChild(p);
           break;
          default:
           throw Error(i(468, l))
         }
         p[zt] = t,
         wt(p),
         l = p
        }
        t.stateNode = l
       }
     else Ay(u, t.type, t.stateNode);
     else t.stateNode = Ey(u, l, t.memoizedProps);
     else p !== l ? (p === null ? o.stateNode !== null && (o = o.stateNode, o.parentNode.removeChild(o)) : p.count--, l === null ? Ay(u, t.type, t.stateNode) : Ey(u, l, t.memoizedProps)) : l === null && t.stateNode !== null && Cf(t, t.memoizedProps, o.memoizedProps)
    }
    break;
   case 27:
    Gn(n, t), Yn(t), l & 512 && (en || o === null || kr(o, o.return)), o !== null && l & 4 && Cf(t, t.memoizedProps, o.memoizedProps);
    break;
   case 5:
    if (Gn(n, t), Yn(t), l & 512 && (en || o === null || kr(o, o.return)), t.flags & 32) {
     u = t.stateNode;
     try {
      Aa(u, "")
     } catch (te) {
      Nt(t, t.return, te)
     }
    }
    l & 4 && t.stateNode != null && (u = t.memoizedProps, Cf(t, u, o !== null ? o.memoizedProps : u)), l & 1024 && (Ef = !0);
    break;
   case 6:
    if (Gn(n, t), Yn(t), l & 4) {
     if (t.stateNode === null) throw Error(i(162));
     l = t.memoizedProps, o = t.stateNode;
     try {
      o.nodeValue = l
     } catch (te) {
      Nt(t, t.return, te)
     }
    }
    break;
   case 3:
    if (jc = null, u = wr, wr = kc(n.containerInfo), Gn(n, t), wr = u, Yn(t), l & 4 && o !== null && o.memoizedState.isDehydrated) try {
     jl(n.containerInfo)
    } catch (te) {
     Nt(t, t.return, te)
    }
    Ef && (Ef = !1, jv(t));
    break;
   case 4:
    l = wr, wr = kc(t.stateNode.containerInfo), Gn(n, t), Yn(t), wr = l;
    break;
   case 12:
    Gn(n, t), Yn(t);
    break;
   case 13:
    Gn(n, t), Yn(t), t.child.flags & 8192 && t.memoizedState !== null != (o !== null && o.memoizedState !== null) && (zf = Ne()), l & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, Tf(t, l)));
    break;
   case 22:
    u = t.memoizedState !== null;
    var B = o !== null && o.memoizedState !== null,
     K = oo,
     ie = en;
    if (oo = K || u, en = ie || B, Gn(n, t), en = ie, oo = K, Yn(t), l & 8192) e: for (n = t.stateNode, n._visibility = u ? n._visibility & -2 : n._visibility | 1, u && (o === null || B || oo || en || oa(t)), o = null, n = t;;) {
     if (n.tag === 5 || n.tag === 26) {
      if (o === null) {
       B = o = n;
       try {
        if (p = B.stateNode, u) x = p.style, typeof x.setProperty == "function" ? x.setProperty("display", "none", "important") : x.display = "none";
        else {
         M = B.stateNode;
         var ue = B.memoizedProps.style,
          J = ue != null && ue.hasOwnProperty("display") ? ue.display : null;
         M.style.display = J == null || typeof J == "boolean" ? "" : ("" + J).trim()
        }
       } catch (te) {
        Nt(B, B.return, te)
       }
      }
     } else if (n.tag === 6) {
      if (o === null) {
       B = n;
       try {
        B.stateNode.nodeValue = u ? "" : B.memoizedProps
       } catch (te) {
        Nt(B, B.return, te)
       }
      }
     } else if ((n.tag !== 22 && n.tag !== 23 || n.memoizedState === null || n === t) && n.child !== null) {
      n.child.return = n, n = n.child;
      continue
     }
     if (n === t) break e;
     for (; n.sibling === null;) {
      if (n.return === null || n.return === t) break e;
      o === n && (o = null), n = n.return
     }
     o === n && (o = null), n.sibling.return = n.return, n = n.sibling
    }
    l & 4 && (l = t.updateQueue, l !== null && (o = l.retryQueue, o !== null && (l.retryQueue = null, Tf(t, o))));
    break;
   case 19:
    Gn(n, t), Yn(t), l & 4 && (l = t.updateQueue, l !== null && (t.updateQueue = null, Tf(t, l)));
    break;
   case 30:
    break;
   case 21:
    break;
   default:
    Gn(n, t), Yn(t)
  }
 }

 function Yn(t) {
  var n = t.flags;
  if (n & 2) {
   try {
    for (var o, l = t.return; l !== null;) {
     if (Ev(l)) {
      o = l;
      break
     }
     l = l.return
    }
    if (o == null) throw Error(i(160));
    switch (o.tag) {
     case 27:
      var u = o.stateNode,
       p = wf(t);
      yc(t, p, u);
      break;
     case 5:
      var x = o.stateNode;
      o.flags & 32 && (Aa(x, ""), o.flags &= -33);
      var M = wf(t);
      yc(t, M, x);
      break;
     case 3:
     case 4:
      var B = o.stateNode.containerInfo,
       K = wf(t);
      Rf(t, K, B);
      break;
     default:
      throw Error(i(161))
    }
   } catch (ie) {
    Nt(t, t.return, ie)
   }
   t.flags &= -3
  }
  n & 4096 && (t.flags &= -4097)
 }

 function jv(t) {
  if (t.subtreeFlags & 1024)
   for (t = t.child; t !== null;) {
    var n = t;
    jv(n), n.tag === 5 && n.flags & 1024 && n.stateNode.reset(), t = t.sibling
   }
 }

 function Ro(t, n) {
  if (n.subtreeFlags & 8772)
   for (n = n.child; n !== null;) Mv(t, n.alternate, n), n = n.sibling
 }

 function oa(t) {
  for (t = t.child; t !== null;) {
   var n = t;
   switch (n.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
     wo(4, n, n.return), oa(n);
     break;
    case 1:
     kr(n, n.return);
     var o = n.stateNode;
     typeof o.componentWillUnmount == "function" && wv(n, n.return, o), oa(n);
     break;
    case 27:
     El(n.stateNode);
    case 26:
    case 5:
     kr(n, n.return), oa(n);
     break;
    case 22:
     n.memoizedState === null && oa(n);
     break;
    case 30:
     oa(n);
     break;
    default:
     oa(n)
   }
   t = t.sibling
  }
 }

 function Eo(t, n, o) {
  for (o = o && (n.subtreeFlags & 8772) !== 0, n = n.child; n !== null;) {
   var l = n.alternate,
    u = t,
    p = n,
    x = p.flags;
   switch (p.tag) {
    case 0:
    case 11:
    case 15:
     Eo(u, p, o), ml(4, p);
     break;
    case 1:
     if (Eo(u, p, o), l = p, u = l.stateNode, typeof u.componentDidMount == "function") try {
      u.componentDidMount()
     } catch (K) {
      Nt(l, l.return, K)
     }
     if (l = p, u = l.updateQueue, u !== null) {
      var M = l.stateNode;
      try {
       var B = u.shared.hiddenCallbacks;
       if (B !== null)
        for (u.shared.hiddenCallbacks = null, u = 0; u < B.length; u++) sg(B[u], M)
      } catch (K) {
       Nt(l, l.return, K)
      }
     }
     o && x & 64 && Cv(p), gl(p, p.return);
     break;
    case 27:
     Tv(p);
    case 26:
    case 5:
     Eo(u, p, o), o && l === null && x & 4 && Rv(p), gl(p, p.return);
     break;
    case 12:
     Eo(u, p, o);
     break;
    case 13:
     Eo(u, p, o), o && x & 4 && kv(u, p);
     break;
    case 22:
     p.memoizedState === null && Eo(u, p, o), gl(p, p.return);
     break;
    case 30:
     break;
    default:
     Eo(u, p, o)
   }
   n = n.sibling
  }
 }

 function Af(t, n) {
  var o = null;
  t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (o = t.memoizedState.cachePool.pool), t = null, n.memoizedState !== null && n.memoizedState.cachePool !== null && (t = n.memoizedState.cachePool.pool), t !== o && (t != null && t.refCount++, o != null && tl(o))
 }

 function Mf(t, n) {
  t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && tl(t))
 }

 function zr(t, n, o, l) {
  if (n.subtreeFlags & 10256)
   for (n = n.child; n !== null;) Nv(t, n, o, l), n = n.sibling
 }

 function Nv(t, n, o, l) {
  var u = n.flags;
  switch (n.tag) {
   case 0:
   case 11:
   case 15:
    zr(t, n, o, l), u & 2048 && ml(9, n);
    break;
   case 1:
    zr(t, n, o, l);
    break;
   case 3:
    zr(t, n, o, l), u & 2048 && (t = null, n.alternate !== null && (t = n.alternate.memoizedState.cache), n = n.memoizedState.cache, n !== t && (n.refCount++, t != null && tl(t)));
    break;
   case 12:
    if (u & 2048) {
     zr(t, n, o, l), t = n.stateNode;
     try {
      var p = n.memoizedProps,
       x = p.id,
       M = p.onPostCommit;
      typeof M == "function" && M(x, n.alternate === null ? "mount" : "update", t.passiveEffectDuration, -0)
     } catch (B) {
      Nt(n, n.return, B)
     }
    } else zr(t, n, o, l);
    break;
   case 13:
    zr(t, n, o, l);
    break;
   case 23:
    break;
   case 22:
    p = n.stateNode, x = n.alternate, n.memoizedState !== null ? p._visibility & 2 ? zr(t, n, o, l) : vl(t, n) : p._visibility & 2 ? zr(t, n, o, l) : (p._visibility |= 2, Ya(t, n, o, l, (n.subtreeFlags & 10256) !== 0)), u & 2048 && Af(x, n);
    break;
   case 24:
    zr(t, n, o, l), u & 2048 && Mf(n.alternate, n);
    break;
   default:
    zr(t, n, o, l)
  }
 }

 function Ya(t, n, o, l, u) {
  for (u = u && (n.subtreeFlags & 10256) !== 0, n = n.child; n !== null;) {
   var p = t,
    x = n,
    M = o,
    B = l,
    K = x.flags;
   switch (x.tag) {
    case 0:
    case 11:
    case 15:
     Ya(p, x, M, B, u), ml(8, x);
     break;
    case 23:
     break;
    case 22:
     var ie = x.stateNode;
     x.memoizedState !== null ? ie._visibility & 2 ? Ya(p, x, M, B, u) : vl(p, x) : (ie._visibility |= 2, Ya(p, x, M, B, u)), u && K & 2048 && Af(x.alternate, x);
     break;
    case 24:
     Ya(p, x, M, B, u), u && K & 2048 && Mf(x.alternate, x);
     break;
    default:
     Ya(p, x, M, B, u)
   }
   n = n.sibling
  }
 }

 function vl(t, n) {
  if (n.subtreeFlags & 10256)
   for (n = n.child; n !== null;) {
    var o = t,
     l = n,
     u = l.flags;
    switch (l.tag) {
     case 22:
      vl(o, l), u & 2048 && Af(l.alternate, l);
      break;
     case 24:
      vl(o, l), u & 2048 && Mf(l.alternate, l);
      break;
     default:
      vl(o, l)
    }
    n = n.sibling
   }
 }
 var yl = 8192;

 function Xa(t) {
  if (t.subtreeFlags & yl)
   for (t = t.child; t !== null;) Lv(t), t = t.sibling
 }

 function Lv(t) {
  switch (t.tag) {
   case 26:
    Xa(t), t.flags & yl && t.memoizedState !== null && q2(wr, t.memoizedState, t.memoizedProps);
    break;
   case 5:
    Xa(t);
    break;
   case 3:
   case 4:
    var n = wr;
    wr = kc(t.stateNode.containerInfo), Xa(t), wr = n;
    break;
   case 22:
    t.memoizedState === null && (n = t.alternate, n !== null && n.memoizedState !== null ? (n = yl, yl = 16777216, Xa(t), yl = n) : Xa(t));
    break;
   default:
    Xa(t)
  }
 }

 function Bv(t) {
  var n = t.alternate;
  if (n !== null && (t = n.child, t !== null)) {
   n.child = null;
   do n = t.sibling, t.sibling = null, t = n; while (t !== null)
  }
 }

 function bl(t) {
  var n = t.deletions;
  if ((t.flags & 16) !== 0) {
   if (n !== null)
    for (var o = 0; o < n.length; o++) {
     var l = n[o];
     mn = l, _v(l, t)
    }
   Bv(t)
  }
  if (t.subtreeFlags & 10256)
   for (t = t.child; t !== null;) $v(t), t = t.sibling
 }

 function $v(t) {
  switch (t.tag) {
   case 0:
   case 11:
   case 15:
    bl(t), t.flags & 2048 && wo(9, t, t.return);
    break;
   case 3:
    bl(t);
    break;
   case 12:
    bl(t);
    break;
   case 22:
    var n = t.stateNode;
    t.memoizedState !== null && n._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (n._visibility &= -3, bc(t)) : bl(t);
    break;
   default:
    bl(t)
  }
 }

 function bc(t) {
  var n = t.deletions;
  if ((t.flags & 16) !== 0) {
   if (n !== null)
    for (var o = 0; o < n.length; o++) {
     var l = n[o];
     mn = l, _v(l, t)
    }
   Bv(t)
  }
  for (t = t.child; t !== null;) {
   switch (n = t, n.tag) {
    case 0:
    case 11:
    case 15:
     wo(8, n, n.return), bc(n);
     break;
    case 22:
     o = n.stateNode, o._visibility & 2 && (o._visibility &= -3, bc(n));
     break;
    default:
     bc(n)
   }
   t = t.sibling
  }
 }

 function _v(t, n) {
  for (; mn !== null;) {
   var o = mn;
   switch (o.tag) {
    case 0:
    case 11:
    case 15:
     wo(8, o, n);
     break;
    case 23:
    case 22:
     if (o.memoizedState !== null && o.memoizedState.cachePool !== null) {
      var l = o.memoizedState.cachePool.pool;
      l != null && l.refCount++
     }
     break;
    case 24:
     tl(o.memoizedState.cache)
   }
   if (l = o.child, l !== null) l.return = o, mn = l;
   else e: for (o = t; mn !== null;) {
    l = mn;
    var u = l.sibling,
     p = l.return;
    if (Ov(l), l === o) {
     mn = null;
     break e
    }
    if (u !== null) {
     u.return = p, mn = u;
     break e
    }
    mn = p
   }
  }
 }
 var a2 = {
   getCacheForType: function(t) {
    var n = Tn(cn),
     o = n.data.get(t);
    return o === void 0 && (o = t(), n.data.set(t, o)), o
   }
  },
  i2 = typeof WeakMap == "function" ? WeakMap : Map,
  Rt = 0,
  $t = null,
  ct = null,
  ht = 0,
  Et = 0,
  Xn = null,
  To = !1,
  Wa = !1,
  Of = !1,
  io = 0,
  Xt = 0,
  Ao = 0,
  aa = 0,
  Df = 0,
  cr = 0,
  Fa = 0,
  xl = null,
  _n = null,
  kf = !1,
  zf = 0,
  xc = 1 / 0,
  Sc = null,
  Mo = null,
  Sn = 0,
  Oo = null,
  Ka = null,
  Qa = 0,
  jf = 0,
  Nf = null,
  Uv = null,
  Sl = 0,
  Lf = null;

 function Wn() {
  if ((Rt & 2) !== 0 && ht !== 0) return ht & -ht;
  if (z.T !== null) {
   var t = _a;
   return t !== 0 ? t : Hf()
  }
  return kt()
 }

 function Iv() {
  cr === 0 && (cr = (ht & 536870912) === 0 || bt ? On() : 536870912);
  var t = sr.current;
  return t !== null && (t.flags |= 32), cr
 }

 function Fn(t, n, o) {
  (t === $t && (Et === 2 || Et === 9) || t.cancelPendingCommit !== null) && (Za(t, 0), Do(t, ht, cr, !1)), Fe(t, o), ((Rt & 2) === 0 || t !== $t) && (t === $t && ((Rt & 2) === 0 && (aa |= o), Xt === 4 && Do(t, ht, cr, !1)), jr(t))
 }

 function Pv(t, n, o) {
  if ((Rt & 6) !== 0) throw Error(i(327));
  var l = !o && (n & 124) === 0 && (n & t.expiredLanes) === 0 || gt(t, n),
   u = l ? c2(t, n) : _f(t, n, !0),
   p = l;
  do {
   if (u === 0) {
    Wa && !l && Do(t, n, 0, !1);
    break
   } else {
    if (o = t.current.alternate, p && !l2(o)) {
     u = _f(t, n, !1), p = !1;
     continue
    }
    if (u === 2) {
     if (p = n, t.errorRecoveryDisabledLanes & p) var x = 0;
     else x = t.pendingLanes & -536870913, x = x !== 0 ? x : x & 536870912 ? 536870912 : 0;
     if (x !== 0) {
      n = x;
      e: {
       var M = t;u = xl;
       var B = M.current.memoizedState.isDehydrated;
       if (B && (Za(M, x).flags |= 256), x = _f(M, x, !1), x !== 2) {
        if (Of && !B) {
         M.errorRecoveryDisabledLanes |= p, aa |= p, u = 4;
         break e
        }
        p = _n, _n = u, p !== null && (_n === null ? _n = p : _n.push.apply(_n, p))
       }
       u = x
      }
      if (p = !1, u !== 2) continue
     }
    }
    if (u === 1) {
     Za(t, 0), Do(t, n, 0, !0);
     break
    }
    e: {
     switch (l = t, p = u, p) {
      case 0:
      case 1:
       throw Error(i(345));
      case 4:
       if ((n & 4194048) !== n) break;
      case 6:
       Do(l, n, cr, !To);
       break e;
      case 2:
       _n = null;
       break;
      case 3:
      case 5:
       break;
      default:
       throw Error(i(329))
     }
     if ((n & 62914560) === n && (u = zf + 300 - Ne(), 10 < u)) {
      if (Do(l, n, cr, !To), tt(l, 0, !0) !== 0) break e;
      l.timeoutHandle = gy(Hv.bind(null, l, o, _n, Sc, kf, n, cr, aa, Fa, To, p, 2, -0, 0), u);
      break e
     }
     Hv(l, o, _n, Sc, kf, n, cr, aa, Fa, To, p, 0, -0, 0)
    }
   }
   break
  } while (!0);
  jr(t)
 }

 function Hv(t, n, o, l, u, p, x, M, B, K, ie, ue, J, te) {
  if (t.timeoutHandle = -1, ue = n.subtreeFlags, (ue & 8192 || (ue & 16785408) === 16785408) && (Ml = {
    stylesheets: null,
    count: 0,
    unsuspend: H2
   }, Lv(n), ue = V2(), ue !== null)) {
   t.cancelPendingCommit = ue(Fv.bind(null, t, n, p, o, l, u, x, M, B, ie, 1, J, te)), Do(t, p, x, !K);
   return
  }
  Fv(t, n, p, o, l, u, x, M, B)
 }

 function l2(t) {
  for (var n = t;;) {
   var o = n.tag;
   if ((o === 0 || o === 11 || o === 15) && n.flags & 16384 && (o = n.updateQueue, o !== null && (o = o.stores, o !== null)))
    for (var l = 0; l < o.length; l++) {
     var u = o[l],
      p = u.getSnapshot;
     u = u.value;
     try {
      if (!qn(p(), u)) return !1
     } catch {
      return !1
     }
    }
   if (o = n.child, n.subtreeFlags & 16384 && o !== null) o.return = n, n = o;
   else {
    if (n === t) break;
    for (; n.sibling === null;) {
     if (n.return === null || n.return === t) return !0;
     n = n.return
    }
    n.sibling.return = n.return, n = n.sibling
   }
  }
  return !0
 }

 function Do(t, n, o, l) {
  n &= ~Df, n &= ~aa, t.suspendedLanes |= n, t.pingedLanes &= ~n, l && (t.warmLanes |= n), l = t.expirationTimes;
  for (var u = n; 0 < u;) {
   var p = 31 - be(u),
    x = 1 << p;
   l[p] = -1, u &= ~x
  }
  o !== 0 && Pt(t, o, n)
 }

 function Cc() {
  return (Rt & 6) === 0 ? (Cl(0), !1) : !0
 }

 function Bf() {
  if (ct !== null) {
   if (Et === 0) var t = ct.return;
   else t = ct, Zr = Jo = null, Zd(t), Va = null, fl = 0, t = ct;
   for (; t !== null;) Sv(t.alternate, t), t = t.return;
   ct = null
  }
 }

 function Za(t, n) {
  var o = t.timeoutHandle;
  o !== -1 && (t.timeoutHandle = -1, E2(o)), o = t.cancelPendingCommit, o !== null && (t.cancelPendingCommit = null, o()), Bf(), $t = t, ct = o = Fr(t.current, null), ht = n, Et = 0, Xn = null, To = !1, Wa = gt(t, n), Of = !1, Fa = cr = Df = aa = Ao = Xt = 0, _n = xl = null, kf = !1, (n & 8) !== 0 && (n |= n & 32);
  var l = t.entangledLanes;
  if (l !== 0)
   for (t = t.entanglements, l &= n; 0 < l;) {
    var u = 31 - be(l),
     p = 1 << u;
    n |= t[u], l &= ~p
   }
  return io = n, Vs(), o
 }

 function qv(t, n) {
  rt = null, z.H = cc, n === rl || n === Js ? (n = ig(), Et = 3) : n === rg ? (n = ig(), Et = 4) : Et = n === lv ? 8 : n !== null && typeof n == "object" && typeof n.then == "function" ? 6 : 1, Xn = n, ct === null && (Xt = 1, hc(t, or(n, t.current)))
 }

 function Vv() {
  var t = z.H;
  return z.H = cc, t === null ? cc : t
 }

 function Gv() {
  var t = z.A;
  return z.A = a2, t
 }

 function $f() {
  Xt = 4, To || (ht & 4194048) !== ht && sr.current !== null || (Wa = !0), (Ao & 134217727) === 0 && (aa & 134217727) === 0 || $t === null || Do($t, ht, cr, !1)
 }

 function _f(t, n, o) {
  var l = Rt;
  Rt |= 2;
  var u = Vv(),
   p = Gv();
  ($t !== t || ht !== n) && (Sc = null, Za(t, n)), n = !1;
  var x = Xt;
  e: do try {
    if (Et !== 0 && ct !== null) {
     var M = ct,
      B = Xn;
     switch (Et) {
      case 8:
       Bf(), x = 6;
       break e;
      case 3:
      case 2:
      case 9:
      case 6:
       sr.current === null && (n = !0);
       var K = Et;
       if (Et = 0, Xn = null, Ja(t, M, B, K), o && Wa) {
        x = 0;
        break e
       }
       break;
      default:
       K = Et, Et = 0, Xn = null, Ja(t, M, B, K)
     }
    }
    s2(), x = Xt;
    break
   } catch (ie) {
    qv(t, ie)
   }
   while (!0);
   return n && t.shellSuspendCounter++, Zr = Jo = null, Rt = l, z.H = u, z.A = p, ct === null && ($t = null, ht = 0, Vs()), x
 }

 function s2() {
  for (; ct !== null;) Yv(ct)
 }

 function c2(t, n) {
  var o = Rt;
  Rt |= 2;
  var l = Vv(),
   u = Gv();
  $t !== t || ht !== n ? (Sc = null, xc = Ne() + 500, Za(t, n)) : Wa = gt(t, n);
  e: do try {
    if (Et !== 0 && ct !== null) {
     n = ct;
     var p = Xn;
     t: switch (Et) {
      case 1:
       Et = 0, Xn = null, Ja(t, n, p, 1);
       break;
      case 2:
      case 9:
       if (og(p)) {
        Et = 0, Xn = null, Xv(n);
        break
       }
       n = function() {
        Et !== 2 && Et !== 9 || $t !== t || (Et = 7), jr(t)
       }, p.then(n, n);
       break e;
      case 3:
       Et = 7;
       break e;
      case 4:
       Et = 5;
       break e;
      case 7:
       og(p) ? (Et = 0, Xn = null, Xv(n)) : (Et = 0, Xn = null, Ja(t, n, p, 7));
       break;
      case 5:
       var x = null;
       switch (ct.tag) {
        case 26:
         x = ct.memoizedState;
        case 5:
        case 27:
         var M = ct;
         if (!x || My(x)) {
          Et = 0, Xn = null;
          var B = M.sibling;
          if (B !== null) ct = B;
          else {
           var K = M.return;
           K !== null ? (ct = K, wc(K)) : ct = null
          }
          break t
         }
       }
       Et = 0, Xn = null, Ja(t, n, p, 5);
       break;
      case 6:
       Et = 0, Xn = null, Ja(t, n, p, 6);
       break;
      case 8:
       Bf(), Xt = 6;
       break e;
      default:
       throw Error(i(462))
     }
    }
    u2();
    break
   } catch (ie) {
    qv(t, ie)
   }
   while (!0);
   return Zr = Jo = null, z.H = l, z.A = u, Rt = o, ct !== null ? 0 : ($t = null, ht = 0, Vs(), Xt)
 }

 function u2() {
  for (; ct !== null && !ze();) Yv(ct)
 }

 function Yv(t) {
  var n = bv(t.alternate, t, io);
  t.memoizedProps = t.pendingProps, n === null ? wc(t) : ct = n
 }

 function Xv(t) {
  var n = t,
   o = n.alternate;
  switch (n.tag) {
   case 15:
   case 0:
    n = pv(o, n, n.pendingProps, n.type, void 0, ht);
    break;
   case 11:
    n = pv(o, n, n.pendingProps, n.type.render, n.ref, ht);
    break;
   case 5:
    Zd(n);
   default:
    Sv(o, n), n = ct = Wm(n, io), n = bv(o, n, io)
  }
  t.memoizedProps = t.pendingProps, n === null ? wc(t) : ct = n
 }

 function Ja(t, n, o, l) {
  Zr = Jo = null, Zd(n), Va = null, fl = 0;
  var u = n.return;
  try {
   if (JS(t, u, n, o, ht)) {
    Xt = 1, hc(t, or(o, t.current)), ct = null;
    return
   }
  } catch (p) {
   if (u !== null) throw ct = u, p;
   Xt = 1, hc(t, or(o, t.current)), ct = null;
   return
  }
  n.flags & 32768 ? (bt || l === 1 ? t = !0 : Wa || (ht & 536870912) !== 0 ? t = !1 : (To = t = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = sr.current, l !== null && l.tag === 13 && (l.flags |= 16384))), Wv(n, t)) : wc(n)
 }

 function wc(t) {
  var n = t;
  do {
   if ((n.flags & 32768) !== 0) {
    Wv(n, To);
    return
   }
   t = n.return;
   var o = t2(n.alternate, n, io);
   if (o !== null) {
    ct = o;
    return
   }
   if (n = n.sibling, n !== null) {
    ct = n;
    return
   }
   ct = n = t
  } while (n !== null);
  Xt === 0 && (Xt = 5)
 }

 function Wv(t, n) {
  do {
   var o = n2(t.alternate, t);
   if (o !== null) {
    o.flags &= 32767, ct = o;
    return
   }
   if (o = t.return, o !== null && (o.flags |= 32768, o.subtreeFlags = 0, o.deletions = null), !n && (t = t.sibling, t !== null)) {
    ct = t;
    return
   }
   ct = t = o
  } while (t !== null);
  Xt = 6, ct = null
 }

 function Fv(t, n, o, l, u, p, x, M, B) {
  t.cancelPendingCommit = null;
  do Rc(); while (Sn !== 0);
  if ((Rt & 6) !== 0) throw Error(i(327));
  if (n !== null) {
   if (n === t.current) throw Error(i(177));
   if (p = n.lanes | n.childLanes, p |= Ad, lt(t, o, p, x, M, B), t === $t && (ct = $t = null, ht = 0), Ka = n, Oo = t, Qa = o, jf = p, Nf = u, Uv = l, (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, h2(He, function() {
     return ey(), null
    })) : (t.callbackNode = null, t.callbackPriority = 0), l = (n.flags & 13878) !== 0, (n.subtreeFlags & 13878) !== 0 || l) {
    l = z.T, z.T = null, u = I.p, I.p = 2, x = Rt, Rt |= 4;
    try {
     r2(t, n, o)
    } finally {
     Rt = x, I.p = u, z.T = l
    }
   }
   Sn = 1, Kv(), Qv(), Zv()
  }
 }

 function Kv() {
  if (Sn === 1) {
   Sn = 0;
   var t = Oo,
    n = Ka,
    o = (n.flags & 13878) !== 0;
   if ((n.subtreeFlags & 13878) !== 0 || o) {
    o = z.T, z.T = null;
    var l = I.p;
    I.p = 2;
    var u = Rt;
    Rt |= 4;
    try {
     zv(n, t);
     var p = Kf,
      x = _m(t.containerInfo),
      M = p.focusedElem,
      B = p.selectionRange;
     if (x !== M && M && M.ownerDocument && $m(M.ownerDocument.documentElement, M)) {
      if (B !== null && Cd(M)) {
       var K = B.start,
        ie = B.end;
       if (ie === void 0 && (ie = K), "selectionStart" in M) M.selectionStart = K, M.selectionEnd = Math.min(ie, M.value.length);
       else {
        var ue = M.ownerDocument || document,
         J = ue && ue.defaultView || window;
        if (J.getSelection) {
         var te = J.getSelection(),
          We = M.textContent.length,
          _e = Math.min(B.start, We),
          Ot = B.end === void 0 ? _e : Math.min(B.end, We);
         !te.extend && _e > Ot && (x = Ot, Ot = _e, _e = x);
         var Y = Bm(M, _e),
          P = Bm(M, Ot);
         if (Y && P && (te.rangeCount !== 1 || te.anchorNode !== Y.node || te.anchorOffset !== Y.offset || te.focusNode !== P.node || te.focusOffset !== P.offset)) {
          var F = ue.createRange();
          F.setStart(Y.node, Y.offset), te.removeAllRanges(), _e > Ot ? (te.addRange(F), te.extend(P.node, P.offset)) : (F.setEnd(P.node, P.offset), te.addRange(F))
         }
        }
       }
      }
      for (ue = [], te = M; te = te.parentNode;) te.nodeType === 1 && ue.push({
       element: te,
       left: te.scrollLeft,
       top: te.scrollTop
      });
      for (typeof M.focus == "function" && M.focus(), M = 0; M < ue.length; M++) {
       var se = ue[M];
       se.element.scrollLeft = se.left, se.element.scrollTop = se.top
      }
     }
     Bc = !!Ff, Kf = Ff = null
    } finally {
     Rt = u, I.p = l, z.T = o
    }
   }
   t.current = n, Sn = 2
  }
 }

 function Qv() {
  if (Sn === 2) {
   Sn = 0;
   var t = Oo,
    n = Ka,
    o = (n.flags & 8772) !== 0;
   if ((n.subtreeFlags & 8772) !== 0 || o) {
    o = z.T, z.T = null;
    var l = I.p;
    I.p = 2;
    var u = Rt;
    Rt |= 4;
    try {
     Mv(t, n.alternate, n)
    } finally {
     Rt = u, I.p = l, z.T = o
    }
   }
   Sn = 3
  }
 }

 function Zv() {
  if (Sn === 4 || Sn === 3) {
   Sn = 0, it();
   var t = Oo,
    n = Ka,
    o = Qa,
    l = Uv;
   (n.subtreeFlags & 10256) !== 0 || (n.flags & 10256) !== 0 ? Sn = 5 : (Sn = 0, Ka = Oo = null, Jv(t, t.pendingLanes));
   var u = t.pendingLanes;
   if (u === 0 && (Mo = null), je(o), n = n.stateNode, ve && typeof ve.onCommitFiberRoot == "function") try {
    ve.onCommitFiberRoot(me, n, void 0, (n.current.flags & 128) === 128)
   } catch {}
   if (l !== null) {
    n = z.T, u = I.p, I.p = 2, z.T = null;
    try {
     for (var p = t.onRecoverableError, x = 0; x < l.length; x++) {
      var M = l[x];
      p(M.value, {
       componentStack: M.stack
      })
     }
    } finally {
     z.T = n, I.p = u
    }
   }(Qa & 3) !== 0 && Rc(), jr(t), u = t.pendingLanes, (o & 4194090) !== 0 && (u & 42) !== 0 ? t === Lf ? Sl++ : (Sl = 0, Lf = t) : Sl = 0, Cl(0)
  }
 }

 function Jv(t, n) {
  (t.pooledCacheLanes &= n) === 0 && (n = t.pooledCache, n != null && (t.pooledCache = null, tl(n)))
 }

 function Rc(t) {
  return Kv(), Qv(), Zv(), ey()
 }

 function ey() {
  if (Sn !== 5) return !1;
  var t = Oo,
   n = jf;
  jf = 0;
  var o = je(Qa),
   l = z.T,
   u = I.p;
  try {
   I.p = 32 > o ? 32 : o, z.T = null, o = Nf, Nf = null;
   var p = Oo,
    x = Qa;
   if (Sn = 0, Ka = Oo = null, Qa = 0, (Rt & 6) !== 0) throw Error(i(331));
   var M = Rt;
   if (Rt |= 4, $v(p.current), Nv(p, p.current, x, o), Rt = M, Cl(0, !1), ve && typeof ve.onPostCommitFiberRoot == "function") try {
    ve.onPostCommitFiberRoot(me, p)
   } catch {}
   return !0
  } finally {
   I.p = u, z.T = l, Jv(t, n)
  }
 }

 function ty(t, n, o) {
  n = or(o, n), n = pf(t.stateNode, n, 2), t = bo(t, n, 2), t !== null && (Fe(t, 2), jr(t))
 }

 function Nt(t, n, o) {
  if (t.tag === 3) ty(t, t, o);
  else
   for (; n !== null;) {
    if (n.tag === 3) {
     ty(n, t, o);
     break
    } else if (n.tag === 1) {
     var l = n.stateNode;
     if (typeof n.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (Mo === null || !Mo.has(l))) {
      t = or(o, t), o = av(2), l = bo(n, o, 2), l !== null && (iv(o, l, n, t), Fe(l, 2), jr(l));
      break
     }
    }
    n = n.return
   }
 }

 function Uf(t, n, o) {
  var l = t.pingCache;
  if (l === null) {
   l = t.pingCache = new i2;
   var u = new Set;
   l.set(n, u)
  } else u = l.get(n), u === void 0 && (u = new Set, l.set(n, u));
  u.has(o) || (Of = !0, u.add(o), t = d2.bind(null, t, n, o), n.then(t, t))
 }

 function d2(t, n, o) {
  var l = t.pingCache;
  l !== null && l.delete(n), t.pingedLanes |= t.suspendedLanes & o, t.warmLanes &= ~o, $t === t && (ht & o) === o && (Xt === 4 || Xt === 3 && (ht & 62914560) === ht && 300 > Ne() - zf ? (Rt & 2) === 0 && Za(t, 0) : Df |= o, Fa === ht && (Fa = 0)), jr(t)
 }

 function ny(t, n) {
  n === 0 && (n = Jn()), t = Na(t, n), t !== null && (Fe(t, n), jr(t))
 }

 function f2(t) {
  var n = t.memoizedState,
   o = 0;
  n !== null && (o = n.retryLane), ny(t, o)
 }

 function p2(t, n) {
  var o = 0;
  switch (t.tag) {
   case 13:
    var l = t.stateNode,
     u = t.memoizedState;
    u !== null && (o = u.retryLane);
    break;
   case 19:
    l = t.stateNode;
    break;
   case 22:
    l = t.stateNode._retryCache;
    break;
   default:
    throw Error(i(314))
  }
  l !== null && l.delete(n), ny(t, o)
 }

 function h2(t, n) {
  return Se(t, n)
 }
 var Ec = null,
  ei = null,
  If = !1,
  Tc = !1,
  Pf = !1,
  ia = 0;

 function jr(t) {
  t !== ei && t.next === null && (ei === null ? Ec = ei = t : ei = ei.next = t), Tc = !0, If || (If = !0, g2())
 }

 function Cl(t, n) {
  if (!Pf && Tc) {
   Pf = !0;
   do
    for (var o = !1, l = Ec; l !== null;) {
     if (t !== 0) {
      var u = l.pendingLanes;
      if (u === 0) var p = 0;
      else {
       var x = l.suspendedLanes,
        M = l.pingedLanes;
       p = (1 << 31 - be(42 | t) + 1) - 1, p &= u & ~(x & ~M), p = p & 201326741 ? p & 201326741 | 1 : p ? p | 2 : 0
      }
      p !== 0 && (o = !0, iy(l, p))
     } else p = ht, p = tt(l, l === $t ? p : 0, l.cancelPendingCommit !== null || l.timeoutHandle !== -1), (p & 3) === 0 || gt(l, p) || (o = !0, iy(l, p));
     l = l.next
    }
   while (o);
   Pf = !1
  }
 }

 function m2() {
  ry()
 }

 function ry() {
  Tc = If = !1;
  var t = 0;
  ia !== 0 && (R2() && (t = ia), ia = 0);
  for (var n = Ne(), o = null, l = Ec; l !== null;) {
   var u = l.next,
    p = oy(l, n);
   p === 0 ? (l.next = null, o === null ? Ec = u : o.next = u, u === null && (ei = o)) : (o = l, (t !== 0 || (p & 3) !== 0) && (Tc = !0)), l = u
  }
  Cl(t)
 }

 function oy(t, n) {
  for (var o = t.suspendedLanes, l = t.pingedLanes, u = t.expirationTimes, p = t.pendingLanes & -62914561; 0 < p;) {
   var x = 31 - be(p),
    M = 1 << x,
    B = u[x];
   B === -1 ? ((M & o) === 0 || (M & l) !== 0) && (u[x] = rn(M, n)) : B <= n && (t.expiredLanes |= M), p &= ~M
  }
  if (n = $t, o = ht, o = tt(t, t === n ? o : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1), l = t.callbackNode, o === 0 || t === n && (Et === 2 || Et === 9) || t.cancelPendingCommit !== null) return l !== null && l !== null && Re(l), t.callbackNode = null, t.callbackPriority = 0;
  if ((o & 3) === 0 || gt(t, o)) {
   if (n = o & -o, n === t.callbackPriority) return n;
   switch (l !== null && Re(l), je(o)) {
    case 2:
    case 8:
     o = Pe;
     break;
    case 32:
     o = He;
     break;
    case 268435456:
     o = mt;
     break;
    default:
     o = He
   }
   return l = ay.bind(null, t), o = Se(o, l), t.callbackPriority = n, t.callbackNode = o, n
  }
  return l !== null && l !== null && Re(l), t.callbackPriority = 2, t.callbackNode = null, 2
 }

 function ay(t, n) {
  if (Sn !== 0 && Sn !== 5) return t.callbackNode = null, t.callbackPriority = 0, null;
  var o = t.callbackNode;
  if (Rc() && t.callbackNode !== o) return null;
  var l = ht;
  return l = tt(t, t === $t ? l : 0, t.cancelPendingCommit !== null || t.timeoutHandle !== -1), l === 0 ? null : (Pv(t, l, n), oy(t, Ne()), t.callbackNode != null && t.callbackNode === o ? ay.bind(null, t) : null)
 }

 function iy(t, n) {
  if (Rc()) return null;
  Pv(t, n, !0)
 }

 function g2() {
  T2(function() {
   (Rt & 6) !== 0 ? Se(Ke, m2) : ry()
  })
 }

 function Hf() {
  return ia === 0 && (ia = On()), ia
 }

 function ly(t) {
  return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : $s("" + t)
 }

 function sy(t, n) {
  var o = n.ownerDocument.createElement("input");
  return o.name = n.name, o.value = n.value, t.id && o.setAttribute("form", t.id), n.parentNode.insertBefore(o, n), t = new FormData(t), o.parentNode.removeChild(o), t
 }

 function v2(t, n, o, l, u) {
  if (n === "submit" && o && o.stateNode === u) {
   var p = ly((u[jt] || null).action),
    x = l.submitter;
   x && (n = (n = x[jt] || null) ? ly(n.formAction) : x.getAttribute("formAction"), n !== null && (p = n, x = null));
   var M = new Ps("action", "action", null, l, u);
   t.push({
    event: M,
    listeners: [{
     instance: null,
     listener: function() {
      if (l.defaultPrevented) {
       if (ia !== 0) {
        var B = x ? sy(u, x) : new FormData(u);
        sf(o, {
         pending: !0,
         data: B,
         method: u.method,
         action: p
        }, null, B)
       }
      } else typeof p == "function" && (M.preventDefault(), B = x ? sy(u, x) : new FormData(u), sf(o, {
       pending: !0,
       data: B,
       method: u.method,
       action: p
      }, p, B))
     },
     currentTarget: u
    }]
   })
  }
 }
 for (var qf = 0; qf < Td.length; qf++) {
  var Vf = Td[qf],
   y2 = Vf.toLowerCase(),
   b2 = Vf[0].toUpperCase() + Vf.slice(1);
  Cr(y2, "on" + b2)
 }
 Cr(Pm, "onAnimationEnd"), Cr(Hm, "onAnimationIteration"), Cr(qm, "onAnimationStart"), Cr("dblclick", "onDoubleClick"), Cr("focusin", "onFocus"), Cr("focusout", "onBlur"), Cr(BS, "onTransitionRun"), Cr($S, "onTransitionStart"), Cr(_S, "onTransitionCancel"), Cr(Vm, "onTransitionEnd"), Ra("onMouseEnter", ["mouseout", "mouseover"]), Ra("onMouseLeave", ["mouseout", "mouseover"]), Ra("onPointerEnter", ["pointerout", "pointerover"]), Ra("onPointerLeave", ["pointerout", "pointerover"]), Vo("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Vo("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Vo("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Vo("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Vo("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Vo("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
 var wl = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
  x2 = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(wl));

 function cy(t, n) {
  n = (n & 4) !== 0;
  for (var o = 0; o < t.length; o++) {
   var l = t[o],
    u = l.event;
   l = l.listeners;
   e: {
    var p = void 0;
    if (n)
     for (var x = l.length - 1; 0 <= x; x--) {
      var M = l[x],
       B = M.instance,
       K = M.currentTarget;
      if (M = M.listener, B !== p && u.isPropagationStopped()) break e;
      p = M, u.currentTarget = K;
      try {
       p(u)
      } catch (ie) {
       pc(ie)
      }
      u.currentTarget = null, p = B
     } else
      for (x = 0; x < l.length; x++) {
       if (M = l[x], B = M.instance, K = M.currentTarget, M = M.listener, B !== p && u.isPropagationStopped()) break e;
       p = M, u.currentTarget = K;
       try {
        p(u)
       } catch (ie) {
        pc(ie)
       }
       u.currentTarget = null, p = B
      }
   }
  }
 }

 function ut(t, n) {
  var o = n[Nn];
  o === void 0 && (o = n[Nn] = new Set);
  var l = t + "__bubble";
  o.has(l) || (uy(n, t, 2, !1), o.add(l))
 }

 function Gf(t, n, o) {
  var l = 0;
  n && (l |= 4), uy(o, t, l, n)
 }
 var Ac = "_reactListening" + Math.random().toString(36).slice(2);

 function Yf(t) {
  if (!t[Ac]) {
   t[Ac] = !0, Zt.forEach(function(o) {
    o !== "selectionchange" && (x2.has(o) || Gf(o, !1, t), Gf(o, !0, t))
   });
   var n = t.nodeType === 9 ? t : t.ownerDocument;
   n === null || n[Ac] || (n[Ac] = !0, Gf("selectionchange", !1, n))
  }
 }

 function uy(t, n, o, l) {
  switch (Ny(n)) {
   case 2:
    var u = X2;
    break;
   case 8:
    u = W2;
    break;
   default:
    u = ip
  }
  o = u.bind(null, n, o, t), u = void 0, !pd || n !== "touchstart" && n !== "touchmove" && n !== "wheel" || (u = !0), l ? u !== void 0 ? t.addEventListener(n, o, {
   capture: !0,
   passive: u
  }) : t.addEventListener(n, o, !0) : u !== void 0 ? t.addEventListener(n, o, {
   passive: u
  }) : t.addEventListener(n, o, !1)
 }

 function Xf(t, n, o, l, u) {
  var p = l;
  if ((n & 1) === 0 && (n & 2) === 0 && l !== null) e: for (;;) {
   if (l === null) return;
   var x = l.tag;
   if (x === 3 || x === 4) {
    var M = l.stateNode.containerInfo;
    if (M === u) break;
    if (x === 4)
     for (x = l.return; x !== null;) {
      var B = x.tag;
      if ((B === 3 || B === 4) && x.stateNode.containerInfo === u) return;
      x = x.return
     }
    for (; M !== null;) {
     if (x = oe(M), x === null) return;
     if (B = x.tag, B === 5 || B === 6 || B === 26 || B === 27) {
      l = p = x;
      continue e
     }
     M = M.parentNode
    }
   }
   l = l.return
  }
  vm(function() {
   var K = p,
    ie = dd(o),
    ue = [];
   e: {
    var J = Gm.get(t);
    if (J !== void 0) {
     var te = Ps,
      We = t;
     switch (t) {
      case "keypress":
       if (Us(o) === 0) break e;
      case "keydown":
      case "keyup":
       te = hS;
       break;
      case "focusin":
       We = "focus", te = vd;
       break;
      case "focusout":
       We = "blur", te = vd;
       break;
      case "beforeblur":
      case "afterblur":
       te = vd;
       break;
      case "click":
       if (o.button === 2) break e;
      case "auxclick":
      case "dblclick":
      case "mousedown":
      case "mousemove":
      case "mouseup":
      case "mouseout":
      case "mouseover":
      case "contextmenu":
       te = xm;
       break;
      case "drag":
      case "dragend":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "dragstart":
      case "drop":
       te = nS;
       break;
      case "touchcancel":
      case "touchend":
      case "touchmove":
      case "touchstart":
       te = vS;
       break;
      case Pm:
      case Hm:
      case qm:
       te = aS;
       break;
      case Vm:
       te = bS;
       break;
      case "scroll":
      case "scrollend":
       te = eS;
       break;
      case "wheel":
       te = SS;
       break;
      case "copy":
      case "cut":
      case "paste":
       te = lS;
       break;
      case "gotpointercapture":
      case "lostpointercapture":
      case "pointercancel":
      case "pointerdown":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "pointerup":
       te = Cm;
       break;
      case "toggle":
      case "beforetoggle":
       te = wS
     }
     var _e = (n & 4) !== 0,
      Ot = !_e && (t === "scroll" || t === "scrollend"),
      Y = _e ? J !== null ? J + "Capture" : null : J;
     _e = [];
     for (var P = K, F; P !== null;) {
      var se = P;
      if (F = se.stateNode, se = se.tag, se !== 5 && se !== 26 && se !== 27 || F === null || Y === null || (se = Hi(P, Y), se != null && _e.push(Rl(P, se, F))), Ot) break;
      P = P.return
     }
     0 < _e.length && (J = new te(J, We, null, o, ie), ue.push({
      event: J,
      listeners: _e
     }))
    }
   }
   if ((n & 7) === 0) {
    e: {
     if (J = t === "mouseover" || t === "pointerover", te = t === "mouseout" || t === "pointerout", J && o !== ud && (We = o.relatedTarget || o.fromElement) && (oe(We) || We[pn])) break e;
     if ((te || J) && (J = ie.window === ie ? ie : (J = ie.ownerDocument) ? J.defaultView || J.parentWindow : window, te ? (We = o.relatedTarget || o.toElement, te = K, We = We ? oe(We) : null, We !== null && (Ot = c(We), _e = We.tag, We !== Ot || _e !== 5 && _e !== 27 && _e !== 6) && (We = null)) : (te = null, We = K), te !== We)) {
      if (_e = xm, se = "onMouseLeave", Y = "onMouseEnter", P = "mouse", (t === "pointerout" || t === "pointerover") && (_e = Cm, se = "onPointerLeave", Y = "onPointerEnter", P = "pointer"), Ot = te == null ? J : dt(te), F = We == null ? J : dt(We), J = new _e(se, P + "leave", te, o, ie), J.target = Ot, J.relatedTarget = F, se = null, oe(ie) === K && (_e = new _e(Y, P + "enter", We, o, ie), _e.target = F, _e.relatedTarget = Ot, se = _e), Ot = se, te && We) t: {
       for (_e = te, Y = We, P = 0, F = _e; F; F = ti(F)) P++;
       for (F = 0, se = Y; se; se = ti(se)) F++;
       for (; 0 < P - F;) _e = ti(_e),
       P--;
       for (; 0 < F - P;) Y = ti(Y),
       F--;
       for (; P--;) {
        if (_e === Y || Y !== null && _e === Y.alternate) break t;
        _e = ti(_e), Y = ti(Y)
       }
       _e = null
      }
      else _e = null;
      te !== null && dy(ue, J, te, _e, !1), We !== null && Ot !== null && dy(ue, Ot, We, _e, !0)
     }
    }
    e: {
     if (J = K ? dt(K) : window, te = J.nodeName && J.nodeName.toLowerCase(), te === "select" || te === "input" && J.type === "file") var ke = Dm;
     else if (Mm(J))
      if (km) ke = jS;
      else {
       ke = kS;
       var at = DS
      }
     else te = J.nodeName,
     !te || te.toLowerCase() !== "input" || J.type !== "checkbox" && J.type !== "radio" ? K && cd(K.elementType) && (ke = Dm) : ke = zS;
     if (ke && (ke = ke(t, K))) {
      Om(ue, ke, o, ie);
      break e
     }
     at && at(t, J, K),
     t === "focusout" && K && J.type === "number" && K.memoizedProps.value != null && sd(J, "number", J.value)
    }
    switch (at = K ? dt(K) : window, t) {
     case "focusin":
      (Mm(at) || at.contentEditable === "true") && (ka = at, wd = K, Ki = null);
      break;
     case "focusout":
      Ki = wd = ka = null;
      break;
     case "mousedown":
      Rd = !0;
      break;
     case "contextmenu":
     case "mouseup":
     case "dragend":
      Rd = !1, Um(ue, o, ie);
      break;
     case "selectionchange":
      if (LS) break;
     case "keydown":
     case "keyup":
      Um(ue, o, ie)
    }
    var Le;
    if (bd) e: {
     switch (t) {
      case "compositionstart":
       var qe = "onCompositionStart";
       break e;
      case "compositionend":
       qe = "onCompositionEnd";
       break e;
      case "compositionupdate":
       qe = "onCompositionUpdate";
       break e
     }
     qe = void 0
    }
    else Da ? Tm(t, o) && (qe = "onCompositionEnd") : t === "keydown" && o.keyCode === 229 && (qe = "onCompositionStart");qe && (wm && o.locale !== "ko" && (Da || qe !== "onCompositionStart" ? qe === "onCompositionEnd" && Da && (Le = ym()) : (mo = ie, hd = "value" in mo ? mo.value : mo.textContent, Da = !0)), at = Mc(K, qe), 0 < at.length && (qe = new Sm(qe, t, null, o, ie), ue.push({
     event: qe,
     listeners: at
    }), Le ? qe.data = Le : (Le = Am(o), Le !== null && (qe.data = Le)))),
    (Le = ES ? TS(t, o) : AS(t, o)) && (qe = Mc(K, "onBeforeInput"), 0 < qe.length && (at = new Sm("onBeforeInput", "beforeinput", null, o, ie), ue.push({
     event: at,
     listeners: qe
    }), at.data = Le)),
    v2(ue, t, K, o, ie)
   }
   cy(ue, n)
  })
 }

 function Rl(t, n, o) {
  return {
   instance: t,
   listener: n,
   currentTarget: o
  }
 }

 function Mc(t, n) {
  for (var o = n + "Capture", l = []; t !== null;) {
   var u = t,
    p = u.stateNode;
   if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || p === null || (u = Hi(t, o), u != null && l.unshift(Rl(t, u, p)), u = Hi(t, n), u != null && l.push(Rl(t, u, p))), t.tag === 3) return l;
   t = t.return
  }
  return []
 }

 function ti(t) {
  if (t === null) return null;
  do t = t.return; while (t && t.tag !== 5 && t.tag !== 27);
  return t || null
 }

 function dy(t, n, o, l, u) {
  for (var p = n._reactName, x = []; o !== null && o !== l;) {
   var M = o,
    B = M.alternate,
    K = M.stateNode;
   if (M = M.tag, B !== null && B === l) break;
   M !== 5 && M !== 26 && M !== 27 || K === null || (B = K, u ? (K = Hi(o, p), K != null && x.unshift(Rl(o, K, B))) : u || (K = Hi(o, p), K != null && x.push(Rl(o, K, B)))), o = o.return
  }
  x.length !== 0 && t.push({
   event: n,
   listeners: x
  })
 }
 var S2 = /\r\n?/g,
  C2 = /\u0000|\uFFFD/g;

 function fy(t) {
  return (typeof t == "string" ? t : "" + t).replace(S2, `
`).replace(C2, "")
 }

 function py(t, n) {
  return n = fy(n), fy(t) === n
 }

 function Oc() {}

 function Mt(t, n, o, l, u, p) {
  switch (o) {
   case "children":
    typeof l == "string" ? n === "body" || n === "textarea" && l === "" || Aa(t, l) : (typeof l == "number" || typeof l == "bigint") && n !== "body" && Aa(t, "" + l);
    break;
   case "className":
    Ns(t, "class", l);
    break;
   case "tabIndex":
    Ns(t, "tabindex", l);
    break;
   case "dir":
   case "role":
   case "viewBox":
   case "width":
   case "height":
    Ns(t, o, l);
    break;
   case "style":
    mm(t, l, p);
    break;
   case "data":
    if (n !== "object") {
     Ns(t, "data", l);
     break
    }
   case "src":
   case "href":
    if (l === "" && (n !== "a" || o !== "href")) {
     t.removeAttribute(o);
     break
    }
    if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
     t.removeAttribute(o);
     break
    }
    l = $s("" + l), t.setAttribute(o, l);
    break;
   case "action":
   case "formAction":
    if (typeof l == "function") {
     t.setAttribute(o, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
     break
    } else typeof p == "function" && (o === "formAction" ? (n !== "input" && Mt(t, n, "name", u.name, u, null), Mt(t, n, "formEncType", u.formEncType, u, null), Mt(t, n, "formMethod", u.formMethod, u, null), Mt(t, n, "formTarget", u.formTarget, u, null)) : (Mt(t, n, "encType", u.encType, u, null), Mt(t, n, "method", u.method, u, null), Mt(t, n, "target", u.target, u, null)));
    if (l == null || typeof l == "symbol" || typeof l == "boolean") {
     t.removeAttribute(o);
     break
    }
    l = $s("" + l), t.setAttribute(o, l);
    break;
   case "onClick":
    l != null && (t.onclick = Oc);
    break;
   case "onScroll":
    l != null && ut("scroll", t);
    break;
   case "onScrollEnd":
    l != null && ut("scrollend", t);
    break;
   case "dangerouslySetInnerHTML":
    if (l != null) {
     if (typeof l != "object" || !("__html" in l)) throw Error(i(61));
     if (o = l.__html, o != null) {
      if (u.children != null) throw Error(i(60));
      t.innerHTML = o
     }
    }
    break;
   case "multiple":
    t.multiple = l && typeof l != "function" && typeof l != "symbol";
    break;
   case "muted":
    t.muted = l && typeof l != "function" && typeof l != "symbol";
    break;
   case "suppressContentEditableWarning":
   case "suppressHydrationWarning":
   case "defaultValue":
   case "defaultChecked":
   case "innerHTML":
   case "ref":
    break;
   case "autoFocus":
    break;
   case "xlinkHref":
    if (l == null || typeof l == "function" || typeof l == "boolean" || typeof l == "symbol") {
     t.removeAttribute("xlink:href");
     break
    }
    o = $s("" + l), t.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", o);
    break;
   case "contentEditable":
   case "spellCheck":
   case "draggable":
   case "value":
   case "autoReverse":
   case "externalResourcesRequired":
   case "focusable":
   case "preserveAlpha":
    l != null && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(o, "" + l) : t.removeAttribute(o);
    break;
   case "inert":
   case "allowFullScreen":
   case "async":
   case "autoPlay":
   case "controls":
   case "default":
   case "defer":
   case "disabled":
   case "disablePictureInPicture":
   case "disableRemotePlayback":
   case "formNoValidate":
   case "hidden":
   case "loop":
   case "noModule":
   case "noValidate":
   case "open":
   case "playsInline":
   case "readOnly":
   case "required":
   case "reversed":
   case "scoped":
   case "seamless":
   case "itemScope":
    l && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(o, "") : t.removeAttribute(o);
    break;
   case "capture":
   case "download":
    l === !0 ? t.setAttribute(o, "") : l !== !1 && l != null && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(o, l) : t.removeAttribute(o);
    break;
   case "cols":
   case "rows":
   case "size":
   case "span":
    l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l ? t.setAttribute(o, l) : t.removeAttribute(o);
    break;
   case "rowSpan":
   case "start":
    l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l) ? t.removeAttribute(o) : t.setAttribute(o, l);
    break;
   case "popover":
    ut("beforetoggle", t), ut("toggle", t), js(t, "popover", l);
    break;
   case "xlinkActuate":
    Xr(t, "http://www.w3.org/1999/xlink", "xlink:actuate", l);
    break;
   case "xlinkArcrole":
    Xr(t, "http://www.w3.org/1999/xlink", "xlink:arcrole", l);
    break;
   case "xlinkRole":
    Xr(t, "http://www.w3.org/1999/xlink", "xlink:role", l);
    break;
   case "xlinkShow":
    Xr(t, "http://www.w3.org/1999/xlink", "xlink:show", l);
    break;
   case "xlinkTitle":
    Xr(t, "http://www.w3.org/1999/xlink", "xlink:title", l);
    break;
   case "xlinkType":
    Xr(t, "http://www.w3.org/1999/xlink", "xlink:type", l);
    break;
   case "xmlBase":
    Xr(t, "http://www.w3.org/XML/1998/namespace", "xml:base", l);
    break;
   case "xmlLang":
    Xr(t, "http://www.w3.org/XML/1998/namespace", "xml:lang", l);
    break;
   case "xmlSpace":
    Xr(t, "http://www.w3.org/XML/1998/namespace", "xml:space", l);
    break;
   case "is":
    js(t, "is", l);
    break;
   case "innerText":
   case "textContent":
    break;
   default:
    (!(2 < o.length) || o[0] !== "o" && o[0] !== "O" || o[1] !== "n" && o[1] !== "N") && (o = Zx.get(o) || o, js(t, o, l))
  }
 }

 function Wf(t, n, o, l, u, p) {
  switch (o) {
   case "style":
    mm(t, l, p);
    break;
   case "dangerouslySetInnerHTML":
    if (l != null) {
     if (typeof l != "object" || !("__html" in l)) throw Error(i(61));
     if (o = l.__html, o != null) {
      if (u.children != null) throw Error(i(60));
      t.innerHTML = o
     }
    }
    break;
   case "children":
    typeof l == "string" ? Aa(t, l) : (typeof l == "number" || typeof l == "bigint") && Aa(t, "" + l);
    break;
   case "onScroll":
    l != null && ut("scroll", t);
    break;
   case "onScrollEnd":
    l != null && ut("scrollend", t);
    break;
   case "onClick":
    l != null && (t.onclick = Oc);
    break;
   case "suppressContentEditableWarning":
   case "suppressHydrationWarning":
   case "innerHTML":
   case "ref":
    break;
   case "innerText":
   case "textContent":
    break;
   default:
    if (!tr.hasOwnProperty(o)) e: {
     if (o[0] === "o" && o[1] === "n" && (u = o.endsWith("Capture"), n = o.slice(2, u ? o.length - 7 : void 0), p = t[jt] || null, p = p != null ? p[o] : null, typeof p == "function" && t.removeEventListener(n, p, u), typeof l == "function")) {
      typeof p != "function" && p !== null && (o in t ? t[o] = null : t.hasAttribute(o) && t.removeAttribute(o)), t.addEventListener(n, l, u);
      break e
     }
     o in t ? t[o] = l : l === !0 ? t.setAttribute(o, "") : js(t, o, l)
    }
  }
 }

 function Cn(t, n, o) {
  switch (n) {
   case "div":
   case "span":
   case "svg":
   case "path":
   case "a":
   case "g":
   case "p":
   case "li":
    break;
   case "img":
    ut("error", t), ut("load", t);
    var l = !1,
     u = !1,
     p;
    for (p in o)
     if (o.hasOwnProperty(p)) {
      var x = o[p];
      if (x != null) switch (p) {
       case "src":
        l = !0;
        break;
       case "srcSet":
        u = !0;
        break;
       case "children":
       case "dangerouslySetInnerHTML":
        throw Error(i(137, n));
       default:
        Mt(t, n, p, x, o, null)
      }
     } u && Mt(t, n, "srcSet", o.srcSet, o, null), l && Mt(t, n, "src", o.src, o, null);
    return;
   case "input":
    ut("invalid", t);
    var M = p = x = u = null,
     B = null,
     K = null;
    for (l in o)
     if (o.hasOwnProperty(l)) {
      var ie = o[l];
      if (ie != null) switch (l) {
       case "name":
        u = ie;
        break;
       case "type":
        x = ie;
        break;
       case "checked":
        B = ie;
        break;
       case "defaultChecked":
        K = ie;
        break;
       case "value":
        p = ie;
        break;
       case "defaultValue":
        M = ie;
        break;
       case "children":
       case "dangerouslySetInnerHTML":
        if (ie != null) throw Error(i(137, n));
        break;
       default:
        Mt(t, n, l, ie, o, null)
      }
     } dm(t, p, M, B, K, x, u, !1), Ls(t);
    return;
   case "select":
    ut("invalid", t), l = x = p = null;
    for (u in o)
     if (o.hasOwnProperty(u) && (M = o[u], M != null)) switch (u) {
      case "value":
       p = M;
       break;
      case "defaultValue":
       x = M;
       break;
      case "multiple":
       l = M;
      default:
       Mt(t, n, u, M, o, null)
     }
    n = p, o = x, t.multiple = !!l, n != null ? Ta(t, !!l, n, !1) : o != null && Ta(t, !!l, o, !0);
    return;
   case "textarea":
    ut("invalid", t), p = u = l = null;
    for (x in o)
     if (o.hasOwnProperty(x) && (M = o[x], M != null)) switch (x) {
      case "value":
       l = M;
       break;
      case "defaultValue":
       u = M;
       break;
      case "children":
       p = M;
       break;
      case "dangerouslySetInnerHTML":
       if (M != null) throw Error(i(91));
       break;
      default:
       Mt(t, n, x, M, o, null)
     }
    pm(t, l, u, p), Ls(t);
    return;
   case "option":
    for (B in o)
     if (o.hasOwnProperty(B) && (l = o[B], l != null)) switch (B) {
      case "selected":
       t.selected = l && typeof l != "function" && typeof l != "symbol";
       break;
      default:
       Mt(t, n, B, l, o, null)
     }
    return;
   case "dialog":
    ut("beforetoggle", t), ut("toggle", t), ut("cancel", t), ut("close", t);
    break;
   case "iframe":
   case "object":
    ut("load", t);
    break;
   case "video":
   case "audio":
    for (l = 0; l < wl.length; l++) ut(wl[l], t);
    break;
   case "image":
    ut("error", t), ut("load", t);
    break;
   case "details":
    ut("toggle", t);
    break;
   case "embed":
   case "source":
   case "link":
    ut("error", t), ut("load", t);
   case "area":
   case "base":
   case "br":
   case "col":
   case "hr":
   case "keygen":
   case "meta":
   case "param":
   case "track":
   case "wbr":
   case "menuitem":
    for (K in o)
     if (o.hasOwnProperty(K) && (l = o[K], l != null)) switch (K) {
      case "children":
      case "dangerouslySetInnerHTML":
       throw Error(i(137, n));
      default:
       Mt(t, n, K, l, o, null)
     }
    return;
   default:
    if (cd(n)) {
     for (ie in o) o.hasOwnProperty(ie) && (l = o[ie], l !== void 0 && Wf(t, n, ie, l, o, void 0));
     return
    }
  }
  for (M in o) o.hasOwnProperty(M) && (l = o[M], l != null && Mt(t, n, M, l, o, null))
 }

 function w2(t, n, o, l) {
  switch (n) {
   case "div":
   case "span":
   case "svg":
   case "path":
   case "a":
   case "g":
   case "p":
   case "li":
    break;
   case "input":
    var u = null,
     p = null,
     x = null,
     M = null,
     B = null,
     K = null,
     ie = null;
    for (te in o) {
     var ue = o[te];
     if (o.hasOwnProperty(te) && ue != null) switch (te) {
      case "checked":
       break;
      case "value":
       break;
      case "defaultValue":
       B = ue;
      default:
       l.hasOwnProperty(te) || Mt(t, n, te, null, l, ue)
     }
    }
    for (var J in l) {
     var te = l[J];
     if (ue = o[J], l.hasOwnProperty(J) && (te != null || ue != null)) switch (J) {
      case "type":
       p = te;
       break;
      case "name":
       u = te;
       break;
      case "checked":
       K = te;
       break;
      case "defaultChecked":
       ie = te;
       break;
      case "value":
       x = te;
       break;
      case "defaultValue":
       M = te;
       break;
      case "children":
      case "dangerouslySetInnerHTML":
       if (te != null) throw Error(i(137, n));
       break;
      default:
       te !== ue && Mt(t, n, J, te, l, ue)
     }
    }
    ld(t, x, M, B, K, ie, p, u);
    return;
   case "select":
    te = x = M = J = null;
    for (p in o)
     if (B = o[p], o.hasOwnProperty(p) && B != null) switch (p) {
      case "value":
       break;
      case "multiple":
       te = B;
      default:
       l.hasOwnProperty(p) || Mt(t, n, p, null, l, B)
     }
    for (u in l)
     if (p = l[u], B = o[u], l.hasOwnProperty(u) && (p != null || B != null)) switch (u) {
      case "value":
       J = p;
       break;
      case "defaultValue":
       M = p;
       break;
      case "multiple":
       x = p;
      default:
       p !== B && Mt(t, n, u, p, l, B)
     }
    n = M, o = x, l = te, J != null ? Ta(t, !!o, J, !1) : !!l != !!o && (n != null ? Ta(t, !!o, n, !0) : Ta(t, !!o, o ? [] : "", !1));
    return;
   case "textarea":
    te = J = null;
    for (M in o)
     if (u = o[M], o.hasOwnProperty(M) && u != null && !l.hasOwnProperty(M)) switch (M) {
      case "value":
       break;
      case "children":
       break;
      default:
       Mt(t, n, M, null, l, u)
     }
    for (x in l)
     if (u = l[x], p = o[x], l.hasOwnProperty(x) && (u != null || p != null)) switch (x) {
      case "value":
       J = u;
       break;
      case "defaultValue":
       te = u;
       break;
      case "children":
       break;
      case "dangerouslySetInnerHTML":
       if (u != null) throw Error(i(91));
       break;
      default:
       u !== p && Mt(t, n, x, u, l, p)
     }
    fm(t, J, te);
    return;
   case "option":
    for (var We in o)
     if (J = o[We], o.hasOwnProperty(We) && J != null && !l.hasOwnProperty(We)) switch (We) {
      case "selected":
       t.selected = !1;
       break;
      default:
       Mt(t, n, We, null, l, J)
     }
    for (B in l)
     if (J = l[B], te = o[B], l.hasOwnProperty(B) && J !== te && (J != null || te != null)) switch (B) {
      case "selected":
       t.selected = J && typeof J != "function" && typeof J != "symbol";
       break;
      default:
       Mt(t, n, B, J, l, te)
     }
    return;
   case "img":
   case "link":
   case "area":
   case "base":
   case "br":
   case "col":
   case "embed":
   case "hr":
   case "keygen":
   case "meta":
   case "param":
   case "source":
   case "track":
   case "wbr":
   case "menuitem":
    for (var _e in o) J = o[_e], o.hasOwnProperty(_e) && J != null && !l.hasOwnProperty(_e) && Mt(t, n, _e, null, l, J);
    for (K in l)
     if (J = l[K], te = o[K], l.hasOwnProperty(K) && J !== te && (J != null || te != null)) switch (K) {
      case "children":
      case "dangerouslySetInnerHTML":
       if (J != null) throw Error(i(137, n));
       break;
      default:
       Mt(t, n, K, J, l, te)
     }
    return;
   default:
    if (cd(n)) {
     for (var Ot in o) J = o[Ot], o.hasOwnProperty(Ot) && J !== void 0 && !l.hasOwnProperty(Ot) && Wf(t, n, Ot, void 0, l, J);
     for (ie in l) J = l[ie], te = o[ie], !l.hasOwnProperty(ie) || J === te || J === void 0 && te === void 0 || Wf(t, n, ie, J, l, te);
     return
    }
  }
  for (var Y in o) J = o[Y], o.hasOwnProperty(Y) && J != null && !l.hasOwnProperty(Y) && Mt(t, n, Y, null, l, J);
  for (ue in l) J = l[ue], te = o[ue], !l.hasOwnProperty(ue) || J === te || J == null && te == null || Mt(t, n, ue, J, l, te)
 }
 var Ff = null,
  Kf = null;

 function Dc(t) {
  return t.nodeType === 9 ? t : t.ownerDocument
 }

 function hy(t) {
  switch (t) {
   case "http://www.w3.org/2000/svg":
    return 1;
   case "http://www.w3.org/1998/Math/MathML":
    return 2;
   default:
    return 0
  }
 }

 function my(t, n) {
  if (t === 0) switch (n) {
   case "svg":
    return 1;
   case "math":
    return 2;
   default:
    return 0
  }
  return t === 1 && n === "foreignObject" ? 0 : t
 }

 function Qf(t, n) {
  return t === "textarea" || t === "noscript" || typeof n.children == "string" || typeof n.children == "number" || typeof n.children == "bigint" || typeof n.dangerouslySetInnerHTML == "object" && n.dangerouslySetInnerHTML !== null && n.dangerouslySetInnerHTML.__html != null
 }
 var Zf = null;

 function R2() {
  var t = window.event;
  return t && t.type === "popstate" ? t === Zf ? !1 : (Zf = t, !0) : (Zf = null, !1)
 }
 var gy = typeof setTimeout == "function" ? setTimeout : void 0,
  E2 = typeof clearTimeout == "function" ? clearTimeout : void 0,
  vy = typeof Promise == "function" ? Promise : void 0,
  T2 = typeof queueMicrotask == "function" ? queueMicrotask : typeof vy < "u" ? function(t) {
   return vy.resolve(null).then(t).catch(A2)
  } : gy;

 function A2(t) {
  setTimeout(function() {
   throw t
  })
 }

 function ko(t) {
  return t === "head"
 }

 function yy(t, n) {
  var o = n,
   l = 0,
   u = 0;
  do {
   var p = o.nextSibling;
   if (t.removeChild(o), p && p.nodeType === 8)
    if (o = p.data, o === "/$") {
     if (0 < l && 8 > l) {
      o = l;
      var x = t.ownerDocument;
      if (o & 1 && El(x.documentElement), o & 2 && El(x.body), o & 4)
       for (o = x.head, El(o), x = o.firstChild; x;) {
        var M = x.nextSibling,
         B = x.nodeName;
        x[Sr] || B === "SCRIPT" || B === "STYLE" || B === "LINK" && x.rel.toLowerCase() === "stylesheet" || o.removeChild(x), x = M
       }
     }
     if (u === 0) {
      t.removeChild(p), jl(n);
      return
     }
     u--
    } else o === "$" || o === "$?" || o === "$!" ? u++ : l = o.charCodeAt(0) - 48;
   else l = 0;
   o = p
  } while (o);
  jl(n)
 }

 function Jf(t) {
  var n = t.firstChild;
  for (n && n.nodeType === 10 && (n = n.nextSibling); n;) {
   var o = n;
   switch (n = n.nextSibling, o.nodeName) {
    case "HTML":
    case "HEAD":
    case "BODY":
     Jf(o), Pi(o);
     continue;
    case "SCRIPT":
    case "STYLE":
     continue;
    case "LINK":
     if (o.rel.toLowerCase() === "stylesheet") continue
   }
   t.removeChild(o)
  }
 }

 function M2(t, n, o, l) {
  for (; t.nodeType === 1;) {
   var u = o;
   if (t.nodeName.toLowerCase() !== n.toLowerCase()) {
    if (!l && (t.nodeName !== "INPUT" || t.type !== "hidden")) break
   } else if (l) {
    if (!t[Sr]) switch (n) {
     case "meta":
      if (!t.hasAttribute("itemprop")) break;
      return t;
     case "link":
      if (p = t.getAttribute("rel"), p === "stylesheet" && t.hasAttribute("data-precedence")) break;
      if (p !== u.rel || t.getAttribute("href") !== (u.href == null || u.href === "" ? null : u.href) || t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin) || t.getAttribute("title") !== (u.title == null ? null : u.title)) break;
      return t;
     case "style":
      if (t.hasAttribute("data-precedence")) break;
      return t;
     case "script":
      if (p = t.getAttribute("src"), (p !== (u.src == null ? null : u.src) || t.getAttribute("type") !== (u.type == null ? null : u.type) || t.getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u.crossOrigin)) && p && t.hasAttribute("async") && !t.hasAttribute("itemprop")) break;
      return t;
     default:
      return t
    }
   } else if (n === "input" && t.type === "hidden") {
    var p = u.name == null ? null : "" + u.name;
    if (u.type === "hidden" && t.getAttribute("name") === p) return t
   } else return t;
   if (t = Rr(t.nextSibling), t === null) break
  }
  return null
 }

 function O2(t, n, o) {
  if (n === "") return null;
  for (; t.nodeType !== 3;)
   if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !o || (t = Rr(t.nextSibling), t === null)) return null;
  return t
 }

 function ep(t) {
  return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState === "complete"
 }

 function D2(t, n) {
  var o = t.ownerDocument;
  if (t.data !== "$?" || o.readyState === "complete") n();
  else {
   var l = function() {
    n(), o.removeEventListener("DOMContentLoaded", l)
   };
   o.addEventListener("DOMContentLoaded", l), t._reactRetry = l
  }
 }

 function Rr(t) {
  for (; t != null; t = t.nextSibling) {
   var n = t.nodeType;
   if (n === 1 || n === 3) break;
   if (n === 8) {
    if (n = t.data, n === "$" || n === "$!" || n === "$?" || n === "F!" || n === "F") break;
    if (n === "/$") return null
   }
  }
  return t
 }
 var tp = null;

 function by(t) {
  t = t.previousSibling;
  for (var n = 0; t;) {
   if (t.nodeType === 8) {
    var o = t.data;
    if (o === "$" || o === "$!" || o === "$?") {
     if (n === 0) return t;
     n--
    } else o === "/$" && n++
   }
   t = t.previousSibling
  }
  return null
 }

 function xy(t, n, o) {
  switch (n = Dc(o), t) {
   case "html":
    if (t = n.documentElement, !t) throw Error(i(452));
    return t;
   case "head":
    if (t = n.head, !t) throw Error(i(453));
    return t;
   case "body":
    if (t = n.body, !t) throw Error(i(454));
    return t;
   default:
    throw Error(i(451))
  }
 }

 function El(t) {
  for (var n = t.attributes; n.length;) t.removeAttributeNode(n[0]);
  Pi(t)
 }
 var ur = new Map,
  Sy = new Set;

 function kc(t) {
  return typeof t.getRootNode == "function" ? t.getRootNode() : t.nodeType === 9 ? t : t.ownerDocument
 }
 var lo = I.d;
 I.d = {
  f: k2,
  r: z2,
  D: j2,
  C: N2,
  L: L2,
  m: B2,
  X: _2,
  S: $2,
  M: U2
 };

 function k2() {
  var t = lo.f(),
   n = Cc();
  return t || n
 }

 function z2(t) {
  var n = $e(t);
  n !== null && n.tag === 5 && n.type === "form" ? Pg(n) : lo.r(t)
 }
 var ni = typeof document > "u" ? null : document;

 function Cy(t, n, o) {
  var l = ni;
  if (l && typeof n == "string" && n) {
   var u = rr(n);
   u = 'link[rel="' + t + '"][href="' + u + '"]', typeof o == "string" && (u += '[crossorigin="' + o + '"]'), Sy.has(u) || (Sy.add(u), t = {
    rel: t,
    crossOrigin: o,
    href: n
   }, l.querySelector(u) === null && (n = l.createElement("link"), Cn(n, "link", t), wt(n), l.head.appendChild(n)))
  }
 }

 function j2(t) {
  lo.D(t), Cy("dns-prefetch", t, null)
 }

 function N2(t, n) {
  lo.C(t, n), Cy("preconnect", t, n)
 }

 function L2(t, n, o) {
  lo.L(t, n, o);
  var l = ni;
  if (l && t && n) {
   var u = 'link[rel="preload"][as="' + rr(n) + '"]';
   n === "image" && o && o.imageSrcSet ? (u += '[imagesrcset="' + rr(o.imageSrcSet) + '"]', typeof o.imageSizes == "string" && (u += '[imagesizes="' + rr(o.imageSizes) + '"]')) : u += '[href="' + rr(t) + '"]';
   var p = u;
   switch (n) {
    case "style":
     p = ri(t);
     break;
    case "script":
     p = oi(t)
   }
   ur.has(p) || (t = g({
    rel: "preload",
    href: n === "image" && o && o.imageSrcSet ? void 0 : t,
    as: n
   }, o), ur.set(p, t), l.querySelector(u) !== null || n === "style" && l.querySelector(Tl(p)) || n === "script" && l.querySelector(Al(p)) || (n = l.createElement("link"), Cn(n, "link", t), wt(n), l.head.appendChild(n)))
  }
 }

 function B2(t, n) {
  lo.m(t, n);
  var o = ni;
  if (o && t) {
   var l = n && typeof n.as == "string" ? n.as : "script",
    u = 'link[rel="modulepreload"][as="' + rr(l) + '"][href="' + rr(t) + '"]',
    p = u;
   switch (l) {
    case "audioworklet":
    case "paintworklet":
    case "serviceworker":
    case "sharedworker":
    case "worker":
    case "script":
     p = oi(t)
   }
   if (!ur.has(p) && (t = g({
     rel: "modulepreload",
     href: t
    }, n), ur.set(p, t), o.querySelector(u) === null)) {
    switch (l) {
     case "audioworklet":
     case "paintworklet":
     case "serviceworker":
     case "sharedworker":
     case "worker":
     case "script":
      if (o.querySelector(Al(p))) return
    }
    l = o.createElement("link"), Cn(l, "link", t), wt(l), o.head.appendChild(l)
   }
  }
 }

 function $2(t, n, o) {
  lo.S(t, n, o);
  var l = ni;
  if (l && t) {
   var u = st(l).hoistableStyles,
    p = ri(t);
   n = n || "default";
   var x = u.get(p);
   if (!x) {
    var M = {
     loading: 0,
     preload: null
    };
    if (x = l.querySelector(Tl(p))) M.loading = 5;
    else {
     t = g({
      rel: "stylesheet",
      href: t,
      "data-precedence": n
     }, o), (o = ur.get(p)) && np(t, o);
     var B = x = l.createElement("link");
     wt(B), Cn(B, "link", t), B._p = new Promise(function(K, ie) {
      B.onload = K, B.onerror = ie
     }), B.addEventListener("load", function() {
      M.loading |= 1
     }), B.addEventListener("error", function() {
      M.loading |= 2
     }), M.loading |= 4, zc(x, n, l)
    }
    x = {
     type: "stylesheet",
     instance: x,
     count: 1,
     state: M
    }, u.set(p, x)
   }
  }
 }

 function _2(t, n) {
  lo.X(t, n);
  var o = ni;
  if (o && t) {
   var l = st(o).hoistableScripts,
    u = oi(t),
    p = l.get(u);
   p || (p = o.querySelector(Al(u)), p || (t = g({
    src: t,
    async: !0
   }, n), (n = ur.get(u)) && rp(t, n), p = o.createElement("script"), wt(p), Cn(p, "link", t), o.head.appendChild(p)), p = {
    type: "script",
    instance: p,
    count: 1,
    state: null
   }, l.set(u, p))
  }
 }

 function U2(t, n) {
  lo.M(t, n);
  var o = ni;
  if (o && t) {
   var l = st(o).hoistableScripts,
    u = oi(t),
    p = l.get(u);
   p || (p = o.querySelector(Al(u)), p || (t = g({
    src: t,
    async: !0,
    type: "module"
   }, n), (n = ur.get(u)) && rp(t, n), p = o.createElement("script"), wt(p), Cn(p, "link", t), o.head.appendChild(p)), p = {
    type: "script",
    instance: p,
    count: 1,
    state: null
   }, l.set(u, p))
  }
 }

 function wy(t, n, o, l) {
  var u = (u = re.current) ? kc(u) : null;
  if (!u) throw Error(i(446));
  switch (t) {
   case "meta":
   case "title":
    return null;
   case "style":
    return typeof o.precedence == "string" && typeof o.href == "string" ? (n = ri(o.href), o = st(u).hoistableStyles, l = o.get(n), l || (l = {
     type: "style",
     instance: null,
     count: 0,
     state: null
    }, o.set(n, l)), l) : {
     type: "void",
     instance: null,
     count: 0,
     state: null
    };
   case "link":
    if (o.rel === "stylesheet" && typeof o.href == "string" && typeof o.precedence == "string") {
     t = ri(o.href);
     var p = st(u).hoistableStyles,
      x = p.get(t);
     if (x || (u = u.ownerDocument || u, x = {
       type: "stylesheet",
       instance: null,
       count: 0,
       state: {
        loading: 0,
        preload: null
       }
      }, p.set(t, x), (p = u.querySelector(Tl(t))) && !p._p && (x.instance = p, x.state.loading = 5), ur.has(t) || (o = {
       rel: "preload",
       as: "style",
       href: o.href,
       crossOrigin: o.crossOrigin,
       integrity: o.integrity,
       media: o.media,
       hrefLang: o.hrefLang,
       referrerPolicy: o.referrerPolicy
      }, ur.set(t, o), p || I2(u, t, o, x.state))), n && l === null) throw Error(i(528, ""));
     return x
    }
    if (n && l !== null) throw Error(i(529, ""));
    return null;
   case "script":
    return n = o.async, o = o.src, typeof o == "string" && n && typeof n != "function" && typeof n != "symbol" ? (n = oi(o), o = st(u).hoistableScripts, l = o.get(n), l || (l = {
     type: "script",
     instance: null,
     count: 0,
     state: null
    }, o.set(n, l)), l) : {
     type: "void",
     instance: null,
     count: 0,
     state: null
    };
   default:
    throw Error(i(444, t))
  }
 }

 function ri(t) {
  return 'href="' + rr(t) + '"'
 }

 function Tl(t) {
  return 'link[rel="stylesheet"][' + t + "]"
 }

 function Ry(t) {
  return g({}, t, {
   "data-precedence": t.precedence,
   precedence: null
  })
 }

 function I2(t, n, o, l) {
  t.querySelector('link[rel="preload"][as="style"][' + n + "]") ? l.loading = 1 : (n = t.createElement("link"), l.preload = n, n.addEventListener("load", function() {
   return l.loading |= 1
  }), n.addEventListener("error", function() {
   return l.loading |= 2
  }), Cn(n, "link", o), wt(n), t.head.appendChild(n))
 }

 function oi(t) {
  return '[src="' + rr(t) + '"]'
 }

 function Al(t) {
  return "script[async]" + t
 }

 function Ey(t, n, o) {
  if (n.count++, n.instance === null) switch (n.type) {
   case "style":
    var l = t.querySelector('style[data-href~="' + rr(o.href) + '"]');
    if (l) return n.instance = l, wt(l), l;
    var u = g({}, o, {
     "data-href": o.href,
     "data-precedence": o.precedence,
     href: null,
     precedence: null
    });
    return l = (t.ownerDocument || t).createElement("style"), wt(l), Cn(l, "style", u), zc(l, o.precedence, t), n.instance = l;
   case "stylesheet":
    u = ri(o.href);
    var p = t.querySelector(Tl(u));
    if (p) return n.state.loading |= 4, n.instance = p, wt(p), p;
    l = Ry(o), (u = ur.get(u)) && np(l, u), p = (t.ownerDocument || t).createElement("link"), wt(p);
    var x = p;
    return x._p = new Promise(function(M, B) {
     x.onload = M, x.onerror = B
    }), Cn(p, "link", l), n.state.loading |= 4, zc(p, o.precedence, t), n.instance = p;
   case "script":
    return p = oi(o.src), (u = t.querySelector(Al(p))) ? (n.instance = u, wt(u), u) : (l = o, (u = ur.get(p)) && (l = g({}, o), rp(l, u)), t = t.ownerDocument || t, u = t.createElement("script"), wt(u), Cn(u, "link", l), t.head.appendChild(u), n.instance = u);
   case "void":
    return null;
   default:
    throw Error(i(443, n.type))
  } else n.type === "stylesheet" && (n.state.loading & 4) === 0 && (l = n.instance, n.state.loading |= 4, zc(l, o.precedence, t));
  return n.instance
 }

 function zc(t, n, o) {
  for (var l = o.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), u = l.length ? l[l.length - 1] : null, p = u, x = 0; x < l.length; x++) {
   var M = l[x];
   if (M.dataset.precedence === n) p = M;
   else if (p !== u) break
  }
  p ? p.parentNode.insertBefore(t, p.nextSibling) : (n = o.nodeType === 9 ? o.head : o, n.insertBefore(t, n.firstChild))
 }

 function np(t, n) {
  t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.title == null && (t.title = n.title)
 }

 function rp(t, n) {
  t.crossOrigin == null && (t.crossOrigin = n.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = n.referrerPolicy), t.integrity == null && (t.integrity = n.integrity)
 }
 var jc = null;

 function Ty(t, n, o) {
  if (jc === null) {
   var l = new Map,
    u = jc = new Map;
   u.set(o, l)
  } else u = jc, l = u.get(o), l || (l = new Map, u.set(o, l));
  if (l.has(t)) return l;
  for (l.set(t, null), o = o.getElementsByTagName(t), u = 0; u < o.length; u++) {
   var p = o[u];
   if (!(p[Sr] || p[zt] || t === "link" && p.getAttribute("rel") === "stylesheet") && p.namespaceURI !== "http://www.w3.org/2000/svg") {
    var x = p.getAttribute(n) || "";
    x = t + x;
    var M = l.get(x);
    M ? M.push(p) : l.set(x, [p])
   }
  }
  return l
 }

 function Ay(t, n, o) {
  t = t.ownerDocument || t, t.head.insertBefore(o, n === "title" ? t.querySelector("head > title") : null)
 }

 function P2(t, n, o) {
  if (o === 1 || n.itemProp != null) return !1;
  switch (t) {
   case "meta":
   case "title":
    return !0;
   case "style":
    if (typeof n.precedence != "string" || typeof n.href != "string" || n.href === "") break;
    return !0;
   case "link":
    if (typeof n.rel != "string" || typeof n.href != "string" || n.href === "" || n.onLoad || n.onError) break;
    switch (n.rel) {
     case "stylesheet":
      return t = n.disabled, typeof n.precedence == "string" && t == null;
     default:
      return !0
    }
   case "script":
    if (n.async && typeof n.async != "function" && typeof n.async != "symbol" && !n.onLoad && !n.onError && n.src && typeof n.src == "string") return !0
  }
  return !1
 }

 function My(t) {
  return !(t.type === "stylesheet" && (t.state.loading & 3) === 0)
 }
 var Ml = null;

 function H2() {}

 function q2(t, n, o) {
  if (Ml === null) throw Error(i(475));
  var l = Ml;
  if (n.type === "stylesheet" && (typeof o.media != "string" || matchMedia(o.media).matches !== !1) && (n.state.loading & 4) === 0) {
   if (n.instance === null) {
    var u = ri(o.href),
     p = t.querySelector(Tl(u));
    if (p) {
     t = p._p, t !== null && typeof t == "object" && typeof t.then == "function" && (l.count++, l = Nc.bind(l), t.then(l, l)), n.state.loading |= 4, n.instance = p, wt(p);
     return
    }
    p = t.ownerDocument || t, o = Ry(o), (u = ur.get(u)) && np(o, u), p = p.createElement("link"), wt(p);
    var x = p;
    x._p = new Promise(function(M, B) {
     x.onload = M, x.onerror = B
    }), Cn(p, "link", o), n.instance = p
   }
   l.stylesheets === null && (l.stylesheets = new Map), l.stylesheets.set(n, t), (t = n.state.preload) && (n.state.loading & 3) === 0 && (l.count++, n = Nc.bind(l), t.addEventListener("load", n), t.addEventListener("error", n))
  }
 }

 function V2() {
  if (Ml === null) throw Error(i(475));
  var t = Ml;
  return t.stylesheets && t.count === 0 && op(t, t.stylesheets), 0 < t.count ? function(n) {
   var o = setTimeout(function() {
    if (t.stylesheets && op(t, t.stylesheets), t.unsuspend) {
     var l = t.unsuspend;
     t.unsuspend = null, l()
    }
   }, 6e4);
   return t.unsuspend = n,
    function() {
     t.unsuspend = null, clearTimeout(o)
    }
  } : null
 }

 function Nc() {
  if (this.count--, this.count === 0) {
   if (this.stylesheets) op(this, this.stylesheets);
   else if (this.unsuspend) {
    var t = this.unsuspend;
    this.unsuspend = null, t()
   }
  }
 }
 var Lc = null;

 function op(t, n) {
  t.stylesheets = null, t.unsuspend !== null && (t.count++, Lc = new Map, n.forEach(G2, t), Lc = null, Nc.call(t))
 }

 function G2(t, n) {
  if (!(n.state.loading & 4)) {
   var o = Lc.get(t);
   if (o) var l = o.get(null);
   else {
    o = new Map, Lc.set(t, o);
    for (var u = t.querySelectorAll("link[data-precedence],style[data-precedence]"), p = 0; p < u.length; p++) {
     var x = u[p];
     (x.nodeName === "LINK" || x.getAttribute("media") !== "not all") && (o.set(x.dataset.precedence, x), l = x)
    }
    l && o.set(null, l)
   }
   u = n.instance, x = u.getAttribute("data-precedence"), p = o.get(x) || l, p === l && o.set(null, u), o.set(x, u), this.count++, l = Nc.bind(this), u.addEventListener("load", l), u.addEventListener("error", l), p ? p.parentNode.insertBefore(u, p.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(u, t.firstChild)), n.state.loading |= 4
  }
 }
 var Ol = {
  $$typeof: E,
  Provider: null,
  Consumer: null,
  _currentValue: Q,
  _currentValue2: Q,
  _threadCount: 0
 };

 function Y2(t, n, o, l, u, p, x, M) {
  this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = jn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = jn(0), this.hiddenUpdates = jn(null), this.identifierPrefix = l, this.onUncaughtError = u, this.onCaughtError = p, this.onRecoverableError = x, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = M, this.incompleteTransitions = new Map
 }

 function Oy(t, n, o, l, u, p, x, M, B, K, ie, ue) {
  return t = new Y2(t, n, o, x, M, B, K, ue), n = 1, p === !0 && (n |= 24), p = Vn(3, null, null, n), t.current = p, p.stateNode = t, n = _d(), n.refCount++, t.pooledCache = n, n.refCount++, p.memoizedState = {
   element: l,
   isDehydrated: o,
   cache: n
  }, Hd(p), t
 }

 function Dy(t) {
  return t ? (t = La, t) : La
 }

 function ky(t, n, o, l, u, p) {
  u = Dy(u), l.context === null ? l.context = u : l.pendingContext = u, l = yo(n), l.payload = {
   element: o
  }, p = p === void 0 ? null : p, p !== null && (l.callback = p), o = bo(t, l, n), o !== null && (Fn(o, t, n), al(o, t, n))
 }

 function zy(t, n) {
  if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
   var o = t.retryLane;
   t.retryLane = o !== 0 && o < n ? o : n
  }
 }

 function ap(t, n) {
  zy(t, n), (t = t.alternate) && zy(t, n)
 }

 function jy(t) {
  if (t.tag === 13) {
   var n = Na(t, 67108864);
   n !== null && Fn(n, t, 67108864), ap(t, 67108864)
  }
 }
 var Bc = !0;

 function X2(t, n, o, l) {
  var u = z.T;
  z.T = null;
  var p = I.p;
  try {
   I.p = 2, ip(t, n, o, l)
  } finally {
   I.p = p, z.T = u
  }
 }

 function W2(t, n, o, l) {
  var u = z.T;
  z.T = null;
  var p = I.p;
  try {
   I.p = 8, ip(t, n, o, l)
  } finally {
   I.p = p, z.T = u
  }
 }

 function ip(t, n, o, l) {
  if (Bc) {
   var u = lp(l);
   if (u === null) Xf(t, n, l, $c, o), Ly(t, l);
   else if (K2(u, t, n, o, l)) l.stopPropagation();
   else if (Ly(t, l), n & 4 && -1 < F2.indexOf(t)) {
    for (; u !== null;) {
     var p = $e(u);
     if (p !== null) switch (p.tag) {
      case 3:
       if (p = p.stateNode, p.current.memoizedState.isDehydrated) {
        var x = Me(p.pendingLanes);
        if (x !== 0) {
         var M = p;
         for (M.pendingLanes |= 2, M.entangledLanes |= 2; x;) {
          var B = 1 << 31 - be(x);
          M.entanglements[1] |= B, x &= ~B
         }
         jr(p), (Rt & 6) === 0 && (xc = Ne() + 500, Cl(0))
        }
       }
       break;
      case 13:
       M = Na(p, 2), M !== null && Fn(M, p, 2), Cc(), ap(p, 2)
     }
     if (p = lp(l), p === null && Xf(t, n, l, $c, o), p === u) break;
     u = p
    }
    u !== null && l.stopPropagation()
   } else Xf(t, n, l, null, o)
  }
 }

 function lp(t) {
  return t = dd(t), sp(t)
 }
 var $c = null;

 function sp(t) {
  if ($c = null, t = oe(t), t !== null) {
   var n = c(t);
   if (n === null) t = null;
   else {
    var o = n.tag;
    if (o === 13) {
     if (t = d(n), t !== null) return t;
     t = null
    } else if (o === 3) {
     if (n.stateNode.current.memoizedState.isDehydrated) return n.tag === 3 ? n.stateNode.containerInfo : null;
     t = null
    } else n !== t && (t = null)
   }
  }
  return $c = t, null
 }

 function Ny(t) {
  switch (t) {
   case "beforetoggle":
   case "cancel":
   case "click":
   case "close":
   case "contextmenu":
   case "copy":
   case "cut":
   case "auxclick":
   case "dblclick":
   case "dragend":
   case "dragstart":
   case "drop":
   case "focusin":
   case "focusout":
   case "input":
   case "invalid":
   case "keydown":
   case "keypress":
   case "keyup":
   case "mousedown":
   case "mouseup":
   case "paste":
   case "pause":
   case "play":
   case "pointercancel":
   case "pointerdown":
   case "pointerup":
   case "ratechange":
   case "reset":
   case "resize":
   case "seeked":
   case "submit":
   case "toggle":
   case "touchcancel":
   case "touchend":
   case "touchstart":
   case "volumechange":
   case "change":
   case "selectionchange":
   case "textInput":
   case "compositionstart":
   case "compositionend":
   case "compositionupdate":
   case "beforeblur":
   case "afterblur":
   case "beforeinput":
   case "blur":
   case "fullscreenchange":
   case "focus":
   case "hashchange":
   case "popstate":
   case "select":
   case "selectstart":
    return 2;
   case "drag":
   case "dragenter":
   case "dragexit":
   case "dragleave":
   case "dragover":
   case "mousemove":
   case "mouseout":
   case "mouseover":
   case "pointermove":
   case "pointerout":
   case "pointerover":
   case "scroll":
   case "touchmove":
   case "wheel":
   case "mouseenter":
   case "mouseleave":
   case "pointerenter":
   case "pointerleave":
    return 8;
   case "message":
    switch (Je()) {
     case Ke:
      return 2;
     case Pe:
      return 8;
     case He:
     case Ee:
      return 32;
     case mt:
      return 268435456;
     default:
      return 32
    }
   default:
    return 32
  }
 }
 var cp = !1,
  zo = null,
  jo = null,
  No = null,
  Dl = new Map,
  kl = new Map,
  Lo = [],
  F2 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");

 function Ly(t, n) {
  switch (t) {
   case "focusin":
   case "focusout":
    zo = null;
    break;
   case "dragenter":
   case "dragleave":
    jo = null;
    break;
   case "mouseover":
   case "mouseout":
    No = null;
    break;
   case "pointerover":
   case "pointerout":
    Dl.delete(n.pointerId);
    break;
   case "gotpointercapture":
   case "lostpointercapture":
    kl.delete(n.pointerId)
  }
 }

 function zl(t, n, o, l, u, p) {
  return t === null || t.nativeEvent !== p ? (t = {
   blockedOn: n,
   domEventName: o,
   eventSystemFlags: l,
   nativeEvent: p,
   targetContainers: [u]
  }, n !== null && (n = $e(n), n !== null && jy(n)), t) : (t.eventSystemFlags |= l, n = t.targetContainers, u !== null && n.indexOf(u) === -1 && n.push(u), t)
 }

 function K2(t, n, o, l, u) {
  switch (n) {
   case "focusin":
    return zo = zl(zo, t, n, o, l, u), !0;
   case "dragenter":
    return jo = zl(jo, t, n, o, l, u), !0;
   case "mouseover":
    return No = zl(No, t, n, o, l, u), !0;
   case "pointerover":
    var p = u.pointerId;
    return Dl.set(p, zl(Dl.get(p) || null, t, n, o, l, u)), !0;
   case "gotpointercapture":
    return p = u.pointerId, kl.set(p, zl(kl.get(p) || null, t, n, o, l, u)), !0
  }
  return !1
 }

 function By(t) {
  var n = oe(t.target);
  if (n !== null) {
   var o = c(n);
   if (o !== null) {
    if (n = o.tag, n === 13) {
     if (n = d(o), n !== null) {
      t.blockedOn = n, En(t.priority, function() {
       if (o.tag === 13) {
        var l = Wn();
        l = pt(l);
        var u = Na(o, l);
        u !== null && Fn(u, o, l), ap(o, l)
       }
      });
      return
     }
    } else if (n === 3 && o.stateNode.current.memoizedState.isDehydrated) {
     t.blockedOn = o.tag === 3 ? o.stateNode.containerInfo : null;
     return
    }
   }
  }
  t.blockedOn = null
 }

 function _c(t) {
  if (t.blockedOn !== null) return !1;
  for (var n = t.targetContainers; 0 < n.length;) {
   var o = lp(t.nativeEvent);
   if (o === null) {
    o = t.nativeEvent;
    var l = new o.constructor(o.type, o);
    ud = l, o.target.dispatchEvent(l), ud = null
   } else return n = $e(o), n !== null && jy(n), t.blockedOn = o, !1;
   n.shift()
  }
  return !0
 }

 function $y(t, n, o) {
  _c(t) && o.delete(n)
 }

 function Q2() {
  cp = !1, zo !== null && _c(zo) && (zo = null), jo !== null && _c(jo) && (jo = null), No !== null && _c(No) && (No = null), Dl.forEach($y), kl.forEach($y)
 }

 function Uc(t, n) {
  t.blockedOn === n && (t.blockedOn = null, cp || (cp = !0, e.unstable_scheduleCallback(e.unstable_NormalPriority, Q2)))
 }
 var Ic = null;

 function _y(t) {
  Ic !== t && (Ic = t, e.unstable_scheduleCallback(e.unstable_NormalPriority, function() {
   Ic === t && (Ic = null);
   for (var n = 0; n < t.length; n += 3) {
    var o = t[n],
     l = t[n + 1],
     u = t[n + 2];
    if (typeof l != "function") {
     if (sp(l || o) === null) continue;
     break
    }
    var p = $e(o);
    p !== null && (t.splice(n, 3), n -= 3, sf(p, {
     pending: !0,
     data: u,
     method: o.method,
     action: l
    }, l, u))
   }
  }))
 }

 function jl(t) {
  function n(B) {
   return Uc(B, t)
  }
  zo !== null && Uc(zo, t), jo !== null && Uc(jo, t), No !== null && Uc(No, t), Dl.forEach(n), kl.forEach(n);
  for (var o = 0; o < Lo.length; o++) {
   var l = Lo[o];
   l.blockedOn === t && (l.blockedOn = null)
  }
  for (; 0 < Lo.length && (o = Lo[0], o.blockedOn === null);) By(o), o.blockedOn === null && Lo.shift();
  if (o = (t.ownerDocument || t).$$reactFormReplay, o != null)
   for (l = 0; l < o.length; l += 3) {
    var u = o[l],
     p = o[l + 1],
     x = u[jt] || null;
    if (typeof p == "function") x || _y(o);
    else if (x) {
     var M = null;
     if (p && p.hasAttribute("formAction")) {
      if (u = p, x = p[jt] || null) M = x.formAction;
      else if (sp(u) !== null) continue
     } else M = x.action;
     typeof M == "function" ? o[l + 1] = M : (o.splice(l, 3), l -= 3), _y(o)
    }
   }
 }

 function up(t) {
  this._internalRoot = t
 }
 Pc.prototype.render = up.prototype.render = function(t) {
  var n = this._internalRoot;
  if (n === null) throw Error(i(409));
  var o = n.current,
   l = Wn();
  ky(o, l, t, n, null, null)
 }, Pc.prototype.unmount = up.prototype.unmount = function() {
  var t = this._internalRoot;
  if (t !== null) {
   this._internalRoot = null;
   var n = t.containerInfo;
   ky(t.current, 2, null, t, null, null), Cc(), n[pn] = null
  }
 };

 function Pc(t) {
  this._internalRoot = t
 }
 Pc.prototype.unstable_scheduleHydration = function(t) {
  if (t) {
   var n = kt();
   t = {
    blockedOn: null,
    target: t,
    priority: n
   };
   for (var o = 0; o < Lo.length && n !== 0 && n < Lo[o].priority; o++);
   Lo.splice(o, 0, t), o === 0 && By(t)
  }
 };
 var Uy = r.version;
 if (Uy !== "19.1.0") throw Error(i(527, Uy, "19.1.0"));
 I.findDOMNode = function(t) {
  var n = t._reactInternals;
  if (n === void 0) throw typeof t.render == "function" ? Error(i(188)) : (t = Object.keys(t).join(","), Error(i(268, t)));
  return t = h(n), t = t !== null ? m(t) : null, t = t === null ? null : t.stateNode, t
 };
 var Z2 = {
  bundleType: 0,
  version: "19.1.0",
  rendererPackageName: "react-dom",
  currentDispatcherRef: z,
  reconcilerVersion: "19.1.0"
 };
 if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Hc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Hc.isDisabled && Hc.supportsFiber) try {
   me = Hc.inject(Z2), ve = Hc
  } catch {}
 }
 return Ll.createRoot = function(t, n) {
  if (!s(t)) throw Error(i(299));
  var o = !1,
   l = "",
   u = tv,
   p = nv,
   x = rv,
   M = null;
  return n != null && (n.unstable_strictMode === !0 && (o = !0), n.identifierPrefix !== void 0 && (l = n.identifierPrefix), n.onUncaughtError !== void 0 && (u = n.onUncaughtError), n.onCaughtError !== void 0 && (p = n.onCaughtError), n.onRecoverableError !== void 0 && (x = n.onRecoverableError), n.unstable_transitionCallbacks !== void 0 && (M = n.unstable_transitionCallbacks)), n = Oy(t, 1, !1, null, null, o, l, u, p, x, M, null), t[pn] = n.current, Yf(t), new up(n)
 }, Ll.hydrateRoot = function(t, n, o) {
  if (!s(t)) throw Error(i(299));
  var l = !1,
   u = "",
   p = tv,
   x = nv,
   M = rv,
   B = null,
   K = null;
  return o != null && (o.unstable_strictMode === !0 && (l = !0), o.identifierPrefix !== void 0 && (u = o.identifierPrefix), o.onUncaughtError !== void 0 && (p = o.onUncaughtError), o.onCaughtError !== void 0 && (x = o.onCaughtError), o.onRecoverableError !== void 0 && (M = o.onRecoverableError), o.unstable_transitionCallbacks !== void 0 && (B = o.unstable_transitionCallbacks), o.formState !== void 0 && (K = o.formState)), n = Oy(t, 1, !0, n, o ?? null, l, u, p, x, M, B, K), n.context = Dy(null), o = n.current, l = Wn(), l = pt(l), u = yo(l), u.callback = null, bo(o, u, l), o = l, n.current.lanes = o, Fe(n, o), jr(n), t[pn] = n.current, Yf(t), new Pc(n)
 }, Ll.version = "19.1.0", Ll
}
var Fy;

function uC() {
 if (Fy) return pp.exports;
 Fy = 1;

 function e() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
   __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)
  } catch (r) {
   console.error(r)
  }
 }
 return e(), pp.exports = cC(), pp.exports
}
var dC = uC();
class fC {
 constructor(r = "/api") {
  la(this, "baseUrl");
  la(this, "token", null);
  this.baseUrl = r, this.token = localStorage.getItem("auth_token")
 }
 isLoggedIn() {
  return !!this.token
 }
 setToken(r) {
  this.token = r, localStorage.setItem("auth_token", r)
 }
 clearToken() {
  this.token = null, localStorage.removeItem("auth_token")
 }
 async login(r, a, i = !1) {
  try {
   const c = await (await fetch(`${this.baseUrl}/login`, {
    method: "POST",
    headers: {
     "Content-Type": "application/json"
    },
    body: JSON.stringify({
     username: r,
     password: a,
     rememberMe: i
    })
   })).json();
   return c.success && c.token && this.setToken(c.token), c
  } catch (s) {
   return console.error("登录失败:", s), {
    success: !1,
    message: "登录请求失败，请检查网络连接"
   }
  }
 }
 logout() {
  this.clearToken()
 }
 async request(r, a = {}) {
  const i = {
   "Content-Type": "application/json"
  };
  this.token && (i.Authorization = `Bearer ${this.token}`);
  const s = await fetch(`${this.baseUrl}/${r}`, {
   headers: i,
   ...a
  });
  if (s.status === 401) throw this.clearToken(), new Error("认证已过期或无效，请重新登录");
  if (!s.ok) throw new Error(`API错误: ${s.status}`);
  return s.json()
 }
 async checkAuthStatus() {
  try {
   return this.token ? (await this.getConfigs(), !0) : !1
  } catch (r) {
   return console.log("认证检查:", r), r instanceof Error && (r.message.includes("认证") || r.message.includes("API错误: 401")) ? (this.clearToken(), !1) : !!this.token
  }
 }
 async getGroups() {
  return this.request("groups")
 }
 async getGroup(r) {
  return this.request(`groups/${r}`)
 }
 async createGroup(r) {
  return this.request("groups", {
   method: "POST",
   body: JSON.stringify(r)
  })
 }
 async updateGroup(r, a) {
  return this.request(`groups/${r}`, {
   method: "PUT",
   body: JSON.stringify(a)
  })
 }
 async deleteGroup(r) {
  return (await this.request(`groups/${r}`, {
   method: "DELETE"
  })).success
 }
 async getSites(r) {
  const a = r ? `sites?groupId=${r}` : "sites";
  return this.request(a)
 }
 async getSite(r) {
  return this.request(`sites/${r}`)
 }
 async createSite(r) {
  return this.request("sites", {
   method: "POST",
   body: JSON.stringify(r)
  })
 }
 async updateSite(r, a) {
  return this.request(`sites/${r}`, {
   method: "PUT",
   body: JSON.stringify(a)
  })
 }
 async deleteSite(r) {
  return (await this.request(`sites/${r}`, {
   method: "DELETE"
  })).success
 }
 async getConfigs() {
  return this.request("configs")
 }
 async getConfig(r) {
  try {
   return (await this.request(`configs/${r}`)).value
  } catch {
   return null
  }
 }
 async setConfig(r, a) {
  return (await this.request(`configs/${r}`, {
   method: "PUT",
   body: JSON.stringify({
    value: a
   })
  })).success
 }
 async deleteConfig(r) {
  return (await this.request(`configs/${r}`, {
   method: "DELETE"
  })).success
 }
 async updateGroupOrder(r) {
  return (await this.request("group-orders", {
   method: "PUT",
   body: JSON.stringify(r)
  })).success
 }
 async updateSiteOrder(r) {
  return (await this.request("site-orders", {
   method: "PUT",
   body: JSON.stringify(r)
  })).success
 }
 async exportData() {
  return this.request("export")
 }
 async importData(r) {
  return await this.request("import", {
   method: "POST",
   body: JSON.stringify(r)
  })
 }
}
const as = {
  black: "#000",
  white: "#fff"
 },
 ai = {
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  700: "#d32f2f",
  800: "#c62828"
 },
 ii = {
  50: "#f3e5f5",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  700: "#7b1fa2"
 },
 li = {
  50: "#e3f2fd",
  200: "#90caf9",
  400: "#42a5f5",
  700: "#1976d2",
  800: "#1565c0"
 },
 si = {
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  700: "#0288d1",
  900: "#01579b"
 },
 ci = {
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20"
 },
 Bl = {
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  700: "#f57c00",
  900: "#e65100"
 },
 pC = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
  A100: "#f5f5f5",
  A200: "#eeeeee",
  A400: "#bdbdbd",
  A700: "#616161"
 };

function uo(e, ...r) {
 const a = new URL(`https://mui.com/production-error/?code=${e}`);
 return r.forEach(i => a.searchParams.append("args[]", i)), `Minified MUI error #${e}; visit ${a} for the full message.`
}
const Ir = "$$material";

function gu() {
 return gu = Object.assign ? Object.assign.bind() : function(e) {
  for (var r = 1; r < arguments.length; r++) {
   var a = arguments[r];
   for (var i in a)({}).hasOwnProperty.call(a, i) && (e[i] = a[i])
  }
  return e
 }, gu.apply(null, arguments)
}

function hC(e) {
 if (e.sheet) return e.sheet;
 for (var r = 0; r < document.styleSheets.length; r++)
  if (document.styleSheets[r].ownerNode === e) return document.styleSheets[r]
}

function mC(e) {
 var r = document.createElement("style");
 return r.setAttribute("data-emotion", e.key), e.nonce !== void 0 && r.setAttribute("nonce", e.nonce), r.appendChild(document.createTextNode("")), r.setAttribute("data-s", ""), r
}
var gC = function() {
  function e(a) {
   var i = this;
   this._insertTag = function(s) {
    var c;
    i.tags.length === 0 ? i.insertionPoint ? c = i.insertionPoint.nextSibling : i.prepend ? c = i.container.firstChild : c = i.before : c = i.tags[i.tags.length - 1].nextSibling, i.container.insertBefore(s, c), i.tags.push(s)
   }, this.isSpeedy = a.speedy === void 0 ? !0 : a.speedy, this.tags = [], this.ctr = 0, this.nonce = a.nonce, this.key = a.key, this.container = a.container, this.prepend = a.prepend, this.insertionPoint = a.insertionPoint, this.before = null
  }
  var r = e.prototype;
  return r.hydrate = function(i) {
   i.forEach(this._insertTag)
  }, r.insert = function(i) {
   this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(mC(this));
   var s = this.tags[this.tags.length - 1];
   if (this.isSpeedy) {
    var c = hC(s);
    try {
     c.insertRule(i, c.cssRules.length)
    } catch {}
   } else s.appendChild(document.createTextNode(i));
   this.ctr++
  }, r.flush = function() {
   this.tags.forEach(function(i) {
    var s;
    return (s = i.parentNode) == null ? void 0 : s.removeChild(i)
   }), this.tags = [], this.ctr = 0
  }, e
 }(),
 Mn = "-ms-",
 vu = "-moz-",
 xt = "-webkit-",
 Ub = "comm",
 vh = "rule",
 yh = "decl",
 vC = "@import",
 Ib = "@keyframes",
 yC = "@layer",
 bC = Math.abs,
 Mu = String.fromCharCode,
 xC = Object.assign;

function SC(e, r) {
 return wn(e, 0) ^ 45 ? (((r << 2 ^ wn(e, 0)) << 2 ^ wn(e, 1)) << 2 ^ wn(e, 2)) << 2 ^ wn(e, 3) : 0
}

function Pb(e) {
 return e.trim()
}

function CC(e, r) {
 return (e = r.exec(e)) ? e[0] : e
}

function St(e, r, a) {
 return e.replace(r, a)
}

function Hp(e, r) {
 return e.indexOf(r)
}

function wn(e, r) {
 return e.charCodeAt(r) | 0
}

function is(e, r, a) {
 return e.slice(r, a)
}

function $r(e) {
 return e.length
}

function bh(e) {
 return e.length
}

function qc(e, r) {
 return r.push(e), e
}

function wC(e, r) {
 return e.map(r).join("")
}
var Ou = 1,
 Ai = 1,
 Hb = 0,
 Pn = 0,
 ln = 0,
 Bi = "";

function Du(e, r, a, i, s, c, d) {
 return {
  value: e,
  root: r,
  parent: a,
  type: i,
  props: s,
  children: c,
  line: Ou,
  column: Ai,
  length: d,
  return: ""
 }
}

function $l(e, r) {
 return xC(Du("", null, null, "", null, null, 0), e, {
  length: -e.length
 }, r)
}

function RC() {
 return ln
}

function EC() {
 return ln = Pn > 0 ? wn(Bi, --Pn) : 0, Ai--, ln === 10 && (Ai = 1, Ou--), ln
}

function Qn() {
 return ln = Pn < Hb ? wn(Bi, Pn++) : 0, Ai++, ln === 10 && (Ai = 1, Ou++), ln
}

function Pr() {
 return wn(Bi, Pn)
}

function cu() {
 return Pn
}

function xs(e, r) {
 return is(Bi, e, r)
}

function ls(e) {
 switch (e) {
  case 0:
  case 9:
  case 10:
  case 13:
  case 32:
   return 5;
  case 33:
  case 43:
  case 44:
  case 47:
  case 62:
  case 64:
  case 126:
  case 59:
  case 123:
  case 125:
   return 4;
  case 58:
   return 3;
  case 34:
  case 39:
  case 40:
  case 91:
   return 2;
  case 41:
  case 93:
   return 1
 }
 return 0
}

function qb(e) {
 return Ou = Ai = 1, Hb = $r(Bi = e), Pn = 0, []
}

function Vb(e) {
 return Bi = "", e
}

function uu(e) {
 return Pb(xs(Pn - 1, qp(e === 91 ? e + 2 : e === 40 ? e + 1 : e)))
}

function TC(e) {
 for (;
  (ln = Pr()) && ln < 33;) Qn();
 return ls(e) > 2 || ls(ln) > 3 ? "" : " "
}

function AC(e, r) {
 for (; --r && Qn() && !(ln < 48 || ln > 102 || ln > 57 && ln < 65 || ln > 70 && ln < 97););
 return xs(e, cu() + (r < 6 && Pr() == 32 && Qn() == 32))
}

function qp(e) {
 for (; Qn();) switch (ln) {
  case e:
   return Pn;
  case 34:
  case 39:
   e !== 34 && e !== 39 && qp(ln);
   break;
  case 40:
   e === 41 && qp(e);
   break;
  case 92:
   Qn();
   break
 }
 return Pn
}

function MC(e, r) {
 for (; Qn() && e + ln !== 57;)
  if (e + ln === 84 && Pr() === 47) break;
 return "/*" + xs(r, Pn - 1) + "*" + Mu(e === 47 ? e : Qn())
}

function OC(e) {
 for (; !ls(Pr());) Qn();
 return xs(e, Pn)
}

function DC(e) {
 return Vb(du("", null, null, null, [""], e = qb(e), 0, [0], e))
}

function du(e, r, a, i, s, c, d, f, h) {
 for (var m = 0, g = 0, b = d, w = 0, R = 0, T = 0, C = 1, D = 1, k = 1, N = 0, E = "", A = s, O = c, L = i, U = E; D;) switch (T = N, N = Qn()) {
  case 40:
   if (T != 108 && wn(U, b - 1) == 58) {
    Hp(U += St(uu(N), "&", "&\f"), "&\f") != -1 && (k = -1);
    break
   }
  case 34:
  case 39:
  case 91:
   U += uu(N);
   break;
  case 9:
  case 10:
  case 13:
  case 32:
   U += TC(T);
   break;
  case 92:
   U += AC(cu() - 1, 7);
   continue;
  case 47:
   switch (Pr()) {
    case 42:
    case 47:
     qc(kC(MC(Qn(), cu()), r, a), h);
     break;
    default:
     U += "/"
   }
   break;
  case 123 * C:
   f[m++] = $r(U) * k;
  case 125 * C:
  case 59:
  case 0:
   switch (N) {
    case 0:
    case 125:
     D = 0;
    case 59 + g:
     k == -1 && (U = St(U, /\f/g, "")), R > 0 && $r(U) - b && qc(R > 32 ? Qy(U + ";", i, a, b - 1) : Qy(St(U, " ", "") + ";", i, a, b - 2), h);
     break;
    case 59:
     U += ";";
    default:
     if (qc(L = Ky(U, r, a, m, g, s, f, E, A = [], O = [], b), c), N === 123)
      if (g === 0) du(U, r, L, L, A, c, b, f, O);
      else switch (w === 99 && wn(U, 3) === 110 ? 100 : w) {
       case 100:
       case 108:
       case 109:
       case 115:
        du(e, L, L, i && qc(Ky(e, L, L, 0, 0, s, f, E, s, A = [], b), O), s, O, b, f, i ? A : O);
        break;
       default:
        du(U, L, L, L, [""], O, 0, f, O)
      }
   }
   m = g = R = 0, C = k = 1, E = U = "", b = d;
   break;
  case 58:
   b = 1 + $r(U), R = T;
  default:
   if (C < 1) {
    if (N == 123) --C;
    else if (N == 125 && C++ == 0 && EC() == 125) continue
   }
   switch (U += Mu(N), N * C) {
    case 38:
     k = g > 0 ? 1 : (U += "\f", -1);
     break;
    case 44:
     f[m++] = ($r(U) - 1) * k, k = 1;
     break;
    case 64:
     Pr() === 45 && (U += uu(Qn())), w = Pr(), g = b = $r(E = U += OC(cu())), N++;
     break;
    case 45:
     T === 45 && $r(U) == 2 && (C = 0)
   }
 }
 return c
}

function Ky(e, r, a, i, s, c, d, f, h, m, g) {
 for (var b = s - 1, w = s === 0 ? c : [""], R = bh(w), T = 0, C = 0, D = 0; T < i; ++T)
  for (var k = 0, N = is(e, b + 1, b = bC(C = d[T])), E = e; k < R; ++k)(E = Pb(C > 0 ? w[k] + " " + N : St(N, /&\f/g, w[k]))) && (h[D++] = E);
 return Du(e, r, a, s === 0 ? vh : f, h, m, g)
}

function kC(e, r, a) {
 return Du(e, r, a, Ub, Mu(RC()), is(e, 2, -2), 0)
}

function Qy(e, r, a, i) {
 return Du(e, r, a, yh, is(e, 0, i), is(e, i + 1, -1), i)
}

function Si(e, r) {
 for (var a = "", i = bh(e), s = 0; s < i; s++) a += r(e[s], s, e, r) || "";
 return a
}

function zC(e, r, a, i) {
 switch (e.type) {
  case yC:
   if (e.children.length) break;
  case vC:
  case yh:
   return e.return = e.return || e.value;
  case Ub:
   return "";
  case Ib:
   return e.return = e.value + "{" + Si(e.children, i) + "}";
  case vh:
   e.value = e.props.join(",")
 }
 return $r(a = Si(e.children, i)) ? e.return = e.value + "{" + a + "}" : ""
}

function jC(e) {
 var r = bh(e);
 return function(a, i, s, c) {
  for (var d = "", f = 0; f < r; f++) d += e[f](a, i, s, c) || "";
  return d
 }
}

function NC(e) {
 return function(r) {
  r.root || (r = r.return) && e(r)
 }
}

function Gb(e) {
 var r = Object.create(null);
 return function(a) {
  return r[a] === void 0 && (r[a] = e(a)), r[a]
 }
}
var LC = function(r, a, i) {
  for (var s = 0, c = 0; s = c, c = Pr(), s === 38 && c === 12 && (a[i] = 1), !ls(c);) Qn();
  return xs(r, Pn)
 },
 BC = function(r, a) {
  var i = -1,
   s = 44;
  do switch (ls(s)) {
   case 0:
    s === 38 && Pr() === 12 && (a[i] = 1), r[i] += LC(Pn - 1, a, i);
    break;
   case 2:
    r[i] += uu(s);
    break;
   case 4:
    if (s === 44) {
     r[++i] = Pr() === 58 ? "&\f" : "", a[i] = r[i].length;
     break
    }
   default:
    r[i] += Mu(s)
  }
  while (s = Qn());
  return r
 },
 $C = function(r, a) {
  return Vb(BC(qb(r), a))
 },
 Zy = new WeakMap,
 _C = function(r) {
  if (!(r.type !== "rule" || !r.parent || r.length < 1)) {
   for (var a = r.value, i = r.parent, s = r.column === i.column && r.line === i.line; i.type !== "rule";)
    if (i = i.parent, !i) return;
   if (!(r.props.length === 1 && a.charCodeAt(0) !== 58 && !Zy.get(i)) && !s) {
    Zy.set(r, !0);
    for (var c = [], d = $C(a, c), f = i.props, h = 0, m = 0; h < d.length; h++)
     for (var g = 0; g < f.length; g++, m++) r.props[m] = c[h] ? d[h].replace(/&\f/g, f[g]) : f[g] + " " + d[h]
   }
  }
 },
 UC = function(r) {
  if (r.type === "decl") {
   var a = r.value;
   a.charCodeAt(0) === 108 && a.charCodeAt(2) === 98 && (r.return = "", r.value = "")
  }
 };

function Yb(e, r) {
 switch (SC(e, r)) {
  case 5103:
   return xt + "print-" + e + e;
  case 5737:
  case 4201:
  case 3177:
  case 3433:
  case 1641:
  case 4457:
  case 2921:
  case 5572:
  case 6356:
  case 5844:
  case 3191:
  case 6645:
  case 3005:
  case 6391:
  case 5879:
  case 5623:
  case 6135:
  case 4599:
  case 4855:
  case 4215:
  case 6389:
  case 5109:
  case 5365:
  case 5621:
  case 3829:
   return xt + e + e;
  case 5349:
  case 4246:
  case 4810:
  case 6968:
  case 2756:
   return xt + e + vu + e + Mn + e + e;
  case 6828:
  case 4268:
   return xt + e + Mn + e + e;
  case 6165:
   return xt + e + Mn + "flex-" + e + e;
  case 5187:
   return xt + e + St(e, /(\w+).+(:[^]+)/, xt + "box-$1$2" + Mn + "flex-$1$2") + e;
  case 5443:
   return xt + e + Mn + "flex-item-" + St(e, /flex-|-self/, "") + e;
  case 4675:
   return xt + e + Mn + "flex-line-pack" + St(e, /align-content|flex-|-self/, "") + e;
  case 5548:
   return xt + e + Mn + St(e, "shrink", "negative") + e;
  case 5292:
   return xt + e + Mn + St(e, "basis", "preferred-size") + e;
  case 6060:
   return xt + "box-" + St(e, "-grow", "") + xt + e + Mn + St(e, "grow", "positive") + e;
  case 4554:
   return xt + St(e, /([^-])(transform)/g, "$1" + xt + "$2") + e;
  case 6187:
   return St(St(St(e, /(zoom-|grab)/, xt + "$1"), /(image-set)/, xt + "$1"), e, "") + e;
  case 5495:
  case 3959:
   return St(e, /(image-set\([^]*)/, xt + "$1$`$1");
  case 4968:
   return St(St(e, /(.+:)(flex-)?(.*)/, xt + "box-pack:$3" + Mn + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + xt + e + e;
  case 4095:
  case 3583:
  case 4068:
  case 2532:
   return St(e, /(.+)-inline(.+)/, xt + "$1$2") + e;
  case 8116:
  case 7059:
  case 5753:
  case 5535:
  case 5445:
  case 5701:
  case 4933:
  case 4677:
  case 5533:
  case 5789:
  case 5021:
  case 4765:
   if ($r(e) - 1 - r > 6) switch (wn(e, r + 1)) {
    case 109:
     if (wn(e, r + 4) !== 45) break;
    case 102:
     return St(e, /(.+:)(.+)-([^]+)/, "$1" + xt + "$2-$3$1" + vu + (wn(e, r + 3) == 108 ? "$3" : "$2-$3")) + e;
    case 115:
     return ~Hp(e, "stretch") ? Yb(St(e, "stretch", "fill-available"), r) + e : e
   }
   break;
  case 4949:
   if (wn(e, r + 1) !== 115) break;
  case 6444:
   switch (wn(e, $r(e) - 3 - (~Hp(e, "!important") && 10))) {
    case 107:
     return St(e, ":", ":" + xt) + e;
    case 101:
     return St(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + xt + (wn(e, 14) === 45 ? "inline-" : "") + "box$3$1" + xt + "$2$3$1" + Mn + "$2box$3") + e
   }
   break;
  case 5936:
   switch (wn(e, r + 11)) {
    case 114:
     return xt + e + Mn + St(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
    case 108:
     return xt + e + Mn + St(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
    case 45:
     return xt + e + Mn + St(e, /[svh]\w+-[tblr]{2}/, "lr") + e
   }
   return xt + e + Mn + e + e
 }
 return e
}
var IC = function(r, a, i, s) {
  if (r.length > -1 && !r.return) switch (r.type) {
   case yh:
    r.return = Yb(r.value, r.length);
    break;
   case Ib:
    return Si([$l(r, {
     value: St(r.value, "@", "@" + xt)
    })], s);
   case vh:
    if (r.length) return wC(r.props, function(c) {
     switch (CC(c, /(::plac\w+|:read-\w+)/)) {
      case ":read-only":
      case ":read-write":
       return Si([$l(r, {
        props: [St(c, /:(read-\w+)/, ":" + vu + "$1")]
       })], s);
      case "::placeholder":
       return Si([$l(r, {
        props: [St(c, /:(plac\w+)/, ":" + xt + "input-$1")]
       }), $l(r, {
        props: [St(c, /:(plac\w+)/, ":" + vu + "$1")]
       }), $l(r, {
        props: [St(c, /:(plac\w+)/, Mn + "input-$1")]
       })], s)
     }
     return ""
    })
  }
 },
 PC = [IC],
 HC = function(r) {
  var a = r.key;
  if (a === "css") {
   var i = document.querySelectorAll("style[data-emotion]:not([data-s])");
   Array.prototype.forEach.call(i, function(C) {
    var D = C.getAttribute("data-emotion");
    D.indexOf(" ") !== -1 && (document.head.appendChild(C), C.setAttribute("data-s", ""))
   })
  }
  var s = r.stylisPlugins || PC,
   c = {},
   d, f = [];
  d = r.container || document.head, Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="' + a + ' "]'), function(C) {
   for (var D = C.getAttribute("data-emotion").split(" "), k = 1; k < D.length; k++) c[D[k]] = !0;
   f.push(C)
  });
  var h, m = [_C, UC];
  {
   var g, b = [zC, NC(function(C) {
     g.insert(C)
    })],
    w = jC(m.concat(s, b)),
    R = function(D) {
     return Si(DC(D), w)
    };
   h = function(D, k, N, E) {
    g = N, R(D ? D + "{" + k.styles + "}" : k.styles), E && (T.inserted[k.name] = !0)
   }
  }
  var T = {
   key: a,
   sheet: new gC({
    key: a,
    container: d,
    nonce: r.nonce,
    speedy: r.speedy,
    prepend: r.prepend,
    insertionPoint: r.insertionPoint
   }),
   nonce: r.nonce,
   inserted: c,
   registered: {},
   insert: h
  };
  return T.sheet.hydrate(f), T
 },
 vp = {
  exports: {}
 },
 Ct = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jy;

function qC() {
 if (Jy) return Ct;
 Jy = 1;
 var e = typeof Symbol == "function" && Symbol.for,
  r = e ? Symbol.for("react.element") : 60103,
  a = e ? Symbol.for("react.portal") : 60106,
  i = e ? Symbol.for("react.fragment") : 60107,
  s = e ? Symbol.for("react.strict_mode") : 60108,
  c = e ? Symbol.for("react.profiler") : 60114,
  d = e ? Symbol.for("react.provider") : 60109,
  f = e ? Symbol.for("react.context") : 60110,
  h = e ? Symbol.for("react.async_mode") : 60111,
  m = e ? Symbol.for("react.concurrent_mode") : 60111,
  g = e ? Symbol.for("react.forward_ref") : 60112,
  b = e ? Symbol.for("react.suspense") : 60113,
  w = e ? Symbol.for("react.suspense_list") : 60120,
  R = e ? Symbol.for("react.memo") : 60115,
  T = e ? Symbol.for("react.lazy") : 60116,
  C = e ? Symbol.for("react.block") : 60121,
  D = e ? Symbol.for("react.fundamental") : 60117,
  k = e ? Symbol.for("react.responder") : 60118,
  N = e ? Symbol.for("react.scope") : 60119;

 function E(O) {
  if (typeof O == "object" && O !== null) {
   var L = O.$$typeof;
   switch (L) {
    case r:
     switch (O = O.type, O) {
      case h:
      case m:
      case i:
      case c:
      case s:
      case b:
       return O;
      default:
       switch (O = O && O.$$typeof, O) {
        case f:
        case g:
        case T:
        case R:
        case d:
         return O;
        default:
         return L
       }
     }
    case a:
     return L
   }
  }
 }

 function A(O) {
  return E(O) === m
 }
 return Ct.AsyncMode = h, Ct.ConcurrentMode = m, Ct.ContextConsumer = f, Ct.ContextProvider = d, Ct.Element = r, Ct.ForwardRef = g, Ct.Fragment = i, Ct.Lazy = T, Ct.Memo = R, Ct.Portal = a, Ct.Profiler = c, Ct.StrictMode = s, Ct.Suspense = b, Ct.isAsyncMode = function(O) {
  return A(O) || E(O) === h
 }, Ct.isConcurrentMode = A, Ct.isContextConsumer = function(O) {
  return E(O) === f
 }, Ct.isContextProvider = function(O) {
  return E(O) === d
 }, Ct.isElement = function(O) {
  return typeof O == "object" && O !== null && O.$$typeof === r
 }, Ct.isForwardRef = function(O) {
  return E(O) === g
 }, Ct.isFragment = function(O) {
  return E(O) === i
 }, Ct.isLazy = function(O) {
  return E(O) === T
 }, Ct.isMemo = function(O) {
  return E(O) === R
 }, Ct.isPortal = function(O) {
  return E(O) === a
 }, Ct.isProfiler = function(O) {
  return E(O) === c
 }, Ct.isStrictMode = function(O) {
  return E(O) === s
 }, Ct.isSuspense = function(O) {
  return E(O) === b
 }, Ct.isValidElementType = function(O) {
  return typeof O == "string" || typeof O == "function" || O === i || O === m || O === c || O === s || O === b || O === w || typeof O == "object" && O !== null && (O.$$typeof === T || O.$$typeof === R || O.$$typeof === d || O.$$typeof === f || O.$$typeof === g || O.$$typeof === D || O.$$typeof === k || O.$$typeof === N || O.$$typeof === C)
 }, Ct.typeOf = E, Ct
}
var e0;

function VC() {
 return e0 || (e0 = 1, vp.exports = qC()), vp.exports
}
var yp, t0;

function GC() {
 if (t0) return yp;
 t0 = 1;
 var e = VC(),
  r = {
   childContextTypes: !0,
   contextType: !0,
   contextTypes: !0,
   defaultProps: !0,
   displayName: !0,
   getDefaultProps: !0,
   getDerivedStateFromError: !0,
   getDerivedStateFromProps: !0,
   mixins: !0,
   propTypes: !0,
   type: !0
  },
  a = {
   name: !0,
   length: !0,
   prototype: !0,
   caller: !0,
   callee: !0,
   arguments: !0,
   arity: !0
  },
  i = {
   $$typeof: !0,
   render: !0,
   defaultProps: !0,
   displayName: !0,
   propTypes: !0
  },
  s = {
   $$typeof: !0,
   compare: !0,
   defaultProps: !0,
   displayName: !0,
   propTypes: !0,
   type: !0
  },
  c = {};
 c[e.ForwardRef] = i, c[e.Memo] = s;

 function d(T) {
  return e.isMemo(T) ? s : c[T.$$typeof] || r
 }
 var f = Object.defineProperty,
  h = Object.getOwnPropertyNames,
  m = Object.getOwnPropertySymbols,
  g = Object.getOwnPropertyDescriptor,
  b = Object.getPrototypeOf,
  w = Object.prototype;

 function R(T, C, D) {
  if (typeof C != "string") {
   if (w) {
    var k = b(C);
    k && k !== w && R(T, k, D)
   }
   var N = h(C);
   m && (N = N.concat(m(C)));
   for (var E = d(T), A = d(C), O = 0; O < N.length; ++O) {
    var L = N[O];
    if (!a[L] && !(D && D[L]) && !(A && A[L]) && !(E && E[L])) {
     var U = g(C, L);
     try {
      f(T, L, U)
     } catch {}
    }
   }
  }
  return T
 }
 return yp = R, yp
}
GC();
var YC = !0;

function Xb(e, r, a) {
 var i = "";
 return a.split(" ").forEach(function(s) {
  e[s] !== void 0 ? r.push(e[s] + ";") : s && (i += s + " ")
 }), i
}
var xh = function(r, a, i) {
  var s = r.key + "-" + a.name;
  (i === !1 || YC === !1) && r.registered[s] === void 0 && (r.registered[s] = a.styles)
 },
 Sh = function(r, a, i) {
  xh(r, a, i);
  var s = r.key + "-" + a.name;
  if (r.inserted[a.name] === void 0) {
   var c = a;
   do r.insert(a === c ? "." + s : "", c, r.sheet, !0), c = c.next; while (c !== void 0)
  }
 };

function XC(e) {
 for (var r = 0, a, i = 0, s = e.length; s >= 4; ++i, s -= 4) a = e.charCodeAt(i) & 255 | (e.charCodeAt(++i) & 255) << 8 | (e.charCodeAt(++i) & 255) << 16 | (e.charCodeAt(++i) & 255) << 24, a = (a & 65535) * 1540483477 + ((a >>> 16) * 59797 << 16), a ^= a >>> 24, r = (a & 65535) * 1540483477 + ((a >>> 16) * 59797 << 16) ^ (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16);
 switch (s) {
  case 3:
   r ^= (e.charCodeAt(i + 2) & 255) << 16;
  case 2:
   r ^= (e.charCodeAt(i + 1) & 255) << 8;
  case 1:
   r ^= e.charCodeAt(i) & 255, r = (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16)
 }
 return r ^= r >>> 13, r = (r & 65535) * 1540483477 + ((r >>> 16) * 59797 << 16), ((r ^ r >>> 15) >>> 0).toString(36)
}
var WC = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  scale: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
 },
 FC = /[A-Z]|^ms/g,
 KC = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
 Wb = function(r) {
  return r.charCodeAt(1) === 45
 },
 n0 = function(r) {
  return r != null && typeof r != "boolean"
 },
 bp = Gb(function(e) {
  return Wb(e) ? e : e.replace(FC, "-$&").toLowerCase()
 }),
 r0 = function(r, a) {
  switch (r) {
   case "animation":
   case "animationName":
    if (typeof a == "string") return a.replace(KC, function(i, s, c) {
     return _r = {
      name: s,
      styles: c,
      next: _r
     }, s
    })
  }
  return WC[r] !== 1 && !Wb(r) && typeof a == "number" && a !== 0 ? a + "px" : a
 };

function ss(e, r, a) {
 if (a == null) return "";
 var i = a;
 if (i.__emotion_styles !== void 0) return i;
 switch (typeof a) {
  case "boolean":
   return "";
  case "object": {
   var s = a;
   if (s.anim === 1) return _r = {
    name: s.name,
    styles: s.styles,
    next: _r
   }, s.name;
   var c = a;
   if (c.styles !== void 0) {
    var d = c.next;
    if (d !== void 0)
     for (; d !== void 0;) _r = {
      name: d.name,
      styles: d.styles,
      next: _r
     }, d = d.next;
    var f = c.styles + ";";
    return f
   }
   return QC(e, r, a)
  }
  case "function": {
   if (e !== void 0) {
    var h = _r,
     m = a(e);
    return _r = h, ss(e, r, m)
   }
   break
  }
 }
 var g = a;
 if (r == null) return g;
 var b = r[g];
 return b !== void 0 ? b : g
}

function QC(e, r, a) {
 var i = "";
 if (Array.isArray(a))
  for (var s = 0; s < a.length; s++) i += ss(e, r, a[s]) + ";";
 else
  for (var c in a) {
   var d = a[c];
   if (typeof d != "object") {
    var f = d;
    r != null && r[f] !== void 0 ? i += c + "{" + r[f] + "}" : n0(f) && (i += bp(c) + ":" + r0(c, f) + ";")
   } else if (Array.isArray(d) && typeof d[0] == "string" && (r == null || r[d[0]] === void 0))
    for (var h = 0; h < d.length; h++) n0(d[h]) && (i += bp(c) + ":" + r0(c, d[h]) + ";");
   else {
    var m = ss(e, r, d);
    switch (c) {
     case "animation":
     case "animationName": {
      i += bp(c) + ":" + m + ";";
      break
     }
     default:
      i += c + "{" + m + "}"
    }
   }
  }
 return i
}
var o0 = /label:\s*([^\s;{]+)\s*(;|$)/g,
 _r;

function Ss(e, r, a) {
 if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0) return e[0];
 var i = !0,
  s = "";
 _r = void 0;
 var c = e[0];
 if (c == null || c.raw === void 0) i = !1, s += ss(a, r, c);
 else {
  var d = c;
  s += d[0]
 }
 for (var f = 1; f < e.length; f++)
  if (s += ss(a, r, e[f]), i) {
   var h = c;
   s += h[f]
  } o0.lastIndex = 0;
 for (var m = "", g;
  (g = o0.exec(s)) !== null;) m += "-" + g[1];
 var b = XC(s) + m;
 return {
  name: b,
  styles: s,
  next: _r
 }
}
var ZC = function(r) {
  return r()
 },
 Fb = Pp.useInsertionEffect ? Pp.useInsertionEffect : !1,
 Kb = Fb || ZC,
 a0 = Fb || y.useLayoutEffect,
 Qb = y.createContext(typeof HTMLElement < "u" ? HC({
  key: "css"
 }) : null);
Qb.Provider;
var Ch = function(r) {
  return y.forwardRef(function(a, i) {
   var s = y.useContext(Qb);
   return r(a, s, i)
  })
 },
 Cs = y.createContext({}),
 wh = {}.hasOwnProperty,
 Vp = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__",
 JC = function(r, a) {
  var i = {};
  for (var s in a) wh.call(a, s) && (i[s] = a[s]);
  return i[Vp] = r, i
 },
 ew = function(r) {
  var a = r.cache,
   i = r.serialized,
   s = r.isStringTag;
  return xh(a, i, s), Kb(function() {
   return Sh(a, i, s)
  }), null
 },
 tw = Ch(function(e, r, a) {
  var i = e.css;
  typeof i == "string" && r.registered[i] !== void 0 && (i = r.registered[i]);
  var s = e[Vp],
   c = [i],
   d = "";
  typeof e.className == "string" ? d = Xb(r.registered, c, e.className) : e.className != null && (d = e.className + " ");
  var f = Ss(c, void 0, y.useContext(Cs));
  d += r.key + "-" + f.name;
  var h = {};
  for (var m in e) wh.call(e, m) && m !== "css" && m !== Vp && (h[m] = e[m]);
  return h.className = d, a && (h.ref = a), y.createElement(y.Fragment, null, y.createElement(ew, {
   cache: r,
   serialized: f,
   isStringTag: typeof s == "string"
  }), y.createElement(s, h))
 }),
 nw = tw,
 i0 = function(r, a) {
  var i = arguments;
  if (a == null || !wh.call(a, "css")) return y.createElement.apply(void 0, i);
  var s = i.length,
   c = new Array(s);
  c[0] = nw, c[1] = JC(r, a);
  for (var d = 2; d < s; d++) c[d] = i[d];
  return y.createElement.apply(null, c)
 };
(function(e) {
 var r;
 r || (r = e.JSX || (e.JSX = {}))
})(i0 || (i0 = {}));
var rw = Ch(function(e, r) {
 var a = e.styles,
  i = Ss([a], void 0, y.useContext(Cs)),
  s = y.useRef();
 return a0(function() {
  var c = r.key + "-global",
   d = new r.sheet.constructor({
    key: c,
    nonce: r.sheet.nonce,
    container: r.sheet.container,
    speedy: r.sheet.isSpeedy
   }),
   f = !1,
   h = document.querySelector('style[data-emotion="' + c + " " + i.name + '"]');
  return r.sheet.tags.length && (d.before = r.sheet.tags[0]), h !== null && (f = !0, h.setAttribute("data-emotion", c), d.hydrate([h])), s.current = [d, f],
   function() {
    d.flush()
   }
 }, [r]), a0(function() {
  var c = s.current,
   d = c[0],
   f = c[1];
  if (f) {
   c[1] = !1;
   return
  }
  if (i.next !== void 0 && Sh(r, i.next, !0), d.tags.length) {
   var h = d.tags[d.tags.length - 1].nextElementSibling;
   d.before = h, d.flush()
  }
  r.insert("", i, d, !1)
 }, [r, i.name]), null
});

function ws() {
 for (var e = arguments.length, r = new Array(e), a = 0; a < e; a++) r[a] = arguments[a];
 return Ss(r)
}

function Sa() {
 var e = ws.apply(void 0, arguments),
  r = "animation-" + e.name;
 return {
  name: r,
  styles: "@keyframes " + r + "{" + e.styles + "}",
  anim: 1,
  toString: function() {
   return "_EMO_" + this.name + "_" + this.styles + "_EMO_"
  }
 }
}
var ow = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,
 aw = Gb(function(e) {
  return ow.test(e) || e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91
 }),
 iw = aw,
 lw = function(r) {
  return r !== "theme"
 },
 l0 = function(r) {
  return typeof r == "string" && r.charCodeAt(0) > 96 ? iw : lw
 },
 s0 = function(r, a, i) {
  var s;
  if (a) {
   var c = a.shouldForwardProp;
   s = r.__emotion_forwardProp && c ? function(d) {
    return r.__emotion_forwardProp(d) && c(d)
   } : c
  }
  return typeof s != "function" && i && (s = r.__emotion_forwardProp), s
 },
 sw = function(r) {
  var a = r.cache,
   i = r.serialized,
   s = r.isStringTag;
  return xh(a, i, s), Kb(function() {
   return Sh(a, i, s)
  }), null
 },
 cw = function e(r, a) {
  var i = r.__emotion_real === r,
   s = i && r.__emotion_base || r,
   c, d;
  a !== void 0 && (c = a.label, d = a.target);
  var f = s0(r, a, i),
   h = f || l0(s),
   m = !h("as");
  return function() {
   var g = arguments,
    b = i && r.__emotion_styles !== void 0 ? r.__emotion_styles.slice(0) : [];
   if (c !== void 0 && b.push("label:" + c + ";"), g[0] == null || g[0].raw === void 0) b.push.apply(b, g);
   else {
    var w = g[0];
    b.push(w[0]);
    for (var R = g.length, T = 1; T < R; T++) b.push(g[T], w[T])
   }
   var C = Ch(function(D, k, N) {
    var E = m && D.as || s,
     A = "",
     O = [],
     L = D;
    if (D.theme == null) {
     L = {};
     for (var U in D) L[U] = D[U];
     L.theme = y.useContext(Cs)
    }
    typeof D.className == "string" ? A = Xb(k.registered, O, D.className) : D.className != null && (A = D.className + " ");
    var _ = Ss(b.concat(O), k.registered, L);
    A += k.key + "-" + _.name, d !== void 0 && (A += " " + d);
    var G = m && f === void 0 ? l0(E) : h,
     S = {};
    for (var $ in D) m && $ === "as" || G($) && (S[$] = D[$]);
    return S.className = A, N && (S.ref = N), y.createElement(y.Fragment, null, y.createElement(sw, {
     cache: k,
     serialized: _,
     isStringTag: typeof E == "string"
    }), y.createElement(E, S))
   });
   return C.displayName = c !== void 0 ? c : "Styled(" + (typeof s == "string" ? s : s.displayName || s.name || "Component") + ")", C.defaultProps = r.defaultProps, C.__emotion_real = C, C.__emotion_base = s, C.__emotion_styles = b, C.__emotion_forwardProp = f, Object.defineProperty(C, "toString", {
    value: function() {
     return "." + d
    }
   }), C.withComponent = function(D, k) {
    var N = e(D, gu({}, a, k, {
     shouldForwardProp: s0(C, k, !0)
    }));
    return N.apply(void 0, b)
   }, C
  }
 },
 uw = ["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "marquee", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"],
 Gp = cw.bind(null);
uw.forEach(function(e) {
 Gp[e] = Gp(e)
});

function dw(e) {
 return e == null || Object.keys(e).length === 0
}

function Zb(e) {
 const {
  styles: r,
  defaultTheme: a = {}
 } = e, i = typeof r == "function" ? s => r(dw(s) ? a : s) : r;
 return v.jsx(rw, {
  styles: i
 })
}

function Jb(e, r) {
 return Gp(e, r)
}

function fw(e, r) {
 Array.isArray(e.__emotion_styles) && (e.__emotion_styles = r(e.__emotion_styles))
}
const c0 = [];

function u0(e) {
 return c0[0] = e, Ss(c0)
}
var xp = {
  exports: {}
 },
 Dt = {};
/**
 * @license React
 * react-is.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var d0;

function pw() {
 if (d0) return Dt;
 d0 = 1;
 var e = Symbol.for("react.transitional.element"),
  r = Symbol.for("react.portal"),
  a = Symbol.for("react.fragment"),
  i = Symbol.for("react.strict_mode"),
  s = Symbol.for("react.profiler"),
  c = Symbol.for("react.consumer"),
  d = Symbol.for("react.context"),
  f = Symbol.for("react.forward_ref"),
  h = Symbol.for("react.suspense"),
  m = Symbol.for("react.suspense_list"),
  g = Symbol.for("react.memo"),
  b = Symbol.for("react.lazy"),
  w = Symbol.for("react.view_transition"),
  R = Symbol.for("react.client.reference");

 function T(C) {
  if (typeof C == "object" && C !== null) {
   var D = C.$$typeof;
   switch (D) {
    case e:
     switch (C = C.type, C) {
      case a:
      case s:
      case i:
      case h:
      case m:
      case w:
       return C;
      default:
       switch (C = C && C.$$typeof, C) {
        case d:
        case f:
        case b:
        case g:
         return C;
        case c:
         return C;
        default:
         return D
       }
     }
    case r:
     return D
   }
  }
 }
 return Dt.ContextConsumer = c, Dt.ContextProvider = d, Dt.Element = e, Dt.ForwardRef = f, Dt.Fragment = a, Dt.Lazy = b, Dt.Memo = g, Dt.Portal = r, Dt.Profiler = s, Dt.StrictMode = i, Dt.Suspense = h, Dt.SuspenseList = m, Dt.isContextConsumer = function(C) {
  return T(C) === c
 }, Dt.isContextProvider = function(C) {
  return T(C) === d
 }, Dt.isElement = function(C) {
  return typeof C == "object" && C !== null && C.$$typeof === e
 }, Dt.isForwardRef = function(C) {
  return T(C) === f
 }, Dt.isFragment = function(C) {
  return T(C) === a
 }, Dt.isLazy = function(C) {
  return T(C) === b
 }, Dt.isMemo = function(C) {
  return T(C) === g
 }, Dt.isPortal = function(C) {
  return T(C) === r
 }, Dt.isProfiler = function(C) {
  return T(C) === s
 }, Dt.isStrictMode = function(C) {
  return T(C) === i
 }, Dt.isSuspense = function(C) {
  return T(C) === h
 }, Dt.isSuspenseList = function(C) {
  return T(C) === m
 }, Dt.isValidElementType = function(C) {
  return typeof C == "string" || typeof C == "function" || C === a || C === s || C === i || C === h || C === m || typeof C == "object" && C !== null && (C.$$typeof === b || C.$$typeof === g || C.$$typeof === d || C.$$typeof === c || C.$$typeof === f || C.$$typeof === R || C.getModuleId !== void 0)
 }, Dt.typeOf = T, Dt
}
var f0;

function hw() {
 return f0 || (f0 = 1, xp.exports = pw()), xp.exports
}
var e1 = hw();

function Ur(e) {
 if (typeof e != "object" || e === null) return !1;
 const r = Object.getPrototypeOf(e);
 return (r === null || r === Object.prototype || Object.getPrototypeOf(r) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e)
}

function t1(e) {
 if (y.isValidElement(e) || e1.isValidElementType(e) || !Ur(e)) return e;
 const r = {};
 return Object.keys(e).forEach(a => {
  r[a] = t1(e[a])
 }), r
}

function bn(e, r, a = {
 clone: !0
}) {
 const i = a.clone ? {
  ...e
 } : e;
 return Ur(e) && Ur(r) && Object.keys(r).forEach(s => {
  y.isValidElement(r[s]) || e1.isValidElementType(r[s]) ? i[s] = r[s] : Ur(r[s]) && Object.prototype.hasOwnProperty.call(e, s) && Ur(e[s]) ? i[s] = bn(e[s], r[s], a) : a.clone ? i[s] = Ur(r[s]) ? t1(r[s]) : r[s] : i[s] = r[s]
 }), i
}
const mw = e => {
 const r = Object.keys(e).map(a => ({
  key: a,
  val: e[a]
 })) || [];
 return r.sort((a, i) => a.val - i.val), r.reduce((a, i) => ({
  ...a,
  [i.key]: i.val
 }), {})
};

function gw(e) {
 const {
  values: r = {
   xs: 0,
   sm: 600,
   md: 900,
   lg: 1200,
   xl: 1536
  },
  unit: a = "px",
  step: i = 5,
  ...s
 } = e, c = mw(r), d = Object.keys(c);

 function f(w) {
  return `@media (min-width:${typeof r[w]=="number"?r[w]:w}${a})`
 }

 function h(w) {
  return `@media (max-width:${(typeof r[w]=="number"?r[w]:w)-i/100}${a})`
 }

 function m(w, R) {
  const T = d.indexOf(R);
  return `@media (min-width:${typeof r[w]=="number"?r[w]:w}${a}) and (max-width:${(T!==-1&&typeof r[d[T]]=="number"?r[d[T]]:R)-i/100}${a})`
 }

 function g(w) {
  return d.indexOf(w) + 1 < d.length ? m(w, d[d.indexOf(w) + 1]) : f(w)
 }

 function b(w) {
  const R = d.indexOf(w);
  return R === 0 ? f(d[1]) : R === d.length - 1 ? h(d[R]) : m(w, d[d.indexOf(w) + 1]).replace("@media", "@media not all and")
 }
 return {
  keys: d,
  values: c,
  up: f,
  down: h,
  between: m,
  only: g,
  not: b,
  unit: a,
  ...s
 }
}

function vw(e, r) {
 if (!e.containerQueries) return r;
 const a = Object.keys(r).filter(i => i.startsWith("@container")).sort((i, s) => {
  var d, f;
  const c = /min-width:\s*([0-9.]+)/;
  return +(((d = i.match(c)) == null ? void 0 : d[1]) || 0) - +(((f = s.match(c)) == null ? void 0 : f[1]) || 0)
 });
 return a.length ? a.reduce((i, s) => {
  const c = r[s];
  return delete i[s], i[s] = c, i
 }, {
  ...r
 }) : r
}

function yw(e, r) {
 return r === "@" || r.startsWith("@") && (e.some(a => r.startsWith(`@${a}`)) || !!r.match(/^@\d/))
}

function bw(e, r) {
 const a = r.match(/^@([^/]+)?\/?(.+)?$/);
 if (!a) return null;
 const [, i, s] = a, c = Number.isNaN(+i) ? i || 0 : +i;
 return e.containerQueries(s).up(c)
}

function xw(e) {
 const r = (c, d) => c.replace("@media", d ? `@container ${d}` : "@container");

 function a(c, d) {
  c.up = (...f) => r(e.breakpoints.up(...f), d), c.down = (...f) => r(e.breakpoints.down(...f), d), c.between = (...f) => r(e.breakpoints.between(...f), d), c.only = (...f) => r(e.breakpoints.only(...f), d), c.not = (...f) => {
   const h = r(e.breakpoints.not(...f), d);
   return h.includes("not all and") ? h.replace("not all and ", "").replace("min-width:", "width<").replace("max-width:", "width>").replace("and", "or") : h
  }
 }
 const i = {},
  s = c => (a(i, c), i);
 return a(s), {
  ...e,
  containerQueries: s
 }
}
const Sw = {
 borderRadius: 4
};

function Ql(e, r) {
 return r ? bn(e, r, {
  clone: !1
 }) : e
}
const ku = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536
 },
 p0 = {
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: e => `@media (min-width:${ku[e]}px)`
 },
 Cw = {
  containerQueries: e => ({
   up: r => {
    let a = typeof r == "number" ? r : ku[r] || r;
    return typeof a == "number" && (a = `${a}px`), e ? `@container ${e} (min-width:${a})` : `@container (min-width:${a})`
   }
  })
 };

function Er(e, r, a) {
 const i = e.theme || {};
 if (Array.isArray(r)) {
  const c = i.breakpoints || p0;
  return r.reduce((d, f, h) => (d[c.up(c.keys[h])] = a(r[h]), d), {})
 }
 if (typeof r == "object") {
  const c = i.breakpoints || p0;
  return Object.keys(r).reduce((d, f) => {
   if (yw(c.keys, f)) {
    const h = bw(i.containerQueries ? i : Cw, f);
    h && (d[h] = a(r[f], f))
   } else if (Object.keys(c.values || ku).includes(f)) {
    const h = c.up(f);
    d[h] = a(r[f], f)
   } else {
    const h = f;
    d[h] = r[h]
   }
   return d
  }, {})
 }
 return a(r)
}

function n1(e = {}) {
 var a;
 return ((a = e.keys) == null ? void 0 : a.reduce((i, s) => {
  const c = e.up(s);
  return i[c] = {}, i
 }, {})) || {}
}

function r1(e, r) {
 return e.reduce((a, i) => {
  const s = a[i];
  return (!s || Object.keys(s).length === 0) && delete a[i], a
 }, r)
}

function ww(e, ...r) {
 const a = n1(e),
  i = [a, ...r].reduce((s, c) => bn(s, c), {});
 return r1(Object.keys(a), i)
}

function Rw(e, r) {
 if (typeof e != "object") return {};
 const a = {},
  i = Object.keys(r);
 return Array.isArray(e) ? i.forEach((s, c) => {
  c < e.length && (a[s] = !0)
 }) : i.forEach(s => {
  e[s] != null && (a[s] = !0)
 }), a
}

function Sp({
 values: e,
 breakpoints: r,
 base: a
}) {
 const i = a || Rw(e, r),
  s = Object.keys(i);
 if (s.length === 0) return e;
 let c;
 return s.reduce((d, f, h) => (Array.isArray(e) ? (d[f] = e[h] != null ? e[h] : e[c], c = h) : typeof e == "object" ? (d[f] = e[f] != null ? e[f] : e[c], c = f) : d[f] = e, d), {})
}

function Ce(e) {
 if (typeof e != "string") throw new Error(uo(7));
 return e.charAt(0).toUpperCase() + e.slice(1)
}

function zu(e, r, a = !0) {
 if (!r || typeof r != "string") return null;
 if (e && e.vars && a) {
  const i = `vars.${r}`.split(".").reduce((s, c) => s && s[c] ? s[c] : null, e);
  if (i != null) return i
 }
 return r.split(".").reduce((i, s) => i && i[s] != null ? i[s] : null, e)
}

function yu(e, r, a, i = a) {
 let s;
 return typeof e == "function" ? s = e(a) : Array.isArray(e) ? s = e[a] || i : s = zu(e, a) || i, r && (s = r(s, i, e)), s
}

function nn(e) {
 const {
  prop: r,
  cssProperty: a = e.prop,
  themeKey: i,
  transform: s
 } = e, c = d => {
  if (d[r] == null) return null;
  const f = d[r],
   h = d.theme,
   m = zu(h, i) || {};
  return Er(d, f, b => {
   let w = yu(m, s, b);
   return b === w && typeof b == "string" && (w = yu(m, s, `${r}${b==="default"?"":Ce(b)}`, b)), a === !1 ? w : {
    [a]: w
   }
  })
 };
 return c.propTypes = {}, c.filterProps = [r], c
}

function Ew(e) {
 const r = {};
 return a => (r[a] === void 0 && (r[a] = e(a)), r[a])
}
const Tw = {
  m: "margin",
  p: "padding"
 },
 Aw = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
 },
 h0 = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
 },
 Mw = Ew(e => {
  if (e.length > 2)
   if (h0[e]) e = h0[e];
   else return [e];
  const [r, a] = e.split(""), i = Tw[r], s = Aw[a] || "";
  return Array.isArray(s) ? s.map(c => i + c) : [i + s]
 }),
 Rh = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"],
 Eh = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"];
[...Rh, ...Eh];

function Rs(e, r, a, i) {
 const s = zu(e, r, !0) ?? a;
 return typeof s == "number" || typeof s == "string" ? c => typeof c == "string" ? c : typeof s == "string" ? s.startsWith("var(") && c === 0 ? 0 : s.startsWith("var(") && c === 1 ? s : `calc(${c} * ${s})` : s * c : Array.isArray(s) ? c => {
  if (typeof c == "string") return c;
  const d = Math.abs(c),
   f = s[d];
  return c >= 0 ? f : typeof f == "number" ? -f : typeof f == "string" && f.startsWith("var(") ? `calc(-1 * ${f})` : `-${f}`
 } : typeof s == "function" ? s : () => {}
}

function ju(e) {
 return Rs(e, "spacing", 8)
}

function va(e, r) {
 return typeof r == "string" || r == null ? r : e(r)
}

function Ow(e, r) {
 return a => e.reduce((i, s) => (i[s] = va(r, a), i), {})
}

function Dw(e, r, a, i) {
 if (!r.includes(a)) return null;
 const s = Mw(a),
  c = Ow(s, i),
  d = e[a];
 return Er(e, d, c)
}

function o1(e, r) {
 const a = ju(e.theme);
 return Object.keys(e).map(i => Dw(e, r, i, a)).reduce(Ql, {})
}

function Wt(e) {
 return o1(e, Rh)
}
Wt.propTypes = {};
Wt.filterProps = Rh;

function Ft(e) {
 return o1(e, Eh)
}
Ft.propTypes = {};
Ft.filterProps = Eh;

function a1(e = 8, r = ju({
 spacing: e
})) {
 if (e.mui) return e;
 const a = (...i) => (i.length === 0 ? [1] : i).map(c => {
  const d = r(c);
  return typeof d == "number" ? `${d}px` : d
 }).join(" ");
 return a.mui = !0, a
}

function Nu(...e) {
 const r = e.reduce((i, s) => (s.filterProps.forEach(c => {
   i[c] = s
  }), i), {}),
  a = i => Object.keys(i).reduce((s, c) => r[c] ? Ql(s, r[c](i)) : s, {});
 return a.propTypes = {}, a.filterProps = e.reduce((i, s) => i.concat(s.filterProps), []), a
}

function pr(e) {
 return typeof e != "number" ? e : `${e}px solid`
}

function xr(e, r) {
 return nn({
  prop: e,
  themeKey: "borders",
  transform: r
 })
}
const kw = xr("border", pr),
 zw = xr("borderTop", pr),
 jw = xr("borderRight", pr),
 Nw = xr("borderBottom", pr),
 Lw = xr("borderLeft", pr),
 Bw = xr("borderColor"),
 $w = xr("borderTopColor"),
 _w = xr("borderRightColor"),
 Uw = xr("borderBottomColor"),
 Iw = xr("borderLeftColor"),
 Pw = xr("outline", pr),
 Hw = xr("outlineColor"),
 Lu = e => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
   const r = Rs(e.theme, "shape.borderRadius", 4),
    a = i => ({
     borderRadius: va(r, i)
    });
   return Er(e, e.borderRadius, a)
  }
  return null
 };
Lu.propTypes = {};
Lu.filterProps = ["borderRadius"];
Nu(kw, zw, jw, Nw, Lw, Bw, $w, _w, Uw, Iw, Lu, Pw, Hw);
const Bu = e => {
 if (e.gap !== void 0 && e.gap !== null) {
  const r = Rs(e.theme, "spacing", 8),
   a = i => ({
    gap: va(r, i)
   });
  return Er(e, e.gap, a)
 }
 return null
};
Bu.propTypes = {};
Bu.filterProps = ["gap"];
const $u = e => {
 if (e.columnGap !== void 0 && e.columnGap !== null) {
  const r = Rs(e.theme, "spacing", 8),
   a = i => ({
    columnGap: va(r, i)
   });
  return Er(e, e.columnGap, a)
 }
 return null
};
$u.propTypes = {};
$u.filterProps = ["columnGap"];
const _u = e => {
 if (e.rowGap !== void 0 && e.rowGap !== null) {
  const r = Rs(e.theme, "spacing", 8),
   a = i => ({
    rowGap: va(r, i)
   });
  return Er(e, e.rowGap, a)
 }
 return null
};
_u.propTypes = {};
_u.filterProps = ["rowGap"];
const qw = nn({
  prop: "gridColumn"
 }),
 Vw = nn({
  prop: "gridRow"
 }),
 Gw = nn({
  prop: "gridAutoFlow"
 }),
 Yw = nn({
  prop: "gridAutoColumns"
 }),
 Xw = nn({
  prop: "gridAutoRows"
 }),
 Ww = nn({
  prop: "gridTemplateColumns"
 }),
 Fw = nn({
  prop: "gridTemplateRows"
 }),
 Kw = nn({
  prop: "gridTemplateAreas"
 }),
 Qw = nn({
  prop: "gridArea"
 });
Nu(Bu, $u, _u, qw, Vw, Gw, Yw, Xw, Ww, Fw, Kw, Qw);

function Ci(e, r) {
 return r === "grey" ? r : e
}
const Zw = nn({
  prop: "color",
  themeKey: "palette",
  transform: Ci
 }),
 Jw = nn({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Ci
 }),
 eR = nn({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Ci
 });
Nu(Zw, Jw, eR);

function Kn(e) {
 return e <= 1 && e !== 0 ? `${e*100}%` : e
}
const tR = nn({
  prop: "width",
  transform: Kn
 }),
 Th = e => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
   const r = a => {
    var s, c, d, f, h;
    const i = ((d = (c = (s = e.theme) == null ? void 0 : s.breakpoints) == null ? void 0 : c.values) == null ? void 0 : d[a]) || ku[a];
    return i ? ((h = (f = e.theme) == null ? void 0 : f.breakpoints) == null ? void 0 : h.unit) !== "px" ? {
     maxWidth: `${i}${e.theme.breakpoints.unit}`
    } : {
     maxWidth: i
    } : {
     maxWidth: Kn(a)
    }
   };
   return Er(e, e.maxWidth, r)
  }
  return null
 };
Th.filterProps = ["maxWidth"];
const nR = nn({
  prop: "minWidth",
  transform: Kn
 }),
 rR = nn({
  prop: "height",
  transform: Kn
 }),
 oR = nn({
  prop: "maxHeight",
  transform: Kn
 }),
 aR = nn({
  prop: "minHeight",
  transform: Kn
 });
nn({
 prop: "size",
 cssProperty: "width",
 transform: Kn
});
nn({
 prop: "size",
 cssProperty: "height",
 transform: Kn
});
const iR = nn({
 prop: "boxSizing"
});
Nu(tR, Th, nR, rR, oR, aR, iR);
const Es = {
 border: {
  themeKey: "borders",
  transform: pr
 },
 borderTop: {
  themeKey: "borders",
  transform: pr
 },
 borderRight: {
  themeKey: "borders",
  transform: pr
 },
 borderBottom: {
  themeKey: "borders",
  transform: pr
 },
 borderLeft: {
  themeKey: "borders",
  transform: pr
 },
 borderColor: {
  themeKey: "palette"
 },
 borderTopColor: {
  themeKey: "palette"
 },
 borderRightColor: {
  themeKey: "palette"
 },
 borderBottomColor: {
  themeKey: "palette"
 },
 borderLeftColor: {
  themeKey: "palette"
 },
 outline: {
  themeKey: "borders",
  transform: pr
 },
 outlineColor: {
  themeKey: "palette"
 },
 borderRadius: {
  themeKey: "shape.borderRadius",
  style: Lu
 },
 color: {
  themeKey: "palette",
  transform: Ci
 },
 bgcolor: {
  themeKey: "palette",
  cssProperty: "backgroundColor",
  transform: Ci
 },
 backgroundColor: {
  themeKey: "palette",
  transform: Ci
 },
 p: {
  style: Ft
 },
 pt: {
  style: Ft
 },
 pr: {
  style: Ft
 },
 pb: {
  style: Ft
 },
 pl: {
  style: Ft
 },
 px: {
  style: Ft
 },
 py: {
  style: Ft
 },
 padding: {
  style: Ft
 },
 paddingTop: {
  style: Ft
 },
 paddingRight: {
  style: Ft
 },
 paddingBottom: {
  style: Ft
 },
 paddingLeft: {
  style: Ft
 },
 paddingX: {
  style: Ft
 },
 paddingY: {
  style: Ft
 },
 paddingInline: {
  style: Ft
 },
 paddingInlineStart: {
  style: Ft
 },
 paddingInlineEnd: {
  style: Ft
 },
 paddingBlock: {
  style: Ft
 },
 paddingBlockStart: {
  style: Ft
 },
 paddingBlockEnd: {
  style: Ft
 },
 m: {
  style: Wt
 },
 mt: {
  style: Wt
 },
 mr: {
  style: Wt
 },
 mb: {
  style: Wt
 },
 ml: {
  style: Wt
 },
 mx: {
  style: Wt
 },
 my: {
  style: Wt
 },
 margin: {
  style: Wt
 },
 marginTop: {
  style: Wt
 },
 marginRight: {
  style: Wt
 },
 marginBottom: {
  style: Wt
 },
 marginLeft: {
  style: Wt
 },
 marginX: {
  style: Wt
 },
 marginY: {
  style: Wt
 },
 marginInline: {
  style: Wt
 },
 marginInlineStart: {
  style: Wt
 },
 marginInlineEnd: {
  style: Wt
 },
 marginBlock: {
  style: Wt
 },
 marginBlockStart: {
  style: Wt
 },
 marginBlockEnd: {
  style: Wt
 },
 displayPrint: {
  cssProperty: !1,
  transform: e => ({
   "@media print": {
    display: e
   }
  })
 },
 display: {},
 overflow: {},
 textOverflow: {},
 visibility: {},
 whiteSpace: {},
 flexBasis: {},
 flexDirection: {},
 flexWrap: {},
 justifyContent: {},
 alignItems: {},
 alignContent: {},
 order: {},
 flex: {},
 flexGrow: {},
 flexShrink: {},
 alignSelf: {},
 justifyItems: {},
 justifySelf: {},
 gap: {
  style: Bu
 },
 rowGap: {
  style: _u
 },
 columnGap: {
  style: $u
 },
 gridColumn: {},
 gridRow: {},
 gridAutoFlow: {},
 gridAutoColumns: {},
 gridAutoRows: {},
 gridTemplateColumns: {},
 gridTemplateRows: {},
 gridTemplateAreas: {},
 gridArea: {},
 position: {},
 zIndex: {
  themeKey: "zIndex"
 },
 top: {},
 right: {},
 bottom: {},
 left: {},
 boxShadow: {
  themeKey: "shadows"
 },
 width: {
  transform: Kn
 },
 maxWidth: {
  style: Th
 },
 minWidth: {
  transform: Kn
 },
 height: {
  transform: Kn
 },
 maxHeight: {
  transform: Kn
 },
 minHeight: {
  transform: Kn
 },
 boxSizing: {},
 font: {
  themeKey: "font"
 },
 fontFamily: {
  themeKey: "typography"
 },
 fontSize: {
  themeKey: "typography"
 },
 fontStyle: {
  themeKey: "typography"
 },
 fontWeight: {
  themeKey: "typography"
 },
 letterSpacing: {},
 textTransform: {},
 lineHeight: {},
 textAlign: {},
 typography: {
  cssProperty: !1,
  themeKey: "typography"
 }
};

function lR(...e) {
 const r = e.reduce((i, s) => i.concat(Object.keys(s)), []),
  a = new Set(r);
 return e.every(i => a.size === Object.keys(i).length)
}

function sR(e, r) {
 return typeof e == "function" ? e(r) : e
}

function cR() {
 function e(a, i, s, c) {
  const d = {
    [a]: i,
    theme: s
   },
   f = c[a];
  if (!f) return {
   [a]: i
  };
  const {
   cssProperty: h = a,
   themeKey: m,
   transform: g,
   style: b
  } = f;
  if (i == null) return null;
  if (m === "typography" && i === "inherit") return {
   [a]: i
  };
  const w = zu(s, m) || {};
  return b ? b(d) : Er(d, i, T => {
   let C = yu(w, g, T);
   return T === C && typeof T == "string" && (C = yu(w, g, `${a}${T==="default"?"":Ce(T)}`, T)), h === !1 ? C : {
    [h]: C
   }
  })
 }

 function r(a) {
  const {
   sx: i,
   theme: s = {}
  } = a || {};
  if (!i) return null;
  const c = s.unstable_sxConfig ?? Es;

  function d(f) {
   let h = f;
   if (typeof f == "function") h = f(s);
   else if (typeof f != "object") return f;
   if (!h) return null;
   const m = n1(s.breakpoints),
    g = Object.keys(m);
   let b = m;
   return Object.keys(h).forEach(w => {
    const R = sR(h[w], s);
    if (R != null)
     if (typeof R == "object")
      if (c[w]) b = Ql(b, e(w, R, s, c));
      else {
       const T = Er({
        theme: s
       }, R, C => ({
        [w]: C
       }));
       lR(T, R) ? b[w] = r({
        sx: R,
        theme: s
       }) : b = Ql(b, T)
      }
    else b = Ql(b, e(w, R, s, c))
   }), vw(s, r1(g, b))
  }
  return Array.isArray(i) ? i.map(d) : d(i)
 }
 return r
}
const Io = cR();
Io.filterProps = ["sx"];

function uR(e, r) {
 var i;
 const a = this;
 if (a.vars) {
  if (!((i = a.colorSchemes) != null && i[e]) || typeof a.getColorSchemeSelector != "function") return {};
  let s = a.getColorSchemeSelector(e);
  return s === "&" ? r : ((s.includes("data-") || s.includes(".")) && (s = `*:where(${s.replace(/\s*&$/,"")}) &`), {
   [s]: r
  })
 }
 return a.palette.mode === e ? r : {}
}

function Ts(e = {}, ...r) {
 const {
  breakpoints: a = {},
  palette: i = {},
  spacing: s,
  shape: c = {},
  ...d
 } = e, f = gw(a), h = a1(s);
 let m = bn({
  breakpoints: f,
  direction: "ltr",
  components: {},
  palette: {
   mode: "light",
   ...i
  },
  spacing: h,
  shape: {
   ...Sw,
   ...c
  }
 }, d);
 return m = xw(m), m.applyStyles = uR, m = r.reduce((g, b) => bn(g, b), m), m.unstable_sxConfig = {
  ...Es,
  ...d == null ? void 0 : d.unstable_sxConfig
 }, m.unstable_sx = function(b) {
  return Io({
   sx: b,
   theme: this
  })
 }, m
}

function dR(e) {
 return Object.keys(e).length === 0
}

function i1(e = null) {
 const r = y.useContext(Cs);
 return !r || dR(r) ? e : r
}
const fR = Ts();

function Uu(e = fR) {
 return i1(e)
}

function pR({
 styles: e,
 themeId: r,
 defaultTheme: a = {}
}) {
 const i = Uu(a),
  s = typeof e == "function" ? e(r && i[r] || i) : e;
 return v.jsx(Zb, {
  styles: s
 })
}
const hR = e => {
 var i;
 const r = {
   systemProps: {},
   otherProps: {}
  },
  a = ((i = e == null ? void 0 : e.theme) == null ? void 0 : i.unstable_sxConfig) ?? Es;
 return Object.keys(e).forEach(s => {
  a[s] ? r.systemProps[s] = e[s] : r.otherProps[s] = e[s]
 }), r
};

function Ah(e) {
 const {
  sx: r,
  ...a
 } = e, {
  systemProps: i,
  otherProps: s
 } = hR(a);
 let c;
 return Array.isArray(r) ? c = [i, ...r] : typeof r == "function" ? c = (...d) => {
  const f = r(...d);
  return Ur(f) ? {
   ...i,
   ...f
  } : i
 } : c = {
  ...i,
  ...r
 }, {
  ...s,
  sx: c
 }
}
const m0 = e => e,
 mR = () => {
  let e = m0;
  return {
   configure(r) {
    e = r
   },
   generate(r) {
    return e(r)
   },
   reset() {
    e = m0
   }
  }
 },
 l1 = mR();

function s1(e) {
 var r, a, i = "";
 if (typeof e == "string" || typeof e == "number") i += e;
 else if (typeof e == "object")
  if (Array.isArray(e)) {
   var s = e.length;
   for (r = 0; r < s; r++) e[r] && (a = s1(e[r])) && (i && (i += " "), i += a)
  } else
   for (a in e) e[a] && (i && (i += " "), i += a);
 return i
}

function Ae() {
 for (var e, r, a = 0, i = "", s = arguments.length; a < s; a++)(e = arguments[a]) && (r = s1(e)) && (i && (i += " "), i += r);
 return i
}

function gR(e = {}) {
 const {
  themeId: r,
  defaultTheme: a,
  defaultClassName: i = "MuiBox-root",
  generateClassName: s
 } = e, c = Jb("div", {
  shouldForwardProp: f => f !== "theme" && f !== "sx" && f !== "as"
 })(Io);
 return y.forwardRef(function(h, m) {
  const g = Uu(a),
   {
    className: b,
    component: w = "div",
    ...R
   } = Ah(h);
  return v.jsx(c, {
   as: w,
   ref: m,
   className: Ae(b, s ? s(i) : i),
   theme: r && g[r] || g,
   ...R
  })
 })
}
const vR = {
 active: "active",
 checked: "checked",
 completed: "completed",
 disabled: "disabled",
 error: "error",
 expanded: "expanded",
 focused: "focused",
 focusVisible: "focusVisible",
 open: "open",
 readOnly: "readOnly",
 required: "required",
 selected: "selected"
};

function Ue(e, r, a = "Mui") {
 const i = vR[r];
 return i ? `${a}-${i}` : `${l1.generate(e)}-${r}`
}

function Ve(e, r, a = "Mui") {
 const i = {};
 return r.forEach(s => {
  i[s] = Ue(e, s, a)
 }), i
}

function c1(e) {
 const {
  variants: r,
  ...a
 } = e, i = {
  variants: r,
  style: u0(a),
  isProcessed: !0
 };
 return i.style === a || r && r.forEach(s => {
  typeof s.style != "function" && (s.style = u0(s.style))
 }), i
}
const yR = Ts();

function Cp(e) {
 return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as"
}

function bR(e) {
 return e ? (r, a) => a[e] : null
}

function xR(e, r, a) {
 e.theme = CR(e.theme) ? a : e.theme[r] || e.theme
}

function fu(e, r) {
 const a = typeof r == "function" ? r(e) : r;
 if (Array.isArray(a)) return a.flatMap(i => fu(e, i));
 if (Array.isArray(a == null ? void 0 : a.variants)) {
  let i;
  if (a.isProcessed) i = a.style;
  else {
   const {
    variants: s,
    ...c
   } = a;
   i = c
  }
  return u1(e, a.variants, [i])
 }
 return a != null && a.isProcessed ? a.style : a
}

function u1(e, r, a = []) {
 var s;
 let i;
 e: for (let c = 0; c < r.length; c += 1) {
  const d = r[c];
  if (typeof d.props == "function") {
   if (i ?? (i = {
     ...e,
     ...e.ownerState,
     ownerState: e.ownerState
    }), !d.props(i)) continue
  } else
   for (const f in d.props)
    if (e[f] !== d.props[f] && ((s = e.ownerState) == null ? void 0 : s[f]) !== d.props[f]) continue e;
  typeof d.style == "function" ? (i ?? (i = {
   ...e,
   ...e.ownerState,
   ownerState: e.ownerState
  }), a.push(d.style(i))) : a.push(d.style)
 }
 return a
}

function d1(e = {}) {
 const {
  themeId: r,
  defaultTheme: a = yR,
  rootShouldForwardProp: i = Cp,
  slotShouldForwardProp: s = Cp
 } = e;

 function c(f) {
  xR(f, r, a)
 }
 return (f, h = {}) => {
  fw(f, O => O.filter(L => L !== Io));
  const {
   name: m,
   slot: g,
   skipVariantsResolver: b,
   skipSx: w,
   overridesResolver: R = bR(RR(g)),
   ...T
  } = h, C = b !== void 0 ? b : g && g !== "Root" && g !== "root" || !1, D = w || !1;
  let k = Cp;
  g === "Root" || g === "root" ? k = i : g ? k = s : wR(f) && (k = void 0);
  const N = Jb(f, {
    shouldForwardProp: k,
    label: SR(),
    ...T
   }),
   E = O => {
    if (typeof O == "function" && O.__emotion_real !== O) return function(U) {
     return fu(U, O)
    };
    if (Ur(O)) {
     const L = c1(O);
     return L.variants ? function(_) {
      return fu(_, L)
     } : L.style
    }
    return O
   },
   A = (...O) => {
    const L = [],
     U = O.map(E),
     _ = [];
    if (L.push(c), m && R && _.push(function(H) {
      var z, I;
      const X = (I = (z = H.theme.components) == null ? void 0 : z[m]) == null ? void 0 : I.styleOverrides;
      if (!X) return null;
      const W = {};
      for (const Q in X) W[Q] = fu(H, X[Q]);
      return R(H, W)
     }), m && !C && _.push(function(H) {
      var W, z;
      const V = H.theme,
       X = (z = (W = V == null ? void 0 : V.components) == null ? void 0 : W[m]) == null ? void 0 : z.variants;
      return X ? u1(H, X) : null
     }), D || _.push(Io), Array.isArray(U[0])) {
     const $ = U.shift(),
      H = new Array(L.length).fill(""),
      V = new Array(_.length).fill("");
     let X;
     X = [...H, ...$, ...V], X.raw = [...H, ...$.raw, ...V], L.unshift(X)
    }
    const G = [...L, ...U, ..._],
     S = N(...G);
    return f.muiName && (S.muiName = f.muiName), S
   };
  return N.withConfig && (A.withConfig = N.withConfig), A
 }
}

function SR(e, r) {
 return void 0
}

function CR(e) {
 for (const r in e) return !1;
 return !0
}

function wR(e) {
 return typeof e == "string" && e.charCodeAt(0) > 96
}

function RR(e) {
 return e && e.charAt(0).toLowerCase() + e.slice(1)
}
const f1 = d1();

function cs(e, r) {
 const a = {
  ...r
 };
 for (const i in e)
  if (Object.prototype.hasOwnProperty.call(e, i)) {
   const s = i;
   if (s === "components" || s === "slots") a[s] = {
    ...e[s],
    ...a[s]
   };
   else if (s === "componentsProps" || s === "slotProps") {
    const c = e[s],
     d = r[s];
    if (!d) a[s] = c || {};
    else if (!c) a[s] = d;
    else {
     a[s] = {
      ...d
     };
     for (const f in c)
      if (Object.prototype.hasOwnProperty.call(c, f)) {
       const h = f;
       a[s][h] = cs(c[h], d[h])
      }
    }
   } else a[s] === void 0 && (a[s] = e[s])
  } return a
}

function ER(e) {
 const {
  theme: r,
  name: a,
  props: i
 } = e;
 return !r || !r.components || !r.components[a] || !r.components[a].defaultProps ? i : cs(r.components[a].defaultProps, i)
}

function p1({
 props: e,
 name: r,
 defaultTheme: a,
 themeId: i
}) {
 let s = Uu(a);
 return i && (s = s[i] || s), ER({
  theme: s,
  name: r,
  props: e
 })
}
const vr = typeof window < "u" ? y.useLayoutEffect : y.useEffect;

function fi(e, r = Number.MIN_SAFE_INTEGER, a = Number.MAX_SAFE_INTEGER) {
 return Math.max(r, Math.min(e, a))
}

function Mh(e, r = 0, a = 1) {
 return fi(e, r, a)
}

function TR(e) {
 e = e.slice(1);
 const r = new RegExp(`.{1,${e.length>=6?2:1}}`, "g");
 let a = e.match(r);
 return a && a[0].length === 1 && (a = a.map(i => i + i)), a ? `rgb${a.length===4?"a":""}(${a.map((i,s)=>s<3?parseInt(i,16):Math.round(parseInt(i,16)/255*1e3)/1e3).join(", ")})` : ""
}

function Po(e) {
 if (e.type) return e;
 if (e.charAt(0) === "#") return Po(TR(e));
 const r = e.indexOf("("),
  a = e.substring(0, r);
 if (!["rgb", "rgba", "hsl", "hsla", "color"].includes(a)) throw new Error(uo(9, e));
 let i = e.substring(r + 1, e.length - 1),
  s;
 if (a === "color") {
  if (i = i.split(" "), s = i.shift(), i.length === 4 && i[3].charAt(0) === "/" && (i[3] = i[3].slice(1)), !["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].includes(s)) throw new Error(uo(10, s))
 } else i = i.split(",");
 return i = i.map(c => parseFloat(c)), {
  type: a,
  values: i,
  colorSpace: s
 }
}
const AR = e => {
  const r = Po(e);
  return r.values.slice(0, 3).map((a, i) => r.type.includes("hsl") && i !== 0 ? `${a}%` : a).join(" ")
 },
 Yl = (e, r) => {
  try {
   return AR(e)
  } catch {
   return e
  }
 };

function Iu(e) {
 const {
  type: r,
  colorSpace: a
 } = e;
 let {
  values: i
 } = e;
 return r.includes("rgb") ? i = i.map((s, c) => c < 3 ? parseInt(s, 10) : s) : r.includes("hsl") && (i[1] = `${i[1]}%`, i[2] = `${i[2]}%`), r.includes("color") ? i = `${a} ${i.join(" ")}` : i = `${i.join(", ")}`, `${r}(${i})`
}

function h1(e) {
 e = Po(e);
 const {
  values: r
 } = e, a = r[0], i = r[1] / 100, s = r[2] / 100, c = i * Math.min(s, 1 - s), d = (m, g = (m + a / 30) % 12) => s - c * Math.max(Math.min(g - 3, 9 - g, 1), -1);
 let f = "rgb";
 const h = [Math.round(d(0) * 255), Math.round(d(8) * 255), Math.round(d(4) * 255)];
 return e.type === "hsla" && (f += "a", h.push(r[3])), Iu({
  type: f,
  values: h
 })
}

function Yp(e) {
 e = Po(e);
 let r = e.type === "hsl" || e.type === "hsla" ? Po(h1(e)).values : e.values;
 return r = r.map(a => (e.type !== "color" && (a /= 255), a <= .03928 ? a / 12.92 : ((a + .055) / 1.055) ** 2.4)), Number((.2126 * r[0] + .7152 * r[1] + .0722 * r[2]).toFixed(3))
}

function MR(e, r) {
 const a = Yp(e),
  i = Yp(r);
 return (Math.max(a, i) + .05) / (Math.min(a, i) + .05)
}

function Qt(e, r) {
 return e = Po(e), r = Mh(r), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${r}` : e.values[3] = r, Iu(e)
}

function Vc(e, r, a) {
 try {
  return Qt(e, r)
 } catch {
  return e
 }
}

function ya(e, r) {
 if (e = Po(e), r = Mh(r), e.type.includes("hsl")) e.values[2] *= 1 - r;
 else if (e.type.includes("rgb") || e.type.includes("color"))
  for (let a = 0; a < 3; a += 1) e.values[a] *= 1 - r;
 return Iu(e)
}

function Lt(e, r, a) {
 try {
  return ya(e, r)
 } catch {
  return e
 }
}

function ba(e, r) {
 if (e = Po(e), r = Mh(r), e.type.includes("hsl")) e.values[2] += (100 - e.values[2]) * r;
 else if (e.type.includes("rgb"))
  for (let a = 0; a < 3; a += 1) e.values[a] += (255 - e.values[a]) * r;
 else if (e.type.includes("color"))
  for (let a = 0; a < 3; a += 1) e.values[a] += (1 - e.values[a]) * r;
 return Iu(e)
}

function Bt(e, r, a) {
 try {
  return ba(e, r)
 } catch {
  return e
 }
}

function m1(e, r = .15) {
 return Yp(e) > .5 ? ya(e, r) : ba(e, r)
}

function Gc(e, r, a) {
 try {
  return m1(e, r)
 } catch {
  return e
 }
}

function g0(...e) {
 return e.reduce((r, a) => a == null ? r : function(...s) {
  r.apply(this, s), a.apply(this, s)
 }, () => {})
}

function g1(e, r = 166) {
 let a;

 function i(...s) {
  const c = () => {
   e.apply(this, s)
  };
  clearTimeout(a), a = setTimeout(c, r)
 }
 return i.clear = () => {
  clearTimeout(a)
 }, i
}

function wp(e, r) {
 var a, i, s;
 return y.isValidElement(e) && r.indexOf(e.type.muiName ?? ((s = (i = (a = e.type) == null ? void 0 : a._payload) == null ? void 0 : i.value) == null ? void 0 : s.muiName)) !== -1
}

function sn(e) {
 return e && e.ownerDocument || document
}

function fo(e) {
 return sn(e).defaultView || window
}

function Xp(e, r) {
 typeof e == "function" ? e(r) : e && (e.current = r)
}
let v0 = 0;

function OR(e) {
 const [r, a] = y.useState(e), i = e || r;
 return y.useEffect(() => {
  r == null && (v0 += 1, a(`mui-${v0}`))
 }, [r]), i
}
const DR = {
  ...Pp
 },
 y0 = DR.useId;

function $i(e) {
 if (y0 !== void 0) {
  const r = y0();
  return e ?? r
 }
 return OR(e)
}

function us({
 controlled: e,
 default: r,
 name: a,
 state: i = "value"
}) {
 const {
  current: s
 } = y.useRef(e !== void 0), [c, d] = y.useState(r), f = s ? e : c, h = y.useCallback(m => {
  s || d(m)
 }, []);
 return [f, h]
}

function kn(e) {
 const r = y.useRef(e);
 return vr(() => {
  r.current = e
 }), y.useRef((...a) => (0, r.current)(...a)).current
}

function tn(...e) {
 return y.useMemo(() => e.every(r => r == null) ? null : r => {
  e.forEach(a => {
   Xp(a, r)
  })
 }, e)
}
const b0 = {};

function v1(e, r) {
 const a = y.useRef(b0);
 return a.current === b0 && (a.current = e(r)), a
}
const kR = [];

function zR(e) {
 y.useEffect(e, kR)
}
class Pu {
 constructor() {
  la(this, "currentId", null);
  la(this, "clear", () => {
   this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null)
  });
  la(this, "disposeEffect", () => this.clear)
 }
 static create() {
  return new Pu
 }
 start(r, a) {
  this.clear(), this.currentId = setTimeout(() => {
   this.currentId = null, a()
  }, r)
 }
}

function Uo() {
 const e = v1(Pu.create).current;
 return zR(e.disposeEffect), e
}

function Mi(e) {
 try {
  return e.matches(":focus-visible")
 } catch {}
 return !1
}

function y1(e = window) {
 const r = e.document.documentElement.clientWidth;
 return e.innerWidth - r
}
const jR = {
 border: 0,
 clip: "rect(0 0 0 0)",
 height: "1px",
 margin: "-1px",
 overflow: "hidden",
 padding: 0,
 position: "absolute",
 whiteSpace: "nowrap",
 width: "1px"
};

function Ie(e, r, a = void 0) {
 const i = {};
 for (const s in e) {
  const c = e[s];
  let d = "",
   f = !0;
  for (let h = 0; h < c.length; h += 1) {
   const m = c[h];
   m && (d += (f === !0 ? "" : " ") + r(m), f = !1, a && a[m] && (d += " " + a[m]))
  }
  i[s] = d
 }
 return i
}

function NR(e) {
 return typeof e == "string"
}

function b1(e, r, a) {
 return e === void 0 || NR(e) ? r : {
  ...r,
  ownerState: {
   ...r.ownerState,
   ...a
  }
 }
}

function ha(e, r = []) {
 if (e === void 0) return {};
 const a = {};
 return Object.keys(e).filter(i => i.match(/^on[A-Z]/) && typeof e[i] == "function" && !r.includes(i)).forEach(i => {
  a[i] = e[i]
 }), a
}

function x0(e) {
 if (e === void 0) return {};
 const r = {};
 return Object.keys(e).filter(a => !(a.match(/^on[A-Z]/) && typeof e[a] == "function")).forEach(a => {
  r[a] = e[a]
 }), r
}

function x1(e) {
 const {
  getSlotProps: r,
  additionalProps: a,
  externalSlotProps: i,
  externalForwardedProps: s,
  className: c
 } = e;
 if (!r) {
  const R = Ae(a == null ? void 0 : a.className, c, s == null ? void 0 : s.className, i == null ? void 0 : i.className),
   T = {
    ...a == null ? void 0 : a.style,
    ...s == null ? void 0 : s.style,
    ...i == null ? void 0 : i.style
   },
   C = {
    ...a,
    ...s,
    ...i
   };
  return R.length > 0 && (C.className = R), Object.keys(T).length > 0 && (C.style = T), {
   props: C,
   internalRef: void 0
  }
 }
 const d = ha({
   ...s,
   ...i
  }),
  f = x0(i),
  h = x0(s),
  m = r(d),
  g = Ae(m == null ? void 0 : m.className, a == null ? void 0 : a.className, c, s == null ? void 0 : s.className, i == null ? void 0 : i.className),
  b = {
   ...m == null ? void 0 : m.style,
   ...a == null ? void 0 : a.style,
   ...s == null ? void 0 : s.style,
   ...i == null ? void 0 : i.style
  },
  w = {
   ...m,
   ...a,
   ...h,
   ...f
  };
 return g.length > 0 && (w.className = g), Object.keys(b).length > 0 && (w.style = b), {
  props: w,
  internalRef: m.ref
 }
}

function S1(e, r, a) {
 return typeof e == "function" ? e(r, a) : e
}

function Br(e) {
 var b;
 const {
  elementType: r,
  externalSlotProps: a,
  ownerState: i,
  skipResolvingSlotProps: s = !1,
  ...c
 } = e, d = s ? {} : S1(a, i), {
  props: f,
  internalRef: h
 } = x1({
  ...c,
  externalSlotProps: d
 }), m = tn(h, d == null ? void 0 : d.ref, (b = e.additionalProps) == null ? void 0 : b.ref);
 return b1(r, {
  ...f,
  ref: m
 }, i)
}

function Ca(e) {
 var r;
 return parseInt(y.version, 10) >= 19 ? ((r = e == null ? void 0 : e.props) == null ? void 0 : r.ref) || null : (e == null ? void 0 : e.ref) || null
}
const C1 = y.createContext(null);

function Oh() {
 return y.useContext(C1)
}
const LR = typeof Symbol == "function" && Symbol.for,
 BR = LR ? Symbol.for("mui.nested") : "__THEME_NESTED__";

function $R(e, r) {
 return typeof r == "function" ? r(e) : {
  ...e,
  ...r
 }
}

function _R(e) {
 const {
  children: r,
  theme: a
 } = e, i = Oh(), s = y.useMemo(() => {
  const c = i === null ? {
   ...a
  } : $R(i, a);
  return c != null && (c[BR] = i !== null), c
 }, [a, i]);
 return v.jsx(C1.Provider, {
  value: s,
  children: r
 })
}
const w1 = y.createContext();

function UR({
 value: e,
 ...r
}) {
 return v.jsx(w1.Provider, {
  value: e ?? !0,
  ...r
 })
}
const Hu = () => y.useContext(w1) ?? !1,
 R1 = y.createContext(void 0);

function IR({
 value: e,
 children: r
}) {
 return v.jsx(R1.Provider, {
  value: e,
  children: r
 })
}

function PR(e) {
 const {
  theme: r,
  name: a,
  props: i
 } = e;
 if (!r || !r.components || !r.components[a]) return i;
 const s = r.components[a];
 return s.defaultProps ? cs(s.defaultProps, i) : !s.styleOverrides && !s.variants ? cs(s, i) : i
}

function HR({
 props: e,
 name: r
}) {
 const a = y.useContext(R1);
 return PR({
  props: e,
  name: r,
  theme: {
   components: a
  }
 })
}
const S0 = {};

function C0(e, r, a, i = !1) {
 return y.useMemo(() => {
  const s = e && r[e] || r;
  if (typeof a == "function") {
   const c = a(s),
    d = e ? {
     ...r,
     [e]: c
    } : c;
   return i ? () => d : d
  }
  return e ? {
   ...r,
   [e]: a
  } : {
   ...r,
   ...a
  }
 }, [e, r, a, i])
}

function E1(e) {
 const {
  children: r,
  theme: a,
  themeId: i
 } = e, s = i1(S0), c = Oh() || S0, d = C0(i, s, a), f = C0(i, c, a, !0), h = (i ? d[i] : d).direction === "rtl";
 return v.jsx(_R, {
  theme: f,
  children: v.jsx(Cs.Provider, {
   value: d,
   children: v.jsx(UR, {
    value: h,
    children: v.jsx(IR, {
     value: i ? d[i].components : d.components,
     children: r
    })
   })
  })
 })
}
const w0 = {
 theme: void 0
};

function qR(e) {
 let r, a;
 return function(s) {
  let c = r;
  return (c === void 0 || s.theme !== a) && (w0.theme = s.theme, c = c1(e(w0)), r = c, a = s.theme), c
 }
}
const Dh = "mode",
 kh = "color-scheme",
 VR = "data-color-scheme";

function GR(e) {
 const {
  defaultMode: r = "system",
  defaultLightColorScheme: a = "light",
  defaultDarkColorScheme: i = "dark",
  modeStorageKey: s = Dh,
  colorSchemeStorageKey: c = kh,
  attribute: d = VR,
  colorSchemeNode: f = "document.documentElement",
  nonce: h
 } = e || {};
 let m = "",
  g = d;
 if (d === "class" && (g = ".%s"), d === "data" && (g = "[data-%s]"), g.startsWith(".")) {
  const w = g.substring(1);
  m += `${f}.classList.remove('${w}'.replace('%s', light), '${w}'.replace('%s', dark));
      ${f}.classList.add('${w}'.replace('%s', colorScheme));`
 }
 const b = g.match(/\[([^\]]+)\]/);
 if (b) {
  const [w, R] = b[1].split("=");
  R || (m += `${f}.removeAttribute('${w}'.replace('%s', light));
      ${f}.removeAttribute('${w}'.replace('%s', dark));`), m += `
      ${f}.setAttribute('${w}'.replace('%s', colorScheme), ${R?`${R}.replace('%s', colorScheme)`:'""'});`
 } else m += `${f}.setAttribute('${g}', colorScheme);`;
 return v.jsx("script", {
  suppressHydrationWarning: !0,
  nonce: typeof window > "u" ? h : "",
  dangerouslySetInnerHTML: {
   __html: `(function() {
try {
  let colorScheme = '';
  const mode = localStorage.getItem('${s}') || '${r}';
  const dark = localStorage.getItem('${c}-dark') || '${i}';
  const light = localStorage.getItem('${c}-light') || '${a}';
  if (mode === 'system') {
    // handle system mode
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (mql.matches) {
      colorScheme = dark
    } else {
      colorScheme = light
    }
  }
  if (mode === 'light') {
    colorScheme = light;
  }
  if (mode === 'dark') {
    colorScheme = dark;
  }
  if (colorScheme) {
    ${m}
  }
} catch(e){}})();`
  }
 }, "mui-color-scheme-init")
}

function YR() {}
const XR = ({
 key: e,
 storageWindow: r
}) => (!r && typeof window < "u" && (r = window), {
 get(a) {
  if (typeof window > "u") return;
  if (!r) return a;
  let i;
  try {
   i = r.localStorage.getItem(e)
  } catch {}
  return i || a
 },
 set: a => {
  if (r) try {
   r.localStorage.setItem(e, a)
  } catch {}
 },
 subscribe: a => {
  if (!r) return YR;
  const i = s => {
   const c = s.newValue;
   s.key === e && a(c)
  };
  return r.addEventListener("storage", i), () => {
   r.removeEventListener("storage", i)
  }
 }
});

function Rp() {}

function R0(e) {
 if (typeof window < "u" && typeof window.matchMedia == "function" && e === "system") return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function T1(e, r) {
 if (e.mode === "light" || e.mode === "system" && e.systemMode === "light") return r("light");
 if (e.mode === "dark" || e.mode === "system" && e.systemMode === "dark") return r("dark")
}

function WR(e) {
 return T1(e, r => {
  if (r === "light") return e.lightColorScheme;
  if (r === "dark") return e.darkColorScheme
 })
}

function FR(e) {
 const {
  defaultMode: r = "light",
  defaultLightColorScheme: a,
  defaultDarkColorScheme: i,
  supportedColorSchemes: s = [],
  modeStorageKey: c = Dh,
  colorSchemeStorageKey: d = kh,
  storageWindow: f = typeof window > "u" ? void 0 : window,
  storageManager: h = XR,
  noSsr: m = !1
 } = e, g = s.join(","), b = s.length > 1, w = y.useMemo(() => h == null ? void 0 : h({
  key: c,
  storageWindow: f
 }), [h, c, f]), R = y.useMemo(() => h == null ? void 0 : h({
  key: `${d}-light`,
  storageWindow: f
 }), [h, d, f]), T = y.useMemo(() => h == null ? void 0 : h({
  key: `${d}-dark`,
  storageWindow: f
 }), [h, d, f]), [C, D] = y.useState(() => {
  const _ = (w == null ? void 0 : w.get(r)) || r,
   G = (R == null ? void 0 : R.get(a)) || a,
   S = (T == null ? void 0 : T.get(i)) || i;
  return {
   mode: _,
   systemMode: R0(_),
   lightColorScheme: G,
   darkColorScheme: S
  }
 }), [k, N] = y.useState(m || !b);
 y.useEffect(() => {
  N(!0)
 }, []);
 const E = WR(C),
  A = y.useCallback(_ => {
   D(G => {
    if (_ === G.mode) return G;
    const S = _ ?? r;
    return w == null || w.set(S), {
     ...G,
     mode: S,
     systemMode: R0(S)
    }
   })
  }, [w, r]),
  O = y.useCallback(_ => {
   _ ? typeof _ == "string" ? _ && !g.includes(_) ? console.error(`\`${_}\` does not exist in \`theme.colorSchemes\`.`) : D(G => {
    const S = {
     ...G
    };
    return T1(G, $ => {
     $ === "light" && (R == null || R.set(_), S.lightColorScheme = _), $ === "dark" && (T == null || T.set(_), S.darkColorScheme = _)
    }), S
   }) : D(G => {
    const S = {
      ...G
     },
     $ = _.light === null ? a : _.light,
     H = _.dark === null ? i : _.dark;
    return $ && (g.includes($) ? (S.lightColorScheme = $, R == null || R.set($)) : console.error(`\`${$}\` does not exist in \`theme.colorSchemes\`.`)), H && (g.includes(H) ? (S.darkColorScheme = H, T == null || T.set(H)) : console.error(`\`${H}\` does not exist in \`theme.colorSchemes\`.`)), S
   }) : D(G => (R == null || R.set(a), T == null || T.set(i), {
    ...G,
    lightColorScheme: a,
    darkColorScheme: i
   }))
  }, [g, R, T, a, i]),
  L = y.useCallback(_ => {
   C.mode === "system" && D(G => {
    const S = _ != null && _.matches ? "dark" : "light";
    return G.systemMode === S ? G : {
     ...G,
     systemMode: S
    }
   })
  }, [C.mode]),
  U = y.useRef(L);
 return U.current = L, y.useEffect(() => {
  if (typeof window.matchMedia != "function" || !b) return;
  const _ = (...S) => U.current(...S),
   G = window.matchMedia("(prefers-color-scheme: dark)");
  return G.addListener(_), _(G), () => {
   G.removeListener(_)
  }
 }, [b]), y.useEffect(() => {
  if (b) {
   const _ = (w == null ? void 0 : w.subscribe($ => {
     (!$ || ["light", "dark", "system"].includes($)) && A($ || r)
    })) || Rp,
    G = (R == null ? void 0 : R.subscribe($ => {
     (!$ || g.match($)) && O({
      light: $
     })
    })) || Rp,
    S = (T == null ? void 0 : T.subscribe($ => {
     (!$ || g.match($)) && O({
      dark: $
     })
    })) || Rp;
   return () => {
    _(), G(), S()
   }
  }
 }, [O, A, g, r, f, b, w, R, T]), {
  ...C,
  mode: k ? C.mode : void 0,
  systemMode: k ? C.systemMode : void 0,
  colorScheme: k ? E : void 0,
  setMode: A,
  setColorScheme: O
 }
}
const KR = "*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";

function QR(e) {
 const {
  themeId: r,
  theme: a = {},
  modeStorageKey: i = Dh,
  colorSchemeStorageKey: s = kh,
  disableTransitionOnChange: c = !1,
  defaultColorScheme: d,
  resolveTheme: f
 } = e, h = {
  allColorSchemes: [],
  colorScheme: void 0,
  darkColorScheme: void 0,
  lightColorScheme: void 0,
  mode: void 0,
  setColorScheme: () => {},
  setMode: () => {},
  systemMode: void 0
 }, m = y.createContext(void 0), g = () => y.useContext(m) || h, b = {}, w = {};

 function R(k) {
  var me, ve, De, be;
  const {
   children: N,
   theme: E,
   modeStorageKey: A = i,
   colorSchemeStorageKey: O = s,
   disableTransitionOnChange: L = c,
   storageManager: U,
   storageWindow: _ = typeof window > "u" ? void 0 : window,
   documentNode: G = typeof document > "u" ? void 0 : document,
   colorSchemeNode: S = typeof document > "u" ? void 0 : document.documentElement,
   disableNestedContext: $ = !1,
   disableStyleSheetGeneration: H = !1,
   defaultMode: V = "system",
   forceThemeRerender: X = !1,
   noSsr: W
  } = k, z = y.useRef(!1), I = Oh(), Q = y.useContext(m), Z = !!Q && !$, j = y.useMemo(() => E || (typeof a == "function" ? a() : a), [E]), q = j[r], ee = q || j, {
   colorSchemes: ne = b,
   components: ce = w,
   cssVarPrefix: le
  } = ee, re = Object.keys(ne).filter(xe => !!ne[xe]).join(","), ye = y.useMemo(() => re.split(","), [re]), ge = typeof d == "string" ? d : d.light, Te = typeof d == "string" ? d : d.dark, fe = ne[ge] && ne[Te] ? V : ((ve = (me = ne[ee.defaultColorScheme]) == null ? void 0 : me.palette) == null ? void 0 : ve.mode) || ((De = ee.palette) == null ? void 0 : De.mode), {
   mode: Oe,
   setMode: we,
   systemMode: Se,
   lightColorScheme: Re,
   darkColorScheme: ze,
   colorScheme: it,
   setColorScheme: Ne
  } = FR({
   supportedColorSchemes: ye,
   defaultLightColorScheme: ge,
   defaultDarkColorScheme: Te,
   modeStorageKey: A,
   colorSchemeStorageKey: O,
   defaultMode: fe,
   storageManager: U,
   storageWindow: _,
   noSsr: W
  });
  let Je = Oe,
   Ke = it;
  Z && (Je = Q.mode, Ke = Q.colorScheme);
  let Pe = Ke || ee.defaultColorScheme;
  ee.vars && !X && (Pe = ee.defaultColorScheme);
  const He = y.useMemo(() => {
    var Qe;
    const xe = ((Qe = ee.generateThemeVars) == null ? void 0 : Qe.call(ee)) || ee.vars,
     he = {
      ...ee,
      components: ce,
      colorSchemes: ne,
      cssVarPrefix: le,
      vars: xe
     };
    if (typeof he.generateSpacing == "function" && (he.spacing = he.generateSpacing()), Pe) {
     const Be = ne[Pe];
     Be && typeof Be == "object" && Object.keys(Be).forEach(Xe => {
      Be[Xe] && typeof Be[Xe] == "object" ? he[Xe] = {
       ...he[Xe],
       ...Be[Xe]
      } : he[Xe] = Be[Xe]
     })
    }
    return f ? f(he) : he
   }, [ee, Pe, ce, ne, le]),
   Ee = ee.colorSchemeSelector;
  vr(() => {
   if (Ke && S && Ee && Ee !== "media") {
    const xe = Ee;
    let he = Ee;
    if (xe === "class" && (he = ".%s"), xe === "data" && (he = "[data-%s]"), xe != null && xe.startsWith("data-") && !xe.includes("%s") && (he = `[${xe}="%s"]`), he.startsWith(".")) S.classList.remove(...ye.map(Qe => he.substring(1).replace("%s", Qe))), S.classList.add(he.substring(1).replace("%s", Ke));
    else {
     const Qe = he.replace("%s", Ke).match(/\[([^\]]+)\]/);
     if (Qe) {
      const [Be, Xe] = Qe[1].split("=");
      Xe || ye.forEach(Me => {
       S.removeAttribute(Be.replace(Ke, Me))
      }), S.setAttribute(Be, Xe ? Xe.replace(/"|'/g, "") : "")
     } else S.setAttribute(he, Ke)
    }
   }
  }, [Ke, Ee, S, ye]), y.useEffect(() => {
   let xe;
   if (L && z.current && G) {
    const he = G.createElement("style");
    he.appendChild(G.createTextNode(KR)), G.head.appendChild(he), window.getComputedStyle(G.body), xe = setTimeout(() => {
     G.head.removeChild(he)
    }, 1)
   }
   return () => {
    clearTimeout(xe)
   }
  }, [Ke, L, G]), y.useEffect(() => (z.current = !0, () => {
   z.current = !1
  }), []);
  const mt = y.useMemo(() => ({
   allColorSchemes: ye,
   colorScheme: Ke,
   darkColorScheme: ze,
   lightColorScheme: Re,
   mode: Je,
   setColorScheme: Ne,
   setMode: we,
   systemMode: Se
  }), [ye, Ke, ze, Re, Je, Ne, we, Se, He.colorSchemeSelector]);
  let ot = !0;
  (H || ee.cssVariables === !1 || Z && (I == null ? void 0 : I.cssVarPrefix) === le) && (ot = !1);
  const de = v.jsxs(y.Fragment, {
   children: [v.jsx(E1, {
    themeId: q ? r : void 0,
    theme: He,
    children: N
   }), ot && v.jsx(Zb, {
    styles: ((be = He.generateStyleSheets) == null ? void 0 : be.call(He)) || []
   })]
  });
  return Z ? de : v.jsx(m.Provider, {
   value: mt,
   children: de
  })
 }
 const T = typeof d == "string" ? d : d.light,
  C = typeof d == "string" ? d : d.dark;
 return {
  CssVarsProvider: R,
  useColorScheme: g,
  getInitColorSchemeScript: k => GR({
   colorSchemeStorageKey: s,
   defaultLightColorScheme: T,
   defaultDarkColorScheme: C,
   modeStorageKey: i,
   ...k
  })
 }
}

function ZR(e = "") {
 function r(...i) {
  if (!i.length) return "";
  const s = i[0];
  return typeof s == "string" && !s.match(/(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))|^(-?(\d*\.)?\d+)$|(\d+ \d+ \d+)/) ? `, var(--${e?`${e}-`:""}${s}${r(...i.slice(1))})` : `, ${s}`
 }
 return (i, ...s) => `var(--${e?`${e}-`:""}${i}${r(...s)})`
}
const E0 = (e, r, a, i = []) => {
  let s = e;
  r.forEach((c, d) => {
   d === r.length - 1 ? Array.isArray(s) ? s[Number(c)] = a : s && typeof s == "object" && (s[c] = a) : s && typeof s == "object" && (s[c] || (s[c] = i.includes(c) ? [] : {}), s = s[c])
  })
 },
 JR = (e, r, a) => {
  function i(s, c = [], d = []) {
   Object.entries(s).forEach(([f, h]) => {
    (!a || a && !a([...c, f])) && h != null && (typeof h == "object" && Object.keys(h).length > 0 ? i(h, [...c, f], Array.isArray(h) ? [...d, f] : d) : r([...c, f], h, d))
   })
  }
  i(e)
 },
 eE = (e, r) => typeof r == "number" ? ["lineHeight", "fontWeight", "opacity", "zIndex"].some(i => e.includes(i)) || e[e.length - 1].toLowerCase().includes("opacity") ? r : `${r}px` : r;

function Ep(e, r) {
 const {
  prefix: a,
  shouldSkipGeneratingVar: i
 } = r || {}, s = {}, c = {}, d = {};
 return JR(e, (f, h, m) => {
  if ((typeof h == "string" || typeof h == "number") && (!i || !i(f, h))) {
   const g = `--${a?`${a}-`:""}${f.join("-")}`,
    b = eE(f, h);
   Object.assign(s, {
    [g]: b
   }), E0(c, f, `var(${g})`, m), E0(d, f, `var(${g}, ${b})`, m)
  }
 }, f => f[0] === "vars"), {
  css: s,
  vars: c,
  varsWithDefaults: d
 }
}

function tE(e, r = {}) {
 const {
  getSelector: a = D,
  disableCssColorScheme: i,
  colorSchemeSelector: s
 } = r, {
  colorSchemes: c = {},
  components: d,
  defaultColorScheme: f = "light",
  ...h
 } = e, {
  vars: m,
  css: g,
  varsWithDefaults: b
 } = Ep(h, r);
 let w = b;
 const R = {},
  {
   [f]: T,
   ...C
  } = c;
 if (Object.entries(C || {}).forEach(([E, A]) => {
   const {
    vars: O,
    css: L,
    varsWithDefaults: U
   } = Ep(A, r);
   w = bn(w, U), R[E] = {
    css: L,
    vars: O
   }
  }), T) {
  const {
   css: E,
   vars: A,
   varsWithDefaults: O
  } = Ep(T, r);
  w = bn(w, O), R[f] = {
   css: E,
   vars: A
  }
 }

 function D(E, A) {
  var L, U;
  let O = s;
  if (s === "class" && (O = ".%s"), s === "data" && (O = "[data-%s]"), s != null && s.startsWith("data-") && !s.includes("%s") && (O = `[${s}="%s"]`), E) {
   if (O === "media") return e.defaultColorScheme === E ? ":root" : {
    [`@media (prefers-color-scheme: ${((U=(L=c[E])==null?void 0:L.palette)==null?void 0:U.mode)||E})`]: {
     ":root": A
    }
   };
   if (O) return e.defaultColorScheme === E ? `:root, ${O.replace("%s",String(E))}` : O.replace("%s", String(E))
  }
  return ":root"
 }
 return {
  vars: w,
  generateThemeVars: () => {
   let E = {
    ...m
   };
   return Object.entries(R).forEach(([, {
    vars: A
   }]) => {
    E = bn(E, A)
   }), E
  },
  generateStyleSheets: () => {
   var _, G;
   const E = [],
    A = e.defaultColorScheme || "light";

   function O(S, $) {
    Object.keys($).length && E.push(typeof S == "string" ? {
     [S]: {
      ...$
     }
    } : S)
   }
   O(a(void 0, {
    ...g
   }), g);
   const {
    [A]: L, ...U
   } = R;
   if (L) {
    const {
     css: S
    } = L, $ = (G = (_ = c[A]) == null ? void 0 : _.palette) == null ? void 0 : G.mode, H = !i && $ ? {
     colorScheme: $,
     ...S
    } : {
     ...S
    };
    O(a(A, {
     ...H
    }), H)
   }
   return Object.entries(U).forEach(([S, {
    css: $
   }]) => {
    var X, W;
    const H = (W = (X = c[S]) == null ? void 0 : X.palette) == null ? void 0 : W.mode,
     V = !i && H ? {
      colorScheme: H,
      ...$
     } : {
      ...$
     };
    O(a(S, {
     ...V
    }), V)
   }), E
  }
 }
}

function nE(e) {
 return function(a) {
  return e === "media" ? `@media (prefers-color-scheme: ${a})` : e ? e.startsWith("data-") && !e.includes("%s") ? `[${e}="${a}"] &` : e === "class" ? `.${a} &` : e === "data" ? `[data-${a}] &` : `${e.replace("%s",a)} &` : "&"
 }
}
const rE = Ts(),
 oE = f1("div", {
  name: "MuiContainer",
  slot: "Root",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.root, r[`maxWidth${Ce(String(a.maxWidth))}`], a.fixed && r.fixed, a.disableGutters && r.disableGutters]
  }
 }),
 aE = e => p1({
  props: e,
  name: "MuiContainer",
  defaultTheme: rE
 }),
 iE = (e, r) => {
  const a = h => Ue(r, h),
   {
    classes: i,
    fixed: s,
    disableGutters: c,
    maxWidth: d
   } = e,
   f = {
    root: ["root", d && `maxWidth${Ce(String(d))}`, s && "fixed", c && "disableGutters"]
   };
  return Ie(f, a, i)
 };

function lE(e = {}) {
 const {
  createStyledComponent: r = oE,
  useThemeProps: a = aE,
  componentName: i = "MuiContainer"
 } = e, s = r(({
  theme: d,
  ownerState: f
 }) => ({
  width: "100%",
  marginLeft: "auto",
  boxSizing: "border-box",
  marginRight: "auto",
  ...!f.disableGutters && {
   paddingLeft: d.spacing(2),
   paddingRight: d.spacing(2),
   [d.breakpoints.up("sm")]: {
    paddingLeft: d.spacing(3),
    paddingRight: d.spacing(3)
   }
  }
 }), ({
  theme: d,
  ownerState: f
 }) => f.fixed && Object.keys(d.breakpoints.values).reduce((h, m) => {
  const g = m,
   b = d.breakpoints.values[g];
  return b !== 0 && (h[d.breakpoints.up(g)] = {
   maxWidth: `${b}${d.breakpoints.unit}`
  }), h
 }, {}), ({
  theme: d,
  ownerState: f
 }) => ({
  ...f.maxWidth === "xs" && {
   [d.breakpoints.up("xs")]: {
    maxWidth: Math.max(d.breakpoints.values.xs, 444)
   }
  },
  ...f.maxWidth && f.maxWidth !== "xs" && {
   [d.breakpoints.up(f.maxWidth)]: {
    maxWidth: `${d.breakpoints.values[f.maxWidth]}${d.breakpoints.unit}`
   }
  }
 }));
 return y.forwardRef(function(f, h) {
  const m = a(f),
   {
    className: g,
    component: b = "div",
    disableGutters: w = !1,
    fixed: R = !1,
    maxWidth: T = "lg",
    classes: C,
    ...D
   } = m,
   k = {
    ...m,
    component: b,
    disableGutters: w,
    fixed: R,
    maxWidth: T
   },
   N = iE(k, i);
  return v.jsx(s, {
   as: b,
   ownerState: k,
   className: Ae(N.root, g),
   ref: h,
   ...D
  })
 })
}
const sE = Ts(),
 cE = f1("div", {
  name: "MuiStack",
  slot: "Root",
  overridesResolver: (e, r) => r.root
 });

function uE(e) {
 return p1({
  props: e,
  name: "MuiStack",
  defaultTheme: sE
 })
}

function dE(e, r) {
 const a = y.Children.toArray(e).filter(Boolean);
 return a.reduce((i, s, c) => (i.push(s), c < a.length - 1 && i.push(y.cloneElement(r, {
  key: `separator-${c}`
 })), i), [])
}
const fE = e => ({
  row: "Left",
  "row-reverse": "Right",
  column: "Top",
  "column-reverse": "Bottom"
 })[e],
 pE = ({
  ownerState: e,
  theme: r
 }) => {
  let a = {
   display: "flex",
   flexDirection: "column",
   ...Er({
    theme: r
   }, Sp({
    values: e.direction,
    breakpoints: r.breakpoints.values
   }), i => ({
    flexDirection: i
   }))
  };
  if (e.spacing) {
   const i = ju(r),
    s = Object.keys(r.breakpoints.values).reduce((h, m) => ((typeof e.spacing == "object" && e.spacing[m] != null || typeof e.direction == "object" && e.direction[m] != null) && (h[m] = !0), h), {}),
    c = Sp({
     values: e.direction,
     base: s
    }),
    d = Sp({
     values: e.spacing,
     base: s
    });
   typeof c == "object" && Object.keys(c).forEach((h, m, g) => {
    if (!c[h]) {
     const w = m > 0 ? c[g[m - 1]] : "column";
     c[h] = w
    }
   }), a = bn(a, Er({
    theme: r
   }, d, (h, m) => e.useFlexGap ? {
    gap: va(i, h)
   } : {
    "& > :not(style):not(style)": {
     margin: 0
    },
    "& > :not(style) ~ :not(style)": {
     [`margin${fE(m?c[m]:e.direction)}`]: va(i, h)
    }
   }))
  }
  return a = ww(r.breakpoints, a), a
 };

function hE(e = {}) {
 const {
  createStyledComponent: r = cE,
  useThemeProps: a = uE,
  componentName: i = "MuiStack"
 } = e, s = () => Ie({
  root: ["root"]
 }, h => Ue(i, h), {}), c = r(pE);
 return y.forwardRef(function(h, m) {
  const g = a(h),
   b = Ah(g),
   {
    component: w = "div",
    direction: R = "column",
    spacing: T = 0,
    divider: C,
    children: D,
    className: k,
    useFlexGap: N = !1,
    ...E
   } = b,
   A = {
    direction: R,
    spacing: T,
    useFlexGap: N
   },
   O = s();
  return v.jsx(c, {
   as: w,
   ownerState: A,
   ref: m,
   className: Ae(O.root, k),
   ...E,
   children: C ? dE(D, C) : D
  })
 })
}

function A1() {
 return {
  text: {
   primary: "rgba(0, 0, 0, 0.87)",
   secondary: "rgba(0, 0, 0, 0.6)",
   disabled: "rgba(0, 0, 0, 0.38)"
  },
  divider: "rgba(0, 0, 0, 0.12)",
  background: {
   paper: as.white,
   default: as.white
  },
  action: {
   active: "rgba(0, 0, 0, 0.54)",
   hover: "rgba(0, 0, 0, 0.04)",
   hoverOpacity: .04,
   selected: "rgba(0, 0, 0, 0.08)",
   selectedOpacity: .08,
   disabled: "rgba(0, 0, 0, 0.26)",
   disabledBackground: "rgba(0, 0, 0, 0.12)",
   disabledOpacity: .38,
   focus: "rgba(0, 0, 0, 0.12)",
   focusOpacity: .12,
   activatedOpacity: .12
  }
 }
}
const mE = A1();

function M1() {
 return {
  text: {
   primary: as.white,
   secondary: "rgba(255, 255, 255, 0.7)",
   disabled: "rgba(255, 255, 255, 0.5)",
   icon: "rgba(255, 255, 255, 0.5)"
  },
  divider: "rgba(255, 255, 255, 0.12)",
  background: {
   paper: "#121212",
   default: "#121212"
  },
  action: {
   active: as.white,
   hover: "rgba(255, 255, 255, 0.08)",
   hoverOpacity: .08,
   selected: "rgba(255, 255, 255, 0.16)",
   selectedOpacity: .16,
   disabled: "rgba(255, 255, 255, 0.3)",
   disabledBackground: "rgba(255, 255, 255, 0.12)",
   disabledOpacity: .38,
   focus: "rgba(255, 255, 255, 0.12)",
   focusOpacity: .12,
   activatedOpacity: .24
  }
 }
}
const T0 = M1();

function A0(e, r, a, i) {
 const s = i.light || i,
  c = i.dark || i * 1.5;
 e[r] || (e.hasOwnProperty(a) ? e[r] = e[a] : r === "light" ? e.light = ba(e.main, s) : r === "dark" && (e.dark = ya(e.main, c)))
}

function gE(e = "light") {
 return e === "dark" ? {
  main: li[200],
  light: li[50],
  dark: li[400]
 } : {
  main: li[700],
  light: li[400],
  dark: li[800]
 }
}

function vE(e = "light") {
 return e === "dark" ? {
  main: ii[200],
  light: ii[50],
  dark: ii[400]
 } : {
  main: ii[500],
  light: ii[300],
  dark: ii[700]
 }
}

function yE(e = "light") {
 return e === "dark" ? {
  main: ai[500],
  light: ai[300],
  dark: ai[700]
 } : {
  main: ai[700],
  light: ai[400],
  dark: ai[800]
 }
}

function bE(e = "light") {
 return e === "dark" ? {
  main: si[400],
  light: si[300],
  dark: si[700]
 } : {
  main: si[700],
  light: si[500],
  dark: si[900]
 }
}

function xE(e = "light") {
 return e === "dark" ? {
  main: ci[400],
  light: ci[300],
  dark: ci[700]
 } : {
  main: ci[800],
  light: ci[500],
  dark: ci[900]
 }
}

function SE(e = "light") {
 return e === "dark" ? {
  main: Bl[400],
  light: Bl[300],
  dark: Bl[700]
 } : {
  main: "#ed6c02",
  light: Bl[500],
  dark: Bl[900]
 }
}

function zh(e) {
 const {
  mode: r = "light",
  contrastThreshold: a = 3,
  tonalOffset: i = .2,
  ...s
 } = e, c = e.primary || gE(r), d = e.secondary || vE(r), f = e.error || yE(r), h = e.info || bE(r), m = e.success || xE(r), g = e.warning || SE(r);

 function b(C) {
  return MR(C, T0.text.primary) >= a ? T0.text.primary : mE.text.primary
 }
 const w = ({
  color: C,
  name: D,
  mainShade: k = 500,
  lightShade: N = 300,
  darkShade: E = 700
 }) => {
  if (C = {
    ...C
   }, !C.main && C[k] && (C.main = C[k]), !C.hasOwnProperty("main")) throw new Error(uo(11, D ? ` (${D})` : "", k));
  if (typeof C.main != "string") throw new Error(uo(12, D ? ` (${D})` : "", JSON.stringify(C.main)));
  return A0(C, "light", N, i), A0(C, "dark", E, i), C.contrastText || (C.contrastText = b(C.main)), C
 };
 let R;
 return r === "light" ? R = A1() : r === "dark" && (R = M1()), bn({
  common: {
   ...as
  },
  mode: r,
  primary: w({
   color: c,
   name: "primary"
  }),
  secondary: w({
   color: d,
   name: "secondary",
   mainShade: "A400",
   lightShade: "A200",
   darkShade: "A700"
  }),
  error: w({
   color: f,
   name: "error"
  }),
  warning: w({
   color: g,
   name: "warning"
  }),
  info: w({
   color: h,
   name: "info"
  }),
  success: w({
   color: m,
   name: "success"
  }),
  grey: pC,
  contrastThreshold: a,
  getContrastText: b,
  augmentColor: w,
  tonalOffset: i,
  ...R
 }, s)
}

function CE(e) {
 const r = {};
 return Object.entries(e).forEach(i => {
  const [s, c] = i;
  typeof c == "object" && (r[s] = `${c.fontStyle?`${c.fontStyle} `:""}${c.fontVariant?`${c.fontVariant} `:""}${c.fontWeight?`${c.fontWeight} `:""}${c.fontStretch?`${c.fontStretch} `:""}${c.fontSize||""}${c.lineHeight?`/${c.lineHeight} `:""}${c.fontFamily||""}`)
 }), r
}

function wE(e, r) {
 return {
  toolbar: {
   minHeight: 56,
   [e.up("xs")]: {
    "@media (orientation: landscape)": {
     minHeight: 48
    }
   },
   [e.up("sm")]: {
    minHeight: 64
   }
  },
  ...r
 }
}

function RE(e) {
 return Math.round(e * 1e5) / 1e5
}
const M0 = {
  textTransform: "uppercase"
 },
 O0 = '"Roboto", "Helvetica", "Arial", sans-serif';

function O1(e, r) {
 const {
  fontFamily: a = O0,
  fontSize: i = 14,
  fontWeightLight: s = 300,
  fontWeightRegular: c = 400,
  fontWeightMedium: d = 500,
  fontWeightBold: f = 700,
  htmlFontSize: h = 16,
  allVariants: m,
  pxToRem: g,
  ...b
 } = typeof r == "function" ? r(e) : r, w = i / 14, R = g || (D => `${D/h*w}rem`), T = (D, k, N, E, A) => ({
  fontFamily: a,
  fontWeight: D,
  fontSize: R(k),
  lineHeight: N,
  ...a === O0 ? {
   letterSpacing: `${RE(E/k)}em`
  } : {},
  ...A,
  ...m
 }), C = {
  h1: T(s, 96, 1.167, -1.5),
  h2: T(s, 60, 1.2, -.5),
  h3: T(c, 48, 1.167, 0),
  h4: T(c, 34, 1.235, .25),
  h5: T(c, 24, 1.334, 0),
  h6: T(d, 20, 1.6, .15),
  subtitle1: T(c, 16, 1.75, .15),
  subtitle2: T(d, 14, 1.57, .1),
  body1: T(c, 16, 1.5, .15),
  body2: T(c, 14, 1.43, .15),
  button: T(d, 14, 1.75, .4, M0),
  caption: T(c, 12, 1.66, .4),
  overline: T(c, 12, 2.66, 1, M0),
  inherit: {
   fontFamily: "inherit",
   fontWeight: "inherit",
   fontSize: "inherit",
   lineHeight: "inherit",
   letterSpacing: "inherit"
  }
 };
 return bn({
  htmlFontSize: h,
  pxToRem: R,
  fontFamily: a,
  fontSize: i,
  fontWeightLight: s,
  fontWeightRegular: c,
  fontWeightMedium: d,
  fontWeightBold: f,
  ...C
 }, b, {
  clone: !1
 })
}
const EE = .2,
 TE = .14,
 AE = .12;

function qt(...e) {
 return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${EE})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${TE})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${AE})`].join(",")
}
const ME = ["none", qt(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), qt(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), qt(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), qt(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), qt(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), qt(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), qt(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), qt(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), qt(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), qt(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), qt(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), qt(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), qt(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), qt(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), qt(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), qt(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), qt(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), qt(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), qt(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), qt(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), qt(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), qt(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), qt(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), qt(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)],
 OE = {
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
 },
 D1 = {
  shortest: 150,
  shorter: 200,
  short: 250,
  standard: 300,
  complex: 375,
  enteringScreen: 225,
  leavingScreen: 195
 };

function D0(e) {
 return `${Math.round(e)}ms`
}

function DE(e) {
 if (!e) return 0;
 const r = e / 36;
 return Math.min(Math.round((4 + 15 * r ** .25 + r / 5) * 10), 3e3)
}

function kE(e) {
 const r = {
   ...OE,
   ...e.easing
  },
  a = {
   ...D1,
   ...e.duration
  };
 return {
  getAutoHeightDuration: DE,
  create: (s = ["all"], c = {}) => {
   const {
    duration: d = a.standard,
    easing: f = r.easeInOut,
    delay: h = 0,
    ...m
   } = c;
   return (Array.isArray(s) ? s : [s]).map(g => `${g} ${typeof d=="string"?d:D0(d)} ${f} ${typeof h=="string"?h:D0(h)}`).join(",")
  },
  ...e,
  easing: r,
  duration: a
 }
}
const zE = {
 mobileStepper: 1e3,
 fab: 1050,
 speedDial: 1050,
 appBar: 1100,
 drawer: 1200,
 modal: 1300,
 snackbar: 1400,
 tooltip: 1500
};

function jE(e) {
 return Ur(e) || typeof e > "u" || typeof e == "string" || typeof e == "boolean" || typeof e == "number" || Array.isArray(e)
}

function k1(e = {}) {
 const r = {
  ...e
 };

 function a(i) {
  const s = Object.entries(i);
  for (let c = 0; c < s.length; c++) {
   const [d, f] = s[c];
   !jE(f) || d.startsWith("unstable_") ? delete i[d] : Ur(f) && (i[d] = {
    ...f
   }, a(i[d]))
  }
 }
 return a(r), `import { unstable_createBreakpoints as createBreakpoints, createTransitions } from '@mui/material/styles';

const theme = ${JSON.stringify(r,null,2)};

theme.breakpoints = createBreakpoints(theme.breakpoints || {});
theme.transitions = createTransitions(theme.transitions || {});

export default theme;`
}

function Wp(e = {}, ...r) {
 const {
  breakpoints: a,
  mixins: i = {},
  spacing: s,
  palette: c = {},
  transitions: d = {},
  typography: f = {},
  shape: h,
  ...m
 } = e;
 if (e.vars && e.generateThemeVars === void 0) throw new Error(uo(20));
 const g = zh(c),
  b = Ts(e);
 let w = bn(b, {
  mixins: wE(b.breakpoints, i),
  palette: g,
  shadows: ME.slice(),
  typography: O1(g, f),
  transitions: kE(d),
  zIndex: {
   ...zE
  }
 });
 return w = bn(w, m), w = r.reduce((R, T) => bn(R, T), w), w.unstable_sxConfig = {
  ...Es,
  ...m == null ? void 0 : m.unstable_sxConfig
 }, w.unstable_sx = function(T) {
  return Io({
   sx: T,
   theme: this
  })
 }, w.toRuntimeSource = k1, w
}

function Fp(e) {
 let r;
 return e < 1 ? r = 5.11916 * e ** 2 : r = 4.5 * Math.log(e + 1) + 2, Math.round(r * 10) / 1e3
}
const NE = [...Array(25)].map((e, r) => {
 if (r === 0) return "none";
 const a = Fp(r);
 return `linear-gradient(rgba(255 255 255 / ${a}), rgba(255 255 255 / ${a}))`
});

function z1(e) {
 return {
  inputPlaceholder: e === "dark" ? .5 : .42,
  inputUnderline: e === "dark" ? .7 : .42,
  switchTrackDisabled: e === "dark" ? .2 : .12,
  switchTrack: e === "dark" ? .3 : .38
 }
}

function j1(e) {
 return e === "dark" ? NE : []
}

function LE(e) {
 const {
  palette: r = {
   mode: "light"
  },
  opacity: a,
  overlays: i,
  ...s
 } = e, c = zh(r);
 return {
  palette: c,
  opacity: {
   ...z1(c.mode),
   ...a
  },
  overlays: i || j1(c.mode),
  ...s
 }
}

function BE(e) {
 var r;
 return !!e[0].match(/(cssVarPrefix|colorSchemeSelector|rootSelector|typography|mixins|breakpoints|direction|transitions)/) || !!e[0].match(/sxConfig$/) || e[0] === "palette" && !!((r = e[1]) != null && r.match(/(mode|contrastThreshold|tonalOffset)/))
}
const $E = e => [...[...Array(25)].map((r, a) => `--${e?`${e}-`:""}overlays-${a}`), `--${e?`${e}-`:""}palette-AppBar-darkBg`, `--${e?`${e}-`:""}palette-AppBar-darkColor`],
 _E = e => (r, a) => {
  const i = e.rootSelector || ":root",
   s = e.colorSchemeSelector;
  let c = s;
  if (s === "class" && (c = ".%s"), s === "data" && (c = "[data-%s]"), s != null && s.startsWith("data-") && !s.includes("%s") && (c = `[${s}="%s"]`), e.defaultColorScheme === r) {
   if (r === "dark") {
    const d = {};
    return $E(e.cssVarPrefix).forEach(f => {
     d[f] = a[f], delete a[f]
    }), c === "media" ? {
     [i]: a,
     "@media (prefers-color-scheme: dark)": {
      [i]: d
     }
    } : c ? {
     [c.replace("%s", r)]: d,
     [`${i}, ${c.replace("%s",r)}`]: a
    } : {
     [i]: {
      ...a,
      ...d
     }
    }
   }
   if (c && c !== "media") return `${i}, ${c.replace("%s",String(r))}`
  } else if (r) {
   if (c === "media") return {
    [`@media (prefers-color-scheme: ${String(r)})`]: {
     [i]: a
    }
   };
   if (c) return c.replace("%s", String(r))
  }
  return i
 };

function UE(e, r) {
 r.forEach(a => {
  e[a] || (e[a] = {})
 })
}

function ae(e, r, a) {
 !e[r] && a && (e[r] = a)
}

function Xl(e) {
 return typeof e != "string" || !e.startsWith("hsl") ? e : h1(e)
}

function so(e, r) {
 `${r}Channel` in e || (e[`${r}Channel`] = Yl(Xl(e[r])))
}

function IE(e) {
 return typeof e == "number" ? `${e}px` : typeof e == "string" || typeof e == "function" || Array.isArray(e) ? e : "8px"
}
const Nr = e => {
  try {
   return e()
  } catch {}
 },
 PE = (e = "mui") => ZR(e);

function Tp(e, r, a, i) {
 if (!r) return;
 r = r === !0 ? {} : r;
 const s = i === "dark" ? "dark" : "light";
 if (!a) {
  e[i] = LE({
   ...r,
   palette: {
    mode: s,
    ...r == null ? void 0 : r.palette
   }
  });
  return
 }
 const {
  palette: c,
  ...d
 } = Wp({
  ...a,
  palette: {
   mode: s,
   ...r == null ? void 0 : r.palette
  }
 });
 return e[i] = {
  ...r,
  palette: c,
  opacity: {
   ...z1(s),
   ...r == null ? void 0 : r.opacity
  },
  overlays: (r == null ? void 0 : r.overlays) || j1(s)
 }, d
}

function HE(e = {}, ...r) {
 const {
  colorSchemes: a = {
   light: !0
  },
  defaultColorScheme: i,
  disableCssColorScheme: s = !1,
  cssVarPrefix: c = "mui",
  shouldSkipGeneratingVar: d = BE,
  colorSchemeSelector: f = a.light && a.dark ? "media" : void 0,
  rootSelector: h = ":root",
  ...m
 } = e, g = Object.keys(a)[0], b = i || (a.light && g !== "light" ? "light" : g), w = PE(c), {
  [b]: R,
  light: T,
  dark: C,
  ...D
 } = a, k = {
  ...D
 };
 let N = R;
 if ((b === "dark" && !("dark" in a) || b === "light" && !("light" in a)) && (N = !0), !N) throw new Error(uo(21, b));
 const E = Tp(k, N, m, b);
 T && !k.light && Tp(k, T, void 0, "light"), C && !k.dark && Tp(k, C, void 0, "dark");
 let A = {
  defaultColorScheme: b,
  ...E,
  cssVarPrefix: c,
  colorSchemeSelector: f,
  rootSelector: h,
  getCssVar: w,
  colorSchemes: k,
  font: {
   ...CE(E.typography),
   ...E.font
  },
  spacing: IE(m.spacing)
 };
 Object.keys(A.colorSchemes).forEach(G => {
  const S = A.colorSchemes[G].palette,
   $ = H => {
    const V = H.split("-"),
     X = V[1],
     W = V[2];
    return w(H, S[X][W])
   };
  if (S.mode === "light" && (ae(S.common, "background", "#fff"), ae(S.common, "onBackground", "#000")), S.mode === "dark" && (ae(S.common, "background", "#000"), ae(S.common, "onBackground", "#fff")), UE(S, ["Alert", "AppBar", "Avatar", "Button", "Chip", "FilledInput", "LinearProgress", "Skeleton", "Slider", "SnackbarContent", "SpeedDialAction", "StepConnector", "StepContent", "Switch", "TableCell", "Tooltip"]), S.mode === "light") {
   ae(S.Alert, "errorColor", Lt(S.error.light, .6)), ae(S.Alert, "infoColor", Lt(S.info.light, .6)), ae(S.Alert, "successColor", Lt(S.success.light, .6)), ae(S.Alert, "warningColor", Lt(S.warning.light, .6)), ae(S.Alert, "errorFilledBg", $("palette-error-main")), ae(S.Alert, "infoFilledBg", $("palette-info-main")), ae(S.Alert, "successFilledBg", $("palette-success-main")), ae(S.Alert, "warningFilledBg", $("palette-warning-main")), ae(S.Alert, "errorFilledColor", Nr(() => S.getContrastText(S.error.main))), ae(S.Alert, "infoFilledColor", Nr(() => S.getContrastText(S.info.main))), ae(S.Alert, "successFilledColor", Nr(() => S.getContrastText(S.success.main))), ae(S.Alert, "warningFilledColor", Nr(() => S.getContrastText(S.warning.main))), ae(S.Alert, "errorStandardBg", Bt(S.error.light, .9)), ae(S.Alert, "infoStandardBg", Bt(S.info.light, .9)), ae(S.Alert, "successStandardBg", Bt(S.success.light, .9)), ae(S.Alert, "warningStandardBg", Bt(S.warning.light, .9)), ae(S.Alert, "errorIconColor", $("palette-error-main")), ae(S.Alert, "infoIconColor", $("palette-info-main")), ae(S.Alert, "successIconColor", $("palette-success-main")), ae(S.Alert, "warningIconColor", $("palette-warning-main")), ae(S.AppBar, "defaultBg", $("palette-grey-100")), ae(S.Avatar, "defaultBg", $("palette-grey-400")), ae(S.Button, "inheritContainedBg", $("palette-grey-300")), ae(S.Button, "inheritContainedHoverBg", $("palette-grey-A100")), ae(S.Chip, "defaultBorder", $("palette-grey-400")), ae(S.Chip, "defaultAvatarColor", $("palette-grey-700")), ae(S.Chip, "defaultIconColor", $("palette-grey-700")), ae(S.FilledInput, "bg", "rgba(0, 0, 0, 0.06)"), ae(S.FilledInput, "hoverBg", "rgba(0, 0, 0, 0.09)"), ae(S.FilledInput, "disabledBg", "rgba(0, 0, 0, 0.12)"), ae(S.LinearProgress, "primaryBg", Bt(S.primary.main, .62)), ae(S.LinearProgress, "secondaryBg", Bt(S.secondary.main, .62)), ae(S.LinearProgress, "errorBg", Bt(S.error.main, .62)), ae(S.LinearProgress, "infoBg", Bt(S.info.main, .62)), ae(S.LinearProgress, "successBg", Bt(S.success.main, .62)), ae(S.LinearProgress, "warningBg", Bt(S.warning.main, .62)), ae(S.Skeleton, "bg", `rgba(${$("palette-text-primaryChannel")} / 0.11)`), ae(S.Slider, "primaryTrack", Bt(S.primary.main, .62)), ae(S.Slider, "secondaryTrack", Bt(S.secondary.main, .62)), ae(S.Slider, "errorTrack", Bt(S.error.main, .62)), ae(S.Slider, "infoTrack", Bt(S.info.main, .62)), ae(S.Slider, "successTrack", Bt(S.success.main, .62)), ae(S.Slider, "warningTrack", Bt(S.warning.main, .62));
   const H = Gc(S.background.default, .8);
   ae(S.SnackbarContent, "bg", H), ae(S.SnackbarContent, "color", Nr(() => S.getContrastText(H))), ae(S.SpeedDialAction, "fabHoverBg", Gc(S.background.paper, .15)), ae(S.StepConnector, "border", $("palette-grey-400")), ae(S.StepContent, "border", $("palette-grey-400")), ae(S.Switch, "defaultColor", $("palette-common-white")), ae(S.Switch, "defaultDisabledColor", $("palette-grey-100")), ae(S.Switch, "primaryDisabledColor", Bt(S.primary.main, .62)), ae(S.Switch, "secondaryDisabledColor", Bt(S.secondary.main, .62)), ae(S.Switch, "errorDisabledColor", Bt(S.error.main, .62)), ae(S.Switch, "infoDisabledColor", Bt(S.info.main, .62)), ae(S.Switch, "successDisabledColor", Bt(S.success.main, .62)), ae(S.Switch, "warningDisabledColor", Bt(S.warning.main, .62)), ae(S.TableCell, "border", Bt(Vc(S.divider, 1), .88)), ae(S.Tooltip, "bg", Vc(S.grey[700], .92))
  }
  if (S.mode === "dark") {
   ae(S.Alert, "errorColor", Bt(S.error.light, .6)), ae(S.Alert, "infoColor", Bt(S.info.light, .6)), ae(S.Alert, "successColor", Bt(S.success.light, .6)), ae(S.Alert, "warningColor", Bt(S.warning.light, .6)), ae(S.Alert, "errorFilledBg", $("palette-error-dark")), ae(S.Alert, "infoFilledBg", $("palette-info-dark")), ae(S.Alert, "successFilledBg", $("palette-success-dark")), ae(S.Alert, "warningFilledBg", $("palette-warning-dark")), ae(S.Alert, "errorFilledColor", Nr(() => S.getContrastText(S.error.dark))), ae(S.Alert, "infoFilledColor", Nr(() => S.getContrastText(S.info.dark))), ae(S.Alert, "successFilledColor", Nr(() => S.getContrastText(S.success.dark))), ae(S.Alert, "warningFilledColor", Nr(() => S.getContrastText(S.warning.dark))), ae(S.Alert, "errorStandardBg", Lt(S.error.light, .9)), ae(S.Alert, "infoStandardBg", Lt(S.info.light, .9)), ae(S.Alert, "successStandardBg", Lt(S.success.light, .9)), ae(S.Alert, "warningStandardBg", Lt(S.warning.light, .9)), ae(S.Alert, "errorIconColor", $("palette-error-main")), ae(S.Alert, "infoIconColor", $("palette-info-main")), ae(S.Alert, "successIconColor", $("palette-success-main")), ae(S.Alert, "warningIconColor", $("palette-warning-main")), ae(S.AppBar, "defaultBg", $("palette-grey-900")), ae(S.AppBar, "darkBg", $("palette-background-paper")), ae(S.AppBar, "darkColor", $("palette-text-primary")), ae(S.Avatar, "defaultBg", $("palette-grey-600")), ae(S.Button, "inheritContainedBg", $("palette-grey-800")), ae(S.Button, "inheritContainedHoverBg", $("palette-grey-700")), ae(S.Chip, "defaultBorder", $("palette-grey-700")), ae(S.Chip, "defaultAvatarColor", $("palette-grey-300")), ae(S.Chip, "defaultIconColor", $("palette-grey-300")), ae(S.FilledInput, "bg", "rgba(255, 255, 255, 0.09)"), ae(S.FilledInput, "hoverBg", "rgba(255, 255, 255, 0.13)"), ae(S.FilledInput, "disabledBg", "rgba(255, 255, 255, 0.12)"), ae(S.LinearProgress, "primaryBg", Lt(S.primary.main, .5)), ae(S.LinearProgress, "secondaryBg", Lt(S.secondary.main, .5)), ae(S.LinearProgress, "errorBg", Lt(S.error.main, .5)), ae(S.LinearProgress, "infoBg", Lt(S.info.main, .5)), ae(S.LinearProgress, "successBg", Lt(S.success.main, .5)), ae(S.LinearProgress, "warningBg", Lt(S.warning.main, .5)), ae(S.Skeleton, "bg", `rgba(${$("palette-text-primaryChannel")} / 0.13)`), ae(S.Slider, "primaryTrack", Lt(S.primary.main, .5)), ae(S.Slider, "secondaryTrack", Lt(S.secondary.main, .5)), ae(S.Slider, "errorTrack", Lt(S.error.main, .5)), ae(S.Slider, "infoTrack", Lt(S.info.main, .5)), ae(S.Slider, "successTrack", Lt(S.success.main, .5)), ae(S.Slider, "warningTrack", Lt(S.warning.main, .5));
   const H = Gc(S.background.default, .98);
   ae(S.SnackbarContent, "bg", H), ae(S.SnackbarContent, "color", Nr(() => S.getContrastText(H))), ae(S.SpeedDialAction, "fabHoverBg", Gc(S.background.paper, .15)), ae(S.StepConnector, "border", $("palette-grey-600")), ae(S.StepContent, "border", $("palette-grey-600")), ae(S.Switch, "defaultColor", $("palette-grey-300")), ae(S.Switch, "defaultDisabledColor", $("palette-grey-600")), ae(S.Switch, "primaryDisabledColor", Lt(S.primary.main, .55)), ae(S.Switch, "secondaryDisabledColor", Lt(S.secondary.main, .55)), ae(S.Switch, "errorDisabledColor", Lt(S.error.main, .55)), ae(S.Switch, "infoDisabledColor", Lt(S.info.main, .55)), ae(S.Switch, "successDisabledColor", Lt(S.success.main, .55)), ae(S.Switch, "warningDisabledColor", Lt(S.warning.main, .55)), ae(S.TableCell, "border", Lt(Vc(S.divider, 1), .68)), ae(S.Tooltip, "bg", Vc(S.grey[700], .92))
  }
  so(S.background, "default"), so(S.background, "paper"), so(S.common, "background"), so(S.common, "onBackground"), so(S, "divider"), Object.keys(S).forEach(H => {
   const V = S[H];
   H !== "tonalOffset" && V && typeof V == "object" && (V.main && ae(S[H], "mainChannel", Yl(Xl(V.main))), V.light && ae(S[H], "lightChannel", Yl(Xl(V.light))), V.dark && ae(S[H], "darkChannel", Yl(Xl(V.dark))), V.contrastText && ae(S[H], "contrastTextChannel", Yl(Xl(V.contrastText))), H === "text" && (so(S[H], "primary"), so(S[H], "secondary")), H === "action" && (V.active && so(S[H], "active"), V.selected && so(S[H], "selected")))
  })
 }), A = r.reduce((G, S) => bn(G, S), A);
 const O = {
   prefix: c,
   disableCssColorScheme: s,
   shouldSkipGeneratingVar: d,
   getSelector: _E(A)
  },
  {
   vars: L,
   generateThemeVars: U,
   generateStyleSheets: _
  } = tE(A, O);
 return A.vars = L, Object.entries(A.colorSchemes[A.defaultColorScheme]).forEach(([G, S]) => {
  A[G] = S
 }), A.generateThemeVars = U, A.generateStyleSheets = _, A.generateSpacing = function() {
  return a1(m.spacing, ju(this))
 }, A.getColorSchemeSelector = nE(f), A.spacing = A.generateSpacing(), A.shouldSkipGeneratingVar = d, A.unstable_sxConfig = {
  ...Es,
  ...m == null ? void 0 : m.unstable_sxConfig
 }, A.unstable_sx = function(S) {
  return Io({
   sx: S,
   theme: this
  })
 }, A.toRuntimeSource = k1, A
}

function k0(e, r, a) {
 e.colorSchemes && a && (e.colorSchemes[r] = {
  ...a !== !0 && a,
  palette: zh({
   ...a === !0 ? {} : a.palette,
   mode: r
  })
 })
}

function qu(e = {}, ...r) {
 const {
  palette: a,
  cssVariables: i = !1,
  colorSchemes: s = a ? void 0 : {
   light: !0
  },
  defaultColorScheme: c = a == null ? void 0 : a.mode,
  ...d
 } = e, f = c || "light", h = s == null ? void 0 : s[f], m = {
  ...s,
  ...a ? {
   [f]: {
    ...typeof h != "boolean" && h,
    palette: a
   }
  } : void 0
 };
 if (i === !1) {
  if (!("colorSchemes" in e)) return Wp(e, ...r);
  let g = a;
  "palette" in e || m[f] && (m[f] !== !0 ? g = m[f].palette : f === "dark" && (g = {
   mode: "dark"
  }));
  const b = Wp({
   ...e,
   palette: g
  }, ...r);
  return b.defaultColorScheme = f, b.colorSchemes = m, b.palette.mode === "light" && (b.colorSchemes.light = {
   ...m.light !== !0 && m.light,
   palette: b.palette
  }, k0(b, "dark", m.dark)), b.palette.mode === "dark" && (b.colorSchemes.dark = {
   ...m.dark !== !0 && m.dark,
   palette: b.palette
  }, k0(b, "light", m.light)), b
 }
 return !a && !("light" in m) && f === "light" && (m.light = !0), HE({
  ...d,
  colorSchemes: m,
  defaultColorScheme: f,
  ...typeof i != "boolean" && i
 }, ...r)
}

function qE(e) {
 return String(e).match(/[\d.\-+]*\s*(.*)/)[1] || ""
}

function VE(e) {
 return parseFloat(e)
}
const jh = qu();

function Ho() {
 const e = Uu(jh);
 return e[Ir] || e
}

function Vu(e) {
 return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as"
}
const zn = e => Vu(e) && e !== "classes",
 pe = d1({
  themeId: Ir,
  defaultTheme: jh,
  rootShouldForwardProp: zn
 });

function Ap({
 theme: e,
 ...r
}) {
 const a = Ir in e ? e[Ir] : void 0;
 return v.jsx(E1, {
  ...r,
  themeId: a ? Ir : void 0,
  theme: a || e
 })
}
const Yc = {
  colorSchemeStorageKey: "mui-color-scheme",
  defaultLightColorScheme: "light",
  defaultDarkColorScheme: "dark",
  modeStorageKey: "mui-mode"
 },
 {
  CssVarsProvider: GE
 } = QR({
  themeId: Ir,
  theme: () => qu({
   cssVariables: !0
  }),
  colorSchemeStorageKey: Yc.colorSchemeStorageKey,
  modeStorageKey: Yc.modeStorageKey,
  defaultColorScheme: {
   light: Yc.defaultLightColorScheme,
   dark: Yc.defaultDarkColorScheme
  },
  resolveTheme: e => {
   const r = {
    ...e,
    typography: O1(e.palette, e.typography)
   };
   return r.unstable_sx = function(i) {
    return Io({
     sx: i,
     theme: this
    })
   }, r
  }
 }),
 YE = GE;

function Mp({
 theme: e,
 ...r
}) {
 if (typeof e == "function") return v.jsx(Ap, {
  theme: e,
  ...r
 });
 const a = Ir in e ? e[Ir] : e;
 return "colorSchemes" in a ? v.jsx(YE, {
  theme: e,
  ...r
 }) : "vars" in a ? v.jsx(Ap, {
  theme: e,
  ...r
 }) : v.jsx(Ap, {
  theme: {
   ...e,
   vars: null
  },
  ...r
 })
}

function XE(e) {
 return v.jsx(pR, {
  ...e,
  defaultTheme: jh,
  themeId: Ir
 })
}

function Nh(e) {
 return function(a) {
  return v.jsx(XE, {
   styles: typeof e == "function" ? i => e({
    theme: i,
    ...a
   }) : e
  })
 }
}

function WE() {
 return Ah
}
const Ye = qR;

function Ge(e) {
 return HR(e)
}

function FE(e) {
 return Ue("MuiSvgIcon", e)
}
Ve("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const KE = e => {
  const {
   color: r,
   fontSize: a,
   classes: i
  } = e, s = {
   root: ["root", r !== "inherit" && `color${Ce(r)}`, `fontSize${Ce(a)}`]
  };
  return Ie(s, FE, i)
 },
 QE = pe("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.root, a.color !== "inherit" && r[`color${Ce(a.color)}`], r[`fontSize${Ce(a.fontSize)}`]]
  }
 })(Ye(({
  theme: e
 }) => {
  var r, a, i, s, c, d, f, h, m, g, b, w, R, T;
  return {
   userSelect: "none",
   width: "1em",
   height: "1em",
   display: "inline-block",
   flexShrink: 0,
   transition: (s = (r = e.transitions) == null ? void 0 : r.create) == null ? void 0 : s.call(r, "fill", {
    duration: (i = (a = (e.vars ?? e).transitions) == null ? void 0 : a.duration) == null ? void 0 : i.shorter
   }),
   variants: [{
    props: C => !C.hasSvgAsChild,
    style: {
     fill: "currentColor"
    }
   }, {
    props: {
     fontSize: "inherit"
    },
    style: {
     fontSize: "inherit"
    }
   }, {
    props: {
     fontSize: "small"
    },
    style: {
     fontSize: ((d = (c = e.typography) == null ? void 0 : c.pxToRem) == null ? void 0 : d.call(c, 20)) || "1.25rem"
    }
   }, {
    props: {
     fontSize: "medium"
    },
    style: {
     fontSize: ((h = (f = e.typography) == null ? void 0 : f.pxToRem) == null ? void 0 : h.call(f, 24)) || "1.5rem"
    }
   }, {
    props: {
     fontSize: "large"
    },
    style: {
     fontSize: ((g = (m = e.typography) == null ? void 0 : m.pxToRem) == null ? void 0 : g.call(m, 35)) || "2.1875rem"
    }
   }, ...Object.entries((e.vars ?? e).palette).filter(([, C]) => C && C.main).map(([C]) => {
    var D, k;
    return {
     props: {
      color: C
     },
     style: {
      color: (k = (D = (e.vars ?? e).palette) == null ? void 0 : D[C]) == null ? void 0 : k.main
     }
    }
   }), {
    props: {
     color: "action"
    },
    style: {
     color: (w = (b = (e.vars ?? e).palette) == null ? void 0 : b.action) == null ? void 0 : w.active
    }
   }, {
    props: {
     color: "disabled"
    },
    style: {
     color: (T = (R = (e.vars ?? e).palette) == null ? void 0 : R.action) == null ? void 0 : T.disabled
    }
   }, {
    props: {
     color: "inherit"
    },
    style: {
     color: void 0
    }
   }]
  }
 })),
 Kp = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiSvgIcon"
   }),
   {
    children: s,
    className: c,
    color: d = "inherit",
    component: f = "svg",
    fontSize: h = "medium",
    htmlColor: m,
    inheritViewBox: g = !1,
    titleAccess: b,
    viewBox: w = "0 0 24 24",
    ...R
   } = i,
   T = y.isValidElement(s) && s.type === "svg",
   C = {
    ...i,
    color: d,
    component: f,
    fontSize: h,
    instanceFontSize: r.fontSize,
    inheritViewBox: g,
    viewBox: w,
    hasSvgAsChild: T
   },
   D = {};
  g || (D.viewBox = w);
  const k = KE(C);
  return v.jsxs(QE, {
   as: f,
   className: Ae(k.root, c),
   focusable: "false",
   color: m,
   "aria-hidden": b ? void 0 : !0,
   role: b ? "img" : void 0,
   ref: a,
   ...D,
   ...R,
   ...T && s.props,
   ownerState: C,
   children: [T ? s.props.children : s, b ? v.jsx("title", {
    children: b
   }) : null]
  })
 });
Kp.muiName = "SvgIcon";

function Tt(e, r) {
 function a(i, s) {
  return v.jsx(Kp, {
   "data-testid": void 0,
   ref: s,
   ...i,
   children: e
  })
 }
 return a.muiName = Kp.muiName, y.memo(y.forwardRef(a))
}

function ZE(e, r) {
 const a = e.charCodeAt(2);
 return e[0] === "o" && e[1] === "n" && a >= 65 && a <= 90 && typeof r == "function"
}

function N1(e, r) {
 if (!e) return r;

 function a(d, f) {
  const h = {};
  return Object.keys(f).forEach(m => {
   ZE(m, f[m]) && typeof d[m] == "function" && (h[m] = (...g) => {
    d[m](...g), f[m](...g)
   })
  }), h
 }
 if (typeof e == "function" || typeof r == "function") return d => {
  const f = typeof r == "function" ? r(d) : r,
   h = typeof e == "function" ? e({
    ...d,
    ...f
   }) : e,
   m = Ae(d == null ? void 0 : d.className, f == null ? void 0 : f.className, h == null ? void 0 : h.className),
   g = a(h, f);
  return {
   ...f,
   ...h,
   ...g,
   ...!!m && {
    className: m
   },
   ...(f == null ? void 0 : f.style) && (h == null ? void 0 : h.style) && {
    style: {
     ...f.style,
     ...h.style
    }
   },
   ...(f == null ? void 0 : f.sx) && (h == null ? void 0 : h.sx) && {
    sx: [...Array.isArray(f.sx) ? f.sx : [f.sx], ...Array.isArray(h.sx) ? h.sx : [h.sx]]
   }
  }
 };
 const i = r,
  s = a(e, i),
  c = Ae(i == null ? void 0 : i.className, e == null ? void 0 : e.className);
 return {
  ...r,
  ...e,
  ...s,
  ...!!c && {
   className: c
  },
  ...(i == null ? void 0 : i.style) && (e == null ? void 0 : e.style) && {
   style: {
    ...i.style,
    ...e.style
   }
  },
  ...(i == null ? void 0 : i.sx) && (e == null ? void 0 : e.sx) && {
   sx: [...Array.isArray(i.sx) ? i.sx : [i.sx], ...Array.isArray(e.sx) ? e.sx : [e.sx]]
  }
 }
}

function L1(e, r) {
 if (e == null) return {};
 var a = {};
 for (var i in e)
  if ({}.hasOwnProperty.call(e, i)) {
   if (r.indexOf(i) !== -1) continue;
   a[i] = e[i]
  } return a
}

function Qp(e, r) {
 return Qp = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(a, i) {
  return a.__proto__ = i, a
 }, Qp(e, r)
}

function B1(e, r) {
 e.prototype = Object.create(r.prototype), e.prototype.constructor = e, Qp(e, r)
}
var fa = _b();
const Xc = $b(fa),
 z0 = {
  disabled: !1
 },
 bu = It.createContext(null);
var JE = function(r) {
  return r.scrollTop
 },
 Wl = "unmounted",
 ua = "exited",
 da = "entering",
 pi = "entered",
 Zp = "exiting",
 Ar = function(e) {
  B1(r, e);

  function r(i, s) {
   var c;
   c = e.call(this, i, s) || this;
   var d = s,
    f = d && !d.isMounting ? i.enter : i.appear,
    h;
   return c.appearStatus = null, i.in ? f ? (h = ua, c.appearStatus = da) : h = pi : i.unmountOnExit || i.mountOnEnter ? h = Wl : h = ua, c.state = {
    status: h
   }, c.nextCallback = null, c
  }
  r.getDerivedStateFromProps = function(s, c) {
   var d = s.in;
   return d && c.status === Wl ? {
    status: ua
   } : null
  };
  var a = r.prototype;
  return a.componentDidMount = function() {
   this.updateStatus(!0, this.appearStatus)
  }, a.componentDidUpdate = function(s) {
   var c = null;
   if (s !== this.props) {
    var d = this.state.status;
    this.props.in ? d !== da && d !== pi && (c = da) : (d === da || d === pi) && (c = Zp)
   }
   this.updateStatus(!1, c)
  }, a.componentWillUnmount = function() {
   this.cancelNextCallback()
  }, a.getTimeouts = function() {
   var s = this.props.timeout,
    c, d, f;
   return c = d = f = s, s != null && typeof s != "number" && (c = s.exit, d = s.enter, f = s.appear !== void 0 ? s.appear : d), {
    exit: c,
    enter: d,
    appear: f
   }
  }, a.updateStatus = function(s, c) {
   if (s === void 0 && (s = !1), c !== null)
    if (this.cancelNextCallback(), c === da) {
     if (this.props.unmountOnExit || this.props.mountOnEnter) {
      var d = this.props.nodeRef ? this.props.nodeRef.current : Xc.findDOMNode(this);
      d && JE(d)
     }
     this.performEnter(s)
    } else this.performExit();
   else this.props.unmountOnExit && this.state.status === ua && this.setState({
    status: Wl
   })
  }, a.performEnter = function(s) {
   var c = this,
    d = this.props.enter,
    f = this.context ? this.context.isMounting : s,
    h = this.props.nodeRef ? [f] : [Xc.findDOMNode(this), f],
    m = h[0],
    g = h[1],
    b = this.getTimeouts(),
    w = f ? b.appear : b.enter;
   if (!s && !d || z0.disabled) {
    this.safeSetState({
     status: pi
    }, function() {
     c.props.onEntered(m)
    });
    return
   }
   this.props.onEnter(m, g), this.safeSetState({
    status: da
   }, function() {
    c.props.onEntering(m, g), c.onTransitionEnd(w, function() {
     c.safeSetState({
      status: pi
     }, function() {
      c.props.onEntered(m, g)
     })
    })
   })
  }, a.performExit = function() {
   var s = this,
    c = this.props.exit,
    d = this.getTimeouts(),
    f = this.props.nodeRef ? void 0 : Xc.findDOMNode(this);
   if (!c || z0.disabled) {
    this.safeSetState({
     status: ua
    }, function() {
     s.props.onExited(f)
    });
    return
   }
   this.props.onExit(f), this.safeSetState({
    status: Zp
   }, function() {
    s.props.onExiting(f), s.onTransitionEnd(d.exit, function() {
     s.safeSetState({
      status: ua
     }, function() {
      s.props.onExited(f)
     })
    })
   })
  }, a.cancelNextCallback = function() {
   this.nextCallback !== null && (this.nextCallback.cancel(), this.nextCallback = null)
  }, a.safeSetState = function(s, c) {
   c = this.setNextCallback(c), this.setState(s, c)
  }, a.setNextCallback = function(s) {
   var c = this,
    d = !0;
   return this.nextCallback = function(f) {
    d && (d = !1, c.nextCallback = null, s(f))
   }, this.nextCallback.cancel = function() {
    d = !1
   }, this.nextCallback
  }, a.onTransitionEnd = function(s, c) {
   this.setNextCallback(c);
   var d = this.props.nodeRef ? this.props.nodeRef.current : Xc.findDOMNode(this),
    f = s == null && !this.props.addEndListener;
   if (!d || f) {
    setTimeout(this.nextCallback, 0);
    return
   }
   if (this.props.addEndListener) {
    var h = this.props.nodeRef ? [this.nextCallback] : [d, this.nextCallback],
     m = h[0],
     g = h[1];
    this.props.addEndListener(m, g)
   }
   s != null && setTimeout(this.nextCallback, s)
  }, a.render = function() {
   var s = this.state.status;
   if (s === Wl) return null;
   var c = this.props,
    d = c.children;
   c.in, c.mountOnEnter, c.unmountOnExit, c.appear, c.enter, c.exit, c.timeout, c.addEndListener, c.onEnter, c.onEntering, c.onEntered, c.onExit, c.onExiting, c.onExited, c.nodeRef;
   var f = L1(c, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
   return It.createElement(bu.Provider, {
    value: null
   }, typeof d == "function" ? d(s, f) : It.cloneElement(It.Children.only(d), f))
  }, r
 }(It.Component);
Ar.contextType = bu;
Ar.propTypes = {};

function ui() {}
Ar.defaultProps = {
 in: !1,
 mountOnEnter: !1,
 unmountOnExit: !1,
 appear: !1,
 enter: !0,
 exit: !0,
 onEnter: ui,
 onEntering: ui,
 onEntered: ui,
 onExit: ui,
 onExiting: ui,
 onExited: ui
};
Ar.UNMOUNTED = Wl;
Ar.EXITED = ua;
Ar.ENTERING = da;
Ar.ENTERED = pi;
Ar.EXITING = Zp;

function eT(e) {
 if (e === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
 return e
}

function Lh(e, r) {
 var a = function(c) {
   return r && y.isValidElement(c) ? r(c) : c
  },
  i = Object.create(null);
 return e && y.Children.map(e, function(s) {
  return s
 }).forEach(function(s) {
  i[s.key] = a(s)
 }), i
}

function tT(e, r) {
 e = e || {}, r = r || {};

 function a(g) {
  return g in r ? r[g] : e[g]
 }
 var i = Object.create(null),
  s = [];
 for (var c in e) c in r ? s.length && (i[c] = s, s = []) : s.push(c);
 var d, f = {};
 for (var h in r) {
  if (i[h])
   for (d = 0; d < i[h].length; d++) {
    var m = i[h][d];
    f[i[h][d]] = a(m)
   }
  f[h] = a(h)
 }
 for (d = 0; d < s.length; d++) f[s[d]] = a(s[d]);
 return f
}

function pa(e, r, a) {
 return a[r] != null ? a[r] : e.props[r]
}

function nT(e, r) {
 return Lh(e.children, function(a) {
  return y.cloneElement(a, {
   onExited: r.bind(null, a),
   in: !0,
   appear: pa(a, "appear", e),
   enter: pa(a, "enter", e),
   exit: pa(a, "exit", e)
  })
 })
}

function rT(e, r, a) {
 var i = Lh(e.children),
  s = tT(r, i);
 return Object.keys(s).forEach(function(c) {
  var d = s[c];
  if (y.isValidElement(d)) {
   var f = c in r,
    h = c in i,
    m = r[c],
    g = y.isValidElement(m) && !m.props.in;
   h && (!f || g) ? s[c] = y.cloneElement(d, {
    onExited: a.bind(null, d),
    in: !0,
    exit: pa(d, "exit", e),
    enter: pa(d, "enter", e)
   }) : !h && f && !g ? s[c] = y.cloneElement(d, {
    in: !1
   }) : h && f && y.isValidElement(m) && (s[c] = y.cloneElement(d, {
    onExited: a.bind(null, d),
    in: m.props.in,
    exit: pa(d, "exit", e),
    enter: pa(d, "enter", e)
   }))
  }
 }), s
}
var oT = Object.values || function(e) {
  return Object.keys(e).map(function(r) {
   return e[r]
  })
 },
 aT = {
  component: "div",
  childFactory: function(r) {
   return r
  }
 },
 Bh = function(e) {
  B1(r, e);

  function r(i, s) {
   var c;
   c = e.call(this, i, s) || this;
   var d = c.handleExited.bind(eT(c));
   return c.state = {
    contextValue: {
     isMounting: !0
    },
    handleExited: d,
    firstRender: !0
   }, c
  }
  var a = r.prototype;
  return a.componentDidMount = function() {
   this.mounted = !0, this.setState({
    contextValue: {
     isMounting: !1
    }
   })
  }, a.componentWillUnmount = function() {
   this.mounted = !1
  }, r.getDerivedStateFromProps = function(s, c) {
   var d = c.children,
    f = c.handleExited,
    h = c.firstRender;
   return {
    children: h ? nT(s, f) : rT(s, d, f),
    firstRender: !1
   }
  }, a.handleExited = function(s, c) {
   var d = Lh(this.props.children);
   s.key in d || (s.props.onExited && s.props.onExited(c), this.mounted && this.setState(function(f) {
    var h = gu({}, f.children);
    return delete h[s.key], {
     children: h
    }
   }))
  }, a.render = function() {
   var s = this.props,
    c = s.component,
    d = s.childFactory,
    f = L1(s, ["component", "childFactory"]),
    h = this.state.contextValue,
    m = oT(this.state.children).map(d);
   return delete f.appear, delete f.enter, delete f.exit, c === null ? It.createElement(bu.Provider, {
    value: h
   }, m) : It.createElement(bu.Provider, {
    value: h
   }, It.createElement(c, f, m))
  }, r
 }(It.Component);
Bh.propTypes = {};
Bh.defaultProps = aT;
const $1 = e => e.scrollTop;

function Oi(e, r) {
 const {
  timeout: a,
  easing: i,
  style: s = {}
 } = e;
 return {
  duration: s.transitionDuration ?? (typeof a == "number" ? a : a[r.mode] || 0),
  easing: s.transitionTimingFunction ?? (typeof i == "object" ? i[r.mode] : i),
  delay: s.transitionDelay
 }
}

function iT(e) {
 return Ue("MuiCollapse", e)
}
Ve("MuiCollapse", ["root", "horizontal", "vertical", "entered", "hidden", "wrapper", "wrapperInner"]);
const lT = e => {
  const {
   orientation: r,
   classes: a
  } = e, i = {
   root: ["root", `${r}`],
   entered: ["entered"],
   hidden: ["hidden"],
   wrapper: ["wrapper", `${r}`],
   wrapperInner: ["wrapperInner", `${r}`]
  };
  return Ie(i, iT, a)
 },
 sT = pe("div", {
  name: "MuiCollapse",
  slot: "Root",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.root, r[a.orientation], a.state === "entered" && r.entered, a.state === "exited" && !a.in && a.collapsedSize === "0px" && r.hidden]
  }
 })(Ye(({
  theme: e
 }) => ({
  height: 0,
  overflow: "hidden",
  transition: e.transitions.create("height"),
  variants: [{
   props: {
    orientation: "horizontal"
   },
   style: {
    height: "auto",
    width: 0,
    transition: e.transitions.create("width")
   }
  }, {
   props: {
    state: "entered"
   },
   style: {
    height: "auto",
    overflow: "visible"
   }
  }, {
   props: {
    state: "entered",
    orientation: "horizontal"
   },
   style: {
    width: "auto"
   }
  }, {
   props: ({
    ownerState: r
   }) => r.state === "exited" && !r.in && r.collapsedSize === "0px",
   style: {
    visibility: "hidden"
   }
  }]
 }))),
 cT = pe("div", {
  name: "MuiCollapse",
  slot: "Wrapper",
  overridesResolver: (e, r) => r.wrapper
 })({
  display: "flex",
  width: "100%",
  variants: [{
   props: {
    orientation: "horizontal"
   },
   style: {
    width: "auto",
    height: "100%"
   }
  }]
 }),
 uT = pe("div", {
  name: "MuiCollapse",
  slot: "WrapperInner",
  overridesResolver: (e, r) => r.wrapperInner
 })({
  width: "100%",
  variants: [{
   props: {
    orientation: "horizontal"
   },
   style: {
    width: "auto",
    height: "100%"
   }
  }]
 }),
 Jp = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiCollapse"
   }),
   {
    addEndListener: s,
    children: c,
    className: d,
    collapsedSize: f = "0px",
    component: h,
    easing: m,
    in: g,
    onEnter: b,
    onEntered: w,
    onEntering: R,
    onExit: T,
    onExited: C,
    onExiting: D,
    orientation: k = "vertical",
    style: N,
    timeout: E = D1.standard,
    TransitionComponent: A = Ar,
    ...O
   } = i,
   L = {
    ...i,
    orientation: k,
    collapsedSize: f
   },
   U = lT(L),
   _ = Ho(),
   G = Uo(),
   S = y.useRef(null),
   $ = y.useRef(),
   H = typeof f == "number" ? `${f}px` : f,
   V = k === "horizontal",
   X = V ? "width" : "height",
   W = y.useRef(null),
   z = tn(a, W),
   I = re => ye => {
    if (re) {
     const ge = W.current;
     ye === void 0 ? re(ge) : re(ge, ye)
    }
   },
   Q = () => S.current ? S.current[V ? "clientWidth" : "clientHeight"] : 0,
   Z = I((re, ye) => {
    S.current && V && (S.current.style.position = "absolute"), re.style[X] = H, b && b(re, ye)
   }),
   j = I((re, ye) => {
    const ge = Q();
    S.current && V && (S.current.style.position = "");
    const {
     duration: Te,
     easing: fe
    } = Oi({
     style: N,
     timeout: E,
     easing: m
    }, {
     mode: "enter"
    });
    if (E === "auto") {
     const Oe = _.transitions.getAutoHeightDuration(ge);
     re.style.transitionDuration = `${Oe}ms`, $.current = Oe
    } else re.style.transitionDuration = typeof Te == "string" ? Te : `${Te}ms`;
    re.style[X] = `${ge}px`, re.style.transitionTimingFunction = fe, R && R(re, ye)
   }),
   q = I((re, ye) => {
    re.style[X] = "auto", w && w(re, ye)
   }),
   ee = I(re => {
    re.style[X] = `${Q()}px`, T && T(re)
   }),
   ne = I(C),
   ce = I(re => {
    const ye = Q(),
     {
      duration: ge,
      easing: Te
     } = Oi({
      style: N,
      timeout: E,
      easing: m
     }, {
      mode: "exit"
     });
    if (E === "auto") {
     const fe = _.transitions.getAutoHeightDuration(ye);
     re.style.transitionDuration = `${fe}ms`, $.current = fe
    } else re.style.transitionDuration = typeof ge == "string" ? ge : `${ge}ms`;
    re.style[X] = H, re.style.transitionTimingFunction = Te, D && D(re)
   }),
   le = re => {
    E === "auto" && G.start($.current || 0, re), s && s(W.current, re)
   };
  return v.jsx(A, {
   in: g,
   onEnter: Z,
   onEntered: q,
   onEntering: j,
   onExit: ee,
   onExited: ne,
   onExiting: ce,
   addEndListener: le,
   nodeRef: W,
   timeout: E === "auto" ? null : E,
   ...O,
   children: (re, {
    ownerState: ye,
    ...ge
   }) => v.jsx(sT, {
    as: h,
    className: Ae(U.root, d, {
     entered: U.entered,
     exited: !g && H === "0px" && U.hidden
    } [re]),
    style: {
     [V ? "minWidth" : "minHeight"]: H,
     ...N
    },
    ref: z,
    ownerState: {
     ...L,
     state: re
    },
    ...ge,
    children: v.jsx(cT, {
     ownerState: {
      ...L,
      state: re
     },
     className: U.wrapper,
     ref: S,
     children: v.jsx(uT, {
      ownerState: {
       ...L,
       state: re
      },
      className: U.wrapperInner,
      children: c
     })
    })
   })
  })
 });
Jp && (Jp.muiSupportAuto = !0);

function dT(e) {
 return Ue("MuiPaper", e)
}
Ve("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const fT = e => {
  const {
   square: r,
   elevation: a,
   variant: i,
   classes: s
  } = e, c = {
   root: ["root", i, !r && "rounded", i === "elevation" && `elevation${a}`]
  };
  return Ie(c, dT, s)
 },
 pT = pe("div", {
  name: "MuiPaper",
  slot: "Root",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.root, r[a.variant], !a.square && r.rounded, a.variant === "elevation" && r[`elevation${a.elevation}`]]
  }
 })(Ye(({
  theme: e
 }) => ({
  backgroundColor: (e.vars || e).palette.background.paper,
  color: (e.vars || e).palette.text.primary,
  transition: e.transitions.create("box-shadow"),
  variants: [{
   props: ({
    ownerState: r
   }) => !r.square,
   style: {
    borderRadius: e.shape.borderRadius
   }
  }, {
   props: {
    variant: "outlined"
   },
   style: {
    border: `1px solid ${(e.vars||e).palette.divider}`
   }
  }, {
   props: {
    variant: "elevation"
   },
   style: {
    boxShadow: "var(--Paper-shadow)",
    backgroundImage: "var(--Paper-overlay)"
   }
  }]
 }))),
 Gr = y.forwardRef(function(r, a) {
  var R;
  const i = Ge({
    props: r,
    name: "MuiPaper"
   }),
   s = Ho(),
   {
    className: c,
    component: d = "div",
    elevation: f = 1,
    square: h = !1,
    variant: m = "elevation",
    ...g
   } = i,
   b = {
    ...i,
    component: d,
    elevation: f,
    square: h,
    variant: m
   },
   w = fT(b);
  return v.jsx(pT, {
   as: d,
   ownerState: b,
   className: Ae(w.root, c),
   ref: a,
   ...g,
   style: {
    ...m === "elevation" && {
     "--Paper-shadow": (s.vars || s).shadows[f],
     ...s.vars && {
      "--Paper-overlay": (R = s.vars.overlays) == null ? void 0 : R[f]
     },
     ...!s.vars && s.palette.mode === "dark" && {
      "--Paper-overlay": `linear-gradient(${Qt("#fff",Fp(f))}, ${Qt("#fff",Fp(f))})`
     }
    },
    ...g.style
   }
  })
 });

function et(e, r) {
 const {
  className: a,
  elementType: i,
  ownerState: s,
  externalForwardedProps: c,
  internalForwardedProps: d,
  shouldForwardComponentProp: f = !1,
  ...h
 } = r, {
  component: m,
  slots: g = {
   [e]: void 0
  },
  slotProps: b = {
   [e]: void 0
  },
  ...w
 } = c, R = g[e] || i, T = S1(b[e], s), {
  props: {
   component: C,
   ...D
  },
  internalRef: k
 } = x1({
  className: a,
  ...h,
  externalForwardedProps: e === "root" ? w : void 0,
  externalSlotProps: T
 }), N = tn(k, T == null ? void 0 : T.ref, r.ref), E = e === "root" ? C || m : C, A = b1(R, {
  ...e === "root" && !m && !g[e] && d,
  ...e !== "root" && !g[e] && d,
  ...D,
  ...E && !f && {
   as: E
  },
  ...E && f && {
   component: E
  },
  ref: N
 }, s);
 return [R, A]
}
class xu {
 constructor() {
  la(this, "mountEffect", () => {
   this.shouldMount && !this.didMount && this.ref.current !== null && (this.didMount = !0, this.mounted.resolve())
  });
  this.ref = {
   current: null
  }, this.mounted = null, this.didMount = !1, this.shouldMount = !1, this.setShouldMount = null
 }
 static create() {
  return new xu
 }
 static use() {
  const r = v1(xu.create).current,
   [a, i] = y.useState(!1);
  return r.shouldMount = a, r.setShouldMount = i, y.useEffect(r.mountEffect, [a]), r
 }
 mount() {
  return this.mounted || (this.mounted = mT(), this.shouldMount = !0, this.setShouldMount(this.shouldMount)), this.mounted
 }
 start(...r) {
  this.mount().then(() => {
   var a;
   return (a = this.ref.current) == null ? void 0 : a.start(...r)
  })
 }
 stop(...r) {
  this.mount().then(() => {
   var a;
   return (a = this.ref.current) == null ? void 0 : a.stop(...r)
  })
 }
 pulsate(...r) {
  this.mount().then(() => {
   var a;
   return (a = this.ref.current) == null ? void 0 : a.pulsate(...r)
  })
 }
}

function hT() {
 return xu.use()
}

function mT() {
 let e, r;
 const a = new Promise((i, s) => {
  e = i, r = s
 });
 return a.resolve = e, a.reject = r, a
}

function gT(e) {
 const {
  className: r,
  classes: a,
  pulsate: i = !1,
  rippleX: s,
  rippleY: c,
  rippleSize: d,
  in: f,
  onExited: h,
  timeout: m
 } = e, [g, b] = y.useState(!1), w = Ae(r, a.ripple, a.rippleVisible, i && a.ripplePulsate), R = {
  width: d,
  height: d,
  top: -(d / 2) + c,
  left: -(d / 2) + s
 }, T = Ae(a.child, g && a.childLeaving, i && a.childPulsate);
 return !f && !g && b(!0), y.useEffect(() => {
  if (!f && h != null) {
   const C = setTimeout(h, m);
   return () => {
    clearTimeout(C)
   }
  }
 }, [h, f, m]), v.jsx("span", {
  className: w,
  style: R,
  children: v.jsx("span", {
   className: T
  })
 })
}
const dr = Ve("MuiTouchRipple", ["root", "ripple", "rippleVisible", "ripplePulsate", "child", "childLeaving", "childPulsate"]),
 eh = 550,
 vT = 80,
 yT = Sa`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,
 bT = Sa`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,
 xT = Sa`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`,
 ST = pe("span", {
  name: "MuiTouchRipple",
  slot: "Root"
 })({
  overflow: "hidden",
  pointerEvents: "none",
  position: "absolute",
  zIndex: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: "inherit"
 }),
 CT = pe(gT, {
  name: "MuiTouchRipple",
  slot: "Ripple"
 })`
  opacity: 0;
  position: absolute;

  &.${dr.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${yT};
    animation-duration: ${eh}ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
  }

  &.${dr.ripplePulsate} {
    animation-duration: ${({theme:e})=>e.transitions.duration.shorter}ms;
  }

  & .${dr.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${dr.childLeaving} {
    opacity: 0;
    animation-name: ${bT};
    animation-duration: ${eh}ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
  }

  & .${dr.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${xT};
    animation-duration: 2500ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`,
 wT = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiTouchRipple"
   }),
   {
    center: s = !1,
    classes: c = {},
    className: d,
    ...f
   } = i,
   [h, m] = y.useState([]),
   g = y.useRef(0),
   b = y.useRef(null);
  y.useEffect(() => {
   b.current && (b.current(), b.current = null)
  }, [h]);
  const w = y.useRef(!1),
   R = Uo(),
   T = y.useRef(null),
   C = y.useRef(null),
   D = y.useCallback(A => {
    const {
     pulsate: O,
     rippleX: L,
     rippleY: U,
     rippleSize: _,
     cb: G
    } = A;
    m(S => [...S, v.jsx(CT, {
     classes: {
      ripple: Ae(c.ripple, dr.ripple),
      rippleVisible: Ae(c.rippleVisible, dr.rippleVisible),
      ripplePulsate: Ae(c.ripplePulsate, dr.ripplePulsate),
      child: Ae(c.child, dr.child),
      childLeaving: Ae(c.childLeaving, dr.childLeaving),
      childPulsate: Ae(c.childPulsate, dr.childPulsate)
     },
     timeout: eh,
     pulsate: O,
     rippleX: L,
     rippleY: U,
     rippleSize: _
    }, g.current)]), g.current += 1, b.current = G
   }, [c]),
   k = y.useCallback((A = {}, O = {}, L = () => {}) => {
    const {
     pulsate: U = !1,
     center: _ = s || O.pulsate,
     fakeElement: G = !1
    } = O;
    if ((A == null ? void 0 : A.type) === "mousedown" && w.current) {
     w.current = !1;
     return
    }(A == null ? void 0 : A.type) === "touchstart" && (w.current = !0);
    const S = G ? null : C.current,
     $ = S ? S.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
     };
    let H, V, X;
    if (_ || A === void 0 || A.clientX === 0 && A.clientY === 0 || !A.clientX && !A.touches) H = Math.round($.width / 2), V = Math.round($.height / 2);
    else {
     const {
      clientX: W,
      clientY: z
     } = A.touches && A.touches.length > 0 ? A.touches[0] : A;
     H = Math.round(W - $.left), V = Math.round(z - $.top)
    }
    if (_) X = Math.sqrt((2 * $.width ** 2 + $.height ** 2) / 3), X % 2 === 0 && (X += 1);
    else {
     const W = Math.max(Math.abs((S ? S.clientWidth : 0) - H), H) * 2 + 2,
      z = Math.max(Math.abs((S ? S.clientHeight : 0) - V), V) * 2 + 2;
     X = Math.sqrt(W ** 2 + z ** 2)
    }
    A != null && A.touches ? T.current === null && (T.current = () => {
     D({
      pulsate: U,
      rippleX: H,
      rippleY: V,
      rippleSize: X,
      cb: L
     })
    }, R.start(vT, () => {
     T.current && (T.current(), T.current = null)
    })) : D({
     pulsate: U,
     rippleX: H,
     rippleY: V,
     rippleSize: X,
     cb: L
    })
   }, [s, D, R]),
   N = y.useCallback(() => {
    k({}, {
     pulsate: !0
    })
   }, [k]),
   E = y.useCallback((A, O) => {
    if (R.clear(), (A == null ? void 0 : A.type) === "touchend" && T.current) {
     T.current(), T.current = null, R.start(0, () => {
      E(A, O)
     });
     return
    }
    T.current = null, m(L => L.length > 0 ? L.slice(1) : L), b.current = O
   }, [R]);
  return y.useImperativeHandle(a, () => ({
   pulsate: N,
   start: k,
   stop: E
  }), [N, k, E]), v.jsx(ST, {
   className: Ae(dr.root, c.root, d),
   ref: C,
   ...f,
   children: v.jsx(Bh, {
    component: null,
    exit: !0,
    children: h
   })
  })
 });

function RT(e) {
 return Ue("MuiButtonBase", e)
}
const ET = Ve("MuiButtonBase", ["root", "disabled", "focusVisible"]),
 TT = e => {
  const {
   disabled: r,
   focusVisible: a,
   focusVisibleClassName: i,
   classes: s
  } = e, d = Ie({
   root: ["root", r && "disabled", a && "focusVisible"]
  }, RT, s);
  return a && i && (d.root += ` ${i}`), d
 },
 AT = pe("button", {
  name: "MuiButtonBase",
  slot: "Root",
  overridesResolver: (e, r) => r.root
 })({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  WebkitTapHighlightColor: "transparent",
  backgroundColor: "transparent",
  outline: 0,
  border: 0,
  margin: 0,
  borderRadius: 0,
  padding: 0,
  cursor: "pointer",
  userSelect: "none",
  verticalAlign: "middle",
  MozAppearance: "none",
  WebkitAppearance: "none",
  textDecoration: "none",
  color: "inherit",
  "&::-moz-focus-inner": {
   borderStyle: "none"
  },
  [`&.${ET.disabled}`]: {
   pointerEvents: "none",
   cursor: "default"
  },
  "@media print": {
   colorAdjust: "exact"
  }
 }),
 As = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiButtonBase"
   }),
   {
    action: s,
    centerRipple: c = !1,
    children: d,
    className: f,
    component: h = "button",
    disabled: m = !1,
    disableRipple: g = !1,
    disableTouchRipple: b = !1,
    focusRipple: w = !1,
    focusVisibleClassName: R,
    LinkComponent: T = "a",
    onBlur: C,
    onClick: D,
    onContextMenu: k,
    onDragLeave: N,
    onFocus: E,
    onFocusVisible: A,
    onKeyDown: O,
    onKeyUp: L,
    onMouseDown: U,
    onMouseLeave: _,
    onMouseUp: G,
    onTouchEnd: S,
    onTouchMove: $,
    onTouchStart: H,
    tabIndex: V = 0,
    TouchRippleProps: X,
    touchRippleRef: W,
    type: z,
    ...I
   } = i,
   Q = y.useRef(null),
   Z = hT(),
   j = tn(Z.ref, W),
   [q, ee] = y.useState(!1);
  m && q && ee(!1), y.useImperativeHandle(s, () => ({
   focusVisible: () => {
    ee(!0), Q.current.focus()
   }
  }), []);
  const ne = Z.shouldMount && !g && !m;
  y.useEffect(() => {
   q && w && !g && Z.pulsate()
  }, [g, w, q, Z]);
  const ce = co(Z, "start", U, b),
   le = co(Z, "stop", k, b),
   re = co(Z, "stop", N, b),
   ye = co(Z, "stop", G, b),
   ge = co(Z, "stop", Ee => {
    q && Ee.preventDefault(), _ && _(Ee)
   }, b),
   Te = co(Z, "start", H, b),
   fe = co(Z, "stop", S, b),
   Oe = co(Z, "stop", $, b),
   we = co(Z, "stop", Ee => {
    Mi(Ee.target) || ee(!1), C && C(Ee)
   }, !1),
   Se = kn(Ee => {
    Q.current || (Q.current = Ee.currentTarget), Mi(Ee.target) && (ee(!0), A && A(Ee)), E && E(Ee)
   }),
   Re = () => {
    const Ee = Q.current;
    return h && h !== "button" && !(Ee.tagName === "A" && Ee.href)
   },
   ze = kn(Ee => {
    w && !Ee.repeat && q && Ee.key === " " && Z.stop(Ee, () => {
     Z.start(Ee)
    }), Ee.target === Ee.currentTarget && Re() && Ee.key === " " && Ee.preventDefault(), O && O(Ee), Ee.target === Ee.currentTarget && Re() && Ee.key === "Enter" && !m && (Ee.preventDefault(), D && D(Ee))
   }),
   it = kn(Ee => {
    w && Ee.key === " " && q && !Ee.defaultPrevented && Z.stop(Ee, () => {
     Z.pulsate(Ee)
    }), L && L(Ee), D && Ee.target === Ee.currentTarget && Re() && Ee.key === " " && !Ee.defaultPrevented && D(Ee)
   });
  let Ne = h;
  Ne === "button" && (I.href || I.to) && (Ne = T);
  const Je = {};
  Ne === "button" ? (Je.type = z === void 0 ? "button" : z, Je.disabled = m) : (!I.href && !I.to && (Je.role = "button"), m && (Je["aria-disabled"] = m));
  const Ke = tn(a, Q),
   Pe = {
    ...i,
    centerRipple: c,
    component: h,
    disabled: m,
    disableRipple: g,
    disableTouchRipple: b,
    focusRipple: w,
    tabIndex: V,
    focusVisible: q
   },
   He = TT(Pe);
  return v.jsxs(AT, {
   as: Ne,
   className: Ae(He.root, f),
   ownerState: Pe,
   onBlur: we,
   onClick: D,
   onContextMenu: le,
   onFocus: Se,
   onKeyDown: ze,
   onKeyUp: it,
   onMouseDown: ce,
   onMouseLeave: ge,
   onMouseUp: ye,
   onDragLeave: re,
   onTouchEnd: fe,
   onTouchMove: Oe,
   onTouchStart: Te,
   ref: Ke,
   tabIndex: m ? -1 : V,
   type: z,
   ...Je,
   ...I,
   children: [d, ne ? v.jsx(wT, {
    ref: j,
    center: c,
    ...X
   }) : null]
  })
 });

function co(e, r, a, i = !1) {
 return kn(s => (a && a(s), i || e[r](s), !0))
}

function MT(e) {
 return typeof e.main == "string"
}

function OT(e, r = []) {
 if (!MT(e)) return !1;
 for (const a of r)
  if (!e.hasOwnProperty(a) || typeof e[a] != "string") return !1;
 return !0
}

function Rn(e = []) {
 return ([, r]) => r && OT(r, e)
}

function DT(e) {
 return Ue("MuiAlert", e)
}
const j0 = Ve("MuiAlert", ["root", "action", "icon", "message", "filled", "colorSuccess", "colorInfo", "colorWarning", "colorError", "filledSuccess", "filledInfo", "filledWarning", "filledError", "outlined", "outlinedSuccess", "outlinedInfo", "outlinedWarning", "outlinedError", "standard", "standardSuccess", "standardInfo", "standardWarning", "standardError"]);

function kT(e) {
 return Ue("MuiCircularProgress", e)
}
Ve("MuiCircularProgress", ["root", "determinate", "indeterminate", "colorPrimary", "colorSecondary", "svg", "circle", "circleDeterminate", "circleIndeterminate", "circleDisableShrink"]);
const $o = 44,
 th = Sa`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,
 nh = Sa`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: -126px;
  }
`,
 zT = typeof th != "string" ? ws`
        animation: ${th} 1.4s linear infinite;
      ` : null,
 jT = typeof nh != "string" ? ws`
        animation: ${nh} 1.4s ease-in-out infinite;
      ` : null,
 NT = e => {
  const {
   classes: r,
   variant: a,
   color: i,
   disableShrink: s
  } = e, c = {
   root: ["root", a, `color${Ce(i)}`],
   svg: ["svg"],
   circle: ["circle", `circle${Ce(a)}`, s && "circleDisableShrink"]
  };
  return Ie(c, kT, r)
 },
 LT = pe("span", {
  name: "MuiCircularProgress",
  slot: "Root",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.root, r[a.variant], r[`color${Ce(a.color)}`]]
  }
 })(Ye(({
  theme: e
 }) => ({
  display: "inline-block",
  variants: [{
   props: {
    variant: "determinate"
   },
   style: {
    transition: e.transitions.create("transform")
   }
  }, {
   props: {
    variant: "indeterminate"
   },
   style: zT || {
    animation: `${th} 1.4s linear infinite`
   }
  }, ...Object.entries(e.palette).filter(Rn()).map(([r]) => ({
   props: {
    color: r
   },
   style: {
    color: (e.vars || e).palette[r].main
   }
  }))]
 }))),
 BT = pe("svg", {
  name: "MuiCircularProgress",
  slot: "Svg",
  overridesResolver: (e, r) => r.svg
 })({
  display: "block"
 }),
 $T = pe("circle", {
  name: "MuiCircularProgress",
  slot: "Circle",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.circle, r[`circle${Ce(a.variant)}`], a.disableShrink && r.circleDisableShrink]
  }
 })(Ye(({
  theme: e
 }) => ({
  stroke: "currentColor",
  variants: [{
   props: {
    variant: "determinate"
   },
   style: {
    transition: e.transitions.create("stroke-dashoffset")
   }
  }, {
   props: {
    variant: "indeterminate"
   },
   style: {
    strokeDasharray: "80px, 200px",
    strokeDashoffset: 0
   }
  }, {
   props: ({
    ownerState: r
   }) => r.variant === "indeterminate" && !r.disableShrink,
   style: jT || {
    animation: `${nh} 1.4s ease-in-out infinite`
   }
  }]
 }))),
 wi = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiCircularProgress"
   }),
   {
    className: s,
    color: c = "primary",
    disableShrink: d = !1,
    size: f = 40,
    style: h,
    thickness: m = 3.6,
    value: g = 0,
    variant: b = "indeterminate",
    ...w
   } = i,
   R = {
    ...i,
    color: c,
    disableShrink: d,
    size: f,
    thickness: m,
    value: g,
    variant: b
   },
   T = NT(R),
   C = {},
   D = {},
   k = {};
  if (b === "determinate") {
   const N = 2 * Math.PI * (($o - m) / 2);
   C.strokeDasharray = N.toFixed(3), k["aria-valuenow"] = Math.round(g), C.strokeDashoffset = `${((100-g)/100*N).toFixed(3)}px`, D.transform = "rotate(-90deg)"
  }
  return v.jsx(LT, {
   className: Ae(T.root, s),
   style: {
    width: f,
    height: f,
    ...D,
    ...h
   },
   ownerState: R,
   ref: a,
   role: "progressbar",
   ...k,
   ...w,
   children: v.jsx(BT, {
    className: T.svg,
    ownerState: R,
    viewBox: `${$o/2} ${$o/2} ${$o} ${$o}`,
    children: v.jsx($T, {
     className: T.circle,
     style: C,
     ownerState: R,
     cx: $o,
     cy: $o,
     r: ($o - m) / 2,
     fill: "none",
     strokeWidth: m
    })
   })
  })
 });

function _T(e) {
 return Ue("MuiIconButton", e)
}
const N0 = Ve("MuiIconButton", ["root", "disabled", "colorInherit", "colorPrimary", "colorSecondary", "colorError", "colorInfo", "colorSuccess", "colorWarning", "edgeStart", "edgeEnd", "sizeSmall", "sizeMedium", "sizeLarge", "loading", "loadingIndicator", "loadingWrapper"]),
 UT = e => {
  const {
   classes: r,
   disabled: a,
   color: i,
   edge: s,
   size: c,
   loading: d
  } = e, f = {
   root: ["root", d && "loading", a && "disabled", i !== "default" && `color${Ce(i)}`, s && `edge${Ce(s)}`, `size${Ce(c)}`],
   loadingIndicator: ["loadingIndicator"],
   loadingWrapper: ["loadingWrapper"]
  };
  return Ie(f, _T, r)
 },
 IT = pe(As, {
  name: "MuiIconButton",
  slot: "Root",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.root, a.loading && r.loading, a.color !== "default" && r[`color${Ce(a.color)}`], a.edge && r[`edge${Ce(a.edge)}`], r[`size${Ce(a.size)}`]]
  }
 })(Ye(({
  theme: e
 }) => ({
  textAlign: "center",
  flex: "0 0 auto",
  fontSize: e.typography.pxToRem(24),
  padding: 8,
  borderRadius: "50%",
  color: (e.vars || e).palette.action.active,
  transition: e.transitions.create("background-color", {
   duration: e.transitions.duration.shortest
  }),
  variants: [{
   props: r => !r.disableRipple,
   style: {
    "--IconButton-hoverBg": e.vars ? `rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})` : Qt(e.palette.action.active, e.palette.action.hoverOpacity),
    "&:hover": {
     backgroundColor: "var(--IconButton-hoverBg)",
     "@media (hover: none)": {
      backgroundColor: "transparent"
     }
    }
   }
  }, {
   props: {
    edge: "start"
   },
   style: {
    marginLeft: -12
   }
  }, {
   props: {
    edge: "start",
    size: "small"
   },
   style: {
    marginLeft: -3
   }
  }, {
   props: {
    edge: "end"
   },
   style: {
    marginRight: -12
   }
  }, {
   props: {
    edge: "end",
    size: "small"
   },
   style: {
    marginRight: -3
   }
  }]
 })), Ye(({
  theme: e
 }) => ({
  variants: [{
   props: {
    color: "inherit"
   },
   style: {
    color: "inherit"
   }
  }, ...Object.entries(e.palette).filter(Rn()).map(([r]) => ({
   props: {
    color: r
   },
   style: {
    color: (e.vars || e).palette[r].main
   }
  })), ...Object.entries(e.palette).filter(Rn()).map(([r]) => ({
   props: {
    color: r
   },
   style: {
    "--IconButton-hoverBg": e.vars ? `rgba(${(e.vars||e).palette[r].mainChannel} / ${e.vars.palette.action.hoverOpacity})` : Qt((e.vars || e).palette[r].main, e.palette.action.hoverOpacity)
   }
  })), {
   props: {
    size: "small"
   },
   style: {
    padding: 5,
    fontSize: e.typography.pxToRem(18)
   }
  }, {
   props: {
    size: "large"
   },
   style: {
    padding: 12,
    fontSize: e.typography.pxToRem(28)
   }
  }],
  [`&.${N0.disabled}`]: {
   backgroundColor: "transparent",
   color: (e.vars || e).palette.action.disabled
  },
  [`&.${N0.loading}`]: {
   color: "transparent"
  }
 }))),
 PT = pe("span", {
  name: "MuiIconButton",
  slot: "LoadingIndicator",
  overridesResolver: (e, r) => r.loadingIndicator
 })(({
  theme: e
 }) => ({
  display: "none",
  position: "absolute",
  visibility: "visible",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: (e.vars || e).palette.action.disabled,
  variants: [{
   props: {
    loading: !0
   },
   style: {
    display: "flex"
   }
  }]
 })),
 hr = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiIconButton"
   }),
   {
    edge: s = !1,
    children: c,
    className: d,
    color: f = "default",
    disabled: h = !1,
    disableFocusRipple: m = !1,
    size: g = "medium",
    id: b,
    loading: w = null,
    loadingIndicator: R,
    ...T
   } = i,
   C = $i(b),
   D = R ?? v.jsx(wi, {
    "aria-labelledby": C,
    color: "inherit",
    size: 16
   }),
   k = {
    ...i,
    edge: s,
    color: f,
    disabled: h,
    disableFocusRipple: m,
    loading: w,
    loadingIndicator: D,
    size: g
   },
   N = UT(k);
  return v.jsxs(IT, {
   id: w ? C : b,
   className: Ae(N.root, d),
   centerRipple: !0,
   focusRipple: !m,
   disabled: h || w,
   ref: a,
   ...T,
   ownerState: k,
   children: [typeof w == "boolean" && v.jsx("span", {
    className: N.loadingWrapper,
    style: {
     display: "contents"
    },
    children: v.jsx(PT, {
     className: N.loadingIndicator,
     ownerState: k,
     children: w && D
    })
   }), c]
  })
 }),
 HT = Tt(v.jsx("path", {
  d: "M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"
 })),
 qT = Tt(v.jsx("path", {
  d: "M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"
 })),
 VT = Tt(v.jsx("path", {
  d: "M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
 })),
 GT = Tt(v.jsx("path", {
  d: "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"
 })),
 YT = Tt(v.jsx("path", {
  d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
 })),
 XT = e => {
  const {
   variant: r,
   color: a,
   severity: i,
   classes: s
  } = e, c = {
   root: ["root", `color${Ce(a||i)}`, `${r}${Ce(a||i)}`, `${r}`],
   icon: ["icon"],
   message: ["message"],
   action: ["action"]
  };
  return Ie(c, DT, s)
 },
 WT = pe(Gr, {
  name: "MuiAlert",
  slot: "Root",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.root, r[a.variant], r[`${a.variant}${Ce(a.color||a.severity)}`]]
  }
 })(Ye(({
  theme: e
 }) => {
  const r = e.palette.mode === "light" ? ya : ba,
   a = e.palette.mode === "light" ? ba : ya;
  return {
   ...e.typography.body2,
   backgroundColor: "transparent",
   display: "flex",
   padding: "6px 16px",
   variants: [...Object.entries(e.palette).filter(Rn(["light"])).map(([i]) => ({
    props: {
     colorSeverity: i,
     variant: "standard"
    },
    style: {
     color: e.vars ? e.vars.palette.Alert[`${i}Color`] : r(e.palette[i].light, .6),
     backgroundColor: e.vars ? e.vars.palette.Alert[`${i}StandardBg`] : a(e.palette[i].light, .9),
     [`& .${j0.icon}`]: e.vars ? {
      color: e.vars.palette.Alert[`${i}IconColor`]
     } : {
      color: e.palette[i].main
     }
    }
   })), ...Object.entries(e.palette).filter(Rn(["light"])).map(([i]) => ({
    props: {
     colorSeverity: i,
     variant: "outlined"
    },
    style: {
     color: e.vars ? e.vars.palette.Alert[`${i}Color`] : r(e.palette[i].light, .6),
     border: `1px solid ${(e.vars||e).palette[i].light}`,
     [`& .${j0.icon}`]: e.vars ? {
      color: e.vars.palette.Alert[`${i}IconColor`]
     } : {
      color: e.palette[i].main
     }
    }
   })), ...Object.entries(e.palette).filter(Rn(["dark"])).map(([i]) => ({
    props: {
     colorSeverity: i,
     variant: "filled"
    },
    style: {
     fontWeight: e.typography.fontWeightMedium,
     ...e.vars ? {
      color: e.vars.palette.Alert[`${i}FilledColor`],
      backgroundColor: e.vars.palette.Alert[`${i}FilledBg`]
     } : {
      backgroundColor: e.palette.mode === "dark" ? e.palette[i].dark : e.palette[i].main,
      color: e.palette.getContrastText(e.palette[i].main)
     }
    }
   }))]
  }
 })),
 FT = pe("div", {
  name: "MuiAlert",
  slot: "Icon",
  overridesResolver: (e, r) => r.icon
 })({
  marginRight: 12,
  padding: "7px 0",
  display: "flex",
  fontSize: 22,
  opacity: .9
 }),
 KT = pe("div", {
  name: "MuiAlert",
  slot: "Message",
  overridesResolver: (e, r) => r.message
 })({
  padding: "8px 0",
  minWidth: 0,
  overflow: "auto"
 }),
 QT = pe("div", {
  name: "MuiAlert",
  slot: "Action",
  overridesResolver: (e, r) => r.action
 })({
  display: "flex",
  alignItems: "flex-start",
  padding: "4px 0 0 16px",
  marginLeft: "auto",
  marginRight: -8
 }),
 L0 = {
  success: v.jsx(HT, {
   fontSize: "inherit"
  }),
  warning: v.jsx(qT, {
   fontSize: "inherit"
  }),
  error: v.jsx(VT, {
   fontSize: "inherit"
  }),
  info: v.jsx(GT, {
   fontSize: "inherit"
  })
 },
 Ri = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiAlert"
   }),
   {
    action: s,
    children: c,
    className: d,
    closeText: f = "Close",
    color: h,
    components: m = {},
    componentsProps: g = {},
    icon: b,
    iconMapping: w = L0,
    onClose: R,
    role: T = "alert",
    severity: C = "success",
    slotProps: D = {},
    slots: k = {},
    variant: N = "standard",
    ...E
   } = i,
   A = {
    ...i,
    color: h,
    severity: C,
    variant: N,
    colorSeverity: h || C
   },
   O = XT(A),
   L = {
    slots: {
     closeButton: m.CloseButton,
     closeIcon: m.CloseIcon,
     ...k
    },
    slotProps: {
     ...g,
     ...D
    }
   },
   [U, _] = et("root", {
    ref: a,
    shouldForwardComponentProp: !0,
    className: Ae(O.root, d),
    elementType: WT,
    externalForwardedProps: {
     ...L,
     ...E
    },
    ownerState: A,
    additionalProps: {
     role: T,
     elevation: 0
    }
   }),
   [G, S] = et("icon", {
    className: O.icon,
    elementType: FT,
    externalForwardedProps: L,
    ownerState: A
   }),
   [$, H] = et("message", {
    className: O.message,
    elementType: KT,
    externalForwardedProps: L,
    ownerState: A
   }),
   [V, X] = et("action", {
    className: O.action,
    elementType: QT,
    externalForwardedProps: L,
    ownerState: A
   }),
   [W, z] = et("closeButton", {
    elementType: hr,
    externalForwardedProps: L,
    ownerState: A
   }),
   [I, Q] = et("closeIcon", {
    elementType: YT,
    externalForwardedProps: L,
    ownerState: A
   });
  return v.jsxs(U, {
   ..._,
   children: [b !== !1 ? v.jsx(G, {
    ...S,
    children: b || w[C] || L0[C]
   }) : null, v.jsx($, {
    ...H,
    children: c
   }), s != null ? v.jsx(V, {
    ...X,
    children: s
   }) : null, s == null && R ? v.jsx(V, {
    ...X,
    children: v.jsx(W, {
     size: "small",
     "aria-label": f,
     title: f,
     color: "inherit",
     onClick: R,
     ...z,
     children: v.jsx(I, {
      fontSize: "small",
      ...Q
     })
    })
   }) : null]
  })
 });

function ZT(e) {
 return Ue("MuiTypography", e)
}
const B0 = Ve("MuiTypography", ["root", "h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "inherit", "button", "caption", "overline", "alignLeft", "alignRight", "alignCenter", "alignJustify", "noWrap", "gutterBottom", "paragraph"]),
 JT = {
  primary: !0,
  secondary: !0,
  error: !0,
  info: !0,
  success: !0,
  warning: !0,
  textPrimary: !0,
  textSecondary: !0,
  textDisabled: !0
 },
 eA = WE(),
 tA = e => {
  const {
   align: r,
   gutterBottom: a,
   noWrap: i,
   paragraph: s,
   variant: c,
   classes: d
  } = e, f = {
   root: ["root", c, e.align !== "inherit" && `align${Ce(r)}`, a && "gutterBottom", i && "noWrap", s && "paragraph"]
  };
  return Ie(f, ZT, d)
 },
 nA = pe("span", {
  name: "MuiTypography",
  slot: "Root",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.root, a.variant && r[a.variant], a.align !== "inherit" && r[`align${Ce(a.align)}`], a.noWrap && r.noWrap, a.gutterBottom && r.gutterBottom, a.paragraph && r.paragraph]
  }
 })(Ye(({
  theme: e
 }) => {
  var r;
  return {
   margin: 0,
   variants: [{
    props: {
     variant: "inherit"
    },
    style: {
     font: "inherit",
     lineHeight: "inherit",
     letterSpacing: "inherit"
    }
   }, ...Object.entries(e.typography).filter(([a, i]) => a !== "inherit" && i && typeof i == "object").map(([a, i]) => ({
    props: {
     variant: a
    },
    style: i
   })), ...Object.entries(e.palette).filter(Rn()).map(([a]) => ({
    props: {
     color: a
    },
    style: {
     color: (e.vars || e).palette[a].main
    }
   })), ...Object.entries(((r = e.palette) == null ? void 0 : r.text) || {}).filter(([, a]) => typeof a == "string").map(([a]) => ({
    props: {
     color: `text${Ce(a)}`
    },
    style: {
     color: (e.vars || e).palette.text[a]
    }
   })), {
    props: ({
     ownerState: a
    }) => a.align !== "inherit",
    style: {
     textAlign: "var(--Typography-textAlign)"
    }
   }, {
    props: ({
     ownerState: a
    }) => a.noWrap,
    style: {
     overflow: "hidden",
     textOverflow: "ellipsis",
     whiteSpace: "nowrap"
    }
   }, {
    props: ({
     ownerState: a
    }) => a.gutterBottom,
    style: {
     marginBottom: "0.35em"
    }
   }, {
    props: ({
     ownerState: a
    }) => a.paragraph,
    style: {
     marginBottom: 16
    }
   }]
  }
 })),
 $0 = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  inherit: "p"
 },
 _t = y.forwardRef(function(r, a) {
  const {
   color: i,
   ...s
  } = Ge({
   props: r,
   name: "MuiTypography"
  }), c = !JT[i], d = eA({
   ...s,
   ...c && {
    color: i
   }
  }), {
   align: f = "inherit",
   className: h,
   component: m,
   gutterBottom: g = !1,
   noWrap: b = !1,
   paragraph: w = !1,
   variant: R = "body1",
   variantMapping: T = $0,
   ...C
  } = d, D = {
   ...d,
   align: f,
   color: i,
   className: h,
   component: m,
   gutterBottom: g,
   noWrap: b,
   paragraph: w,
   variant: R,
   variantMapping: T
  }, k = m || (w ? "p" : T[R] || $0[R]) || "span", N = tA(D);
  return v.jsx(nA, {
   as: k,
   ref: a,
   className: Ae(N.root, h),
   ...C,
   ownerState: D,
   style: {
    ...f !== "inherit" && {
     "--Typography-textAlign": f
    },
    ...C.style
   }
  })
 });
var Un = "top",
 yr = "bottom",
 br = "right",
 In = "left",
 $h = "auto",
 Ms = [Un, yr, br, In],
 Di = "start",
 ds = "end",
 rA = "clippingParents",
 _1 = "viewport",
 _l = "popper",
 oA = "reference",
 _0 = Ms.reduce(function(e, r) {
  return e.concat([r + "-" + Di, r + "-" + ds])
 }, []),
 U1 = [].concat(Ms, [$h]).reduce(function(e, r) {
  return e.concat([r, r + "-" + Di, r + "-" + ds])
 }, []),
 aA = "beforeRead",
 iA = "read",
 lA = "afterRead",
 sA = "beforeMain",
 cA = "main",
 uA = "afterMain",
 dA = "beforeWrite",
 fA = "write",
 pA = "afterWrite",
 hA = [aA, iA, lA, sA, cA, uA, dA, fA, pA];

function qr(e) {
 return e ? (e.nodeName || "").toLowerCase() : null
}

function Zn(e) {
 if (e == null) return window;
 if (e.toString() !== "[object Window]") {
  var r = e.ownerDocument;
  return r && r.defaultView || window
 }
 return e
}

function xa(e) {
 var r = Zn(e).Element;
 return e instanceof r || e instanceof Element
}

function gr(e) {
 var r = Zn(e).HTMLElement;
 return e instanceof r || e instanceof HTMLElement
}

function _h(e) {
 if (typeof ShadowRoot > "u") return !1;
 var r = Zn(e).ShadowRoot;
 return e instanceof r || e instanceof ShadowRoot
}

function mA(e) {
 var r = e.state;
 Object.keys(r.elements).forEach(function(a) {
  var i = r.styles[a] || {},
   s = r.attributes[a] || {},
   c = r.elements[a];
  !gr(c) || !qr(c) || (Object.assign(c.style, i), Object.keys(s).forEach(function(d) {
   var f = s[d];
   f === !1 ? c.removeAttribute(d) : c.setAttribute(d, f === !0 ? "" : f)
  }))
 })
}

function gA(e) {
 var r = e.state,
  a = {
   popper: {
    position: r.options.strategy,
    left: "0",
    top: "0",
    margin: "0"
   },
   arrow: {
    position: "absolute"
   },
   reference: {}
  };
 return Object.assign(r.elements.popper.style, a.popper), r.styles = a, r.elements.arrow && Object.assign(r.elements.arrow.style, a.arrow),
  function() {
   Object.keys(r.elements).forEach(function(i) {
    var s = r.elements[i],
     c = r.attributes[i] || {},
     d = Object.keys(r.styles.hasOwnProperty(i) ? r.styles[i] : a[i]),
     f = d.reduce(function(h, m) {
      return h[m] = "", h
     }, {});
    !gr(s) || !qr(s) || (Object.assign(s.style, f), Object.keys(c).forEach(function(h) {
     s.removeAttribute(h)
    }))
   })
  }
}
const vA = {
 name: "applyStyles",
 enabled: !0,
 phase: "write",
 fn: mA,
 effect: gA,
 requires: ["computeStyles"]
};

function Hr(e) {
 return e.split("-")[0]
}
var ma = Math.max,
 Su = Math.min,
 ki = Math.round;

function rh() {
 var e = navigator.userAgentData;
 return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(r) {
  return r.brand + "/" + r.version
 }).join(" ") : navigator.userAgent
}

function I1() {
 return !/^((?!chrome|android).)*safari/i.test(rh())
}

function zi(e, r, a) {
 r === void 0 && (r = !1), a === void 0 && (a = !1);
 var i = e.getBoundingClientRect(),
  s = 1,
  c = 1;
 r && gr(e) && (s = e.offsetWidth > 0 && ki(i.width) / e.offsetWidth || 1, c = e.offsetHeight > 0 && ki(i.height) / e.offsetHeight || 1);
 var d = xa(e) ? Zn(e) : window,
  f = d.visualViewport,
  h = !I1() && a,
  m = (i.left + (h && f ? f.offsetLeft : 0)) / s,
  g = (i.top + (h && f ? f.offsetTop : 0)) / c,
  b = i.width / s,
  w = i.height / c;
 return {
  width: b,
  height: w,
  top: g,
  right: m + b,
  bottom: g + w,
  left: m,
  x: m,
  y: g
 }
}

function Uh(e) {
 var r = zi(e),
  a = e.offsetWidth,
  i = e.offsetHeight;
 return Math.abs(r.width - a) <= 1 && (a = r.width), Math.abs(r.height - i) <= 1 && (i = r.height), {
  x: e.offsetLeft,
  y: e.offsetTop,
  width: a,
  height: i
 }
}

function P1(e, r) {
 var a = r.getRootNode && r.getRootNode();
 if (e.contains(r)) return !0;
 if (a && _h(a)) {
  var i = r;
  do {
   if (i && e.isSameNode(i)) return !0;
   i = i.parentNode || i.host
  } while (i)
 }
 return !1
}

function po(e) {
 return Zn(e).getComputedStyle(e)
}

function yA(e) {
 return ["table", "td", "th"].indexOf(qr(e)) >= 0
}

function qo(e) {
 return ((xa(e) ? e.ownerDocument : e.document) || window.document).documentElement
}

function Gu(e) {
 return qr(e) === "html" ? e : e.assignedSlot || e.parentNode || (_h(e) ? e.host : null) || qo(e)
}

function U0(e) {
 return !gr(e) || po(e).position === "fixed" ? null : e.offsetParent
}

function bA(e) {
 var r = /firefox/i.test(rh()),
  a = /Trident/i.test(rh());
 if (a && gr(e)) {
  var i = po(e);
  if (i.position === "fixed") return null
 }
 var s = Gu(e);
 for (_h(s) && (s = s.host); gr(s) && ["html", "body"].indexOf(qr(s)) < 0;) {
  var c = po(s);
  if (c.transform !== "none" || c.perspective !== "none" || c.contain === "paint" || ["transform", "perspective"].indexOf(c.willChange) !== -1 || r && c.willChange === "filter" || r && c.filter && c.filter !== "none") return s;
  s = s.parentNode
 }
 return null
}

function Os(e) {
 for (var r = Zn(e), a = U0(e); a && yA(a) && po(a).position === "static";) a = U0(a);
 return a && (qr(a) === "html" || qr(a) === "body" && po(a).position === "static") ? r : a || bA(e) || r
}

function Ih(e) {
 return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y"
}

function Zl(e, r, a) {
 return ma(e, Su(r, a))
}

function xA(e, r, a) {
 var i = Zl(e, r, a);
 return i > a ? a : i
}

function H1() {
 return {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
 }
}

function q1(e) {
 return Object.assign({}, H1(), e)
}

function V1(e, r) {
 return r.reduce(function(a, i) {
  return a[i] = e, a
 }, {})
}
var SA = function(r, a) {
 return r = typeof r == "function" ? r(Object.assign({}, a.rects, {
  placement: a.placement
 })) : r, q1(typeof r != "number" ? r : V1(r, Ms))
};

function CA(e) {
 var r, a = e.state,
  i = e.name,
  s = e.options,
  c = a.elements.arrow,
  d = a.modifiersData.popperOffsets,
  f = Hr(a.placement),
  h = Ih(f),
  m = [In, br].indexOf(f) >= 0,
  g = m ? "height" : "width";
 if (!(!c || !d)) {
  var b = SA(s.padding, a),
   w = Uh(c),
   R = h === "y" ? Un : In,
   T = h === "y" ? yr : br,
   C = a.rects.reference[g] + a.rects.reference[h] - d[h] - a.rects.popper[g],
   D = d[h] - a.rects.reference[h],
   k = Os(c),
   N = k ? h === "y" ? k.clientHeight || 0 : k.clientWidth || 0 : 0,
   E = C / 2 - D / 2,
   A = b[R],
   O = N - w[g] - b[T],
   L = N / 2 - w[g] / 2 + E,
   U = Zl(A, L, O),
   _ = h;
  a.modifiersData[i] = (r = {}, r[_] = U, r.centerOffset = U - L, r)
 }
}

function wA(e) {
 var r = e.state,
  a = e.options,
  i = a.element,
  s = i === void 0 ? "[data-popper-arrow]" : i;
 s != null && (typeof s == "string" && (s = r.elements.popper.querySelector(s), !s) || P1(r.elements.popper, s) && (r.elements.arrow = s))
}
const RA = {
 name: "arrow",
 enabled: !0,
 phase: "main",
 fn: CA,
 effect: wA,
 requires: ["popperOffsets"],
 requiresIfExists: ["preventOverflow"]
};

function ji(e) {
 return e.split("-")[1]
}
var EA = {
 top: "auto",
 right: "auto",
 bottom: "auto",
 left: "auto"
};

function TA(e, r) {
 var a = e.x,
  i = e.y,
  s = r.devicePixelRatio || 1;
 return {
  x: ki(a * s) / s || 0,
  y: ki(i * s) / s || 0
 }
}

function I0(e) {
 var r, a = e.popper,
  i = e.popperRect,
  s = e.placement,
  c = e.variation,
  d = e.offsets,
  f = e.position,
  h = e.gpuAcceleration,
  m = e.adaptive,
  g = e.roundOffsets,
  b = e.isFixed,
  w = d.x,
  R = w === void 0 ? 0 : w,
  T = d.y,
  C = T === void 0 ? 0 : T,
  D = typeof g == "function" ? g({
   x: R,
   y: C
  }) : {
   x: R,
   y: C
  };
 R = D.x, C = D.y;
 var k = d.hasOwnProperty("x"),
  N = d.hasOwnProperty("y"),
  E = In,
  A = Un,
  O = window;
 if (m) {
  var L = Os(a),
   U = "clientHeight",
   _ = "clientWidth";
  if (L === Zn(a) && (L = qo(a), po(L).position !== "static" && f === "absolute" && (U = "scrollHeight", _ = "scrollWidth")), L = L, s === Un || (s === In || s === br) && c === ds) {
   A = yr;
   var G = b && L === O && O.visualViewport ? O.visualViewport.height : L[U];
   C -= G - i.height, C *= h ? 1 : -1
  }
  if (s === In || (s === Un || s === yr) && c === ds) {
   E = br;
   var S = b && L === O && O.visualViewport ? O.visualViewport.width : L[_];
   R -= S - i.width, R *= h ? 1 : -1
  }
 }
 var $ = Object.assign({
   position: f
  }, m && EA),
  H = g === !0 ? TA({
   x: R,
   y: C
  }, Zn(a)) : {
   x: R,
   y: C
  };
 if (R = H.x, C = H.y, h) {
  var V;
  return Object.assign({}, $, (V = {}, V[A] = N ? "0" : "", V[E] = k ? "0" : "", V.transform = (O.devicePixelRatio || 1) <= 1 ? "translate(" + R + "px, " + C + "px)" : "translate3d(" + R + "px, " + C + "px, 0)", V))
 }
 return Object.assign({}, $, (r = {}, r[A] = N ? C + "px" : "", r[E] = k ? R + "px" : "", r.transform = "", r))
}

function AA(e) {
 var r = e.state,
  a = e.options,
  i = a.gpuAcceleration,
  s = i === void 0 ? !0 : i,
  c = a.adaptive,
  d = c === void 0 ? !0 : c,
  f = a.roundOffsets,
  h = f === void 0 ? !0 : f,
  m = {
   placement: Hr(r.placement),
   variation: ji(r.placement),
   popper: r.elements.popper,
   popperRect: r.rects.popper,
   gpuAcceleration: s,
   isFixed: r.options.strategy === "fixed"
  };
 r.modifiersData.popperOffsets != null && (r.styles.popper = Object.assign({}, r.styles.popper, I0(Object.assign({}, m, {
  offsets: r.modifiersData.popperOffsets,
  position: r.options.strategy,
  adaptive: d,
  roundOffsets: h
 })))), r.modifiersData.arrow != null && (r.styles.arrow = Object.assign({}, r.styles.arrow, I0(Object.assign({}, m, {
  offsets: r.modifiersData.arrow,
  position: "absolute",
  adaptive: !1,
  roundOffsets: h
 })))), r.attributes.popper = Object.assign({}, r.attributes.popper, {
  "data-popper-placement": r.placement
 })
}
const MA = {
 name: "computeStyles",
 enabled: !0,
 phase: "beforeWrite",
 fn: AA,
 data: {}
};
var Wc = {
 passive: !0
};

function OA(e) {
 var r = e.state,
  a = e.instance,
  i = e.options,
  s = i.scroll,
  c = s === void 0 ? !0 : s,
  d = i.resize,
  f = d === void 0 ? !0 : d,
  h = Zn(r.elements.popper),
  m = [].concat(r.scrollParents.reference, r.scrollParents.popper);
 return c && m.forEach(function(g) {
   g.addEventListener("scroll", a.update, Wc)
  }), f && h.addEventListener("resize", a.update, Wc),
  function() {
   c && m.forEach(function(g) {
    g.removeEventListener("scroll", a.update, Wc)
   }), f && h.removeEventListener("resize", a.update, Wc)
  }
}
const DA = {
 name: "eventListeners",
 enabled: !0,
 phase: "write",
 fn: function() {},
 effect: OA,
 data: {}
};
var kA = {
 left: "right",
 right: "left",
 bottom: "top",
 top: "bottom"
};

function pu(e) {
 return e.replace(/left|right|bottom|top/g, function(r) {
  return kA[r]
 })
}
var zA = {
 start: "end",
 end: "start"
};

function P0(e) {
 return e.replace(/start|end/g, function(r) {
  return zA[r]
 })
}

function Ph(e) {
 var r = Zn(e),
  a = r.pageXOffset,
  i = r.pageYOffset;
 return {
  scrollLeft: a,
  scrollTop: i
 }
}

function Hh(e) {
 return zi(qo(e)).left + Ph(e).scrollLeft
}

function jA(e, r) {
 var a = Zn(e),
  i = qo(e),
  s = a.visualViewport,
  c = i.clientWidth,
  d = i.clientHeight,
  f = 0,
  h = 0;
 if (s) {
  c = s.width, d = s.height;
  var m = I1();
  (m || !m && r === "fixed") && (f = s.offsetLeft, h = s.offsetTop)
 }
 return {
  width: c,
  height: d,
  x: f + Hh(e),
  y: h
 }
}

function NA(e) {
 var r, a = qo(e),
  i = Ph(e),
  s = (r = e.ownerDocument) == null ? void 0 : r.body,
  c = ma(a.scrollWidth, a.clientWidth, s ? s.scrollWidth : 0, s ? s.clientWidth : 0),
  d = ma(a.scrollHeight, a.clientHeight, s ? s.scrollHeight : 0, s ? s.clientHeight : 0),
  f = -i.scrollLeft + Hh(e),
  h = -i.scrollTop;
 return po(s || a).direction === "rtl" && (f += ma(a.clientWidth, s ? s.clientWidth : 0) - c), {
  width: c,
  height: d,
  x: f,
  y: h
 }
}

function qh(e) {
 var r = po(e),
  a = r.overflow,
  i = r.overflowX,
  s = r.overflowY;
 return /auto|scroll|overlay|hidden/.test(a + s + i)
}

function G1(e) {
 return ["html", "body", "#document"].indexOf(qr(e)) >= 0 ? e.ownerDocument.body : gr(e) && qh(e) ? e : G1(Gu(e))
}

function Jl(e, r) {
 var a;
 r === void 0 && (r = []);
 var i = G1(e),
  s = i === ((a = e.ownerDocument) == null ? void 0 : a.body),
  c = Zn(i),
  d = s ? [c].concat(c.visualViewport || [], qh(i) ? i : []) : i,
  f = r.concat(d);
 return s ? f : f.concat(Jl(Gu(d)))
}

function oh(e) {
 return Object.assign({}, e, {
  left: e.x,
  top: e.y,
  right: e.x + e.width,
  bottom: e.y + e.height
 })
}

function LA(e, r) {
 var a = zi(e, !1, r === "fixed");
 return a.top = a.top + e.clientTop, a.left = a.left + e.clientLeft, a.bottom = a.top + e.clientHeight, a.right = a.left + e.clientWidth, a.width = e.clientWidth, a.height = e.clientHeight, a.x = a.left, a.y = a.top, a
}

function H0(e, r, a) {
 return r === _1 ? oh(jA(e, a)) : xa(r) ? LA(r, a) : oh(NA(qo(e)))
}

function BA(e) {
 var r = Jl(Gu(e)),
  a = ["absolute", "fixed"].indexOf(po(e).position) >= 0,
  i = a && gr(e) ? Os(e) : e;
 return xa(i) ? r.filter(function(s) {
  return xa(s) && P1(s, i) && qr(s) !== "body"
 }) : []
}

function $A(e, r, a, i) {
 var s = r === "clippingParents" ? BA(e) : [].concat(r),
  c = [].concat(s, [a]),
  d = c[0],
  f = c.reduce(function(h, m) {
   var g = H0(e, m, i);
   return h.top = ma(g.top, h.top), h.right = Su(g.right, h.right), h.bottom = Su(g.bottom, h.bottom), h.left = ma(g.left, h.left), h
  }, H0(e, d, i));
 return f.width = f.right - f.left, f.height = f.bottom - f.top, f.x = f.left, f.y = f.top, f
}

function Y1(e) {
 var r = e.reference,
  a = e.element,
  i = e.placement,
  s = i ? Hr(i) : null,
  c = i ? ji(i) : null,
  d = r.x + r.width / 2 - a.width / 2,
  f = r.y + r.height / 2 - a.height / 2,
  h;
 switch (s) {
  case Un:
   h = {
    x: d,
    y: r.y - a.height
   };
   break;
  case yr:
   h = {
    x: d,
    y: r.y + r.height
   };
   break;
  case br:
   h = {
    x: r.x + r.width,
    y: f
   };
   break;
  case In:
   h = {
    x: r.x - a.width,
    y: f
   };
   break;
  default:
   h = {
    x: r.x,
    y: r.y
   }
 }
 var m = s ? Ih(s) : null;
 if (m != null) {
  var g = m === "y" ? "height" : "width";
  switch (c) {
   case Di:
    h[m] = h[m] - (r[g] / 2 - a[g] / 2);
    break;
   case ds:
    h[m] = h[m] + (r[g] / 2 - a[g] / 2);
    break
  }
 }
 return h
}

function fs(e, r) {
 r === void 0 && (r = {});
 var a = r,
  i = a.placement,
  s = i === void 0 ? e.placement : i,
  c = a.strategy,
  d = c === void 0 ? e.strategy : c,
  f = a.boundary,
  h = f === void 0 ? rA : f,
  m = a.rootBoundary,
  g = m === void 0 ? _1 : m,
  b = a.elementContext,
  w = b === void 0 ? _l : b,
  R = a.altBoundary,
  T = R === void 0 ? !1 : R,
  C = a.padding,
  D = C === void 0 ? 0 : C,
  k = q1(typeof D != "number" ? D : V1(D, Ms)),
  N = w === _l ? oA : _l,
  E = e.rects.popper,
  A = e.elements[T ? N : w],
  O = $A(xa(A) ? A : A.contextElement || qo(e.elements.popper), h, g, d),
  L = zi(e.elements.reference),
  U = Y1({
   reference: L,
   element: E,
   placement: s
  }),
  _ = oh(Object.assign({}, E, U)),
  G = w === _l ? _ : L,
  S = {
   top: O.top - G.top + k.top,
   bottom: G.bottom - O.bottom + k.bottom,
   left: O.left - G.left + k.left,
   right: G.right - O.right + k.right
  },
  $ = e.modifiersData.offset;
 if (w === _l && $) {
  var H = $[s];
  Object.keys(S).forEach(function(V) {
   var X = [br, yr].indexOf(V) >= 0 ? 1 : -1,
    W = [Un, yr].indexOf(V) >= 0 ? "y" : "x";
   S[V] += H[W] * X
  })
 }
 return S
}

function _A(e, r) {
 r === void 0 && (r = {});
 var a = r,
  i = a.placement,
  s = a.boundary,
  c = a.rootBoundary,
  d = a.padding,
  f = a.flipVariations,
  h = a.allowedAutoPlacements,
  m = h === void 0 ? U1 : h,
  g = ji(i),
  b = g ? f ? _0 : _0.filter(function(T) {
   return ji(T) === g
  }) : Ms,
  w = b.filter(function(T) {
   return m.indexOf(T) >= 0
  });
 w.length === 0 && (w = b);
 var R = w.reduce(function(T, C) {
  return T[C] = fs(e, {
   placement: C,
   boundary: s,
   rootBoundary: c,
   padding: d
  })[Hr(C)], T
 }, {});
 return Object.keys(R).sort(function(T, C) {
  return R[T] - R[C]
 })
}

function UA(e) {
 if (Hr(e) === $h) return [];
 var r = pu(e);
 return [P0(e), r, P0(r)]
}

function IA(e) {
 var r = e.state,
  a = e.options,
  i = e.name;
 if (!r.modifiersData[i]._skip) {
  for (var s = a.mainAxis, c = s === void 0 ? !0 : s, d = a.altAxis, f = d === void 0 ? !0 : d, h = a.fallbackPlacements, m = a.padding, g = a.boundary, b = a.rootBoundary, w = a.altBoundary, R = a.flipVariations, T = R === void 0 ? !0 : R, C = a.allowedAutoPlacements, D = r.options.placement, k = Hr(D), N = k === D, E = h || (N || !T ? [pu(D)] : UA(D)), A = [D].concat(E).reduce(function(ce, le) {
    return ce.concat(Hr(le) === $h ? _A(r, {
     placement: le,
     boundary: g,
     rootBoundary: b,
     padding: m,
     flipVariations: T,
     allowedAutoPlacements: C
    }) : le)
   }, []), O = r.rects.reference, L = r.rects.popper, U = new Map, _ = !0, G = A[0], S = 0; S < A.length; S++) {
   var $ = A[S],
    H = Hr($),
    V = ji($) === Di,
    X = [Un, yr].indexOf(H) >= 0,
    W = X ? "width" : "height",
    z = fs(r, {
     placement: $,
     boundary: g,
     rootBoundary: b,
     altBoundary: w,
     padding: m
    }),
    I = X ? V ? br : In : V ? yr : Un;
   O[W] > L[W] && (I = pu(I));
   var Q = pu(I),
    Z = [];
   if (c && Z.push(z[H] <= 0), f && Z.push(z[I] <= 0, z[Q] <= 0), Z.every(function(ce) {
     return ce
    })) {
    G = $, _ = !1;
    break
   }
   U.set($, Z)
  }
  if (_)
   for (var j = T ? 3 : 1, q = function(le) {
     var re = A.find(function(ye) {
      var ge = U.get(ye);
      if (ge) return ge.slice(0, le).every(function(Te) {
       return Te
      })
     });
     if (re) return G = re, "break"
    }, ee = j; ee > 0; ee--) {
    var ne = q(ee);
    if (ne === "break") break
   }
  r.placement !== G && (r.modifiersData[i]._skip = !0, r.placement = G, r.reset = !0)
 }
}
const PA = {
 name: "flip",
 enabled: !0,
 phase: "main",
 fn: IA,
 requiresIfExists: ["offset"],
 data: {
  _skip: !1
 }
};

function q0(e, r, a) {
 return a === void 0 && (a = {
  x: 0,
  y: 0
 }), {
  top: e.top - r.height - a.y,
  right: e.right - r.width + a.x,
  bottom: e.bottom - r.height + a.y,
  left: e.left - r.width - a.x
 }
}

function V0(e) {
 return [Un, br, yr, In].some(function(r) {
  return e[r] >= 0
 })
}

function HA(e) {
 var r = e.state,
  a = e.name,
  i = r.rects.reference,
  s = r.rects.popper,
  c = r.modifiersData.preventOverflow,
  d = fs(r, {
   elementContext: "reference"
  }),
  f = fs(r, {
   altBoundary: !0
  }),
  h = q0(d, i),
  m = q0(f, s, c),
  g = V0(h),
  b = V0(m);
 r.modifiersData[a] = {
  referenceClippingOffsets: h,
  popperEscapeOffsets: m,
  isReferenceHidden: g,
  hasPopperEscaped: b
 }, r.attributes.popper = Object.assign({}, r.attributes.popper, {
  "data-popper-reference-hidden": g,
  "data-popper-escaped": b
 })
}
const qA = {
 name: "hide",
 enabled: !0,
 phase: "main",
 requiresIfExists: ["preventOverflow"],
 fn: HA
};

function VA(e, r, a) {
 var i = Hr(e),
  s = [In, Un].indexOf(i) >= 0 ? -1 : 1,
  c = typeof a == "function" ? a(Object.assign({}, r, {
   placement: e
  })) : a,
  d = c[0],
  f = c[1];
 return d = d || 0, f = (f || 0) * s, [In, br].indexOf(i) >= 0 ? {
  x: f,
  y: d
 } : {
  x: d,
  y: f
 }
}

function GA(e) {
 var r = e.state,
  a = e.options,
  i = e.name,
  s = a.offset,
  c = s === void 0 ? [0, 0] : s,
  d = U1.reduce(function(g, b) {
   return g[b] = VA(b, r.rects, c), g
  }, {}),
  f = d[r.placement],
  h = f.x,
  m = f.y;
 r.modifiersData.popperOffsets != null && (r.modifiersData.popperOffsets.x += h, r.modifiersData.popperOffsets.y += m), r.modifiersData[i] = d
}
const YA = {
 name: "offset",
 enabled: !0,
 phase: "main",
 requires: ["popperOffsets"],
 fn: GA
};

function XA(e) {
 var r = e.state,
  a = e.name;
 r.modifiersData[a] = Y1({
  reference: r.rects.reference,
  element: r.rects.popper,
  placement: r.placement
 })
}
const WA = {
 name: "popperOffsets",
 enabled: !0,
 phase: "read",
 fn: XA,
 data: {}
};

function FA(e) {
 return e === "x" ? "y" : "x"
}

function KA(e) {
 var r = e.state,
  a = e.options,
  i = e.name,
  s = a.mainAxis,
  c = s === void 0 ? !0 : s,
  d = a.altAxis,
  f = d === void 0 ? !1 : d,
  h = a.boundary,
  m = a.rootBoundary,
  g = a.altBoundary,
  b = a.padding,
  w = a.tether,
  R = w === void 0 ? !0 : w,
  T = a.tetherOffset,
  C = T === void 0 ? 0 : T,
  D = fs(r, {
   boundary: h,
   rootBoundary: m,
   padding: b,
   altBoundary: g
  }),
  k = Hr(r.placement),
  N = ji(r.placement),
  E = !N,
  A = Ih(k),
  O = FA(A),
  L = r.modifiersData.popperOffsets,
  U = r.rects.reference,
  _ = r.rects.popper,
  G = typeof C == "function" ? C(Object.assign({}, r.rects, {
   placement: r.placement
  })) : C,
  S = typeof G == "number" ? {
   mainAxis: G,
   altAxis: G
  } : Object.assign({
   mainAxis: 0,
   altAxis: 0
  }, G),
  $ = r.modifiersData.offset ? r.modifiersData.offset[r.placement] : null,
  H = {
   x: 0,
   y: 0
  };
 if (L) {
  if (c) {
   var V, X = A === "y" ? Un : In,
    W = A === "y" ? yr : br,
    z = A === "y" ? "height" : "width",
    I = L[A],
    Q = I + D[X],
    Z = I - D[W],
    j = R ? -_[z] / 2 : 0,
    q = N === Di ? U[z] : _[z],
    ee = N === Di ? -_[z] : -U[z],
    ne = r.elements.arrow,
    ce = R && ne ? Uh(ne) : {
     width: 0,
     height: 0
    },
    le = r.modifiersData["arrow#persistent"] ? r.modifiersData["arrow#persistent"].padding : H1(),
    re = le[X],
    ye = le[W],
    ge = Zl(0, U[z], ce[z]),
    Te = E ? U[z] / 2 - j - ge - re - S.mainAxis : q - ge - re - S.mainAxis,
    fe = E ? -U[z] / 2 + j + ge + ye + S.mainAxis : ee + ge + ye + S.mainAxis,
    Oe = r.elements.arrow && Os(r.elements.arrow),
    we = Oe ? A === "y" ? Oe.clientTop || 0 : Oe.clientLeft || 0 : 0,
    Se = (V = $ == null ? void 0 : $[A]) != null ? V : 0,
    Re = I + Te - Se - we,
    ze = I + fe - Se,
    it = Zl(R ? Su(Q, Re) : Q, I, R ? ma(Z, ze) : Z);
   L[A] = it, H[A] = it - I
  }
  if (f) {
   var Ne, Je = A === "x" ? Un : In,
    Ke = A === "x" ? yr : br,
    Pe = L[O],
    He = O === "y" ? "height" : "width",
    Ee = Pe + D[Je],
    mt = Pe - D[Ke],
    ot = [Un, In].indexOf(k) !== -1,
    de = (Ne = $ == null ? void 0 : $[O]) != null ? Ne : 0,
    me = ot ? Ee : Pe - U[He] - _[He] - de + S.altAxis,
    ve = ot ? Pe + U[He] + _[He] - de - S.altAxis : mt,
    De = R && ot ? xA(me, Pe, ve) : Zl(R ? me : Ee, Pe, R ? ve : mt);
   L[O] = De, H[O] = De - Pe
  }
  r.modifiersData[i] = H
 }
}
const QA = {
 name: "preventOverflow",
 enabled: !0,
 phase: "main",
 fn: KA,
 requiresIfExists: ["offset"]
};

function ZA(e) {
 return {
  scrollLeft: e.scrollLeft,
  scrollTop: e.scrollTop
 }
}

function JA(e) {
 return e === Zn(e) || !gr(e) ? Ph(e) : ZA(e)
}

function eM(e) {
 var r = e.getBoundingClientRect(),
  a = ki(r.width) / e.offsetWidth || 1,
  i = ki(r.height) / e.offsetHeight || 1;
 return a !== 1 || i !== 1
}

function tM(e, r, a) {
 a === void 0 && (a = !1);
 var i = gr(r),
  s = gr(r) && eM(r),
  c = qo(r),
  d = zi(e, s, a),
  f = {
   scrollLeft: 0,
   scrollTop: 0
  },
  h = {
   x: 0,
   y: 0
  };
 return (i || !i && !a) && ((qr(r) !== "body" || qh(c)) && (f = JA(r)), gr(r) ? (h = zi(r, !0), h.x += r.clientLeft, h.y += r.clientTop) : c && (h.x = Hh(c))), {
  x: d.left + f.scrollLeft - h.x,
  y: d.top + f.scrollTop - h.y,
  width: d.width,
  height: d.height
 }
}

function nM(e) {
 var r = new Map,
  a = new Set,
  i = [];
 e.forEach(function(c) {
  r.set(c.name, c)
 });

 function s(c) {
  a.add(c.name);
  var d = [].concat(c.requires || [], c.requiresIfExists || []);
  d.forEach(function(f) {
   if (!a.has(f)) {
    var h = r.get(f);
    h && s(h)
   }
  }), i.push(c)
 }
 return e.forEach(function(c) {
  a.has(c.name) || s(c)
 }), i
}

function rM(e) {
 var r = nM(e);
 return hA.reduce(function(a, i) {
  return a.concat(r.filter(function(s) {
   return s.phase === i
  }))
 }, [])
}

function oM(e) {
 var r;
 return function() {
  return r || (r = new Promise(function(a) {
   Promise.resolve().then(function() {
    r = void 0, a(e())
   })
  })), r
 }
}

function aM(e) {
 var r = e.reduce(function(a, i) {
  var s = a[i.name];
  return a[i.name] = s ? Object.assign({}, s, i, {
   options: Object.assign({}, s.options, i.options),
   data: Object.assign({}, s.data, i.data)
  }) : i, a
 }, {});
 return Object.keys(r).map(function(a) {
  return r[a]
 })
}
var G0 = {
 placement: "bottom",
 modifiers: [],
 strategy: "absolute"
};

function Y0() {
 for (var e = arguments.length, r = new Array(e), a = 0; a < e; a++) r[a] = arguments[a];
 return !r.some(function(i) {
  return !(i && typeof i.getBoundingClientRect == "function")
 })
}

function iM(e) {
 e === void 0 && (e = {});
 var r = e,
  a = r.defaultModifiers,
  i = a === void 0 ? [] : a,
  s = r.defaultOptions,
  c = s === void 0 ? G0 : s;
 return function(f, h, m) {
  m === void 0 && (m = c);
  var g = {
    placement: "bottom",
    orderedModifiers: [],
    options: Object.assign({}, G0, c),
    modifiersData: {},
    elements: {
     reference: f,
     popper: h
    },
    attributes: {},
    styles: {}
   },
   b = [],
   w = !1,
   R = {
    state: g,
    setOptions: function(k) {
     var N = typeof k == "function" ? k(g.options) : k;
     C(), g.options = Object.assign({}, c, g.options, N), g.scrollParents = {
      reference: xa(f) ? Jl(f) : f.contextElement ? Jl(f.contextElement) : [],
      popper: Jl(h)
     };
     var E = rM(aM([].concat(i, g.options.modifiers)));
     return g.orderedModifiers = E.filter(function(A) {
      return A.enabled
     }), T(), R.update()
    },
    forceUpdate: function() {
     if (!w) {
      var k = g.elements,
       N = k.reference,
       E = k.popper;
      if (Y0(N, E)) {
       g.rects = {
        reference: tM(N, Os(E), g.options.strategy === "fixed"),
        popper: Uh(E)
       }, g.reset = !1, g.placement = g.options.placement, g.orderedModifiers.forEach(function(S) {
        return g.modifiersData[S.name] = Object.assign({}, S.data)
       });
       for (var A = 0; A < g.orderedModifiers.length; A++) {
        if (g.reset === !0) {
         g.reset = !1, A = -1;
         continue
        }
        var O = g.orderedModifiers[A],
         L = O.fn,
         U = O.options,
         _ = U === void 0 ? {} : U,
         G = O.name;
        typeof L == "function" && (g = L({
         state: g,
         options: _,
         name: G,
         instance: R
        }) || g)
       }
      }
     }
    },
    update: oM(function() {
     return new Promise(function(D) {
      R.forceUpdate(), D(g)
     })
    }),
    destroy: function() {
     C(), w = !0
    }
   };
  if (!Y0(f, h)) return R;
  R.setOptions(m).then(function(D) {
   !w && m.onFirstUpdate && m.onFirstUpdate(D)
  });

  function T() {
   g.orderedModifiers.forEach(function(D) {
    var k = D.name,
     N = D.options,
     E = N === void 0 ? {} : N,
     A = D.effect;
    if (typeof A == "function") {
     var O = A({
       state: g,
       name: k,
       instance: R,
       options: E
      }),
      L = function() {};
     b.push(O || L)
    }
   })
  }

  function C() {
   b.forEach(function(D) {
    return D()
   }), b = []
  }
  return R
 }
}
var lM = [DA, WA, MA, vA, YA, PA, QA, RA, qA],
 sM = iM({
  defaultModifiers: lM
 });

function cM(e) {
 return typeof e == "function" ? e() : e
}
const X1 = y.forwardRef(function(r, a) {
 const {
  children: i,
  container: s,
  disablePortal: c = !1
 } = r, [d, f] = y.useState(null), h = tn(y.isValidElement(i) ? Ca(i) : null, a);
 if (vr(() => {
   c || f(cM(s) || document.body)
  }, [s, c]), vr(() => {
   if (d && !c) return Xp(a, d), () => {
    Xp(a, null)
   }
  }, [a, d, c]), c) {
  if (y.isValidElement(i)) {
   const m = {
    ref: h
   };
   return y.cloneElement(i, m)
  }
  return i
 }
 return d && fa.createPortal(i, d)
});

function uM(e) {
 return Ue("MuiPopper", e)
}
Ve("MuiPopper", ["root"]);

function dM(e, r) {
 if (r === "ltr") return e;
 switch (e) {
  case "bottom-end":
   return "bottom-start";
  case "bottom-start":
   return "bottom-end";
  case "top-end":
   return "top-start";
  case "top-start":
   return "top-end";
  default:
   return e
 }
}

function ah(e) {
 return typeof e == "function" ? e() : e
}

function fM(e) {
 return e.nodeType !== void 0
}
const pM = e => {
  const {
   classes: r
  } = e;
  return Ie({
   root: ["root"]
  }, uM, r)
 },
 hM = {},
 mM = y.forwardRef(function(r, a) {
  const {
   anchorEl: i,
   children: s,
   direction: c,
   disablePortal: d,
   modifiers: f,
   open: h,
   placement: m,
   popperOptions: g,
   popperRef: b,
   slotProps: w = {},
   slots: R = {},
   TransitionProps: T,
   ownerState: C,
   ...D
  } = r, k = y.useRef(null), N = tn(k, a), E = y.useRef(null), A = tn(E, b), O = y.useRef(A);
  vr(() => {
   O.current = A
  }, [A]), y.useImperativeHandle(b, () => E.current, []);
  const L = dM(m, c),
   [U, _] = y.useState(L),
   [G, S] = y.useState(ah(i));
  y.useEffect(() => {
   E.current && E.current.forceUpdate()
  }), y.useEffect(() => {
   i && S(ah(i))
  }, [i]), vr(() => {
   if (!G || !h) return;
   const W = Q => {
    _(Q.placement)
   };
   let z = [{
    name: "preventOverflow",
    options: {
     altBoundary: d
    }
   }, {
    name: "flip",
    options: {
     altBoundary: d
    }
   }, {
    name: "onUpdate",
    enabled: !0,
    phase: "afterWrite",
    fn: ({
     state: Q
    }) => {
     W(Q)
    }
   }];
   f != null && (z = z.concat(f)), g && g.modifiers != null && (z = z.concat(g.modifiers));
   const I = sM(G, k.current, {
    placement: L,
    ...g,
    modifiers: z
   });
   return O.current(I), () => {
    I.destroy(), O.current(null)
   }
  }, [G, d, f, h, g, L]);
  const $ = {
   placement: U
  };
  T !== null && ($.TransitionProps = T);
  const H = pM(r),
   V = R.root ?? "div",
   X = Br({
    elementType: V,
    externalSlotProps: w.root,
    externalForwardedProps: D,
    additionalProps: {
     role: "tooltip",
     ref: N
    },
    ownerState: r,
    className: H.root
   });
  return v.jsx(V, {
   ...X,
   children: typeof s == "function" ? s($) : s
  })
 }),
 gM = y.forwardRef(function(r, a) {
  const {
   anchorEl: i,
   children: s,
   container: c,
   direction: d = "ltr",
   disablePortal: f = !1,
   keepMounted: h = !1,
   modifiers: m,
   open: g,
   placement: b = "bottom",
   popperOptions: w = hM,
   popperRef: R,
   style: T,
   transition: C = !1,
   slotProps: D = {},
   slots: k = {},
   ...N
  } = r, [E, A] = y.useState(!0), O = () => {
   A(!1)
  }, L = () => {
   A(!0)
  };
  if (!h && !g && (!C || E)) return null;
  let U;
  if (c) U = c;
  else if (i) {
   const S = ah(i);
   U = S && fM(S) ? sn(S).body : sn(null).body
  }
  const _ = !g && h && (!C || E) ? "none" : void 0,
   G = C ? {
    in: g,
    onEnter: O,
    onExited: L
   } : void 0;
  return v.jsx(X1, {
   disablePortal: f,
   container: U,
   children: v.jsx(mM, {
    anchorEl: i,
    direction: d,
    disablePortal: f,
    modifiers: m,
    ref: a,
    open: C ? !E : g,
    placement: b,
    popperOptions: w,
    popperRef: R,
    slotProps: D,
    slots: k,
    ...N,
    style: {
     position: "fixed",
     top: 0,
     left: 0,
     display: _,
     ...T
    },
    TransitionProps: G,
    children: s
   })
  })
 }),
 vM = pe(gM, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, r) => r.root
 })({}),
 W1 = y.forwardRef(function(r, a) {
  const i = Hu(),
   s = Ge({
    props: r,
    name: "MuiPopper"
   }),
   {
    anchorEl: c,
    component: d,
    components: f,
    componentsProps: h,
    container: m,
    disablePortal: g,
    keepMounted: b,
    modifiers: w,
    open: R,
    placement: T,
    popperOptions: C,
    popperRef: D,
    transition: k,
    slots: N,
    slotProps: E,
    ...A
   } = s,
   O = (N == null ? void 0 : N.root) ?? (f == null ? void 0 : f.Root),
   L = {
    anchorEl: c,
    container: m,
    disablePortal: g,
    keepMounted: b,
    modifiers: w,
    open: R,
    placement: T,
    popperOptions: C,
    popperRef: D,
    transition: k,
    ...A
   };
  return v.jsx(vM, {
   as: d,
   direction: i ? "rtl" : "ltr",
   slots: {
    root: O
   },
   slotProps: E ?? h,
   ...L,
   ref: a
  })
 });

function Fc(e) {
 return parseInt(e, 10) || 0
}
const yM = {
 shadow: {
  visibility: "hidden",
  position: "absolute",
  overflow: "hidden",
  height: 0,
  top: 0,
  left: 0,
  transform: "translateZ(0)"
 }
};

function bM(e) {
 for (const r in e) return !1;
 return !0
}

function X0(e) {
 return bM(e) || e.outerHeightStyle === 0 && !e.overflowing
}
const xM = y.forwardRef(function(r, a) {
 const {
  onChange: i,
  maxRows: s,
  minRows: c = 1,
  style: d,
  value: f,
  ...h
 } = r, {
  current: m
 } = y.useRef(f != null), g = y.useRef(null), b = tn(a, g), w = y.useRef(null), R = y.useRef(null), T = y.useCallback(() => {
  const E = g.current,
   A = R.current;
  if (!E || !A) return;
  const L = fo(E).getComputedStyle(E);
  if (L.width === "0px") return {
   outerHeightStyle: 0,
   overflowing: !1
  };
  A.style.width = L.width, A.value = E.value || r.placeholder || "x", A.value.slice(-1) === `
` && (A.value += " ");
  const U = L.boxSizing,
   _ = Fc(L.paddingBottom) + Fc(L.paddingTop),
   G = Fc(L.borderBottomWidth) + Fc(L.borderTopWidth),
   S = A.scrollHeight;
  A.value = "x";
  const $ = A.scrollHeight;
  let H = S;
  c && (H = Math.max(Number(c) * $, H)), s && (H = Math.min(Number(s) * $, H)), H = Math.max(H, $);
  const V = H + (U === "border-box" ? _ + G : 0),
   X = Math.abs(H - S) <= 1;
  return {
   outerHeightStyle: V,
   overflowing: X
  }
 }, [s, c, r.placeholder]), C = kn(() => {
  const E = g.current,
   A = T();
  if (!E || !A || X0(A)) return !1;
  const O = A.outerHeightStyle;
  return w.current != null && w.current !== O
 }), D = y.useCallback(() => {
  const E = g.current,
   A = T();
  if (!E || !A || X0(A)) return;
  const O = A.outerHeightStyle;
  w.current !== O && (w.current = O, E.style.height = `${O}px`), E.style.overflow = A.overflowing ? "hidden" : ""
 }, [T]), k = y.useRef(-1);
 vr(() => {
  const E = g1(D),
   A = g == null ? void 0 : g.current;
  if (!A) return;
  const O = fo(A);
  O.addEventListener("resize", E);
  let L;
  return typeof ResizeObserver < "u" && (L = new ResizeObserver(() => {
   C() && (L.unobserve(A), cancelAnimationFrame(k.current), D(), k.current = requestAnimationFrame(() => {
    L.observe(A)
   }))
  }), L.observe(A)), () => {
   E.clear(), cancelAnimationFrame(k.current), O.removeEventListener("resize", E), L && L.disconnect()
  }
 }, [T, D, C]), vr(() => {
  D()
 });
 const N = E => {
  m || D(), i && i(E)
 };
 return v.jsxs(y.Fragment, {
  children: [v.jsx("textarea", {
   value: f,
   onChange: N,
   ref: b,
   rows: c,
   style: d,
   ...h
  }), v.jsx("textarea", {
   "aria-hidden": !0,
   className: r.className,
   readOnly: !0,
   ref: R,
   tabIndex: -1,
   style: {
    ...yM.shadow,
    ...d,
    paddingTop: 0,
    paddingBottom: 0
   }
  })]
 })
});

function ga(e) {
 return typeof e == "string"
}

function wa({
 props: e,
 states: r,
 muiFormControl: a
}) {
 return r.reduce((i, s) => (i[s] = e[s], a && typeof e[s] > "u" && (i[s] = a[s]), i), {})
}
const Yu = y.createContext(void 0);

function ho() {
 return y.useContext(Yu)
}

function W0(e) {
 return e != null && !(Array.isArray(e) && e.length === 0)
}

function Cu(e, r = !1) {
 return e && (W0(e.value) && e.value !== "" || r && W0(e.defaultValue) && e.defaultValue !== "")
}

function SM(e) {
 return e.startAdornment
}

function CM(e) {
 return Ue("MuiInputBase", e)
}
const Ni = Ve("MuiInputBase", ["root", "formControl", "focused", "disabled", "adornedStart", "adornedEnd", "error", "sizeSmall", "multiline", "colorSecondary", "fullWidth", "hiddenLabel", "readOnly", "input", "inputSizeSmall", "inputMultiline", "inputTypeSearch", "inputAdornedStart", "inputAdornedEnd", "inputHiddenLabel"]);
var F0;
const Xu = (e, r) => {
  const {
   ownerState: a
  } = e;
  return [r.root, a.formControl && r.formControl, a.startAdornment && r.adornedStart, a.endAdornment && r.adornedEnd, a.error && r.error, a.size === "small" && r.sizeSmall, a.multiline && r.multiline, a.color && r[`color${Ce(a.color)}`], a.fullWidth && r.fullWidth, a.hiddenLabel && r.hiddenLabel]
 },
 Wu = (e, r) => {
  const {
   ownerState: a
  } = e;
  return [r.input, a.size === "small" && r.inputSizeSmall, a.multiline && r.inputMultiline, a.type === "search" && r.inputTypeSearch, a.startAdornment && r.inputAdornedStart, a.endAdornment && r.inputAdornedEnd, a.hiddenLabel && r.inputHiddenLabel]
 },
 wM = e => {
  const {
   classes: r,
   color: a,
   disabled: i,
   error: s,
   endAdornment: c,
   focused: d,
   formControl: f,
   fullWidth: h,
   hiddenLabel: m,
   multiline: g,
   readOnly: b,
   size: w,
   startAdornment: R,
   type: T
  } = e, C = {
   root: ["root", `color${Ce(a)}`, i && "disabled", s && "error", h && "fullWidth", d && "focused", f && "formControl", w && w !== "medium" && `size${Ce(w)}`, g && "multiline", R && "adornedStart", c && "adornedEnd", m && "hiddenLabel", b && "readOnly"],
   input: ["input", i && "disabled", T === "search" && "inputTypeSearch", g && "inputMultiline", w === "small" && "inputSizeSmall", m && "inputHiddenLabel", R && "inputAdornedStart", c && "inputAdornedEnd", b && "readOnly"]
  };
  return Ie(C, CM, r)
 },
 Fu = pe("div", {
  name: "MuiInputBase",
  slot: "Root",
  overridesResolver: Xu
 })(Ye(({
  theme: e
 }) => ({
  ...e.typography.body1,
  color: (e.vars || e).palette.text.primary,
  lineHeight: "1.4375em",
  boxSizing: "border-box",
  position: "relative",
  cursor: "text",
  display: "inline-flex",
  alignItems: "center",
  [`&.${Ni.disabled}`]: {
   color: (e.vars || e).palette.text.disabled,
   cursor: "default"
  },
  variants: [{
   props: ({
    ownerState: r
   }) => r.multiline,
   style: {
    padding: "4px 0 5px"
   }
  }, {
   props: ({
    ownerState: r,
    size: a
   }) => r.multiline && a === "small",
   style: {
    paddingTop: 1
   }
  }, {
   props: ({
    ownerState: r
   }) => r.fullWidth,
   style: {
    width: "100%"
   }
  }]
 }))),
 Ku = pe("input", {
  name: "MuiInputBase",
  slot: "Input",
  overridesResolver: Wu
 })(Ye(({
  theme: e
 }) => {
  const r = e.palette.mode === "light",
   a = {
    color: "currentColor",
    ...e.vars ? {
     opacity: e.vars.opacity.inputPlaceholder
    } : {
     opacity: r ? .42 : .5
    },
    transition: e.transitions.create("opacity", {
     duration: e.transitions.duration.shorter
    })
   },
   i = {
    opacity: "0 !important"
   },
   s = e.vars ? {
    opacity: e.vars.opacity.inputPlaceholder
   } : {
    opacity: r ? .42 : .5
   };
  return {
   font: "inherit",
   letterSpacing: "inherit",
   color: "currentColor",
   padding: "4px 0 5px",
   border: 0,
   boxSizing: "content-box",
   background: "none",
   height: "1.4375em",
   margin: 0,
   WebkitTapHighlightColor: "transparent",
   display: "block",
   minWidth: 0,
   width: "100%",
   "&::-webkit-input-placeholder": a,
   "&::-moz-placeholder": a,
   "&::-ms-input-placeholder": a,
   "&:focus": {
    outline: 0
   },
   "&:invalid": {
    boxShadow: "none"
   },
   "&::-webkit-search-decoration": {
    WebkitAppearance: "none"
   },
   [`label[data-shrink=false] + .${Ni.formControl} &`]: {
    "&::-webkit-input-placeholder": i,
    "&::-moz-placeholder": i,
    "&::-ms-input-placeholder": i,
    "&:focus::-webkit-input-placeholder": s,
    "&:focus::-moz-placeholder": s,
    "&:focus::-ms-input-placeholder": s
   },
   [`&.${Ni.disabled}`]: {
    opacity: 1,
    WebkitTextFillColor: (e.vars || e).palette.text.disabled
   },
   variants: [{
    props: ({
     ownerState: c
    }) => !c.disableInjectingGlobalStyles,
    style: {
     animationName: "mui-auto-fill-cancel",
     animationDuration: "10ms",
     "&:-webkit-autofill": {
      animationDuration: "5000s",
      animationName: "mui-auto-fill"
     }
    }
   }, {
    props: {
     size: "small"
    },
    style: {
     paddingTop: 1
    }
   }, {
    props: ({
     ownerState: c
    }) => c.multiline,
    style: {
     height: "auto",
     resize: "none",
     padding: 0,
     paddingTop: 0
    }
   }, {
    props: {
     type: "search"
    },
    style: {
     MozAppearance: "textfield"
    }
   }]
  }
 })),
 K0 = Nh({
  "@keyframes mui-auto-fill": {
   from: {
    display: "block"
   }
  },
  "@keyframes mui-auto-fill-cancel": {
   from: {
    display: "block"
   }
  }
 }),
 Vh = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiInputBase"
   }),
   {
    "aria-describedby": s,
    autoComplete: c,
    autoFocus: d,
    className: f,
    color: h,
    components: m = {},
    componentsProps: g = {},
    defaultValue: b,
    disabled: w,
    disableInjectingGlobalStyles: R,
    endAdornment: T,
    error: C,
    fullWidth: D = !1,
    id: k,
    inputComponent: N = "input",
    inputProps: E = {},
    inputRef: A,
    margin: O,
    maxRows: L,
    minRows: U,
    multiline: _ = !1,
    name: G,
    onBlur: S,
    onChange: $,
    onClick: H,
    onFocus: V,
    onKeyDown: X,
    onKeyUp: W,
    placeholder: z,
    readOnly: I,
    renderSuffix: Q,
    rows: Z,
    size: j,
    slotProps: q = {},
    slots: ee = {},
    startAdornment: ne,
    type: ce = "text",
    value: le,
    ...re
   } = i,
   ye = E.value != null ? E.value : le,
   {
    current: ge
   } = y.useRef(ye != null),
   Te = y.useRef(),
   fe = y.useCallback(he => {}, []),
   Oe = tn(Te, A, E.ref, fe),
   [we, Se] = y.useState(!1),
   Re = ho(),
   ze = wa({
    props: i,
    muiFormControl: Re,
    states: ["color", "disabled", "error", "hiddenLabel", "size", "required", "filled"]
   });
  ze.focused = Re ? Re.focused : we, y.useEffect(() => {
   !Re && w && we && (Se(!1), S && S())
  }, [Re, w, we, S]);
  const it = Re && Re.onFilled,
   Ne = Re && Re.onEmpty,
   Je = y.useCallback(he => {
    Cu(he) ? it && it() : Ne && Ne()
   }, [it, Ne]);
  vr(() => {
   ge && Je({
    value: ye
   })
  }, [ye, Je, ge]);
  const Ke = he => {
    V && V(he), E.onFocus && E.onFocus(he), Re && Re.onFocus ? Re.onFocus(he) : Se(!0)
   },
   Pe = he => {
    S && S(he), E.onBlur && E.onBlur(he), Re && Re.onBlur ? Re.onBlur(he) : Se(!1)
   },
   He = (he, ...Qe) => {
    if (!ge) {
     const Be = he.target || Te.current;
     if (Be == null) throw new Error(uo(1));
     Je({
      value: Be.value
     })
    }
    E.onChange && E.onChange(he, ...Qe), $ && $(he, ...Qe)
   };
  y.useEffect(() => {
   Je(Te.current)
  }, []);
  const Ee = he => {
   Te.current && he.currentTarget === he.target && Te.current.focus(), H && H(he)
  };
  let mt = N,
   ot = E;
  _ && mt === "input" && (Z ? ot = {
   type: void 0,
   minRows: Z,
   maxRows: Z,
   ...ot
  } : ot = {
   type: void 0,
   maxRows: L,
   minRows: U,
   ...ot
  }, mt = xM);
  const de = he => {
   Je(he.animationName === "mui-auto-fill-cancel" ? Te.current : {
    value: "x"
   })
  };
  y.useEffect(() => {
   Re && Re.setAdornedStart(!!ne)
  }, [Re, ne]);
  const me = {
    ...i,
    color: ze.color || "primary",
    disabled: ze.disabled,
    endAdornment: T,
    error: ze.error,
    focused: ze.focused,
    formControl: Re,
    fullWidth: D,
    hiddenLabel: ze.hiddenLabel,
    multiline: _,
    size: ze.size,
    startAdornment: ne,
    type: ce
   },
   ve = wM(me),
   De = ee.root || m.Root || Fu,
   be = q.root || g.root || {},
   xe = ee.input || m.Input || Ku;
  return ot = {
   ...ot,
   ...q.input ?? g.input
  }, v.jsxs(y.Fragment, {
   children: [!R && typeof K0 == "function" && (F0 || (F0 = v.jsx(K0, {}))), v.jsxs(De, {
    ...be,
    ref: a,
    onClick: Ee,
    ...re,
    ...!ga(De) && {
     ownerState: {
      ...me,
      ...be.ownerState
     }
    },
    className: Ae(ve.root, be.className, f, I && "MuiInputBase-readOnly"),
    children: [ne, v.jsx(Yu.Provider, {
     value: null,
     children: v.jsx(xe, {
      "aria-invalid": ze.error,
      "aria-describedby": s,
      autoComplete: c,
      autoFocus: d,
      defaultValue: b,
      disabled: ze.disabled,
      id: k,
      onAnimationStart: de,
      name: G,
      placeholder: z,
      readOnly: I,
      required: ze.required,
      rows: Z,
      value: ye,
      onKeyDown: X,
      onKeyUp: W,
      type: ce,
      ...ot,
      ...!ga(xe) && {
       as: mt,
       ownerState: {
        ...me,
        ...ot.ownerState
       }
      },
      ref: Oe,
      className: Ae(ve.input, ot.className, I && "MuiInputBase-readOnly"),
      onBlur: Pe,
      onChange: He,
      onFocus: Ke
     })
    }), T, Q ? Q({
     ...ze,
     startAdornment: ne
    }) : null]
   })]
  })
 });

function RM(e) {
 return Ue("MuiInput", e)
}
const Ul = {
 ...Ni,
 ...Ve("MuiInput", ["root", "underline", "input"])
};

function EM(e) {
 return Ue("MuiOutlinedInput", e)
}
const Lr = {
 ...Ni,
 ...Ve("MuiOutlinedInput", ["root", "notchedOutline", "input"])
};

function TM(e) {
 return Ue("MuiFilledInput", e)
}
const sa = {
  ...Ni,
  ...Ve("MuiFilledInput", ["root", "underline", "input", "adornedStart", "adornedEnd", "sizeSmall", "multiline", "hiddenLabel"])
 },
 AM = Tt(v.jsx("path", {
  d: "M7 10l5 5 5-5z"
 })),
 MM = Tt(v.jsx("path", {
  d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
 }));

function OM(e) {
 return Ue("MuiAvatar", e)
}
Ve("MuiAvatar", ["root", "colorDefault", "circular", "rounded", "square", "img", "fallback"]);
const DM = e => {
  const {
   classes: r,
   variant: a,
   colorDefault: i
  } = e;
  return Ie({
   root: ["root", a, i && "colorDefault"],
   img: ["img"],
   fallback: ["fallback"]
  }, OM, r)
 },
 kM = pe("div", {
  name: "MuiAvatar",
  slot: "Root",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.root, r[a.variant], a.colorDefault && r.colorDefault]
  }
 })(Ye(({
  theme: e
 }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: 40,
  height: 40,
  fontFamily: e.typography.fontFamily,
  fontSize: e.typography.pxToRem(20),
  lineHeight: 1,
  borderRadius: "50%",
  overflow: "hidden",
  userSelect: "none",
  variants: [{
   props: {
    variant: "rounded"
   },
   style: {
    borderRadius: (e.vars || e).shape.borderRadius
   }
  }, {
   props: {
    variant: "square"
   },
   style: {
    borderRadius: 0
   }
  }, {
   props: {
    colorDefault: !0
   },
   style: {
    color: (e.vars || e).palette.background.default,
    ...e.vars ? {
     backgroundColor: e.vars.palette.Avatar.defaultBg
    } : {
     backgroundColor: e.palette.grey[400],
     ...e.applyStyles("dark", {
      backgroundColor: e.palette.grey[600]
     })
    }
   }
  }]
 }))),
 zM = pe("img", {
  name: "MuiAvatar",
  slot: "Img",
  overridesResolver: (e, r) => r.img
 })({
  width: "100%",
  height: "100%",
  textAlign: "center",
  objectFit: "cover",
  color: "transparent",
  textIndent: 1e4
 }),
 jM = pe(MM, {
  name: "MuiAvatar",
  slot: "Fallback",
  overridesResolver: (e, r) => r.fallback
 })({
  width: "75%",
  height: "75%"
 });

function NM({
 crossOrigin: e,
 referrerPolicy: r,
 src: a,
 srcSet: i
}) {
 const [s, c] = y.useState(!1);
 return y.useEffect(() => {
  if (!a && !i) return;
  c(!1);
  let d = !0;
  const f = new Image;
  return f.onload = () => {
   d && c("loaded")
  }, f.onerror = () => {
   d && c("error")
  }, f.crossOrigin = e, f.referrerPolicy = r, f.src = a, i && (f.srcset = i), () => {
   d = !1
  }
 }, [e, r, a, i]), s
}
const Q0 = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiAvatar"
   }),
   {
    alt: s,
    children: c,
    className: d,
    component: f = "div",
    slots: h = {},
    slotProps: m = {},
    imgProps: g,
    sizes: b,
    src: w,
    srcSet: R,
    variant: T = "circular",
    ...C
   } = i;
  let D = null;
  const k = {
    ...i,
    component: f,
    variant: T
   },
   N = NM({
    ...g,
    ...typeof m.img == "function" ? m.img(k) : m.img,
    src: w,
    srcSet: R
   }),
   E = w || R,
   A = E && N !== "error";
  k.colorDefault = !A, delete k.ownerState;
  const O = DM(k),
   [L, U] = et("img", {
    className: O.img,
    elementType: zM,
    externalForwardedProps: {
     slots: h,
     slotProps: {
      img: {
       ...g,
       ...m.img
      }
     }
    },
    additionalProps: {
     alt: s,
     src: w,
     srcSet: R,
     sizes: b
    },
    ownerState: k
   });
  return A ? D = v.jsx(L, {
   ...U
  }) : c || c === 0 ? D = c : E && s ? D = s[0] : D = v.jsx(jM, {
   ownerState: k,
   className: O.fallback
  }), v.jsx(kM, {
   as: f,
   className: Ae(O.root, d),
   ref: a,
   ...C,
   ownerState: k,
   children: D
  })
 }),
 LM = {
  entering: {
   opacity: 1
  },
  entered: {
   opacity: 1
  }
 },
 ps = y.forwardRef(function(r, a) {
  const i = Ho(),
   s = {
    enter: i.transitions.duration.enteringScreen,
    exit: i.transitions.duration.leavingScreen
   },
   {
    addEndListener: c,
    appear: d = !0,
    children: f,
    easing: h,
    in: m,
    onEnter: g,
    onEntered: b,
    onEntering: w,
    onExit: R,
    onExited: T,
    onExiting: C,
    style: D,
    timeout: k = s,
    TransitionComponent: N = Ar,
    ...E
   } = r,
   A = y.useRef(null),
   O = tn(A, Ca(f), a),
   L = X => W => {
    if (X) {
     const z = A.current;
     W === void 0 ? X(z) : X(z, W)
    }
   },
   U = L(w),
   _ = L((X, W) => {
    $1(X);
    const z = Oi({
     style: D,
     timeout: k,
     easing: h
    }, {
     mode: "enter"
    });
    X.style.webkitTransition = i.transitions.create("opacity", z), X.style.transition = i.transitions.create("opacity", z), g && g(X, W)
   }),
   G = L(b),
   S = L(C),
   $ = L(X => {
    const W = Oi({
     style: D,
     timeout: k,
     easing: h
    }, {
     mode: "exit"
    });
    X.style.webkitTransition = i.transitions.create("opacity", W), X.style.transition = i.transitions.create("opacity", W), R && R(X)
   }),
   H = L(T),
   V = X => {
    c && c(A.current, X)
   };
  return v.jsx(N, {
   appear: d,
   in: m,
   nodeRef: A,
   onEnter: _,
   onEntered: G,
   onEntering: U,
   onExit: $,
   onExited: H,
   onExiting: S,
   addEndListener: V,
   timeout: k,
   ...E,
   children: (X, {
    ownerState: W,
    ...z
   }) => y.cloneElement(f, {
    style: {
     opacity: 0,
     visibility: X === "exited" && !m ? "hidden" : void 0,
     ...LM[X],
     ...D,
     ...f.props.style
    },
    ref: O,
    ...z
   })
  })
 });

function BM(e) {
 return Ue("MuiBackdrop", e)
}
Ve("MuiBackdrop", ["root", "invisible"]);
const $M = e => {
  const {
   classes: r,
   invisible: a
  } = e;
  return Ie({
   root: ["root", a && "invisible"]
  }, BM, r)
 },
 _M = pe("div", {
  name: "MuiBackdrop",
  slot: "Root",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.root, a.invisible && r.invisible]
  }
 })({
  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  WebkitTapHighlightColor: "transparent",
  variants: [{
   props: {
    invisible: !0
   },
   style: {
    backgroundColor: "transparent"
   }
  }]
 }),
 F1 = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiBackdrop"
   }),
   {
    children: s,
    className: c,
    component: d = "div",
    invisible: f = !1,
    open: h,
    components: m = {},
    componentsProps: g = {},
    slotProps: b = {},
    slots: w = {},
    TransitionComponent: R,
    transitionDuration: T,
    ...C
   } = i,
   D = {
    ...i,
    component: d,
    invisible: f
   },
   k = $M(D),
   N = {
    transition: R,
    root: m.Root,
    ...w
   },
   E = {
    ...g,
    ...b
   },
   A = {
    slots: N,
    slotProps: E
   },
   [O, L] = et("root", {
    elementType: _M,
    externalForwardedProps: A,
    className: Ae(k.root, c),
    ownerState: D
   }),
   [U, _] = et("transition", {
    elementType: ps,
    externalForwardedProps: A,
    ownerState: D
   });
  return v.jsx(U, {
   in: h,
   timeout: T,
   ...C,
   ..._,
   children: v.jsx(O, {
    "aria-hidden": !0,
    ...L,
    classes: k,
    ref: a,
    children: s
   })
  })
 }),
 UM = Ve("MuiBox", ["root"]),
 IM = qu(),
 Ze = gR({
  themeId: Ir,
  defaultTheme: IM,
  defaultClassName: UM.root,
  generateClassName: l1.generate
 });

function PM(e) {
 return Ue("MuiButton", e)
}
const ca = Ve("MuiButton", ["root", "text", "textInherit", "textPrimary", "textSecondary", "textSuccess", "textError", "textInfo", "textWarning", "outlined", "outlinedInherit", "outlinedPrimary", "outlinedSecondary", "outlinedSuccess", "outlinedError", "outlinedInfo", "outlinedWarning", "contained", "containedInherit", "containedPrimary", "containedSecondary", "containedSuccess", "containedError", "containedInfo", "containedWarning", "disableElevation", "focusVisible", "disabled", "colorInherit", "colorPrimary", "colorSecondary", "colorSuccess", "colorError", "colorInfo", "colorWarning", "textSizeSmall", "textSizeMedium", "textSizeLarge", "outlinedSizeSmall", "outlinedSizeMedium", "outlinedSizeLarge", "containedSizeSmall", "containedSizeMedium", "containedSizeLarge", "sizeMedium", "sizeSmall", "sizeLarge", "fullWidth", "startIcon", "endIcon", "icon", "iconSizeSmall", "iconSizeMedium", "iconSizeLarge", "loading", "loadingWrapper", "loadingIconPlaceholder", "loadingIndicator", "loadingPositionCenter", "loadingPositionStart", "loadingPositionEnd"]),
 HM = y.createContext({}),
 qM = y.createContext(void 0),
 VM = e => {
  const {
   color: r,
   disableElevation: a,
   fullWidth: i,
   size: s,
   variant: c,
   loading: d,
   loadingPosition: f,
   classes: h
  } = e, m = {
   root: ["root", d && "loading", c, `${c}${Ce(r)}`, `size${Ce(s)}`, `${c}Size${Ce(s)}`, `color${Ce(r)}`, a && "disableElevation", i && "fullWidth", d && `loadingPosition${Ce(f)}`],
   startIcon: ["icon", "startIcon", `iconSize${Ce(s)}`],
   endIcon: ["icon", "endIcon", `iconSize${Ce(s)}`],
   loadingIndicator: ["loadingIndicator"],
   loadingWrapper: ["loadingWrapper"]
  }, g = Ie(m, PM, h);
  return {
   ...h,
   ...g
  }
 },
 K1 = [{
  props: {
   size: "small"
  },
  style: {
   "& > *:nth-of-type(1)": {
    fontSize: 18
   }
  }
 }, {
  props: {
   size: "medium"
  },
  style: {
   "& > *:nth-of-type(1)": {
    fontSize: 20
   }
  }
 }, {
  props: {
   size: "large"
  },
  style: {
   "& > *:nth-of-type(1)": {
    fontSize: 22
   }
  }
 }],
 GM = pe(As, {
  shouldForwardProp: e => zn(e) || e === "classes",
  name: "MuiButton",
  slot: "Root",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.root, r[a.variant], r[`${a.variant}${Ce(a.color)}`], r[`size${Ce(a.size)}`], r[`${a.variant}Size${Ce(a.size)}`], a.color === "inherit" && r.colorInherit, a.disableElevation && r.disableElevation, a.fullWidth && r.fullWidth, a.loading && r.loading]
  }
 })(Ye(({
  theme: e
 }) => {
  const r = e.palette.mode === "light" ? e.palette.grey[300] : e.palette.grey[800],
   a = e.palette.mode === "light" ? e.palette.grey.A100 : e.palette.grey[700];
  return {
   ...e.typography.button,
   minWidth: 64,
   padding: "6px 16px",
   border: 0,
   borderRadius: (e.vars || e).shape.borderRadius,
   transition: e.transitions.create(["background-color", "box-shadow", "border-color", "color"], {
    duration: e.transitions.duration.short
   }),
   "&:hover": {
    textDecoration: "none"
   },
   [`&.${ca.disabled}`]: {
    color: (e.vars || e).palette.action.disabled
   },
   variants: [{
    props: {
     variant: "contained"
    },
    style: {
     color: "var(--variant-containedColor)",
     backgroundColor: "var(--variant-containedBg)",
     boxShadow: (e.vars || e).shadows[2],
     "&:hover": {
      boxShadow: (e.vars || e).shadows[4],
      "@media (hover: none)": {
       boxShadow: (e.vars || e).shadows[2]
      }
     },
     "&:active": {
      boxShadow: (e.vars || e).shadows[8]
     },
     [`&.${ca.focusVisible}`]: {
      boxShadow: (e.vars || e).shadows[6]
     },
     [`&.${ca.disabled}`]: {
      color: (e.vars || e).palette.action.disabled,
      boxShadow: (e.vars || e).shadows[0],
      backgroundColor: (e.vars || e).palette.action.disabledBackground
     }
    }
   }, {
    props: {
     variant: "outlined"
    },
    style: {
     padding: "5px 15px",
     border: "1px solid currentColor",
     borderColor: "var(--variant-outlinedBorder, currentColor)",
     backgroundColor: "var(--variant-outlinedBg)",
     color: "var(--variant-outlinedColor)",
     [`&.${ca.disabled}`]: {
      border: `1px solid ${(e.vars||e).palette.action.disabledBackground}`
     }
    }
   }, {
    props: {
     variant: "text"
    },
    style: {
     padding: "6px 8px",
     color: "var(--variant-textColor)",
     backgroundColor: "var(--variant-textBg)"
    }
   }, ...Object.entries(e.palette).filter(Rn()).map(([i]) => ({
    props: {
     color: i
    },
    style: {
     "--variant-textColor": (e.vars || e).palette[i].main,
     "--variant-outlinedColor": (e.vars || e).palette[i].main,
     "--variant-outlinedBorder": e.vars ? `rgba(${e.vars.palette[i].mainChannel} / 0.5)` : Qt(e.palette[i].main, .5),
     "--variant-containedColor": (e.vars || e).palette[i].contrastText,
     "--variant-containedBg": (e.vars || e).palette[i].main,
     "@media (hover: hover)": {
      "&:hover": {
       "--variant-containedBg": (e.vars || e).palette[i].dark,
       "--variant-textBg": e.vars ? `rgba(${e.vars.palette[i].mainChannel} / ${e.vars.palette.action.hoverOpacity})` : Qt(e.palette[i].main, e.palette.action.hoverOpacity),
       "--variant-outlinedBorder": (e.vars || e).palette[i].main,
       "--variant-outlinedBg": e.vars ? `rgba(${e.vars.palette[i].mainChannel} / ${e.vars.palette.action.hoverOpacity})` : Qt(e.palette[i].main, e.palette.action.hoverOpacity)
      }
     }
    }
   })), {
    props: {
     color: "inherit"
    },
    style: {
     color: "inherit",
     borderColor: "currentColor",
     "--variant-containedBg": e.vars ? e.vars.palette.Button.inheritContainedBg : r,
     "@media (hover: hover)": {
      "&:hover": {
       "--variant-containedBg": e.vars ? e.vars.palette.Button.inheritContainedHoverBg : a,
       "--variant-textBg": e.vars ? `rgba(${e.vars.palette.text.primaryChannel} / ${e.vars.palette.action.hoverOpacity})` : Qt(e.palette.text.primary, e.palette.action.hoverOpacity),
       "--variant-outlinedBg": e.vars ? `rgba(${e.vars.palette.text.primaryChannel} / ${e.vars.palette.action.hoverOpacity})` : Qt(e.palette.text.primary, e.palette.action.hoverOpacity)
      }
     }
    }
   }, {
    props: {
     size: "small",
     variant: "text"
    },
    style: {
     padding: "4px 5px",
     fontSize: e.typography.pxToRem(13)
    }
   }, {
    props: {
     size: "large",
     variant: "text"
    },
    style: {
     padding: "8px 11px",
     fontSize: e.typography.pxToRem(15)
    }
   }, {
    props: {
     size: "small",
     variant: "outlined"
    },
    style: {
     padding: "3px 9px",
     fontSize: e.typography.pxToRem(13)
    }
   }, {
    props: {
     size: "large",
     variant: "outlined"
    },
    style: {
     padding: "7px 21px",
     fontSize: e.typography.pxToRem(15)
    }
   }, {
    props: {
     size: "small",
     variant: "contained"
    },
    style: {
     padding: "4px 10px",
     fontSize: e.typography.pxToRem(13)
    }
   }, {
    props: {
     size: "large",
     variant: "contained"
    },
    style: {
     padding: "8px 22px",
     fontSize: e.typography.pxToRem(15)
    }
   }, {
    props: {
     disableElevation: !0
    },
    style: {
     boxShadow: "none",
     "&:hover": {
      boxShadow: "none"
     },
     [`&.${ca.focusVisible}`]: {
      boxShadow: "none"
     },
     "&:active": {
      boxShadow: "none"
     },
     [`&.${ca.disabled}`]: {
      boxShadow: "none"
     }
    }
   }, {
    props: {
     fullWidth: !0
    },
    style: {
     width: "100%"
    }
   }, {
    props: {
     loadingPosition: "center"
    },
    style: {
     transition: e.transitions.create(["background-color", "box-shadow", "border-color"], {
      duration: e.transitions.duration.short
     }),
     [`&.${ca.loading}`]: {
      color: "transparent"
     }
    }
   }]
  }
 })),
 YM = pe("span", {
  name: "MuiButton",
  slot: "StartIcon",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.startIcon, a.loading && r.startIconLoadingStart, r[`iconSize${Ce(a.size)}`]]
  }
 })(({
  theme: e
 }) => ({
  display: "inherit",
  marginRight: 8,
  marginLeft: -4,
  variants: [{
   props: {
    size: "small"
   },
   style: {
    marginLeft: -2
   }
  }, {
   props: {
    loadingPosition: "start",
    loading: !0
   },
   style: {
    transition: e.transitions.create(["opacity"], {
     duration: e.transitions.duration.short
    }),
    opacity: 0
   }
  }, {
   props: {
    loadingPosition: "start",
    loading: !0,
    fullWidth: !0
   },
   style: {
    marginRight: -8
   }
  }, ...K1]
 })),
 XM = pe("span", {
  name: "MuiButton",
  slot: "EndIcon",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.endIcon, a.loading && r.endIconLoadingEnd, r[`iconSize${Ce(a.size)}`]]
  }
 })(({
  theme: e
 }) => ({
  display: "inherit",
  marginRight: -4,
  marginLeft: 8,
  variants: [{
   props: {
    size: "small"
   },
   style: {
    marginRight: -2
   }
  }, {
   props: {
    loadingPosition: "end",
    loading: !0
   },
   style: {
    transition: e.transitions.create(["opacity"], {
     duration: e.transitions.duration.short
    }),
    opacity: 0
   }
  }, {
   props: {
    loadingPosition: "end",
    loading: !0,
    fullWidth: !0
   },
   style: {
    marginLeft: -8
   }
  }, ...K1]
 })),
 WM = pe("span", {
  name: "MuiButton",
  slot: "LoadingIndicator",
  overridesResolver: (e, r) => r.loadingIndicator
 })(({
  theme: e
 }) => ({
  display: "none",
  position: "absolute",
  visibility: "visible",
  variants: [{
   props: {
    loading: !0
   },
   style: {
    display: "flex"
   }
  }, {
   props: {
    loadingPosition: "start"
   },
   style: {
    left: 14
   }
  }, {
   props: {
    loadingPosition: "start",
    size: "small"
   },
   style: {
    left: 10
   }
  }, {
   props: {
    variant: "text",
    loadingPosition: "start"
   },
   style: {
    left: 6
   }
  }, {
   props: {
    loadingPosition: "center"
   },
   style: {
    left: "50%",
    transform: "translate(-50%)",
    color: (e.vars || e).palette.action.disabled
   }
  }, {
   props: {
    loadingPosition: "end"
   },
   style: {
    right: 14
   }
  }, {
   props: {
    loadingPosition: "end",
    size: "small"
   },
   style: {
    right: 10
   }
  }, {
   props: {
    variant: "text",
    loadingPosition: "end"
   },
   style: {
    right: 6
   }
  }, {
   props: {
    loadingPosition: "start",
    fullWidth: !0
   },
   style: {
    position: "relative",
    left: -10
   }
  }, {
   props: {
    loadingPosition: "end",
    fullWidth: !0
   },
   style: {
    position: "relative",
    right: -10
   }
  }]
 })),
 Z0 = pe("span", {
  name: "MuiButton",
  slot: "LoadingIconPlaceholder",
  overridesResolver: (e, r) => r.loadingIconPlaceholder
 })({
  display: "inline-block",
  width: "1em",
  height: "1em"
 }),
 Ut = y.forwardRef(function(r, a) {
  const i = y.useContext(HM),
   s = y.useContext(qM),
   c = cs(i, r),
   d = Ge({
    props: c,
    name: "MuiButton"
   }),
   {
    children: f,
    color: h = "primary",
    component: m = "button",
    className: g,
    disabled: b = !1,
    disableElevation: w = !1,
    disableFocusRipple: R = !1,
    endIcon: T,
    focusVisibleClassName: C,
    fullWidth: D = !1,
    id: k,
    loading: N = null,
    loadingIndicator: E,
    loadingPosition: A = "center",
    size: O = "medium",
    startIcon: L,
    type: U,
    variant: _ = "text",
    ...G
   } = d,
   S = $i(k),
   $ = E ?? v.jsx(wi, {
    "aria-labelledby": S,
    color: "inherit",
    size: 16
   }),
   H = {
    ...d,
    color: h,
    component: m,
    disabled: b,
    disableElevation: w,
    disableFocusRipple: R,
    fullWidth: D,
    loading: N,
    loadingIndicator: $,
    loadingPosition: A,
    size: O,
    type: U,
    variant: _
   },
   V = VM(H),
   X = (L || N && A === "start") && v.jsx(YM, {
    className: V.startIcon,
    ownerState: H,
    children: L || v.jsx(Z0, {
     className: V.loadingIconPlaceholder,
     ownerState: H
    })
   }),
   W = (T || N && A === "end") && v.jsx(XM, {
    className: V.endIcon,
    ownerState: H,
    children: T || v.jsx(Z0, {
     className: V.loadingIconPlaceholder,
     ownerState: H
    })
   }),
   z = s || "",
   I = typeof N == "boolean" ? v.jsx("span", {
    className: V.loadingWrapper,
    style: {
     display: "contents"
    },
    children: N && v.jsx(WM, {
     className: V.loadingIndicator,
     ownerState: H,
     children: $
    })
   }) : null;
  return v.jsxs(GM, {
   ownerState: H,
   className: Ae(i.className, V.root, g, z),
   component: m,
   disabled: b || N,
   focusRipple: !R,
   focusVisibleClassName: Ae(V.focusVisible, C),
   ref: a,
   type: U,
   id: N ? S : k,
   ...G,
   classes: V,
   children: [X, A !== "end" && I, f, A === "end" && I, W]
  })
 });

function FM(e) {
 return Ue("MuiCard", e)
}
Ve("MuiCard", ["root"]);
const KM = e => {
  const {
   classes: r
  } = e;
  return Ie({
   root: ["root"]
  }, FM, r)
 },
 QM = pe(Gr, {
  name: "MuiCard",
  slot: "Root",
  overridesResolver: (e, r) => r.root
 })({
  overflow: "hidden"
 }),
 ZM = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiCard"
   }),
   {
    className: s,
    raised: c = !1,
    ...d
   } = i,
   f = {
    ...i,
    raised: c
   },
   h = KM(f);
  return v.jsx(QM, {
   className: Ae(h.root, s),
   elevation: c ? 8 : void 0,
   ref: a,
   ownerState: f,
   ...d
  })
 });

function JM(e) {
 return Ue("MuiCardActionArea", e)
}
const Op = Ve("MuiCardActionArea", ["root", "focusVisible", "focusHighlight"]),
 e5 = e => {
  const {
   classes: r
  } = e;
  return Ie({
   root: ["root"],
   focusHighlight: ["focusHighlight"]
  }, JM, r)
 },
 t5 = pe(As, {
  name: "MuiCardActionArea",
  slot: "Root",
  overridesResolver: (e, r) => r.root
 })(Ye(({
  theme: e
 }) => ({
  display: "block",
  textAlign: "inherit",
  borderRadius: "inherit",
  width: "100%",
  [`&:hover .${Op.focusHighlight}`]: {
   opacity: (e.vars || e).palette.action.hoverOpacity,
   "@media (hover: none)": {
    opacity: 0
   }
  },
  [`&.${Op.focusVisible} .${Op.focusHighlight}`]: {
   opacity: (e.vars || e).palette.action.focusOpacity
  }
 }))),
 n5 = pe("span", {
  name: "MuiCardActionArea",
  slot: "FocusHighlight",
  overridesResolver: (e, r) => r.focusHighlight
 })(Ye(({
  theme: e
 }) => ({
  overflow: "hidden",
  pointerEvents: "none",
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: "inherit",
  opacity: 0,
  backgroundColor: "currentcolor",
  transition: e.transitions.create("opacity", {
   duration: e.transitions.duration.short
  })
 }))),
 r5 = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiCardActionArea"
   }),
   {
    children: s,
    className: c,
    focusVisibleClassName: d,
    ...f
   } = i,
   h = i,
   m = e5(h);
  return v.jsxs(t5, {
   className: Ae(m.root, c),
   focusVisibleClassName: Ae(d, m.focusVisible),
   ref: a,
   ownerState: h,
   ...f,
   children: [s, v.jsx(n5, {
    className: m.focusHighlight,
    ownerState: h
   })]
  })
 });

function o5(e) {
 return Ue("MuiCardContent", e)
}
Ve("MuiCardContent", ["root"]);
const a5 = e => {
  const {
   classes: r
  } = e;
  return Ie({
   root: ["root"]
  }, o5, r)
 },
 i5 = pe("div", {
  name: "MuiCardContent",
  slot: "Root",
  overridesResolver: (e, r) => r.root
 })({
  padding: 16,
  "&:last-child": {
   paddingBottom: 24
  }
 }),
 l5 = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiCardContent"
   }),
   {
    className: s,
    component: c = "div",
    ...d
   } = i,
   f = {
    ...i,
    component: c
   },
   h = a5(f);
  return v.jsx(i5, {
   as: c,
   className: Ae(h.root, s),
   ownerState: f,
   ref: a,
   ...d
  })
 });

function s5(e) {
 return Ue("PrivateSwitchBase", e)
}
Ve("PrivateSwitchBase", ["root", "checked", "disabled", "input", "edgeStart", "edgeEnd"]);
const c5 = e => {
  const {
   classes: r,
   checked: a,
   disabled: i,
   edge: s
  } = e, c = {
   root: ["root", a && "checked", i && "disabled", s && `edge${Ce(s)}`],
   input: ["input"]
  };
  return Ie(c, s5, r)
 },
 u5 = pe(As)({
  padding: 9,
  borderRadius: "50%",
  variants: [{
   props: {
    edge: "start",
    size: "small"
   },
   style: {
    marginLeft: -3
   }
  }, {
   props: ({
    edge: e,
    ownerState: r
   }) => e === "start" && r.size !== "small",
   style: {
    marginLeft: -12
   }
  }, {
   props: {
    edge: "end",
    size: "small"
   },
   style: {
    marginRight: -3
   }
  }, {
   props: ({
    edge: e,
    ownerState: r
   }) => e === "end" && r.size !== "small",
   style: {
    marginRight: -12
   }
  }]
 }),
 d5 = pe("input", {
  shouldForwardProp: zn
 })({
  cursor: "inherit",
  position: "absolute",
  opacity: 0,
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
  margin: 0,
  padding: 0,
  zIndex: 1
 }),
 f5 = y.forwardRef(function(r, a) {
  const {
   autoFocus: i,
   checked: s,
   checkedIcon: c,
   defaultChecked: d,
   disabled: f,
   disableFocusRipple: h = !1,
   edge: m = !1,
   icon: g,
   id: b,
   inputProps: w,
   inputRef: R,
   name: T,
   onBlur: C,
   onChange: D,
   onFocus: k,
   readOnly: N,
   required: E = !1,
   tabIndex: A,
   type: O,
   value: L,
   slots: U = {},
   slotProps: _ = {},
   ...G
  } = r, [S, $] = us({
   controlled: s,
   default: !!d,
   name: "SwitchBase",
   state: "checked"
  }), H = ho(), V = le => {
   k && k(le), H && H.onFocus && H.onFocus(le)
  }, X = le => {
   C && C(le), H && H.onBlur && H.onBlur(le)
  }, W = le => {
   if (le.nativeEvent.defaultPrevented) return;
   const re = le.target.checked;
   $(re), D && D(le, re)
  };
  let z = f;
  H && typeof z > "u" && (z = H.disabled);
  const I = O === "checkbox" || O === "radio",
   Q = {
    ...r,
    checked: S,
    disabled: z,
    disableFocusRipple: h,
    edge: m
   },
   Z = c5(Q),
   j = {
    slots: U,
    slotProps: {
     input: w,
     ..._
    }
   },
   [q, ee] = et("root", {
    ref: a,
    elementType: u5,
    className: Z.root,
    shouldForwardComponentProp: !0,
    externalForwardedProps: {
     ...j,
     component: "span",
     ...G
    },
    getSlotProps: le => ({
     ...le,
     onFocus: re => {
      var ye;
      (ye = le.onFocus) == null || ye.call(le, re), V(re)
     },
     onBlur: re => {
      var ye;
      (ye = le.onBlur) == null || ye.call(le, re), X(re)
     }
    }),
    ownerState: Q,
    additionalProps: {
     centerRipple: !0,
     focusRipple: !h,
     disabled: z,
     role: void 0,
     tabIndex: null
    }
   }),
   [ne, ce] = et("input", {
    ref: R,
    elementType: d5,
    className: Z.input,
    externalForwardedProps: j,
    getSlotProps: le => ({
     ...le,
     onChange: re => {
      var ye;
      (ye = le.onChange) == null || ye.call(le, re), W(re)
     }
    }),
    ownerState: Q,
    additionalProps: {
     autoFocus: i,
     checked: s,
     defaultChecked: d,
     disabled: z,
     id: I ? b : void 0,
     name: T,
     readOnly: N,
     required: E,
     tabIndex: A,
     type: O,
     ...O === "checkbox" && L === void 0 ? {} : {
      value: L
     }
    }
   });
  return v.jsxs(q, {
   ...ee,
   children: [v.jsx(ne, {
    ...ce
   }), S ? c : g]
  })
 }),
 p5 = Tt(v.jsx("path", {
  d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
 })),
 h5 = Tt(v.jsx("path", {
  d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
 })),
 m5 = Tt(v.jsx("path", {
  d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"
 }));

function g5(e) {
 return Ue("MuiCheckbox", e)
}
const Dp = Ve("MuiCheckbox", ["root", "checked", "disabled", "indeterminate", "colorPrimary", "colorSecondary", "sizeSmall", "sizeMedium"]),
 v5 = e => {
  const {
   classes: r,
   indeterminate: a,
   color: i,
   size: s
  } = e, c = {
   root: ["root", a && "indeterminate", `color${Ce(i)}`, `size${Ce(s)}`]
  }, d = Ie(c, g5, r);
  return {
   ...r,
   ...d
  }
 },
 y5 = pe(f5, {
  shouldForwardProp: e => zn(e) || e === "classes",
  name: "MuiCheckbox",
  slot: "Root",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.root, a.indeterminate && r.indeterminate, r[`size${Ce(a.size)}`], a.color !== "default" && r[`color${Ce(a.color)}`]]
  }
 })(Ye(({
  theme: e
 }) => ({
  color: (e.vars || e).palette.text.secondary,
  variants: [{
   props: {
    color: "default",
    disableRipple: !1
   },
   style: {
    "&:hover": {
     backgroundColor: e.vars ? `rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})` : Qt(e.palette.action.active, e.palette.action.hoverOpacity)
    }
   }
  }, ...Object.entries(e.palette).filter(Rn()).map(([r]) => ({
   props: {
    color: r,
    disableRipple: !1
   },
   style: {
    "&:hover": {
     backgroundColor: e.vars ? `rgba(${e.vars.palette[r].mainChannel} / ${e.vars.palette.action.hoverOpacity})` : Qt(e.palette[r].main, e.palette.action.hoverOpacity)
    }
   }
  })), ...Object.entries(e.palette).filter(Rn()).map(([r]) => ({
   props: {
    color: r
   },
   style: {
    [`&.${Dp.checked}, &.${Dp.indeterminate}`]: {
     color: (e.vars || e).palette[r].main
    },
    [`&.${Dp.disabled}`]: {
     color: (e.vars || e).palette.action.disabled
    }
   }
  })), {
   props: {
    disableRipple: !1
   },
   style: {
    "&:hover": {
     "@media (hover: none)": {
      backgroundColor: "transparent"
     }
    }
   }
  }]
 }))),
 b5 = v.jsx(h5, {}),
 x5 = v.jsx(p5, {}),
 S5 = v.jsx(m5, {}),
 C5 = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiCheckbox"
   }),
   {
    checkedIcon: s = b5,
    color: c = "primary",
    icon: d = x5,
    indeterminate: f = !1,
    indeterminateIcon: h = S5,
    inputProps: m,
    size: g = "medium",
    disableRipple: b = !1,
    className: w,
    slots: R = {},
    slotProps: T = {},
    ...C
   } = i,
   D = f ? h : d,
   k = f ? h : s,
   N = {
    ...i,
    disableRipple: b,
    color: c,
    indeterminate: f,
    size: g
   },
   E = v5(N),
   A = T.input ?? m,
   [O, L] = et("root", {
    ref: a,
    elementType: y5,
    className: Ae(E.root, w),
    shouldForwardComponentProp: !0,
    externalForwardedProps: {
     slots: R,
     slotProps: T,
     ...C
    },
    ownerState: N,
    additionalProps: {
     type: "checkbox",
     icon: y.cloneElement(D, {
      fontSize: D.props.fontSize ?? g
     }),
     checkedIcon: y.cloneElement(k, {
      fontSize: k.props.fontSize ?? g
     }),
     disableRipple: b,
     slots: R,
     slotProps: {
      input: N1(typeof A == "function" ? A(N) : A, {
       "data-indeterminate": f
      })
     }
    }
   });
  return v.jsx(O, {
   ...L,
   classes: E
  })
 });

function J0(e) {
 return e.substring(2).toLowerCase()
}

function w5(e, r) {
 return r.documentElement.clientWidth < e.clientX || r.documentElement.clientHeight < e.clientY
}

function R5(e) {
 const {
  children: r,
  disableReactTree: a = !1,
  mouseEvent: i = "onClick",
  onClickAway: s,
  touchEvent: c = "onTouchEnd"
 } = e, d = y.useRef(!1), f = y.useRef(null), h = y.useRef(!1), m = y.useRef(!1);
 y.useEffect(() => (setTimeout(() => {
  h.current = !0
 }, 0), () => {
  h.current = !1
 }), []);
 const g = tn(Ca(r), f),
  b = kn(T => {
   const C = m.current;
   m.current = !1;
   const D = sn(f.current);
   if (!h.current || !f.current || "clientX" in T && w5(T, D)) return;
   if (d.current) {
    d.current = !1;
    return
   }
   let k;
   T.composedPath ? k = T.composedPath().includes(f.current) : k = !D.documentElement.contains(T.target) || f.current.contains(T.target), !k && (a || !C) && s(T)
  }),
  w = T => C => {
   m.current = !0;
   const D = r.props[T];
   D && D(C)
  },
  R = {
   ref: g
  };
 return c !== !1 && (R[c] = w(c)), y.useEffect(() => {
  if (c !== !1) {
   const T = J0(c),
    C = sn(f.current),
    D = () => {
     d.current = !0
    };
   return C.addEventListener(T, b), C.addEventListener("touchmove", D), () => {
    C.removeEventListener(T, b), C.removeEventListener("touchmove", D)
   }
  }
 }, [b, c]), i !== !1 && (R[i] = w(i)), y.useEffect(() => {
  if (i !== !1) {
   const T = J0(i),
    C = sn(f.current);
   return C.addEventListener(T, b), () => {
    C.removeEventListener(T, b)
   }
  }
 }, [b, i]), y.cloneElement(r, R)
}
const E5 = lE({
  createStyledComponent: pe("div", {
   name: "MuiContainer",
   slot: "Root",
   overridesResolver: (e, r) => {
    const {
     ownerState: a
    } = e;
    return [r.root, r[`maxWidth${Ce(String(a.maxWidth))}`], a.fixed && r.fixed, a.disableGutters && r.disableGutters]
   }
  }),
  useThemeProps: e => Ge({
   props: e,
   name: "MuiContainer"
  })
 }),
 ih = typeof Nh({}) == "function",
 T5 = (e, r) => ({
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
  boxSizing: "border-box",
  WebkitTextSizeAdjust: "100%",
  ...r && !e.vars && {
   colorScheme: e.palette.mode
  }
 }),
 A5 = e => ({
  color: (e.vars || e).palette.text.primary,
  ...e.typography.body1,
  backgroundColor: (e.vars || e).palette.background.default,
  "@media print": {
   backgroundColor: (e.vars || e).palette.common.white
  }
 }),
 Q1 = (e, r = !1) => {
  var c, d;
  const a = {};
  r && e.colorSchemes && typeof e.getColorSchemeSelector == "function" && Object.entries(e.colorSchemes).forEach(([f, h]) => {
   var g, b;
   const m = e.getColorSchemeSelector(f);
   m.startsWith("@") ? a[m] = {
    ":root": {
     colorScheme: (g = h.palette) == null ? void 0 : g.mode
    }
   } : a[m.replace(/\s*&/, "")] = {
    colorScheme: (b = h.palette) == null ? void 0 : b.mode
   }
  });
  let i = {
   html: T5(e, r),
   "*, *::before, *::after": {
    boxSizing: "inherit"
   },
   "strong, b": {
    fontWeight: e.typography.fontWeightBold
   },
   body: {
    margin: 0,
    ...A5(e),
    "&::backdrop": {
     backgroundColor: (e.vars || e).palette.background.default
    }
   },
   ...a
  };
  const s = (d = (c = e.components) == null ? void 0 : c.MuiCssBaseline) == null ? void 0 : d.styleOverrides;
  return s && (i = [i, s]), i
 },
 hu = "mui-ecs",
 M5 = e => {
  const r = Q1(e, !1),
   a = Array.isArray(r) ? r[0] : r;
  return !e.vars && a && (a.html[`:root:has(${hu})`] = {
   colorScheme: e.palette.mode
  }), e.colorSchemes && Object.entries(e.colorSchemes).forEach(([i, s]) => {
   var d, f;
   const c = e.getColorSchemeSelector(i);
   c.startsWith("@") ? a[c] = {
    [`:root:not(:has(.${hu}))`]: {
     colorScheme: (d = s.palette) == null ? void 0 : d.mode
    }
   } : a[c.replace(/\s*&/, "")] = {
    [`&:not(:has(.${hu}))`]: {
     colorScheme: (f = s.palette) == null ? void 0 : f.mode
    }
   }
  }), r
 },
 O5 = Nh(ih ? ({
  theme: e,
  enableColorScheme: r
 }) => Q1(e, r) : ({
  theme: e
 }) => M5(e));

function kp(e) {
 const r = Ge({
   props: e,
   name: "MuiCssBaseline"
  }),
  {
   children: a,
   enableColorScheme: i = !1
  } = r;
 return v.jsxs(y.Fragment, {
  children: [ih && v.jsx(O5, {
   enableColorScheme: i
  }), !ih && !i && v.jsx("span", {
   className: hu,
   style: {
    display: "none"
   }
  }), a]
 })
}

function D5(e) {
 const r = sn(e);
 return r.body === e ? fo(e).innerWidth > r.documentElement.clientWidth : e.scrollHeight > e.clientHeight
}

function es(e, r) {
 r ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden")
}

function eb(e) {
 return parseInt(fo(e).getComputedStyle(e).paddingRight, 10) || 0
}

function k5(e) {
 const a = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].includes(e.tagName),
  i = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
 return a || i
}

function tb(e, r, a, i, s) {
 const c = [r, a, ...i];
 [].forEach.call(e.children, d => {
  const f = !c.includes(d),
   h = !k5(d);
  f && h && es(d, s)
 })
}

function zp(e, r) {
 let a = -1;
 return e.some((i, s) => r(i) ? (a = s, !0) : !1), a
}

function z5(e, r) {
 const a = [],
  i = e.container;
 if (!r.disableScrollLock) {
  if (D5(i)) {
   const d = y1(fo(i));
   a.push({
    value: i.style.paddingRight,
    property: "padding-right",
    el: i
   }), i.style.paddingRight = `${eb(i)+d}px`;
   const f = sn(i).querySelectorAll(".mui-fixed");
   [].forEach.call(f, h => {
    a.push({
     value: h.style.paddingRight,
     property: "padding-right",
     el: h
    }), h.style.paddingRight = `${eb(h)+d}px`
   })
  }
  let c;
  if (i.parentNode instanceof DocumentFragment) c = sn(i).body;
  else {
   const d = i.parentElement,
    f = fo(i);
   c = (d == null ? void 0 : d.nodeName) === "HTML" && f.getComputedStyle(d).overflowY === "scroll" ? d : i
  }
  a.push({
   value: c.style.overflow,
   property: "overflow",
   el: c
  }, {
   value: c.style.overflowX,
   property: "overflow-x",
   el: c
  }, {
   value: c.style.overflowY,
   property: "overflow-y",
   el: c
  }), c.style.overflow = "hidden"
 }
 return () => {
  a.forEach(({
   value: c,
   el: d,
   property: f
  }) => {
   c ? d.style.setProperty(f, c) : d.style.removeProperty(f)
  })
 }
}

function j5(e) {
 const r = [];
 return [].forEach.call(e.children, a => {
  a.getAttribute("aria-hidden") === "true" && r.push(a)
 }), r
}
class N5 {
 constructor() {
  this.modals = [], this.containers = []
 }
 add(r, a) {
  let i = this.modals.indexOf(r);
  if (i !== -1) return i;
  i = this.modals.length, this.modals.push(r), r.modalRef && es(r.modalRef, !1);
  const s = j5(a);
  tb(a, r.mount, r.modalRef, s, !0);
  const c = zp(this.containers, d => d.container === a);
  return c !== -1 ? (this.containers[c].modals.push(r), i) : (this.containers.push({
   modals: [r],
   container: a,
   restore: null,
   hiddenSiblings: s
  }), i)
 }
 mount(r, a) {
  const i = zp(this.containers, c => c.modals.includes(r)),
   s = this.containers[i];
  s.restore || (s.restore = z5(s, a))
 }
 remove(r, a = !0) {
  const i = this.modals.indexOf(r);
  if (i === -1) return i;
  const s = zp(this.containers, d => d.modals.includes(r)),
   c = this.containers[s];
  if (c.modals.splice(c.modals.indexOf(r), 1), this.modals.splice(i, 1), c.modals.length === 0) c.restore && c.restore(), r.modalRef && es(r.modalRef, a), tb(c.container, r.mount, r.modalRef, c.hiddenSiblings, !1), this.containers.splice(s, 1);
  else {
   const d = c.modals[c.modals.length - 1];
   d.modalRef && es(d.modalRef, !1)
  }
  return i
 }
 isTopModal(r) {
  return this.modals.length > 0 && this.modals[this.modals.length - 1] === r
 }
}
const L5 = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");

function B5(e) {
 const r = parseInt(e.getAttribute("tabindex") || "", 10);
 return Number.isNaN(r) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : r
}

function $5(e) {
 if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name) return !1;
 const r = i => e.ownerDocument.querySelector(`input[type="radio"]${i}`);
 let a = r(`[name="${e.name}"]:checked`);
 return a || (a = r(`[name="${e.name}"]`)), a !== e
}

function _5(e) {
 return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || $5(e))
}

function U5(e) {
 const r = [],
  a = [];
 return Array.from(e.querySelectorAll(L5)).forEach((i, s) => {
  const c = B5(i);
  c === -1 || !_5(i) || (c === 0 ? r.push(i) : a.push({
   documentOrder: s,
   tabIndex: c,
   node: i
  }))
 }), a.sort((i, s) => i.tabIndex === s.tabIndex ? i.documentOrder - s.documentOrder : i.tabIndex - s.tabIndex).map(i => i.node).concat(r)
}

function I5() {
 return !0
}

function P5(e) {
 const {
  children: r,
  disableAutoFocus: a = !1,
  disableEnforceFocus: i = !1,
  disableRestoreFocus: s = !1,
  getTabbable: c = U5,
  isEnabled: d = I5,
  open: f
 } = e, h = y.useRef(!1), m = y.useRef(null), g = y.useRef(null), b = y.useRef(null), w = y.useRef(null), R = y.useRef(!1), T = y.useRef(null), C = tn(Ca(r), T), D = y.useRef(null);
 y.useEffect(() => {
  !f || !T.current || (R.current = !a)
 }, [a, f]), y.useEffect(() => {
  if (!f || !T.current) return;
  const E = sn(T.current);
  return T.current.contains(E.activeElement) || (T.current.hasAttribute("tabIndex") || T.current.setAttribute("tabIndex", "-1"), R.current && T.current.focus()), () => {
   s || (b.current && b.current.focus && (h.current = !0, b.current.focus()), b.current = null)
  }
 }, [f]), y.useEffect(() => {
  if (!f || !T.current) return;
  const E = sn(T.current),
   A = U => {
    D.current = U, !(i || !d() || U.key !== "Tab") && E.activeElement === T.current && U.shiftKey && (h.current = !0, g.current && g.current.focus())
   },
   O = () => {
    var G, S;
    const U = T.current;
    if (U === null) return;
    if (!E.hasFocus() || !d() || h.current) {
     h.current = !1;
     return
    }
    if (U.contains(E.activeElement) || i && E.activeElement !== m.current && E.activeElement !== g.current) return;
    if (E.activeElement !== w.current) w.current = null;
    else if (w.current !== null) return;
    if (!R.current) return;
    let _ = [];
    if ((E.activeElement === m.current || E.activeElement === g.current) && (_ = c(T.current)), _.length > 0) {
     const $ = !!((G = D.current) != null && G.shiftKey && ((S = D.current) == null ? void 0 : S.key) === "Tab"),
      H = _[0],
      V = _[_.length - 1];
     typeof H != "string" && typeof V != "string" && ($ ? V.focus() : H.focus())
    } else U.focus()
   };
  E.addEventListener("focusin", O), E.addEventListener("keydown", A, !0);
  const L = setInterval(() => {
   E.activeElement && E.activeElement.tagName === "BODY" && O()
  }, 50);
  return () => {
   clearInterval(L), E.removeEventListener("focusin", O), E.removeEventListener("keydown", A, !0)
  }
 }, [a, i, s, d, f, c]);
 const k = E => {
   b.current === null && (b.current = E.relatedTarget), R.current = !0, w.current = E.target;
   const A = r.props.onFocus;
   A && A(E)
  },
  N = E => {
   b.current === null && (b.current = E.relatedTarget), R.current = !0
  };
 return v.jsxs(y.Fragment, {
  children: [v.jsx("div", {
   tabIndex: f ? 0 : -1,
   onFocus: N,
   ref: m,
   "data-testid": "sentinelStart"
  }), y.cloneElement(r, {
   ref: C,
   onFocus: k
  }), v.jsx("div", {
   tabIndex: f ? 0 : -1,
   onFocus: N,
   ref: g,
   "data-testid": "sentinelEnd"
  })]
 })
}

function H5(e) {
 return typeof e == "function" ? e() : e
}

function q5(e) {
 return e ? e.props.hasOwnProperty("in") : !1
}
const nb = () => {},
 Kc = new N5;

function V5(e) {
 const {
  container: r,
  disableEscapeKeyDown: a = !1,
  disableScrollLock: i = !1,
  closeAfterTransition: s = !1,
  onTransitionEnter: c,
  onTransitionExited: d,
  children: f,
  onClose: h,
  open: m,
  rootRef: g
 } = e, b = y.useRef({}), w = y.useRef(null), R = y.useRef(null), T = tn(R, g), [C, D] = y.useState(!m), k = q5(f);
 let N = !0;
 (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (N = !1);
 const E = () => sn(w.current),
  A = () => (b.current.modalRef = R.current, b.current.mount = w.current, b.current),
  O = () => {
   Kc.mount(A(), {
    disableScrollLock: i
   }), R.current && (R.current.scrollTop = 0)
  },
  L = kn(() => {
   const W = H5(r) || E().body;
   Kc.add(A(), W), R.current && O()
  }),
  U = () => Kc.isTopModal(A()),
  _ = kn(W => {
   w.current = W, W && (m && U() ? O() : R.current && es(R.current, N))
  }),
  G = y.useCallback(() => {
   Kc.remove(A(), N)
  }, [N]);
 y.useEffect(() => () => {
  G()
 }, [G]), y.useEffect(() => {
  m ? L() : (!k || !s) && G()
 }, [m, G, k, s, L]);
 const S = W => z => {
   var I;
   (I = W.onKeyDown) == null || I.call(W, z), !(z.key !== "Escape" || z.which === 229 || !U()) && (a || (z.stopPropagation(), h && h(z, "escapeKeyDown")))
  },
  $ = W => z => {
   var I;
   (I = W.onClick) == null || I.call(W, z), z.target === z.currentTarget && h && h(z, "backdropClick")
  };
 return {
  getRootProps: (W = {}) => {
   const z = ha(e);
   delete z.onTransitionEnter, delete z.onTransitionExited;
   const I = {
    ...z,
    ...W
   };
   return {
    role: "presentation",
    ...I,
    onKeyDown: S(I),
    ref: T
   }
  },
  getBackdropProps: (W = {}) => {
   const z = W;
   return {
    "aria-hidden": !0,
    ...z,
    onClick: $(z),
    open: m
   }
  },
  getTransitionProps: () => {
   const W = () => {
     D(!1), c && c()
    },
    z = () => {
     D(!0), d && d(), s && G()
    };
   return {
    onEnter: g0(W, (f == null ? void 0 : f.props.onEnter) ?? nb),
    onExited: g0(z, (f == null ? void 0 : f.props.onExited) ?? nb)
   }
  },
  rootRef: T,
  portalRef: _,
  isTopModal: U,
  exited: C,
  hasTransition: k
 }
}

function G5(e) {
 return Ue("MuiModal", e)
}
Ve("MuiModal", ["root", "hidden", "backdrop"]);
const Y5 = e => {
  const {
   open: r,
   exited: a,
   classes: i
  } = e;
  return Ie({
   root: ["root", !r && a && "hidden"],
   backdrop: ["backdrop"]
  }, G5, i)
 },
 X5 = pe("div", {
  name: "MuiModal",
  slot: "Root",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.root, !a.open && a.exited && r.hidden]
  }
 })(Ye(({
  theme: e
 }) => ({
  position: "fixed",
  zIndex: (e.vars || e).zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  variants: [{
   props: ({
    ownerState: r
   }) => !r.open && r.exited,
   style: {
    visibility: "hidden"
   }
  }]
 }))),
 W5 = pe(F1, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, r) => r.backdrop
 })({
  zIndex: -1
 }),
 Z1 = y.forwardRef(function(r, a) {
  const i = Ge({
    name: "MuiModal",
    props: r
   }),
   {
    BackdropComponent: s = W5,
    BackdropProps: c,
    classes: d,
    className: f,
    closeAfterTransition: h = !1,
    children: m,
    container: g,
    component: b,
    components: w = {},
    componentsProps: R = {},
    disableAutoFocus: T = !1,
    disableEnforceFocus: C = !1,
    disableEscapeKeyDown: D = !1,
    disablePortal: k = !1,
    disableRestoreFocus: N = !1,
    disableScrollLock: E = !1,
    hideBackdrop: A = !1,
    keepMounted: O = !1,
    onClose: L,
    onTransitionEnter: U,
    onTransitionExited: _,
    open: G,
    slotProps: S = {},
    slots: $ = {},
    theme: H,
    ...V
   } = i,
   X = {
    ...i,
    closeAfterTransition: h,
    disableAutoFocus: T,
    disableEnforceFocus: C,
    disableEscapeKeyDown: D,
    disablePortal: k,
    disableRestoreFocus: N,
    disableScrollLock: E,
    hideBackdrop: A,
    keepMounted: O
   },
   {
    getRootProps: W,
    getBackdropProps: z,
    getTransitionProps: I,
    portalRef: Q,
    isTopModal: Z,
    exited: j,
    hasTransition: q
   } = V5({
    ...X,
    rootRef: a
   }),
   ee = {
    ...X,
    exited: j
   },
   ne = Y5(ee),
   ce = {};
  if (m.props.tabIndex === void 0 && (ce.tabIndex = "-1"), q) {
   const {
    onEnter: fe,
    onExited: Oe
   } = I();
   ce.onEnter = fe, ce.onExited = Oe
  }
  const le = {
    slots: {
     root: w.Root,
     backdrop: w.Backdrop,
     ...$
    },
    slotProps: {
     ...R,
     ...S
    }
   },
   [re, ye] = et("root", {
    ref: a,
    elementType: X5,
    externalForwardedProps: {
     ...le,
     ...V,
     component: b
    },
    getSlotProps: W,
    ownerState: ee,
    className: Ae(f, ne == null ? void 0 : ne.root, !ee.open && ee.exited && (ne == null ? void 0 : ne.hidden))
   }),
   [ge, Te] = et("backdrop", {
    ref: c == null ? void 0 : c.ref,
    elementType: s,
    externalForwardedProps: le,
    shouldForwardComponentProp: !0,
    additionalProps: c,
    getSlotProps: fe => z({
     ...fe,
     onClick: Oe => {
      fe != null && fe.onClick && fe.onClick(Oe)
     }
    }),
    className: Ae(c == null ? void 0 : c.className, ne == null ? void 0 : ne.backdrop),
    ownerState: ee
   });
  return !O && !G && (!q || j) ? null : v.jsx(X1, {
   ref: Q,
   container: g,
   disablePortal: k,
   children: v.jsxs(re, {
    ...ye,
    children: [!A && s ? v.jsx(ge, {
     ...Te
    }) : null, v.jsx(P5, {
     disableEnforceFocus: C,
     disableAutoFocus: T,
     disableRestoreFocus: N,
     isEnabled: Z,
     open: G,
     children: y.cloneElement(m, ce)
    })]
   })
  })
 });

function F5(e) {
 return Ue("MuiDialog", e)
}
const jp = Ve("MuiDialog", ["root", "scrollPaper", "scrollBody", "container", "paper", "paperScrollPaper", "paperScrollBody", "paperWidthFalse", "paperWidthXs", "paperWidthSm", "paperWidthMd", "paperWidthLg", "paperWidthXl", "paperFullWidth", "paperFullScreen"]),
 J1 = y.createContext({}),
 K5 = pe(F1, {
  name: "MuiDialog",
  slot: "Backdrop",
  overrides: (e, r) => r.backdrop
 })({
  zIndex: -1
 }),
 Q5 = e => {
  const {
   classes: r,
   scroll: a,
   maxWidth: i,
   fullWidth: s,
   fullScreen: c
  } = e, d = {
   root: ["root"],
   container: ["container", `scroll${Ce(a)}`],
   paper: ["paper", `paperScroll${Ce(a)}`, `paperWidth${Ce(String(i))}`, s && "paperFullWidth", c && "paperFullScreen"]
  };
  return Ie(d, F5, r)
 },
 Z5 = pe(Z1, {
  name: "MuiDialog",
  slot: "Root",
  overridesResolver: (e, r) => r.root
 })({
  "@media print": {
   position: "absolute !important"
  }
 }),
 J5 = pe("div", {
  name: "MuiDialog",
  slot: "Container",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.container, r[`scroll${Ce(a.scroll)}`]]
  }
 })({
  height: "100%",
  "@media print": {
   height: "auto"
  },
  outline: 0,
  variants: [{
   props: {
    scroll: "paper"
   },
   style: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
   }
  }, {
   props: {
    scroll: "body"
   },
   style: {
    overflowY: "auto",
    overflowX: "hidden",
    textAlign: "center",
    "&::after": {
     content: '""',
     display: "inline-block",
     verticalAlign: "middle",
     height: "100%",
     width: "0"
    }
   }
  }]
 }),
 eO = pe(Gr, {
  name: "MuiDialog",
  slot: "Paper",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.paper, r[`scrollPaper${Ce(a.scroll)}`], r[`paperWidth${Ce(String(a.maxWidth))}`], a.fullWidth && r.paperFullWidth, a.fullScreen && r.paperFullScreen]
  }
 })(Ye(({
  theme: e
 }) => ({
  margin: 32,
  position: "relative",
  overflowY: "auto",
  "@media print": {
   overflowY: "visible",
   boxShadow: "none"
  },
  variants: [{
   props: {
    scroll: "paper"
   },
   style: {
    display: "flex",
    flexDirection: "column",
    maxHeight: "calc(100% - 64px)"
   }
  }, {
   props: {
    scroll: "body"
   },
   style: {
    display: "inline-block",
    verticalAlign: "middle",
    textAlign: "initial"
   }
  }, {
   props: ({
    ownerState: r
   }) => !r.maxWidth,
   style: {
    maxWidth: "calc(100% - 64px)"
   }
  }, {
   props: {
    maxWidth: "xs"
   },
   style: {
    maxWidth: e.breakpoints.unit === "px" ? Math.max(e.breakpoints.values.xs, 444) : `max(${e.breakpoints.values.xs}${e.breakpoints.unit}, 444px)`,
    [`&.${jp.paperScrollBody}`]: {
     [e.breakpoints.down(Math.max(e.breakpoints.values.xs, 444) + 32 * 2)]: {
      maxWidth: "calc(100% - 64px)"
     }
    }
   }
  }, ...Object.keys(e.breakpoints.values).filter(r => r !== "xs").map(r => ({
   props: {
    maxWidth: r
   },
   style: {
    maxWidth: `${e.breakpoints.values[r]}${e.breakpoints.unit}`,
    [`&.${jp.paperScrollBody}`]: {
     [e.breakpoints.down(e.breakpoints.values[r] + 32 * 2)]: {
      maxWidth: "calc(100% - 64px)"
     }
    }
   }
  })), {
   props: ({
    ownerState: r
   }) => r.fullWidth,
   style: {
    width: "calc(100% - 64px)"
   }
  }, {
   props: ({
    ownerState: r
   }) => r.fullScreen,
   style: {
    margin: 0,
    width: "100%",
    maxWidth: "100%",
    height: "100%",
    maxHeight: "none",
    borderRadius: 0,
    [`&.${jp.paperScrollBody}`]: {
     margin: 0,
     maxWidth: "100%"
    }
   }
  }]
 }))),
 gi = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiDialog"
   }),
   s = Ho(),
   c = {
    enter: s.transitions.duration.enteringScreen,
    exit: s.transitions.duration.leavingScreen
   },
   {
    "aria-describedby": d,
    "aria-labelledby": f,
    "aria-modal": h = !0,
    BackdropComponent: m,
    BackdropProps: g,
    children: b,
    className: w,
    disableEscapeKeyDown: R = !1,
    fullScreen: T = !1,
    fullWidth: C = !1,
    maxWidth: D = "sm",
    onClick: k,
    onClose: N,
    open: E,
    PaperComponent: A = Gr,
    PaperProps: O = {},
    scroll: L = "paper",
    slots: U = {},
    slotProps: _ = {},
    TransitionComponent: G = ps,
    transitionDuration: S = c,
    TransitionProps: $,
    ...H
   } = i,
   V = {
    ...i,
    disableEscapeKeyDown: R,
    fullScreen: T,
    fullWidth: C,
    maxWidth: D,
    scroll: L
   },
   X = Q5(V),
   W = y.useRef(),
   z = Se => {
    W.current = Se.target === Se.currentTarget
   },
   I = Se => {
    k && k(Se), W.current && (W.current = null, N && N(Se, "backdropClick"))
   },
   Q = $i(f),
   Z = y.useMemo(() => ({
    titleId: Q
   }), [Q]),
   j = {
    transition: G,
    ...U
   },
   q = {
    transition: $,
    paper: O,
    backdrop: g,
    ..._
   },
   ee = {
    slots: j,
    slotProps: q
   },
   [ne, ce] = et("root", {
    elementType: Z5,
    shouldForwardComponentProp: !0,
    externalForwardedProps: ee,
    ownerState: V,
    className: Ae(X.root, w),
    ref: a
   }),
   [le, re] = et("backdrop", {
    elementType: K5,
    shouldForwardComponentProp: !0,
    externalForwardedProps: ee,
    ownerState: V
   }),
   [ye, ge] = et("paper", {
    elementType: eO,
    shouldForwardComponentProp: !0,
    externalForwardedProps: ee,
    ownerState: V,
    className: Ae(X.paper, O.className)
   }),
   [Te, fe] = et("container", {
    elementType: J5,
    externalForwardedProps: ee,
    ownerState: V,
    className: Ae(X.container)
   }),
   [Oe, we] = et("transition", {
    elementType: ps,
    externalForwardedProps: ee,
    ownerState: V,
    additionalProps: {
     appear: !0,
     in: E,
     timeout: S,
     role: "presentation"
    }
   });
  return v.jsx(ne, {
   closeAfterTransition: !0,
   slots: {
    backdrop: le
   },
   slotProps: {
    backdrop: {
     transitionDuration: S,
     as: m,
     ...re
    }
   },
   disableEscapeKeyDown: R,
   onClose: N,
   open: E,
   onClick: I,
   ...ce,
   ...H,
   children: v.jsx(Oe, {
    ...we,
    children: v.jsx(Te, {
     onMouseDown: z,
     ...fe,
     children: v.jsx(ye, {
      as: A,
      elevation: 24,
      role: "dialog",
      "aria-describedby": d,
      "aria-labelledby": Q,
      "aria-modal": h,
      ...ge,
      children: v.jsx(J1.Provider, {
       value: Z,
       children: b
      })
     })
    })
   })
  })
 });

function tO(e) {
 return Ue("MuiDialogActions", e)
}
Ve("MuiDialogActions", ["root", "spacing"]);
const nO = e => {
  const {
   classes: r,
   disableSpacing: a
  } = e;
  return Ie({
   root: ["root", !a && "spacing"]
  }, tO, r)
 },
 rO = pe("div", {
  name: "MuiDialogActions",
  slot: "Root",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.root, !a.disableSpacing && r.spacing]
  }
 })({
  display: "flex",
  alignItems: "center",
  padding: 8,
  justifyContent: "flex-end",
  flex: "0 0 auto",
  variants: [{
   props: ({
    ownerState: e
   }) => !e.disableSpacing,
   style: {
    "& > :not(style) ~ :not(style)": {
     marginLeft: 8
    }
   }
  }]
 }),
 vi = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiDialogActions"
   }),
   {
    className: s,
    disableSpacing: c = !1,
    ...d
   } = i,
   f = {
    ...i,
    disableSpacing: c
   },
   h = nO(f);
  return v.jsx(rO, {
   className: Ae(h.root, s),
   ownerState: f,
   ref: a,
   ...d
  })
 });

function oO(e) {
 return Ue("MuiDialogContent", e)
}
Ve("MuiDialogContent", ["root", "dividers"]);

function aO(e) {
 return Ue("MuiDialogTitle", e)
}
const iO = Ve("MuiDialogTitle", ["root"]),
 lO = e => {
  const {
   classes: r,
   dividers: a
  } = e;
  return Ie({
   root: ["root", a && "dividers"]
  }, oO, r)
 },
 sO = pe("div", {
  name: "MuiDialogContent",
  slot: "Root",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.root, a.dividers && r.dividers]
  }
 })(Ye(({
  theme: e
 }) => ({
  flex: "1 1 auto",
  WebkitOverflowScrolling: "touch",
  overflowY: "auto",
  padding: "20px 24px",
  variants: [{
   props: ({
    ownerState: r
   }) => r.dividers,
   style: {
    padding: "16px 24px",
    borderTop: `1px solid ${(e.vars||e).palette.divider}`,
    borderBottom: `1px solid ${(e.vars||e).palette.divider}`
   }
  }, {
   props: ({
    ownerState: r
   }) => !r.dividers,
   style: {
    [`.${iO.root} + &`]: {
     paddingTop: 0
    }
   }
  }]
 }))),
 yi = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiDialogContent"
   }),
   {
    className: s,
    dividers: c = !1,
    ...d
   } = i,
   f = {
    ...i,
    dividers: c
   },
   h = lO(f);
  return v.jsx(sO, {
   className: Ae(h.root, s),
   ownerState: f,
   ref: a,
   ...d
  })
 });

function cO(e) {
 return Ue("MuiDialogContentText", e)
}
Ve("MuiDialogContentText", ["root"]);
const uO = e => {
  const {
   classes: r
  } = e, i = Ie({
   root: ["root"]
  }, cO, r);
  return {
   ...r,
   ...i
  }
 },
 dO = pe(_t, {
  shouldForwardProp: e => zn(e) || e === "classes",
  name: "MuiDialogContentText",
  slot: "Root",
  overridesResolver: (e, r) => r.root
 })({}),
 Qc = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiDialogContentText"
   }),
   {
    children: s,
    className: c,
    ...d
   } = i,
   f = uO(d);
  return v.jsx(dO, {
   component: "p",
   variant: "body1",
   color: "textSecondary",
   ref: a,
   ownerState: d,
   className: Ae(f.root, c),
   ...i,
   classes: f
  })
 }),
 fO = e => {
  const {
   classes: r
  } = e;
  return Ie({
   root: ["root"]
  }, aO, r)
 },
 pO = pe(_t, {
  name: "MuiDialogTitle",
  slot: "Root",
  overridesResolver: (e, r) => r.root
 })({
  padding: "16px 24px",
  flex: "0 0 auto"
 }),
 bi = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiDialogTitle"
   }),
   {
    className: s,
    id: c,
    ...d
   } = i,
   f = i,
   h = fO(f),
   {
    titleId: m = c
   } = y.useContext(J1);
  return v.jsx(pO, {
   component: "h2",
   className: Ae(h.root, s),
   ownerState: f,
   ref: a,
   variant: "h6",
   id: c ?? m,
   ...d
  })
 });

function hO(e) {
 return Ue("MuiDivider", e)
}
const rb = Ve("MuiDivider", ["root", "absolute", "fullWidth", "inset", "middle", "flexItem", "light", "vertical", "withChildren", "withChildrenVertical", "textAlignRight", "textAlignLeft", "wrapper", "wrapperVertical"]),
 mO = e => {
  const {
   absolute: r,
   children: a,
   classes: i,
   flexItem: s,
   light: c,
   orientation: d,
   textAlign: f,
   variant: h
  } = e;
  return Ie({
   root: ["root", r && "absolute", h, c && "light", d === "vertical" && "vertical", s && "flexItem", a && "withChildren", a && d === "vertical" && "withChildrenVertical", f === "right" && d !== "vertical" && "textAlignRight", f === "left" && d !== "vertical" && "textAlignLeft"],
   wrapper: ["wrapper", d === "vertical" && "wrapperVertical"]
  }, hO, i)
 },
 gO = pe("div", {
  name: "MuiDivider",
  slot: "Root",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.root, a.absolute && r.absolute, r[a.variant], a.light && r.light, a.orientation === "vertical" && r.vertical, a.flexItem && r.flexItem, a.children && r.withChildren, a.children && a.orientation === "vertical" && r.withChildrenVertical, a.textAlign === "right" && a.orientation !== "vertical" && r.textAlignRight, a.textAlign === "left" && a.orientation !== "vertical" && r.textAlignLeft]
  }
 })(Ye(({
  theme: e
 }) => ({
  margin: 0,
  flexShrink: 0,
  borderWidth: 0,
  borderStyle: "solid",
  borderColor: (e.vars || e).palette.divider,
  borderBottomWidth: "thin",
  variants: [{
   props: {
    absolute: !0
   },
   style: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%"
   }
  }, {
   props: {
    light: !0
   },
   style: {
    borderColor: e.vars ? `rgba(${e.vars.palette.dividerChannel} / 0.08)` : Qt(e.palette.divider, .08)
   }
  }, {
   props: {
    variant: "inset"
   },
   style: {
    marginLeft: 72
   }
  }, {
   props: {
    variant: "middle",
    orientation: "horizontal"
   },
   style: {
    marginLeft: e.spacing(2),
    marginRight: e.spacing(2)
   }
  }, {
   props: {
    variant: "middle",
    orientation: "vertical"
   },
   style: {
    marginTop: e.spacing(1),
    marginBottom: e.spacing(1)
   }
  }, {
   props: {
    orientation: "vertical"
   },
   style: {
    height: "100%",
    borderBottomWidth: 0,
    borderRightWidth: "thin"
   }
  }, {
   props: {
    flexItem: !0
   },
   style: {
    alignSelf: "stretch",
    height: "auto"
   }
  }, {
   props: ({
    ownerState: r
   }) => !!r.children,
   style: {
    display: "flex",
    textAlign: "center",
    border: 0,
    borderTopStyle: "solid",
    borderLeftStyle: "solid",
    "&::before, &::after": {
     content: '""',
     alignSelf: "center"
    }
   }
  }, {
   props: ({
    ownerState: r
   }) => r.children && r.orientation !== "vertical",
   style: {
    "&::before, &::after": {
     width: "100%",
     borderTop: `thin solid ${(e.vars||e).palette.divider}`,
     borderTopStyle: "inherit"
    }
   }
  }, {
   props: ({
    ownerState: r
   }) => r.orientation === "vertical" && r.children,
   style: {
    flexDirection: "column",
    "&::before, &::after": {
     height: "100%",
     borderLeft: `thin solid ${(e.vars||e).palette.divider}`,
     borderLeftStyle: "inherit"
    }
   }
  }, {
   props: ({
    ownerState: r
   }) => r.textAlign === "right" && r.orientation !== "vertical",
   style: {
    "&::before": {
     width: "90%"
    },
    "&::after": {
     width: "10%"
    }
   }
  }, {
   props: ({
    ownerState: r
   }) => r.textAlign === "left" && r.orientation !== "vertical",
   style: {
    "&::before": {
     width: "10%"
    },
    "&::after": {
     width: "90%"
    }
   }
  }]
 }))),
 vO = pe("span", {
  name: "MuiDivider",
  slot: "Wrapper",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.wrapper, a.orientation === "vertical" && r.wrapperVertical]
  }
 })(Ye(({
  theme: e
 }) => ({
  display: "inline-block",
  paddingLeft: `calc(${e.spacing(1)} * 1.2)`,
  paddingRight: `calc(${e.spacing(1)} * 1.2)`,
  whiteSpace: "nowrap",
  variants: [{
   props: {
    orientation: "vertical"
   },
   style: {
    paddingTop: `calc(${e.spacing(1)} * 1.2)`,
    paddingBottom: `calc(${e.spacing(1)} * 1.2)`
   }
  }]
 }))),
 hs = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiDivider"
   }),
   {
    absolute: s = !1,
    children: c,
    className: d,
    orientation: f = "horizontal",
    component: h = c || f === "vertical" ? "div" : "hr",
    flexItem: m = !1,
    light: g = !1,
    role: b = h !== "hr" ? "separator" : void 0,
    textAlign: w = "center",
    variant: R = "fullWidth",
    ...T
   } = i,
   C = {
    ...i,
    absolute: s,
    component: h,
    flexItem: m,
    light: g,
    orientation: f,
    role: b,
    textAlign: w,
    variant: R
   },
   D = mO(C);
  return v.jsx(gO, {
   as: h,
   className: Ae(D.root, d),
   role: b,
   ref: a,
   ownerState: C,
   "aria-orientation": b === "separator" && (h !== "hr" || f === "vertical") ? f : void 0,
   ...T,
   children: c ? v.jsx(vO, {
    className: D.wrapper,
    ownerState: C,
    children: c
   }) : null
  })
 });
hs && (hs.muiSkipListHighlight = !0);
const yO = e => {
  const {
   classes: r,
   disableUnderline: a,
   startAdornment: i,
   endAdornment: s,
   size: c,
   hiddenLabel: d,
   multiline: f
  } = e, h = {
   root: ["root", !a && "underline", i && "adornedStart", s && "adornedEnd", c === "small" && `size${Ce(c)}`, d && "hiddenLabel", f && "multiline"],
   input: ["input"]
  }, m = Ie(h, TM, r);
  return {
   ...r,
   ...m
  }
 },
 bO = pe(Fu, {
  shouldForwardProp: e => zn(e) || e === "classes",
  name: "MuiFilledInput",
  slot: "Root",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [...Xu(e, r), !a.disableUnderline && r.underline]
  }
 })(Ye(({
  theme: e
 }) => {
  const r = e.palette.mode === "light",
   a = r ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)",
   i = r ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.09)",
   s = r ? "rgba(0, 0, 0, 0.09)" : "rgba(255, 255, 255, 0.13)",
   c = r ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)";
  return {
   position: "relative",
   backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : i,
   borderTopLeftRadius: (e.vars || e).shape.borderRadius,
   borderTopRightRadius: (e.vars || e).shape.borderRadius,
   transition: e.transitions.create("background-color", {
    duration: e.transitions.duration.shorter,
    easing: e.transitions.easing.easeOut
   }),
   "&:hover": {
    backgroundColor: e.vars ? e.vars.palette.FilledInput.hoverBg : s,
    "@media (hover: none)": {
     backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : i
    }
   },
   [`&.${sa.focused}`]: {
    backgroundColor: e.vars ? e.vars.palette.FilledInput.bg : i
   },
   [`&.${sa.disabled}`]: {
    backgroundColor: e.vars ? e.vars.palette.FilledInput.disabledBg : c
   },
   variants: [{
    props: ({
     ownerState: d
    }) => !d.disableUnderline,
    style: {
     "&::after": {
      left: 0,
      bottom: 0,
      content: '""',
      position: "absolute",
      right: 0,
      transform: "scaleX(0)",
      transition: e.transitions.create("transform", {
       duration: e.transitions.duration.shorter,
       easing: e.transitions.easing.easeOut
      }),
      pointerEvents: "none"
     },
     [`&.${sa.focused}:after`]: {
      transform: "scaleX(1) translateX(0)"
     },
     [`&.${sa.error}`]: {
      "&::before, &::after": {
       borderBottomColor: (e.vars || e).palette.error.main
      }
     },
     "&::before": {
      borderBottom: `1px solid ${e.vars?`rgba(${e.vars.palette.common.onBackgroundChannel} / ${e.vars.opacity.inputUnderline})`:a}`,
      left: 0,
      bottom: 0,
      content: '"\\00a0"',
      position: "absolute",
      right: 0,
      transition: e.transitions.create("border-bottom-color", {
       duration: e.transitions.duration.shorter
      }),
      pointerEvents: "none"
     },
     [`&:hover:not(.${sa.disabled}, .${sa.error}):before`]: {
      borderBottom: `1px solid ${(e.vars||e).palette.text.primary}`
     },
     [`&.${sa.disabled}:before`]: {
      borderBottomStyle: "dotted"
     }
    }
   }, ...Object.entries(e.palette).filter(Rn()).map(([d]) => {
    var f;
    return {
     props: {
      disableUnderline: !1,
      color: d
     },
     style: {
      "&::after": {
       borderBottom: `2px solid ${(f=(e.vars||e).palette[d])==null?void 0:f.main}`
      }
     }
    }
   }), {
    props: ({
     ownerState: d
    }) => d.startAdornment,
    style: {
     paddingLeft: 12
    }
   }, {
    props: ({
     ownerState: d
    }) => d.endAdornment,
    style: {
     paddingRight: 12
    }
   }, {
    props: ({
     ownerState: d
    }) => d.multiline,
    style: {
     padding: "25px 12px 8px"
    }
   }, {
    props: ({
     ownerState: d,
     size: f
    }) => d.multiline && f === "small",
    style: {
     paddingTop: 21,
     paddingBottom: 4
    }
   }, {
    props: ({
     ownerState: d
    }) => d.multiline && d.hiddenLabel,
    style: {
     paddingTop: 16,
     paddingBottom: 17
    }
   }, {
    props: ({
     ownerState: d
    }) => d.multiline && d.hiddenLabel && d.size === "small",
    style: {
     paddingTop: 8,
     paddingBottom: 9
    }
   }]
  }
 })),
 xO = pe(Ku, {
  name: "MuiFilledInput",
  slot: "Input",
  overridesResolver: Wu
 })(Ye(({
  theme: e
 }) => ({
  paddingTop: 25,
  paddingRight: 12,
  paddingBottom: 8,
  paddingLeft: 12,
  ...!e.vars && {
   "&:-webkit-autofill": {
    WebkitBoxShadow: e.palette.mode === "light" ? null : "0 0 0 100px #266798 inset",
    WebkitTextFillColor: e.palette.mode === "light" ? null : "#fff",
    caretColor: e.palette.mode === "light" ? null : "#fff",
    borderTopLeftRadius: "inherit",
    borderTopRightRadius: "inherit"
   }
  },
  ...e.vars && {
   "&:-webkit-autofill": {
    borderTopLeftRadius: "inherit",
    borderTopRightRadius: "inherit"
   },
   [e.getColorSchemeSelector("dark")]: {
    "&:-webkit-autofill": {
     WebkitBoxShadow: "0 0 0 100px #266798 inset",
     WebkitTextFillColor: "#fff",
     caretColor: "#fff"
    }
   }
  },
  variants: [{
   props: {
    size: "small"
   },
   style: {
    paddingTop: 21,
    paddingBottom: 4
   }
  }, {
   props: ({
    ownerState: r
   }) => r.hiddenLabel,
   style: {
    paddingTop: 16,
    paddingBottom: 17
   }
  }, {
   props: ({
    ownerState: r
   }) => r.startAdornment,
   style: {
    paddingLeft: 0
   }
  }, {
   props: ({
    ownerState: r
   }) => r.endAdornment,
   style: {
    paddingRight: 0
   }
  }, {
   props: ({
    ownerState: r
   }) => r.hiddenLabel && r.size === "small",
   style: {
    paddingTop: 8,
    paddingBottom: 9
   }
  }, {
   props: ({
    ownerState: r
   }) => r.multiline,
   style: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0
   }
  }]
 }))),
 Gh = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiFilledInput"
   }),
   {
    disableUnderline: s = !1,
    components: c = {},
    componentsProps: d,
    fullWidth: f = !1,
    hiddenLabel: h,
    inputComponent: m = "input",
    multiline: g = !1,
    slotProps: b,
    slots: w = {},
    type: R = "text",
    ...T
   } = i,
   C = {
    ...i,
    disableUnderline: s,
    fullWidth: f,
    inputComponent: m,
    multiline: g,
    type: R
   },
   D = yO(i),
   k = {
    root: {
     ownerState: C
    },
    input: {
     ownerState: C
    }
   },
   N = b ?? d ? bn(k, b ?? d) : k,
   E = w.root ?? c.Root ?? bO,
   A = w.input ?? c.Input ?? xO;
  return v.jsx(Vh, {
   slots: {
    root: E,
    input: A
   },
   slotProps: N,
   fullWidth: f,
   inputComponent: m,
   multiline: g,
   ref: a,
   type: R,
   ...T,
   classes: D
  })
 });
Gh.muiName = "Input";

function SO(e) {
 return Ue("MuiFormControl", e)
}
Ve("MuiFormControl", ["root", "marginNone", "marginNormal", "marginDense", "fullWidth", "disabled"]);
const CO = e => {
  const {
   classes: r,
   margin: a,
   fullWidth: i
  } = e, s = {
   root: ["root", a !== "none" && `margin${Ce(a)}`, i && "fullWidth"]
  };
  return Ie(s, SO, r)
 },
 wO = pe("div", {
  name: "MuiFormControl",
  slot: "Root",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.root, r[`margin${Ce(a.margin)}`], a.fullWidth && r.fullWidth]
  }
 })({
  display: "inline-flex",
  flexDirection: "column",
  position: "relative",
  minWidth: 0,
  padding: 0,
  margin: 0,
  border: 0,
  verticalAlign: "top",
  variants: [{
   props: {
    margin: "normal"
   },
   style: {
    marginTop: 16,
    marginBottom: 8
   }
  }, {
   props: {
    margin: "dense"
   },
   style: {
    marginTop: 8,
    marginBottom: 4
   }
  }, {
   props: {
    fullWidth: !0
   },
   style: {
    width: "100%"
   }
  }]
 }),
 ex = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiFormControl"
   }),
   {
    children: s,
    className: c,
    color: d = "primary",
    component: f = "div",
    disabled: h = !1,
    error: m = !1,
    focused: g,
    fullWidth: b = !1,
    hiddenLabel: w = !1,
    margin: R = "none",
    required: T = !1,
    size: C = "medium",
    variant: D = "outlined",
    ...k
   } = i,
   N = {
    ...i,
    color: d,
    component: f,
    disabled: h,
    error: m,
    fullWidth: b,
    hiddenLabel: w,
    margin: R,
    required: T,
    size: C,
    variant: D
   },
   E = CO(N),
   [A, O] = y.useState(() => {
    let W = !1;
    return s && y.Children.forEach(s, z => {
     if (!wp(z, ["Input", "Select"])) return;
     const I = wp(z, ["Select"]) ? z.props.input : z;
     I && SM(I.props) && (W = !0)
    }), W
   }),
   [L, U] = y.useState(() => {
    let W = !1;
    return s && y.Children.forEach(s, z => {
     wp(z, ["Input", "Select"]) && (Cu(z.props, !0) || Cu(z.props.inputProps, !0)) && (W = !0)
    }), W
   }),
   [_, G] = y.useState(!1);
  h && _ && G(!1);
  const S = g !== void 0 && !h ? g : _;
  let $;
  y.useRef(!1);
  const H = y.useCallback(() => {
    U(!0)
   }, []),
   V = y.useCallback(() => {
    U(!1)
   }, []),
   X = y.useMemo(() => ({
    adornedStart: A,
    setAdornedStart: O,
    color: d,
    disabled: h,
    error: m,
    filled: L,
    focused: S,
    fullWidth: b,
    hiddenLabel: w,
    size: C,
    onBlur: () => {
     G(!1)
    },
    onFocus: () => {
     G(!0)
    },
    onEmpty: V,
    onFilled: H,
    registerEffect: $,
    required: T,
    variant: D
   }), [A, d, h, m, L, S, b, w, $, V, H, T, C, D]);
  return v.jsx(Yu.Provider, {
   value: X,
   children: v.jsx(wO, {
    as: f,
    ownerState: N,
    className: Ae(E.root, c),
    ref: a,
    ...k,
    children: s
   })
  })
 });

function RO(e) {
 return Ue("MuiFormControlLabel", e)
}
const Fl = Ve("MuiFormControlLabel", ["root", "labelPlacementStart", "labelPlacementTop", "labelPlacementBottom", "disabled", "label", "error", "required", "asterisk"]),
 EO = e => {
  const {
   classes: r,
   disabled: a,
   labelPlacement: i,
   error: s,
   required: c
  } = e, d = {
   root: ["root", a && "disabled", `labelPlacement${Ce(i)}`, s && "error", c && "required"],
   label: ["label", a && "disabled"],
   asterisk: ["asterisk", s && "error"]
  };
  return Ie(d, RO, r)
 },
 TO = pe("label", {
  name: "MuiFormControlLabel",
  slot: "Root",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [{
    [`& .${Fl.label}`]: r.label
   }, r.root, r[`labelPlacement${Ce(a.labelPlacement)}`]]
  }
 })(Ye(({
  theme: e
 }) => ({
  display: "inline-flex",
  alignItems: "center",
  cursor: "pointer",
  verticalAlign: "middle",
  WebkitTapHighlightColor: "transparent",
  marginLeft: -11,
  marginRight: 16,
  [`&.${Fl.disabled}`]: {
   cursor: "default"
  },
  [`& .${Fl.label}`]: {
   [`&.${Fl.disabled}`]: {
    color: (e.vars || e).palette.text.disabled
   }
  },
  variants: [{
   props: {
    labelPlacement: "start"
   },
   style: {
    flexDirection: "row-reverse",
    marginRight: -11
   }
  }, {
   props: {
    labelPlacement: "top"
   },
   style: {
    flexDirection: "column-reverse"
   }
  }, {
   props: {
    labelPlacement: "bottom"
   },
   style: {
    flexDirection: "column"
   }
  }, {
   props: ({
    labelPlacement: r
   }) => r === "start" || r === "top" || r === "bottom",
   style: {
    marginLeft: 16
   }
  }]
 }))),
 AO = pe("span", {
  name: "MuiFormControlLabel",
  slot: "Asterisk",
  overridesResolver: (e, r) => r.asterisk
 })(Ye(({
  theme: e
 }) => ({
  [`&.${Fl.error}`]: {
   color: (e.vars || e).palette.error.main
  }
 }))),
 MO = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiFormControlLabel"
   }),
   {
    checked: s,
    className: c,
    componentsProps: d = {},
    control: f,
    disabled: h,
    disableTypography: m,
    inputRef: g,
    label: b,
    labelPlacement: w = "end",
    name: R,
    onChange: T,
    required: C,
    slots: D = {},
    slotProps: k = {},
    value: N,
    ...E
   } = i,
   A = ho(),
   O = h ?? f.props.disabled ?? (A == null ? void 0 : A.disabled),
   L = C ?? f.props.required,
   U = {
    disabled: O,
    required: L
   };
  ["checked", "name", "onChange", "value", "inputRef"].forEach(W => {
   typeof f.props[W] > "u" && typeof i[W] < "u" && (U[W] = i[W])
  });
  const _ = wa({
    props: i,
    muiFormControl: A,
    states: ["error"]
   }),
   G = {
    ...i,
    disabled: O,
    labelPlacement: w,
    required: L,
    error: _.error
   },
   S = EO(G),
   $ = {
    slots: D,
    slotProps: {
     ...d,
     ...k
    }
   },
   [H, V] = et("typography", {
    elementType: _t,
    externalForwardedProps: $,
    ownerState: G
   });
  let X = b;
  return X != null && X.type !== _t && !m && (X = v.jsx(H, {
   component: "span",
   ...V,
   className: Ae(S.label, V == null ? void 0 : V.className),
   children: X
  })), v.jsxs(TO, {
   className: Ae(S.root, c),
   ownerState: G,
   ref: a,
   ...E,
   children: [y.cloneElement(f, U), L ? v.jsxs("div", {
    children: [X, v.jsxs(AO, {
     ownerState: G,
     "aria-hidden": !0,
     className: S.asterisk,
     children: [" ", "*"]
    })]
   }) : X]
  })
 });

function OO(e) {
 return Ue("MuiFormHelperText", e)
}
const ob = Ve("MuiFormHelperText", ["root", "error", "disabled", "sizeSmall", "sizeMedium", "contained", "focused", "filled", "required"]);
var ab;
const DO = e => {
  const {
   classes: r,
   contained: a,
   size: i,
   disabled: s,
   error: c,
   filled: d,
   focused: f,
   required: h
  } = e, m = {
   root: ["root", s && "disabled", c && "error", i && `size${Ce(i)}`, a && "contained", f && "focused", d && "filled", h && "required"]
  };
  return Ie(m, OO, r)
 },
 kO = pe("p", {
  name: "MuiFormHelperText",
  slot: "Root",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.root, a.size && r[`size${Ce(a.size)}`], a.contained && r.contained, a.filled && r.filled]
  }
 })(Ye(({
  theme: e
 }) => ({
  color: (e.vars || e).palette.text.secondary,
  ...e.typography.caption,
  textAlign: "left",
  marginTop: 3,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  [`&.${ob.disabled}`]: {
   color: (e.vars || e).palette.text.disabled
  },
  [`&.${ob.error}`]: {
   color: (e.vars || e).palette.error.main
  },
  variants: [{
   props: {
    size: "small"
   },
   style: {
    marginTop: 4
   }
  }, {
   props: ({
    ownerState: r
   }) => r.contained,
   style: {
    marginLeft: 14,
    marginRight: 14
   }
  }]
 }))),
 zO = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiFormHelperText"
   }),
   {
    children: s,
    className: c,
    component: d = "p",
    disabled: f,
    error: h,
    filled: m,
    focused: g,
    margin: b,
    required: w,
    variant: R,
    ...T
   } = i,
   C = ho(),
   D = wa({
    props: i,
    muiFormControl: C,
    states: ["variant", "size", "disabled", "error", "filled", "focused", "required"]
   }),
   k = {
    ...i,
    component: d,
    contained: D.variant === "filled" || D.variant === "outlined",
    variant: D.variant,
    size: D.size,
    disabled: D.disabled,
    error: D.error,
    filled: D.filled,
    focused: D.focused,
    required: D.required
   };
  delete k.ownerState;
  const N = DO(k);
  return v.jsx(kO, {
   as: d,
   className: Ae(N.root, c),
   ref: a,
   ...T,
   ownerState: k,
   children: s === " " ? ab || (ab = v.jsx("span", {
    className: "notranslate",
    "aria-hidden": !0,
    children: "​"
   })) : s
  })
 });

function jO(e) {
 return Ue("MuiFormLabel", e)
}
const ts = Ve("MuiFormLabel", ["root", "colorSecondary", "focused", "disabled", "error", "filled", "required", "asterisk"]),
 NO = e => {
  const {
   classes: r,
   color: a,
   focused: i,
   disabled: s,
   error: c,
   filled: d,
   required: f
  } = e, h = {
   root: ["root", `color${Ce(a)}`, s && "disabled", c && "error", d && "filled", i && "focused", f && "required"],
   asterisk: ["asterisk", c && "error"]
  };
  return Ie(h, jO, r)
 },
 LO = pe("label", {
  name: "MuiFormLabel",
  slot: "Root",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.root, a.color === "secondary" && r.colorSecondary, a.filled && r.filled]
  }
 })(Ye(({
  theme: e
 }) => ({
  color: (e.vars || e).palette.text.secondary,
  ...e.typography.body1,
  lineHeight: "1.4375em",
  padding: 0,
  position: "relative",
  variants: [...Object.entries(e.palette).filter(Rn()).map(([r]) => ({
   props: {
    color: r
   },
   style: {
    [`&.${ts.focused}`]: {
     color: (e.vars || e).palette[r].main
    }
   }
  })), {
   props: {},
   style: {
    [`&.${ts.disabled}`]: {
     color: (e.vars || e).palette.text.disabled
    },
    [`&.${ts.error}`]: {
     color: (e.vars || e).palette.error.main
    }
   }
  }]
 }))),
 BO = pe("span", {
  name: "MuiFormLabel",
  slot: "Asterisk",
  overridesResolver: (e, r) => r.asterisk
 })(Ye(({
  theme: e
 }) => ({
  [`&.${ts.error}`]: {
   color: (e.vars || e).palette.error.main
  }
 }))),
 $O = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiFormLabel"
   }),
   {
    children: s,
    className: c,
    color: d,
    component: f = "label",
    disabled: h,
    error: m,
    filled: g,
    focused: b,
    required: w,
    ...R
   } = i,
   T = ho(),
   C = wa({
    props: i,
    muiFormControl: T,
    states: ["color", "required", "focused", "disabled", "error", "filled"]
   }),
   D = {
    ...i,
    color: C.color || "primary",
    component: f,
    disabled: C.disabled,
    error: C.error,
    filled: C.filled,
    focused: C.focused,
    required: C.required
   },
   k = NO(D);
  return v.jsxs(LO, {
   as: f,
   ownerState: D,
   className: Ae(k.root, c),
   ref: a,
   ...R,
   children: [s, C.required && v.jsxs(BO, {
    ownerState: D,
    "aria-hidden": !0,
    className: k.asterisk,
    children: [" ", "*"]
   })]
  })
 });

function lh(e) {
 return `scale(${e}, ${e**2})`
}
const _O = {
  entering: {
   opacity: 1,
   transform: lh(1)
  },
  entered: {
   opacity: 1,
   transform: "none"
  }
 },
 Np = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent),
 ms = y.forwardRef(function(r, a) {
  const {
   addEndListener: i,
   appear: s = !0,
   children: c,
   easing: d,
   in: f,
   onEnter: h,
   onEntered: m,
   onEntering: g,
   onExit: b,
   onExited: w,
   onExiting: R,
   style: T,
   timeout: C = "auto",
   TransitionComponent: D = Ar,
   ...k
  } = r, N = Uo(), E = y.useRef(), A = Ho(), O = y.useRef(null), L = tn(O, Ca(c), a), U = W => z => {
   if (W) {
    const I = O.current;
    z === void 0 ? W(I) : W(I, z)
   }
  }, _ = U(g), G = U((W, z) => {
   $1(W);
   const {
    duration: I,
    delay: Q,
    easing: Z
   } = Oi({
    style: T,
    timeout: C,
    easing: d
   }, {
    mode: "enter"
   });
   let j;
   C === "auto" ? (j = A.transitions.getAutoHeightDuration(W.clientHeight), E.current = j) : j = I, W.style.transition = [A.transitions.create("opacity", {
    duration: j,
    delay: Q
   }), A.transitions.create("transform", {
    duration: Np ? j : j * .666,
    delay: Q,
    easing: Z
   })].join(","), h && h(W, z)
  }), S = U(m), $ = U(R), H = U(W => {
   const {
    duration: z,
    delay: I,
    easing: Q
   } = Oi({
    style: T,
    timeout: C,
    easing: d
   }, {
    mode: "exit"
   });
   let Z;
   C === "auto" ? (Z = A.transitions.getAutoHeightDuration(W.clientHeight), E.current = Z) : Z = z, W.style.transition = [A.transitions.create("opacity", {
    duration: Z,
    delay: I
   }), A.transitions.create("transform", {
    duration: Np ? Z : Z * .666,
    delay: Np ? I : I || Z * .333,
    easing: Q
   })].join(","), W.style.opacity = 0, W.style.transform = lh(.75), b && b(W)
  }), V = U(w), X = W => {
   C === "auto" && N.start(E.current || 0, W), i && i(O.current, W)
  };
  return v.jsx(D, {
   appear: s,
   in: f,
   nodeRef: O,
   onEnter: G,
   onEntered: S,
   onEntering: _,
   onExit: H,
   onExited: V,
   onExiting: $,
   addEndListener: X,
   timeout: C === "auto" ? null : C,
   ...k,
   children: (W, {
    ownerState: z,
    ...I
   }) => y.cloneElement(c, {
    style: {
     opacity: 0,
     transform: lh(.75),
     visibility: W === "exited" && !f ? "hidden" : void 0,
     ..._O[W],
     ...T,
     ...c.props.style
    },
    ref: L,
    ...I
   })
  })
 });
ms && (ms.muiSupportAuto = !0);
const UO = e => {
  const {
   classes: r,
   disableUnderline: a
  } = e, s = Ie({
   root: ["root", !a && "underline"],
   input: ["input"]
  }, RM, r);
  return {
   ...r,
   ...s
  }
 },
 IO = pe(Fu, {
  shouldForwardProp: e => zn(e) || e === "classes",
  name: "MuiInput",
  slot: "Root",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [...Xu(e, r), !a.disableUnderline && r.underline]
  }
 })(Ye(({
  theme: e
 }) => {
  let a = e.palette.mode === "light" ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)";
  return e.vars && (a = `rgba(${e.vars.palette.common.onBackgroundChannel} / ${e.vars.opacity.inputUnderline})`), {
   position: "relative",
   variants: [{
    props: ({
     ownerState: i
    }) => i.formControl,
    style: {
     "label + &": {
      marginTop: 16
     }
    }
   }, {
    props: ({
     ownerState: i
    }) => !i.disableUnderline,
    style: {
     "&::after": {
      left: 0,
      bottom: 0,
      content: '""',
      position: "absolute",
      right: 0,
      transform: "scaleX(0)",
      transition: e.transitions.create("transform", {
       duration: e.transitions.duration.shorter,
       easing: e.transitions.easing.easeOut
      }),
      pointerEvents: "none"
     },
     [`&.${Ul.focused}:after`]: {
      transform: "scaleX(1) translateX(0)"
     },
     [`&.${Ul.error}`]: {
      "&::before, &::after": {
       borderBottomColor: (e.vars || e).palette.error.main
      }
     },
     "&::before": {
      borderBottom: `1px solid ${a}`,
      left: 0,
      bottom: 0,
      content: '"\\00a0"',
      position: "absolute",
      right: 0,
      transition: e.transitions.create("border-bottom-color", {
       duration: e.transitions.duration.shorter
      }),
      pointerEvents: "none"
     },
     [`&:hover:not(.${Ul.disabled}, .${Ul.error}):before`]: {
      borderBottom: `2px solid ${(e.vars||e).palette.text.primary}`,
      "@media (hover: none)": {
       borderBottom: `1px solid ${a}`
      }
     },
     [`&.${Ul.disabled}:before`]: {
      borderBottomStyle: "dotted"
     }
    }
   }, ...Object.entries(e.palette).filter(Rn()).map(([i]) => ({
    props: {
     color: i,
     disableUnderline: !1
    },
    style: {
     "&::after": {
      borderBottom: `2px solid ${(e.vars||e).palette[i].main}`
     }
    }
   }))]
  }
 })),
 PO = pe(Ku, {
  name: "MuiInput",
  slot: "Input",
  overridesResolver: Wu
 })({}),
 Yh = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiInput"
   }),
   {
    disableUnderline: s = !1,
    components: c = {},
    componentsProps: d,
    fullWidth: f = !1,
    inputComponent: h = "input",
    multiline: m = !1,
    slotProps: g,
    slots: b = {},
    type: w = "text",
    ...R
   } = i,
   T = UO(i),
   D = {
    root: {
     ownerState: {
      disableUnderline: s
     }
    }
   },
   k = g ?? d ? bn(g ?? d, D) : D,
   N = b.root ?? c.Root ?? IO,
   E = b.input ?? c.Input ?? PO;
  return v.jsx(Vh, {
   slots: {
    root: N,
    input: E
   },
   slotProps: k,
   fullWidth: f,
   inputComponent: h,
   multiline: m,
   ref: a,
   type: w,
   ...R,
   classes: T
  })
 });
Yh.muiName = "Input";

function HO(e) {
 return Ue("MuiInputAdornment", e)
}
const ib = Ve("MuiInputAdornment", ["root", "filled", "standard", "outlined", "positionStart", "positionEnd", "disablePointerEvents", "hiddenLabel", "sizeSmall"]);
var lb;
const qO = (e, r) => {
  const {
   ownerState: a
  } = e;
  return [r.root, r[`position${Ce(a.position)}`], a.disablePointerEvents === !0 && r.disablePointerEvents, r[a.variant]]
 },
 VO = e => {
  const {
   classes: r,
   disablePointerEvents: a,
   hiddenLabel: i,
   position: s,
   size: c,
   variant: d
  } = e, f = {
   root: ["root", a && "disablePointerEvents", s && `position${Ce(s)}`, d, i && "hiddenLabel", c && `size${Ce(c)}`]
  };
  return Ie(f, HO, r)
 },
 GO = pe("div", {
  name: "MuiInputAdornment",
  slot: "Root",
  overridesResolver: qO
 })(Ye(({
  theme: e
 }) => ({
  display: "flex",
  maxHeight: "2em",
  alignItems: "center",
  whiteSpace: "nowrap",
  color: (e.vars || e).palette.action.active,
  variants: [{
   props: {
    variant: "filled"
   },
   style: {
    [`&.${ib.positionStart}&:not(.${ib.hiddenLabel})`]: {
     marginTop: 16
    }
   }
  }, {
   props: {
    position: "start"
   },
   style: {
    marginRight: 8
   }
  }, {
   props: {
    position: "end"
   },
   style: {
    marginLeft: 8
   }
  }, {
   props: {
    disablePointerEvents: !0
   },
   style: {
    pointerEvents: "none"
   }
  }]
 }))),
 tx = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiInputAdornment"
   }),
   {
    children: s,
    className: c,
    component: d = "div",
    disablePointerEvents: f = !1,
    disableTypography: h = !1,
    position: m,
    variant: g,
    ...b
   } = i,
   w = ho() || {};
  let R = g;
  g && w.variant, w && !R && (R = w.variant);
  const T = {
    ...i,
    hiddenLabel: w.hiddenLabel,
    size: w.size,
    disablePointerEvents: f,
    position: m,
    variant: R
   },
   C = VO(T);
  return v.jsx(Yu.Provider, {
   value: null,
   children: v.jsx(GO, {
    as: d,
    ownerState: T,
    className: Ae(C.root, c),
    ref: a,
    ...b,
    children: typeof s == "string" && !h ? v.jsx(_t, {
     color: "textSecondary",
     children: s
    }) : v.jsxs(y.Fragment, {
     children: [m === "start" ? lb || (lb = v.jsx("span", {
      className: "notranslate",
      "aria-hidden": !0,
      children: "​"
     })) : null, s]
    })
   })
  })
 });

function YO(e) {
 return Ue("MuiInputLabel", e)
}
Ve("MuiInputLabel", ["root", "focused", "disabled", "error", "required", "asterisk", "formControl", "sizeSmall", "shrink", "animated", "standard", "filled", "outlined"]);
const XO = e => {
  const {
   classes: r,
   formControl: a,
   size: i,
   shrink: s,
   disableAnimation: c,
   variant: d,
   required: f
  } = e, h = {
   root: ["root", a && "formControl", !c && "animated", s && "shrink", i && i !== "medium" && `size${Ce(i)}`, d],
   asterisk: [f && "asterisk"]
  }, m = Ie(h, YO, r);
  return {
   ...r,
   ...m
  }
 },
 WO = pe($O, {
  shouldForwardProp: e => zn(e) || e === "classes",
  name: "MuiInputLabel",
  slot: "Root",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [{
    [`& .${ts.asterisk}`]: r.asterisk
   }, r.root, a.formControl && r.formControl, a.size === "small" && r.sizeSmall, a.shrink && r.shrink, !a.disableAnimation && r.animated, a.focused && r.focused, r[a.variant]]
  }
 })(Ye(({
  theme: e
 }) => ({
  display: "block",
  transformOrigin: "top left",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "100%",
  variants: [{
   props: ({
    ownerState: r
   }) => r.formControl,
   style: {
    position: "absolute",
    left: 0,
    top: 0,
    transform: "translate(0, 20px) scale(1)"
   }
  }, {
   props: {
    size: "small"
   },
   style: {
    transform: "translate(0, 17px) scale(1)"
   }
  }, {
   props: ({
    ownerState: r
   }) => r.shrink,
   style: {
    transform: "translate(0, -1.5px) scale(0.75)",
    transformOrigin: "top left",
    maxWidth: "133%"
   }
  }, {
   props: ({
    ownerState: r
   }) => !r.disableAnimation,
   style: {
    transition: e.transitions.create(["color", "transform", "max-width"], {
     duration: e.transitions.duration.shorter,
     easing: e.transitions.easing.easeOut
    })
   }
  }, {
   props: {
    variant: "filled"
   },
   style: {
    zIndex: 1,
    pointerEvents: "none",
    transform: "translate(12px, 16px) scale(1)",
    maxWidth: "calc(100% - 24px)"
   }
  }, {
   props: {
    variant: "filled",
    size: "small"
   },
   style: {
    transform: "translate(12px, 13px) scale(1)"
   }
  }, {
   props: ({
    variant: r,
    ownerState: a
   }) => r === "filled" && a.shrink,
   style: {
    userSelect: "none",
    pointerEvents: "auto",
    transform: "translate(12px, 7px) scale(0.75)",
    maxWidth: "calc(133% - 24px)"
   }
  }, {
   props: ({
    variant: r,
    ownerState: a,
    size: i
   }) => r === "filled" && a.shrink && i === "small",
   style: {
    transform: "translate(12px, 4px) scale(0.75)"
   }
  }, {
   props: {
    variant: "outlined"
   },
   style: {
    zIndex: 1,
    pointerEvents: "none",
    transform: "translate(14px, 16px) scale(1)",
    maxWidth: "calc(100% - 24px)"
   }
  }, {
   props: {
    variant: "outlined",
    size: "small"
   },
   style: {
    transform: "translate(14px, 9px) scale(1)"
   }
  }, {
   props: ({
    variant: r,
    ownerState: a
   }) => r === "outlined" && a.shrink,
   style: {
    userSelect: "none",
    pointerEvents: "auto",
    maxWidth: "calc(133% - 32px)",
    transform: "translate(14px, -9px) scale(0.75)"
   }
  }]
 }))),
 nx = y.forwardRef(function(r, a) {
  const i = Ge({
    name: "MuiInputLabel",
    props: r
   }),
   {
    disableAnimation: s = !1,
    margin: c,
    shrink: d,
    variant: f,
    className: h,
    ...m
   } = i,
   g = ho();
  let b = d;
  typeof b > "u" && g && (b = g.filled || g.focused || g.adornedStart);
  const w = wa({
    props: i,
    muiFormControl: g,
    states: ["size", "variant", "required", "focused"]
   }),
   R = {
    ...i,
    disableAnimation: s,
    formControl: g,
    shrink: b,
    size: w.size,
    variant: w.variant,
    required: w.required,
    focused: w.focused
   },
   T = XO(R);
  return v.jsx(WO, {
   "data-shrink": b,
   ref: a,
   className: Ae(T.root, h),
   ...m,
   ownerState: R,
   classes: T
  })
 }),
 gs = y.createContext({});

function FO(e) {
 return Ue("MuiList", e)
}
Ve("MuiList", ["root", "padding", "dense", "subheader"]);
const KO = e => {
  const {
   classes: r,
   disablePadding: a,
   dense: i,
   subheader: s
  } = e;
  return Ie({
   root: ["root", !a && "padding", i && "dense", s && "subheader"]
  }, FO, r)
 },
 QO = pe("ul", {
  name: "MuiList",
  slot: "Root",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.root, !a.disablePadding && r.padding, a.dense && r.dense, a.subheader && r.subheader]
  }
 })({
  listStyle: "none",
  margin: 0,
  padding: 0,
  position: "relative",
  variants: [{
   props: ({
    ownerState: e
   }) => !e.disablePadding,
   style: {
    paddingTop: 8,
    paddingBottom: 8
   }
  }, {
   props: ({
    ownerState: e
   }) => e.subheader,
   style: {
    paddingTop: 0
   }
  }]
 }),
 ZO = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiList"
   }),
   {
    children: s,
    className: c,
    component: d = "ul",
    dense: f = !1,
    disablePadding: h = !1,
    subheader: m,
    ...g
   } = i,
   b = y.useMemo(() => ({
    dense: f
   }), [f]),
   w = {
    ...i,
    component: d,
    dense: f,
    disablePadding: h
   },
   R = KO(w);
  return v.jsx(gs.Provider, {
   value: b,
   children: v.jsxs(QO, {
    as: d,
    className: Ae(R.root, c),
    ref: a,
    ownerState: w,
    ...g,
    children: [m, s]
   })
  })
 });

function JO(e) {
 return Ue("MuiListItemIcon", e)
}
const sb = Ve("MuiListItemIcon", ["root", "alignItemsFlexStart"]),
 e3 = e => {
  const {
   alignItems: r,
   classes: a
  } = e;
  return Ie({
   root: ["root", r === "flex-start" && "alignItemsFlexStart"]
  }, JO, a)
 },
 t3 = pe("div", {
  name: "MuiListItemIcon",
  slot: "Root",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.root, a.alignItems === "flex-start" && r.alignItemsFlexStart]
  }
 })(Ye(({
  theme: e
 }) => ({
  minWidth: 56,
  color: (e.vars || e).palette.action.active,
  flexShrink: 0,
  display: "inline-flex",
  variants: [{
   props: {
    alignItems: "flex-start"
   },
   style: {
    marginTop: 8
   }
  }]
 }))),
 Il = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiListItemIcon"
   }),
   {
    className: s,
    ...c
   } = i,
   d = y.useContext(gs),
   f = {
    ...i,
    alignItems: d.alignItems
   },
   h = e3(f);
  return v.jsx(t3, {
   className: Ae(h.root, s),
   ownerState: f,
   ref: a,
   ...c
  })
 });

function n3(e) {
 return Ue("MuiListItemText", e)
}
const xi = Ve("MuiListItemText", ["root", "multiline", "dense", "inset", "primary", "secondary"]),
 r3 = e => {
  const {
   classes: r,
   inset: a,
   primary: i,
   secondary: s,
   dense: c
  } = e;
  return Ie({
   root: ["root", a && "inset", c && "dense", i && s && "multiline"],
   primary: ["primary"],
   secondary: ["secondary"]
  }, n3, r)
 },
 o3 = pe("div", {
  name: "MuiListItemText",
  slot: "Root",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [{
    [`& .${xi.primary}`]: r.primary
   }, {
    [`& .${xi.secondary}`]: r.secondary
   }, r.root, a.inset && r.inset, a.primary && a.secondary && r.multiline, a.dense && r.dense]
  }
 })({
  flex: "1 1 auto",
  minWidth: 0,
  marginTop: 4,
  marginBottom: 4,
  [`.${B0.root}:where(& .${xi.primary})`]: {
   display: "block"
  },
  [`.${B0.root}:where(& .${xi.secondary})`]: {
   display: "block"
  },
  variants: [{
   props: ({
    ownerState: e
   }) => e.primary && e.secondary,
   style: {
    marginTop: 6,
    marginBottom: 6
   }
  }, {
   props: ({
    ownerState: e
   }) => e.inset,
   style: {
    paddingLeft: 56
   }
  }]
 }),
 Pl = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiListItemText"
   }),
   {
    children: s,
    className: c,
    disableTypography: d = !1,
    inset: f = !1,
    primary: h,
    primaryTypographyProps: m,
    secondary: g,
    secondaryTypographyProps: b,
    slots: w = {},
    slotProps: R = {},
    ...T
   } = i,
   {
    dense: C
   } = y.useContext(gs);
  let D = h ?? s,
   k = g;
  const N = {
    ...i,
    disableTypography: d,
    inset: f,
    primary: !!D,
    secondary: !!k,
    dense: C
   },
   E = r3(N),
   A = {
    slots: w,
    slotProps: {
     primary: m,
     secondary: b,
     ...R
    }
   },
   [O, L] = et("root", {
    className: Ae(E.root, c),
    elementType: o3,
    externalForwardedProps: {
     ...A,
     ...T
    },
    ownerState: N,
    ref: a
   }),
   [U, _] = et("primary", {
    className: E.primary,
    elementType: _t,
    externalForwardedProps: A,
    ownerState: N
   }),
   [G, S] = et("secondary", {
    className: E.secondary,
    elementType: _t,
    externalForwardedProps: A,
    ownerState: N
   });
  return D != null && D.type !== _t && !d && (D = v.jsx(U, {
   variant: C ? "body2" : "body1",
   component: _ != null && _.variant ? void 0 : "span",
   ..._,
   children: D
  })), k != null && k.type !== _t && !d && (k = v.jsx(G, {
   variant: "body2",
   color: "textSecondary",
   ...S,
   children: k
  })), v.jsxs(O, {
   ...L,
   children: [D, k]
  })
 });

function Lp(e, r, a) {
 return e === r ? e.firstChild : r && r.nextElementSibling ? r.nextElementSibling : a ? null : e.firstChild
}

function cb(e, r, a) {
 return e === r ? a ? e.firstChild : e.lastChild : r && r.previousElementSibling ? r.previousElementSibling : a ? null : e.lastChild
}

function rx(e, r) {
 if (r === void 0) return !0;
 let a = e.innerText;
 return a === void 0 && (a = e.textContent), a = a.trim().toLowerCase(), a.length === 0 ? !1 : r.repeating ? a[0] === r.keys[0] : a.startsWith(r.keys.join(""))
}

function Hl(e, r, a, i, s, c) {
 let d = !1,
  f = s(e, r, r ? a : !1);
 for (; f;) {
  if (f === e.firstChild) {
   if (d) return !1;
   d = !0
  }
  const h = i ? !1 : f.disabled || f.getAttribute("aria-disabled") === "true";
  if (!f.hasAttribute("tabindex") || !rx(f, c) || h) f = s(e, f, a);
  else return f.focus(), !0
 }
 return !1
}
const a3 = y.forwardRef(function(r, a) {
 const {
  actions: i,
  autoFocus: s = !1,
  autoFocusItem: c = !1,
  children: d,
  className: f,
  disabledItemsFocusable: h = !1,
  disableListWrap: m = !1,
  onKeyDown: g,
  variant: b = "selectedMenu",
  ...w
 } = r, R = y.useRef(null), T = y.useRef({
  keys: [],
  repeating: !0,
  previousKeyMatched: !0,
  lastTime: null
 });
 vr(() => {
  s && R.current.focus()
 }, [s]), y.useImperativeHandle(i, () => ({
  adjustStyleForScrollbar: (E, {
   direction: A
  }) => {
   const O = !R.current.style.width;
   if (E.clientHeight < R.current.clientHeight && O) {
    const L = `${y1(fo(E))}px`;
    R.current.style[A === "rtl" ? "paddingLeft" : "paddingRight"] = L, R.current.style.width = `calc(100% + ${L})`
   }
   return R.current
  }
 }), []);
 const C = E => {
   const A = R.current,
    O = E.key;
   if (E.ctrlKey || E.metaKey || E.altKey) {
    g && g(E);
    return
   }
   const U = sn(A).activeElement;
   if (O === "ArrowDown") E.preventDefault(), Hl(A, U, m, h, Lp);
   else if (O === "ArrowUp") E.preventDefault(), Hl(A, U, m, h, cb);
   else if (O === "Home") E.preventDefault(), Hl(A, null, m, h, Lp);
   else if (O === "End") E.preventDefault(), Hl(A, null, m, h, cb);
   else if (O.length === 1) {
    const _ = T.current,
     G = O.toLowerCase(),
     S = performance.now();
    _.keys.length > 0 && (S - _.lastTime > 500 ? (_.keys = [], _.repeating = !0, _.previousKeyMatched = !0) : _.repeating && G !== _.keys[0] && (_.repeating = !1)), _.lastTime = S, _.keys.push(G);
    const $ = U && !_.repeating && rx(U, _);
    _.previousKeyMatched && ($ || Hl(A, U, !1, h, Lp, _)) ? E.preventDefault() : _.previousKeyMatched = !1
   }
   g && g(E)
  },
  D = tn(R, a);
 let k = -1;
 y.Children.forEach(d, (E, A) => {
  if (!y.isValidElement(E)) {
   k === A && (k += 1, k >= d.length && (k = -1));
   return
  }
  E.props.disabled || (b === "selectedMenu" && E.props.selected || k === -1) && (k = A), k === A && (E.props.disabled || E.props.muiSkipListHighlight || E.type.muiSkipListHighlight) && (k += 1, k >= d.length && (k = -1))
 });
 const N = y.Children.map(d, (E, A) => {
  if (A === k) {
   const O = {};
   return c && (O.autoFocus = !0), E.props.tabIndex === void 0 && b === "selectedMenu" && (O.tabIndex = 0), y.cloneElement(E, O)
  }
  return E
 });
 return v.jsx(ZO, {
  role: "menu",
  ref: D,
  className: f,
  onKeyDown: C,
  tabIndex: s ? 0 : -1,
  ...w,
  children: N
 })
});

function i3(e) {
 return Ue("MuiPopover", e)
}
Ve("MuiPopover", ["root", "paper"]);

function ub(e, r) {
 let a = 0;
 return typeof r == "number" ? a = r : r === "center" ? a = e.height / 2 : r === "bottom" && (a = e.height), a
}

function db(e, r) {
 let a = 0;
 return typeof r == "number" ? a = r : r === "center" ? a = e.width / 2 : r === "right" && (a = e.width), a
}

function fb(e) {
 return [e.horizontal, e.vertical].map(r => typeof r == "number" ? `${r}px` : r).join(" ")
}

function Zc(e) {
 return typeof e == "function" ? e() : e
}
const l3 = e => {
  const {
   classes: r
  } = e;
  return Ie({
   root: ["root"],
   paper: ["paper"]
  }, i3, r)
 },
 s3 = pe(Z1, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, r) => r.root
 })({}),
 ox = pe(Gr, {
  name: "MuiPopover",
  slot: "Paper",
  overridesResolver: (e, r) => r.paper
 })({
  position: "absolute",
  overflowY: "auto",
  overflowX: "hidden",
  minWidth: 16,
  minHeight: 16,
  maxWidth: "calc(100% - 32px)",
  maxHeight: "calc(100% - 32px)",
  outline: 0
 }),
 c3 = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiPopover"
   }),
   {
    action: s,
    anchorEl: c,
    anchorOrigin: d = {
     vertical: "top",
     horizontal: "left"
    },
    anchorPosition: f,
    anchorReference: h = "anchorEl",
    children: m,
    className: g,
    container: b,
    elevation: w = 8,
    marginThreshold: R = 16,
    open: T,
    PaperProps: C = {},
    slots: D = {},
    slotProps: k = {},
    transformOrigin: N = {
     vertical: "top",
     horizontal: "left"
    },
    TransitionComponent: E,
    transitionDuration: A = "auto",
    TransitionProps: O = {},
    disableScrollLock: L = !1,
    ...U
   } = i,
   _ = y.useRef(),
   G = {
    ...i,
    anchorOrigin: d,
    anchorReference: h,
    elevation: w,
    marginThreshold: R,
    transformOrigin: N,
    TransitionComponent: E,
    transitionDuration: A,
    TransitionProps: O
   },
   S = l3(G),
   $ = y.useCallback(() => {
    if (h === "anchorPosition") return f;
    const fe = Zc(c),
     we = (fe && fe.nodeType === 1 ? fe : sn(_.current).body).getBoundingClientRect();
    return {
     top: we.top + ub(we, d.vertical),
     left: we.left + db(we, d.horizontal)
    }
   }, [c, d.horizontal, d.vertical, f, h]),
   H = y.useCallback(fe => ({
    vertical: ub(fe, N.vertical),
    horizontal: db(fe, N.horizontal)
   }), [N.horizontal, N.vertical]),
   V = y.useCallback(fe => {
    const Oe = {
      width: fe.offsetWidth,
      height: fe.offsetHeight
     },
     we = H(Oe);
    if (h === "none") return {
     top: null,
     left: null,
     transformOrigin: fb(we)
    };
    const Se = $();
    let Re = Se.top - we.vertical,
     ze = Se.left - we.horizontal;
    const it = Re + Oe.height,
     Ne = ze + Oe.width,
     Je = fo(Zc(c)),
     Ke = Je.innerHeight - R,
     Pe = Je.innerWidth - R;
    if (R !== null && Re < R) {
     const He = Re - R;
     Re -= He, we.vertical += He
    } else if (R !== null && it > Ke) {
     const He = it - Ke;
     Re -= He, we.vertical += He
    }
    if (R !== null && ze < R) {
     const He = ze - R;
     ze -= He, we.horizontal += He
    } else if (Ne > Pe) {
     const He = Ne - Pe;
     ze -= He, we.horizontal += He
    }
    return {
     top: `${Math.round(Re)}px`,
     left: `${Math.round(ze)}px`,
     transformOrigin: fb(we)
    }
   }, [c, h, $, H, R]),
   [X, W] = y.useState(T),
   z = y.useCallback(() => {
    const fe = _.current;
    if (!fe) return;
    const Oe = V(fe);
    Oe.top !== null && fe.style.setProperty("top", Oe.top), Oe.left !== null && (fe.style.left = Oe.left), fe.style.transformOrigin = Oe.transformOrigin, W(!0)
   }, [V]);
  y.useEffect(() => (L && window.addEventListener("scroll", z), () => window.removeEventListener("scroll", z)), [c, L, z]);
  const I = () => {
    z()
   },
   Q = () => {
    W(!1)
   };
  y.useEffect(() => {
   T && z()
  }), y.useImperativeHandle(s, () => T ? {
   updatePosition: () => {
    z()
   }
  } : null, [T, z]), y.useEffect(() => {
   if (!T) return;
   const fe = g1(() => {
     z()
    }),
    Oe = fo(Zc(c));
   return Oe.addEventListener("resize", fe), () => {
    fe.clear(), Oe.removeEventListener("resize", fe)
   }
  }, [c, T, z]);
  let Z = A;
  const j = {
    slots: {
     transition: E,
     ...D
    },
    slotProps: {
     transition: O,
     paper: C,
     ...k
    }
   },
   [q, ee] = et("transition", {
    elementType: ms,
    externalForwardedProps: j,
    ownerState: G,
    getSlotProps: fe => ({
     ...fe,
     onEntering: (Oe, we) => {
      var Se;
      (Se = fe.onEntering) == null || Se.call(fe, Oe, we), I()
     },
     onExited: Oe => {
      var we;
      (we = fe.onExited) == null || we.call(fe, Oe), Q()
     }
    }),
    additionalProps: {
     appear: !0,
     in: T
    }
   });
  A === "auto" && !q.muiSupportAuto && (Z = void 0);
  const ne = b || (c ? sn(Zc(c)).body : void 0),
   [ce, {
    slots: le,
    slotProps: re,
    ...ye
   }] = et("root", {
    ref: a,
    elementType: s3,
    externalForwardedProps: {
     ...j,
     ...U
    },
    shouldForwardComponentProp: !0,
    additionalProps: {
     slots: {
      backdrop: D.backdrop
     },
     slotProps: {
      backdrop: N1(typeof k.backdrop == "function" ? k.backdrop(G) : k.backdrop, {
       invisible: !0
      })
     },
     container: ne,
     open: T
    },
    ownerState: G,
    className: Ae(S.root, g)
   }),
   [ge, Te] = et("paper", {
    ref: _,
    className: S.paper,
    elementType: ox,
    externalForwardedProps: j,
    shouldForwardComponentProp: !0,
    additionalProps: {
     elevation: w,
     style: X ? void 0 : {
      opacity: 0
     }
    },
    ownerState: G
   });
  return v.jsx(ce, {
   ...ye,
   ...!ga(ce) && {
    slots: le,
    slotProps: re,
    disableScrollLock: L
   },
   children: v.jsx(q, {
    ...ee,
    timeout: Z,
    children: v.jsx(ge, {
     ...Te,
     children: m
    })
   })
  })
 });

function u3(e) {
 return Ue("MuiMenu", e)
}
Ve("MuiMenu", ["root", "paper", "list"]);
const d3 = {
  vertical: "top",
  horizontal: "right"
 },
 f3 = {
  vertical: "top",
  horizontal: "left"
 },
 p3 = e => {
  const {
   classes: r
  } = e;
  return Ie({
   root: ["root"],
   paper: ["paper"],
   list: ["list"]
  }, u3, r)
 },
 h3 = pe(c3, {
  shouldForwardProp: e => zn(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, r) => r.root
 })({}),
 m3 = pe(ox, {
  name: "MuiMenu",
  slot: "Paper",
  overridesResolver: (e, r) => r.paper
 })({
  maxHeight: "calc(100% - 96px)",
  WebkitOverflowScrolling: "touch"
 }),
 g3 = pe(a3, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, r) => r.list
 })({
  outline: 0
 }),
 ax = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiMenu"
   }),
   {
    autoFocus: s = !0,
    children: c,
    className: d,
    disableAutoFocusItem: f = !1,
    MenuListProps: h = {},
    onClose: m,
    open: g,
    PaperProps: b = {},
    PopoverClasses: w,
    transitionDuration: R = "auto",
    TransitionProps: {
     onEntering: T,
     ...C
    } = {},
    variant: D = "selectedMenu",
    slots: k = {},
    slotProps: N = {},
    ...E
   } = i,
   A = Hu(),
   O = {
    ...i,
    autoFocus: s,
    disableAutoFocusItem: f,
    MenuListProps: h,
    onEntering: T,
    PaperProps: b,
    transitionDuration: R,
    TransitionProps: C,
    variant: D
   },
   L = p3(O),
   U = s && !f && g,
   _ = y.useRef(null),
   G = (Z, j) => {
    _.current && _.current.adjustStyleForScrollbar(Z, {
     direction: A ? "rtl" : "ltr"
    }), T && T(Z, j)
   },
   S = Z => {
    Z.key === "Tab" && (Z.preventDefault(), m && m(Z, "tabKeyDown"))
   };
  let $ = -1;
  y.Children.map(c, (Z, j) => {
   y.isValidElement(Z) && (Z.props.disabled || (D === "selectedMenu" && Z.props.selected || $ === -1) && ($ = j))
  });
  const H = {
    slots: k,
    slotProps: {
     list: h,
     transition: C,
     paper: b,
     ...N
    }
   },
   V = Br({
    elementType: k.root,
    externalSlotProps: N.root,
    ownerState: O,
    className: [L.root, d]
   }),
   [X, W] = et("paper", {
    className: L.paper,
    elementType: m3,
    externalForwardedProps: H,
    shouldForwardComponentProp: !0,
    ownerState: O
   }),
   [z, I] = et("list", {
    className: Ae(L.list, h.className),
    elementType: g3,
    shouldForwardComponentProp: !0,
    externalForwardedProps: H,
    getSlotProps: Z => ({
     ...Z,
     onKeyDown: j => {
      var q;
      S(j), (q = Z.onKeyDown) == null || q.call(Z, j)
     }
    }),
    ownerState: O
   }),
   Q = typeof H.slotProps.transition == "function" ? H.slotProps.transition(O) : H.slotProps.transition;
  return v.jsx(h3, {
   onClose: m,
   anchorOrigin: {
    vertical: "bottom",
    horizontal: A ? "right" : "left"
   },
   transformOrigin: A ? d3 : f3,
   slots: {
    root: k.root,
    paper: X,
    backdrop: k.backdrop,
    ...k.transition && {
     transition: k.transition
    }
   },
   slotProps: {
    root: V,
    paper: W,
    backdrop: typeof N.backdrop == "function" ? N.backdrop(O) : N.backdrop,
    transition: {
     ...Q,
     onEntering: (...Z) => {
      var j;
      G(...Z), (j = Q == null ? void 0 : Q.onEntering) == null || j.call(Q, ...Z)
     }
    }
   },
   open: g,
   ref: a,
   transitionDuration: R,
   ownerState: O,
   ...E,
   classes: w,
   children: v.jsx(z, {
    actions: _,
    autoFocus: s && ($ === -1 || f),
    autoFocusItem: U,
    variant: D,
    ...I,
    children: c
   })
  })
 });

function v3(e) {
 return Ue("MuiMenuItem", e)
}
const ql = Ve("MuiMenuItem", ["root", "focusVisible", "dense", "disabled", "divider", "gutters", "selected"]),
 y3 = (e, r) => {
  const {
   ownerState: a
  } = e;
  return [r.root, a.dense && r.dense, a.divider && r.divider, !a.disableGutters && r.gutters]
 },
 b3 = e => {
  const {
   disabled: r,
   dense: a,
   divider: i,
   disableGutters: s,
   selected: c,
   classes: d
  } = e, h = Ie({
   root: ["root", a && "dense", r && "disabled", !s && "gutters", i && "divider", c && "selected"]
  }, v3, d);
  return {
   ...d,
   ...h
  }
 },
 x3 = pe(As, {
  shouldForwardProp: e => zn(e) || e === "classes",
  name: "MuiMenuItem",
  slot: "Root",
  overridesResolver: y3
 })(Ye(({
  theme: e
 }) => ({
  ...e.typography.body1,
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  position: "relative",
  textDecoration: "none",
  minHeight: 48,
  paddingTop: 6,
  paddingBottom: 6,
  boxSizing: "border-box",
  whiteSpace: "nowrap",
  "&:hover": {
   textDecoration: "none",
   backgroundColor: (e.vars || e).palette.action.hover,
   "@media (hover: none)": {
    backgroundColor: "transparent"
   }
  },
  [`&.${ql.selected}`]: {
   backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})` : Qt(e.palette.primary.main, e.palette.action.selectedOpacity),
   [`&.${ql.focusVisible}`]: {
    backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))` : Qt(e.palette.primary.main, e.palette.action.selectedOpacity + e.palette.action.focusOpacity)
   }
  },
  [`&.${ql.selected}:hover`]: {
   backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))` : Qt(e.palette.primary.main, e.palette.action.selectedOpacity + e.palette.action.hoverOpacity),
   "@media (hover: none)": {
    backgroundColor: e.vars ? `rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})` : Qt(e.palette.primary.main, e.palette.action.selectedOpacity)
   }
  },
  [`&.${ql.focusVisible}`]: {
   backgroundColor: (e.vars || e).palette.action.focus
  },
  [`&.${ql.disabled}`]: {
   opacity: (e.vars || e).palette.action.disabledOpacity
  },
  [`& + .${rb.root}`]: {
   marginTop: e.spacing(1),
   marginBottom: e.spacing(1)
  },
  [`& + .${rb.inset}`]: {
   marginLeft: 52
  },
  [`& .${xi.root}`]: {
   marginTop: 0,
   marginBottom: 0
  },
  [`& .${xi.inset}`]: {
   paddingLeft: 36
  },
  [`& .${sb.root}`]: {
   minWidth: 36
  },
  variants: [{
   props: ({
    ownerState: r
   }) => !r.disableGutters,
   style: {
    paddingLeft: 16,
    paddingRight: 16
   }
  }, {
   props: ({
    ownerState: r
   }) => r.divider,
   style: {
    borderBottom: `1px solid ${(e.vars||e).palette.divider}`,
    backgroundClip: "padding-box"
   }
  }, {
   props: ({
    ownerState: r
   }) => !r.dense,
   style: {
    [e.breakpoints.up("sm")]: {
     minHeight: "auto"
    }
   }
  }, {
   props: ({
    ownerState: r
   }) => r.dense,
   style: {
    minHeight: 32,
    paddingTop: 4,
    paddingBottom: 4,
    ...e.typography.body2,
    [`& .${sb.root} svg`]: {
     fontSize: "1.25rem"
    }
   }
  }]
 }))),
 hi = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiMenuItem"
   }),
   {
    autoFocus: s = !1,
    component: c = "li",
    dense: d = !1,
    divider: f = !1,
    disableGutters: h = !1,
    focusVisibleClassName: m,
    role: g = "menuitem",
    tabIndex: b,
    className: w,
    ...R
   } = i,
   T = y.useContext(gs),
   C = y.useMemo(() => ({
    dense: d || T.dense || !1,
    disableGutters: h
   }), [T.dense, d, h]),
   D = y.useRef(null);
  vr(() => {
   s && D.current && D.current.focus()
  }, [s]);
  const k = {
    ...i,
    dense: C.dense,
    divider: f,
    disableGutters: h
   },
   N = b3(i),
   E = tn(D, a);
  let A;
  return i.disabled || (A = b !== void 0 ? b : -1), v.jsx(gs.Provider, {
   value: C,
   children: v.jsx(x3, {
    ref: E,
    role: g,
    tabIndex: A,
    component: c,
    focusVisibleClassName: Ae(N.focusVisible, m),
    className: Ae(N.root, w),
    ...R,
    ownerState: k,
    classes: N
   })
  })
 });

function S3(e) {
 return Ue("MuiNativeSelect", e)
}
const Xh = Ve("MuiNativeSelect", ["root", "select", "multiple", "filled", "outlined", "standard", "disabled", "icon", "iconOpen", "iconFilled", "iconOutlined", "iconStandard", "nativeInput", "error"]),
 C3 = e => {
  const {
   classes: r,
   variant: a,
   disabled: i,
   multiple: s,
   open: c,
   error: d
  } = e, f = {
   select: ["select", a, i && "disabled", s && "multiple", d && "error"],
   icon: ["icon", `icon${Ce(a)}`, c && "iconOpen", i && "disabled"]
  };
  return Ie(f, S3, r)
 },
 ix = pe("select")(({
  theme: e
 }) => ({
  MozAppearance: "none",
  WebkitAppearance: "none",
  userSelect: "none",
  borderRadius: 0,
  cursor: "pointer",
  "&:focus": {
   borderRadius: 0
  },
  [`&.${Xh.disabled}`]: {
   cursor: "default"
  },
  "&[multiple]": {
   height: "auto"
  },
  "&:not([multiple]) option, &:not([multiple]) optgroup": {
   backgroundColor: (e.vars || e).palette.background.paper
  },
  variants: [{
   props: ({
    ownerState: r
   }) => r.variant !== "filled" && r.variant !== "outlined",
   style: {
    "&&&": {
     paddingRight: 24,
     minWidth: 16
    }
   }
  }, {
   props: {
    variant: "filled"
   },
   style: {
    "&&&": {
     paddingRight: 32
    }
   }
  }, {
   props: {
    variant: "outlined"
   },
   style: {
    borderRadius: (e.vars || e).shape.borderRadius,
    "&:focus": {
     borderRadius: (e.vars || e).shape.borderRadius
    },
    "&&&": {
     paddingRight: 32
    }
   }
  }]
 })),
 w3 = pe(ix, {
  name: "MuiNativeSelect",
  slot: "Select",
  shouldForwardProp: zn,
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.select, r[a.variant], a.error && r.error, {
    [`&.${Xh.multiple}`]: r.multiple
   }]
  }
 })({}),
 lx = pe("svg")(({
  theme: e
 }) => ({
  position: "absolute",
  right: 0,
  top: "calc(50% - .5em)",
  pointerEvents: "none",
  color: (e.vars || e).palette.action.active,
  [`&.${Xh.disabled}`]: {
   color: (e.vars || e).palette.action.disabled
  },
  variants: [{
   props: ({
    ownerState: r
   }) => r.open,
   style: {
    transform: "rotate(180deg)"
   }
  }, {
   props: {
    variant: "filled"
   },
   style: {
    right: 7
   }
  }, {
   props: {
    variant: "outlined"
   },
   style: {
    right: 7
   }
  }]
 })),
 R3 = pe(lx, {
  name: "MuiNativeSelect",
  slot: "Icon",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.icon, a.variant && r[`icon${Ce(a.variant)}`], a.open && r.iconOpen]
  }
 })({}),
 E3 = y.forwardRef(function(r, a) {
  const {
   className: i,
   disabled: s,
   error: c,
   IconComponent: d,
   inputRef: f,
   variant: h = "standard",
   ...m
  } = r, g = {
   ...r,
   disabled: s,
   variant: h,
   error: c
  }, b = C3(g);
  return v.jsxs(y.Fragment, {
   children: [v.jsx(w3, {
    ownerState: g,
    className: Ae(b.select, i),
    disabled: s,
    ref: f || a,
    ...m
   }), r.multiple ? null : v.jsx(R3, {
    as: d,
    ownerState: g,
    className: b.icon
   })]
  })
 });
var pb;
const T3 = pe("fieldset", {
  shouldForwardProp: zn
 })({
  textAlign: "left",
  position: "absolute",
  bottom: 0,
  right: 0,
  top: -5,
  left: 0,
  margin: 0,
  padding: "0 8px",
  pointerEvents: "none",
  borderRadius: "inherit",
  borderStyle: "solid",
  borderWidth: 1,
  overflow: "hidden",
  minWidth: "0%"
 }),
 A3 = pe("legend", {
  shouldForwardProp: zn
 })(Ye(({
  theme: e
 }) => ({
  float: "unset",
  width: "auto",
  overflow: "hidden",
  variants: [{
   props: ({
    ownerState: r
   }) => !r.withLabel,
   style: {
    padding: 0,
    lineHeight: "11px",
    transition: e.transitions.create("width", {
     duration: 150,
     easing: e.transitions.easing.easeOut
    })
   }
  }, {
   props: ({
    ownerState: r
   }) => r.withLabel,
   style: {
    display: "block",
    padding: 0,
    height: 11,
    fontSize: "0.75em",
    visibility: "hidden",
    maxWidth: .01,
    transition: e.transitions.create("max-width", {
     duration: 50,
     easing: e.transitions.easing.easeOut
    }),
    whiteSpace: "nowrap",
    "& > span": {
     paddingLeft: 5,
     paddingRight: 5,
     display: "inline-block",
     opacity: 0,
     visibility: "visible"
    }
   }
  }, {
   props: ({
    ownerState: r
   }) => r.withLabel && r.notched,
   style: {
    maxWidth: "100%",
    transition: e.transitions.create("max-width", {
     duration: 100,
     easing: e.transitions.easing.easeOut,
     delay: 50
    })
   }
  }]
 })));

function M3(e) {
 const {
  children: r,
  classes: a,
  className: i,
  label: s,
  notched: c,
  ...d
 } = e, f = s != null && s !== "", h = {
  ...e,
  notched: c,
  withLabel: f
 };
 return v.jsx(T3, {
  "aria-hidden": !0,
  className: i,
  ownerState: h,
  ...d,
  children: v.jsx(A3, {
   ownerState: h,
   children: f ? v.jsx("span", {
    children: s
   }) : pb || (pb = v.jsx("span", {
    className: "notranslate",
    "aria-hidden": !0,
    children: "​"
   }))
  })
 })
}
const O3 = e => {
  const {
   classes: r
  } = e, i = Ie({
   root: ["root"],
   notchedOutline: ["notchedOutline"],
   input: ["input"]
  }, EM, r);
  return {
   ...r,
   ...i
  }
 },
 D3 = pe(Fu, {
  shouldForwardProp: e => zn(e) || e === "classes",
  name: "MuiOutlinedInput",
  slot: "Root",
  overridesResolver: Xu
 })(Ye(({
  theme: e
 }) => {
  const r = e.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
  return {
   position: "relative",
   borderRadius: (e.vars || e).shape.borderRadius,
   [`&:hover .${Lr.notchedOutline}`]: {
    borderColor: (e.vars || e).palette.text.primary
   },
   "@media (hover: none)": {
    [`&:hover .${Lr.notchedOutline}`]: {
     borderColor: e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)` : r
    }
   },
   [`&.${Lr.focused} .${Lr.notchedOutline}`]: {
    borderWidth: 2
   },
   variants: [...Object.entries(e.palette).filter(Rn()).map(([a]) => ({
    props: {
     color: a
    },
    style: {
     [`&.${Lr.focused} .${Lr.notchedOutline}`]: {
      borderColor: (e.vars || e).palette[a].main
     }
    }
   })), {
    props: {},
    style: {
     [`&.${Lr.error} .${Lr.notchedOutline}`]: {
      borderColor: (e.vars || e).palette.error.main
     },
     [`&.${Lr.disabled} .${Lr.notchedOutline}`]: {
      borderColor: (e.vars || e).palette.action.disabled
     }
    }
   }, {
    props: ({
     ownerState: a
    }) => a.startAdornment,
    style: {
     paddingLeft: 14
    }
   }, {
    props: ({
     ownerState: a
    }) => a.endAdornment,
    style: {
     paddingRight: 14
    }
   }, {
    props: ({
     ownerState: a
    }) => a.multiline,
    style: {
     padding: "16.5px 14px"
    }
   }, {
    props: ({
     ownerState: a,
     size: i
    }) => a.multiline && i === "small",
    style: {
     padding: "8.5px 14px"
    }
   }]
  }
 })),
 k3 = pe(M3, {
  name: "MuiOutlinedInput",
  slot: "NotchedOutline",
  overridesResolver: (e, r) => r.notchedOutline
 })(Ye(({
  theme: e
 }) => {
  const r = e.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
  return {
   borderColor: e.vars ? `rgba(${e.vars.palette.common.onBackgroundChannel} / 0.23)` : r
  }
 })),
 z3 = pe(Ku, {
  name: "MuiOutlinedInput",
  slot: "Input",
  overridesResolver: Wu
 })(Ye(({
  theme: e
 }) => ({
  padding: "16.5px 14px",
  ...!e.vars && {
   "&:-webkit-autofill": {
    WebkitBoxShadow: e.palette.mode === "light" ? null : "0 0 0 100px #266798 inset",
    WebkitTextFillColor: e.palette.mode === "light" ? null : "#fff",
    caretColor: e.palette.mode === "light" ? null : "#fff",
    borderRadius: "inherit"
   }
  },
  ...e.vars && {
   "&:-webkit-autofill": {
    borderRadius: "inherit"
   },
   [e.getColorSchemeSelector("dark")]: {
    "&:-webkit-autofill": {
     WebkitBoxShadow: "0 0 0 100px #266798 inset",
     WebkitTextFillColor: "#fff",
     caretColor: "#fff"
    }
   }
  },
  variants: [{
   props: {
    size: "small"
   },
   style: {
    padding: "8.5px 14px"
   }
  }, {
   props: ({
    ownerState: r
   }) => r.multiline,
   style: {
    padding: 0
   }
  }, {
   props: ({
    ownerState: r
   }) => r.startAdornment,
   style: {
    paddingLeft: 0
   }
  }, {
   props: ({
    ownerState: r
   }) => r.endAdornment,
   style: {
    paddingRight: 0
   }
  }]
 }))),
 Wh = y.forwardRef(function(r, a) {
  var i;
  const s = Ge({
    props: r,
    name: "MuiOutlinedInput"
   }),
   {
    components: c = {},
    fullWidth: d = !1,
    inputComponent: f = "input",
    label: h,
    multiline: m = !1,
    notched: g,
    slots: b = {},
    type: w = "text",
    ...R
   } = s,
   T = O3(s),
   C = ho(),
   D = wa({
    props: s,
    muiFormControl: C,
    states: ["color", "disabled", "error", "focused", "hiddenLabel", "size", "required"]
   }),
   k = {
    ...s,
    color: D.color || "primary",
    disabled: D.disabled,
    error: D.error,
    focused: D.focused,
    formControl: C,
    fullWidth: d,
    hiddenLabel: D.hiddenLabel,
    multiline: m,
    size: D.size,
    type: w
   },
   N = b.root ?? c.Root ?? D3,
   E = b.input ?? c.Input ?? z3;
  return v.jsx(Vh, {
   slots: {
    root: N,
    input: E
   },
   renderSuffix: A => v.jsx(k3, {
    ownerState: k,
    className: T.notchedOutline,
    label: h != null && h !== "" && D.required ? i || (i = v.jsxs(y.Fragment, {
     children: [h, " ", "*"]
    })) : h,
    notched: typeof g < "u" ? g : !!(A.startAdornment || A.filled || A.focused)
   }),
   fullWidth: d,
   inputComponent: f,
   multiline: m,
   ref: a,
   type: w,
   ...R,
   classes: {
    ...T,
    notchedOutline: null
   }
  })
 });
Wh.muiName = "Input";

function sx(e) {
 return Ue("MuiSelect", e)
}
const Vl = Ve("MuiSelect", ["root", "select", "multiple", "filled", "outlined", "standard", "disabled", "focused", "icon", "iconOpen", "iconFilled", "iconOutlined", "iconStandard", "nativeInput", "error"]);
var hb;
const j3 = pe(ix, {
  name: "MuiSelect",
  slot: "Select",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [{
    [`&.${Vl.select}`]: r.select
   }, {
    [`&.${Vl.select}`]: r[a.variant]
   }, {
    [`&.${Vl.error}`]: r.error
   }, {
    [`&.${Vl.multiple}`]: r.multiple
   }]
  }
 })({
  [`&.${Vl.select}`]: {
   height: "auto",
   minHeight: "1.4375em",
   textOverflow: "ellipsis",
   whiteSpace: "nowrap",
   overflow: "hidden"
  }
 }),
 N3 = pe(lx, {
  name: "MuiSelect",
  slot: "Icon",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.icon, a.variant && r[`icon${Ce(a.variant)}`], a.open && r.iconOpen]
  }
 })({}),
 L3 = pe("input", {
  shouldForwardProp: e => Vu(e) && e !== "classes",
  name: "MuiSelect",
  slot: "NativeInput",
  overridesResolver: (e, r) => r.nativeInput
 })({
  bottom: 0,
  left: 0,
  position: "absolute",
  opacity: 0,
  pointerEvents: "none",
  width: "100%",
  boxSizing: "border-box"
 });

function mb(e, r) {
 return typeof r == "object" && r !== null ? e === r : String(e) === String(r)
}

function B3(e) {
 return e == null || typeof e == "string" && !e.trim()
}
const $3 = e => {
  const {
   classes: r,
   variant: a,
   disabled: i,
   multiple: s,
   open: c,
   error: d
  } = e, f = {
   select: ["select", a, i && "disabled", s && "multiple", d && "error"],
   icon: ["icon", `icon${Ce(a)}`, c && "iconOpen", i && "disabled"],
   nativeInput: ["nativeInput"]
  };
  return Ie(f, sx, r)
 },
 _3 = y.forwardRef(function(r, a) {
  var Xe;
  const {
   "aria-describedby": i,
   "aria-label": s,
   autoFocus: c,
   autoWidth: d,
   children: f,
   className: h,
   defaultOpen: m,
   defaultValue: g,
   disabled: b,
   displayEmpty: w,
   error: R = !1,
   IconComponent: T,
   inputRef: C,
   labelId: D,
   MenuProps: k = {},
   multiple: N,
   name: E,
   onBlur: A,
   onChange: O,
   onClose: L,
   onFocus: U,
   onOpen: _,
   open: G,
   readOnly: S,
   renderValue: $,
   required: H,
   SelectDisplayProps: V = {},
   tabIndex: X,
   type: W,
   value: z,
   variant: I = "standard",
   ...Q
  } = r, [Z, j] = us({
   controlled: z,
   default: g,
   name: "Select"
  }), [q, ee] = us({
   controlled: G,
   default: m,
   name: "Select"
  }), ne = y.useRef(null), ce = y.useRef(null), [le, re] = y.useState(null), {
   current: ye
  } = y.useRef(G != null), [ge, Te] = y.useState(), fe = tn(a, C), Oe = y.useCallback(Me => {
   ce.current = Me, Me && re(Me)
  }, []), we = le == null ? void 0 : le.parentNode;
  y.useImperativeHandle(fe, () => ({
   focus: () => {
    ce.current.focus()
   },
   node: ne.current,
   value: Z
  }), [Z]), y.useEffect(() => {
   m && q && le && !ye && (Te(d ? null : we.clientWidth), ce.current.focus())
  }, [le, d]), y.useEffect(() => {
   c && ce.current.focus()
  }, [c]), y.useEffect(() => {
   if (!D) return;
   const Me = sn(ce.current).getElementById(D);
   if (Me) {
    const tt = () => {
     getSelection().isCollapsed && ce.current.focus()
    };
    return Me.addEventListener("click", tt), () => {
     Me.removeEventListener("click", tt)
    }
   }
  }, [D]);
  const Se = (Me, tt) => {
    Me ? _ && _(tt) : L && L(tt), ye || (Te(d ? null : we.clientWidth), ee(Me))
   },
   Re = Me => {
    Me.button === 0 && (Me.preventDefault(), ce.current.focus(), Se(!0, Me))
   },
   ze = Me => {
    Se(!1, Me)
   },
   it = y.Children.toArray(f),
   Ne = Me => {
    const tt = it.find(gt => gt.props.value === Me.target.value);
    tt !== void 0 && (j(tt.props.value), O && O(Me, tt))
   },
   Je = Me => tt => {
    let gt;
    if (tt.currentTarget.hasAttribute("tabindex")) {
     if (N) {
      gt = Array.isArray(Z) ? Z.slice() : [];
      const rn = Z.indexOf(Me.props.value);
      rn === -1 ? gt.push(Me.props.value) : gt.splice(rn, 1)
     } else gt = Me.props.value;
     if (Me.props.onClick && Me.props.onClick(tt), Z !== gt && (j(gt), O)) {
      const rn = tt.nativeEvent || tt,
       On = new rn.constructor(rn.type, rn);
      Object.defineProperty(On, "target", {
       writable: !0,
       value: {
        value: gt,
        name: E
       }
      }), O(On, Me)
     }
     N || Se(!1, tt)
    }
   },
   Ke = Me => {
    S || [" ", "ArrowUp", "ArrowDown", "Enter"].includes(Me.key) && (Me.preventDefault(), Se(!0, Me))
   },
   Pe = le !== null && q,
   He = Me => {
    !Pe && A && (Object.defineProperty(Me, "target", {
     writable: !0,
     value: {
      value: Z,
      name: E
     }
    }), A(Me))
   };
  delete Q["aria-invalid"];
  let Ee, mt;
  const ot = [];
  let de = !1;
  (Cu({
   value: Z
  }) || w) && ($ ? Ee = $(Z) : de = !0);
  const me = it.map(Me => {
   if (!y.isValidElement(Me)) return null;
   let tt;
   if (N) {
    if (!Array.isArray(Z)) throw new Error(uo(2));
    tt = Z.some(gt => mb(gt, Me.props.value)), tt && de && ot.push(Me.props.children)
   } else tt = mb(Z, Me.props.value), tt && de && (mt = Me.props.children);
   return y.cloneElement(Me, {
    "aria-selected": tt ? "true" : "false",
    onClick: Je(Me),
    onKeyUp: gt => {
     gt.key === " " && gt.preventDefault(), Me.props.onKeyUp && Me.props.onKeyUp(gt)
    },
    role: "option",
    selected: tt,
    value: void 0,
    "data-value": Me.props.value
   })
  });
  de && (N ? ot.length === 0 ? Ee = null : Ee = ot.reduce((Me, tt, gt) => (Me.push(tt), gt < ot.length - 1 && Me.push(", "), Me), []) : Ee = mt);
  let ve = ge;
  !d && ye && le && (ve = we.clientWidth);
  let De;
  typeof X < "u" ? De = X : De = b ? null : 0;
  const be = V.id || (E ? `mui-component-select-${E}` : void 0),
   xe = {
    ...r,
    variant: I,
    value: Z,
    open: Pe,
    error: R
   },
   he = $3(xe),
   Qe = {
    ...k.PaperProps,
    ...(Xe = k.slotProps) == null ? void 0 : Xe.paper
   },
   Be = $i();
  return v.jsxs(y.Fragment, {
   children: [v.jsx(j3, {
    as: "div",
    ref: Oe,
    tabIndex: De,
    role: "combobox",
    "aria-controls": Pe ? Be : void 0,
    "aria-disabled": b ? "true" : void 0,
    "aria-expanded": Pe ? "true" : "false",
    "aria-haspopup": "listbox",
    "aria-label": s,
    "aria-labelledby": [D, be].filter(Boolean).join(" ") || void 0,
    "aria-describedby": i,
    "aria-required": H ? "true" : void 0,
    "aria-invalid": R ? "true" : void 0,
    onKeyDown: Ke,
    onMouseDown: b || S ? null : Re,
    onBlur: He,
    onFocus: U,
    ...V,
    ownerState: xe,
    className: Ae(V.className, he.select, h),
    id: be,
    children: B3(Ee) ? hb || (hb = v.jsx("span", {
     className: "notranslate",
     "aria-hidden": !0,
     children: "​"
    })) : Ee
   }), v.jsx(L3, {
    "aria-invalid": R,
    value: Array.isArray(Z) ? Z.join(",") : Z,
    name: E,
    ref: ne,
    "aria-hidden": !0,
    onChange: Ne,
    tabIndex: -1,
    disabled: b,
    className: he.nativeInput,
    autoFocus: c,
    required: H,
    ...Q,
    ownerState: xe
   }), v.jsx(N3, {
    as: T,
    className: he.icon,
    ownerState: xe
   }), v.jsx(ax, {
    id: `menu-${E||""}`,
    anchorEl: we,
    open: Pe,
    onClose: ze,
    anchorOrigin: {
     vertical: "bottom",
     horizontal: "center"
    },
    transformOrigin: {
     vertical: "top",
     horizontal: "center"
    },
    ...k,
    slotProps: {
     ...k.slotProps,
     list: {
      "aria-labelledby": D,
      role: "listbox",
      "aria-multiselectable": N ? "true" : void 0,
      disableListWrap: !0,
      id: Be,
      ...k.MenuListProps
     },
     paper: {
      ...Qe,
      style: {
       minWidth: ve,
       ...Qe != null ? Qe.style : null
      }
     }
    },
    children: me
   })]
  })
 }),
 U3 = e => {
  const {
   classes: r
  } = e, i = Ie({
   root: ["root"]
  }, sx, r);
  return {
   ...r,
   ...i
  }
 },
 Fh = {
  name: "MuiSelect",
  overridesResolver: (e, r) => r.root,
  shouldForwardProp: e => zn(e) && e !== "variant",
  slot: "Root"
 },
 I3 = pe(Yh, Fh)(""),
 P3 = pe(Wh, Fh)(""),
 H3 = pe(Gh, Fh)(""),
 Kh = y.forwardRef(function(r, a) {
  const i = Ge({
    name: "MuiSelect",
    props: r
   }),
   {
    autoWidth: s = !1,
    children: c,
    classes: d = {},
    className: f,
    defaultOpen: h = !1,
    displayEmpty: m = !1,
    IconComponent: g = AM,
    id: b,
    input: w,
    inputProps: R,
    label: T,
    labelId: C,
    MenuProps: D,
    multiple: k = !1,
    native: N = !1,
    onClose: E,
    onOpen: A,
    open: O,
    renderValue: L,
    SelectDisplayProps: U,
    variant: _ = "outlined",
    ...G
   } = i,
   S = N ? E3 : _3,
   $ = ho(),
   H = wa({
    props: i,
    muiFormControl: $,
    states: ["variant", "error"]
   }),
   V = H.variant || _,
   X = {
    ...i,
    variant: V,
    classes: d
   },
   W = U3(X),
   {
    root: z,
    ...I
   } = W,
   Q = w || {
    standard: v.jsx(I3, {
     ownerState: X
    }),
    outlined: v.jsx(P3, {
     label: T,
     ownerState: X
    }),
    filled: v.jsx(H3, {
     ownerState: X
    })
   } [V],
   Z = tn(a, Ca(Q));
  return v.jsx(y.Fragment, {
   children: y.cloneElement(Q, {
    inputComponent: S,
    inputProps: {
     children: c,
     error: H.error,
     IconComponent: g,
     variant: V,
     type: void 0,
     multiple: k,
     ...N ? {
      id: b
     } : {
      autoWidth: s,
      defaultOpen: h,
      displayEmpty: m,
      labelId: C,
      MenuProps: D,
      onClose: E,
      onOpen: A,
      open: O,
      renderValue: L,
      SelectDisplayProps: {
       id: b,
       ...U
      }
     },
     ...R,
     classes: R ? bn(I, R.classes) : I,
     ...w ? w.props.inputProps : {}
    },
    ...(k && N || m) && V === "outlined" ? {
     notched: !0
    } : {},
    ref: Z,
    className: Ae(Q.props.className, f, W.root),
    ...!w && {
     variant: V
    },
    ...G
   })
  })
 });
Kh.muiName = "Select";

function q3(e) {
 return Ue("MuiSkeleton", e)
}
Ve("MuiSkeleton", ["root", "text", "rectangular", "rounded", "circular", "pulse", "wave", "withChildren", "fitContent", "heightAuto"]);
const V3 = e => {
  const {
   classes: r,
   variant: a,
   animation: i,
   hasChildren: s,
   width: c,
   height: d
  } = e;
  return Ie({
   root: ["root", a, i, s && "withChildren", s && !c && "fitContent", s && !d && "heightAuto"]
  }, q3, r)
 },
 sh = Sa`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`,
 ch = Sa`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`,
 G3 = typeof sh != "string" ? ws`
        animation: ${sh} 2s ease-in-out 0.5s infinite;
      ` : null,
 Y3 = typeof ch != "string" ? ws`
        &::after {
          animation: ${ch} 2s linear 0.5s infinite;
        }
      ` : null,
 X3 = pe("span", {
  name: "MuiSkeleton",
  slot: "Root",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.root, r[a.variant], a.animation !== !1 && r[a.animation], a.hasChildren && r.withChildren, a.hasChildren && !a.width && r.fitContent, a.hasChildren && !a.height && r.heightAuto]
  }
 })(Ye(({
  theme: e
 }) => {
  const r = qE(e.shape.borderRadius) || "px",
   a = VE(e.shape.borderRadius);
  return {
   display: "block",
   backgroundColor: e.vars ? e.vars.palette.Skeleton.bg : Qt(e.palette.text.primary, e.palette.mode === "light" ? .11 : .13),
   height: "1.2em",
   variants: [{
    props: {
     variant: "text"
    },
    style: {
     marginTop: 0,
     marginBottom: 0,
     height: "auto",
     transformOrigin: "0 55%",
     transform: "scale(1, 0.60)",
     borderRadius: `${a}${r}/${Math.round(a/.6*10)/10}${r}`,
     "&:empty:before": {
      content: '"\\00a0"'
     }
    }
   }, {
    props: {
     variant: "circular"
    },
    style: {
     borderRadius: "50%"
    }
   }, {
    props: {
     variant: "rounded"
    },
    style: {
     borderRadius: (e.vars || e).shape.borderRadius
    }
   }, {
    props: ({
     ownerState: i
    }) => i.hasChildren,
    style: {
     "& > *": {
      visibility: "hidden"
     }
    }
   }, {
    props: ({
     ownerState: i
    }) => i.hasChildren && !i.width,
    style: {
     maxWidth: "fit-content"
    }
   }, {
    props: ({
     ownerState: i
    }) => i.hasChildren && !i.height,
    style: {
     height: "auto"
    }
   }, {
    props: {
     animation: "pulse"
    },
    style: G3 || {
     animation: `${sh} 2s ease-in-out 0.5s infinite`
    }
   }, {
    props: {
     animation: "wave"
    },
    style: {
     position: "relative",
     overflow: "hidden",
     WebkitMaskImage: "-webkit-radial-gradient(white, black)",
     "&::after": {
      background: `linear-gradient(
                90deg,
                transparent,
                ${(e.vars||e).palette.action.hover},
                transparent
              )`,
      content: '""',
      position: "absolute",
      transform: "translateX(-100%)",
      bottom: 0,
      left: 0,
      right: 0,
      top: 0
     }
    }
   }, {
    props: {
     animation: "wave"
    },
    style: Y3 || {
     "&::after": {
      animation: `${ch} 2s linear 0.5s infinite`
     }
    }
   }]
  }
 })),
 gb = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiSkeleton"
   }),
   {
    animation: s = "pulse",
    className: c,
    component: d = "span",
    height: f,
    style: h,
    variant: m = "text",
    width: g,
    ...b
   } = i,
   w = {
    ...i,
    animation: s,
    component: d,
    variant: m,
    hasChildren: !!b.children
   },
   R = V3(w);
  return v.jsx(X3, {
   as: d,
   ref: a,
   className: Ae(R.root, c),
   ownerState: w,
   ...b,
   style: {
    width: g,
    height: f,
    ...h
   }
  })
 });

function W3(e, r, a = (i, s) => i === s) {
 return e.length === r.length && e.every((i, s) => a(i, r[s]))
}
const F3 = 2;

function di(e, r, a, i, s) {
 return a === 1 ? Math.min(e + r, s) : Math.max(e - r, i)
}

function cx(e, r) {
 return e - r
}

function vb(e, r) {
 const {
  index: a
 } = e.reduce((i, s, c) => {
  const d = Math.abs(r - s);
  return i === null || d < i.distance || d === i.distance ? {
   distance: d,
   index: c
  } : i
 }, null) ?? {};
 return a
}

function Jc(e, r) {
 if (r.current !== void 0 && e.changedTouches) {
  const a = e;
  for (let i = 0; i < a.changedTouches.length; i += 1) {
   const s = a.changedTouches[i];
   if (s.identifier === r.current) return {
    x: s.clientX,
    y: s.clientY
   }
  }
  return !1
 }
 return {
  x: e.clientX,
  y: e.clientY
 }
}

function wu(e, r, a) {
 return (e - r) * 100 / (a - r)
}

function K3(e, r, a) {
 return (a - r) * e + r
}

function Q3(e) {
 if (Math.abs(e) < 1) {
  const a = e.toExponential().split("e-"),
   i = a[0].split(".")[1];
  return (i ? i.length : 0) + parseInt(a[1], 10)
 }
 const r = e.toString().split(".")[1];
 return r ? r.length : 0
}

function Z3(e, r, a) {
 const i = Math.round((e - a) / r) * r + a;
 return Number(i.toFixed(Q3(r)))
}

function yb({
 values: e,
 newValue: r,
 index: a
}) {
 const i = e.slice();
 return i[a] = r, i.sort(cx)
}

function eu({
 sliderRef: e,
 activeIndex: r,
 setActive: a
}) {
 var s, c, d;
 const i = sn(e.current);
 (!((s = e.current) != null && s.contains(i.activeElement)) || Number((c = i == null ? void 0 : i.activeElement) == null ? void 0 : c.getAttribute("data-index")) !== r) && ((d = e.current) == null || d.querySelector(`[type="range"][data-index="${r}"]`).focus()), a && a(r)
}

function tu(e, r) {
 return typeof e == "number" && typeof r == "number" ? e === r : typeof e == "object" && typeof r == "object" ? W3(e, r) : !1
}
const J3 = {
  horizontal: {
   offset: e => ({
    left: `${e}%`
   }),
   leap: e => ({
    width: `${e}%`
   })
  },
  "horizontal-reverse": {
   offset: e => ({
    right: `${e}%`
   }),
   leap: e => ({
    width: `${e}%`
   })
  },
  vertical: {
   offset: e => ({
    bottom: `${e}%`
   }),
   leap: e => ({
    height: `${e}%`
   })
  }
 },
 e4 = e => e;
let nu;

function bb() {
 return nu === void 0 && (typeof CSS < "u" && typeof CSS.supports == "function" ? nu = CSS.supports("touch-action", "none") : nu = !0), nu
}

function t4(e) {
 const {
  "aria-labelledby": r,
  defaultValue: a,
  disabled: i = !1,
  disableSwap: s = !1,
  isRtl: c = !1,
  marks: d = !1,
  max: f = 100,
  min: h = 0,
  name: m,
  onChange: g,
  onChangeCommitted: b,
  orientation: w = "horizontal",
  rootRef: R,
  scale: T = e4,
  step: C = 1,
  shiftStep: D = 10,
  tabIndex: k,
  value: N
 } = e, E = y.useRef(void 0), [A, O] = y.useState(-1), [L, U] = y.useState(-1), [_, G] = y.useState(!1), S = y.useRef(0), $ = y.useRef(null), [H, V] = us({
  controlled: N,
  default: a ?? h,
  name: "Slider"
 }), X = g && ((de, me, ve) => {
  const De = de.nativeEvent || de,
   be = new De.constructor(De.type, De);
  Object.defineProperty(be, "target", {
   writable: !0,
   value: {
    value: me,
    name: m
   }
  }), $.current = me, g(be, me, ve)
 }), W = Array.isArray(H);
 let z = W ? H.slice().sort(cx) : [H];
 z = z.map(de => de == null ? h : fi(de, h, f));
 const I = d === !0 && C !== null ? [...Array(Math.floor((f - h) / C) + 1)].map((de, me) => ({
   value: h + C * me
  })) : d || [],
  Q = I.map(de => de.value),
  [Z, j] = y.useState(-1),
  q = y.useRef(null),
  ee = tn(R, q),
  ne = de => me => {
   var De;
   const ve = Number(me.currentTarget.getAttribute("data-index"));
   Mi(me.target) && j(ve), U(ve), (De = de == null ? void 0 : de.onFocus) == null || De.call(de, me)
  },
  ce = de => me => {
   var ve;
   Mi(me.target) || j(-1), U(-1), (ve = de == null ? void 0 : de.onBlur) == null || ve.call(de, me)
  },
  le = (de, me) => {
   const ve = Number(de.currentTarget.getAttribute("data-index")),
    De = z[ve],
    be = Q.indexOf(De);
   let xe = me;
   if (I && C == null) {
    const he = Q[Q.length - 1];
    xe >= he ? xe = he : xe <= Q[0] ? xe = Q[0] : xe = xe < De ? Q[be - 1] : Q[be + 1]
   }
   if (xe = fi(xe, h, f), W) {
    s && (xe = fi(xe, z[ve - 1] || -1 / 0, z[ve + 1] || 1 / 0));
    const he = xe;
    xe = yb({
     values: z,
     newValue: xe,
     index: ve
    });
    let Qe = ve;
    s || (Qe = xe.indexOf(he)), eu({
     sliderRef: q,
     activeIndex: Qe
    })
   }
   V(xe), j(ve), X && !tu(xe, H) && X(de, xe, ve), b && b(de, $.current ?? xe)
  },
  re = de => me => {
   var ve;
   if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "PageUp", "PageDown", "Home", "End"].includes(me.key)) {
    me.preventDefault();
    const De = Number(me.currentTarget.getAttribute("data-index")),
     be = z[De];
    let xe = null;
    if (C != null) {
     const he = me.shiftKey ? D : C;
     switch (me.key) {
      case "ArrowUp":
       xe = di(be, he, 1, h, f);
       break;
      case "ArrowRight":
       xe = di(be, he, c ? -1 : 1, h, f);
       break;
      case "ArrowDown":
       xe = di(be, he, -1, h, f);
       break;
      case "ArrowLeft":
       xe = di(be, he, c ? 1 : -1, h, f);
       break;
      case "PageUp":
       xe = di(be, D, 1, h, f);
       break;
      case "PageDown":
       xe = di(be, D, -1, h, f);
       break;
      case "Home":
       xe = h;
       break;
      case "End":
       xe = f;
       break
     }
    } else if (I) {
     const he = Q[Q.length - 1],
      Qe = Q.indexOf(be),
      Be = [c ? "ArrowRight" : "ArrowLeft", "ArrowDown", "PageDown", "Home"],
      Xe = [c ? "ArrowLeft" : "ArrowRight", "ArrowUp", "PageUp", "End"];
     Be.includes(me.key) ? Qe === 0 ? xe = Q[0] : xe = Q[Qe - 1] : Xe.includes(me.key) && (Qe === Q.length - 1 ? xe = he : xe = Q[Qe + 1])
    }
    xe != null && le(me, xe)
   }(ve = de == null ? void 0 : de.onKeyDown) == null || ve.call(de, me)
  };
 vr(() => {
  var de;
  i && q.current.contains(document.activeElement) && ((de = document.activeElement) == null || de.blur())
 }, [i]), i && A !== -1 && O(-1), i && Z !== -1 && j(-1);
 const ye = de => me => {
   var ve;
   (ve = de.onChange) == null || ve.call(de, me), le(me, me.target.valueAsNumber)
  },
  ge = y.useRef(void 0);
 let Te = w;
 c && w === "horizontal" && (Te += "-reverse");
 const fe = ({
   finger: de,
   move: me = !1
  }) => {
   const {
    current: ve
   } = q, {
    width: De,
    height: be,
    bottom: xe,
    left: he
   } = ve.getBoundingClientRect();
   let Qe;
   Te.startsWith("vertical") ? Qe = (xe - de.y) / be : Qe = (de.x - he) / De, Te.includes("-reverse") && (Qe = 1 - Qe);
   let Be;
   if (Be = K3(Qe, h, f), C) Be = Z3(Be, C, h);
   else {
    const Me = vb(Q, Be);
    Be = Q[Me]
   }
   Be = fi(Be, h, f);
   let Xe = 0;
   if (W) {
    me ? Xe = ge.current : Xe = vb(z, Be), s && (Be = fi(Be, z[Xe - 1] || -1 / 0, z[Xe + 1] || 1 / 0));
    const Me = Be;
    Be = yb({
     values: z,
     newValue: Be,
     index: Xe
    }), s && me || (Xe = Be.indexOf(Me), ge.current = Xe)
   }
   return {
    newValue: Be,
    activeIndex: Xe
   }
  },
  Oe = kn(de => {
   const me = Jc(de, E);
   if (!me) return;
   if (S.current += 1, de.type === "mousemove" && de.buttons === 0) {
    we(de);
    return
   }
   const {
    newValue: ve,
    activeIndex: De
   } = fe({
    finger: me,
    move: !0
   });
   eu({
    sliderRef: q,
    activeIndex: De,
    setActive: O
   }), V(ve), !_ && S.current > F3 && G(!0), X && !tu(ve, H) && X(de, ve, De)
  }),
  we = kn(de => {
   const me = Jc(de, E);
   if (G(!1), !me) return;
   const {
    newValue: ve
   } = fe({
    finger: me,
    move: !0
   });
   O(-1), de.type === "touchend" && U(-1), b && b(de, $.current ?? ve), E.current = void 0, Re()
  }),
  Se = kn(de => {
   if (i) return;
   bb() || de.preventDefault();
   const me = de.changedTouches[0];
   me != null && (E.current = me.identifier);
   const ve = Jc(de, E);
   if (ve !== !1) {
    const {
     newValue: be,
     activeIndex: xe
    } = fe({
     finger: ve
    });
    eu({
     sliderRef: q,
     activeIndex: xe,
     setActive: O
    }), V(be), X && !tu(be, H) && X(de, be, xe)
   }
   S.current = 0;
   const De = sn(q.current);
   De.addEventListener("touchmove", Oe, {
    passive: !0
   }), De.addEventListener("touchend", we, {
    passive: !0
   })
  }),
  Re = y.useCallback(() => {
   const de = sn(q.current);
   de.removeEventListener("mousemove", Oe), de.removeEventListener("mouseup", we), de.removeEventListener("touchmove", Oe), de.removeEventListener("touchend", we)
  }, [we, Oe]);
 y.useEffect(() => {
  const {
   current: de
  } = q;
  return de.addEventListener("touchstart", Se, {
   passive: bb()
  }), () => {
   de.removeEventListener("touchstart", Se), Re()
  }
 }, [Re, Se]), y.useEffect(() => {
  i && Re()
 }, [i, Re]);
 const ze = de => me => {
   var be;
   if ((be = de.onMouseDown) == null || be.call(de, me), i || me.defaultPrevented || me.button !== 0) return;
   me.preventDefault();
   const ve = Jc(me, E);
   if (ve !== !1) {
    const {
     newValue: xe,
     activeIndex: he
    } = fe({
     finger: ve
    });
    eu({
     sliderRef: q,
     activeIndex: he,
     setActive: O
    }), V(xe), X && !tu(xe, H) && X(me, xe, he)
   }
   S.current = 0;
   const De = sn(q.current);
   De.addEventListener("mousemove", Oe, {
    passive: !0
   }), De.addEventListener("mouseup", we)
  },
  it = wu(W ? z[0] : h, h, f),
  Ne = wu(z[z.length - 1], h, f) - it,
  Je = (de = {}) => {
   const me = ha(de),
    ve = {
     onMouseDown: ze(me || {})
    },
    De = {
     ...me,
     ...ve
    };
   return {
    ...de,
    ref: ee,
    ...De
   }
  },
  Ke = de => me => {
   var De;
   (De = de.onMouseOver) == null || De.call(de, me);
   const ve = Number(me.currentTarget.getAttribute("data-index"));
   U(ve)
  },
  Pe = de => me => {
   var ve;
   (ve = de.onMouseLeave) == null || ve.call(de, me), U(-1)
  },
  He = (de = {}) => {
   const me = ha(de),
    ve = {
     onMouseOver: Ke(me || {}),
     onMouseLeave: Pe(me || {})
    };
   return {
    ...de,
    ...me,
    ...ve
   }
  },
  Ee = de => ({
   pointerEvents: A !== -1 && A !== de ? "none" : void 0
  });
 let mt;
 return w === "vertical" && (mt = c ? "vertical-rl" : "vertical-lr"), {
  active: A,
  axis: Te,
  axisProps: J3,
  dragging: _,
  focusedThumbIndex: Z,
  getHiddenInputProps: (de = {}) => {
   const me = ha(de),
    ve = {
     onChange: ye(me || {}),
     onFocus: ne(me || {}),
     onBlur: ce(me || {}),
     onKeyDown: re(me || {})
    },
    De = {
     ...me,
     ...ve
    };
   return {
    tabIndex: k,
    "aria-labelledby": r,
    "aria-orientation": w,
    "aria-valuemax": T(f),
    "aria-valuemin": T(h),
    name: m,
    type: "range",
    min: e.min,
    max: e.max,
    step: e.step === null && e.marks ? "any" : e.step ?? void 0,
    disabled: i,
    ...de,
    ...De,
    style: {
     ...jR,
     direction: c ? "rtl" : "ltr",
     width: "100%",
     height: "100%",
     writingMode: mt
    }
   }
  },
  getRootProps: Je,
  getThumbProps: He,
  marks: I,
  open: L,
  range: W,
  rootRef: ee,
  trackLeap: Ne,
  trackOffset: it,
  values: z,
  getThumbStyle: Ee
 }
}
const n4 = e => !e || !ga(e);

function r4(e) {
 return Ue("MuiSlider", e)
}
const mr = Ve("MuiSlider", ["root", "active", "colorPrimary", "colorSecondary", "colorError", "colorInfo", "colorSuccess", "colorWarning", "disabled", "dragging", "focusVisible", "mark", "markActive", "marked", "markLabel", "markLabelActive", "rail", "sizeSmall", "thumb", "thumbColorPrimary", "thumbColorSecondary", "thumbColorError", "thumbColorSuccess", "thumbColorInfo", "thumbColorWarning", "track", "trackInverted", "trackFalse", "thumbSizeSmall", "valueLabel", "valueLabelOpen", "valueLabelCircle", "valueLabelLabel", "vertical"]),
 o4 = e => {
  const {
   open: r
  } = e;
  return {
   offset: Ae(r && mr.valueLabelOpen),
   circle: mr.valueLabelCircle,
   label: mr.valueLabelLabel
  }
 };

function a4(e) {
 const {
  children: r,
  className: a,
  value: i
 } = e, s = o4(e);
 return r ? y.cloneElement(r, {
  className: Ae(r.props.className)
 }, v.jsxs(y.Fragment, {
  children: [r.props.children, v.jsx("span", {
   className: Ae(s.offset, a),
   "aria-hidden": !0,
   children: v.jsx("span", {
    className: s.circle,
    children: v.jsx("span", {
     className: s.label,
     children: i
    })
   })
  })]
 })) : null
}

function xb(e) {
 return e
}
const i4 = pe("span", {
  name: "MuiSlider",
  slot: "Root",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.root, r[`color${Ce(a.color)}`], a.size !== "medium" && r[`size${Ce(a.size)}`], a.marked && r.marked, a.orientation === "vertical" && r.vertical, a.track === "inverted" && r.trackInverted, a.track === !1 && r.trackFalse]
  }
 })(Ye(({
  theme: e
 }) => ({
  borderRadius: 12,
  boxSizing: "content-box",
  display: "inline-block",
  position: "relative",
  cursor: "pointer",
  touchAction: "none",
  WebkitTapHighlightColor: "transparent",
  "@media print": {
   colorAdjust: "exact"
  },
  [`&.${mr.disabled}`]: {
   pointerEvents: "none",
   cursor: "default",
   color: (e.vars || e).palette.grey[400]
  },
  [`&.${mr.dragging}`]: {
   [`& .${mr.thumb}, & .${mr.track}`]: {
    transition: "none"
   }
  },
  variants: [...Object.entries(e.palette).filter(Rn()).map(([r]) => ({
   props: {
    color: r
   },
   style: {
    color: (e.vars || e).palette[r].main
   }
  })), {
   props: {
    orientation: "horizontal"
   },
   style: {
    height: 4,
    width: "100%",
    padding: "13px 0",
    "@media (pointer: coarse)": {
     padding: "20px 0"
    }
   }
  }, {
   props: {
    orientation: "horizontal",
    size: "small"
   },
   style: {
    height: 2
   }
  }, {
   props: {
    orientation: "horizontal",
    marked: !0
   },
   style: {
    marginBottom: 20
   }
  }, {
   props: {
    orientation: "vertical"
   },
   style: {
    height: "100%",
    width: 4,
    padding: "0 13px",
    "@media (pointer: coarse)": {
     padding: "0 20px"
    }
   }
  }, {
   props: {
    orientation: "vertical",
    size: "small"
   },
   style: {
    width: 2
   }
  }, {
   props: {
    orientation: "vertical",
    marked: !0
   },
   style: {
    marginRight: 44
   }
  }]
 }))),
 l4 = pe("span", {
  name: "MuiSlider",
  slot: "Rail",
  overridesResolver: (e, r) => r.rail
 })({
  display: "block",
  position: "absolute",
  borderRadius: "inherit",
  backgroundColor: "currentColor",
  opacity: .38,
  variants: [{
   props: {
    orientation: "horizontal"
   },
   style: {
    width: "100%",
    height: "inherit",
    top: "50%",
    transform: "translateY(-50%)"
   }
  }, {
   props: {
    orientation: "vertical"
   },
   style: {
    height: "100%",
    width: "inherit",
    left: "50%",
    transform: "translateX(-50%)"
   }
  }, {
   props: {
    track: "inverted"
   },
   style: {
    opacity: 1
   }
  }]
 }),
 s4 = pe("span", {
  name: "MuiSlider",
  slot: "Track",
  overridesResolver: (e, r) => r.track
 })(Ye(({
  theme: e
 }) => ({
  display: "block",
  position: "absolute",
  borderRadius: "inherit",
  border: "1px solid currentColor",
  backgroundColor: "currentColor",
  transition: e.transitions.create(["left", "width", "bottom", "height"], {
   duration: e.transitions.duration.shortest
  }),
  variants: [{
   props: {
    size: "small"
   },
   style: {
    border: "none"
   }
  }, {
   props: {
    orientation: "horizontal"
   },
   style: {
    height: "inherit",
    top: "50%",
    transform: "translateY(-50%)"
   }
  }, {
   props: {
    orientation: "vertical"
   },
   style: {
    width: "inherit",
    left: "50%",
    transform: "translateX(-50%)"
   }
  }, {
   props: {
    track: !1
   },
   style: {
    display: "none"
   }
  }, ...Object.entries(e.palette).filter(Rn()).map(([r]) => ({
   props: {
    color: r,
    track: "inverted"
   },
   style: {
    ...e.vars ? {
     backgroundColor: e.vars.palette.Slider[`${r}Track`],
     borderColor: e.vars.palette.Slider[`${r}Track`]
    } : {
     backgroundColor: ba(e.palette[r].main, .62),
     borderColor: ba(e.palette[r].main, .62),
     ...e.applyStyles("dark", {
      backgroundColor: ya(e.palette[r].main, .5)
     }),
     ...e.applyStyles("dark", {
      borderColor: ya(e.palette[r].main, .5)
     })
    }
   }
  }))]
 }))),
 c4 = pe("span", {
  name: "MuiSlider",
  slot: "Thumb",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.thumb, r[`thumbColor${Ce(a.color)}`], a.size !== "medium" && r[`thumbSize${Ce(a.size)}`]]
  }
 })(Ye(({
  theme: e
 }) => ({
  position: "absolute",
  width: 20,
  height: 20,
  boxSizing: "border-box",
  borderRadius: "50%",
  outline: 0,
  backgroundColor: "currentColor",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: e.transitions.create(["box-shadow", "left", "bottom"], {
   duration: e.transitions.duration.shortest
  }),
  "&::before": {
   position: "absolute",
   content: '""',
   borderRadius: "inherit",
   width: "100%",
   height: "100%",
   boxShadow: (e.vars || e).shadows[2]
  },
  "&::after": {
   position: "absolute",
   content: '""',
   borderRadius: "50%",
   width: 42,
   height: 42,
   top: "50%",
   left: "50%",
   transform: "translate(-50%, -50%)"
  },
  [`&.${mr.disabled}`]: {
   "&:hover": {
    boxShadow: "none"
   }
  },
  variants: [{
   props: {
    size: "small"
   },
   style: {
    width: 12,
    height: 12,
    "&::before": {
     boxShadow: "none"
    }
   }
  }, {
   props: {
    orientation: "horizontal"
   },
   style: {
    top: "50%",
    transform: "translate(-50%, -50%)"
   }
  }, {
   props: {
    orientation: "vertical"
   },
   style: {
    left: "50%",
    transform: "translate(-50%, 50%)"
   }
  }, ...Object.entries(e.palette).filter(Rn()).map(([r]) => ({
   props: {
    color: r
   },
   style: {
    [`&:hover, &.${mr.focusVisible}`]: {
     ...e.vars ? {
      boxShadow: `0px 0px 0px 8px rgba(${e.vars.palette[r].mainChannel} / 0.16)`
     } : {
      boxShadow: `0px 0px 0px 8px ${Qt(e.palette[r].main,.16)}`
     },
     "@media (hover: none)": {
      boxShadow: "none"
     }
    },
    [`&.${mr.active}`]: {
     ...e.vars ? {
      boxShadow: `0px 0px 0px 14px rgba(${e.vars.palette[r].mainChannel} / 0.16)`
     } : {
      boxShadow: `0px 0px 0px 14px ${Qt(e.palette[r].main,.16)}`
     }
    }
   }
  }))]
 }))),
 u4 = pe(a4, {
  name: "MuiSlider",
  slot: "ValueLabel",
  overridesResolver: (e, r) => r.valueLabel
 })(Ye(({
  theme: e
 }) => ({
  zIndex: 1,
  whiteSpace: "nowrap",
  ...e.typography.body2,
  fontWeight: 500,
  transition: e.transitions.create(["transform"], {
   duration: e.transitions.duration.shortest
  }),
  position: "absolute",
  backgroundColor: (e.vars || e).palette.grey[600],
  borderRadius: 2,
  color: (e.vars || e).palette.common.white,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.25rem 0.75rem",
  variants: [{
   props: {
    orientation: "horizontal"
   },
   style: {
    transform: "translateY(-100%) scale(0)",
    top: "-10px",
    transformOrigin: "bottom center",
    "&::before": {
     position: "absolute",
     content: '""',
     width: 8,
     height: 8,
     transform: "translate(-50%, 50%) rotate(45deg)",
     backgroundColor: "inherit",
     bottom: 0,
     left: "50%"
    },
    [`&.${mr.valueLabelOpen}`]: {
     transform: "translateY(-100%) scale(1)"
    }
   }
  }, {
   props: {
    orientation: "vertical"
   },
   style: {
    transform: "translateY(-50%) scale(0)",
    right: "30px",
    top: "50%",
    transformOrigin: "right center",
    "&::before": {
     position: "absolute",
     content: '""',
     width: 8,
     height: 8,
     transform: "translate(-50%, -50%) rotate(45deg)",
     backgroundColor: "inherit",
     right: -8,
     top: "50%"
    },
    [`&.${mr.valueLabelOpen}`]: {
     transform: "translateY(-50%) scale(1)"
    }
   }
  }, {
   props: {
    size: "small"
   },
   style: {
    fontSize: e.typography.pxToRem(12),
    padding: "0.25rem 0.5rem"
   }
  }, {
   props: {
    orientation: "vertical",
    size: "small"
   },
   style: {
    right: "20px"
   }
  }]
 }))),
 d4 = pe("span", {
  name: "MuiSlider",
  slot: "Mark",
  shouldForwardProp: e => Vu(e) && e !== "markActive",
  overridesResolver: (e, r) => {
   const {
    markActive: a
   } = e;
   return [r.mark, a && r.markActive]
  }
 })(Ye(({
  theme: e
 }) => ({
  position: "absolute",
  width: 2,
  height: 2,
  borderRadius: 1,
  backgroundColor: "currentColor",
  variants: [{
   props: {
    orientation: "horizontal"
   },
   style: {
    top: "50%",
    transform: "translate(-1px, -50%)"
   }
  }, {
   props: {
    orientation: "vertical"
   },
   style: {
    left: "50%",
    transform: "translate(-50%, 1px)"
   }
  }, {
   props: {
    markActive: !0
   },
   style: {
    backgroundColor: (e.vars || e).palette.background.paper,
    opacity: .8
   }
  }]
 }))),
 f4 = pe("span", {
  name: "MuiSlider",
  slot: "MarkLabel",
  shouldForwardProp: e => Vu(e) && e !== "markLabelActive",
  overridesResolver: (e, r) => r.markLabel
 })(Ye(({
  theme: e
 }) => ({
  ...e.typography.body2,
  color: (e.vars || e).palette.text.secondary,
  position: "absolute",
  whiteSpace: "nowrap",
  variants: [{
   props: {
    orientation: "horizontal"
   },
   style: {
    top: 30,
    transform: "translateX(-50%)",
    "@media (pointer: coarse)": {
     top: 40
    }
   }
  }, {
   props: {
    orientation: "vertical"
   },
   style: {
    left: 36,
    transform: "translateY(50%)",
    "@media (pointer: coarse)": {
     left: 44
    }
   }
  }, {
   props: {
    markLabelActive: !0
   },
   style: {
    color: (e.vars || e).palette.text.primary
   }
  }]
 }))),
 p4 = e => {
  const {
   disabled: r,
   dragging: a,
   marked: i,
   orientation: s,
   track: c,
   classes: d,
   color: f,
   size: h
  } = e, m = {
   root: ["root", r && "disabled", a && "dragging", i && "marked", s === "vertical" && "vertical", c === "inverted" && "trackInverted", c === !1 && "trackFalse", f && `color${Ce(f)}`, h && `size${Ce(h)}`],
   rail: ["rail"],
   track: ["track"],
   mark: ["mark"],
   markActive: ["markActive"],
   markLabel: ["markLabel"],
   markLabelActive: ["markLabelActive"],
   valueLabel: ["valueLabel"],
   thumb: ["thumb", r && "disabled", h && `thumbSize${Ce(h)}`, f && `thumbColor${Ce(f)}`],
   active: ["active"],
   disabled: ["disabled"],
   focusVisible: ["focusVisible"]
  };
  return Ie(m, r4, d)
 },
 h4 = ({
  children: e
 }) => e,
 m4 = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiSlider"
   }),
   s = Hu(),
   {
    "aria-label": c,
    "aria-valuetext": d,
    "aria-labelledby": f,
    component: h = "span",
    components: m = {},
    componentsProps: g = {},
    color: b = "primary",
    classes: w,
    className: R,
    disableSwap: T = !1,
    disabled: C = !1,
    getAriaLabel: D,
    getAriaValueText: k,
    marks: N = !1,
    max: E = 100,
    min: A = 0,
    name: O,
    onChange: L,
    onChangeCommitted: U,
    orientation: _ = "horizontal",
    shiftStep: G = 10,
    size: S = "medium",
    step: $ = 1,
    scale: H = xb,
    slotProps: V,
    slots: X,
    tabIndex: W,
    track: z = "normal",
    value: I,
    valueLabelDisplay: Q = "off",
    valueLabelFormat: Z = xb,
    ...j
   } = i,
   q = {
    ...i,
    isRtl: s,
    max: E,
    min: A,
    classes: w,
    disabled: C,
    disableSwap: T,
    orientation: _,
    marks: N,
    color: b,
    size: S,
    step: $,
    shiftStep: G,
    scale: H,
    track: z,
    valueLabelDisplay: Q,
    valueLabelFormat: Z
   },
   {
    axisProps: ee,
    getRootProps: ne,
    getHiddenInputProps: ce,
    getThumbProps: le,
    open: re,
    active: ye,
    axis: ge,
    focusedThumbIndex: Te,
    range: fe,
    dragging: Oe,
    marks: we,
    values: Se,
    trackOffset: Re,
    trackLeap: ze,
    getThumbStyle: it
   } = t4({
    ...q,
    rootRef: a
   });
  q.marked = we.length > 0 && we.some(Fe => Fe.label), q.dragging = Oe, q.focusedThumbIndex = Te;
  const Ne = p4(q),
   Je = (X == null ? void 0 : X.root) ?? m.Root ?? i4,
   Ke = (X == null ? void 0 : X.rail) ?? m.Rail ?? l4,
   Pe = (X == null ? void 0 : X.track) ?? m.Track ?? s4,
   He = (X == null ? void 0 : X.thumb) ?? m.Thumb ?? c4,
   Ee = (X == null ? void 0 : X.valueLabel) ?? m.ValueLabel ?? u4,
   mt = (X == null ? void 0 : X.mark) ?? m.Mark ?? d4,
   ot = (X == null ? void 0 : X.markLabel) ?? m.MarkLabel ?? f4,
   de = (X == null ? void 0 : X.input) ?? m.Input ?? "input",
   me = (V == null ? void 0 : V.root) ?? g.root,
   ve = (V == null ? void 0 : V.rail) ?? g.rail,
   De = (V == null ? void 0 : V.track) ?? g.track,
   be = (V == null ? void 0 : V.thumb) ?? g.thumb,
   xe = (V == null ? void 0 : V.valueLabel) ?? g.valueLabel,
   he = (V == null ? void 0 : V.mark) ?? g.mark,
   Qe = (V == null ? void 0 : V.markLabel) ?? g.markLabel,
   Be = (V == null ? void 0 : V.input) ?? g.input,
   Xe = Br({
    elementType: Je,
    getSlotProps: ne,
    externalSlotProps: me,
    externalForwardedProps: j,
    additionalProps: {
     ...n4(Je) && {
      as: h
     }
    },
    ownerState: {
     ...q,
     ...me == null ? void 0 : me.ownerState
    },
    className: [Ne.root, R]
   }),
   Me = Br({
    elementType: Ke,
    externalSlotProps: ve,
    ownerState: q,
    className: Ne.rail
   }),
   tt = Br({
    elementType: Pe,
    externalSlotProps: De,
    additionalProps: {
     style: {
      ...ee[ge].offset(Re),
      ...ee[ge].leap(ze)
     }
    },
    ownerState: {
     ...q,
     ...De == null ? void 0 : De.ownerState
    },
    className: Ne.track
   }),
   gt = Br({
    elementType: He,
    getSlotProps: le,
    externalSlotProps: be,
    ownerState: {
     ...q,
     ...be == null ? void 0 : be.ownerState
    },
    className: Ne.thumb
   }),
   rn = Br({
    elementType: Ee,
    externalSlotProps: xe,
    ownerState: {
     ...q,
     ...xe == null ? void 0 : xe.ownerState
    },
    className: Ne.valueLabel
   }),
   On = Br({
    elementType: mt,
    externalSlotProps: he,
    ownerState: q,
    className: Ne.mark
   }),
   Jn = Br({
    elementType: ot,
    externalSlotProps: Qe,
    ownerState: q,
    className: Ne.markLabel
   }),
   jn = Br({
    elementType: de,
    getSlotProps: ce,
    externalSlotProps: Be,
    ownerState: q
   });
  return v.jsxs(Je, {
   ...Xe,
   children: [v.jsx(Ke, {
    ...Me
   }), v.jsx(Pe, {
    ...tt
   }), we.filter(Fe => Fe.value >= A && Fe.value <= E).map((Fe, lt) => {
    const Pt = wu(Fe.value, A, E),
     Vt = ee[ge].offset(Pt);
    let pt;
    return z === !1 ? pt = Se.includes(Fe.value) : pt = z === "normal" && (fe ? Fe.value >= Se[0] && Fe.value <= Se[Se.length - 1] : Fe.value <= Se[0]) || z === "inverted" && (fe ? Fe.value <= Se[0] || Fe.value >= Se[Se.length - 1] : Fe.value >= Se[0]), v.jsxs(y.Fragment, {
     children: [v.jsx(mt, {
      "data-index": lt,
      ...On,
      ...!ga(mt) && {
       markActive: pt
      },
      style: {
       ...Vt,
       ...On.style
      },
      className: Ae(On.className, pt && Ne.markActive)
     }), Fe.label != null ? v.jsx(ot, {
      "aria-hidden": !0,
      "data-index": lt,
      ...Jn,
      ...!ga(ot) && {
       markLabelActive: pt
      },
      style: {
       ...Vt,
       ...Jn.style
      },
      className: Ae(Ne.markLabel, Jn.className, pt && Ne.markLabelActive),
      children: Fe.label
     }) : null]
    }, lt)
   }), Se.map((Fe, lt) => {
    const Pt = wu(Fe, A, E),
     Vt = ee[ge].offset(Pt),
     pt = Q === "off" ? h4 : Ee;
    return v.jsx(pt, {
     ...!ga(pt) && {
      valueLabelFormat: Z,
      valueLabelDisplay: Q,
      value: typeof Z == "function" ? Z(H(Fe), lt) : Z,
      index: lt,
      open: re === lt || ye === lt || Q === "on",
      disabled: C
     },
     ...rn,
     children: v.jsx(He, {
      "data-index": lt,
      ...gt,
      className: Ae(Ne.thumb, gt.className, ye === lt && Ne.active, Te === lt && Ne.focusVisible),
      style: {
       ...Vt,
       ...it(lt),
       ...gt.style
      },
      children: v.jsx(de, {
       "data-index": lt,
       "aria-label": D ? D(lt) : c,
       "aria-valuenow": H(Fe),
       "aria-labelledby": f,
       "aria-valuetext": k ? k(H(Fe), lt) : d,
       value: Se[lt],
       ...jn
      })
     })
    }, lt)
   })]
  })
 });

function g4(e = {}) {
 const {
  autoHideDuration: r = null,
  disableWindowBlurListener: a = !1,
  onClose: i,
  open: s,
  resumeHideDuration: c
 } = e, d = Uo();
 y.useEffect(() => {
  if (!s) return;

  function k(N) {
   N.defaultPrevented || N.key === "Escape" && (i == null || i(N, "escapeKeyDown"))
  }
  return document.addEventListener("keydown", k), () => {
   document.removeEventListener("keydown", k)
  }
 }, [s, i]);
 const f = kn((k, N) => {
   i == null || i(k, N)
  }),
  h = kn(k => {
   !i || k == null || d.start(k, () => {
    f(null, "timeout")
   })
  });
 y.useEffect(() => (s && h(r), d.clear), [s, r, h, d]);
 const m = k => {
   i == null || i(k, "clickaway")
  },
  g = d.clear,
  b = y.useCallback(() => {
   r != null && h(c ?? r * .5)
  }, [r, c, h]),
  w = k => N => {
   const E = k.onBlur;
   E == null || E(N), b()
  },
  R = k => N => {
   const E = k.onFocus;
   E == null || E(N), g()
  },
  T = k => N => {
   const E = k.onMouseEnter;
   E == null || E(N), g()
  },
  C = k => N => {
   const E = k.onMouseLeave;
   E == null || E(N), b()
  };
 return y.useEffect(() => {
  if (!a && s) return window.addEventListener("focus", b), window.addEventListener("blur", g), () => {
   window.removeEventListener("focus", b), window.removeEventListener("blur", g)
  }
 }, [a, s, b, g]), {
  getRootProps: (k = {}) => {
   const N = {
    ...ha(e),
    ...ha(k)
   };
   return {
    role: "presentation",
    ...k,
    ...N,
    onBlur: w(N),
    onFocus: R(N),
    onMouseEnter: T(N),
    onMouseLeave: C(N)
   }
  },
  onClickAway: m
 }
}

function v4(e) {
 return Ue("MuiSnackbarContent", e)
}
Ve("MuiSnackbarContent", ["root", "message", "action"]);
const y4 = e => {
  const {
   classes: r
  } = e;
  return Ie({
   root: ["root"],
   action: ["action"],
   message: ["message"]
  }, v4, r)
 },
 b4 = pe(Gr, {
  name: "MuiSnackbarContent",
  slot: "Root",
  overridesResolver: (e, r) => r.root
 })(Ye(({
  theme: e
 }) => {
  const r = e.palette.mode === "light" ? .8 : .98,
   a = m1(e.palette.background.default, r);
  return {
   ...e.typography.body2,
   color: e.vars ? e.vars.palette.SnackbarContent.color : e.palette.getContrastText(a),
   backgroundColor: e.vars ? e.vars.palette.SnackbarContent.bg : a,
   display: "flex",
   alignItems: "center",
   flexWrap: "wrap",
   padding: "6px 16px",
   borderRadius: (e.vars || e).shape.borderRadius,
   flexGrow: 1,
   [e.breakpoints.up("sm")]: {
    flexGrow: "initial",
    minWidth: 288
   }
  }
 })),
 x4 = pe("div", {
  name: "MuiSnackbarContent",
  slot: "Message",
  overridesResolver: (e, r) => r.message
 })({
  padding: "8px 0"
 }),
 S4 = pe("div", {
  name: "MuiSnackbarContent",
  slot: "Action",
  overridesResolver: (e, r) => r.action
 })({
  display: "flex",
  alignItems: "center",
  marginLeft: "auto",
  paddingLeft: 16,
  marginRight: -8
 }),
 C4 = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiSnackbarContent"
   }),
   {
    action: s,
    className: c,
    message: d,
    role: f = "alert",
    ...h
   } = i,
   m = i,
   g = y4(m);
  return v.jsxs(b4, {
   role: f,
   square: !0,
   elevation: 6,
   className: Ae(g.root, c),
   ownerState: m,
   ref: a,
   ...h,
   children: [v.jsx(x4, {
    className: g.message,
    ownerState: m,
    children: d
   }), s ? v.jsx(S4, {
    className: g.action,
    ownerState: m,
    children: s
   }) : null]
  })
 });

function w4(e) {
 return Ue("MuiSnackbar", e)
}
Ve("MuiSnackbar", ["root", "anchorOriginTopCenter", "anchorOriginBottomCenter", "anchorOriginTopRight", "anchorOriginBottomRight", "anchorOriginTopLeft", "anchorOriginBottomLeft"]);
const R4 = e => {
  const {
   classes: r,
   anchorOrigin: a
  } = e, i = {
   root: ["root", `anchorOrigin${Ce(a.vertical)}${Ce(a.horizontal)}`]
  };
  return Ie(i, w4, r)
 },
 E4 = pe("div", {
  name: "MuiSnackbar",
  slot: "Root",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.root, r[`anchorOrigin${Ce(a.anchorOrigin.vertical)}${Ce(a.anchorOrigin.horizontal)}`]]
  }
 })(Ye(({
  theme: e
 }) => ({
  zIndex: (e.vars || e).zIndex.snackbar,
  position: "fixed",
  display: "flex",
  left: 8,
  right: 8,
  justifyContent: "center",
  alignItems: "center",
  variants: [{
   props: ({
    ownerState: r
   }) => r.anchorOrigin.vertical === "top",
   style: {
    top: 8,
    [e.breakpoints.up("sm")]: {
     top: 24
    }
   }
  }, {
   props: ({
    ownerState: r
   }) => r.anchorOrigin.vertical !== "top",
   style: {
    bottom: 8,
    [e.breakpoints.up("sm")]: {
     bottom: 24
    }
   }
  }, {
   props: ({
    ownerState: r
   }) => r.anchorOrigin.horizontal === "left",
   style: {
    justifyContent: "flex-start",
    [e.breakpoints.up("sm")]: {
     left: 24,
     right: "auto"
    }
   }
  }, {
   props: ({
    ownerState: r
   }) => r.anchorOrigin.horizontal === "right",
   style: {
    justifyContent: "flex-end",
    [e.breakpoints.up("sm")]: {
     right: 24,
     left: "auto"
    }
   }
  }, {
   props: ({
    ownerState: r
   }) => r.anchorOrigin.horizontal === "center",
   style: {
    [e.breakpoints.up("sm")]: {
     left: "50%",
     right: "auto",
     transform: "translateX(-50%)"
    }
   }
  }]
 }))),
 uh = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiSnackbar"
   }),
   s = Ho(),
   c = {
    enter: s.transitions.duration.enteringScreen,
    exit: s.transitions.duration.leavingScreen
   },
   {
    action: d,
    anchorOrigin: {
     vertical: f,
     horizontal: h
    } = {
     vertical: "bottom",
     horizontal: "left"
    },
    autoHideDuration: m = null,
    children: g,
    className: b,
    ClickAwayListenerProps: w,
    ContentProps: R,
    disableWindowBlurListener: T = !1,
    message: C,
    onBlur: D,
    onClose: k,
    onFocus: N,
    onMouseEnter: E,
    onMouseLeave: A,
    open: O,
    resumeHideDuration: L,
    slots: U = {},
    slotProps: _ = {},
    TransitionComponent: G,
    transitionDuration: S = c,
    TransitionProps: {
     onEnter: $,
     onExited: H,
     ...V
    } = {},
    ...X
   } = i,
   W = {
    ...i,
    anchorOrigin: {
     vertical: f,
     horizontal: h
    },
    autoHideDuration: m,
    disableWindowBlurListener: T,
    TransitionComponent: G,
    transitionDuration: S
   },
   z = R4(W),
   {
    getRootProps: I,
    onClickAway: Q
   } = g4({
    ...W
   }),
   [Z, j] = y.useState(!0),
   q = Se => {
    j(!0), H && H(Se)
   },
   ee = (Se, Re) => {
    j(!1), $ && $(Se, Re)
   },
   ne = {
    slots: {
     transition: G,
     ...U
    },
    slotProps: {
     content: R,
     clickAwayListener: w,
     transition: V,
     ..._
    }
   },
   [ce, le] = et("root", {
    ref: a,
    className: [z.root, b],
    elementType: E4,
    getSlotProps: I,
    externalForwardedProps: {
     ...ne,
     ...X
    },
    ownerState: W
   }),
   [re, {
    ownerState: ye,
    ...ge
   }] = et("clickAwayListener", {
    elementType: R5,
    externalForwardedProps: ne,
    getSlotProps: Se => ({
     onClickAway: (...Re) => {
      var ze;
      (ze = Se.onClickAway) == null || ze.call(Se, ...Re), Q(...Re)
     }
    }),
    ownerState: W
   }),
   [Te, fe] = et("content", {
    elementType: C4,
    shouldForwardComponentProp: !0,
    externalForwardedProps: ne,
    additionalProps: {
     message: C,
     action: d
    },
    ownerState: W
   }),
   [Oe, we] = et("transition", {
    elementType: ms,
    externalForwardedProps: ne,
    getSlotProps: Se => ({
     onEnter: (...Re) => {
      var ze;
      (ze = Se.onEnter) == null || ze.call(Se, ...Re), ee(...Re)
     },
     onExited: (...Re) => {
      var ze;
      (ze = Se.onExited) == null || ze.call(Se, ...Re), q(...Re)
     }
    }),
    additionalProps: {
     appear: !0,
     in: O,
     timeout: S,
     direction: f === "top" ? "down" : "up"
    },
    ownerState: W
   });
  return !O && Z ? null : v.jsx(re, {
   ...ge,
   ...U.clickAwayListener && {
    ownerState: ye
   },
   children: v.jsx(ce, {
    ...le,
    children: v.jsx(Oe, {
     ...we,
     children: g || v.jsx(Te, {
      ...fe
     })
    })
   })
  })
 });

function T4(e) {
 return Ue("MuiTooltip", e)
}
const Kt = Ve("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]);

function A4(e) {
 return Math.round(e * 1e5) / 1e5
}
const M4 = e => {
  const {
   classes: r,
   disableInteractive: a,
   arrow: i,
   touch: s,
   placement: c
  } = e, d = {
   popper: ["popper", !a && "popperInteractive", i && "popperArrow"],
   tooltip: ["tooltip", i && "tooltipArrow", s && "touch", `tooltipPlacement${Ce(c.split("-")[0])}`],
   arrow: ["arrow"]
  };
  return Ie(d, T4, r)
 },
 O4 = pe(W1, {
  name: "MuiTooltip",
  slot: "Popper",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.popper, !a.disableInteractive && r.popperInteractive, a.arrow && r.popperArrow, !a.open && r.popperClose]
  }
 })(Ye(({
  theme: e
 }) => ({
  zIndex: (e.vars || e).zIndex.tooltip,
  pointerEvents: "none",
  variants: [{
   props: ({
    ownerState: r
   }) => !r.disableInteractive,
   style: {
    pointerEvents: "auto"
   }
  }, {
   props: ({
    open: r
   }) => !r,
   style: {
    pointerEvents: "none"
   }
  }, {
   props: ({
    ownerState: r
   }) => r.arrow,
   style: {
    [`&[data-popper-placement*="bottom"] .${Kt.arrow}`]: {
     top: 0,
     marginTop: "-0.71em",
     "&::before": {
      transformOrigin: "0 100%"
     }
    },
    [`&[data-popper-placement*="top"] .${Kt.arrow}`]: {
     bottom: 0,
     marginBottom: "-0.71em",
     "&::before": {
      transformOrigin: "100% 0"
     }
    },
    [`&[data-popper-placement*="right"] .${Kt.arrow}`]: {
     height: "1em",
     width: "0.71em",
     "&::before": {
      transformOrigin: "100% 100%"
     }
    },
    [`&[data-popper-placement*="left"] .${Kt.arrow}`]: {
     height: "1em",
     width: "0.71em",
     "&::before": {
      transformOrigin: "0 0"
     }
    }
   }
  }, {
   props: ({
    ownerState: r
   }) => r.arrow && !r.isRtl,
   style: {
    [`&[data-popper-placement*="right"] .${Kt.arrow}`]: {
     left: 0,
     marginLeft: "-0.71em"
    }
   }
  }, {
   props: ({
    ownerState: r
   }) => r.arrow && !!r.isRtl,
   style: {
    [`&[data-popper-placement*="right"] .${Kt.arrow}`]: {
     right: 0,
     marginRight: "-0.71em"
    }
   }
  }, {
   props: ({
    ownerState: r
   }) => r.arrow && !r.isRtl,
   style: {
    [`&[data-popper-placement*="left"] .${Kt.arrow}`]: {
     right: 0,
     marginRight: "-0.71em"
    }
   }
  }, {
   props: ({
    ownerState: r
   }) => r.arrow && !!r.isRtl,
   style: {
    [`&[data-popper-placement*="left"] .${Kt.arrow}`]: {
     left: 0,
     marginLeft: "-0.71em"
    }
   }
  }]
 }))),
 D4 = pe("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (e, r) => {
   const {
    ownerState: a
   } = e;
   return [r.tooltip, a.touch && r.touch, a.arrow && r.tooltipArrow, r[`tooltipPlacement${Ce(a.placement.split("-")[0])}`]]
  }
 })(Ye(({
  theme: e
 }) => ({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : Qt(e.palette.grey[700], .92),
  borderRadius: (e.vars || e).shape.borderRadius,
  color: (e.vars || e).palette.common.white,
  fontFamily: e.typography.fontFamily,
  padding: "4px 8px",
  fontSize: e.typography.pxToRem(11),
  maxWidth: 300,
  margin: 2,
  wordWrap: "break-word",
  fontWeight: e.typography.fontWeightMedium,
  [`.${Kt.popper}[data-popper-placement*="left"] &`]: {
   transformOrigin: "right center"
  },
  [`.${Kt.popper}[data-popper-placement*="right"] &`]: {
   transformOrigin: "left center"
  },
  [`.${Kt.popper}[data-popper-placement*="top"] &`]: {
   transformOrigin: "center bottom",
   marginBottom: "14px"
  },
  [`.${Kt.popper}[data-popper-placement*="bottom"] &`]: {
   transformOrigin: "center top",
   marginTop: "14px"
  },
  variants: [{
   props: ({
    ownerState: r
   }) => r.arrow,
   style: {
    position: "relative",
    margin: 0
   }
  }, {
   props: ({
    ownerState: r
   }) => r.touch,
   style: {
    padding: "8px 16px",
    fontSize: e.typography.pxToRem(14),
    lineHeight: `${A4(16/14)}em`,
    fontWeight: e.typography.fontWeightRegular
   }
  }, {
   props: ({
    ownerState: r
   }) => !r.isRtl,
   style: {
    [`.${Kt.popper}[data-popper-placement*="left"] &`]: {
     marginRight: "14px"
    },
    [`.${Kt.popper}[data-popper-placement*="right"] &`]: {
     marginLeft: "14px"
    }
   }
  }, {
   props: ({
    ownerState: r
   }) => !r.isRtl && r.touch,
   style: {
    [`.${Kt.popper}[data-popper-placement*="left"] &`]: {
     marginRight: "24px"
    },
    [`.${Kt.popper}[data-popper-placement*="right"] &`]: {
     marginLeft: "24px"
    }
   }
  }, {
   props: ({
    ownerState: r
   }) => !!r.isRtl,
   style: {
    [`.${Kt.popper}[data-popper-placement*="left"] &`]: {
     marginLeft: "14px"
    },
    [`.${Kt.popper}[data-popper-placement*="right"] &`]: {
     marginRight: "14px"
    }
   }
  }, {
   props: ({
    ownerState: r
   }) => !!r.isRtl && r.touch,
   style: {
    [`.${Kt.popper}[data-popper-placement*="left"] &`]: {
     marginLeft: "24px"
    },
    [`.${Kt.popper}[data-popper-placement*="right"] &`]: {
     marginRight: "24px"
    }
   }
  }, {
   props: ({
    ownerState: r
   }) => r.touch,
   style: {
    [`.${Kt.popper}[data-popper-placement*="top"] &`]: {
     marginBottom: "24px"
    }
   }
  }, {
   props: ({
    ownerState: r
   }) => r.touch,
   style: {
    [`.${Kt.popper}[data-popper-placement*="bottom"] &`]: {
     marginTop: "24px"
    }
   }
  }]
 }))),
 k4 = pe("span", {
  name: "MuiTooltip",
  slot: "Arrow",
  overridesResolver: (e, r) => r.arrow
 })(Ye(({
  theme: e
 }) => ({
  overflow: "hidden",
  position: "absolute",
  width: "1em",
  height: "0.71em",
  boxSizing: "border-box",
  color: e.vars ? e.vars.palette.Tooltip.bg : Qt(e.palette.grey[700], .9),
  "&::before": {
   content: '""',
   margin: "auto",
   display: "block",
   width: "100%",
   height: "100%",
   backgroundColor: "currentColor",
   transform: "rotate(45deg)"
  }
 })));
let ru = !1;
const Sb = new Pu;
let Gl = {
 x: 0,
 y: 0
};

function ou(e, r) {
 return (a, ...i) => {
  r && r(a, ...i), e(a, ...i)
 }
}
const ux = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiTooltip"
   }),
   {
    arrow: s = !1,
    children: c,
    classes: d,
    components: f = {},
    componentsProps: h = {},
    describeChild: m = !1,
    disableFocusListener: g = !1,
    disableHoverListener: b = !1,
    disableInteractive: w = !1,
    disableTouchListener: R = !1,
    enterDelay: T = 100,
    enterNextDelay: C = 0,
    enterTouchDelay: D = 700,
    followCursor: k = !1,
    id: N,
    leaveDelay: E = 0,
    leaveTouchDelay: A = 1500,
    onClose: O,
    onOpen: L,
    open: U,
    placement: _ = "bottom",
    PopperComponent: G,
    PopperProps: S = {},
    slotProps: $ = {},
    slots: H = {},
    title: V,
    TransitionComponent: X,
    TransitionProps: W,
    ...z
   } = i,
   I = y.isValidElement(c) ? c : v.jsx("span", {
    children: c
   }),
   Q = Ho(),
   Z = Hu(),
   [j, q] = y.useState(),
   [ee, ne] = y.useState(null),
   ce = y.useRef(!1),
   le = w || k,
   re = Uo(),
   ye = Uo(),
   ge = Uo(),
   Te = Uo(),
   [fe, Oe] = us({
    controlled: U,
    default: !1,
    name: "Tooltip",
    state: "open"
   });
  let we = fe;
  const Se = $i(N),
   Re = y.useRef(),
   ze = kn(() => {
    Re.current !== void 0 && (document.body.style.WebkitUserSelect = Re.current, Re.current = void 0), Te.clear()
   });
  y.useEffect(() => ze, [ze]);
  const it = je => {
    Sb.clear(), ru = !0, Oe(!0), L && !we && L(je)
   },
   Ne = kn(je => {
    Sb.start(800 + E, () => {
     ru = !1
    }), Oe(!1), O && we && O(je), re.start(Q.transitions.duration.shortest, () => {
     ce.current = !1
    })
   }),
   Je = je => {
    ce.current && je.type !== "touchstart" || (j && j.removeAttribute("title"), ye.clear(), ge.clear(), T || ru && C ? ye.start(ru ? C : T, () => {
     it(je)
    }) : it(je))
   },
   Ke = je => {
    ye.clear(), ge.start(E, () => {
     Ne(je)
    })
   },
   [, Pe] = y.useState(!1),
   He = je => {
    Mi(je.target) || (Pe(!1), Ke(je))
   },
   Ee = je => {
    j || q(je.currentTarget), Mi(je.target) && (Pe(!0), Je(je))
   },
   mt = je => {
    ce.current = !0;
    const kt = I.props;
    kt.onTouchStart && kt.onTouchStart(je)
   },
   ot = je => {
    mt(je), ge.clear(), re.clear(), ze(), Re.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", Te.start(D, () => {
     document.body.style.WebkitUserSelect = Re.current, Je(je)
    })
   },
   de = je => {
    I.props.onTouchEnd && I.props.onTouchEnd(je), ze(), ge.start(A, () => {
     Ne(je)
    })
   };
  y.useEffect(() => {
   if (!we) return;

   function je(kt) {
    kt.key === "Escape" && Ne(kt)
   }
   return document.addEventListener("keydown", je), () => {
    document.removeEventListener("keydown", je)
   }
  }, [Ne, we]);
  const me = tn(Ca(I), q, a);
  !V && V !== 0 && (we = !1);
  const ve = y.useRef(),
   De = je => {
    const kt = I.props;
    kt.onMouseMove && kt.onMouseMove(je), Gl = {
     x: je.clientX,
     y: je.clientY
    }, ve.current && ve.current.update()
   },
   be = {},
   xe = typeof V == "string";
  m ? (be.title = !we && xe && !b ? V : null, be["aria-describedby"] = we ? Se : null) : (be["aria-label"] = xe ? V : null, be["aria-labelledby"] = we && !xe ? Se : null);
  const he = {
    ...be,
    ...z,
    ...I.props,
    className: Ae(z.className, I.props.className),
    onTouchStart: mt,
    ref: me,
    ...k ? {
     onMouseMove: De
    } : {}
   },
   Qe = {};
  R || (he.onTouchStart = ot, he.onTouchEnd = de), b || (he.onMouseOver = ou(Je, he.onMouseOver), he.onMouseLeave = ou(Ke, he.onMouseLeave), le || (Qe.onMouseOver = Je, Qe.onMouseLeave = Ke)), g || (he.onFocus = ou(Ee, he.onFocus), he.onBlur = ou(He, he.onBlur), le || (Qe.onFocus = Ee, Qe.onBlur = He));
  const Be = {
    ...i,
    isRtl: Z,
    arrow: s,
    disableInteractive: le,
    placement: _,
    PopperComponentProp: G,
    touch: ce.current
   },
   Xe = typeof $.popper == "function" ? $.popper(Be) : $.popper,
   Me = y.useMemo(() => {
    var kt, En;
    let je = [{
     name: "arrow",
     enabled: !!ee,
     options: {
      element: ee,
      padding: 4
     }
    }];
    return (kt = S.popperOptions) != null && kt.modifiers && (je = je.concat(S.popperOptions.modifiers)), (En = Xe == null ? void 0 : Xe.popperOptions) != null && En.modifiers && (je = je.concat(Xe.popperOptions.modifiers)), {
     ...S.popperOptions,
     ...Xe == null ? void 0 : Xe.popperOptions,
     modifiers: je
    }
   }, [ee, S.popperOptions, Xe == null ? void 0 : Xe.popperOptions]),
   tt = M4(Be),
   gt = typeof $.transition == "function" ? $.transition(Be) : $.transition,
   rn = {
    slots: {
     popper: f.Popper,
     transition: f.Transition ?? X,
     tooltip: f.Tooltip,
     arrow: f.Arrow,
     ...H
    },
    slotProps: {
     arrow: $.arrow ?? h.arrow,
     popper: {
      ...S,
      ...Xe ?? h.popper
     },
     tooltip: $.tooltip ?? h.tooltip,
     transition: {
      ...W,
      ...gt ?? h.transition
     }
    }
   },
   [On, Jn] = et("popper", {
    elementType: O4,
    externalForwardedProps: rn,
    ownerState: Be,
    className: Ae(tt.popper, S == null ? void 0 : S.className)
   }),
   [jn, Fe] = et("transition", {
    elementType: ms,
    externalForwardedProps: rn,
    ownerState: Be
   }),
   [lt, Pt] = et("tooltip", {
    elementType: D4,
    className: tt.tooltip,
    externalForwardedProps: rn,
    ownerState: Be
   }),
   [Vt, pt] = et("arrow", {
    elementType: k4,
    className: tt.arrow,
    externalForwardedProps: rn,
    ownerState: Be,
    ref: ne
   });
  return v.jsxs(y.Fragment, {
   children: [y.cloneElement(I, he), v.jsx(On, {
    as: G ?? W1,
    placement: _,
    anchorEl: k ? {
     getBoundingClientRect: () => ({
      top: Gl.y,
      left: Gl.x,
      right: Gl.x,
      bottom: Gl.y,
      width: 0,
      height: 0
     })
    } : j,
    popperRef: ve,
    open: j ? we : !1,
    id: Se,
    transition: !0,
    ...Qe,
    ...Jn,
    popperOptions: Me,
    children: ({
     TransitionProps: je
    }) => v.jsx(jn, {
     timeout: Q.transitions.duration.shorter,
     ...je,
     ...Fe,
     children: v.jsxs(lt, {
      ...Pt,
      children: [V, s ? v.jsx(Vt, {
       ...pt
      }) : null]
     })
    })
   })]
  })
 }),
 mi = hE({
  createStyledComponent: pe("div", {
   name: "MuiStack",
   slot: "Root",
   overridesResolver: (e, r) => r.root
  }),
  useThemeProps: e => Ge({
   props: e,
   name: "MuiStack"
  })
 });

function z4(e) {
 return Ue("MuiTextField", e)
}
Ve("MuiTextField", ["root"]);
const j4 = {
  standard: Yh,
  filled: Gh,
  outlined: Wh
 },
 N4 = e => {
  const {
   classes: r
  } = e;
  return Ie({
   root: ["root"]
  }, z4, r)
 },
 L4 = pe(ex, {
  name: "MuiTextField",
  slot: "Root",
  overridesResolver: (e, r) => r.root
 })({}),
 dn = y.forwardRef(function(r, a) {
  const i = Ge({
    props: r,
    name: "MuiTextField"
   }),
   {
    autoComplete: s,
    autoFocus: c = !1,
    children: d,
    className: f,
    color: h = "primary",
    defaultValue: m,
    disabled: g = !1,
    error: b = !1,
    FormHelperTextProps: w,
    fullWidth: R = !1,
    helperText: T,
    id: C,
    InputLabelProps: D,
    inputProps: k,
    InputProps: N,
    inputRef: E,
    label: A,
    maxRows: O,
    minRows: L,
    multiline: U = !1,
    name: _,
    onBlur: G,
    onChange: S,
    onFocus: $,
    placeholder: H,
    required: V = !1,
    rows: X,
    select: W = !1,
    SelectProps: z,
    slots: I = {},
    slotProps: Q = {},
    type: Z,
    value: j,
    variant: q = "outlined",
    ...ee
   } = i,
   ne = {
    ...i,
    autoFocus: c,
    color: h,
    disabled: g,
    error: b,
    fullWidth: R,
    multiline: U,
    required: V,
    select: W,
    variant: q
   },
   ce = N4(ne),
   le = $i(C),
   re = T && le ? `${le}-helper-text` : void 0,
   ye = A && le ? `${le}-label` : void 0,
   ge = j4[q],
   Te = {
    slots: I,
    slotProps: {
     input: N,
     inputLabel: D,
     htmlInput: k,
     formHelperText: w,
     select: z,
     ...Q
    }
   },
   fe = {},
   Oe = Te.slotProps.inputLabel;
  q === "outlined" && (Oe && typeof Oe.shrink < "u" && (fe.notched = Oe.shrink), fe.label = A), W && ((!z || !z.native) && (fe.id = void 0), fe["aria-describedby"] = void 0);
  const [we, Se] = et("root", {
   elementType: L4,
   shouldForwardComponentProp: !0,
   externalForwardedProps: {
    ...Te,
    ...ee
   },
   ownerState: ne,
   className: Ae(ce.root, f),
   ref: a,
   additionalProps: {
    disabled: g,
    error: b,
    fullWidth: R,
    required: V,
    color: h,
    variant: q
   }
  }), [Re, ze] = et("input", {
   elementType: ge,
   externalForwardedProps: Te,
   additionalProps: fe,
   ownerState: ne
  }), [it, Ne] = et("inputLabel", {
   elementType: nx,
   externalForwardedProps: Te,
   ownerState: ne
  }), [Je, Ke] = et("htmlInput", {
   elementType: "input",
   externalForwardedProps: Te,
   ownerState: ne
  }), [Pe, He] = et("formHelperText", {
   elementType: zO,
   externalForwardedProps: Te,
   ownerState: ne
  }), [Ee, mt] = et("select", {
   elementType: Kh,
   externalForwardedProps: Te,
   ownerState: ne
  }), ot = v.jsx(Re, {
   "aria-describedby": re,
   autoComplete: s,
   autoFocus: c,
   defaultValue: m,
   fullWidth: R,
   multiline: U,
   name: _,
   rows: X,
   maxRows: O,
   minRows: L,
   type: Z,
   value: j,
   id: le,
   inputRef: E,
   onBlur: G,
   onChange: S,
   onFocus: $,
   placeholder: H,
   inputProps: Ke,
   slots: {
    input: I.htmlInput ? Je : void 0
   },
   ...ze
  });
  return v.jsxs(we, {
   ...Se,
   children: [A != null && A !== "" && v.jsx(it, {
    htmlFor: le,
    id: ye,
    ...Ne,
    children: A
   }), W ? v.jsx(Ee, {
    "aria-describedby": re,
    id: le,
    labelId: ye,
    value: j,
    input: ot,
    ...mt,
    children: d
   }) : ot, T && v.jsx(Pe, {
    id: re,
    ...He,
    children: T
   })]
  })
 }),
 B4 = Tt(v.jsx("path", {
  d: "M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12zM12 18c-.89 0-1.74-.2-2.5-.55C11.56 16.5 13 14.42 13 12s-1.44-4.5-3.5-5.45C10.26 6.2 11.11 6 12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6"
 })),
 $4 = Tt(v.jsx("path", {
  d: "M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6m0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4"
 }));

function _4({
 darkMode: e,
 onToggle: r
}) {
 return v.jsx(ux, {
  title: e ? "切换到浅色模式" : "切换到深色模式",
  children: v.jsx(hr, {
   onClick: r,
   color: "inherit",
   "aria-label": "切换主题",
   sx: {
    p: 1.5,
    borderRadius: "50%",
    bgcolor: "background.paper",
    boxShadow: 1,
    color: "text.primary",
    "&:hover": {
     bgcolor: "action.hover"
    }
   },
   children: e ? v.jsx($4, {}) : v.jsx(B4, {})
  })
 })
}
const Kl = Tt(v.jsx("path", {
  d: "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
 })),
 U4 = Tt(v.jsx("path", {
  d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z"
 })),
 Qh = Tt(v.jsx("path", {
  d: "M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3m3-10H5V5h10z"
 })),
 dx = Tt(v.jsx("path", {
  d: "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2m5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12z"
 })),
 fx = Tt(v.jsx("path", {
  d: "M7.5 5.6 10 7 8.6 4.5 10 2 7.5 3.4 5 2l1.4 2.5L5 7zm12 9.8L17 14l1.4 2.5L17 19l2.5-1.4L22 19l-1.4-2.5L22 14zM22 2l-2.5 1.4L17 2l1.4 2.5L17 7l2.5-1.4L22 7l-1.4-2.5zm-7.63 5.29a.996.996 0 0 0-1.41 0L1.29 18.96c-.39.39-.39 1.02 0 1.41l2.34 2.34c.39.39 1.02.39 1.41 0L16.7 11.05c.39-.39.39-1.02 0-1.41zm-1.03 5.49-2.12-2.12 2.44-2.44 2.12 2.12z"
 }));

function I4(e) {
 if (!e) return null;
 try {
  let r = e;
  return /^https?:\/\//i.test(e) || (r = "http://" + e), new URL(r).hostname
 } catch {
  const a = e.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/im);
  return a && a[1] ? a[1] : e
 }
}

function Cb({
 site: e,
 onUpdate: r,
 onDelete: a,
 onClose: i,
 groups: s = [],
 iconApi: c = "https://www.faviconextractor.com/favicon/{domain}?larger=true"
}) {
 var N;
 const d = Ho(),
  [f, h] = y.useState({
   name: e.name,
   url: e.url,
   icon: e.icon || "",
   description: e.description || "",
   notes: e.notes || "",
   group_id: String(e.group_id)
  }),
  [m, g] = y.useState(e.icon || null),
  b = E => {
   const {
    name: A,
    value: O
   } = E.target;
   h(L => ({
    ...L,
    [A]: O
   }))
  },
  w = E => {
   h(A => ({
    ...A,
    group_id: E.target.value
   }))
  },
  R = E => {
   const {
    value: A
   } = E.target;
   h(L => ({
    ...L,
    icon: A
   })), A && (L => {
    try {
     return new URL(L), /\.(jpeg|jpg|gif|png|svg|webp|ico)(\?.*)?$/i.test(L) || /^https?:\/\/.*\/favicon\.(ico|png)(\?.*)?$/i.test(L) || /^data:image\//i.test(L)
    } catch {
     return !1
    }
   })(A) ? g(A) : g(null)
  },
  T = () => {
   g(null)
  },
  C = E => {
   E.preventDefault(), E.stopPropagation(), r({
    ...e,
    ...f,
    group_id: Number(f.group_id)
   }), i()
  },
  D = E => {
   E.stopPropagation(), window.confirm("确定要删除这个网站吗？此操作不可恢复。") && (a(e.id), i())
  },
  k = ((N = f.name) == null ? void 0 : N.charAt(0).toUpperCase()) || "A";
 return v.jsxs(gi, {
  open: !0,
  onClose: i,
  fullWidth: !0,
  maxWidth: "sm",
  PaperProps: {
   sx: {
    borderRadius: 2,
    backgroundColor: d.palette.background.paper
   }
  },
  children: [v.jsxs(bi, {
   sx: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 2,
    pb: 1.5
   },
   children: [v.jsx(_t, {
    variant: "h6",
    component: "div",
    fontWeight: "600",
    children: "网站设置"
   }), v.jsx(hr, {
    edge: "end",
    color: "inherit",
    onClick: i,
    "aria-label": "关闭",
    size: "small",
    children: v.jsx(Kl, {})
   })]
  }), v.jsx(hs, {}), v.jsxs("form", {
   onSubmit: C,
   children: [v.jsx(yi, {
    sx: {
     pt: 2
    },
    children: v.jsxs(mi, {
     spacing: 2.5,
     children: [v.jsx(dn, {
      id: "name",
      name: "name",
      label: "网站名称",
      required: !0,
      fullWidth: !0,
      value: f.name || "",
      onChange: b,
      placeholder: "输入网站名称",
      variant: "outlined",
      size: "small"
     }), v.jsx(dn, {
      id: "url",
      name: "url",
      label: "网站链接",
      required: !0,
      fullWidth: !0,
      value: f.url || "",
      onChange: b,
      placeholder: "https://example.com",
      variant: "outlined",
      size: "small",
      type: "url"
     }), v.jsxs(Ze, {
      children: [v.jsx(_t, {
       variant: "body2",
       color: "text.secondary",
       gutterBottom: !0,
       children: "图标 URL"
      }), v.jsxs(Ze, {
       sx: {
        display: "flex",
        gap: 1.5,
        alignItems: "center"
       },
       children: [m ? v.jsx(Q0, {
        src: m,
        alt: f.name || "Icon Preview",
        sx: {
         width: 40,
         height: 40,
         borderRadius: 1.5
        },
        imgProps: {
         onError: T,
         style: {
          objectFit: "cover"
         }
        },
        variant: "rounded"
       }) : v.jsx(Q0, {
        sx: {
         width: 40,
         height: 40,
         borderRadius: 1.5,
         bgcolor: "primary.light",
         color: "primary.main",
         border: "1px solid",
         borderColor: "primary.main"
        },
        variant: "rounded",
        children: k
       }), v.jsx(dn, {
        id: "icon",
        name: "icon",
        fullWidth: !0,
        value: f.icon || "",
        onChange: R,
        placeholder: "https://example.com/icon.png",
        variant: "outlined",
        size: "small",
        InputProps: {
         endAdornment: v.jsx(tx, {
          position: "end",
          children: v.jsx(hr, {
           onClick: () => {
            if (!f.url) return;
            const E = I4(f.url);
            if (E) {
             const O = (c || "https://www.faviconextractor.com/favicon/{domain}?larger=true").replace("{domain}", E);
             h(L => ({
              ...L,
              icon: O
             })), g(O)
            }
           },
           edge: "end",
           title: "自动获取图标",
           children: v.jsx(fx, {})
          })
         })
        }
       })]
      })]
     }), s.length > 0 && v.jsxs(ex, {
      fullWidth: !0,
      size: "small",
      children: [v.jsx(nx, {
       id: "group-select-label",
       children: "所属分组"
      }), v.jsx(Kh, {
       labelId: "group-select-label",
       id: "group_id",
       name: "group_id",
       value: f.group_id,
       label: "所属分组",
       onChange: w,
       children: s.map(E => v.jsx(hi, {
        value: String(E.id),
        children: E.name
       }, E.id))
      })]
     }), v.jsx(dn, {
      id: "description",
      name: "description",
      label: "网站描述",
      multiline: !0,
      rows: 2,
      fullWidth: !0,
      value: f.description || "",
      onChange: b,
      placeholder: "简短的网站描述",
      variant: "outlined",
      size: "small"
     }), v.jsx(dn, {
      id: "notes",
      name: "notes",
      label: "备注",
      multiline: !0,
      rows: 3,
      fullWidth: !0,
      value: f.notes || "",
      onChange: b,
      placeholder: "可选的私人备注",
      variant: "outlined",
      size: "small"
     })]
    })
   }), v.jsxs(vi, {
    sx: {
     px: 3,
     pb: 3,
     pt: 1,
     justifyContent: "space-between"
    },
    children: [v.jsx(Ut, {
     onClick: D,
     color: "error",
     variant: "contained",
     startIcon: v.jsx(U4, {}),
     children: "删除"
    }), v.jsxs(Ze, {
     children: [v.jsx(Ut, {
      onClick: i,
      color: "inherit",
      variant: "outlined",
      sx: {
       mr: 1.5
      },
      startIcon: v.jsx(dx, {}),
      children: "取消"
     }), v.jsx(Ut, {
      type: "submit",
      color: "primary",
      variant: "contained",
      startIcon: v.jsx(Qh, {}),
      children: "保存"
     })]
    })]
   })]
  })]
 })
}

function P4() {
 for (var e = arguments.length, r = new Array(e), a = 0; a < e; a++) r[a] = arguments[a];
 return y.useMemo(() => i => {
  r.forEach(s => s(i))
 }, r)
}
const Qu = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";

function _i(e) {
 const r = Object.prototype.toString.call(e);
 return r === "[object Window]" || r === "[object global]"
}

function Zh(e) {
 return "nodeType" in e
}

function Hn(e) {
 var r, a;
 return e ? _i(e) ? e : Zh(e) && (r = (a = e.ownerDocument) == null ? void 0 : a.defaultView) != null ? r : window : window
}

function Jh(e) {
 const {
  Document: r
 } = Hn(e);
 return e instanceof r
}

function Ds(e) {
 return _i(e) ? !1 : e instanceof Hn(e).HTMLElement
}

function px(e) {
 return e instanceof Hn(e).SVGElement
}

function Ui(e) {
 return e ? _i(e) ? e.document : Zh(e) ? Jh(e) ? e : Ds(e) || px(e) ? e.ownerDocument : document : document : document
}
const Vr = Qu ? y.useLayoutEffect : y.useEffect;

function em(e) {
 const r = y.useRef(e);
 return Vr(() => {
  r.current = e
 }), y.useCallback(function() {
  for (var a = arguments.length, i = new Array(a), s = 0; s < a; s++) i[s] = arguments[s];
  return r.current == null ? void 0 : r.current(...i)
 }, [])
}

function H4() {
 const e = y.useRef(null),
  r = y.useCallback((i, s) => {
   e.current = setInterval(i, s)
  }, []),
  a = y.useCallback(() => {
   e.current !== null && (clearInterval(e.current), e.current = null)
  }, []);
 return [r, a]
}

function vs(e, r) {
 r === void 0 && (r = [e]);
 const a = y.useRef(e);
 return Vr(() => {
  a.current !== e && (a.current = e)
 }, r), a
}

function ks(e, r) {
 const a = y.useRef();
 return y.useMemo(() => {
  const i = e(a.current);
  return a.current = i, i
 }, [...r])
}

function Ru(e) {
 const r = em(e),
  a = y.useRef(null),
  i = y.useCallback(s => {
   s !== a.current && (r == null || r(s, a.current)), a.current = s
  }, []);
 return [a, i]
}

function dh(e) {
 const r = y.useRef();
 return y.useEffect(() => {
  r.current = e
 }, [e]), r.current
}
let Bp = {};

function zs(e, r) {
 return y.useMemo(() => {
  if (r) return r;
  const a = Bp[e] == null ? 0 : Bp[e] + 1;
  return Bp[e] = a, e + "-" + a
 }, [e, r])
}

function hx(e) {
 return function(r) {
  for (var a = arguments.length, i = new Array(a > 1 ? a - 1 : 0), s = 1; s < a; s++) i[s - 1] = arguments[s];
  return i.reduce((c, d) => {
   const f = Object.entries(d);
   for (const [h, m] of f) {
    const g = c[h];
    g != null && (c[h] = g + e * m)
   }
   return c
  }, {
   ...r
  })
 }
}
const Ei = hx(1),
 ys = hx(-1);

function q4(e) {
 return "clientX" in e && "clientY" in e
}

function tm(e) {
 if (!e) return !1;
 const {
  KeyboardEvent: r
 } = Hn(e.target);
 return r && e instanceof r
}

function V4(e) {
 if (!e) return !1;
 const {
  TouchEvent: r
 } = Hn(e.target);
 return r && e instanceof r
}

function fh(e) {
 if (V4(e)) {
  if (e.touches && e.touches.length) {
   const {
    clientX: r,
    clientY: a
   } = e.touches[0];
   return {
    x: r,
    y: a
   }
  } else if (e.changedTouches && e.changedTouches.length) {
   const {
    clientX: r,
    clientY: a
   } = e.changedTouches[0];
   return {
    x: r,
    y: a
   }
  }
 }
 return q4(e) ? {
  x: e.clientX,
  y: e.clientY
 } : null
}
const Li = Object.freeze({
  Translate: {
   toString(e) {
    if (!e) return;
    const {
     x: r,
     y: a
    } = e;
    return "translate3d(" + (r ? Math.round(r) : 0) + "px, " + (a ? Math.round(a) : 0) + "px, 0)"
   }
  },
  Scale: {
   toString(e) {
    if (!e) return;
    const {
     scaleX: r,
     scaleY: a
    } = e;
    return "scaleX(" + r + ") scaleY(" + a + ")"
   }
  },
  Transform: {
   toString(e) {
    if (e) return [Li.Translate.toString(e), Li.Scale.toString(e)].join(" ")
   }
  },
  Transition: {
   toString(e) {
    let {
     property: r,
     duration: a,
     easing: i
    } = e;
    return r + " " + a + "ms " + i
   }
  }
 }),
 wb = "a,frame,iframe,input:not([type=hidden]):not(:disabled),select:not(:disabled),textarea:not(:disabled),button:not(:disabled),*[tabindex]";

function G4(e) {
 return e.matches(wb) ? e : e.querySelector(wb)
}
const Y4 = {
 display: "none"
};

function X4(e) {
 let {
  id: r,
  value: a
 } = e;
 return It.createElement("div", {
  id: r,
  style: Y4
 }, a)
}

function W4(e) {
 let {
  id: r,
  announcement: a,
  ariaLiveType: i = "assertive"
 } = e;
 const s = {
  position: "fixed",
  top: 0,
  left: 0,
  width: 1,
  height: 1,
  margin: -1,
  border: 0,
  padding: 0,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  clipPath: "inset(100%)",
  whiteSpace: "nowrap"
 };
 return It.createElement("div", {
  id: r,
  style: s,
  role: "status",
  "aria-live": i,
  "aria-atomic": !0
 }, a)
}

function F4() {
 const [e, r] = y.useState("");
 return {
  announce: y.useCallback(i => {
   i != null && r(i)
  }, []),
  announcement: e
 }
}
const mx = y.createContext(null);

function K4(e) {
 const r = y.useContext(mx);
 y.useEffect(() => {
  if (!r) throw new Error("useDndMonitor must be used within a children of <DndContext>");
  return r(e)
 }, [e, r])
}

function Q4() {
 const [e] = y.useState(() => new Set), r = y.useCallback(i => (e.add(i), () => e.delete(i)), [e]);
 return [y.useCallback(i => {
  let {
   type: s,
   event: c
  } = i;
  e.forEach(d => {
   var f;
   return (f = d[s]) == null ? void 0 : f.call(d, c)
  })
 }, [e]), r]
}
const Z4 = {
  draggable: `
    To pick up a draggable item, press the space bar.
    While dragging, use the arrow keys to move the item.
    Press space again to drop the item in its new position, or press escape to cancel.
  `
 },
 J4 = {
  onDragStart(e) {
   let {
    active: r
   } = e;
   return "Picked up draggable item " + r.id + "."
  },
  onDragOver(e) {
   let {
    active: r,
    over: a
   } = e;
   return a ? "Draggable item " + r.id + " was moved over droppable area " + a.id + "." : "Draggable item " + r.id + " is no longer over a droppable area."
  },
  onDragEnd(e) {
   let {
    active: r,
    over: a
   } = e;
   return a ? "Draggable item " + r.id + " was dropped over droppable area " + a.id : "Draggable item " + r.id + " was dropped."
  },
  onDragCancel(e) {
   let {
    active: r
   } = e;
   return "Dragging was cancelled. Draggable item " + r.id + " was dropped."
  }
 };

function eD(e) {
 let {
  announcements: r = J4,
  container: a,
  hiddenTextDescribedById: i,
  screenReaderInstructions: s = Z4
 } = e;
 const {
  announce: c,
  announcement: d
 } = F4(), f = zs("DndLiveRegion"), [h, m] = y.useState(!1);
 if (y.useEffect(() => {
   m(!0)
  }, []), K4(y.useMemo(() => ({
   onDragStart(b) {
    let {
     active: w
    } = b;
    c(r.onDragStart({
     active: w
    }))
   },
   onDragMove(b) {
    let {
     active: w,
     over: R
    } = b;
    r.onDragMove && c(r.onDragMove({
     active: w,
     over: R
    }))
   },
   onDragOver(b) {
    let {
     active: w,
     over: R
    } = b;
    c(r.onDragOver({
     active: w,
     over: R
    }))
   },
   onDragEnd(b) {
    let {
     active: w,
     over: R
    } = b;
    c(r.onDragEnd({
     active: w,
     over: R
    }))
   },
   onDragCancel(b) {
    let {
     active: w,
     over: R
    } = b;
    c(r.onDragCancel({
     active: w,
     over: R
    }))
   }
  }), [c, r])), !h) return null;
 const g = It.createElement(It.Fragment, null, It.createElement(X4, {
  id: i,
  value: s.draggable
 }), It.createElement(W4, {
  id: f,
  announcement: d
 }));
 return a ? fa.createPortal(g, a) : g
}
var fn;
(function(e) {
 e.DragStart = "dragStart", e.DragMove = "dragMove", e.DragEnd = "dragEnd", e.DragCancel = "dragCancel", e.DragOver = "dragOver", e.RegisterDroppable = "registerDroppable", e.SetDroppableDisabled = "setDroppableDisabled", e.UnregisterDroppable = "unregisterDroppable"
})(fn || (fn = {}));

function Eu() {}

function Ti(e, r) {
 return y.useMemo(() => ({
  sensor: e,
  options: r ?? {}
 }), [e, r])
}

function gx() {
 for (var e = arguments.length, r = new Array(e), a = 0; a < e; a++) r[a] = arguments[a];
 return y.useMemo(() => [...r].filter(i => i != null), [...r])
}
const Tr = Object.freeze({
 x: 0,
 y: 0
});

function vx(e, r) {
 return Math.sqrt(Math.pow(e.x - r.x, 2) + Math.pow(e.y - r.y, 2))
}

function yx(e, r) {
 let {
  data: {
   value: a
  }
 } = e, {
  data: {
   value: i
  }
 } = r;
 return a - i
}

function tD(e, r) {
 let {
  data: {
   value: a
  }
 } = e, {
  data: {
   value: i
  }
 } = r;
 return i - a
}

function Rb(e) {
 let {
  left: r,
  top: a,
  height: i,
  width: s
 } = e;
 return [{
  x: r,
  y: a
 }, {
  x: r + s,
  y: a
 }, {
  x: r,
  y: a + i
 }, {
  x: r + s,
  y: a + i
 }]
}

function bx(e, r) {
 if (!e || e.length === 0) return null;
 const [a] = e;
 return a[r]
}

function Eb(e, r, a) {
 return r === void 0 && (r = e.left), a === void 0 && (a = e.top), {
  x: r + e.width * .5,
  y: a + e.height * .5
 }
}
const xx = e => {
  let {
   collisionRect: r,
   droppableRects: a,
   droppableContainers: i
  } = e;
  const s = Eb(r, r.left, r.top),
   c = [];
  for (const d of i) {
   const {
    id: f
   } = d, h = a.get(f);
   if (h) {
    const m = vx(Eb(h), s);
    c.push({
     id: f,
     data: {
      droppableContainer: d,
      value: m
     }
    })
   }
  }
  return c.sort(yx)
 },
 nD = e => {
  let {
   collisionRect: r,
   droppableRects: a,
   droppableContainers: i
  } = e;
  const s = Rb(r),
   c = [];
  for (const d of i) {
   const {
    id: f
   } = d, h = a.get(f);
   if (h) {
    const m = Rb(h),
     g = s.reduce((w, R, T) => w + vx(m[T], R), 0),
     b = Number((g / 4).toFixed(4));
    c.push({
     id: f,
     data: {
      droppableContainer: d,
      value: b
     }
    })
   }
  }
  return c.sort(yx)
 };

function rD(e, r) {
 const a = Math.max(r.top, e.top),
  i = Math.max(r.left, e.left),
  s = Math.min(r.left + r.width, e.left + e.width),
  c = Math.min(r.top + r.height, e.top + e.height),
  d = s - i,
  f = c - a;
 if (i < s && a < c) {
  const h = r.width * r.height,
   m = e.width * e.height,
   g = d * f,
   b = g / (h + m - g);
  return Number(b.toFixed(4))
 }
 return 0
}
const oD = e => {
 let {
  collisionRect: r,
  droppableRects: a,
  droppableContainers: i
 } = e;
 const s = [];
 for (const c of i) {
  const {
   id: d
  } = c, f = a.get(d);
  if (f) {
   const h = rD(f, r);
   h > 0 && s.push({
    id: d,
    data: {
     droppableContainer: c,
     value: h
    }
   })
  }
 }
 return s.sort(tD)
};

function aD(e, r, a) {
 return {
  ...e,
  scaleX: r && a ? r.width / a.width : 1,
  scaleY: r && a ? r.height / a.height : 1
 }
}

function Sx(e, r) {
 return e && r ? {
  x: e.left - r.left,
  y: e.top - r.top
 } : Tr
}

function iD(e) {
 return function(a) {
  for (var i = arguments.length, s = new Array(i > 1 ? i - 1 : 0), c = 1; c < i; c++) s[c - 1] = arguments[c];
  return s.reduce((d, f) => ({
   ...d,
   top: d.top + e * f.y,
   bottom: d.bottom + e * f.y,
   left: d.left + e * f.x,
   right: d.right + e * f.x
  }), {
   ...a
  })
 }
}
const lD = iD(1);

function sD(e) {
 if (e.startsWith("matrix3d(")) {
  const r = e.slice(9, -1).split(/, /);
  return {
   x: +r[12],
   y: +r[13],
   scaleX: +r[0],
   scaleY: +r[5]
  }
 } else if (e.startsWith("matrix(")) {
  const r = e.slice(7, -1).split(/, /);
  return {
   x: +r[4],
   y: +r[5],
   scaleX: +r[0],
   scaleY: +r[3]
  }
 }
 return null
}

function cD(e, r, a) {
 const i = sD(r);
 if (!i) return e;
 const {
  scaleX: s,
  scaleY: c,
  x: d,
  y: f
 } = i, h = e.left - d - (1 - s) * parseFloat(a), m = e.top - f - (1 - c) * parseFloat(a.slice(a.indexOf(" ") + 1)), g = s ? e.width / s : e.width, b = c ? e.height / c : e.height;
 return {
  width: g,
  height: b,
  top: m,
  right: h + g,
  bottom: m + b,
  left: h
 }
}
const uD = {
 ignoreTransform: !1
};

function Ii(e, r) {
 r === void 0 && (r = uD);
 let a = e.getBoundingClientRect();
 if (r.ignoreTransform) {
  const {
   transform: m,
   transformOrigin: g
  } = Hn(e).getComputedStyle(e);
  m && (a = cD(a, m, g))
 }
 const {
  top: i,
  left: s,
  width: c,
  height: d,
  bottom: f,
  right: h
 } = a;
 return {
  top: i,
  left: s,
  width: c,
  height: d,
  bottom: f,
  right: h
 }
}

function Tb(e) {
 return Ii(e, {
  ignoreTransform: !0
 })
}

function dD(e) {
 const r = e.innerWidth,
  a = e.innerHeight;
 return {
  top: 0,
  left: 0,
  right: r,
  bottom: a,
  width: r,
  height: a
 }
}

function fD(e, r) {
 return r === void 0 && (r = Hn(e).getComputedStyle(e)), r.position === "fixed"
}

function pD(e, r) {
 r === void 0 && (r = Hn(e).getComputedStyle(e));
 const a = /(auto|scroll|overlay)/;
 return ["overflow", "overflowX", "overflowY"].some(s => {
  const c = r[s];
  return typeof c == "string" ? a.test(c) : !1
 })
}

function Zu(e, r) {
 const a = [];

 function i(s) {
  if (r != null && a.length >= r || !s) return a;
  if (Jh(s) && s.scrollingElement != null && !a.includes(s.scrollingElement)) return a.push(s.scrollingElement), a;
  if (!Ds(s) || px(s) || a.includes(s)) return a;
  const c = Hn(e).getComputedStyle(s);
  return s !== e && pD(s, c) && a.push(s), fD(s, c) ? a : i(s.parentNode)
 }
 return e ? i(e) : a
}

function Cx(e) {
 const [r] = Zu(e, 1);
 return r ?? null
}

function $p(e) {
 return !Qu || !e ? null : _i(e) ? e : Zh(e) ? Jh(e) || e === Ui(e).scrollingElement ? window : Ds(e) ? e : null : null
}

function wx(e) {
 return _i(e) ? e.scrollX : e.scrollLeft
}

function Rx(e) {
 return _i(e) ? e.scrollY : e.scrollTop
}

function ph(e) {
 return {
  x: wx(e),
  y: Rx(e)
 }
}
var yn;
(function(e) {
 e[e.Forward = 1] = "Forward", e[e.Backward = -1] = "Backward"
})(yn || (yn = {}));

function Ex(e) {
 return !Qu || !e ? !1 : e === document.scrollingElement
}

function Tx(e) {
 const r = {
   x: 0,
   y: 0
  },
  a = Ex(e) ? {
   height: window.innerHeight,
   width: window.innerWidth
  } : {
   height: e.clientHeight,
   width: e.clientWidth
  },
  i = {
   x: e.scrollWidth - a.width,
   y: e.scrollHeight - a.height
  },
  s = e.scrollTop <= r.y,
  c = e.scrollLeft <= r.x,
  d = e.scrollTop >= i.y,
  f = e.scrollLeft >= i.x;
 return {
  isTop: s,
  isLeft: c,
  isBottom: d,
  isRight: f,
  maxScroll: i,
  minScroll: r
 }
}
const hD = {
 x: .2,
 y: .2
};

function mD(e, r, a, i, s) {
 let {
  top: c,
  left: d,
  right: f,
  bottom: h
 } = a;
 i === void 0 && (i = 10), s === void 0 && (s = hD);
 const {
  isTop: m,
  isBottom: g,
  isLeft: b,
  isRight: w
 } = Tx(e), R = {
  x: 0,
  y: 0
 }, T = {
  x: 0,
  y: 0
 }, C = {
  height: r.height * s.y,
  width: r.width * s.x
 };
 return !m && c <= r.top + C.height ? (R.y = yn.Backward, T.y = i * Math.abs((r.top + C.height - c) / C.height)) : !g && h >= r.bottom - C.height && (R.y = yn.Forward, T.y = i * Math.abs((r.bottom - C.height - h) / C.height)), !w && f >= r.right - C.width ? (R.x = yn.Forward, T.x = i * Math.abs((r.right - C.width - f) / C.width)) : !b && d <= r.left + C.width && (R.x = yn.Backward, T.x = i * Math.abs((r.left + C.width - d) / C.width)), {
  direction: R,
  speed: T
 }
}

function gD(e) {
 if (e === document.scrollingElement) {
  const {
   innerWidth: c,
   innerHeight: d
  } = window;
  return {
   top: 0,
   left: 0,
   right: c,
   bottom: d,
   width: c,
   height: d
  }
 }
 const {
  top: r,
  left: a,
  right: i,
  bottom: s
 } = e.getBoundingClientRect();
 return {
  top: r,
  left: a,
  right: i,
  bottom: s,
  width: e.clientWidth,
  height: e.clientHeight
 }
}

function Ax(e) {
 return e.reduce((r, a) => Ei(r, ph(a)), Tr)
}

function vD(e) {
 return e.reduce((r, a) => r + wx(a), 0)
}

function yD(e) {
 return e.reduce((r, a) => r + Rx(a), 0)
}

function bD(e, r) {
 if (r === void 0 && (r = Ii), !e) return;
 const {
  top: a,
  left: i,
  bottom: s,
  right: c
 } = r(e);
 Cx(e) && (s <= 0 || c <= 0 || a >= window.innerHeight || i >= window.innerWidth) && e.scrollIntoView({
  block: "center",
  inline: "center"
 })
}
const xD = [
 ["x", ["left", "right"], vD],
 ["y", ["top", "bottom"], yD]
];
class nm {
 constructor(r, a) {
  this.rect = void 0, this.width = void 0, this.height = void 0, this.top = void 0, this.bottom = void 0, this.right = void 0, this.left = void 0;
  const i = Zu(a),
   s = Ax(i);
  this.rect = {
   ...r
  }, this.width = r.width, this.height = r.height;
  for (const [c, d, f] of xD)
   for (const h of d) Object.defineProperty(this, h, {
    get: () => {
     const m = f(i),
      g = s[c] - m;
     return this.rect[h] + g
    },
    enumerable: !0
   });
  Object.defineProperty(this, "rect", {
   enumerable: !1
  })
 }
}
class ns {
 constructor(r) {
  this.target = void 0, this.listeners = [], this.removeAll = () => {
   this.listeners.forEach(a => {
    var i;
    return (i = this.target) == null ? void 0 : i.removeEventListener(...a)
   })
  }, this.target = r
 }
 add(r, a, i) {
  var s;
  (s = this.target) == null || s.addEventListener(r, a, i), this.listeners.push([r, a, i])
 }
}

function SD(e) {
 const {
  EventTarget: r
 } = Hn(e);
 return e instanceof r ? e : Ui(e)
}

function _p(e, r) {
 const a = Math.abs(e.x),
  i = Math.abs(e.y);
 return typeof r == "number" ? Math.sqrt(a ** 2 + i ** 2) > r : "x" in r && "y" in r ? a > r.x && i > r.y : "x" in r ? a > r.x : "y" in r ? i > r.y : !1
}
var fr;
(function(e) {
 e.Click = "click", e.DragStart = "dragstart", e.Keydown = "keydown", e.ContextMenu = "contextmenu", e.Resize = "resize", e.SelectionChange = "selectionchange", e.VisibilityChange = "visibilitychange"
})(fr || (fr = {}));

function Ab(e) {
 e.preventDefault()
}

function CD(e) {
 e.stopPropagation()
}
var ft;
(function(e) {
 e.Space = "Space", e.Down = "ArrowDown", e.Right = "ArrowRight", e.Left = "ArrowLeft", e.Up = "ArrowUp", e.Esc = "Escape", e.Enter = "Enter", e.Tab = "Tab"
})(ft || (ft = {}));
const Mx = {
  start: [ft.Space, ft.Enter],
  cancel: [ft.Esc],
  end: [ft.Space, ft.Enter, ft.Tab]
 },
 wD = (e, r) => {
  let {
   currentCoordinates: a
  } = r;
  switch (e.code) {
   case ft.Right:
    return {
     ...a, x: a.x + 25
    };
   case ft.Left:
    return {
     ...a, x: a.x - 25
    };
   case ft.Down:
    return {
     ...a, y: a.y + 25
    };
   case ft.Up:
    return {
     ...a, y: a.y - 25
    }
  }
 };
class Ju {
 constructor(r) {
  this.props = void 0, this.autoScrollEnabled = !1, this.referenceCoordinates = void 0, this.listeners = void 0, this.windowListeners = void 0, this.props = r;
  const {
   event: {
    target: a
   }
  } = r;
  this.props = r, this.listeners = new ns(Ui(a)), this.windowListeners = new ns(Hn(a)), this.handleKeyDown = this.handleKeyDown.bind(this), this.handleCancel = this.handleCancel.bind(this), this.attach()
 }
 attach() {
  this.handleStart(), this.windowListeners.add(fr.Resize, this.handleCancel), this.windowListeners.add(fr.VisibilityChange, this.handleCancel), setTimeout(() => this.listeners.add(fr.Keydown, this.handleKeyDown))
 }
 handleStart() {
  const {
   activeNode: r,
   onStart: a
  } = this.props, i = r.node.current;
  i && bD(i), a(Tr)
 }
 handleKeyDown(r) {
  if (tm(r)) {
   const {
    active: a,
    context: i,
    options: s
   } = this.props, {
    keyboardCodes: c = Mx,
    coordinateGetter: d = wD,
    scrollBehavior: f = "smooth"
   } = s, {
    code: h
   } = r;
   if (c.end.includes(h)) {
    this.handleEnd(r);
    return
   }
   if (c.cancel.includes(h)) {
    this.handleCancel(r);
    return
   }
   const {
    collisionRect: m
   } = i.current, g = m ? {
    x: m.left,
    y: m.top
   } : Tr;
   this.referenceCoordinates || (this.referenceCoordinates = g);
   const b = d(r, {
    active: a,
    context: i.current,
    currentCoordinates: g
   });
   if (b) {
    const w = ys(b, g),
     R = {
      x: 0,
      y: 0
     },
     {
      scrollableAncestors: T
     } = i.current;
    for (const C of T) {
     const D = r.code,
      {
       isTop: k,
       isRight: N,
       isLeft: E,
       isBottom: A,
       maxScroll: O,
       minScroll: L
      } = Tx(C),
      U = gD(C),
      _ = {
       x: Math.min(D === ft.Right ? U.right - U.width / 2 : U.right, Math.max(D === ft.Right ? U.left : U.left + U.width / 2, b.x)),
       y: Math.min(D === ft.Down ? U.bottom - U.height / 2 : U.bottom, Math.max(D === ft.Down ? U.top : U.top + U.height / 2, b.y))
      },
      G = D === ft.Right && !N || D === ft.Left && !E,
      S = D === ft.Down && !A || D === ft.Up && !k;
     if (G && _.x !== b.x) {
      const $ = C.scrollLeft + w.x,
       H = D === ft.Right && $ <= O.x || D === ft.Left && $ >= L.x;
      if (H && !w.y) {
       C.scrollTo({
        left: $,
        behavior: f
       });
       return
      }
      H ? R.x = C.scrollLeft - $ : R.x = D === ft.Right ? C.scrollLeft - O.x : C.scrollLeft - L.x, R.x && C.scrollBy({
       left: -R.x,
       behavior: f
      });
      break
     } else if (S && _.y !== b.y) {
      const $ = C.scrollTop + w.y,
       H = D === ft.Down && $ <= O.y || D === ft.Up && $ >= L.y;
      if (H && !w.x) {
       C.scrollTo({
        top: $,
        behavior: f
       });
       return
      }
      H ? R.y = C.scrollTop - $ : R.y = D === ft.Down ? C.scrollTop - O.y : C.scrollTop - L.y, R.y && C.scrollBy({
       top: -R.y,
       behavior: f
      });
      break
     }
    }
    this.handleMove(r, Ei(ys(b, this.referenceCoordinates), R))
   }
  }
 }
 handleMove(r, a) {
  const {
   onMove: i
  } = this.props;
  r.preventDefault(), i(a)
 }
 handleEnd(r) {
  const {
   onEnd: a
  } = this.props;
  r.preventDefault(), this.detach(), a()
 }
 handleCancel(r) {
  const {
   onCancel: a
  } = this.props;
  r.preventDefault(), this.detach(), a()
 }
 detach() {
  this.listeners.removeAll(), this.windowListeners.removeAll()
 }
}
Ju.activators = [{
 eventName: "onKeyDown",
 handler: (e, r, a) => {
  let {
   keyboardCodes: i = Mx,
   onActivation: s
  } = r, {
   active: c
  } = a;
  const {
   code: d
  } = e.nativeEvent;
  if (i.start.includes(d)) {
   const f = c.activatorNode.current;
   return f && e.target !== f ? !1 : (e.preventDefault(), s == null || s({
    event: e.nativeEvent
   }), !0)
  }
  return !1
 }
}];

function Mb(e) {
 return !!(e && "distance" in e)
}

function Ob(e) {
 return !!(e && "delay" in e)
}
class rm {
 constructor(r, a, i) {
  var s;
  i === void 0 && (i = SD(r.event.target)), this.props = void 0, this.events = void 0, this.autoScrollEnabled = !0, this.document = void 0, this.activated = !1, this.initialCoordinates = void 0, this.timeoutId = null, this.listeners = void 0, this.documentListeners = void 0, this.windowListeners = void 0, this.props = r, this.events = a;
  const {
   event: c
  } = r, {
   target: d
  } = c;
  this.props = r, this.events = a, this.document = Ui(d), this.documentListeners = new ns(this.document), this.listeners = new ns(i), this.windowListeners = new ns(Hn(d)), this.initialCoordinates = (s = fh(c)) != null ? s : Tr, this.handleStart = this.handleStart.bind(this), this.handleMove = this.handleMove.bind(this), this.handleEnd = this.handleEnd.bind(this), this.handleCancel = this.handleCancel.bind(this), this.handleKeydown = this.handleKeydown.bind(this), this.removeTextSelection = this.removeTextSelection.bind(this), this.attach()
 }
 attach() {
  const {
   events: r,
   props: {
    options: {
     activationConstraint: a,
     bypassActivationConstraint: i
    }
   }
  } = this;
  if (this.listeners.add(r.move.name, this.handleMove, {
    passive: !1
   }), this.listeners.add(r.end.name, this.handleEnd), r.cancel && this.listeners.add(r.cancel.name, this.handleCancel), this.windowListeners.add(fr.Resize, this.handleCancel), this.windowListeners.add(fr.DragStart, Ab), this.windowListeners.add(fr.VisibilityChange, this.handleCancel), this.windowListeners.add(fr.ContextMenu, Ab), this.documentListeners.add(fr.Keydown, this.handleKeydown), a) {
   if (i != null && i({
     event: this.props.event,
     activeNode: this.props.activeNode,
     options: this.props.options
    })) return this.handleStart();
   if (Ob(a)) {
    this.timeoutId = setTimeout(this.handleStart, a.delay), this.handlePending(a);
    return
   }
   if (Mb(a)) {
    this.handlePending(a);
    return
   }
  }
  this.handleStart()
 }
 detach() {
  this.listeners.removeAll(), this.windowListeners.removeAll(), setTimeout(this.documentListeners.removeAll, 50), this.timeoutId !== null && (clearTimeout(this.timeoutId), this.timeoutId = null)
 }
 handlePending(r, a) {
  const {
   active: i,
   onPending: s
  } = this.props;
  s(i, r, this.initialCoordinates, a)
 }
 handleStart() {
  const {
   initialCoordinates: r
  } = this, {
   onStart: a
  } = this.props;
  r && (this.activated = !0, this.documentListeners.add(fr.Click, CD, {
   capture: !0
  }), this.removeTextSelection(), this.documentListeners.add(fr.SelectionChange, this.removeTextSelection), a(r))
 }
 handleMove(r) {
  var a;
  const {
   activated: i,
   initialCoordinates: s,
   props: c
  } = this, {
   onMove: d,
   options: {
    activationConstraint: f
   }
  } = c;
  if (!s) return;
  const h = (a = fh(r)) != null ? a : Tr,
   m = ys(s, h);
  if (!i && f) {
   if (Mb(f)) {
    if (f.tolerance != null && _p(m, f.tolerance)) return this.handleCancel();
    if (_p(m, f.distance)) return this.handleStart()
   }
   if (Ob(f) && _p(m, f.tolerance)) return this.handleCancel();
   this.handlePending(f, m);
   return
  }
  r.cancelable && r.preventDefault(), d(h)
 }
 handleEnd() {
  const {
   onAbort: r,
   onEnd: a
  } = this.props;
  this.detach(), this.activated || r(this.props.active), a()
 }
 handleCancel() {
  const {
   onAbort: r,
   onCancel: a
  } = this.props;
  this.detach(), this.activated || r(this.props.active), a()
 }
 handleKeydown(r) {
  r.code === ft.Esc && this.handleCancel()
 }
 removeTextSelection() {
  var r;
  (r = this.document.getSelection()) == null || r.removeAllRanges()
 }
}
const RD = {
 cancel: {
  name: "pointercancel"
 },
 move: {
  name: "pointermove"
 },
 end: {
  name: "pointerup"
 }
};
class ed extends rm {
 constructor(r) {
  const {
   event: a
  } = r, i = Ui(a.target);
  super(r, RD, i)
 }
}
ed.activators = [{
 eventName: "onPointerDown",
 handler: (e, r) => {
  let {
   nativeEvent: a
  } = e, {
   onActivation: i
  } = r;
  return !a.isPrimary || a.button !== 0 ? !1 : (i == null || i({
   event: a
  }), !0)
 }
}];
const ED = {
 move: {
  name: "mousemove"
 },
 end: {
  name: "mouseup"
 }
};
var hh;
(function(e) {
 e[e.RightClick = 2] = "RightClick"
})(hh || (hh = {}));
class TD extends rm {
 constructor(r) {
  super(r, ED, Ui(r.event.target))
 }
}
TD.activators = [{
 eventName: "onMouseDown",
 handler: (e, r) => {
  let {
   nativeEvent: a
  } = e, {
   onActivation: i
  } = r;
  return a.button === hh.RightClick ? !1 : (i == null || i({
   event: a
  }), !0)
 }
}];
const Up = {
 cancel: {
  name: "touchcancel"
 },
 move: {
  name: "touchmove"
 },
 end: {
  name: "touchend"
 }
};
class om extends rm {
 constructor(r) {
  super(r, Up)
 }
 static setup() {
  return window.addEventListener(Up.move.name, r, {
    capture: !1,
    passive: !1
   }),
   function() {
    window.removeEventListener(Up.move.name, r)
   };

  function r() {}
 }
}
om.activators = [{
 eventName: "onTouchStart",
 handler: (e, r) => {
  let {
   nativeEvent: a
  } = e, {
   onActivation: i
  } = r;
  const {
   touches: s
  } = a;
  return s.length > 1 ? !1 : (i == null || i({
   event: a
  }), !0)
 }
}];
var rs;
(function(e) {
 e[e.Pointer = 0] = "Pointer", e[e.DraggableRect = 1] = "DraggableRect"
})(rs || (rs = {}));
var Tu;
(function(e) {
 e[e.TreeOrder = 0] = "TreeOrder", e[e.ReversedTreeOrder = 1] = "ReversedTreeOrder"
})(Tu || (Tu = {}));

function AD(e) {
 let {
  acceleration: r,
  activator: a = rs.Pointer,
  canScroll: i,
  draggingRect: s,
  enabled: c,
  interval: d = 5,
  order: f = Tu.TreeOrder,
  pointerCoordinates: h,
  scrollableAncestors: m,
  scrollableAncestorRects: g,
  delta: b,
  threshold: w
 } = e;
 const R = OD({
   delta: b,
   disabled: !c
  }),
  [T, C] = H4(),
  D = y.useRef({
   x: 0,
   y: 0
  }),
  k = y.useRef({
   x: 0,
   y: 0
  }),
  N = y.useMemo(() => {
   switch (a) {
    case rs.Pointer:
     return h ? {
      top: h.y,
      bottom: h.y,
      left: h.x,
      right: h.x
     } : null;
    case rs.DraggableRect:
     return s
   }
  }, [a, s, h]),
  E = y.useRef(null),
  A = y.useCallback(() => {
   const L = E.current;
   if (!L) return;
   const U = D.current.x * k.current.x,
    _ = D.current.y * k.current.y;
   L.scrollBy(U, _)
  }, []),
  O = y.useMemo(() => f === Tu.TreeOrder ? [...m].reverse() : m, [f, m]);
 y.useEffect(() => {
  if (!c || !m.length || !N) {
   C();
   return
  }
  for (const L of O) {
   if ((i == null ? void 0 : i(L)) === !1) continue;
   const U = m.indexOf(L),
    _ = g[U];
   if (!_) continue;
   const {
    direction: G,
    speed: S
   } = mD(L, _, N, r, w);
   for (const $ of ["x", "y"]) R[$][G[$]] || (S[$] = 0, G[$] = 0);
   if (S.x > 0 || S.y > 0) {
    C(), E.current = L, T(A, d), D.current = S, k.current = G;
    return
   }
  }
  D.current = {
   x: 0,
   y: 0
  }, k.current = {
   x: 0,
   y: 0
  }, C()
 }, [r, A, i, C, c, d, JSON.stringify(N), JSON.stringify(R), T, m, O, g, JSON.stringify(w)])
}
const MD = {
 x: {
  [yn.Backward]: !1,
  [yn.Forward]: !1
 },
 y: {
  [yn.Backward]: !1,
  [yn.Forward]: !1
 }
};

function OD(e) {
 let {
  delta: r,
  disabled: a
 } = e;
 const i = dh(r);
 return ks(s => {
  if (a || !i || !s) return MD;
  const c = {
   x: Math.sign(r.x - i.x),
   y: Math.sign(r.y - i.y)
  };
  return {
   x: {
    [yn.Backward]: s.x[yn.Backward] || c.x === -1,
    [yn.Forward]: s.x[yn.Forward] || c.x === 1
   },
   y: {
    [yn.Backward]: s.y[yn.Backward] || c.y === -1,
    [yn.Forward]: s.y[yn.Forward] || c.y === 1
   }
  }
 }, [a, r, i])
}

function DD(e, r) {
 const a = r != null ? e.get(r) : void 0,
  i = a ? a.node.current : null;
 return ks(s => {
  var c;
  return r == null ? null : (c = i ?? s) != null ? c : null
 }, [i, r])
}

function kD(e, r) {
 return y.useMemo(() => e.reduce((a, i) => {
  const {
   sensor: s
  } = i, c = s.activators.map(d => ({
   eventName: d.eventName,
   handler: r(d.handler, i)
  }));
  return [...a, ...c]
 }, []), [e, r])
}
var bs;
(function(e) {
 e[e.Always = 0] = "Always", e[e.BeforeDragging = 1] = "BeforeDragging", e[e.WhileDragging = 2] = "WhileDragging"
})(bs || (bs = {}));
var mh;
(function(e) {
 e.Optimized = "optimized"
})(mh || (mh = {}));
const Db = new Map;

function zD(e, r) {
 let {
  dragging: a,
  dependencies: i,
  config: s
 } = r;
 const [c, d] = y.useState(null), {
  frequency: f,
  measure: h,
  strategy: m
 } = s, g = y.useRef(e), b = D(), w = vs(b), R = y.useCallback(function(k) {
  k === void 0 && (k = []), !w.current && d(N => N === null ? k : N.concat(k.filter(E => !N.includes(E))))
 }, [w]), T = y.useRef(null), C = ks(k => {
  if (b && !a) return Db;
  if (!k || k === Db || g.current !== e || c != null) {
   const N = new Map;
   for (let E of e) {
    if (!E) continue;
    if (c && c.length > 0 && !c.includes(E.id) && E.rect.current) {
     N.set(E.id, E.rect.current);
     continue
    }
    const A = E.node.current,
     O = A ? new nm(h(A), A) : null;
    E.rect.current = O, O && N.set(E.id, O)
   }
   return N
  }
  return k
 }, [e, c, a, b, h]);
 return y.useEffect(() => {
  g.current = e
 }, [e]), y.useEffect(() => {
  b || R()
 }, [a, b]), y.useEffect(() => {
  c && c.length > 0 && d(null)
 }, [JSON.stringify(c)]), y.useEffect(() => {
  b || typeof f != "number" || T.current !== null || (T.current = setTimeout(() => {
   R(), T.current = null
  }, f))
 }, [f, b, R, ...i]), {
  droppableRects: C,
  measureDroppableContainers: R,
  measuringScheduled: c != null
 };

 function D() {
  switch (m) {
   case bs.Always:
    return !1;
   case bs.BeforeDragging:
    return a;
   default:
    return !a
  }
 }
}

function Ox(e, r) {
 return ks(a => e ? a || (typeof r == "function" ? r(e) : e) : null, [r, e])
}

function jD(e, r) {
 return Ox(e, r)
}

function ND(e) {
 let {
  callback: r,
  disabled: a
 } = e;
 const i = em(r),
  s = y.useMemo(() => {
   if (a || typeof window > "u" || typeof window.MutationObserver > "u") return;
   const {
    MutationObserver: c
   } = window;
   return new c(i)
  }, [i, a]);
 return y.useEffect(() => () => s == null ? void 0 : s.disconnect(), [s]), s
}

function td(e) {
 let {
  callback: r,
  disabled: a
 } = e;
 const i = em(r),
  s = y.useMemo(() => {
   if (a || typeof window > "u" || typeof window.ResizeObserver > "u") return;
   const {
    ResizeObserver: c
   } = window;
   return new c(i)
  }, [a]);
 return y.useEffect(() => () => s == null ? void 0 : s.disconnect(), [s]), s
}

function LD(e) {
 return new nm(Ii(e), e)
}

function kb(e, r, a) {
 r === void 0 && (r = LD);
 const [i, s] = y.useState(null);

 function c() {
  s(h => {
   if (!e) return null;
   if (e.isConnected === !1) {
    var m;
    return (m = h ?? a) != null ? m : null
   }
   const g = r(e);
   return JSON.stringify(h) === JSON.stringify(g) ? h : g
  })
 }
 const d = ND({
   callback(h) {
    if (e)
     for (const m of h) {
      const {
       type: g,
       target: b
      } = m;
      if (g === "childList" && b instanceof HTMLElement && b.contains(e)) {
       c();
       break
      }
     }
   }
  }),
  f = td({
   callback: c
  });
 return Vr(() => {
  c(), e ? (f == null || f.observe(e), d == null || d.observe(document.body, {
   childList: !0,
   subtree: !0
  })) : (f == null || f.disconnect(), d == null || d.disconnect())
 }, [e]), i
}

function BD(e) {
 const r = Ox(e);
 return Sx(e, r)
}
const zb = [];

function $D(e) {
 const r = y.useRef(e),
  a = ks(i => e ? i && i !== zb && e && r.current && e.parentNode === r.current.parentNode ? i : Zu(e) : zb, [e]);
 return y.useEffect(() => {
  r.current = e
 }, [e]), a
}

function _D(e) {
 const [r, a] = y.useState(null), i = y.useRef(e), s = y.useCallback(c => {
  const d = $p(c.target);
  d && a(f => f ? (f.set(d, ph(d)), new Map(f)) : null)
 }, []);
 return y.useEffect(() => {
  const c = i.current;
  if (e !== c) {
   d(c);
   const f = e.map(h => {
    const m = $p(h);
    return m ? (m.addEventListener("scroll", s, {
     passive: !0
    }), [m, ph(m)]) : null
   }).filter(h => h != null);
   a(f.length ? new Map(f) : null), i.current = e
  }
  return () => {
   d(e), d(c)
  };

  function d(f) {
   f.forEach(h => {
    const m = $p(h);
    m == null || m.removeEventListener("scroll", s)
   })
  }
 }, [s, e]), y.useMemo(() => e.length ? r ? Array.from(r.values()).reduce((c, d) => Ei(c, d), Tr) : Ax(e) : Tr, [e, r])
}

function jb(e, r) {
 r === void 0 && (r = []);
 const a = y.useRef(null);
 return y.useEffect(() => {
  a.current = null
 }, r), y.useEffect(() => {
  const i = e !== Tr;
  i && !a.current && (a.current = e), !i && a.current && (a.current = null)
 }, [e]), a.current ? ys(e, a.current) : Tr
}

function UD(e) {
 y.useEffect(() => {
  if (!Qu) return;
  const r = e.map(a => {
   let {
    sensor: i
   } = a;
   return i.setup == null ? void 0 : i.setup()
  });
  return () => {
   for (const a of r) a == null || a()
  }
 }, e.map(r => {
  let {
   sensor: a
  } = r;
  return a
 }))
}

function ID(e, r) {
 return y.useMemo(() => e.reduce((a, i) => {
  let {
   eventName: s,
   handler: c
  } = i;
  return a[s] = d => {
   c(d, r)
  }, a
 }, {}), [e, r])
}

function Dx(e) {
 return y.useMemo(() => e ? dD(e) : null, [e])
}
const Nb = [];

function PD(e, r) {
 r === void 0 && (r = Ii);
 const [a] = e, i = Dx(a ? Hn(a) : null), [s, c] = y.useState(Nb);

 function d() {
  c(() => e.length ? e.map(h => Ex(h) ? i : new nm(r(h), h)) : Nb)
 }
 const f = td({
  callback: d
 });
 return Vr(() => {
  f == null || f.disconnect(), d(), e.forEach(h => f == null ? void 0 : f.observe(h))
 }, [e]), s
}

function HD(e) {
 if (!e) return null;
 if (e.children.length > 1) return e;
 const r = e.children[0];
 return Ds(r) ? r : e
}

function qD(e) {
 let {
  measure: r
 } = e;
 const [a, i] = y.useState(null), s = y.useCallback(m => {
  for (const {
    target: g
   }
   of m)
   if (Ds(g)) {
    i(b => {
     const w = r(g);
     return b ? {
      ...b,
      width: w.width,
      height: w.height
     } : w
    });
    break
   }
 }, [r]), c = td({
  callback: s
 }), d = y.useCallback(m => {
  const g = HD(m);
  c == null || c.disconnect(), g && (c == null || c.observe(g)), i(g ? r(g) : null)
 }, [r, c]), [f, h] = Ru(d);
 return y.useMemo(() => ({
  nodeRef: f,
  rect: a,
  setRef: h
 }), [a, f, h])
}
const VD = [{
  sensor: ed,
  options: {}
 }, {
  sensor: Ju,
  options: {}
 }],
 GD = {
  current: {}
 },
 mu = {
  draggable: {
   measure: Tb
  },
  droppable: {
   measure: Tb,
   strategy: bs.WhileDragging,
   frequency: mh.Optimized
  },
  dragOverlay: {
   measure: Ii
  }
 };
class os extends Map {
 get(r) {
  var a;
  return r != null && (a = super.get(r)) != null ? a : void 0
 }
 toArray() {
  return Array.from(this.values())
 }
 getEnabled() {
  return this.toArray().filter(r => {
   let {
    disabled: a
   } = r;
   return !a
  })
 }
 getNodeFor(r) {
  var a, i;
  return (a = (i = this.get(r)) == null ? void 0 : i.node.current) != null ? a : void 0
 }
}
const YD = {
  activatorEvent: null,
  active: null,
  activeNode: null,
  activeNodeRect: null,
  collisions: null,
  containerNodeRect: null,
  draggableNodes: new Map,
  droppableRects: new Map,
  droppableContainers: new os,
  over: null,
  dragOverlay: {
   nodeRef: {
    current: null
   },
   rect: null,
   setRef: Eu
  },
  scrollableAncestors: [],
  scrollableAncestorRects: [],
  measuringConfiguration: mu,
  measureDroppableContainers: Eu,
  windowRect: null,
  measuringScheduled: !1
 },
 XD = {
  activatorEvent: null,
  activators: [],
  active: null,
  activeNodeRect: null,
  ariaDescribedById: {
   draggable: ""
  },
  dispatch: Eu,
  draggableNodes: new Map,
  over: null,
  measureDroppableContainers: Eu
 },
 nd = y.createContext(XD),
 kx = y.createContext(YD);

function WD() {
 return {
  draggable: {
   active: null,
   initialCoordinates: {
    x: 0,
    y: 0
   },
   nodes: new Map,
   translate: {
    x: 0,
    y: 0
   }
  },
  droppable: {
   containers: new os
  }
 }
}

function FD(e, r) {
 switch (r.type) {
  case fn.DragStart:
   return {
    ...e, draggable: {
     ...e.draggable,
     initialCoordinates: r.initialCoordinates,
     active: r.active
    }
   };
  case fn.DragMove:
   return e.draggable.active == null ? e : {
    ...e,
    draggable: {
     ...e.draggable,
     translate: {
      x: r.coordinates.x - e.draggable.initialCoordinates.x,
      y: r.coordinates.y - e.draggable.initialCoordinates.y
     }
    }
   };
  case fn.DragEnd:
  case fn.DragCancel:
   return {
    ...e, draggable: {
     ...e.draggable,
     active: null,
     initialCoordinates: {
      x: 0,
      y: 0
     },
     translate: {
      x: 0,
      y: 0
     }
    }
   };
  case fn.RegisterDroppable: {
   const {
    element: a
   } = r, {
    id: i
   } = a, s = new os(e.droppable.containers);
   return s.set(i, a), {
    ...e,
    droppable: {
     ...e.droppable,
     containers: s
    }
   }
  }
  case fn.SetDroppableDisabled: {
   const {
    id: a,
    key: i,
    disabled: s
   } = r, c = e.droppable.containers.get(a);
   if (!c || i !== c.key) return e;
   const d = new os(e.droppable.containers);
   return d.set(a, {
    ...c,
    disabled: s
   }), {
    ...e,
    droppable: {
     ...e.droppable,
     containers: d
    }
   }
  }
  case fn.UnregisterDroppable: {
   const {
    id: a,
    key: i
   } = r, s = e.droppable.containers.get(a);
   if (!s || i !== s.key) return e;
   const c = new os(e.droppable.containers);
   return c.delete(a), {
    ...e,
    droppable: {
     ...e.droppable,
     containers: c
    }
   }
  }
  default:
   return e
 }
}

function KD(e) {
 let {
  disabled: r
 } = e;
 const {
  active: a,
  activatorEvent: i,
  draggableNodes: s
 } = y.useContext(nd), c = dh(i), d = dh(a == null ? void 0 : a.id);
 return y.useEffect(() => {
  if (!r && !i && c && d != null) {
   if (!tm(c) || document.activeElement === c.target) return;
   const f = s.get(d);
   if (!f) return;
   const {
    activatorNode: h,
    node: m
   } = f;
   if (!h.current && !m.current) return;
   requestAnimationFrame(() => {
    for (const g of [h.current, m.current]) {
     if (!g) continue;
     const b = G4(g);
     if (b) {
      b.focus();
      break
     }
    }
   })
  }
 }, [i, r, s, d, c]), null
}

function QD(e, r) {
 let {
  transform: a,
  ...i
 } = r;
 return e != null && e.length ? e.reduce((s, c) => c({
  transform: s,
  ...i
 }), a) : a
}

function ZD(e) {
 return y.useMemo(() => ({
  draggable: {
   ...mu.draggable,
   ...e == null ? void 0 : e.draggable
  },
  droppable: {
   ...mu.droppable,
   ...e == null ? void 0 : e.droppable
  },
  dragOverlay: {
   ...mu.dragOverlay,
   ...e == null ? void 0 : e.dragOverlay
  }
 }), [e == null ? void 0 : e.draggable, e == null ? void 0 : e.droppable, e == null ? void 0 : e.dragOverlay])
}

function JD(e) {
 let {
  activeNode: r,
  measure: a,
  initialRect: i,
  config: s = !0
 } = e;
 const c = y.useRef(!1),
  {
   x: d,
   y: f
  } = typeof s == "boolean" ? {
   x: s,
   y: s
  } : s;
 Vr(() => {
  if (!d && !f || !r) {
   c.current = !1;
   return
  }
  if (c.current || !i) return;
  const m = r == null ? void 0 : r.node.current;
  if (!m || m.isConnected === !1) return;
  const g = a(m),
   b = Sx(g, i);
  if (d || (b.x = 0), f || (b.y = 0), c.current = !0, Math.abs(b.x) > 0 || Math.abs(b.y) > 0) {
   const w = Cx(m);
   w && w.scrollBy({
    top: b.y,
    left: b.x
   })
  }
 }, [r, d, f, i, a])
}
const zx = y.createContext({
 ...Tr,
 scaleX: 1,
 scaleY: 1
});
var _o;
(function(e) {
 e[e.Uninitialized = 0] = "Uninitialized", e[e.Initializing = 1] = "Initializing", e[e.Initialized = 2] = "Initialized"
})(_o || (_o = {}));
const jx = y.memo(function(r) {
  var a, i, s, c;
  let {
   id: d,
   accessibility: f,
   autoScroll: h = !0,
   children: m,
   sensors: g = VD,
   collisionDetection: b = oD,
   measuring: w,
   modifiers: R,
   ...T
  } = r;
  const C = y.useReducer(FD, void 0, WD),
   [D, k] = C,
   [N, E] = Q4(),
   [A, O] = y.useState(_o.Uninitialized),
   L = A === _o.Initialized,
   {
    draggable: {
     active: U,
     nodes: _,
     translate: G
    },
    droppable: {
     containers: S
    }
   } = D,
   $ = U != null ? _.get(U) : null,
   H = y.useRef({
    initial: null,
    translated: null
   }),
   V = y.useMemo(() => {
    var Fe;
    return U != null ? {
     id: U,
     data: (Fe = $ == null ? void 0 : $.data) != null ? Fe : GD,
     rect: H
    } : null
   }, [U, $]),
   X = y.useRef(null),
   [W, z] = y.useState(null),
   [I, Q] = y.useState(null),
   Z = vs(T, Object.values(T)),
   j = zs("DndDescribedBy", d),
   q = y.useMemo(() => S.getEnabled(), [S]),
   ee = ZD(w),
   {
    droppableRects: ne,
    measureDroppableContainers: ce,
    measuringScheduled: le
   } = zD(q, {
    dragging: L,
    dependencies: [G.x, G.y],
    config: ee.droppable
   }),
   re = DD(_, U),
   ye = y.useMemo(() => I ? fh(I) : null, [I]),
   ge = jn(),
   Te = jD(re, ee.draggable.measure);
  JD({
   activeNode: U != null ? _.get(U) : null,
   config: ge.layoutShiftCompensation,
   initialRect: Te,
   measure: ee.draggable.measure
  });
  const fe = kb(re, ee.draggable.measure, Te),
   Oe = kb(re ? re.parentElement : null),
   we = y.useRef({
    activatorEvent: null,
    active: null,
    activeNode: re,
    collisionRect: null,
    collisions: null,
    droppableRects: ne,
    draggableNodes: _,
    draggingNode: null,
    draggingNodeRect: null,
    droppableContainers: S,
    over: null,
    scrollableAncestors: [],
    scrollAdjustedTranslate: null
   }),
   Se = S.getNodeFor((a = we.current.over) == null ? void 0 : a.id),
   Re = qD({
    measure: ee.dragOverlay.measure
   }),
   ze = (i = Re.nodeRef.current) != null ? i : re,
   it = L ? (s = Re.rect) != null ? s : fe : null,
   Ne = !!(Re.nodeRef.current && Re.rect),
   Je = BD(Ne ? null : fe),
   Ke = Dx(ze ? Hn(ze) : null),
   Pe = $D(L ? Se ?? re : null),
   He = PD(Pe),
   Ee = QD(R, {
    transform: {
     x: G.x - Je.x,
     y: G.y - Je.y,
     scaleX: 1,
     scaleY: 1
    },
    activatorEvent: I,
    active: V,
    activeNodeRect: fe,
    containerNodeRect: Oe,
    draggingNodeRect: it,
    over: we.current.over,
    overlayNodeRect: Re.rect,
    scrollableAncestors: Pe,
    scrollableAncestorRects: He,
    windowRect: Ke
   }),
   mt = ye ? Ei(ye, G) : null,
   ot = _D(Pe),
   de = jb(ot),
   me = jb(ot, [fe]),
   ve = Ei(Ee, de),
   De = it ? lD(it, Ee) : null,
   be = V && De ? b({
    active: V,
    collisionRect: De,
    droppableRects: ne,
    droppableContainers: q,
    pointerCoordinates: mt
   }) : null,
   xe = bx(be, "id"),
   [he, Qe] = y.useState(null),
   Be = Ne ? Ee : Ei(Ee, me),
   Xe = aD(Be, (c = he == null ? void 0 : he.rect) != null ? c : null, fe),
   Me = y.useRef(null),
   tt = y.useCallback((Fe, lt) => {
    let {
     sensor: Pt,
     options: Vt
    } = lt;
    if (X.current == null) return;
    const pt = _.get(X.current);
    if (!pt) return;
    const je = Fe.nativeEvent,
     kt = new Pt({
      active: X.current,
      activeNode: pt,
      event: je,
      options: Vt,
      context: we,
      onAbort(vt) {
       if (!_.get(vt)) return;
       const {
        onDragAbort: jt
       } = Z.current, pn = {
        id: vt
       };
       jt == null || jt(pn), N({
        type: "onDragAbort",
        event: pn
       })
      },
      onPending(vt, zt, jt, pn) {
       if (!_.get(vt)) return;
       const {
        onDragPending: Yr
       } = Z.current, er = {
        id: vt,
        constraint: zt,
        initialCoordinates: jt,
        offset: pn
       };
       Yr == null || Yr(er), N({
        type: "onDragPending",
        event: er
       })
      },
      onStart(vt) {
       const zt = X.current;
       if (zt == null) return;
       const jt = _.get(zt);
       if (!jt) return;
       const {
        onDragStart: pn
       } = Z.current, Nn = {
        activatorEvent: je,
        active: {
         id: zt,
         data: jt.data,
         rect: H
        }
       };
       fa.unstable_batchedUpdates(() => {
        pn == null || pn(Nn), O(_o.Initializing), k({
         type: fn.DragStart,
         initialCoordinates: vt,
         active: zt
        }), N({
         type: "onDragStart",
         event: Nn
        }), z(Me.current), Q(je)
       })
      },
      onMove(vt) {
       k({
        type: fn.DragMove,
        coordinates: vt
       })
      },
      onEnd: En(fn.DragEnd),
      onCancel: En(fn.DragCancel)
     });
    Me.current = kt;

    function En(vt) {
     return async function() {
      const {
       active: jt,
       collisions: pn,
       over: Nn,
       scrollAdjustedTranslate: Yr
      } = we.current;
      let er = null;
      if (jt && Yr) {
       const {
        cancelDrop: Mr
       } = Z.current;
       er = {
        activatorEvent: je,
        active: jt,
        collisions: pn,
        delta: Yr,
        over: Nn
       }, vt === fn.DragEnd && typeof Mr == "function" && await Promise.resolve(Mr(er)) && (vt = fn.DragCancel)
      }
      X.current = null, fa.unstable_batchedUpdates(() => {
       k({
        type: vt
       }), O(_o.Uninitialized), Qe(null), z(null), Q(null), Me.current = null;
       const Mr = vt === fn.DragEnd ? "onDragEnd" : "onDragCancel";
       if (er) {
        const Sr = Z.current[Mr];
        Sr == null || Sr(er), N({
         type: Mr,
         event: er
        })
       }
      })
     }
    }
   }, [_]),
   gt = y.useCallback((Fe, lt) => (Pt, Vt) => {
    const pt = Pt.nativeEvent,
     je = _.get(Vt);
    if (X.current !== null || !je || pt.dndKit || pt.defaultPrevented) return;
    const kt = {
     active: je
    };
    Fe(Pt, lt.options, kt) === !0 && (pt.dndKit = {
     capturedBy: lt.sensor
    }, X.current = Vt, tt(Pt, lt))
   }, [_, tt]),
   rn = kD(g, gt);
  UD(g), Vr(() => {
   fe && A === _o.Initializing && O(_o.Initialized)
  }, [fe, A]), y.useEffect(() => {
   const {
    onDragMove: Fe
   } = Z.current, {
    active: lt,
    activatorEvent: Pt,
    collisions: Vt,
    over: pt
   } = we.current;
   if (!lt || !Pt) return;
   const je = {
    active: lt,
    activatorEvent: Pt,
    collisions: Vt,
    delta: {
     x: ve.x,
     y: ve.y
    },
    over: pt
   };
   fa.unstable_batchedUpdates(() => {
    Fe == null || Fe(je), N({
     type: "onDragMove",
     event: je
    })
   })
  }, [ve.x, ve.y]), y.useEffect(() => {
   const {
    active: Fe,
    activatorEvent: lt,
    collisions: Pt,
    droppableContainers: Vt,
    scrollAdjustedTranslate: pt
   } = we.current;
   if (!Fe || X.current == null || !lt || !pt) return;
   const {
    onDragOver: je
   } = Z.current, kt = Vt.get(xe), En = kt && kt.rect.current ? {
    id: kt.id,
    rect: kt.rect.current,
    data: kt.data,
    disabled: kt.disabled
   } : null, vt = {
    active: Fe,
    activatorEvent: lt,
    collisions: Pt,
    delta: {
     x: pt.x,
     y: pt.y
    },
    over: En
   };
   fa.unstable_batchedUpdates(() => {
    Qe(En), je == null || je(vt), N({
     type: "onDragOver",
     event: vt
    })
   })
  }, [xe]), Vr(() => {
   we.current = {
    activatorEvent: I,
    active: V,
    activeNode: re,
    collisionRect: De,
    collisions: be,
    droppableRects: ne,
    draggableNodes: _,
    draggingNode: ze,
    draggingNodeRect: it,
    droppableContainers: S,
    over: he,
    scrollableAncestors: Pe,
    scrollAdjustedTranslate: ve
   }, H.current = {
    initial: it,
    translated: De
   }
  }, [V, re, be, De, _, ze, it, ne, S, he, Pe, ve]), AD({
   ...ge,
   delta: G,
   draggingRect: De,
   pointerCoordinates: mt,
   scrollableAncestors: Pe,
   scrollableAncestorRects: He
  });
  const On = y.useMemo(() => ({
    active: V,
    activeNode: re,
    activeNodeRect: fe,
    activatorEvent: I,
    collisions: be,
    containerNodeRect: Oe,
    dragOverlay: Re,
    draggableNodes: _,
    droppableContainers: S,
    droppableRects: ne,
    over: he,
    measureDroppableContainers: ce,
    scrollableAncestors: Pe,
    scrollableAncestorRects: He,
    measuringConfiguration: ee,
    measuringScheduled: le,
    windowRect: Ke
   }), [V, re, fe, I, be, Oe, Re, _, S, ne, he, ce, Pe, He, ee, le, Ke]),
   Jn = y.useMemo(() => ({
    activatorEvent: I,
    activators: rn,
    active: V,
    activeNodeRect: fe,
    ariaDescribedById: {
     draggable: j
    },
    dispatch: k,
    draggableNodes: _,
    over: he,
    measureDroppableContainers: ce
   }), [I, rn, V, fe, k, j, _, he, ce]);
  return It.createElement(mx.Provider, {
   value: E
  }, It.createElement(nd.Provider, {
   value: Jn
  }, It.createElement(kx.Provider, {
   value: On
  }, It.createElement(zx.Provider, {
   value: Xe
  }, m)), It.createElement(KD, {
   disabled: (f == null ? void 0 : f.restoreFocus) === !1
  })), It.createElement(eD, {
   ...f,
   hiddenTextDescribedById: j
  }));

  function jn() {
   const Fe = (W == null ? void 0 : W.autoScrollEnabled) === !1,
    lt = typeof h == "object" ? h.enabled === !1 : h === !1,
    Pt = L && !Fe && !lt;
   return typeof h == "object" ? {
    ...h,
    enabled: Pt
   } : {
    enabled: Pt
   }
  }
 }),
 ek = y.createContext(null),
 Lb = "button",
 tk = "Draggable";

function nk(e) {
 let {
  id: r,
  data: a,
  disabled: i = !1,
  attributes: s
 } = e;
 const c = zs(tk),
  {
   activators: d,
   activatorEvent: f,
   active: h,
   activeNodeRect: m,
   ariaDescribedById: g,
   draggableNodes: b,
   over: w
  } = y.useContext(nd),
  {
   role: R = Lb,
   roleDescription: T = "draggable",
   tabIndex: C = 0
  } = s ?? {},
  D = (h == null ? void 0 : h.id) === r,
  k = y.useContext(D ? zx : ek),
  [N, E] = Ru(),
  [A, O] = Ru(),
  L = ID(d, r),
  U = vs(a);
 Vr(() => (b.set(r, {
  id: r,
  key: c,
  node: N,
  activatorNode: A,
  data: U
 }), () => {
  const G = b.get(r);
  G && G.key === c && b.delete(r)
 }), [b, r]);
 const _ = y.useMemo(() => ({
  role: R,
  tabIndex: C,
  "aria-disabled": i,
  "aria-pressed": D && R === Lb ? !0 : void 0,
  "aria-roledescription": T,
  "aria-describedby": g.draggable
 }), [i, R, C, D, T, g.draggable]);
 return {
  active: h,
  activatorEvent: f,
  activeNodeRect: m,
  attributes: _,
  isDragging: D,
  listeners: i ? void 0 : L,
  node: N,
  over: w,
  setNodeRef: E,
  setActivatorNodeRef: O,
  transform: k
 }
}

function rk() {
 return y.useContext(kx)
}
const ok = "Droppable",
 ak = {
  timeout: 25
 };

function ik(e) {
 let {
  data: r,
  disabled: a = !1,
  id: i,
  resizeObserverConfig: s
 } = e;
 const c = zs(ok),
  {
   active: d,
   dispatch: f,
   over: h,
   measureDroppableContainers: m
  } = y.useContext(nd),
  g = y.useRef({
   disabled: a
  }),
  b = y.useRef(!1),
  w = y.useRef(null),
  R = y.useRef(null),
  {
   disabled: T,
   updateMeasurementsFor: C,
   timeout: D
  } = {
   ...ak,
   ...s
  },
  k = vs(C ?? i),
  N = y.useCallback(() => {
   if (!b.current) {
    b.current = !0;
    return
   }
   R.current != null && clearTimeout(R.current), R.current = setTimeout(() => {
    m(Array.isArray(k.current) ? k.current : [k.current]), R.current = null
   }, D)
  }, [D]),
  E = td({
   callback: N,
   disabled: T || !d
  }),
  A = y.useCallback((_, G) => {
   E && (G && (E.unobserve(G), b.current = !1), _ && E.observe(_))
  }, [E]),
  [O, L] = Ru(A),
  U = vs(r);
 return y.useEffect(() => {
  !E || !O.current || (E.disconnect(), b.current = !1, E.observe(O.current))
 }, [O, E]), y.useEffect(() => (f({
  type: fn.RegisterDroppable,
  element: {
   id: i,
   key: c,
   disabled: a,
   node: O,
   rect: w,
   data: U
  }
 }), () => f({
  type: fn.UnregisterDroppable,
  key: c,
  id: i
 })), [i]), y.useEffect(() => {
  a !== g.current.disabled && (f({
   type: fn.SetDroppableDisabled,
   id: i,
   key: c,
   disabled: a
  }), g.current.disabled = a)
 }, [i, c, a, f]), {
  active: d,
  rect: w,
  isOver: (h == null ? void 0 : h.id) === i,
  node: O,
  over: h,
  setNodeRef: L
 }
}

function rd(e, r, a) {
 const i = e.slice();
 return i.splice(a < 0 ? i.length + a : a, 0, i.splice(r, 1)[0]), i
}

function lk(e, r) {
 return e.reduce((a, i, s) => {
  const c = r.get(i);
  return c && (a[s] = c), a
 }, Array(e.length))
}

function au(e) {
 return e !== null && e >= 0
}

function sk(e, r) {
 if (e === r) return !0;
 if (e.length !== r.length) return !1;
 for (let a = 0; a < e.length; a++)
  if (e[a] !== r[a]) return !1;
 return !0
}

function ck(e) {
 return typeof e == "boolean" ? {
  draggable: e,
  droppable: e
 } : e
}
const iu = {
  scaleX: 1,
  scaleY: 1
 },
 uk = e => {
  var r;
  let {
   rects: a,
   activeNodeRect: i,
   activeIndex: s,
   overIndex: c,
   index: d
  } = e;
  const f = (r = a[s]) != null ? r : i;
  if (!f) return null;
  const h = dk(a, d, s);
  if (d === s) {
   const m = a[c];
   return m ? {
    x: s < c ? m.left + m.width - (f.left + f.width) : m.left - f.left,
    y: 0,
    ...iu
   } : null
  }
  return d > s && d <= c ? {
   x: -f.width - h,
   y: 0,
   ...iu
  } : d < s && d >= c ? {
   x: f.width + h,
   y: 0,
   ...iu
  } : {
   x: 0,
   y: 0,
   ...iu
  }
 };

function dk(e, r, a) {
 const i = e[r],
  s = e[r - 1],
  c = e[r + 1];
 return !i || !s && !c ? 0 : a < r ? s ? i.left - (s.left + s.width) : c.left - (i.left + i.width) : c ? c.left - (i.left + i.width) : i.left - (s.left + s.width)
}
const Nx = e => {
  let {
   rects: r,
   activeIndex: a,
   overIndex: i,
   index: s
  } = e;
  const c = rd(r, i, a),
   d = r[s],
   f = c[s];
  return !f || !d ? null : {
   x: f.left - d.left,
   y: f.top - d.top,
   scaleX: f.width / d.width,
   scaleY: f.height / d.height
  }
 },
 lu = {
  scaleX: 1,
  scaleY: 1
 },
 fk = e => {
  var r;
  let {
   activeIndex: a,
   activeNodeRect: i,
   index: s,
   rects: c,
   overIndex: d
  } = e;
  const f = (r = c[a]) != null ? r : i;
  if (!f) return null;
  if (s === a) {
   const m = c[d];
   return m ? {
    x: 0,
    y: a < d ? m.top + m.height - (f.top + f.height) : m.top - f.top,
    ...lu
   } : null
  }
  const h = pk(c, s, a);
  return s > a && s <= d ? {
   x: 0,
   y: -f.height - h,
   ...lu
  } : s < a && s >= d ? {
   x: 0,
   y: f.height + h,
   ...lu
  } : {
   x: 0,
   y: 0,
   ...lu
  }
 };

function pk(e, r, a) {
 const i = e[r],
  s = e[r - 1],
  c = e[r + 1];
 return i ? a < r ? s ? i.top - (s.top + s.height) : c ? c.top - (i.top + i.height) : 0 : c ? c.top - (i.top + i.height) : s ? i.top - (s.top + s.height) : 0 : 0
}
const Lx = "Sortable",
 Bx = It.createContext({
  activeIndex: -1,
  containerId: Lx,
  disableTransforms: !1,
  items: [],
  overIndex: -1,
  useDragOverlay: !1,
  sortedRects: [],
  strategy: Nx,
  disabled: {
   draggable: !1,
   droppable: !1
  }
 });

function $x(e) {
 let {
  children: r,
  id: a,
  items: i,
  strategy: s = Nx,
  disabled: c = !1
 } = e;
 const {
  active: d,
  dragOverlay: f,
  droppableRects: h,
  over: m,
  measureDroppableContainers: g
 } = rk(), b = zs(Lx, a), w = f.rect !== null, R = y.useMemo(() => i.map(L => typeof L == "object" && "id" in L ? L.id : L), [i]), T = d != null, C = d ? R.indexOf(d.id) : -1, D = m ? R.indexOf(m.id) : -1, k = y.useRef(R), N = !sk(R, k.current), E = D !== -1 && C === -1 || N, A = ck(c);
 Vr(() => {
  N && T && g(R)
 }, [N, R, T, g]), y.useEffect(() => {
  k.current = R
 }, [R]);
 const O = y.useMemo(() => ({
  activeIndex: C,
  containerId: b,
  disabled: A,
  disableTransforms: E,
  items: R,
  overIndex: D,
  useDragOverlay: w,
  sortedRects: lk(R, h),
  strategy: s
 }), [C, b, A.draggable, A.droppable, E, R, D, h, w, s]);
 return It.createElement(Bx.Provider, {
  value: O
 }, r)
}
const hk = e => {
  let {
   id: r,
   items: a,
   activeIndex: i,
   overIndex: s
  } = e;
  return rd(a, i, s).indexOf(r)
 },
 mk = e => {
  let {
   containerId: r,
   isSorting: a,
   wasDragging: i,
   index: s,
   items: c,
   newIndex: d,
   previousItems: f,
   previousContainerId: h,
   transition: m
  } = e;
  return !m || !i || f !== c && s === d ? !1 : a ? !0 : d !== s && r === h
 },
 gk = {
  duration: 200,
  easing: "ease"
 },
 _x = "transform",
 vk = Li.Transition.toString({
  property: _x,
  duration: 0,
  easing: "linear"
 }),
 yk = {
  roleDescription: "sortable"
 };

function bk(e) {
 let {
  disabled: r,
  index: a,
  node: i,
  rect: s
 } = e;
 const [c, d] = y.useState(null), f = y.useRef(a);
 return Vr(() => {
  if (!r && a !== f.current && i.current) {
   const h = s.current;
   if (h) {
    const m = Ii(i.current, {
      ignoreTransform: !0
     }),
     g = {
      x: h.left - m.left,
      y: h.top - m.top,
      scaleX: h.width / m.width,
      scaleY: h.height / m.height
     };
    (g.x || g.y) && d(g)
   }
  }
  a !== f.current && (f.current = a)
 }, [r, a, i, s]), y.useEffect(() => {
  c && d(null)
 }, [c]), c
}

function Ux(e) {
 let {
  animateLayoutChanges: r = mk,
  attributes: a,
  disabled: i,
  data: s,
  getNewIndex: c = hk,
  id: d,
  strategy: f,
  resizeObserverConfig: h,
  transition: m = gk
 } = e;
 const {
  items: g,
  containerId: b,
  activeIndex: w,
  disabled: R,
  disableTransforms: T,
  sortedRects: C,
  overIndex: D,
  useDragOverlay: k,
  strategy: N
 } = y.useContext(Bx), E = xk(i, R), A = g.indexOf(d), O = y.useMemo(() => ({
  sortable: {
   containerId: b,
   index: A,
   items: g
  },
  ...s
 }), [b, s, A, g]), L = y.useMemo(() => g.slice(g.indexOf(d)), [g, d]), {
  rect: U,
  node: _,
  isOver: G,
  setNodeRef: S
 } = ik({
  id: d,
  data: O,
  disabled: E.droppable,
  resizeObserverConfig: {
   updateMeasurementsFor: L,
   ...h
  }
 }), {
  active: $,
  activatorEvent: H,
  activeNodeRect: V,
  attributes: X,
  setNodeRef: W,
  listeners: z,
  isDragging: I,
  over: Q,
  setActivatorNodeRef: Z,
  transform: j
 } = nk({
  id: d,
  data: O,
  attributes: {
   ...yk,
   ...a
  },
  disabled: E.draggable
 }), q = P4(S, W), ee = !!$, ne = ee && !T && au(w) && au(D), ce = !k && I, le = ce && ne ? j : null, ye = ne ? le ?? (f ?? N)({
  rects: C,
  activeNodeRect: V,
  activeIndex: w,
  overIndex: D,
  index: A
 }) : null, ge = au(w) && au(D) ? c({
  id: d,
  items: g,
  activeIndex: w,
  overIndex: D
 }) : A, Te = $ == null ? void 0 : $.id, fe = y.useRef({
  activeId: Te,
  items: g,
  newIndex: ge,
  containerId: b
 }), Oe = g !== fe.current.items, we = r({
  active: $,
  containerId: b,
  isDragging: I,
  isSorting: ee,
  id: d,
  index: A,
  items: g,
  newIndex: fe.current.newIndex,
  previousItems: fe.current.items,
  previousContainerId: fe.current.containerId,
  transition: m,
  wasDragging: fe.current.activeId != null
 }), Se = bk({
  disabled: !we,
  index: A,
  node: _,
  rect: U
 });
 return y.useEffect(() => {
  ee && fe.current.newIndex !== ge && (fe.current.newIndex = ge), b !== fe.current.containerId && (fe.current.containerId = b), g !== fe.current.items && (fe.current.items = g)
 }, [ee, ge, b, g]), y.useEffect(() => {
  if (Te === fe.current.activeId) return;
  if (Te != null && fe.current.activeId == null) {
   fe.current.activeId = Te;
   return
  }
  const ze = setTimeout(() => {
   fe.current.activeId = Te
  }, 50);
  return () => clearTimeout(ze)
 }, [Te]), {
  active: $,
  activeIndex: w,
  attributes: X,
  data: O,
  rect: U,
  index: A,
  newIndex: ge,
  items: g,
  isOver: G,
  isSorting: ee,
  isDragging: I,
  listeners: z,
  node: _,
  overIndex: D,
  over: Q,
  setNodeRef: q,
  setActivatorNodeRef: Z,
  setDroppableNodeRef: S,
  setDraggableNodeRef: W,
  transform: Se ?? ye,
  transition: Re()
 };

 function Re() {
  if (Se || Oe && fe.current.newIndex === A) return vk;
  if (!(ce && !tm(H) || !m) && (ee || we)) return Li.Transition.toString({
   ...m,
   property: _x
  })
 }
}

function xk(e, r) {
 var a, i;
 return typeof e == "boolean" ? {
  draggable: e,
  droppable: !1
 } : {
  draggable: (a = e == null ? void 0 : e.draggable) != null ? a : r.draggable,
  droppable: (i = e == null ? void 0 : e.droppable) != null ? i : r.droppable
 }
}

function Au(e) {
 if (!e) return !1;
 const r = e.data.current;
 return !!(r && "sortable" in r && typeof r.sortable == "object" && "containerId" in r.sortable && "items" in r.sortable && "index" in r.sortable)
}
const Sk = [ft.Down, ft.Right, ft.Up, ft.Left],
 Ix = (e, r) => {
  let {
   context: {
    active: a,
    collisionRect: i,
    droppableRects: s,
    droppableContainers: c,
    over: d,
    scrollableAncestors: f
   }
  } = r;
  if (Sk.includes(e.code)) {
   if (e.preventDefault(), !a || !i) return;
   const h = [];
   c.getEnabled().forEach(b => {
    if (!b || b != null && b.disabled) return;
    const w = s.get(b.id);
    if (w) switch (e.code) {
     case ft.Down:
      i.top < w.top && h.push(b);
      break;
     case ft.Up:
      i.top > w.top && h.push(b);
      break;
     case ft.Left:
      i.left > w.left && h.push(b);
      break;
     case ft.Right:
      i.left < w.left && h.push(b);
      break
    }
   });
   const m = nD({
    collisionRect: i,
    droppableRects: s,
    droppableContainers: h
   });
   let g = bx(m, "id");
   if (g === (d == null ? void 0 : d.id) && m.length > 1 && (g = m[1].id), g != null) {
    const b = c.get(a.id),
     w = c.get(g),
     R = w ? s.get(w.id) : null,
     T = w == null ? void 0 : w.node.current;
    if (T && R && b && w) {
     const D = Zu(T).some((L, U) => f[U] !== L),
      k = Px(b, w),
      N = Ck(b, w),
      E = D || !k ? {
       x: 0,
       y: 0
      } : {
       x: N ? i.width - R.width : 0,
       y: N ? i.height - R.height : 0
      },
      A = {
       x: R.left,
       y: R.top
      };
     return E.x && E.y ? A : ys(A, E)
    }
   }
  }
 };

function Px(e, r) {
 return !Au(e) || !Au(r) ? !1 : e.data.current.sortable.containerId === r.data.current.sortable.containerId
}

function Ck(e, r) {
 return !Au(e) || !Au(r) || !Px(e, r) ? !1 : e.data.current.sortable.index < r.data.current.sortable.index
}
const Hx = Tt(v.jsx("path", {
  d: "M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6"
 })),
 qx = Tt(v.jsx("path", {
  d: "M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2m-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"
 })),
 Bb = y.memo(function({
  site: r,
  onUpdate: a,
  onDelete: i,
  isEditMode: s = !1,
  index: c = 0,
  iconApi: d
 }) {
  const [f, h] = y.useState(!1), [m, g] = y.useState(!r.icon), [b, w] = y.useState(!1), {
   attributes: R,
   listeners: T,
   setNodeRef: C,
   transform: D,
   transition: k,
   isDragging: N
  } = Ux({
   id: `site-${r.id||c}`,
   disabled: !s
  }), E = {
   transform: Li.Transform.toString(D),
   transition: k,
   zIndex: N ? 9999 : "auto",
   opacity: N ? .8 : 1,
   position: "relative"
  }, A = r.name.charAt(0).toUpperCase(), O = $ => {
   $.stopPropagation(), $.preventDefault(), h(!0)
  }, L = () => {
   h(!1)
  }, U = () => {
   !s && r.url && window.open(r.url, "_blank")
  }, _ = () => {
   g(!0)
  }, G = () => {
   w(!0)
  }, S = v.jsx(Ze, {
   sx: {
    height: "100%",
    position: "relative",
    transition: "transform 0.3s ease-in-out",
    ...!s && {
     "&:hover": {
      transform: "translateY(-4px)"
     }
    }
   },
   children: v.jsx(ZM, {
    sx: {
     height: "100%",
     display: "flex",
     flexDirection: "column",
     borderRadius: 3,
     transition: "box-shadow 0.3s ease-in-out",
     border: "1px solid",
     borderColor: "divider",
     boxShadow: N ? 8 : 2,
     "&:hover": s ? {} : {
      boxShadow: 5
     },
     overflow: "hidden",
     backgroundColor: $ => $.palette.mode === "dark" ? "rgba(33, 33, 33, 0.9)" : "rgba(255, 255, 255, 0.9)",
     backdropFilter: "blur(5px)"
    },
    children: s ? v.jsxs(Ze, {
     sx: {
      height: "100%",
      p: {
       xs: 1.5,
       sm: 2
      },
      cursor: "grab",
      display: "flex",
      flexDirection: "column"
     },
     children: [v.jsx(Ze, {
      position: "absolute",
      top: 8,
      right: 8,
      children: v.jsx(qx, {
       fontSize: "small",
       color: "primary"
      })
     }), v.jsxs(Ze, {
      display: "flex",
      alignItems: "center",
      mb: 1,
      children: [!m && r.icon ? v.jsxs(Ze, {
       position: "relative",
       mr: 1.5,
       width: 32,
       height: 32,
       flexShrink: 0,
       children: [v.jsx(gb, {
        variant: "rounded",
        width: 32,
        height: 32,
        sx: {
         display: b ? "none" : "block",
         position: "absolute"
        }
       }), v.jsx(ps, {
        in: b,
        timeout: 500,
        children: v.jsx(Ze, {
         component: "img",
         src: r.icon,
         alt: r.name,
         sx: {
          width: 32,
          height: 32,
          borderRadius: 1,
          objectFit: "cover"
         },
         onError: _,
         onLoad: G
        })
       })]
      }) : v.jsx(Ze, {
       sx: {
        width: 32,
        height: 32,
        mr: 1.5,
        borderRadius: 1,
        bgcolor: "primary.light",
        color: "primary.main",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: 1,
        borderColor: "primary.main",
        opacity: .8
       },
       children: A
      }), v.jsx(_t, {
       variant: "subtitle1",
       fontWeight: "medium",
       noWrap: !0,
       sx: {
        fontSize: {
         xs: "0.875rem",
         sm: "1rem"
        }
       },
       children: r.name
      })]
     }), v.jsx(_t, {
      variant: "body2",
      color: "text.secondary",
      sx: {
       display: "-webkit-box",
       WebkitLineClamp: 2,
       WebkitBoxOrient: "vertical",
       overflow: "hidden",
       flexGrow: 1,
       fontSize: {
        xs: "0.75rem",
        sm: "0.875rem"
       }
      },
      children: r.description || "暂无描述"
     })]
    }) : v.jsx(r5, {
     onClick: U,
     sx: {
      height: "100%"
     },
     children: v.jsxs(l5, {
      sx: {
       position: "relative",
       height: "100%",
       display: "flex",
       flexDirection: "column",
       p: {
        xs: 1.5,
        sm: 2
       },
       "&:last-child": {
        pb: {
         xs: 1.5,
         sm: 2
        }
       }
      },
      children: [v.jsxs(Ze, {
       display: "flex",
       alignItems: "center",
       mb: 1,
       children: [!m && r.icon ? v.jsxs(Ze, {
        position: "relative",
        mr: 1.5,
        width: 32,
        height: 32,
        flexShrink: 0,
        children: [v.jsx(gb, {
         variant: "rounded",
         width: 32,
         height: 32,
         sx: {
          display: b ? "none" : "block",
          position: "absolute"
         }
        }), v.jsx(ps, {
         in: b,
         timeout: 500,
         children: v.jsx(Ze, {
          component: "img",
          src: r.icon,
          alt: r.name,
          sx: {
           width: 32,
           height: 32,
           borderRadius: 1,
           objectFit: "cover"
          },
          onError: _,
          onLoad: G
         })
        })]
       }) : v.jsx(Ze, {
        sx: {
         width: 32,
         height: 32,
         mr: 1.5,
         borderRadius: 1,
         bgcolor: "primary.light",
         color: "primary.main",
         display: "flex",
         alignItems: "center",
         justifyContent: "center",
         border: 1,
         borderColor: "primary.main",
         opacity: .8
        },
        children: A
       }), v.jsx(_t, {
        variant: "subtitle1",
        fontWeight: "medium",
        noWrap: !0,
        sx: {
         fontSize: {
          xs: "0.875rem",
          sm: "1rem"
         }
        },
        children: r.name
       })]
      }), v.jsx(_t, {
       variant: "body2",
       color: "text.secondary",
       sx: {
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        flexGrow: 1,
        fontSize: {
         xs: "0.75rem",
         sm: "0.875rem"
        }
       },
       children: r.description || "暂无描述"
      }), v.jsx(hr, {
       size: "small",
       sx: {
        position: "absolute",
        top: 8,
        right: 8,
        bgcolor: "action.hover",
        opacity: 0,
        transition: "opacity 0.2s",
        "&:hover": {
         bgcolor: "action.selected"
        },
        ".MuiCardActionArea-root:hover &": {
         opacity: 1
        }
       },
       onClick: O,
       "aria-label": "网站设置",
       children: v.jsx(Hx, {
        fontSize: "small"
       })
      })]
     })
    })
   })
  });
  return s ? v.jsxs(v.Fragment, {
   children: [v.jsx("div", {
    ref: C,
    style: E,
    ...R,
    ...T,
    children: S
   }), f && v.jsx(Cb, {
    site: r,
    onUpdate: a,
    onDelete: i,
    onClose: L,
    iconApi: d
   })]
  }) : v.jsxs(v.Fragment, {
   children: [S, f && v.jsx(Cb, {
    site: r,
    onUpdate: a,
    onDelete: i,
    onClose: L,
    iconApi: d
   })]
  })
 }),
 wk = ({
  open: e,
  group: r,
  onClose: a,
  onSave: i,
  onDelete: s
 }) => {
  const [c, d] = y.useState(""), [f, h] = y.useState(!1);
  It.useEffect(() => {
   r && d(r.name), h(!1)
  }, [r, e]);
  const m = () => {
    !r || !c.trim() || i({
     ...r,
     name: c.trim()
    })
   },
   g = () => {
    r && (f ? s(r.id) : h(!0))
   };
  return r ? v.jsxs(gi, {
   open: e,
   onClose: a,
   maxWidth: "sm",
   fullWidth: !0,
   children: [v.jsx(bi, {
    children: "编辑分组"
   }), v.jsxs(yi, {
    children: [v.jsx(Ze, {
     sx: {
      mb: 2,
      mt: 1
     },
     children: v.jsx(dn, {
      label: "分组名称",
      fullWidth: !0,
      value: c,
      onChange: b => d(b.target.value),
      variant: "outlined",
      autoFocus: !0
     })
    }), f && v.jsx(Ri, {
     severity: "warning",
     sx: {
      mt: 2
     },
     children: v.jsxs(_t, {
      variant: "body2",
      children: ['确定要删除分组 "', r.name, '" 吗？', v.jsx("strong", {
       children: "删除此分组将同时删除该分组下的所有网站。"
      }), "此操作无法撤销。"]
     })
    })]
   }), v.jsx(vi, {
    children: f ? v.jsxs(v.Fragment, {
     children: [v.jsx(Ut, {
      onClick: () => h(!1),
      color: "inherit",
      children: "取消"
     }), v.jsx(Ut, {
      onClick: g,
      color: "error",
      variant: "contained",
      children: "确认删除"
     })]
    }) : v.jsxs(v.Fragment, {
     children: [v.jsx(Ut, {
      onClick: a,
      color: "inherit",
      children: "取消"
     }), v.jsx(Ut, {
      onClick: g,
      color: "error",
      variant: "outlined",
      children: "删除"
     }), v.jsx(Ut, {
      onClick: m,
      color: "primary",
      variant: "contained",
      disabled: !c.trim(),
      children: "保存"
     })]
    })
   })]
  }) : null
 },
 Vx = Tt(v.jsx("path", {
  d: "M3 18h6v-2H3zM3 6v2h18V6zm0 7h12v-2H3z"
 })),
 Gx = Tt(v.jsx("path", {
  d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"
 })),
 Rk = Tt(v.jsx("path", {
  d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75z"
 })),
 Ek = Tt(v.jsx("path", {
  d: "M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"
 })),
 Tk = ({
  group: e,
  sortMode: r,
  currentSortingGroupId: a,
  onUpdate: i,
  onDelete: s,
  onSaveSiteOrder: c,
  onStartSiteSort: d,
  onAddSite: f,
  onUpdateGroup: h,
  onDeleteGroup: m,
  configs: g
 }) => {
  const [b, w] = y.useState(e.sites), [R, T] = y.useState(!1), [C, D] = y.useState(!1), [k, N] = y.useState(""), [E, A] = y.useState(() => {
   const z = localStorage.getItem(`group-${e.id}-collapsed`);
   return z ? JSON.parse(z) : !1
  });
  y.useEffect(() => {
   e.id && localStorage.setItem(`group-${e.id}-collapsed`, JSON.stringify(E))
  }, [E, e.id]);
  const O = () => {
    A(!E)
   },
   L = gx(Ti(ed, {
    activationConstraint: {
     distance: 5
    }
   }), Ti(om, {
    activationConstraint: {
     delay: 250,
     tolerance: 5
    }
   }), Ti(Ju, {
    coordinateGetter: Ix
   })),
   U = z => {
    const {
     active: I,
     over: Q
    } = z;
    if (Q && I.id !== Q.id) {
     const Z = b.findIndex(q => `site-${q.id}` === I.id),
      j = b.findIndex(q => `site-${q.id}` === Q.id);
     if (Z !== -1 && j !== -1) {
      const q = rd(b, Z, j);
      w(q)
     }
    }
   },
   _ = () => {
    T(!0)
   },
   G = z => {
    h && (h(z), T(!1))
   },
   S = z => {
    m && (m(z), T(!1))
   },
   $ = r === "SiteSort" && a === e.id,
   H = () => {
    const z = $ ? b : e.sites;
    return !$ && r === "SiteSort" ? null : $ ? v.jsx(jx, {
     sensors: L,
     collisionDetection: xx,
     onDragEnd: U,
     children: v.jsx($x, {
      items: z.map(I => `site-${I.id}`),
      strategy: uk,
      children: v.jsx(Ze, {
       sx: {
        width: "100%"
       },
       children: v.jsx(Ze, {
        sx: {
         display: "flex",
         flexWrap: "wrap",
         margin: -1
        },
        children: z.map((I, Q) => v.jsx(Ze, {
         sx: {
          width: {
           xs: "50%",
           sm: "50%",
           md: "25%",
           lg: "25%",
           xl: "25%"
          },
          padding: 1,
          boxSizing: "border-box"
         },
         children: v.jsx(Bb, {
          site: I,
          onUpdate: i,
          onDelete: s,
          isEditMode: !0,
          index: Q,
          iconApi: g == null ? void 0 : g["site.iconApi"]
         })
        }, I.id || Q))
       })
      })
     })
    }) : v.jsx(Ze, {
     sx: {
      display: "flex",
      flexWrap: "wrap",
      margin: -1
     },
     children: z.map(I => v.jsx(Ze, {
      sx: {
       width: {
        xs: "100%",
        sm: "50%",
        md: "33.33%",
        lg: "25%",
        xl: "20%"
       },
       padding: 1,
       boxSizing: "border-box"
      },
      children: v.jsx(Bb, {
       site: I,
       onUpdate: i,
       onDelete: s,
       isEditMode: !1,
       iconApi: g == null ? void 0 : g["site.iconApi"]
      })
     }, I.id))
    })
   },
   V = () => {
    c(e.id, b)
   },
   X = () => {
    if (e.sites.length < 2) {
     N("至少需要2个站点才能进行排序"), D(!0);
     return
    }
    E && A(!1), d(e.id)
   },
   W = () => {
    D(!1)
   };
  return v.jsxs(Gr, {
   elevation: r === "None" ? 2 : 3,
   sx: {
    borderRadius: 4,
    p: {
     xs: 2,
     sm: 3
    },
    transition: "all 0.3s ease-in-out",
    border: "1px solid transparent",
    "&:hover": {
     boxShadow: r === "None" ? 6 : 3,
     borderColor: "divider",
     transform: r === "None" ? "scale(1.01)" : "none"
    },
    backgroundColor: z => z.palette.mode === "dark" ? "rgba(33, 33, 33, 0.95)" : "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(5px)"
   },
   children: [v.jsxs(Ze, {
    display: "flex",
    flexDirection: {
     xs: "column",
     sm: "row"
    },
    justifyContent: "space-between",
    alignItems: {
     xs: "flex-start",
     sm: "center"
    },
    mb: 2.5,
    gap: 1,
    children: [v.jsxs(Ze, {
     sx: {
      display: "flex",
      alignItems: "center",
      gap: 1,
      cursor: "pointer",
      "&:hover": {
       "& .collapse-icon": {
        color: "primary.main"
       }
      }
     },
     onClick: O,
     children: [v.jsx(hr, {
      size: "small",
      className: "collapse-icon",
      sx: {
       transform: E ? "rotate(0deg)" : "rotate(180deg)",
       transition: "transform 0.3s ease-in-out"
      },
      children: v.jsx(Ek, {})
     }), v.jsxs(_t, {
      variant: "h5",
      component: "h2",
      fontWeight: "600",
      color: "text.primary",
      sx: {
       mb: {
        xs: 1,
        sm: 0
       }
      },
      children: [e.name, v.jsxs(_t, {
       component: "span",
       variant: "body2",
       color: "text.secondary",
       sx: {
        ml: 1
       },
       children: ["(", e.sites.length, ")"]
      })]
     })]
    }), v.jsx(Ze, {
     sx: {
      display: "flex",
      flexDirection: {
       xs: "row",
       sm: "row"
      },
      gap: 1,
      width: {
       xs: "100%",
       sm: "auto"
      },
      flexWrap: "wrap",
      justifyContent: {
       xs: "flex-start",
       sm: "flex-end"
      }
     },
     children: $ ? v.jsx(Ut, {
      variant: "contained",
      color: "primary",
      size: "small",
      startIcon: v.jsx(Qh, {}),
      onClick: V,
      sx: {
       minWidth: "auto",
       fontSize: {
        xs: "0.75rem",
        sm: "0.875rem"
       }
      },
      children: "保存顺序"
     }) : r === "None" && v.jsxs(v.Fragment, {
      children: [f && v.jsx(Ut, {
       variant: "contained",
       color: "primary",
       size: "small",
       onClick: () => f(e.id),
       startIcon: v.jsx(Gx, {}),
       sx: {
        minWidth: "auto",
        fontSize: {
         xs: "0.75rem",
         sm: "0.875rem"
        }
       },
       children: "添加卡片"
      }), v.jsx(Ut, {
       variant: "outlined",
       color: "primary",
       size: "small",
       startIcon: v.jsx(Vx, {}),
       onClick: X,
       sx: {
        minWidth: "auto",
        fontSize: {
         xs: "0.75rem",
         sm: "0.875rem"
        }
       },
       children: "排序"
      }), h && m && v.jsx(ux, {
       title: "编辑分组",
       children: v.jsx(hr, {
        color: "primary",
        onClick: _,
        size: "small",
        sx: {
         alignSelf: "center"
        },
        children: v.jsx(Rk, {})
       })
      })]
     })
    })]
   }), v.jsx(Jp, {
    in: !E,
    timeout: "auto",
    children: H()
   }), h && m && v.jsx(wk, {
    open: R,
    group: e,
    onClose: () => T(!1),
    onSave: G,
    onDelete: S
   }), v.jsx(uh, {
    open: C,
    autoHideDuration: 6e3,
    onClose: W,
    children: v.jsx(Ri, {
     onClose: W,
     severity: "info",
     sx: {
      width: "100%"
     },
     children: k
    })
   })]
  })
 },
 Ak = Tt(v.jsx("path", {
  d: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2M9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9zm9 14H6V10h12zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2"
 })),
 Mk = ({
  onLogin: e,
  loading: r = !1,
  error: a = null
 }) => {
  const [i, s] = y.useState(""), [c, d] = y.useState(""), [f, h] = y.useState(!1), m = g => {
   g.preventDefault(), e(i, c, f)
  };
  return v.jsx(Ze, {
   sx: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "100%",
    p: {
     xs: 2,
     sm: 4
    }
   },
   children: v.jsxs(Gr, {
    elevation: 3,
    sx: {
     p: {
      xs: 3,
      sm: 4
     },
     borderRadius: 2,
     width: "100%",
     maxWidth: {
      xs: "90%",
      sm: 400
     },
     backgroundColor: g => g.palette.mode === "dark" ? "rgba(33, 33, 33, 0.9)" : "rgba(255, 255, 255, 0.9)",
     backdropFilter: "blur(10px)",
     boxShadow: g => g.palette.mode === "dark" ? "0 8px 32px rgba(0, 0, 0, 0.3)" : "0 8px 32px rgba(0, 0, 0, 0.1)"
    },
    children: [v.jsxs(Ze, {
     sx: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      mb: 3
     },
     children: [v.jsx(Ze, {
      sx: {
       mb: 2,
       width: 56,
       height: 56,
       borderRadius: "50%",
       display: "flex",
       justifyContent: "center",
       alignItems: "center",
       backgroundColor: "primary.main",
       color: "white"
      },
      children: v.jsx(Ak, {
       fontSize: "large"
      })
     }), v.jsx(_t, {
      component: "h1",
      variant: "h5",
      fontWeight: "bold",
      textAlign: "center",
      children: "导航站登录"
     })]
    }), a && v.jsx(Ri, {
     severity: "error",
     sx: {
      mb: 3
     },
     children: a
    }), v.jsxs(Ze, {
     component: "form",
     onSubmit: m,
     children: [v.jsx(dn, {
      margin: "normal",
      required: !0,
      fullWidth: !0,
      id: "username",
      label: "用户名",
      name: "username",
      autoComplete: "username",
      autoFocus: !0,
      value: i,
      onChange: g => s(g.target.value),
      disabled: r,
      sx: {
       mb: 2
      }
     }), v.jsx(dn, {
      margin: "normal",
      required: !0,
      fullWidth: !0,
      name: "password",
      label: "密码",
      type: "password",
      id: "password",
      autoComplete: "current-password",
      value: c,
      onChange: g => d(g.target.value),
      disabled: r,
      sx: {
       mb: 2
      }
     }), v.jsx(MO, {
      control: v.jsx(C5, {
       value: "remember",
       color: "primary",
       checked: f,
       onChange: g => h(g.target.checked),
       disabled: r
      }),
      label: "记住我（一个月内免登录）",
      sx: {
       mb: 2
      }
     }), v.jsx(Ut, {
      type: "submit",
      fullWidth: !0,
      variant: "contained",
      color: "primary",
      disabled: r || !i || !c,
      size: "large",
      sx: {
       py: 1.5,
       mt: 2,
       mb: 2,
       borderRadius: 2
      },
      children: r ? v.jsx(wi, {
       size: 24,
       color: "inherit"
      }) : "登录"
     })]
    })]
   })
  })
 };

function Ok({
 id: e,
 group: r
}) {
 const {
  attributes: a,
  listeners: i,
  setNodeRef: s,
  transform: c,
  transition: d,
  isDragging: f
 } = Ux({
  id: e
 }), h = {
  transform: Li.Transform.toString(c),
  transition: f ? "none" : d,
  zIndex: f ? 9999 : 1,
  opacity: f ? .8 : 1
 };
 return v.jsx(Gr, {
  ref: s,
  style: h,
  sx: {
   p: 3,
   borderRadius: 4,
   transition: f ? "none !important" : "all 0.3s ease-in-out",
   border: "1px solid transparent",
   boxShadow: f ? 8 : 2,
   cursor: "grab",
   "&:active": {
    cursor: "grabbing"
   },
   "&:hover": {
    borderColor: "divider",
    boxShadow: 6
   },
   ...f && {
    outline: "2px solid",
    outlineColor: "primary.main",
    transform: "none",
    "& *": {
     transition: "none !important"
    }
   }
  },
  ...a,
  ...i,
  children: v.jsxs(Ze, {
   sx: {
    display: "flex",
    alignItems: "center",
    userSelect: "none",
    transition: f ? "none" : "inherit"
   },
   children: [v.jsx(qx, {
    sx: {
     mr: 2,
     color: "primary.main",
     opacity: .7
    }
   }), v.jsx(_t, {
    variant: "h5",
    component: "h2",
    fontWeight: "600",
    color: "text.primary",
    children: r.name
   })]
  })
 })
}
const Dk = Tt(v.jsx("path", {
  d: "M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27"
 })),
 Ip = Tt(v.jsx("path", {
  d: "M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"
 })),
 kk = Tt(v.jsx("path", {
  d: "M19 9h-4V3H9v6H5l7 7zM5 18v2h14v-2z"
 })),
 zk = Tt(v.jsx("path", {
  d: "m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"
 })),
 jk = Tt(v.jsx("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
 })),
 vn = new fC("/api");

function Nk(e) {
 if (!e) return null;
 try {
  let r = e;
  return /^https?:\/\//i.test(e) || (r = "http://" + e), new URL(r).hostname
 } catch {
  const r = e.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?]+)/im);
  return r && r[1] ? r[1] : e
 }
}
const su = {
 "site.title": "导航站",
 "site.name": "导航站",
 "site.customCss": "",
 "site.backgroundImage": "",
 "site.backgroundOpacity": "0.15",
 "site.iconApi": "https://www.faviconextractor.com/favicon/{domain}?larger=true"
};

function Lk() {
 const [e, r] = y.useState(() => {
  const oe = localStorage.getItem("theme");
  return oe ? oe === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches
 }), a = y.useMemo(() => qu({
  palette: {
   mode: e ? "dark" : "light"
  }
 }), [e]), i = () => {
  r(!e), localStorage.setItem("theme", e ? "light" : "dark")
 }, [s, c] = y.useState([]), [d, f] = y.useState(!0), [h, m] = y.useState(null), [g, b] = y.useState(0), [w, R] = y.useState(null), [T, C] = y.useState(!0), [D, k] = y.useState(!1), [N, E] = y.useState(!1), [A, O] = y.useState(null), [L, U] = y.useState(!1), [_, G] = y.useState(su), [S, $] = y.useState(!1), [H, V] = y.useState(su), X = gx(Ti(ed, {
  activationConstraint: {
   distance: 1,
   delay: 0
  }
 }), Ti(om, {
  activationConstraint: {
   delay: 100,
   tolerance: 3
  }
 }), Ti(Ju, {
  coordinateGetter: Ix
 })), [W, z] = y.useState(!1), [I, Q] = y.useState(!1), [Z, j] = y.useState({
  name: "",
  order_num: 0
 }), [q, ee] = y.useState({
  name: "",
  url: "",
  icon: "",
  description: "",
  notes: "",
  order_num: 0,
  group_id: 0
 }), [ne, ce] = y.useState(null), le = !!ne, [re, ye] = y.useState(!1), [ge, Te] = y.useState(null), [fe, Oe] = y.useState(null), [we, Se] = y.useState(!1), [Re, ze] = y.useState(!1), [it, Ne] = y.useState(""), [Je, Ke] = y.useState(!1), [Pe, He] = y.useState(""), Ee = oe => {
  ce(oe.currentTarget)
 }, mt = () => {
  ce(null)
 }, ot = async () => {
  try {
   C(!0), console.log("开始检查认证状态...");
   const oe = await vn.checkAuthStatus();
   console.log("认证检查结果:", oe), oe ? (E(!0), k(!1), console.log("已认证，开始加载数据"), await he(), await ve()) : (console.log("未认证，设置需要登录状态"), vn.isLoggedIn() && (console.log("清除无效token"), vn.logout()), E(!1), k(!0))
  } catch (oe) {
   console.error("认证检查失败:", oe), oe instanceof Error && oe.message.includes("认证") && (console.log("检测到认证错误，设置需要登录状态"), E(!1), k(!0))
  } finally {
   console.log("认证检查完成"), C(!1)
  }
 }, de = async (oe, $e, dt = !1) => {
  try {
   U(!0), O(null), await vn.login(oe, $e, dt) ? (E(!0), k(!1), await he(), await ve()) : (be("用户名或密码错误"), E(!1))
  } catch (st) {
   console.error("登录失败:", st), be("登录失败: " + (st instanceof Error ? st.message : "未知错误")), E(!1)
  } finally {
   U(!1)
  }
 }, me = () => {
  vn.logout(), E(!1), k(!0), c([]), mt(), m("已退出登录，请重新登录")
 }, ve = async () => {
  try {
   const oe = await vn.getConfigs();
   G({
    ...su,
    ...oe
   }), V({
    ...su,
    ...oe
   })
  } catch (oe) {
   console.error("加载配置失败:", oe)
  }
 };
 y.useEffect(() => {
  ot(), b(0), R(null)
 }, []), y.useEffect(() => {
  document.title = _["site.title"] || "导航站"
 }, [_]), y.useEffect(() => {
  const oe = _["site.customCss"];
  let $e = document.getElementById("custom-style");
  $e || ($e = document.createElement("style"), $e.id = "custom-style", document.head.appendChild($e));
  const dt = De(oe || "");
  $e.textContent = dt
 }, [_]);
 const De = oe => oe ? oe.replace(/url\s*\(\s*(['"]?)javascript:/gi, "url($1invalid:").replace(/expression\s*\(/gi, "invalid(").replace(/@import/gi, "/* @import */").replace(/behavior\s*:/gi, "/* behavior: */").replace(/content\s*:\s*(['"]?).*?url\s*\(\s*(['"]?)javascript:/gi, "content: $1") : "";
 y.useEffect(() => {
  e ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark")
 }, [e]);
 const be = oe => {
   Ne(oe), ze(!0), console.error(oe)
  },
  xe = () => {
   ze(!1)
  },
  he = async () => {
   try {
    f(!0), m(null);
    const oe = await vn.getGroups(),
     $e = await Promise.all(oe.filter(dt => dt.id !== void 0).map(async dt => {
      const st = await vn.getSites(dt.id);
      return {
       ...dt,
       id: dt.id,
       sites: st
      }
     }));
    c($e)
   } catch (oe) {
    console.error("加载数据失败:", oe), be("加载数据失败: " + (oe instanceof Error ? oe.message : "未知错误")), oe instanceof Error && oe.message.includes("认证") && (k(!0), E(!1))
   } finally {
    f(!1)
   }
  }, Qe = async oe => {
   try {
    oe.id && (await vn.updateSite(oe.id, oe), await he())
   } catch ($e) {
    console.error("更新站点失败:", $e), be("更新站点失败: " + $e.message)
   }
  }, Be = async oe => {
   try {
    await vn.deleteSite(oe), await he()
   } catch ($e) {
    console.error("删除站点失败:", $e), be("删除站点失败: " + $e.message)
   }
  }, Xe = async () => {
   try {
    console.log("保存分组顺序", s);
    const oe = s.map((dt, st) => ({
     id: dt.id,
     order_num: st
    }));
    if (await vn.updateGroupOrder(oe)) console.log("分组排序更新成功"), await he();
    else throw new Error("分组排序更新失败");
    b(0), R(null)
   } catch (oe) {
    console.error("更新分组排序失败:", oe), be("更新分组排序失败: " + oe.message)
   }
  }, Me = async (oe, $e) => {
   try {
    console.log("保存站点排序", oe, $e);
    const dt = $e.map((wt, Zt) => ({
     id: wt.id,
     order_num: Zt
    }));
    if (await vn.updateSiteOrder(dt)) console.log("站点排序更新成功"), await he();
    else throw new Error("站点排序更新失败");
    b(0), R(null)
   } catch (dt) {
    console.error("更新站点排序失败:", dt), be("更新站点排序失败: " + dt.message)
   }
  }, tt = () => {
   console.log("开始分组排序"), b(1), R(null)
  }, gt = oe => {
   console.log("开始站点排序"), b(2), R(oe)
  }, rn = () => {
   b(0), R(null)
  }, On = oe => {
   const {
    active: $e,
    over: dt
   } = oe;
   if (dt && $e.id !== dt.id) {
    const st = s.findIndex(Zt => Zt.id.toString() === $e.id),
     wt = s.findIndex(Zt => Zt.id.toString() === dt.id);
    st !== -1 && wt !== -1 && c(rd(s, st, wt))
   }
  }, Jn = () => {
   j({
    name: "",
    order_num: s.length
   }), z(!0)
  }, jn = () => {
   z(!1)
  }, Fe = oe => {
   j({
    ...Z,
    [oe.target.name]: oe.target.value
   })
  }, lt = async () => {
   try {
    if (!Z.name) {
     be("分组名称不能为空");
     return
    }
    await vn.createGroup(Z), await he(), jn(), j({
     name: "",
     order_num: 0
    })
   } catch (oe) {
    console.error("创建分组失败:", oe), be("创建分组失败: " + oe.message)
   }
  }, Pt = oe => {
   const $e = s.find(st => st.id === oe),
    dt = $e != null && $e.sites.length ? Math.max(...$e.sites.map(st => st.order_num)) + 1 : 0;
   ee({
    name: "",
    url: "",
    icon: "",
    description: "",
    notes: "",
    group_id: oe,
    order_num: dt
   }), Q(!0)
  }, Vt = () => {
   Q(!1)
  }, pt = oe => {
   ee({
    ...q,
    [oe.target.name]: oe.target.value
   })
  }, je = async () => {
   try {
    if (!q.name || !q.url) {
     be("站点名称和URL不能为空");
     return
    }
    await vn.createSite(q), await he(), Vt()
   } catch (oe) {
    console.error("创建站点失败:", oe), be("创建站点失败: " + oe.message)
   }
  }, kt = () => {
   V({
    ..._
   }), $(!0)
  }, En = () => {
   $(!1)
  }, vt = oe => {
   V({
    ...H,
    [oe.target.name]: oe.target.value
   })
  }, zt = async () => {
   try {
    for (const [oe, $e] of Object.entries(H)) _[oe] !== $e && await vn.setConfig(oe, $e);
    G({
     ...H
    }), En()
   } catch (oe) {
    console.error("保存配置失败:", oe), be("保存配置失败: " + oe.message)
   }
  }, jt = async () => {
   try {
    f(!0);
    const oe = [];
    s.forEach(tr => {
     tr.sites && tr.sites.length > 0 && oe.push(...tr.sites)
    });
    const $e = {
      groups: s.map(tr => ({
       id: tr.id,
       name: tr.name,
       order_num: tr.order_num
      })),
      sites: oe,
      configs: _,
      version: "1.0",
      exportDate: new Date().toISOString()
     },
     dt = JSON.stringify($e, null, 2),
     st = "data:application/json;charset=utf-8," + encodeURIComponent(dt),
     wt = `导航站备份_${new Date().toISOString().slice(0,10)}.json`,
     Zt = document.createElement("a");
    Zt.setAttribute("href", st), Zt.setAttribute("download", wt), Zt.click()
   } catch (oe) {
    console.error("导出数据失败:", oe), be("导出数据失败: " + (oe instanceof Error ? oe.message : "未知错误"))
   } finally {
    f(!1)
   }
  }, pn = () => {
   Te(null), Oe(null), ye(!0), mt()
  }, Nn = () => {
   ye(!1)
  }, Yr = oe => {
   oe.target.files && oe.target.files.length > 0 && (Te(oe.target.files[0]), Oe(null))
  }, er = async () => {
   if (!ge) {
    be("请选择要导入的文件");
    return
   }
   try {
    Se(!0), Oe(null);
    const oe = new FileReader;
    oe.readAsText(ge, "UTF-8"), oe.onload = async $e => {
     var dt;
     try {
      if (!((dt = $e.target) != null && dt.result)) throw new Error("读取文件失败");
      const st = JSON.parse($e.target.result);
      if (!st.groups || !Array.isArray(st.groups)) throw new Error("导入文件格式错误：缺少分组数据");
      if (!st.sites || !Array.isArray(st.sites)) throw new Error("导入文件格式错误：缺少站点数据");
      if (!st.configs || typeof st.configs != "object") throw new Error("导入文件格式错误：缺少配置数据");
      const wt = await vn.importData(st);
      if (!wt.success) throw new Error(wt.error || "导入失败");
      const Zt = wt.stats;
      if (Zt) {
       const tr = ["导入成功！", `分组：发现${Zt.groups.total}个，新建${Zt.groups.created}个，合并${Zt.groups.merged}个`, `卡片：发现${Zt.sites.total}个，新建${Zt.sites.created}个，更新${Zt.sites.updated}个，跳过${Zt.sites.skipped}个`].join(`
`);
       He(tr), Ke(!0)
      }
      await he(), await ve(), Nn()
     } catch (st) {
      console.error("解析导入数据失败:", st), be("解析导入数据失败: " + (st instanceof Error ? st.message : "未知错误"))
     } finally {
      Se(!1)
     }
    }, oe.onerror = () => {
     be("读取文件失败"), Se(!1)
    }
   } catch (oe) {
    console.error("导入数据失败:", oe), be("导入数据失败: " + (oe instanceof Error ? oe.message : "未知错误"))
   } finally {
    Se(!1)
   }
  }, Mr = () => v.jsx(Ze, {
   sx: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: "background.default"
   },
   children: v.jsx(Mk, {
    onLogin: de,
    loading: L,
    error: A
   })
  });
 if (T) return v.jsxs(Mp, {
  theme: a,
  children: [v.jsx(kp, {}), v.jsx(Ze, {
   sx: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: "background.default"
   },
   children: v.jsx(wi, {
    size: 60,
    thickness: 4
   })
  })]
 });
 if (D && !N) return v.jsxs(Mp, {
  theme: a,
  children: [v.jsx(kp, {}), Mr()]
 });
 const Sr = async oe => {
  try {
   oe.id && (await vn.updateGroup(oe.id, oe), await he())
  } catch ($e) {
   console.error("更新分组失败:", $e), be("更新分组失败: " + $e.message)
  }
 }, Pi = async oe => {
  try {
   await vn.deleteGroup(oe), await he()
  } catch ($e) {
   console.error("删除分组失败:", $e), be("删除分组失败: " + $e.message)
  }
 };
 return v.jsxs(Mp, {
  theme: a,
  children: [v.jsx(kp, {}), v.jsx(uh, {
   open: Re,
   autoHideDuration: 6e3,
   onClose: xe,
   anchorOrigin: {
    vertical: "top",
    horizontal: "center"
   },
   children: v.jsx(Ri, {
    onClose: xe,
    severity: "error",
    variant: "filled",
    sx: {
     width: "100%"
    },
    children: it
   })
  }), v.jsx(uh, {
   open: Je,
   autoHideDuration: 6e3,
   onClose: () => Ke(!1),
   anchorOrigin: {
    vertical: "top",
    horizontal: "center"
   },
   children: v.jsx(Ri, {
    onClose: () => Ke(!1),
    severity: "success",
    variant: "filled",
    sx: {
     width: "100%",
     whiteSpace: "pre-line",
     backgroundColor: oe => oe.palette.mode === "dark" ? "#2e7d32" : void 0,
     color: oe => oe.palette.mode === "dark" ? "#fff" : void 0,
     "& .MuiAlert-icon": {
      color: oe => oe.palette.mode === "dark" ? "#fff" : void 0
     }
    },
    children: Pe
   })
  }), v.jsxs(Ze, {
   sx: {
    minHeight: "100vh",
    bgcolor: "background.default",
    color: "text.primary",
    transition: "all 0.3s ease-in-out",
    position: "relative",
    overflow: "hidden"
   },
   children: [_["site.backgroundImage"] && v.jsx(v.Fragment, {
    children: v.jsx(Ze, {
     sx: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url(${_["site.backgroundImage"]})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      zIndex: 0,
      "&::before": {
       content: '""',
       position: "absolute",
       top: 0,
       left: 0,
       right: 0,
       bottom: 0,
       backgroundColor: oe => oe.palette.mode === "dark" ? "rgba(0, 0, 0, " + (1 - Number(_["site.backgroundOpacity"])) + ")" : "rgba(255, 255, 255, " + (1 - Number(_["site.backgroundOpacity"])) + ")",
       zIndex: 1
      }
     }
    })
   }), v.jsxs(E5, {
    maxWidth: "lg",
    sx: {
     py: 4,
     px: {
      xs: 2,
      sm: 3,
      md: 4
     },
     position: "relative",
     zIndex: 2
    },
    children: [v.jsxs(Ze, {
     sx: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      mb: 5,
      flexDirection: {
       xs: "column",
       sm: "row"
      },
      gap: {
       xs: 2,
       sm: 0
      }
     },
     children: [v.jsx(_t, {
      variant: "h3",
      component: "h1",
      fontWeight: "bold",
      color: "text.primary",
      sx: {
       fontSize: {
        xs: "1.75rem",
        sm: "2.125rem",
        md: "3rem"
       },
       textAlign: {
        xs: "center",
        sm: "left"
       }
      },
      children: _["site.name"]
     }), v.jsxs(mi, {
      direction: {
       xs: "row",
       sm: "row"
      },
      spacing: {
       xs: 1,
       sm: 2
      },
      alignItems: "center",
      width: {
       xs: "100%",
       sm: "auto"
      },
      justifyContent: {
       xs: "center",
       sm: "flex-end"
      },
      flexWrap: "wrap",
      sx: {
       gap: {
        xs: 1,
        sm: 2
       },
       py: {
        xs: 1,
        sm: 0
       }
      },
      children: [g !== 0 ? v.jsxs(v.Fragment, {
       children: [g === 1 && v.jsx(Ut, {
        variant: "contained",
        color: "primary",
        startIcon: v.jsx(Qh, {}),
        onClick: Xe,
        size: "small",
        sx: {
         minWidth: "auto",
         fontSize: {
          xs: "0.75rem",
          sm: "0.875rem"
         }
        },
        children: "保存分组顺序"
       }), v.jsx(Ut, {
        variant: "outlined",
        color: "inherit",
        startIcon: v.jsx(dx, {}),
        onClick: rn,
        size: "small",
        sx: {
         minWidth: "auto",
         fontSize: {
          xs: "0.75rem",
          sm: "0.875rem"
         }
        },
        children: "取消编辑"
       })]
      }) : v.jsxs(v.Fragment, {
       children: [v.jsx(Ut, {
        variant: "contained",
        color: "primary",
        startIcon: v.jsx(Gx, {}),
        onClick: Jn,
        size: "small",
        sx: {
         minWidth: "auto",
         fontSize: {
          xs: "0.75rem",
          sm: "0.875rem"
         }
        },
        children: "新增分组"
       }), v.jsx(Ut, {
        variant: "outlined",
        color: "primary",
        startIcon: v.jsx(jk, {}),
        onClick: Ee,
        "aria-controls": le ? "navigation-menu" : void 0,
        "aria-haspopup": "true",
        "aria-expanded": le ? "true" : void 0,
        size: "small",
        sx: {
         minWidth: "auto",
         fontSize: {
          xs: "0.75rem",
          sm: "0.875rem"
         }
        },
        children: "更多选项"
       }), v.jsxs(ax, {
        id: "navigation-menu",
        anchorEl: ne,
        open: le,
        onClose: mt,
        MenuListProps: {
         "aria-labelledby": "navigation-button"
        },
        children: [v.jsxs(hi, {
         onClick: tt,
         children: [v.jsx(Il, {
          children: v.jsx(Vx, {
           fontSize: "small"
          })
         }), v.jsx(Pl, {
          children: "编辑排序"
         })]
        }), v.jsxs(hi, {
         onClick: kt,
         children: [v.jsx(Il, {
          children: v.jsx(Hx, {
           fontSize: "small"
          })
         }), v.jsx(Pl, {
          children: "网站设置"
         })]
        }), v.jsx(hs, {}), v.jsxs(hi, {
         onClick: jt,
         children: [v.jsx(Il, {
          children: v.jsx(kk, {
           fontSize: "small"
          })
         }), v.jsx(Pl, {
          children: "导出数据"
         })]
        }), v.jsxs(hi, {
         onClick: pn,
         children: [v.jsx(Il, {
          children: v.jsx(Ip, {
           fontSize: "small"
          })
         }), v.jsx(Pl, {
          children: "导入数据"
         })]
        }), N && v.jsxs(v.Fragment, {
         children: [v.jsx(hs, {}), v.jsxs(hi, {
          onClick: me,
          sx: {
           color: "error.main"
          },
          children: [v.jsx(Il, {
           sx: {
            color: "error.main"
           },
           children: v.jsx(zk, {
            fontSize: "small"
           })
          }), v.jsx(Pl, {
           children: "退出登录"
          })]
         })]
        })]
       })]
      }), v.jsx(_4, {
       darkMode: e,
       onToggle: i
      })]
     })]
    }), d && v.jsx(Ze, {
     sx: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "200px"
     },
     children: v.jsx(wi, {
      size: 60,
      thickness: 4
     })
    }), !d && !h && v.jsx(Ze, {
     sx: {
      "& > *": {
       mb: 5
      },
      minHeight: "100px"
     },
     children: g === 1 ? v.jsx(jx, {
      sensors: X,
      collisionDetection: xx,
      onDragEnd: On,
      children: v.jsx($x, {
       items: s.map(oe => oe.id.toString()),
       strategy: fk,
       children: v.jsx(mi, {
        spacing: 2,
        sx: {
         "& > *": {
          transition: "none"
         }
        },
        children: s.map(oe => v.jsx(Ok, {
         id: oe.id.toString(),
         group: oe
        }, oe.id))
       })
      })
     }) : v.jsx(mi, {
      spacing: 5,
      children: s.map(oe => v.jsx(Tk, {
       group: oe,
       sortMode: g === 0 ? "None" : "SiteSort",
       currentSortingGroupId: w,
       onUpdate: Qe,
       onDelete: Be,
       onSaveSiteOrder: Me,
       onStartSiteSort: gt,
       onAddSite: Pt,
       onUpdateGroup: Sr,
       onDeleteGroup: Pi,
       configs: _
      }, `group-${oe.id}`))
     })
    }), v.jsxs(gi, {
     open: W,
     onClose: jn,
     maxWidth: "md",
     fullWidth: !0,
     PaperProps: {
      sx: {
       m: {
        xs: 2,
        sm: 3,
        md: 4
       },
       width: {
        xs: "calc(100% - 32px)",
        sm: "80%",
        md: "70%",
        lg: "60%"
       },
       maxWidth: {
        sm: "600px"
       }
      }
     },
     children: [v.jsxs(bi, {
      children: ["新增分组", v.jsx(hr, {
       "aria-label": "close",
       onClick: jn,
       sx: {
        position: "absolute",
        right: 8,
        top: 8
       },
       children: v.jsx(Kl, {})
      })]
     }), v.jsxs(yi, {
      children: [v.jsx(Qc, {
       sx: {
        mb: 2
       },
       children: "请输入新分组的信息"
      }), v.jsx(dn, {
       autoFocus: !0,
       margin: "dense",
       id: "group-name",
       name: "name",
       label: "分组名称",
       type: "text",
       fullWidth: !0,
       variant: "outlined",
       value: Z.name,
       onChange: Fe,
       sx: {
        mb: 2
       }
      })]
     }), v.jsxs(vi, {
      sx: {
       px: 3,
       pb: 3
      },
      children: [v.jsx(Ut, {
       onClick: jn,
       variant: "outlined",
       children: "取消"
      }), v.jsx(Ut, {
       onClick: lt,
       variant: "contained",
       color: "primary",
       children: "创建"
      })]
     })]
    }), v.jsxs(gi, {
     open: I,
     onClose: Vt,
     maxWidth: "md",
     fullWidth: !0,
     PaperProps: {
      sx: {
       m: {
        xs: 2,
        sm: "auto"
       },
       width: {
        xs: "calc(100% - 32px)",
        sm: "auto"
       }
      }
     },
     children: [v.jsxs(bi, {
      children: ["新增站点", v.jsx(hr, {
       "aria-label": "close",
       onClick: Vt,
       sx: {
        position: "absolute",
        right: 8,
        top: 8
       },
       children: v.jsx(Kl, {})
      })]
     }), v.jsxs(yi, {
      children: [v.jsx(Qc, {
       sx: {
        mb: 2
       },
       children: "请输入新站点的信息"
      }), v.jsxs(mi, {
       spacing: 2,
       children: [v.jsxs(Ze, {
        sx: {
         display: "flex",
         gap: 2,
         flexDirection: {
          xs: "column",
          sm: "row"
         }
        },
        children: [v.jsx(Ze, {
         sx: {
          flex: 1
         },
         children: v.jsx(dn, {
          autoFocus: !0,
          margin: "dense",
          id: "site-name",
          name: "name",
          label: "站点名称",
          type: "text",
          fullWidth: !0,
          variant: "outlined",
          value: q.name,
          onChange: pt
         })
        }), v.jsx(Ze, {
         sx: {
          flex: 1
         },
         children: v.jsx(dn, {
          margin: "dense",
          id: "site-url",
          name: "url",
          label: "站点URL",
          type: "url",
          fullWidth: !0,
          variant: "outlined",
          value: q.url,
          onChange: pt
         })
        })]
       }), v.jsx(dn, {
        margin: "dense",
        id: "site-icon",
        name: "icon",
        label: "图标URL",
        type: "url",
        fullWidth: !0,
        variant: "outlined",
        value: q.icon,
        onChange: pt,
        InputProps: {
         endAdornment: v.jsx(tx, {
          position: "end",
          children: v.jsx(hr, {
           onClick: () => {
            if (!q.url) {
             be("请先输入站点URL");
             return
            }
            const oe = Nk(q.url);
            if (oe) {
             const dt = (_["site.iconApi"] || "https://www.faviconextractor.com/favicon/{domain}?larger=true").replace("{domain}", oe);
             ee({
              ...q,
              icon: dt
             })
            } else be("无法从URL中获取域名")
           },
           edge: "end",
           title: "自动获取图标",
           children: v.jsx(fx, {})
          })
         })
        }
       }), v.jsx(dn, {
        margin: "dense",
        id: "site-description",
        name: "description",
        label: "站点描述",
        type: "text",
        fullWidth: !0,
        variant: "outlined",
        value: q.description,
        onChange: pt
       }), v.jsx(dn, {
        margin: "dense",
        id: "site-notes",
        name: "notes",
        label: "备注",
        type: "text",
        fullWidth: !0,
        multiline: !0,
        rows: 2,
        variant: "outlined",
        value: q.notes,
        onChange: pt
       })]
      })]
     }), v.jsxs(vi, {
      sx: {
       px: 3,
       pb: 3
      },
      children: [v.jsx(Ut, {
       onClick: Vt,
       variant: "outlined",
       children: "取消"
      }), v.jsx(Ut, {
       onClick: je,
       variant: "contained",
       color: "primary",
       children: "创建"
      })]
     })]
    }), v.jsxs(gi, {
     open: S,
     onClose: En,
     maxWidth: "sm",
     fullWidth: !0,
     PaperProps: {
      sx: {
       m: {
        xs: 2,
        sm: 3,
        md: 4
       },
       width: {
        xs: "calc(100% - 32px)",
        sm: "80%",
        md: "70%",
        lg: "60%"
       },
       maxWidth: {
        sm: "600px"
       }
      }
     },
     children: [v.jsxs(bi, {
      children: ["网站设置", v.jsx(hr, {
       "aria-label": "close",
       onClick: En,
       sx: {
        position: "absolute",
        right: 8,
        top: 8
       },
       children: v.jsx(Kl, {})
      })]
     }), v.jsxs(yi, {
      children: [v.jsx(Qc, {
       sx: {
        mb: 2
       },
       children: "配置网站的基本信息和外观"
      }), v.jsxs(mi, {
       spacing: 2,
       children: [v.jsx(dn, {
        margin: "dense",
        id: "site-title",
        name: "site.title",
        label: "网站标题 (浏览器标签)",
        type: "text",
        fullWidth: !0,
        variant: "outlined",
        value: H["site.title"],
        onChange: vt
       }), v.jsx(dn, {
        margin: "dense",
        id: "site-name",
        name: "site.name",
        label: "网站名称 (显示在页面中)",
        type: "text",
        fullWidth: !0,
        variant: "outlined",
        value: H["site.name"],
        onChange: vt
       }), v.jsxs(Ze, {
        sx: {
         mb: 1
        },
        children: [v.jsx(_t, {
         variant: "subtitle1",
         gutterBottom: !0,
         children: "获取图标API设置"
        }), v.jsx(dn, {
         margin: "dense",
         id: "site-icon-api",
         name: "site.iconApi",
         label: "获取图标API URL",
         type: "text",
         fullWidth: !0,
         variant: "outlined",
         value: H["site.iconApi"],
         onChange: vt,
         placeholder: "https://example.com/favicon/{domain}",
         helperText: "输入获取图标API的地址，使用 {domain} 作为域名占位符"
        })]
       }), v.jsxs(Ze, {
        sx: {
         mb: 1
        },
        children: [v.jsx(_t, {
         variant: "subtitle1",
         gutterBottom: !0,
         children: "背景图片设置"
        }), v.jsx(dn, {
         margin: "dense",
         id: "site-background-image",
         name: "site.backgroundImage",
         label: "背景图片URL",
         type: "url",
         fullWidth: !0,
         variant: "outlined",
         value: H["site.backgroundImage"],
         onChange: vt,
         placeholder: "https://example.com/background.jpg",
         helperText: "输入图片URL，留空则不使用背景图片"
        }), v.jsxs(Ze, {
         sx: {
          mt: 2,
          mb: 1
         },
         children: [v.jsxs(_t, {
          variant: "body2",
          color: "text.secondary",
          id: "background-opacity-slider",
          gutterBottom: !0,
          children: ["背景蒙版透明度: ", Number(H["site.backgroundOpacity"]).toFixed(2)]
         }), v.jsx(m4, {
          "aria-labelledby": "background-opacity-slider",
          name: "site.backgroundOpacity",
          min: 0,
          max: 1,
          step: .01,
          valueLabelDisplay: "auto",
          value: Number(H["site.backgroundOpacity"]),
          onChange: (oe, $e) => {
           V({
            ...H,
            "site.backgroundOpacity": String($e)
           })
          }
         }), v.jsx(_t, {
          variant: "caption",
          color: "text.secondary",
          children: "值越大，背景图片越清晰，内容可能越难看清"
         })]
        })]
       }), v.jsx(dn, {
        margin: "dense",
        id: "site-custom-css",
        name: "site.customCss",
        label: "自定义CSS",
        type: "text",
        fullWidth: !0,
        multiline: !0,
        rows: 6,
        variant: "outlined",
        value: H["site.customCss"],
        onChange: vt,
        placeholder: "/* 自定义样式 */\\nbody { }"
       })]
      })]
     }), v.jsxs(vi, {
      sx: {
       px: 3,
       pb: 3
      },
      children: [v.jsx(Ut, {
       onClick: En,
       variant: "outlined",
       children: "取消"
      }), v.jsx(Ut, {
       onClick: zt,
       variant: "contained",
       color: "primary",
       children: "保存设置"
      })]
     })]
    }), v.jsxs(gi, {
     open: re,
     onClose: Nn,
     maxWidth: "sm",
     fullWidth: !0,
     PaperProps: {
      sx: {
       m: {
        xs: 2,
        sm: "auto"
       },
       width: {
        xs: "calc(100% - 32px)",
        sm: "auto"
       }
      }
     },
     children: [v.jsxs(bi, {
      children: ["导入数据", v.jsx(hr, {
       "aria-label": "close",
       onClick: Nn,
       sx: {
        position: "absolute",
        right: 8,
        top: 8
       },
       children: v.jsx(Kl, {})
      })]
     }), v.jsxs(yi, {
      children: [v.jsx(Qc, {
       sx: {
        mb: 2
       },
       children: "请选择要导入的JSON文件，导入将覆盖现有数据。"
      }), v.jsxs(Ze, {
       sx: {
        mb: 2
       },
       children: [v.jsxs(Ut, {
        variant: "outlined",
        component: "label",
        startIcon: v.jsx(Ip, {}),
        sx: {
         mb: 2
        },
        children: ["选择文件", v.jsx("input", {
         type: "file",
         hidden: !0,
         accept: ".json",
         onChange: Yr
        })]
       }), ge && v.jsxs(_t, {
        variant: "body2",
        sx: {
         mt: 1
        },
        children: ["已选择: ", ge.name]
       })]
      }), fe && v.jsx(Ri, {
       severity: "error",
       sx: {
        mb: 2
       },
       children: fe
      })]
     }), v.jsxs(vi, {
      sx: {
       px: 3,
       pb: 3
      },
      children: [v.jsx(Ut, {
       onClick: Nn,
       variant: "outlined",
       children: "取消"
      }), v.jsx(Ut, {
       onClick: er,
       variant: "contained",
       color: "primary",
       disabled: !ge || we,
       startIcon: we ? v.jsx(wi, {
        size: 20
       }) : v.jsx(Ip, {}),
       children: we ? "导入中..." : "导入"
      })]
     })]
    }), v.jsx(Ze, {
     sx: {
      position: "fixed",
      bottom: {
       xs: 8,
       sm: 16
      },
      right: {
       xs: 8,
       sm: 16
      },
      zIndex: 10
     },
     children: v.jsx(Gr, {
      component: "a",
      href: "https://github.com/zqq-nuli/Navihive",
      target: "_blank",
      rel: "noopener noreferrer",
      elevation: 2,
      sx: {
       display: "flex",
       alignItems: "center",
       p: 1,
       borderRadius: 10,
       bgcolor: "background.paper",
       color: "text.secondary",
       transition: "all 0.3s ease-in-out",
       "&:hover": {
        bgcolor: "action.hover",
        color: "text.primary",
        boxShadow: 4
       },
       textDecoration: "none"
      },
      children: v.jsx(Dk, {})
     })
    })]
   })]
  })]
 })
}
dC.createRoot(document.getElementById("root")).render(v.jsx(y.StrictMode, {
 children: v.jsx(Lk, {})
}));