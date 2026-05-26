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
    </section>
  );
}
