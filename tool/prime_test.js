var record = [];
const bases = [2, 325, 9375, 28178, 450775, 9780504, 1795265022];
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
function get_next(len, pos, n) {
  if (pos < bases.length) return BigInt(bases[pos]) % n;
  else return randBigInt(len) % (n - 2n) + 2n;
}
function millerRabin(x) {
  let n = BigInt(x);
  if (n < 3n || n % 2n === 0) return n === 2n;
  let len = n.toString().length;
  let u = n - 1n, t = 0n;
  let test_time = Math.max(bases.length, Math.floor(Math.log(Number(n) + 1) / 3));
  while (u % 2n == 0) u /= 2n, ++t;
  for (let i = 0; i < test_time; ++i) {
    let a = get_next(len, i, n);
    if (a === 0) continue;
    if (a in record) continue;
    record.push(a);
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
function check(show = false) {
  try {
    record.length = 0;
    let p = document.getElementById("p").value;
    let a = millerRabin(p);
    if (a) {
      put_ans("Answer: is a Prime Number.");
      if (show)
        console.log(p + " is a Prime Number: Successed in [" + record + "].");
    } else {
      put_ans("Answer: isn't a Prime Number.");
      if (show)
        console.log(p + " isn't a Prime Number: Filled at " + record.pop() + ".")
    }
  } catch (err) {
    put_ans("Something mysterious happened!")
  }
}