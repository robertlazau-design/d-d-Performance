// D&D homepage draft v3: questions drawer, draft-only form, header, reveals and the rating gauge.
// Numbers match the "D&D Performance: questions before the rebuild" doc.
const Q = [
  ['The shop', 'focus', 1, 'Should the site lead with import repair (Subaru, Honda, Acura, Toyota), like this draft? How much of your performance work should it show?'],
  ['The shop', 'name', 10, 'OK to use your name, Donnell, on the site? Would you be in the photos?'],
  ['The shop', 'legal', 8, 'Should the site say "D&D Performance Automotive" or "D&D Performance Automotive LLC"?'],
  ['The shop', 'logo', 43, 'Do you have a logo file? If not, is a lettered name like this OK for now?'],
  ['Business details', 'hours', 11, 'Are your hours Tuesday to Saturday, 10 to 7, closed Sunday and Monday, like your Google listing?'],
  ['Business details', 'phone', 12, 'Is (503) 509-1164 the number customers should call? Can they text it?'],
  ['Business details', 'address', 14, 'Is it 12689 NE Whitaker Way, Unit C? Walk-ins, or appointments only?'],
  ['Business details', 'email', 13, 'Is dndperformanceautomotive@gmail.com the best email for repair requests?'],
  ['Business details', 'finance', 23, 'Is Snap Finance still active? OK to say financing is available?'],
  ['The work', 'services', 17, 'Is this the right list of services? What\'s missing, and what do you not want calls for?'],
  ['The work', 'subaru', 18, 'Which Subaru jobs do you do most: head gaskets, timing belts, CVT service, something else?'],
  ['The work', 'prices', 20, 'Do you want "starting at" prices on the site, or "call for a price" only?'],
  ['The work', 'warranty', 22, 'What warranty do you give on parts and labor?'],
  ['Reviews', 'reviews', 32, 'OK to quote these Google reviews (first name, last initial) and show your 4.9 rating?'],
  ['Repair requests', 'form', 49, 'When someone sends a request, should it reach you by email, text, or both?'],
  ['Repair requests', 'fields', 50, 'What do you need to know before you can quote: mileage, VIN, photos?'],
  ['Repair requests', 'booking', 51, 'Should people pick a day online, or send a request and get a call back?'],
  ['Photos and film', 'shoot', 39, 'Which half-day could we film at the shop? A slower day is best.']
];
const KEY = 'dnd-answers-v1';
let ans = {};
try { ans = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { ans = {}; }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(ans)); } catch (e) {} update(); };
const num = {};
Q.forEach(q => { num[q[1]] = q[2]; });

document.querySelectorAll('[data-q]').forEach(el => {
  const n = num[el.getAttribute('data-q')];
  if (!n) return;
  const b = document.createElement('span');
  b.className = 'q'; b.setAttribute('aria-hidden', 'true'); b.textContent = n;
  // Keep the badge on the same line as the last word of the flagged text.
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let last = null; while (walker.nextNode()) if (walker.currentNode.nodeValue.trim()) last = walker.currentNode;
  const m = last && last.nodeValue.match(/(\S+)(\s*)$/);
  if (!m) { el.insertAdjacentElement('afterend', b); return; }
  const keep = document.createElement('span'); keep.className = 'qn';
  const tail = last.splitText(m.index); keep.appendChild(document.createTextNode(m[1]));
  tail.nodeValue = m[2];
  tail.parentNode.insertBefore(keep, tail); keep.appendChild(b);
});

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const drawer = document.getElementById('qdrawer');
const scrim = document.getElementById('qscrim');
const list = document.getElementById('qlist');
const pill = document.querySelector('.qpill');
let opener = null;
const spot = id => [...document.querySelectorAll('[data-q="' + id + '"]')].find(x => x.getClientRects().length);
const ping = el => { el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); el.classList.remove('ping'); void el.offsetWidth; el.classList.add('ping'); };

let topic = '';
Q.forEach(q => {
  if (q[0] !== topic) { topic = q[0]; const h = document.createElement('h3'); h.textContent = topic; list.appendChild(h); }
  const it = document.createElement('div'); it.className = 'item'; it.dataset.id = q[1];
  const n = document.createElement('span'); n.className = 'n'; n.textContent = q[2];
  const lab = document.createElement('label'); lab.htmlFor = 'ans-' + q[1]; lab.textContent = q[3] + ' ';
  const ta = document.createElement('textarea'); ta.id = 'ans-' + q[1]; ta.rows = 1; ta.placeholder = 'Your answer'; ta.value = ans[q[1]] || '';
  ta.addEventListener('input', () => { ans[q[1]] = ta.value; save(); });
  if (document.querySelector('[data-q="' + q[1] + '"]')) {
    const a = document.createElement('a'); a.href = '#'; a.textContent = 'show';
    a.addEventListener('click', e => { e.preventDefault(); const el = spot(q[1]); if (!el) return; if (innerWidth < 760) close(); setTimeout(() => ping(el), innerWidth < 760 ? 320 : 0); });
    lab.appendChild(a);
  }
  it.append(n, lab, ta); list.appendChild(it);
});

function notes() {
  const out = ['D&D Performance homepage draft: answers', ''];
  Q.forEach(q => { out.push(q[2] + '. ' + q[3]); out.push('   ' + ((ans[q[1]] || '').trim() || '(no answer yet)')); });
  return out.join('\n');
}
function update() {
  const done = Q.filter(q => (ans[q[1]] || '').trim()).length;
  document.getElementById('qcount').textContent = done + '/' + Q.length;
  document.getElementById('qprog').textContent = done + ' of ' + Q.length + ' answered';
  list.querySelectorAll('.item').forEach(it => it.classList.toggle('done', !!(ans[it.dataset.id] || '').trim()));
  document.getElementById('qtext').href = 'sms:+15038638966?&body=' + encodeURIComponent(notes());
}
function open(e) {
  if (e) e.preventDefault();
  opener = (e && e.currentTarget) || null;
  drawer.classList.add('open'); scrim.classList.add('on'); drawer.removeAttribute('inert');
  pill.setAttribute('aria-expanded', 'true');
  setTimeout(() => document.getElementById('qtitle').focus(), 60);
}
function close() {
  drawer.classList.remove('open'); scrim.classList.remove('on'); drawer.setAttribute('inert', '');
  pill.setAttribute('aria-expanded', 'false');
  if (opener) opener.focus({ preventScroll: true });
}
document.querySelectorAll('[data-open-q]').forEach(b => b.addEventListener('click', open));
document.getElementById('qclose').addEventListener('click', close);
scrim.addEventListener('click', close);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('open')) close(); });

const copied = document.getElementById('qcopied');
document.getElementById('qcopy').addEventListener('click', () => {
  const text = notes();
  const ok = m => { copied.textContent = m; setTimeout(() => { copied.textContent = ''; }, 2500); };
  const fallback = () => { const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); ok('Copied'); } catch (err) { ok('Select and copy'); } t.remove(); };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(() => ok('Copied'), fallback); else fallback();
});
const nums = document.getElementById('qnums');
nums.addEventListener('click', () => { const off = document.body.classList.toggle('no-qn'); nums.textContent = off ? 'Show numbers' : 'Hide numbers'; });
let armed = false;
const clr = document.getElementById('qclear');
clr.addEventListener('click', () => {
  if (!armed) { armed = true; clr.textContent = 'Tap again to clear'; setTimeout(() => { armed = false; clr.textContent = 'Clear answers'; }, 3000); return; }
  ans = {}; list.querySelectorAll('textarea').forEach(t => { t.value = ''; }); armed = false; clr.textContent = 'Clear answers'; save();
});

document.getElementById('roform').addEventListener('submit', e => {
  e.preventDefault();
  const n = document.getElementById('ronote');
  n.textContent = 'Draft only: nothing was sent. On the live site this goes straight to the shop.';
  n.scrollIntoView({ block: 'nearest' });
});
update();

// Header turns solid once the page scrolls.
const head = document.getElementById('head');
const onScroll = () => head.classList.toggle('scrolled', scrollY > 40);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

// Reveal on scroll. Content is visible without JS; this only adds motion.
// A plain scroll check (not IntersectionObserver) so nothing stays hidden after a fast jump.
const revs = [...document.querySelectorAll('.rev')];
const gauge = document.getElementById('gauge');
let ticking = false;
const reveal = () => {
  ticking = false;
  const line = innerHeight * 0.92;
  revs.forEach(el => { if (!el.classList.contains('in') && el.getBoundingClientRect().top < line) el.classList.add('in'); });
  if (gauge.classList.contains('in') && !gauge.classList.contains('go')) setTimeout(() => gauge.classList.add('go'), 250);
};
if (reduce) { revs.forEach(el => el.classList.add('in')); gauge.classList.add('go'); }
else {
  const queue = () => { if (!ticking) { ticking = true; requestAnimationFrame(reveal); } };
  addEventListener('scroll', queue, { passive: true }); addEventListener('resize', queue); reveal();
  setTimeout(reveal, 400);
}
