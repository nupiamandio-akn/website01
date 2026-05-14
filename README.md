# AEAFR Portal - Estrutura Reorganizada

## 📁 Nova Estrutura de Diretórios

```
/workspace
├── index.html              # Página inicial
├── login.html              # Página de login
├── register.html           # Página de registro
├── bolsas.html             # Página de listagem de bolsas
├── css/
│   └── style.css           # Folha de estilos principal
├── js/
│   ├── main.js             # Ponto de entrada principal (compatibilidade)
│   └── modules/
│       ├── utils.js        # Funções utilitárias
│       └── navigation.js   # Módulo de navegação
├── components/             # Componentes reutilizáveis (futuro)
└── assets/
    └── images/             # Imagens e recursos estáticos
```

## 🔄 Mudanças Realizadas

### 1. **Módulos JavaScript**
- `js/modules/utils.js` - Funções utilitárias exportáveis:
  - `doSearch()` - Lógica de pesquisa
  - `setupSearchListeners()` - Listeners para pesquisa
  - `setupViewTabs()` - Tabs de visualização
  - `setupFilterButton()` - Botão de filtros
  - `setupPagination()` - Paginação
  - `setupBackToTop()` - Botão voltar ao topo
  - `setupScrollAnimations()` - Animações de scroll
  - `formatDate()` - Formatação de datas
  - `debounce()` - Debounce para eventos

- `js/modules/navigation.js` - Módulo de navegação:
  - `setupMobileMenu()` - Menu mobile
  - `setupStickyHeader()` - Header fixo
  - `setActiveNavItem()` - Item ativo na navegação

### 2. **Main.js Atualizado**
- Mantém compatibilidade com código existente
- Expõe funções globalmente quando necessário
- Documentado com comentários claros

### 3. **Organização de Assets**
- Pasta `assets/images/` para recursos estáticos
- Pasta `components/` para componentes futuros

## 🚀 Como Usar os Módulos

### Importação em novos arquivos HTML:
```html
<script type="module">
  import { doSearch, setupSearchListeners } from './js/modules/utils.js';
  import { setupMobileMenu } from './js/modules/navigation.js';
  
  setupMobileMenu();
  setupSearchListeners();
</script>
```

### Uso com o main.js existente:
```html
<!-- Funciona automaticamente -->
<script src="js/main.js"></script>
```

## 📝 Próximos Passos Sugeridos

1. **Componentização**: Criar componentes HTML reutilizáveis na pasta `components/`
2. **Build Process**: Adicionar um bundler (Vite/Webpack) para produção
3. **TypeScript**: Migrar para TypeScript para melhor tipagem
4. **Testes**: Adicionar testes unitários para os módulos
5. **Documentação**: Expandir documentação de cada módulo

## ✅ Benefícios da Reestruturação

- **Código modular** - Mais fácil de manter e testar
- **Separação de responsabilidades** - Cada módulo tem uma função clara
- **Compatibilidade** - Código existente continua funcionando
- **Escalabilidade** - Fácil adicionar novos módulos
- **Reutilização** - Funções exportáveis para uso em múltiplas páginas
