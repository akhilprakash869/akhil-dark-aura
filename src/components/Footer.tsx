const Footer = () => {
  return (
    <footer className="py-8 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="text-center text-muted-foreground">
          <p className="mb-2">
            © {new Date().getFullYear()} Akhil Prakash. All rights reserved.
          </p>
          <p className="text-sm">
            Built with passion and <span className="text-primary">React</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
