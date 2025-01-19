# Thakumar Jhuli

Thakumar Jhuli is an AI-powered storytelling and creative writing assistant inspired by the timeless Bengali folklore collection. This modern web application combines cutting-edge AI technology with a rich feature set to help users create, analyze, and refine their content across multiple domains. 

---

## Table of Contents

1. [Overview](#overview)  
2. [Features](#features)  
3. [Technology Stack](#technology-stack)  
4. [Installation and Setup](#installation-and-setup)  
5. [Usage](#usage)  
6. [File Structure](#file-structure)  
7. [Security](#security)  
8. [Developer Tools](#developer-tools)  
9. [Legal and Information](#legal-and-information)  

---

## Overview

Thakumar Jhuli serves as a comprehensive platform for writers, students, and creative individuals. From generating stories, poetry, and scientific articles to analyzing literature and refining existing content, this application provides tools that are intuitive and user-friendly. The name is a tribute to the enchanting stories of Bengal, reimagined with AI.

---

## Features

### Creative Writing
- **Story Generator:** Interactive story creation with customizable genres, characters, and plot elements.
- **Poetry Generator:** Create poems in various styles, moods, and genres, including emulations of famous poets.

### Analytical Tools
- **Literature Analysis:** Summarize, critique, and explain literary works, including poems and stories.
- **Philosophy Explorer:** Dive into philosophical concepts with detailed explanations.

### AI-Powered Assistants
- **Writing Enhancer:** Refine user-written content for grammar, style, and clarity.
- **Roleplaying Assistant:** AI-driven interactive roleplaying scenarios.

### Specialized Content Creation
- **Scientific Article Writing:** Generate structured articles with customizable fields, tone, and length.
- **Email Generator:** Create professional and personalized emails for various contexts.
- **Social Media Assistance:** Generate engaging content tailored for social media platforms.

### Utility Features
- **Grammar & Style Checker:** Analyze and improve text with specific suggestions.
- **Paraphraser:** Rewrite text while preserving the original meaning.
- **AI Writing Coach:** Real-time writing advice for skill improvement.

### User Experience
- **Dark/Light Mode:** Switch between themes for better usability.
- **Bilingual Support:** English and Bengali language options.
- **File Download:** Save your work as TXT or DOC files.
- **Sharing Options:** Directly share content on social media.

---

## Technology Stack

### Frontend
- Framework: **Next.js 13+ (App Router)**  
- Language: **TypeScript**  
- UI Design: **Tailwind CSS**, **shadcn/ui**  
- State Management: **React Hooks (useState, useEffect)**  
- Routing: **File-based routing with Next.js App Router**  

### Backend
- Framework: **Next.js API routes (serverless functions)**  
- Language: **TypeScript**  
- AI Integration: **Custom Mistral AI integration for text generation**

### Dependencies
- `next`, `react`, `react-dom`, `tailwindcss`
- `@radix-ui/react-*`, `lucide-react`, `next-themes`
- `clsx`, `tailwind-merge`

---

## Installation and Setup

### Prerequisites
- Node.js v16+  
- npm or yarn  

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/thakumar-jhuli.git
   cd thakumar-jhuli
2. Install dependencies:
npm install
3.  Set up environment variables:
    *   Create a `.env.local` file in the root directory.
    *   Add your Mistral AI API key and other required environment variables:
        
        ```makefile
        MISTRAL_API_KEY=your_api_key
        ```

4.  Start the development server:
    
    ```bash
    npm run dev
    ```

5.  Visit `http://localhost:3000` to explore the application.

### Deployment

For production, build and deploy the application:

```bash
npm run build
npm start
```
## File Structure
thakumar-jhuli/
│
├── app/                    # Frontend pages and components
│   ├── components/          # Reusable UI components
│   ├── actions/             # Server-side actions for API calls
│
├── lib/                    # Utility functions
├── public/                 # Static assets like images and icons
├── styles/                 # Tailwind CSS customizations
├── pages/                  # Pages like index.tsx, api routes
│
├── .env.local              # Environment variables file
├── package.json            # Project dependencies and scripts
├── next.config.js          # Next.js configuration file
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
└── README.md               # Project readme file

##Security
Sensitive information, such as API keys, is stored in environment variables (.env.local).
All API calls are made server-side to protect sensitive data.

## Legal and Information
Privacy Policy: Details on how user data is handled.
About Us: A dedicated section highlighting the app's purpose and inspiration.
Support
For issues or suggestions, please reach out to:
Email: mahatirtusher@gmail.com

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgments
Inspired by the timeless tales of Bengal and powered by modern AI, Thakumar Jhuli is dedicated to all storytellers, thinkers, and creative minds.

