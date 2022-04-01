const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html>`);
const $ = require('jQuery')(window);
document = window.document;
global.navigator={
userAgent: 'node.js',
};
function hex2b64(a) {
    var b, c, d = "";
    for (b = 0; b + 3 <= a.length; b += 3)
    c = parseInt(a.substring(b, b + 3), 16),
    d += b64map.charAt(c >> 6) + b64map.charAt(63 & c);
    for (b + 1 == a.length ? (c = parseInt(a.substring(b, b + 1), 16),
    d += b64map.charAt(c << 2)) : b + 2 == a.length && (c = parseInt(a.substring(b, b + 2), 16),
    d += b64map.charAt(c >> 2) + b64map.charAt((3 & c) << 4));
    (3 & d.length) > 0;)
    d += b64padchar;
    return d
}

function b64tohex(a) {
    var b, c, d = "",
        e = 0;
    for (b = 0; b < a.length && a.charAt(b) != b64padchar; ++b)
    v = b64map.indexOf(a.charAt(b)),
    v < 0 || (0 == e ? (d += int2char(v >> 2),
    c = 3 & v,
    e = 1) : 1 == e ? (d += int2char(c << 2 | v >> 4),
    c = 15 & v,
    e = 2) : 2 == e ? (d += int2char(c),
    d += int2char(v >> 2),
    c = 3 & v,
    e = 3) : (d += int2char(c << 2 | v >> 4),
    d += int2char(15 & v),
    e = 0));
    return 1 == e && (d += int2char(c << 2)),
    d
}


function encode(a) {
    var b, c, d, e, f, g = "",
        h = "",
        i = "",
        j = 0;
    do {
        b = a.charCodeAt(j++),
        c = a.charCodeAt(j++),
        h = a.charCodeAt(j++),
        d = b >> 2,
        e = (3 & b) << 4 | c >> 4,
        f = (15 & c) << 2 | h >> 6,
        i = 63 & h,
        isNaN(c) ? f = i = 64 : isNaN(h) && (i = 64),
        g = g + this.keyStr.charAt(d) + this.keyStr.charAt(e) + this.keyStr.charAt(f) + this.keyStr.charAt(i),
        b = c = h = "",
        d = e = f = i = ""
    } while (j < a.length);
    return g
}


function BigInteger(a, b, c) {
    null != a && ("number" == typeof a ? this.fromNumber(a, b, c) : null == b && "string" != typeof a ? this.fromString(a, 256) : this.fromString(a, b))
}

function nbi() {
    return new BigInteger(null)
}

function am1(a, b, c, d, e, f) {
    for (; --f >= 0;) {
        var g = b * this[a++] + c[d] + e;
        e = Math.floor(g / 67108864),
        c[d++] = 67108863 & g
    }
    return e
}

function am2(a, b, c, d, e, f) {
    for (var g = 32767 & b, h = b >> 15; --f >= 0;) {
        var i = 32767 & this[a],
            j = this[a++] >> 15,
            k = h * i + j * g;
        i = g * i + ((32767 & k) << 15) + c[d] + (1073741823 & e),
        e = (i >>> 30) + (k >>> 15) + h * j + (e >>> 30),
        c[d++] = 1073741823 & i
    }
    return e
}

function am3(a, b, c, d, e, f) {
    for (var g = 16383 & b, h = b >> 14; --f >= 0;) {
        var i = 16383 & this[a],
            j = this[a++] >> 14,
            k = h * i + j * g;
        i = g * i + ((16383 & k) << 14) + c[d] + e,
        e = (i >> 28) + (k >> 14) + h * j,
        c[d++] = 268435455 & i
    }
    return e
}

function int2char(a) {
    return BI_RM.charAt(a)
}

function intAt(a, b) {
    var c = BI_RC[a.charCodeAt(b)];
    return null == c ? -1 : c
}

function bnpCopyTo(a) {
    for (var b = this.t - 1; b >= 0; --b)
    a[b] = this[b];
    a.t = this.t,
    a.s = this.s
}

function bnpFromInt(a) {
    this.t = 1,
    this.s = a < 0 ? -1 : 0,
    a > 0 ? this[0] = a : a < -1 ? this[0] = a + this.DV : this.t = 0
}

function nbv(a) {
    var b = nbi();
    return b.fromInt(a),
    b
}

function bnpFromString(a, b) {
    var c;
    if (16 == b) c = 4;
    else if (8 == b) c = 3;
    else if (256 == b) c = 8;
    else if (2 == b) c = 1;
    else if (32 == b) c = 5;
    else {
        if (4 != b) return void this.fromRadix(a, b);
        c = 2
    }
    this.t = 0,
    this.s = 0;
    for (var d = a.length, e = !1, f = 0; --d >= 0;) {
        var g = 8 == c ? 255 & a[d] : intAt(a, d);
        g < 0 ? "-" == a.charAt(d) && (e = !0) : (e = !1,
        0 == f ? this[this.t++] = g : f + c > this.DB ? (this[this.t - 1] |= (g & (1 << this.DB - f) - 1) << f,
        this[this.t++] = g >> this.DB - f) : this[this.t - 1] |= g << f, (f += c) >= this.DB && (f -= this.DB))
    }
    8 == c && 0 != (128 & a[0]) && (this.s = -1,
    f > 0 && (this[this.t - 1] |= (1 << this.DB - f) - 1 << f)),
    this.clamp(),
    e && BigInteger.ZERO.subTo(this, this)
}

function bnpClamp() {
    for (var a = this.s & this.DM; this.t > 0 && this[this.t - 1] == a;)--this.t
}

function bnToString(a) {
    if (this.s < 0) return "-" + this.negate().toString(a);
    var b;
    if (16 == a) b = 4;
    else if (8 == a) b = 3;
    else if (2 == a) b = 1;
    else if (32 == a) b = 5;
    else {
        if (4 != a) return this.toRadix(a);
        b = 2
    }
    var c, d = (1 << b) - 1,
        e = !1,
        f = "",
        g = this.t,
        h = this.DB - g * this.DB % b;
    if (g-- > 0) for (h < this.DB && (c = this[g] >> h) > 0 && (e = !0,
    f = int2char(c)); g >= 0;)
    h < b ? (c = (this[g] & (1 << h) - 1) << b - h,
    c |= this[--g] >> (h += this.DB - b)) : (c = this[g] >> (h -= b) & d,
    h <= 0 && (h += this.DB, --g)),
    c > 0 && (e = !0),
    e && (f += int2char(c));
    return e ? f : "0"
}

function bnNegate() {
    var a = nbi();
    return BigInteger.ZERO.subTo(this, a),
    a
}

function bnAbs() {
    return this.s < 0 ? this.negate() : this
}

function bnCompareTo(a) {
    var b = this.s - a.s;
    if (0 != b) return b;
    var c = this.t;
    if (0 != (b = c - a.t)) return this.s < 0 ? -b : b;
    for (; --c >= 0;)
    if (0 != (b = this[c] - a[c])) return b;
    return 0
}

function nbits(a) {
    var b, c = 1;
    return 0 != (b = a >>> 16) && (a = b,
    c += 16),
    0 != (b = a >> 8) && (a = b,
    c += 8),
    0 != (b = a >> 4) && (a = b,
    c += 4),
    0 != (b = a >> 2) && (a = b,
    c += 2),
    0 != (b = a >> 1) && (a = b,
    c += 1),
    c
}

function bnBitLength() {
    return this.t <= 0 ? 0 : this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM)
}

function bnpDLShiftTo(a, b) {
    var c;
    for (c = this.t - 1; c >= 0; --c)
    b[c + a] = this[c];
    for (c = a - 1; c >= 0; --c)
    b[c] = 0;
    b.t = this.t + a,
    b.s = this.s
}

function bnpDRShiftTo(a, b) {
    for (var c = a; c < this.t; ++c)
    b[c - a] = this[c];
    b.t = Math.max(this.t - a, 0),
    b.s = this.s
}

function bnpLShiftTo(a, b) {
    var c, d = a % this.DB,
        e = this.DB - d,
        f = (1 << e) - 1,
        g = Math.floor(a / this.DB),
        h = this.s << d & this.DM;
    for (c = this.t - 1; c >= 0; --c)
    b[c + g + 1] = this[c] >> e | h,
    h = (this[c] & f) << d;
    for (c = g - 1; c >= 0; --c)
    b[c] = 0;
    b[g] = h,
    b.t = this.t + g + 1,
    b.s = this.s,
    b.clamp()
}

function bnpRShiftTo(a, b) {
    b.s = this.s;
    var c = Math.floor(a / this.DB);
    if (c >= this.t) return void(b.t = 0);
    var d = a % this.DB,
        e = this.DB - d,
        f = (1 << d) - 1;
    b[0] = this[c] >> d;
    for (var g = c + 1; g < this.t; ++g)
    b[g - c - 1] |= (this[g] & f) << e,
    b[g - c] = this[g] >> d;
    d > 0 && (b[this.t - c - 1] |= (this.s & f) << e),
    b.t = this.t - c,
    b.clamp()
}

function bnpSubTo(a, b) {
    for (var c = 0, d = 0, e = Math.min(a.t, this.t); c < e;)
    d += this[c] - a[c],
    b[c++] = d & this.DM,
    d >>= this.DB;
    if (a.t < this.t) {
        for (d -= a.s; c < this.t;)
        d += this[c],
        b[c++] = d & this.DM,
        d >>= this.DB;
        d += this.s
    } else {
        for (d += this.s; c < a.t;)
        d -= a[c],
        b[c++] = d & this.DM,
        d >>= this.DB;
        d -= a.s
    }
    b.s = d < 0 ? -1 : 0,
    d < -1 ? b[c++] = this.DV + d : d > 0 && (b[c++] = d),
    b.t = c,
    b.clamp()
}

function bnpMultiplyTo(a, b) {
    var c = this.abs(),
        d = a.abs(),
        e = c.t;
    for (b.t = e + d.t; --e >= 0;)
    b[e] = 0;
    for (e = 0; e < d.t; ++e)
    b[e + c.t] = c.am(0, d[e], b, e, 0, c.t);
    b.s = 0,
    b.clamp(),
    this.s != a.s && BigInteger.ZERO.subTo(b, b)
}

function bnpSquareTo(a) {
    for (var b = this.abs(), c = a.t = 2 * b.t; --c >= 0;)
    a[c] = 0;
    for (c = 0; c < b.t - 1; ++c) {
        var d = b.am(c, b[c], a, 2 * c, 0, 1);
        (a[c + b.t] += b.am(c + 1, 2 * b[c], a, 2 * c + 1, d, b.t - c - 1)) >= b.DV && (a[c + b.t] -= b.DV,
        a[c + b.t + 1] = 1)
    }
    a.t > 0 && (a[a.t - 1] += b.am(c, b[c], a, 2 * c, 0, 1)),
    a.s = 0,
    a.clamp()
}

function bnpDivRemTo(a, b, c) {
    var d = a.abs();
    if (!(d.t <= 0)) {
        var e = this.abs();
        if (e.t < d.t) return null != b && b.fromInt(0),
        void(null != c && this.copyTo(c));
        null == c && (c = nbi());
        var f = nbi(),
            g = this.s,
            h = a.s,
            i = this.DB - nbits(d[d.t - 1]);
        i > 0 ? (d.lShiftTo(i, f),
        e.lShiftTo(i, c)) : (d.copyTo(f),
        e.copyTo(c));
        var j = f.t,
            k = f[j - 1];
        if (0 != k) {
            var l = k * (1 << this.F1) + (j > 1 ? f[j - 2] >> this.F2 : 0),
                m = this.FV / l,
                n = (1 << this.F1) / l,
                o = 1 << this.F2,
                p = c.t,
                q = p - j,
                r = null == b ? nbi() : b;
            for (f.dlShiftTo(q, r),
            c.compareTo(r) >= 0 && (c[c.t++] = 1,
            c.subTo(r, c)),
            BigInteger.ONE.dlShiftTo(j, r),
            r.subTo(f, f); f.t < j;)
            f[f.t++] = 0;
            for (; --q >= 0;) {
                var s = c[--p] == k ? this.DM : Math.floor(c[p] * m + (c[p - 1] + o) * n);
                if ((c[p] += f.am(0, s, c, q, 0, j)) < s) for (f.dlShiftTo(q, r),
                c.subTo(r, c); c[p] < --s;)
                c.subTo(r, c)
            }
            null != b && (c.drShiftTo(j, b),
            g != h && BigInteger.ZERO.subTo(b, b)),
            c.t = j,
            c.clamp(),
            i > 0 && c.rShiftTo(i, c),
            g < 0 && BigInteger.ZERO.subTo(c, c)
        }
    }
}

function bnMod(a) {
    var b = nbi();
    return this.abs().divRemTo(a, null, b),
    this.s < 0 && b.compareTo(BigInteger.ZERO) > 0 && a.subTo(b, b),
    b
}

function Classic(a) {
    this.m = a
}

function cConvert(a) {
    return a.s < 0 || a.compareTo(this.m) >= 0 ? a.mod(this.m) : a
}

function cRevert(a) {
    return a
}

function cReduce(a) {
    a.divRemTo(this.m, null, a)
}

function cMulTo(a, b, c) {
    a.multiplyTo(b, c),
    this.reduce(c)
}

function cSqrTo(a, b) {
    a.squareTo(b),
    this.reduce(b)
}

function bnpInvDigit() {
    if (this.t < 1) return 0;
    var a = this[0];
    if (0 == (1 & a)) return 0;
    var b = 3 & a;
    return b = b * (2 - (15 & a) * b) & 15,
    b = b * (2 - (255 & a) * b) & 255,
    b = b * (2 - ((65535 & a) * b & 65535)) & 65535,
    b = b * (2 - a * b % this.DV) % this.DV,
    b > 0 ? this.DV - b : -b
}

function Montgomery(a) {
    this.m = a,
    this.mp = a.invDigit(),
    this.mpl = 32767 & this.mp,
    this.mph = this.mp >> 15,
    this.um = (1 << a.DB - 15) - 1,
    this.mt2 = 2 * a.t
}

function montConvert(a) {
    var b = nbi();
    return a.abs().dlShiftTo(this.m.t, b),
    b.divRemTo(this.m, null, b),
    a.s < 0 && b.compareTo(BigInteger.ZERO) > 0 && this.m.subTo(b, b),
    b
}

function montRevert(a) {
    var b = nbi();
    return a.copyTo(b),
    this.reduce(b),
    b
}

function montReduce(a) {
    for (; a.t <= this.mt2;)
    a[a.t++] = 0;
    for (var b = 0; b < this.m.t; ++b) {
        var c = 32767 & a[b],
            d = c * this.mpl + ((c * this.mph + (a[b] >> 15) * this.mpl & this.um) << 15) & a.DM;
        for (c = b + this.m.t,
        a[c] += this.m.am(0, d, a, b, 0, this.m.t); a[c] >= a.DV;)
        a[c] -= a.DV,
        a[++c]++
    }
    a.clamp(),
    a.drShiftTo(this.m.t, a),
    a.compareTo(this.m) >= 0 && a.subTo(this.m, a)
}

function montSqrTo(a, b) {
    a.squareTo(b),
    this.reduce(b)
}

function montMulTo(a, b, c) {
    a.multiplyTo(b, c),
    this.reduce(c)
}

function bnpIsEven() {
    return 0 == (this.t > 0 ? 1 & this[0] : this.s)
}

function bnpExp(a, b) {
    if (a > 4294967295 || a < 1) return BigInteger.ONE;
    var c = nbi(),
        d = nbi(),
        e = b.convert(this),
        f = nbits(a) - 1;
    for (e.copyTo(c); --f >= 0;)
    if (b.sqrTo(c, d), (a & 1 << f) > 0) b.mulTo(d, e, c);
    else {
        var g = c;
        c = d,
        d = g
    }
    return b.revert(c)
}

function bnModPowInt(a, b) {
    var c;
    return c = a < 256 || b.isEven() ? new Classic(b) : new Montgomery(b),
    this.exp(a, c)
}

function Arcfour() {
    this.i = 0,
    this.j = 0,
    this.S = new Array
}

function ARC4init(a) {
    var b, c, d;
    for (b = 0; b < 256; ++b)
    this.S[b] = b;
    for (c = 0,
    b = 0; b < 256; ++b)
    c = c + this.S[b] + a[b % a.length] & 255,
    d = this.S[b],
    this.S[b] = this.S[c],
    this.S[c] = d;
    this.i = 0,
    this.j = 0
}

function ARC4next() {
    var a;
    return this.i = this.i + 1 & 255,
    this.j = this.j + this.S[this.i] & 255,
    a = this.S[this.i],
    this.S[this.i] = this.S[this.j],
    this.S[this.j] = a,
    this.S[a + this.S[this.i] & 255]
}

function prng_newstate() {
    return new Arcfour
}

function rng_seed_int(a) {
    rng_pool[rng_pptr++] ^= 255 & a,
    rng_pool[rng_pptr++] ^= a >> 8 & 255,
    rng_pool[rng_pptr++] ^= a >> 16 & 255,
    rng_pool[rng_pptr++] ^= a >> 24 & 255,
    rng_pptr >= rng_psize && (rng_pptr -= rng_psize)
}

function rng_seed_time() {
    rng_seed_int((new Date).getTime())
}

function rng_get_byte() {
    if (null == rng_state) {
        for (rng_seed_time(),
        rng_state = prng_newstate(),
        rng_state.init(rng_pool),
        rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
        rng_pool[rng_pptr] = 0;
        rng_pptr = 0
    }
    return rng_state.next()
}

function rng_get_bytes(a) {
    var b;
    for (b = 0; b < a.length; ++b)
    a[b] = rng_get_byte()
}

function SecureRandom() {}

function parseBigInt(a, b) {
    return new BigInteger(a, b)
}

function linebrk(a, b) {
    for (var c = "", d = 0; d + b < a.length;)
    c += a.substring(d, d + b) + "\n",
    d += b;
    return c + a.substring(d, a.length)
}

function byte2Hex(a) {
    return a < 16 ? "0" + a.toString(16) : a.toString(16)
}

function pkcs1pad2(a, b) {
    if (b < a.length + 11) return alert("Message too long for RSA"),
    null;
    for (var c = new Array, d = a.length - 1; d >= 0 && b > 0;) {
        var e = a.charCodeAt(d--);
        e < 128 ? c[--b] = e : e > 127 && e < 2048 ? (c[--b] = 63 & e | 128,
        c[--b] = e >> 6 | 192) : (c[--b] = 63 & e | 128,
        c[--b] = e >> 6 & 63 | 128,
        c[--b] = e >> 12 | 224)
    }
    c[--b] = 0;
    for (var f = new SecureRandom, g = new Array; b > 2;) {
        for (g[0] = 0; 0 == g[0];)
        f.nextBytes(g);
        c[--b] = g[0]
    }
    return c[--b] = 2,
    c[--b] = 0,
    new BigInteger(c)
}

function RSAKey() {
    this.n = null,
    this.e = 0,
    this.d = null,
    this.p = null,
    this.q = null,
    this.dmp1 = null,
    this.dmq1 = null,
    this.coeff = null
}

function RSASetPublic(a, b) {
    null != a && null != b && a.length > 0 && b.length > 0 ? (this.n = parseBigInt(a, 16),
    this.e = parseInt(b, 16)) : alert("Invalid RSA public key")
}

function RSADoPublic(a) {
    return a.modPowInt(this.e, this.n)
}

function RSAEncrypt(a) {
    var b = pkcs1pad2(a, this.n.bitLength() + 7 >> 3);
    if (null == b) return null;
    var c = this.doPublic(b);
    if (null == c) return null;
    var d = c.toString(16);
    return 0 == (1 & d.length) ? d : "0" + d
}

function isEmail(a) {
    return null != a && "" != a && !! /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(a.replace(/(^\s*)|(\s*$)/g, ""))
}

function getStringLen(a) {
    var b, c;
    for (c = 0,
    b = 0; b < a.length; b++)
    a.charCodeAt(b) >= 0 && a.charCodeAt(b) <= 255 ? c += 1 : c += 2;
    return c
}

function isTelephone(a) {
    return /^[\+\-\(\)0-9]{1,17}$/.test(a)
}

function isCompany(a) {
    return !!/^[a-z | A-Z | 0-9 | \u4e00-\u9fa5]{1,50}$/.test(a)
}

function isQQ(a) {
    return !!/^[1-9]\d{4,12}$/.test(a)
}

function isName(a) {
    return !!/^[a-z | A-Z | 0-9 | \u4e00-\u9fa5]{1,30}$/.test(a)
}

function checkRegEmail(a) {
    var b = $(a).val().trim() || "";
    if ("" == b) return $(a).next("font").html($.t("validate.emailNotEmpty")), !1;
    if (getStringLen(b) > 50) return $(a).next("font").html($.t("validate.emailLength")), !1;
    if (!isEmail(b)) return $(a).next("font").html($.t("validate.emailPattern")), !1;
    var c = {};
    return c.email = encode(b),
    $.ajax({
        url: basePath + "/api/v1/checkEmail",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(c),
        async: !1,
        cache: !1,
        success: function(b) {
            b && 200 == b.code ? 1 == b.message ? $(a).next("font").html($.t("validate.emailExist")) : 2 == b.message ? $(a).next("font").html($.t("validate.emailIsModifing")) : $(a).next("font").html("") : $(a).next("font").html($.t("validate.serviceError"))
        }
    }), !$(a).next("font").html()
}

function checkEmail(a, b) {
    var c = $(a).val().trim() || "";
    if ("" == c) return $(a).next("font").html($.t("validate.emailNotEmpty")), !1;
    if (getStringLen(c) > 50) return $(a).next("font").html($.t("validate.emailLength")), !1;
    if (!isEmail(c)) return $(a).next("font").html($.t("validate.emailPattern")), !1;
    if (b) {
        if (b) {
            var d = {};
            d.email = encode(c),
            $.ajax({
                url: basePath + "/api/v1/checkEmail",
                type: "POST",
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(d),
                async: !1,
                cache: !1,
                success: function(b) {
                    b && 200 == b.code ? 1 == b.message ? $(a).next("font").html($.t("validate.emailExist")) : 2 == b.message ? $(a).next("font").html($.t("validate.emailIsModifing")) : $(a).next("font").html("") : $(a).next("font").html($.t("validate.serviceError"))
                }
            })
        }
    } else $.ajax({
        url: basePath + "/api/v1/preLogin",
        type: "get",
        data: {
            email: encode(c)
        },
        cache: !1,
        async: !1,
        success: function(b) {
            b ? 1 == b.isLock && b.duringLocking ? $(a).next("font").html($.t("login.lockAttempts")) : 2 == b.isLock ? $(a).next("font").html($.t("login.emailIsModifing")) : $(a).next("font").html("") : $(a).next("font").html("")
        }
    });
    return !$(a).next("font").html()
}

function checkPassword(a) {
    var b = $(a).val().trim() || "";
    return "" == b ? ($(a).next("font").html($.t("validate.pwdNotEmpty")), !1) : getStringLen(b) > 32 || getStringLen(b) < 6 ? ($(a).next("font").html($.t("validate.pwdLength")), !1) : ($(a).next("font").html(""), !0)
}

function checkCfmPassword(a) {
    var b = $(a).val().trim() || "",
        c = $("#password").val().trim() || "";
    return "" == b ? ($(a).next("font").html($.t("validate.pwdNotEmpty")), !1) : getStringLen(b) > 32 || getStringLen(b) < 6 ? ($(a).next("font").html($.t("validate.pwdLength")), !1) : b != c ? ($(a).next("font").html($.t("validate.pwdDifferent")), !1) : ($(a).next("font").html(""), !0)
}

function checkAgreement() {
    return parseInt($("#basic_agree:checked").length) > 0 ? ($("#basic_reg_error").html(""), !0) : ($("#basic_reg_error").html($.t("regist.agreeMent")), !1)
}

function checkOldPassword(a) {
    var b = $(a).val().trim() || "";
    if ("" == b) return $(a).next("div").html($.t("validate.pwdNotEmpty")), !1;
    if (getStringLen(b) > 32 || getStringLen(b) < 6) return $(a).next("div").html($.t("validate.pwdLength")), !1;
    var c = {
        oldPwd: hex2b64(rsa.encrypt(b))
    };
    return $.ajax({
        url: basePath + "/ssoauth/v1/checkUserPassword",
        type: "get",
        data: c,
        cache: !1,
        async: !1,
        success: function(b) {
            b ? $(a).next("div").html("") : $(a).next("div").html($.t("validate.originalPwdWrong"))
        }
    }), !$(a).next("div").html()
}

function checkNewPassword(a) {
    var b = $(a).val().trim() || "";
    return "" == b ? ($(a).next("div").html($.t("validate.pwdNotEmpty")), !1) : getStringLen(b) > 32 || getStringLen(b) < 6 ? ($(a).next("div").html($.t("validate.pwdLength")), !1) : ($(a).next("div").html(""), !0)
}

function checkCfmNewPwd(a) {
    var b = $(a).val().trim() || "",
        c = $("#newPwd").val().trim() || "";
    return "" == b ? ($(a).next("div").html($.t("validate.pwdNotEmpty")), !1) : getStringLen(b) > 32 || getStringLen(b) < 6 ? ($(a).next("div").html($.t("validate.pwdLength")), !1) : b != c ? ($(a).next("div").html($.t("validate.pwdDifferent")), !1) : ($(a).next("div").html(""), !0)
}

function checkcompany(a) {
    var b = $(a).val().trim() || "";
    return "" == b ? ($(a).next("span").html($.t("validate.companyNotEmpty")), !1) : getStringLen(b) > 50 ? ($(a).next("span").html($.t("validate.companyLength")), !1) : ($(a).next("span").html(""), !0)
}

function checkUserName(a) {
    var b = $(a).val().trim() || "";
    return "" == b ? ($(a).next("span").html($.t("validate.nameNotEmpty")), !1) : getStringLen(b) > 30 ? ($(a).next("span").html($.t("validate.nameLength")), !1) : isName(b) ? ($(a).next("span").html(""), !0) : ($(a).next("span").html($.t("validate.namePattern")), !1)
}

function checkTelephone(a) {
    var b = $(a).val().trim() || "";
    return "" == b ? ($(a).next("span").html($.t("validate.telephoneNotEmpty")), !1) : isTelephone(b) ? ($(a).next("span").html(""), !0) : ($(a).next("span").html($.t("validate.telephonePattern")), !1)
}

function checkQQ(a) {
    return isQQ($(a).val().trim() || "") ? ($(a).next("span").html(""), !0) : ($(a).next("span").html($.t("validate.qqPattern")), !1)
}

function checkUpdateCompany(a) {
    var b = $(a).val().trim() || "";
    return "" == b ? ($(a).parent().next("div").html($.t("validate.companyNotEmpty")), !1) : getStringLen(b) > 50 ? ($(a).parent().next("div").html($.t("validate.companyLength")), !1) : ($(a).parent().next("div").html(""), !0)
}

function checkUpdateUserName(a) {
    var b = $(a).val().trim() || "";
    return "" == b ? ($(a).parent().next("div").html($.t("validate.nameNotEmpty")), !1) : getStringLen(b) > 30 ? ($(a).parent().next("div").html($.t("validate.nameLength")), !1) : isName(b) ? ($(a).parent().next("div").html(""), !0) : ($(a).parent().next("div").html($.t("validate.namePattern")), !1)
}

function checkUpdateTelephone(a) {
    var b = $(a).val().trim() || "";
    return "" == b ? ($(a).parent().next("div").html($.t("validate.telephoneNotEmpty")), !1) : isTelephone(b) ? ($(a).parent().next("div").html(""), !0) : ($(a).parent().next("div").html($.t("validate.telephonePattern")), !1)
}

function checkUpdateQQ(a) {
    var b = $(a).val().trim() || "";
    return "" == b ? ($(a).parent().next("div").html($.t("validate.qqNotEmpty")), !1) : isQQ(b) ? ($(a).parent().next("div").html(""), !0) : ($(a).parent().next("div").html($.t("validate.qqPattern")), !1)
}

function closeNoticePannel() {
    $.unblockUI()
}

function changeLanguage(a) {
    var b = a || "en_us";
    if (b != currentLocale) {
        var c = {
            locale: b
        };
        $.ajax({
            url: basePath + "/api/v1/changeLanguage",
            type: "get",
            data: c,
            cache: !1,
            success: function(a) {
                location.replace(replaceParamVal("languagetype", b))
            }
        })
    }
}

function replaceParamVal(paramName, replaceWith) {
    var oldUrl = this.location.href.toString(),
        replaceStr = eval("/(" + paramName + "=)([^&]*)/gi");
    return oldUrl.replace(replaceStr, paramName + "=" + replaceWith)
}! function(a, b) {
    function c(a) {
        return K.isWindow(a) ? a : 9 === a.nodeType && (a.defaultView || a.parentWindow)
    }

    function d(a) {
        if (!sb[a]) {
            var b = H.body,
                c = K("<" + a + ">").appendTo(b),
                d = c.css("display");
            c.remove(),
                "none" !== d && "" !== d || (ob || (ob = H.createElement("iframe"),
            ob.frameBorder = ob.width = ob.height = 0),
            b.appendChild(ob),
            pb && ob.createElement || (pb = (ob.contentWindow || ob.contentDocument).document,
            pb.write(("CSS1Compat" === H.compatMode ? "<!doctype html>" : "") + "<html><body>"),
            pb.close()),
            c = pb.createElement(a),
            pb.body.appendChild(c),
            d = K.css(c, "display"),
            b.removeChild(ob)),
            sb[a] = d
        }
        return sb[a]
    }

    function e(a, b) {
        var c = {};
        return K.each(vb.concat.apply([], vb.slice(0, b)), function() {
            c[this] = a
        }),
        c
    }

    function f() {
        rb = b
    }

    function g() {
        return setTimeout(f, 0),
        rb = K.now()
    }

    function h() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (a) {}
    }

    function i() {
        try {
            return new a.XMLHttpRequest
        } catch (a) {}
    }

    function j(a, c) {
        a.dataFilter && (c = a.dataFilter(c, a.dataType));
        var d, e, f, g, h, i, j, k, l = a.dataTypes,
            m = {}, n = l.length,
            o = l[0];
        for (d = 1; d < n; d++) {
            if (1 === d) for (e in a.converters) "string" == typeof e && (m[e.toLowerCase()] = a.converters[e]);
            if (g = o,
                "*" === (o = l[d])) o = g;
            else if ("*" !== g && g !== o) {
                if (h = g + " " + o, !(i = m[h] || m["* " + o])) {
                    k = b;
                    for (j in m)
                    if (f = j.split(" "), (f[0] === g || "*" === f[0]) && (k = m[f[1] + " " + o])) {
                        j = m[j], !0 === j ? i = k : !0 === k && (i = j);
                        break
                    }
                }!i && !k && K.error("No conversion from " + h.replace(" ", " to ")), !0 !== i && (c = i ? i(c) : k(j(c)))
            }
        }
        return c
    }

    function k(a, c, d) {
        var e, f, g, h, i = a.contents,
            j = a.dataTypes,
            k = a.responseFields;
        for (f in k)
        f in d && (c[k[f]] = d[f]);
        for (;
        "*" === j[0];)
        j.shift(),
        e === b && (e = a.mimeType || c.getResponseHeader("content-type"));
        if (e) for (f in i)
        if (i[f] && i[f].test(e)) {
            j.unshift(f);
            break
        }
        if (j[0] in d) g = j[0];
        else {
            for (f in d) {
                if (!j[0] || a.converters[f + " " + j[0]]) {
                    g = f;
                    break
                }
                h || (h = f)
            }
            g = g || h
        }
        if (g) return g !== j[0] && j.unshift(g),
        d[g]
    }

    function l(a, b, c, d) {
        if (K.isArray(b)) K.each(b, function(b, e) {
            c || Ta.test(a) ? d(a, e) : l(a + "[" + ("object" == typeof e || K.isArray(e) ? b : "") + "]", e, c, d)
        });
        else if (c || null == b || "object" != typeof b) d(a, b);
        else for (var e in b)
        l(a + "[" + e + "]", b[e], c, d)
    }

    function m(a, c) {
        var d, e, f = K.ajaxSettings.flatOptions || {};
        for (d in c)
        c[d] !== b && ((f[d] ? a : e || (e = {}))[d] = c[d]);
        e && K.extend(!0, a, e)
    }

    function n(a, c, d, e, f, g) {
        f = f || c.dataTypes[0],
        g = g || {},
        g[f] = !0;
        for (var h, i = a[f], j = 0, k = i ? i.length : 0, l = a === gb; j < k && (l || !h); j++) "string" == typeof(h = i[j](c, d, e)) && (!l || g[h] ? h = b : (c.dataTypes.unshift(h),
        h = n(a, c, d, e, h, g)));
        return (l || !h) && !g["*"] && (h = n(a, c, d, e, "*", g)),
        h
    }

    function o(a) {
        return function(b, c) {
            if ("string" != typeof b && (c = b,
            b = "*"),
            K.isFunction(c)) for (var d, e, f, g = b.toLowerCase().split(cb), h = 0, i = g.length; h < i; h++)
            d = g[h],
            f = /^\+/.test(d),
            f && (d = d.substr(1) || "*"),
            e = a[d] = a[d] || [],
            e[f ? "unshift" : "push"](c)
        }
    }

    function p(a, b, c) {
        var d = "width" === b ? a.offsetWidth : a.offsetHeight,
            e = "width" === b ? Oa : Pa,
            f = 0,
            g = e.length;
        if (d > 0) {
            if ("border" !== c) for (; f < g; f++)
            c || (d -= parseFloat(K.css(a, "padding" + e[f])) || 0),
                "margin" === c ? d += parseFloat(K.css(a, c + e[f])) || 0 : d -= parseFloat(K.css(a, "border" + e[f] + "Width")) || 0;
            return d + "px"
        }
        if (d = Ea(a, b, b), (d < 0 || null == d) && (d = a.style[b] || 0),
        d = parseFloat(d) || 0,
        c) for (; f < g; f++)
        d += parseFloat(K.css(a, "padding" + e[f])) || 0,
            "padding" !== c && (d += parseFloat(K.css(a, "border" + e[f] + "Width")) || 0),
            "margin" === c && (d += parseFloat(K.css(a, c + e[f])) || 0);
        return d + "px"
    }

    function q(a, b) {
        b.src ? K.ajax({
            url: b.src,
            async: !1,
            dataType: "script"
        }) : K.globalEval((b.text || b.textContent || b.innerHTML || "").replace(Ba, "/*$0*/")),
        b.parentNode && b.parentNode.removeChild(b)
    }

    function r(a) {
        var b = H.createElement("div");
        return Da.appendChild(b),
        b.innerHTML = a.outerHTML,
        b.firstChild
    }

    function s(a) {
        var b = (a.nodeName || "").toLowerCase();
        "input" === b ? t(a) : "script" !== b && void 0 !== a.getElementsByTagName && K.grep(a.getElementsByTagName("input"), t)
    }

    function t(a) {
        "checkbox" !== a.type && "radio" !== a.type || (a.defaultChecked = a.checked)
    }

    function u(a) {
        return void 0 !== a.getElementsByTagName ? a.getElementsByTagName("*") : void 0 !== a.querySelectorAll ? a.querySelectorAll("*") : []
    }

    function v(a, b) {
        var c;
        1 === b.nodeType && (b.clearAttributes && b.clearAttributes(),
        b.mergeAttributes && b.mergeAttributes(a),
        c = b.nodeName.toLowerCase(),
            "object" === c ? b.outerHTML = a.outerHTML : "input" !== c || "checkbox" !== a.type && "radio" !== a.type ? "option" === c ? b.selected = a.defaultSelected : "input" !== c && "textarea" !== c || (b.defaultValue = a.defaultValue) : (a.checked && (b.defaultChecked = b.checked = a.checked),
        b.value !== a.value && (b.value = a.value)),
        b.removeAttribute(K.expando))
    }

    function w(a, b) {
        if (1 === b.nodeType && K.hasData(a)) {
            var c, d, e, f = K._data(a),
                g = K._data(b, f),
                h = f.events;
            if (h) {
                delete g.handle,
                g.events = {};
                for (c in h)
                for (d = 0,
                e = h[c].length; d < e; d++)
                K.event.add(b, c + (h[c][d].namespace ? "." : "") + h[c][d].namespace, h[c][d], h[c][d].data)
            }
            g.data && (g.data = K.extend({}, g.data))
        }
    }

    function x(a, b) {
        return K.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function y(a) {
        var b = pa.split("|"),
            c = a.createDocumentFragment();
        if (c.createElement) for (; b.length;)
        c.createElement(b.pop());
        return c
    }

    function z(a, b, c) {
        if (b = b || 0,
        K.isFunction(b)) return K.grep(a, function(a, d) {
            return !!b.call(a, d, a) === c
        });
        if (b.nodeType) return K.grep(a, function(a, d) {
            return a === b === c
        });
        if ("string" == typeof b) {
            var d = K.grep(a, function(a) {
                return 1 === a.nodeType
            });
            if (la.test(b)) return K.filter(b, d, !c);
            b = K.filter(b, d)
        }
        return K.grep(a, function(a, d) {
            return K.inArray(a, b) >= 0 === c
        })
    }

    function A(a) {
        return !a || !a.parentNode || 11 === a.parentNode.nodeType
    }

    function B() {
        return !0
    }

    function C() {
        return !1
    }

    function D(a, b, c) {
        var d = b + "defer",
            e = b + "queue",
            f = b + "mark",
            g = K._data(a, d);
        g && ("queue" === c || !K._data(a, e)) && ("mark" === c || !K._data(a, f)) && setTimeout(function() {
            !K._data(a, e) && !K._data(a, f) && (K.removeData(a, d, !0),
            g.fire())
        }, 0)
    }

    function E(a) {
        for (var b in a)
        if (("data" !== b || !K.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
        return !0
    }

    function F(a, c, d) {
        if (d === b && 1 === a.nodeType) {
            var e = "data-" + c.replace(O, "-$1").toLowerCase();
            if ("string" == typeof(d = a.getAttribute(e))) {
                try {
                    d = "true" === d || "false" !== d && ("null" === d ? null : K.isNumeric(d) ? parseFloat(d) : N.test(d) ? K.parseJSON(d) : d)
                } catch (a) {}
                K.data(a, c, d)
            } else d = b
        }
        return d
    }

    function G(a) {
        var b, c, d = L[a] = {};
        for (a = a.split(/\s+/),
        b = 0,
        c = a.length; b < c; b++)
        d[a[b]] = !0;
        return d
    }
    var H = a.document,
        I = a.navigator,
        J = a.location,
        K = function() {
            function c() {
                if (!h.isReady) {
                    try {
                        H.documentElement.doScroll("left")
                    } catch (a) {
                        return void setTimeout(c, 1)
                    }
                    h.ready()
                }
            }
            var d, e, f, g, h = function(a, b) {
                return new h.fn.init(a, b, d)
            }, i = a.jQuery,
                j = a.$,
                k = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
                l = /\S/,
                m = /^\s+/,
                n = /\s+$/,
                o = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
                p = /^[\],:{}\s]*$/,
                q = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                r = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                s = /(?:^|:|,)(?:\s*\[)+/g,
                t = /(webkit)[ \/]([\w.]+)/,
                u = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                v = /(msie) ([\w.]+)/,
                w = /(mozilla)(?:.*? rv:([\w.]+))?/,
                x = /-([a-z]|[0-9])/gi,
                y = /^-ms-/,
                z = function(a, b) {
                    return (b + "").toUpperCase()
                }, A = I.userAgent,
                B = Object.prototype.toString,
                C = Object.prototype.hasOwnProperty,
                D = Array.prototype.push,
                E = Array.prototype.slice,
                F = String.prototype.trim,
                G = Array.prototype.indexOf,
                J = {};
            return h.fn = h.prototype = {
                constructor: h,
                init: function(a, c, d) {
                    var e, f, g, i;
                    if (!a) return this;
                    if (a.nodeType) return this.context = this[0] = a,
                    this.length = 1,
                    this;
                    if ("body" === a && !c && H.body) return this.context = H,
                    this[0] = H.body,
                    this.selector = a,
                    this.length = 1,
                    this;
                    if ("string" == typeof a) {
                        if ((e = "<" !== a.charAt(0) || ">" !== a.charAt(a.length - 1) || a.length < 3 ? k.exec(a) : [null, a, null]) && (e[1] || !c)) {
                            if (e[1]) return c = c instanceof h ? c[0] : c,
                            i = c ? c.ownerDocument || c : H,
                            g = o.exec(a),
                            g ? h.isPlainObject(c) ? (a = [H.createElement(g[1])],
                            h.fn.attr.call(a, c, !0)) : a = [i.createElement(g[1])] : (g = h.buildFragment([e[1]], [i]),
                            a = (g.cacheable ? h.clone(g.fragment) : g.fragment).childNodes),
                            h.merge(this, a);
                            if ((f = H.getElementById(e[2])) && f.parentNode) {
                                if (f.id !== e[2]) return d.find(a);
                                this.length = 1,
                                this[0] = f
                            }
                            return this.context = H,
                            this.selector = a,
                            this
                        }
                        return !c || c.jquery ? (c || d).find(a) : this.constructor(c).find(a)
                    }
                    return h.isFunction(a) ? d.ready(a) : (a.selector !== b && (this.selector = a.selector,
                    this.context = a.context),
                    h.makeArray(a, this))
                },
                selector: "",
                jquery: "1.7.1",
                length: 0,
                size: function() {
                    return this.length
                },
                toArray: function() {
                    return E.call(this, 0)
                },
                get: function(a) {
                    return null == a ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
                },
                pushStack: function(a, b, c) {
                    var d = this.constructor();
                    return h.isArray(a) ? D.apply(d, a) : h.merge(d, a),
                    d.prevObject = this,
                    d.context = this.context,
                        "find" === b ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")"),
                    d
                },
                each: function(a, b) {
                    return h.each(this, a, b)
                },
                ready: function(a) {
                    return h.bindReady(),
                    f.add(a),
                    this
                },
                eq: function(a) {
                    return a = +a, -1 === a ? this.slice(a) : this.slice(a, a + 1)
                },
                first: function() {
                    return this.eq(0)
                },
                last: function() {
                    return this.eq(-1)
                },
                slice: function() {
                    return this.pushStack(E.apply(this, arguments), "slice", E.call(arguments).join(","))
                },
                map: function(a) {
                    return this.pushStack(h.map(this, function(b, c) {
                        return a.call(b, c, b)
                    }))
                },
                end: function() {
                    return this.prevObject || this.constructor(null)
                },
                push: D,
                sort: [].sort,
                splice: [].splice
            },
            h.fn.init.prototype = h.fn,
            h.extend = h.fn.extend = function() {
                var a, c, d, e, f, g, i = arguments[0] || {}, j = 1,
                    k = arguments.length,
                    l = !1;
                for ("boolean" == typeof i && (l = i,
                i = arguments[1] || {},
                j = 2),
                    "object" != typeof i && !h.isFunction(i) && (i = {}),
                k === j && (i = this, --j); j < k; j++)
                if (null != (a = arguments[j])) for (c in a)
                d = i[c],
                e = a[c],
                i !== e && (l && e && (h.isPlainObject(e) || (f = h.isArray(e))) ? (f ? (f = !1,
                g = d && h.isArray(d) ? d : []) : g = d && h.isPlainObject(d) ? d : {},
                i[c] = h.extend(l, g, e)) : e !== b && (i[c] = e));
                return i
            },
            h.extend({
                noConflict: function(b) {
                    return a.$ === h && (a.$ = j),
                    b && a.jQuery === h && (a.jQuery = i),
                    h
                },
                isReady: !1,
                readyWait: 1,
                holdReady: function(a) {
                    a ? h.readyWait++ : h.ready(!0)
                },
                ready: function(a) {
                    if (!0 === a && !--h.readyWait || !0 !== a && !h.isReady) {
                        if (!H.body) return setTimeout(h.ready, 1);
                        if (h.isReady = !0, !0 !== a && --h.readyWait > 0) return;
                        f.fireWith(H, [h]),
                        h.fn.trigger && h(H).trigger("ready").off("ready")
                    }
                },
                bindReady: function() {
                    if (!f) {
                        if (f = h.Callbacks("once memory"),
                            "complete" === H.readyState) return setTimeout(h.ready, 1);
                        if (H.addEventListener) H.addEventListener("DOMContentLoaded", g, !1),
                        a.addEventListener("load", h.ready, !1);
                        else if (H.attachEvent) {
                            H.attachEvent("onreadystatechange", g),
                            a.attachEvent("onload", h.ready);
                            var b = !1;
                            try {
                                b = null == a.frameElement
                            } catch (a) {}
                            H.documentElement.doScroll && b && c()
                        }
                    }
                },
                isFunction: function(a) {
                    return "function" === h.type(a)
                },
                isArray: Array.isArray || function(a) {
                    return "array" === h.type(a)
                },
                isWindow: function(a) {
                    return a && "object" == typeof a && "setInterval" in a
                },
                isNumeric: function(a) {
                    return !isNaN(parseFloat(a)) && isFinite(a)
                },
                type: function(a) {
                    return null == a ? String(a) : J[B.call(a)] || "object"
                },
                isPlainObject: function(a) {
                    if (!a || "object" !== h.type(a) || a.nodeType || h.isWindow(a)) return !1;
                    try {
                        if (a.constructor && !C.call(a, "constructor") && !C.call(a.constructor.prototype, "isPrototypeOf")) return !1
                    } catch (a) {
                        return !1
                    }
                    var c;
                    for (c in a);
                    return c === b || C.call(a, c)
                },
                isEmptyObject: function(a) {
                    for (var b in a)
                    return !1;
                    return !0
                },
                error: function(a) {
                    throw new Error(a)
                },
                parseJSON: function(b) {
                    return "string" == typeof b && b ? (b = h.trim(b),
                    a.JSON && a.JSON.parse ? a.JSON.parse(b) : p.test(b.replace(q, "@").replace(r, "]").replace(s, "")) ? new Function("return " + b)() : void h.error("Invalid JSON: " + b)) : null
                },
                parseXML: function(c) {
                    var d, e;
                    try {
                        a.DOMParser ? (e = new DOMParser,
                        d = e.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"),
                        d.async = "false",
                        d.loadXML(c))
                    } catch (a) {
                        d = b
                    }
                    return (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && h.error("Invalid XML: " + c),
                    d
                },
                noop: function() {},
                globalEval: function(b) {
                    b && l.test(b) && (a.execScript || function(b) {
                        a.eval.call(a, b)
                    })(b)
                },
                camelCase: function(a) {
                    return a.replace(y, "ms-").replace(x, z)
                },
                nodeName: function(a, b) {
                    return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
                },
                each: function(a, c, d) {
                    var e, f = 0,
                        g = a.length,
                        i = g === b || h.isFunction(a);
                    if (d) if (i) {
                        for (e in a)
                        if (!1 === c.apply(a[e], d)) break
                    } else for (; f < g && !1 !== c.apply(a[f++], d););
                    else if (i) {
                        for (e in a)
                        if (!1 === c.call(a[e], e, a[e])) break
                    } else for (; f < g && !1 !== c.call(a[f], f, a[f++]););
                    return a
                },
                trim: F ? function(a) {
                    return null == a ? "" : F.call(a)
                } : function(a) {
                    return null == a ? "" : (a + "").replace(m, "").replace(n, "")
                },
                makeArray: function(a, b) {
                    var c = b || [];
                    if (null != a) {
                        var d = h.type(a);
                        null == a.length || "string" === d || "function" === d || "regexp" === d || h.isWindow(a) ? D.call(c, a) : h.merge(c, a)
                    }
                    return c
                },
                inArray: function(a, b, c) {
                    var d;
                    if (b) {
                        if (G) return G.call(b, a, c);
                        for (d = b.length,
                        c = c ? c < 0 ? Math.max(0, d + c) : c : 0; c < d; c++)
                        if (c in b && b[c] === a) return c
                    }
                    return -1
                },
                merge: function(a, c) {
                    var d = a.length,
                        e = 0;
                    if ("number" == typeof c.length) for (var f = c.length; e < f; e++)
                    a[d++] = c[e];
                    else for (; c[e] !== b;)
                    a[d++] = c[e++];
                    return a.length = d,
                    a
                },
                grep: function(a, b, c) {
                    var d, e = [];
                    c = !! c;
                    for (var f = 0, g = a.length; f < g; f++)
                    d = !! b(a[f], f),
                    c !== d && e.push(a[f]);
                    return e
                },
                map: function(a, c, d) {
                    var e, f, g = [],
                        i = 0,
                        j = a.length;
                    if (a instanceof h || j !== b && "number" == typeof j && (j > 0 && a[0] && a[j - 1] || 0 === j || h.isArray(a))) for (; i < j; i++)
                    null != (e = c(a[i], i, d)) && (g[g.length] = e);
                    else for (f in a)
                    null != (e = c(a[f], f, d)) && (g[g.length] = e);
                    return g.concat.apply([], g)
                },
                guid: 1,
                proxy: function(a, c) {
                    if ("string" == typeof c) {
                        var d = a[c];
                        c = a,
                        a = d
                    }
                    if (!h.isFunction(a)) return b;
                    var e = E.call(arguments, 2),
                        f = function() {
                            return a.apply(c, e.concat(E.call(arguments)))
                        };
                    return f.guid = a.guid = a.guid || f.guid || h.guid++,
                    f
                },
                access: function(a, c, d, e, f, g) {
                    var i = a.length;
                    if ("object" == typeof c) {
                        for (var j in c)
                        h.access(a, j, c[j], e, f, d);
                        return a
                    }
                    if (d !== b) {
                        e = !g && e && h.isFunction(d);
                        for (var k = 0; k < i; k++)
                        f(a[k], c, e ? d.call(a[k], k, f(a[k], c)) : d, g);
                        return a
                    }
                    return i ? f(a[0], c) : b
                },
                now: function() {
                    return (new Date).getTime()
                },
                uaMatch: function(a) {
                    a = a.toLowerCase();
                    var b = t.exec(a) || u.exec(a) || v.exec(a) || a.indexOf("compatible") < 0 && w.exec(a) || [];
                    return {
                        browser: b[1] || "",
                        version: b[2] || "0"
                    }
                },
                sub: function() {
                    function a(b, c) {
                        return new a.fn.init(b, c)
                    }
                    h.extend(!0, a, this),
                    a.superclass = this,
                    a.fn = a.prototype = this(),
                    a.fn.constructor = a,
                    a.sub = this.sub,
                    a.fn.init = function(c, d) {
                        return d && d instanceof h && !(d instanceof a) && (d = a(d)),
                        h.fn.init.call(this, c, d, b)
                    },
                    a.fn.init.prototype = a.fn;
                    var b = a(H);
                    return a
                },
                browser: {}
            }),
            h.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(a, b) {
                J["[object " + b + "]"] = b.toLowerCase()
            }),
            e = h.uaMatch(A),
            e.browser && (h.browser[e.browser] = !0,
            h.browser.version = e.version),
            h.browser.webkit && (h.browser.safari = !0),
            l.test(" ") && (m = /^[\s\xA0]+/,
            n = /[\s\xA0]+$/),
            d = h(H),
            H.addEventListener ? g = function() {
                H.removeEventListener("DOMContentLoaded", g, !1),
                h.ready()
            } : H.attachEvent && (g = function() {
                "complete" === H.readyState && (H.detachEvent("onreadystatechange", g),
                h.ready())
            }),
            h
        }(),
        L = {};
    K.Callbacks = function(a) {
        a = a ? L[a] || G(a) : {};
        var c, d, e, f, g, h = [],
            i = [],
            j = function(b) {
                var c, d, e, f;
                for (c = 0,
                d = b.length; c < d; c++)
                e = b[c],
                f = K.type(e),
                    "array" === f ? j(e) : "function" === f && (!a.unique || !l.has(e)) && h.push(e)
            }, k = function(b, j) {
                for (j = j || [],
                c = !a.memory || [b, j],
                d = !0,
                g = e || 0,
                e = 0,
                f = h.length; h && g < f; g++)
                if (!1 === h[g].apply(b, j) && a.stopOnFalse) {
                    c = !0;
                    break
                }
                d = !1,
                h && (a.once ? !0 === c ? l.disable() : h = [] : i && i.length && (c = i.shift(),
                l.fireWith(c[0], c[1])))
            }, l = {
                add: function() {
                    if (h) {
                        var a = h.length;
                        j(arguments),
                        d ? f = h.length : c && !0 !== c && (e = a,
                        k(c[0], c[1]))
                    }
                    return this
                },
                remove: function() {
                    if (h) for (var b = arguments, c = 0, e = b.length; c < e; c++)
                    for (var i = 0; i < h.length && (b[c] !== h[i] || (d && i <= f && (f--,
                    i <= g && g--),
                    h.splice(i--, 1), !a.unique)); i++);
                    return this
                },
                has: function(a) {
                    if (h) for (var b = 0, c = h.length; b < c; b++)
                    if (a === h[b]) return !0;
                    return !1
                },
                empty: function() {
                    return h = [],
                    this
                },
                disable: function() {
                    return h = i = c = b,
                    this
                },
                disabled: function() {
                    return !h
                },
                lock: function() {
                    return i = b, (!c || !0 === c) && l.disable(),
                    this
                },
                locked: function() {
                    return !i
                },
                fireWith: function(b, e) {
                    return i && (d ? a.once || i.push([b, e]) : (!a.once || !c) && k(b, e)),
                    this
                },
                fire: function() {
                    return l.fireWith(this, arguments),
                    this
                },
                fired: function() {
                    return !!c
                }
            };
        return l
    };
    var M = [].slice;
    K.extend({
        Deferred: function(a) {
            var b, c = K.Callbacks("once memory"),
                d = K.Callbacks("once memory"),
                e = K.Callbacks("memory"),
                f = "pending",
                g = {
                    resolve: c,
                    reject: d,
                    notify: e
                }, h = {
                    done: c.add,
                    fail: d.add,
                    progress: e.add,
                    state: function() {
                        return f
                    },
                    isResolved: c.fired,
                    isRejected: d.fired,
                    then: function(a, b, c) {
                        return i.done(a).fail(b).progress(c),
                        this
                    },
                    always: function() {
                        return i.done.apply(i, arguments).fail.apply(i, arguments),
                        this
                    },
                    pipe: function(a, b, c) {
                        return K.Deferred(function(d) {
                            K.each({
                                done: [a, "resolve"],
                                fail: [b, "reject"],
                                progress: [c, "notify"]
                            }, function(a, b) {
                                var c, e = b[0],
                                    f = b[1];
                                K.isFunction(e) ? i[a](function() {
                                    c = e.apply(this, arguments),
                                    c && K.isFunction(c.promise) ? c.promise().then(d.resolve, d.reject, d.notify) : d[f + "With"](this === i ? d : this, [c])
                                }) : i[a](d[f])
                            })
                        }).promise()
                    },
                    promise: function(a) {
                        if (null == a) a = h;
                        else for (var b in h)
                        a[b] = h[b];
                        return a
                    }
                }, i = h.promise({});
            for (b in g)
            i[b] = g[b].fire,
            i[b + "With"] = g[b].fireWith;
            return i.done(function() {
                f = "resolved"
            }, d.disable, e.lock).fail(function() {
                f = "rejected"
            }, c.disable, e.lock),
            a && a.call(i, i),
            i
        },
        when: function(a) {
            function b(a) {
                return function(b) {
                    g[a] = arguments.length > 1 ? M.call(arguments, 0) : b,
                    i.notifyWith(j, g)
                }
            }

            function c(a) {
                return function(b) {
                    d[a] = arguments.length > 1 ? M.call(arguments, 0) : b, --h || i.resolveWith(i, d)
                }
            }
            var d = M.call(arguments, 0),
                e = 0,
                f = d.length,
                g = Array(f),
                h = f,
                i = f <= 1 && a && K.isFunction(a.promise) ? a : K.Deferred(),
                j = i.promise();
            if (f > 1) {
                for (; e < f; e++)
                d[e] && d[e].promise && K.isFunction(d[e].promise) ? d[e].promise().then(c(e), i.reject, b(e)) : --h;
                h || i.resolveWith(i, d)
            } else i !== a && i.resolveWith(i, f ? [a] : []);
            return j
        }
    }),
    K.support = function() {
        var b, c, d, e, f, g, h, i, j, k, l, m, n = H.createElement("div");
        H.documentElement;
        if (n.setAttribute("className", "t"),
        n.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",
        c = n.getElementsByTagName("*"),
        d = n.getElementsByTagName("a")[0], !c || !c.length || !d) return {};
        e = H.createElement("select"),
        f = e.appendChild(H.createElement("option")),
        g = n.getElementsByTagName("input")[0],
        b = {
            leadingWhitespace: 3 === n.firstChild.nodeType,
            tbody: !n.getElementsByTagName("tbody").length,
            htmlSerialize: !! n.getElementsByTagName("link").length,
            style: /top/.test(d.getAttribute("style")),
            hrefNormalized: "/a" === d.getAttribute("href"),
            opacity: /^0.55/.test(d.style.opacity),
            cssFloat: !! d.style.cssFloat,
            checkOn: "on" === g.value,
            optSelected: f.selected,
            getSetAttribute: "t" !== n.className,
            enctype: !! H.createElement("form").enctype,
            html5Clone: "<:nav></:nav>" !== H.createElement("nav").cloneNode(!0).outerHTML,
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0
        },
        g.checked = !0,
        b.noCloneChecked = g.cloneNode(!0).checked,
        e.disabled = !0,
        b.optDisabled = !f.disabled;
        try {
            delete n.test
        } catch (a) {
            b.deleteExpando = !1
        }
        if (!n.addEventListener && n.attachEvent && n.fireEvent && (n.attachEvent("onclick", function() {
            b.noCloneEvent = !1
        }),
        n.cloneNode(!0).fireEvent("onclick")),
        g = H.createElement("input"),
        g.value = "t",
        g.setAttribute("type", "radio"),
        b.radioValue = "t" === g.value,
        g.setAttribute("checked", "checked"),
        n.appendChild(g),
        i = H.createDocumentFragment(),
        i.appendChild(n.lastChild),
        b.checkClone = i.cloneNode(!0).cloneNode(!0).lastChild.checked,
        b.appendChecked = g.checked,
        i.removeChild(g),
        i.appendChild(n),
        n.innerHTML = "",
        a.getComputedStyle && (h = H.createElement("div"),
        h.style.width = "0",
        h.style.marginRight = "0",
        n.style.width = "2px",
        n.appendChild(h),
        b.reliableMarginRight = 0 === (parseInt((a.getComputedStyle(h, null) || {
            marginRight: 0
        }).marginRight, 10) || 0)),
        n.attachEvent) for (l in {
            submit: 1,
            change: 1,
            focusin: 1
        })
        k = "on" + l,
        m = k in n,
        m || (n.setAttribute(k, "return;"),
        m = "function" == typeof n[k]),
        b[l + "Bubbles"] = m;
        return i.removeChild(n),
        i = e = f = h = n = g = null,
        K(function() {
            var a, c, d, e, f, g, h, i, k, l, o = H.getElementsByTagName("body")[0];
            !o || (g = 1,
            h = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;",
            i = "visibility:hidden;border:0;",
            k = "style='" + h + "border:5px solid #000;padding:0;'",
            l = "<div " + k + "><div></div></div><table " + k + " cellpadding='0' cellspacing='0'><tr><td></td></tr></table>",
            a = H.createElement("div"),
            a.style.cssText = i + "width:0;height:0;position:static;top:0;margin-top:" + g + "px",
            o.insertBefore(a, o.firstChild),
            n = H.createElement("div"),
            a.appendChild(n),
            n.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",
            j = n.getElementsByTagName("td"),
            m = 0 === j[0].offsetHeight,
            j[0].style.display = "",
            j[1].style.display = "none",
            b.reliableHiddenOffsets = m && 0 === j[0].offsetHeight,
            n.innerHTML = "",
            n.style.width = n.style.paddingLeft = "1px",
            K.boxModel = b.boxModel = 2 === n.offsetWidth,
            void 0 !== n.style.zoom && (n.style.display = "inline",
            n.style.zoom = 1,
            b.inlineBlockNeedsLayout = 2 === n.offsetWidth,
            n.style.display = "",
            n.innerHTML = "<div style='width:4px;'></div>",
            b.shrinkWrapBlocks = 2 !== n.offsetWidth),
            n.style.cssText = h + i,
            n.innerHTML = l,
            c = n.firstChild,
            d = c.firstChild,
            e = c.nextSibling.firstChild.firstChild,
            f = {
                doesNotAddBorder: 5 !== d.offsetTop,
                doesAddBorderForTableAndCells: 5 === e.offsetTop
            },
            d.style.position = "fixed",
            d.style.top = "20px",
            f.fixedPosition = 20 === d.offsetTop || 15 === d.offsetTop,
            d.style.position = d.style.top = "",
            c.style.overflow = "hidden",
            c.style.position = "relative",
            f.subtractsBorderForOverflowNotVisible = -5 === d.offsetTop,
            f.doesNotIncludeMarginInBodyOffset = o.offsetTop !== g,
            o.removeChild(a),
            n = a = null,
            K.extend(b, f))
        }),
        b
    }();
    var N = /^(?:\{.*\}|\[.*\])$/,
        O = /([A-Z])/g;
    K.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (K.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(a) {
            return !!(a = a.nodeType ? K.cache[a[K.expando]] : a[K.expando]) && !E(a)
        },
        data: function(a, c, d, e) {
            if (K.acceptData(a)) {
                var f, g, h, i = K.expando,
                    j = "string" == typeof c,
                    k = a.nodeType,
                    l = k ? K.cache : a,
                    m = k ? a[i] : a[i] && i,
                    n = "events" === c;
                if ((!m || !l[m] || !n && !e && !l[m].data) && j && d === b) return;
                return m || (k ? a[i] = m = ++K.uuid : m = i),
                l[m] || (l[m] = {},
                k || (l[m].toJSON = K.noop)), ("object" != typeof c && "function" != typeof c || (e ? l[m] = K.extend(l[m], c) : l[m].data = K.extend(l[m].data, c)),
                f = g = l[m],
                e || (g.data || (g.data = {}),
                g = g.data),
                d !== b && (g[K.camelCase(c)] = d),
                n && !g[c]) ? f.events : (j ? null == (h = g[c]) && (h = g[K.camelCase(c)]) : h = g,
                h)
            }
        },
        removeData: function(a, b, c) {
            if (K.acceptData(a)) {
                var d, e, f, g = K.expando,
                    h = a.nodeType,
                    i = h ? K.cache : a,
                    j = h ? a[g] : g;
                if (!i[j]) return;
                if (b && (d = c ? i[j] : i[j].data)) {
                    K.isArray(b) || (b in d ? b = [b] : (b = K.camelCase(b),
                    b = b in d ? [b] : b.split(" ")));
                    for (e = 0,
                    f = b.length; e < f; e++)
                    delete d[b[e]];
                    if (!(c ? E : K.isEmptyObject)(d)) return
                }
                if (!c && (delete i[j].data, !E(i[j]))) return;
                K.support.deleteExpando || !i.setInterval ? delete i[j] : i[j] = null,
                h && (K.support.deleteExpando ? delete a[g] : a.removeAttribute ? a.removeAttribute(g) : a[g] = null)
            }
        },
        _data: function(a, b, c) {
            return K.data(a, b, c, !0)
        },
        acceptData: function(a) {
            if (a.nodeName) {
                var b = K.noData[a.nodeName.toLowerCase()];
                if (b) return !0 !== b && a.getAttribute("classid") === b
            }
            return !0
        }
    }),
    K.fn.extend({
        data: function(a, c) {
            var d, e, f, g = null;
            if (void 0 === a) {
                if (this.length && (g = K.data(this[0]),
                1 === this[0].nodeType && !K._data(this[0], "parsedAttrs"))) {
                    e = this[0].attributes;
                    for (var h = 0, i = e.length; h < i; h++)
                    f = e[h].name,
                    0 === f.indexOf("data-") && (f = K.camelCase(f.substring(5)),
                    F(this[0], f, g[f]));
                    K._data(this[0], "parsedAttrs", !0)
                }
                return g
            }
            return "object" == typeof a ? this.each(function() {
                K.data(this, a)
            }) : (d = a.split("."),
            d[1] = d[1] ? "." + d[1] : "",
            c === b ? ((g = this.triggerHandler("getData" + d[1] + "!", [d[0]])) === b && this.length && (g = K.data(this[0], a),
            g = F(this[0], a, g)),
            g === b && d[1] ? this.data(d[0]) : g) : this.each(function() {
                var b = K(this),
                    e = [d[0], c];
                b.triggerHandler("setData" + d[1] + "!", e),
                K.data(this, a, c),
                b.triggerHandler("changeData" + d[1] + "!", e)
            }))
        },
        removeData: function(a) {
            return this.each(function() {
                K.removeData(this, a)
            })
        }
    }),
    K.extend({
        _mark: function(a, b) {
            a && (b = (b || "fx") + "mark",
            K._data(a, b, (K._data(a, b) || 0) + 1))
        },
        _unmark: function(a, b, c) {
            if (!0 !== a && (c = b,
            b = a,
            a = !1),
            b) {
                c = c || "fx";
                var d = c + "mark",
                    e = a ? 0 : (K._data(b, d) || 1) - 1;
                e ? K._data(b, d, e) : (K.removeData(b, d, !0),
                D(b, c, "mark"))
            }
        },
        queue: function(a, b, c) {
            var d;
            if (a) return b = (b || "fx") + "queue",
            d = K._data(a, b),
            c && (!d || K.isArray(c) ? d = K._data(a, b, K.makeArray(c)) : d.push(c)),
            d || []
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = K.queue(a, b),
                d = c.shift(),
                e = {};
            "inprogress" === d && (d = c.shift()),
            d && ("fx" === b && c.unshift("inprogress"),
            K._data(a, b + ".run", e),
            d.call(a, function() {
                K.dequeue(a, b)
            }, e)),
            c.length || (K.removeData(a, b + "queue " + b + ".run", !0),
            D(a, b, "queue"))
        }
    }),
    K.fn.extend({
        queue: function(a, c) {
            return "string" != typeof a && (c = a,
            a = "fx"),
            c === b ? K.queue(this[0], a) : this.each(function() {
                var b = K.queue(this, a, c);
                "fx" === a && "inprogress" !== b[0] && K.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                K.dequeue(this, a)
            })
        },
        delay: function(a, b) {
            return a = K.fx ? K.fx.speeds[a] || a : a,
            b = b || "fx",
            this.queue(b, function(b, c) {
                var d = setTimeout(b, a);
                c.stop = function() {
                    clearTimeout(d)
                }
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, c) {
            function d() {
                --i || f.resolveWith(g, [g])
            }
            "string" != typeof a && (a,
            a = b),
            a = a || "fx";
            for (var e, f = K.Deferred(), g = this, h = g.length, i = 1, j = a + "defer", k = a + "queue", l = a + "mark"; h--;)
            (e = K.data(g[h], j, b, !0) || (K.data(g[h], k, b, !0) || K.data(g[h], l, b, !0)) && K.data(g[h], j, K.Callbacks("once memory"), !0)) && (i++,
            e.add(d));
            return d(),
            f.promise()
        }
    });
    var P, Q, R, S = /[\n\t\r]/g,
        T = /\s+/,
        U = /\r/g,
        V = /^(?:button|input)$/i,
        W = /^(?:button|input|object|select|textarea)$/i,
        X = /^a(?:rea)?$/i,
        Y = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        Z = K.support.getSetAttribute;
    K.fn.extend({
        attr: function(a, b) {
            return K.access(this, a, b, !0, K.attr)
        },
        removeAttr: function(a) {
            return this.each(function() {
                K.removeAttr(this, a)
            })
        },
        prop: function(a, b) {
            return K.access(this, a, b, !0, K.prop)
        },
        removeProp: function(a) {
            return a = K.propFix[a] || a,
            this.each(function() {
                try {
                    this[a] = b,
                    delete this[a]
                } catch (a) {}
            })
        },
        addClass: function(a) {
            var b, c, d, e, f, g, h;
            if (K.isFunction(a)) return this.each(function(b) {
                K(this).addClass(a.call(this, b, this.className))
            });
            if (a && "string" == typeof a) for (b = a.split(T),
            c = 0,
            d = this.length; c < d; c++)
            if (e = this[c],
            1 === e.nodeType) if (e.className || 1 !== b.length) {
                for (f = " " + e.className + " ",
                g = 0,
                h = b.length; g < h; g++)~f.indexOf(" " + b[g] + " ") || (f += b[g] + " ");
                e.className = K.trim(f)
            } else e.className = a;
            return this
        },
        removeClass: function(a) {
            var c, d, e, f, g, h, i;
            if (K.isFunction(a)) return this.each(function(b) {
                K(this).removeClass(a.call(this, b, this.className))
            });
            if (a && "string" == typeof a || a === b) for (c = (a || "").split(T),
            d = 0,
            e = this.length; d < e; d++)
            if (f = this[d],
            1 === f.nodeType && f.className) if (a) {
                for (g = (" " + f.className + " ").replace(S, " "),
                h = 0,
                i = c.length; h < i; h++)
                g = g.replace(" " + c[h] + " ", " ");
                f.className = K.trim(g)
            } else f.className = "";
            return this
        },
        toggleClass: function(a, b) {
            var c = typeof a,
                d = "boolean" == typeof b;
            return K.isFunction(a) ? this.each(function(c) {
                K(this).toggleClass(a.call(this, c, this.className, b), b)
            }) : this.each(function() {
                if ("string" === c) for (var e, f = 0, g = K(this), h = b, i = a.split(T); e = i[f++];)
                h = d ? h : !g.hasClass(e),
                g[h ? "addClass" : "removeClass"](e);
                else "undefined" !== c && "boolean" !== c || (this.className && K._data(this, "__className__", this.className),
                this.className = this.className || !1 === a ? "" : K._data(this, "__className__") || "")
            })
        },
        hasClass: function(a) {
            for (var b = " " + a + " ", c = 0, d = this.length; c < d; c++)
            if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(S, " ").indexOf(b) > -1) return !0;
            return !1
        },
        val: function(a) {
            var c, d, e, f = this[0];
            return arguments.length ? (e = K.isFunction(a),
            this.each(function(d) {
                var f, g = K(this);
                1 === this.nodeType && (f = e ? a.call(this, d, g.val()) : a,
                null == f ? f = "" : "number" == typeof f ? f += "" : K.isArray(f) && (f = K.map(f, function(a) {
                    return null == a ? "" : a + ""
                })),
                c = K.valHooks[this.nodeName.toLowerCase()] || K.valHooks[this.type],
                c && "set" in c && c.set(this, f, "value") !== b || (this.value = f))
            })) : f ? (c = K.valHooks[f.nodeName.toLowerCase()] || K.valHooks[f.type]) && "get" in c && (d = c.get(f, "value")) !== b ? d : (d = f.value,
                "string" == typeof d ? d.replace(U, "") : null == d ? "" : d) : void 0
        }
    }),
    K.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text
                }
            },
            select: {
                get: function(a) {
                    var b, c, d, e, f = a.selectedIndex,
                        g = [],
                        h = a.options,
                        i = "select-one" === a.type;
                    if (f < 0) return null;
                    for (c = i ? f : 0,
                    d = i ? f + 1 : h.length; c < d; c++)
                    if (e = h[c],
                    e.selected && (K.support.optDisabled ? !e.disabled : null === e.getAttribute("disabled")) && (!e.parentNode.disabled || !K.nodeName(e.parentNode, "optgroup"))) {
                        if (b = K(e).val(),
                        i) return b;
                        g.push(b)
                    }
                    return i && !g.length && h.length ? K(h[f]).val() : g
                },
                set: function(a, b) {
                    var c = K.makeArray(b);
                    return K(a).find("option").each(function() {
                        this.selected = K.inArray(K(this).val(), c) >= 0
                    }),
                    c.length || (a.selectedIndex = -1),
                    c
                }
            }
        },
        attrFn: {
            val: !0,
            css: !0,
            html: !0,
            text: !0,
            data: !0,
            width: !0,
            height: !0,
            offset: !0
        },
        attr: function(a, c, d, e) {
            var f, g, h, i = a.nodeType;
            if (a && 3 !== i && 8 !== i && 2 !== i) return e && c in K.attrFn ? K(a)[c](d) : void 0 === a.getAttribute ? K.prop(a, c, d) : ((h = 1 !== i || !K.isXMLDoc(a)) && (c = c.toLowerCase(),
            g = K.attrHooks[c] || (Y.test(c) ? Q : P)),
            d !== b ? null === d ? void K.removeAttr(a, c) : g && "set" in g && h && (f = g.set(a, d, c)) !== b ? f : (a.setAttribute(c, "" + d),
            d) : g && "get" in g && h && null !== (f = g.get(a, c)) ? f : (f = a.getAttribute(c),
            null === f ? b : f))
        },
        removeAttr: function(a, b) {
            var c, d, e, f, g = 0;
            if (b && 1 === a.nodeType) for (d = b.toLowerCase().split(T),
            f = d.length; g < f; g++)
            (e = d[g]) && (c = K.propFix[e] || e,
            K.attr(a, e, ""),
            a.removeAttribute(Z ? e : c),
            Y.test(e) && c in a && (a[c] = !1))
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (V.test(a.nodeName) && a.parentNode) K.error("type property can't be changed");
                    else if (!K.support.radioValue && "radio" === b && K.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b),
                        c && (a.value = c),
                        b
                    }
                }
            },
            value: {
                get: function(a, b) {
                    return P && K.nodeName(a, "button") ? P.get(a, b) : b in a ? a.value : null
                },
                set: function(a, b, c) {
                    if (P && K.nodeName(a, "button")) return P.set(a, b, c);
                    a.value = b
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            for: "htmlFor",
            class: "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(a, c, d) {
            var e, f, g = a.nodeType;
            if (a && 3 !== g && 8 !== g && 2 !== g) return (1 !== g || !K.isXMLDoc(a)) && (c = K.propFix[c] || c,
            f = K.propHooks[c]),
            d !== b ? f && "set" in f && (e = f.set(a, d, c)) !== b ? e : a[c] = d : f && "get" in f && null !== (e = f.get(a, c)) ? e : a[c]
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var c = a.getAttributeNode("tabindex");
                    return c && c.specified ? parseInt(c.value, 10) : W.test(a.nodeName) || X.test(a.nodeName) && a.href ? 0 : b
                }
            }
        }
    }),
    K.attrHooks.tabindex = K.propHooks.tabIndex,
    Q = {
        get: function(a, c) {
            var d, e = K.prop(a, c);
            return !0 === e || "boolean" != typeof e && (d = a.getAttributeNode(c)) && !1 !== d.nodeValue ? c.toLowerCase() : b
        },
        set: function(a, b, c) {
            var d;
            return !1 === b ? K.removeAttr(a, c) : (d = K.propFix[c] || c,
            d in a && (a[d] = !0),
            a.setAttribute(c, c.toLowerCase())),
            c
        }
    },
    Z || (R = {
        name: !0,
        id: !0
    },
    P = K.valHooks.button = {
        get: function(a, c) {
            var d;
            return d = a.getAttributeNode(c),
            d && (R[c] ? "" !== d.nodeValue : d.specified) ? d.nodeValue : b
        },
        set: function(a, b, c) {
            var d = a.getAttributeNode(c);
            return d || (d = H.createAttribute(c),
            a.setAttributeNode(d)),
            d.nodeValue = b + ""
        }
    },
    K.attrHooks.tabindex.set = P.set,
    K.each(["width", "height"], function(a, b) {
        K.attrHooks[b] = K.extend(K.attrHooks[b], {
            set: function(a, c) {
                if ("" === c) return a.setAttribute(b, "auto"),
                c
            }
        })
    }),
    K.attrHooks.contenteditable = {
        get: P.get,
        set: function(a, b, c) {
            "" === b && (b = "false"),
            P.set(a, b, c)
        }
    }),
    K.support.hrefNormalized || K.each(["href", "src", "width", "height"], function(a, c) {
        K.attrHooks[c] = K.extend(K.attrHooks[c], {
            get: function(a) {
                var d = a.getAttribute(c, 2);
                return null === d ? b : d
            }
        })
    }),
    K.support.style || (K.attrHooks.style = {
        get: function(a) {
            return a.style.cssText.toLowerCase() || b
        },
        set: function(a, b) {
            return a.style.cssText = "" + b
        }
    }),
    K.support.optSelected || (K.propHooks.selected = K.extend(K.propHooks.selected, {
        get: function(a) {
            var b = a.parentNode;
            return b && (b.selectedIndex,
            b.parentNode && b.parentNode.selectedIndex),
            null
        }
    })),
    K.support.enctype || (K.propFix.enctype = "encoding"),
    K.support.checkOn || K.each(["radio", "checkbox"], function() {
        K.valHooks[this] = {
            get: function(a) {
                return null === a.getAttribute("value") ? "on" : a.value
            }
        }
    }),
    K.each(["radio", "checkbox"], function() {
        K.valHooks[this] = K.extend(K.valHooks[this], {
            set: function(a, b) {
                if (K.isArray(b)) return a.checked = K.inArray(K(a).val(), b) >= 0
            }
        })
    });
    var $ = /^(?:textarea|input|select)$/i,
        _ = /^([^\.]*)?(?:\.(.+))?$/,
        aa = /\bhover(\.\S+)?\b/,
        ba = /^key/,
        ca = /^(?:mouse|contextmenu)|click/,
        da = /^(?:focusinfocus|focusoutblur)$/,
        ea = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
        fa = function(a) {
            var b = ea.exec(a);
            return b && (b[1] = (b[1] || "").toLowerCase(),
            b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)")),
            b
        }, ga = function(a, b) {
            var c = a.attributes || {};
            return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c.class || {}).value))
        }, ha = function(a) {
            return K.event.special.hover ? a : a.replace(aa, "mouseenter$1 mouseleave$1")
        };
    K.event = {
        add: function(a, c, d, e, f) {
            var g, h, i, j, k, l, m, n, o, p, q;
            if (3 !== a.nodeType && 8 !== a.nodeType && c && d && (g = K._data(a))) {
                for (d.handler && (o = d,
                d = o.handler),
                d.guid || (d.guid = K.guid++),
                i = g.events,
                i || (g.events = i = {}),
                h = g.handle,
                h || (g.handle = h = function(a) {
                    return void 0 === K || a && K.event.triggered === a.type ? b : K.event.dispatch.apply(h.elem, arguments)
                },
                h.elem = a),
                c = K.trim(ha(c)).split(" "),
                j = 0; j < c.length; j++)
                k = _.exec(c[j]) || [],
                l = k[1],
                m = (k[2] || "").split(".").sort(),
                q = K.event.special[l] || {},
                l = (f ? q.delegateType : q.bindType) || l,
                q = K.event.special[l] || {},
                n = K.extend({
                    type: l,
                    origType: k[1],
                    data: e,
                    handler: d,
                    guid: d.guid,
                    selector: f,
                    quick: fa(f),
                    namespace: m.join(".")
                }, o),
                p = i[l],
                p || (p = i[l] = [],
                p.delegateCount = 0,
                q.setup && !1 !== q.setup.call(a, e, m, h) || (a.addEventListener ? a.addEventListener(l, h, !1) : a.attachEvent && a.attachEvent("on" + l, h))),
                q.add && (q.add.call(a, n),
                n.handler.guid || (n.handler.guid = d.guid)),
                f ? p.splice(p.delegateCount++, 0, n) : p.push(n),
                K.event.global[l] = !0;
                a = null
            }
        },
        global: {},
        remove: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q, r = K.hasData(a) && K._data(a);
            if (r && (m = r.events)) {
                for (b = K.trim(ha(b || "")).split(" "),
                f = 0; f < b.length; f++)
                if (g = _.exec(b[f]) || [],
                h = i = g[1],
                j = g[2],
                h) {
                    for (n = K.event.special[h] || {},
                    h = (d ? n.delegateType : n.bindType) || h,
                    p = m[h] || [],
                    k = p.length,
                    j = j ? new RegExp("(^|\\.)" + j.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null,
                    l = 0; l < p.length; l++)
                    q = p[l], (e || i === q.origType) && (!c || c.guid === q.guid) && (!j || j.test(q.namespace)) && (!d || d === q.selector || "**" === d && q.selector) && (p.splice(l--, 1),
                    q.selector && p.delegateCount--,
                    n.remove && n.remove.call(a, q));
                    0 === p.length && k !== p.length && ((!n.teardown || !1 === n.teardown.call(a, j)) && K.removeEvent(a, h, r.handle),
                    delete m[h])
                } else for (h in m)
                K.event.remove(a, h + b[f], c, d, !0);
                K.isEmptyObject(m) && (o = r.handle,
                o && (o.elem = null),
                K.removeData(a, ["events", "handle"], !0))
            }
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function(c, d, e, f) {
            if (!e || 3 !== e.nodeType && 8 !== e.nodeType) {
                var g, h, i, j, k, l, m, n, o, p, q = c.type || c,
                    r = [];
                if (da.test(q + K.event.triggered)) return;
                if (q.indexOf("!") >= 0 && (q = q.slice(0, -1),
                h = !0),
                q.indexOf(".") >= 0 && (r = q.split("."),
                q = r.shift(),
                r.sort()), (!e || K.event.customEvent[q]) && !K.event.global[q]) return;
                if (c = "object" == typeof c ? c[K.expando] ? c : new K.Event(q, c) : new K.Event(q),
                c.type = q,
                c.isTrigger = !0,
                c.exclusive = h,
                c.namespace = r.join("."),
                c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + r.join("\\.(?:.*\\.)?") + "(\\.|$)") : null,
                l = q.indexOf(":") < 0 ? "on" + q : "", !e) {
                    g = K.cache;
                    for (i in g)
                    g[i].events && g[i].events[q] && K.event.trigger(c, d, g[i].handle.elem, !0);
                    return
                }
                if (c.result = b,
                c.target || (c.target = e),
                d = null != d ? K.makeArray(d) : [],
                d.unshift(c),
                m = K.event.special[q] || {},
                m.trigger && !1 === m.trigger.apply(e, d)) return;
                if (o = [
                    [e, m.bindType || q]
                ], !f && !m.noBubble && !K.isWindow(e)) {
                    for (p = m.delegateType || q,
                    j = da.test(p + q) ? e : e.parentNode,
                    k = null; j; j = j.parentNode)
                    o.push([j, p]),
                    k = j;
                    k && k === e.ownerDocument && o.push([k.defaultView || k.parentWindow || a, p])
                }
                for (i = 0; i < o.length && !c.isPropagationStopped(); i++)
                j = o[i][0],
                c.type = o[i][1],
                n = (K._data(j, "events") || {})[c.type] && K._data(j, "handle"),
                n && n.apply(j, d), (n = l && j[l]) && K.acceptData(j) && !1 === n.apply(j, d) && c.preventDefault();
                return c.type = q, !f && !c.isDefaultPrevented() && (!m._default || !1 === m._default.apply(e.ownerDocument, d)) && ("click" !== q || !K.nodeName(e, "a")) && K.acceptData(e) && l && e[q] && ("focus" !== q && "blur" !== q || 0 !== c.target.offsetWidth) && !K.isWindow(e) && (k = e[l],
                k && (e[l] = null),
                K.event.triggered = q,
                e[q](),
                K.event.triggered = b,
                k && (e[l] = k)),
                c.result
            }
        },
        dispatch: function(c) {
            c = K.event.fix(c || a.event);
            var d, e, f, g, h, i, j, k, l, m, n = (K._data(this, "events") || {})[c.type] || [],
                o = n.delegateCount,
                p = [].slice.call(arguments, 0),
                q = !c.exclusive && !c.namespace,
                r = [];
            if (p[0] = c,
            c.delegateTarget = this,
            o && !c.target.disabled && (!c.button || "click" !== c.type)) for (g = K(this),
            g.context = this.ownerDocument || this,
            f = c.target; f != this; f = f.parentNode || this) {
                for (i = {},
                k = [],
                g[0] = f,
                d = 0; d < o; d++)
                l = n[d],
                m = l.selector,
                i[m] === b && (i[m] = l.quick ? ga(f, l.quick) : g.is(m)),
                i[m] && k.push(l);
                k.length && r.push({
                    elem: f,
                    matches: k
                })
            }
            for (n.length > o && r.push({
                elem: this,
                matches: n.slice(o)
            }),
            d = 0; d < r.length && !c.isPropagationStopped(); d++)
            for (j = r[d],
            c.currentTarget = j.elem,
            e = 0; e < j.matches.length && !c.isImmediatePropagationStopped(); e++)
            l = j.matches[e], (q || !c.namespace && !l.namespace || c.namespace_re && c.namespace_re.test(l.namespace)) && (c.data = l.data,
            c.handleObj = l, (h = ((K.event.special[l.origType] || {}).handle || l.handler).apply(j.elem, p)) !== b && (c.result = h, !1 === h && (c.preventDefault(),
            c.stopPropagation())));
            return c.result
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode),
                a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, c) {
                var d, e, f, g = c.button,
                    h = c.fromElement;
                return null == a.pageX && null != c.clientX && (d = a.target.ownerDocument || H,
                e = d.documentElement,
                f = d.body,
                a.pageX = c.clientX + (e && e.scrollLeft || f && f.scrollLeft || 0) - (e && e.clientLeft || f && f.clientLeft || 0),
                a.pageY = c.clientY + (e && e.scrollTop || f && f.scrollTop || 0) - (e && e.clientTop || f && f.clientTop || 0)), !a.relatedTarget && h && (a.relatedTarget = h === a.target ? c.toElement : h), !a.which && g !== b && (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0),
                a
            }
        },
        fix: function(a) {
            if (a[K.expando]) return a;
            var c, d, e = a,
                f = K.event.fixHooks[a.type] || {}, g = f.props ? this.props.concat(f.props) : this.props;
            for (a = K.Event(e),
            c = g.length; c;)
            d = g[--c],
            a[d] = e[d];
            return a.target || (a.target = e.srcElement || H),
            3 === a.target.nodeType && (a.target = a.target.parentNode),
            a.metaKey === b && (a.metaKey = a.ctrlKey),
            f.filter ? f.filter(a, e) : a
        },
        special: {
            ready: {
                setup: K.bindReady
            },
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(a, b, c) {
                    K.isWindow(this) && (this.onbeforeunload = c)
                },
                teardown: function(a, b) {
                    this.onbeforeunload === b && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function(a, b, c, d) {
            var e = K.extend(new K.Event, c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? K.event.trigger(e, null, b) : K.event.dispatch.call(b, e),
            e.isDefaultPrevented() && c.preventDefault()
        }
    },
    K.event.handle = K.event.dispatch,
    K.removeEvent = H.removeEventListener ? function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function(a, b, c) {
        a.detachEvent && a.detachEvent("on" + b, c)
    },
    K.Event = function(a, b) {
        if (!(this instanceof K.Event)) return new K.Event(a, b);
        a && a.type ? (this.originalEvent = a,
        this.type = a.type,
        this.isDefaultPrevented = a.defaultPrevented || !1 === a.returnValue || a.getPreventDefault && a.getPreventDefault() ? B : C) : this.type = a,
        b && K.extend(this, b),
        this.timeStamp = a && a.timeStamp || K.now(),
        this[K.expando] = !0
    },
    K.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = B;
            var a = this.originalEvent;
            !a || (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        },
        stopPropagation: function() {
            this.isPropagationStopped = B;
            var a = this.originalEvent;
            !a || (a.stopPropagation && a.stopPropagation(),
            a.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = B,
            this.stopPropagation()
        },
        isDefaultPrevented: C,
        isPropagationStopped: C,
        isImmediatePropagationStopped: C
    },
    K.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(a, b) {
        K.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c, d = this,
                    e = a.relatedTarget,
                    f = a.handleObj;
                f.selector;
                return e && (e === d || K.contains(d, e)) || (a.type = f.origType,
                c = f.handler.apply(this, arguments),
                a.type = b),
                c
            }
        }
    }),
    K.support.submitBubbles || (K.event.special.submit = {
        setup: function() {
            if (K.nodeName(this, "form")) return !1;
            K.event.add(this, "click._submit keypress._submit", function(a) {
                var c = a.target,
                    d = K.nodeName(c, "input") || K.nodeName(c, "button") ? c.form : b;
                d && !d._submit_attached && (K.event.add(d, "submit._submit", function(a) {
                    this.parentNode && !a.isTrigger && K.event.simulate("submit", this.parentNode, a, !0)
                }),
                d._submit_attached = !0)
            })
        },
        teardown: function() {
            if (K.nodeName(this, "form")) return !1;
            K.event.remove(this, "._submit")
        }
    }),
    K.support.changeBubbles || (K.event.special.change = {
        setup: function() {
            if ($.test(this.nodeName)) return "checkbox" !== this.type && "radio" !== this.type || (K.event.add(this, "propertychange._change", function(a) {
                "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
            }),
            K.event.add(this, "click._change", function(a) {
                this._just_changed && !a.isTrigger && (this._just_changed = !1,
                K.event.simulate("change", this, a, !0))
            })), !1;
            K.event.add(this, "beforeactivate._change", function(a) {
                var b = a.target;
                $.test(b.nodeName) && !b._change_attached && (K.event.add(b, "change._change", function(a) {
                    this.parentNode && !a.isSimulated && !a.isTrigger && K.event.simulate("change", this.parentNode, a, !0)
                }),
                b._change_attached = !0)
            })
        },
        handle: function(a) {
            var b = a.target;
            if (this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type) return a.handleObj.handler.apply(this, arguments)
        },
        teardown: function() {
            return K.event.remove(this, "._change"),
            $.test(this.nodeName)
        }
    }),
    K.support.focusinBubbles || K.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var c = 0,
            d = function(a) {
                K.event.simulate(b, a.target, K.event.fix(a), !0)
            };
        K.event.special[b] = {
            setup: function() {
                0 == c++ && H.addEventListener(a, d, !0)
            },
            teardown: function() {
                0 == --c && H.removeEventListener(a, d, !0)
            }
        }
    }),
    K.fn.extend({
        on: function(a, c, d, e, f) {
            var g, h;
            if ("object" == typeof a) {
                "string" != typeof c && (d = c,
                c = b);
                for (h in a)
                this.on(h, c, d, a[h], f);
                return this
            }
            if (null == d && null == e ? (e = c,
            d = c = b) : null == e && ("string" == typeof c ? (e = d,
            d = b) : (e = d,
            d = c,
            c = b)), !1 === e) e = C;
            else if (!e) return this;
            return 1 === f && (g = e,
            e = function(a) {
                return K().off(a),
                g.apply(this, arguments)
            },
            e.guid = g.guid || (g.guid = K.guid++)),
            this.each(function() {
                K.event.add(this, a, e, d, c)
            })
        },
        one: function(a, b, c, d) {
            return this.on.call(this, a, b, c, d, 1)
        },
        off: function(a, c, d) {
            if (a && a.preventDefault && a.handleObj) {
                var e = a.handleObj;
                return K(a.delegateTarget).off(e.namespace ? e.type + "." + e.namespace : e.type, e.selector, e.handler),
                this
            }
            if ("object" == typeof a) {
                for (var f in a)
                this.off(f, c, a[f]);
                return this
            }
            return !1 !== c && "function" != typeof c || (d = c,
            c = b), !1 === d && (d = C),
            this.each(function() {
                K.event.remove(this, a, d, c)
            })
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function(a, b) {
            return this.off(a, null, b)
        },
        live: function(a, b, c) {
            return K(this.context).on(a, this.selector, b, c),
            this
        },
        die: function(a, b) {
            return K(this.context).off(a, this.selector || "**", b),
            this
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d)
        },
        undelegate: function(a, b, c) {
            return 1 == arguments.length ? this.off(a, "**") : this.off(b, a, c)
        },
        trigger: function(a, b) {
            return this.each(function() {
                K.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, b) {
            if (this[0]) return K.event.trigger(a, b, this[0], !0)
        },
        toggle: function(a) {
            var b = arguments,
                c = a.guid || K.guid++,
                d = 0,
                e = function(c) {
                    var e = (K._data(this, "lastToggle" + a.guid) || 0) % d;
                    return K._data(this, "lastToggle" + a.guid, e + 1),
                    c.preventDefault(),
                    b[e].apply(this, arguments) || !1
                };
            for (e.guid = c; d < b.length;)
            b[d++].guid = c;
            return this.click(e)
        },
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    }),
    K.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        K.fn[b] = function(a, c) {
            return null == c && (c = a,
            a = null),
            arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        },
        K.attrFn && (K.attrFn[b] = !0),
        ba.test(b) && (K.event.fixHooks[b] = K.event.keyHooks),
        ca.test(b) && (K.event.fixHooks[b] = K.event.mouseHooks)
    }),

    function() {
        function a(a, b, c, d, f, g) {
            for (var h = 0, i = d.length; h < i; h++) {
                var j = d[h];
                if (j) {
                    var k = !1;
                    for (j = j[a]; j;) {
                        if (j[e] === c) {
                            k = d[j.sizset];
                            break
                        }
                        if (1 === j.nodeType) if (g || (j[e] = c,
                        j.sizset = h),
                            "string" != typeof b) {
                            if (j === b) {
                                k = !0;
                                break
                            }
                        } else if (m.filter(b, [j]).length > 0) {
                            k = j;
                            break
                        }
                        j = j[a]
                    }
                    d[h] = k
                }
            }
        }

        function c(a, b, c, d, f, g) {
            for (var h = 0, i = d.length; h < i; h++) {
                var j = d[h];
                if (j) {
                    var k = !1;
                    for (j = j[a]; j;) {
                        if (j[e] === c) {
                            k = d[j.sizset];
                            break
                        }
                        if (1 === j.nodeType && !g && (j[e] = c,
                        j.sizset = h),
                        j.nodeName.toLowerCase() === b) {
                            k = j;
                            break
                        }
                        j = j[a]
                    }
                    d[h] = k
                }
            }
        }
        var d = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
            e = "sizcache" + (Math.random() + "").replace(".", ""),
            f = 0,
            g = Object.prototype.toString,
            h = !1,
            i = !0,
            j = /\\/g,
            k = /\r\n/g,
            l = /\W/;
        [0, 0].sort(function() {
            return i = !1,
            0
        });
        var m = function(a, b, c, e) {
            c = c || [],
            b = b || H;
            var f = b;
            if (1 !== b.nodeType && 9 !== b.nodeType) return [];
            if (!a || "string" != typeof a) return c;
            var h, i, j, k, l, n, q, r, t = !0,
                u = m.isXML(b),
                w = [],
                x = a;
            do {
                if (d.exec(""), (h = d.exec(x)) && (x = h[3],
                w.push(h[1]),
                h[2])) {
                    k = h[3];
                    break
                }
            } while (h);
            if (w.length > 1 && p.exec(a)) if (2 === w.length && o.relative[w[0]]) i = v(w[0] + w[1], b, e);
            else for (i = o.relative[w[0]] ? [b] : m(w.shift(), b); w.length;)
            a = w.shift(),
            o.relative[a] && (a += w.shift()),
            i = v(a, i, e);
            else if (!e && w.length > 1 && 9 === b.nodeType && !u && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (l = m.find(w.shift(), b, u),
            b = l.expr ? m.filter(l.expr, l.set)[0] : l.set[0]),
            b) for (l = e ? {
                expr: w.pop(),
                set: s(e)
            } : m.find(w.pop(), 1 !== w.length || "~" !== w[0] && "+" !== w[0] || !b.parentNode ? b : b.parentNode, u),
            i = l.expr ? m.filter(l.expr, l.set) : l.set,
            w.length > 0 ? j = s(i) : t = !1; w.length;)
            n = w.pop(),
            q = n,
            o.relative[n] ? q = w.pop() : n = "",
            null == q && (q = b),
            o.relative[n](j, q, u);
            else j = w = [];
            if (j || (j = i),
            j || m.error(n || a),
                "[object Array]" === g.call(j)) if (t) if (b && 1 === b.nodeType) for (r = 0; null != j[r]; r++)
            j[r] && (!0 === j[r] || 1 === j[r].nodeType && m.contains(b, j[r])) && c.push(i[r]);
            else for (r = 0; null != j[r]; r++)
            j[r] && 1 === j[r].nodeType && c.push(i[r]);
            else c.push.apply(c, j);
            else s(j, c);
            return k && (m(k, f, c, e),
            m.uniqueSort(c)),
            c
        };
        m.uniqueSort = function(a) {
            if (t && (h = i,
            a.sort(t),
            h)) for (var b = 1; b < a.length; b++)
            a[b] === a[b - 1] && a.splice(b--, 1);
            return a
        },
        m.matches = function(a, b) {
            return m(a, null, null, b)
        },
        m.matchesSelector = function(a, b) {
            return m(b, null, null, [a]).length > 0
        },
        m.find = function(a, b, c) {
            var d, e, f, g, h, i;
            if (!a) return [];
            for (e = 0,
            f = o.order.length; e < f; e++)
            if (h = o.order[e], (g = o.leftMatch[h].exec(a)) && (i = g[1],
            g.splice(1, 1),
                "\\" !== i.substr(i.length - 1) && (g[1] = (g[1] || "").replace(j, ""),
            null != (d = o.find[h](g, b, c))))) {
                a = a.replace(o.match[h], "");
                break
            }
            return d || (d = void 0 !== b.getElementsByTagName ? b.getElementsByTagName("*") : []), {
                set: d,
                expr: a
            }
        },
        m.filter = function(a, c, d, e) {
            for (var f, g, h, i, j, k, l, n, p, q = a, r = [], s = c, t = c && c[0] && m.isXML(c[0]); a && c.length;) {
                for (h in o.filter)
                if (null != (f = o.leftMatch[h].exec(a)) && f[2]) {
                    if (k = o.filter[h],
                    l = f[1],
                    g = !1,
                    f.splice(1, 1),
                        "\\" === l.substr(l.length - 1)) continue;
                    if (s === r && (r = []),
                    o.preFilter[h]) if (f = o.preFilter[h](f, s, d, r, e, t)) {
                        if (!0 === f) continue
                    } else g = i = !0;
                    if (f) for (n = 0; null != (j = s[n]); n++)
                    j && (i = k(j, f, n, s),
                    p = e ^ i,
                    d && null != i ? p ? g = !0 : s[n] = !1 : p && (r.push(j),
                    g = !0));
                    if (i !== b) {
                        if (d || (s = r),
                        a = a.replace(o.match[h], ""), !g) return [];
                        break
                    }
                }
                if (a === q) {
                    if (null != g) break;
                    m.error(a)
                }
                q = a
            }
            return s
        },
        m.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        };
        var n = m.getText = function(a) {
            var b, c, d = a.nodeType,
                e = "";
            if (d) {
                if (1 === d || 9 === d) {
                    if ("string" == typeof a.textContent) return a.textContent;
                    if ("string" == typeof a.innerText) return a.innerText.replace(k, "");
                    for (a = a.firstChild; a; a = a.nextSibling)
                    e += n(a)
                } else if (3 === d || 4 === d) return a.nodeValue
            } else for (b = 0; c = a[b]; b++)
            8 !== c.nodeType && (e += n(c));
            return e
        }, o = m.selectors = {
            order: ["ID", "NAME", "TAG"],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {
                class: "className",
                for: "htmlFor"
            },
            attrHandle: {
                href: function(a) {
                    return a.getAttribute("href")
                },
                type: function(a) {
                    return a.getAttribute("type")
                }
            },
            relative: {
                "+": function(a, b) {
                    var c = "string" == typeof b,
                        d = c && !l.test(b),
                        e = c && !d;
                    d && (b = b.toLowerCase());
                    for (var f, g = 0, h = a.length; g < h; g++)
                    if (f = a[g]) {
                        for (;
                        (f = f.previousSibling) && 1 !== f.nodeType;);
                        a[g] = e || f && f.nodeName.toLowerCase() === b ? f || !1 : f === b
                    }
                    e && m.filter(b, a, !0)
                },
                ">": function(a, b) {
                    var c, d = "string" == typeof b,
                        e = 0,
                        f = a.length;
                    if (d && !l.test(b)) {
                        for (b = b.toLowerCase(); e < f; e++)
                        if (c = a[e]) {
                            var g = c.parentNode;
                            a[e] = g.nodeName.toLowerCase() === b && g
                        }
                    } else {
                        for (; e < f; e++)
                        (c = a[e]) && (a[e] = d ? c.parentNode : c.parentNode === b);
                        d && m.filter(b, a, !0)
                    }
                },
                "": function(b, d, e) {
                    var g, h = f++,
                        i = a;
                    "string" == typeof d && !l.test(d) && (d = d.toLowerCase(),
                    g = d,
                    i = c),
                    i("parentNode", d, h, b, g, e)
                },
                "~": function(b, d, e) {
                    var g, h = f++,
                        i = a;
                    "string" == typeof d && !l.test(d) && (d = d.toLowerCase(),
                    g = d,
                    i = c),
                    i("previousSibling", d, h, b, g, e)
                }
            },
            find: {
                ID: function(a, b, c) {
                    if (void 0 !== b.getElementById && !c) {
                        var d = b.getElementById(a[1]);
                        return d && d.parentNode ? [d] : []
                    }
                },
                NAME: function(a, b) {
                    if (void 0 !== b.getElementsByName) {
                        for (var c = [], d = b.getElementsByName(a[1]), e = 0, f = d.length; e < f; e++)
                        d[e].getAttribute("name") === a[1] && c.push(d[e]);
                        return 0 === c.length ? null : c
                    }
                },
                TAG: function(a, b) {
                    if (void 0 !== b.getElementsByTagName) return b.getElementsByTagName(a[1])
                }
            },
            preFilter: {
                CLASS: function(a, b, c, d, e, f) {
                    if (a = " " + a[1].replace(j, "") + " ",
                    f) return a;
                    for (var g, h = 0; null != (g = b[h]); h++)
                    g && (e ^ (g.className && (" " + g.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(g) : c && (b[h] = !1));
                    return !1
                },
                ID: function(a) {
                    return a[1].replace(j, "")
                },
                TAG: function(a, b) {
                    return a[1].replace(j, "").toLowerCase()
                },
                CHILD: function(a) {
                    if ("nth" === a[1]) {
                        a[2] || m.error(a[0]),
                        a[2] = a[2].replace(/^\+|\s*/g, "");
                        var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec("even" === a[2] && "2n" || "odd" === a[2] && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                        a[2] = b[1] + (b[2] || 1) - 0,
                        a[3] = b[3] - 0
                    } else a[2] && m.error(a[0]);
                    return a[0] = f++,
                    a
                },
                ATTR: function(a, b, c, d, e, f) {
                    var g = a[1] = a[1].replace(j, "");
                    return !f && o.attrMap[g] && (a[1] = o.attrMap[g]),
                    a[4] = (a[4] || a[5] || "").replace(j, ""),
                        "~=" === a[2] && (a[4] = " " + a[4] + " "),
                    a
                },
                PSEUDO: function(a, b, c, e, f) {
                    if ("not" === a[1]) {
                        if (!((d.exec(a[3]) || "").length > 1 || /^\w/.test(a[3]))) {
                            var g = m.filter(a[3], b, c, !0 ^ f);
                            return c || e.push.apply(e, g), !1
                        }
                        a[3] = m(a[3], null, null, b)
                    } else if (o.match.POS.test(a[0]) || o.match.CHILD.test(a[0])) return !0;
                    return a
                },
                POS: function(a) {
                    return a.unshift(!0),
                    a
                }
            },
            filters: {
                enabled: function(a) {
                    return !1 === a.disabled && "hidden" !== a.type
                },
                disabled: function(a) {
                    return !0 === a.disabled
                },
                checked: function(a) {
                    return !0 === a.checked
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex, !0 === a.selected
                },
                parent: function(a) {
                    return !!a.firstChild
                },
                empty: function(a) {
                    return !a.firstChild
                },
                has: function(a, b, c) {
                    return !!m(c[3], a).length
                },
                header: function(a) {
                    return /h\d/i.test(a.nodeName)
                },
                text: function(a) {
                    var b = a.getAttribute("type"),
                        c = a.type;
                    return "input" === a.nodeName.toLowerCase() && "text" === c && (b === c || null === b)
                },
                radio: function(a) {
                    return "input" === a.nodeName.toLowerCase() && "radio" === a.type
                },
                checkbox: function(a) {
                    return "input" === a.nodeName.toLowerCase() && "checkbox" === a.type
                },
                file: function(a) {
                    return "input" === a.nodeName.toLowerCase() && "file" === a.type
                },
                password: function(a) {
                    return "input" === a.nodeName.toLowerCase() && "password" === a.type
                },
                submit: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return ("input" === b || "button" === b) && "submit" === a.type
                },
                image: function(a) {
                    return "input" === a.nodeName.toLowerCase() && "image" === a.type
                },
                reset: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return ("input" === b || "button" === b) && "reset" === a.type
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                },
                input: function(a) {
                    return /input|select|textarea|button/i.test(a.nodeName)
                },
                focus: function(a) {
                    return a === a.ownerDocument.activeElement
                }
            },
            setFilters: {
                first: function(a, b) {
                    return 0 === b
                },
                last: function(a, b, c, d) {
                    return b === d.length - 1
                },
                even: function(a, b) {
                    return b % 2 == 0
                },
                odd: function(a, b) {
                    return b % 2 == 1
                },
                lt: function(a, b, c) {
                    return b < c[3] - 0
                },
                gt: function(a, b, c) {
                    return b > c[3] - 0
                },
                nth: function(a, b, c) {
                    return c[3] - 0 === b
                },
                eq: function(a, b, c) {
                    return c[3] - 0 === b
                }
            },
            filter: {
                PSEUDO: function(a, b, c, d) {
                    var e = b[1],
                        f = o.filters[e];
                    if (f) return f(a, c, b, d);
                    if ("contains" === e) return (a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0;
                    if ("not" === e) {
                        for (var g = b[3], h = 0, i = g.length; h < i; h++)
                        if (g[h] === a) return !1;
                        return !0
                    }
                    m.error(e)
                },
                CHILD: function(a, b) {
                    var c, d, f, g, h, i, j = b[1],
                        k = a;
                    switch (j) {
                        case "only":
                        case "first":
                            for (; k = k.previousSibling;)
                            if (1 === k.nodeType) return !1;
                            if ("first" === j) return !0;
                            k = a;
                        case "last":
                            for (; k = k.nextSibling;)
                            if (1 === k.nodeType) return !1;
                            return !0;
                        case "nth":
                            if (c = b[2],
                            d = b[3],
                            1 === c && 0 === d) return !0;
                            if (f = b[0], (g = a.parentNode) && (g[e] !== f || !a.nodeIndex)) {
                                for (h = 0,
                                k = g.firstChild; k; k = k.nextSibling)
                                1 === k.nodeType && (k.nodeIndex = ++h);
                                g[e] = f
                            }
                            return i = a.nodeIndex - d,
                            0 === c ? 0 === i : i % c == 0 && i / c >= 0
                    }
                },
                ID: function(a, b) {
                    return 1 === a.nodeType && a.getAttribute("id") === b
                },
                TAG: function(a, b) {
                    return "*" === b && 1 === a.nodeType || !! a.nodeName && a.nodeName.toLowerCase() === b
                },
                CLASS: function(a, b) {
                    return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
                },
                ATTR: function(a, b) {
                    var c = b[1],
                        d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : null != a[c] ? a[c] : a.getAttribute(c),
                        e = d + "",
                        f = b[2],
                        g = b[4];
                    return null == d ? "!=" === f : !f && m.attr ? null != d : "=" === f ? e === g : "*=" === f ? e.indexOf(g) >= 0 : "~=" === f ? (" " + e + " ").indexOf(g) >= 0 : g ? "!=" === f ? e !== g : "^=" === f ? 0 === e.indexOf(g) : "$=" === f ? e.substr(e.length - g.length) === g : "|=" === f && (e === g || e.substr(0, g.length + 1) === g + "-") : e && !1 !== d
                },
                POS: function(a, b, c, d) {
                    var e = b[2],
                        f = o.setFilters[e];
                    if (f) return f(a, c, b, d)
                }
            }
        }, p = o.match.POS,
            q = function(a, b) {
                return "\\" + (b - 0 + 1)
            };
        for (var r in o.match)
        o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source),
        o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
        var s = function(a, b) {
            return a = Array.prototype.slice.call(a, 0),
            b ? (b.push.apply(b, a),
            b) : a
        };
        try {
            Array.prototype.slice.call(H.documentElement.childNodes, 0)[0].nodeType
        } catch (a) {
            s = function(a, b) {
                var c = 0,
                    d = b || [];
                if ("[object Array]" === g.call(a)) Array.prototype.push.apply(d, a);
                else if ("number" == typeof a.length) for (var e = a.length; c < e; c++)
                d.push(a[c]);
                else for (; a[c]; c++)
                d.push(a[c]);
                return d
            }
        }
        var t, u;
        H.documentElement.compareDocumentPosition ? t = function(a, b) {
            return a === b ? (h = !0,
            0) : a.compareDocumentPosition && b.compareDocumentPosition ? 4 & a.compareDocumentPosition(b) ? -1 : 1 : a.compareDocumentPosition ? -1 : 1
        } : (t = function(a, b) {
            if (a === b) return h = !0,
            0;
            if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
            var c, d, e = [],
                f = [],
                g = a.parentNode,
                i = b.parentNode,
                j = g;
            if (g === i) return u(a, b);
            if (!g) return -1;
            if (!i) return 1;
            for (; j;)
            e.unshift(j),
            j = j.parentNode;
            for (j = i; j;)
            f.unshift(j),
            j = j.parentNode;
            c = e.length,
            d = f.length;
            for (var k = 0; k < c && k < d; k++)
            if (e[k] !== f[k]) return u(e[k], f[k]);
            return k === c ? u(a, f[k], -1) : u(e[k], b, 1)
        },
        u = function(a, b, c) {
            if (a === b) return c;
            for (var d = a.nextSibling; d;) {
                if (d === b) return -1;
                d = d.nextSibling
            }
            return 1
        }),

        function() {
            var a = H.createElement("div"),
                c = "script" + (new Date).getTime(),
                d = H.documentElement;
            a.innerHTML = "<a name='" + c + "'/>",
            d.insertBefore(a, d.firstChild),
            H.getElementById(c) && (o.find.ID = function(a, c, d) {
                if (void 0 !== c.getElementById && !d) {
                    var e = c.getElementById(a[1]);
                    return e ? e.id === a[1] || void 0 !== e.getAttributeNode && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
                }
            },
            o.filter.ID = function(a, b) {
                var c = void 0 !== a.getAttributeNode && a.getAttributeNode("id");
                return 1 === a.nodeType && c && c.nodeValue === b
            }),
            d.removeChild(a),
            d = a = null
        }(),

        function() {
            var a = H.createElement("div");
            a.appendChild(H.createComment("")),
            a.getElementsByTagName("*").length > 0 && (o.find.TAG = function(a, b) {
                var c = b.getElementsByTagName(a[1]);
                if ("*" === a[1]) {
                    for (var d = [], e = 0; c[e]; e++)
                    1 === c[e].nodeType && d.push(c[e]);
                    c = d
                }
                return c
            }),
            a.innerHTML = "<a href='#'></a>",
            a.firstChild && void 0 !== a.firstChild.getAttribute && "#" !== a.firstChild.getAttribute("href") && (o.attrHandle.href = function(a) {
                return a.getAttribute("href", 2)
            }),
            a = null
        }(),
        H.querySelectorAll && function() {
            var a = m,
                b = H.createElement("div");
            if (b.innerHTML = "<p class='TEST'></p>", !b.querySelectorAll || 0 !== b.querySelectorAll(".TEST").length) {
                m = function(b, c, d, e) {
                    if (c = c || H, !e && !m.isXML(c)) {
                        var f = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
                        if (f && (1 === c.nodeType || 9 === c.nodeType)) {
                            if (f[1]) return s(c.getElementsByTagName(b), d);
                            if (f[2] && o.find.CLASS && c.getElementsByClassName) return s(c.getElementsByClassName(f[2]), d)
                        }
                        if (9 === c.nodeType) {
                            if ("body" === b && c.body) return s([c.body], d);
                            if (f && f[3]) {
                                var g = c.getElementById(f[3]);
                                if (!g || !g.parentNode) return s([], d);
                                if (g.id === f[3]) return s([g], d)
                            }
                            try {
                                return s(c.querySelectorAll(b), d)
                            } catch (a) {}
                        } else if (1 === c.nodeType && "object" !== c.nodeName.toLowerCase()) {
                            var h = c,
                                i = c.getAttribute("id"),
                                j = i || "__sizzle__",
                                k = c.parentNode,
                                l = /^\s*[+~]/.test(b);
                            i ? j = j.replace(/'/g, "\\$&") : c.setAttribute("id", j),
                            l && k && (c = c.parentNode);
                            try {
                                if (!l || k) return s(c.querySelectorAll("[id='" + j + "'] " + b), d)
                            } catch (a) {} finally {
                                i || h.removeAttribute("id")
                            }
                        }
                    }
                    return a(b, c, d, e)
                };
                for (var c in a)
                m[c] = a[c];
                b = null
            }
        }(),

        function() {
            var a = H.documentElement,
                b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
            if (b) {
                var c = !b.call(H.createElement("div"), "div"),
                    d = !1;
                try {
                    b.call(H.documentElement, "[test!='']:sizzle")
                } catch (a) {
                    d = !0
                }
                m.matchesSelector = function(a, e) {
                    if (e = e.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']"), !m.isXML(a)) try {
                        if (d || !o.match.PSEUDO.test(e) && !/!=/.test(e)) {
                            var f = b.call(a, e);
                            if (f || !c || a.document && 11 !== a.document.nodeType) return f
                        }
                    } catch (a) {}
                    return m(e, null, null, [a]).length > 0
                }
            }
        }(),

        function() {
            var a = H.createElement("div");
            if (a.innerHTML = "<div class='test e'></div><div class='test'></div>",
            a.getElementsByClassName && 0 !== a.getElementsByClassName("e").length) {
                if (a.lastChild.className = "e",
                1 === a.getElementsByClassName("e").length) return;
                o.order.splice(1, 0, "CLASS"),
                o.find.CLASS = function(a, b, c) {
                    if (void 0 !== b.getElementsByClassName && !c) return b.getElementsByClassName(a[1])
                },
                a = null
            }
        }(),
        H.documentElement.contains ? m.contains = function(a, b) {
            return a !== b && (!a.contains || a.contains(b))
        } : H.documentElement.compareDocumentPosition ? m.contains = function(a, b) {
            return !!(16 & a.compareDocumentPosition(b))
        } : m.contains = function() {
            return !1
        },
        m.isXML = function(a) {
            var b = (a ? a.ownerDocument || a : 0).documentElement;
            return !!b && "HTML" !== b.nodeName
        };
        var v = function(a, b, c) {
            for (var d, e = [], f = "", g = b.nodeType ? [b] : b; d = o.match.PSEUDO.exec(a);)
            f += d[0],
            a = a.replace(o.match.PSEUDO, "");
            a = o.relative[a] ? a + "*" : a;
            for (var h = 0, i = g.length; h < i; h++)
            m(a, g[h], e, c);
            return m.filter(f, e)
        };
        m.attr = K.attr,
        m.selectors.attrMap = {},
        K.find = m,
        K.expr = m.selectors,
        K.expr[":"] = K.expr.filters,
        K.unique = m.uniqueSort,
        K.text = m.getText,
        K.isXMLDoc = m.isXML,
        K.contains = m.contains
    }();
    var ia = /Until$/,
        ja = /^(?:parents|prevUntil|prevAll)/,
        ka = /,/,
        la = /^.[^:#\[\.,]*$/,
        ma = Array.prototype.slice,
        na = K.expr.match.POS,
        oa = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    K.fn.extend({
        find: function(a) {
            var b, c, d = this;
            if ("string" != typeof a) return K(a).filter(function() {
                for (b = 0,
                c = d.length; b < c; b++)
                if (K.contains(d[b], this)) return !0
            });
            var e, f, g, h = this.pushStack("", "find", a);
            for (b = 0,
            c = this.length; b < c; b++)
            if (e = h.length,
            K.find(a, this[b], h),
            b > 0) for (f = e; f < h.length; f++)
            for (g = 0; g < e; g++)
            if (h[g] === h[f]) {
                h.splice(f--, 1);
                break
            }
            return h
        },
        has: function(a) {
            var b = K(a);
            return this.filter(function() {
                for (var a = 0, c = b.length; a < c; a++)
                if (K.contains(this, b[a])) return !0
            })
        },
        not: function(a) {
            return this.pushStack(z(this, a, !1), "not", a)
        },
        filter: function(a) {
            return this.pushStack(z(this, a, !0), "filter", a)
        },
        is: function(a) {
            return !!a && ("string" == typeof a ? na.test(a) ? K(a, this.context).index(this[0]) >= 0 : K.filter(a, this).length > 0 : this.filter(a).length > 0)
        },
        closest: function(a, b) {
            var c, d, e = [],
                f = this[0];
            if (K.isArray(a)) {
                for (var g = 1; f && f.ownerDocument && f !== b;) {
                    for (c = 0; c < a.length; c++)
                    K(f).is(a[c]) && e.push({
                        selector: a[c],
                        elem: f,
                        level: g
                    });
                    f = f.parentNode,
                    g++
                }
                return e
            }
            var h = na.test(a) || "string" != typeof a ? K(a, b || this.context) : 0;
            for (c = 0,
            d = this.length; c < d; c++)
            for (f = this[c]; f;) {
                if (h ? h.index(f) > -1 : K.find.matchesSelector(f, a)) {
                    e.push(f);
                    break
                }
                if (!(f = f.parentNode) || !f.ownerDocument || f === b || 11 === f.nodeType) break
            }
            return e = e.length > 1 ? K.unique(e) : e,
            this.pushStack(e, "closest", a)
        },
        index: function(a) {
            return a ? "string" == typeof a ? K.inArray(this[0], K(a)) : K.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
        },
        add: function(a, b) {
            var c = "string" == typeof a ? K(a, b) : K.makeArray(a && a.nodeType ? [a] : a),
                d = K.merge(this.get(), c);
            return this.pushStack(A(c[0]) || A(d[0]) ? d : K.unique(d))
        },
        andSelf: function() {
            return this.add(this.prevObject)
        }
    }),
    K.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        },
        parents: function(a) {
            return K.dir(a, "parentNode")
        },
        parentsUntil: function(a, b, c) {
            return K.dir(a, "parentNode", c)
        },
        next: function(a) {
            return K.nth(a, 2, "nextSibling")
        },
        prev: function(a) {
            return K.nth(a, 2, "previousSibling")
        },
        nextAll: function(a) {
            return K.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return K.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, c) {
            return K.dir(a, "nextSibling", c)
        },
        prevUntil: function(a, b, c) {
            return K.dir(a, "previousSibling", c)
        },
        siblings: function(a) {
            return K.sibling(a.parentNode.firstChild, a)
        },
        children: function(a) {
            return K.sibling(a.firstChild)
        },
        contents: function(a) {
            return K.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : K.makeArray(a.childNodes)
        }
    }, function(a, b) {
        K.fn[a] = function(c, d) {
            var e = K.map(this, b, c);
            return ia.test(a) || (d = c),
            d && "string" == typeof d && (e = K.filter(d, e)),
            e = this.length > 1 && !oa[a] ? K.unique(e) : e, (this.length > 1 || ka.test(d)) && ja.test(a) && (e = e.reverse()),
            this.pushStack(e, a, ma.call(arguments).join(","))
        }
    }),
    K.extend({
        filter: function(a, b, c) {
            return c && (a = ":not(" + a + ")"),
            1 === b.length ? K.find.matchesSelector(b[0], a) ? [b[0]] : [] : K.find.matches(a, b)
        },
        dir: function(a, c, d) {
            for (var e = [], f = a[c]; f && 9 !== f.nodeType && (d === b || 1 !== f.nodeType || !K(f).is(d));)
            1 === f.nodeType && e.push(f),
            f = f[c];
            return e
        },
        nth: function(a, b, c, d) {
            b = b || 1;
            for (var e = 0; a && (1 !== a.nodeType || ++e !== b); a = a[c]);
            return a
        },
        sibling: function(a, b) {
            for (var c = []; a; a = a.nextSibling)
            1 === a.nodeType && a !== b && c.push(a);
            return c
        }
    });
    var pa = "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        qa = / jQuery\d+="(?:\d+|null)"/g,
        ra = /^\s+/,
        sa = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        ta = /<([\w:]+)/,
        ua = /<tbody/i,
        va = /<|&#?\w+;/,
        wa = /<(?:script|style)/i,
        xa = /<(?:script|object|embed|option|style)/i,
        ya = new RegExp("<(?:" + pa + ")", "i"),
        za = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Aa = /\/(java|ecma)script/i,
        Ba = /^\s*<!(?:\[CDATA\[|\-\-)/,
        Ca = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        }, Da = y(H);
    Ca.optgroup = Ca.option,
    Ca.tbody = Ca.tfoot = Ca.colgroup = Ca.caption = Ca.thead,
    Ca.th = Ca.td,
    K.support.htmlSerialize || (Ca._default = [1, "div<div>", "</div>"]),
    K.fn.extend({
        text: function(a) {
            return K.isFunction(a) ? this.each(function(b) {
                var c = K(this);
                c.text(a.call(this, b, c.text()))
            }) : "object" != typeof a && a !== b ? this.empty().append((this[0] && this[0].ownerDocument || H).createTextNode(a)) : K.text(this)
        },
        wrapAll: function(a) {
            if (K.isFunction(a)) return this.each(function(b) {
                K(this).wrapAll(a.call(this, b))
            });
            if (this[0]) {
                var b = K(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]),
                b.map(function() {
                    for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;)
                    a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            return K.isFunction(a) ? this.each(function(b) {
                K(this).wrapInner(a.call(this, b))
            }) : this.each(function() {
                var b = K(this),
                    c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            var b = K.isFunction(a);
            return this.each(function(c) {
                K(this).wrapAll(b ? a.call(this, c) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                K.nodeName(this, "body") || K(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function() {
            return this.domManip(arguments, !0, function(a) {
                1 === this.nodeType && this.appendChild(a)
            })
        },
        prepend: function() {
            return this.domManip(arguments, !0, function(a) {
                1 === this.nodeType && this.insertBefore(a, this.firstChild)
            })
        },
        before: function() {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function(a) {
                this.parentNode.insertBefore(a, this)
            });
            if (arguments.length) {
                var a = K.clean(arguments);
                return a.push.apply(a, this.toArray()),
                this.pushStack(a, "before", arguments)
            }
        },
        after: function() {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function(a) {
                this.parentNode.insertBefore(a, this.nextSibling)
            });
            if (arguments.length) {
                var a = this.pushStack(this, "after", arguments);
                return a.push.apply(a, K.clean(arguments)),
                a
            }
        },
        remove: function(a, b) {
            for (var c, d = 0; null != (c = this[d]); d++)
            a && !K.filter(a, [c]).length || (!b && 1 === c.nodeType && (K.cleanData(c.getElementsByTagName("*")),
            K.cleanData([c])),
            c.parentNode && c.parentNode.removeChild(c));
            return this
        },
        empty: function() {
            for (var a, b = 0; null != (a = this[b]); b++)
            for (1 === a.nodeType && K.cleanData(a.getElementsByTagName("*")); a.firstChild;)
            a.removeChild(a.firstChild);
            return this
        },
        clone: function(a, b) {
            return a = null != a && a,
            b = null == b ? a : b,
            this.map(function() {
                return K.clone(this, a, b)
            })
        },
        html: function(a) {
            if (a === b) return this[0] && 1 === this[0].nodeType ? this[0].innerHTML.replace(qa, "") : null;
            if ("string" != typeof a || wa.test(a) || !K.support.leadingWhitespace && ra.test(a) || Ca[(ta.exec(a) || ["", ""])[1].toLowerCase()]) K.isFunction(a) ? this.each(function(b) {
                var c = K(this);
                c.html(a.call(this, b, c.html()))
            }) : this.empty().append(a);
            else {
                a = a.replace(sa, "<$1></$2>");
                try {
                    for (var c = 0, d = this.length; c < d; c++)
                    1 === this[c].nodeType && (K.cleanData(this[c].getElementsByTagName("*")),
                    this[c].innerHTML = a)
                } catch (b) {
                    this.empty().append(a)
                }
            }
            return this
        },
        replaceWith: function(a) {
            return this[0] && this[0].parentNode ? K.isFunction(a) ? this.each(function(b) {
                var c = K(this),
                    d = c.html();
                c.replaceWith(a.call(this, b, d))
            }) : ("string" != typeof a && (a = K(a).detach()),
            this.each(function() {
                var b = this.nextSibling,
                    c = this.parentNode;
                K(this).remove(),
                b ? K(b).before(a) : K(c).append(a)
            })) : this.length ? this.pushStack(K(K.isFunction(a) ? a() : a), "replaceWith", a) : this
        },
        detach: function(a) {
            return this.remove(a, !0)
        },
        domManip: function(a, c, d) {
            var e, f, g, h, i = a[0],
                j = [];
            if (!K.support.checkClone && 3 === arguments.length && "string" == typeof i && za.test(i)) return this.each(function() {
                K(this).domManip(a, c, d, !0)
            });
            if (K.isFunction(i)) return this.each(function(e) {
                var f = K(this);
                a[0] = i.call(this, e, c ? f.html() : b),
                f.domManip(a, c, d)
            });
            if (this[0]) {
                if (h = i && i.parentNode,
                e = K.support.parentNode && h && 11 === h.nodeType && h.childNodes.length === this.length ? {
                    fragment: h
                } : K.buildFragment(a, this, j),
                g = e.fragment,
                f = 1 === g.childNodes.length ? g = g.firstChild : g.firstChild,
                f) {
                    c = c && K.nodeName(f, "tr");
                    for (var k = 0, l = this.length, m = l - 1; k < l; k++)
                    d.call(c ? x(this[k], f) : this[k], e.cacheable || l > 1 && k < m ? K.clone(g, !0, !0) : g)
                }
                j.length && K.each(j, q)
            }
            return this
        }
    }),
    K.buildFragment = function(a, b, c) {
        var d, e, f, g, h = a[0];
        return b && b[0] && (g = b[0].ownerDocument || b[0]),
        g.createDocumentFragment || (g = H),
        1 === a.length && "string" == typeof h && h.length < 512 && g === H && "<" === h.charAt(0) && !xa.test(h) && (K.support.checkClone || !za.test(h)) && (K.support.html5Clone || !ya.test(h)) && (e = !0, (f = K.fragments[h]) && 1 !== f && (d = f)),
        d || (d = g.createDocumentFragment(),
        K.clean(a, g, d, c)),
        e && (K.fragments[h] = f ? d : 1), {
            fragment: d,
            cacheable: e
        }
    },
    K.fragments = {},
    K.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        K.fn[a] = function(c) {
            var d = [],
                e = K(c),
                f = 1 === this.length && this[0].parentNode;
            if (f && 11 === f.nodeType && 1 === f.childNodes.length && 1 === e.length) return e[b](this[0]),
            this;
            for (var g = 0, h = e.length; g < h; g++) {
                var i = (g > 0 ? this.clone(!0) : this).get();
                K(e[g])[b](i),
                d = d.concat(i)
            }
            return this.pushStack(d, a, e.selector)
        }
    }),
    K.extend({
        clone: function(a, b, c) {
            var d, e, f, g = K.support.html5Clone || !ya.test("<" + a.nodeName) ? a.cloneNode(!0) : r(a);
            if (!(K.support.noCloneEvent && K.support.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || K.isXMLDoc(a))) for (v(a, g),
            d = u(a),
            e = u(g),
            f = 0; d[f]; ++f)
            e[f] && v(d[f], e[f]);
            if (b && (w(a, g),
            c)) for (d = u(a),
            e = u(g),
            f = 0; d[f]; ++f)
            w(d[f], e[f]);
            return d = e = null,
            g
        },
        clean: function(a, b, c, d) {
            var e;
            b = b || H,
            void 0 === b.createElement && (b = b.ownerDocument || b[0] && b[0].ownerDocument || H);
            for (var f, g, h = [], i = 0; null != (g = a[i]); i++)
            if ("number" == typeof g && (g += ""),
            g) {
                if ("string" == typeof g) if (va.test(g)) {
                    g = g.replace(sa, "<$1></$2>");
                    var j = (ta.exec(g) || ["", ""])[1].toLowerCase(),
                        k = Ca[j] || Ca._default,
                        l = k[0],
                        m = b.createElement("div");
                    for (b === H ? Da.appendChild(m) : y(b).appendChild(m),
                    m.innerHTML = k[1] + g + k[2]; l--;)
                    m = m.lastChild;
                    if (!K.support.tbody) {
                        var n = ua.test(g),
                            o = "table" !== j || n ? "<table>" !== k[1] || n ? [] : m.childNodes : m.firstChild && m.firstChild.childNodes;
                        for (f = o.length - 1; f >= 0; --f)
                        K.nodeName(o[f], "tbody") && !o[f].childNodes.length && o[f].parentNode.removeChild(o[f])
                    }!K.support.leadingWhitespace && ra.test(g) && m.insertBefore(b.createTextNode(ra.exec(g)[0]), m.firstChild),
                    g = m.childNodes
                } else g = b.createTextNode(g);
                var p;
                if (!K.support.appendChecked) if (g[0] && "number" == typeof(p = g.length)) for (f = 0; f < p; f++)
                s(g[f]);
                else s(g);
                g.nodeType ? h.push(g) : h = K.merge(h, g)
            }
            if (c) for (e = function(a) {
                return !a.type || Aa.test(a.type)
            },
            i = 0; h[i]; i++)
            if (!d || !K.nodeName(h[i], "script") || h[i].type && "text/javascript" !== h[i].type.toLowerCase()) {
                if (1 === h[i].nodeType) {
                    var q = K.grep(h[i].getElementsByTagName("script"), e);
                    h.splice.apply(h, [i + 1, 0].concat(q))
                }
                c.appendChild(h[i])
            } else d.push(h[i].parentNode ? h[i].parentNode.removeChild(h[i]) : h[i]);
            return h
        },
        cleanData: function(a) {
            for (var b, c, d, e = K.cache, f = K.event.special, g = K.support.deleteExpando, h = 0; null != (d = a[h]); h++)
            if ((!d.nodeName || !K.noData[d.nodeName.toLowerCase()]) && (c = d[K.expando])) {
                if ((b = e[c]) && b.events) {
                    for (var i in b.events)
                    f[i] ? K.event.remove(d, i) : K.removeEvent(d, i, b.handle);
                    b.handle && (b.handle.elem = null)
                }
                g ? delete d[K.expando] : d.removeAttribute && d.removeAttribute(K.expando),
                delete e[c]
            }
        }
    });
    var Ea, Fa, Ga, Ha = /alpha\([^)]*\)/i,
        Ia = /opacity=([^)]*)/,
        Ja = /([A-Z]|^ms)/g,
        Ka = /^-?\d+(?:px)?$/i,
        La = /^-?\d/,
        Ma = /^([\-+])=([\-+.\de]+)/,
        Na = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }, Oa = ["Left", "Right"],
        Pa = ["Top", "Bottom"];
    K.fn.css = function(a, c) {
        return 2 === arguments.length && c === b ? this : K.access(this, a, c, !0, function(a, c, d) {
            return d !== b ? K.style(a, c, d) : K.css(a, c)
        })
    },
    K.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = Ea(a, "opacity", "opacity");
                        return "" === c ? "1" : c
                    }
                    return a.style.opacity
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            float: K.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, c, d, e) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var f, g, h = K.camelCase(c),
                    i = a.style,
                    j = K.cssHooks[h];
                if (c = K.cssProps[h] || h,
                d === b) return j && "get" in j && (f = j.get(a, !1, e)) !== b ? f : i[c];
                if ("string" === (g = typeof d) && (f = Ma.exec(d)) && (d = +(f[1] + 1) * +f[2] + parseFloat(K.css(a, c)),
                g = "number"),
                null == d || "number" === g && isNaN(d)) return;
                if ("number" === g && !K.cssNumber[h] && (d += "px"), !(j && "set" in j && (d = j.set(a, d)) === b)) try {
                    i[c] = d
                } catch (a) {}
            }
        },
        css: function(a, c, d) {
            var e, f;
            return c = K.camelCase(c),
            f = K.cssHooks[c],
                "cssFloat" === (c = K.cssProps[c] || c) && (c = "float"),
            f && "get" in f && (e = f.get(a, !0, d)) !== b ? e : Ea ? Ea(a, c) : void 0
        },
        swap: function(a, b, c) {
            var d = {};
            for (var e in b)
            d[e] = a.style[e],
            a.style[e] = b[e];
            c.call(a);
            for (e in b)
            a.style[e] = d[e]
        }
    }),
    K.curCSS = K.css,
    K.each(["height", "width"], function(a, b) {
        K.cssHooks[b] = {
            get: function(a, c, d) {
                var e;
                if (c) return 0 !== a.offsetWidth ? p(a, b, d) : (K.swap(a, Na, function() {
                    e = p(a, b, d)
                }),
                e)
            },
            set: function(a, b) {
                return Ka.test(b) ? (b = parseFloat(b),
                b >= 0 ? b + "px" : void 0) : b
            }
        }
    }),
    K.support.opacity || (K.cssHooks.opacity = {
        get: function(a, b) {
            return Ia.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
        },
        set: function(a, b) {
            var c = a.style,
                d = a.currentStyle,
                e = K.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
                f = d && d.filter || c.filter || "";
            c.zoom = 1,
            b >= 1 && "" === K.trim(f.replace(Ha, "")) && (c.removeAttribute("filter"),
            d && !d.filter) || (c.filter = Ha.test(f) ? f.replace(Ha, e) : f + " " + e)
        }
    }),
    K(function() {
        K.support.reliableMarginRight || (K.cssHooks.marginRight = {
            get: function(a, b) {
                var c;
                return K.swap(a, {
                    display: "inline-block"
                }, function() {
                    c = b ? Ea(a, "margin-right", "marginRight") : a.style.marginRight
                }),
                c
            }
        })
    }),
    H.defaultView && H.defaultView.getComputedStyle && (Fa = function(a, b) {
        var c, d, e;
        return b = b.replace(Ja, "-$1").toLowerCase(), (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && "" === (c = e.getPropertyValue(b)) && !K.contains(a.ownerDocument.documentElement, a) && (c = K.style(a, b)),
        c
    }),
    H.documentElement.currentStyle && (Ga = function(a, b) {
        var c, d, e, f = a.currentStyle && a.currentStyle[b],
            g = a.style;
        return null === f && g && (e = g[b]) && (f = e), !Ka.test(f) && La.test(f) && (c = g.left,
        d = a.runtimeStyle && a.runtimeStyle.left,
        d && (a.runtimeStyle.left = a.currentStyle.left),
        g.left = "fontSize" === b ? "1em" : f || 0,
        f = g.pixelLeft + "px",
        g.left = c,
        d && (a.runtimeStyle.left = d)),
            "" === f ? "auto" : f
    }),
    Ea = Fa || Ga,
    K.expr && K.expr.filters && (K.expr.filters.hidden = function(a) {
        var b = a.offsetWidth,
            c = a.offsetHeight;
        return 0 === b && 0 === c || !K.support.reliableHiddenOffsets && "none" === (a.style && a.style.display || K.css(a, "display"))
    },
    K.expr.filters.visible = function(a) {
        return !K.expr.filters.hidden(a)
    });
    var Qa, Ra, Sa = /%20/g,
        Ta = /\[\]$/,
        Ua = /\r?\n/g,
        Va = /#.*$/,
        Wa = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Xa = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        Ya = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        Za = /^(?:GET|HEAD)$/,
        $a = /^\/\//,
        _a = /\?/,
        ab = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        bb = /^(?:select|textarea)/i,
        cb = /\s+/,
        db = /([?&])_=[^&]*/,
        eb = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
        fb = K.fn.load,
        gb = {}, hb = {}, ib = ["*/"] + ["*"];
    try {
        Qa = J.href
    } catch (a) {
        Qa = H.createElement("a"),
        Qa.href = "",
        Qa = Qa.href
    }
    Ra = eb.exec(Qa.toLowerCase()) || [],
    K.fn.extend({
        load: function(a, c, d) {
            if ("string" != typeof a && fb) return fb.apply(this, arguments);
            if (!this.length) return this;
            var e = a.indexOf(" ");
            if (e >= 0) {
                var f = a.slice(e, a.length);
                a = a.slice(0, e)
            }
            var g = "GET";
            c && (K.isFunction(c) ? (d = c,
            c = b) : "object" == typeof c && (c = K.param(c, K.ajaxSettings.traditional),
            g = "POST"));
            var h = this;
            return K.ajax({
                url: a,
                type: g,
                dataType: "html",
                data: c,
                complete: function(a, b, c) {
                    c = a.responseText,
                    a.isResolved() && (a.done(function(a) {
                        c = a
                    }),
                    h.html(f ? K("<div>").append(c.replace(ab, "")).find(f) : c)),
                    d && h.each(d, [c, b, a])
                }
            }),
            this
        },
        serialize: function() {
            return K.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? K.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || bb.test(this.nodeName) || Xa.test(this.type))
            }).map(function(a, b) {
                var c = K(this).val();
                return null == c ? null : K.isArray(c) ? K.map(c, function(a, c) {
                    return {
                        name: b.name,
                        value: a.replace(Ua, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: c.replace(Ua, "\r\n")
                }
            }).get()
        }
    }),
    K.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
        K.fn[b] = function(a) {
            return this.on(b, a)
        }
    }),
    K.each(["get", "post"], function(a, c) {
        K[c] = function(a, d, e, f) {
            return K.isFunction(d) && (f = f || e,
            e = d,
            d = b),
            K.ajax({
                type: c,
                url: a,
                data: d,
                success: e,
                dataType: f
            })
        }
    }),
    K.extend({
        getScript: function(a, c) {
            return K.get(a, b, c, "script")
        },
        getJSON: function(a, b, c) {
            return K.get(a, b, c, "json")
        },
        ajaxSetup: function(a, b) {
            return b ? m(a, K.ajaxSettings) : (b = a,
            a = K.ajaxSettings),
            m(a, b),
            a
        },
        ajaxSettings: {
            url: Qa,
            isLocal: Ya.test(Ra[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": ib
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": a.String,
                "text html": !0,
                "text json": K.parseJSON,
                "text xml": K.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: o(gb),
        ajaxTransport: o(hb),
        ajax: function(a, c) {
            function d(a, c, d, g) {
                if (2 !== x) {
                    x = 2,
                    i && clearTimeout(i),
                    h = b,
                    f = g || "",
                    y.readyState = a > 0 ? 4 : 0;
                    var l, n, o, v, w, z = c,
                        A = d ? k(p, y, d) : b;
                    if (a >= 200 && a < 300 || 304 === a) if (p.ifModified && ((v = y.getResponseHeader("Last-Modified")) && (K.lastModified[e] = v), (w = y.getResponseHeader("Etag")) && (K.etag[e] = w)),
                    304 === a) z = "notmodified",
                    l = !0;
                    else try {
                        n = j(p, A),
                        z = "success",
                        l = !0
                    } catch (a) {
                        z = "parsererror",
                        o = a
                    } else o = z,
                    z && !a || (z = "error",
                    a < 0 && (a = 0));
                    y.status = a,
                    y.statusText = "" + (c || z),
                    l ? s.resolveWith(q, [n, z, y]) : s.rejectWith(q, [y, z, o]),
                    y.statusCode(u),
                    u = b,
                    m && r.trigger("ajax" + (l ? "Success" : "Error"), [y, p, l ? n : o]),
                    t.fireWith(q, [y, z]),
                    m && (r.trigger("ajaxComplete", [y, p]), --K.active || K.event.trigger("ajaxStop"))
                }
            }
            "object" == typeof a && (c = a,
            a = b),
            c = c || {};
            var e, f, g, h, i, l, m, o, p = K.ajaxSetup({}, c),
                q = p.context || p,
                r = q !== p && (q.nodeType || q instanceof K) ? K(q) : K.event,
                s = K.Deferred(),
                t = K.Callbacks("once memory"),
                u = p.statusCode || {}, v = {}, w = {}, x = 0,
                y = {
                    readyState: 0,
                    setRequestHeader: function(a, b) {
                        if (!x) {
                            var c = a.toLowerCase();
                            a = w[c] = w[c] || a,
                            v[a] = b
                        }
                        return this
                    },
                    getAllResponseHeaders: function() {
                        return 2 === x ? f : null
                    },
                    getResponseHeader: function(a) {
                        var c;
                        if (2 === x) {
                            if (!g) for (g = {}; c = Wa.exec(f);)
                            g[c[1].toLowerCase()] = c[2];
                            c = g[a.toLowerCase()]
                        }
                        return c === b ? null : c
                    },
                    overrideMimeType: function(a) {
                        return x || (p.mimeType = a),
                        this
                    },
                    abort: function(a) {
                        return a = a || "abort",
                        h && h.abort(a),
                        d(0, a),
                        this
                    }
                };
            if (s.promise(y),
            y.success = y.done,
            y.error = y.fail,
            y.complete = t.add,
            y.statusCode = function(a) {
                if (a) {
                    var b;
                    if (x < 2) for (b in a)
                    u[b] = [u[b], a[b]];
                    else b = a[y.status],
                    y.then(b, b)
                }
                return this
            },
            p.url = ((a || p.url) + "").replace(Va, "").replace($a, Ra[1] + "//"),
            p.dataTypes = K.trim(p.dataType || "*").toLowerCase().split(cb),
            null == p.crossDomain && (l = eb.exec(p.url.toLowerCase()),
            p.crossDomain = !(!l || l[1] == Ra[1] && l[2] == Ra[2] && (l[3] || ("http:" === l[1] ? 80 : 443)) == (Ra[3] || ("http:" === Ra[1] ? 80 : 443)))),
            p.data && p.processData && "string" != typeof p.data && (p.data = K.param(p.data, p.traditional)),
            n(gb, p, c, y),
            2 === x) return !1;
            if (m = p.global,
            p.type = p.type.toUpperCase(),
            p.hasContent = !Za.test(p.type),
            m && 0 == K.active++ && K.event.trigger("ajaxStart"), !p.hasContent && (p.data && (p.url += (_a.test(p.url) ? "&" : "?") + p.data,
            delete p.data),
            e = p.url, !1 === p.cache)) {
                var z = K.now(),
                    A = p.url.replace(db, "$1_=" + z);
                p.url = A + (A === p.url ? (_a.test(p.url) ? "&" : "?") + "_=" + z : "")
            }
            (p.data && p.hasContent && !1 !== p.contentType || c.contentType) && y.setRequestHeader("Content-Type", p.contentType),
            p.ifModified && (e = e || p.url,
            K.lastModified[e] && y.setRequestHeader("If-Modified-Since", K.lastModified[e]),
            K.etag[e] && y.setRequestHeader("If-None-Match", K.etag[e])),
            y.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + ib + "; q=0.01" : "") : p.accepts["*"]);
            for (o in p.headers)
            y.setRequestHeader(o, p.headers[o]);
            if (p.beforeSend && (!1 === p.beforeSend.call(q, y, p) || 2 === x)) return y.abort(), !1;
            for (o in {
                success: 1,
                error: 1,
                complete: 1
            })
            y[o](p[o]);
            if (h = n(hb, p, c, y)) {
                y.readyState = 1,
                m && r.trigger("ajaxSend", [y, p]),
                p.async && p.timeout > 0 && (i = setTimeout(function() {
                    y.abort("timeout")
                }, p.timeout));
                try {
                    x = 1,
                    h.send(v, d)
                } catch (a) {
                    if (!(x < 2)) throw a;
                    d(-1, a)
                }
            } else d(-1, "No Transport");
            return y
        },
        param: function(a, c) {
            var d = [],
                e = function(a, b) {
                    b = K.isFunction(b) ? b() : b,
                    d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
                };
            if (c === b && (c = K.ajaxSettings.traditional),
            K.isArray(a) || a.jquery && !K.isPlainObject(a)) K.each(a, function() {
                e(this.name, this.value)
            });
            else for (var f in a)
            l(f, a[f], c, e);
            return d.join("&").replace(Sa, "+")
        }
    }),
    K.extend({
        active: 0,
        lastModified: {},
        etag: {}
    });
    var jb = K.now(),
        kb = /(\=)\?(&|$)|\?\?/i;
    K.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            return K.expando + "_" + jb++
        }
    }),
    K.ajaxPrefilter("json jsonp", function(b, c, d) {
        var e = "application/x-www-form-urlencoded" === b.contentType && "string" == typeof b.data;
        if ("jsonp" === b.dataTypes[0] || !1 !== b.jsonp && (kb.test(b.url) || e && kb.test(b.data))) {
            var f, g = b.jsonpCallback = K.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback,
                h = a[g],
                i = b.url,
                j = b.data,
                k = "$1" + g + "$2";
            return !1 !== b.jsonp && (i = i.replace(kb, k),
            b.url === i && (e && (j = j.replace(kb, k)),
            b.data === j && (i += (/\?/.test(i) ? "&" : "?") + b.jsonp + "=" + g))),
            b.url = i,
            b.data = j,
            a[g] = function(a) {
                f = [a]
            },
            d.always(function() {
                a[g] = h,
                f && K.isFunction(h) && a[g](f[0])
            }),
            b.converters["script json"] = function() {
                return f || K.error(g + " was not called"),
                f[0]
            },
            b.dataTypes[0] = "json",
                "script"
        }
    }),
    K.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(a) {
                return K.globalEval(a),
                a
            }
        }
    }),
    K.ajaxPrefilter("script", function(a) {
        a.cache === b && (a.cache = !1),
        a.crossDomain && (a.type = "GET",
        a.global = !1)
    }),
    K.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var c, d = H.head || H.getElementsByTagName("head")[0] || H.documentElement;
            return {
                send: function(e, f) {
                    c = H.createElement("script"),
                    c.async = "async",
                    a.scriptCharset && (c.charset = a.scriptCharset),
                    c.src = a.url,
                    c.onload = c.onreadystatechange = function(a, e) {
                        (e || !c.readyState || /loaded|complete/.test(c.readyState)) && (c.onload = c.onreadystatechange = null,
                        d && c.parentNode && d.removeChild(c),
                        c = b,
                        e || f(200, "success"))
                    },
                    d.insertBefore(c, d.firstChild)
                },
                abort: function() {
                    c && c.onload(0, 1)
                }
            }
        }
    });
    var lb, mb = !! a.ActiveXObject && function() {
            for (var a in lb)
            lb[a](0, 1)
        }, nb = 0;
    K.ajaxSettings.xhr = a.ActiveXObject ? function() {
        return !this.isLocal && i() || h()
    } : i,

    function(a) {
        K.extend(K.support, {
            ajax: !! a,
            cors: !! a && "withCredentials" in a
        })
    }(K.ajaxSettings.xhr()),
    K.support.ajax && K.ajaxTransport(function(c) {
        if (!c.crossDomain || K.support.cors) {
            var d;
            return {
                send: function(e, f) {
                    var g, h, i = c.xhr();
                    if (c.username ? i.open(c.type, c.url, c.async, c.username, c.password) : i.open(c.type, c.url, c.async),
                    c.xhrFields) for (h in c.xhrFields)
                    i[h] = c.xhrFields[h];
                    c.mimeType && i.overrideMimeType && i.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (h in e)
                        i.setRequestHeader(h, e[h])
                    } catch (a) {}
                    i.send(c.hasContent && c.data || null),
                    d = function(a, e) {
                        var h, j, k, l, m;
                        try {
                            if (d && (e || 4 === i.readyState)) if (d = b,
                            g && (i.onreadystatechange = K.noop,
                            mb && delete lb[g]),
                            e) 4 !== i.readyState && i.abort();
                            else {
                                h = i.status,
                                k = i.getAllResponseHeaders(),
                                l = {},
                                m = i.responseXML,
                                m && m.documentElement && (l.xml = m),
                                l.text = i.responseText;
                                try {
                                    j = i.statusText
                                } catch (a) {
                                    j = ""
                                }
                                h || !c.isLocal || c.crossDomain ? 1223 === h && (h = 204) : h = l.text ? 200 : 404
                            }
                        } catch (a) {
                            e || f(-1, a)
                        }
                        l && f(h, j, l, k)
                    },
                    c.async && 4 !== i.readyState ? (g = ++nb,
                    mb && (lb || (lb = {},
                    K(a).unload(mb)),
                    lb[g] = d),
                    i.onreadystatechange = d) : d()
                },
                abort: function() {
                    d && d(0, 1)
                }
            }
        }
    });
    var ob, pb, qb, rb, sb = {}, tb = /^(?:toggle|show|hide)$/,
        ub = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
        vb = [
            ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
            ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
            ["opacity"]
        ];
    K.fn.extend({
        show: function(a, b, c) {
            var f, g;
            if (a || 0 === a) return this.animate(e("show", 3), a, b, c);
            for (var h = 0, i = this.length; h < i; h++)
            f = this[h],
            f.style && (g = f.style.display, !K._data(f, "olddisplay") && "none" === g && (g = f.style.display = ""),
                "" === g && "none" === K.css(f, "display") && K._data(f, "olddisplay", d(f.nodeName)));
            for (h = 0; h < i; h++)
            f = this[h],
            f.style && ("" !== (g = f.style.display) && "none" !== g || (f.style.display = K._data(f, "olddisplay") || ""));
            return this
        },
        hide: function(a, b, c) {
            if (a || 0 === a) return this.animate(e("hide", 3), a, b, c);
            for (var d, f, g = 0, h = this.length; g < h; g++)
            d = this[g],
            d.style && "none" !== (f = K.css(d, "display")) && !K._data(d, "olddisplay") && K._data(d, "olddisplay", f);
            for (g = 0; g < h; g++)
            this[g].style && (this[g].style.display = "none");
            return this
        },
        _toggle: K.fn.toggle,
        toggle: function(a, b, c) {
            var d = "boolean" == typeof a;
            return K.isFunction(a) && K.isFunction(b) ? this._toggle.apply(this, arguments) : null == a || d ? this.each(function() {
                var b = d ? a : K(this).is(":hidden");
                K(this)[b ? "show" : "hide"]()
            }) : this.animate(e("toggle", 3), a, b, c),
            this
        },
        fadeTo: function(a, b, c, d) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d)
        },
        animate: function(a, b, c, e) {
            function f() {
                !1 === g.queue && K._mark(this);
                var b, c, e, f, h, i, j, k, l, m = K.extend({}, g),
                    n = 1 === this.nodeType,
                    o = n && K(this).is(":hidden");
                m.animatedProperties = {};
                for (e in a) {
                    if (b = K.camelCase(e),
                    e !== b && (a[b] = a[e],
                    delete a[e]),
                    c = a[b],
                    K.isArray(c) ? (m.animatedProperties[b] = c[1],
                    c = a[b] = c[0]) : m.animatedProperties[b] = m.specialEasing && m.specialEasing[b] || m.easing || "swing",
                        "hide" === c && o || "show" === c && !o) return m.complete.call(this);
                    n && ("height" === b || "width" === b) && (m.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY],
                        "inline" === K.css(this, "display") && "none" === K.css(this, "float") && (K.support.inlineBlockNeedsLayout && "inline" !== d(this.nodeName) ? this.style.zoom = 1 : this.style.display = "inline-block"))
                }
                null != m.overflow && (this.style.overflow = "hidden");
                for (e in a)
                f = new K.fx(this, m, e),
                c = a[e],
                tb.test(c) ? (l = K._data(this, "toggle" + e) || ("toggle" === c ? o ? "show" : "hide" : 0),
                l ? (K._data(this, "toggle" + e, "show" === l ? "hide" : "show"),
                f[l]()) : f[c]()) : (h = ub.exec(c),
                i = f.cur(),
                h ? (j = parseFloat(h[2]),
                k = h[3] || (K.cssNumber[e] ? "" : "px"),
                    "px" !== k && (K.style(this, e, (j || 1) + k),
                i = (j || 1) / f.cur() * i,
                K.style(this, e, i + k)),
                h[1] && (j = ("-=" === h[1] ? -1 : 1) * j + i),
                f.custom(i, j, k)) : f.custom(i, c, ""));
                return !0
            }
            var g = K.speed(b, c, e);
            return K.isEmptyObject(a) ? this.each(g.complete, [!1]) : (a = K.extend({}, a), !1 === g.queue ? this.each(f) : this.queue(g.queue, f))
        },
        stop: function(a, c, d) {
            return "string" != typeof a && (d = c,
            c = a,
            a = b),
            c && !1 !== a && this.queue(a || "fx", []),
            this.each(function() {
                function b(a, b, c) {
                    var e = b[c];
                    K.removeData(a, c, !0),
                    e.stop(d)
                }
                var c, e = !1,
                    f = K.timers,
                    g = K._data(this);
                if (d || K._unmark(!0, this),
                null == a) for (c in g)
                g[c] && g[c].stop && c.indexOf(".run") === c.length - 4 && b(this, g, c);
                else g[c = a + ".run"] && g[c].stop && b(this, g, c);
                for (c = f.length; c--;)
                f[c].elem === this && (null == a || f[c].queue === a) && (d ? f[c](!0) : f[c].saveState(),
                e = !0,
                f.splice(c, 1));
                (!d || !e) && K.dequeue(this, a)
            })
        }
    }),
    K.each({
        slideDown: e("show", 1),
        slideUp: e("hide", 1),
        slideToggle: e("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        K.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d)
        }
    }),
    K.extend({
        speed: function(a, b, c) {
            var d = a && "object" == typeof a ? K.extend({}, a) : {
                complete: c || !c && b || K.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !K.isFunction(b) && b
            };
            return d.duration = K.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in K.fx.speeds ? K.fx.speeds[d.duration] : K.fx.speeds._default,
            null != d.queue && !0 !== d.queue || (d.queue = "fx"),
            d.old = d.complete,
            d.complete = function(a) {
                K.isFunction(d.old) && d.old.call(this),
                d.queue ? K.dequeue(this, d.queue) : !1 !== a && K._unmark(this)
            },
            d
        },
        easing: {
            linear: function(a, b, c, d) {
                return c + d * a
            },
            swing: function(a, b, c, d) {
                return (-Math.cos(a * Math.PI) / 2 + .5) * d + c
            }
        },
        timers: [],
        fx: function(a, b, c) {
            this.options = b,
            this.elem = a,
            this.prop = c,
            b.orig = b.orig || {}
        }
    }),
    K.fx.prototype = {
        update: function() {
            this.options.step && this.options.step.call(this.elem, this.now, this), (K.fx.step[this.prop] || K.fx.step._default)(this)
        },
        cur: function() {
            if (null != this.elem[this.prop] && (!this.elem.style || null == this.elem.style[this.prop])) return this.elem[this.prop];
            var a, b = K.css(this.elem, this.prop);
            return isNaN(a = parseFloat(b)) ? b && "auto" !== b ? b : 0 : a
        },
        custom: function(a, c, d) {
            function e(a) {
                return f.step(a)
            }
            var f = this,
                h = K.fx;
            this.startTime = rb || g(),
            this.end = c,
            this.now = this.start = a,
            this.pos = this.state = 0,
            this.unit = d || this.unit || (K.cssNumber[this.prop] ? "" : "px"),
            e.queue = this.options.queue,
            e.elem = this.elem,
            e.saveState = function() {
                f.options.hide && K._data(f.elem, "fxshow" + f.prop) === b && K._data(f.elem, "fxshow" + f.prop, f.start)
            },
            e() && K.timers.push(e) && !qb && (qb = setInterval(h.tick, h.interval))
        },
        show: function() {
            var a = K._data(this.elem, "fxshow" + this.prop);
            this.options.orig[this.prop] = a || K.style(this.elem, this.prop),
            this.options.show = !0,
            a !== b ? this.custom(this.cur(), a) : this.custom("width" === this.prop || "height" === this.prop ? 1 : 0, this.cur()),
            K(this.elem).show()
        },
        hide: function() {
            this.options.orig[this.prop] = K._data(this.elem, "fxshow" + this.prop) || K.style(this.elem, this.prop),
            this.options.hide = !0,
            this.custom(this.cur(), 0)
        },
        step: function(a) {
            var b, c, d, e = rb || g(),
                f = !0,
                h = this.elem,
                i = this.options;
            if (a || e >= i.duration + this.startTime) {
                this.now = this.end,
                this.pos = this.state = 1,
                this.update(),
                i.animatedProperties[this.prop] = !0;
                for (b in i.animatedProperties)!0 !== i.animatedProperties[b] && (f = !1);
                if (f) {
                    if (null != i.overflow && !K.support.shrinkWrapBlocks && K.each(["", "X", "Y"], function(a, b) {
                        h.style["overflow" + b] = i.overflow[a]
                    }),
                    i.hide && K(h).hide(),
                    i.hide || i.show) for (b in i.animatedProperties)
                    K.style(h, b, i.orig[b]),
                    K.removeData(h, "fxshow" + b, !0),
                    K.removeData(h, "toggle" + b, !0);
                    (d = i.complete) && (i.complete = !1,
                    d.call(h))
                }
                return !1
            }
            return i.duration == 1 / 0 ? this.now = e : (c = e - this.startTime,
            this.state = c / i.duration,
            this.pos = K.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration),
            this.now = this.start + (this.end - this.start) * this.pos),
            this.update(), !0
        }
    },
    K.extend(K.fx, {
        tick: function() {
            for (var a, b = K.timers, c = 0; c < b.length; c++)!(a = b[c])() && b[c] === a && b.splice(c--, 1);
            b.length || K.fx.stop()
        },
        interval: 13,
        stop: function() {
            clearInterval(qb),
            qb = null
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function(a) {
                K.style(a.elem, "opacity", a.now)
            },
            _default: function(a) {
                a.elem.style && null != a.elem.style[a.prop] ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now
            }
        }
    }),
    K.each(["width", "height"], function(a, b) {
        K.fx.step[b] = function(a) {
            K.style(a.elem, b, Math.max(0, a.now) + a.unit)
        }
    }),
    K.expr && K.expr.filters && (K.expr.filters.animated = function(a) {
        return K.grep(K.timers, function(b) {
            return a === b.elem
        }).length
    });
    var wb = /^t(?:able|d|h)$/i,
        xb = /^(?:body|html)$/i;
    "getBoundingClientRect" in H.documentElement ? K.fn.offset = function(a) {
        var b, d = this[0];
        if (a) return this.each(function(b) {
            K.offset.setOffset(this, a, b)
        });
        if (!d || !d.ownerDocument) return null;
        if (d === d.ownerDocument.body) return K.offset.bodyOffset(d);
        try {
            b = d.getBoundingClientRect()
        } catch (a) {}
        var e = d.ownerDocument,
            f = e.documentElement;
        if (!b || !K.contains(f, d)) return b ? {
            top: b.top,
            left: b.left
        } : {
            top: 0,
            left: 0
        };
        var g = e.body,
            h = c(e),
            i = f.clientTop || g.clientTop || 0,
            j = f.clientLeft || g.clientLeft || 0,
            k = h.pageYOffset || K.support.boxModel && f.scrollTop || g.scrollTop,
            l = h.pageXOffset || K.support.boxModel && f.scrollLeft || g.scrollLeft;
        return {
            top: b.top + k - i,
            left: b.left + l - j
        }
    } : K.fn.offset = function(a) {
        var b = this[0];
        if (a) return this.each(function(b) {
            K.offset.setOffset(this, a, b)
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return K.offset.bodyOffset(b);
        for (var c, d = b.offsetParent, e = b.ownerDocument, f = e.documentElement, g = e.body, h = e.defaultView, i = h ? h.getComputedStyle(b, null) : b.currentStyle, j = b.offsetTop, k = b.offsetLeft;
        (b = b.parentNode) && b !== g && b !== f && (!K.support.fixedPosition || "fixed" !== i.position);)
        c = h ? h.getComputedStyle(b, null) : b.currentStyle,
        j -= b.scrollTop,
        k -= b.scrollLeft,
        b === d && (j += b.offsetTop,
        k += b.offsetLeft,
        K.support.doesNotAddBorder && (!K.support.doesAddBorderForTableAndCells || !wb.test(b.nodeName)) && (j += parseFloat(c.borderTopWidth) || 0,
        k += parseFloat(c.borderLeftWidth) || 0),
        d,
        d = b.offsetParent),
        K.support.subtractsBorderForOverflowNotVisible && "visible" !== c.overflow && (j += parseFloat(c.borderTopWidth) || 0,
        k += parseFloat(c.borderLeftWidth) || 0),
        i = c;
        return "relative" !== i.position && "static" !== i.position || (j += g.offsetTop,
        k += g.offsetLeft),
        K.support.fixedPosition && "fixed" === i.position && (j += Math.max(f.scrollTop, g.scrollTop),
        k += Math.max(f.scrollLeft, g.scrollLeft)), {
            top: j,
            left: k
        }
    },
    K.offset = {
        bodyOffset: function(a) {
            var b = a.offsetTop,
                c = a.offsetLeft;
            return K.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(K.css(a, "marginTop")) || 0,
            c += parseFloat(K.css(a, "marginLeft")) || 0), {
                top: b,
                left: c
            }
        },
        setOffset: function(a, b, c) {
            var d = K.css(a, "position");
            "static" === d && (a.style.position = "relative");
            var e, f, g = K(a),
                h = g.offset(),
                i = K.css(a, "top"),
                j = K.css(a, "left"),
                k = ("absolute" === d || "fixed" === d) && K.inArray("auto", [i, j]) > -1,
                l = {}, m = {};
            k ? (m = g.position(),
            e = m.top,
            f = m.left) : (e = parseFloat(i) || 0,
            f = parseFloat(j) || 0),
            K.isFunction(b) && (b = b.call(a, c, h)),
            null != b.top && (l.top = b.top - h.top + e),
            null != b.left && (l.left = b.left - h.left + f),
                "using" in b ? b.using.call(a, l) : g.css(l)
        }
    },
    K.fn.extend({
        position: function() {
            if (!this[0]) return null;
            var a = this[0],
                b = this.offsetParent(),
                c = this.offset(),
                d = xb.test(b[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : b.offset();
            return c.top -= parseFloat(K.css(a, "marginTop")) || 0,
            c.left -= parseFloat(K.css(a, "marginLeft")) || 0,
            d.top += parseFloat(K.css(b[0], "borderTopWidth")) || 0,
            d.left += parseFloat(K.css(b[0], "borderLeftWidth")) || 0, {
                top: c.top - d.top,
                left: c.left - d.left
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent || H.body; a && !xb.test(a.nodeName) && "static" === K.css(a, "position");)
                a = a.offsetParent;
                return a
            })
        }
    }),
    K.each(["Left", "Top"], function(a, d) {
        var e = "scroll" + d;
        K.fn[e] = function(d) {
            var f, g;
            return d === b ? (f = this[0]) ? (g = c(f),
            g ? "pageXOffset" in g ? g[a ? "pageYOffset" : "pageXOffset"] : K.support.boxModel && g.document.documentElement[e] || g.document.body[e] : f[e]) : null : this.each(function() {
                g = c(this),
                g ? g.scrollTo(a ? K(g).scrollLeft() : d, a ? d : K(g).scrollTop()) : this[e] = d
            })
        }
    }),
    K.each(["Height", "Width"], function(a, c) {
        var d = c.toLowerCase();
        K.fn["inner" + c] = function() {
            var a = this[0];
            return a ? a.style ? parseFloat(K.css(a, d, "padding")) : this[d]() : null
        },
        K.fn["outer" + c] = function(a) {
            var b = this[0];
            return b ? b.style ? parseFloat(K.css(b, d, a ? "margin" : "border")) : this[d]() : null
        },
        K.fn[d] = function(a) {
            var e = this[0];
            if (!e) return null == a ? null : this;
            if (K.isFunction(a)) return this.each(function(b) {
                var c = K(this);
                c[d](a.call(this, b, c[d]()))
            });
            if (K.isWindow(e)) {
                var f = e.document.documentElement["client" + c],
                    g = e.document.body;
                return "CSS1Compat" === e.document.compatMode && f || g && g["client" + c] || f
            }
            if (9 === e.nodeType) return Math.max(e.documentElement["client" + c], e.body["scroll" + c], e.documentElement["scroll" + c], e.body["offset" + c], e.documentElement["offset" + c]);
            if (a === b) {
                var h = K.css(e, d),
                    i = parseFloat(h);
                return K.isNumeric(i) ? i : h
            }
            return this.css(d, "string" == typeof a ? a : a + "px")
        }
    }),
    a.jQuery = a.$ = K,
        "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function() {
        return K
    })
}(window),

function() {
    "use strict";

    function a(a) {
        function b(b, d) {
            var f, p, q = b == window,
                r = d && void 0 !== d.message ? d.message : void 0;
            if (d = a.extend({}, a.blockUI.defaults, d || {}), !d.ignoreIfBlocked || !a(b).data("blockUI.isBlocked")) {
                if (d.overlayCSS = a.extend({}, a.blockUI.defaults.overlayCSS, d.overlayCSS || {}),
                f = a.extend({}, a.blockUI.defaults.css, d.css || {}),
                d.onOverlayClick && (d.overlayCSS.cursor = "pointer"),
                p = a.extend({}, a.blockUI.defaults.themedCSS, d.themedCSS || {}),
                r = void 0 === r ? d.message : r,
                q && n && c(window, {
                    fadeOut: 0
                }),
                r && "string" != typeof r && (r.parentNode || r.jquery)) {
                    var s = r.jquery ? r[0] : r,
                        t = {};
                    a(b).data("blockUI.history", t),
                    t.el = s,
                    t.parent = s.parentNode,
                    t.display = s.style.display,
                    t.position = s.style.position,
                    t.parent && t.parent.removeChild(s)
                }
                a(b).data("blockUI.onUnblock", d.onUnblock);
                var u, v, w, x, y = d.baseZ;
                u = a(k || d.forceIframe ? '<iframe class="blockUI" style="z-index:' + y+++';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="' + d.iframeSrc + '"></iframe>' : '<div class="blockUI" style="display:none"></div>'),
                v = a(d.theme ? '<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:' + y+++';display:none"></div>' : '<div class="blockUI blockOverlay" style="z-index:' + y+++';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>'),
                d.theme && q ? (x = '<div class="blockUI ' + d.blockMsgClass + ' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:' + (y + 10) + ';display:none;position:fixed">',
                d.title && (x += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (d.title || "&nbsp;") + "</div>"),
                x += '<div class="ui-widget-content ui-dialog-content"></div>',
                x += "</div>") : d.theme ? (x = '<div class="blockUI ' + d.blockMsgClass + ' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:' + (y + 10) + ';display:none;position:absolute">',
                d.title && (x += '<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">' + (d.title || "&nbsp;") + "</div>"),
                x += '<div class="ui-widget-content ui-dialog-content"></div>',
                x += "</div>") : x = q ? '<div class="blockUI ' + d.blockMsgClass + ' blockPage" style="z-index:' + (y + 10) + ';display:none;position:fixed"></div>' : '<div class="blockUI ' + d.blockMsgClass + ' blockElement" style="z-index:' + (y + 10) + ';display:none;position:absolute"></div>',
                w = a(x),
                r && (d.theme ? (w.css(p),
                w.addClass("ui-widget-content")) : w.css(f)),
                d.theme || v.css(d.overlayCSS),
                v.css("position", q ? "fixed" : "absolute"), (k || d.forceIframe) && u.css("opacity", 0);
                var z = [u, v, w],
                    A = a(q ? "body" : b);
                a.each(z, function() {
                    this.appendTo(A)
                }),
                d.theme && d.draggable && a.fn.draggable && w.draggable({
                    handle: ".ui-dialog-titlebar",
                    cancel: "li"
                });
                var B = m && (!a.support.boxModel || a("object,embed", q ? null : b).length > 0);
                if (l || B) {
                    if (q && d.allowBodyStretch && a.support.boxModel && a("html,body").css("height", "100%"), (l || !a.support.boxModel) && !q) var C = i(b, "borderTopWidth"),
                        D = i(b, "borderLeftWidth"),
                        E = C ? "(0 - " + C + ")" : 0,
                        F = D ? "(0 - " + D + ")" : 0;
                    a.each(z, function(a, b) {
                        var c = b[0].style;
                        if (c.position = "absolute",
                        2 > a) q ? c.setExpression("height", "Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:" + d.quirksmodeOffsetHack + ') + "px"') : c.setExpression("height", 'this.parentNode.offsetHeight + "px"'),
                        q ? c.setExpression("width", 'jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"') : c.setExpression("width", 'this.parentNode.offsetWidth + "px"'),
                        F && c.setExpression("left", F),
                        E && c.setExpression("top", E);
                        else if (d.centerY) q && c.setExpression("top", '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"'),
                        c.marginTop = 0;
                        else if (!d.centerY && q) {
                            var e = d.css && d.css.top ? parseInt(d.css.top, 10) : 0,
                                f = "((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + " + e + ') + "px"';
                            c.setExpression("top", f)
                        }
                    })
                }
                if (r && (d.theme ? w.find(".ui-widget-content").append(r) : w.append(r), (r.jquery || r.nodeType) && a(r).show()), (k || d.forceIframe) && d.showOverlay && u.show(),
                d.fadeIn) {
                    var G = d.onBlock ? d.onBlock : j,
                        H = d.showOverlay && !r ? G : j,
                        I = r ? G : j;
                    d.showOverlay && v._fadeIn(d.fadeIn, H),
                    r && w._fadeIn(d.fadeIn, I)
                } else d.showOverlay && v.show(),
                r && w.show(),
                d.onBlock && d.onBlock();
                if (e(1, b, d),
                q ? (n = w[0],
                o = a(d.focusableElements, n),
                d.focusInput && setTimeout(g, 20)) : h(w[0], d.centerX, d.centerY),
                d.timeout) {
                    var J = setTimeout(function() {
                        q ? a.unblockUI(d) : a(b).unblock(d)
                    }, d.timeout);
                    a(b).data("blockUI.timeout", J)
                }
            }
        }

        function c(b, c) {
            var f, g = b == window,
                h = a(b),
                i = h.data("blockUI.history"),
                j = h.data("blockUI.timeout");
            j && (clearTimeout(j),
            h.removeData("blockUI.timeout")),
            c = a.extend({}, a.blockUI.defaults, c || {}),
            e(0, b, c),
            null === c.onUnblock && (c.onUnblock = h.data("blockUI.onUnblock"),
            h.removeData("blockUI.onUnblock"));
            var k;
            k = g ? a("body").children().filter(".blockUI").add("body > .blockUI") : h.find(">.blockUI"),
            c.cursorReset && (k.length > 1 && (k[1].style.cursor = c.cursorReset),
            k.length > 2 && (k[2].style.cursor = c.cursorReset)),
            g && (n = o = null),
            c.fadeOut ? (f = k.length,
            k.stop().fadeOut(c.fadeOut, function() {
                0 == --f && d(k, i, c, b)
            })) : d(k, i, c, b)
        }

        function d(b, c, d, e) {
            var f = a(e);
            if (!f.data("blockUI.isBlocked")) {
                b.each(function() {
                    this.parentNode && this.parentNode.removeChild(this)
                }),
                c && c.el && (c.el.style.display = c.display,
                c.el.style.position = c.position,
                c.parent && c.parent.appendChild(c.el),
                f.removeData("blockUI.history")),
                f.data("blockUI.static") && f.css("position", "static"),
                    "function" == typeof d.onUnblock && d.onUnblock(e, d);
                var g = a(document.body),
                    h = g.width(),
                    i = g[0].style.width;
                g.width(h - 1).width(h),
                g[0].style.width = i
            }
        }

        function e(b, c, d) {
            var e = c == window,
                g = a(c);
            if ((b || (!e || n) && (e || g.data("blockUI.isBlocked"))) && (g.data("blockUI.isBlocked", b),
            e && d.bindEvents && (!b || d.showOverlay))) {
                var h = "mousedown mouseup keydown keypress keyup touchstart touchend touchmove";
                b ? a(document).bind(h, d, f) : a(document).unbind(h, f)
            }
        }

        function f(b) {
            if ("keydown" === b.type && b.keyCode && 9 == b.keyCode && n && b.data.constrainTabKey) {
                var c = o,
                    d = !b.shiftKey && b.target === c[c.length - 1],
                    e = b.shiftKey && b.target === c[0];
                if (d || e) return setTimeout(function() {
                    g(e)
                }, 10), !1
            }
            var f = b.data,
                h = a(b.target);
            return h.hasClass("blockOverlay") && f.onOverlayClick && f.onOverlayClick(b),
            h.parents("div." + f.blockMsgClass).length > 0 || 0 === h.parents().children().filter("div.blockUI").length
        }

        function g(a) {
            if (o) {
                var b = o[!0 === a ? o.length - 1 : 0];
                b && b.focus()
            }
        }

        function h(a, b, c) {
            var d = a.parentNode,
                e = a.style,
                f = (d.offsetWidth - a.offsetWidth) / 2 - i(d, "borderLeftWidth"),
                g = (d.offsetHeight - a.offsetHeight) / 2 - i(d, "borderTopWidth");
            b && (e.left = f > 0 ? f + "px" : "0"),
            c && (e.top = g > 0 ? g + "px" : "0")
        }

        function i(b, c) {
            return parseInt(a.css(b, c), 10) || 0
        }
        a.fn._fadeIn = a.fn.fadeIn;
        var j = a.noop || function() {}, k = /MSIE/.test(navigator.userAgent),
            l = /MSIE 6.0/.test(navigator.userAgent) && !/MSIE 8.0/.test(navigator.userAgent);
        document.documentMode;
        var m = a.isFunction(document.createElement("div").style.setExpression);
        a.blockUI = function(a) {
            b(window, a)
        },
        a.unblockUI = function(a) {
            c(window, a)
        },
        a.growlUI = function(b, c, d, e) {
            var f = a('<div class="growlUI"></div>');
            b && f.append("<h1>" + b + "</h1>"),
            c && f.append("<h2>" + c + "</h2>"),
            void 0 === d && (d = 3e3);
            var g = function(b) {
                b = b || {},
                a.blockUI({
                    message: f,
                    fadeIn: void 0 !== b.fadeIn ? b.fadeIn : 700,
                    fadeOut: void 0 !== b.fadeOut ? b.fadeOut : 1e3,
                    timeout: void 0 !== b.timeout ? b.timeout : d,
                    centerY: !1,
                    showOverlay: !1,
                    onUnblock: e,
                    css: a.blockUI.defaults.growlCSS
                })
            };
            g(),
            f.css("opacity"),
            f.mouseover(function() {
                g({
                    fadeIn: 0,
                    timeout: 3e4
                });
                var b = a(".blockMsg");
                b.stop(),
                b.fadeTo(300, 1)
            }).mouseout(function() {
                a(".blockMsg").fadeOut(1e3)
            })
        },
        a.fn.block = function(c) {
            if (this[0] === window) return a.blockUI(c),
            this;
            var d = a.extend({}, a.blockUI.defaults, c || {});
            return this.each(function() {
                var b = a(this);
                d.ignoreIfBlocked && b.data("blockUI.isBlocked") || b.unblock({
                    fadeOut: 0
                })
            }),
            this.each(function() {
                "static" == a.css(this, "position") && (this.style.position = "relative",
                a(this).data("blockUI.static", !0)),
                this.style.zoom = 1,
                b(this, c)
            })
        },
        a.fn.unblock = function(b) {
            return this[0] === window ? (a.unblockUI(b),
            this) : this.each(function() {
                c(this, b)
            })
        },
        a.blockUI.version = 2.66,
        a.blockUI.defaults = {
            message: "<h1>Please wait...</h1>",
            title: null,
            draggable: !0,
            theme: !1,
            css: {
                padding: 0,
                margin: 0,
                width: "30%",
                top: "40%",
                left: "35%",
                textAlign: "center",
                color: "#000",
                border: "3px solid #aaa",
                backgroundColor: "#fff",
                cursor: "wait"
            },
            themedCSS: {
                width: "30%",
                top: "40%",
                left: "35%"
            },
            overlayCSS: {
                backgroundColor: "#000",
                opacity: .6
            },
            cursorReset: "default",
            growlCSS: {
                width: "350px",
                top: "10px",
                left: "",
                right: "10px",
                border: "none",
                padding: "5px",
                opacity: .6,
                cursor: "default",
                color: "#fff",
                backgroundColor: "#000",
                "-webkit-border-radius": "10px",
                "-moz-border-radius": "10px",
                "border-radius": "10px"
            },
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank",
            forceIframe: !1,
            baseZ: 1e3,
            centerX: !0,
            centerY: !0,
            allowBodyStretch: !0,
            bindEvents: !0,
            constrainTabKey: !0,
            fadeIn: 200,
            fadeOut: 400,
            timeout: 0,
            showOverlay: !0,
            focusInput: !0,
            focusableElements: ":input:enabled:visible",
            onBlock: null,
            onUnblock: null,
            onOverlayClick: null,
            quirksmodeOffsetHack: 4,
            blockMsgClass: "blockMsg",
            ignoreIfBlocked: !1
        };
        var n = null,
            o = []
    }
}(),

function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery)
}(function(a) {
    function b(a) {
        return h.raw ? a : encodeURIComponent(a)
    }

    function c(a) {
        return h.raw ? a : decodeURIComponent(a)
    }

    function d(a) {
        return b(h.json ? JSON.stringify(a) : String(a))
    }

    function e(a) {
        0 === a.indexOf('"') && (a = a.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
        try {
            return a = decodeURIComponent(a.replace(g, " ")),
            h.json ? JSON.parse(a) : a
        } catch (a) {}
    }

    function f(b, c) {
        var d = h.raw ? b : e(b);
        return a.isFunction(c) ? c(d) : d
    }
    var g = /\+/g,
        h = a.cookie = function(e, g, i) {
            if (void 0 !== g && !a.isFunction(g)) {
                if (i = a.extend({}, h.defaults, i),
                    "number" == typeof i.expires) {
                    var j = i.expires,
                        k = i.expires = new Date;
                    k.setTime(+k + 864e5 * j)
                }
                return document.cookie = [b(e), "=", d(g), i.expires ? "; expires=" + i.expires.toUTCString() : "", i.path ? "; path=" + i.path : "", i.domain ? "; domain=" + i.domain : "", i.secure ? "; secure" : ""].join("")
            }
            for (var l = e ? void 0 : {}, m = document.cookie ? document.cookie.split("; ") : [], n = 0, o = m.length; o > n; n++) {
                var p = m[n].split("="),
                    q = c(p.shift()),
                    r = p.join("=");
                if (e && e === q) {
                    l = f(r, g);
                    break
                }
                e || void 0 === (r = f(r)) || (l[q] = r)
            }
            return l
        };
    h.defaults = {},
    a.removeCookie = function(b, c) {
        return void 0 !== a.cookie(b) && (a.cookie(b, "", a.extend({}, c, {
            expires: -1
        })), !a.cookie(b))
    }
}),

function() {
    function a(a, b, c) {
        c = (c || 0) - 1;
        for (var d = a ? a.length : 0; ++c < d;)
        if (a[c] === b) return c;
        return -1
    }

    function b(b, c) {
        var d = typeof c;
        if (b = b.l,
            "boolean" == d || null == c) return b[c] ? 0 : -1;
        "number" != d && "string" != d && (d = "object");
        var e = "number" == d ? c : u + c;
        return b = (b = b[d]) && b[e],
            "object" == d ? b && -1 < a(b, c) ? 0 : -1 : b ? 0 : -1
    }

    function c(a) {
        var b = this.l,
            c = typeof a;
        if ("boolean" == c || null == a) b[a] = !0;
        else {
            "number" != c && "string" != c && (c = "object");
            var d = "number" == c ? a : u + a,
                b = b[c] || (b[c] = {});
            "object" == c ? (b[d] || (b[d] = [])).push(a) : b[d] = !0
        }
    }

    function d(a) {
        return a.charCodeAt(0)
    }

    function e(a, b) {
        for (var c = a.m, d = b.m, e = -1, f = c.length; ++e < f;) {
            var g = c[e],
                h = d[e];
            if (g !== h) {
                if (g > h || void 0 === g) return 1;
                if (g < h || void 0 === h) return -1
            }
        }
        return a.n - b.n
    }

    function f(a) {
        var b = -1,
            d = a.length,
            e = a[0],
            f = a[d / 2 | 0],
            g = a[d - 1];
        if (e && "object" == typeof e && f && "object" == typeof f && g && "object" == typeof g) return !1;
        for (e = i(),
        e.false = e.null = e.true = e.undefined = !1,
        f = i(),
        f.k = a,
        f.l = e,
        f.push = c; ++b < d;)
        f.push(a[b]);
        return f
    }

    function g(a) {
        return "\\" + $[a]
    }

    function h() {
        return q.pop() || []
    }

    function i() {
        return r.pop() || {
            k: null,
            l: null,
            m: null,
            false: !1,
            n: 0,
            null: !1,
            number: null,
            object: null,
            push: null,
            string: null,
            true: !1,
            undefined: !1,
            o: null
        }
    }

    function j(a) {
        return "function" != typeof a.toString && "string" == typeof(a + "")
    }

    function l(a) {
        a.length = 0,
        q.length < w && q.push(a)
    }

    function m(a) {
        var b = a.l;
        b && m(b),
        a.k = a.l = a.m = a.object = a.number = a.string = a.o = null,
        r.length < w && r.push(a)
    }

    function n(a, b, c) {
        b || (b = 0),
        void 0 === c && (c = a ? a.length : 0);
        var d = -1;
        c = c - b || 0;
        for (var e = Array(0 > c ? 0 : c); ++d < c;)
        e[d] = a[b + d];
        return e
    }

    function o(c) {
        function q(a) {
            return a && "object" == typeof a && !Pb(a) && vb.call(a, "__wrapped__") ? a : new r(a)
        }

        function r(a, b) {
            this.__chain__ = !! b,
            this.__wrapped__ = a
        }

        function w(a) {
            function b() {
                if (d) {
                    var a = n(d);
                    wb.apply(a, arguments)
                }
                if (this instanceof b) {
                    var f = aa(c.prototype),
                        a = c.apply(f, a || arguments);
                    return xa(a) ? a : f
                }
                return c.apply(e, a || arguments)
            }
            var c = a[0],
                d = a[2],
                e = a[4];
            return Ob(b, a),
            b
        }

        function $(a, b, c, d, e) {
            if (c) {
                var f = c(a);
                if (void 0 !== f) return f
            }
            if (!xa(a)) return a;
            var g = ob.call(a);
            if (!V[g] || !Nb.nodeClass && j(a)) return a;
            var i = Lb[g];
            switch (g) {
                case N:
                case O:
                    return new i(+a);
                case R:
                case U:
                    return new i(a);
                case T:
                    return f = i(a.source, C.exec(a)),
                    f.lastIndex = a.lastIndex,
                    f
            }
            if (g = Pb(a),
            b) {
                var k = !d;
                d || (d = h()),
                e || (e = h());
                for (var m = d.length; m--;)
                if (d[m] == a) return e[m];
                f = g ? i(a.length) : {}
            } else f = g ? n(a) : $b({}, a);
            return g && (vb.call(a, "index") && (f.index = a.index),
            vb.call(a, "input") && (f.input = a.input)),
            b ? (d.push(a),
            e.push(f), (g ? Zb : bc)(a, function(a, g) {
                f[g] = $(a, b, c, d, e)
            }),
            k && (l(d),
            l(e)),
            f) : f
        }

        function aa(a) {
            return xa(a) ? Cb(a) : {}
        }

        function ba(a, b, c) {
            if ("function" != typeof a) return Wa;
            if (void 0 === b || !("prototype" in a)) return a;
            var d = a.__bindData__;
            if (void 0 === d && (Nb.funcNames && (d = !a.name), !(d = d || !Nb.funcDecomp))) {
                var e = tb.call(a);
                Nb.funcNames || (d = !D.test(e)),
                d || (d = H.test(e),
                Ob(a, d))
            }
            if (!1 === d || !0 !== d && 1 & d[1]) return a;
            switch (c) {
                case 1:
                    return function(c) {
                        return a.call(b, c)
                    };
                case 2:
                    return function(c, d) {
                        return a.call(b, c, d)
                    };
                case 3:
                    return function(c, d, e) {
                        return a.call(b, c, d, e)
                    };
                case 4:
                    return function(c, d, e, f) {
                        return a.call(b, c, d, e, f)
                    }
            }
            return Ua(a, b)
        }

        function ca(a) {
            function b() {
                var a = i ? g : this;
                if (e) {
                    var o = n(e);
                    wb.apply(o, arguments)
                }
                return (f || k) && (o || (o = n(arguments)),
                f && wb.apply(o, f),
                k && o.length < h) ? (d |= 16,
                ca([c, l ? d : -4 & d, o, null, g, h])) : (o || (o = arguments),
                j && (c = a[m]),
                this instanceof b ? (a = aa(c.prototype),
                o = c.apply(a, o),
                xa(o) ? o : a) : c.apply(a, o))
            }
            var c = a[0],
                d = a[1],
                e = a[2],
                f = a[3],
                g = a[4],
                h = a[5],
                i = 1 & d,
                j = 2 & d,
                k = 4 & d,
                l = 8 & d,
                m = c;
            return Ob(b, a),
            b
        }

        function da(c, d) {
            var e = -1,
                g = oa(),
                h = c ? c.length : 0,
                i = h >= v && g === a,
                j = [];
            if (i) {
                var k = f(d);
                k ? (g = b,
                d = k) : i = !1
            }
            for (; ++e < h;)
            k = c[e],
            0 > g(d, k) && j.push(k);
            return i && m(d),
            j
        }

        function fa(a, b, c, d) {
            d = (d || 0) - 1;
            for (var e = a ? a.length : 0, f = []; ++d < e;) {
                var g = a[d];
                if (g && "object" == typeof g && "number" == typeof g.length && (Pb(g) || sa(g))) {
                    b || (g = fa(g, b, c));
                    var h = -1,
                        i = g.length,
                        j = f.length;
                    for (f.length += i; ++h < i;)
                    f[j++] = g[h]
                } else c || f.push(g)
            }
            return f
        }

        function ga(a, b, c, d, e, f) {
            if (c) {
                var g = c(a, b);
                if (void 0 !== g) return !!g
            }
            if (a === b) return 0 !== a || 1 / a == 1 / b;
            if (a === a && !(a && Z[typeof a] || b && Z[typeof b])) return !1;
            if (null == a || null == b) return a === b;
            var i = ob.call(a),
                k = ob.call(b);
            if (i == L && (i = S),
            k == L && (k = S),
            i != k) return !1;
            switch (i) {
                case N:
                case O:
                    return +a == +b;
                case R:
                    return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;
                case T:
                case U:
                    return a == hb(b)
            }
            if (!(k = i == M)) {
                var m = vb.call(a, "__wrapped__"),
                    n = vb.call(b, "__wrapped__");
                if (m || n) return ga(m ? a.__wrapped__ : a, n ? b.__wrapped__ : b, c, d, e, f);
                if (i != S || !Nb.nodeClass && (j(a) || j(b))) return !1;
                if (i = !Nb.argsObject && sa(a) ? fb : a.constructor,
                m = !Nb.argsObject && sa(b) ? fb : b.constructor,
                i != m && !(wa(i) && i instanceof i && wa(m) && m instanceof m) && "constructor" in a && "constructor" in b) return !1
            }
            for (i = !e,
            e || (e = h()),
            f || (f = h()),
            m = e.length; m--;)
            if (e[m] == a) return f[m] == b;
            var o = 0,
                g = !0;
            if (e.push(a),
            f.push(b),
            k) {
                if (m = a.length,
                o = b.length, (g = o == m) || d) for (; o--;)
                if (k = m,
                n = b[o],
                d) for (; k-- && !(g = ga(a[k], n, c, d, e, f)););
                else if (!(g = ga(a[o], n, c, d, e, f))) break
            } else ac(b, function(b, h, i) {
                return vb.call(i, h) ? (o++,
                g = vb.call(a, h) && ga(a[h], b, c, d, e, f)) : void 0
            }),
            g && !d && ac(a, function(a, b, c) {
                return vb.call(c, b) ? g = -1 < --o : void 0
            });
            return e.pop(),
            f.pop(),
            i && (l(e),
            l(f)),
            g
        }

        function ha(a, b, c, d, e) {
            (Pb(b) ? Fa : bc)(b, function(b, f) {
                var g, h, i = b,
                    j = a[f];
                if (b && ((h = Pb(b)) || cc(b))) {
                    for (i = d.length; i--;)
                    if (g = d[i] == b) {
                        j = e[i];
                        break
                    }
                    if (!g) {
                        var k;
                        c && (i = c(j, b),
                        k = void 0 !== i) && (j = i),
                        k || (j = h ? Pb(j) ? j : [] : cc(j) ? j : {}),
                        d.push(b),
                        e.push(j),
                        k || ha(j, b, c, d, e)
                    }
                } else c && void 0 === (i = c(j, b)) && (i = b),
                void 0 !== i && (j = i);
                a[f] = j
            })
        }

        function ia(a, b) {
            return a + sb(Kb() * (b - a + 1))
        }

        function ja(c, d, e) {
            var g = -1,
                i = oa(),
                j = c ? c.length : 0,
                k = [],
                n = !d && j >= v && i === a,
                o = e || n ? h() : k;
            for (n && (o = f(o),
            i = b); ++g < j;) {
                var p = c[g],
                    q = e ? e(p, g, c) : p;
                (d ? !g || o[o.length - 1] !== q : 0 > i(o, q)) && ((e || n) && o.push(q),
                k.push(p))
            }
            return n ? (l(o.k),
            m(o)) : e && l(o),
            k
        }

        function ka(a) {
            return function(b, c, d) {
                var e = {};
                if (c = q.createCallback(c, d, 3),
                Pb(b)) {
                    d = -1;
                    for (var f = b.length; ++d < f;) {
                        var g = b[d];
                        a(e, g, c(g, d, b), b)
                    }
                } else Zb(b, function(b, d, f) {
                    a(e, b, c(b, d, f), f)
                });
                return e
            }
        }

        function la(a, b, c, d, e, f) {
            var g = 1 & b,
                h = 4 & b,
                i = 16 & b,
                j = 32 & b;
            if (!(2 & b || wa(a))) throw new ib;
            i && !c.length && (b &= -17,
            i = c = !1),
            j && !d.length && (b &= -33,
            j = d = !1);
            var k = a && a.__bindData__;
            return k && !0 !== k ? (k = n(k),
            k[2] && (k[2] = n(k[2])),
            k[3] && (k[3] = n(k[3])), !g || 1 & k[1] || (k[4] = e), !g && 1 & k[1] && (b |= 8), !h || 4 & k[1] || (k[5] = f),
            i && wb.apply(k[2] || (k[2] = []), c),
            j && Ab.apply(k[3] || (k[3] = []), d),
            k[1] |= b,
            la.apply(null, k)) : (1 == b || 17 === b ? w : ca)([a, b, c, d, e, f])
        }

        function ma() {
            Y.h = K,
            Y.b = Y.c = Y.g = Y.i = "",
            Y.e = "t",
            Y.j = !0;
            for (var a, b = 0; a = arguments[b]; b++)
            for (var c in a)
            Y[c] = a[c];
            b = Y.a,
            Y.d = /^[^,]+/.exec(b)[0],
            a = cb,
            b = "return function(" + b + "){",
            c = Y;
            var d = "var n,t=" + c.d + ",E=" + c.e + ";if(!t)return E;" + c.i + ";";
            c.b ? (d += "var u=t.length;n=-1;if(" + c.b + "){",
            Nb.unindexedChars && (d += "if(s(t)){t=t.split('')}"),
            d += "while(++n<u){" + c.g + ";}}else{") : Nb.nonEnumArgs && (d += "var u=t.length;n=-1;if(u&&p(t)){while(++n<u){n+='';" + c.g + ";}}else{"),
            Nb.enumPrototypes && (d += "var G=typeof t=='function';"),
            Nb.enumErrorProps && (d += "var F=t===k||t instanceof Error;");
            var e = [];
            if (Nb.enumPrototypes && e.push('!(G&&n=="prototype")'),
            Nb.enumErrorProps && e.push('!(F&&(n=="message"||n=="name"))'),
            c.j && c.f) d += "var C=-1,D=B[typeof t]&&v(t),u=D?D.length:0;while(++C<u){n=D[C];",
            e.length && (d += "if(" + e.join("&&") + "){"),
            d += c.g + ";",
            e.length && (d += "}"),
            d += "}";
            else if (d += "for(n in t){",
            c.j && e.push("m.call(t, n)"),
            e.length && (d += "if(" + e.join("&&") + "){"),
            d += c.g + ";",
            e.length && (d += "}"),
            d += "}",
            Nb.nonEnumShadows) {
                for (d += "if(t!==A){var i=t.constructor,r=t===(i&&i.prototype),f=t===J?I:t===k?j:L.call(t),x=y[f];",
                k = 0; 7 > k; k++)
                d += "n='" + c.h[k] + "';if((!(r&&x[n])&&m.call(t,n))",
                c.j || (d += "||(!x[n]&&t[n]!==A[n])"),
                d += "){" + c.g + "}";
                d += "}"
            }
            return (c.b || Nb.nonEnumArgs) && (d += "}"),
            d += c.c + ";return E",
            a("d,j,k,m,o,p,q,s,v,A,B,y,I,J,L", b + d + "}")(ba, P, kb, vb, t, sa, Pb, za, Y.f, lb, Z, Mb, U, mb, ob)
        }

        function na(a) {
            return Vb[a]
        }

        function oa() {
            var b = (b = q.indexOf) === Oa ? a : b;
            return b
        }

        function pa(a) {
            return "function" == typeof a && pb.test(a)
        }

        function qa(a) {
            var b, c;
            return !(!(a && ob.call(a) == S && (b = a.constructor, !wa(b) || b instanceof b)) || !Nb.argsClass && sa(a) || !Nb.nodeClass && j(a)) && (Nb.ownLast ? (ac(a, function(a, b, d) {
                return c = vb.call(d, b), !1
            }), !1 !== c) : (ac(a, function(a, b) {
                c = b
            }),
            void 0 === c || vb.call(a, c)))
        }

        function ra(a) {
            return Wb[a]
        }

        function sa(a) {
            return a && "object" == typeof a && "number" == typeof a.length && ob.call(a) == L || !1
        }

        function ta(a, b, c) {
            var d = Rb(a),
                e = d.length;
            for (b = ba(b, c, 3); e-- && (c = d[e], !1 !== b(a[c], c, a)););
            return a
        }

        function ua(a) {
            var b = [];
            return ac(a, function(a, c) {
                wa(a) && b.push(c)
            }),
            b.sort()
        }

        function va(a) {
            for (var b = -1, c = Rb(a), d = c.length, e = {}; ++b < d;) {
                var f = c[b];
                e[a[f]] = f
            }
            return e
        }

        function wa(a) {
            return "function" == typeof a
        }

        function xa(a) {
            return !(!a || !Z[typeof a])
        }

        function ya(a) {
            return "number" == typeof a || a && "object" == typeof a && ob.call(a) == R || !1
        }

        function za(a) {
            return "string" == typeof a || a && "object" == typeof a && ob.call(a) == U || !1
        }

        function Aa(a) {
            for (var b = -1, c = Rb(a), d = c.length, e = _a(d); ++b < d;)
            e[b] = a[c[b]];
            return e
        }

        function Ba(a, b, c) {
            var d = -1,
                e = oa(),
                f = a ? a.length : 0,
                g = !1;
            return c = (0 > c ? Hb(0, f + c) : c) || 0,
            Pb(a) ? g = -1 < e(a, b, c) : "number" == typeof f ? g = -1 < (za(a) ? a.indexOf(b, c) : e(a, b, c)) : Zb(a, function(a) {
                return ++d < c ? void 0 : !(g = a === b)
            }),
            g
        }

        function Ca(a, b, c) {
            var d = !0;
            if (b = q.createCallback(b, c, 3),
            Pb(a)) {
                c = -1;
                for (var e = a.length; ++c < e && (d = !! b(a[c], c, a)););
            } else Zb(a, function(a, c, e) {
                return d = !! b(a, c, e)
            });
            return d
        }

        function Da(a, b, c) {
            var d = [];
            if (b = q.createCallback(b, c, 3),
            Pb(a)) {
                c = -1;
                for (var e = a.length; ++c < e;) {
                    var f = a[c];
                    b(f, c, a) && d.push(f)
                }
            } else Zb(a, function(a, c, e) {
                b(a, c, e) && d.push(a)
            });
            return d
        }

        function Ea(a, b, c) {
            if (b = q.createCallback(b, c, 3), !Pb(a)) {
                var d;
                return Zb(a, function(a, c, e) {
                    return b(a, c, e) ? (d = a, !1) : void 0
                }),
                d
            }
            c = -1;
            for (var e = a.length; ++c < e;) {
                var f = a[c];
                if (b(f, c, a)) return f
            }
        }

        function Fa(a, b, c) {
            if (b && void 0 === c && Pb(a)) {
                c = -1;
                for (var d = a.length; ++c < d && !1 !== b(a[c], c, a););
            } else Zb(a, b, c);
            return a
        }

        function Ga(a, b, c) {
            var d = a,
                e = a ? a.length : 0;
            if (b = b && void 0 === c ? b : ba(b, c, 3),
            Pb(a)) for (; e-- && !1 !== b(a[e], e, a););
            else {
                if ("number" != typeof e) var f = Rb(a),
                    e = f.length;
                else Nb.unindexedChars && za(a) && (d = a.split(""));
                Zb(a, function(a, c, g) {
                    return c = f ? f[--e] : --e,
                    b(d[c], c, g)
                })
            }
            return a
        }

        function Ha(a, b, c) {
            var d = -1,
                e = a ? a.length : 0,
                f = _a("number" == typeof e ? e : 0);
            if (b = q.createCallback(b, c, 3),
            Pb(a)) for (; ++d < e;)
            f[d] = b(a[d], d, a);
            else Zb(a, function(a, c, e) {
                f[++d] = b(a, c, e)
            });
            return f
        }

        function Ia(a, b, c) {
            var e = -1 / 0,
                f = e;
            if ("function" != typeof b && c && c[b] === a && (b = null),
            null == b && Pb(a)) {
                c = -1;
                for (var g = a.length; ++c < g;) {
                    var h = a[c];
                    h > f && (f = h)
                }
            } else b = null == b && za(a) ? d : q.createCallback(b, c, 3),
            Zb(a, function(a, c, d) {
                (c = b(a, c, d)) > e && (e = c,
                f = a)
            });
            return f
        }

        function Ja(a, b, c, d) {
            var e = 3 > arguments.length;
            if (b = q.createCallback(b, d, 4),
            Pb(a)) {
                var f = -1,
                    g = a.length;
                for (e && (c = a[++f]); ++f < g;)
                c = b(c, a[f], f, a)
            } else Zb(a, function(a, d, f) {
                c = e ? (e = !1,
                a) : b(c, a, d, f)
            });
            return c
        }

        function Ka(a, b, c, d) {
            var e = 3 > arguments.length;
            return b = q.createCallback(b, d, 4),
            Ga(a, function(a, d, f) {
                c = e ? (e = !1,
                a) : b(c, a, d, f)
            }),
            c
        }

        function La(a) {
            var b = -1,
                c = a ? a.length : 0,
                d = _a("number" == typeof c ? c : 0);
            return Fa(a, function(a) {
                var c = ia(0, ++b);
                d[b] = d[c],
                d[c] = a
            }),
            d
        }

        function Ma(a, b, c) {
            var d;
            if (b = q.createCallback(b, c, 3),
            Pb(a)) {
                c = -1;
                for (var e = a.length; ++c < e && !(d = b(a[c], c, a)););
            } else Zb(a, function(a, c, e) {
                return !(d = b(a, c, e))
            });
            return !!d
        }

        function Na(a, b, c) {
            var d = 0,
                e = a ? a.length : 0;
            if ("number" != typeof b && null != b) {
                var f = -1;
                for (b = q.createCallback(b, c, 3); ++f < e && b(a[f], f, a);)
                d++
            } else if (null == (d = b) || c) return a ? a[0] : p;
            return n(a, 0, Ib(Hb(0, d), e))
        }

        function Oa(b, c, d) {
            if ("number" == typeof d) {
                var e = b ? b.length : 0;
                d = 0 > d ? Hb(0, e + d) : d || 0
            } else if (d) return d = Qa(b, c),
            b[d] === c ? d : -1;
            return a(b, c, d)
        }

        function Pa(a, b, c) {
            if ("number" != typeof b && null != b) {
                var d = 0,
                    e = -1,
                    f = a ? a.length : 0;
                for (b = q.createCallback(b, c, 3); ++e < f && b(a[e], e, a);)
                d++
            } else d = null == b || c ? 1 : Hb(0, b);
            return n(a, d)
        }

        function Qa(a, b, c, d) {
            var e = 0,
                f = a ? a.length : e;
            for (c = c ? q.createCallback(c, d, 1) : Wa,
            b = c(b); e < f;)
            d = e + f >>> 1,
            c(a[d]) < b ? e = d + 1 : f = d;
            return e
        }

        function Ra(a, b, c, d) {
            return "boolean" != typeof b && null != b && (d = c,
            c = "function" != typeof b && d && d[b] === a ? null : b,
            b = !1),
            null != c && (c = q.createCallback(c, d, 3)),
            ja(a, b, c)
        }

        function Sa() {
            for (var a = 1 < arguments.length ? arguments : arguments[0], b = -1, c = a ? Ia(gc(a, "length")) : 0, d = _a(0 > c ? 0 : c); ++b < c;)
            d[b] = gc(a, b);
            return d
        }

        function Ta(a, b) {
            var c = -1,
                d = a ? a.length : 0,
                e = {};
            for (b || !d || Pb(a[0]) || (b = []); ++c < d;) {
                var f = a[c];
                b ? e[f] = b[c] : f && (e[f[0]] = f[1])
            }
            return e
        }

        function Ua(a, b) {
            return 2 < arguments.length ? la(a, 17, n(arguments, 2), null, b) : la(a, 1, null, null, b)
        }

        function Va(a, b, c) {
            var d, e, f, g, h, i, j, k = 0,
                l = !1,
                m = !0;
            if (!wa(a)) throw new ib;
            if (b = Hb(0, b) || 0, !0 === c) var n = !0,
                m = !1;
            else xa(c) && (n = c.leading,
            l = "maxWait" in c && (Hb(b, c.maxWait) || 0),
            m = "trailing" in c ? c.trailing : m);
            var o = function() {
                var c = b - (hc() - g);
                0 < c ? i = yb(o, c) : (e && rb(e),
                c = j,
                e = i = j = p,
                c && (k = hc(),
                f = a.apply(h, d),
                i || e || (d = h = null)))
            }, q = function() {
                i && rb(i),
                e = i = j = p, (m || l !== b) && (k = hc(),
                f = a.apply(h, d),
                i || e || (d = h = null))
            };
            return function() {
                if (d = arguments,
                g = hc(),
                h = this,
                j = m && (i || !n), !1 === l) var c = n && !i;
                else {
                    e || n || (k = g);
                    var p = l - (g - k),
                        r = 0 >= p;
                    r ? (e && (e = rb(e)),
                    k = g,
                    f = a.apply(h, d)) : e || (e = yb(q, p))
                }
                return r && i ? i = rb(i) : i || b === l || (i = yb(o, b)),
                c && (r = !0,
                f = a.apply(h, d)), !r || i || e || (d = h = null),
                f
            }
        }

        function Wa(a) {
            return a
        }

        function Xa(a, b, c) {
            var d = !0,
                e = b && ua(b);
            b && (c || e.length) || (null == c && (c = b),
            f = r,
            b = a,
            a = q,
            e = ua(b)), !1 === c ? d = !1 : xa(c) && "chain" in c && (d = c.chain);
            var f = a,
                g = wa(f);
            Fa(e, function(c) {
                var e = a[c] = b[c];
                g && (f.prototype[c] = function() {
                    var b = this.__chain__,
                        c = this.__wrapped__,
                        g = [c];
                    if (wb.apply(g, arguments),
                    g = e.apply(a, g),
                    d || b) {
                        if (c === g && xa(g)) return this;
                        g = new f(g),
                        g.__chain__ = b
                    }
                    return g
                })
            })
        }

        function Ya() {}

        function Za(a) {
            return function(b) {
                return b[a]
            }
        }

        function $a() {
            return this.__wrapped__
        }
        c = c ? ea.defaults(_.Object(), c, ea.pick(_, J)) : _;
        var _a = c.Array,
            ab = c.Boolean,
            bb = c.Date,
            cb = c.Function,
            db = c.Math,
            eb = c.Number,
            fb = c.Object,
            gb = c.RegExp,
            hb = c.String,
            ib = c.TypeError,
            jb = [],
            kb = c.Error.prototype,
            lb = fb.prototype,
            mb = hb.prototype,
            nb = c._,
            ob = lb.toString,
            pb = gb("^" + hb(ob).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/toString| for [^\]]+/g, ".*?") + "$"),
            qb = db.ceil,
            rb = c.clearTimeout,
            sb = db.floor,
            tb = cb.prototype.toString,
            ub = pa(ub = fb.getPrototypeOf) && ub,
            vb = lb.hasOwnProperty,
            wb = jb.push,
            xb = lb.propertyIsEnumerable,
            yb = c.setTimeout,
            zb = jb.splice,
            Ab = jb.unshift,
            Bb = function() {
                try {
                    var a = {}, b = pa(b = fb.defineProperty) && b,
                        c = b(a, a, a) && b
                } catch (a) {}
                return c
            }(),
            Cb = pa(Cb = fb.create) && Cb,
            Db = pa(Db = _a.isArray) && Db,
            Eb = c.isFinite,
            Fb = c.isNaN,
            Gb = pa(Gb = fb.keys) && Gb,
            Hb = db.max,
            Ib = db.min,
            Jb = c.parseInt,
            Kb = db.random,
            Lb = {};
        Lb[M] = _a,
        Lb[N] = ab,
        Lb[O] = bb,
        Lb[Q] = cb,
        Lb[S] = fb,
        Lb[R] = eb,
        Lb[T] = gb,
        Lb[U] = hb;
        var Mb = {};
        Mb[M] = Mb[O] = Mb[R] = {
            constructor: !0,
            toLocaleString: !0,
            toString: !0,
            valueOf: !0
        },
        Mb[N] = Mb[U] = {
            constructor: !0,
            toString: !0,
            valueOf: !0
        },
        Mb[P] = Mb[Q] = Mb[T] = {
            constructor: !0,
            toString: !0
        },
        Mb[S] = {
            constructor: !0
        },

        function() {
            for (var a = K.length; a--;) {
                var b, c = K[a];
                for (b in Mb)
                vb.call(Mb, b) && !vb.call(Mb[b], c) && (Mb[b][c] = !1)
            }
        }(),
        r.prototype = q.prototype;
        var Nb = q.support = {};
        ! function() {
            var a = function() {
                this.x = 1
            }, b = {
                0: 1,
                length: 1
            }, d = [];
            a.prototype = {
                valueOf: 1,
                y: 1
            };
            for (var e in new a)
            d.push(e);
            for (e in arguments);
            Nb.argsClass = ob.call(arguments) == L,
            Nb.argsObject = arguments.constructor == fb && !(arguments instanceof _a),
            Nb.enumErrorProps = xb.call(kb, "message") || xb.call(kb, "name"),
            Nb.enumPrototypes = xb.call(a, "prototype"),
            Nb.funcDecomp = !pa(c.WinRTError) && H.test(o),
            Nb.funcNames = "string" == typeof cb.name,
            Nb.nonEnumArgs = 0 != e,
            Nb.nonEnumShadows = !/valueOf/.test(d),
            Nb.ownLast = "x" != d[0],
            Nb.spliceObjects = (jb.splice.call(b, 0, 1), !b[0]),
            Nb.unindexedChars = "xx" != "x" [0] + fb("x")[0];
            try {
                Nb.nodeClass = !(ob.call(document) == S && !({
                    toString: 0
                } + ""))
            } catch (a) {
                Nb.nodeClass = !0
            }
        }(1),
        q.templateSettings = {
            escape: /<%-([\s\S]+?)%>/g,
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: E,
            variable: "",
            imports: {
                _: q
            }
        },
        Cb || (aa = function() {
            function a() {}
            return function(b) {
                if (xa(b)) {
                    a.prototype = b;
                    var d = new a;
                    a.prototype = null
                }
                return d || c.Object()
            }
        }());
        var Ob = Bb ? function(a, b) {
                X.value = b,
                Bb(a, "__bindData__", X)
            } : Ya;
        Nb.argsClass || (sa = function(a) {
            return a && "object" == typeof a && "number" == typeof a.length && vb.call(a, "callee") && !xb.call(a, "callee") || !1
        });
        var Pb = Db || function(a) {
                return a && "object" == typeof a && "number" == typeof a.length && ob.call(a) == M || !1
            }, Qb = ma({
                a: "z",
                e: "[]",
                i: "if(!(B[typeof z]))return E",
                g: "E.push(n)"
            }),
            Rb = Gb ? function(a) {
                return xa(a) ? Nb.enumPrototypes && "function" == typeof a || Nb.nonEnumArgs && a.length && sa(a) ? Qb(a) : Gb(a) : []
            } : Qb,
            Sb = {
                a: "g,e,K",
                i: "e=e&&typeof K=='undefined'?e:d(e,K,3)",
                b: "typeof u=='number'",
                v: Rb,
                g: "if(e(t[n],n,g)===false)return E"
            }, Tb = {
                a: "z,H,l",
                i: "var a=arguments,b=0,c=typeof l=='number'?2:a.length;while(++b<c){t=a[b];if(t&&B[typeof t]){",
                v: Rb,
                g: "if(typeof E[n]=='undefined')E[n]=t[n]",
                c: "}}"
            }, Ub = {
                i: "if(!B[typeof t])return E;" + Sb.i,
                b: !1
            }, Vb = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"
            }, Wb = va(Vb),
            Xb = gb("(" + Rb(Wb).join("|") + ")", "g"),
            Yb = gb("[" + Rb(Vb).join("") + "]", "g"),
            Zb = ma(Sb),
            $b = ma(Tb, {
                i: Tb.i.replace(";", ";if(c>3&&typeof a[c-2]=='function'){var e=d(a[--c-1],a[c--],2)}else if(c>2&&typeof a[c-1]=='function'){e=a[--c]}"),
                g: "E[n]=e?e(E[n],t[n]):t[n]"
            }),
            _b = ma(Tb),
            ac = ma(Sb, Ub, {
                j: !1
            }),
            bc = ma(Sb, Ub);
        wa(/x/) && (wa = function(a) {
            return "function" == typeof a && ob.call(a) == Q
        });
        var cc = ub ? function(a) {
                if (!a || ob.call(a) != S || !Nb.argsClass && sa(a)) return !1;
                var b = a.valueOf,
                    c = pa(b) && (c = ub(b)) && ub(c);
                return c ? a == c || ub(a) == c : qa(a)
            } : qa,
            dc = ka(function(a, b, c) {
                vb.call(a, c) ? a[c]++ : a[c] = 1
            }),
            ec = ka(function(a, b, c) {
                (vb.call(a, c) ? a[c] : a[c] = []).push(b)
            }),
            fc = ka(function(a, b, c) {
                a[c] = b
            }),
            gc = Ha,
            hc = pa(hc = bb.now) && hc || function() {
                return (new bb).getTime()
            }, ic = 8 == Jb(x + "08") ? Jb : function(a, b) {
                return Jb(za(a) ? a.replace(F, "") : a, b || 0)
            };
        return q.after = function(a, b) {
            if (!wa(b)) throw new ib;
            return function() {
                return 1 > --a ? b.apply(this, arguments) : void 0
            }
        },
        q.assign = $b,
        q.at = function(a) {
            var b = arguments,
                c = -1,
                d = fa(b, !0, !1, 1),
                b = b[2] && b[2][b[1]] === a ? 1 : d.length,
                e = _a(b);
            for (Nb.unindexedChars && za(a) && (a = a.split("")); ++c < b;)
            e[c] = a[d[c]];
            return e
        },
        q.bind = Ua,
        q.bindAll = function(a) {
            for (var b = 1 < arguments.length ? fa(arguments, !0, !1, 1) : ua(a), c = -1, d = b.length; ++c < d;) {
                var e = b[c];
                a[e] = la(a[e], 1, null, null, a)
            }
            return a
        },
        q.bindKey = function(a, b) {
            return 2 < arguments.length ? la(b, 19, n(arguments, 2), null, a) : la(b, 3, null, null, a)
        },
        q.chain = function(a) {
            return a = new r(a),
            a.__chain__ = !0,
            a
        },
        q.compact = function(a) {
            for (var b = -1, c = a ? a.length : 0, d = []; ++b < c;) {
                var e = a[b];
                e && d.push(e)
            }
            return d
        },
        q.compose = function() {
            for (var a = arguments, b = a.length; b--;)
            if (!wa(a[b])) throw new ib;
            return function() {
                for (var b = arguments, c = a.length; c--;)
                b = [a[c].apply(this, b)];
                return b[0]
            }
        },
        q.constant = function(a) {
            return function() {
                return a
            }
        },
        q.countBy = dc,
        q.create = function(a, b) {
            var c = aa(a);
            return b ? $b(c, b) : c
        },
        q.createCallback = function(a, b, c) {
            var d = typeof a;
            if (null == a || "function" == d) return ba(a, b, c);
            if ("object" != d) return Za(a);
            var e = Rb(a),
                f = e[0],
                g = a[f];
            return 1 != e.length || g !== g || xa(g) ? function(b) {
                for (var c = e.length, d = !1; c-- && (d = ga(b[e[c]], a[e[c]], null, !0)););
                return d
            } : function(a) {
                return a = a[f],
                g === a && (0 !== g || 1 / g == 1 / a)
            }
        },
        q.curry = function(a, b) {
            return b = "number" == typeof b ? b : +b || a.length,
            la(a, 4, null, null, null, b)
        },
        q.debounce = Va,
        q.defaults = _b,
        q.defer = function(a) {
            if (!wa(a)) throw new ib;
            var b = n(arguments, 1);
            return yb(function() {
                a.apply(p, b)
            }, 1)
        },
        q.delay = function(a, b) {
            if (!wa(a)) throw new ib;
            var c = n(arguments, 2);
            return yb(function() {
                a.apply(p, c)
            }, b)
        },
        q.difference = function(a) {
            return da(a, fa(arguments, !0, !0, 1))
        },
        q.filter = Da,
        q.flatten = function(a, b, c, d) {
            return "boolean" != typeof b && null != b && (d = c,
            c = "function" != typeof b && d && d[b] === a ? null : b,
            b = !1),
            null != c && (a = Ha(a, c, d)),
            fa(a, b)
        },
        q.forEach = Fa,
        q.forEachRight = Ga,
        q.forIn = ac,
        q.forInRight = function(a, b, c) {
            var d = [];
            ac(a, function(a, b) {
                d.push(b, a)
            });
            var e = d.length;
            for (b = ba(b, c, 3); e-- && !1 !== b(d[e--], d[e], a););
            return a
        },
        q.forOwn = bc,
        q.forOwnRight = ta,
        q.functions = ua,
        q.groupBy = ec,
        q.indexBy = fc,
        q.initial = function(a, b, c) {
            var d = 0,
                e = a ? a.length : 0;
            if ("number" != typeof b && null != b) {
                var f = e;
                for (b = q.createCallback(b, c, 3); f-- && b(a[f], f, a);)
                d++
            } else d = null == b || c ? 1 : b || d;
            return n(a, 0, Ib(Hb(0, e - d), e))
        },
        q.intersection = function() {
            for (var c = [], d = -1, e = arguments.length, g = h(), i = oa(), j = i === a, k = h(); ++d < e;) {
                var n = arguments[d];
                (Pb(n) || sa(n)) && (c.push(n),
                g.push(j && n.length >= v && f(d ? c[d] : k)))
            }
            var j = c[0],
                o = -1,
                p = j ? j.length : 0,
                q = [];
            a: for (; ++o < p;) {
                var r = g[0],
                    n = j[o];
                if (0 > (r ? b(r, n) : i(k, n))) {
                    for (d = e, (r || k).push(n); --d;)
                    if (r = g[d],
                    0 > (r ? b(r, n) : i(c[d], n))) continue a;
                    q.push(n)
                }
            }
            for (; e--;)
            (r = g[e]) && m(r);
            return l(g),
            l(k),
            q
        },
        q.invert = va,
        q.invoke = function(a, b) {
            var c = n(arguments, 2),
                d = -1,
                e = "function" == typeof b,
                f = a ? a.length : 0,
                g = _a("number" == typeof f ? f : 0);
            return Fa(a, function(a) {
                g[++d] = (e ? b : a[b]).apply(a, c)
            }),
            g
        },
        q.keys = Rb,
        q.map = Ha,
        q.mapValues = function(a, b, c) {
            var d = {};
            return b = q.createCallback(b, c, 3),
            bc(a, function(a, c, e) {
                d[c] = b(a, c, e)
            }),
            d
        },
        q.max = Ia,
        q.memoize = function(a, b) {
            if (!wa(a)) throw new ib;
            var c = function() {
                var d = c.cache,
                    e = b ? b.apply(this, arguments) : u + arguments[0];
                return vb.call(d, e) ? d[e] : d[e] = a.apply(this, arguments)
            };
            return c.cache = {},
            c
        },
        q.merge = function(a) {
            var b = arguments,
                c = 2;
            if (!xa(a)) return a;
            if ("number" != typeof b[2] && (c = b.length),
            3 < c && "function" == typeof b[c - 2]) var d = ba(b[--c - 1], b[c--], 2);
            else 2 < c && "function" == typeof b[c - 1] && (d = b[--c]);
            for (var b = n(arguments, 1, c), e = -1, f = h(), g = h(); ++e < c;)
            ha(a, b[e], d, f, g);
            return l(f),
            l(g),
            a
        },
        q.min = function(a, b, c) {
            var e = 1 / 0,
                f = e;
            if ("function" != typeof b && c && c[b] === a && (b = null),
            null == b && Pb(a)) {
                c = -1;
                for (var g = a.length; ++c < g;) {
                    var h = a[c];
                    h < f && (f = h)
                }
            } else b = null == b && za(a) ? d : q.createCallback(b, c, 3),
            Zb(a, function(a, c, d) {
                (c = b(a, c, d)) < e && (e = c,
                f = a)
            });
            return f
        },
        q.omit = function(a, b, c) {
            var d = {};
            if ("function" != typeof b) {
                var e = [];
                ac(a, function(a, b) {
                    e.push(b)
                });
                for (var e = da(e, fa(arguments, !0, !1, 1)), f = -1, g = e.length; ++f < g;) {
                    var h = e[f];
                    d[h] = a[h]
                }
            } else b = q.createCallback(b, c, 3),
            ac(a, function(a, c, e) {
                b(a, c, e) || (d[c] = a)
            });
            return d
        },
        q.once = function(a) {
            var b, c;
            if (!wa(a)) throw new ib;
            return function() {
                return b ? c : (b = !0,
                c = a.apply(this, arguments),
                a = null,
                c)
            }
        },
        q.pairs = function(a) {
            for (var b = -1, c = Rb(a), d = c.length, e = _a(d); ++b < d;) {
                var f = c[b];
                e[b] = [f, a[f]]
            }
            return e
        },
        q.partial = function(a) {
            return la(a, 16, n(arguments, 1))
        },
        q.partialRight = function(a) {
            return la(a, 32, null, n(arguments, 1))
        },
        q.pick = function(a, b, c) {
            var d = {};
            if ("function" != typeof b) for (var e = -1, f = fa(arguments, !0, !1, 1), g = xa(a) ? f.length : 0; ++e < g;) {
                var h = f[e];
                h in a && (d[h] = a[h])
            } else b = q.createCallback(b, c, 3),
            ac(a, function(a, c, e) {
                b(a, c, e) && (d[c] = a)
            });
            return d
        },
        q.pluck = gc,
        q.property = Za,
        q.pull = function(a) {
            for (var b = arguments, c = 0, d = b.length, e = a ? a.length : 0; ++c < d;)
            for (var f = -1, g = b[c]; ++f < e;)
            a[f] === g && (zb.call(a, f--, 1),
            e--);
            return a
        },
        q.range = function(a, b, c) {
            a = +a || 0,
            c = "number" == typeof c ? c : +c || 1,
            null == b && (b = a,
            a = 0);
            var d = -1;
            b = Hb(0, qb((b - a) / (c || 1)));
            for (var e = _a(b); ++d < b;)
            e[d] = a,
            a += c;
            return e
        },
        q.reject = function(a, b, c) {
            return b = q.createCallback(b, c, 3),
            Da(a, function(a, c, d) {
                return !b(a, c, d)
            })
        },
        q.remove = function(a, b, c) {
            var d = -1,
                e = a ? a.length : 0,
                f = [];
            for (b = q.createCallback(b, c, 3); ++d < e;)
            c = a[d],
            b(c, d, a) && (f.push(c),
            zb.call(a, d--, 1),
            e--);
            return f
        },
        q.rest = Pa,
        q.shuffle = La,
        q.sortBy = function(a, b, c) {
            var d = -1,
                f = Pb(b),
                g = a ? a.length : 0,
                j = _a("number" == typeof g ? g : 0);
            for (f || (b = q.createCallback(b, c, 3)),
            Fa(a, function(a, c, e) {
                var g = j[++d] = i();
                f ? g.m = Ha(b, function(b) {
                    return a[b]
                }) : (g.m = h())[0] = b(a, c, e),
                g.n = d,
                g.o = a
            }),
            g = j.length,
            j.sort(e); g--;)
            a = j[g],
            j[g] = a.o,
            f || l(a.m),
            m(a);
            return j
        },
        q.tap = function(a, b) {
            return b(a),
            a
        },
        q.throttle = function(a, b, c) {
            var d = !0,
                e = !0;
            if (!wa(a)) throw new ib;
            return !1 === c ? d = !1 : xa(c) && (d = "leading" in c ? c.leading : d,
            e = "trailing" in c ? c.trailing : e),
            W.leading = d,
            W.maxWait = b,
            W.trailing = e,
            Va(a, b, W)
        },
        q.times = function(a, b, c) {
            a = -1 < (a = +a) ? a : 0;
            var d = -1,
                e = _a(a);
            for (b = ba(b, c, 1); ++d < a;)
            e[d] = b(d);
            return e
        },
        q.toArray = function(a) {
            return a && "number" == typeof a.length ? Nb.unindexedChars && za(a) ? a.split("") : n(a) : Aa(a)
        },
        q.transform = function(a, b, c, d) {
            var e = Pb(a);
            if (null == c) if (e) c = [];
            else {
                var f = a && a.constructor;
                c = aa(f && f.prototype)
            }
            return b && (b = q.createCallback(b, d, 4), (e ? Zb : bc)(a, function(a, d, e) {
                return b(c, a, d, e)
            })),
            c
        },
        q.union = function() {
            return ja(fa(arguments, !0, !0))
        },
        q.uniq = Ra,
        q.values = Aa,
        q.where = Da,
        q.without = function(a) {
            return da(a, n(arguments, 1))
        },
        q.wrap = function(a, b) {
            return la(b, 16, [a])
        },
        q.xor = function() {
            for (var a = -1, b = arguments.length; ++a < b;) {
                var c = arguments[a];
                if (Pb(c) || sa(c)) var d = d ? ja(da(d, c).concat(da(c, d))) : c
            }
            return d || []
        },
        q.zip = Sa,
        q.zipObject = Ta,
        q.collect = Ha,
        q.drop = Pa,
        q.each = Fa,
        q.eachRight = Ga,
        q.extend = $b,
        q.methods = ua,
        q.object = Ta,
        q.select = Da,
        q.tail = Pa,
        q.unique = Ra,
        q.unzip = Sa,
        Xa(q),
        q.clone = function(a, b, c, d) {
            return "boolean" != typeof b && null != b && (d = c,
            c = b,
            b = !1),
            $(a, b, "function" == typeof c && ba(c, d, 1))
        },
        q.cloneDeep = function(a, b, c) {
            return $(a, !0, "function" == typeof b && ba(b, c, 1))
        },
        q.contains = Ba,
        q.escape = function(a) {
            return null == a ? "" : hb(a).replace(Yb, na)
        },
        q.every = Ca,
        q.find = Ea,
        q.findIndex = function(a, b, c) {
            var d = -1,
                e = a ? a.length : 0;
            for (b = q.createCallback(b, c, 3); ++d < e;)
            if (b(a[d], d, a)) return d;
            return -1
        },
        q.findKey = function(a, b, c) {
            var d;
            return b = q.createCallback(b, c, 3),
            bc(a, function(a, c, e) {
                return b(a, c, e) ? (d = c, !1) : void 0
            }),
            d
        },
        q.findLast = function(a, b, c) {
            var d;
            return b = q.createCallback(b, c, 3),
            Ga(a, function(a, c, e) {
                return b(a, c, e) ? (d = a, !1) : void 0
            }),
            d
        },
        q.findLastIndex = function(a, b, c) {
            var d = a ? a.length : 0;
            for (b = q.createCallback(b, c, 3); d--;)
            if (b(a[d], d, a)) return d;
            return -1
        },
        q.findLastKey = function(a, b, c) {
            var d;
            return b = q.createCallback(b, c, 3),
            ta(a, function(a, c, e) {
                return b(a, c, e) ? (d = c, !1) : void 0
            }),
            d
        },
        q.has = function(a, b) {
            return !!a && vb.call(a, b)
        },
        q.identity = Wa,
        q.indexOf = Oa,
        q.isArguments = sa,
        q.isArray = Pb,
        q.isBoolean = function(a) {
            return !0 === a || !1 === a || a && "object" == typeof a && ob.call(a) == N || !1
        },
        q.isDate = function(a) {
            return a && "object" == typeof a && ob.call(a) == O || !1
        },
        q.isElement = function(a) {
            return a && 1 === a.nodeType || !1
        },
        q.isEmpty = function(a) {
            var b = !0;
            if (!a) return b;
            var c = ob.call(a),
                d = a.length;
            return c == M || c == U || (Nb.argsClass ? c == L : sa(a)) || c == S && "number" == typeof d && wa(a.splice) ? !d : (bc(a, function() {
                return b = !1
            }),
            b)
        },
        q.isEqual = function(a, b, c, d) {
            return ga(a, b, "function" == typeof c && ba(c, d, 2))
        },
        q.isFinite = function(a) {
            return Eb(a) && !Fb(parseFloat(a))
        },
        q.isFunction = wa,
        q.isNaN = function(a) {
            return ya(a) && a != +a
        },
        q.isNull = function(a) {
            return null === a
        },
        q.isNumber = ya,
        q.isObject = xa,
        q.isPlainObject = cc,
        q.isRegExp = function(a) {
            return a && Z[typeof a] && ob.call(a) == T || !1
        },
        q.isString = za,
        q.isUndefined = function(a) {
            return void 0 === a
        },
        q.lastIndexOf = function(a, b, c) {
            var d = a ? a.length : 0;
            for ("number" == typeof c && (d = (0 > c ? Hb(0, d + c) : Ib(c, d - 1)) + 1); d--;)
            if (a[d] === b) return d;
            return -1
        },
        q.mixin = Xa,
        q.noConflict = function() {
            return c._ = nb,
            this
        },
        q.noop = Ya,
        q.now = hc,
        q.parseInt = ic,
        q.random = function(a, b, c) {
            var d = null == a,
                e = null == b;
            return null == c && ("boolean" == typeof a && e ? (c = a,
            a = 1) : e || "boolean" != typeof b || (c = b,
            e = !0)),
            d && e && (b = 1),
            a = +a || 0,
            e ? (b = a,
            a = 0) : b = +b || 0,
            c || a % 1 || b % 1 ? (c = Kb(),
            Ib(a + c * (b - a + parseFloat("1e-" + ((c + "").length - 1))), b)) : ia(a, b)
        },
        q.reduce = Ja,
        q.reduceRight = Ka,
        q.result = function(a, b) {
            if (a) {
                var c = a[b];
                return wa(c) ? a[b]() : c
            }
        },
        q.runInContext = o,
        q.size = function(a) {
            var b = a ? a.length : 0;
            return "number" == typeof b ? b : Rb(a).length
        },
        q.some = Ma,
        q.sortedIndex = Qa,
        q.template = function(a, b, c) {
            var d = q.templateSettings;
            a = hb(a || ""),
            c = _b({}, c, d);
            var e, f = _b({}, c.imports, d.imports),
                d = Rb(f),
                f = Aa(f),
                h = 0,
                i = c.interpolate || G,
                j = "__p+='",
                i = gb((c.escape || G).source + "|" + i.source + "|" + (i === E ? B : G).source + "|" + (c.evaluate || G).source + "|$", "g");
            a.replace(i, function(b, c, d, f, i, k) {
                return d || (d = f),
                j += a.slice(h, k).replace(I, g),
                c && (j += "'+__e(" + c + ")+'"),
                i && (e = !0,
                j += "';" + i + ";\n__p+='"),
                d && (j += "'+((__t=(" + d + "))==null?'':__t)+'"),
                h = k + b.length,
                b
            }),
            j += "';",
            i = c = c.variable,
            i || (c = "obj",
            j = "with(" + c + "){" + j + "}"),
            j = (e ? j.replace(y, "") : j).replace(z, "$1").replace(A, "$1;"),
            j = "function(" + c + "){" + (i ? "" : c + "||(" + c + "={});") + "var __t,__p='',__e=_.escape" + (e ? ",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}" : ";") + j + "return __p}";
            try {
                var k = cb(d, "return " + j).apply(p, f)
            } catch (a) {
                throw a.source = j,
                a
            }
            return b ? k(b) : (k.source = j,
            k)
        },
        q.unescape = function(a) {
            return null == a ? "" : hb(a).replace(Xb, ra)
        },
        q.uniqueId = function(a) {
            var b = ++s;
            return hb(null == a ? "" : a) + b
        },
        q.all = Ca,
        q.any = Ma,
        q.detect = Ea,
        q.findWhere = Ea,
        q.foldl = Ja,
        q.foldr = Ka,
        q.include = Ba,
        q.inject = Ja,
        Xa(function() {
            var a = {};
            return bc(q, function(b, c) {
                q.prototype[c] || (a[c] = b)
            }),
            a
        }(), !1),
        q.first = Na,
        q.last = function(a, b, c) {
            var d = 0,
                e = a ? a.length : 0;
            if ("number" != typeof b && null != b) {
                var f = e;
                for (b = q.createCallback(b, c, 3); f-- && b(a[f], f, a);)
                d++
            } else if (null == (d = b) || c) return a ? a[e - 1] : p;
            return n(a, Hb(0, e - d))
        },
        q.sample = function(a, b, c) {
            return a && "number" != typeof a.length ? a = Aa(a) : Nb.unindexedChars && za(a) && (a = a.split("")),
            null == b || c ? a ? a[ia(0, a.length - 1)] : p : (a = La(a),
            a.length = Ib(Hb(0, b), a.length),
            a)
        },
        q.take = Na,
        q.head = Na,
        bc(q, function(a, b) {
            var c = "sample" !== b;
            q.prototype[b] || (q.prototype[b] = function(b, d) {
                var e = this.__chain__,
                    f = a(this.__wrapped__, b, d);
                return e || null != b && (!d || c && "function" == typeof b) ? new r(f, e) : f
            })
        }),
        q.VERSION = "2.4.1",
        q.prototype.chain = function() {
            return this.__chain__ = !0,
            this
        },
        q.prototype.toString = function() {
            return hb(this.__wrapped__)
        },
        q.prototype.value = $a,
        q.prototype.valueOf = $a,
        Zb(["join", "pop", "shift"], function(a) {
            var b = jb[a];
            q.prototype[a] = function() {
                var a = this.__chain__,
                    c = b.apply(this.__wrapped__, arguments);
                return a ? new r(c, a) : c
            }
        }),
        Zb(["push", "reverse", "sort", "unshift"], function(a) {
            var b = jb[a];
            q.prototype[a] = function() {
                return b.apply(this.__wrapped__, arguments),
                this
            }
        }),
        Zb(["concat", "slice", "splice"], function(a) {
            var b = jb[a];
            q.prototype[a] = function() {
                return new r(b.apply(this.__wrapped__, arguments), this.__chain__)
            }
        }),
        Nb.spliceObjects || Zb(["pop", "shift", "splice"], function(a) {
            var b = jb[a],
                c = "splice" == a;
            q.prototype[a] = function() {
                var a = this.__chain__,
                    d = this.__wrapped__,
                    e = b.apply(d, arguments);
                return 0 === d.length && delete d[0],
                a || c ? new r(e, a) : e
            }
        }),
        q
    }
    var p, q = [],
        r = [],
        s = 0,
        t = {}, u = +new Date + "",
        v = 75,
        w = 40,
        x = " \t\v\f \ufeff\n\r\u2028\u2029 ᠎             　",
        y = /\b__p\+='';/g,
        z = /\b(__p\+=)''\+/g,
        A = /(__e\(.*?\)|\b__t\))\+'';/g,
        B = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,
        C = /\w*$/,
        D = /^\s*function[ \n\r\t]+\w/,
        E = /<%=([\s\S]+?)%>/g,
        F = RegExp("^[" + x + "]*0+(?=.$)"),
        G = /($^)/,
        H = /\bthis\b/,
        I = /['\n\r\t\u2028\u2029\\]/g,
        J = "Array Boolean Date Error Function Math Number Object RegExp String _ attachEvent clearTimeout isFinite isNaN parseInt setTimeout".split(" "),
        K = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),
        L = "[object Arguments]",
        M = "[object Array]",
        N = "[object Boolean]",
        O = "[object Date]",
        P = "[object Error]",
        Q = "[object Function]",
        R = "[object Number]",
        S = "[object Object]",
        T = "[object RegExp]",
        U = "[object String]",
        V = {};
    V[Q] = !1,
    V[L] = V[M] = V[N] = V[O] = V[R] = V[S] = V[T] = V[U] = !0;
    var W = {
        leading: !1,
        maxWait: 0,
        trailing: !1
    }, X = {
        configurable: !1,
        enumerable: !1,
        value: null,
        writable: !1
    }, Y = {
        a: "",
        b: null,
        c: "",
        d: "",
        e: "",
        v: null,
        g: "",
        h: null,
        support: null,
        i: "",
        j: !1
    }, Z = {
        boolean: !1,

        function: !0,
        object: !0,
        number: !1,
        string: !1,
        undefined: !1
    }, $ = {
        "\\": "\\",
        "'": "'",
        "\n": "n",
        "\r": "r",
        "\t": "t",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }, _ = Z[typeof window] && window || this,
        aa = Z[typeof exports] && exports && !exports.nodeType && exports,
        ba = Z[typeof module] && module && !module.nodeType && module,
        ca = ba && ba.exports === aa && aa,
        da = Z[typeof global] && global;
    !da || da.global !== da && da.window !== da || (_ = da);
    var ea = o();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (_._ = ea,
    define(function() {
        return ea
    })) : aa && ba ? ca ? (ba.exports = ea)._ = ea : aa._ = ea : _._ = ea
}.call(this), ! function() {
    "use strict";

    function a(a) {
        a.fn.swiper = function(b) {
            var d;
            return a(this).each(function() {
                var a = new c(this, b);
                d || (d = a)
            }),
            d
        }
    }
    var b, c = function(a, d) {
        function e(a) {
            return Math.floor(a)
        }

        function f() {
            t.autoplayTimeoutId = setTimeout(function() {
                t.params.loop ? (t.fixLoop(),
                t._slideNext(),
                t.emit("onAutoplay", t)) : t.isEnd ? d.autoplayStopOnLast ? t.stopAutoplay() : (t._slideTo(0),
                t.emit("onAutoplay", t)) : (t._slideNext(),
                t.emit("onAutoplay", t))
            }, t.params.autoplay)
        }

        function g(a, c) {
            var d = b(a.target);
            if (!d.is(c)) if ("string" == typeof c) d = d.parents(c);
            else if (c.nodeType) {
                var e;
                return d.parents().each(function(a, b) {
                    b === c && (e = c)
                }),
                e ? c : void 0
            }
            if (0 !== d.length) return d[0]
        }

        function h(a, b) {
            b = b || {};
            var c = window.MutationObserver || window.WebkitMutationObserver,
                d = new c(function(a) {
                    a.forEach(function(a) {
                        t.onResize(!0),
                        t.emit("onObserverUpdate", t, a)
                    })
                });
            d.observe(a, {
                attributes: void 0 === b.attributes || b.attributes,
                childList: void 0 === b.childList || b.childList,
                characterData: void 0 === b.characterData || b.characterData
            }),
            t.observers.push(d)
        }

        function i(a) {
            a.originalEvent && (a = a.originalEvent);
            var b = a.keyCode || a.charCode;
            if (!t.params.allowSwipeToNext && (t.isHorizontal() && 39 === b || !t.isHorizontal() && 40 === b)) return !1;
            if (!t.params.allowSwipeToPrev && (t.isHorizontal() && 37 === b || !t.isHorizontal() && 38 === b)) return !1;
            if (!(a.shiftKey || a.altKey || a.ctrlKey || a.metaKey || document.activeElement && document.activeElement.nodeName && ("input" === document.activeElement.nodeName.toLowerCase() || "textarea" === document.activeElement.nodeName.toLowerCase()))) {
                if (37 === b || 39 === b || 38 === b || 40 === b) {
                    var c = !1;
                    if (t.container.parents(".swiper-slide").length > 0 && 0 === t.container.parents(".swiper-slide-active").length) return;
                    var d = {
                        left: window.pageXOffset,
                        top: window.pageYOffset
                    }, e = window.innerWidth,
                        f = window.innerHeight,
                        g = t.container.offset();
                    t.rtl && (g.left = g.left - t.container[0].scrollLeft);
                    for (var h = [
                        [g.left, g.top],
                        [g.left + t.width, g.top],
                        [g.left, g.top + t.height],
                        [g.left + t.width, g.top + t.height]
                    ], i = 0; i < h.length; i++) {
                        var j = h[i];
                        j[0] >= d.left && j[0] <= d.left + e && j[1] >= d.top && j[1] <= d.top + f && (c = !0)
                    }
                    if (!c) return
                }
                t.isHorizontal() ? ((37 === b || 39 === b) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1), (39 === b && !t.rtl || 37 === b && t.rtl) && t.slideNext(), (37 === b && !t.rtl || 39 === b && t.rtl) && t.slidePrev()) : ((38 === b || 40 === b) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1),
                40 === b && t.slideNext(),
                38 === b && t.slidePrev())
            }
        }

        function j(a) {
            a.originalEvent && (a = a.originalEvent);
            var b = t.mousewheel.event,
                c = 0,
                d = t.rtl ? -1 : 1;
            if ("mousewheel" === b) if (t.params.mousewheelForceToAxis) if (t.isHorizontal()) {
                if (!(Math.abs(a.wheelDeltaX) > Math.abs(a.wheelDeltaY))) return;
                c = a.wheelDeltaX * d
            } else {
                if (!(Math.abs(a.wheelDeltaY) > Math.abs(a.wheelDeltaX))) return;
                c = a.wheelDeltaY
            } else c = Math.abs(a.wheelDeltaX) > Math.abs(a.wheelDeltaY) ? -a.wheelDeltaX * d : -a.wheelDeltaY;
            else if ("DOMMouseScroll" === b) c = -a.detail;
            else if ("wheel" === b) if (t.params.mousewheelForceToAxis) if (t.isHorizontal()) {
                if (!(Math.abs(a.deltaX) > Math.abs(a.deltaY))) return;
                c = -a.deltaX * d
            } else {
                if (!(Math.abs(a.deltaY) > Math.abs(a.deltaX))) return;
                c = -a.deltaY
            } else c = Math.abs(a.deltaX) > Math.abs(a.deltaY) ? -a.deltaX * d : -a.deltaY;
            if (0 !== c) {
                if (t.params.mousewheelInvert && (c = -c),
                t.params.freeMode) {
                    var e = t.getWrapperTranslate() + c * t.params.mousewheelSensitivity,
                        f = t.isBeginning,
                        g = t.isEnd;
                    if (e >= t.minTranslate() && (e = t.minTranslate()),
                    e <= t.maxTranslate() && (e = t.maxTranslate()),
                    t.setWrapperTransition(0),
                    t.setWrapperTranslate(e),
                    t.updateProgress(),
                    t.updateActiveIndex(), (!f && t.isBeginning || !g && t.isEnd) && t.updateClasses(),
                    t.params.freeModeSticky ? (clearTimeout(t.mousewheel.timeout),
                    t.mousewheel.timeout = setTimeout(function() {
                        t.slideReset()
                    }, 300)) : t.params.lazyLoading && t.lazy && t.lazy.load(),
                    0 === e || e === t.maxTranslate()) return
                } else {
                    if ((new window.Date).getTime() - t.mousewheel.lastScrollTime > 60) if (0 > c) if (t.isEnd && !t.params.loop || t.animating) {
                        if (t.params.mousewheelReleaseOnEdges) return !0
                    } else t.slideNext();
                    else if (t.isBeginning && !t.params.loop || t.animating) {
                        if (t.params.mousewheelReleaseOnEdges) return !0
                    } else t.slidePrev();
                    t.mousewheel.lastScrollTime = (new window.Date).getTime()
                }
                return t.params.autoplay && t.stopAutoplay(),
                a.preventDefault ? a.preventDefault() : a.returnValue = !1, !1
            }
        }

        function k(a, c) {
            a = b(a);
            var d, e, f, g = t.rtl ? -1 : 1;
            d = a.attr("data-swiper-parallax") || "0",
            e = a.attr("data-swiper-parallax-x"),
            f = a.attr("data-swiper-parallax-y"),
            e || f ? (e = e || "0",
            f = f || "0") : t.isHorizontal() ? (e = d,
            f = "0") : (f = d,
            e = "0"),
            e = e.indexOf("%") >= 0 ? parseInt(e, 10) * c * g + "%" : e * c * g + "px",
            f = f.indexOf("%") >= 0 ? parseInt(f, 10) * c + "%" : f * c + "px",
            a.transform("translate3d(" + e + ", " + f + ",0px)")
        }

        function l(a) {
            return 0 !== a.indexOf("on") && (a = a[0] !== a[0].toUpperCase() ? "on" + a[0].toUpperCase() + a.substring(1) : "on" + a),
            a
        }
        if (!(this instanceof c)) return new c(a, d);
        var m = {
            direction: "horizontal",
            touchEventsTarget: "container",
            initialSlide: 0,
            speed: 300,
            autoplay: !1,
            autoplayDisableOnInteraction: !0,
            autoplayStopOnLast: !1,
            iOSEdgeSwipeDetection: !1,
            iOSEdgeSwipeThreshold: 20,
            freeMode: !1,
            freeModeMomentum: !0,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: !0,
            freeModeMomentumBounceRatio: 1,
            freeModeSticky: !1,
            freeModeMinimumVelocity: .02,
            autoHeight: !1,
            setWrapperSize: !1,
            virtualTranslate: !1,
            effect: "slide",
            coverflow: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: !0
            },
            flip: {
                slideShadows: !0,
                limitRotation: !0
            },
            cube: {
                slideShadows: !0,
                shadow: !0,
                shadowOffset: 20,
                shadowScale: .94
            },
            fade: {
                crossFade: !1
            },
            parallax: !1,
            scrollbar: null,
            scrollbarHide: !0,
            scrollbarDraggable: !1,
            scrollbarSnapOnRelease: !1,
            keyboardControl: !1,
            mousewheelControl: !1,
            mousewheelReleaseOnEdges: !1,
            mousewheelInvert: !1,
            mousewheelForceToAxis: !1,
            mousewheelSensitivity: 1,
            hashnav: !1,
            breakpoints: void 0,
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: "column",
            slidesPerGroup: 1,
            centeredSlides: !1,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            roundLengths: !1,
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: !0,
            shortSwipes: !0,
            longSwipes: !0,
            longSwipesRatio: .5,
            longSwipesMs: 300,
            followFinger: !0,
            onlyExternal: !1,
            threshold: 0,
            touchMoveStopPropagation: !0,
            uniqueNavElements: !0,
            pagination: null,
            paginationElement: "span",
            paginationClickable: !1,
            paginationHide: !1,
            paginationBulletRender: null,
            paginationProgressRender: null,
            paginationFractionRender: null,
            paginationCustomRender: null,
            paginationType: "bullets",
            resistance: !0,
            resistanceRatio: .85,
            nextButton: null,
            prevButton: null,
            watchSlidesProgress: !1,
            watchSlidesVisibility: !1,
            grabCursor: !1,
            preventClicks: !0,
            preventClicksPropagation: !0,
            slideToClickedSlide: !1,
            lazyLoading: !1,
            lazyLoadingInPrevNext: !1,
            lazyLoadingInPrevNextAmount: 1,
            lazyLoadingOnTransitionStart: !1,
            preloadImages: !0,
            updateOnImagesReady: !0,
            loop: !1,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            control: void 0,
            controlInverse: !1,
            controlBy: "slide",
            allowSwipeToPrev: !0,
            allowSwipeToNext: !0,
            swipeHandler: null,
            noSwiping: !0,
            noSwipingClass: "swiper-no-swiping",
            slideClass: "swiper-slide",
            slideActiveClass: "swiper-slide-active",
            slideVisibleClass: "swiper-slide-visible",
            slideDuplicateClass: "swiper-slide-duplicate",
            slideNextClass: "swiper-slide-next",
            slidePrevClass: "swiper-slide-prev",
            wrapperClass: "swiper-wrapper",
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
            buttonDisabledClass: "swiper-button-disabled",
            paginationCurrentClass: "swiper-pagination-current",
            paginationTotalClass: "swiper-pagination-total",
            paginationHiddenClass: "swiper-pagination-hidden",
            paginationProgressbarClass: "swiper-pagination-progressbar",
            observer: !1,
            observeParents: !1,
            a11y: !1,
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            firstSlideMessage: "This is the first slide",
            lastSlideMessage: "This is the last slide",
            paginationBulletMessage: "Go to slide {{index}}",
            runCallbacksOnInit: !0
        }, n = d && d.virtualTranslate;
        d = d || {};
        var o = {};
        for (var p in d)
        if ("object" != typeof d[p] || null === d[p] || d[p].nodeType || d[p] === window || d[p] === document || "undefined" != typeof Dom7 && d[p] instanceof Dom7 || "undefined" != typeof jQuery && d[p] instanceof jQuery) o[p] = d[p];
        else {
            o[p] = {};
            for (var q in d[p])
            o[p][q] = d[p][q]
        }
        for (var r in m)
        if (void 0 === d[r]) d[r] = m[r];
        else if ("object" == typeof d[r]) for (var s in m[r])
        void 0 === d[r][s] && (d[r][s] = m[r][s]);
        var t = this;
        if (t.params = d,
        t.originalParams = o,
        t.classNames = [],
        void 0 !== b && "undefined" != typeof Dom7 && (b = Dom7), (void 0 !== b || (b = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7)) && (t.$ = b,
        t.currentBreakpoint = void 0,
        t.getActiveBreakpoint = function() {
            if (!t.params.breakpoints) return !1;
            var a, b = !1,
                c = [];
            for (a in t.params.breakpoints)
            t.params.breakpoints.hasOwnProperty(a) && c.push(a);
            c.sort(function(a, b) {
                return parseInt(a, 10) > parseInt(b, 10)
            });
            for (var d = 0; d < c.length; d++)
            (a = c[d]) >= window.innerWidth && !b && (b = a);
            return b || "max"
        },
        t.setBreakpoint = function() {
            var a = t.getActiveBreakpoint();
            if (a && t.currentBreakpoint !== a) {
                var b = a in t.params.breakpoints ? t.params.breakpoints[a] : t.originalParams,
                    c = t.params.loop && b.slidesPerView !== t.params.slidesPerView;
                for (var d in b)
                t.params[d] = b[d];
                t.currentBreakpoint = a,
                c && t.destroyLoop && t.reLoop(!0)
            }
        },
        t.params.breakpoints && t.setBreakpoint(),
        t.container = b(a),
        0 !== t.container.length)) {
            if (t.container.length > 1) {
                var u = [];
                return t.container.each(function() {
                    u.push(new c(this, d))
                }),
                u
            }
            t.container[0].swiper = t,
            t.container.data("swiper", t),
            t.classNames.push("swiper-container-" + t.params.direction),
            t.params.freeMode && t.classNames.push("swiper-container-free-mode"),
            t.support.flexbox || (t.classNames.push("swiper-container-no-flexbox"),
            t.params.slidesPerColumn = 1),
            t.params.autoHeight && t.classNames.push("swiper-container-autoheight"), (t.params.parallax || t.params.watchSlidesVisibility) && (t.params.watchSlidesProgress = !0), ["cube", "coverflow", "flip"].indexOf(t.params.effect) >= 0 && (t.support.transforms3d ? (t.params.watchSlidesProgress = !0,
            t.classNames.push("swiper-container-3d")) : t.params.effect = "slide"),
                "slide" !== t.params.effect && t.classNames.push("swiper-container-" + t.params.effect),
                "cube" === t.params.effect && (t.params.resistanceRatio = 0,
            t.params.slidesPerView = 1,
            t.params.slidesPerColumn = 1,
            t.params.slidesPerGroup = 1,
            t.params.centeredSlides = !1,
            t.params.spaceBetween = 0,
            t.params.virtualTranslate = !0,
            t.params.setWrapperSize = !1), ("fade" === t.params.effect || "flip" === t.params.effect) && (t.params.slidesPerView = 1,
            t.params.slidesPerColumn = 1,
            t.params.slidesPerGroup = 1,
            t.params.watchSlidesProgress = !0,
            t.params.spaceBetween = 0,
            t.params.setWrapperSize = !1,
            void 0 === n && (t.params.virtualTranslate = !0)),
            t.params.grabCursor && t.support.touch && (t.params.grabCursor = !1),
            t.wrapper = t.container.children("." + t.params.wrapperClass),
            t.params.pagination && (t.paginationContainer = b(t.params.pagination),
            t.params.uniqueNavElements && "string" == typeof t.params.pagination && t.paginationContainer.length > 1 && 1 === t.container.find(t.params.pagination).length && (t.paginationContainer = t.container.find(t.params.pagination)),
                "bullets" === t.params.paginationType && t.params.paginationClickable ? t.paginationContainer.addClass("swiper-pagination-clickable") : t.params.paginationClickable = !1,
            t.paginationContainer.addClass("swiper-pagination-" + t.params.paginationType)), (t.params.nextButton || t.params.prevButton) && (t.params.nextButton && (t.nextButton = b(t.params.nextButton),
            t.params.uniqueNavElements && "string" == typeof t.params.nextButton && t.nextButton.length > 1 && 1 === t.container.find(t.params.nextButton).length && (t.nextButton = t.container.find(t.params.nextButton))),
            t.params.prevButton && (t.prevButton = b(t.params.prevButton),
            t.params.uniqueNavElements && "string" == typeof t.params.prevButton && t.prevButton.length > 1 && 1 === t.container.find(t.params.prevButton).length && (t.prevButton = t.container.find(t.params.prevButton)))),
            t.isHorizontal = function() {
                return "horizontal" === t.params.direction
            },
            t.rtl = t.isHorizontal() && ("rtl" === t.container[0].dir.toLowerCase() || "rtl" === t.container.css("direction")),
            t.rtl && t.classNames.push("swiper-container-rtl"),
            t.rtl && (t.wrongRTL = "-webkit-box" === t.wrapper.css("display")),
            t.params.slidesPerColumn > 1 && t.classNames.push("swiper-container-multirow"),
            t.device.android && t.classNames.push("swiper-container-android"),
            t.container.addClass(t.classNames.join(" ")),
            t.translate = 0,
            t.progress = 0,
            t.velocity = 0,
            t.lockSwipeToNext = function() {
                t.params.allowSwipeToNext = !1
            },
            t.lockSwipeToPrev = function() {
                t.params.allowSwipeToPrev = !1
            },
            t.lockSwipes = function() {
                t.params.allowSwipeToNext = t.params.allowSwipeToPrev = !1
            },
            t.unlockSwipeToNext = function() {
                t.params.allowSwipeToNext = !0
            },
            t.unlockSwipeToPrev = function() {
                t.params.allowSwipeToPrev = !0
            },
            t.unlockSwipes = function() {
                t.params.allowSwipeToNext = t.params.allowSwipeToPrev = !0
            },
            t.params.grabCursor && (t.container[0].style.cursor = "move",
            t.container[0].style.cursor = "-webkit-grab",
            t.container[0].style.cursor = "-moz-grab",
            t.container[0].style.cursor = "grab"),
            t.imagesToLoad = [],
            t.imagesLoaded = 0,
            t.loadImage = function(a, b, c, d, e) {
                function f() {
                    e && e()
                }
                var g;
                a.complete && d ? f() : b ? (g = new window.Image,
                g.onload = f,
                g.onerror = f,
                c && (g.srcset = c),
                b && (g.src = b)) : f()
            },
            t.preloadImages = function() {
                function a() {
                    void 0 !== t && null !== t && (void 0 !== t.imagesLoaded && t.imagesLoaded++,
                    t.imagesLoaded === t.imagesToLoad.length && (t.params.updateOnImagesReady && t.update(),
                    t.emit("onImagesReady", t)))
                }
                t.imagesToLoad = t.container.find("img");
                for (var b = 0; b < t.imagesToLoad.length; b++)
                t.loadImage(t.imagesToLoad[b], t.imagesToLoad[b].currentSrc || t.imagesToLoad[b].getAttribute("src"), t.imagesToLoad[b].srcset || t.imagesToLoad[b].getAttribute("srcset"), !0, a)
            },
            t.autoplayTimeoutId = void 0,
            t.autoplaying = !1,
            t.autoplayPaused = !1,
            t.startAutoplay = function() {
                return void 0 === t.autoplayTimeoutId && ( !! t.params.autoplay && (!t.autoplaying && (t.autoplaying = !0,
                t.emit("onAutoplayStart", t),
                void f())))
            },
            t.stopAutoplay = function(a) {
                t.autoplayTimeoutId && (t.autoplayTimeoutId && clearTimeout(t.autoplayTimeoutId),
                t.autoplaying = !1,
                t.autoplayTimeoutId = void 0,
                t.emit("onAutoplayStop", t))
            },
            t.pauseAutoplay = function(a) {
                t.autoplayPaused || (t.autoplayTimeoutId && clearTimeout(t.autoplayTimeoutId),
                t.autoplayPaused = !0,
                0 === a ? (t.autoplayPaused = !1,
                f()) : t.wrapper.transitionEnd(function() {
                    t && (t.autoplayPaused = !1,
                    t.autoplaying ? f() : t.stopAutoplay())
                }))
            },
            t.minTranslate = function() {
                return -t.snapGrid[0]
            },
            t.maxTranslate = function() {
                return -t.snapGrid[t.snapGrid.length - 1]
            },
            t.updateAutoHeight = function() {
                var a = t.slides.eq(t.activeIndex)[0];
                if (void 0 !== a) {
                    var b = a.offsetHeight;
                    b && t.wrapper.css("height", b + "px")
                }
            },
            t.updateContainerSize = function() {
                var a, b;
                a = void 0 !== t.params.width ? t.params.width : t.container[0].clientWidth,
                b = void 0 !== t.params.height ? t.params.height : t.container[0].clientHeight,
                0 === a && t.isHorizontal() || 0 === b && !t.isHorizontal() || (a = a - parseInt(t.container.css("padding-left"), 10) - parseInt(t.container.css("padding-right"), 10),
                b = b - parseInt(t.container.css("padding-top"), 10) - parseInt(t.container.css("padding-bottom"), 10),
                t.width = a,
                t.height = b,
                t.size = t.isHorizontal() ? t.width : t.height)
            },
            t.updateSlidesSize = function() {
                t.slides = t.wrapper.children("." + t.params.slideClass),
                t.snapGrid = [],
                t.slidesGrid = [],
                t.slidesSizesGrid = [];
                var a, b = t.params.spaceBetween,
                    c = -t.params.slidesOffsetBefore,
                    d = 0,
                    f = 0;
                if (void 0 !== t.size) {
                    "string" == typeof b && b.indexOf("%") >= 0 && (b = parseFloat(b.replace("%", "")) / 100 * t.size),
                    t.virtualSize = -b,
                    t.rtl ? t.slides.css({
                        marginLeft: "",
                        marginTop: ""
                    }) : t.slides.css({
                        marginRight: "",
                        marginBottom: ""
                    });
                    var g;
                    t.params.slidesPerColumn > 1 && (g = Math.floor(t.slides.length / t.params.slidesPerColumn) === t.slides.length / t.params.slidesPerColumn ? t.slides.length : Math.ceil(t.slides.length / t.params.slidesPerColumn) * t.params.slidesPerColumn,
                        "auto" !== t.params.slidesPerView && "row" === t.params.slidesPerColumnFill && (g = Math.max(g, t.params.slidesPerView * t.params.slidesPerColumn)));
                    var h, i = t.params.slidesPerColumn,
                        j = g / i,
                        k = j - (t.params.slidesPerColumn * j - t.slides.length);
                    for (a = 0; a < t.slides.length; a++) {
                        h = 0;
                        var l = t.slides.eq(a);
                        if (t.params.slidesPerColumn > 1) {
                            var m, n, o;
                            "column" === t.params.slidesPerColumnFill ? (n = Math.floor(a / i),
                            o = a - n * i, (n > k || n === k && o === i - 1) && ++o >= i && (o = 0,
                            n++),
                            m = n + o * g / i,
                            l.css({
                                "-webkit-box-ordinal-group": m,
                                "-moz-box-ordinal-group": m,
                                "-ms-flex-order": m,
                                "-webkit-order": m,
                                order: m
                            })) : (o = Math.floor(a / j),
                            n = a - o * j),
                            l.css({
                                "margin-top": 0 !== o && t.params.spaceBetween && t.params.spaceBetween + "px"
                            }).attr("data-swiper-column", n).attr("data-swiper-row", o)
                        }
                        "none" !== l.css("display") && ("auto" === t.params.slidesPerView ? (h = t.isHorizontal() ? l.outerWidth(!0) : l.outerHeight(!0),
                        t.params.roundLengths && (h = e(h))) : (h = (t.size - (t.params.slidesPerView - 1) * b) / t.params.slidesPerView,
                        t.params.roundLengths && (h = e(h)),
                        t.isHorizontal() ? t.slides[a].style.width = h + "px" : t.slides[a].style.height = h + "px"),
                        t.slides[a].swiperSlideSize = h,
                        t.slidesSizesGrid.push(h),
                        t.params.centeredSlides ? (c = c + h / 2 + d / 2 + b,
                        0 === a && (c = c - t.size / 2 - b),
                        Math.abs(c) < .001 && (c = 0),
                        f % t.params.slidesPerGroup == 0 && t.snapGrid.push(c),
                        t.slidesGrid.push(c)) : (f % t.params.slidesPerGroup == 0 && t.snapGrid.push(c),
                        t.slidesGrid.push(c),
                        c = c + h + b),
                        t.virtualSize += h + b,
                        d = h,
                        f++)
                    }
                    t.virtualSize = Math.max(t.virtualSize, t.size) + t.params.slidesOffsetAfter;
                    var p;
                    if (t.rtl && t.wrongRTL && ("slide" === t.params.effect || "coverflow" === t.params.effect) && t.wrapper.css({
                        width: t.virtualSize + t.params.spaceBetween + "px"
                    }), (!t.support.flexbox || t.params.setWrapperSize) && (t.isHorizontal() ? t.wrapper.css({
                        width: t.virtualSize + t.params.spaceBetween + "px"
                    }) : t.wrapper.css({
                        height: t.virtualSize + t.params.spaceBetween + "px"
                    })),
                    t.params.slidesPerColumn > 1 && (t.virtualSize = (h + t.params.spaceBetween) * g,
                    t.virtualSize = Math.ceil(t.virtualSize / t.params.slidesPerColumn) - t.params.spaceBetween,
                    t.wrapper.css({
                        width: t.virtualSize + t.params.spaceBetween + "px"
                    }),
                    t.params.centeredSlides)) {
                        for (p = [],
                        a = 0; a < t.snapGrid.length; a++)
                        t.snapGrid[a] < t.virtualSize + t.snapGrid[0] && p.push(t.snapGrid[a]);
                        t.snapGrid = p
                    }
                    if (!t.params.centeredSlides) {
                        for (p = [],
                        a = 0; a < t.snapGrid.length; a++)
                        t.snapGrid[a] <= t.virtualSize - t.size && p.push(t.snapGrid[a]);
                        t.snapGrid = p,
                        Math.floor(t.virtualSize - t.size) - Math.floor(t.snapGrid[t.snapGrid.length - 1]) > 1 && t.snapGrid.push(t.virtualSize - t.size)
                    }
                    0 === t.snapGrid.length && (t.snapGrid = [0]),
                    0 !== t.params.spaceBetween && (t.isHorizontal() ? t.rtl ? t.slides.css({
                        marginLeft: b + "px"
                    }) : t.slides.css({
                        marginRight: b + "px"
                    }) : t.slides.css({
                        marginBottom: b + "px"
                    })),
                    t.params.watchSlidesProgress && t.updateSlidesOffset()
                }
            },
            t.updateSlidesOffset = function() {
                for (var a = 0; a < t.slides.length; a++)
                t.slides[a].swiperSlideOffset = t.isHorizontal() ? t.slides[a].offsetLeft : t.slides[a].offsetTop
            },
            t.updateSlidesProgress = function(a) {
                if (void 0 === a && (a = t.translate || 0),
                0 !== t.slides.length) {
                    void 0 === t.slides[0].swiperSlideOffset && t.updateSlidesOffset();
                    var b = -a;
                    t.rtl && (b = a),
                    t.slides.removeClass(t.params.slideVisibleClass);
                    for (var c = 0; c < t.slides.length; c++) {
                        var d = t.slides[c],
                            e = (b - d.swiperSlideOffset) / (d.swiperSlideSize + t.params.spaceBetween);
                        if (t.params.watchSlidesVisibility) {
                            var f = -(b - d.swiperSlideOffset),
                                g = f + t.slidesSizesGrid[c];
                            (f >= 0 && f < t.size || g > 0 && g <= t.size || 0 >= f && g >= t.size) && t.slides.eq(c).addClass(t.params.slideVisibleClass)
                        }
                        d.progress = t.rtl ? -e : e
                    }
                }
            },
            t.updateProgress = function(a) {
                void 0 === a && (a = t.translate || 0);
                var b = t.maxTranslate() - t.minTranslate(),
                    c = t.isBeginning,
                    d = t.isEnd;
                0 === b ? (t.progress = 0,
                t.isBeginning = t.isEnd = !0) : (t.progress = (a - t.minTranslate()) / b,
                t.isBeginning = t.progress <= 0,
                t.isEnd = t.progress >= 1),
                t.isBeginning && !c && t.emit("onReachBeginning", t),
                t.isEnd && !d && t.emit("onReachEnd", t),
                t.params.watchSlidesProgress && t.updateSlidesProgress(a),
                t.emit("onProgress", t, t.progress)
            },
            t.updateActiveIndex = function() {
                var a, b, c, d = t.rtl ? t.translate : -t.translate;
                for (b = 0; b < t.slidesGrid.length; b++)
                void 0 !== t.slidesGrid[b + 1] ? d >= t.slidesGrid[b] && d < t.slidesGrid[b + 1] - (t.slidesGrid[b + 1] - t.slidesGrid[b]) / 2 ? a = b : d >= t.slidesGrid[b] && d < t.slidesGrid[b + 1] && (a = b + 1) : d >= t.slidesGrid[b] && (a = b);
                (0 > a || void 0 === a) && (a = 0),
                c = Math.floor(a / t.params.slidesPerGroup),
                c >= t.snapGrid.length && (c = t.snapGrid.length - 1),
                a !== t.activeIndex && (t.snapIndex = c,
                t.previousIndex = t.activeIndex,
                t.activeIndex = a,
                t.updateClasses())
            },
            t.updateClasses = function() {
                t.slides.removeClass(t.params.slideActiveClass + " " + t.params.slideNextClass + " " + t.params.slidePrevClass);
                var a = t.slides.eq(t.activeIndex);
                a.addClass(t.params.slideActiveClass);
                var c = a.next("." + t.params.slideClass).addClass(t.params.slideNextClass);
                t.params.loop && 0 === c.length && t.slides.eq(0).addClass(t.params.slideNextClass);
                var d = a.prev("." + t.params.slideClass).addClass(t.params.slidePrevClass);
                if (t.params.loop && 0 === d.length && t.slides.eq(-1).addClass(t.params.slidePrevClass),
                t.paginationContainer && t.paginationContainer.length > 0) {
                    var e, f = t.params.loop ? Math.ceil((t.slides.length - 2 * t.loopedSlides) / t.params.slidesPerGroup) : t.snapGrid.length;
                    if (t.params.loop ? (e = Math.ceil((t.activeIndex - t.loopedSlides) / t.params.slidesPerGroup),
                    e > t.slides.length - 1 - 2 * t.loopedSlides && (e -= t.slides.length - 2 * t.loopedSlides),
                    e > f - 1 && (e -= f),
                    0 > e && "bullets" !== t.params.paginationType && (e = f + e)) : e = void 0 !== t.snapIndex ? t.snapIndex : t.activeIndex || 0,
                        "bullets" === t.params.paginationType && t.bullets && t.bullets.length > 0 && (t.bullets.removeClass(t.params.bulletActiveClass),
                    t.paginationContainer.length > 1 ? t.bullets.each(function() {
                        b(this).index() === e && b(this).addClass(t.params.bulletActiveClass)
                    }) : t.bullets.eq(e).addClass(t.params.bulletActiveClass)),
                        "fraction" === t.params.paginationType && (t.paginationContainer.find("." + t.params.paginationCurrentClass).text(e + 1),
                    t.paginationContainer.find("." + t.params.paginationTotalClass).text(f)),
                        "progress" === t.params.paginationType) {
                        var g = (e + 1) / f,
                            h = g,
                            i = 1;
                        t.isHorizontal() || (i = g,
                        h = 1),
                        t.paginationContainer.find("." + t.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX(" + h + ") scaleY(" + i + ")").transition(t.params.speed)
                    }
                    "custom" === t.params.paginationType && t.params.paginationCustomRender && (t.paginationContainer.html(t.params.paginationCustomRender(t, e + 1, f)),
                    t.emit("onPaginationRendered", t, t.paginationContainer[0]))
                }
                t.params.loop || (t.params.prevButton && t.prevButton && t.prevButton.length > 0 && (t.isBeginning ? (t.prevButton.addClass(t.params.buttonDisabledClass),
                t.params.a11y && t.a11y && t.a11y.disable(t.prevButton)) : (t.prevButton.removeClass(t.params.buttonDisabledClass),
                t.params.a11y && t.a11y && t.a11y.enable(t.prevButton))),
                t.params.nextButton && t.nextButton && t.nextButton.length > 0 && (t.isEnd ? (t.nextButton.addClass(t.params.buttonDisabledClass),
                t.params.a11y && t.a11y && t.a11y.disable(t.nextButton)) : (t.nextButton.removeClass(t.params.buttonDisabledClass),
                t.params.a11y && t.a11y && t.a11y.enable(t.nextButton))))
            },
            t.updatePagination = function() {
                if (t.params.pagination && t.paginationContainer && t.paginationContainer.length > 0) {
                    var a = "";
                    if ("bullets" === t.params.paginationType) {
                        for (var b = t.params.loop ? Math.ceil((t.slides.length - 2 * t.loopedSlides) / t.params.slidesPerGroup) : t.snapGrid.length, c = 0; b > c; c++)
                        a += t.params.paginationBulletRender ? t.params.paginationBulletRender(c, t.params.bulletClass) : "<" + t.params.paginationElement + ' class="' + t.params.bulletClass + '"></' + t.params.paginationElement + ">";
                        t.paginationContainer.html(a),
                        t.bullets = t.paginationContainer.find("." + t.params.bulletClass),
                        t.params.paginationClickable && t.params.a11y && t.a11y && t.a11y.initPagination()
                    }
                    "fraction" === t.params.paginationType && (a = t.params.paginationFractionRender ? t.params.paginationFractionRender(t, t.params.paginationCurrentClass, t.params.paginationTotalClass) : '<span class="' + t.params.paginationCurrentClass + '"></span> / <span class="' + t.params.paginationTotalClass + '"></span>',
                    t.paginationContainer.html(a)),
                        "progress" === t.params.paginationType && (a = t.params.paginationProgressRender ? t.params.paginationProgressRender(t, t.params.paginationProgressbarClass) : '<span class="' + t.params.paginationProgressbarClass + '"></span>',
                    t.paginationContainer.html(a)),
                        "custom" !== t.params.paginationType && t.emit("onPaginationRendered", t, t.paginationContainer[0])
                }
            },
            t.update = function(a) {
                function b() {
                    c = Math.min(Math.max(t.translate, t.maxTranslate()), t.minTranslate()),
                    t.setWrapperTranslate(c),
                    t.updateActiveIndex(),
                    t.updateClasses()
                }
                if (t.updateContainerSize(),
                t.updateSlidesSize(),
                t.updateProgress(),
                t.updatePagination(),
                t.updateClasses(),
                t.params.scrollbar && t.scrollbar && t.scrollbar.set(),
                a) {
                    var c;
                    t.controller && t.controller.spline && (t.controller.spline = void 0),
                    t.params.freeMode ? (b(),
                    t.params.autoHeight && t.updateAutoHeight()) : (("auto" === t.params.slidesPerView || t.params.slidesPerView > 1) && t.isEnd && !t.params.centeredSlides ? t.slideTo(t.slides.length - 1, 0, !1, !0) : t.slideTo(t.activeIndex, 0, !1, !0)) || b()
                } else t.params.autoHeight && t.updateAutoHeight()
            },
            t.onResize = function(a) {
                t.params.breakpoints && t.setBreakpoint();
                var b = t.params.allowSwipeToPrev,
                    c = t.params.allowSwipeToNext;
                t.params.allowSwipeToPrev = t.params.allowSwipeToNext = !0,
                t.updateContainerSize(),
                t.updateSlidesSize(), ("auto" === t.params.slidesPerView || t.params.freeMode || a) && t.updatePagination(),
                t.params.scrollbar && t.scrollbar && t.scrollbar.set(),
                t.controller && t.controller.spline && (t.controller.spline = void 0);
                var d = !1;
                if (t.params.freeMode) {
                    var e = Math.min(Math.max(t.translate, t.maxTranslate()), t.minTranslate());
                    t.setWrapperTranslate(e),
                    t.updateActiveIndex(),
                    t.updateClasses(),
                    t.params.autoHeight && t.updateAutoHeight()
                } else t.updateClasses(),
                d = ("auto" === t.params.slidesPerView || t.params.slidesPerView > 1) && t.isEnd && !t.params.centeredSlides ? t.slideTo(t.slides.length - 1, 0, !1, !0) : t.slideTo(t.activeIndex, 0, !1, !0);
                t.params.lazyLoading && !d && t.lazy && t.lazy.load(),
                t.params.allowSwipeToPrev = b,
                t.params.allowSwipeToNext = c
            };
            var v = ["mousedown", "mousemove", "mouseup"];
            window.navigator.pointerEnabled ? v = ["pointerdown", "pointermove", "pointerup"] : window.navigator.msPointerEnabled && (v = ["MSPointerDown", "MSPointerMove", "MSPointerUp"]),
            t.touchEvents = {
                start: t.support.touch || !t.params.simulateTouch ? "touchstart" : v[0],
                move: t.support.touch || !t.params.simulateTouch ? "touchmove" : v[1],
                end: t.support.touch || !t.params.simulateTouch ? "touchend" : v[2]
            }, (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ("container" === t.params.touchEventsTarget ? t.container : t.wrapper).addClass("swiper-wp8-" + t.params.direction),
            t.initEvents = function(a) {
                var b = a ? "off" : "on",
                    c = a ? "removeEventListener" : "addEventListener",
                    e = "container" === t.params.touchEventsTarget ? t.container[0] : t.wrapper[0],
                    f = t.support.touch ? e : document,
                    g = !! t.params.nested;
                t.browser.ie ? (e[c](t.touchEvents.start, t.onTouchStart, !1),
                f[c](t.touchEvents.move, t.onTouchMove, g),
                f[c](t.touchEvents.end, t.onTouchEnd, !1)) : (t.support.touch && (e[c](t.touchEvents.start, t.onTouchStart, !1),
                e[c](t.touchEvents.move, t.onTouchMove, g),
                e[c](t.touchEvents.end, t.onTouchEnd, !1)), !d.simulateTouch || t.device.ios || t.device.android || (e[c]("mousedown", t.onTouchStart, !1),
                document[c]("mousemove", t.onTouchMove, g),
                document[c]("mouseup", t.onTouchEnd, !1))),
                window[c]("resize", t.onResize),
                t.params.nextButton && t.nextButton && t.nextButton.length > 0 && (t.nextButton[b]("click", t.onClickNext),
                t.params.a11y && t.a11y && t.nextButton[b]("keydown", t.a11y.onEnterKey)),
                t.params.prevButton && t.prevButton && t.prevButton.length > 0 && (t.prevButton[b]("click", t.onClickPrev),
                t.params.a11y && t.a11y && t.prevButton[b]("keydown", t.a11y.onEnterKey)),
                t.params.pagination && t.params.paginationClickable && (t.paginationContainer[b]("click", "." + t.params.bulletClass, t.onClickIndex),
                t.params.a11y && t.a11y && t.paginationContainer[b]("keydown", "." + t.params.bulletClass, t.a11y.onEnterKey)), (t.params.preventClicks || t.params.preventClicksPropagation) && e[c]("click", t.preventClicks, !0)
            },
            t.attachEvents = function() {
                t.initEvents()
            },
            t.detachEvents = function() {
                t.initEvents(!0)
            },
            t.allowClick = !0,
            t.preventClicks = function(a) {
                t.allowClick || (t.params.preventClicks && a.preventDefault(),
                t.params.preventClicksPropagation && t.animating && (a.stopPropagation(),
                a.stopImmediatePropagation()))
            },
            t.onClickNext = function(a) {
                a.preventDefault(), (!t.isEnd || t.params.loop) && t.slideNext()
            },
            t.onClickPrev = function(a) {
                a.preventDefault(), (!t.isBeginning || t.params.loop) && t.slidePrev()
            },
            t.onClickIndex = function(a) {
                a.preventDefault();
                var c = b(this).index() * t.params.slidesPerGroup;
                t.params.loop && (c += t.loopedSlides),
                t.slideTo(c)
            },
            t.updateClickedSlide = function(a) {
                var c = g(a, "." + t.params.slideClass),
                    d = !1;
                if (c) for (var e = 0; e < t.slides.length; e++)
                t.slides[e] === c && (d = !0);
                if (!c || !d) return t.clickedSlide = void 0,
                void(t.clickedIndex = void 0);
                if (t.clickedSlide = c,
                t.clickedIndex = b(c).index(),
                t.params.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex) {
                    var f, h = t.clickedIndex;
                    if (t.params.loop) {
                        if (t.animating) return;
                        f = b(t.clickedSlide).attr("data-swiper-slide-index"),
                        t.params.centeredSlides ? h < t.loopedSlides - t.params.slidesPerView / 2 || h > t.slides.length - t.loopedSlides + t.params.slidesPerView / 2 ? (t.fixLoop(),
                        h = t.wrapper.children("." + t.params.slideClass + '[data-swiper-slide-index="' + f + '"]:not(.swiper-slide-duplicate)').eq(0).index(),
                        setTimeout(function() {
                            t.slideTo(h)
                        }, 0)) : t.slideTo(h) : h > t.slides.length - t.params.slidesPerView ? (t.fixLoop(),
                        h = t.wrapper.children("." + t.params.slideClass + '[data-swiper-slide-index="' + f + '"]:not(.swiper-slide-duplicate)').eq(0).index(),
                        setTimeout(function() {
                            t.slideTo(h)
                        }, 0)) : t.slideTo(h)
                    } else t.slideTo(h)
                }
            };
            var w, x, y, z, A, B, C, D, E, F, G = "input, select, textarea, button",
                H = Date.now(),
                I = [];
            t.animating = !1,
            t.touches = {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0
            };
            var J, K;
            if (t.onTouchStart = function(a) {
                if (a.originalEvent && (a = a.originalEvent), (J = "touchstart" === a.type) || !("which" in a) || 3 !== a.which) {
                    if (t.params.noSwiping && g(a, "." + t.params.noSwipingClass)) return void(t.allowClick = !0);
                    if (!t.params.swipeHandler || g(a, t.params.swipeHandler)) {
                        var c = t.touches.currentX = "touchstart" === a.type ? a.targetTouches[0].pageX : a.pageX,
                            d = t.touches.currentY = "touchstart" === a.type ? a.targetTouches[0].pageY : a.pageY;
                        if (!(t.device.ios && t.params.iOSEdgeSwipeDetection && c <= t.params.iOSEdgeSwipeThreshold)) {
                            if (w = !0,
                            x = !1,
                            y = !0,
                            A = void 0,
                            K = void 0,
                            t.touches.startX = c,
                            t.touches.startY = d,
                            z = Date.now(),
                            t.allowClick = !0,
                            t.updateContainerSize(),
                            t.swipeDirection = void 0,
                            t.params.threshold > 0 && (D = !1),
                                "touchstart" !== a.type) {
                                var e = !0;
                                b(a.target).is(G) && (e = !1),
                                document.activeElement && b(document.activeElement).is(G) && document.activeElement.blur(),
                                e && a.preventDefault()
                            }
                            t.emit("onTouchStart", t, a)
                        }
                    }
                }
            },
            t.onTouchMove = function(a) {
                if (a.originalEvent && (a = a.originalEvent), !J || "mousemove" !== a.type) {
                    if (a.preventedByNestedSwiper) return t.touches.startX = "touchmove" === a.type ? a.targetTouches[0].pageX : a.pageX,
                    void(t.touches.startY = "touchmove" === a.type ? a.targetTouches[0].pageY : a.pageY);
                    if (t.params.onlyExternal) return t.allowClick = !1,
                    void(w && (t.touches.startX = t.touches.currentX = "touchmove" === a.type ? a.targetTouches[0].pageX : a.pageX,
                    t.touches.startY = t.touches.currentY = "touchmove" === a.type ? a.targetTouches[0].pageY : a.pageY,
                    z = Date.now()));
                    if (J && document.activeElement && a.target === document.activeElement && b(a.target).is(G)) return x = !0,
                    void(t.allowClick = !1);
                    if (y && t.emit("onTouchMove", t, a), !(a.targetTouches && a.targetTouches.length > 1)) {
                        if (t.touches.currentX = "touchmove" === a.type ? a.targetTouches[0].pageX : a.pageX,
                        t.touches.currentY = "touchmove" === a.type ? a.targetTouches[0].pageY : a.pageY,
                        void 0 === A) {
                            var c = 180 * Math.atan2(Math.abs(t.touches.currentY - t.touches.startY), Math.abs(t.touches.currentX - t.touches.startX)) / Math.PI;
                            A = t.isHorizontal() ? c > t.params.touchAngle : 90 - c > t.params.touchAngle
                        }
                        if (A && t.emit("onTouchMoveOpposite", t, a),
                        void 0 === K && t.browser.ieTouch && (t.touches.currentX !== t.touches.startX || t.touches.currentY !== t.touches.startY) && (K = !0),
                        w) {
                            if (A) return void(w = !1);
                            if (K || !t.browser.ieTouch) {
                                t.allowClick = !1,
                                t.emit("onSliderMove", t, a),
                                a.preventDefault(),
                                t.params.touchMoveStopPropagation && !t.params.nested && a.stopPropagation(),
                                x || (d.loop && t.fixLoop(),
                                C = t.getWrapperTranslate(),
                                t.setWrapperTransition(0),
                                t.animating && t.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"),
                                t.params.autoplay && t.autoplaying && (t.params.autoplayDisableOnInteraction ? t.stopAutoplay() : t.pauseAutoplay()),
                                F = !1,
                                t.params.grabCursor && (t.container[0].style.cursor = "move",
                                t.container[0].style.cursor = "-webkit-grabbing",
                                t.container[0].style.cursor = "-moz-grabbin",
                                t.container[0].style.cursor = "grabbing")),
                                x = !0;
                                var e = t.touches.diff = t.isHorizontal() ? t.touches.currentX - t.touches.startX : t.touches.currentY - t.touches.startY;
                                e *= t.params.touchRatio,
                                t.rtl && (e = -e),
                                t.swipeDirection = e > 0 ? "prev" : "next",
                                B = e + C;
                                var f = !0;
                                if (e > 0 && B > t.minTranslate() ? (f = !1,
                                t.params.resistance && (B = t.minTranslate() - 1 + Math.pow(-t.minTranslate() + C + e, t.params.resistanceRatio))) : 0 > e && B < t.maxTranslate() && (f = !1,
                                t.params.resistance && (B = t.maxTranslate() + 1 - Math.pow(t.maxTranslate() - C - e, t.params.resistanceRatio))),
                                f && (a.preventedByNestedSwiper = !0), !t.params.allowSwipeToNext && "next" === t.swipeDirection && C > B && (B = C), !t.params.allowSwipeToPrev && "prev" === t.swipeDirection && B > C && (B = C),
                                t.params.followFinger) {
                                    if (t.params.threshold > 0) {
                                        if (!(Math.abs(e) > t.params.threshold || D)) return void(B = C);
                                        if (!D) return D = !0,
                                        t.touches.startX = t.touches.currentX,
                                        t.touches.startY = t.touches.currentY,
                                        B = C,
                                        void(t.touches.diff = t.isHorizontal() ? t.touches.currentX - t.touches.startX : t.touches.currentY - t.touches.startY)
                                    }
                                    (t.params.freeMode || t.params.watchSlidesProgress) && t.updateActiveIndex(),
                                    t.params.freeMode && (0 === I.length && I.push({
                                        position: t.touches[t.isHorizontal() ? "startX" : "startY"],
                                        time: z
                                    }),
                                    I.push({
                                        position: t.touches[t.isHorizontal() ? "currentX" : "currentY"],
                                        time: (new window.Date).getTime()
                                    })),
                                    t.updateProgress(B),
                                    t.setWrapperTranslate(B)
                                }
                            }
                        }
                    }
                }
            },
            t.onTouchEnd = function(a) {
                if (a.originalEvent && (a = a.originalEvent),
                y && t.emit("onTouchEnd", t, a),
                y = !1,
                w) {
                    t.params.grabCursor && x && w && (t.container[0].style.cursor = "move",
                    t.container[0].style.cursor = "-webkit-grab",
                    t.container[0].style.cursor = "-moz-grab",
                    t.container[0].style.cursor = "grab");
                    var c = Date.now(),
                        d = c - z;
                    if (t.allowClick && (t.updateClickedSlide(a),
                    t.emit("onTap", t, a),
                    300 > d && c - H > 300 && (E && clearTimeout(E),
                    E = setTimeout(function() {
                        t && (t.params.paginationHide && t.paginationContainer.length > 0 && !b(a.target).hasClass(t.params.bulletClass) && t.paginationContainer.toggleClass(t.params.paginationHiddenClass),
                        t.emit("onClick", t, a))
                    }, 300)),
                    300 > d && 300 > c - H && (E && clearTimeout(E),
                    t.emit("onDoubleTap", t, a))),
                    H = Date.now(),
                    setTimeout(function() {
                        t && (t.allowClick = !0)
                    }, 0), !w || !x || !t.swipeDirection || 0 === t.touches.diff || B === C) return void(w = x = !1);
                    w = x = !1;
                    var e;
                    if (e = t.params.followFinger ? t.rtl ? t.translate : -t.translate : -B,
                    t.params.freeMode) {
                        if (e < -t.minTranslate()) return void t.slideTo(t.activeIndex);
                        if (e > -t.maxTranslate()) return void(t.slides.length < t.snapGrid.length ? t.slideTo(t.snapGrid.length - 1) : t.slideTo(t.slides.length - 1));
                        if (t.params.freeModeMomentum) {
                            if (I.length > 1) {
                                var f = I.pop(),
                                    g = I.pop(),
                                    h = f.position - g.position,
                                    i = f.time - g.time;
                                t.velocity = h / i,
                                t.velocity = t.velocity / 2,
                                Math.abs(t.velocity) < t.params.freeModeMinimumVelocity && (t.velocity = 0), (i > 150 || (new window.Date).getTime() - f.time > 300) && (t.velocity = 0)
                            } else t.velocity = 0;
                            I.length = 0;
                            var j = 1e3 * t.params.freeModeMomentumRatio,
                                k = t.velocity * j,
                                l = t.translate + k;
                            t.rtl && (l = -l);
                            var m, n = !1,
                                o = 20 * Math.abs(t.velocity) * t.params.freeModeMomentumBounceRatio;
                            if (l < t.maxTranslate()) t.params.freeModeMomentumBounce ? (l + t.maxTranslate() < -o && (l = t.maxTranslate() - o),
                            m = t.maxTranslate(),
                            n = !0,
                            F = !0) : l = t.maxTranslate();
                            else if (l > t.minTranslate()) t.params.freeModeMomentumBounce ? (l - t.minTranslate() > o && (l = t.minTranslate() + o),
                            m = t.minTranslate(),
                            n = !0,
                            F = !0) : l = t.minTranslate();
                            else if (t.params.freeModeSticky) {
                                var p, q = 0;
                                for (q = 0; q < t.snapGrid.length; q += 1)
                                if (t.snapGrid[q] > -l) {
                                    p = q;
                                    break
                                }
                                l = Math.abs(t.snapGrid[p] - l) < Math.abs(t.snapGrid[p - 1] - l) || "next" === t.swipeDirection ? t.snapGrid[p] : t.snapGrid[p - 1],
                                t.rtl || (l = -l)
                            }
                            if (0 !== t.velocity) j = t.rtl ? Math.abs((-l - t.translate) / t.velocity) : Math.abs((l - t.translate) / t.velocity);
                            else if (t.params.freeModeSticky) return void t.slideReset();
                            t.params.freeModeMomentumBounce && n ? (t.updateProgress(m),
                            t.setWrapperTransition(j),
                            t.setWrapperTranslate(l),
                            t.onTransitionStart(),
                            t.animating = !0,
                            t.wrapper.transitionEnd(function() {
                                t && F && (t.emit("onMomentumBounce", t),
                                t.setWrapperTransition(t.params.speed),
                                t.setWrapperTranslate(m),
                                t.wrapper.transitionEnd(function() {
                                    t && t.onTransitionEnd()
                                }))
                            })) : t.velocity ? (t.updateProgress(l),
                            t.setWrapperTransition(j),
                            t.setWrapperTranslate(l),
                            t.onTransitionStart(),
                            t.animating || (t.animating = !0,
                            t.wrapper.transitionEnd(function() {
                                t && t.onTransitionEnd()
                            }))) : t.updateProgress(l),
                            t.updateActiveIndex()
                        }
                        return void((!t.params.freeModeMomentum || d >= t.params.longSwipesMs) && (t.updateProgress(),
                        t.updateActiveIndex()))
                    }
                    var r, s = 0,
                        u = t.slidesSizesGrid[0];
                    for (r = 0; r < t.slidesGrid.length; r += t.params.slidesPerGroup)
                    void 0 !== t.slidesGrid[r + t.params.slidesPerGroup] ? e >= t.slidesGrid[r] && e < t.slidesGrid[r + t.params.slidesPerGroup] && (s = r,
                    u = t.slidesGrid[r + t.params.slidesPerGroup] - t.slidesGrid[r]) : e >= t.slidesGrid[r] && (s = r,
                    u = t.slidesGrid[t.slidesGrid.length - 1] - t.slidesGrid[t.slidesGrid.length - 2]);
                    var v = (e - t.slidesGrid[s]) / u;
                    if (d > t.params.longSwipesMs) {
                        if (!t.params.longSwipes) return void t.slideTo(t.activeIndex);
                        "next" === t.swipeDirection && (v >= t.params.longSwipesRatio ? t.slideTo(s + t.params.slidesPerGroup) : t.slideTo(s)),
                            "prev" === t.swipeDirection && (v > 1 - t.params.longSwipesRatio ? t.slideTo(s + t.params.slidesPerGroup) : t.slideTo(s))
                    } else {
                        if (!t.params.shortSwipes) return void t.slideTo(t.activeIndex);
                        "next" === t.swipeDirection && t.slideTo(s + t.params.slidesPerGroup),
                            "prev" === t.swipeDirection && t.slideTo(s)
                    }
                }
            },
            t._slideTo = function(a, b) {
                return t.slideTo(a, b, !0, !0)
            },
            t.slideTo = function(a, b, c, d) {
                void 0 === c && (c = !0),
                void 0 === a && (a = 0),
                0 > a && (a = 0),
                t.snapIndex = Math.floor(a / t.params.slidesPerGroup),
                t.snapIndex >= t.snapGrid.length && (t.snapIndex = t.snapGrid.length - 1);
                var e = -t.snapGrid[t.snapIndex];
                t.params.autoplay && t.autoplaying && (d || !t.params.autoplayDisableOnInteraction ? t.pauseAutoplay(b) : t.stopAutoplay()),
                t.updateProgress(e);
                for (var f = 0; f < t.slidesGrid.length; f++) - Math.floor(100 * e) >= Math.floor(100 * t.slidesGrid[f]) && (a = f);
                return !(!t.params.allowSwipeToNext && e < t.translate && e < t.minTranslate()) && (!(!t.params.allowSwipeToPrev && e > t.translate && e > t.maxTranslate() && (t.activeIndex || 0) !== a) && (void 0 === b && (b = t.params.speed),
                t.previousIndex = t.activeIndex || 0,
                t.activeIndex = a,
                t.rtl && -e === t.translate || !t.rtl && e === t.translate ? (t.params.autoHeight && t.updateAutoHeight(),
                t.updateClasses(),
                    "slide" !== t.params.effect && t.setWrapperTranslate(e), !1) : (t.updateClasses(),
                t.onTransitionStart(c),
                0 === b ? (t.setWrapperTranslate(e),
                t.setWrapperTransition(0),
                t.onTransitionEnd(c)) : (t.setWrapperTranslate(e),
                t.setWrapperTransition(b),
                t.animating || (t.animating = !0,
                t.wrapper.transitionEnd(function() {
                    t && t.onTransitionEnd(c)
                }))), !0)))
            },
            t.onTransitionStart = function(a) {
                void 0 === a && (a = !0),
                t.params.autoHeight && t.updateAutoHeight(),
                t.lazy && t.lazy.onTransitionStart(),
                a && (t.emit("onTransitionStart", t),
                t.activeIndex !== t.previousIndex && (t.emit("onSlideChangeStart", t),
                t.activeIndex > t.previousIndex ? t.emit("onSlideNextStart", t) : t.emit("onSlidePrevStart", t)))
            },
            t.onTransitionEnd = function(a) {
                t.animating = !1,
                t.setWrapperTransition(0),
                void 0 === a && (a = !0),
                t.lazy && t.lazy.onTransitionEnd(),
                a && (t.emit("onTransitionEnd", t),
                t.activeIndex !== t.previousIndex && (t.emit("onSlideChangeEnd", t),
                t.activeIndex > t.previousIndex ? t.emit("onSlideNextEnd", t) : t.emit("onSlidePrevEnd", t))),
                t.params.hashnav && t.hashnav && t.hashnav.setHash()
            },
            t.slideNext = function(a, b, c) {
                return t.params.loop ? !t.animating && (t.fixLoop(),
                t.container[0].clientLeft,
                t.slideTo(t.activeIndex + t.params.slidesPerGroup, b, a, c)) : t.slideTo(t.activeIndex + t.params.slidesPerGroup, b, a, c)
            },
            t._slideNext = function(a) {
                return t.slideNext(!0, a, !0)
            },
            t.slidePrev = function(a, b, c) {
                return t.params.loop ? !t.animating && (t.fixLoop(),
                t.container[0].clientLeft,
                t.slideTo(t.activeIndex - 1, b, a, c)) : t.slideTo(t.activeIndex - 1, b, a, c)
            },
            t._slidePrev = function(a) {
                return t.slidePrev(!0, a, !0)
            },
            t.slideReset = function(a, b, c) {
                return t.slideTo(t.activeIndex, b, a)
            },
            t.setWrapperTransition = function(a, b) {
                t.wrapper.transition(a),
                    "slide" !== t.params.effect && t.effects[t.params.effect] && t.effects[t.params.effect].setTransition(a),
                t.params.parallax && t.parallax && t.parallax.setTransition(a),
                t.params.scrollbar && t.scrollbar && t.scrollbar.setTransition(a),
                t.params.control && t.controller && t.controller.setTransition(a, b),
                t.emit("onSetTransition", t, a)
            },
            t.setWrapperTranslate = function(a, b, c) {
                var d = 0,
                    f = 0;
                t.isHorizontal() ? d = t.rtl ? -a : a : f = a,
                t.params.roundLengths && (d = e(d),
                f = e(f)),
                t.params.virtualTranslate || (t.support.transforms3d ? t.wrapper.transform("translate3d(" + d + "px, " + f + "px, 0px)") : t.wrapper.transform("translate(" + d + "px, " + f + "px)")),
                t.translate = t.isHorizontal() ? d : f;
                var g, h = t.maxTranslate() - t.minTranslate();
                g = 0 === h ? 0 : (a - t.minTranslate()) / h,
                g !== t.progress && t.updateProgress(a),
                b && t.updateActiveIndex(),
                    "slide" !== t.params.effect && t.effects[t.params.effect] && t.effects[t.params.effect].setTranslate(t.translate),
                t.params.parallax && t.parallax && t.parallax.setTranslate(t.translate),
                t.params.scrollbar && t.scrollbar && t.scrollbar.setTranslate(t.translate),
                t.params.control && t.controller && t.controller.setTranslate(t.translate, c),
                t.emit("onSetTranslate", t, t.translate)
            },
            t.getTranslate = function(a, b) {
                var c, d, e, f;
                return void 0 === b && (b = "x"),
                t.params.virtualTranslate ? t.rtl ? -t.translate : t.translate : (e = window.getComputedStyle(a, null),
                window.WebKitCSSMatrix ? (d = e.transform || e.webkitTransform,
                d.split(",").length > 6 && (d = d.split(", ").map(function(a) {
                    return a.replace(",", ".")
                }).join(", ")),
                f = new window.WebKitCSSMatrix("none" === d ? "" : d)) : (f = e.MozTransform || e.OTransform || e.MsTransform || e.msTransform || e.transform || e.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"),
                c = f.toString().split(",")),
                    "x" === b && (d = window.WebKitCSSMatrix ? f.m41 : 16 === c.length ? parseFloat(c[12]) : parseFloat(c[4])),
                    "y" === b && (d = window.WebKitCSSMatrix ? f.m42 : 16 === c.length ? parseFloat(c[13]) : parseFloat(c[5])),
                t.rtl && d && (d = -d),
                d || 0)
            },
            t.getWrapperTranslate = function(a) {
                return void 0 === a && (a = t.isHorizontal() ? "x" : "y"),
                t.getTranslate(t.wrapper[0], a)
            },
            t.observers = [],
            t.initObservers = function() {
                if (t.params.observeParents) for (var a = t.container.parents(), b = 0; b < a.length; b++)
                h(a[b]);
                h(t.container[0], {
                    childList: !1
                }),
                h(t.wrapper[0], {
                    attributes: !1
                })
            },
            t.disconnectObservers = function() {
                for (var a = 0; a < t.observers.length; a++)
                t.observers[a].disconnect();
                t.observers = []
            },
            t.createLoop = function() {
                t.wrapper.children("." + t.params.slideClass + "." + t.params.slideDuplicateClass).remove();
                var a = t.wrapper.children("." + t.params.slideClass);
                "auto" !== t.params.slidesPerView || t.params.loopedSlides || (t.params.loopedSlides = a.length),
                t.loopedSlides = parseInt(t.params.loopedSlides || t.params.slidesPerView, 10),
                t.loopedSlides = t.loopedSlides + t.params.loopAdditionalSlides,
                t.loopedSlides > a.length && (t.loopedSlides = a.length);
                var c, d = [],
                    e = [];
                for (a.each(function(c, f) {
                    var g = b(this);
                    c < t.loopedSlides && e.push(f),
                    c < a.length && c >= a.length - t.loopedSlides && d.push(f),
                    g.attr("data-swiper-slide-index", c)
                }),
                c = 0; c < e.length; c++)
                t.wrapper.append(b(e[c].cloneNode(!0)).addClass(t.params.slideDuplicateClass));
                for (c = d.length - 1; c >= 0; c--)
                t.wrapper.prepend(b(d[c].cloneNode(!0)).addClass(t.params.slideDuplicateClass))
            },
            t.destroyLoop = function() {
                t.wrapper.children("." + t.params.slideClass + "." + t.params.slideDuplicateClass).remove(),
                t.slides.removeAttr("data-swiper-slide-index")
            },
            t.reLoop = function(a) {
                var b = t.activeIndex - t.loopedSlides;
                t.destroyLoop(),
                t.createLoop(),
                t.updateSlidesSize(),
                a && t.slideTo(b + t.loopedSlides, 0, !1)
            },
            t.fixLoop = function() {
                var a;
                t.activeIndex < t.loopedSlides ? (a = t.slides.length - 3 * t.loopedSlides + t.activeIndex,
                a += t.loopedSlides,
                t.slideTo(a, 0, !1, !0)) : ("auto" === t.params.slidesPerView && t.activeIndex >= 2 * t.loopedSlides || t.activeIndex > t.slides.length - 2 * t.params.slidesPerView) && (a = -t.slides.length + t.activeIndex + t.loopedSlides,
                a += t.loopedSlides,
                t.slideTo(a, 0, !1, !0))
            },
            t.appendSlide = function(a) {
                if (t.params.loop && t.destroyLoop(),
                    "object" == typeof a && a.length) for (var b = 0; b < a.length; b++)
                a[b] && t.wrapper.append(a[b]);
                else t.wrapper.append(a);
                t.params.loop && t.createLoop(),
                t.params.observer && t.support.observer || t.update(!0)
            },
            t.prependSlide = function(a) {
                t.params.loop && t.destroyLoop();
                var b = t.activeIndex + 1;
                if ("object" == typeof a && a.length) {
                    for (var c = 0; c < a.length; c++)
                    a[c] && t.wrapper.prepend(a[c]);
                    b = t.activeIndex + a.length
                } else t.wrapper.prepend(a);
                t.params.loop && t.createLoop(),
                t.params.observer && t.support.observer || t.update(!0),
                t.slideTo(b, 0, !1)
            },
            t.removeSlide = function(a) {
                t.params.loop && (t.destroyLoop(),
                t.slides = t.wrapper.children("." + t.params.slideClass));
                var b, c = t.activeIndex;
                if ("object" == typeof a && a.length) {
                    for (var d = 0; d < a.length; d++)
                    b = a[d],
                    t.slides[b] && t.slides.eq(b).remove(),
                    c > b && c--;
                    c = Math.max(c, 0)
                } else b = a,
                t.slides[b] && t.slides.eq(b).remove(),
                c > b && c--,
                c = Math.max(c, 0);
                t.params.loop && t.createLoop(),
                t.params.observer && t.support.observer || t.update(!0),
                t.params.loop ? t.slideTo(c + t.loopedSlides, 0, !1) : t.slideTo(c, 0, !1)
            },
            t.removeAllSlides = function() {
                for (var a = [], b = 0; b < t.slides.length; b++)
                a.push(b);
                t.removeSlide(a)
            },
            t.effects = {
                fade: {
                    setTranslate: function() {
                        for (var a = 0; a < t.slides.length; a++) {
                            var b = t.slides.eq(a),
                                c = b[0].swiperSlideOffset,
                                d = -c;
                            t.params.virtualTranslate || (d -= t.translate);
                            var e = 0;
                            t.isHorizontal() || (e = d,
                            d = 0);
                            var f = t.params.fade.crossFade ? Math.max(1 - Math.abs(b[0].progress), 0) : 1 + Math.min(Math.max(b[0].progress, -1), 0);
                            b.css({
                                opacity: f
                            }).transform("translate3d(" + d + "px, " + e + "px, 0px)")
                        }
                    },
                    setTransition: function(a) {
                        if (t.slides.transition(a),
                        t.params.virtualTranslate && 0 !== a) {
                            var b = !1;
                            t.slides.transitionEnd(function() {
                                if (!b && t) {
                                    b = !0,
                                    t.animating = !1;
                                    for (var a = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], c = 0; c < a.length; c++)
                                    t.wrapper.trigger(a[c])
                                }
                            })
                        }
                    }
                },
                flip: {
                    setTranslate: function() {
                        for (var a = 0; a < t.slides.length; a++) {
                            var c = t.slides.eq(a),
                                d = c[0].progress;
                            t.params.flip.limitRotation && (d = Math.max(Math.min(c[0].progress, 1), -1));
                            var e = c[0].swiperSlideOffset,
                                f = -180 * d,
                                g = f,
                                h = 0,
                                i = -e,
                                j = 0;
                            if (t.isHorizontal() ? t.rtl && (g = -g) : (j = i,
                            i = 0,
                            h = -g,
                            g = 0),
                            c[0].style.zIndex = -Math.abs(Math.round(d)) + t.slides.length,
                            t.params.flip.slideShadows) {
                                var k = t.isHorizontal() ? c.find(".swiper-slide-shadow-left") : c.find(".swiper-slide-shadow-top"),
                                    l = t.isHorizontal() ? c.find(".swiper-slide-shadow-right") : c.find(".swiper-slide-shadow-bottom");
                                0 === k.length && (k = b('<div class="swiper-slide-shadow-' + (t.isHorizontal() ? "left" : "top") + '"></div>'),
                                c.append(k)),
                                0 === l.length && (l = b('<div class="swiper-slide-shadow-' + (t.isHorizontal() ? "right" : "bottom") + '"></div>'),
                                c.append(l)),
                                k.length && (k[0].style.opacity = Math.max(-d, 0)),
                                l.length && (l[0].style.opacity = Math.max(d, 0))
                            }
                            c.transform("translate3d(" + i + "px, " + j + "px, 0px) rotateX(" + h + "deg) rotateY(" + g + "deg)")
                        }
                    },
                    setTransition: function(a) {
                        if (t.slides.transition(a).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(a),
                        t.params.virtualTranslate && 0 !== a) {
                            var c = !1;
                            t.slides.eq(t.activeIndex).transitionEnd(function() {
                                if (!c && t && b(this).hasClass(t.params.slideActiveClass)) {
                                    c = !0,
                                    t.animating = !1;
                                    for (var a = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"], d = 0; d < a.length; d++)
                                    t.wrapper.trigger(a[d])
                                }
                            })
                        }
                    }
                },
                cube: {
                    setTranslate: function() {
                        var a, c = 0;
                        t.params.cube.shadow && (t.isHorizontal() ? (a = t.wrapper.find(".swiper-cube-shadow"),
                        0 === a.length && (a = b('<div class="swiper-cube-shadow"></div>'),
                        t.wrapper.append(a)),
                        a.css({
                            height: t.width + "px"
                        })) : (a = t.container.find(".swiper-cube-shadow"),
                        0 === a.length && (a = b('<div class="swiper-cube-shadow"></div>'),
                        t.container.append(a))));
                        for (var d = 0; d < t.slides.length; d++) {
                            var e = t.slides.eq(d),
                                f = 90 * d,
                                g = Math.floor(f / 360);
                            t.rtl && (f = -f,
                            g = Math.floor(-f / 360));
                            var h = Math.max(Math.min(e[0].progress, 1), -1),
                                i = 0,
                                j = 0,
                                k = 0;
                            d % 4 == 0 ? (i = 4 * -g * t.size,
                            k = 0) : (d - 1) % 4 == 0 ? (i = 0,
                            k = 4 * -g * t.size) : (d - 2) % 4 == 0 ? (i = t.size + 4 * g * t.size,
                            k = t.size) : (d - 3) % 4 == 0 && (i = -t.size,
                            k = 3 * t.size + 4 * t.size * g),
                            t.rtl && (i = -i),
                            t.isHorizontal() || (j = i,
                            i = 0);
                            var l = "rotateX(" + (t.isHorizontal() ? 0 : -f) + "deg) rotateY(" + (t.isHorizontal() ? f : 0) + "deg) translate3d(" + i + "px, " + j + "px, " + k + "px)";
                            if (1 >= h && h > -1 && (c = 90 * d + 90 * h,
                            t.rtl && (c = 90 * -d - 90 * h)),
                            e.transform(l),
                            t.params.cube.slideShadows) {
                                var m = t.isHorizontal() ? e.find(".swiper-slide-shadow-left") : e.find(".swiper-slide-shadow-top"),
                                    n = t.isHorizontal() ? e.find(".swiper-slide-shadow-right") : e.find(".swiper-slide-shadow-bottom");
                                0 === m.length && (m = b('<div class="swiper-slide-shadow-' + (t.isHorizontal() ? "left" : "top") + '"></div>'),
                                e.append(m)),
                                0 === n.length && (n = b('<div class="swiper-slide-shadow-' + (t.isHorizontal() ? "right" : "bottom") + '"></div>'),
                                e.append(n)),
                                m.length && (m[0].style.opacity = Math.max(-h, 0)),
                                n.length && (n[0].style.opacity = Math.max(h, 0))
                            }
                        }
                        if (t.wrapper.css({
                            "-webkit-transform-origin": "50% 50% -" + t.size / 2 + "px",
                            "-moz-transform-origin": "50% 50% -" + t.size / 2 + "px",
                            "-ms-transform-origin": "50% 50% -" + t.size / 2 + "px",
                            "transform-origin": "50% 50% -" + t.size / 2 + "px"
                        }),
                        t.params.cube.shadow) if (t.isHorizontal()) a.transform("translate3d(0px, " + (t.width / 2 + t.params.cube.shadowOffset) + "px, " + -t.width / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + t.params.cube.shadowScale + ")");
                        else {
                            var o = Math.abs(c) - 90 * Math.floor(Math.abs(c) / 90),
                                p = 1.5 - (Math.sin(2 * o * Math.PI / 360) / 2 + Math.cos(2 * o * Math.PI / 360) / 2),
                                q = t.params.cube.shadowScale,
                                r = t.params.cube.shadowScale / p,
                                s = t.params.cube.shadowOffset;
                            a.transform("scale3d(" + q + ", 1, " + r + ") translate3d(0px, " + (t.height / 2 + s) + "px, " + -t.height / 2 / r + "px) rotateX(-90deg)")
                        }
                        var u = t.isSafari || t.isUiWebView ? -t.size / 2 : 0;
                        t.wrapper.transform("translate3d(0px,0," + u + "px) rotateX(" + (t.isHorizontal() ? 0 : c) + "deg) rotateY(" + (t.isHorizontal() ? -c : 0) + "deg)")
                    },
                    setTransition: function(a) {
                        t.slides.transition(a).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(a),
                        t.params.cube.shadow && !t.isHorizontal() && t.container.find(".swiper-cube-shadow").transition(a)
                    }
                },
                coverflow: {
                    setTranslate: function() {
                        for (var a = t.translate, c = t.isHorizontal() ? -a + t.width / 2 : -a + t.height / 2, d = t.isHorizontal() ? t.params.coverflow.rotate : -t.params.coverflow.rotate, e = t.params.coverflow.depth, f = 0, g = t.slides.length; g > f; f++) {
                            var h = t.slides.eq(f),
                                i = t.slidesSizesGrid[f],
                                j = h[0].swiperSlideOffset,
                                k = (c - j - i / 2) / i * t.params.coverflow.modifier,
                                l = t.isHorizontal() ? d * k : 0,
                                m = t.isHorizontal() ? 0 : d * k,
                                n = -e * Math.abs(k),
                                o = t.isHorizontal() ? 0 : t.params.coverflow.stretch * k,
                                p = t.isHorizontal() ? t.params.coverflow.stretch * k : 0;
                            Math.abs(p) < .001 && (p = 0),
                            Math.abs(o) < .001 && (o = 0),
                            Math.abs(n) < .001 && (n = 0),
                            Math.abs(l) < .001 && (l = 0),
                            Math.abs(m) < .001 && (m = 0);
                            var q = "translate3d(" + p + "px," + o + "px," + n + "px)  rotateX(" + m + "deg) rotateY(" + l + "deg)";
                            if (h.transform(q),
                            h[0].style.zIndex = 1 - Math.abs(Math.round(k)),
                            t.params.coverflow.slideShadows) {
                                var r = t.isHorizontal() ? h.find(".swiper-slide-shadow-left") : h.find(".swiper-slide-shadow-top"),
                                    s = t.isHorizontal() ? h.find(".swiper-slide-shadow-right") : h.find(".swiper-slide-shadow-bottom");
                                0 === r.length && (r = b('<div class="swiper-slide-shadow-' + (t.isHorizontal() ? "left" : "top") + '"></div>'),
                                h.append(r)),
                                0 === s.length && (s = b('<div class="swiper-slide-shadow-' + (t.isHorizontal() ? "right" : "bottom") + '"></div>'),
                                h.append(s)),
                                r.length && (r[0].style.opacity = k > 0 ? k : 0),
                                s.length && (s[0].style.opacity = -k > 0 ? -k : 0)
                            }
                        }
                        if (t.browser.ie) {
                            t.wrapper[0].style.perspectiveOrigin = c + "px 50%"
                        }
                    },
                    setTransition: function(a) {
                        t.slides.transition(a).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(a)
                    }
                }
            },
            t.lazy = {
                initialImageLoaded: !1,
                loadImageInSlide: function(a, c) {
                    if (void 0 !== a && (void 0 === c && (c = !0),
                    0 !== t.slides.length)) {
                        var d = t.slides.eq(a),
                            e = d.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");
                        !d.hasClass("swiper-lazy") || d.hasClass("swiper-lazy-loaded") || d.hasClass("swiper-lazy-loading") || (e = e.add(d[0])),
                        0 !== e.length && e.each(function() {
                            var a = b(this);
                            a.addClass("swiper-lazy-loading");
                            var e = a.attr("data-background"),
                                f = a.attr("data-src"),
                                g = a.attr("data-srcset");
                            t.loadImage(a[0], f || e, g, !1, function() {
                                if (e ? (a.css("background-image", 'url("' + e + '")'),
                                a.removeAttr("data-background")) : (g && (a.attr("srcset", g),
                                a.removeAttr("data-srcset")),
                                f && (a.attr("src", f),
                                a.removeAttr("data-src"))),
                                a.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"),
                                d.find(".swiper-lazy-preloader, .preloader").remove(),
                                t.params.loop && c) {
                                    var b = d.attr("data-swiper-slide-index");
                                    if (d.hasClass(t.params.slideDuplicateClass)) {
                                        var h = t.wrapper.children('[data-swiper-slide-index="' + b + '"]:not(.' + t.params.slideDuplicateClass + ")");
                                        t.lazy.loadImageInSlide(h.index(), !1)
                                    } else {
                                        var i = t.wrapper.children("." + t.params.slideDuplicateClass + '[data-swiper-slide-index="' + b + '"]');
                                        t.lazy.loadImageInSlide(i.index(), !1)
                                    }
                                }
                                t.emit("onLazyImageReady", t, d[0], a[0])
                            }),
                            t.emit("onLazyImageLoad", t, d[0], a[0])
                        })
                    }
                },
                load: function() {
                    var a;
                    if (t.params.watchSlidesVisibility) t.wrapper.children("." + t.params.slideVisibleClass).each(function() {
                        t.lazy.loadImageInSlide(b(this).index())
                    });
                    else if (t.params.slidesPerView > 1) for (a = t.activeIndex; a < t.activeIndex + t.params.slidesPerView; a++)
                    t.slides[a] && t.lazy.loadImageInSlide(a);
                    else t.lazy.loadImageInSlide(t.activeIndex);
                    if (t.params.lazyLoadingInPrevNext) if (t.params.slidesPerView > 1 || t.params.lazyLoadingInPrevNextAmount && t.params.lazyLoadingInPrevNextAmount > 1) {
                        var c = t.params.lazyLoadingInPrevNextAmount,
                            d = t.params.slidesPerView,
                            e = Math.min(t.activeIndex + d + Math.max(c, d), t.slides.length),
                            f = Math.max(t.activeIndex - Math.max(d, c), 0);
                        for (a = t.activeIndex + t.params.slidesPerView; e > a; a++)
                        t.slides[a] && t.lazy.loadImageInSlide(a);
                        for (a = f; a < t.activeIndex; a++)
                        t.slides[a] && t.lazy.loadImageInSlide(a)
                    } else {
                        var g = t.wrapper.children("." + t.params.slideNextClass);
                        g.length > 0 && t.lazy.loadImageInSlide(g.index());
                        var h = t.wrapper.children("." + t.params.slidePrevClass);
                        h.length > 0 && t.lazy.loadImageInSlide(h.index())
                    }
                },
                onTransitionStart: function() {
                    t.params.lazyLoading && (t.params.lazyLoadingOnTransitionStart || !t.params.lazyLoadingOnTransitionStart && !t.lazy.initialImageLoaded) && t.lazy.load()
                },
                onTransitionEnd: function() {
                    t.params.lazyLoading && !t.params.lazyLoadingOnTransitionStart && t.lazy.load()
                }
            },
            t.scrollbar = {
                isTouched: !1,
                setDragPosition: function(a) {
                    var b = t.scrollbar,
                        c = t.isHorizontal() ? "touchstart" === a.type || "touchmove" === a.type ? a.targetTouches[0].pageX : a.pageX || a.clientX : "touchstart" === a.type || "touchmove" === a.type ? a.targetTouches[0].pageY : a.pageY || a.clientY,
                        d = c - b.track.offset()[t.isHorizontal() ? "left" : "top"] - b.dragSize / 2,
                        e = -t.minTranslate() * b.moveDivider,
                        f = -t.maxTranslate() * b.moveDivider;
                    e > d ? d = e : d > f && (d = f),
                    d = -d / b.moveDivider,
                    t.updateProgress(d),
                    t.setWrapperTranslate(d, !0)
                },
                dragStart: function(a) {
                    var b = t.scrollbar;
                    b.isTouched = !0,
                    a.preventDefault(),
                    a.stopPropagation(),
                    b.setDragPosition(a),
                    clearTimeout(b.dragTimeout),
                    b.track.transition(0),
                    t.params.scrollbarHide && b.track.css("opacity", 1),
                    t.wrapper.transition(100),
                    b.drag.transition(100),
                    t.emit("onScrollbarDragStart", t)
                },
                dragMove: function(a) {
                    var b = t.scrollbar;
                    b.isTouched && (a.preventDefault ? a.preventDefault() : a.returnValue = !1,
                    b.setDragPosition(a),
                    t.wrapper.transition(0),
                    b.track.transition(0),
                    b.drag.transition(0),
                    t.emit("onScrollbarDragMove", t))
                },
                dragEnd: function(a) {
                    var b = t.scrollbar;
                    b.isTouched && (b.isTouched = !1,
                    t.params.scrollbarHide && (clearTimeout(b.dragTimeout),
                    b.dragTimeout = setTimeout(function() {
                        b.track.css("opacity", 0),
                        b.track.transition(400)
                    }, 1e3)),
                    t.emit("onScrollbarDragEnd", t),
                    t.params.scrollbarSnapOnRelease && t.slideReset())
                },
                enableDraggable: function() {
                    var a = t.scrollbar,
                        c = t.support.touch ? a.track : document;
                    b(a.track).on(t.touchEvents.start, a.dragStart),
                    b(c).on(t.touchEvents.move, a.dragMove),
                    b(c).on(t.touchEvents.end, a.dragEnd)
                },
                disableDraggable: function() {
                    var a = t.scrollbar,
                        c = t.support.touch ? a.track : document;
                    b(a.track).off(t.touchEvents.start, a.dragStart),
                    b(c).off(t.touchEvents.move, a.dragMove),
                    b(c).off(t.touchEvents.end, a.dragEnd)
                },
                set: function() {
                    if (t.params.scrollbar) {
                        var a = t.scrollbar;
                        a.track = b(t.params.scrollbar),
                        t.params.uniqueNavElements && "string" == typeof t.params.scrollbar && a.track.length > 1 && 1 === t.container.find(t.params.scrollbar).length && (a.track = t.container.find(t.params.scrollbar)),
                        a.drag = a.track.find(".swiper-scrollbar-drag"),
                        0 === a.drag.length && (a.drag = b('<div class="swiper-scrollbar-drag"></div>'),
                        a.track.append(a.drag)),
                        a.drag[0].style.width = "",
                        a.drag[0].style.height = "",
                        a.trackSize = t.isHorizontal() ? a.track[0].offsetWidth : a.track[0].offsetHeight,
                        a.divider = t.size / t.virtualSize,
                        a.moveDivider = a.divider * (a.trackSize / t.size),
                        a.dragSize = a.trackSize * a.divider,
                        t.isHorizontal() ? a.drag[0].style.width = a.dragSize + "px" : a.drag[0].style.height = a.dragSize + "px",
                        a.divider >= 1 ? a.track[0].style.display = "none" : a.track[0].style.display = "",
                        t.params.scrollbarHide && (a.track[0].style.opacity = 0)
                    }
                },
                setTranslate: function() {
                    if (t.params.scrollbar) {
                        var a, b = t.scrollbar,
                            c = (t.translate,
                            b.dragSize);
                        a = (b.trackSize - b.dragSize) * t.progress,
                        t.rtl && t.isHorizontal() ? (a = -a,
                        a > 0 ? (c = b.dragSize - a,
                        a = 0) : -a + b.dragSize > b.trackSize && (c = b.trackSize + a)) : 0 > a ? (c = b.dragSize + a,
                        a = 0) : a + b.dragSize > b.trackSize && (c = b.trackSize - a),
                        t.isHorizontal() ? (t.support.transforms3d ? b.drag.transform("translate3d(" + a + "px, 0, 0)") : b.drag.transform("translateX(" + a + "px)"),
                        b.drag[0].style.width = c + "px") : (t.support.transforms3d ? b.drag.transform("translate3d(0px, " + a + "px, 0)") : b.drag.transform("translateY(" + a + "px)"),
                        b.drag[0].style.height = c + "px"),
                        t.params.scrollbarHide && (clearTimeout(b.timeout),
                        b.track[0].style.opacity = 1,
                        b.timeout = setTimeout(function() {
                            b.track[0].style.opacity = 0,
                            b.track.transition(400)
                        }, 1e3))
                    }
                },
                setTransition: function(a) {
                    t.params.scrollbar && t.scrollbar.drag.transition(a)
                }
            },
            t.controller = {
                LinearSpline: function(a, b) {
                    this.x = a,
                    this.y = b,
                    this.lastIndex = a.length - 1;
                    var c, d;
                    this.x.length,
                    this.interpolate = function(a) {
                        return a ? (d = e(this.x, a),
                        c = d - 1, (a - this.x[c]) * (this.y[d] - this.y[c]) / (this.x[d] - this.x[c]) + this.y[c]) : 0
                    };
                    var e = function() {
                        var a, b, c;
                        return function(d, e) {
                            for (b = -1,
                            a = d.length; a - b > 1;)
                            d[c = a + b >> 1] <= e ? b = c : a = c;
                            return a
                        }
                    }()
                },
                getInterpolateFunction: function(a) {
                    t.controller.spline || (t.controller.spline = t.params.loop ? new t.controller.LinearSpline(t.slidesGrid, a.slidesGrid) : new t.controller.LinearSpline(t.snapGrid, a.snapGrid))
                },
                setTranslate: function(a, b) {
                    function d(b) {
                        a = b.rtl && "horizontal" === b.params.direction ? -t.translate : t.translate,
                            "slide" === t.params.controlBy && (t.controller.getInterpolateFunction(b),
                        f = -t.controller.spline.interpolate(-a)),
                        f && "container" !== t.params.controlBy || (e = (b.maxTranslate() - b.minTranslate()) / (t.maxTranslate() - t.minTranslate()),
                        f = (a - t.minTranslate()) * e + b.minTranslate()),
                        t.params.controlInverse && (f = b.maxTranslate() - f),
                        b.updateProgress(f),
                        b.setWrapperTranslate(f, !1, t),
                        b.updateActiveIndex()
                    }
                    var e, f, g = t.params.control;
                    if (t.isArray(g)) for (var h = 0; h < g.length; h++)
                    g[h] !== b && g[h] instanceof c && d(g[h]);
                    else g instanceof c && b !== g && d(g)
                },
                setTransition: function(a, b) {
                    function d(b) {
                        b.setWrapperTransition(a, t),
                        0 !== a && (b.onTransitionStart(),
                        b.wrapper.transitionEnd(function() {
                            f && (b.params.loop && "slide" === t.params.controlBy && b.fixLoop(),
                            b.onTransitionEnd())
                        }))
                    }
                    var e, f = t.params.control;
                    if (t.isArray(f)) for (e = 0; e < f.length; e++)
                    f[e] !== b && f[e] instanceof c && d(f[e]);
                    else f instanceof c && b !== f && d(f)
                }
            },
            t.hashnav = {
                init: function() {
                    if (t.params.hashnav) {
                        t.hashnav.initialized = !0;
                        var a = document.location.hash.replace("#", "");
                        if (a) for (var b = 0, c = 0, d = t.slides.length; d > c; c++) {
                            var e = t.slides.eq(c),
                                f = e.attr("data-hash");
                            if (f === a && !e.hasClass(t.params.slideDuplicateClass)) {
                                var g = e.index();
                                t.slideTo(g, b, t.params.runCallbacksOnInit, !0)
                            }
                        }
                    }
                },
                setHash: function() {
                    t.hashnav.initialized && t.params.hashnav && (document.location.hash = t.slides.eq(t.activeIndex).attr("data-hash") || "")
                }
            },
            t.disableKeyboardControl = function() {
                t.params.keyboardControl = !1,
                b(document).off("keydown", i)
            },
            t.enableKeyboardControl = function() {
                t.params.keyboardControl = !0,
                b(document).on("keydown", i)
            },
            t.mousewheel = {
                event: !1,
                lastScrollTime: (new window.Date).getTime()
            },
            t.params.mousewheelControl) {
                try {
                    new window.WheelEvent("wheel"),
                    t.mousewheel.event = "wheel"
                } catch (a) {
                    (window.WheelEvent || t.container[0] && "wheel" in t.container[0]) && (t.mousewheel.event = "wheel")
                }!t.mousewheel.event && window.WheelEvent,
                t.mousewheel.event || void 0 === document.onmousewheel || (t.mousewheel.event = "mousewheel"),
                t.mousewheel.event || (t.mousewheel.event = "DOMMouseScroll")
            }
            t.disableMousewheelControl = function() {
                return !!t.mousewheel.event && (t.container.off(t.mousewheel.event, j), !0)
            },
            t.enableMousewheelControl = function() {
                return !!t.mousewheel.event && (t.container.on(t.mousewheel.event, j), !0)
            },
            t.parallax = {
                setTranslate: function() {
                    t.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                        k(this, t.progress)
                    }),
                    t.slides.each(function() {
                        var a = b(this);
                        a.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                            k(this, Math.min(Math.max(a[0].progress, -1), 1))
                        })
                    })
                },
                setTransition: function(a) {
                    void 0 === a && (a = t.params.speed),
                    t.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function() {
                        var c = b(this),
                            d = parseInt(c.attr("data-swiper-parallax-duration"), 10) || a;
                        0 === a && (d = 0),
                        c.transition(d)
                    })
                }
            },
            t._plugins = [];
            for (var L in t.plugins) {
                var M = t.plugins[L](t, t.params[L]);
                M && t._plugins.push(M)
            }
            return t.callPlugins = function(a) {
                for (var b = 0; b < t._plugins.length; b++)
                a in t._plugins[b] && t._plugins[b][a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            },
            t.emitterEventListeners = {},
            t.emit = function(a) {
                t.params[a] && t.params[a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                var b;
                if (t.emitterEventListeners[a]) for (b = 0; b < t.emitterEventListeners[a].length; b++)
                t.emitterEventListeners[a][b](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                t.callPlugins && t.callPlugins(a, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
            },
            t.on = function(a, b) {
                return a = l(a),
                t.emitterEventListeners[a] || (t.emitterEventListeners[a] = []),
                t.emitterEventListeners[a].push(b),
                t
            },
            t.off = function(a, b) {
                var c;
                if (a = l(a),
                void 0 === b) return t.emitterEventListeners[a] = [],
                t;
                if (t.emitterEventListeners[a] && 0 !== t.emitterEventListeners[a].length) {
                    for (c = 0; c < t.emitterEventListeners[a].length; c++)
                    t.emitterEventListeners[a][c] === b && t.emitterEventListeners[a].splice(c, 1);
                    return t
                }
            },
            t.once = function(a, b) {
                a = l(a);
                var c = function() {
                    b(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]),
                    t.off(a, c)
                };
                return t.on(a, c),
                t
            },
            t.a11y = {
                makeFocusable: function(a) {
                    return a.attr("tabIndex", "0"),
                    a
                },
                addRole: function(a, b) {
                    return a.attr("role", b),
                    a
                },
                addLabel: function(a, b) {
                    return a.attr("aria-label", b),
                    a
                },
                disable: function(a) {
                    return a.attr("aria-disabled", !0),
                    a
                },
                enable: function(a) {
                    return a.attr("aria-disabled", !1),
                    a
                },
                onEnterKey: function(a) {
                    13 === a.keyCode && (b(a.target).is(t.params.nextButton) ? (t.onClickNext(a),
                    t.isEnd ? t.a11y.notify(t.params.lastSlideMessage) : t.a11y.notify(t.params.nextSlideMessage)) : b(a.target).is(t.params.prevButton) && (t.onClickPrev(a),
                    t.isBeginning ? t.a11y.notify(t.params.firstSlideMessage) : t.a11y.notify(t.params.prevSlideMessage)),
                    b(a.target).is("." + t.params.bulletClass) && b(a.target)[0].click())
                },
                liveRegion: b('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),
                notify: function(a) {
                    var b = t.a11y.liveRegion;
                    0 !== b.length && (b.html(""),
                    b.html(a))
                },
                init: function() {
                    t.params.nextButton && t.nextButton && t.nextButton.length > 0 && (t.a11y.makeFocusable(t.nextButton),
                    t.a11y.addRole(t.nextButton, "button"),
                    t.a11y.addLabel(t.nextButton, t.params.nextSlideMessage)),
                    t.params.prevButton && t.prevButton && t.prevButton.length > 0 && (t.a11y.makeFocusable(t.prevButton),
                    t.a11y.addRole(t.prevButton, "button"),
                    t.a11y.addLabel(t.prevButton, t.params.prevSlideMessage)),
                    b(t.container).append(t.a11y.liveRegion)
                },
                initPagination: function() {
                    t.params.pagination && t.params.paginationClickable && t.bullets && t.bullets.length && t.bullets.each(function() {
                        var a = b(this);
                        t.a11y.makeFocusable(a),
                        t.a11y.addRole(a, "button"),
                        t.a11y.addLabel(a, t.params.paginationBulletMessage.replace(/{{index}}/, a.index() + 1))
                    })
                },
                destroy: function() {
                    t.a11y.liveRegion && t.a11y.liveRegion.length > 0 && t.a11y.liveRegion.remove()
                }
            },
            t.init = function() {
                t.params.loop && t.createLoop(),
                t.updateContainerSize(),
                t.updateSlidesSize(),
                t.updatePagination(),
                t.params.scrollbar && t.scrollbar && (t.scrollbar.set(),
                t.params.scrollbarDraggable && t.scrollbar.enableDraggable()),
                    "slide" !== t.params.effect && t.effects[t.params.effect] && (t.params.loop || t.updateProgress(),
                t.effects[t.params.effect].setTranslate()),
                t.params.loop ? t.slideTo(t.params.initialSlide + t.loopedSlides, 0, t.params.runCallbacksOnInit) : (t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit),
                0 === t.params.initialSlide && (t.parallax && t.params.parallax && t.parallax.setTranslate(),
                t.lazy && t.params.lazyLoading && (t.lazy.load(),
                t.lazy.initialImageLoaded = !0))),
                t.attachEvents(),
                t.params.observer && t.support.observer && t.initObservers(),
                t.params.preloadImages && !t.params.lazyLoading && t.preloadImages(),
                t.params.autoplay && t.startAutoplay(),
                t.params.keyboardControl && t.enableKeyboardControl && t.enableKeyboardControl(),
                t.params.mousewheelControl && t.enableMousewheelControl && t.enableMousewheelControl(),
                t.params.hashnav && t.hashnav && t.hashnav.init(),
                t.params.a11y && t.a11y && t.a11y.init(),
                t.emit("onInit", t)
            },
            t.cleanupStyles = function() {
                t.container.removeClass(t.classNames.join(" ")).removeAttr("style"),
                t.wrapper.removeAttr("style"),
                t.slides && t.slides.length && t.slides.removeClass([t.params.slideVisibleClass, t.params.slideActiveClass, t.params.slideNextClass, t.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"),
                t.paginationContainer && t.paginationContainer.length && t.paginationContainer.removeClass(t.params.paginationHiddenClass),
                t.bullets && t.bullets.length && t.bullets.removeClass(t.params.bulletActiveClass),
                t.params.prevButton && b(t.params.prevButton).removeClass(t.params.buttonDisabledClass),
                t.params.nextButton && b(t.params.nextButton).removeClass(t.params.buttonDisabledClass),
                t.params.scrollbar && t.scrollbar && (t.scrollbar.track && t.scrollbar.track.length && t.scrollbar.track.removeAttr("style"),
                t.scrollbar.drag && t.scrollbar.drag.length && t.scrollbar.drag.removeAttr("style"))
            },
            t.destroy = function(a, b) {
                t.detachEvents(),
                t.stopAutoplay(),
                t.params.scrollbar && t.scrollbar && t.params.scrollbarDraggable && t.scrollbar.disableDraggable(),
                t.params.loop && t.destroyLoop(),
                b && t.cleanupStyles(),
                t.disconnectObservers(),
                t.params.keyboardControl && t.disableKeyboardControl && t.disableKeyboardControl(),
                t.params.mousewheelControl && t.disableMousewheelControl && t.disableMousewheelControl(),
                t.params.a11y && t.a11y && t.a11y.destroy(),
                t.emit("onDestroy"), !1 !== a && (t = null)
            },
            t.init(),
            t
        }
    };
    c.prototype = {
        isSafari: function() {
            var a = navigator.userAgent.toLowerCase();
            return a.indexOf("safari") >= 0 && a.indexOf("chrome") < 0 && a.indexOf("android") < 0
        }(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
        isArray: function(a) {
            return "[object Array]" === Object.prototype.toString.apply(a)
        },
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1
        },
        device: function() {
            var a = navigator.userAgent,
                b = a.match(/(Android);?[\s\/]+([\d.]+)?/),
                c = a.match(/(iPad).*OS\s([\d_]+)/),
                d = a.match(/(iPod)(.*OS\s([\d_]+))?/),
                e = !c && a.match(/(iPhone\sOS)\s([\d_]+)/);
            return {
                ios: c || e || d,
                android: b
            }
        }(),
        support: {
            touch: window.Modernizr && !0 === Modernizr.touch || function() {
                return !!("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch)
            }(),
            transforms3d: window.Modernizr && !0 === Modernizr.csstransforms3d || function() {
                var a = document.createElement("div").style;
                return "webkitPerspective" in a || "MozPerspective" in a || "OPerspective" in a || "MsPerspective" in a || "perspective" in a
            }(),
            flexbox: function() {
                for (var a = document.createElement("div").style, b = "alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "), c = 0; c < b.length; c++)
                if (b[c] in a) return !0
            }(),
            observer: function() {
                return "MutationObserver" in window || "WebkitMutationObserver" in window
            }()
        },
        plugins: {}
    };
    for (var d = ["jQuery", "Zepto", "Dom7"], e = 0; e < d.length; e++)
    window[d[e]] && a(window[d[e]]);
    var f;
    f = "undefined" == typeof Dom7 ? window.Dom7 || window.Zepto || window.jQuery : Dom7,
    f && ("transitionEnd" in f.fn || (f.fn.transitionEnd = function(a) {
        function b(f) {
            if (f.target === this) for (a.call(this, f),
            c = 0; c < d.length; c++)
            e.off(d[c], b)
        }
        var c, d = ["webkitTransitionEnd", "transitionend", "oTransitionEnd", "MSTransitionEnd", "msTransitionEnd"],
            e = this;
        if (a) for (c = 0; c < d.length; c++)
        e.on(d[c], b);
        return this
    }),
        "transform" in f.fn || (f.fn.transform = function(a) {
        for (var b = 0; b < this.length; b++) {
            var c = this[b].style;
            c.webkitTransform = c.MsTransform = c.msTransform = c.MozTransform = c.OTransform = c.transform = a
        }
        return this
    }),
        "transition" in f.fn || (f.fn.transition = function(a) {
        "string" != typeof a && (a += "ms");
        for (var b = 0; b < this.length; b++) {
            var c = this[b].style;
            c.webkitTransitionDuration = c.MsTransitionDuration = c.msTransitionDuration = c.MozTransitionDuration = c.OTransitionDuration = c.transitionDuration = a
        }
        return this
    })),
    window.Swiper = c
}(),
    "undefined" != typeof module ? module.exports = window.Swiper : "function" == typeof define && define.amd && define([], function() {
    "use strict";
    return window.Swiper
}),

function() {
    function a(a, b) {
        if (!b || "function" == typeof b) return a;
        for (var c in b)
        a[c] = b[c];
        return a
    }

    function b(a, c) {
        for (var d in c)
        d in a ? b(a[d], c[d]) : a[d] = c[d];
        return a
    }

    function c(a, b, c) {
        var d, e = 0,
            f = a.length,
            g = void 0 === f || "[object Array]" !== Object.prototype.toString.apply(a) || "function" == typeof a;
        if (c) if (g) {
            for (d in a)
            if (!1 === b.apply(a[d], c)) break
        } else for (; f > e && !1 !== b.apply(a[e++], c););
        else if (g) {
            for (d in a)
            if (!1 === b.call(a[d], d, a[d])) break
        } else for (; f > e && !1 !== b.call(a[e], e, a[e++]););
        return a
    }

    function d(a) {
        return "string" == typeof a ? a.replace(/[&<>"'\/]/g, function(a) {
            return N[a]
        }) : a
    }

    function e(a) {
        var b = function(a) {
            if (window.XMLHttpRequest) return a(null, new XMLHttpRequest);
            if (window.ActiveXObject) try {
                return a(null, new ActiveXObject("Msxml2.XMLHTTP"))
            } catch (b) {
                return a(null, new ActiveXObject("Microsoft.XMLHTTP"))
            }
            return a(new Error)
        }, c = function(a) {
            if ("string" == typeof a) return a;
            var b = [];
            for (var c in a)
            a.hasOwnProperty(c) && b.push(encodeURIComponent(c) + "=" + encodeURIComponent(a[c]));
            return b.join("&")
        }, d = function(a) {
            a = a.replace(/\r\n/g, "\n");
            for (var b = "", c = 0; c < a.length; c++) {
                var d = a.charCodeAt(c);
                128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(192 | d >> 6),
                b += String.fromCharCode(128 | 63 & d)) : (b += String.fromCharCode(224 | d >> 12),
                b += String.fromCharCode(128 | 63 & d >> 6),
                b += String.fromCharCode(128 | 63 & d))
            }
            return b
        }, e = function(a) {
            var b = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            a = d(a);
            var c, e, f, g, h, i, j, k = "",
                l = 0;
            do {
                c = a.charCodeAt(l++),
                e = a.charCodeAt(l++),
                f = a.charCodeAt(l++),
                g = c >> 2,
                h = (3 & c) << 4 | e >> 4,
                i = (15 & e) << 2 | f >> 6,
                j = 63 & f,
                isNaN(e) ? i = j = 64 : isNaN(f) && (j = 64),
                k += b.charAt(g) + b.charAt(h) + b.charAt(i) + b.charAt(j),
                c = e = f = "",
                g = h = i = j = ""
            } while (l < a.length);
            return k
        }, f = function() {
            for (var a = arguments[0], b = 1; b < arguments.length; b++) {
                var c = arguments[b];
                for (var d in c)
                c.hasOwnProperty(d) && (a[d] = c[d])
            }
            return a
        }, g = function(a, d, e, h) {
            "function" == typeof e && (h = e,
            e = {}),
            e.cache = e.cache || !1,
            e.data = e.data || {},
            e.headers = e.headers || {},
            e.jsonp = e.jsonp || !1,
            e.async = void 0 === e.async || e.async;
            var i, j = f({
                accept: "*/*",
                "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
            }, g.headers, e.headers);
            if (i = "application/json" === j["content-type"] ? JSON.stringify(e.data) : c(e.data),
                "GET" === a) {
                var k = [];
                if (i && (k.push(i),
                i = null),
                e.cache || k.push("_=" + (new Date).getTime()),
                e.jsonp && (k.push("callback=" + e.jsonp),
                k.push("jsonp=" + e.jsonp)),
                k = k.join("&"),
                k.length > 1 && (d += d.indexOf("?") > -1 ? "&" + k : "?" + k),
                e.jsonp) {
                    var l = document.getElementsByTagName("head")[0],
                        m = document.createElement("script");
                    return m.type = "text/javascript",
                    m.src = d,
                    void l.appendChild(m)
                }
            }
            b(function(b, c) {
                if (b) return h(b);
                c.open(a, d, e.async);
                for (var f in j)
                j.hasOwnProperty(f) && c.setRequestHeader(f, j[f]);
                c.onreadystatechange = function() {
                    if (4 === c.readyState) {
                        var a = c.responseText || "";
                        if (!h) return;
                        h(c.status, {
                            text: function() {
                                return a
                            },
                            json: function() {
                                return JSON.parse(a)
                            }
                        })
                    }
                },
                c.send(i)
            })
        };
        ({
            authBasic: function(a, b) {
                g.headers.Authorization = "Basic " + e(a + ":" + b)
            },
            connect: function(a, b, c) {
                return g("CONNECT", a, b, c)
            },
            del: function(a, b, c) {
                return g("DELETE", a, b, c)
            },
            get: function(a, b, c) {
                return g("GET", a, b, c)
            },
            head: function(a, b, c) {
                return g("HEAD", a, b, c)
            },
            headers: function(a) {
                g.headers = a || {}
            },
            isAllowed: function(a, b, c) {
                this.options(a, function(a, d) {
                    c(-1 !== d.text().indexOf(b))
                })
            },
            options: function(a, b, c) {
                return g("OPTIONS", a, b, c)
            },
            patch: function(a, b, c) {
                return g("PATCH", a, b, c)
            },
            post: function(a, b, c) {
                return g("POST", a, b, c)
            },
            put: function(a, b, c) {
                return g("PUT", a, b, c)
            },
            trace: function(a, b, c) {
                return g("TRACE", a, b, c)
            }
        })[a.type ? a.type.toLowerCase() : "get"](a.url, a, function(b, c) {
            200 === b || 0 === b && c.text() ? a.success(c.json(), b, null) : a.error(c.text(), b, null)
        })
    }

    function f(a, b) {
        "function" == typeof a && (b = a,
        a = {}),
        a = a || {},
        Q.extend(M, a),
        delete M.fixLng,
            "string" == typeof M.ns && (M.ns = {
            namespaces: [M.ns],
            defaultNs: M.ns
        }),
            "string" == typeof M.fallbackNS && (M.fallbackNS = [M.fallbackNS]), ("string" == typeof M.fallbackLng || "boolean" == typeof M.fallbackLng) && (M.fallbackLng = [M.fallbackLng]),
        M.interpolationPrefixEscaped = Q.regexEscape(M.interpolationPrefix),
        M.interpolationSuffixEscaped = Q.regexEscape(M.interpolationSuffix),
        M.lng || (M.lng = Q.detectLanguage()),
        J = Q.toLanguages(M.lng),
        D = J[0],
        Q.log("currentLng set to: " + D),
        M.useCookie && Q.cookie.read(M.cookieName) !== D && Q.cookie.create(M.cookieName, D, M.cookieExpirationTime, M.cookieDomain),
        M.detectLngFromLocalStorage && "undefined" != typeof document && window.localstorage && window.localStorage.setItem("i18next_lng", D);
        var c = x;
        a.fixLng && (c = function(a, b) {
            return b = b || {},
            b.lng = b.lng || c.lng,
            x(a, b)
        },
        c.lng = D),
        R.setCurrentLng(D),
        F && M.setJqueryExt && q();
        var d;
        if (F && F.Deferred && (d = F.Deferred()), !M.resStore) {
            var e = Q.toLanguages(M.lng);
            "string" == typeof M.preload && (M.preload = [M.preload]);
            for (var f = 0, g = M.preload.length; g > f; f++)
            for (var h = Q.toLanguages(M.preload[f]), i = 0, j = h.length; j > i; i++)
            e.indexOf(h[i]) < 0 && e.push(h[i]);
            return G.sync.load(e, M, function(a, e) {
                H = e,
                K = !0,
                b && b(c),
                d && d.resolve(c)
            }),
            d ? d.promise() : void 0
        }
        return H = M.resStore,
        K = !0,
        b && b(c),
        d && d.resolve(c),
        d ? d.promise() : void 0
    }

    function g(a, b) {
        "string" == typeof a && (a = [a]);
        for (var c = 0, d = a.length; d > c; c++)
        M.preload.indexOf(a[c]) < 0 && M.preload.push(a[c]);
        return f(b)
    }

    function h(a, b, c, d) {
        "string" != typeof b ? (c = b,
        b = M.ns.defaultNs) : M.ns.namespaces.indexOf(b) < 0 && M.ns.namespaces.push(b),
        H[a] = H[a] || {},
        H[a][b] = H[a][b] || {},
        d ? Q.deepExtend(H[a][b], c) : Q.extend(H[a][b], c)
    }

    function i(a, b) {
        "string" != typeof b && (b = M.ns.defaultNs),
        H[a] = H[a] || {},
        H[a][b] = {}
    }

    function j(a, b, c, d) {
        "string" != typeof b ? (resource = b,
        b = M.ns.defaultNs) : M.ns.namespaces.indexOf(b) < 0 && M.ns.namespaces.push(b),
        H[a] = H[a] || {},
        H[a][b] = H[a][b] || {};
        for (var e = c.split(M.keyseparator), f = 0, g = H[M.lng][b]; e[f];)
        f == e.length - 1 ? g[e[f]] = d : (null == g[e[f]] && (g[e[f]] = {}),
        g = g[e[f]]),
        f++
    }

    function k(a, b, c) {
        "string" != typeof b ? (resource = b,
        b = M.ns.defaultNs) : M.ns.namespaces.indexOf(b) < 0 && M.ns.namespaces.push(b);
        for (var d in c) "string" == typeof c[d] && j(a, b, d, c[d])
    }

    function l(a) {
        M.ns.defaultNs = a
    }

    function m(a, b) {
        n([a], b)
    }

    function n(a, b) {
        var c = {
            dynamicLoad: M.dynamicLoad,
            resGetPath: M.resGetPath,
            getAsync: M.getAsync,
            customLoad: M.customLoad,
            ns: {
                namespaces: a,
                defaultNs: ""
            }
        }, d = Q.toLanguages(M.lng);
        "string" == typeof M.preload && (M.preload = [M.preload]);
        for (var e = 0, f = M.preload.length; f > e; e++)
        for (var g = Q.toLanguages(M.preload[e]), h = 0, i = g.length; i > h; h++)
        d.indexOf(g[h]) < 0 && d.push(g[h]);
        for (var j = [], k = 0, l = d.length; l > k; k++) {
            var m = !1,
                n = H[d[k]];
            if (n) for (var o = 0, p = a.length; p > o; o++)
            n[a[o]] || (m = !0);
            else m = !0;
            m && j.push(d[k])
        }
        j.length ? G.sync._fetch(j, c, function(c, d) {
            var e = a.length * j.length;
            Q.each(a, function(a, c) {
                M.ns.namespaces.indexOf(c) < 0 && M.ns.namespaces.push(c),
                Q.each(j, function(a, f) {
                    H[f] = H[f] || {},
                    H[f][c] = d[f][c],
                    0 === --e && b && (M.useLocalStorage && G.sync._storeLocal(H),
                    b())
                })
            })
        }) : b && b()
    }

    function o(a, b, c) {
        return "function" == typeof b ? (c = b,
        b = {}) : b || (b = {}),
        b.lng = a,
        f(b, c)
    }

    function p() {
        return D
    }

    function q() {
        function a(a, b, c) {
            if (0 !== b.length) {
                var d = "text";
                if (0 === b.indexOf("[")) {
                    var e = b.split("]");
                    b = e[1],
                    d = e[0].substr(1, e[0].length - 1)
                }
                b.indexOf(";") === b.length - 1 && (b = b.substr(0, b.length - 2));
                var f;
                if ("html" === d) f = M.defaultValueFromContent ? F.extend({
                    defaultValue: a.html()
                }, c) : c,
                a.html(F.t(b, f));
                else if ("text" === d) f = M.defaultValueFromContent ? F.extend({
                    defaultValue: a.text()
                }, c) : c,
                a.text(F.t(b, f));
                else if ("prepend" === d) f = M.defaultValueFromContent ? F.extend({
                    defaultValue: a.html()
                }, c) : c,
                a.prepend(F.t(b, f));
                else if ("append" === d) f = M.defaultValueFromContent ? F.extend({
                    defaultValue: a.html()
                }, c) : c,
                a.append(F.t(b, f));
                else if (0 === d.indexOf("data-")) {
                    var g = d.substr("data-".length);
                    f = M.defaultValueFromContent ? F.extend({
                        defaultValue: a.data(g)
                    }, c) : c;
                    var h = F.t(b, f);
                    a.data(g, h),
                    a.attr(d, h)
                } else f = M.defaultValueFromContent ? F.extend({
                    defaultValue: a.attr(d)
                }, c) : c,
                a.attr(d, F.t(b, f))
            }
        }

        function b(b, c) {
            var d = b.attr(M.selectorAttr);
            if (d || void 0 === d || !1 === d || (d = b.text() || b.val()),
            d) {
                var e = b,
                    f = b.data("i18n-target");
                if (f && (e = b.find(f) || b),
                c || !0 !== M.useDataAttrOptions || (c = b.data("i18n-options")),
                c = c || {},
                d.indexOf(";") >= 0) {
                    var g = d.split(";");
                    F.each(g, function(b, d) {
                        "" !== d && a(e, d, c)
                    })
                } else a(e, d, c);
                !0 === M.useDataAttrOptions && b.data("i18n-options", c)
            }
        }
        F.t = F.t || x,
        F.fn.i18n = function(a) {
            return this.each(function() {
                b(F(this), a),
                F(this).find("[" + M.selectorAttr + "]").each(function() {
                    b(F(this), a)
                })
            })
        }
    }

    function r(a, b, c, d) {
        if (!a) return a;
        if (d = d || b,
        a.indexOf(d.interpolationPrefix || M.interpolationPrefix) < 0) return a;
        var e = d.interpolationPrefix ? Q.regexEscape(d.interpolationPrefix) : M.interpolationPrefixEscaped,
            f = d.interpolationSuffix ? Q.regexEscape(d.interpolationSuffix) : M.interpolationSuffixEscaped,
            g = "HTML" + f,
            h = b.replace && "object" == typeof b.replace ? b.replace : b;
        return Q.each(h, function(b, h) {
            var i = c ? c + M.keyseparator + b : b;
            "object" == typeof h && null !== h ? a = r(a, h, i, d) : d.escapeInterpolation || M.escapeInterpolation ? (a = a.replace(new RegExp([e, i, g].join(""), "g"), Q.regexReplacementEscape(h)),
            a = a.replace(new RegExp([e, i, f].join(""), "g"), Q.regexReplacementEscape(Q.escape(h)))) : a = a.replace(new RegExp([e, i, f].join(""), "g"), Q.regexReplacementEscape(h))
        }),
        a
    }

    function s(a, b) {
        var c = ",",
            d = "{",
            e = "}",
            f = Q.extend({}, b);
        for (delete f.postProcess; - 1 != a.indexOf(M.reusePrefix) && !(++I > M.maxRecursion);) {
            var g = a.lastIndexOf(M.reusePrefix),
                h = a.indexOf(M.reuseSuffix, g) + M.reuseSuffix.length,
                i = a.substring(g, h),
                j = i.replace(M.reusePrefix, "").replace(M.reuseSuffix, "");
            if (g >= h) return Q.error("there is an missing closing in following translation value", a),
                "";
            if (-1 != j.indexOf(c)) {
                var k = j.indexOf(c);
                if (-1 != j.indexOf(d, k) && -1 != j.indexOf(e, k)) {
                    var l = j.indexOf(d, k),
                        m = j.indexOf(e, l) + e.length;
                    try {
                        f = Q.extend(f, JSON.parse(j.substring(l, m))),
                        j = j.substring(0, k)
                    } catch (a) {}
                }
            }
            var n = A(j, f);
            a = a.replace(i, Q.regexReplacementEscape(n))
        }
        return a
    }

    function t(a) {
        return a.context && ("string" == typeof a.context || "number" == typeof a.context)
    }

    function u(a, b) {
        return void 0 !== a.count && "string" != typeof a.count && R.needsPlural(b, a.count)
    }

    function v(a) {
        return void 0 !== a.indefinite_article && "string" != typeof a.indefinite_article && a.indefinite_article
    }

    function w(a, b) {
        b = b || {};
        var c = y(a, b),
            d = B(a, b);
        return void 0 !== d || d === c
    }

    function x(a, b) {
        return b = b || {},
        K ? (I = 0,
        A.apply(null, arguments)) : (Q.log("i18next not finished initialization. you might have called t function before loading resources finished."),
        b.defaultValue || "")
    }

    function y(a, b) {
        return void 0 !== b.defaultValue ? b.defaultValue : a
    }

    function z() {
        for (var a = [], b = 1; b < arguments.length; b++)
        a.push(arguments[b]);
        return {
            postProcess: "sprintf",
            sprintf: a
        }
    }

    function A(a, b) {
        if (b && "object" != typeof b ? "sprintf" === M.shortcutFunction ? b = z.apply(null, arguments) : "defaultValue" === M.shortcutFunction && (b = {
            defaultValue: b
        }) : b = b || {},
        void 0 === a || null === a || "" === a) return "";
        "string" == typeof a && (a = [a]);
        var c = a[0];
        if (a.length > 1) for (var d = 0; d < a.length && (c = a[d], !w(c, b)); d++);
        var e, f = y(c, b),
            g = B(c, b),
            h = b.lng ? Q.toLanguages(b.lng, b.fallbackLng) : J,
            i = b.ns || M.ns.defaultNs;
        c.indexOf(M.nsseparator) > -1 && (e = c.split(M.nsseparator),
        i = e[0],
        c = e[1]),
        void 0 === g && M.sendMissing && "function" == typeof M.missingKeyHandler && (b.lng ? M.missingKeyHandler(h[0], i, c, f, h) : M.missingKeyHandler(M.lng, i, c, f, h));
        var j = b.postProcess || M.postProcess;
        void 0 !== g && j && S[j] && (g = S[j](g, c, b));
        var k = f;
        if (f.indexOf(M.nsseparator) > -1 && (e = f.split(M.nsseparator),
        k = e[1]),
        k === c && M.parseMissingKey && (f = M.parseMissingKey(f)),
        void 0 === g && (f = r(f, b),
        f = s(f, b),
        j && S[j])) {
            var l = y(c, b);
            g = S[j](l, c, b)
        }
        return void 0 !== g ? g : f
    }

    function B(a, b) {
        b = b || {};
        var c, d, e = y(a, b),
            f = J;
        if (!H) return e;
        if ("cimode" === f[0].toLowerCase()) return e;
        if (b.lng && (f = Q.toLanguages(b.lng, b.fallbackLng), !H[f[0]])) {
            var g = M.getAsync;
            M.getAsync = !1,
            G.sync.load(f, M, function(a, b) {
                Q.extend(H, b),
                M.getAsync = g
            })
        }
        var h = b.ns || M.ns.defaultNs;
        if (a.indexOf(M.nsseparator) > -1) {
            var i = a.split(M.nsseparator);
            h = i[0],
            a = i[1]
        }
        if (t(b)) {
            c = Q.extend({}, b),
            delete c.context,
            c.defaultValue = M.contextNotFound;
            if ((d = x(h + M.nsseparator + a + "_" + b.context, c)) != M.contextNotFound) return r(d, {
                context: b.context
            })
        }
        if (u(b, f[0])) {
            c = Q.extend({}, b),
            delete c.count,
            c.defaultValue = M.pluralNotFound;
            var j = h + M.nsseparator + a + M.pluralSuffix,
                k = R.get(f[0], b.count);
            if (k >= 0 ? j = j + "_" + k : 1 === k && (j = h + M.nsseparator + a), (d = x(j, c)) != M.pluralNotFound) return r(d, {
                count: b.count,
                interpolationPrefix: b.interpolationPrefix,
                interpolationSuffix: b.interpolationSuffix
            })
        }
        if (v(b)) {
            var l = Q.extend({}, b);
            delete l.indefinite_article,
            l.defaultValue = M.indefiniteNotFound;
            if ((d = x(h + M.nsseparator + a + (b.count && !u(b, f[0]) || !b.count ? M.indefiniteSuffix : ""), l)) != M.indefiniteNotFound) return d
        }
        for (var m, n = a.split(M.keyseparator), o = 0, p = f.length; p > o && void 0 === m; o++) {
            for (var q = f[o], w = 0, z = H[q] && H[q][h]; n[w];)
            z = z && z[n[w]],
            w++;
            if (void 0 !== z) {
                var C = Object.prototype.toString.apply(z);
                if ("string" == typeof z) z = r(z, b),
                z = s(z, b);
                else if ("[object Array]" !== C || M.returnObjectTrees || b.returnObjectTrees) {
                    if (null === z && !0 === M.fallbackOnNull) z = void 0;
                    else if (null !== z) if (M.returnObjectTrees || b.returnObjectTrees) {
                        if ("[object Number]" !== C && "[object Function]" !== C && "[object RegExp]" !== C) {
                            var D = "[object Array]" === C ? [] : {};
                            Q.each(z, function(c) {
                                D[c] = A(h + M.nsseparator + a + M.keyseparator + c, b)
                            }),
                            z = D
                        }
                    } else M.objectTreeKeyHandler && "function" == typeof M.objectTreeKeyHandler ? z = M.objectTreeKeyHandler(a, z, q, h, b) : (z = "key '" + h + ":" + a + " (" + q + ")' returned an object instead of string.",
                    Q.log(z))
                } else z = z.join("\n"),
                z = r(z, b),
                z = s(z, b);
                "string" == typeof z && "" === z.trim() && !0 === M.fallbackOnEmpty && (z = void 0),
                m = z
            }
        }
        if (void 0 === m && !b.isFallbackLookup && (!0 === M.fallbackToDefaultNS || M.fallbackNS && M.fallbackNS.length > 0)) {
            if (b.isFallbackLookup = !0,
            M.fallbackNS.length) {
                for (var E = 0, F = M.fallbackNS.length; F > E; E++)
                if (m = B(M.fallbackNS[E] + M.nsseparator + a, b)) {
                    var I = m.indexOf(M.nsseparator) > -1 ? m.split(M.nsseparator)[1] : m,
                        K = e.indexOf(M.nsseparator) > -1 ? e.split(M.nsseparator)[1] : e;
                    if (I !== K) break
                }
            } else m = B(a, b);
            b.isFallbackLookup = !1
        }
        return m
    }

    function C() {
        var a, b = [];
        if ("undefined" != typeof window && (function() {
            for (var a = window.location.search.substring(1), c = a.split("&"), d = 0; d < c.length; d++) {
                var e = c[d].indexOf("=");
                if (e > 0) {
                    var f = c[d].substring(0, e),
                        g = c[d].substring(e + 1);
                    b[f] = g
                }
            }
        }(),
        b[M.detectLngQS] && (a = b[M.detectLngQS])), !a && "undefined" != typeof document && M.useCookie) {
            var c = Q.cookie.read(M.cookieName);
            c && (a = c)
        }
        return !a && "undefined" != typeof document && window.localstorage && M.detectLngFromLocalStorage && (a = window.localStorage.getItem("i18next_lng")),
        a || "undefined" == typeof navigator || (a = navigator.language ? navigator.language : navigator.userLanguage),
        a || (a = M.fallbackLng[0]),
        a
    }
    Array.prototype.indexOf || (Array.prototype.indexOf = function(a) {
        "use strict";
        if (null == this) throw new TypeError;
        var b = Object(this),
            c = b.length >>> 0;
        if (0 === c) return -1;
        var d = 0;
        if (arguments.length > 0 && (d = Number(arguments[1]),
        d != d ? d = 0 : 0 != d && 1 / 0 != d && d != -1 / 0 && (d = (d > 0 || -1) * Math.floor(Math.abs(d)))),
        d >= c) return -1;
        for (var e = d >= 0 ? d : Math.max(c - Math.abs(d), 0); c > e; e++)
        if (e in b && b[e] === a) return e;
        return -1
    }),
    Array.prototype.lastIndexOf || (Array.prototype.lastIndexOf = function(a) {
        "use strict";
        if (null == this) throw new TypeError;
        var b = Object(this),
            c = b.length >>> 0;
        if (0 === c) return -1;
        var d = c;
        arguments.length > 1 && (d = Number(arguments[1]),
        d != d ? d = 0 : 0 != d && d != 1 / 0 && d != -1 / 0 && (d = (d > 0 || -1) * Math.floor(Math.abs(d))));
        for (var e = d >= 0 ? Math.min(d, c - 1) : c - Math.abs(d); e >= 0; e--)
        if (e in b && b[e] === a) return e;
        return -1
    }),
        "function" != typeof String.prototype.trim && (String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, "")
    });
    var D, E = this,
        F = E.jQuery || E.Zepto,
        G = {}, H = {}, I = 0,
        J = [],
        K = !1,
        L = {};
    if ("undefined" != typeof module && module.exports) {
        if (!F) try {
            F = require("jquery")
        } catch (a) {}
        F && (F.i18n = F.i18n || G),
        module.exports = G
    } else F && (F.i18n = F.i18n || G),
    E.i18n = E.i18n || G;
    L = {
        load: function(a, b, c) {
            b.useLocalStorage ? L._loadLocal(a, b, function(d, e) {
                for (var f = [], g = 0, h = a.length; h > g; g++)
                e[a[g]] || f.push(a[g]);
                f.length > 0 ? L._fetch(f, b, function(a, b) {
                    Q.extend(e, b),
                    L._storeLocal(b),
                    c(null, e)
                }) : c(null, e)
            }) : L._fetch(a, b, function(a, b) {
                c(null, b)
            })
        },
        _loadLocal: function(a, b, c) {
            var d = {}, e = (new Date).getTime();
            if (window.localStorage) {
                var f = a.length;
                Q.each(a, function(a, g) {
                    var h = window.localStorage.getItem("res_" + g);
                    h && (h = JSON.parse(h),
                    h.i18nStamp && h.i18nStamp + b.localStorageExpirationTime > e && (d[g] = h)),
                    0 === --f && c(null, d)
                })
            }
        },
        _storeLocal: function(a) {
            if (window.localStorage) for (var b in a)
            a[b].i18nStamp = (new Date).getTime(),
            window.localStorage.setItem("res_" + b, JSON.stringify(a[b]))
        },
        _fetch: function(a, b, c) {
            var d = b.ns,
                e = {};
            if (b.dynamicLoad) {
                var f = function(a, b) {
                    c(null, b)
                };
                if ("function" == typeof b.customLoad) b.customLoad(a, d.namespaces, b, f);
                else {
                    var g = r(b.resGetPath, {
                        lng: a.join("+"),
                        ns: d.namespaces.join("+")
                    });
                    Q.ajax({
                        url: g,
                        success: function(a) {
                            Q.log("loaded: " + g),
                            f(null, a)
                        },
                        error: function(a, b, c) {
                            Q.log("failed loading: " + g),
                            f("failed loading resource.json error: " + c)
                        },
                        dataType: "json",
                        async: b.getAsync
                    })
                }
            } else {
                var h, i = d.namespaces.length * a.length;
                Q.each(d.namespaces, function(d, f) {
                    Q.each(a, function(a, d) {
                        var g = function(a, b) {
                            a && (h = h || [],
                            h.push(a)),
                            e[d] = e[d] || {},
                            e[d][f] = b,
                            0 === --i && c(h, e)
                        };
                        "function" == typeof b.customLoad ? b.customLoad(d, f, b, g) : L._fetchOne(d, f, b, g)
                    })
                })
            }
        },
        _fetchOne: function(a, b, c, d) {
            var e = r(c.resGetPath, {
                lng: a,
                ns: b
            });
            Q.ajax({
                url: e,
                success: function(a) {
                    Q.log("loaded: " + e),
                    d(null, a)
                },
                error: function(a, b, c) {
                    if (b && 200 == b || a && a.status && 200 == a.status) Q.error("There is a typo in: " + e);
                    else if (b && 404 == b || a && a.status && 404 == a.status) Q.log("Does not exist: " + e);
                    else {
                        var f = b || (a && a.status ? a.status : null);
                        Q.log(f + " when loading " + e)
                    }
                    d(c, {})
                },
                dataType: "json",
                async: c.getAsync
            })
        },
        postMissing: function(a, b, c, d, e) {
            var f = {};
            f[c] = d;
            var g = [];
            if ("fallback" === M.sendMissingTo && !1 !== M.fallbackLng[0]) for (var h = 0; h < M.fallbackLng.length; h++)
            g.push({
                lng: M.fallbackLng[h],
                url: r(M.resPostPath, {
                    lng: M.fallbackLng[h],
                    ns: b
                })
            });
            else if ("current" === M.sendMissingTo || "fallback" === M.sendMissingTo && !1 === M.fallbackLng[0]) g.push({
                lng: a,
                url: r(M.resPostPath, {
                    lng: a,
                    ns: b
                })
            });
            else if ("all" === M.sendMissingTo) for (var h = 0, i = e.length; i > h; h++)
            g.push({
                lng: e[h],
                url: r(M.resPostPath, {
                    lng: e[h],
                    ns: b
                })
            });
            for (var j = 0, k = g.length; k > j; j++) {
                var l = g[j];
                Q.ajax({
                    url: l.url,
                    type: M.sendType,
                    data: f,
                    success: function() {
                        Q.log("posted missing key '" + c + "' to: " + l.url);
                        for (var a = c.split("."), e = 0, f = H[l.lng][b]; a[e];)
                        f = f[a[e]] = e === a.length - 1 ? d : f[a[e]] || {},
                        e++
                    },
                    error: function() {
                        Q.log("failed posting missing key '" + c + "' to: " + l.url)
                    },
                    dataType: "json",
                    async: M.postAsync
                })
            }
        }
    };
    var M = {
        lng: void 0,
        load: "all",
        preload: [],
        lowerCaseLng: !1,
        returnObjectTrees: !1,
        fallbackLng: [],
        fallbackNS: [],
        detectLngQS: "setLng",
        detectLngFromLocalStorage: !1,
        ns: "translation",
        fallbackOnNull: !0,
        fallbackOnEmpty: !1,
        fallbackToDefaultNS: !1,
        nsseparator: ":",
        keyseparator: ".",
        selectorAttr: "data-i18n",
        debug: !1,
        resGetPath: "locales/__lng__/__ns__.json",
        resPostPath: "locales/add/__lng__/__ns__",
        getAsync: !0,
        postAsync: !0,
        resStore: void 0,
        useLocalStorage: !1,
        localStorageExpirationTime: 6048e5,
        dynamicLoad: !1,
        sendMissing: !1,
        sendMissingTo: "fallback",
        sendType: "POST",
        interpolationPrefix: "__",
        interpolationSuffix: "__",
        reusePrefix: "$t(",
        reuseSuffix: ")",
        pluralSuffix: "_plural",
        pluralNotFound: ["plural_not_found", Math.random()].join(""),
        contextNotFound: ["context_not_found", Math.random()].join(""),
        escapeInterpolation: !1,
        indefiniteSuffix: "_indefinite",
        indefiniteNotFound: ["indefinite_not_found", Math.random()].join(""),
        setJqueryExt: !0,
        defaultValueFromContent: !0,
        useDataAttrOptions: !1,
        cookieExpirationTime: void 0,
        useCookie: !0,
        cookieName: "i18next",
        cookieDomain: void 0,
        objectTreeKeyHandler: void 0,
        postProcess: void 0,
        parseMissingKey: void 0,
        missingKeyHandler: L.postMissing,
        shortcutFunction: "sprintf"
    }, N = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;"
    }, O = {
        create: function(a, b, c, d) {
            var e;
            if (c) {
                var f = new Date;
                f.setTime(f.getTime() + 6e4 * c),
                e = "; expires=" + f.toGMTString()
            } else e = "";
            d = d ? "domain=" + d + ";" : "",
            document.cookie = a + "=" + b + e + ";" + d + "path=/"
        },
        read: function(a) {
            for (var b = a + "=", c = document.cookie.split(";"), d = 0; d < c.length; d++) {
                for (var e = c[d];
                " " == e.charAt(0);)
                e = e.substring(1, e.length);
                if (0 === e.indexOf(b)) return e.substring(b.length, e.length)
            }
            return null
        },
        remove: function(a) {
            this.create(a, "", -1)
        }
    }, P = {
        create: function() {},
        read: function() {
            return null
        },
        remove: function() {}
    }, Q = {
        extend: F ? F.extend : a,
        deepExtend: b,
        each: F ? F.each : c,
        ajax: F ? F.ajax : "undefined" != typeof document ? e : function() {},
        cookie: "undefined" != typeof document ? O : P,
        detectLanguage: C,
        escape: d,
        log: function(a) {
            M.debug && "undefined" != typeof console && console.log(a)
        },
        error: function(a) {
            "undefined" != typeof console && console.error(a)
        },
        getCountyIndexOfLng: function(a) {
            var b = 0;
            return ("nb-NO" === a || "nn-NO" === a) && (b = 1),
            b
        },
        toLanguages: function(a) {
            var b = this.log,
                c = [],
                d = M.lngWhitelist || !1,
                e = function(a) {
                    !d || d.indexOf(a) > -1 ? c.push(a) : b("rejecting non-whitelisted language: " + a)
                };
            if ("string" == typeof a && a.indexOf("-") > -1) {
                var f = a.split("-");
                a = M.lowerCaseLng ? f[0].toLowerCase() + "-" + f[1].toLowerCase() : f[0].toLowerCase() + "-" + f[1].toUpperCase(),
                    "unspecific" !== M.load && e(a),
                    "current" !== M.load && e(f[this.getCountyIndexOfLng(a)])
            } else e(a);
            for (var g = 0; g < M.fallbackLng.length; g++) - 1 === c.indexOf(M.fallbackLng[g]) && M.fallbackLng[g] && c.push(M.fallbackLng[g]);
            return c
        },
        regexEscape: function(a) {
            return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
        },
        regexReplacementEscape: function(a) {
            return "string" == typeof a ? a.replace(/\$/g, "$$$$") : a
        }
    };
    Q.applyReplacement = r;
    var R = {
        rules: {
            ach: {
                name: "Acholi",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(a > 1)
                }
            },
            af: {
                name: "Afrikaans",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            ak: {
                name: "Akan",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(a > 1)
                }
            },
            am: {
                name: "Amharic",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(a > 1)
                }
            },
            an: {
                name: "Aragonese",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            ar: {
                name: "Arabic",
                numbers: [0, 1, 2, 3, 11, 100],
                plurals: function(a) {
                    return Number(0 === a ? 0 : 1 == a ? 1 : 2 == a ? 2 : a % 100 >= 3 && 10 >= a % 100 ? 3 : a % 100 >= 11 ? 4 : 5)
                }
            },
            arn: {
                name: "Mapudungun",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(a > 1)
                }
            },
            ast: {
                name: "Asturian",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            ay: {
                name: "Aymará",
                numbers: [1],
                plurals: function() {
                    return 0
                }
            },
            az: {
                name: "Azerbaijani",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            be: {
                name: "Belarusian",
                numbers: [1, 2, 5],
                plurals: function(a) {
                    return Number(1 == a % 10 && 11 != a % 100 ? 0 : a % 10 >= 2 && 4 >= a % 10 && (10 > a % 100 || a % 100 >= 20) ? 1 : 2)
                }
            },
            bg: {
                name: "Bulgarian",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            bn: {
                name: "Bengali",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            bo: {
                name: "Tibetan",
                numbers: [1],
                plurals: function() {
                    return 0
                }
            },
            br: {
                name: "Breton",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(a > 1)
                }
            },
            bs: {
                name: "Bosnian",
                numbers: [1, 2, 5],
                plurals: function(a) {
                    return Number(1 == a % 10 && 11 != a % 100 ? 0 : a % 10 >= 2 && 4 >= a % 10 && (10 > a % 100 || a % 100 >= 20) ? 1 : 2)
                }
            },
            ca: {
                name: "Catalan",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            cgg: {
                name: "Chiga",
                numbers: [1],
                plurals: function() {
                    return 0
                }
            },
            cs: {
                name: "Czech",
                numbers: [1, 2, 5],
                plurals: function(a) {
                    return Number(1 == a ? 0 : a >= 2 && 4 >= a ? 1 : 2)
                }
            },
            csb: {
                name: "Kashubian",
                numbers: [1, 2, 5],
                plurals: function(a) {
                    return Number(1 == a ? 0 : a % 10 >= 2 && 4 >= a % 10 && (10 > a % 100 || a % 100 >= 20) ? 1 : 2)
                }
            },
            cy: {
                name: "Welsh",
                numbers: [1, 2, 3, 8],
                plurals: function(a) {
                    return Number(1 == a ? 0 : 2 == a ? 1 : 8 != a && 11 != a ? 2 : 3)
                }
            },
            da: {
                name: "Danish",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            de: {
                name: "German",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            dz: {
                name: "Dzongkha",
                numbers: [1],
                plurals: function() {
                    return 0
                }
            },
            el: {
                name: "Greek",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            en: {
                name: "English",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            eo: {
                name: "Esperanto",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            es: {
                name: "Spanish",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            es_ar: {
                name: "Argentinean Spanish",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            et: {
                name: "Estonian",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            eu: {
                name: "Basque",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            fa: {
                name: "Persian",
                numbers: [1],
                plurals: function() {
                    return 0
                }
            },
            fi: {
                name: "Finnish",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            fil: {
                name: "Filipino",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(a > 1)
                }
            },
            fo: {
                name: "Faroese",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            fr: {
                name: "French",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(a >= 2)
                }
            },
            fur: {
                name: "Friulian",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            fy: {
                name: "Frisian",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            ga: {
                name: "Irish",
                numbers: [1, 2, 3, 7, 11],
                plurals: function(a) {
                    return Number(1 == a ? 0 : 2 == a ? 1 : 7 > a ? 2 : 11 > a ? 3 : 4)
                }
            },
            gd: {
                name: "Scottish Gaelic",
                numbers: [1, 2, 3, 20],
                plurals: function(a) {
                    return Number(1 == a || 11 == a ? 0 : 2 == a || 12 == a ? 1 : a > 2 && 20 > a ? 2 : 3)
                }
            },
            gl: {
                name: "Galician",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            gu: {
                name: "Gujarati",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            gun: {
                name: "Gun",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(a > 1)
                }
            },
            ha: {
                name: "Hausa",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            he: {
                name: "Hebrew",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            hi: {
                name: "Hindi",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            hr: {
                name: "Croatian",
                numbers: [1, 2, 5],
                plurals: function(a) {
                    return Number(1 == a % 10 && 11 != a % 100 ? 0 : a % 10 >= 2 && 4 >= a % 10 && (10 > a % 100 || a % 100 >= 20) ? 1 : 2)
                }
            },
            hu: {
                name: "Hungarian",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            hy: {
                name: "Armenian",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            ia: {
                name: "Interlingua",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            id: {
                name: "Indonesian",
                numbers: [1],
                plurals: function() {
                    return 0
                }
            },
            is: {
                name: "Icelandic",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a % 10 || 11 == a % 100)
                }
            },
            it: {
                name: "Italian",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            ja: {
                name: "Japanese",
                numbers: [1],
                plurals: function() {
                    return 0
                }
            },
            jbo: {
                name: "Lojban",
                numbers: [1],
                plurals: function() {
                    return 0
                }
            },
            jv: {
                name: "Javanese",
                numbers: [0, 1],
                plurals: function(a) {
                    return Number(0 !== a)
                }
            },
            ka: {
                name: "Georgian",
                numbers: [1],
                plurals: function() {
                    return 0
                }
            },
            kk: {
                name: "Kazakh",
                numbers: [1],
                plurals: function() {
                    return 0
                }
            },
            km: {
                name: "Khmer",
                numbers: [1],
                plurals: function() {
                    return 0
                }
            },
            kn: {
                name: "Kannada",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            ko: {
                name: "Korean",
                numbers: [1],
                plurals: function() {
                    return 0
                }
            },
            ku: {
                name: "Kurdish",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            kw: {
                name: "Cornish",
                numbers: [1, 2, 3, 4],
                plurals: function(a) {
                    return Number(1 == a ? 0 : 2 == a ? 1 : 3 == a ? 2 : 3)
                }
            },
            ky: {
                name: "Kyrgyz",
                numbers: [1],
                plurals: function() {
                    return 0
                }
            },
            lb: {
                name: "Letzeburgesch",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            ln: {
                name: "Lingala",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(a > 1)
                }
            },
            lo: {
                name: "Lao",
                numbers: [1],
                plurals: function() {
                    return 0
                }
            },
            lt: {
                name: "Lithuanian",
                numbers: [1, 2, 10],
                plurals: function(a) {
                    return Number(1 == a % 10 && 11 != a % 100 ? 0 : a % 10 >= 2 && (10 > a % 100 || a % 100 >= 20) ? 1 : 2)
                }
            },
            lv: {
                name: "Latvian",
                numbers: [1, 2, 0],
                plurals: function(a) {
                    return Number(1 == a % 10 && 11 != a % 100 ? 0 : 0 !== a ? 1 : 2)
                }
            },
            mai: {
                name: "Maithili",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            mfe: {
                name: "Mauritian Creole",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(a > 1)
                }
            },
            mg: {
                name: "Malagasy",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(a > 1)
                }
            },
            mi: {
                name: "Maori",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(a > 1)
                }
            },
            mk: {
                name: "Macedonian",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 == a || 1 == a % 10 ? 0 : 1)
                }
            },
            ml: {
                name: "Malayalam",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            mn: {
                name: "Mongolian",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            mnk: {
                name: "Mandinka",
                numbers: [0, 1, 2],
                plurals: function(a) {
                    return Number(1 == a ? 1 : 2)
                }
            },
            mr: {
                name: "Marathi",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            ms: {
                name: "Malay",
                numbers: [1],
                plurals: function() {
                    return 0
                }
            },
            mt: {
                name: "Maltese",
                numbers: [1, 2, 11, 20],
                plurals: function(a) {
                    return Number(1 == a ? 0 : 0 === a || a % 100 > 1 && 11 > a % 100 ? 1 : a % 100 > 10 && 20 > a % 100 ? 2 : 3)
                }
            },
            nah: {
                name: "Nahuatl",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            nap: {
                name: "Neapolitan",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            nb: {
                name: "Norwegian Bokmal",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            ne: {
                name: "Nepali",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            nl: {
                name: "Dutch",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            nn: {
                name: "Norwegian Nynorsk",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            no: {
                name: "Norwegian",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            nso: {
                name: "Northern Sotho",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            oc: {
                name: "Occitan",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(a > 1)
                }
            },
            or: {
                name: "Oriya",
                numbers: [2, 1],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            pa: {
                name: "Punjabi",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            pap: {
                name: "Papiamento",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            pl: {
                name: "Polish",
                numbers: [1, 2, 5],
                plurals: function(a) {
                    return Number(1 == a ? 0 : a % 10 >= 2 && 4 >= a % 10 && (10 > a % 100 || a % 100 >= 20) ? 1 : 2)
                }
            },
            pms: {
                name: "Piemontese",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            ps: {
                name: "Pashto",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            pt: {
                name: "Portuguese",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            pt_br: {
                name: "Brazilian Portuguese",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            rm: {
                name: "Romansh",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            ro: {
                name: "Romanian",
                numbers: [1, 2, 20],
                plurals: function(a) {
                    return Number(1 == a ? 0 : 0 === a || a % 100 > 0 && 20 > a % 100 ? 1 : 2)
                }
            },
            ru: {
                name: "Russian",
                numbers: [1, 2, 5],
                plurals: function(a) {
                    return Number(1 == a % 10 && 11 != a % 100 ? 0 : a % 10 >= 2 && 4 >= a % 10 && (10 > a % 100 || a % 100 >= 20) ? 1 : 2)
                }
            },
            sah: {
                name: "Yakut",
                numbers: [1],
                plurals: function() {
                    return 0
                }
            },
            sco: {
                name: "Scots",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            se: {
                name: "Northern Sami",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            si: {
                name: "Sinhala",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            sk: {
                name: "Slovak",
                numbers: [1, 2, 5],
                plurals: function(a) {
                    return Number(1 == a ? 0 : a >= 2 && 4 >= a ? 1 : 2)
                }
            },
            sl: {
                name: "Slovenian",
                numbers: [5, 1, 2, 3],
                plurals: function(a) {
                    return Number(1 == a % 100 ? 1 : 2 == a % 100 ? 2 : 3 == a % 100 || 4 == a % 100 ? 3 : 0)
                }
            },
            so: {
                name: "Somali",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            son: {
                name: "Songhay",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            sq: {
                name: "Albanian",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            sr: {
                name: "Serbian",
                numbers: [1, 2, 5],
                plurals: function(a) {
                    return Number(1 == a % 10 && 11 != a % 100 ? 0 : a % 10 >= 2 && 4 >= a % 10 && (10 > a % 100 || a % 100 >= 20) ? 1 : 2)
                }
            },
            su: {
                name: "Sundanese",
                numbers: [1],
                plurals: function() {
                    return 0
                }
            },
            sv: {
                name: "Swedish",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            sw: {
                name: "Swahili",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            ta: {
                name: "Tamil",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            te: {
                name: "Telugu",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            tg: {
                name: "Tajik",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(a > 1)
                }
            },
            th: {
                name: "Thai",
                numbers: [1],
                plurals: function() {
                    return 0
                }
            },
            ti: {
                name: "Tigrinya",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(a > 1)
                }
            },
            tk: {
                name: "Turkmen",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            tr: {
                name: "Turkish",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(a > 1)
                }
            },
            tt: {
                name: "Tatar",
                numbers: [1],
                plurals: function() {
                    return 0
                }
            },
            ug: {
                name: "Uyghur",
                numbers: [1],
                plurals: function() {
                    return 0
                }
            },
            uk: {
                name: "Ukrainian",
                numbers: [1, 2, 5],
                plurals: function(a) {
                    return Number(1 == a % 10 && 11 != a % 100 ? 0 : a % 10 >= 2 && 4 >= a % 10 && (10 > a % 100 || a % 100 >= 20) ? 1 : 2)
                }
            },
            ur: {
                name: "Urdu",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            uz: {
                name: "Uzbek",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(a > 1)
                }
            },
            vi: {
                name: "Vietnamese",
                numbers: [1],
                plurals: function() {
                    return 0
                }
            },
            wa: {
                name: "Walloon",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(a > 1)
                }
            },
            wo: {
                name: "Wolof",
                numbers: [1],
                plurals: function() {
                    return 0
                }
            },
            yo: {
                name: "Yoruba",
                numbers: [1, 2],
                plurals: function(a) {
                    return Number(1 != a)
                }
            },
            zh: {
                name: "Chinese",
                numbers: [1],
                plurals: function() {
                    return 0
                }
            }
        },
        addRule: function(a, b) {
            R.rules[a] = b
        },
        setCurrentLng: function(a) {
            if (!R.currentRule || R.currentRule.lng !== a) {
                var b = a.split("-");
                R.currentRule = {
                    lng: a,
                    rule: R.rules[b[0]]
                }
            }
        },
        needsPlural: function(a, b) {
            var c, d = a.split("-");
            return !((c = R.currentRule && R.currentRule.lng === a ? R.currentRule.rule : R.rules[d[Q.getCountyIndexOfLng(a)]]) && c.numbers.length <= 1) && 1 !== this.get(a, b)
        },
        get: function(a, b) {
            function c(b, c) {
                var d;
                if (d = R.currentRule && R.currentRule.lng === a ? R.currentRule.rule : R.rules[b]) {
                    var e;
                    e = d.noAbs ? d.plurals(c) : d.plurals(Math.abs(c));
                    var f = d.numbers[e];
                    return 2 === d.numbers.length && 1 === d.numbers[0] && (2 === f ? f = -1 : 1 === f && (f = 1)),
                    f
                }
                return 1 === c ? "1" : "-1"
            }
            return c(a.split("-")[Q.getCountyIndexOfLng(a)], b)
        }
    }, S = {}, T = function(a, b) {
        S[a] = b
    }, U = function() {
        function a(a) {
            return Object.prototype.toString.call(a).slice(8, -1).toLowerCase()
        }

        function b(a, b) {
            for (var c = []; b > 0; c[--b] = a);
            return c.join("")
        }
        var c = function() {
            return c.cache.hasOwnProperty(arguments[0]) || (c.cache[arguments[0]] = c.parse(arguments[0])),
            c.format.call(null, c.cache[arguments[0]], arguments)
        };
        return c.format = function(c, d) {
            var e, f, g, h, i, j, k, l = 1,
                m = c.length,
                n = "",
                o = [];
            for (f = 0; m > f; f++)
            if ("string" === (n = a(c[f]))) o.push(c[f]);
            else if ("array" === n) {
                if (h = c[f],
                h[2]) for (e = d[l],
                g = 0; g < h[2].length; g++) {
                    if (!e.hasOwnProperty(h[2][g])) throw U('[sprintf] property "%s" does not exist', h[2][g]);
                    e = e[h[2][g]]
                } else e = h[1] ? d[h[1]] : d[l++];
                if (/[^s]/.test(h[8]) && "number" != a(e)) throw U("[sprintf] expecting number but found %s", a(e));
                switch (h[8]) {
                    case "b":
                        e = e.toString(2);
                        break;
                    case "c":
                        e = String.fromCharCode(e);
                        break;
                    case "d":
                        e = parseInt(e, 10);
                        break;
                    case "e":
                        e = h[7] ? e.toExponential(h[7]) : e.toExponential();
                        break;
                    case "f":
                        e = h[7] ? parseFloat(e).toFixed(h[7]) : parseFloat(e);
                        break;
                    case "o":
                        e = e.toString(8);
                        break;
                    case "s":
                        e = (e = String(e)) && h[7] ? e.substring(0, h[7]) : e;
                        break;
                    case "u":
                        e = Math.abs(e);
                        break;
                    case "x":
                        e = e.toString(16);
                        break;
                    case "X":
                        e = e.toString(16).toUpperCase()
                }
                e = /[def]/.test(h[8]) && h[3] && e >= 0 ? "+" + e : e,
                j = h[4] ? "0" == h[4] ? "0" : h[4].charAt(1) : " ",
                k = h[6] - String(e).length,
                i = h[6] ? b(j, k) : "",
                o.push(h[5] ? e + i : i + e)
            }
            return o.join("")
        },
        c.cache = {},
        c.parse = function(a) {
            for (var b = a, c = [], d = [], e = 0; b;) {
                if (null !== (c = /^[^\x25]+/.exec(b))) d.push(c[0]);
                else if (null !== (c = /^\x25{2}/.exec(b))) d.push("%");
                else {
                    if (null === (c = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(b))) throw "[sprintf] huh?";
                    if (c[2]) {
                        e |= 1;
                        var f = [],
                            g = c[2],
                            h = [];
                        if (null === (h = /^([a-z_][a-z_\d]*)/i.exec(g))) throw "[sprintf] huh?";
                        for (f.push(h[1]);
                        "" !== (g = g.substring(h[0].length));)
                        if (null !== (h = /^\.([a-z_][a-z_\d]*)/i.exec(g))) f.push(h[1]);
                        else {
                            if (null === (h = /^\[(\d+)\]/.exec(g))) throw "[sprintf] huh?";
                            f.push(h[1])
                        }
                        c[2] = f
                    } else e |= 2;
                    if (3 === e) throw "[sprintf] mixing positional and named placeholders is not (yet) supported";
                    d.push(c)
                }
                b = b.substring(c[0].length)
            }
            return d
        },
        c
    }(),
        V = function(a, b) {
            return b.unshift(a),
            U.apply(null, b)
        };
    T("sprintf", function(a, b, c) {
        return c.sprintf ? "[object Array]" === Object.prototype.toString.apply(c.sprintf) ? V(a, c.sprintf) : "object" == typeof c.sprintf ? U(a, c.sprintf) : a : a
    }),
    G.init = f,
    G.setLng = o,
    G.preload = g,
    G.addResourceBundle = h,
    G.addResource = j,
    G.addResources = k,
    G.removeResourceBundle = i,
    G.loadNamespace = m,
    G.loadNamespaces = n,
    G.setDefaultNamespace = l,
    G.t = x,
    G.translate = x,
    G.exists = w,
    G.detectLanguage = Q.detectLanguage,
    G.pluralExtensions = R,
    G.sync = L,
    G.functions = Q,
    G.lng = p,
    G.addPostProcessor = T,
    G.options = M
}();
var b64map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    b64padchar = "=",
    keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    dbits, canary = 0xdeadbeefcafe,
    j_lm = 15715070 == (16777215 & canary);
j_lm && "Microsoft Internet Explorer" == navigator.appName ? (BigInteger.prototype.am = am2,
dbits = 30) : j_lm && "Netscape" != navigator.appName ? (BigInteger.prototype.am = am1,
dbits = 26) : (BigInteger.prototype.am = am3,
dbits = 28),
BigInteger.prototype.DB = dbits,
BigInteger.prototype.DM = (1 << dbits) - 1,
BigInteger.prototype.DV = 1 << dbits;
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP),
BigInteger.prototype.F1 = BI_FP - dbits,
BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz",
    BI_RC = new Array,
    rr, vv;
for (rr = "0".charCodeAt(0),
vv = 0; vv <= 9; ++vv)
BI_RC[rr++] = vv;
for (rr = "a".charCodeAt(0),
vv = 10; vv < 36; ++vv)
BI_RC[rr++] = vv;
for (rr = "A".charCodeAt(0),
vv = 10; vv < 36; ++vv)
BI_RC[rr++] = vv;
Classic.prototype.convert = cConvert,
Classic.prototype.revert = cRevert,
Classic.prototype.reduce = cReduce,
Classic.prototype.mulTo = cMulTo,
Classic.prototype.sqrTo = cSqrTo,
Montgomery.prototype.convert = montConvert,
Montgomery.prototype.revert = montRevert,
Montgomery.prototype.reduce = montReduce,
Montgomery.prototype.mulTo = montMulTo,
Montgomery.prototype.sqrTo = montSqrTo,
BigInteger.prototype.copyTo = bnpCopyTo,
BigInteger.prototype.fromInt = bnpFromInt,
BigInteger.prototype.fromString = bnpFromString,
BigInteger.prototype.clamp = bnpClamp,
BigInteger.prototype.dlShiftTo = bnpDLShiftTo,
BigInteger.prototype.drShiftTo = bnpDRShiftTo,
BigInteger.prototype.lShiftTo = bnpLShiftTo,
BigInteger.prototype.rShiftTo = bnpRShiftTo,
BigInteger.prototype.subTo = bnpSubTo,
BigInteger.prototype.multiplyTo = bnpMultiplyTo,
BigInteger.prototype.squareTo = bnpSquareTo,
BigInteger.prototype.divRemTo = bnpDivRemTo,
BigInteger.prototype.invDigit = bnpInvDigit,
BigInteger.prototype.isEven = bnpIsEven,
BigInteger.prototype.exp = bnpExp,
BigInteger.prototype.toString = bnToString,
BigInteger.prototype.negate = bnNegate,
BigInteger.prototype.abs = bnAbs,
BigInteger.prototype.compareTo = bnCompareTo,
BigInteger.prototype.bitLength = bnBitLength,
BigInteger.prototype.mod = bnMod,
BigInteger.prototype.modPowInt = bnModPowInt,
BigInteger.ZERO = nbv(0),
BigInteger.ONE = nbv(1),
Arcfour.prototype.init = ARC4init,
Arcfour.prototype.next = ARC4next;
var rng_psize = 256,
    rng_state, rng_pool, rng_pptr;
if (null == rng_pool) {
    rng_pool = new Array,
    rng_pptr = 0;
    var t;
    if (window.crypto && window.crypto.getRandomValues) {
        var ua = new Uint8Array(32);
        for (window.crypto.getRandomValues(ua),
        t = 0; t < 32; ++t)
        rng_pool[rng_pptr++] = ua[t]
    }
    if ("Netscape" == navigator.appName && navigator.appVersion < "5" && window.crypto) {
        var z = window.crypto.random(32);
        for (t = 0; t < z.length; ++t)
        rng_pool[rng_pptr++] = 255 & z.charCodeAt(t)
    }
    for (; rng_pptr < rng_psize;)
    t = Math.floor(65536 * Math.random()),
    rng_pool[rng_pptr++] = t >>> 8,
    rng_pool[rng_pptr++] = 255 & t;
    rng_pptr = 0,
    rng_seed_time()
}
SecureRandom.prototype.nextBytes = rng_get_bytes,
RSAKey.prototype.doPublic = RSADoPublic,
RSAKey.prototype.setPublic = RSASetPublic,
RSAKey.prototype.encrypt = RSAEncrypt;
var rsa = new RSAKey;
rsa.setPublic("8b6c944808b245a98794e77739f8de7135f59f7d3879d9bedca396f6428265434dc62549d1dd1aad87a94d9de80619979d3460f806501887307d15914184a9913e90e6a816b120027b9008bbec09a95fcd9cf38da535a7ece68d25a3884c4a0da3c02d22e4de8ad44f8a6b5d6c63b91c682925e1846ae043d0a848890f078a67", "10001");

function hqxb(password) {
    _pwd = hex2b64(rsa.encrypt(password))
    return _pwd
}

