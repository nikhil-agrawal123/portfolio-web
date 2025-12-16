import React, { useState } from "react";
import { Mail, Phone, Globe, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface Contact2Props {
  title?: string;
  description?: string;
  phone?: string;
  email?: string;
  web?: { label: string; url: string };
}

const contactUs = async (params: {firstname: string; lastname: string; email: string; subject: string; message: string}) => {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  if (!response.ok) {
    return { error: "Failed to send message" };
  }

  return await response.json();
};

export const Contact2 = ({
  title = "Get In Touch",
  description = "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
  phone = "+91 9876543210",
  email = "email@example.com",
  web = { label: "portfolio.dev", url: "https://portfolio.dev" },
}: Contact2Props) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    const response = await contactUs(formData);
    if (!response || response.error) {
      toast({
        title: "Error",
        description: "There was an issue sending your message. Please try again later.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }else{
      toast({
            title: "Message Sent!",
            description: "Thank you for reaching out. I'll get back to you soon.",
          });
          
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
      }
  };

  return (
    <section className="py-16 md:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          {/* Left side - Contact info */}
          <div className="mx-auto flex max-w-sm flex-col justify-between gap-8 lg:gap-10">
            <div className="text-center lg:text-left">
              <h2 className="mb-3 text-3xl md:text-5xl lg:text-6xl font-semibold text-foreground">
                {title}
              </h2>
              <p className="text-muted-foreground text-sm md:text-base">{description}</p>
            </div>
            
            <div className="mx-auto w-full lg:mx-0">
              <h3 className="mb-6 text-center text-xl md:text-2xl font-semibold text-foreground lg:text-left">
                Contact Details
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-foreground/80">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <span className="block text-xs text-muted-foreground">Phone</span>
                    <span className="text-sm font-medium">{phone}</span>
                  </div>
                </li>
                <li className="flex items-center gap-3 text-foreground/80">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <span className="block text-xs text-muted-foreground">Email</span>
                    <a href={`mailto:${email}`} className="text-sm font-medium hover:text-primary transition-colors">
                      {email}
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-3 text-foreground/80">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <span className="block text-xs text-muted-foreground">Web</span>
                    <a href={web.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-primary transition-colors">
                      {web.label}
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right side - Contact form */}
          <form 
            onSubmit={handleSubmit}
            className="mx-auto flex w-full max-w-screen-md flex-col gap-4 md:gap-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 md:p-10"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="firstname" className="text-foreground">First Name</Label>
                <Input 
                  type="text" 
                  id="firstname" 
                  placeholder="John" 
                  value={formData.firstname}
                  onChange={handleChange}
                  className="bg-background/50 border-border/50 focus:border-primary"
                  required
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="lastname" className="text-foreground">Last Name</Label>
                <Input 
                  type="text" 
                  id="lastname" 
                  placeholder="Doe" 
                  value={formData.lastname}
                  onChange={handleChange}
                  className="bg-background/50 border-border/50 focus:border-primary"
                  required
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input 
                type="email" 
                id="email" 
                placeholder="john@example.com" 
                value={formData.email}
                onChange={handleChange}
                className="bg-background/50 border-border/50 focus:border-primary"
                required
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="subject" className="text-foreground">Subject</Label>
              <Input 
                type="text" 
                id="subject" 
                placeholder="Project Discussion" 
                value={formData.subject}
                onChange={handleChange}
                className="bg-background/50 border-border/50 focus:border-primary"
                required
              />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message" className="text-foreground">Message</Label>
              <Textarea 
                placeholder="Tell me about your project..." 
                id="message" 
                value={formData.message}
                onChange={handleChange}
                className="bg-background/50 border-border/50 focus:border-primary min-h-[120px]"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full gap-2 h-12" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="wheel-and-hamster" aria-label="Loading" role="img">
                    <div className="hamster">
                      <div className="hamster__body">
                        <div className="hamster__head">
                          <div className="hamster__ear"></div>
                          <div className="hamster__eye"></div>
                          <div className="hamster__nose"></div>
                        </div>
                        <div className="hamster__limb hamster__limb--fr"></div>
                        <div className="hamster__limb hamster__limb--fl"></div>
                        <div className="hamster__limb hamster__limb--br"></div>
                        <div className="hamster__limb hamster__limb--bl"></div>
                        <div className="hamster__tail"></div>
                      </div>
                    </div>
                  </div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  Send Message
                  <Send className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
