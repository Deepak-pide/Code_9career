import { Code, Layout, Play, Image as ImageIcon, Video, Camera, Mic2, Briefcase } from "lucide-react";

export const CATEGORIES = [
  { id: "web", label: "Web Developer", icon: Code, color: "blue", description: "Full-stack and front-end engineering units." },
  { id: "uiux", label: "UI/UX Designer", icon: Layout, color: "pink", description: "Visual and interaction design squads." },
  { id: "animation", label: "Animation", icon: Play, color: "purple", description: "3D and 2D motion graphics experts." },
  { id: "thumbnail", label: "Thumbnail Artist", icon: ImageIcon, color: "amber", description: "High-CTR visual asset creation." },
  { id: "reel", label: "Reel Creator", icon: Video, color: "rose", description: "Short-form content and viral strategy." },
  { id: "film", label: "Film Producer", icon: Camera, color: "cyan", description: "Cinematic production and directing." },
  { id: "media", label: "Media Production", icon: Mic2, color: "indigo", description: "Podcast and multi-channel content units." },
];

export const SAMPLE_TEAMS = [
  {
    id: "t1",
    name: "Pixel Perfect Squad",
    company: "Creative Labs",
    description: "Specializing in high-end UI/UX and web interactions. We need a visionary designer to lead our next product launch.",
    seats: "1/3",
    stipend: "$1,800/mo",
    skills: ["Figma", "Next.js", "Tailwind"],
    theme: "pink" as const,
    category: "uiux",
    members: [
      { name: "Sarah", role: "Lead Designer", avatar: "https://picsum.photos/seed/sarah/100/100" },
      { name: "John", role: "Frontend", avatar: "https://picsum.photos/seed/john/100/100" }
    ]
  },
  {
    id: "t2",
    name: "Motion Engine Unit",
    company: "NeuroTech",
    description: "Crafting the future of 3D animations for technical demonstrations and cinematic trailers.",
    seats: "2/5",
    stipend: "$2,200/mo",
    skills: ["Blender", "After Effects", "C4D"],
    theme: "purple" as const,
    category: "animation",
    members: [
      { name: "Elena", role: "3D Artist", avatar: "https://picsum.photos/seed/elena/100/100" }
    ]
  },
  {
    id: "t3",
    name: "Vertical Viral Team",
    company: "TechBrief Media",
    description: "Dedicated Reel creators focused on short-form storytelling and high-retention editing strategies.",
    seats: "3/4",
    stipend: "$1,200/mo",
    skills: ["Premiere", "CapCut", "Viral Strategy"],
    theme: "rose" as const,
    category: "reel",
    members: [
      { name: "Mike", role: "Editor", avatar: "https://picsum.photos/seed/mike/100/100" }
    ]
  },
  {
    id: "t4",
    name: "Full Stack Nexus",
    company: "DataStream",
    description: "Building robust cloud architectures. Looking for disciplined Web Developers to scale our infrastructure.",
    seats: "2/6",
    stipend: "$2,500/mo",
    skills: ["Go", "React", "Postgres"],
    theme: "blue" as const,
    category: "web",
    members: [
      { name: "Alex", role: "Backend", avatar: "https://picsum.photos/seed/alex/100/100" },
      { name: "Sam", role: "Architect", avatar: "https://picsum.photos/seed/sam/100/100" }
    ]
  },
  {
    id: "t5",
    name: "Cinematic Core",
    company: "FrameFlow Studio",
    description: "Film producers and directors building a new-age documentary series for global tech founders.",
    seats: "1/4",
    stipend: "$3,000/mo",
    skills: ["Directing", "Scripting", "Production"],
    theme: "cyan" as const,
    category: "film",
    members: [
      { name: "Marcus", role: "Director", avatar: "https://picsum.photos/seed/marcus/100/100" }
    ]
  },
  {
    id: "t6",
    name: "Clickbait Artists",
    company: "Creator Hub",
    description: "Specialized Thumbnail unit focused on psychological design and high CTR visual assets.",
    seats: "4/5",
    stipend: "$1,000/mo",
    skills: ["Photoshop", "AI Design", "Visual Arts"],
    theme: "amber" as const,
    category: "thumbnail",
    members: [
      { name: "Tom", role: "Designer", avatar: "https://picsum.photos/seed/tom/100/100" }
    ]
  }
];
