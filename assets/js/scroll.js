window.addEventListener("load", () => {
    // Initialize a new Lenis instance for smooth scrolling
    const lenis = new Lenis();
    
    // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
    lenis.on('scroll', ScrollTrigger.update);
    
    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000); // Convert time from seconds to milliseconds
    });
    
    // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0);
});


window.addEventListener("load", () => {
  gsap.registerPlugin(ScrollTrigger);
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
  // Sync Image Change with Block
  // ------------------------------

  // function syncImageChangeAnimation({ sectionName, blockSelector, imageSelector, spacial= false }) {
  //   const blocks = gsap.utils.toArray(blockSelector);
  //   const images = gsap.utils.toArray(imageSelector);
  //   const blocksContainer = document.querySelector(`${sectionName} .amazon-content-img`);

  //   // Pin blocks
  //   ScrollTrigger.create({
  //     trigger: sectionName,
  //     start: "top 14%",
  //     endTrigger: blocks[blocks.length - 1],
  //     end: "bottom center",
  //     pin: true,
  //     scrub: true,
  //     invalidateOnRefresh: true,
  //     // markers: true,
  //   });

  //   // change image with block
  //   blocks.forEach((block, index) => {
  //     if (index === blocks.length - 1) return;
  //     ScrollTrigger.create({
  //       trigger: block,
  //       start: "top center",
  //       end: "bottom center",
  //       scrub: true,
  //       // markers: true,

  //       onEnter: () => activate(index),
  //       onEnterBack: () => activate(index),
  //       invalidateOnRefresh: true,
  //     });
  //   });

  //   let mayHight = spacial ? 90 : 105;

  //   // with scroll
  //   blocks.forEach((block, index) => {
  //     gsap.to(block, {
  //       y: () => `-${blocks.length * mayHight}% + ${index * 100}%`,
  //       ease: "none",
  //       scrollTrigger: {
  //         trigger: blocksContainer,
  //         start: "top 20%",
  //         endTrigger: blocks[blocks.length - 1],
  //         end: "bottom 65%",
  //         scrub: 3,
  //         // markers: true,
  //         invalidateOnRefresh: true,
  //       },
  //     });
  //   });

  //   function activate(index) {
  //     // Highlight blocks
  //     blocks.forEach((b, i) => {
  //       gsap.to(b, {
  //         opacity: i === index ? 1 : 0.3,
  //         duration: 0.3,
  //       });
  //     });

  //     // Crossfade images
  //     images.forEach((img, i) => {
  //       gsap.to(img, {
  //         opacity: i === index ? 1 : 0,
  //         duration: 0.5,
  //         ease: "power1.inOut",
  //         overwrite: "auto",
  //       });
  //     });
  //   }
  // }

function syncImageChangeAnimation({ sectionName, blockSelector, imageSelector, spacial = false }) {
  const blocks = gsap.utils.toArray(blockSelector);
  const images = gsap.utils.toArray(imageSelector);
  const blocksContainer = document.querySelector(`${sectionName} .amazon-content-img`);

  // Use matchMedia for responsive GSAP animations
  ScrollTrigger.matchMedia({
    // Mobile & tablet
    "(min-width: 850px)": function() {

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
    spacial: true
  });

  // sync image change with block end

  // ------------------------------
  // Merge timelines
  // ------------------------------
  mainTimeline.add(horizontalTimeline);

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
