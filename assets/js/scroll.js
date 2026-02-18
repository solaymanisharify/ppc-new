window.addEventListener("load", () => {
  // Initialize a new Lenis instance for smooth scrolling
  const lenis = new Lenis();

  // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
  lenis.on("scroll", ScrollTrigger.update);

  // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
  // This ensures Lenis's smooth scroll animation updates on each GSAP tick
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Convert time from seconds to milliseconds
  });

  // Disable lag smoothing in GSAP to prevent any delay in scroll animations
  gsap.ticker.lagSmoothing(0);
});

window.addEventListener("load", () => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  ScrollTrigger.create({
    trigger: "#tergeting-section",
    start: "top top",
    end: "bottom bottom",
    onEnter: () => document.getElementById('tergeting-section').classList.add('bg-color-active'),
    onLeaveBack: () => document.getElementById('tergeting-section').classList.remove('bg-color-active'),
    // markers: true
  });

  // ------------------------------
  // Card Section Scroll animation
  // ------------------------------

  // const details = gsap.utils.toArray(".timeline-content-item:not(:first-child)")
  // const photos = gsap.utils.toArray(".timeline-image:not(:first-child)")
  
  // gsap.set(photos, {yPercent:101});
  // gsap.set(details, {opacity:0});
  
  // const allPhotos = gsap.utils.toArray(".timeline-image")
  // const allDetails = gsap.utils.toArray(".timeline-content-item")

  // ScrollTrigger.create({
  //   trigger:"#timeline-pin",
  //   start:"top top",
  //   end:"bottom bottom",
  //   pin:".timeline-image-wrapper",
  //   pinSpacing: false,
  // })

  // details.forEach((detail, index)=> {

  //   let headline = detail.querySelector("h4")
  //   let animation = gsap.timeline()
  //                   .to(photos[index], {yPercent:0})
  //                   .set(allPhotos[index], {autoAlpha:0})
  //                   .to(allDetails[index], { opacity: 0, y: -100, duration: 0.3 }, 0)
  //                   .to(detail, { opacity: 1, y: 0, duration: 0.3 }, 0);
    
  //   ScrollTrigger.create({
  //     trigger:headline,
  //     start:"top 80%",
  //     end:"top 50%",
  //     animation:animation,
  //     scrub:true,
  //     markers:true
  //   })
  // })
  
  // const details = gsap.utils.toArray(".timeline-content-item");
  // const images  = gsap.utils.toArray(".timeline-image");
  
  // gsap.set(details, { opacity: 0, y: 50 });
  // gsap.set(images, { yPercent: 100 });
  
  // gsap.set(details[0], { opacity: 1, y: 0 });
  // gsap.set(images[0], { yPercent: 0 });
  
  // ScrollTrigger.create({
  //   trigger: "#timeline-pin",
  //   start: "top top",
  //   end: "bottom bottom",
  //   pin: ".timeline-image-wrapper",
  //   pinSpacing: false,
  // });
  
  // details.forEach((detail, index) => {
  
  //   let headline = detail.querySelector("h4");
  
  //   let tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: headline,
  //       start: "top 85%",
  //       end: "bottom 25%",
  //       scrub: true,
  //       // markers: true
  //     }
  //   });
  
  //   tl.to(images[index], {yPercent: 0,duration: 0.3}, 0)
  //     .to(detail, {opacity: 1,y: 0,duration: 0.1}, 0)
  
  //   if (index !== details.length - 1) {
  //     tl.to(detail, {opacity: 0,duration: 0.1});
  //   }
  
  // });

  // const contentItems = document.querySelectorAll('.timeline-content-item');
  // const images = document.querySelectorAll('.timeline-image');
  // const dots = document.querySelectorAll('.dot');

  // // 1. Setup initial states
  // gsap.set(contentItems, { opacity: 0, y: 30 });
  // gsap.set(contentItems[0], { opacity: 1, y: 0 });
  // gsap.set(images, { opacity: 0 });
  // gsap.set(images[0], { opacity: 1 });

  // // 2. Create the Master Timeline
  // const tl = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: "#tergeting-section",
  //     start: "top top",
  //     end: () => "+=" + (contentItems.length * 100) + "%",
  //     pin: true,
  //     scrub: 1,
  //     markers: false,
  //     onLeaveBack: () => updateDots(0)
  //   }
  // });

  // // 3. Loop through items to build the sequence
  // contentItems.forEach((item, i) => {
  //   if (i === 0) {
  //       tl.addLabel("step0", 0);
  //       return;
  //   }

  //   const position = i; // The "time" in the timeline for this step

  //   tl.to(images[i - 1], { opacity: 0, duration: 0.5 }, position)
  //     .to(images[i], { opacity: 1, duration: 0.5 }, position)
  //     .to(contentItems[i - 1], { opacity: 0, y: -100, duration: 0.5 }, position)
  //     .to(item, { opacity: 1, y: 0, duration: 0.5 }, position);

  //   // Use a dummy tween to trigger dot updates reliably in both directions
  //   tl.to({}, {
  //       duration: 0.1,
  //       onStart: () => updateDots(i),
  //       onReverseComplete: () => updateDots(i - 1)
  //   }, position);
  // });

  // function updateDots(activeIndex) {
  //   dots.forEach((dot, i) => {
  //     // Logic: 
  //     // 1. Add 'active' only to current index
  //     // 2. Add 'isFinished' to everything before current index
  //     dot.classList.toggle('active', i === activeIndex);
  //     dot.classList.toggle('isFinished', i < activeIndex);
  //   });
  // }

const contentItems = document.querySelectorAll('.timeline-content-item');
const images = document.querySelectorAll('.timeline-image');
const dots = document.querySelectorAll('.dot');

// Initial setup
gsap.set(contentItems, { opacity: 0, y: 30 });
gsap.set(contentItems[0], { opacity: 1, y: 0 });
gsap.set(images, { opacity: 0 });
gsap.set(images[0], { opacity: 1 });

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#tergeting-section",
    start: "top top",
    end: () => "+=" + (contentItems.length * 100) + "%",
    pin: true,
    scrub: 1,
    // snap: 1 / (contentItems.length - 1),
    onUpdate: (self) => {
      // Use progress to find the closest index
      const activeIndex = Math.round(self.progress * (contentItems.length - 1));
      updateDots(activeIndex);
    }
  }
});

contentItems.forEach((item, i) => {
  if (i === 0) {
    tl.addLabel("step0", 0);
    return;
  }

  // Position the animations so they finish exactly at the integer 'i'
  const startTime = i - 0.8; // Start early
  const endTime = i;         // Finish at the label point

  tl.to(images[i - 1], { opacity: 0, duration: 0.2 }, startTime)
    .to(images[i], { opacity: 1, duration: 0.5 }, startTime)
    .to(contentItems[i - 1], { opacity: 0, y: -50, duration: 0.2 }, startTime)
    .to(item, { opacity: 1, y: 0, duration: 0.5 }, startTime);

  // Add label at the point where the animation is COMPLETE
  tl.addLabel("step" + i, endTime);
});

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    const targetScroll = tl.scrollTrigger.labelToScroll("step" + i);
    
    gsap.to(window, {
      duration: 0.2,
      scrollTo: { y: targetScroll },
      ease: "power2.inOut"
    });
  });
});

function updateDots(activeIndex) {
  const progressLine = document.querySelector('.timeline-line-progress');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === activeIndex);
    dot.classList.toggle('isFinished', i < activeIndex);
  });

  // Calculate percentage: 
  // If we have 4 dots, and we are at index 2 (the 3rd dot):
  // (2 / (4 - 1)) * 100 = 66.6%
  const totalDots = dots.length;
  const percentage = (activeIndex / (totalDots - 1)) * 100;

  // Apply the height to the white progress bar
  if (progressLine) {
    progressLine.style.height = `${percentage}%`;
  }
}
  

  // ------------------------------
  // Vertical Cards Scroll
  // ------------------------------
  const verticalCards = gsap.utils.toArray(".panel__card");

  verticalCards.forEach((verticalCard, index) => {
    if (index !== 0) {
      gsap.set(verticalCard, {
        yPercent: 135,
      });
    }
  });

  const mainTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".optimization-container",
      pin: true,
      start: "top 4%",
      end: () => `+=${verticalCards.length * 100}%`,
      scrub: 1,
      pinSpacing: true,
      invalidateOnRefresh: true,
      // markers: true, // uncomment for debugging
    },
    defaults: {
      ease: "none",
    },
  });

  verticalCards.forEach((verticalCard, index) => {
    if (index === 0) return;

    // Slide card in
    mainTimeline.to(verticalCard, {
      yPercent: 0,
      duration: 1,
    });

    // Scale + radius AFTER 50% of that slide
    mainTimeline.fromTo(
      verticalCard,
      {
        scale: 1.05,
        // borderRadius: "0px",
      },
      {
        scale: 1,
        // borderRadius: "10px",
        duration: 0.5,
      },
      ">-0.7", // starts halfway through the slide
    );
  });

  // vertical cards scroll end

  // ------------------------------
  // Horizontal Cards Scroll
  // ------------------------------
  const horizontalCardContainer = document.querySelector(".horizontal");
  const horizontalCards = gsap.utils.toArray(".case-study-container");
  const stickyWrapper = document.querySelector(".sticky-body");

  function getScrollAmount() {
    let extraWidth = window.innerWidth - horizontalCardContainer.offsetWidth;
    return -(horizontalCardContainer.scrollWidth - window.innerWidth + extraWidth);
  }

  const horizontalTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".sticky-body",
      start: "top 3%",
      end: () => `+=${horizontalCardContainer.scrollWidth / 2}`, // here added /2 to make it scroll faster
      scrub: 0.1,
      pin: true,
      invalidateOnRefresh: true,
      anticipatePin: 1,
      // markers: true, // Remove after debugging
    },
  });

  horizontalTimeline.to(horizontalCardContainer, {
    x: getScrollAmount,
    ease: "none",
  });

  horizontalCards.forEach((horizontalCard) => {
    gsap.from(
      horizontalCard,
      {
        scrollTrigger: {
          trigger: horizontalCard,
          containerAnimation: horizontalTimeline,
          start: "left 85%",
          end: "center 60%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
      "<",
    );
  });

  // horizontal cards scroll end

  // ------------------------------
  // Background color change on scroll
  // ------------------------------

  const BackgroundColorChangeTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".amazon-ppc-card-body",
      start: "top top",
      onEnter: () => {
        document.getElementById("amazon-ppc-card-bg-id").classList.add("bg-color-active")
        document.getElementById("amazon-id-section").classList.add("bg-color-active")
      },
      onLeaveBack: () => {
        document.getElementById("amazon-ppc-card-bg-id").classList.remove("bg-color-active")
        document.getElementById("amazon-id-section").classList.remove("bg-color-active")
      },
      // markers: true,
    },
  });

  // ------------------------------
  // Sync Image Change with Block
  // ------------------------------

  function syncImageChangeAnimation({ sectionName, blockSelector, imageSelector, spacial = false }) {
    const blocks = gsap.utils.toArray(blockSelector);
    const images = gsap.utils.toArray(imageSelector);
    const blocksContainer = document.querySelector(`${sectionName} .amazon-content-img`);

    // Use matchMedia for responsive GSAP animations
    ScrollTrigger.matchMedia({
      // Mobile & tablet
      "(min-width: 850px)": function () {
        // Pin the section
        ScrollTrigger.create({
          trigger: sectionName,
          start: "top 14%",
          endTrigger: blocks[blocks.length - 1],
          end: "bottom center",
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
          // markers: true,
        });

        // ScrollTrigger for each block to change images
        blocks.forEach((block, index) => {
          if (index === blocks.length - 1) return;
          ScrollTrigger.create({
            trigger: block,
            start: "top center",
            end: "bottom center",
            scrub: true,
            // markers: true,
            onEnter: () => activate(index),
            onEnterBack: () => activate(index),
            invalidateOnRefresh: true,
          });
        });

        // Vertical movement calculation
        let mayHeight = spacial ? 90 : 105;

        blocks.forEach((block, index) => {
          gsap.to(block, {
            y: () => `-${blocks.length * mayHeight}% + ${index * 100}%`,
            ease: "none",
            scrollTrigger: {
              trigger: blocksContainer,
              start: "top 20%",
              endTrigger: blocks[blocks.length - 1],
              end: "bottom 65%",
              scrub: 3,
              // markers: true,
              invalidateOnRefresh: true,
            },
          });
        });

        // Function to activate block & image
        function activate(index) {
          // Highlight blocks
          blocks.forEach((b, i) => {
            gsap.to(b, {
              opacity: i === index ? 1 : 0.3,
              duration: 0.3,
            });
          });

          // Crossfade images
          images.forEach((img, i) => {
            gsap.to(img, {
              opacity: i === index ? 1 : 0,
              duration: 0.5,
              ease: "power1.inOut",
              overwrite: "auto",
            });
          });
        }
      },
    });
  }

  syncImageChangeAnimation({
    sectionName: ".amazon-ppc-section",
    blockSelector: ".amazon-ppc-content-text",
    imageSelector: ".amazon-ppc-img img",
  });

  syncImageChangeAnimation({
    sectionName: ".amazon-keyword2-section",
    blockSelector: ".amazon-keyword2-content-text",
    imageSelector: ".amazon-keyword2-img img",
    spacial: true,
  });

  // sync image change with block end

  // ------------------------------
  // Merge timelines
  // ------------------------------
  mainTimeline.add(horizontalTimeline);
  mainTimeline.add(BackgroundColorChangeTimeline);
 
  ScrollTrigger.create({
    trigger: ".amazon-ppc-strategy-container",
    start: "top top",
    onEnter: () => {
      document.getElementById("amazon-ppc-strategy-container-id").classList.add("bg-color-active")
      document.getElementById("question-pricing-section-id").classList.add("bg-color-active")
    },
    onLeaveBack: () => {
      document.getElementById("amazon-ppc-strategy-container-id").classList.remove("bg-color-active")
      document.getElementById("question-pricing-section-id").classList.remove("bg-color-active")
    },
    // markers: true,
  });
  
  ScrollTrigger.create({
    trigger: ".amazon-advertising-pricing-section",
    start: "top top",
    onEnter: () => {
      document.getElementById("amazon-advertising-pricing-section-id").classList.add("bg-color-active")
      document.getElementById("bg-white-for-extra-id").classList.add("bg-color-active")
    },
    onLeaveBack: () => {
      document.getElementById("amazon-advertising-pricing-section-id").classList.remove("bg-color-active")
      document.getElementById("bg-white-for-extra-id").classList.remove("bg-color-active")
    },
    // markers: true,
  });
  
  // ------------------------------
  // Handle window resize
  // ------------------------------
  function updateLayout() {
    ScrollTrigger.refresh();
  }

  // On page load
  window.addEventListener("load", updateLayout);

  // On window resize
  window.addEventListener("resize", updateLayout);
});
