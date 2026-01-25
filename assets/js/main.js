// Enhanced Accordion JS - Remove border from previous item for positions 2,3,4
document.addEventListener("DOMContentLoaded", function () {
  const headers = document.querySelectorAll(".accordion-header");

  headers.forEach((header) => {
    const content = header.nextElementSibling;
    const item = header.parentElement;
    const group = item.closest(".accordion");

    // Initial state
    if (!content.classList.contains("active")) {
      gsap.set(content, {
        height: 0,
        opacity: 0,
        overflow: "hidden",
      });
    }

    header.addEventListener("click", function (e) {
      e.preventDefault();

      const isOpen = content.classList.contains("active");

      // 🔒 Close ONLY items in the same group
      const groupHeaders = group.querySelectorAll(".accordion-header");
      const groupItems = group.querySelectorAll(".accordion-item");

      // Close all group accordions
      groupHeaders.forEach((h) => {
        const c = h.nextElementSibling;
        const i = h.parentElement;

        h.classList.remove("active");
        c.classList.remove("active");
        i.classList.remove("active", "no-border");

        gsap.to(c, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        });
      });

      // Open clicked accordion
      if (!isOpen) {
        header.classList.add("active");
        content.classList.add("active");
        item.classList.add("active");

        gsap.to(content, {
          height: "auto",
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        });

        // Remove border from previous item (within same group)
        const index = [...groupItems].indexOf(item);
        if (index > 0) {
          groupItems[index - 1].classList.add("no-border");
        }
      }
    });
  });
});

// Timeline Functionality
function timeline() {
  // Select all timeline labels
  const labels = document.querySelectorAll(".timeline-label");

  // Loop through each label and attach click event
  labels.forEach((label) => {
    label.addEventListener("click", () => {
      const parent = label.parentElement; // the container div of this timeline content
      const targetId = parent.id; // get the id of the content div
      const timelineImageSrc = label.dataset.image; // get the image source from data attribute

      if (window.innerWidth > 580) {
        const timelineImage = document.getElementById("timeline-main-image");

        // Get current image position and size
        const rect = timelineImage.getBoundingClientRect();

        // Clone the old image
        const oldImage = timelineImage.cloneNode(true);
        oldImage.style.position = "absolute";
        oldImage.style.top = rect.top + window.scrollY + "px";
        oldImage.style.left = rect.left + window.scrollX + "px";
        oldImage.style.width = rect.width + "px";
        oldImage.style.height = rect.height + "px";
        oldImage.style.margin = 0;
        oldImage.style.zIndex = 1;

        // Append to body
        document.body.appendChild(oldImage);

        // Change the main image
        timelineImage.src = timelineImageSrc;

        // Set starting position for new image (offscreen to the right)
        gsap.set(timelineImage, { opacity: 0 });

        // Animate old image out to the left
        gsap.to(oldImage, {
          opacity: 0,
          duration: 0.7,
          ease: "power2.inOut",
          stagger: 1,
          onComplete: () => oldImage.remove(),
        });

        // Animate new image in from right
        gsap.to(timelineImage, {
          opacity: 1,
          duration: 0.7,
          stagger: 1,
          delay: 0.1,
          ease: "power2.inOut",
        });
      }

      // Remove active classes from all labels
      labels.forEach((l) => l.classList.remove("timeline-label-active"));

      // Add active class to clicked label
      label.classList.add("timeline-label-active");

      // Handle timeline text visibility
      document.querySelectorAll(".timeline-text").forEach((text) => {
        text.classList.remove("timeline-text-visible");
      });

      // Handle timeline fade visibility
      document.querySelectorAll(".fade-bottom-removeable").forEach((fade) => {
        fade.classList.remove("remove-fade-bottom");
      });

      const fade = parent.querySelector(".fade-bottom-removeable");
      if (fade) fade.classList.add("remove-fade-bottom");

      const text = parent.querySelector(".timeline-text");
      if (text) text.classList.add("timeline-text-visible");

      // Handle mobile image visibility
      document.querySelectorAll(".timeline-image-mobile").forEach((img) => {
        img.classList.remove("active");
      });

      const img = document.querySelector(`.timeline-image-mobile[data-target="${targetId}"]`);
      if (img) img.classList.add("active");
    });
  });
}

function adjustImageHeight() {
  const text = document.querySelector(".amazon-advertising-pricing-text");
  const img = document.querySelector(".amazon-advertising-pricing-img img");

  if (text && img) {
    let extraHeight = 60;
    if (window.innerWidth > 768) {
      extraHeight = 90;
    }
    if (window.innerWidth > 1200) {
      extraHeight = 120;
    }
    const textHeight = text.offsetHeight + extraHeight;
    img.style.height = textHeight + "px";
  }
}

window.addEventListener("load", adjustImageHeight);
window.addEventListener("resize", adjustImageHeight);

timeline();
