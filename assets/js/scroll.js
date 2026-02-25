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
      document.getElementById("back").classList.add("bg-color-active");
      document.getElementById("tergeting-section").classList.add("bg-color-active");
    },
    onLeaveBack: () => {
      document.getElementById("back").classList.remove("bg-color-active");
      document.getElementById("tergeting-section").classList.remove("bg-color-active");
    },
    // markers: true
  });

  // ------------------------------
  // Card Section Scroll animation
  // ------------------------------

  ScrollTrigger.matchMedia({
    "(min-width: 768px)": function() {

      // Selectors
      const sectionName2 = "#tergeting-section";
      const blockSelector2 = ".timeline-content-item";
      const imageSelector2 = ".timeline-image";
      const imageClassName2 = ".timeline-content";

      // Get all blocks
      const allBlocks = gsap.utils.toArray(blockSelector2);

      // Filter out empty block (important fix)
      const blocks2 = allBlocks.filter((block) => block.textContent.trim() !== "");

      const images2 = gsap.utils.toArray(imageSelector2);
      const blocksContainer2 = document.querySelector(`${sectionName2} ${imageClassName2}`);

      const dots2 = gsap.utils.toArray(".timeline-line .dot");

      // --------------------
      // Initial Setup
      // --------------------
      gsap.set(blocks2, { opacity: 0, y: 0 });
      gsap.set(blocks2[0], { opacity: 1 });

      gsap.set(images2, { opacity: 0 });
      gsap.set(images2[0], { opacity: 1 });

      // --------------------
      // Pin Section Properly
      // --------------------
      ScrollTrigger.create({
        trigger: sectionName2,
        start: "top top",
        endTrigger: blocks2[blocks2.length - 1], // last REAL block
        end: "bottom center",
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
        markers: false,
      });

      // --------------------
      // Image + Content Switch
      // --------------------
      blocks2.forEach((block, index) => {
        ScrollTrigger.create({
          trigger: block,
          start: "top center",
          end: "bottom center",
          scrub: true,
          onEnter: () => activate2(index),
          onEnterBack: () => activate2(index),
          invalidateOnRefresh: true,
        });
      });

      // --------------------
      // Vertical Movement
      // --------------------

      blocks2.forEach((block, index) => {
        gsap.to(block, {
          y: () => `-${(blocks2.length - 1) * 100}%`,
          ease: "none",
          scrollTrigger: {
            trigger: blocksContainer2,
            start: "top 20%",
            endTrigger: blocks2[blocks2.length - 1],
            end: "bottom 60%",
            scrub: 2,
            invalidateOnRefresh: true,
          },
        });
      });

      // --------------------
      // Activate Function
      // --------------------
      function activate2(index) {
        // Fade content
        blocks2.forEach((b, i) => {
          gsap.to(b, {
            opacity: i === index ? 1 : 0,
            duration: 0.3,
            overwrite: "auto",
          });
        });

        // Crossfade images
        images2.forEach((img, i) => {
          gsap.to(img, {
            opacity: i === index ? 1 : 0,
            duration: 0.5,
            ease: "power1.inOut",
            overwrite: "auto",
          });
        });

        dots2.forEach((dot, i) => {
          dot.classList.toggle("active", i === index);
          dot.classList.toggle("isFinished", i < index);
        });

        const progressLine = document.querySelector(".timeline-line-progress");

        if (progressLine) {
          const totalDots = dots2.length;
          const percentage = (index / (totalDots - 1)) * 100;
          progressLine.style.height = `${percentage}%`;
        }
      }

      // Click logic for dots
      dots2.forEach((dot, i) => {
        dot.addEventListener("click", () => {
          const test = document.querySelector(".timeline-content");

          // Correct way to get element height
          const contentHeight = test.offsetHeight;

          // Use this value (or adjust) for offsetY
          gsap.to(window, {
            duration: 0.2,
            scrollTo: {
              y: blocks2[i],
              offsetY: contentHeight * 0.75,
            },
            ease: "none",
          });
        });
      });
    },
    "(max-width: 767px)": function() {
      const contentItems = document.querySelectorAll(".timeline-content-item");
      const images = document.querySelectorAll(".timeline-image");
      const dots = document.querySelectorAll(".dot");
    
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
          ease: "power2.inOut",
        })
    
          // Prepare next slide
          .set([contentItems[index], images[index]], {
            xPercent: 100 * direction,
            opacity: 0,
          })
    
          // Slide in next
          .to([contentItems[index], images[index]], {
            xPercent: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.inOut",
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
          dot.classList.toggle("isFinished", i < index);
        });
    
        const progressLine = document.querySelector(".timeline-line-progress");
    
        if (progressLine) {
          const totalDots = dots.length;
          const percentage = (index / (totalDots - 1)) * 100;
          progressLine.style.width = `${percentage}%`;
        }
      }
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

  function syncImageChangeAnimation({ sectionName, blockSelector, imageSelector, imageClassName, spacial = false }) {
    const blocks = gsap.utils.toArray(blockSelector);
    const images = gsap.utils.toArray(imageSelector);
    const blocksContainer = document.querySelector(`${sectionName} ${imageClassName}`);

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
    imageClassName: ".amazon-content-img",
  });

  syncImageChangeAnimation({
    sectionName: ".amazon-keyword2-section",
    blockSelector: ".amazon-keyword2-content-text",
    imageSelector: ".amazon-keyword2-img img",
    imageClassName: ".amazon-content-img",
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
      },
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
  // window.addEventListener("resize", updateLayout);
});
