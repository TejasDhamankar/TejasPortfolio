import React, { useEffect, useRef, useState } from "react";
import { socials } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-scroll";

const Navbar = () => {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const contactRef = useRef(null);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const overlayRef = useRef(null);

  const tl = useRef(null);
  const iconTl = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(true);

  useGSAP(() => {
    gsap.set(navRef.current, { xPercent: 100, filter: "blur(10px)" });
    gsap.set([linksRef.current, contactRef.current], {
      autoAlpha: 0,
      x: -20,
    });

    // 🔥 BACKDROP Blur + Dim Layer
    gsap.set(overlayRef.current, { autoAlpha: 0 });

    tl.current = gsap
      .timeline({ paused: true })
      .to(overlayRef.current, {
        autoAlpha: 1,
        duration: 0.4,
        ease: "power2.out",
      })
      .to(
        navRef.current,
        {
          xPercent: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
        },
        "<"
      )
      .to(
        linksRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<+0.1"
      )
      .to(
        contactRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      );

    // 🔥 Burger → Close Animation
    iconTl.current = gsap
      .timeline({ paused: true })
      .to(topLineRef.current, {
        rotate: 45,
        y: 4,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        bottomLineRef.current,
        {
          rotate: -45,
          y: -4,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "<"
      );

    // 🔥 Hover animations for nav links
    linksRef.current.forEach((link) => {
      const underline = document.createElement("div");
      underline.className = "absolute bottom-0 left-0 h-[2px] bg-white w-full scale-x-0 origin-left";
      link.appendChild(underline);

      link.addEventListener("mouseenter", () => {
        gsap.to(underline, { scaleX: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(link, { x: 10, duration: 0.3, ease: "power3.out" });
      });

      link.addEventListener("mouseleave", () => {
        gsap.to(underline, { scaleX: 0, duration: 0.3, ease: "power2.in" });
        gsap.to(link, { x: 0, duration: 0.3, ease: "power3.out" });
      });
    });
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowBurger(currentScrollY <= lastScrollY || currentScrollY < 10);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    if (isOpen) {
      tl.current.reverse();
      iconTl.current.reverse();
    } else {
      tl.current.play();
      iconTl.current.play();
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* 🔥 Background dim overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/70 backdrop-blur-md pointer-events-none z-40"
      ></div>

      <nav
        ref={navRef}
        className="fixed z-50 flex flex-col w-full h-full px-10 uppercase bg-black text-white/80 py-28 gap-y-10 md:w-1/2 md:left-1/2 md:justify-center"
      >
        <div className="flex flex-col text-5xl gap-y-4 md:text-6xl lg:text-7xl relative">
          {["home", "services", "about", "work", "contact"].map(
            (section, index) => (
              <div
                key={index}
                ref={(el) => (linksRef.current[index] = el)}
                className="relative cursor-pointer"
              >
                <Link
                  className="transition-all duration-300 hover:text-white"
                  to={`${section}`}
                  smooth
                  offset={0}
                  duration={1500}
                >
                  {section}
                </Link>
              </div>
            )
          )}
        </div>

        {/* CONTACT AREA */}
        <div
          ref={contactRef}
          className="flex flex-col flex-wrap gap-8 mt-12 md:flex-row md:justify-between"
        >
          <div className="font-light">
            <p className="tracking-wider text-white/50">E-mail</p>
            <p className="text-lg tracking-widest lowercase md:text-xl">
              dhamankartejas14@gmail.com
            </p>
          </div>

          <div className="font-light">
            <p className="tracking-wider text-white/50">Social Media</p>
            <div className="flex flex-wrap gap-x-4">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="relative text-sm leading-loose tracking-widest uppercase hover:text-white transition-colors duration-300"
                >
                  {"{ "}
                  {social.name}
                  {" }"}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* BURGER BUTTON */}
      <div
        className="fixed z-50 flex flex-col items-center justify-center gap-1 transition-all duration-300 bg-black rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20 top-4 right-10 shadow-xl shadow-black/40"
        onClick={toggleMenu}
        style={
          showBurger
            ? { clipPath: "circle(50% at 50% 50%)" }
            : { clipPath: "circle(0% at 50% 50%)" }
        }
      >
        <span
          ref={topLineRef}
          className="block w-8 h-0.5 bg-white rounded-full origin-center"
        ></span>
        <span
          ref={bottomLineRef}
          className="block w-8 h-0.5 bg-white rounded-full origin-center"
        ></span>
      </div>
    </>
  );
};

export default Navbar;
