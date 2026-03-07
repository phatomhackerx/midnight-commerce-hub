import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error("Digite seu e-mail"); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      toast.success("E-mail enviado!");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Midnight</h1>
        </div>

        <Card className="premium-card border-border/50">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">{sent ? "E-mail enviado!" : "Recuperar senha"}</CardTitle>
            <CardDescription>
              {sent ? "Verifique sua caixa de entrada para redefinir sua senha" : "Digite seu e-mail para receber instruções"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sent ? (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="text-green-500" size={32} />
                </div>
                <p className="text-sm text-muted-foreground">
                  Enviamos um link de recuperação para <span className="font-medium text-foreground">{email}</span>
                </p>
                <Button variant="outline" className="w-full rounded-xl" onClick={() => setSent(false)}>
                  Enviar novamente
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 grok-input" />
                  </div>
                </div>
                <Button type="submit" className="w-full grok-button gap-2" disabled={loading}>
                  {loading ? <Loader2 className="animate-spin" size={16} /> : <Mail size={16} />}
                  {loading ? "Enviando..." : "Enviar link de recuperação"}
                </Button>
              </form>
            )}

            <div className="mt-6 text-center">
              <Link to="/auth/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1">
                <ArrowLeft size={14} /> Voltar para login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
