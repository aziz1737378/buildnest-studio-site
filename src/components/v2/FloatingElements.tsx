export const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 float-1" />
      <div className="absolute top-40 right-20 w-16 h-16 rounded-lg bg-gradient-to-r from-accent/20 to-tech-blue/20 float-2" />
      <div className="absolute bottom-40 left-20 w-24 h-24 rounded-full bg-gradient-to-r from-tech-blue/20 to-primary/20 float-3" />
      <div className="absolute top-60 left-1/3 w-12 h-12 rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 float-1" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-60 right-1/3 w-18 h-18 rounded-full bg-gradient-to-r from-accent/20 to-primary/20 float-2" style={{ animationDelay: '3s' }} />
    </div>
  );
};