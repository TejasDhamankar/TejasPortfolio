import { useGSAP } from "@gsap/react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import Marquee from "../components/Marquee";
import { socials } from "../constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const text = `Got a question, how or project Idea?
    WE’D love to hear from you and discus further!`;

  const items = [
    "just imagin, I code",
    "just imagin, I code",
    "just imagin, I code",
    "just imagin, I code",
    "just imagin, I code",
  ];

  useGSAP(() => {
    // Entrance animations
    gsap.from("#contact-section", {
      opacity: 0,
      y: 80,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#contact-section",
        start: "top 85%",
      },
    });

    gsap.from(".social-link", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.25,
      ease: "back.out(1.4)",
      scrollTrigger: {
        trigger: "#contact-section",
        start: "top 70%",
      },
    });

    // Hover Animations (email + phone + social links)
    const hoverItems = gsap.utils.toArray(".hover-animated");

    hoverItems.forEach((el) => {
      const underline = el.querySelector(".underline");

      el.addEventListener("mouseenter", () => {
        gsap.to(el, { y: -3, duration: 0.3, ease: "power3.out" });
        gsap.to(el, { color: "#d1a954", letterSpacing: "1px", duration: 0.3 });
        gsap.to(underline, { scaleX: 1, duration: 0.3, ease: "power2.out" });
      });

      el.addEventListener("mouseleave", () => {
        gsap.to(el, { y: 0, color: "#ffffff", letterSpacing: "0px", duration: 0.3 });
        gsap.to(underline, { scaleX: 0, duration: 0.3, ease: "power2.in" });
      });
    });
  }, []);

  return (
    <section
      id="contact-section"
      className="flex flex-col justify-between min-h-screen bg-black"
    >
      <div>
        <AnimatedHeaderSection
          subTitle={"You Dream It, I Code it"}
          title={"Contact"}
          text={text}
          textColor={"text-white"}
          withScrollTrigger={true}
        />

        <div className="flex px-10 font-light text-white uppercase lg:text-[32px] text-[26px] leading-none mb-10">
          <div className="flex flex-col w-full gap-10">

            {/* EMAIL */}
            <div className="social-link">
              <h2>E-mail</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <p className="hover-animated relative inline-block cursor-pointer text-xl tracking-wider lowercase md:text-2xl lg:text-3xl">
                dhamankartejas14@gmail.com
                <span className="underline absolute left-0 bottom-0 w-full h-[2px] bg-gold origin-left scale-x-0"></span>
              </p>
            </div>

            {/* PHONE */}
            <div className="social-link">
              <h2>Phone</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <p className="hover-animated relative inline-block cursor-pointer text-xl lowercase md:text-2xl lg:text-3xl">
                +91 8262869754
                <span className="underline absolute left-0 bottom-0 w-full h-[2px] bg-gold origin-left scale-x-0"></span>
              </p>
            </div>

            {/* SOCIAL MEDIA */}
            <div className="social-link">
              <h2>Social Media</h2>
              <div className="w-full h-px my-2 bg-white/30" />
              <div className="flex flex-wrap gap-3">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    className="hover-animated relative inline-block cursor-pointer text-xs md:text-sm uppercase leading-loose tracking-wides"
                  >
                    {"{ "}
                    {social.name}
                    {" }"}
                    <span className="underline absolute left-0 -bottom-1 w-full h-[2px] bg-gold origin-left scale-x-0"></span>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <Marquee items={items} className="text-white bg-transparent" />
    </section>
  );
};

export default Contact;
