# BardoJeiz Server API

Servidor backend para a aplicação BardoJeiz, uma plataforma de compartilhamento de posts com sistema de likes/dislikes e notificações push.

## 🚀 Tecnologias

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **SQLite3** - Banco de dados
- **Multer** - Upload de arquivos
- **OneSignal** - Notificações push
- **CORS** - Cross-Origin Resource Sharing

## 📋 Pré-requisitos

- Node.js instalado
- NPM ou Yarn
- Acesso ao OneSignal (para notificações push)

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd BardoJeiz-server
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente (se necessário):
```bash
# Porta do servidor (padrão: 8180)
PORT=8180
```

4. Execute o servidor:
```bash
npm start
# ou
yarn start
```

O servidor estará rodando em `http://localhost:8180`

## 📚 Documentação da API

### Base URL
```
http://localhost:8180
```

### Endpoints

#### 1. **GET** `/data`
Retorna todos os posts ordenados por ID decrescente.

**Resposta:**
```json
{
  "data": [
    {
      "id": 1,
      "USERNAME": "usuario",
      "USER_PIC": "https://...",
      "POST_DATA": "15/12/2024 - 14:30",
      "PIC_LOCAL": "https://...",
      "POST_DESC": "Descrição do post",
      "POST_LIKE": 5,
      "POST_DISLIKE": 1
    }
  ]
}
```

---

#### 2. **GET** `/data/:username`
Retorna posts de um usuário específico.

**Parâmetros:**
- `username` (string) - Nome do usuário

**Resposta:**
```json
{
  "data": [
    {
      "id": 1,
      "USERNAME": "usuario",
      "USER_PIC": "https://...",
      "POST_DATA": "15/12/2024 - 14:30",
      "PIC_LOCAL": "https://...",
      "POST_DESC": "Descrição do post",
      "POST_LIKE": 5,
      "POST_DISLIKE": 1
    }
  ]
}
```

---

#### 3. **GET** `/version`
Retorna a versão atual da API.

**Resposta:**
```json
{
  "data": "0.1.1"
}
```

---

#### 4. **GET** `/data/video_file`
Retorna apenas posts que contêm arquivos de vídeo (.mov ou .mp4).

**Resposta:**
```json
{
  "data": [
    {
      "id": 1,
      "USERNAME": "usuario",
      "PIC_LOCAL": "https://...video.mp4",
      "POST_DESC": "Post com vídeo"
    }
  ]
}
```

---

#### 5. **GET** `/data/img_file`
Retorna apenas posts que contêm arquivos de imagem (.jpg ou .png).

**Resposta:**
```json
{
  "data": [
    {
      "id": 1,
      "USERNAME": "usuario",
      "PIC_LOCAL": "https://...imagem.jpg",
      "POST_DESC": "Post com imagem"
    }
  ]
}
```

---

#### 6. **POST** `/data/like`
Incrementa o contador de likes de um post.

**Body:**
```json
{
  "ID": 123
}
```

**Resposta:**
```json
{
  "data": []
}
```

---

#### 7. **POST** `/data/del_like`
Decrementa o contador de likes de um post.

**Body:**
```json
{
  "ID": 123
}
```

**Resposta:**
```json
{
  "data": []
}
```

---

#### 8. **POST** `/data/dislike`
Incrementa o contador de dislikes de um post.

**Body:**
```json
{
  "ID": 123
}
```

**Resposta:**
```json
{
  "data": []
}
```

---

#### 9. **POST** `/data/del_dislike`
Decrementa o contador de dislikes de um post.

**Body:**
```json
{
  "ID": 123
}
```

**Resposta:**
```json
{
  "data": []
}
```

---

#### 10. **POST** `/data/upload`
Faz upload de uma imagem e cria um novo post.

**Form Data:**
- `photo` (file) - Arquivo de imagem
- `username` (string) - Nome do usuário
- `photo_pic` (string) - URL da foto do usuário
- `description` (string) - Descrição do post

**Resposta:**
```json
{
  "data": []
}
```

**Funcionalidades:**
- Salva a imagem na pasta `./img/`
- Redimensiona automaticamente para 30%
- Envia notificação push via OneSignal
- Converte horário para fuso horário brasileiro

---

#### 11. **POST** `/data/bot_upload`
Upload de posts via bot (sem redimensionamento automático).

**Form Data:**
- `photo` (string) - URL da imagem
- `username` (string) - Nome do usuário
- `photo_pic` (string) - URL da foto do usuário
- `description` (string) - Descrição do post
- `link` (string) - Link adicional

**Resposta:**
```json
{
  "data": []
}
```

**Funcionalidades:**
- Salva posts de bots específicos
- Envia notificações push para usuários inscritos
- Suporta posts de criptomoedas e informes

---

#### 12. **POST** `/share`
Converte uma imagem para base64 para compartilhamento.

**Body:**
```json
{
  "dados": "dados_adicionais",
  "nome": "nome_do_arquivo"
}
```

**Query Parameters:**
- `imagem` (string) - URL da imagem a ser convertida

**Resposta:**
```json
{
  "data": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
}
```

---

#### 13. **GET** `/data/img/:filename`
Servidor estático para servir imagens da pasta `./img/`.

**Parâmetros:**
- `filename` (string) - Nome do arquivo de imagem

**Resposta:** Arquivo de imagem

---

## 🗄️ Estrutura do Banco de Dados

### Tabela POSTS
| Campo | Tipo | Descrição |
|-------|------|-----------|
| ID | INTEGER | Identificador único (auto-incremento) |
| USERNAME | TEXT | Nome do usuário |
| USER_PIC | TEXT | URL da foto do usuário |
| POST_DATA | TEXT | Data e hora do post |
| PIC_LOCAL | TEXT | URL da imagem/vídeo do post |
| POST_DESC | TEXT | Descrição do post |
| POST_LIKE | INTEGER | Contador de likes |
| POST_DISLIKE | INTEGER | Contador de dislikes |
| LINK | TEXT | Link adicional (opcional) |

## 🔔 Notificações Push

O sistema utiliza o OneSignal para enviar notificações push:

- **Posts normais**: "usuario postou alguma merda"
- **Posts de bots**: Conteúdo específico do post
- **Criptomoedas**: Notificações sobre BTC, DOGE e informes

## 📁 Estrutura de Arquivos

```
BardoJeiz-server/
├── main.js          # Servidor principal e endpoints
├── bot.js           # Sistema de bots
├── database.db      # Banco SQLite
├── img/             # Pasta de imagens
├── services/        # Serviços adicionais
├── bots/            # Configurações de bots
├── package.json     # Dependências
└── README.md        # Esta documentação
```

## 🚨 Tratamento de Erros

Todos os endpoints retornam erros no formato:
```json
{
  "error": "Mensagem de erro"
}
```

**Códigos de Status HTTP:**
- `200` - Sucesso
- `400` - Erro na requisição
- `500` - Erro interno do servidor

## 🔧 Configurações

### OneSignal
- **App ID**: `aeb277cc-35e9-4ec4-84a4-406fc5a78c34`
- **Authorization**: `Basic NmFmNmZhZTMtMzRlMC00MzFjLTk5MWUtMWI3NWY3ZThmMzMw`

### Upload de Arquivos
- **Destino**: `./img/`
- **Formato**: JPG, PNG, MOV, MP4
- **Redimensionamento**: Automático para 30% (posts normais)

## 📝 Exemplos de Uso

### Criar um novo post
```bash
curl -X POST http://localhost:8180/data/upload \
  -F "photo=@imagem.jpg" \
  -F "username=usuario" \
  -F "photo_pic=https://exemplo.com/foto.jpg" \
  -F "description=Meu post"
```

### Dar like em um post
```bash
curl -X POST http://localhost:8180/data/like \
  -H "Content-Type: application/json" \
  -d '{"ID": 123}'
```

### Buscar posts de um usuário
```bash
curl http://localhost:8180/data/usuario123
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através dos issues do repositório. 