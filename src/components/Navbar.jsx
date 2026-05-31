import { useState, useEffect, useRef } from "react";
import OverlayMenu from "./OverlayMenu";
import { FiMenu, FiSun, FiMoon } from "react-icons/fi";
import Logo from "../assets/Logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [forceVisible, setForceVisible] = useState(false);

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  const [scrolled, setScrolled] = useState(() => {
    if (typeof window !== "undefined") {
      return window.scrollY > 20;
    }
    return false;
  });

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light-mode");
    } else {
      document.documentElement.classList.remove("light-mode");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const lastScrollY = useRef(0);
  const hideTimeout = useRef(null);

  useEffect(() => {
    const homeSection = document.querySelector("#home");
    if (!homeSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setForceVisible(entry.isIntersecting);
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );

    observer.observe(homeSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (forceVisible) return;

      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);

        clearTimeout(hideTimeout.current);
        hideTimeout.current = setTimeout(() => {
          setVisible(false);
        }, 2500);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(hideTimeout.current);
    };
  }, [forceVisible]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50
        transition-all duration-300 ease-in-out
        ${visible ? "translate-y-0" : "-translate-y-full"}
        ${scrolled ? "nav-scrolled bg-black/45 backdrop-blur-md border-b border-white/5 shadow-md" : "bg-transparent border-b border-transparent"}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
          <a href="#home" className="flex items-center space-x-2">
            <img src={Logo} alt="Ambuj Logo" className="h-8 w-8" />
            <span className="hidden text-xl font-semibold text-white sm:block">
              Ambuj
            </span>
          </a>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 p-2.5 text-white transition-all duration-200 hover:bg-white/20 hover:scale-105 cursor-pointer"
            >
              {theme === "dark" ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-white/20 cursor-pointer"
            >
              <FiMenu className="text-lg" />
              <span>Menu</span>
            </button>
          </div>
        </div>
      </nav>

      <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}