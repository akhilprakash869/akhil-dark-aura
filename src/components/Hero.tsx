const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Welcome to My
            <br />
            <span className="text-gradient">Knowledge Sharing Hub</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A space where I document my learning journey, share insights, and create content about web development, JavaScript, and continuous growth.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#knowledge"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover-glow transition-all duration-300 hover:scale-105"
            >
              Explore Content
            </a>
            <a
              href="#videos"
              className="px-8 py-3 glass-effect rounded-lg font-medium hover:bg-secondary transition-all duration-300 hover:scale-105"
            >
              Watch Videos
            </a>
            <a
              href="/auth"
              className="px-8 py-3 glass-effect rounded-lg font-medium hover:bg-secondary transition-all duration-300 hover:scale-105 border border-primary/50"
            >
              Sign In / Publish
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
