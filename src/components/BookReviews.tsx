import { BookOpen, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const BookReviews = () => {
  const books = [
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      rating: 5,
      review: "A must-read for any developer. This book transformed how I think about writing maintainable code.",
      category: "Software Engineering",
    },
    {
      title: "You Don't Know JS",
      author: "Kyle Simpson",
      rating: 5,
      review: "An incredible deep dive into JavaScript. Perfect for understanding the language at a fundamental level.",
      category: "JavaScript",
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      rating: 4,
      review: "Great insights on building better habits and improving consistently. Highly applicable to learning programming.",
      category: "Self-Improvement",
    },
  ];

  return (
    <section id="books" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="text-gradient">Book Reviews</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-primary-glow mx-auto mb-4 rounded-full"></div>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Books that shaped my journey and thinking
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {books.map((book, index) => (
              <Card
                key={index}
                className="glass-effect border-border/50 hover-glow transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-primary mb-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{book.category}</span>
                  </div>
                  <CardTitle className="text-xl">{book.title}</CardTitle>
                  <CardDescription>by {book.author}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < book.rating
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">{book.review}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookReviews;
