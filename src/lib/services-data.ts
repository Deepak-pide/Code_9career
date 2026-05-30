import { Megaphone, Code, Video, Image as ImageIcon, Music, MoreHorizontal } from "lucide-react";

export const SERVICES = [
  {
    id: "marketing",
    title: "Marketing",
    description: "Data-driven growth strategies and brand positioning for modern startups and content creators.",
    icon: Megaphone,
    color: "blue",
    features: ["Social media growth", "Campaign management", "Brand identity"]
  },
  {
    id: "web-dev",
    title: "Web Development",
    description: "High-performance full-stack applications built with the latest technologies for scale and speed.",
    icon: Code,
    color: "purple",
    features: ["Next.js & React", "Backend architecture", "Responsive design"]
  },
  {
    id: "video-editor",
    title: "Video Editor",
    description: "Professional post-production and editing services optimized for high retention and engagement.",
    icon: Video,
    color: "rose",
    features: ["Color grading", "Motion graphics", "Sound design"]
  },
  {
    id: "thumbnail",
    title: "Thumbnail Design",
    description: "Eye-catching visual assets engineered to maximize click-through rates and visual impact.",
    icon: ImageIcon,
    color: "amber",
    features: ["Psychological design", "A/B testing", "Vibrant aesthetics"]
  },
  {
    id: "music-production",
    title: "Music Production",
    description: "Custom audio engineering, composition, and soundscapes tailored to your unique brand voice.",
    icon: Music,
    color: "emerald",
    features: ["Original scores", "Mixing & mastering", "Sound effects"]
  },
  {
    id: "other-services",
    title: "Custom Solutions",
    description: "Bespoke talent partnerships and specialized services tailored to your unique project requirements.",
    icon: MoreHorizontal,
    color: "cyan",
    features: ["Consultancy", "Pipeline building", "Dedicated squads"]
  }
];
