import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  EyeOff, 
  ExternalLink, 
  Smartphone, 
  Monitor, 
  Tablet,
  MoreVertical,
  Copy,
  Trash2,
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CheckoutBuilderHeaderProps {
  productName: string;
  checkoutName: string;
  checkoutStatus: 'active' | 'paused' | 'draft';
  isSaving: boolean;
  previewMode: boolean;
  previewDevice: 'desktop' | 'tablet' | 'mobile';
  onSave: () => void;
  onTogglePreview: () => void;
  onChangeDevice: (device: 'desktop' | 'tablet' | 'mobile') => void;
  onDuplicate: () => void;
  onDelete: () => void;
  checkoutSlug: string;
}

export default function CheckoutBuilderHeader({
  productName,
  checkoutName,
  checkoutStatus,
  isSaving,
  previewMode,
  previewDevice,
  onSave,
  onTogglePreview,
  onChangeDevice,
  onDuplicate,
  onDelete,
  checkoutSlug,
}: CheckoutBuilderHeaderProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'paused':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Ativo';
      case 'paused':
        return 'Pausado';
      default:
        return 'Rascunho';
    }
  };

  return (
    <header className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left side - Back & Title */}
          <div className="flex items-center gap-3 min-w-0">
            <Button variant="ghost" size="icon" asChild className="shrink-0">
              <Link to="/produtos">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-sm sm:text-base truncate">
                  {checkoutName}
                </h1>
                <Badge variant="outline" className={`text-xs shrink-0 ${getStatusColor(checkoutStatus)}`}>
                  {getStatusLabel(checkoutStatus)}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground truncate hidden sm:block">
                Produto: {productName}
              </p>
            </div>
          </div>
          
          {/* Center - Device selector (desktop only) */}
          <div className="hidden lg:flex items-center gap-1 bg-secondary/50 rounded-lg p-1">
            <Button
              variant={previewDevice === 'desktop' ? 'secondary' : 'ghost'}
              size="sm"
              className="h-8 px-3"
              onClick={() => onChangeDevice('desktop')}
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              variant={previewDevice === 'tablet' ? 'secondary' : 'ghost'}
              size="sm"
              className="h-8 px-3"
              onClick={() => onChangeDevice('tablet')}
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              variant={previewDevice === 'mobile' ? 'secondary' : 'ghost'}
              size="sm"
              className="h-8 px-3"
              onClick={() => onChangeDevice('mobile')}
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Right side - Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={onTogglePreview}
              className="hidden sm:flex"
            >
              {previewMode ? (
                <>
                  <EyeOff className="h-4 w-4 mr-2" />
                  Editar
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </>
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hidden md:flex"
            >
              <a href={`/c/${checkoutSlug}`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Abrir
              </a>
            </Button>
            
            <Button
              size="sm"
              onClick={onSave}
              disabled={isSaving}
              className="bg-primary hover:bg-primary/90"
            >
              {isSaving ? (
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  <span className="hidden sm:inline">Salvando</span>
                </div>
              ) : (
                <>
                  <Save className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline">Salvar</span>
                </>
              )}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={onTogglePreview} className="sm:hidden">
                  {previewMode ? (
                    <>
                      <EyeOff className="h-4 w-4 mr-2" />
                      Editar
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="md:hidden">
                  <a href={`/c/${checkoutSlug}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Abrir em nova aba
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="sm:hidden md:hidden" />
                <DropdownMenuItem>
                  <Share2 className="h-4 w-4 mr-2" />
                  Copiar link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDuplicate}>
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicar checkout
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onDelete} className="text-destructive focus:text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Excluir checkout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
