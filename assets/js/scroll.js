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
        borderRadius: "0px",
      },
      {
        scale: 1,
        borderRadius: "10px",
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
      "<",
    );
  });

  // horizontal cards scroll end

  // ------------------------------
  // Sync Image Change with Block
  // ------------------------------

  function syncImageChangeAnimation({ sectionName, blockSelector, imageSelector, spacial= false }) {
    const blocks = gsap.utils.toArray(blockSelector);
    const images = gsap.utils.toArray(imageSelector);
    const blocksContainer = document.querySelector(`${sectionName} .amazon-content-img`);

    // Pin blocks
    ScrollTrigger.create({
      trigger: sectionName,
      start: "top top",
      endTrigger: blocks[blocks.length - 1],
      end: "bottom center",
      pin: true,
      scrub: true,
      invalidateOnRefresh: true,
      // markers: true,
    });

    // change image with block
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

    let mayHight = spacial ? 90 : 105;

    // with scroll
    blocks.forEach((block, index) => {
      gsap.to(block, {
        y: () => `-${blocks.length * mayHight}% + ${index * 100}%`,
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
  }

  syncImageChangeAnimation({
    sectionName: ".amazon-ppc",
    blockSelector: ".amazon-ppc-content-text",
    imageSelector: ".amazon-ppc-img img",
  });
  syncImageChangeAnimation({
    sectionName: ".amazon-keyword2",
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
    // setWrapperHeight();
    ScrollTrigger.refresh();
  }

  // On page load
  window.addEventListener("load", updateLayout);

  // On window resize
  window.addEventListener("resize", updateLayout);
});
