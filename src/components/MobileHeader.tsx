import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImage from "@/assets/profile.jpg";

const MobileHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Knowledge", href: "#knowledge" },
    { label: "Videos", href: "#videos" },
    { label: "Books", href: "#books" },
    { label: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img
            src={profileImage}
            alt="Akhil Prakash"
            className="w-10 h-10 rounded-full object-cover border-2 border-primary"
          />
          <div>
            <h1 className="text-sm font-bold text-gradient">Akhil Prakash</h1>
            <p className="text-xs text-muted-foreground">Knowledge Hub</p>
          </div>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="p-4 glass-effect border-t border-border/50 animate-fade-in">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.href);
              }}
              className="block px-4 py-3 text-foreground hover:text-primary hover:bg-secondary/50 transition-colors rounded-lg"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default MobileHeader;
