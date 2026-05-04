import { DSSBackground } from "../organisms/DSSBackground";
import { FloatingNavbar } from "../organisms/FloatingNavbar";
import { ThemeSwitcher } from "../organisms/ThemeSwitcher";
import { LanguageSwitcher } from "../organisms/LanguageSwitcher";

export function PageLayout({ children }) {
  return (
    <div className="relative min-h-screen w-full bg-[#020617] text-white selection:bg-white/20">
      <DSSBackground />
      <FloatingNavbar />
      <ThemeSwitcher />
      <LanguageSwitcher />

      <div className="relative z-10 pointer-events-none">{children}</div>
    </div>
  );
}
