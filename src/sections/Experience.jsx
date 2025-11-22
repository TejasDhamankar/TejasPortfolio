import React, { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { experience } from "../constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const cardRefs = useRef([]);

  useGSAP(() => {
    cardRefs.current.forEach((el, index) => {
      if (!el) return;

      gsap.from(el, {
        y: 120,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      });
    });
  }, []);

  const text = `Roles I’ve taken on while sharpening my craft and
    building real-world, production-ready applications.`;

  return (
    <section id="experience" className="min-h-screen bg-black text-white">
      <AnimatedHeaderSection
        subTitle={"Journey, Growth & Real Work"}
        title={"Experience"}
        text={text}
        textColor={"text-white"}
        withScrollTrigger={true}
      />

      <div className="flex flex-col gap-8 px-10 pb-20">
        {experience.map((exp, index) => (
          <div
            key={exp.id}
            ref={(el) => (cardRefs.current[index] = el)}
            className="p-8 border border-white/20 rounded-2xl backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300"
          >
            {/* Title */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h2 className="text-3xl font-light">
                {exp.role} <span className="text-white/40">@ {exp.company}</span>
              </h2>
              <div className="flex items-center gap-4 mt-2 text-sm md:mt-0 text-white/40">
                {exp.stipend && exp.stipend.toLowerCase() !== "none" && (
                  <p className="px-3 py-1 bg-white/10 rounded-full">Stipend: {exp.stipend}</p>
                )}
                <p>{exp.period}</p>
              </div>
            </div>

            {/* Description */}
            <p className="mt-4 text-lg text-white/70">{exp.description}</p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-3 mt-4">
              {exp.tech.map((t, i) => (
                <span
                  key={`${exp.id}-tech-${i}`}
                  className="px-3 py-1 text-sm bg-white/10 border border-white/20 rounded-full text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
