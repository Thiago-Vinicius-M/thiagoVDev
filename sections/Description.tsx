import { SectionHeading } from "@/components/ui/SectionHeading";

export function Description() {
  return (
    <section
      id="sobre"
      className="max-w-4xl mx-auto px-4 md:px-6 py-14 md:py-20"
    >
      <SectionHeading title="Sobre mim" className="mb-8" />

      <div className="max-w-2xl space-y-5 text-[15px] leading-[1.8] text-[var(--text-muted)]">
        <p>
          Sou desenvolvedor em formação com foco em aplicações web, automações e
          experiência do usuário. Busco transformar ideias em soluções funcionais
          e bem pensadas.
        </p>
        <p>
          Atualmente concilio os estudos em Análise e Desenvolvimento de Sistemas
          com atuação profissional na área de implantação e suporte de sistemas,
          o que me deu uma visão prática sobre como o software funciona na mão
          do usuário final.
        </p>
        <p>
          Essa experiência moldou minha atenção a usabilidade, fluxos
          operacionais e comportamento real do usuário — perspectivas que
          carrego para o código.
        </p>
      </div>

      <div className="max-w-2xl mt-8">
        <h3 className="text-[11px] uppercase tracking-widest text-[var(--text-muted)] mb-3">
          Meu momento atual
        </h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-[13px] text-[var(--text-muted)]">
            <span className="mt-[7px] w-1 h-1 rounded-full bg-white/25 shrink-0" aria-hidden="true" />
            Estudante de Análise e Desenvolvimento de Sistemas — 6º Período · UniGoiás
          </li>
          <li className="flex items-start gap-2 text-[13px] text-[var(--text-muted)]">
            <span className="mt-[7px] w-1 h-1 rounded-full bg-white/25 shrink-0" aria-hidden="true" />
            Analista de Implantação / Suporte · Inove Sistemas
          </li>
        </ul>
      </div>
    </section>
  );
}
