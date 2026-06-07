/* ════════════════════════════════════════
   GALLERY DATA
════════════════════════════════════════ */
const ARTWORKS = [
  { id:1,  title:'Harmony in Beige',      artist:'Sarah K.',       initials:'SK', cat:'fine-art',       img:'images/Buddha.jpeg',        desc:'Soft organic forms exploring warmth and balance in ancient earth pigments. A meditative study in natural hues.',         likes:24, comments:[], saved:false, liked:false },
  { id:2,  title:'Grid Study #4',         artist:'Marco L.',       initials:'ML', cat:'graphic-design', img:'images/Crying.jpeg',         desc:'Rhythmic repetition in amber squares — a study in visual weight and the tension between order and emotion.',             likes:17, comments:[], saved:false, liked:false },
  { id:3,  title:'Silent Devotion',       artist:'Priya R.',       initials:'PR', cat:'fine-art',       img:'images/Buddha.jpeg',        desc:'A tranquil reflection on faith and inner stillness. Oil on canvas.',                                                   likes:38, comments:[], saved:false, liked:false },
  { id:4,  title:'Midnight Webs',         artist:'Arjun S.',       initials:'AS', cat:'digital-art',    img:'images/Spiderman.jpeg',      desc:'A high-contrast digital render blending street-art aesthetics with hyper-realistic detail. Created in Procreate.',      likes:51, comments:[], saved:false, liked:false },
  { id:5,  title:'The Observer',          artist:'Naina M.',       initials:'NM', cat:'fine-art',       img:'images/Shri Bhaiya.png',     desc:'Portrait study exploring the quiet power of a contemplative gaze. Charcoal and pastel on textured paper.',              likes:29, comments:[], saved:false, liked:false },
  { id:6,  title:'Echoes of Childhood',  artist:'Devi P.',        initials:'DP', cat:'comic',          img:'images/mascot.jpeg',         desc:'A playful mascot illustration capturing nostalgia and warmth. Ink and digital color.',                                   likes:43, comments:[], saved:false, liked:false },
  { id:7,  title:'Radiant Figure',       artist:'Kabir J.',       initials:'KJ', cat:'fine-art',       img:'images/Shrirang Bhaiya.jpeg', desc:'Close-up portrait with dramatic chiaroscuro lighting. Graphite pencil, 2024.',                                         likes:32, comments:[], saved:false, liked:false },
  { id:8,  title:'Crimson Veil',          artist:'Ananya T.',      initials:'AT', cat:'digital-art',    img:'images/Crying.jpeg',         desc:'Expressive digital painting exploring grief and catharsis through color and form.',                                      likes:19, comments:[], saved:false, liked:false },
  { id:9,  title:'Spirit Ascendant',      artist:'Rishi B.',       initials:'RB', cat:'fine-art',       img:'images/Jesus.jpeg',          desc:'Figurative work in the Western classical tradition. Oil paint on linen.',                                               likes:27, comments:[], saved:false, liked:false },
  { id:10, title:'Community Spirit',      artist:'Flagro Team',    initials:'FT', cat:'comic',          img:'images/Mascot2.jpeg',        desc:'The official Flagro Art Club mascot. Representing creativity, community, and passion for the arts.',                   likes:66, comments:[], saved:false, liked:false },
  { id:11, title:'Form & Void',           artist:'Leena H.',       initials:'LH', cat:'graphic-design', img:'images/Crying.jpeg',         desc:'Minimalist exploration of negative space. The absence becomes the subject.',                                            likes:22, comments:[], saved:false, liked:false },
  { id:12, title:'Sacred Geometry',       artist:'Omar K.',        initials:'OK', cat:'digital-art',    img:'images/Buddha.jpeg',         desc:'Geometric mandala-inspired digital artwork. Symmetry as a meditation tool.',                                            likes:35, comments:[], saved:false, liked:false },
  { id:13, title:'Threads of Life',       artist:'Meera S.',       initials:'MS', cat:'fine-art',       img:'images/Jesus.jpeg',          desc:'Figurative study of interconnection and faith. Mixed media on board.',                                                 likes:41, comments:[], saved:false, liked:false },
  { id:14, title:'Urban Myth',            artist:'Cyrus V.',       initials:'CV', cat:'digital-art',    img:'images/Spiderman.jpeg',      desc:'Pop-culture icon reimagined with a raw, street-art sensibility. Digital illustration.',                                 likes:58, comments:[], saved:false, liked:false },
  { id:15, title:'Golden Hour',           artist:'Tara B.',        initials:'TB', cat:'fine-art',       img:'images/Shri Bhaiya.png',     desc:'A warm, soft-focus portrait catching the light of the setting sun. Watercolor.',                                        likes:33, comments:[], saved:false, liked:false },
  { id:16, title:'Type Study I',          artist:'Ravi D.',        initials:'RD', cat:'graphic-design', img:'images/ArtAddaBrown.png',    desc:'An exploration of letterform aesthetics. Typography as visual art.',                                                   likes:14, comments:[], saved:false, liked:false },
  { id:17, title:'Club Origins',          artist:'Flagro Founders',initials:'FF', cat:'comic',          img:'images/mascot.png',          desc:'An illustrated origin story of how Flagro Art Club came to be. Ink and color pencil.',                                  likes:79, comments:[], saved:false, liked:false },
  { id:18, title:'Digital Reverie',       artist:'Sana J.',        initials:'SJ', cat:'digital-art',    img:'images/Crying.jpeg',         desc:'Dreamy digital painting inspired by stream-of-consciousness art-making at 2am.',                                        likes:26, comments:[], saved:false, liked:false },
  { id:19, title:'Heritage Lines',        artist:'Amit C.',        initials:'AC', cat:'fine-art',       img:'images/Shrirang Bhaiya.jpeg', desc:'A graphite study of ancestral faces. Drawn from family photographs.',                                                 likes:48, comments:[], saved:false, liked:false },
  { id:20, title:'Neon Web',              artist:'Divya N.',       initials:'DN', cat:'comic',          img:'images/Spiderman.jpeg',      desc:'Vivid comic-book panel illustrating a web-slinger in dynamic motion. Inspired by classic Marvel aesthetics.',           likes:61, comments:[], saved:false, liked:false },
];

/* Seed some comments for demo */
ARTWORKS[0].comments = [{ author:'Priya R.', text:'Absolutely love the warmth in this piece!', time:'2d ago' }];
ARTWORKS[3].comments = [{ author:'Naina M.', text:'The detail is incredible!', time:'1d ago' }, { author:'Arjun S.', text:'My personal favourite from this semester.', time:'5h ago' }];
ARTWORKS[9].comments = [{ author:'Omar K.', text:'Flagro mascot forever! 🎨', time:'3d ago' }];

/* ════════════════════════════════════════
   STATE
════════════════════════════════════════ */
let currentFilter = 'all';
let currentSearch = '';
let currentIndex  = -1;
let currentPage   = 1;
const PAGE_SIZE   = 20;

/* ════════════════════════════════════════
   INIT
════════════════════════════════════════ */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('skeletonGrid').style.display = 'none';
    document.getElementById('gallery').style.display = 'block';
    renderGallery();
  }, 900);

  // Close share tooltip on outside click
  document.addEventListener('click', e => {
    const tt = document.getElementById('shareTooltip');
    if (!tt.contains(e.target)) tt.classList.remove('open');
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
    if (document.getElementById('lightbox').classList.contains('open')) {
      if (e.key === 'ArrowRight') navigateLightbox(1);
      if (e.key === 'ArrowLeft')  navigateLightbox(-1);
    }
  });
});

/* ════════════════════════════════════════
   RENDER GALLERY
════════════════════════════════════════ */
function getFilteredArtworks() {
  return ARTWORKS.filter(a => {
    const matchCat    = currentFilter === 'all' || a.cat === currentFilter;
    const matchSearch = !currentSearch ||
      a.title.toLowerCase().includes(currentSearch) ||
      a.artist.toLowerCase().includes(currentSearch) ||
      a.cat.toLowerCase().includes(currentSearch);
    return matchCat && matchSearch;
  });
}

function renderGallery() {
  const grid    = document.getElementById('gallery');
  const empty   = document.getElementById('emptyState');
  const label   = document.getElementById('resultLabel');
  const lmWrap  = document.getElementById('loadMoreWrap');
  const filtered = getFilteredArtworks();
  const visible  = filtered.slice(0, currentPage * PAGE_SIZE);

  grid.innerHTML = '';

  if (filtered.length === 0) {
    empty.style.display = 'block';
    label.textContent = 'No results found';
    lmWrap.style.display = 'none';
    return;
  }

  empty.style.display = 'none';
  label.textContent = `Showing ${visible.length} of ${filtered.length} artworks${currentSearch ? ' matching "' + currentSearch + '"' : ''}`;

  visible.forEach((art, idx) => {
    const card = buildCard(art, idx);
    grid.appendChild(card);
    card.style.animationDelay = `${(idx % PAGE_SIZE) * 0.04}s`;
  });

  lmWrap.style.display = filtered.length > visible.length ? 'block' : 'none';
}

function buildCard(art, idx) {
  const card = document.createElement('div');
  card.className   = 'art-card card-enter';
  card.dataset.id  = art.id;
  card.dataset.cat = art.cat;

  card.innerHTML = `
    <div class="card-img-wrap">
      <span class="art-tag">${catDisplayName(art.cat)}</span>
      <img class="art-canvas"
           src="${art.img}"
           alt="${art.title}"
           loading="lazy"
           onload="this.closest('.card-img-wrap').classList.remove('skeleton')"
      />
      <div class="card-actions" role="group" aria-label="Artwork actions">
        <div class="card-top-actions">
          <button class="icon-btn btn-save ${art.saved ? 'saved' : ''}"
            onclick="event.stopPropagation(); quickSave(${art.id}, this)"
            aria-label="${art.saved ? 'Saved' : 'Save artwork'}"
          >${art.saved ? 'Saved' : 'Save'}</button>
          <button class="icon-btn btn-like ${art.liked ? 'liked' : ''}"
            onclick="event.stopPropagation(); quickLike(${art.id}, this)"
            aria-label="${art.liked ? 'Unlike' : 'Like artwork'}"
          >
            <svg width="14" height="14" fill="${art.liked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <button class="icon-btn btn-share-sm"
            onclick="event.stopPropagation(); openShareTooltip(event, ${art.id})"
            aria-label="Share artwork"
          >
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </button>
        </div>
        <div class="card-bottom-actions">
          <div style="display:flex;gap:6px;">
            <button class="icon-btn btn-share-sm" style="width:auto;border-radius:20px;padding:0 10px;font-size:0.72rem;font-weight:600;color:#fff;background:rgba(0,0,0,0.45);"
              onclick="event.stopPropagation(); openLightbox(${art.id})"
              aria-label="View larger"
            >View Larger</button>
          </div>
          <div style="font-size:0.72rem;color:rgba(255,255,255,0.85);display:flex;align-items:center;gap:4px;">
            <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            ${art.likes}
          </div>
        </div>
      </div>
    </div>
    <div class="art-info">
      <h4>${art.title}</h4>
      <div class="artist-line">
        <div class="artist-avatar">${art.initials}</div>
        ${art.artist}
      </div>
      <div class="card-stats">
        <div class="card-stat-item">
          <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          ${art.likes}
        </div>
        <div class="card-stat-item">
          <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          ${art.comments.length}
        </div>
      </div>
    </div>`;

  card.addEventListener('click', e => {
    if (!e.target.closest('.card-actions')) openLightbox(art.id);
  });

  return card;
}

/* ════════════════════════════════════════
   FILTER & SEARCH
════════════════════════════════════════ */
function filterGallery(cat, btn) {
  currentFilter = cat;
  currentPage   = 1;
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  renderGallery();
}

function handleSearch(val) {
  currentSearch = val.toLowerCase().trim();
  currentPage   = 1;
  renderGallery();
}

function loadMore() {
  currentPage++;
  renderGallery();
}

/* ════════════════════════════════════════
   VIEW TOGGLE (grid / list)
════════════════════════════════════════ */
function setView(mode, btn) {
  document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const grid = document.getElementById('gallery');
  if (mode === 'list') {
    grid.style.columns = '2';
  } else {
    grid.style.columns = '';
  }
}

/* ════════════════════════════════════════
   QUICK ACTIONS (card hover)
════════════════════════════════════════ */
function quickSave(id, btn) {
  const art = ARTWORKS.find(a => a.id === id);
  if (!art) return;
  art.saved = !art.saved;
  btn.textContent = art.saved ? 'Saved' : 'Save';
  btn.classList.toggle('saved', art.saved);
  showToast(art.saved ? '🔖 Saved! See it below ↓' : 'Removed from saved');
  renderSavedSection();
}

function quickLike(id, btn) {
  const art = ARTWORKS.find(a => a.id === id);
  if (!art) return;
  art.liked  = !art.liked;
  art.likes += art.liked ? 1 : -1;
  const svg = btn.querySelector('svg');
  if (svg) svg.setAttribute('fill', art.liked ? 'currentColor' : 'none');
  btn.classList.toggle('liked', art.liked);
  showToast(art.liked ? '❤️ Liked!' : 'Unliked');
  const card = document.querySelector(`.art-card[data-id="${id}"]`);
  if (card) {
    const statItems = card.querySelectorAll('.card-stat-item');
    if (statItems[0]) statItems[0].lastChild.textContent = ' ' + art.likes;
  }
}

/* ════════════════════════════════════════
   LIGHTBOX
════════════════════════════════════════ */
function openLightbox(id) {
  const art = ARTWORKS.find(a => a.id === id);
  if (!art) return;

  const filtered = getFilteredArtworks();
  currentIndex   = filtered.findIndex(a => a.id === id);

  populateLightbox(art);

  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';

  document.getElementById('lb-prev').style.opacity = currentIndex > 0 ? '1' : '0.3';
  document.getElementById('lb-next').style.opacity = currentIndex < filtered.length - 1 ? '1' : '0.3';
}

function populateLightbox(art) {
  const img = document.getElementById('lb-img');
  img.src = art.img;
  img.alt = art.title;

  document.getElementById('lbImgPanel').classList.remove('zoomed');

  document.getElementById('lb-avatar').textContent = art.initials;
  document.getElementById('lb-artist-name').textContent = art.artist;
  document.getElementById('lb-artist-badge').textContent = catDisplayName(art.cat) + ' · Flagro Artist';
  document.getElementById('lb-title').textContent = art.title;
  document.getElementById('lb-category').innerHTML = `
    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" style="color:var(--orange)"><circle cx="5" cy="5" r="5"/></svg>
    ${catDisplayName(art.cat)}`;
  document.getElementById('lb-desc').textContent = art.desc;

  const likeBtn = document.getElementById('lb-like-btn');
  const heartIcon = document.getElementById('lb-heart-icon');
  likeBtn.classList.toggle('liked', art.liked);
  heartIcon.setAttribute('fill', art.liked ? 'currentColor' : 'none');
  document.getElementById('lb-like-count').textContent = art.likes;

  const saveBtn = document.getElementById('lb-save-btn');
  saveBtn.classList.toggle('saved', art.saved);
  saveBtn.innerHTML = `
    <svg width="14" height="14" fill="${art.saved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
    ${art.saved ? 'Saved' : 'Save'}`;

  renderComments(art);
}

function navigateLightbox(dir) {
  const filtered = getFilteredArtworks();
  const newIndex = currentIndex + dir;
  if (newIndex < 0 || newIndex >= filtered.length) return;
  currentIndex = newIndex;
  populateLightbox(filtered[currentIndex]);
  document.getElementById('lb-prev').style.opacity = currentIndex > 0 ? '1' : '0.3';
  document.getElementById('lb-next').style.opacity = currentIndex < filtered.length - 1 ? '1' : '0.3';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('lightbox').addEventListener('click', e => {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
});

function toggleZoom() {
  document.getElementById('lbImgPanel').classList.toggle('zoomed');
}

function viewFullscreen() {
  const src = document.getElementById('lb-img').src;
  window.open(src, '_blank', 'noopener');
}

/* ════════════════════════════════════════
   LIKE & SAVE (lightbox)
════════════════════════════════════════ */
function toggleLike() {
  const filtered = getFilteredArtworks();
  const art = filtered[currentIndex];
  if (!art) return;
  art.liked  = !art.liked;
  art.likes += art.liked ? 1 : -1;
  const likeBtn   = document.getElementById('lb-like-btn');
  const heartIcon = document.getElementById('lb-heart-icon');
  likeBtn.classList.toggle('liked', art.liked);
  heartIcon.setAttribute('fill', art.liked ? 'currentColor' : 'none');
  document.getElementById('lb-like-count').textContent = art.likes;
  showToast(art.liked ? '❤️ Liked!' : 'Unliked');
  refreshCard(art);
}

function toggleSave() {
  const filtered = getFilteredArtworks();
  const art = filtered[currentIndex];
  if (!art) return;
  art.saved = !art.saved;
  const saveBtn = document.getElementById('lb-save-btn');
  saveBtn.classList.toggle('saved', art.saved);
  saveBtn.innerHTML = `
    <svg width="14" height="14" fill="${art.saved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
    ${art.saved ? 'Saved' : 'Save'}`;
  showToast(art.saved ? '🔖 Saved! See it below ↓' : 'Removed from saved');
  refreshCard(art);
  renderSavedSection();
}

function refreshCard(art) {
  const card = document.querySelector(`.art-card[data-id="${art.id}"]`);
  if (!card) return;
  const statItems = card.querySelectorAll('.card-stat-item');
  if (statItems[0]) statItems[0].innerHTML = `
    <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
    ${art.likes}`;
}

/* ════════════════════════════════════════
   COMMENTS
════════════════════════════════════════ */
function renderComments(art) {
  const list = document.getElementById('commentList');
  const countEl = document.getElementById('comment-count');
  countEl.textContent = art.comments.length;
  list.innerHTML = art.comments.length === 0
    ? '<p style="font-size:0.78rem;color:var(--light);text-align:center;padding:12px 0;">Be the first to comment!</p>'
    : art.comments.map(c => `
        <div class="comment-item">
          <div class="comment-avatar">${c.author.split(' ').map(n=>n[0]).join('').substring(0,2)}</div>
          <div class="comment-bubble">
            <div class="comment-author">${c.author}</div>
            <div class="comment-text">${c.text}</div>
            <div class="comment-time">${c.time}</div>
          </div>
        </div>`).join('');
}

function postComment() {
  const input = document.getElementById('commentInput');
  const text  = input.value.trim();
  if (!text) return;

  const filtered = getFilteredArtworks();
  const art = filtered[currentIndex];
  if (!art) return;

  art.comments.push({ author: 'You', text, time: 'Just now' });
  renderComments(art);
  input.value = '';

  const card = document.querySelector(`.art-card[data-id="${art.id}"]`);
  if (card) {
    const statItems = card.querySelectorAll('.card-stat-item');
    if (statItems[1]) statItems[1].innerHTML = `
      <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      ${art.comments.length}`;
  }

  showToast('💬 Comment posted!');
}

/* ════════════════════════════════════════
   SHARE
════════════════════════════════════════ */
function openShareTooltip(e, id) {
  e.stopPropagation();
  const tt = document.getElementById('shareTooltip');
  tt.classList.add('open');
  tt.style.top  = (e.clientY - 140) + 'px';
  tt.style.left = (e.clientX - 80)  + 'px';
}

function shareVia(platform) {
  const filtered = getFilteredArtworks();
  const art = currentIndex >= 0 ? filtered[currentIndex] : null;
  const title = art ? art.title : 'Flagro Art Gallery';
  const url   = window.location.href;

  if (platform === 'copy') {
    navigator.clipboard?.writeText(url).then(() => showToast('🔗 Link copied to clipboard!'));
  } else if (platform === 'twitter') {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out "' + title + '" on Flagro Art Gallery!')}&url=${encodeURIComponent(url)}`, '_blank');
  } else if (platform === 'whatsapp') {
    window.open(`https://wa.me/?text=${encodeURIComponent('Check out "' + title + '" on Flagro Art Gallery! ' + url)}`, '_blank');
  }
  document.getElementById('shareTooltip').classList.remove('open');
}

/* ════════════════════════════════════════
   HELPERS
════════════════════════════════════════ */
function catDisplayName(cat) {
  const m = { 'fine-art':'Fine Art', 'comic':'Comic', 'digital-art':'Digital Art', 'graphic-design':'Graphic Design', 'sculpture':'Sculpture' };
  return m[cat] || cat;
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3500);
}

/* ════════════════════════════════════════
   SAVED ARTWORKS SECTION
════════════════════════════════════════ */
function renderSavedSection() {
  const saved   = ARTWORKS.filter(a => a.saved);
  const section = document.getElementById('savedSection');
  const grid    = document.getElementById('savedGrid');
  const badge   = document.getElementById('savedCountBadge');

  badge.textContent = saved.length;
  section.classList.toggle('has-items', saved.length > 0);
  grid.innerHTML = '';

  if (saved.length === 0) return;

  saved.forEach(art => {
    const card = document.createElement('div');
    card.className = 'saved-card';
    card.innerHTML = `
      <img class="saved-card-img" src="${art.img}" alt="${art.title}" loading="lazy" />
      <div class="saved-card-info">
        <div class="saved-card-title">${art.title}</div>
        <div class="saved-card-artist">${art.artist}</div>
        <div class="saved-card-actions">
          <button class="btn-unsave" onclick="event.stopPropagation(); unsaveFromSection(${art.id})">
            <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Remove
          </button>
          <button class="btn-open-saved" onclick="event.stopPropagation(); openLightbox(${art.id})">
            View →
          </button>
        </div>
      </div>`;
    card.addEventListener('click', () => openLightbox(art.id));
    grid.appendChild(card);
  });

  if (saved.length === 1) {
    setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'start' }), 400);
  }
}

function unsaveFromSection(id) {
  const art = ARTWORKS.find(a => a.id === id);
  if (!art) return;
  art.saved = false;
  const card = document.querySelector(`.art-card[data-id="${id}"]`);
  if (card) {
    const saveBtn = card.querySelector('.btn-save');
    if (saveBtn) { saveBtn.textContent = 'Save'; saveBtn.classList.remove('saved'); }
  }
  renderSavedSection();
  showToast('Removed from saved');
}

function clearAllSaved() {
  ARTWORKS.forEach(a => a.saved = false);
  document.querySelectorAll('.btn-save').forEach(btn => { btn.textContent = 'Save'; btn.classList.remove('saved'); });
  renderSavedSection();
  showToast('🗑️ Cleared all saved artworks');
}

/* ════════════════════════════════════════
   SUBMIT FORM
════════════════════════════════════════ */
function previewFile(input) {
  if (!input.files?.[0]) return;
  const reader = new FileReader();
  reader.onload = ev => {
    document.getElementById('previewImg').src = ev.target.result;
    document.getElementById('uploadPreview').style.display = 'block';
  };
  reader.readAsDataURL(input.files[0]);
}

async function handleSubmit(e) {
  e.preventDefault();
  const btn    = document.getElementById('submitBtn');
  const title  = document.getElementById('fTitle').value.trim();
  const artist = document.getElementById('fArtist').value.trim();
  if (!title || !artist) return;
  btn.disabled = true; btn.textContent = 'Submitting…';
  await new Promise(r => setTimeout(r, 700));
  showToast('✅ Submitted! Thank you for sharing your artwork.');
  e.target.reset();
  document.getElementById('uploadPreview').style.display = 'none';
  document.getElementById('previewImg').src = '';
  btn.disabled = false; btn.textContent = 'Submit for Review';
}

/* Block right-click on images */
document.addEventListener('contextmenu', e => {
  if (e.target.tagName === 'IMG') e.preventDefault();
});
