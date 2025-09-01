# Portfolio Website

A modern, responsive portfolio website showcasing my projects and skills as a full-stack developer.

## 🚀 Live Demo

[View Portfolio]https://portfolio-brown-theta-58.vercel.app

## 📖 Overview

This portfolio website features a clean, modern design with smooth animations and responsive layouts. It showcases my projects across different categories including full-stack applications, AI/ML projects, backend APIs, and more.

## ✨ Features

- **🎨 Modern Design**: Clean, professional interface with dark/light theme support
- **📱 Responsive Layout**: Optimized for all devices and screen sizes
- **🔍 Project Filtering**: Filter projects by category (Full-Stack, Backend, AI/ML, APIs)
- **🖼️ Image Gallery**: Interactive project screenshots with modal preview
- **⚡ Performance**: Built with Next.js 15 for optimal performance
- **🎭 Animations**: Smooth transitions and hover effects
- **📧 Contact Form**: Functional contact form for inquiries

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── about.tsx          # About section
│   ├── contact.tsx        # Contact section
│   ├── hero.tsx           # Hero section
│   ├── navigation.tsx     # Navigation bar
│   ├── portfolio.tsx      # Portfolio showcase
│   ├── theme-provider.tsx # Theme provider
│   └── ui/                # UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and configurations
├── public/                # Static assets
└── styles/                # Additional styles
```

## 🎯 Featured Projects

### Rustique Café - Modern Coffee Shop Experience
- **Tech Stack**: Next.js, React, TypeScript, Tailwind CSS, Supabase, PostgreSQL
- **Features**: Full-stack coffee shop application with menu management, admin dashboard, and authentication
- **Category**: Full-Stack

### TaskFlow - Task Management Platform
- **Tech Stack**: React, Laravel, PostgreSQL, Tailwind CSS, JWT
- **Features**: Real-time task management with Kanban boards and team collaboration
- **Category**: Full-Stack

### BagaNet - Federated Learning Platform
- **Tech Stack**: Python, TensorFlow.js, Flask, React, Docker, ONNX.js
- **Features**: Privacy-preserving lung disease classification using federated learning
- **Category**: AI/ML

### Additional Projects
- **Bayan Track**: Community management platform with Django backend
- **Skill Odyssey**: Educational platform with Express.js and MongoDB

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kyellog-silog/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

### Adding New Projects

1. Open `components/portfolio.tsx`
2. Add a new project object to the `projects` array:
   ```typescript
   {
     title: "Your Project Title",
     description: "Project description",
     screenshots: ["/image1.png", "/image2.png"],
     technologies: ["React", "Node.js", "MongoDB"],
     category: "Full-Stack",
     liveUrl: "https://your-demo.com",
     githubUrl: "https://github.com/username/repo",
   }
   ```

### Updating Contact Information

Edit the contact details in `components/contact.tsx`

### Customizing Theme

Modify the color scheme in `tailwind.config.js` and CSS custom properties in `app/globals.css`

## 📧 Contact

- **Email**: your.email@example.com
- **LinkedIn**: [Kyell Dimatatac](https://www.linkedin.com/in/kyell-dimatatac-58882517a)
- **GitHub**: [Kyellog-silog](https://github.com/Kyellog-silog)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

⭐ **Star this repository if you found it helpful!**
