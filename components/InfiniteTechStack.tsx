import Image from "next/image";

const TECHNOLOGIES = [
  { name: "HTML5",      file: "htmlIcon.png",      aspect: 1.98 },
  { name: "CSS3",       file: "cssIcon.png",        aspect: 2.01 },
  { name: "JavaScript", file: "javascriptIcon.png", aspect: 1.0  },
  { name: "TypeScript", file: "typescriptIcon.png", aspect: 1.0  },
  { name: "React",      file: "reactIcon.png",      aspect: 1.0  },
  { name: "Node.js",    file: "nodeJsIcon.png",     aspect: 2.13 },
  { name: "Python",     file: "pythonIcon.png",     aspect: 1.0  },
  { name: "Java",       file: "javaIcon.png",       aspect: 1.0  },
];

const TRACK = [...TECHNOLOGIES, ...TECHNOLOGIES];

export function InfiniteTechStack() {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
      }}
    >
      <div className="flex items-center animate-marquee">
        {TRACK.map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="flex shrink-0 items-center justify-center px-4 md:px-10"
          >
            <div
              className="relative h-12 md:h-[68px] opacity-[0.45]"
              style={{ aspectRatio: String(tech.aspect) }}
            >
              <Image
                src={`/images/${tech.file}`}
                alt={tech.name}
                fill
                sizes="120px"
                className="object-contain select-none"
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
