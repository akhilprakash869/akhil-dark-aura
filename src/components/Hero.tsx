import profileImage from "@/assets/profile.jpg";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Profile Image */}
          <div className="mb-8 inline-block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-glow rounded-full blur-xl opacity-50"></div>
              <img
                src={profileImage}
                alt="Akhil Prakash"
                className="w-48 h-48 rounded-full object-cover border-4 border-primary relative z-10 hover-glow transition-all duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* Name and Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient">Akhil Prakash</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Always a Student — Sharing My Knowledge and Creativity
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#contact"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover-glow transition-all duration-300 hover:scale-105"
            >
              Get in Touch
            </a>
            <a
              href="#knowledge"
              className="px-8 py-3 glass-effect rounded-lg font-medium hover:bg-secondary transition-all duration-300 hover:scale-105"
            >
              Explore My Work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
