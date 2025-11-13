import Sidebar from "@/components/Sidebar";
import MobileHeader from "@/components/MobileHeader";
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
      {/* Fixed Sidebar for Desktop */}
      <Sidebar />
      
      {/* Mobile Header */}
      <MobileHeader />
      
      {/* Main Content with left margin for sidebar on desktop */}
      <main className="lg:ml-80 pt-16 lg:pt-0">
        <Hero />
        <About />
        <Knowledge />
        <Videos />
        <BookReviews />
        <Contact />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
