
import Link from "next/link";
import { Twitter, Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-card border-t py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
              C9
            </div>
            <span className="font-headline text-lg font-bold">Code-9 Portal</span>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            The bridge between talented students and world-class opportunities. Build, collaborate, and get hired.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Github size={20} /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={20} /></Link>
          </div>
        </div>

        <div>
          <h4 className="font-headline font-bold mb-4">Opportunities</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-primary transition-colors">Engineering</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Design</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Content & Marketing</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">AI & Research</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline font-bold mb-4">Resources</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-primary transition-colors">Student Guide</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Community Forum</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Partner Programs</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Success Stories</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Code-9 Hiring Portal. All rights reserved.
      </div>
    </footer>
  );
}
