import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Knowledge from "@/components/Knowledge";
import Videos from "@/components/Videos";
import BookReviews from "@/components/BookReviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Knowledge />
      <Videos />
      <BookReviews />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
