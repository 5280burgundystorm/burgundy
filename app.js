// ===================
// MENU & SEARCH TOGGLE
// ===================
const menu = document.querySelector('#menu-bars');
const navbar = document.querySelector('.navbar');
const searchIcon = document.querySelector('#search-icon');
const searchForm = document.querySelector('.search-form');

menu.onclick = () => {
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
  searchIcon.classList.remove('fa-times');
  searchForm.classList.remove('active');
};

searchIcon.onclick = () => {
  searchIcon.classList.toggle('fa-times');
  searchForm.classList.toggle('active');
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');
};

window.onscroll = () => {
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');
  searchIcon.classList.remove('fa-times');
  searchForm.classList.remove('active');
};

// ===================
// POSTS & CATEGORIES
// ===================
const posts = document.querySelectorAll('.posts-container .post');
const categoryLinks = document.querySelectorAll('.category a');

// Function to show/hide posts with animation
function togglePost(post, show) {
  if (show) {
    post.classList.remove('hidden');
  } else {
    post.classList.add('hidden');
  }
}

// ===================
// UPDATE CATEGORY COUNTS
// ===================
function updateCategoryCounts() {
  categoryLinks.forEach(link => {
    const categoryName = link.textContent.trim().split(' ')[0].toLowerCase();
    let count = 0;
    posts.forEach(post => {
      if (!post.classList.contains('hidden')) {
        const postCat = post.dataset.category.toLowerCase();
        if (categoryName === 'all' || postCat === categoryName) count++;
      }
    });

    let span = link.querySelector('span');
    if (!span) {
      span = document.createElement('span');
      link.appendChild(span);
    }
    span.textContent = count;
  });
}

// ===================
// CATEGORY FILTER
// ===================
categoryLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const selectedCategory = link.textContent.trim().split(' ')[0].toLowerCase();

    posts.forEach(post => {
      const postCat = post.dataset.category.toLowerCase();
      togglePost(post, selectedCategory === 'all' || postCat === selectedCategory);
    });

    // Highlight active category
    categoryLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    updateCategoryCounts();
  });
});

// ===================
// SEARCH FILTER
// ===================
const searchBox = document.querySelector('#search-box');
searchBox.addEventListener('keyup', () => {
  const query = searchBox.value.toLowerCase();
  posts.forEach(post => {
    const text = post.innerText.toLowerCase();
    togglePost(post, text.includes(query));
  });
  updateCategoryCounts();
});

// ===================
// TAG FILTER
// ===================
document.querySelectorAll('.tags a').forEach(tagLink => {
  tagLink.addEventListener('click', e => {
    e.preventDefault();
    const selectedTag = tagLink.textContent.trim().toLowerCase();

    posts.forEach(post => {
      const text = post.innerText.toLowerCase();
      togglePost(post, text.includes(selectedTag));
    });
    updateCategoryCounts();
  });
});

// ===================
// POPULAR POSTS LINKS
// ===================
document.querySelectorAll('.p-post a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const postTitle = link.querySelector('h3').textContent;
    posts.forEach(post => {
      if (post.querySelector('.title').textContent === postTitle) {
        window.scrollTo({
          top: post.offsetTop - 80,
          behavior: 'smooth'
        });
        post.classList.add('highlight');
        setTimeout(() => post.classList.remove('highlight'), 1500);
      }
    });
  });
});

// ===================
// INITIALIZE
// ===================
// Optional: make "All" category active on load
categoryLinks.forEach(link => {
  if (link.textContent.toLowerCase().includes('all')) {
    link.classList.add('active');
  }
});

// Run once on page load
updateCategoryCounts();

// ===================
// CONTACT FORM EMAILJS
// ===================
/* Make sure you include EmailJS SDK in your HTML:
<script src="https://cdn.emailjs.com/sdk/3.2.0/email.min.js"></script>
*/

(function(){
  emailjs.init("service_m0ufdcb"); // Replace with your EmailJS public key
})();

const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(event) {
  event.preventDefault(); // prevent page reload

  emailjs.sendForm('kS6u3cm7mXUUqlFNs', 'template_7vf76ir', this)
    .then(() => {
      alert('Message sent successfully!');
      contactForm.reset();
    }, (error) => {
      alert('Failed to send message. Please try again later.');
      console.error(error);
    });
});
