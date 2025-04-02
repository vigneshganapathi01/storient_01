import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MapPin, Mail, Phone, Clock, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
const teamMembers = [{
  name: 'Sarah Johnson',
  role: 'CEO & Founder',
  bio: 'With 15+ years in design and tech, Sarah founded TemplatePro to make premium design accessible to everyone.',
  image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop'
}, {
  name: 'Michael Chen',
  role: 'Head of Design',
  bio: 'Award-winning designer who leads our creative team with a focus on innovative and user-friendly templates.',
  image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop'
}, {
  name: 'Jessica Williams',
  role: 'Lead Developer',
  bio: 'Full-stack developer with expertise in creating responsive, accessible, and high-performance web templates.',
  image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop'
}, {
  name: 'Daniel Martinez',
  role: 'Customer Success',
  bio: 'Passionate about helping clients make the most of our templates and ensuring exceptional user experiences.',
  image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop'
}];
const About = () => {
  return <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative bg-brand-purple text-white">
          <div className="max-container pt-40 pb-20 px-4 md:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About TemplatePro</h1>
            <p className="text-xl md:text-2xl max-w-3xl mb-8">
              We're a team of designers and developers passionate about creating high-quality templates 
              that help professionals elevate their projects.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-white text-brand-purple hover:bg-gray-100">
                Join Our Team
              </Button>
              <Button variant="outline" className="border-white text-brand-purple bg-white">
                Contact Us
              </Button>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent"></div>
        </div>
          
        <div className="max-container py-20 px-4 md:px-8">
          {/* Our Story Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-6">
                TemplatePro was founded in 2018 with a simple mission: to make beautiful, functional design accessible to everyone. 
                We believed that great design shouldn't be limited to those with extensive technical skills or large budgets.
              </p>
              <p className="text-muted-foreground mb-6">
                What started as a small collection of website templates has grown into a comprehensive library of digital assets 
                spanning websites, presentations, UI kits, and more. Along the way, we've helped thousands of professionals, 
                small businesses, and creative individuals bring their visions to life.
              </p>
              <p className="text-muted-foreground">
                Today, we're proud to serve a global community of users who rely on our templates to create impressive, 
                professional-looking projects quickly and affordably.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" alt="TemplatePro team collaborating" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-brand-purple text-white p-6 rounded-lg shadow-lg">
                <p className="text-3xl font-bold">5+ Years</p>
                <p>Creating Premium Templates</p>
              </div>
            </div>
          </div>
            
          {/* Our Mission Section */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
            <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto mb-12">
              Our mission is to empower professionals with beautiful, functional templates that save time and enhance their work.
            </p>
              
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-brand-purple" />
                </div>
                <h3 className="text-xl font-medium mb-2">Quality Design</h3>
                <p className="text-muted-foreground">
                  We believe in crafting templates with meticulous attention to detail, ensuring every pixel is perfect.
                </p>
              </div>
                
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-brand-purple" />
                </div>
                <h3 className="text-xl font-medium mb-2">Time Efficiency</h3>
                <p className="text-muted-foreground">
                  Our templates help you skip the time-consuming design process and focus on your content and business.
                </p>
              </div>
                
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-brand-purple" />
                </div>
                <h3 className="text-xl font-medium mb-2">Accessibility</h3>
                <p className="text-muted-foreground">
                  Making professional-grade design accessible to everyone, regardless of technical skill level.
                </p>
              </div>
            </div>
          </div>
            
          {/* Team Section */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Team</h2>
            <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-12">
              Meet the talented individuals behind TemplatePro who work tirelessly to create the best templates for our users.
            </p>
              
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => <div key={index} className="text-center">
                  <div className="relative mb-4 mx-auto w-40 h-40 rounded-full overflow-hidden">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-medium">{member.name}</h3>
                  <p className="text-brand-purple font-medium mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>)}
            </div>
          </div>
            
          {/* Contact Section */}
          <div className="bg-muted rounded-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
                <p className="text-muted-foreground mb-8">
                  Have questions about our templates or interested in joining our team? 
                  We'd love to hear from you. Reach out using the contact information below.
                </p>
                  
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-3 text-brand-purple mt-0.5" />
                    <div>
                      <p className="font-medium">Our Location</p>
                      <p className="text-muted-foreground">123 Design Avenue, San Francisco, CA 94107</p>
                    </div>
                  </div>
                    
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-3 text-brand-purple mt-0.5" />
                    <div>
                      <p className="font-medium">Email Us</p>
                      <p className="text-muted-foreground">hello@templatepro.com</p>
                    </div>
                  </div>
                    
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 mr-3 text-brand-purple mt-0.5" />
                    <div>
                      <p className="font-medium">Call Us</p>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                    
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 mr-3 text-brand-purple mt-0.5" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-muted-foreground">Monday - Friday: 9am - 6pm PST</p>
                    </div>
                  </div>
                </div>
              </div>
                
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-4">Send Us a Message</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <input type="text" className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input type="email" className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Subject</label>
                    <input type="text" className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Message</label>
                    <textarea rows={4} className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-purple"></textarea>
                  </div>
                  <Button className="w-full bg-brand-purple hover:bg-brand-indigo">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
};
export default About;