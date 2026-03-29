/* ============================================================
   script.js — ArtClub  (Buy & Commission)
   All behaviour and interactivity lives here.
   No styles are set directly — CSS classes are toggled instead.
   ============================================================ */


/* ---- 1. ARTWORK DATA ---- */
/*
  Each object represents one painting in the gallery.
  Fields used:
    id     – unique number used to find the card's Buy button later
    title  – display name
    artist – artist's name shown under the title
    price  – base price in INR (integer, no symbols)
    img    – Unsplash URL for the artwork photo
*/
const artworks = [
  { id: 1, title: "Sunset Bloom",     artist: "Aria Chen",   price: 4500, img: "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=500&q=80" },
  { id: 2, title: "Urban Echo",       artist: "Marcus Lee",  price: 3200, img: "https://images.unsplash.com/photo-1549490349-8643362247b5?w=500&q=80" },
  { id: 3, title: "Digital Serenity", artist: "Kai Tanaka",  price: 8500, img: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&q=80" },
  { id: 4, title: "Wild Garden",      artist: "Leo Kim",     price: 5800, img: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=500&q=80" },
  { id: 5, title: "Neon Portrait",    artist: "Zara Patel",  price: 3800, img: "https://images.unsplash.com/photo-1515405295579-ba7b45403062?w=500&q=80" },
  { id: 6, title: "Abstract Motion",  artist: "Nina Okafor", price: 6700, img: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=500&q=80" },
  { id: 7, title: "Golden Dust",      artist: "Aria Chen",   price: 7200, img: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=500&q=80" },
  { id: 8, title: "Still Waters",     artist: "Kai Tanaka",  price: 4100, img: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=500&q=80" },
];


/* ---- 2. RUNTIME STATE ---- */
/*
  selectedArt holds the artwork object the user clicked "Buy Now" on.
  It is set in openCheckout() and read by buildSummary() & buildConfirmation().
*/
let selectedArt = null;


/* ---- 3. BUILD THE GALLERY ---- */
/*
  Runs once on load.
  Creates one .art-card element per artwork and appends it to #galleryGrid.
  The Buy button passes the artwork id to openCheckout() via an inline onclick.
*/
const grid = document.getElementById('galleryGrid');

artworks.forEach(function(artwork) {

  // Create the card wrapper
  const card = document.createElement('div');
  card.className = 'art-card';

  // Inject the inner HTML using the artwork data
  card.innerHTML = `
    <div class="art-img-wrap">
      <img src="${artwork.img}" alt="${artwork.title}" loading="lazy">
    </div>
    <div class="art-card-body">
      <div class="art-card-top">
        <div class="art-title">${artwork.title}</div>
        <div class="price-badge">₹${artwork.price.toLocaleString('en-IN')}</div>
      </div>
      <div class="art-artist">${artwork.artist}</div>
      <button class="btn-buy" id="btn-${artwork.id}" onclick="openCheckout(${artwork.id})">
        <!-- Shopping bag icon -->
        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        Buy Now
      </button>
    </div>
  `;

  grid.appendChild(card);
});


/* ---- 4. SECTION SWITCHING ---- */
/*
  Called by the nav-tab onclick attributes in index.html.
  Hides all .section elements and removes .active from all tabs,
  then activates the requested section and the clicked tab.

  Parameters:
    id  – the HTML id of the <section> to show ('gallery' or 'commission')
    btn – the button element that was clicked (so we can mark it active)
*/
function showSection(id, btn) {
  // Hide every section
  document.querySelectorAll('.section').forEach(function(sec) {
    sec.classList.remove('active');
  });

  // Deactivate every nav tab
  document.querySelectorAll('.nav-tab').forEach(function(tab) {
    tab.classList.remove('active');
  });

  // Show the target section and mark this tab active
  document.getElementById(id).classList.add('active');
  btn.classList.add('active');

  // Smooth-scroll to the top of the page
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


/* ---- 5. MODAL OPEN / CLOSE ---- */
/*
  openCheckout(id)
    Finds the artwork by id, stores it in selectedArt,
    shows the modal, and starts on step 1.
*/
function openCheckout(id) {
  selectedArt = artworks.find(function(a) { return a.id === id; });
  goStep(1);
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden'; // prevent page scroll behind modal
}

/*
  closeModal()
    Hides the modal and restores normal page scrolling.
*/
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

/*
  closeOutside(event)
    Called when the dark overlay itself is clicked.
    Closes only if the click target is the overlay (not the modal card inside).
*/
function closeOutside(event) {
  if (event.target === document.getElementById('modalOverlay')) {
    closeModal();
  }
}


/* ---- 6. STEP NAVIGATION ---- */
/*
  goStep(n)
    Shows the requested step panel, hides the others,
    and updates the progress dots at the top of the modal.

  Parameters:
    n – step number 1–4
*/
function goStep(n) {
  // Show/hide each step panel and colour the matching dot
  [1, 2, 3, 4].forEach(function(i) {
    document.getElementById('step' + i).style.display = (i === n) ? 'block' : 'none';

    const dot = document.getElementById('sd' + i);
    if      (i < n) { dot.className = 'step-dot done'; }   // completed
    else if (i === n){ dot.className = 'step-dot active'; } // current
    else             { dot.className = 'step-dot'; }        // upcoming
  });

  // Step-specific setup
  if (n === 2) { buildSummary(); }      // populate price breakdown
  if (n === 3) {
    // Copy the total from step 2 into the payment instruction
    document.getElementById('pay-amt').textContent =
      document.getElementById('s-total').textContent;
  }
  if (n === 4) { buildConfirmation(); } // generate order ID and receipt
}


/* ---- 7. STEP 2 — BUILD ORDER SUMMARY ---- */
/*
  buildSummary()
    Calculates fees and fills the price breakdown table
    with data from selectedArt.

  Price formula:
    Platform fee = 5% of artwork price (rounded)
    Total        = art + platform fee + ₹150 packaging + ₹80 delivery
*/
function buildSummary() {
  if (!selectedArt) { return; }

  // Artwork thumbnail + title
  document.getElementById('sum-img').src          = selectedArt.img;
  document.getElementById('sum-title').textContent = selectedArt.title;

  // Price calculations
  const artPrice    = selectedArt.price;
  const platformFee = Math.round(artPrice * 0.05);
  const total       = artPrice + platformFee + 150 + 80;

  // Inject formatted values (en-IN locale = Indian number formatting)
  document.getElementById('s-art').textContent   = '₹' + artPrice.toLocaleString('en-IN');
  document.getElementById('s-plat').textContent  = '₹' + platformFee.toLocaleString('en-IN');
  document.getElementById('s-total').textContent = '₹' + total.toLocaleString('en-IN');
}


/* ---- 8. STEP 4 — BUILD CONFIRMATION & RECEIPT ---- */
/*
  buildConfirmation()
    Generates a pseudo-random order ID, fills the receipt card,
    and marks the original gallery "Buy Now" button as purchased.
*/
function buildConfirmation() {
  // Generate order ID from the last 6 digits of the current timestamp
  const orderId = '#ORD-' + Date.now().toString().slice(-6);

  // Order ID and email display
  document.getElementById('conf-oid').textContent   = orderId;
  document.getElementById('conf-email').textContent =
    document.getElementById('b-email').value || 'your email';

  // Receipt fields
  document.getElementById('r-title').textContent = selectedArt.title;
  document.getElementById('r-name').textContent  =
    document.getElementById('b-name').value || '—';

  // Recalculate totals for the receipt (same formula as buildSummary)
  const artPrice    = selectedArt.price;
  const platformFee = Math.round(artPrice * 0.05);
  const total       = artPrice + platformFee + 150 + 80;

  document.getElementById('r-art').textContent   = '₹' + artPrice.toLocaleString('en-IN');
  document.getElementById('r-plat').textContent  = '₹' + platformFee.toLocaleString('en-IN');
  document.getElementById('r-total').textContent = '₹' + total.toLocaleString('en-IN');

  // Mark the gallery button for this artwork as "Added to Cart"
  const buyBtn = document.getElementById('btn-' + selectedArt.id);
  if (buyBtn) {
    buyBtn.classList.add('added');  // CSS turns it green and disables pointer events
    buyBtn.innerHTML =
      `<svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
         <polyline points="20 6 9 17 4 12"/>
       </svg>
       Added to Cart`;
  }
}


/* ---- 9. UPI ID COPY TO CLIPBOARD ---- */
/*
  copyUPI()
    Copies the UPI ID string to the clipboard.
    Temporarily replaces the chip text with "✓ Copied!" as feedback,
    then restores the original after 2 seconds.
*/
function copyUPI() {
  navigator.clipboard.writeText('artclub@upi').then(function() {
    const chip = document.querySelector('.upi-chip');

    // Show confirmation text
    chip.innerHTML = '✓ Copied!';

    // Restore original chip content after 2 s
    setTimeout(function() {
      chip.innerHTML =
        `<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
           <rect x="9" y="9" width="13" height="13" rx="2"/>
           <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
         </svg>
         artclub@upi`;
    }, 2000);
  });
}


/* ---- 10. COMMISSION — PRE-SELECT ARTIST ---- */
/*
  selectArtist(name)
    Called when a user clicks "Request Commission" on an artist card.
    Sets the dropdown in the form and scrolls it into view.

  Parameter:
    name – exact option value string matching one of the <option> values
*/
function selectArtist(name) {
  document.getElementById('c-artist').value = name;
  document.getElementById('c-artist').scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });
}


/* ---- 11. COMMISSION — FILE UPLOAD LABEL ---- */
/*
  handleUpload(event)
    When a user picks a file, updates the paragraph inside the
    upload area to show the chosen filename (instead of the placeholder).
*/
function handleUpload(event) {
  const file = event.target.files[0];
  if (file) {
    document.getElementById('uploadLabel').textContent = '✓ ' + file.name;
  }
}


/* ---- 12. COMMISSION — FORM SUBMIT ---- */
/*
  submitCommission()
    Validates that all required fields are filled.
    If valid: fades out the form and shows the success banner.
    If invalid: alerts the user.

  Required field ids: c-name, c-email, c-phone, c-budget, c-desc
*/
function submitCommission() {
  const requiredIds = ['c-name', 'c-email', 'c-phone', 'c-budget', 'c-desc'];

  for (let i = 0; i < requiredIds.length; i++) {
    if (!document.getElementById(requiredIds[i]).value.trim()) {
      alert('Please fill all required fields.');
      return; // stop — do not submit
    }
  }

  // Dim and disable the form to prevent double-submission
  const formCard = document.querySelector('.comm-form-card');
  formCard.style.opacity       = '0.4';
  formCard.style.pointerEvents = 'none';

  // Show and scroll to the success banner
  const banner = document.getElementById('commissionSuccess');
  banner.classList.add('show');
  banner.scrollIntoView({ behavior: 'smooth' });
}
