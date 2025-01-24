'use client';

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-primary/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent mb-4">KiboHive</div>
            <p className="text-sm text-muted-foreground">Automatiza la gestión de tu equipo con inteligencia artificial</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/terminos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Términos y condiciones
                </a>
              </li>
              <li>
                <a href="/privacidad" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Política de privacidad
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:hola@kibohive.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  hola@kibohive.com
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Redes Sociales</h3>
            <div className="flex gap-4">
              <a
                href="https://twitter.com/kibohive"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                𝕏
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-primary/10 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} KiboHive. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
