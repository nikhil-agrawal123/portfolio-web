# Portfolio Website

A modern, animated portfolio website built with React, TypeScript, and Tailwind CSS. Features smooth parallax scrolling effects, an interactive tech stack showcase, and a timeline-based journey section.

![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

## ✨ Features

- **Hero Parallax Section** — Stunning 3D parallax effect showcasing project thumbnails with smooth scroll animations
- **Interactive Navigation** — Glassmorphic "tubelight" navbar with smooth section scrolling
- **Tech Stack Showcase** — Animated cards displaying skills across Frontend, Backend, Database, AI/ML, Mobile, and DevOps
- **Timeline Journey** — Scroll-animated timeline highlighting professional milestones
- **Fully Responsive** — Optimized for all screen sizes from mobile to desktop
- **Modern UI Components** — Built with shadcn/ui and Radix UI primitives
- **Smooth Animations** — Powered by Framer Motion for buttery-smooth transitions

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm, yarn, pnpm, or [bun](https://bun.sh/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nikhil-agrawal123/portfolio-website.git
   cd portfolio-website
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   bun install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   bun dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview  # Preview the production build locally
```

## 📁 Project Structure

```
src/
├── components/
│   └── ui/              # Reusable UI components (shadcn/ui + custom)
│       ├── hero-parallax.tsx    # Parallax hero section
│       ├── tubelight-navbar.tsx # Animated navigation bar
│       ├── tech-stack.tsx       # Skills showcase grid
│       ├── timeline.tsx         # Journey timeline
│       └── ...                  # Additional shadcn/ui components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── pages/               # Page components
│   ├── Index.tsx        # Main portfolio page
│   └── NotFound.tsx     # 404 page
└── App.tsx              # Root component with routing
```

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | React 18, Vite |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS, tailwindcss-animate |
| **UI Components** | shadcn/ui, Radix UI |
| **Animations** | Framer Motion |
| **Routing** | React Router DOM |
| **State Management** | TanStack React Query |
| **Icons** | Lucide React |

## 🎨 Customization

### Updating Content

- **Projects**: Edit the `products` array in [src/pages/Index.tsx](src/pages/Index.tsx)
- **Tech Skills**: Modify `techCategories` in [src/components/ui/tech-stack.tsx](src/components/ui/tech-stack.tsx)
- **Timeline**: Update `timelineData` in [src/pages/Index.tsx](src/pages/Index.tsx)
- **Navigation**: Adjust `navItems` in [src/pages/Index.tsx](src/pages/Index.tsx)

### Theming

The project uses CSS custom properties for theming. Modify colors in [src/index.css](src/index.css).

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Nikhil Agrawal**

- GitHub: [@nikhil-agrawal123](https://github.com/nikhil-agrawal123)
- Linkedin: [@Nikhil-Agrawal](https://www.linkedin.com/in/nikhil-agrawal-6b238831a/)
- Email: nikhilagrawal644@gmail.com

---

<p align="center">
  Built with ❤️ using React and Tailwind CSS
</p>
