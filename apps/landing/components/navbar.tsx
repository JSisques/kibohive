'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-primary/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="text-xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">KiboHive</div>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('problema')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              El Problema
            </button>
            <button onClick={() => scrollToSection('solucion')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              La Solución
            </button>
            <button onClick={() => scrollToSection('precios')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Precios
            </button>
            <Button onClick={() => scrollToSection('waitlist')} size="sm" className="rounded-full">
              Unirme ahora
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
