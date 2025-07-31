document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  document.querySelectorAll(".scroll-wrap").forEach((wrap) => {
    const triggers = wrap.querySelectorAll(".scroll-trigger");
    const items = wrap.querySelectorAll(".scroll-item");

    triggers.forEach((trigger, index) => {
      const background = trigger.querySelector(".scroll-background");
      const item = items[index];

      if (index === 0) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: trigger,
            start: "top top",
            end: "bottom top",
            scrub: true,
            // markers: true,
          },
          defaults: { ease: "none" },
        });

        tl.fromTo(
          item,
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }
        );
      } else if (index === items.length - 1) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: trigger,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
            // markers: true,
          },
          defaults: { ease: "none" },
        });

        tl.fromTo(
          item,
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }
        );
      } else {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
          defaults: { ease: "none" },
        });

        tl.fromTo(
          item,
          { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }
        );

        tl.to(item, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        });
      }

      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        defaults: { ease: "none" },
      });

      tl2.to(background, { yPercent: 50 });
    });
  });
});
