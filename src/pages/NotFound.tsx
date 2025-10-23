import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center premium-card p-8 sm:p-12 max-w-md w-full">
        <h1 className="text-6xl sm:text-8xl font-bold mb-4 text-foreground">404</h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-6">Oops! Página não encontrada</p>
        <a href="/" className="grok-button inline-block">
          Voltar para Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
