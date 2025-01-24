'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '../navbar';
import Footer from '../footer';
import Image from 'next/legacy/image';

const HomeTemplate = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const prices = {
    free: {
      monthly: 0,
      annual: 0,
    },
    basic: {
      monthly: 10,
      annual: 8, // 20% descuento
    },
    pro: {
      monthly: 25,
      annual: 20, // 20% descuento
    },
    enterprise: {
      monthly: 50,
      annual: 40, // 20% descuento
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('idle');
    setMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ha ocurrido un error');
      }

      setStatus('success');
      setMessage(data.message);
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Ha ocurrido un error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center py-24 overflow-hidden" id="hero">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-pattern" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(var(--primary-rgb),0.1)_0%,transparent_65%)]" />
          <div className="container relative mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 space-y-6 [perspective:1000px] relative z-10">
                <h1 className="text-7xl font-bold text-primary leading-tight [transform-style:preserve-3d] hover:scale-[1.02] transition-transform">
                  Gestiona tu equipo de forma inteligente
                </h1>
                <p className="text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Optimiza el rendimiento de tu equipo con IA: desglose automático de tareas, asignación inteligente y análisis predictivo, todo en
                  una única plataforma
                </p>
              </div>
              <div className="flex justify-center">
                <div className="relative w-full max-w-xl aspect-video rounded-xl overflow-hidden border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
                  <Image src="/dashboard-preview.png" alt="Dashboard Preview" layout="fill" objectFit="cover" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* El Problema Section */}
        <section className="relative py-32 bg-primary/[0.03] overflow-hidden" id="problema">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-pattern opacity-50" />
          <div className="container relative mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-5xl font-bold mb-6 text-primary">La gestión tradicional de equipos te frena</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Los líderes de equipo dedican demasiado tiempo a tareas administrativas mientras luchan por mantener a sus equipos productivos y
                  motivados
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="group flex flex-col items-center text-center p-8 bg-card/50 backdrop-blur-sm rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="text-3xl">⏰</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Pérdida de Productividad</h3>
                  <p className="text-muted-foreground">Los líderes pierden hasta un 40% de su tiempo en tareas administrativas y de coordinación</p>
                </div>
                <div className="group flex flex-col items-center text-center p-8 bg-card/50 backdrop-blur-sm rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="text-3xl">⚖️</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Desequilibrio en la Carga</h3>
                  <p className="text-muted-foreground">Algunos miembros se sobrecargan mientras otros no aprovechan todo su potencial</p>
                </div>
                <div className="group flex flex-col items-center text-center p-8 bg-card/50 backdrop-blur-sm rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">Sin Visibilidad Real</h3>
                  <p className="text-muted-foreground">Imposibilidad de anticipar y prevenir problemas antes de que impacten en los resultados</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* La Solución Section */}
        <section className="relative py-32 overflow-hidden" id="solucion">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-pattern opacity-50" />
          <div className="container relative mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-5xl font-bold mb-6 text-primary">Gestión inteligente y automatizada</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  KiboHive revoluciona la gestión de equipos con IA avanzada, eliminando tareas rutinarias y maximizando el potencial de cada miembro
                </p>
              </div>
              <div className="space-y-24">
                <div className="group grid md:grid-cols-2 gap-16 items-center">
                  <div className="space-y-6">
                    <h3 className="text-3xl font-semibold text-primary">Desglose Automático de Tareas</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Describe tu proyecto en texto libre y deja que la IA lo transforme en un plan de acción estructurado.
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                        <span className="text-primary text-lg">✓</span>
                        Clasificación automática por departamentos
                      </li>
                      <li className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                        <span className="text-primary text-lg">✓</span>
                        Plazos y prioridades inteligentes
                      </li>
                      <li className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                        <span className="text-primary text-lg">✓</span>
                        Planificación optimizada automáticamente
                      </li>
                    </ul>
                  </div>
                  <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 group-hover:-translate-y-1">
                    <Image src="/feature-1.png" alt="Desglose automático" layout="fill" objectFit="cover" />
                  </div>
                </div>

                <div className="group grid md:grid-cols-2 gap-16 items-center">
                  <div className="order-2 md:order-1 relative aspect-video rounded-xl overflow-hidden border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 group-hover:-translate-y-1">
                    <Image src="/feature-2.png" alt="Asignación inteligente" layout="fill" objectFit="cover" />
                  </div>
                  <div className="order-1 md:order-2 space-y-6">
                    <h3 className="text-3xl font-semibold text-primary">Asignación Inteligente de Tareas</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Equilibra automáticamente la carga de trabajo considerando las capacidades y disponibilidad real de cada miembro.
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                        <span className="text-primary text-lg">✓</span>
                        Distribución equitativa del trabajo
                      </li>
                      <li className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                        <span className="text-primary text-lg">✓</span>
                        Optimización basada en habilidades
                      </li>
                      <li className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                        <span className="text-primary text-lg">✓</span>
                        Control total con ajustes manuales
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="group grid md:grid-cols-2 gap-16 items-center">
                  <div className="space-y-6">
                    <h3 className="text-3xl font-semibold text-primary">Visualización Clara del Progreso</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Mantén una visión clara del avance de tu equipo con un tablero intuitivo y personalizable.
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                        <span className="text-primary text-lg">✓</span>
                        Interfaz intuitiva y adaptable
                      </li>
                      <li className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                        <span className="text-primary text-lg">✓</span>
                        Múltiples vistas personalizables
                      </li>
                      <li className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                        <span className="text-primary text-lg">✓</span>
                        Seguimiento en tiempo real
                      </li>
                    </ul>
                  </div>
                  <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 group-hover:-translate-y-1">
                    <Image src="/feature-3.png" alt="Visualización del progreso" layout="fill" objectFit="cover" />
                  </div>
                </div>

                <div className="group grid md:grid-cols-2 gap-16 items-center">
                  <div className="order-2 md:order-1 relative aspect-video rounded-xl overflow-hidden border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 group-hover:-translate-y-1">
                    <Image src="/feature-4.png" alt="Predicción de cuellos de botella" layout="fill" objectFit="cover" />
                  </div>
                  <div className="order-1 md:order-2 space-y-6">
                    <h3 className="text-3xl font-semibold text-primary">Prevención Proactiva de Problemas</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Anticípate a los desafíos con un sistema que identifica y previene problemas antes de que ocurran.
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                        <span className="text-primary text-lg">✓</span>
                        Detección temprana de cuellos de botella
                      </li>
                      <li className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                        <span className="text-primary text-lg">✓</span>
                        Recomendaciones automáticas
                      </li>
                      <li className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
                        <span className="text-primary text-lg">✓</span>
                        Optimización continua del flujo de trabajo
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Precios Section */}
        <section className="py-24" id="precios">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-6">Planes adaptados a tu crecimiento</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                  Elige el plan que mejor se ajuste al tamaño y necesidades de tu equipo
                </p>
                <div className="flex items-center justify-center gap-4">
                  <span className={`text-sm ${!isAnnual ? 'text-primary font-medium' : 'text-muted-foreground'}`}>Mensual</span>
                  <button
                    onClick={() => setIsAnnual(!isAnnual)}
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      isAnnual ? 'bg-primary' : 'bg-muted'
                    } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transition-transform transform ${
                        isAnnual ? 'translate-x-7' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${isAnnual ? 'text-primary font-medium' : 'text-muted-foreground'}`}>Anual</span>
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">Ahorra 20%</span>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-8">
                {/* Plan Free */}
                <div className="flex flex-col p-8 bg-card/50 backdrop-blur-sm rounded-xl border border-primary/10 hover:border-primary/30 transition-colors">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Free</h3>
                    <p className="text-muted-foreground">Prueba sin compromiso</p>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-muted-foreground">/mes</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-primary">✓</span>
                      Hasta 3 usuarios
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-primary">✓</span>
                      50 tareas activas/mes
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-primary">✓</span>
                      Desglose de tareas básico
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-primary">✓</span>
                      Tablero Kanban
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-primary">✓</span>
                      Soporte por email
                    </li>
                  </ul>
                  <Button
                    onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                    variant="outline"
                    className="w-full"
                  >
                    Empezar gratis
                  </Button>
                </div>

                {/* Plan Básico */}
                <div className="flex flex-col p-8 bg-card/50 backdrop-blur-sm rounded-xl border border-primary/10 hover:border-primary/30 transition-colors">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Básico</h3>
                    <p className="text-muted-foreground">Equipo pequeño</p>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${isAnnual ? prices.basic.annual : prices.basic.monthly}</span>
                    <span className="text-muted-foreground">/{isAnnual ? 'mes (facturado anualmente)' : 'mes'}</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-primary">✓</span>
                      Hasta 5 usuarios
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-primary">✓</span>
                      100 tareas activas/mes
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-primary">✓</span>
                      Desglose automático
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-primary">✓</span>
                      Asignación manual
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-primary">✓</span>
                      Soporte básico
                    </li>
                  </ul>
                  <Button
                    onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                    variant="outline"
                    className="w-full"
                  >
                    Empezar ahora
                  </Button>
                </div>

                {/* Plan Profesional */}
                <div className="flex flex-col p-8 bg-primary/5 backdrop-blur-sm rounded-xl border-2 border-primary/20 hover:border-primary/40 transition-colors relative md:-translate-y-4">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Más popular
                  </div>
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Profesional</h3>
                    <p className="text-muted-foreground">Equipo mediano</p>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${isAnnual ? prices.pro.annual : prices.pro.monthly}</span>
                    <span className="text-muted-foreground">/{isAnnual ? 'mes (facturado anualmente)' : 'mes'}</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-primary">✓</span>
                      Hasta 20 usuarios
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-primary">✓</span>
                      500 tareas activas/mes
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-primary">✓</span>
                      Asignación inteligente
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-primary">✓</span>
                      Predicción de cuellos de botella
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-primary">✓</span>
                      Soporte prioritario
                    </li>
                  </ul>
                  <Button onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })} className="w-full">
                    Empezar ahora
                  </Button>
                </div>

                {/* Plan Empresarial */}
                <div className="flex flex-col p-8 bg-card/50 backdrop-blur-sm rounded-xl border border-primary/10 hover:border-primary/30 transition-colors">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">Empresarial</h3>
                    <p className="text-muted-foreground">Equipo grande</p>
                  </div>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${isAnnual ? prices.enterprise.annual : prices.enterprise.monthly}</span>
                    <span className="text-muted-foreground">/{isAnnual ? 'mes (facturado anualmente)' : 'mes'}</span>
                  </div>
                  <ul className="space-y-4 mb-8 flex-grow">
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-primary">✓</span>
                      Usuarios ilimitados
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-primary">✓</span>
                      Tareas ilimitadas
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-primary">✓</span>
                      Personalización avanzada
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-primary">✓</span>
                      Integraciones premium
                    </li>
                    <li className="flex items-center gap-2 text-muted-foreground">
                      <span className="text-primary">✓</span>
                      Soporte premium 24/7
                    </li>
                  </ul>
                  <Button
                    onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                    variant="outline"
                    className="w-full"
                  >
                    Contactar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary/5" id="waitlist">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Lleva tu equipo al siguiente nivel</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Únete a la lista de espera y sé uno de los primeros en revolucionar la gestión de tu equipo con IA
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center bg-card/50 backdrop-blur-sm p-2 rounded-xl border border-primary/10">
                  <Input
                    type="email"
                    placeholder="Tu email corporativo"
                    className="w-full text-lg h-12 bg-background/50 border-primary/20 rounded-lg focus:border-primary"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                  <Button size="lg" className="w-full sm:w-auto" disabled={isLoading}>
                    {isLoading ? 'Enviando...' : 'Unirme ahora'}
                  </Button>
                </div>
                {status === 'success' && <p className="text-sm text-green-600 dark:text-green-400">{message}</p>}
                {status === 'error' && <p className="text-sm text-red-600 dark:text-red-400">{message}</p>}
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomeTemplate;
