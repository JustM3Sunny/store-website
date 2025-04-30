import "./index.css";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import gsap from "gsap";

function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const headingRef = useRef(null);
  const growingSpanRef = useRef(null);
  const mouseFollowerRef = useRef(null);
  const locomotiveScrollRef = useRef(null);
  const [isLocomotiveInitialized, setIsLocomotiveInitialized] = useState(false);

  // Initialize Locomotive Scroll
  useEffect(() => {
    let locomotiveScrollInstance;

    try {
      locomotiveScrollInstance = new LocomotiveScroll({
        smooth: true,
        smartphone: { smooth: true },
        tablet: { smooth: true },
      });
      locomotiveScrollRef.current = locomotiveScrollInstance;
      setIsLocomotiveInitialized(true);
    } catch (error) {
      console.error("Locomotive Scroll initialization error:", error);
      return;
    }

    return () => {
      if (locomotiveScrollInstance) {
        locomotiveScrollInstance.destroy();
      }
    };
  }, []);

  // Mouse follower effect
  const handleMouseMove = useCallback((e) => {
    if (mouseFollowerRef.current) {
      gsap.to(mouseFollowerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Hover effect for links
  const handleHover = useCallback(() => {
    gsap.to(mouseFollowerRef.current, {
      scale: 3,
      backgroundColor: "rgba(255, 255, 255, 0.188)",
      duration: 0.3,
    });
  }, []);

  const handleUnhover = useCallback(() => {
    gsap.to(mouseFollowerRef.current, {
      scale: 1,
      backgroundColor: "transparent",
      duration: 0.3,
    });
  }, []);

  // Click handler for heading
  const handleClick = useCallback(
    (e) => {
      setShowCanvas((prevShowCanvas) => {
        const newShowCanvas = !prevShowCanvas;

        gsap.killTweensOf("body");

        if (!prevShowCanvas) {
          if (growingSpanRef.current) {
            gsap.set(growingSpanRef.current, {
              top: e.clientY,
              left: e.clientX,
            });

            gsap.to("body", {
              color: "#000",
              backgroundColor: "pink",
              duration: 1.2,
              ease: "power2.inOut",
            });

            gsap.to(growingSpanRef.current, {
              scale: 1000,
              duration: 2,
              ease: "power2.inOut",
              onComplete: () => {
                gsap.set(growingSpanRef.current, {
                  scale: 0,
                  clearProps: "all",
                });
              },
            });
          }
        } else {
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });
        }

        return newShowCanvas;
      });
    },
    []
  );

  useEffect(() => {
    const headingElement = headingRef.current;
    if (headingElement) {
      headingElement.addEventListener("click", handleClick);
      return () => headingElement.removeEventListener("click", handleClick);
    }
  }, [handleClick]);

  const navLinks = useMemo(
    () => ["What we do", "Who we are", "How we give back", "Talk to us"],
    [],
  );

  const services = useMemo(
    () => ["Web Development", "UI/UX Design", "Brand Strategy"],
    [],
  );

  const teamMemberImages = useMemo(
    () => [
      "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHdlYiUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1576153192396-180ecef2a715?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fHdlYiUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fHdlYiUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D",
      "https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fHdlYiUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D",
    ],
    [],
  );

  const projectImages = useMemo(
    () => [
      "https://plus.unsplash.com/premium_photo-1739226530811-0c81c85fbd4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D",
      "https://images.pexels.com/photos/3769024/pexels-photo-3769024.jpeg?auto=compress&cs=tinysrgb&w=500",
      "https://images.pexels.com/photos/3769022/pexels-photo-3769022.jpeg?auto=compress&cs=tinysrgb&w=500",
    ],
    [],
  );

  const renderCanvases = useMemo(() => {
    return showCanvas
      ? data[0].map((canvasdets, index) => (
          <Canvas key={index} details={canvasdets} />
        ))
      : null;
  }, [showCanvas]);

  return (
    <>
      <div
        ref={mouseFollowerRef}
        className="w-4 h-4 rounded-full border-2 border-white/50 fixed top-0 left-0 pointer-events-none z-50"
      />
      <span
        ref={growingSpanRef}
        className="growing rounded-full block fixed top-[-20px] left-[-20px] w-5 h-5"
      ></span>

      <div className="w-full relative min-h-screen" ref={headingRef}>
        {renderCanvases}

        <div className="w-full relative z-[1] h-screen sticky top-0">
          <nav className="w-full p-8 flex justify-between z-50 fixed top-0">
            <div className="brand text-2xl font-medium hover:text-pink-200 transition-colors">
              VibeeStudios
            </div>
            <div className="links flex gap-10">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-md hover:text-pink-200 transition-colors relative group"
                  onMouseEnter={handleHover}
                  onMouseLeave={handleUnhover}
                >
                  {link}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-pink-200 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
          </nav>

          <div className="container mx-auto h-full flex flex-col justify-center px-8">
            <div className="textcontainer w-full max-w-4xl">
              <h3 className="text-5xl leading-[1.1] font-medium mb-8">
                Crafting Digital Experiences That
                <span className="text-pink-200 ml-3">Inspire Action</span>
              </h3>
              <p className="text-xl w-[90%] mb-12 font-light opacity-80 ">
                We combine cutting-edge technology with human-centered design
                to create digital solutions that drive real business results.
              </p>
              <div className="flex gap-6">
                <button className="px-8 py-3 bg-pink-200 rounded-full hover:bg-pink-300 transition-colors">
                  View Our Work
                </button>
                <button className="px-8 py-3 border border-white/20 rounded-full hover:border-pink-200 transition-colors">
                  Meet The Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="relative h-[100vh] px-8 py-28 bg-black/50 backdrop-blur-xl border-t-1">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-6xl mb-10 font-medium">Our Services</h2>
          <div className="grid grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-gradient-to-br from-black/30 to-black/10 hover:bg-black/40 transition-all group"
              >
                <div className="text-4xl mb-4 text-pink-200">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="text-3xl mb-4">{service}</h3>
                <p className="text-lg opacity-80">
                  <img
                    className="rounded-full"
                    src="https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQzfHx3ZWIlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D%3D"
                    alt={service}
                    loading="lazy"
                    width={50}
                    height={30}
                  />
                  here you can add something
                </p>
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="flex items-center gap-2 text-pink-200">
                    Learn More
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative h-screen px-8 py-28">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-20">
            <h2 className="text-6xl font-medium">Creative Minds</h2>
            <p className="text-xl max-w-xl opacity-80">
              A diverse team of passionate creators dedicated to pushing digital
              boundaries
            </p>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {teamMemberImages.map((image, index) => (
              <div
                key={index}
                className="aspect-square  rounded-2xl overflow-hidden group relative"
              >
                <img
                  src={image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={`Team member ${index + 1}`}
                  loading="lazy"
                  width={50}
                  height={30}
                />
                <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/80 w-full">
                  <h3 className="text-2xl mb-1">John Doe</h3>
                  <p className="opacity-80">Lead Designer</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section py-20 px-6 md:px-20 border-t-1 bg-white-300-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-16">Our Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {projectImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-lg"
              >
                <img
                  src={image}
                  alt={`Project ${index + 1}`}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  width={50}
                  height={30}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <a
                    href="#"
                    className="text-white text-xl font-semibold px-6 py-3 bg-pink-200/80 rounded-full hover:bg-pink-300 transition-colors"
                  >
                    View Project
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href="#"
              className="inline-block px-8 py-4 bg-pink-200 text-black rounded-full hover:bg-pink-300 hover:text-white transition-all duration-300"
            >
              See All Projects
            </a>
          </div>
        </div>
      </div>

      <section className="relative h-screen px-8 py-28 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex gap-12">
          <div className="w-1/2">
            <h2 className="text-6xl mb-8">
              Let&apos;s Create
              <br />
              Something Amazing
            </h2>
            <p className="text-xl opacity-80 mb-12">
              We&apos;re always excited to hear about new projects and creative
              ideas. Let&apos;s start a conversation!
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center">
                  📍
                </div>
                <span>123 Creative Street, Digital City</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center">
                  📞
                </div>
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
          <form
            className="w-1/2 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Form submission is not yet implemented.");
            }}
          >
            <input
              type="text"
              placeholder="Name"
              className="w-full bg-transparent border-b border-white/20 py-3 focus:border-pink-200 outline-none"
              aria-label="Name"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-transparent border-b border-white/20 py-3 focus:border-pink-200 outline-none"
              aria-label="Email"
              required
            />
            <textarea
              rows="5"
              placeholder="Message"
              className="w-full bg-transparent border-b border-white/20 py-3 focus:border-pink-200 outline-none"
              aria-label="Message"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-pink-200 rounded-full hover:bg-pink-300 transition-colors flex items-center justify-center"
            >
              Send Message
              <img
                className="ml-2 rounded-full"
                src="https://images.unsplash.com/photo-1479920252409-6e3d8e8d4866?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODN8fHdlYiUyMGRlc2lnbnxlbnwwfHwwfHx8MA%3D%3D"
                alt="Send"
                loading="lazy"
                width={20}
                height={20}
              />
            </button>
          </form>
        </div>
      </section>
      <p className="text-center text-white opacity-50 mt-8">
        Copyright © 2024 shanniii
      </p>
    </>
  );
}

export default App;