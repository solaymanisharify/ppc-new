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
    trigger: "#bg-color-change-tigger",
    start: "top top",
    end: "bottom bottom",
    onEnter: () => {
      document.getElementById('back').classList.add('bg-color-active')
      document.getElementById('tergeting-section').classList.add('bg-color-active')
    },
    onLeaveBack: () => {
      document.getElementById('back').classList.remove('bg-color-active')
      document.getElementById('tergeting-section').classList.remove('bg-color-active')
    },
    // markers: true
  });

  // ------------------------------
  // Card Section Scroll animation
  // ------------------------------

  let mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    const contentItems = document.querySelectorAll('.timeline-content-item');
    const contentContainer = document.querySelector('.timeline-content');
    const images = document.querySelectorAll('.timeline-image');
    const dots = document.querySelectorAll('.dot');
  
    // Initial setup: Show the first item and image
    gsap.set(contentItems, { opacity: 0 });
    gsap.set(contentItems[0], { opacity: 1, y: 0 });
    gsap.set(images, { opacity: 0 });
    gsap.set(images[0], { opacity: 1 });
  
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#tergeting-section", // Ensure this ID matches your HTML section
        start: "top top",
        end: () => "+=" + (contentItems.length / 2 * 100) + "%",
        pin: true,
        scrub: 1,
  
        onUpdate: (self) => {
          // Find the closest index based on scroll progress
          const activeIndex = Math.round(self.progress * (contentItems.length - 1));
          updateDots(activeIndex);
        }
      }
    });
  
    contentItems.forEach((item, i) => {
      // We skip the logic for the very first item since it's already visible
      if (i === 0) {
        tl.addLabel("step0", 0);
        return;
      }
  
      // startTime creates an overlap so the scroll and fade happen together
      const startTime = i - 0.5; 
      const endTime = i;
  
      // 1. SCROLL THE CONTENT: Move the whole container up by 100% * index
      tl.to(contentContainer, { 
        yPercent: -100 * i, 
        ease: "power2.inOut",
        duration: 1 
      }, startTime)
      
      // 2. IMAGE TRANSITION: Fade out old, fade in new
      .to(images[i - 1], { opacity: 0, duration: 0.1 }, startTime)
      .to(images[i], { opacity: 1, duration: 0.3 }, startTime)
      
      // 3. TEXT TRANSITION: Fade the text items for extra polish
      .to(contentItems[i - 1], { opacity: 0, duration: 0.1 }, startTime)
      .to(item, { opacity: 1, duration: 0.3 }, startTime);
  
      tl.addLabel("step" + i, endTime);
    });
  
    // Click logic for dots
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        const targetScroll = tl.scrollTrigger.labelToScroll("step" + i);
        
        gsap.to(window, {
          duration: 0.8,
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
  
      if (progressLine) {
        const totalDots = dots.length;
        const percentage = (activeIndex / (totalDots - 1)) * 100;
        progressLine.style.height = `${percentage}%`;
      }
    }
  });


  mm.add("(max-width: 767px)", () => {

  console.log("Mobile Slider Mode");

  const contentItems = document.querySelectorAll('.timeline-content-item');
  const images = document.querySelectorAll('.timeline-image');
  const dots = document.querySelectorAll('.dot');

  let activeIndex = 0;

  // Initial state
  gsap.set(contentItems, { xPercent: 100, opacity: 0 });
  gsap.set(images, { xPercent: 100, opacity: 0 });

  gsap.set(contentItems[0], { xPercent: 0, opacity: 1 });
  gsap.set(images[0], { xPercent: 0, opacity: 1 });

  function goToSlide(index) {
    if (index === activeIndex) return;

    let direction = index > activeIndex ? 1 : -1;

    let tl = gsap.timeline();

    // Slide out current
    tl.to([contentItems[activeIndex], images[activeIndex]], {
      xPercent: -100 * direction,
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut"
    })

    // Prepare next slide
    .set([contentItems[index], images[index]], {
      xPercent: 100 * direction,
      opacity: 0
    })

    // Slide in next
    .to([contentItems[index], images[index]], {
      xPercent: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power2.inOut"
    });

    updateDots(index);
    activeIndex = index;
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      goToSlide(i);
    });
  });

  function updateDots(index) {
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

});

  // ---------------------------------
  // Card Section Scroll animation end
  // ---------------------------------

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

  // ------------------------------
  // vertical cards scroll end
  // ------------------------------


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
  // ------------------------------
  // horizontal cards scroll end
  // ------------------------------

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

  // -------------------------------
  // sync image change with block end
  // -------------------------------

  // ------------------------------
  // Merge timelines
  // ------------------------------

  // horizontalTimeline.add(BackgroundColorChangeTimeline);
  // mainTimeline.add(horizontalTimeline);

  // ------------------------------
  // Background color change on scroll
  // ------------------------------

  ["#bg-color-change-tigger2", "#bg-color-change-tigger3", "#bg-color-change-tigger4"].forEach((id, i) => {
    ScrollTrigger.create({
      trigger: id,
      start: "top top",
      end: "bottom bottom",
      onEnter: () => {
        // If index is even (0, 2), add class. If odd (1), remove.
        document.getElementById("main-section").classList.toggle("bg-color-active", i % 2 === 0);
      },
      onLeaveBack: () => {
        // Reverse logic: If index is even, remove. If odd, add.
        document.getElementById("main-section").classList.toggle("bg-color-active", i % 2 !== 0);
      }
    });
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
