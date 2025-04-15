
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import CouponForm from "./CouponForm";
import { z } from "zod";

// Match with the form schema in CouponForm
const couponSchema = z.object({
  codigo: z.string().min(3).max(20),
  tipo: z.enum(["percentual", "fixo"]),
  valor: z.coerce.number().min(1),
  validade: z.string().min(1),
  produtos: z.string().min(1),
  limitePorUsuario: z.coerce.number().min(1),
});

interface CouponDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: z.infer<typeof couponSchema>) => void;
}

export default function CouponDrawer({ open, onOpenChange, onSubmit }: CouponDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg">
          <DrawerHeader>
            <DrawerTitle>Criar Novo Cupom</DrawerTitle>
            <DrawerDescription>
              Preencha os campos abaixo para criar um novo cupom de desconto.
            </DrawerDescription>
          </DrawerHeader>
          
          <div className="p-4">
            <CouponForm onSubmit={onSubmit} />
          </div>
          
          <DrawerFooter>
            <DrawerClose asChild>
              <button className="sr-only">Fechar</button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
