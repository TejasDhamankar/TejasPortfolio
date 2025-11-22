import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
  const text = `I craft scalable full-stack solutions with clean architecture.
  Passionate about building fast, modern apps.
  From UI to backend — I ship with precision.`;

  const aboutContent = {
    intro: `Full-stack developer focused on creating high-performance, intuitive applications. From pixel-perfect React/Next.js interfaces to secure, optimized backends — I build with intention and clarity.`,
    hobbiesTitle: "When I’m not coding:",
    hobbies: [
      { icon: "⚡️", text: "Experimenting with new tech and improving my workflow" },
      { icon: "🎥", text: "Learning, teaching, and sharing ideas with other developers" },
      { icon: "♟", text: "Sharpening my mind with chess or exploring fitness and discipline" },
    ],
    outro: "Code, growth, and craftsmanship — that’s what drives me.",
  };

  const imgRef = useRef(null);
  const contentRef = useRef(null);
  useGSAP(() => {
    // Section scaling effect on scroll
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
        markers: false,
      },
      ease: "power1.inOut",
    });

    // Image reveal animation
    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
    });

    // Content text animation
    gsap.from(contentRef.current.children, {
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: contentRef.current },
    });
  });
  return (
    <section id="about" className="min-h-screen bg-black rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={"Cod with purpose, Built to scale"}
        title={"About"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />
      <div className="flex flex-col items-start justify-center gap-12 px-10 pb-24 lg:flex-row lg:gap-20">
        <img
          ref={imgRef}
          src="images/man1.png"
          alt="man"
          className="w-full lg:w-1/3 rounded-3xl"
        />
        <div ref={contentRef} className="flex flex-col w-full gap-8 text-xl font-light tracking-wide md:text-2xl text-white/80 lg:w-2/3">
          <p className="text-pretty">{aboutContent.intro}</p>
          <div>
            <h3 className="mb-4 text-2xl md:text-3xl text-white">{aboutContent.hobbiesTitle}</h3>
            <ul className="flex flex-col gap-3">
              {aboutContent.hobbies.map((hobby, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span>{hobby.icon}</span>
                  <p className="text-lg md:text-xl text-white/60">{hobby.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <p className="pt-4 italic border-t border-white/20 text-pretty text-white/90">{aboutContent.outro}</p>
        </div>
      </div>
    </section>
  );
};

export default About;
