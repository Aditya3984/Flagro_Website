/* =============================================
   Flagro_HomePage — script.js
   ============================================= */

// =============================================
// TAILWIND CONFIG
// =============================================
tailwind.config = {
  theme: {
    extend: {
      colors: {
        'terra':       '#C8745A',
        'terra-soft':  '#D6A190',
        'olive':       '#8FA47C',
        'bark':        '#2B1F1B',
        'beige':       '#F5F3EF',
        'beige-dark':  '#E8DED2',
        'footer-bg':   '#161212',
        'muted':       '#6B6B6B'
      },
      fontFamily: {
        'heading': ['"Playfair Display"', 'serif'],
        'body':    ['"DM Sans"', 'sans-serif']
      }
    }
  }
};


// =============================================
// SLIDER
// =============================================


//---------------Background Images for Hero Section
const sliderImages = [
  {image: "images/Jesus.jpeg",          logo:"images/FlagroWhiteLogo.png" },
  {image: "images/Spiderman.jpeg",      logo:"images/FlagroWhiteLogo.png" },
  {image: "images/Crying.jpeg",         logo:"images/FlagroWhiteLogo.png"},
  {image: "images/Buddha.jpeg",         logo:"images/FlagroWhiteLogo.png"},
];

let currentSlide = 0;


//----------------Sliding Bcakground For Hero Section--------------
function initSlider() {
  const track = document.getElementById('sliderTrack');
  const dotsContainer = document.getElementById('sliderDots');
  const logo   = document.getElementById('heroLogo');

  sliderImages.forEach((img, idx) => {
    // Slide element
    const slide = document.createElement('div');
    slide.style.width      = '100%';
    slide.style.height     = '100%';
    slide.style.background = `url('${img.image}')`;
    slide.style.position   = 'absolute';
    slide.style.top        = '0';
    slide.style.left       = '0';
    slide.style.opacity    = idx === 0 ? '1' : '0';
    slide.style.transition = 'opacity 0.6s ease';
    slide.dataset.slide    = idx;
    track.appendChild(slide);


    const logo = document.createElement('div');
    logo.style.width      = '100%';
    logo.style.height     = '100%';
    logo.style.background = `url('${img.logo}')`;
    logo.style.position   = 'absolute';
    logo.style.top        = '0';
    logo.style.left       = '0';
    logo.style.opacity    = idx === 0 ? '1' : '0';
    logo.style.transition = 'opacity 0.6s ease';
    logo.dataset.slide    = idx;
    track.appendChild(slide);

    // Dot element
    const dot = document.createElement('button');
    dot.style.width        = '10px';
    dot.style.height       = '10px';
    dot.style.borderRadius = '50%';
    dot.style.background   = idx === 0 ? 'white' : 'rgba(255,255,255,0.5)';
    dot.style.border       = 'none';
    dot.style.cursor       = 'pointer';
    dot.style.transition   = 'background 0.3s ease';
    dot.onclick = () => goToSlide(idx);
    dotsContainer.appendChild(dot);
  });
 
}

function goToSlide(n) {
  currentSlide = n;
  const slides = document.querySelectorAll('#sliderTrack div');
  const dots   = document.querySelectorAll('#sliderDots button');
  const logo   = document.getElementById('#heroLogo div');

  slides.forEach(s => s.style.opacity = '0');
  dots.forEach(d => d.style.background = 'rgba(255,255,255,0.5)');

  slides[currentSlide].style.opacity = '1';
  dots[currentSlide].style.background = 'white';
  logo.src = sliderImages[currentSlide].logo;   // CHANGE LOGO HERE
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % sliderImages.length;
  goToSlide(currentSlide);
}

// Auto-advance slider on mouse move over hero
document.addEventListener('mousemove', (e) => {
  const hero = document.querySelector('header');
  const rect = hero.getBoundingClientRect();
  if (e.clientY < rect.bottom) {
    if (!window.sliderActive) {
      window.sliderActive = true;
      setInterval(nextSlide, 4000);
    }
  }
});


// =============================================
// DATA
// =============================================
const galleryItems = [
  { cat: 'sunset',    title: 'Jesus',        artist: "John",         image: "images/Jesus.jpeg"    },
  { cat: 'fine',      title: 'Buddha',       artist: 'Maya Chen',    image: "images/Buddha.jpeg"   },
  { cat: 'photo',     title: 'Spiderman',    artist: 'Leo Park',     image: "images/Spiderman.jpeg"},
  { cat: 'digital',   title: 'Crying',       artist: 'Aria Ross',    image: "images/Crying.jpeg"   },
];

const eventItems = [
  {  title: 'INFLUX',   date: 'Mar 15, 2024', desc: ' Meet the club, meet the members. New batch orientation starts now!',    img: "images/Jesus.jpeg" },
  {  title: 'Artsy Day',  date: 'Apr 02, 2024', desc: 'Halloween Edition - A Face Painting Fusion with Callixto our Fashion Club',     img: "images/Jesus.jpeg" },
  {  title: 'Bridge by Brushes',   date: 'Apr 18, 2024', desc: 'KYRAT 2026  –  The Creative Twist: Double the passion, double the fun ',   img: "images/Jesus.jpeg" },
  {  title: 'Colourful Whispers',     date: 'May 05, 2024', desc: ' Republic Day Exhibition - Annual showcase of emerging artists',      img: "images/Jesus.jpeg" },
  {  title: 'CANVASK',    date: 'May 22, 2024', desc: 'A niche quiz exploring the vibrant world of art, from iconic movements to the hidden stories behind visual culture with Qcell',    img: "images/Jesus.jpeg" },
  {  title: 'Artsy Day',            date: 'Jun 10, 2024', desc: 'Beach Edition   Artsy Day...On the Beach?!  Yes we did ',     img: "images/Jesus.jpeg" },
];

const teamMembers = [
  { name: 'Dr. Senthil Raani KS',    role: 'Club Faculty Advisor',    image: "images/Jesus.jpeg"},
  { name: 'Shrirang Khirade',   role: 'Club Coordinator', image: "images/Shri Bhaiya.png"},
  { name: 'Saksham Srivastava',  role: 'Club Coordinator',     image: "images/Jesus.jpeg"},
];

const newsItems = [
  { title: 'Art Magazine', badge: 'Exhibition',   date: 'March 15, 2024', desc: 'Join us for our most vibrant showcase yet.'        },
  { title: 'Independence day',  badge: 'Announcement', date: 'March 8, 2024',  desc: 'Annual Art Exhibition on 15 aug  2026.'         },
  { title: 'Buy My Art Section',  badge: 'Event',        date: 'April 2, 2024',  desc: 'Learn cutting-edge digital techniques.'             }
];

const contactCards = [
  { icon: 'instagram',      label: 'Flagro',     value: 'flagro_iiserbpr',       link: 'https://www.instagram.com/flagro_iiserbpr?igsh=MWNkejVqMnVpNjBveg==' },
  { icon: 'instagram', label: 'Pictopia', value: 'pictopia.comics',            link: 'https://www.instagram.com/pictopia.comics?igsh=MW02dDFsNThpd2VybQ==' },
  { icon: 'x',   label: 'Xers',  value: 'Flagro_IISERBPR' ,   link: ' '},
];

const Colors = ['#C8745A', '#8FA47C', '#E8DED2', '#2B1F1B', '#D6A190', '#8FA47C'];


// =============================================
// RENDER FUNCTIONS
// =============================================

function renderGallery() {
  const grid = document.getElementById('galleryGrid');
  grid.innerHTML = '';

  // 🔥 1. Parent container: single line, no scrolling
  grid.style.display = 'flex';
  grid.style.flexWrap = 'nowrap'; /* Forces a single row */
  grid.style.gap = '20px';        /* Slightly smaller gap so they fit better */
  grid.style.width = '100%';      /* Ensures the grid doesn't break out of the page */

  galleryItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'gallery-item cursor-pointer';
    
    // 🔥 2. The magic trick: make the cards share the space equally
    card.style.flex = '1'; /* This replaces the fixed 280px width */
    /* We also make sure the card doesn't get impossibly tiny */
    card.style.minWidth = '0'; 
    
    card.style.borderRadius = '16px';
    card.style.overflow     = 'hidden';
    card.style.boxShadow    = '0 12px 30px rgba(0,0,0,0.06)';
    card.innerHTML = `
  <div style="height:270px; display:flex; flex-direction:column;">
    
    <div style="height:60%;">
      <img src="${item.image}" 
           style="width:100%; height:130%; object-fit:cover;" />
    </div>

    <div style="height:40%; padding:12px; padding-top:50px;display:flex; flex-direction:column; justify-content:center;">
      <p class="font-heading" style="font-size:16px; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
        ${item.title}
      </p>
      <p class="font-body text-gray-500" style="font-size:13px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
        ${item.artist}
      </p>
    </div>

  </div>
`;
    grid.appendChild(card);
  });
}

function renderEvents() {
  const track = document.getElementById('eventsTrack');
  track.innerHTML = '';

  eventItems.forEach(ev => {
    const card = document.createElement('div');
    card.className        = 'snap-card event-card flex-shrink-0';
    card.style.height     ='350px';
    card.style.width      = '260px';
    card.style.borderRadius = '16px';
    card.style.background = 'white';
    card.style.boxShadow  = '0 12px 30px rgba(0,0,0,0.06)';
    card.style.overflow   = 'hidden';
    card.style.display    = 'flex';
    card.style.flexDirection = 'column';
    card.innerHTML = `
    <div style="width:100%; height:350px;">
           <div style="height:60%;">
                    <img src="${ev.img}"style="width:100%; height:100%; object-fit:cover;" />
           </div> 
      <div style="padding:16px; height:70px;" >
        <span class="font-body text-muted" style="font-size:12px; letter-spacing:1px; text-transform:uppercase;">${ev.date}</span>
        <h3 class="font-heading text-bark mt-2" style="font-size:16px; font-weight:600;">${ev.title}</h3>
        <p class="font-body text-muted mt-2" style="font-size:13px; line-height:1.5;">${ev.desc}</p>
        
    </div>
    `;
    track.appendChild(card);
  });
}

function renderTeam() {
  const grid = document.getElementById('teamGrid');
  grid.innerHTML = '';

  // 🔥 1. Use CSS Grid for automatic layout and sizing
  grid.style.display = "grid";
  // This creates responsive columns automatically: min 250px wide, max 1 fraction of free space
  grid.style.gridTemplateColumns = "repeat(auto-fit, minmax(250px, 1fr))"; 
  grid.style.gap = "30px"; // Spacing between rows and columns
  grid.style.backgroundColor = "#F5F3EF"; // (Fixed the missing '#' and extra quote here!)

  teamMembers.forEach(m => {
    const card = document.createElement('div');
    
    // 🔥 2. Style the individual child card
    card.className = 'text-center';
    card.style.position = 'relative';
    // We REMOVED the strict width (card.style.width = "250px") 
    // The grid parent now dictates the width!

    // Using aspect-ratio instead of a fixed height makes the image container perfectly responsive
    card.innerHTML = `
      <div class="blob-card" style="aspect-ratio: 4/3; width: 100%; margin-bottom:20px;">
            <img src="${m.image}" style="width:100%; height:100%; object-fit:cover; border-radius:16px;" alt="${m.name}" />
      </div>
      <h3 class="font-heading text-bark" style="font-size:18px; font-weight:600; margin-bottom:4px;">${m.name}</h3>
      <p class="font-body text-muted mt-1" style="font-size:14px; margin:0;">${m.role}</p>
    `;
    
    grid.appendChild(card);
  });
}

function renderNews() {
  const grid = document.getElementById('newsGrid');
  grid.innerHTML = '';

  newsItems.forEach(item => {
    const card = document.createElement('div');
    card.className        = 'news-card';
    card.style.background = 'white';
    card.style.borderRadius = '14px';
    card.style.padding    = '20px';
    card.style.height     = '170px';
    card.style.boxShadow  = '0 12px 30px rgba(0,0,0,0.06)';
    card.style.display    = 'flex';
    card.style.flexDirection = 'column';

    const badgeColors = { Exhibition: '#C8745A', Announcement: '#8FA47C', Event: '#2B1F1B' };
    const badgeColor  = badgeColors[item.badge] || '#C8745A';

    card.innerHTML = `
      <span class="font-body text-white text-xs font-semibold"
        style="background:${badgeColor}; padding:4px 12px; border-radius:999px; width:fit-content; margin-bottom:10px;">
        ${item.badge}
      </span>
      <h3 class="font-heading text-bark" style="font-size:16px; font-weight:600;">${item.title}</h3>
      <p class="font-body text-muted mt-2 flex-1" style="font-size:13px; line-height:1.5;">${item.desc}</p>
      <p class="font-body text-muted text-xs" style="font-size:12px; margin-top:auto;">${item.date}</p>
    `;
    grid.appendChild(card);
  });
}

function renderContactCards() {
  const grid = document.getElementById('contactCardsGrid');
  grid.innerHTML = '';

  contactCards.forEach(card => {
    const div = document.createElement('div');
    div.className = 'contact-card';
    div.style.background     = '#E8DED2';
    div.style.borderRadius   = '14px';
    div.style.padding        = '24px';
    div.style.height         = '120px';
    div.style.display        = 'flex';
    div.style.flexDirection  = 'column';
    div.style.alignItems     = 'center';
    div.style.justifyContent = 'center';
    div.style.textAlign      = 'center';
    div.innerHTML = `
      <i data-lucide="${card.icon}" style="width:28px; height:28px; color:#C8745A; margin-bottom:8px;"></i>
      <p class="font-body text-bark font-semibold" style="font-size:13px; letter-spacing:0.5px; text-transform:uppercase;">${card.label}</p>
      <p class="font-body text-bark mt-2" style="font-size:14px; font-weight:500;">${card.value}</p>

    `;
    grid.appendChild(div);
  });

  lucide.createIcons();
}

function renderStrip() {
  const strip = document.getElementById('instagramStrip');
  strip.innerHTML = '';

  instagramColors.forEach(color => {
    const sq = document.createElement('div');
    sq.className        = 'instagram-sq';
    sq.style.width      = '70px';
    sq.style.height     = '70px';
    sq.style.borderRadius = '12px';
    sq.style.background = color;
    sq.style.cursor     = 'pointer';
    strip.appendChild(sq);
  });
}


// =============================================
// INTERACTIONS
// =============================================

function scrollEvents(dir) {
  const track = document.getElementById('eventsTrack');
  track.scrollBy({ left: dir * 284, behavior: 'smooth' });
}


// =============================================
// CONFIG / THEME (Element SDK hook)
// =============================================
const defaultConfig = {
  background_color:       '#F5F3EF',
  surface_color:          '#FFFFFF',
  text_color:             '#2B1F1B',
  primary_action_color:   '#C8745A',
  secondary_action_color: '#8FA47C',
  font_family:            'Playfair Display',
  font_size:              16,
  hero_tagline:           'A creative community exploring fine arts, digital art and visual expression.',
  about_title:            'About Our Club',
  gallery_title:          'Art Gallery',
  events_title:           'Events',
  team_title:             'Meet Our Creative Visionaries',
  commission_title:       'Art Commissions',
  commission_desc:        'Want a unique piece of art? Our talented members create custom artwork — portraits, illustrations, murals, and digital pieces tailored to your vision.',
  news_title:             'News & Updates',
  contact_title:          "Let's Create Together",
  contact_subtitle:       "Have a question, want to join, or just say hi? We'd love to hear from you.",
  footer_contact_email:   'hello@flagro.club',
  footer_contact_address: 'Creative Arts Building, Room 204'
};

function applyConfig(config) {
  const bg      = config.background_color       || defaultConfig.background_color;
  const txt     = config.text_color             || defaultConfig.text_color;
  const primary = config.primary_action_color   || defaultConfig.primary_action_color;
  const fontFam = config.font_family            || defaultConfig.font_family;
  const baseSize = config.font_size             || defaultConfig.font_size;

  document.getElementById('appRoot').style.background = bg;
  document.querySelectorAll('.text-bark').forEach(el => el.style.color = txt);

  // Dynamic style overrides
  let styleTag = document.getElementById('dynamicStyles');
  if (!styleTag) {
    styleTag = document.createElement('style');
    styleTag.id = 'dynamicStyles';
    document.head.appendChild(styleTag);
  }
  styleTag.textContent = `
    .dot-active   { background: white !important; }
    .chip-active  { background: ${primary} !important; color: white !important; border-color: ${primary} !important; }
    .nav-link::after { background: ${primary} !important; }
  `;

  const headingFont = `${fontFam}, serif`;
  document.querySelectorAll('.font-heading').forEach(el => el.style.fontFamily = headingFont);

  const heroH1 = document.getElementById('heroTitle');
  if (heroH1) heroH1.style.fontSize = `${baseSize * 4}px`;

  document.querySelectorAll('h2').forEach(el => {
    el.style.fontSize = `${baseSize * 2.125}px`;
  });

  updateTexts(config);
}

function updateTexts(config) {
  const set = (id, key) => {
    const el = document.getElementById(id);
    if (el) el.textContent = config[key] || defaultConfig[key];
  };

  set('heroTagline',    'hero_tagline');
  set('aboutTitle',     'about_title');
  set('galleryTitle',   'gallery_title');
  set('eventsTitle',    'events_title');
  set('teamTitle',      'team_title');
  set('commissionTitle','commission_title');
  set('commissionDesc', 'commission_desc');
  set('newsTitle',      'news_title');
  set('contactTitle',   'contact_title');
  set('contactSubtitle','contact_subtitle');
  set('footerEmail',    'footer_contact_email');
  set('footerAddress',  'footer_contact_address');
}


// =============================================
// INITIALISE
// =============================================
initSlider();
renderGallery();
renderEvents();
renderTeam();
renderNews();
renderContactCards();
renderInstagramStrip();
lucide.createIcons();

// Form submit handler
document.getElementById('feedbackForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const origText = btn.textContent;
  btn.textContent = 'Sent! ✓';
  btn.style.opacity = '0.7';
  setTimeout(() => {
    e.target.reset();
    btn.textContent = origText;
    btn.style.opacity = '1';
  }, 2000);
});

// Element SDK integration (optional)
if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange: async (config) => { applyConfig(config); },
    mapToCapabilities: (config) => ({
      recolorables: [
        { get: () => config.background_color       || defaultConfig.background_color,       set: (v) => window.elementSdk.setConfig({ background_color: v })       },
        { get: () => config.surface_color          || defaultConfig.surface_color,          set: (v) => window.elementSdk.setConfig({ surface_color: v })          },
        { get: () => config.text_color             || defaultConfig.text_color,             set: (v) => window.elementSdk.setConfig({ text_color: v })             },
        { get: () => config.primary_action_color   || defaultConfig.primary_action_color,   set: (v) => window.elementSdk.setConfig({ primary_action_color: v })   },
        { get: () => config.secondary_action_color || defaultConfig.secondary_action_color, set: (v) => window.elementSdk.setConfig({ secondary_action_color: v }) }
      ],
      borderables: [],
      fontEditable: {
        get: () => config.font_family || defaultConfig.font_family,
        set: (v) => window.elementSdk.setConfig({ font_family: v })
      },
      fontSizeable: {
        get: () => config.font_size || defaultConfig.font_size,
        set: (v) => window.elementSdk.setConfig({ font_size: v })
      }
    }),
    mapToEditPanelValues: (config) => new Map([
      ['hero_tagline',           config.hero_tagline           || defaultConfig.hero_tagline],
      ['about_title',            config.about_title            || defaultConfig.about_title],
      ['gallery_title',          config.gallery_title          || defaultConfig.gallery_title],
      ['events_title',           config.events_title           || defaultConfig.events_title],
      ['team_title',             config.team_title             || defaultConfig.team_title],
      ['commission_title',       config.commission_title       || defaultConfig.commission_title],
      ['commission_desc',        config.commission_desc        || defaultConfig.commission_desc],
      ['news_title',             config.news_title             || defaultConfig.news_title],
      ['contact_title',          config.contact_title          || defaultConfig.contact_title],
      ['contact_subtitle',       config.contact_subtitle       || defaultConfig.contact_subtitle],
      ['footer_contact_email',   config.footer_contact_email   || defaultConfig.footer_contact_email],
      ['footer_contact_address', config.footer_contact_address || defaultConfig.footer_contact_address]
    ])
  });
}
