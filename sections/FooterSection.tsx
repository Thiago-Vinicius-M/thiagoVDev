import { FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FOOTER_LINKS } from "@/lib/data";

const CONTACT_ITEMS = [
  {
    label: "LinkedIn",
    description: "Perfil profissional",
    href: FOOTER_LINKS.linkedin,
    icon: FaLinkedin,
    external: true,
  },
  {
    label: "GitHub",
    description: "Repositórios e projetos",
    href: FOOTER_LINKS.github,
    icon: FaGithub,
    external: true,
  },
  {
    label: "Email",
    description: FOOTER_LINKS.email,
    href: `mailto:${FOOTER_LINKS.email}`,
    icon: MdEmail,
    external: false,
  },
  {
    label: "WhatsApp",
    description: "Mensagem direta",
    href: FOOTER_LINKS.whatsapp,
    icon: FaWhatsapp,
    external: true,
  },
];

export function FooterSection() {
  return (
    <>
      <section
        id="contato"
        className="max-w-4xl mx-auto px-4 md:px-6 py-14 md:py-20"
      >
        <SectionHeading title="Contato" className="mb-3" />
        <p className="text-[var(--text-muted)] text-sm mb-10">
          Aberto a oportunidades, projetos e conversas sobre tecnologia.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CONTACT_ITEMS.map(({ label, description, href, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="flex items-center gap-4 p-4 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:border-[rgba(255,255,255,0.1)] hover:bg-[#161616] transition-colors duration-200 group"
            >
              <Icon
                className="text-[var(--text-muted)] group-hover:text-white transition-colors duration-200 shrink-0"
                size={18}
              />
              <div>
                <p className="text-sm font-medium text-white">{label}</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer className="border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-5">
          <p className="text-[var(--text-muted)] text-xs">
            Thiago Vinícius · {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </>
  );
}
