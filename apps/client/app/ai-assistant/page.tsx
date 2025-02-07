'use client';

import React, { ComponentPropsWithoutRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { EXECUTE_USER_QUERY } from '@/lib/graphql';
import { MessageSquareMore, Send, Loader2 } from 'lucide-react';
import { useOrganization } from '@clerk/nextjs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const AIAssistantPage = () => {
  const organization = useOrganization();
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [executeUserQuery] = useMutation(EXECUTE_USER_QUERY);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    // Añadir mensaje del usuario al chat
    setMessages(prev => [...prev, { text: inputMessage, isUser: true }]);
    setIsLoading(true);

    try {
      const { data } = await executeUserQuery({
        variables: {
          input: {
            userQuery: inputMessage,
            clerkCompanyId: organization?.organization?.id || '',
            conversationHistory: messages.map(message => message.text).join('\n'),
          },
        },
      });

      // Añadir respuesta del asistente al chat
      setMessages(prev => [...prev, { text: data.executeUserQuery.response, isUser: false }]);
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      setMessages(prev => [...prev, { text: 'Lo siento, ha ocurrido un error al procesar tu mensaje.', isUser: false }]);
    } finally {
      setIsLoading(false);
    }

    setInputMessage('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] w-full">
      {/* Header */}
      <div className="border-b py-4 flex items-center gap-2 bg-background">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <MessageSquareMore className="h-5 w-5 text-muted-foreground" />
            <h1 className="text-xl font-semibold">Asistente IA</h1>
          </div>
          <p className="text-sm text-muted-foreground">Hazme cualquier pregunta sobre tu empresa o proyectos.</p>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto  py-4 bg-background/50">
        <div className="space-y-4 max-w-[1200px] mx-auto">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground mt-8">
              <p className="text-lg">¡Bienvenido al Asistente IA!</p>
              <p className="text-sm mt-2">Hazme cualquier pregunta sobre tu empresa o proyectos.</p>
            </div>
          ) : (
            <>
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} items-start gap-2`}>
                  {!message.isUser && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <MessageSquareMore className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.isUser ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-secondary text-secondary-foreground rounded-bl-none'
                    } markdown-content`}
                  >
                    {message.isUser ? (
                      message.text
                    ) : (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          // Estilizar los enlaces
                          a: ({ node, ...props }) => (
                            <a {...props} className="text-primary underline hover:text-primary/80" target="_blank" rel="noopener noreferrer" />
                          ),
                          // Estilizar los bloques de código
                          code: ({
                            node,
                            className,
                            inline,
                            ...props
                          }: { node?: any; className?: string; inline?: boolean } & ComponentPropsWithoutRef<'code'>) =>
                            inline ? (
                              <code {...props} className="bg-primary/10 text-primary rounded px-1 py-0.5 text-sm font-mono" />
                            ) : (
                              <code {...props} className="block bg-primary/10 text-primary rounded p-2 text-sm font-mono overflow-x-auto" />
                            ),
                          // Estilizar las listas
                          ul: ({ node, ...props }) => <ul {...props} className="list-disc list-inside my-2" />,
                          ol: ({ node, ...props }) => <ol {...props} className="list-decimal list-inside my-2" />,
                          // Estilizar los títulos
                          h1: ({ node, ...props }) => <h1 {...props} className="text-lg font-bold my-2" />,
                          h2: ({ node, ...props }) => <h2 {...props} className="text-base font-bold my-2" />,
                          h3: ({ node, ...props }) => <h3 {...props} className="text-sm font-bold my-2" />,
                          // Estilizar las citas
                          blockquote: ({ node, ...props }) => <blockquote {...props} className="border-l-4 border-primary/30 pl-4 my-2 italic" />,
                          // Estilizar las tablas
                          table: ({ node, ...props }) => (
                            <div className="overflow-x-auto my-2">
                              <table {...props} className="min-w-full divide-y divide-border" />
                            </div>
                          ),
                          th: ({ node, ...props }) => <th {...props} className="px-3 py-2 text-left text-sm font-semibold bg-secondary/50" />,
                          td: ({ node, ...props }) => <td {...props} className="px-3 py-2 text-sm" />,
                        }}
                      >
                        {message.text}
                      </ReactMarkdown>
                    )}
                  </div>
                  {message.isUser && (
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground text-sm">Tú</span>
                    </div>
                  )}
                </div>
              ))}

              {/* Loading Skeleton */}
              {isLoading && (
                <div className="flex justify-start items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Loader2 className="h-4 w-4 text-primary animate-spin" />
                  </div>
                  <div className="flex flex-col gap-2 max-w-[70%]">
                    <div className="h-4 w-24 bg-secondary/60 rounded-lg animate-pulse" />
                    <div className="h-4 w-48 bg-secondary/60 rounded-lg animate-pulse" />
                    <div className="h-4 w-32 bg-secondary/60 rounded-lg animate-pulse" />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Input Form */}
      <div className="border-t  py-4 bg-background">
        <form onSubmit={handleSubmit} className="max-w-[1200px] mx-auto flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            placeholder="Escribe tu pregunta aquí..."
            disabled={isLoading}
            className="flex-1 p-2 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            <span>{isLoading ? 'Procesando...' : 'Enviar'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAssistantPage;
