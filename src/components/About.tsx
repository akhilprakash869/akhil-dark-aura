import { Code2, BookOpen, Lightbulb } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: Code2,
      title: "Full-Stack Development",
      description: "Passionate about JavaScript and building end-to-end web applications",
    },
    {
      icon: Lightbulb,
      title: "Continuous Learning",
      description: "Always exploring new technologies and expanding my skill set",
    },
    {
      icon: BookOpen,
      title: "Knowledge Sharing",
      description: "Creating content to help others learn and grow in tech",
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="text-gradient">About Me</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-primary-glow mx-auto mb-12 rounded-full"></div>

          <div className="glass-effect rounded-2xl p-8 md:p-12 mb-12 animate-fade-in">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Hi! I'm Akhil Prakash, a passionate learner and full-stack developer with a deep interest in JavaScript
              and modern web technologies. I believe in the power of continuous learning and love sharing what I
              discover along the way.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Through my blog, videos, and book reviews, I aim to create a space where knowledge is freely shared,
              and learning is a collaborative journey. Whether you're just starting out or looking to dive deeper
              into web development, I hope you find something valuable here.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="glass-effect rounded-xl p-6 hover-glow transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
