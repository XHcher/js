var window = this;
var QRCode;
var dbits;
var canary = 0xdeadbeefcafe;
var j_lm = 15715070 == (16777215 & canary);
function BigInteger(e, t, i) {
    if (null != e)
        if ("number" == typeof e)
            this.fromNumber(e, t, i);
        else if (null == t && "string" != typeof e)
            this.fromString(e, 256);
        else
            this.fromString(e, t);
}
function nbi() {
    return new BigInteger(null)
}
function am1(e, t, i, n, s, r) {
    for (; --r >= 0; ) {
        var a = t * this[e++] + i[n] + s;
        s = Math.floor(a / 67108864);
        i[n++] = 67108863 & a
    }
    return s
}
function am2(e, t, i, n, s, r) {
    var a = 32767 & t
      , o = t >> 15;
    for (; --r >= 0; ) {
        var c = 32767 & this[e];
        var d = this[e++] >> 15;
        var _ = o * c + d * a;
        c = a * c + ((32767 & _) << 15) + i[n] + (1073741823 & s);
        s = (c >>> 30) + (_ >>> 15) + o * d + (s >>> 30);
        i[n++] = 1073741823 & c
    }
    return s
}
function am3(e, t, i, n, s, r) {
    var a = 16383 & t
      , o = t >> 14;
    for (; --r >= 0; ) {
        var c = 16383 & this[e];
        var d = this[e++] >> 14;
        var _ = o * c + d * a;
        c = a * c + ((16383 & _) << 14) + i[n] + s;
        s = (c >> 28) + (_ >> 14) + o * d;
        i[n++] = 268435455 & c
    }
    return s
}
BigInteger.prototype.am = am3;
dbits = 28
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = (1 << dbits) - 1;
BigInteger.prototype.DV = 1 << dbits;
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC = new Array;
var rr, vv;
rr = "0".charCodeAt(0);
for (vv = 0; vv <= 9; ++vv)
    BI_RC[rr++] = vv;
rr = "a".charCodeAt(0);
for (vv = 10; vv < 36; ++vv)
    BI_RC[rr++] = vv;
rr = "A".charCodeAt(0);
for (vv = 10; vv < 36; ++vv)
    BI_RC[rr++] = vv;
function int2char(e) {
    return BI_RM.charAt(e)
}
function intAt(e, t) {
    var i = BI_RC[e.charCodeAt(t)];
    return null == i ? -1 : i
}
function bnpCopyTo(e) {
    for (var t = this.t - 1; t >= 0; --t)
        e[t] = this[t];
    e.t = this.t;
    e.s = this.s
}
function bnpFromInt(e) {
    this.t = 1;
    this.s = e < 0 ? -1 : 0;
    if (e > 0)
        this[0] = e;
    else if (e < -1)
        this[0] = e + DV;
    else
        this.t = 0
}
function nbv(e) {
    var t = nbi();
    t.fromInt(e);
    return t
}
function bnpFromString(e, t) {
    var i;
    if (16 == t)
        i = 4;
    else if (8 == t)
        i = 3;
    else if (256 == t)
        i = 8;
    else if (2 == t)
        i = 1;
    else if (32 == t)
        i = 5;
    else if (4 == t)
        i = 2;
    else {
        this.fromRadix(e, t);
        return
    }
    this.t = 0;
    this.s = 0;
    var n = e.length
      , s = !1
      , r = 0;
    for (; --n >= 0; ) {
        var a = 8 == i ? 255 & e[n] : intAt(e, n);
        if (!(a < 0)) {
            s = !1;
            if (0 == r)
                this[this.t++] = a;
            else if (r + i > this.DB) {
                this[this.t - 1] |= (a & (1 << this.DB - r) - 1) << r;
                this[this.t++] = a >> this.DB - r
            } else
                this[this.t - 1] |= a << r;
            r += i;
            if (r >= this.DB)
                r -= this.DB
        } else if ("-" == e.charAt(n))
            s = !0
    }
    if (8 == i && 0 != (128 & e[0])) {
        this.s = -1;
        if (r > 0)
            this[this.t - 1] |= (1 << this.DB - r) - 1 << r
    }
    this.clamp();
    if (s)
        BigInteger.ZERO.subTo(this, this)
}
function bnpClamp() {
    var e = this.s & this.DM;
    for (; this.t > 0 && this[this.t - 1] == e; )
        --this.t
}
function bnToString(e) {
    if (this.s < 0)
        return "-" + this.negate().toString(e);
    var t;
    if (16 == e)
        t = 4;
    else if (8 == e)
        t = 3;
    else if (2 == e)
        t = 1;
    else if (32 == e)
        t = 5;
    else if (4 == e)
        t = 2;
    else
        return this.toRadix(e);
    var i = (1 << t) - 1, n, s = !1, r = "", a = this.t;
    var o = this.DB - a * this.DB % t;
    if (a-- > 0) {
        if (o < this.DB && (n = this[a] >> o) > 0) {
            s = !0;
            r = int2char(n)
        }
        for (; a >= 0; ) {
            if (o < t) {
                n = (this[a] & (1 << o) - 1) << t - o;
                n |= this[--a] >> (o += this.DB - t)
            } else {
                n = this[a] >> (o -= t) & i;
                if (o <= 0) {
                    o += this.DB;
                    --a
                }
            }
            if (n > 0)
                s = !0;
            if (s)
                r += int2char(n)
        }
    }
    return s ? r : "0"
}
function bnNegate() {
    var e = nbi();
    BigInteger.ZERO.subTo(this, e);
    return e
}
function bnAbs() {
    return this.s < 0 ? this.negate() : this
}
function bnCompareTo(e) {
    var t = this.s - e.s;
    if (0 != t)
        return t;
    var i = this.t;
    t = i - e.t;
    if (0 != t)
        return this.s < 0 ? -t : t;
    for (; --i >= 0; )
        if (0 != (t = this[i] - e[i]))
            return t;
    return 0
}
function nbits(e) {
    var t = 1, i;
    if (0 != (i = e >>> 16)) {
        e = i;
        t += 16
    }
    if (0 != (i = e >> 8)) {
        e = i;
        t += 8
    }
    if (0 != (i = e >> 4)) {
        e = i;
        t += 4
    }
    if (0 != (i = e >> 2)) {
        e = i;
        t += 2
    }
    if (0 != (i = e >> 1)) {
        e = i;
        t += 1
    }
    return t
}
function bnBitLength() {
    if (this.t <= 0)
        return 0;
    else
        return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM)
}
function bnpDLShiftTo(e, t) {
    var i;
    for (i = this.t - 1; i >= 0; --i)
        t[i + e] = this[i];
    for (i = e - 1; i >= 0; --i)
        t[i] = 0;
    t.t = this.t + e;
    t.s = this.s
}
function bnpDRShiftTo(e, t) {
    for (var i = e; i < this.t; ++i)
        t[i - e] = this[i];
    t.t = Math.max(this.t - e, 0);
    t.s = this.s
}
function bnpLShiftTo(e, t) {
    var i = e % this.DB;
    var n = this.DB - i;
    var s = (1 << n) - 1;
    var r = Math.floor(e / this.DB), a = this.s << i & this.DM, o;
    for (o = this.t - 1; o >= 0; --o) {
        t[o + r + 1] = this[o] >> n | a;
        a = (this[o] & s) << i
    }
    for (o = r - 1; o >= 0; --o)
        t[o] = 0;
    t[r] = a;
    t.t = this.t + r + 1;
    t.s = this.s;
    t.clamp()
}
function bnpRShiftTo(e, t) {
    t.s = this.s;
    var i = Math.floor(e / this.DB);
    if (!(i >= this.t)) {
        var n = e % this.DB;
        var s = this.DB - n;
        var r = (1 << n) - 1;
        t[0] = this[i] >> n;
        for (var a = i + 1; a < this.t; ++a) {
            t[a - i - 1] |= (this[a] & r) << s;
            t[a - i] = this[a] >> n
        }
        if (n > 0)
            t[this.t - i - 1] |= (this.s & r) << s;
        t.t = this.t - i;
        t.clamp()
    } else
        t.t = 0
}
function bnpSubTo(e, t) {
    var i = 0
      , n = 0
      , s = Math.min(e.t, this.t);
    for (; i < s; ) {
        n += this[i] - e[i];
        t[i++] = n & this.DM;
        n >>= this.DB
    }
    if (e.t < this.t) {
        n -= e.s;
        for (; i < this.t; ) {
            n += this[i];
            t[i++] = n & this.DM;
            n >>= this.DB
        }
        n += this.s
    } else {
        n += this.s;
        for (; i < e.t; ) {
            n -= e[i];
            t[i++] = n & this.DM;
            n >>= this.DB
        }
        n -= e.s
    }
    t.s = n < 0 ? -1 : 0;
    if (n < -1)
        t[i++] = this.DV + n;
    else if (n > 0)
        t[i++] = n;
    t.t = i;
    t.clamp()
}
function bnpMultiplyTo(e, t) {
    var i = this.abs()
      , n = e.abs();
    var s = i.t;
    t.t = s + n.t;
    for (; --s >= 0; )
        t[s] = 0;
    for (s = 0; s < n.t; ++s)
        t[s + i.t] = i.am(0, n[s], t, s, 0, i.t);
    t.s = 0;
    t.clamp();
    if (this.s != e.s)
        BigInteger.ZERO.subTo(t, t)
}
function bnpSquareTo(e) {
    var t = this.abs();
    var i = e.t = 2 * t.t;
    for (; --i >= 0; )
        e[i] = 0;
    for (i = 0; i < t.t - 1; ++i) {
        var n = t.am(i, t[i], e, 2 * i, 0, 1);
        if ((e[i + t.t] += t.am(i + 1, 2 * t[i], e, 2 * i + 1, n, t.t - i - 1)) >= t.DV) {
            e[i + t.t] -= t.DV;
            e[i + t.t + 1] = 1
        }
    }
    if (e.t > 0)
        e[e.t - 1] += t.am(i, t[i], e, 2 * i, 0, 1);
    e.s = 0;
    e.clamp()
}
function bnpDivRemTo(e, t, i) {
    var n = e.abs();
    if (!(n.t <= 0)) {
        var s = this.abs();
        if (!(s.t < n.t)) {
            if (null == i)
                i = nbi();
            var r = nbi()
              , a = this.s
              , o = e.s;
            var c = this.DB - nbits(n[n.t - 1]);
            if (c > 0) {
                n.lShiftTo(c, r);
                s.lShiftTo(c, i)
            } else {
                n.copyTo(r);
                s.copyTo(i)
            }
            var d = r.t;
            var _ = r[d - 1];
            if (0 != _) {
                var l = _ * (1 << this.F1) + (d > 1 ? r[d - 2] >> this.F2 : 0);
                var u = this.FV / l
                  , f = (1 << this.F1) / l
                  , h = 1 << this.F2;
                var p = i.t
                  , m = p - d
                  , g = null == t ? nbi() : t;
                r.dlShiftTo(m, g);
                if (i.compareTo(g) >= 0) {
                    i[i.t++] = 1;
                    i.subTo(g, i)
                }
                BigInteger.ONE.dlShiftTo(d, g);
                g.subTo(r, r);
                for (; r.t < d; )
                    r[r.t++] = 0;
                for (; --m >= 0; ) {
                    var b = i[--p] == _ ? this.DM : Math.floor(i[p] * u + (i[p - 1] + h) * f);
                    if ((i[p] += r.am(0, b, i, m, 0, d)) < b) {
                        r.dlShiftTo(m, g);
                        i.subTo(g, i);
                        for (; i[p] < --b; )
                            i.subTo(g, i)
                    }
                }
                if (null != t) {
                    i.drShiftTo(d, t);
                    if (a != o)
                        BigInteger.ZERO.subTo(t, t)
                }
                i.t = d;
                i.clamp();
                if (c > 0)
                    i.rShiftTo(c, i);
                if (a < 0)
                    BigInteger.ZERO.subTo(i, i)
            }
        } else {
            if (null != t)
                t.fromInt(0);
            if (null != i)
                this.copyTo(i)
        }
    }
}
function bnMod(e) {
    var t = nbi();
    this.abs().divRemTo(e, null, t);
    if (this.s < 0 && t.compareTo(BigInteger.ZERO) > 0)
        e.subTo(t, t);
    return t
}
function Classic(e) {
    this.m = e
}
function cConvert(e) {
    if (e.s < 0 || e.compareTo(this.m) >= 0)
        return e.mod(this.m);
    else
        return e
}
function cRevert(e) {
    return e
}
function cReduce(e) {
    e.divRemTo(this.m, null, e)
}
function cMulTo(e, t, i) {
    e.multiplyTo(t, i);
    this.reduce(i)
}
function cSqrTo(e, t) {
    e.squareTo(t);
    this.reduce(t)
}
Classic.prototype.convert = cConvert;
Classic.prototype.revert = cRevert;
Classic.prototype.reduce = cReduce;
Classic.prototype.mulTo = cMulTo;
Classic.prototype.sqrTo = cSqrTo;
function bnpInvDigit() {
    if (this.t < 1)
        return 0;
    var e = this[0];
    if (0 == (1 & e))
        return 0;
    var t = 3 & e;
    t = t * (2 - (15 & e) * t) & 15;
    t = t * (2 - (255 & e) * t) & 255;
    t = t * (2 - ((65535 & e) * t & 65535)) & 65535;
    t = t * (2 - e * t % this.DV) % this.DV;
    return t > 0 ? this.DV - t : -t
}
function Montgomery(e) {
    this.m = e;
    this.mp = e.invDigit();
    this.mpl = 32767 & this.mp;
    this.mph = this.mp >> 15;
    this.um = (1 << e.DB - 15) - 1;
    this.mt2 = 2 * e.t
}
function montConvert(e) {
    var t = nbi();
    e.abs().dlShiftTo(this.m.t, t);
    t.divRemTo(this.m, null, t);
    if (e.s < 0 && t.compareTo(BigInteger.ZERO) > 0)
        this.m.subTo(t, t);
    return t
}
function montRevert(e) {
    var t = nbi();
    e.copyTo(t);
    this.reduce(t);
    return t
}
function montReduce(e) {
    for (; e.t <= this.mt2; )
        e[e.t++] = 0;
    for (var t = 0; t < this.m.t; ++t) {
        var i = 32767 & e[t];
        var n = i * this.mpl + ((i * this.mph + (e[t] >> 15) * this.mpl & this.um) << 15) & e.DM;
        i = t + this.m.t;
        e[i] += this.m.am(0, n, e, t, 0, this.m.t);
        for (; e[i] >= e.DV; ) {
            e[i] -= e.DV;
            e[++i]++
        }
    }
    e.clamp();
    e.drShiftTo(this.m.t, e);
    if (e.compareTo(this.m) >= 0)
        e.subTo(this.m, e)
}
function montSqrTo(e, t) {
    e.squareTo(t);
    this.reduce(t)
}
function montMulTo(e, t, i) {
    e.multiplyTo(t, i);
    this.reduce(i)
}
Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;
function bnpIsEven() {
    return 0 == (this.t > 0 ? 1 & this[0] : this.s)
}
function bnpExp(e, t) {
    if (e > 4294967295 || e < 1)
        return BigInteger.ONE;
    var i = nbi()
      , n = nbi()
      , s = t.convert(this)
      , r = nbits(e) - 1;
    s.copyTo(i);
    for (; --r >= 0; ) {
        t.sqrTo(i, n);
        if ((e & 1 << r) > 0)
            t.mulTo(n, s, i);
        else {
            var a = i;
            i = n;
            n = a
        }
    }
    return t.revert(i)
}
function bnModPowInt(e, t) {
    var i;
    if (e < 256 || t.isEven())
        i = new Classic(t);
    else
        i = new Montgomery(t);
    return this.exp(e, i)
}
BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.isEven = bnpIsEven;
BigInteger.prototype.exp = bnpExp;
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.modPowInt = bnModPowInt;
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);
function bnClone() {
    var e = nbi();
    this.copyTo(e);
    return e
}
function bnIntValue() {
    if (this.s < 0) {
        if (1 == this.t)
            return this[0] - this.DV;
        else if (0 == this.t)
            return -1
    } else if (1 == this.t)
        return this[0];
    else if (0 == this.t)
        return 0;
    return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
}
function bnByteValue() {
    return 0 == this.t ? this.s : this[0] << 24 >> 24
}
function bnShortValue() {
    return 0 == this.t ? this.s : this[0] << 16 >> 16
}
function bnpChunkSize(e) {
    return Math.floor(Math.LN2 * this.DB / Math.log(e))
}
function bnSigNum() {
    if (this.s < 0)
        return -1;
    else if (this.t <= 0 || 1 == this.t && this[0] <= 0)
        return 0;
    else
        return 1
}
function bnpToRadix(e) {
    if (null == e)
        e = 10;
    if (0 == this.signum() || e < 2 || e > 36)
        return "0";
    var t = this.chunkSize(e);
    var i = Math.pow(e, t);
    var n = nbv(i)
      , s = nbi()
      , r = nbi()
      , a = "";
    this.divRemTo(n, s, r);
    for (; s.signum() > 0; ) {
        a = (i + r.intValue()).toString(e).substr(1) + a;
        s.divRemTo(n, s, r)
    }
    return r.intValue().toString(e) + a
}
function bnpFromRadix(e, t) {
    this.fromInt(0);
    if (null == t)
        t = 10;
    var i = this.chunkSize(t);
    var n = Math.pow(t, i)
      , s = !1
      , r = 0
      , a = 0;
    for (var o = 0; o < e.length; ++o) {
        var c = intAt(e, o);
        if (!(c < 0)) {
            a = t * a + c;
            if (++r >= i) {
                this.dMultiply(n);
                this.dAddOffset(a, 0);
                r = 0;
                a = 0
            }
        } else if ("-" == e.charAt(o) && 0 == this.signum())
            s = !0
    }
    if (r > 0) {
        this.dMultiply(Math.pow(t, r));
        this.dAddOffset(a, 0)
    }
    if (s)
        BigInteger.ZERO.subTo(this, this)
}
function bnpFromNumber(e, t, i) {
    if ("number" == typeof t)
        if (e < 2)
            this.fromInt(1);
        else {
            this.fromNumber(e, i);
            if (!this.testBit(e - 1))
                this.bitwiseTo(BigInteger.ONE.shiftLeft(e - 1), op_or, this);
            if (this.isEven())
                this.dAddOffset(1, 0);
            for (; !this.isProbablePrime(t); ) {
                this.dAddOffset(2, 0);
                if (this.bitLength() > e)
                    this.subTo(BigInteger.ONE.shiftLeft(e - 1), this)
            }
        }
    else {
        var n = new Array
          , s = 7 & e;
        n.length = (e >> 3) + 1;
        t.nextBytes(n);
        if (s > 0)
            n[0] &= (1 << s) - 1;
        else
            n[0] = 0;
        this.fromString(n, 256)
    }
}
function bnToByteArray() {
    var e = this.t
      , t = new Array;
    t[0] = this.s;
    var i = this.DB - e * this.DB % 8, n, s = 0;
    if (e-- > 0) {
        if (i < this.DB && (n = this[e] >> i) != (this.s & this.DM) >> i)
            t[s++] = n | this.s << this.DB - i;
        for (; e >= 0; ) {
            if (i < 8) {
                n = (this[e] & (1 << i) - 1) << 8 - i;
                n |= this[--e] >> (i += this.DB - 8)
            } else {
                n = this[e] >> (i -= 8) & 255;
                if (i <= 0) {
                    i += this.DB;
                    --e
                }
            }
            if (0 != (128 & n))
                n |= -256;
            if (0 == s && (128 & this.s) != (128 & n))
                ++s;
            if (s > 0 || n != this.s)
                t[s++] = n
        }
    }
    return t
}
function bnEquals(e) {
    return 0 == this.compareTo(e)
}
function bnMin(e) {
    return this.compareTo(e) < 0 ? this : e
}
function bnMax(e) {
    return this.compareTo(e) > 0 ? this : e
}
function bnpBitwiseTo(e, t, i) {
    var n, s, r = Math.min(e.t, this.t);
    for (n = 0; n < r; ++n)
        i[n] = t(this[n], e[n]);
    if (e.t < this.t) {
        s = e.s & this.DM;
        for (n = r; n < this.t; ++n)
            i[n] = t(this[n], s);
        i.t = this.t
    } else {
        s = this.s & this.DM;
        for (n = r; n < e.t; ++n)
            i[n] = t(s, e[n]);
        i.t = e.t
    }
    i.s = t(this.s, e.s);
    i.clamp()
}
function op_and(e, t) {
    return e & t
}
function bnAnd(e) {
    var t = nbi();
    this.bitwiseTo(e, op_and, t);
    return t
}
function op_or(e, t) {
    return e | t
}
function bnOr(e) {
    var t = nbi();
    this.bitwiseTo(e, op_or, t);
    return t
}
function op_xor(e, t) {
    return e ^ t
}
function bnXor(e) {
    var t = nbi();
    this.bitwiseTo(e, op_xor, t);
    return t
}
function op_andnot(e, t) {
    return e & ~t
}
function bnAndNot(e) {
    var t = nbi();
    this.bitwiseTo(e, op_andnot, t);
    return t
}
function bnNot() {
    var e = nbi();
    for (var t = 0; t < this.t; ++t)
        e[t] = this.DM & ~this[t];
    e.t = this.t;
    e.s = ~this.s;
    return e
}
function bnShiftLeft(e) {
    var t = nbi();
    if (e < 0)
        this.rShiftTo(-e, t);
    else
        this.lShiftTo(e, t);
    return t
}
function bnShiftRight(e) {
    var t = nbi();
    if (e < 0)
        this.lShiftTo(-e, t);
    else
        this.rShiftTo(e, t);
    return t
}
function lbit(e) {
    if (0 == e)
        return -1;
    var t = 0;
    if (0 == (65535 & e)) {
        e >>= 16;
        t += 16
    }
    if (0 == (255 & e)) {
        e >>= 8;
        t += 8
    }
    if (0 == (15 & e)) {
        e >>= 4;
        t += 4
    }
    if (0 == (3 & e)) {
        e >>= 2;
        t += 2
    }
    if (0 == (1 & e))
        ++t;
    return t
}
function bnGetLowestSetBit() {
    for (var e = 0; e < this.t; ++e)
        if (0 != this[e])
            return e * this.DB + lbit(this[e]);
    if (this.s < 0)
        return this.t * this.DB;
    else
        return -1
}
function cbit(e) {
    var t = 0;
    for (; 0 != e; ) {
        e &= e - 1;
        ++t
    }
    return t
}
function bnBitCount() {
    var e = 0
      , t = this.s & this.DM;
    for (var i = 0; i < this.t; ++i)
        e += cbit(this[i] ^ t);
    return e
}
function bnTestBit(e) {
    var t = Math.floor(e / this.DB);
    if (t >= this.t)
        return 0 != this.s;
    else
        return 0 != (this[t] & 1 << e % this.DB)
}
function bnpChangeBit(e, t) {
    var i = BigInteger.ONE.shiftLeft(e);
    this.bitwiseTo(i, t, i);
    return i
}
function bnSetBit(e) {
    return this.changeBit(e, op_or)
}
function bnClearBit(e) {
    return this.changeBit(e, op_andnot)
}
function bnFlipBit(e) {
    return this.changeBit(e, op_xor)
}
function bnpAddTo(e, t) {
    var i = 0
      , n = 0
      , s = Math.min(e.t, this.t);
    for (; i < s; ) {
        n += this[i] + e[i];
        t[i++] = n & this.DM;
        n >>= this.DB
    }
    if (e.t < this.t) {
        n += e.s;
        for (; i < this.t; ) {
            n += this[i];
            t[i++] = n & this.DM;
            n >>= this.DB
        }
        n += this.s
    } else {
        n += this.s;
        for (; i < e.t; ) {
            n += e[i];
            t[i++] = n & this.DM;
            n >>= this.DB
        }
        n += e.s
    }
    t.s = n < 0 ? -1 : 0;
    if (n > 0)
        t[i++] = n;
    else if (n < -1)
        t[i++] = this.DV + n;
    t.t = i;
    t.clamp()
}
function bnAdd(e) {
    var t = nbi();
    this.addTo(e, t);
    return t
}
function bnSubtract(e) {
    var t = nbi();
    this.subTo(e, t);
    return t
}
function bnMultiply(e) {
    var t = nbi();
    this.multiplyTo(e, t);
    return t
}
function bnSquare() {
    var e = nbi();
    this.squareTo(e);
    return e
}
function bnDivide(e) {
    var t = nbi();
    this.divRemTo(e, t, null);
    return t
}
function bnRemainder(e) {
    var t = nbi();
    this.divRemTo(e, null, t);
    return t
}
function bnDivideAndRemainder(e) {
    var t = nbi()
      , i = nbi();
    this.divRemTo(e, t, i);
    return new Array(t,i)
}
function bnpDMultiply(e) {
    this[this.t] = this.am(0, e - 1, this, 0, 0, this.t);
    ++this.t;
    this.clamp()
}
function bnpDAddOffset(e, t) {
    if (0 != e) {
        for (; this.t <= t; )
            this[this.t++] = 0;
        this[t] += e;
        for (; this[t] >= this.DV; ) {
            this[t] -= this.DV;
            if (++t >= this.t)
                this[this.t++] = 0;
            ++this[t]
        }
    }
}
function NullExp() {}
function nNop(e) {
    return e
}
function nMulTo(e, t, i) {
    e.multiplyTo(t, i)
}
function nSqrTo(e, t) {
    e.squareTo(t)
}
NullExp.prototype.convert = nNop;
NullExp.prototype.revert = nNop;
NullExp.prototype.mulTo = nMulTo;
NullExp.prototype.sqrTo = nSqrTo;
function bnPow(e) {
    return this.exp(e, new NullExp)
}
function bnpMultiplyLowerTo(e, t, i) {
    var n = Math.min(this.t + e.t, t);
    i.s = 0;
    i.t = n;
    for (; n > 0; )
        i[--n] = 0;
    var s;
    for (s = i.t - this.t; n < s; ++n)
        i[n + this.t] = this.am(0, e[n], i, n, 0, this.t);
    for (s = Math.min(e.t, t); n < s; ++n)
        this.am(0, e[n], i, n, 0, t - n);
    i.clamp()
}
function bnpMultiplyUpperTo(e, t, i) {
    --t;
    var n = i.t = this.t + e.t - t;
    i.s = 0;
    for (; --n >= 0; )
        i[n] = 0;
    for (n = Math.max(t - this.t, 0); n < e.t; ++n)
        i[this.t + n - t] = this.am(t - n, e[n], i, 0, 0, this.t + n - t);
    i.clamp();
    i.drShiftTo(1, i)
}
function Barrett(e) {
    this.r2 = nbi();
    this.q3 = nbi();
    BigInteger.ONE.dlShiftTo(2 * e.t, this.r2);
    this.mu = this.r2.divide(e);
    this.m = e
}
function barrettConvert(e) {
    if (e.s < 0 || e.t > 2 * this.m.t)
        return e.mod(this.m);
    else if (e.compareTo(this.m) < 0)
        return e;
    else {
        var t = nbi();
        e.copyTo(t);
        this.reduce(t);
        return t
    }
}
function barrettRevert(e) {
    return e
}
function barrettReduce(e) {
    e.drShiftTo(this.m.t - 1, this.r2);
    if (e.t > this.m.t + 1) {
        e.t = this.m.t + 1;
        e.clamp()
    }
    this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3);
    this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2);
    for (; e.compareTo(this.r2) < 0; )
        e.dAddOffset(1, this.m.t + 1);
    e.subTo(this.r2, e);
    for (; e.compareTo(this.m) >= 0; )
        e.subTo(this.m, e)
}
function barrettSqrTo(e, t) {
    e.squareTo(t);
    this.reduce(t)
}
function barrettMulTo(e, t, i) {
    e.multiplyTo(t, i);
    this.reduce(i)
}
Barrett.prototype.convert = barrettConvert;
Barrett.prototype.revert = barrettRevert;
Barrett.prototype.reduce = barrettReduce;
Barrett.prototype.mulTo = barrettMulTo;
Barrett.prototype.sqrTo = barrettSqrTo;
function bnModPow(e, t) {
    var i = e.bitLength(), n, s = nbv(1), r;
    if (i <= 0)
        return s;
    else if (i < 18)
        n = 1;
    else if (i < 48)
        n = 3;
    else if (i < 144)
        n = 4;
    else if (i < 768)
        n = 5;
    else
        n = 6;
    if (i < 8)
        r = new Classic(t);
    else if (t.isEven())
        r = new Barrett(t);
    else
        r = new Montgomery(t);
    var a = new Array
      , o = 3
      , c = n - 1
      , d = (1 << n) - 1;
    a[1] = r.convert(this);
    if (n > 1) {
        var _ = nbi();
        r.sqrTo(a[1], _);
        for (; o <= d; ) {
            a[o] = nbi();
            r.mulTo(_, a[o - 2], a[o]);
            o += 2
        }
    }
    var l = e.t - 1, u, f = !0, h = nbi(), p;
    i = nbits(e[l]) - 1;
    for (; l >= 0; ) {
        if (i >= c)
            u = e[l] >> i - c & d;
        else {
            u = (e[l] & (1 << i + 1) - 1) << c - i;
            if (l > 0)
                u |= e[l - 1] >> this.DB + i - c
        }
        o = n;
        for (; 0 == (1 & u); ) {
            u >>= 1;
            --o
        }
        if ((i -= o) < 0) {
            i += this.DB;
            --l
        }
        if (f) {
            a[u].copyTo(s);
            f = !1
        } else {
            for (; o > 1; ) {
                r.sqrTo(s, h);
                r.sqrTo(h, s);
                o -= 2
            }
            if (o > 0)
                r.sqrTo(s, h);
            else {
                p = s;
                s = h;
                h = p
            }
            r.mulTo(h, a[u], s)
        }
        for (; l >= 0 && 0 == (e[l] & 1 << i); ) {
            r.sqrTo(s, h);
            p = s;
            s = h;
            h = p;
            if (--i < 0) {
                i = this.DB - 1;
                --l
            }
        }
    }
    return r.revert(s)
}
function bnGCD(e) {
    var t = this.s < 0 ? this.negate() : this.clone();
    var i = e.s < 0 ? e.negate() : e.clone();
    if (t.compareTo(i) < 0) {
        var n = t;
        t = i;
        i = n
    }
    var s = t.getLowestSetBit()
      , r = i.getLowestSetBit();
    if (r < 0)
        return t;
    if (s < r)
        r = s;
    if (r > 0) {
        t.rShiftTo(r, t);
        i.rShiftTo(r, i)
    }
    for (; t.signum() > 0; ) {
        if ((s = t.getLowestSetBit()) > 0)
            t.rShiftTo(s, t);
        if ((s = i.getLowestSetBit()) > 0)
            i.rShiftTo(s, i);
        if (t.compareTo(i) >= 0) {
            t.subTo(i, t);
            t.rShiftTo(1, t)
        } else {
            i.subTo(t, i);
            i.rShiftTo(1, i)
        }
    }
    if (r > 0)
        i.lShiftTo(r, i);
    return i
}
function bnpModInt(e) {
    if (e <= 0)
        return 0;
    var t = this.DV % e
      , i = this.s < 0 ? e - 1 : 0;
    if (this.t > 0)
        if (0 == t)
            i = this[0] % e;
        else
            for (var n = this.t - 1; n >= 0; --n)
                i = (t * i + this[n]) % e;
    return i
}
function bnModInverse(e) {
    var t = e.isEven();
    if (this.isEven() && t || 0 == e.signum())
        return BigInteger.ZERO;
    var i = e.clone()
      , n = this.clone();
    var s = nbv(1)
      , r = nbv(0)
      , a = nbv(0)
      , o = nbv(1);
    for (; 0 != i.signum(); ) {
        for (; i.isEven(); ) {
            i.rShiftTo(1, i);
            if (t) {
                if (!s.isEven() || !r.isEven()) {
                    s.addTo(this, s);
                    r.subTo(e, r)
                }
                s.rShiftTo(1, s)
            } else if (!r.isEven())
                r.subTo(e, r);
            r.rShiftTo(1, r)
        }
        for (; n.isEven(); ) {
            n.rShiftTo(1, n);
            if (t) {
                if (!a.isEven() || !o.isEven()) {
                    a.addTo(this, a);
                    o.subTo(e, o)
                }
                a.rShiftTo(1, a)
            } else if (!o.isEven())
                o.subTo(e, o);
            o.rShiftTo(1, o)
        }
        if (i.compareTo(n) >= 0) {
            i.subTo(n, i);
            if (t)
                s.subTo(a, s);
            r.subTo(o, r)
        } else {
            n.subTo(i, n);
            if (t)
                a.subTo(s, a);
            o.subTo(r, o)
        }
    }
    if (0 != n.compareTo(BigInteger.ONE))
        return BigInteger.ZERO;
    if (o.compareTo(e) >= 0)
        return o.subtract(e);
    if (o.signum() < 0)
        o.addTo(e, o);
    else
        return o;
    if (o.signum() < 0)
        return o.add(e);
    else
        return o
}
var lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
var lplim = (1 << 26) / lowprimes[lowprimes.length - 1];
function bnIsProbablePrime(e) {
    var t, i = this.abs();
    if (1 == i.t && i[0] <= lowprimes[lowprimes.length - 1]) {
        for (t = 0; t < lowprimes.length; ++t)
            if (i[0] == lowprimes[t])
                return !0;
        return !1
    }
    if (i.isEven())
        return !1;
    t = 1;
    for (; t < lowprimes.length; ) {
        var n = lowprimes[t]
          , s = t + 1;
        for (; s < lowprimes.length && n < lplim; )
            n *= lowprimes[s++];
        n = i.modInt(n);
        for (; t < s; )
            if (n % lowprimes[t++] == 0)
                return !1
    }
    return i.millerRabin(e)
}
function bnpMillerRabin(e) {
    var t = this.subtract(BigInteger.ONE);
    var i = t.getLowestSetBit();
    if (i <= 0)
        return !1;
    var n = t.shiftRight(i);
    e = e + 1 >> 1;
    if (e > lowprimes.length)
        e = lowprimes.length;
    var s = nbi();
    for (var r = 0; r < e; ++r) {
        s.fromInt(lowprimes[Math.floor(Math.random() * lowprimes.length)]);
        var a = s.modPow(n, this);
        if (0 != a.compareTo(BigInteger.ONE) && 0 != a.compareTo(t)) {
            var o = 1;
            for (; o++ < i && 0 != a.compareTo(t); ) {
                a = a.modPowInt(2, this);
                if (0 == a.compareTo(BigInteger.ONE))
                    return !1
            }
            if (0 != a.compareTo(t))
                return !1
        }
    }
    return !0
}
BigInteger.prototype.chunkSize = bnpChunkSize;
BigInteger.prototype.toRadix = bnpToRadix;
BigInteger.prototype.fromRadix = bnpFromRadix;
BigInteger.prototype.fromNumber = bnpFromNumber;
BigInteger.prototype.bitwiseTo = bnpBitwiseTo;
BigInteger.prototype.changeBit = bnpChangeBit;
BigInteger.prototype.addTo = bnpAddTo;
BigInteger.prototype.dMultiply = bnpDMultiply;
BigInteger.prototype.dAddOffset = bnpDAddOffset;
BigInteger.prototype.multiplyLowerTo = bnpMultiplyLowerTo;
BigInteger.prototype.multiplyUpperTo = bnpMultiplyUpperTo;
BigInteger.prototype.modInt = bnpModInt;
BigInteger.prototype.millerRabin = bnpMillerRabin;
BigInteger.prototype.clone = bnClone;
BigInteger.prototype.intValue = bnIntValue;
BigInteger.prototype.byteValue = bnByteValue;
BigInteger.prototype.shortValue = bnShortValue;
BigInteger.prototype.signum = bnSigNum;
BigInteger.prototype.toByteArray = bnToByteArray;
BigInteger.prototype.equals = bnEquals;
BigInteger.prototype.min = bnMin;
BigInteger.prototype.max = bnMax;
BigInteger.prototype.and = bnAnd;
BigInteger.prototype.or = bnOr;
BigInteger.prototype.xor = bnXor;
BigInteger.prototype.andNot = bnAndNot;
BigInteger.prototype.not = bnNot;
BigInteger.prototype.shiftLeft = bnShiftLeft;
BigInteger.prototype.shiftRight = bnShiftRight;
BigInteger.prototype.getLowestSetBit = bnGetLowestSetBit;
BigInteger.prototype.bitCount = bnBitCount;
BigInteger.prototype.testBit = bnTestBit;
BigInteger.prototype.setBit = bnSetBit;
BigInteger.prototype.clearBit = bnClearBit;
BigInteger.prototype.flipBit = bnFlipBit;
BigInteger.prototype.add = bnAdd;
BigInteger.prototype.subtract = bnSubtract;
BigInteger.prototype.multiply = bnMultiply;
BigInteger.prototype.divide = bnDivide;
BigInteger.prototype.remainder = bnRemainder;
BigInteger.prototype.divideAndRemainder = bnDivideAndRemainder;
BigInteger.prototype.modPow = bnModPow;
BigInteger.prototype.modInverse = bnModInverse;
BigInteger.prototype.pow = bnPow;
BigInteger.prototype.gcd = bnGCD;
BigInteger.prototype.isProbablePrime = bnIsProbablePrime;
BigInteger.prototype.square = bnSquare;
!function() {
    "use strict";
    function f(e) {
        return e < 10 ? "0" + e : e
    }
    function quote(e) {
        escapable.lastIndex = 0;
        return escapable.test(e) ? '"' + e.replace(escapable, function(e) {
            var t = meta[e];
            return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + e + '"'
    }
    function str(e, t) {
        var i, n, s, r, a = gap, o, c = t[e];
        if (c && "object" == typeof c && "function" == typeof c.toJSON)
            c = c.toJSON(e);
        if ("function" == typeof rep)
            c = rep.call(t, e, c);
        switch (typeof c) {
        case "string":
            return quote(c);
        case "number":
            return isFinite(c) ? String(c) : "null";
        case "boolean":
        case "null":
            return String(c);
        case "object":
            if (!c)
                return "null";
            gap += indent;
            o = [];
            if ("[object Array]" === Object.prototype.toString.apply(c)) {
                r = c.length;
                for (i = 0; i < r; i += 1)
                    o[i] = str(i, c) || "null";
                s = 0 === o.length ? "[]" : gap ? "[\n" + gap + o.join(",\n" + gap) + "\n" + a + "]" : "[" + o.join(",") + "]";
                gap = a;
                return s
            }
            if (rep && "object" == typeof rep) {
                r = rep.length;
                for (i = 0; i < r; i += 1)
                    if ("string" == typeof rep[i]) {
                        n = rep[i];
                        s = str(n, c);
                        if (s)
                            o.push(quote(n) + (gap ? ": " : ":") + s)
                    }
            } else
                for (n in c)
                    if (Object.prototype.hasOwnProperty.call(c, n)) {
                        s = str(n, c);
                        if (s)
                            o.push(quote(n) + (gap ? ": " : ":") + s)
                    }
            s = 0 === o.length ? "{}" : gap ? "{\n" + gap + o.join(",\n" + gap) + "\n" + a + "}" : "{" + o.join(",") + "}";
            gap = a;
            return s
        }
    }
    if ("function" != typeof Date.prototype.toJSON) {
        Date.prototype.toJSON = function() {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }
        ;
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
            return this.valueOf()
        }
    }
    var cx, escapable, gap, indent, meta, rep;
    if ("function" != typeof JSON.stringify) {
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        meta = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        };
        JSON.stringify = function(e, t, i) {
            var n;
            gap = "";
            indent = "";
            if ("number" == typeof i)
                for (n = 0; n < i; n += 1)
                    indent += " ";
            else if ("string" == typeof i)
                indent = i;
            rep = t;
            if (t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length))
                throw new Error("JSON.stringify");
            return str("", {
                "": e
            })
        }
    }
    if ("function" != typeof JSON.parse) {
        cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        JSON.parse = function(text, reviver) {
            function walk(e, t) {
                var i, n, s = e[t];
                if (s && "object" == typeof s)
                    for (i in s)
                        if (Object.prototype.hasOwnProperty.call(s, i)) {
                            n = walk(s, i);
                            if (void 0 !== n)
                                s[i] = n;
                            else
                                delete s[i]
                        }
                return reviver.call(e, t, s)
            }
            var j;
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text))
                text = text.replace(cx, function(e) {
                    return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                });
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return "function" == typeof reviver ? walk({
                    "": j
                }, "") : j
            }
            throw new SyntaxError("JSON.parse")
        }
    }
}();
var RSAPublicKey = function(e, t) {
    this.modulus = new BigInteger(Hex.encode(e),16);
    this.encryptionExponent = new BigInteger(Hex.encode(t),16)
};
var UTF8 = {
    encode: function(e) {
        e = e.replace(/\r\n/g, "\n");
        var t = "";
        for (var i = 0; i < e.length; i++) {
            var n = e.charCodeAt(i);
            if (n < 128)
                t += String.fromCharCode(n);
            else if (n > 127 && n < 2048) {
                t += String.fromCharCode(n >> 6 | 192);
                t += String.fromCharCode(63 & n | 128)
            } else {
                t += String.fromCharCode(n >> 12 | 224);
                t += String.fromCharCode(n >> 6 & 63 | 128);
                t += String.fromCharCode(63 & n | 128)
            }
        }
        return t
    },
    decode: function(e) {
        var t = "";
        var i = 0;
        var n = $c1 = $c2 = 0;
        for (; i < e.length; ) {
            n = e.charCodeAt(i);
            if (n < 128) {
                t += String.fromCharCode(n);
                i++
            } else if (n > 191 && n < 224) {
                $c2 = e.charCodeAt(i + 1);
                t += String.fromCharCode((31 & n) << 6 | 63 & $c2);
                i += 2
            } else {
                $c2 = e.charCodeAt(i + 1);
                $c3 = e.charCodeAt(i + 2);
                t += String.fromCharCode((15 & n) << 12 | (63 & $c2) << 6 | 63 & $c3);
                i += 3
            }
        }
        return t
    }
};
var Base64 = {
    base64: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(e) {
        if (!e)
            return !1;
        var t = "";
        var i, n, s;
        var r, a, o, c;
        var d = 0;
        do {
            i = e.charCodeAt(d++);
            n = e.charCodeAt(d++);
            s = e.charCodeAt(d++);
            r = i >> 2;
            a = (3 & i) << 4 | n >> 4;
            o = (15 & n) << 2 | s >> 6;
            c = 63 & s;
            if (isNaN(n))
                o = c = 64;
            else if (isNaN(s))
                c = 64;
            t += this.base64.charAt(r) + this.base64.charAt(a) + this.base64.charAt(o) + this.base64.charAt(c)
        } while (d < e.length);
        return t
    },
    decode: function(e) {
        if (!e)
            return !1;
        e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        var t = "";
        var i, n, s, r;
        var a = 0;
        do {
            i = this.base64.indexOf(e.charAt(a++));
            n = this.base64.indexOf(e.charAt(a++));
            s = this.base64.indexOf(e.charAt(a++));
            r = this.base64.indexOf(e.charAt(a++));
            t += String.fromCharCode(i << 2 | n >> 4);
            if (64 != s)
                t += String.fromCharCode((15 & n) << 4 | s >> 2);
            if (64 != r)
                t += String.fromCharCode((3 & s) << 6 | r)
        } while (a < e.length);
        return t
    }
};
var Hex = {
    hex: "0123456789abcdef",
    encode: function(e) {
        if (!e)
            return !1;
        var t = "";
        var i;
        var n = 0;
        do {
            i = e.charCodeAt(n++);
            t += this.hex.charAt(i >> 4 & 15) + this.hex.charAt(15 & i)
        } while (n < e.length);
        return t
    },
    decode: function(e) {
        if (!e)
            return !1;
        e = e.replace(/[^0-9abcdef]/g, "");
        var t = "";
        var i = 0;
        do
            t += String.fromCharCode(this.hex.indexOf(e.charAt(i++)) << 4 & 240 | 15 & this.hex.indexOf(e.charAt(i++)));
        while (i < e.length);
        return t
    }
};
var ASN1Data = function(e) {
    this.error = !1;
    this.parse = function(e) {
        if (!e) {
            this.error = !0;
            return null
        }
        var t = [];
        for (; e.length > 0; ) {
            var i = e.charCodeAt(0);
            e = e.substr(1);
            var n = 0;
            if (5 == (31 & i))
                e = e.substr(1);
            else if (128 & e.charCodeAt(0)) {
                var s = 127 & e.charCodeAt(0);
                e = e.substr(1);
                if (s > 0)
                    n = e.charCodeAt(0);
                if (s > 1)
                    n = n << 8 | e.charCodeAt(1);
                if (s > 2) {
                    this.error = !0;
                    return null
                }
                e = e.substr(s)
            } else {
                n = e.charCodeAt(0);
                e = e.substr(1)
            }
            var r = "";
            if (n) {
                if (n > e.length) {
                    this.error = !0;
                    return null
                }
                r = e.substr(0, n);
                e = e.substr(n)
            }
            if (32 & i)
                t.push(this.parse(r));
            else
                t.push(this.value(128 & i ? 4 : 31 & i, r))
        }
        return t
    }
    ;
    this.value = function(e, t) {
        if (1 == e)
            return t ? !0 : !1;
        else if (2 == e)
            return t;
        else if (3 == e)
            return this.parse(t.substr(1));
        else if (5 == e)
            return null;
        else if (6 == e) {
            var i = [];
            var n = t.charCodeAt(0);
            i.push(Math.floor(n / 40));
            i.push(n - 40 * i[0]);
            var s = [];
            var r = 0;
            var a;
            for (a = 1; a < t.length; a++) {
                var o = t.charCodeAt(a);
                s.push(127 & o);
                if (128 & o)
                    r++;
                else {
                    var c;
                    var d = 0;
                    for (c = 0; c < s.length; c++)
                        d += s[c] * Math.pow(128, r--);
                    i.push(d);
                    r = 0;
                    s = []
                }
            }
            return i.join(".")
        }
        return null
    }
    ;
    this.data = this.parse(e)
};
var RSA = {
    getPublicKey: function(e) {
        if (e.length < 50)
            return !1;
        if ("-----BEGIN PUBLIC KEY-----" != e.substr(0, 26))
            return !1;
        e = e.substr(26);
        if ("-----END PUBLIC KEY-----" != e.substr(e.length - 24))
            return !1;
        e = e.substr(0, e.length - 24);
        e = new ASN1Data(Base64.decode(e));
        if (e.error)
            return !1;
        e = e.data;
        if ("1.2.840.113549.1.1.1" == e[0][0][0])
            return new RSAPublicKey(e[0][1][0][0],e[0][1][0][1]);
        else
            return !1
    },
    encrypt: function(e, t) {
        if (!t)
            return !1;
        var i = t.modulus.bitLength() + 7 >> 3;
        e = this.pkcs1pad2(e, i);
        if (!e)
            return !1;
        e = e.modPowInt(t.encryptionExponent, t.modulus);
        if (!e)
            return !1;
        e = e.toString(16);
        for (; e.length < 2 * i; )
            e = "0" + e;
        return Base64.encode(Hex.decode(e))
    },
    decrypt: function(e) {
        var t = new BigInteger(e,16)
    },
    pkcs1pad2: function(e, t) {
        if (t < e.length + 11)
            return null;
        var i = [];
        var n = e.length - 1;
        for (; n >= 0 && t > 0; )
            i[--t] = e.charCodeAt(n--);
        i[--t] = 0;
        for (; t > 2; )
            i[--t] = Math.floor(254 * Math.random()) + 1;
        i[--t] = 2;
        i[--t] = 0;
        return new BigInteger(i)
    }
};
var MpUtil = function() {
    var e = 0;
    var t = function(e, t, i) {
        e.addEventListener ? e.addEventListener(t, i, !1) : e.attachEvent("on" + t, i)
    };
    var i = function(e, t, i) {
        e.removeEventListener ? e.removeEventListener(t, i, !1) : e.detachEvent("on" + t, i)
    };
    var n = function() {
        return "" + ++e
    };
    var s = function(e, t) {
        try {
            t = t.toLowerCase();
            if (null === e)
                return "null" == t;
            if (void 0 === e)
                return "undefined" == t;
            else
                return Object.prototype.toString.call(e).toLowerCase() == "[object " + t + "]"
        } catch (i) {
            return !1
        }
    };
    return {
        addEvent: t,
        clearEvent: i,
        uniqueId: n,
        isTypeOf: s
    }
}();
var MpRequest = function() {
    var e;
    var t = "zc.reg.163.com/resources/mp-agent-finger.html?WEBZJVersion=26494456d8e99723c52382d4c7ccf751";
    var i = "MP-DATA:";
    var n = "MP-COOKIE:";
    var s = "MP_AGENT_READY";
    var r = !1;
    var a = !1;
    var o = [];
    var c;
    var d = {};
    var _ = {};
    var l, u, f, h, p, m, g, b, v;
    var $;
    var y = 200 * Math.random();
    var C = function() {
        r = !0;
        var t = function(e) {
            var t = document.createElement("img");
            t.style.width = "0px";
            t.style.height = "0px";
            t.style.position = "absolute";
            document.body.appendChild(t);
            t.src = e;
            setTimeout(function() {
                document.body.removeChild(t)
            }, 1e4)
        };
        var l = function(e, i) {
            try {
                var n, s = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 24, 25, 20400, 20500];
                var r = "https://pr.nss.netease.com/sentry/passive?uapi=" + encodeURIComponent(e);
                var a = e.indexOf("dl-") > -1 ? 1 : 0;
                var o = window._$needUrsBgp && window._$BGPZC ? 1 : 0;
                var c = 0;
                if (y <= 1) {
                    n = u(i);
                    r = r + "&dataTime=" + (new Date).getTime() + "&clusterName=urs-webzj-static-passive&modelName=webzj_response_time2&one=1&isLogin=" + a + "&isBGP=" + o + "&isNew=" + c;
                    for (var d = 0, _ = s.length, l; d < _; d++) {
                        l = s[d];
                        if (l == n)
                            r = r + "&step" + l + "=1";
                        else
                            r = r + "&step" + l + "=0"
                    }
                    t(r)
                }
            } catch (f) {}
        };
        var u = function(e) {
            var t = 1;
            if (e > 2e4)
                if (20400 == e || 20500 == e)
                    t = e;
                else if (e.toString().indexOf("4") > -1)
                    t = 24;
                else if (e.toString().indexOf("5") > -1)
                    t = 25;
                else
                    t = 10;
            else if (e > 1e4)
                t = 9;
            else if (e > 2e3)
                t = 8;
            else if (e > 1e3)
                t = 7;
            else if (e > 500)
                t = 6;
            else if (e > 200)
                t = 5;
            else if (e > 90)
                t = 4;
            else if (e > 60)
                t = 3;
            else if (e > 30)
                t = 2;
            return t
        };
        m = function(t) {
            var r = t.data, u;
            if (r !== s) {
                if ("object" == typeof r)
                    r = JSON.stringify(r);
                if (0 !== r.indexOf(n)) {
                    if (0 === r.indexOf(i)) {
                        r = JSON.parse(r.replace(i, ""));
                        u = d[r.key];
                        delete d[r.key];
                        if (u)
                            if (0 !== ("" + r.status).indexOf("2")) {
                                var h = {
                                    ret: "" + r.status
                                };
                                if ("-1" == r.status)
                                    l(u.logPath, 10001);
                                else
                                    l(u.logPath, 2e4 + parseInt(r.status));
                                u && u.error(h)
                            } else {
                                r.result = JSON.parse(decodeURIComponent(r.result || "{}"));
                                r.result.time = r.time;
                                l(u.logPath, r.time);
                                u && u.success(r.result)
                            }
                    }
                } else {
                    r = JSON.parse(r.replace(n, ""));
                    u = _[r.key];
                    delete _[r.key];
                    if (!u)
                        return;
                    u(r.cookieValue)
                }
            } else {
                a = !0;
                var p = (new Date).getTime() - $;
                var m = window._$needUrsBgp && window._$BGPZC ? "BGP" : "notBGP";
                l("zc-iframe-" + m, p);
                for (var g = 0, b = o.length; g < b; g++)
                    c(e.contentWindow, {
                        data: o[g]
                    });
                clearTimeout(f)
            }
        }
        ;
        if (!window.postMessage) {
            var g = "MSGREGISTER|"
              , b = [];
            var v = function() {
                var e = function(e) {
                    var t = {}
                      , i = e.split("|");
                    for (var n = 0, s = i.length, r; n < s; n++) {
                        r = i[n].split("=");
                        t[decodeURIComponent(r.shift())] = decodeURIComponent(r.join("="))
                    }
                    return t
                };
                return function() {
                    var t = unescape(window.name || "");
                    if (t && 0 == t.indexOf(g)) {
                        window.name = "";
                        t = t.replace(g, "");
                        var i = e(t)
                          , n = (i.origin || "").toLowerCase();
                        if (!n || "*" == n || 0 == location.href.toLowerCase().indexOf(n))
                            m({
                                data: JSON.parse(i.data || "null"),
                                origin: document.referrer
                            })
                    }
                }
            }();
            var C = function() {
                var e;
                var t = function(e, t) {
                    for (var i = 0, n = e.length; i < n; i++)
                        if (e[i] == t)
                            return !0;
                    return !1
                };
                return function() {
                    if (b.length) {
                        e = [];
                        for (var i = b.length - 1, n; i >= 0; i--) {
                            n = b[i];
                            if (!t(e, n.w)) {
                                e.push(n.w);
                                b.splice(i, 1);
                                n.w.name = n.d
                            }
                        }
                        e = null
                    }
                }
            }();
            c = function() {
                var e = function(e) {
                    var t = [];
                    for (var i in e)
                        t.push(encodeURIComponent(i) + "=" + encodeURIComponent(e[i]));
                    return t.join("|")
                };
                var t = function(t) {
                    var i = {};
                    t = t || {};
                    i.origin = t.origin || "*";
                    i.ref = location.href;
                    i.data = JSON.stringify(t.data);
                    return g + e(i)
                };
                return function(e, i) {
                    b.unshift({
                        w: e,
                        d: escape(t(i))
                    })
                }
            }();
            h = window.setInterval(C, 100);
            p = window.setInterval(v, 20)
        } else {
            c = function(e, t) {
                t = t || {};
                e.postMessage(JSON.stringify(t.data), t.origin || "*")
            }
            ;
            MpUtil.addEvent(window, "message", m)
        }
    };
    var w = function() {
        return function(e) {
            e = e || {};
            var t;
            t = document.createElement("iframe");
            t.frameBorder = 0;
            t.style.position = "absolute";
            t.style.width = 0;
            t.style.height = 0;
            t.id = "id-" + MpUtil.uniqueId();
            document.body.appendChild(t);
            var i = e.src;
            window.setTimeout(function() {
                t.src = i
            }, 0);
            return t
        }
    }();
    var x = function(e) {
        h = window.clearInterval(h);
        p = window.clearInterval(p);
        MpUtil.clearEvent(window, "message", m);
        g = 1;
        C({
            timeout: e.timeout
        })
    };
    var E = function() {
        var i = function(e) {
            return e.replace("dl.reg.163.com", "dl2.reg.163.com").replace("zc.reg.163.com", "zc2.reg.163.com").replace("passport.", "passport2.").replace("reg.icourse163.org", "reg2.icourse163.org")
        };
        var n = function(e) {
            var t = [];
            for (var i in e)
                t.push(encodeURIComponent(i) + "=" + encodeURIComponent(e[i]));
            return t.join("&")
        };
        return function(s, _) {
            var h;
            s = s || {};
            var p = MpUtil.uniqueId();
            if (!r) {
                l = p;
                f = setTimeout(function() {
                    d[l].error({
                        ret: "-2"
                    });
                    delete d[l]
                }, window._$bgpTime2);
                C({
                    timeout: s.timeout
                })
            }
            if (window._$needUrsBgp && window._$BGPZC && !g) {
                f = window.clearTimeout(f);
                u = p;
                f = setTimeout(function() {
                    d[u].error({
                        ret: "-2"
                    });
                    delete d[u]
                }, window._$bgpTime2);
                x(s)
            }
            var m = s.url.indexOf("/yd/") >= 0 ? "yd-" + _ : _;
            m = m.replace(/\//g, "");
            m = "zc-" + m;
            d[p] = {
                success: s.success,
                error: s.error,
                logPath: m
            };
            if (window._$needUrsBgp && window._$BGPZC && e && !b) {
                var y = e.contentWindow;
                if (e) {
                    e.src = "about:blank";
                    try {
                        y.document.write("");
                        y.document.clear()
                    } catch (E) {}
                }
                document.body.removeChild(e);
                window.CollectGarbage && window.CollectGarbage();
                e = null;
                a = !1;
                b = 0;
                v = 1;
                for (var T = 0; T < o.length; T++) {
                    var k = o[T].url;
                    if (o[T].key != l)
                        o[T].url = i(k);
                    else
                        ;
                }
                for (var S = 0; S < o.length; S++)
                    if (o[S].key == l) {
                        o.shift();
                        break
                    }
            } else if ("/ini" == _ || "/nini" == _)
                o = [];
            if ("get" === s.type.toLowerCase()) {
                var N = s.url;
                var L = N.indexOf("?") < 0 ? "?" : "&";
                s.data.nocache = p;
                var I = n(s.data);
                if (I)
                    N += L + I;
                s.url = N
            }
            var M = {};
            M.isInit = s.isInit || "";
            if (s.data)
                M.rtid = s.data.rtid || "";
            M.key = p;
            M.data = "get" === s.type.toLowerCase() ? null : s.data;
            M.headers = {};
            M.headers["Content-Type"] = s.contentType || "application/x-www-form-urlencoded";
            if ("application/x-www-form-urlencoded" == M.headers["Content-Type"]) {
                s.data = JSON.parse(s.data);
                M.data = n(s.data)
            }
            M.method = s.type;
            M.timeout = s.timeout || 1e4;
            M.url = s.url;
            if (!e) {
                if (window["$regCookieDomain"])
                    if (window["$regCookieDomain"].indexOf("icourse163.org") >= 0)
                        t = t.replace("zc.reg.163.com", "reg." + window["$regCookieDomain"] + "/zc");
                    else
                        t = t.replace("zc.reg.163.com", "passport." + window["$regCookieDomain"] + "/zc");
                t = t + "&pkid=" + window._$PKID + "&product=" + window._$PRODUCT + "&mpfrom=" + encodeURIComponent(window._$TOPURL);
                h = window.REGPROTOCOL + t;
                if (window._$needUrsBgp && window._$BGPZC) {
                    b = 1;
                    h = i(h)
                }
                $ = (new Date).getTime();
                e = w({
                    src: h
                })
            }
            if (!a)
                if (v && o.length > 0)
                    v = 0;
                else
                    o.push(M);
            else
                c(e.contentWindow, {
                    data: M
                });
            return p
        }
    }();
    var T = function() {
        return function(t, i) {
            var n = MpUtil.uniqueId();
            _[n] = i;
            var s = {
                key: n,
                cookieKey: t
            };
            c(e.contentWindow, {
                data: s
            })
        }
    }();
    var k = function(t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            S(n);
            if (d[n])
                delete d[n]
        }
        var s = {
            clearAjaxArr: t
        };
        c(e.contentWindow, {
            data: s
        })
    };
    var S = function(e) {
        for (var t = 0; t < o.length; t++) {
            var i = o[t];
            if (i.key === e) {
                o.splice(t, 1);
                break
            }
        }
    };
    return {
        request: E,
        getCookie: T,
        reset: x,
        clearAjaxByKey: k
    }
}();
var MpRequest2 = function() {
    var e;
    var t = "dl.reg.163.com/src/mp-agent-finger.html?WEBZJVersion=f7078e2e3bd5d59a0be760a1c4d74d72";
    var i = "MP2-DATA:";
    var n = "MP2-COOKIE:";
    var s = "MP2_AGENT_READY";
    var r = !1;
    var a = !1;
    var o = [];
    var c;
    var d = {};
    var _ = {};
    var l, u, f, h, p, m, g, b, v;
    var $;
    var y = function(e) {
        if ((e.indexOf("dl2.reg.163.com") > -1 || e.indexOf("dl.reg.163.com") > -1) && e.indexOf("/dl/") < 0)
            if (e.indexOf("/b/") > -1)
                e = e.replace(/:\/\/[^\/]+\/b\//, function(e) {
                    return e + "dl/"
                });
            else
                e = e.replace(/:\/\/[^\/]+\//, function(e) {
                    return e + "dl/"
                });
        return e
    };
    var C = function(e) {
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null
    };
    var w = 200 * Math.random();
    var x = function() {
        r = !0;
        var t = function(e) {
            var t = document.createElement("img");
            t.style.width = "0px";
            t.style.height = "0px";
            t.style.position = "absolute";
            document.body.appendChild(t);
            t.src = e;
            setTimeout(function() {
                document.body.removeChild(t)
            }, 1e4)
        };
        var l = function(e, i) {
            try {
                var n, s = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 24, 25, 20400, 20500];
                var r = "https://pr.nss.netease.com/sentry/passive?uapi=" + encodeURIComponent(e);
                var a = e.indexOf("dl-") > -1 ? 1 : 0;
                var o = window._$needUrsBgp && window._$BGP ? 1 : 0;
                var c = 0;
                if (w <= 1) {
                    n = u(i);
                    r = r + "&dataTime=" + (new Date).getTime() + "&clusterName=urs-webzj-static-passive&modelName=webzj_response_time2&one=1&isLogin=" + a + "&isBGP=" + o + "&isNew=" + c;
                    for (var d = 0, _ = s.length, l; d < _; d++) {
                        l = s[d];
                        if (l == n)
                            r = r + "&step" + l + "=1";
                        else
                            r = r + "&step" + l + "=0"
                    }
                    t(r)
                }
            } catch (f) {}
        };
        var u = function(e) {
            var t = 1;
            if (e > 2e4)
                if (20400 == e || 20500 == e)
                    t = e;
                else if (e.toString().indexOf("4") > -1)
                    t = 24;
                else if (e.toString().indexOf("5") > -1)
                    t = 25;
                else
                    t = 10;
            else if (e > 1e4)
                t = 9;
            else if (e > 2e3)
                t = 8;
            else if (e > 1e3)
                t = 7;
            else if (e > 500)
                t = 6;
            else if (e > 200)
                t = 5;
            else if (e > 90)
                t = 4;
            else if (e > 60)
                t = 3;
            else if (e > 30)
                t = 2;
            return t
        };
        m = function(t) {
            var r = t.data, u;
            if (r !== s) {
                if ("object" == typeof r)
                    r = JSON.stringify(r);
                if (0 !== r.indexOf(n)) {
                    if (0 === r.indexOf(i)) {
                        r = JSON.parse(r.replace(i, ""));
                        u = d[r.key];
                        delete d[r.key];
                        if (u)
                            if (0 !== ("" + r.status).indexOf("2")) {
                                var h = {
                                    ret: "" + r.status
                                };
                                if ("-1" == r.status)
                                    l(u.logPath, 10001);
                                else
                                    l(u.logPath, 2e4 + parseInt(r.status));
                                u && u.error(h)
                            } else {
                                r.result = JSON.parse(decodeURIComponent(r.result || "{}"));
                                r.result.time = r.time;
                                l(u.logPath, r.time);
                                u && u.success(r.result)
                            }
                    }
                } else {
                    r = JSON.parse(r.replace(n, ""));
                    u = _[r.key];
                    delete _[r.key];
                    if (!u)
                        return;
                    u(r.cookieValue)
                }
            } else {
                a = !0;
                var p = (new Date).getTime() - $;
                var m = window._$needUrsBgp && window._$BGP ? "BGP" : "notBGP";
                l("dl-iframe-" + m, p);
                for (var g = 0, b = o.length; g < b; g++)
                    c(e.contentWindow, {
                        data: o[g]
                    });
                clearTimeout(f)
            }
        }
        ;
        if (!window.postMessage) {
            var g = "MSGLOGIN|"
              , b = [];
            var v = function() {
                var e = function(e) {
                    var t = {}
                      , i = e.split("|");
                    for (var n = 0, s = i.length, r; n < s; n++) {
                        r = i[n].split("=");
                        t[decodeURIComponent(r.shift())] = decodeURIComponent(r.join("="))
                    }
                    return t
                };
                return function() {
                    var t = unescape(window.name || "");
                    if (t && 0 == t.indexOf(g)) {
                        window.name = "";
                        t = t.replace(g, "");
                        var i = e(t)
                          , n = (i.origin || "").toLowerCase();
                        if (!n || "*" == n || 0 == location.href.toLowerCase().indexOf(n))
                            m({
                                data: JSON.parse(i.data || "null"),
                                origin: document.referrer
                            })
                    }
                }
            }();
            var y = function() {
                var e;
                var t = function(e, t) {
                    for (var i = 0, n = e.length; i < n; i++)
                        if (e[i] == t)
                            return !0;
                    return !1
                };
                return function() {
                    if (b.length) {
                        e = [];
                        for (var i = b.length - 1, n; i >= 0; i--) {
                            n = b[i];
                            if (!t(e, n.w)) {
                                e.push(n.w);
                                b.splice(i, 1);
                                n.w.name = n.d
                            }
                        }
                        e = null
                    }
                }
            }();
            c = function() {
                var e = function(e) {
                    var t = [];
                    for (var i in e)
                        t.push(encodeURIComponent(i) + "=" + encodeURIComponent(e[i]));
                    return t.join("|")
                };
                var t = function(t) {
                    var i = {};
                    t = t || {};
                    i.origin = t.origin || "*";
                    i.ref = location.href;
                    i.data = JSON.stringify(t.data);
                    return g + e(i)
                };
                return function(e, i) {
                    b.unshift({
                        w: e,
                        d: escape(t(i))
                    })
                }
            }();
            h = window.setInterval(y, 100);
            p = window.setInterval(v, 20)
        } else {
            c = function(e, t) {
                t = t || {};
                e.postMessage(JSON.stringify(t.data), t.origin || "*")
            }
            ;
            MpUtil.addEvent(window, "message", m)
        }
    };
    var E = function() {
        return function(e) {
            e = e || {};
            var t;
            t = document.createElement("iframe");
            t.frameBorder = 0;
            t.style.position = "absolute";
            t.style.width = 0;
            t.style.height = 0;
            t.id = "id-" + MpUtil.uniqueId();
            document.body.appendChild(t);
            var i = e.src;
            window.setTimeout(function() {
                t.src = i
            }, 0);
            return t
        }
    }();
    var T = function(e) {
        h = window.clearInterval(h);
        p = window.clearInterval(p);
        MpUtil.clearEvent(window, "message", m);
        g = 1;
        x({
            timeout: e.timeout
        })
    };
    var k = function() {
        var i = function(e) {
            return e.replace("dl.reg.163.com", "dl2.reg.163.com").replace("zc.reg.163.com", "zc2.reg.163.com").replace("passport.", "passport2.").replace("reg.icourse163.org", "reg2.icourse163.org")
        };
        var n = function(e) {
            var t = [];
            for (var i in e)
                t.push(encodeURIComponent(i) + "=" + encodeURIComponent(e[i]));
            return t.join("&")
        };
        return function(s, _) {
            var h;
            s = s || {};
            var p = MpUtil.uniqueId();
            if (!r) {
                l = p;
                f = setTimeout(function() {
                    d[l].error({
                        ret: "-2"
                    });
                    delete d[l]
                }, window._$bgpTime2);
                x({
                    timeout: s.timeout
                })
            }
            if (window._$needUrsBgp && window._$BGP && !g) {
                f = window.clearTimeout(f);
                u = p;
                f = setTimeout(function() {
                    d[u].error({
                        ret: "-2"
                    });
                    delete d[u]
                }, window._$bgpTime2);
                T(s)
            }
            var m = s.url.indexOf("/yd/") >= 0 ? "yd-" + _ : _;
            m = m.replace(/\//g, "");
            m = "dl-" + m;
            d[p] = {
                success: s.success,
                error: s.error,
                logPath: m
            };
            if (window._$needUrsBgp && window._$BGP && e && !b) {
                var w = e.contentWindow;
                if (e) {
                    e.src = "about:blank";
                    try {
                        w.document.write("");
                        w.document.clear()
                    } catch (k) {}
                }
                document.body.removeChild(e);
                window.CollectGarbage && window.CollectGarbage();
                e = null;
                a = !1;
                b = 0;
                v = 1;
                for (var S = 0; S < o.length; S++) {
                    var N = o[S].url;
                    if (o[S].key != l)
                        o[S].url = i(N);
                    else
                        ;
                }
                for (var L = 0; L < o.length; L++)
                    if (o[L].key == l) {
                        o.shift();
                        break
                    }
            } else if ("/ini" == _ || "/nini" == _)
                o = [];
            if ("get" === s.type.toLowerCase()) {
                var I = s.url;
                var M = I.indexOf("?") < 0 ? "?" : "&";
                s.data.nocache = p;
                var O = n(s.data);
                if (O)
                    I += M + O;
                s.url = I
            }
            var P = {};
            P.isInit = s.isInit || "";
            if (s.data)
                P.rtid = s.data.rtid || "";
            P.key = p;
            P.data = "get" === s.type.toLowerCase() ? null : s.data;
            P.headers = {};
            P.headers["Content-Type"] = s.contentType || "application/x-www-form-urlencoded";
            if ("application/x-www-form-urlencoded" == P.headers["Content-Type"]) {
                s.data = JSON.parse(s.data);
                P.data = n(s.data)
            }
            P.method = s.type;
            P.timeout = s.timeout || 1e4;
            P.url = s.url;
            P.ydSignCookie = C("l_yd_sign");
            if (!e) {
                if (window["$cookieDomain"])
                    if (window["$cookieDomain"].indexOf("icourse163.org") >= 0)
                        t = t.replace("dl.reg.163.com", "reg." + window["$cookieDomain"] + "/dl");
                    else
                        t = t.replace("dl.reg.163.com", "passport." + window["$cookieDomain"] + "/dl");
                t = t + "&pkid=" + window._$PKID + "&product=" + window._$PRODUCT + "&mpfrom=" + encodeURIComponent(window._$TOPURL);
                h = window.PROTOCOL + t;
                if (window._$needUrsBgp && window._$BGP) {
                    b = 1;
                    h = i(h)
                }
                if (window._$pathB)
                    h = h.replace(/:\/\/(?:[^\/]+)/, function(e) {
                        return e + "/b"
                    });
                $ = (new Date).getTime();
                h = y(h);
                e = E({
                    src: h
                })
            }
            if (!a)
                if (v && o.length > 0)
                    v = 0;
                else
                    o.push(P);
            else
                c(e.contentWindow, {
                    data: P
                });
            return p
        }
    }();
    var S = function() {
        return function(t, i) {
            var n = MpUtil.uniqueId();
            _[n] = i;
            var s = {
                key: n,
                cookieKey: t
            };
            c(e.contentWindow, {
                data: s
            })
        }
    }();
    var N = function(t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            L(n);
            if (d[n])
                delete d[n]
        }
        var s = {
            clearAjaxArr: t
        };
        c(e.contentWindow, {
            data: s
        })
    };
    var L = function(e) {
        for (var t = 0; t < o.length; t++) {
            var i = o[t];
            if (i.key === e) {
                o.splice(t, 1);
                break
            }
        }
    };
    return {
        request: k,
        getCookie: S,
        reset: T,
        clearAjaxByKey: N
    }
}();
var h = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC5gsH+AA4XWONB5TDcUd+xCz7ejOFHZKlcZDx+pF1i7Gsvi1vjyJoQhRtRSn950x498VUkx7rUxg1/ScBVfrRxQOZ8xFBye3pjAzfb22+RCuYApSVpJ3OO3KsEuKExftz9oFBv3ejxPlYc5yq7YiBO8XlTnQN0Sa4R4qhPO3I2MQIDAQAB-----END PUBLIC KEY-----'
window.MP = {
    setTicket: function(e) {
        window.MP.TICKET = e || ""
    },
    encrypt: function(e, t) {
        t = t.toLowerCase();
        var i = RSA.getPublicKey(h);
        return RSA.encrypt(e + "`" + t, i)
    },
    encrypt2: function(e) {
        var t = RSA.getPublicKey(h);
        return RSA.encrypt(e, t)
    },
    getCookieId: function(e, t) {
        var i = r._$cookie(e);
        t(i)
    },
    getId: function(e, t) {
        var i = r._$cookie(f + e);
        t(i)
    }
}
function base(e) {
    var t = RSA.getPublicKey(h);
    return RSA.encrypt(e, t)
}
console.log('123456', window.MP.encrypt2('123456'))
