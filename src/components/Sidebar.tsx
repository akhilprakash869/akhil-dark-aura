import { useState, useEffect } from "react";
import { Mail, Github, Linkedin, Youtube } from "lucide-react";
import profileImage from "@/assets/profile.jpg";

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "knowledge", "videos", "books", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Knowledge", href: "#knowledge" },
    { label: "Videos", href: "#videos" },
    { label: "Books", href: "#books" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
    { icon: Mail, href: "mailto:nathantheresa22@gmail.com", label: "Email" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-80 glass-effect border-r border-border/50 z-40 hidden lg:flex flex-col p-8">
      {/* Profile Section */}
      <div className="text-center mb-8">
        <div className="relative inline-block mb-4">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-glow rounded-full blur-xl opacity-50"></div>
          <img
            src={profileImage}
            alt="Akhil Prakash"
            className="w-32 h-32 rounded-full object-cover border-4 border-primary relative z-10 hover-glow transition-all duration-300"
          />
        </div>
        <h2 className="text-2xl font-bold text-gradient mb-2">Akhil Prakash</h2>
        <p className="text-sm text-muted-foreground">Knowledge Sharing Hub</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(item.href);
            }}
            className={`block px-4 py-2 rounded-lg transition-all duration-300 ${
              activeSection === item.href.substring(1)
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-secondary/50"
            }`}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Social Links */}
      <div className="pt-6 border-t border-border/50">
        <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Connect</p>
        <div className="flex gap-2">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center hover-glow transition-all duration-300 hover:scale-110"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5 text-primary" />
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
