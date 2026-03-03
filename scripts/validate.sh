#!/bin/bash

# Script de Validação Final
# Verifica a integridade do projeto antes do deploy

set -e

echo "🔍 Iniciando validação final..."
echo ""

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Contador de erros
ERRORS=0

# 1. Verificar estrutura de arquivos
echo "📁 Verificando estrutura de arquivos..."
REQUIRED_FILES=(
  "src/app/layout.tsx"
  "src/app/page.tsx"
  "src/app/obrigado/page.tsx"
  "src/components/header.tsx"
  "src/components/navigation.tsx"
  "src/components/footer.tsx"
  "src/app/globals.css"
  "package.json"
  "next.config.ts"
  "tsconfig.json"
)

for file in "${REQUIRED_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✓${NC} $file"
  else
    echo -e "${RED}✗${NC} $file não encontrado"
    ((ERRORS++))
  fi
done
echo ""

# 2. Verificar dependências
echo "📦 Verificando dependências..."
if [ -d "node_modules" ]; then
  echo -e "${GREEN}✓${NC} node_modules instalado"
else
  echo -e "${YELLOW}⚠${NC} node_modules não encontrado. Execute: npm install"
  ((ERRORS++))
fi
echo ""

# 3. Verificar TypeScript
echo "🔧 Verificando TypeScript..."
if npx tsc --noEmit > /dev/null 2>&1; then
  echo -e "${GREEN}✓${NC} TypeScript sem erros"
else
  echo -e "${RED}✗${NC} Erros de TypeScript encontrados"
  npx tsc --noEmit
  ((ERRORS++))
fi
echo ""

# 4. Verificar build
echo "🏗️  Testando build de produção..."
if npm run build > /dev/null 2>&1; then
  echo -e "${GREEN}✓${NC} Build bem-sucedido"
else
  echo -e "${RED}✗${NC} Erro no build"
  ((ERRORS++))
fi
echo ""

# 5. Verificar rotas geradas
echo "🛣️  Verificando rotas geradas..."
if [ -d ".next/server/app" ]; then
  ROUTES=$(find .next/server/app -name "*.html" -o -name "page.js" | wc -l)
  echo -e "${GREEN}✓${NC} $ROUTES rotas geradas"
else
  echo -e "${RED}✗${NC} Diretório de build não encontrado"
  ((ERRORS++))
fi
echo ""

# 6. Verificar assets públicos
echo "🖼️  Verificando assets públicos..."
PUBLIC_ASSETS=(
  "public/logo.svg"
  "public/logo-dark.svg"
  "public/logo-vertical.svg"
  "public/logo-vertical-dark.svg"
)

MISSING_ASSETS=0
for asset in "${PUBLIC_ASSETS[@]}"; do
  if [ -f "$asset" ]; then
    echo -e "${GREEN}✓${NC} $asset"
  else
    echo -e "${YELLOW}⚠${NC} $asset não encontrado (opcional)"
    ((MISSING_ASSETS++))
  fi
done

# Assets críticos para SEO
CRITICAL_ASSETS=(
  "public/favicon.ico"
  "public/og-image.png"
  "public/apple-touch-icon.png"
)

for asset in "${CRITICAL_ASSETS[@]}"; do
  if [ -f "$asset" ]; then
    echo -e "${GREEN}✓${NC} $asset"
  else
    echo -e "${YELLOW}⚠${NC} $asset não encontrado (recomendado para SEO)"
  fi
done
echo ""

# 7. Verificar configurações
echo "⚙️  Verificando configurações..."

# Verificar se metadataBase está configurado
if grep -q "metadataBase" src/app/layout.tsx; then
  echo -e "${GREEN}✓${NC} metadataBase configurado"
else
  echo -e "${YELLOW}⚠${NC} metadataBase não encontrado"
fi

# Verificar lang no HTML
if grep -q 'lang="pt-BR"' src/app/layout.tsx; then
  echo -e "${GREEN}✓${NC} HTML lang configurado"
else
  echo -e "${RED}✗${NC} HTML lang não configurado"
  ((ERRORS++))
fi
echo ""

# 8. Resumo final
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $ERRORS -eq 0 ]; then
  echo -e "${GREEN}✅ Validação concluída com sucesso!${NC}"
  echo ""
  echo "Próximos passos:"
  echo "1. Adicionar imagens SEO (favicon, og-image, apple-touch-icon)"
  echo "2. Testar em ambiente local: npm run dev"
  echo "3. Executar testes de acessibilidade"
  echo "4. Deploy para produção"
  exit 0
else
  echo -e "${RED}❌ Validação falhou com $ERRORS erro(s)${NC}"
  echo ""
  echo "Corrija os erros acima antes de prosseguir."
  exit 1
fi
