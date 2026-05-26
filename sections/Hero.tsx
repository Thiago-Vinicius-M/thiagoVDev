import Image from "next/image";
import { Badge } from "@/components/ui/Badge";

// Ajuste aqui para controlar o enquadramento da foto sem editar o componente.
// x:    posição horizontal (ex: "50%", "left", "40%")
// y:    posição vertical   (ex: "20%", "top", "center")
// zoom: ampliação da imagem (1 = normal, 1.2 = 20% maior, 2 = dobro)
const PROFILE_CROP = { x: "64%", y: "59%", zoom: 1.2};

export function Hero() {
  return (
    <section
      id="hero"
      className="max-w-4xl mx-auto px-4 md:px-6 pt-28 pb-16 md:pt-32 md:pb-20"
    >
      <div className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-start">
        {/* Text */}
        <div>
          <Badge label="Disponível para trabalhos" pulsing className="mb-6" />

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[var(--font-space)] leading-tight tracking-tight mb-4">
            Thiago Vinícius.
          </h1>

          <p className="text-base md:text-lg text-[var(--text-muted)] leading-relaxed max-w-md mb-2">
            Desenvolvedor em formação focado em aplicações web e experiência do
            usuário.
          </p>

          <p className="text-sm text-[var(--text-muted)] opacity-60 mb-8">
            26 anos · Goiânia, GO
          </p>

          <div className="flex items-center gap-6">
            <a
              href="#projetos"
              className="text-sm font-medium text-white border-b border-white/20 hover:border-[var(--green)] hover:text-[var(--green)] transition-colors duration-200 pb-px"
            >
              Ver projetos →
            </a>
            <a
              href="#contato"
              className="text-sm font-medium text-[var(--text-muted)] hover:text-white transition-colors duration-200"
            >
              Entrar em contato
            </a>
          </div>
        </div>

        {/* Photo */}
        <div className="flex justify-center md:justify-end pt-1">
          <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border border-[var(--border)]">
            <Image
              src="/images/profile.webp"
              alt="Thiago Vinícius"
              fill
              className="object-cover"
              style={{
                objectPosition: `${PROFILE_CROP.x} ${PROFILE_CROP.y}`,
                transform: `scale(${PROFILE_CROP.zoom})`,
                transformOrigin: `${PROFILE_CROP.x} ${PROFILE_CROP.y}`,
              }}
              sizes="(max-width: 768px) 144px, 176px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
