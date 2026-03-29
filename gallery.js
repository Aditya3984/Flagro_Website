/* ════════════════════════════════════════════════════════
   FAGLEO GALLERY — script.js
   ════════════════════════════════════════════════════════

   GOOGLE DRIVE CONFIG
   ─────────────────────────────────────────────────────────
   To enable live Google Drive sync:
     1. Deploy the Apps Script (see setup guide in index.html)
     2. Paste your Web App URL into APPS_SCRIPT_URL below
     3. Set DRIVE_MODE = true

   ════════════════════════════════════════════════════════ */

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
const DRIVE_MODE      = false; // ← set true after deploying Apps Script

/* ────────────────────────────────────────────────────────
   STATE
──────────────────────────────────────────────────────── */
let submissions = []; // holds all submitted artworks

/* ────────────────────────────────────────────────────────
   INIT — runs on page load
──────────────────────────────────────────────────────── */
if (DRIVE_MODE) {
  // Switch status bar to "connected" look
  document.getElementById('driveBar').className = 'drive-bar';
  document.getElementById('driveStatusText').innerHTML =
    'Connected to Google Drive · Folder: <strong>fagleo-art-submissions</strong> · Admin approvals sync automatically';
  loadFromDrive();
}

/* ════════════════════════════════════════════════════════
   GALLERY FILTER
   ════════════════════════════════════════════════════════ */

/**
 * Filter gallery cards by category.
 * @param {string} cat  - category slug, or 'all'
 * @param {Element} btn - the clicked pill button
 */
function filterGallery(cat, btn) {
  // Update active pill
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');

  // Show / hide cards
  document.querySelectorAll('.art-card').forEach(card => {
    const isMatch = cat === 'all' || card.dataset.cat === cat;
    card.classList.toggle('hidden', !isMatch);
  });
}

/* ════════════════════════════════════════════════════════
   LIGHTBOX
   ════════════════════════════════════════════════════════ */

/**
 * Open the lightbox with artwork details.
 * @param {string}  title  - artwork title
 * @param {string}  artist - artist name
 * @param {string}  cat    - category label
 * @param {string}  desc   - artwork description
 * @param {Element} card   - the clicked .art-card element
 */
function openLightbox(title, artist, cat, desc, card) {
  const imgEl = card.querySelector('img');
  const svgEl = card.querySelector('svg.art-canvas');

  // Populate lightbox content
  document.getElementById('lb-svg').innerHTML = imgEl
    ? `<img src="${imgEl.src}" style="width:100%;display:block;max-height:300px;object-fit:cover"/>`
    : (svgEl ? svgEl.outerHTML : '');

  document.getElementById('lb-title').textContent  = title;
  document.getElementById('lb-artist').textContent = `${artist} · ${cat}`;
  document.getElementById('lb-desc').textContent   = desc;
  document.getElementById('lb-cat').textContent    = cat;

  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

/**
 * Close the lightbox.
 * If called from a click event, only closes when clicking the backdrop or X button.
 * @param {Event} [e] - optional click event
 */
function closeLightbox(e) {
  const backdrop  = document.getElementById('lightbox');
  const clickedBackdrop  = e && e.target === backdrop;
  const clickedCloseBtn  = e && e.target.closest('.lb-close');

  if (!e || clickedBackdrop || clickedCloseBtn) {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ════════════════════════════════════════════════════════
   FILE UPLOAD PREVIEW
   ════════════════════════════════════════════════════════ */

/**
 * Show a preview of the selected image file.
 * @param {HTMLInputElement} input - the file input element
 */
function previewFile(input) {
  if (!input.files || !input.files[0]) return;

  const reader = new FileReader();
  reader.onload = ev => {
    document.getElementById('previewImg').src = ev.target.result;
    document.getElementById('uploadPreview').style.display = 'block';
  };
  reader.readAsDataURL(input.files[0]);
}

/* ════════════════════════════════════════════════════════
   FORM SUBMISSION
   ════════════════════════════════════════════════════════ */

/**
 * Handle the artwork submission form.
 * Collects form data, optionally uploads to Google Drive,
 * and adds the submission to the pending queue.
 * @param {Event} e - form submit event
 */
async function handleSubmit(e) {
  e.preventDefault();

  const btn    = document.getElementById('submitBtn');
  const title  = document.getElementById('fTitle').value.trim();
  const artist = document.getElementById('fArtist').value.trim();
  const cat    = document.getElementById('fCat').value;
  const desc   = document.getElementById('fDesc').value.trim();
  const file   = document.getElementById('fFile').files[0];

  if (!title || !artist) return;

  btn.disabled    = true;
  btn.textContent = 'Uploading…';

  // Read image as base64 if provided
  let imgData = null;
  if (file) {
    imgData = await readFileAsDataURL(file);
  }

  // Build submission object
  const sub = {
    id:        Date.now(),
    title,
    artist,
    cat,
    desc,
    imgData,
    status:    'pending',
    timestamp: new Date().toLocaleString()
  };

  // Save to Google Drive (live mode) or simulate a delay (demo mode)
  if (DRIVE_MODE) {
    try {
      btn.textContent = 'Saving to Drive…';
      await fetch(APPS_SCRIPT_URL, {
        method:  'POST',
        mode:    'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(sub)
      });
      showToast('✅ Submitted & saved to Google Drive — awaiting review!');
    } catch (err) {
      showToast('⚠️ Drive error — saved locally.');
    }
  } else {
    await delay(700); // simulate network
    showToast('✅ Submitted! Awaiting admin review before going live.');
  }

  // Add to local state and update UI
  submissions.push(sub);
  updateBadge();
  resetForm(e.target, btn);
}

/**
 * Read a file as a base64 data URL.
 * @param {File} file
 * @returns {Promise<string>}
 */
function readFileAsDataURL(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = ev => resolve(ev.target.result);
    reader.readAsDataURL(file);
  });
}

/** Simple promise-based delay. */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/** Reset form fields and preview image after submission. */
function resetForm(formEl, btn) {
  formEl.reset();
  document.getElementById('uploadPreview').style.display = 'none';
  document.getElementById('previewImg').src = '';
  btn.disabled    = false;
  btn.textContent = 'Submit for Review';
}

/* ════════════════════════════════════════════════════════
   TOAST NOTIFICATION
   ════════════════════════════════════════════════════════ */

/**
 * Show a toast message that auto-hides after 4 seconds.
 * @param {string} msg - message to display
 */
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

/* ════════════════════════════════════════════════════════
   ADMIN BADGE
   ════════════════════════════════════════════════════════ */

/** Update the pending-count badge on the Admin Float button. */
function updateBadge() {
  const pendingCount = submissions.filter(s => s.status === 'pending').length;
  const badge = document.getElementById('adminBadge');
  badge.textContent = pendingCount;
  badge.classList.toggle('show', pendingCount > 0);
}

/* ════════════════════════════════════════════════════════
   ADMIN PANEL
   ════════════════════════════════════════════════════════ */

/** Open the admin panel and re-render submission list. */
function openAdmin() {
  renderAdmin();
  document.getElementById('adminPanel').classList.add('open');
  document.body.style.overflow = 'hidden';
}

/**
 * Close admin panel on backdrop click.
 * @param {Event} e
 */
function closeAdmin(e) {
  if (e.target === document.getElementById('adminPanel')) closeAdminDirect();
}

/** Close admin panel directly (e.g. from X button or Escape key). */
function closeAdminDirect() {
  document.getElementById('adminPanel').classList.remove('open');
  document.body.style.overflow = '';
}

/**
 * Convert a category slug to a human-readable label.
 * @param {string} val - category slug
 * @returns {string}
 */
function catLabel(val) {
  const labels = {
    'fine-art':      'Fine Art',
    'photography':   'Photography',
    'digital-art':   'Digital Art',
    'graphic-design':'Graphic Design',
    'sculpture':     'Sculpture'
  };
  return labels[val] || val;
}

/** Render all submissions inside the admin panel. */
function renderAdmin() {
  const body = document.getElementById('adminBody');

  // Show/hide empty state
  document.getElementById('adminEmpty').style.display = submissions.length ? 'none' : 'block';

  // Remove previously rendered rows
  body.querySelectorAll('.pending-item').forEach(el => el.remove());

  const statusLabels = {
    pending:  '⏳ Pending Review',
    approved: '✅ Approved',
    rejected: '❌ Rejected'
  };

  // Render newest first
  submissions.slice().reverse().forEach(sub => {
    const div = document.createElement('div');
    div.className = 'pending-item';
    div.id        = `pi-${sub.id}`;

    const thumbHtml = sub.imgData
      ? `<img src="${sub.imgData}" alt="${sub.title}"/>`
      : `<svg viewBox="0 0 76 76" xmlns="http://www.w3.org/2000/svg">
           <rect width="76" height="76" fill="#f0e8df"/>
           <circle cx="28" cy="32" r="16" fill="#d4a57a" opacity=".5"/>
           <circle cx="50" cy="44" r="20" fill="#c8bdb5" opacity=".4"/>
         </svg>`;

    const actionsHtml = sub.status === 'pending'
      ? `<div class="pi-actions">
           <button class="btn-approve" onclick="approveSubmission(${sub.id})">✓ Approve & Publish</button>
           <button class="btn-reject"  onclick="rejectSubmission(${sub.id})">✕ Reject</button>
         </div>`
      : '';

    div.innerHTML = `
      <div class="pi-thumb">${thumbHtml}</div>
      <div class="pi-info">
        <h4>${sub.title}</h4>
        <p class="pi-meta">${sub.artist} · ${catLabel(sub.cat)} · ${sub.timestamp}</p>
        <p class="pi-desc">${sub.desc || 'No description.'}</p>
        <span class="pi-status ${sub.status}">${statusLabels[sub.status]}</span>
        ${actionsHtml}
      </div>`;

    body.appendChild(div);
  });
}

/* ════════════════════════════════════════════════════════
   APPROVE / REJECT SUBMISSIONS
   ════════════════════════════════════════════════════════ */

/**
 * Approve a submission — adds its card to the live gallery.
 * @param {number} id - submission id
 */
async function approveSubmission(id) {
  const sub = submissions.find(s => s.id === id);
  if (!sub) return;

  sub.status = 'approved';

  if (DRIVE_MODE) {
    try {
      await fetch(`${APPS_SCRIPT_URL}?action=approve&id=${id}`, { method: 'GET', mode: 'no-cors' });
    } catch (e) { /* silent fail */ }
  }

  addApprovedCard(sub);
  updateBadge();
  renderAdmin();
  showToast(`✅ "${sub.title}" is now live in the gallery!`);
}

/**
 * Reject a submission — removes it from the gallery queue.
 * @param {number} id - submission id
 */
async function rejectSubmission(id) {
  const sub = submissions.find(s => s.id === id);
  if (!sub) return;

  sub.status = 'rejected';

  if (DRIVE_MODE) {
    try {
      await fetch(`${APPS_SCRIPT_URL}?action=reject&id=${id}`, { method: 'GET', mode: 'no-cors' });
    } catch (e) { /* silent fail */ }
  }

  updateBadge();
  renderAdmin();
  showToast(`❌ "${sub.title}" rejected and will not appear in gallery.`);
}

/**
 * Create and animate a new gallery card for an approved submission.
 * @param {Object} sub - submission object
 */
function addApprovedCard(sub) {
  const grid = document.getElementById('gallery');
  const card = document.createElement('div');
  card.className    = 'art-card';
  card.dataset.cat  = sub.cat;

  const imgHtml = sub.imgData
    ? `<img src="${sub.imgData}" style="width:100%;display:block;max-height:280px;object-fit:cover"/>`
    : `<svg class="art-canvas" viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
         <rect width="300" height="220" fill="#f0e8df"/>
         <circle cx="100" cy="110" r="60" fill="#d4a57a" opacity=".5"/>
         <circle cx="200" cy="110" r="60" fill="#c8bdb5" opacity=".4"/>
       </svg>`;

  card.innerHTML = `
    <span class="art-tag">${catLabel(sub.cat)}</span>
    ${imgHtml}
    <div class="art-info">
      <h4>${sub.title}</h4>
      <span>${sub.artist} · ${catLabel(sub.cat)}</span>
    </div>`;

  // Wire up lightbox on click
  card.onclick = () => {
    const svgEl = card.querySelector('svg.art-canvas');
    const imgEl = card.querySelector('img');

    document.getElementById('lb-svg').innerHTML = imgEl
      ? `<img src="${imgEl.src}" style="width:100%;display:block;max-height:300px;object-fit:cover"/>`
      : (svgEl ? svgEl.outerHTML : '');

    document.getElementById('lb-title').textContent  = sub.title;
    document.getElementById('lb-artist').textContent = `${sub.artist} · ${catLabel(sub.cat)}`;
    document.getElementById('lb-desc').textContent   = sub.desc || '';
    document.getElementById('lb-cat').textContent    = catLabel(sub.cat);

    document.getElementById('lightbox').classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  // Animate card in
  card.style.opacity   = '0';
  card.style.transform = 'scale(0.92)';
  grid.prepend(card);

  requestAnimationFrame(() => {
    card.style.transition = 'opacity 0.45s, transform 0.45s';
    card.style.opacity    = '1';
    card.style.transform  = 'scale(1)';
  });
}

/* ════════════════════════════════════════════════════════
   GOOGLE DRIVE SYNC (live mode only)
   ════════════════════════════════════════════════════════ */

/** Load previously submitted & approved artworks from Google Drive. */
async function loadFromDrive() {
  try {
    const res  = await fetch(`${APPS_SCRIPT_URL}?action=list`);
    const data = await res.json();

    submissions = data.submissions || [];

    // Render approved submissions into gallery
    submissions
      .filter(s => s.status === 'approved')
      .forEach(addApprovedCard);

    updateBadge();
  } catch (e) {
    console.log('Drive load error:', e);
  }
}

/* ════════════════════════════════════════════════════════
   KEYBOARD SHORTCUT — Escape closes any open modal
   ════════════════════════════════════════════════════════ */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeLightbox({ target: document.getElementById('lightbox') });
    closeAdminDirect();
  }
});
