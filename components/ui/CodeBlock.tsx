"use client";

type TokenType = "keyword" | "string" | "number" | "type" | "fn" | "ident" | "comment" | "punct";

const KEYWORDS = new Set([
  "const", "let", "var", "function", "return", "if", "else", "for", "while",
  "true", "false", "null", "undefined", "async", "await", "import", "export",
  "from", "class", "interface", "type", "new", "this", "typeof", "instanceof",
  "void", "never", "any", "unknown", "readonly", "as", "in", "of", "switch",
  "case", "break", "continue", "throw", "try", "catch", "finally", "extends",
  "implements", "static", "public", "private", "protected", "abstract",
]);

const COLORS: Record<TokenType, string> = {
  keyword: "#569cd6",
  string:  "#ce9178",
  number:  "#b5cea8",
  type:    "#4ec9b0",
  fn:      "#dcdcaa",
  ident:   "#9cdcfe",
  comment: "#6a9955",
  punct:   "#d4d4d4",
};

interface Token {
  type: TokenType;
  text: string;
}

function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < code.length) {
    // Single-line comment
    if (code[i] === "/" && code[i + 1] === "/") {
      let j = i;
      while (j < code.length && code[j] !== "\n") j++;
      tokens.push({ type: "comment", text: code.slice(i, j) });
      i = j;
      continue;
    }

    // String (single, double, or template literal)
    if (code[i] === "'" || code[i] === '"' || code[i] === "`") {
      const q = code[i];
      let j = i + 1;
      while (j < code.length) {
        if (code[j] === "\\" && q !== "`") { j += 2; continue; }
        if (code[j] === q) { j++; break; }
        j++;
      }
      tokens.push({ type: "string", text: code.slice(i, j) });
      i = j;
      continue;
    }

    // Number (not preceded by a word character)
    if (/\d/.test(code[i]) && (i === 0 || !/\w/.test(code[i - 1]))) {
      let j = i;
      while (j < code.length && /[\d.]/.test(code[j])) j++;
      tokens.push({ type: "number", text: code.slice(i, j) });
      i = j;
      continue;
    }

    // Identifier, keyword, type, or function call
    if (/[a-zA-Z_$]/.test(code[i])) {
      let j = i;
      while (j < code.length && /[\w$]/.test(code[j])) j++;
      const word = code.slice(i, j);
      const followedByParen = /^\s*\(/.test(code.slice(j));

      let type: TokenType;
      if (KEYWORDS.has(word)) {
        type = "keyword";
      } else if (followedByParen) {
        type = "fn";
      } else if (/^[A-Z]/.test(word)) {
        type = "type";
      } else {
        type = "ident";
      }
      tokens.push({ type, text: word });
      i = j;
      continue;
    }

    // Everything else (punctuation, operators, whitespace, newlines)
    tokens.push({ type: "punct", text: code[i] });
    i++;
  }

  return tokens;
}

export function CodeBlock({ code, language = "typescript" }: { code: string; language?: string }) {
  const tokens = tokenize(code);

  return (
    <div className="rounded-lg border border-white/[0.07] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-white/[0.06]">
        <span className="text-[10px] text-white/30 select-none">{language}</span>
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-white/10" />
          <span className="w-2 h-2 rounded-full bg-white/10" />
          <span className="w-2 h-2 rounded-full bg-white/10" />
        </div>
      </div>
      <pre className="text-[11px] font-mono bg-[#141414] px-4 py-3 overflow-x-auto leading-relaxed m-0">
        {tokens.map((token, i) => (
          <span key={i} style={{ color: COLORS[token.type] }}>
            {token.text}
          </span>
        ))}
      </pre>
    </div>
  );
}
