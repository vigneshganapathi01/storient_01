
import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer: React.FC = () => {
  return (
    <footer className="bg-muted pt-16 pb-8">
      <div className="max-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Logo and Description */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold text-gradient">Storient</span>
            </Link>
            <p className="text-muted-foreground">
              Premium templates for professionals. Elevate your projects with our expertly crafted designs.
            </p>
            <div className="flex space-x-4">
  <a href='https://www.linkedin.com/company/storient/posts/?feedView=all'>
    <Button variant="ghost" size="icon" className="rounded-full hover:bg-brand-purple/10">
      <Linkedin className="h-5 w-5 text-brand-purple" />
    </Button>
  </a>
  <a href="#">
    <Button variant="ghost" size="icon" className="rounded-full hover:bg-brand-purple/10">
      <Twitter className="h-5 w-5 text-brand-purple" />
    </Button>
  </a>
  <a href="#">
    <Button variant="ghost" size="icon" className="rounded-full hover:bg-brand-purple/10">
      <Instagram className="h-5 w-5 text-brand-purple" />
    </Button>
  </a>
</div>
          </div>

          {/* Column 2: Pages */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Pages</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/templates" className="text-muted-foreground hover:text-primary transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/package-details/workshops" className="text-muted-foreground hover:text-primary transition-colors">
                  Website Templates
                </Link>
              </li>
              <li>
                <Link to="/templates/presentation" className="text-muted-foreground hover:text-primary transition-colors">
                  Presentation Templates
                </Link>
              </li>
              <li>
                <Link to="/package-details/the-divergent-deck" className="text-muted-foreground hover:text-primary transition-colors">
                  Social Media Kits
                </Link>
              </li>
              <li>
                <Link to="/templates/marketing" className="text-muted-foreground hover:text-primary transition-colors">
                  Marketing Materials
                </Link>
              </li>
              <li>
                <Link to="/templates" className="text-muted-foreground hover:text-primary transition-colors">
                  UI Kits
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest updates and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="bg-brand-purple hover:bg-brand-indigo text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border text-center text-muted-foreground">
          <p>© 2025 storient. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
