const eventGallery = [
  { id: 1, title: 'Art Exhibition 2024', color: 'linear-gradient(135deg, #C8745A 0%, #D6A190 100%)' },
  { id: 2, title: 'Design Workshop', color: 'linear-gradient(135deg, #8FA47C 0%, #6B8A5E 100%)' },
  { id: 3, title: 'Comic Jam Session', color: 'linear-gradient(135deg, #D6A190 0%, #C8745A 100%)' },
  { id: 4, title: 'Digital Art Fest', color: 'linear-gradient(135deg, #2B1F1B 0%, #4A3530 100%)' },
  { id: 5, title: 'Collaborative Mural', color: 'linear-gradient(135deg, #A85D46 0%, #C8745A 100%)' },
  { id: 6, title: 'Member Showcase', color: 'linear-gradient(135deg, #8FA47C 0%, #D6A190 100%)' },
  { id: 7, title: 'Creative Talk Series', color: 'linear-gradient(135deg, #D6A190 0%, #8FA47C 100%)' },
];

const instagramPosts = [
  { gradient: 'linear-gradient(135deg, #8FA47C 0%, #6B8A5E 100%)', link:"" },
  { gradient: 'linear-gradient(135deg, #D6A190 0%, #A85D46 100%)', link:"" },
  { gradient: 'linear-gradient(135deg, #2B1F1B 0%, #4A3530 100%)', link:"" },
  { gradient: 'linear-gradient(135deg, #A85D46 0%, #8FA47C 100%)', link:"" },
];

function renderEventGalleryPreview() {
  const container = document.getElementById('eventGalleryPreview');
  container.innerHTML = '';
  eventGallery.slice(0, 5).forEach(event => {
    const card = document.createElement('div');
    card.className = 'group relative rounded-2xl overflow-hidden card-hover cursor-pointer';
    card.style.background = event.color;
    card.style.aspectRatio = '1';
    card.innerHTML = `<div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center"><div class="text-center text-white opacity-0 group-hover:opacity-100"><i data-lucide="image" style="width:20px;height:20px;" class="mx-auto mb-1"></i><p class="text-xs font-semibold">${event.title}</p></div></div>`;
    card.onclick = openEventFullGallery;
    container.appendChild(card);
  });
  lucide.createIcons();
}

function openEventFullGallery() {
  const modal = document.getElementById('eventGalleryModal');
  modal.classList.remove('hidden');
  const gallery = document.getElementById('eventGallerySlider');
  gallery.innerHTML = '';
  eventGallery.forEach(event => {
    const slide = document.createElement('div');
    slide.className = 'gallery-slide flex items-center justify-center';
    slide.style.background = event.color;
    slide.innerHTML = `<div class="text-center"><i data-lucide="image" style="width:48px;height:48px;" class="mx-auto mb-4 text-white/50"></i><p class="text-white/80 font-semibold">${event.title}</p></div>`;
    gallery.appendChild(slide);
  });
  lucide.createIcons();
}

function closeEventGallery() {
  document.getElementById('eventGalleryModal').classList.add('hidden');
}

function renderInstagramGrid() {
  const container = document.getElementById('instagramGrid');
  container.innerHTML = '';

  container.style.display = 'flex';
  container.style.justifyContent = 'center'; 
  container.style.flexWrap = 'nowrap';       
  container.style.gap = '16px';              
  container.style.width = '100%';

  instagramPosts.forEach(post => {
    // 🔥 1. Change 'div' to 'a' so it natively acts as a clickable link
    const card = document.createElement('a');
    
    // 🔥 2. Set the destination link 
    // (Assuming your 'post' object has a property called 'link' or 'url'. Change this to match your actual data!)
    card.href = post.link || '#'; 
    
    // 🔥 3. Optional: Opens the link in a new tab (great for external Instagram links)
    card.target = '_blank';
    card.rel = 'noopener noreferrer'; // Security best practice when using target='_blank'

    card.className = 'relative rounded-lg overflow-hidden card-hover group cursor-pointer';
    
    // Keep your exact sizing and styling
    card.style.flex = '0 1 200px'; 
    card.style.minWidth = '80px';  
    
    // We need to add display block so the anchor tag respects the flexbox dimensions
    card.style.display = 'block'; 
    
    card.style.aspectRatio = '1';
    card.style.background = post.gradient;
    
    card.innerHTML = `<div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center"><i data-lucide="heart" style="width:20px;height:20px;" class="text-white/0 group-hover:text-white"></i></div>`;
    
    container.appendChild(card);
  });
  
  lucide.createIcons();
}
function handleFormSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  form.style.display = 'none';
  success.classList.remove('hidden');
  setTimeout(() => {
    form.style.display = 'block';
    success.classList.add('hidden');
    form.reset();
  }, 3000);
}

const sections = document.querySelectorAll('.section-reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
sections.forEach(s => observer.observe(s));

lucide.createIcons();
renderEventGalleryPreview();
renderInstagramGrid();
fineArtsImages('fineShowcaseFrame', 0);
designDivisionImages('designShowcaseFrame', 0);
comicImages('comicShowcaseFrame', 0);

const defaultConfig = {
  hero_title: 'About Flagro Art Club',
  hero_subtitle: 'A creative community where artists and designers collaborate to explore visual expression.',
  about_heading: 'About the Club',
  design_heading: 'Design Division',
  design_description: 'The Design Division focuses on graphic design, digital illustration, branding, and visual storytelling.',
  comic_heading: 'Comic Division',
  comic_description: 'The Comic Division specializes in storytelling through comics, character design, and visual narratives.',
  achievements_title: 'Club Achievements',
  gallery_title: 'Event Gallery',
  core_team_title: 'Core Team',
  events_team_title: 'Events Team',
  design_team_title: 'Design Team',
  pictopia_team_title: 'Pictopia Team',
  social_team_title: 'Social Media Team',
  mission_text: 'To foster creativity, collaboration, and artistic exploration among students by providing a platform where ideas can be transformed into visual expressions.',
  vision_text: 'To build a vibrant artistic community that inspires innovation, storytelling, and cultural expression through visual arts.',
  instagram_handle: 'flagro_iiserbpr',
  contact_email: 'flagroartclub@iiserbpr.ac.in',
  contact_location: 'At/Po: -Laudigam, Konisi,Police Station - Golanthara,Dist. - Ganjam, Odisha - 760003, India, IISER Berhampur',
  primary_action_color: '#C8745A',
};


// Fine Arts Section
function fineArtsImages(containerId, startIndex) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';
  const slides = [
    { title: 'Watercolor Study',   image: "images/finearts/FA1.jpeg" },
    { title: 'Charcoal Sketch',    image: "images/fineart/FA15.jpeg" },
    { title: 'Oil Painting',       image: "images/finearts/FA19.jpeg" },
    { title: 'Figure Drawing',     image: "images/finearts/FA22.jpeg" },
    { title: 'Portrait Study',     image: "images/finearts/FA29.jpeg" },
    { title: 'Oil Painting',       image: "images/finearts/FA10.jpeg" },
    { title: 'Figure Drawing',     image: "images/finearts/FA33.jpeg" },
    { title: 'Portrait Study',     image: "images/finearts/FA40.jpeg" },
  ];

  let currentSlide = startIndex || 0;

  function renderSlide() {
    const slide = slides[currentSlide];
    container.style.backgroundImage = `url('${slide.image}')`;
    container.style.backgroundSize = "cover";
    container.style.backgroundPosition = "center";
    container.innerHTML = `
      <div style="width:100%;height:100%;display:flex;align-items:flex-end;justify-content:center;border-radius:20px;padding-bottom:16px;background:linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%);">
        <p style="font-size:16px;color:white;font-weight:600;">${slide.title}</p>
      </div>
    `;
  }

  renderSlide();
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    renderSlide();
  }, 3000);
}

// Design Division
function designDivisionImages(containerId, startIndex) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';
  const slides = [
    { title: 'Graphic Design',  image: "images/graphicDesigns/GA1.jpeg" },
    { title: 'Graphic Design',  image: "images/graphicDesigns/GA2.jpeg" },
    { title: 'Graphic Design',  image: "images/graphicDesigns/GA3.jpeg" },
    ]
  let currentSlide = startIndex || 0;

  function renderSlide() {
    const slide = slides[currentSlide];
    container.style.backgroundImage = `url('${slide.image}')`;
    container.style.backgroundSize = "cover";
    container.style.backgroundPosition = "center";
    container.innerHTML = `
      <div style="width:100%;height:100%;display:flex;align-items:flex-end;justify-content:center;border-radius:20px;padding-bottom:16px;background:linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%);">
        <p style="font-size:16px;color:white;font-weight:600;">${slide.title}</p>
      </div>
    `;
  }

  renderSlide();
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    renderSlide();
  }, 3000);
}

// Comic Section
function comicImages(containerId, startIndex) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';
  const slides = [
    { title: 'Holika Dahan-1',  image: "images/pictopia/Tape a Tale/Holika_Dahan_page1-1.png" },
    { title: 'Holika Dahan-2',       image: "images/pictopia/Tape a Tale/Holika_Dahan_page2-1.png" },
    { title: 'Archi',      image: "images/pictopia/Original Stories/ARCHI(Episode-1)Part 1.png" },
    { title: 'Archi',     image: "images/pictopia/Original Stories/ARCHI(Episode-1)Part 2.png" },
    { title: 'Archi',  image: "images/pictopia/Original Stories/ARCHI-Episode-2 (Part 1).png" },
    
    
  ];

  let currentSlide = startIndex || 0;

  function renderSlide() {
    const slide = slides[currentSlide];
    container.style.backgroundImage = `url('${slide.image}')`;
    container.style.backgroundSize = "cover";
    container.style.backgroundPosition = "center";
    container.innerHTML = `
      <div style="width:100%;height:100%;display:flex;align-items:flex-end;justify-content:center;border-radius:20px;padding-bottom:16px;background:linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%);">
        <p style="font-size:16px;color:white;font-weight:600;">${slide.title}</p>
      </div>
    `;
  }

  renderSlide();
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    renderSlide();
  }, 3000);
}



async function onConfigChange(config) {
  const c = { ...defaultConfig, ...config };
  const fields = ['heroTitle', 'heroSubtitle', 'aboutHeading', 'designHeading', 'designDescription', 'comicHeading', 'comicDescription', 'achievementsTitle', 'galleryTitle', 'coreTeamTitle', 'eventsTeamTitle', 'designTeamTitle', 'pictopiaTeamTitle', 'socialTeamTitle', 'missionText', 'visionText', 'instagramHandle', 'contactEmail', 'contactLocation'];

  fields.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      const key = id.replace(/([A-Z])/g, '_$1').toLowerCase().substring(1);
      el.textContent = c[key] || defaultConfig[key];
    }
  });

  document.querySelectorAll('.bg-terra').forEach(el => el.style.backgroundColor = c.primary_action_color);
}

if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities: () => ({
      recolorables: [{ get: () => defaultConfig.primary_action_color, set: (v) => { defaultConfig.primary_action_color = v; window.elementSdk.setConfig({ primary_action_color: v }); } }],
      borderables: [],
      fontEditable: undefined,
      fontSizeable: undefined,
    }),
    mapToEditPanelValues: () => new Map(Object.entries(defaultConfig).filter(([k]) => !k.includes('color')))
  });
}
