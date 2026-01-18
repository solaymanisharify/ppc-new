window.addEventListener("load", () => {
  gsap.registerPlugin(ScrollTrigger);
  // ------------------------------
  // Vertical Cards Scroll
  // ------------------------------
  const verticalCards = gsap.utils.toArray(".panel__card");

  verticalCards.forEach((verticalCard, index) => {
    if (index !== 0) {
      gsap.set(verticalCard, {
        yPercent: 200,
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
        borderRadius: "0px",
      },
      {
        scale: 1,
        borderRadius: "10px",
        duration: 0.5,
      },
      ">-0.7" // starts halfway through the slide
    );
  });

  // vertical cards scroll end

  // ------------------------------
  // Horizontal Cards Scroll
  // ------------------------------
  const horizontalCardContainer = document.querySelector(".horizontal");
  const horizontalCards = gsap.utils.toArray(".case-study-container");
  const stickyWrapper = document.querySelector(".sticky");

  function getScrollAmount() {
    let extraWidth = window.innerWidth - horizontalCardContainer.offsetWidth;
    return -(horizontalCardContainer.scrollWidth - window.innerWidth + extraWidth);
  }

  // function setWrapperHeight() {
  //   stickyWrapper.style.height = `${window.innerHeight + getScrollAmount()}px`;
  // }
  // setWrapperHeight();

  const horizontalTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".sticky",
      start: "top 4%",
      end: () => `+=${horizontalCardContainer.scrollWidth}`,
      scrub: 1,
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
        // opacity: 0.6,
        // scale: 0.95,
        scrollTrigger: {
          trigger: horizontalCard,
          containerAnimation: horizontalTimeline,
          start: "left 85%",
          end: "center 60%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      },
      "<"
    );
  });

  // horizontal cards scroll end

  // ------------------------------
  // Sync Image Change with Block
  // ------------------------------

  const blocks = gsap.utils.toArray(".amazon-ppc-content-text");
  const images = gsap.utils.toArray(".amazon-ppc-img img");
  const blocksContainer = document.querySelector(".amazon-content-img");

  ScrollTrigger.create({
    trigger: ".amazon-section",
    start: "top top",
    endTrigger: blocks[blocks.length - 1],
    end: "bottom center",
    pin: true,
    scrub: true,
    invalidateOnRefresh: true,
    // markers: true,
  });

  blocks.forEach((block, index) => {
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

  blocks.forEach((block, index) => {
    gsap.to(block, {
      y: () => `-${blocks.length * 100}%`,
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

  // sync image change with block end

// ------------------------------
  // Merge timelines
  // ------------------------------
  mainTimeline.add(horizontalTimeline);

  // ------------------------------
  // Handle window resize
  // ------------------------------
  function updateLayout() {
    // setWrapperHeight();
    ScrollTrigger.refresh();
  }
  
  // On page load
  window.addEventListener("load", updateLayout);
  
  // On window resize
  window.addEventListener("resize", updateLayout);
});

