'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { ArrowRight, Zap, BarChart, Users, Puzzle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function KiboLandingPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-blue-900 to-cyan-700 text-white">
        <div className="container mx-auto">
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Gestión de tareas <span className="text-orange-400">inteligente</span> con IA
            </h1>
            <p className="text-xl mb-8">
              Optimiza el flujo de trabajo de tu empresa con Kibo. Desglose y asignación automática de tareas impulsados por IA.
            </p>
            <motion.div
              className="flex justify-center space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <button className="bg-orange-500 text-white font-bold py-3 px-8 rounded-full hover:bg-orange-600 transition duration-300">
                Solicitar demo
              </button>
              <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white hover:text-blue-900 transition duration-300">
                Más información
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="características" className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2 className="text-3xl font-bold mb-12 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Características principales
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8 text-orange-500" />,
                title: 'Desglose automático',
                description: 'IA que convierte objetivos en tareas específicas',
              },
              {
                icon: <Users className="h-8 w-8 text-orange-500" />,
                title: 'Asignación inteligente',
                description: 'Distribución óptima de tareas al equipo',
              },
              {
                icon: <BarChart className="h-8 w-8 text-orange-500" />,
                title: 'Análisis de productividad',
                description: 'Insights detallados del rendimiento del equipo',
              },
              {
                icon: <Puzzle className="h-8 w-8 text-orange-500" />,
                title: 'Integración flexible',
                description: 'Se adapta a tus herramientas existentes',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="cómo-funciona" className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <motion.h2 className="text-3xl font-bold mb-12 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Cómo funciona
          </motion.h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
            {[
              {
                title: 'Describe tu proyecto',
                description: 'Ingresa una descripción general de tu proyecto o iniciativa.',
              },
              {
                title: 'IA analiza y desglosa',
                description: 'Nuestra IA procesa la información y crea tareas específicas.',
              },
              {
                title: 'Asignación automática',
                description: 'Las tareas se asignan a los miembros del equipo más adecuados.',
              },
              {
                title: 'Seguimiento y optimización',
                description: 'Monitorea el progreso y recibe sugerencias de optimización.',
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {index + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precios" className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2 className="text-3xl font-bold mb-12 text-center" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Planes y precios
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Básico',
                price: '29',
                features: ['Hasta 10 usuarios', 'Desglose de tareas', 'Asignación básica', 'Soporte por email'],
              },
              {
                name: 'Pro',
                price: '99',
                features: [
                  'Hasta 50 usuarios',
                  'Desglose avanzado',
                  'Asignación inteligente',
                  'Detección de cuellos de botella',
                  'Soporte prioritario',
                ],
              },
              {
                name: 'Empresa',
                price: 'Personalizado',
                features: ['Usuarios ilimitados', 'Funciones personalizadas', 'API access', 'Gerente de cuenta dedicado', 'Soporte 24/7'],
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <p className="text-4xl font-bold mb-6">
                  {plan.price !== 'Personalizado' && '$'}
                  {plan.price}
                  {plan.price !== 'Personalizado' && <span className="text-lg font-normal text-gray-600">/mes</span>}
                </p>
                <ul className="mb-8 space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <ChevronRight className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition-colors duration-300">
                  Elegir plan
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-cyan-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 className="text-3xl font-bold mb-6" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Revoluciona la gestión de tareas en tu empresa
          </motion.h2>
          <motion.p
            className="text-xl mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Únete a las empresas que ya están optimizando su flujo de trabajo con Kibo
          </motion.p>
          <motion.div
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-grow px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-orange-500 text-white font-bold py-3 px-8 rounded-full hover:bg-orange-600 transition-colors duration-300 flex items-center justify-center"
              >
                Solicitar demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Kibo</h3>
              <p className="text-gray-400">Gestión de tareas inteligente para equipos modernos.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Enlaces rápidos</h3>
              <ul className="space-y-2">
                {['Características', 'Cómo funciona', 'Precios', 'Contacto'].map(item => (
                  <li key={item}>
                    <Link href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-white transition-colors duration-300">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contacto</h3>
              <p className="text-gray-400">info@kibo.com</p>
              <p className="text-gray-400">+1 (555) 123-4567</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'linkedin'].map(social => (
                  <a key={social} href="#" className="text-gray-400 hover:text-orange-500 transition-colors duration-300">
                    <span className="sr-only">{social}</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d={
                          social === 'facebook'
                            ? 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                            : social === 'twitter'
                              ? 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84'
                              : 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'
                        }
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">&copy; 2023 Kibo. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
