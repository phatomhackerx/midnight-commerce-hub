import React from 'react';
import { ProductCheckout, CheckoutTimer } from '@/types/checkout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

interface TimerSectionProps {
  checkout: ProductCheckout;
  onUpdate: (updates: Partial<ProductCheckout>) => void;
}

export default function TimerSection({ checkout, onUpdate }: TimerSectionProps) {
  const updateTimer = (updates: Partial<CheckoutTimer>) => {
    onUpdate({
      timer: {
        ...checkout.timer,
        ...updates,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-1">Timer de Urgência</h3>
        <p className="text-sm text-muted-foreground">
          Crie urgência com um contador regressivo
        </p>
      </div>
      
      {/* Enable Timer */}
      <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card/50">
        <div>
          <div className="font-medium">Ativar Timer</div>
          <div className="text-sm text-muted-foreground">
            Mostrar contador regressivo no checkout
          </div>
        </div>
        <Switch
          checked={checkout.timer.enabled}
          onCheckedChange={(checked) => updateTimer({ enabled: checked })}
        />
      </div>
      
      {checkout.timer.enabled && (
        <>
          {/* Timer Type */}
          <div className="space-y-3">
            <Label>Tipo de Timer</Label>
            <RadioGroup
              value={checkout.timer.type}
              onValueChange={(value) => updateTimer({ type: value as 'countdown' | 'evergreen' })}
              className="grid grid-cols-2 gap-3"
            >
              <Label
                htmlFor="timer-countdown"
                className={cn(
                  'flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all',
                  checkout.timer.type === 'countdown'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <RadioGroupItem value="countdown" id="timer-countdown" className="sr-only" />
                <div className="text-2xl mb-2">⏰</div>
                <div className="font-medium text-center">Countdown</div>
                <div className="text-xs text-muted-foreground text-center">
                  Mesma hora para todos
                </div>
              </Label>
              
              <Label
                htmlFor="timer-evergreen"
                className={cn(
                  'flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all',
                  checkout.timer.type === 'evergreen'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <RadioGroupItem value="evergreen" id="timer-evergreen" className="sr-only" />
                <div className="text-2xl mb-2">🔄</div>
                <div className="font-medium text-center">Evergreen</div>
                <div className="text-xs text-muted-foreground text-center">
                  Reinicia para cada visitante
                </div>
              </Label>
            </RadioGroup>
          </div>
          
          {/* Timer Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timer-hours">Horas</Label>
              <Input
                id="timer-hours"
                type="number"
                min={0}
                max={23}
                value={checkout.timer.hours}
                onChange={(e) => updateTimer({ hours: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timer-minutes">Minutos</Label>
              <Input
                id="timer-minutes"
                type="number"
                min={0}
                max={59}
                value={checkout.timer.minutes}
                onChange={(e) => updateTimer({ minutes: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>
          
          {/* Timer Text */}
          <div className="space-y-2">
            <Label htmlFor="timer-text">Texto do Timer</Label>
            <Input
              id="timer-text"
              value={checkout.timer.text}
              onChange={(e) => updateTimer({ text: e.target.value })}
              placeholder="Oferta expira em:"
            />
          </div>
          
          {/* Show Progress */}
          <div className="flex items-center justify-between py-2">
            <div>
              <Label htmlFor="timer-progress">Barra de Progresso</Label>
              <div className="text-xs text-muted-foreground">
                Mostrar barra visual do tempo restante
              </div>
            </div>
            <Switch
              id="timer-progress"
              checked={checkout.timer.showProgress}
              onCheckedChange={(checked) => updateTimer({ showProgress: checked })}
            />
          </div>
          
          {/* Preview */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div className="text-sm text-amber-600 font-medium mb-2">
              {checkout.timer.text}
            </div>
            <div className="flex gap-2 justify-center">
              <div className="bg-white rounded-lg px-3 py-2 text-center shadow-sm">
                <div className="text-xl font-bold text-amber-600">
                  {String(checkout.timer.hours).padStart(2, '0')}
                </div>
                <div className="text-xs text-amber-600/70">horas</div>
              </div>
              <div className="text-xl font-bold text-amber-600 self-center">:</div>
              <div className="bg-white rounded-lg px-3 py-2 text-center shadow-sm">
                <div className="text-xl font-bold text-amber-600">
                  {String(checkout.timer.minutes).padStart(2, '0')}
                </div>
                <div className="text-xs text-amber-600/70">min</div>
              </div>
              <div className="text-xl font-bold text-amber-600 self-center">:</div>
              <div className="bg-white rounded-lg px-3 py-2 text-center shadow-sm">
                <div className="text-xl font-bold text-amber-600">00</div>
                <div className="text-xs text-amber-600/70">seg</div>
              </div>
            </div>
            {checkout.timer.showProgress && (
              <div className="mt-3 h-2 bg-amber-200 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full w-3/4 transition-all" />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
