
import { Sparkles, Users, ShieldCheck, Zap, BarChart3, Rocket } from "lucide-react";

export const SERVICES = [
  {
    id: "talent-sourcing",
    title: "AI Talent Sourcing",
    description: "Our proprietary AI engine scans our global registry to identify top 1% student talent specifically matched to your project requirements.",
    icon: Sparkles,
    color: "blue",
    features: ["Skill-based matching", "Cultural fit analysis", "Availability tracking"]
  },
  {
    id: "team-assembly",
    title: "Core Team Assembly",
    description: "We don't just find individuals; we build squads. We assemble high-compatibility teams of developers and designers who work better together.",
    icon: Users,
    color: "purple",
    features: ["Role balancing", "Compatibility testing", "Immediate onboarding"]
  },
  {
    id: "technical-vetting",
    title: "Technical Vetting",
    description: "Every candidate undergoes rigorous technical screenings and portfolio audits by industry experts to ensure production-ready quality.",
    icon: ShieldCheck,
    color: "emerald",
    features: ["Code reviews", "Portfolio verification", "Live technical interviews"]
  },
  {
    id: "project-management",
    title: "Managed Delivery",
    description: "We provide end-to-end management for student teams, acting as a bridge between your goals and their execution for guaranteed results.",
    icon: Zap,
    color: "amber",
    features: ["Agile oversight", "Quality assurance", "Weekly progress reports"]
  },
  {
    id: "recruitment-strategy",
    title: "Recruitment Strategy",
    description: "Custom-built recruitment pipelines for high-growth startups looking to build a sustainable pipeline of junior and intern talent.",
    icon: BarChart3,
    color: "rose",
    features: ["Campus outreach", "Brand positioning", "Pipeline automation"]
  },
  {
    id: "rapid-acceleration",
    title: "Team Acceleration",
    description: "On-demand training and mentorship for your existing student teams to bridge the gap between academic skills and professional standards.",
    icon: Rocket,
    color: "cyan",
    features: ["Tech stack training", "Soft skills coaching", "Architecture review"]
  }
];
