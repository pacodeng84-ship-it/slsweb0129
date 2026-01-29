import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useLanguage } from '@/hooks/useLanguage';

// Empty component
export function Empty() {
  const { language } = useLanguage();
  const message = language === 'en' ? 'Coming soon' : '即将上线';
  
  return (
    <div className={cn("flex h-full items-center justify-center")} onClick={() => toast(message)}>Empty</div>
  );
}