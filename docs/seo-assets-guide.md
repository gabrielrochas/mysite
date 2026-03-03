# Guia de Assets para SEO

## Imagens necessárias para completar a tarefa 7.1

### 1. Favicon (obrigatório)
Criar e adicionar em `/public/`:
- `favicon.ico` (32x32 ou 16x16)
- `apple-touch-icon.png` (180x180)

### 2. Open Graph Image (obrigatório)
Criar e adicionar em `/public/`:
- `og-image.png` (1200x630)

**Conteúdo sugerido:**
- Fundo com as cores do tema (#0D0D0D ou gradiente)
- Texto: "Gabriel Rocha"
- Subtítulo: "Frontend Developer"
- Tecnologias: React • Next.js • TypeScript
- Logo (se disponível)

### 3. Ferramentas para criar os assets

**Favicon:**
- https://realfavicongenerator.net/
- https://favicon.io/

**Open Graph Image:**
- Figma/Canva (design manual)
- https://www.opengraph.xyz/ (gerador online)
- https://og-playground.vercel.app/ (preview)

### 4. Verificação

Após adicionar os arquivos, testar com:
- https://www.opengraph.xyz/ (preview Open Graph)
- https://cards-dev.twitter.com/validator (Twitter Card)
- Inspecionar elemento no navegador e verificar tags `<meta>`

## Status da implementação

✅ Metadata configurada no layout.tsx
✅ Metadata configurada em page.tsx
✅ Metadata configurada em obrigado/page.tsx
✅ Open Graph tags adicionadas
✅ Twitter Card tags adicionadas
✅ Canonical URLs configuradas
✅ Robots meta configurado

⏳ Pendente: Criar e adicionar imagens (favicon.ico, apple-touch-icon.png, og-image.png)
