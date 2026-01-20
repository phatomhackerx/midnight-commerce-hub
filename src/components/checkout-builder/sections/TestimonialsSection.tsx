import React from 'react';
import { ProductCheckout, CheckoutTestimonial } from '@/types/checkout';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Star, Upload, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestimonialsSectionProps {
  checkout: ProductCheckout;
  onUpdate: (updates: Partial<ProductCheckout>) => void;
}

export default function TestimonialsSection({ checkout, onUpdate }: TestimonialsSectionProps) {
  const addTestimonial = () => {
    const newTestimonial: CheckoutTestimonial = {
      id: `testimonial_${Date.now()}`,
      name: 'Cliente Satisfeito',
      avatar: null,
      rating: 5,
      text: 'Esse produto mudou minha vida! Recomendo a todos.',
      enabled: true,
    };
    onUpdate({ testimonials: [...checkout.testimonials, newTestimonial] });
  };

  const updateTestimonial = (id: string, updates: Partial<CheckoutTestimonial>) => {
    onUpdate({
      testimonials: checkout.testimonials.map(t => t.id === id ? { ...t, ...updates } : t),
    });
  };

  const removeTestimonial = (id: string) => {
    onUpdate({ testimonials: checkout.testimonials.filter(t => t.id !== id) });
  };

  const toggleTestimonial = (id: string) => {
    const testimonial = checkout.testimonials.find(t => t.id === id);
    if (testimonial) {
      updateTestimonial(id, { enabled: !testimonial.enabled });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Depoimentos</h3>
        <p className="text-sm text-muted-foreground">
          Adicione depoimentos para aumentar a confiança
        </p>
      </div>

      {checkout.testimonials.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-xl">
          <User className="h-10 w-10 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Nenhum depoimento adicionado</p>
          <p className="text-xs mt-1">Clique abaixo para adicionar</p>
        </div>
      ) : (
        <div className="space-y-4">
          {checkout.testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={cn(
                'p-4 rounded-xl border transition-all',
                testimonial.enabled ? 'bg-card border-border' : 'bg-muted/30 border-muted opacity-60'
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                    {testimonial.avatar ? (
                      <img src={testimonial.avatar} alt={testimonial.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div>
                    <span className="font-medium text-sm">Depoimento {index + 1}</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            'h-3 w-3 cursor-pointer transition-colors',
                            i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                          )}
                          onClick={() => updateTestimonial(testimonial.id, { rating: i + 1 })}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={testimonial.enabled}
                    onCheckedChange={() => toggleTestimonial(testimonial.id)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => removeTestimonial(testimonial.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs">Nome</Label>
                    <Input
                      value={testimonial.name}
                      onChange={(e) => updateTestimonial(testimonial.id, { name: e.target.value })}
                      placeholder="Nome do cliente"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Avatar URL</Label>
                    <Input
                      value={testimonial.avatar || ''}
                      onChange={(e) => updateTestimonial(testimonial.id, { avatar: e.target.value || null })}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs">Depoimento</Label>
                  <Textarea
                    value={testimonial.text}
                    onChange={(e) => updateTestimonial(testimonial.id, { text: e.target.value })}
                    placeholder="O que o cliente disse sobre o produto..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs">Avaliação</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => updateTestimonial(testimonial.id, { rating: star })}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={cn(
                            'h-6 w-6',
                            star <= testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Button
        variant="outline"
        className="w-full border-dashed"
        onClick={addTestimonial}
      >
        <Plus className="h-4 w-4 mr-2" />
        Adicionar Depoimento
      </Button>
    </div>
  );
}
