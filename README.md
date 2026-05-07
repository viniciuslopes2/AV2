# **Aerocode**
Avaliação AV2 — Professor Gerson da Penha

Material: Técnicas de Programação I

Nome: Vinícius Silva Lopes

Este é o sistema da Aerocode na sua segunda avaliação, feito apenas como um mockup para terceira avaliação — desta vez desenvolvido como uma aplicação web completa (SPA) utilizando **React** com **TypeScript**. Em vez do terminal, agora tudo acontece no navegador.

O projeto foi construído com **Vite** como bundler, **CSS Modules** para estilização isolada por componente e uma estrutura de pastas organizada por página — cada tela tem seus próprios arquivos `.tsx` e `.module.css`. Não há backend nem banco de dados real, os dados são simulados diretamente no front-end.
## **Árvore do projeto**

Antes de seguir qualquer passo abaixo, confira se a estrutura do projeto está exatamente assim na sua máquina. Qualquer arquivo fora do lugar pode gerar erros inesperados na hora de rodar.

```
aerocodeAV2/
├── src/                              # pasta principal do código-fonte
│   ├── assets/                       # imagens e recursos estáticos
│   │   ├── bg-aviao.png
│   │   └── logo.png
│   ├── components/                   # componentes reutilizáveis
│   │   ├── modais/
│   │   │   ├── modais-container.tsx
│   │   │   └── modal.module.css
│   │   └── sidebar/
│   │       ├── sidebar.module.css
│   │       └── sidebar.tsx
│   ├── pages/                        # uma pasta por tela da aplicação
│   │   ├── dashboard/
│   │   │   ├── dashboard.module.css
│   │   │   └── dashboard.tsx
│   │   ├── detalhes/
│   │   │   ├── detalhes.module.css
│   │   │   └── detalhes.tsx
│   │   ├── equipe/
│   │   │   ├── equipe.module.css
│   │   │   └── equipe.tsx
│   │   ├── frota/
│   │   │   ├── frota.module.css
│   │   │   └── frota.tsx
│   │   ├── login/
│   │   │   ├── login.module.css
│   │   │   └── login.tsx
│   │   ├── relatorio/
│   │   │   ├── relatorio.module.css
│   │   │   └── relatorio.tsx
│   │   └── testes/
│   │       ├── testes.module.css
│   │       └── testes.tsx
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.jsx
│   └── types.ts
├── .gitignore                        # arquivos ignorados pelo Git (node_modules)
├── eslint.config.js                  # regras de linting
├── index.html                        # ponto de entrada do Vite
├── package-lock.json                 # árvore de dependências travada
├── package.json                      # configurações do projeto e scripts
├── README.md                         # documentação
└── vite.config.js                    # configurações do bundler
```

## **Requisitos**

Para garantir que o sistema rode sem falhas, você precisa ter instalado na sua máquina:

* **Node.js** (Versão 18 ou superior — [Baixe aqui](https://nodejs.org/))
* **npm** (versão 9.x, já incluso com o Node.js)

> Para verificar se já está instalado, abra o terminal e execute:
> ```
> node -v
> npm -v
> ```

## **Instalação e execução**

Siga os passos abaixo **exatamente nesta ordem** para colocar o sistema no ar.

### **Passo 1: Extraia a pasta do projeto**

Descompacte o arquivo `.zip` em qualquer local do seu computador. Ou dê `git clone <link do projeto via HTTPS>`

### **Passo 2: Abra o terminal na pasta do projeto**

* **Windows**: clique com o botão direito dentro da pasta extraída → "Abrir no Terminal" (ou PowerShell).
* **Linux**: clique com o botão direito → "Abrir terminal aqui" (ou `cd` até a pasta).

### **Passo 3: Instale as dependências**

```bash
npm install
```

Aguarde o download. Isso cria a pasta `node_modules/` — pode levar alguns minutos na primeira vez.

### **Passo 4: Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

### **Passo 5: Acesse no navegador**

Abra o link que aparecer no terminal. Geralmente será:

```
http://localhost:5173
```

## **Credenciais de demonstração**

**AVISO:** o sistema aceita qualquer combinação de usuário e senha — não há validação real, pois trata-se de um protótipo.

Use os dados abaixo para entrar:

* **Usuário:** `vini.lopes`
* **Senha:** `senha123`

## **Trocar perfil de permissão**

Na barra lateral, no rodapé, use os botões **Admin / Engenheiro / Operador** para alternar entre os níveis de acesso e visualizar as diferenças de permissão em tempo real.

## **Possíveis erros e o seu Troubleshooting**

Nessa seção abaixo, vou lhe mostrar possíveis erros tanto para Windows 10/11 quanto para Linux. **Por favor**, siga estritamente os passos caso algum deles aconteça. Deixei tudo formatado para facilitar a leitura.

### Windows 10 / 11

* **`'node' não é reconhecido como um comando interno ou externo`**
    * O Node.js não está instalado ou não está no PATH.
    * Baixe e instale em [nodejs.org](https://nodejs.org) (versão LTS).
    * Marque a opção "Add to PATH" durante a instalação.
    * Feche e reabra o terminal, depois tente novamente.

* **`npm : O arquivo não pode ser carregado porque a execução de scripts foi desabilitada`** (PowerShell)
    * A política de execução do PowerShell está bloqueando o npm. Rode o comando abaixo e confirme com `S`:
    ```powershell
    Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
    ```
    * Após isso, rode `npm install` novamente.

* **`EACCES: permission denied` / `EPERM: operation not permitted`**
    * Execute o terminal como **Administrador**:
    * Menu Iniciar → pesquise "PowerShell" → botão direito → "Executar como administrador".

* **`Error: listen EADDRINUSE: address already in use :::5173`**
    * A porta 5173 está ocupada por outro processo. Use uma porta diferente:
    ```bash
    npm run dev -- --port 3000
    ```

* **`node_modules` não encontrado após extração**
    * A pasta `node_modules` não é incluída no zip — isso é normal. Execute `npm install` antes de tentar `npm run dev`.

### Linux (Ubuntu 24.04 / derivados)

* **`node: command not found` ou `npm: command not found`**
    ```bash
    sudo apt update
    sudo apt install nodejs npm
    ```
    > Recomendado: use o **nvm** para instalar versões mais recentes do Node:
    > ```bash
    > curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    > source ~/.bashrc
    > nvm install --lts
    > ```

* **`EACCES: permission denied` ao rodar `npm install`**
    * Nunca use `sudo npm install`. Em vez disso, corrija as permissões da pasta com:
    ```bash
    sudo chown -R $USER:$USER .
    npm install
    ```

* **`Error: listen EADDRINUSE: address already in use :::5173`**
    * Use outra porta diretamente:
    ```bash
    npm run dev -- --port 3000
    ```
    * Ou descubra o processo usando a porta e encerre-o:
    ```bash
    lsof -i :5173
    kill -9 <PID>
    ```

* **Versão do Node muito antiga (`SyntaxError: Unexpected token '??='` ou similar)**
    * O projeto exige Node 18+. Verifique com `node -v` e atualize com o nvm:
    ```bash
    nvm install --lts
    nvm use --lts
    ```

## **Encerrando o servidor**

Pressione `Ctrl + C` no terminal onde o `npm run dev` está rodando.
