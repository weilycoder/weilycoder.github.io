function qpow(x, y, mod) {
    let a = BigInt(x), b = BigInt(y), p = BigInt(mod), r = 1n;
    for (; b; b /= 2n) {
        if (b % 2n) r = r * a % p;
        a = a * a % p;
    }
    return r;
}
function randDigit() {
    return Math.floor(Math.random() * 10);
}
function randBigInt(len) {
    let s = "";
    for (let i = 0; i < len; ++i) s += randDigit();
    return BigInt(s);
}
function millerRabin(x) {
    let n = BigInt(x);
    if (n < 3n || n % 2n === 0) return n === 2n;
    let len = n.toString().length;
    let u = n - 1n, t = 0n;
    let test_time = Math.max(10, Math.ceil(Math.log(Number(n)) * 1.5));
    while (u % 2n == 0) u /= 2n, ++t;
    for (let i = 0; i < test_time; ++i) {
        let a = randBigInt(len) % (n - 2n) + 2n;
        let v = qpow(a, u, n);
        if (v === 1n) continue;
        let s = 0n;
        for (s; s < t; ++s) {
            if (v === n - 1n) break;
            v = v * v % n;
        }
        if (s === t) return false;
    }
    return true;
}
function put_ans(s) {
    document.getElementById("ans").innerHTML = s;
}
function check(f) {
    try {
        let p = f.p.value;
        let a = millerRabin(p);
        if (a) {
            put_ans("Answer: is Prime.");
        } else {
            put_ans("Answer: isn't Prime.");
        }
    } catch (err) {
        put_ans("Something mysterious happened!")
    }
}