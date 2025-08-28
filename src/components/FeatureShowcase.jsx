import React, { useEffect, useMemo, useRef, useState } from "react";
import PhoneFrame from "./PhoneFrame";
import Spacer from "./Spacer";

export default function FeatureShowcase() {
  const features = useMemo(
    () => [
      {
        title: "Feature No.1",
        heading: "Text Heading Display",
        body:
          "Lorem ipsum dolor pitsium sit amet consectetur adipisicing elit, sed do eiusmod.",
        image: "/assets/image-1.jpg",
      },
      {
        title: "Feature No.2",
        heading: "Smarter Search",
        body:
          "Find anything instantly with  filters and on‑device caching for lightning‑fast results.",
        image: "/assets/image-2.jpg",
      },
      {
        title: "Feature No.3",
        heading: "Private by Default",
        body:
          "End‑to‑end encryption keeps your data safe. You control what is shared and with whom.",
        image: "/assets/image-3.jpg",
      },
      {
        title: "Feature No.4",
        heading: "Offline First",
        body:
          "Work without internet. Changes sync automatically when you go online again.",
        image: "/assets/image-4.jpg",
      },
      {
        title: "Feature No.5",
        heading: "Customizable Themes",
        body:
          "Match your vibe. Pick from presets or build your own theme with live preview.",
        image: "/assets/image-5.jpg",
      },
    ],
    []
  );

  const sectionRef = useRef(null)
  const stickyRef = useRef(null)
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new window.IntersectionObserver(
      (entries) => setInView(entries[0]?.isIntersecting ?? false),
      { root: null, threshold: 0.1 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const container = sectionRef.current
    if (!container) return
    const onScroll = () => {
        const rect = container.getBoundingClientRect();
  const vh = window.innerHeight;
  const scrolled = Math.min(vh, Math.max(0, vh - rect.top));

  const totalScrollable = container.offsetHeight - vh;

  const progress = totalScrollable > 0 ? (window.scrollY - container.offsetTop) / totalScrollable : 0;

  const idx = Math.min(
    features.length - 1,
    Math.max(0, Math.floor(progress * features.length))
  )

  setActive(idx);
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll)
    }
  }, [features.length]);

  const goPrev = () => setActive((i) => (i - 1 + features.length) % features.length);
  const goNext = () => setActive((i) => (i + 1) % features.length)

  useEffect(() => {
    const onKey = (e) => {
      if (!inView) return;
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey);
  }, [inView]);

  return (
    <div>
      <Spacer label="Scroll down" />

      <section ref={sectionRef} className="relative" style={{ height: `calc(100vh * ${features.length})` }}>
        <div ref={stickyRef} className="sticky top-0 h-screen flex items-center bg-white border-t border-b border-gray-200 ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-20 w-full max-w-full mx-auto items-center px-4 md:px-0">
            <div className="mb-8  items-center md:items-start md:mb-0 md:ml-8 md:mr-2 lg:ml-32  flex flex-col gap-3 pt-8 md:pt-0">

              <p className="text-blue-500 font-semibold mb-2">{features[active].title}</p>
              <h2 className="text-xl  font-semibold mb-3 uppercase">{features[active].heading}</h2>
              <p className="text-gray-500 text-base mb-4 max-w-md w-xs ml-9 md:ml-0">{features[active].body}</p>
              <div className="flex gap-2 mt-5">

                <button className="w-11 h-11 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-xl hover:shadow" onClick={goPrev} aria-label="Previous feature">←</button>
                {/* <div className="w-0.5 h-10 bg-blue-400 rounded mt-1.5" ></div> */}
                <button className="w-11 h-11 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-xl hover:shadow" onClick={goNext} aria-label="Next feature">→</button>
              </div>
            </div>
            <div className="flex justify-center mb-8 md:mb-0">
              <PhoneFrame imageUrl={features[active].image} />
            </div>
            <div className="md:ml-8 ml-52">
              <h3 className="mb-3 text-lg font-medium">Feature Showcase</h3>
              <ul className="grid gap-2 " role="tablist" aria-label="Features">
                {features.map((f, idx) => (
                  <li key={idx} role="presentation">
                    <button
                      role="tab"
                      aria-selected={active === idx}
                      aria-controls={`feature-panel-${idx}`}
                      className={`w-full grid grid-cols-[6px_1fr] items-center  gap-3 py-3 pl-0 pr-1 text-left cursor-pointer bg-transparent border-0 ${active === idx ? "" : ""}`}
                      onClick={() => setActive(idx)}
                    >
                      <span className={`h-9 w-0.5 rounded bg-blue-100 transition-all ${active === idx ? "bg-blue-400 " : "bg-white"}`} aria-hidden />
                      <span className={`text-sm ${active === idx ? "text-blue-900 font-semibold" : "text-gray-500"}`}>Feature {idx + 1}: {f.heading}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Spacer label="More page content" />
    </div>
  );
}
