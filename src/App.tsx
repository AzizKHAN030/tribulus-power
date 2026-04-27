/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Zap, 
  Shield, 
  Flame, 
  Heart, 
  Trophy, 
  Activity, 
  Droplet, 
  Star, 
  CheckCircle2, 
  ChevronRight, 
  Menu, 
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  FlaskConical,
  Award,
  Users,
  Target,
  Dumbbell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// --- Assets ---
const PRODUCT_BOTTLE = "/product.png"; 
const HERO_BG = "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2120&auto=format&fit=crop";
const ATHLETE_VISUAL = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop";

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const navItems = [
    { name: "Benefits", id: "benefits" },
    { name: "Composition", id: "composition" },
    { name: "How It Works", id: "how-it-works" },
    { name: "About", id: "about" },
    { name: "Quality", id: "quality" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    navItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-brand-dark/80 backdrop-blur-md py-3 border-b border-white/10" : "bg-transparent py-5"}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="relative w-12 h-12">
            <img src="/logo.png" className="w-full h-full object-cover relative z-10" alt="Logo" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-brand-lime/20 blur-xl rounded-full group-hover:bg-brand-lime/40 transition-all opacity-0 group-hover:opacity-100" />
          </div>
          <div className="flex flex-col leading-none italic font-black uppercase">
            <div className="flex items-center gap-0.5 text-2xl tracking-tighter text-white">
              <span>TR</span>
              <div className="relative flex items-center justify-center -mx-0.5">
                <Zap className="w-6 h-6 text-brand-lime fill-brand-lime transform -translate-y-0.5" />
                <div className="absolute inset-0 bg-brand-lime blur-[6px] opacity-40 group-hover:opacity-60 transition-opacity" />
              </div>
              <span className="-ml-0.5">BULUS</span>
            </div>
            <div className="text-brand-lime text-[10px] sm:text-xs tracking-[0.4em] -mt-1 font-bold">POWER</div>
          </div>
        </div>
        
        <div className="hidden xl:flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`}
              className={`text-[10px] lg:text-xs font-black uppercase transition-all duration-300 whitespace-nowrap tracking-widest italic
                ${activeSection === item.id 
                  ? "text-brand-lime drop-shadow-[0_0_8px_rgba(173,255,47,0.8)] scale-110" 
                  : "text-white/40 hover:text-white"
                }`}
            >
              {item.name}
            </a>
          ))}
          <Button size="sm" className="bg-brand-lime text-black font-black uppercase tracking-wide hover:scale-105 transition-transform italic ml-4 text-xs px-6">
            Order Now
          </Button>
        </div>

        <button className="xl:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-dark/95 backdrop-blur-xl border-b border-white/10 p-8 flex flex-col gap-6 xl:hidden max-h-[80vh] overflow-y-auto"
          >
            {navItems.map((item) => (
              <a 
                key={item.id} 
                href={`#${item.id}`} 
                className={`text-xl font-black italic uppercase tracking-widest transition-all
                  ${activeSection === item.id ? "text-brand-lime pl-4 border-l-4 border-brand-lime drop-shadow-[0_0_10px_rgba(173,255,47,0.5)]" : "text-white/40"}
                `} 
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <Button className="w-full bg-brand-lime text-black font-black uppercase italic py-6 text-lg tracking-[0.2em]">Order Now</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      bg: '/anastase-maragos-9dzWZQWZMdE-unsplash.jpg',
      product: '/prod3.png',
      accent: "Natural Strength & Energy!"
    },
    {
      bg: "/karsten-winegeart-0Wra5YYVQJE-unsplash.jpg",
      product: '/product-box.png',
      accent: "Boost Your Vitality!"
    },
    {
      bg: "/gorilla-freak-wt5jg8_WrJg-unsplash.jpg",
      product: PRODUCT_BOTTLE,
      accent: "Peak Performance!"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden flex items-center snap-start">
      <AnimatePresence>
        <motion.div 
          key={`bg-${currentSlide}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/40 to-transparent z-10" />
          <img 
            src={slides[currentSlide].bg} 
            className="w-full h-full object-cover opacity-70" 
            alt={`Slide background ${currentSlide}`} 
            referrerPolicy="no-referrer" 
          />
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-6 relative z-20 pt-10 lg:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-8 lg:gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`accent-${currentSlide}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Badge className="bg-brand-lime/10 text-brand-lime border-brand-lime/20 mb-6 py-1 px-4 text-sm font-bold uppercase tracking-wider">
                  {slides[currentSlide].accent}
                </Badge>
              </motion.div>
            </AnimatePresence>
            
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-white leading-tight mb-4 md:mb-6 italic">
              TRIBULUS <br />
              <span className="text-brand-lime drop-shadow-[0_0_15px_rgba(173,255,47,0.5)]">POWER</span>
            </h1>
            <p className="text-base md:text-lg text-white/70 max-w-xl mb-8 md:mb-10 leading-relaxed italic">
              Advanced dietary supplement designed to support men's health, boost physical performance, endurance, and overall body vitality. Experience the power of natural ingredients working together for maximum results.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 md:gap-6 mb-6 md:mb-10 text-center">
              <div className="bg-white/5 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/10 flex sm:flex-col items-center sm:justify-center justify-between px-6 sm:px-4">
                <div className="text-brand-lime font-bold text-base sm:text-lg md:text-xl italic">90 Bottles</div>
                <div className="text-[10px] text-white/50 uppercase">Per Box</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/10 flex sm:flex-col items-center sm:justify-center justify-between px-6 sm:px-4">
                <div className="text-brand-lime font-bold text-base sm:text-lg md:text-xl italic">10 ml</div>
                <div className="text-[10px] text-white/50 uppercase">Each Bottle</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-white/10 flex sm:flex-col items-center sm:justify-center justify-between px-6 sm:px-4">
                <div className="text-brand-lime font-bold text-base sm:text-lg md:text-xl italic">Green Lemon</div>
                <div className="text-[10px] text-white/50 uppercase">Flavor</div>
              </div>
            </div>

            <Button size="lg" className="bg-brand-lime text-black font-extrabold text-lg px-12 py-8 rounded-full hover:scale-105 transition-transform shadow-[0_0_30px_rgba(173,255,47,0.3)] uppercase italic">
              ORDER NOW
            </Button>
            
            <div className="flex gap-2 mt-12">
              {slides.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${currentSlide === i ? "w-12 bg-brand-lime" : "w-4 bg-white/20"}`}
                />
              ))}
            </div>
          </motion.div>

          <div className="relative flex items-center justify-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20" />
            <AnimatePresence>
              <motion.div 
                key={`product-${currentSlide}`}
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.1, rotate: 5, position: "absolute" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-20 w-full flex justify-center"
              >
                <div className="w-full h-[200px] sm:h-[300px] lg:h-[500px] flex items-center justify-center">
                  <img 
                    src={slides[currentSlide].product} 
                    className="max-w-[70%] lg:max-w-full max-h-full object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] rounded-3xl" 
                    alt="Tribulus Power Product" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 animate-bounce cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </div>
    </section>
  );
};

const BenefitCard = ({ icon: Icon, title, desc, index, onHover, onReset }: { 
  icon: any, 
  title: string, 
  desc: string, 
  index: number, 
  onHover: () => void, 
  onReset: () => void,
  key?: any 
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    onMouseEnter={onHover}
    onMouseLeave={onReset}
  >
    <Card className="bg-brand-dark/40 backdrop-blur-md border-white/10 hover:border-brand-lime/50 transition-all duration-500 group overflow-hidden h-full cursor-pointer hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <CardContent className="p-8 relative z-10">
        <div className="w-12 h-12 rounded-lg bg-brand-lime/10 flex items-center justify-center mb-6 group-hover:bg-brand-lime group-hover:text-black transition-all duration-300">
          <Icon className="w-6 h-6 text-brand-lime group-hover:text-black" />
        </div>
        <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-brand-lime transition-colors duration-300">{title}</h3>
        <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">{desc}</p>
      </CardContent>
      {/* Subtle indicator */}
      <div className="absolute bottom-0 left-0 h-1 bg-brand-lime w-0 group-hover:w-full transition-all duration-500" />
    </Card>
  </motion.div>
);

const Benefits = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const benefitsData = [
    { 
      icon: Zap, 
      title: "Male Power", 
      desc: "Supports natural testosterone levels and enhances male vitality for peak performance.",
      bg: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"
    },
    { 
      icon: Flame, 
      title: "Energy Boost", 
      desc: "Increases energy levels and reduces fatigue for all-day performance and productivity.",
      bg: "https://images.unsplash.com/photo-1547919307-1ecb10702e6f?q=80&w=1376&auto=format&fit=crop"
    },
    { 
      icon: Activity, 
      title: "Blood Flow", 
      desc: "Improves circulation and cardiovascular health for better nutrient delivery.",
      bg: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?q=80&w=1470&auto=format&fit=crop"
    },
    { 
      icon: Shield, 
      title: "Immune Support", 
      desc: "Strengthens immune system with powerful antioxidants and vitamin C.",
      bg: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=1335&auto=format&fit=crop" 
    },
    { 
      icon: Droplet, 
      title: "Libido Enhancement", 
      desc: "Naturally improves sexual health and desire for better intimate experiences.",
      bg: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1374&auto=format&fit=crop"
    },
    { 
      icon: Target, 
      title: "Endurance", 
      desc: "Enhances physical stamina and endurance for longer, more intense workouts.",
      bg: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1470&auto=format&fit=crop"
    },
    { 
      icon: FlaskConical, 
      title: "Fat Burning", 
      desc: "Accelerates metabolism and supports fat burning for lean muscle definition.",
      bg: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop"
    },
    { 
      icon: Trophy, 
      title: "Fast Recovery", 
      desc: "Speeds up muscle recovery after intense training sessions.",
      bg: "/recovery.png"
    },
  ];

  const defaultBg = "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop";

  return (
    <section id="benefits" className="py-32 bg-brand-dark relative overflow-hidden snap-start">
      {/* Dynamic Background Layer */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.div
            key={hoveredIndex !== null ? benefitsData[hoveredIndex].bg : 'default'}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.3, scale: 1 }}
            exit={{ opacity: 0, position: "absolute" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img 
              src={hoveredIndex !== null ? benefitsData[hoveredIndex].bg : defaultBg} 
              alt="Section Dynamic Background" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-brand-lime/10 text-brand-lime border-brand-lime/20 mb-6 py-1 px-4 text-sm font-bold uppercase tracking-[0.3em] italic">Potent Effects</Badge>
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 uppercase italic leading-none">
            POWERFUL <span className="text-brand-lime drop-shadow-[0_0_15px_rgba(173,255,47,0.4)]">BENEFITS</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto italic text-lg border-t border-brand-lime/20 pt-6">
            Experience comprehensive support for your active lifestyle through our unique, bioavailable formula.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefitsData.map((benefit, i) => (
            <BenefitCard 
              key={i} 
              icon={benefit.icon} 
              title={benefit.title} 
              desc={benefit.desc} 
              index={i}
              onHover={() => setHoveredIndex(i)}
              onReset={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const PremiumComposition = () => {
  const [activeTab, setActiveTab] = useState(0);

  const ingredients = [
    { 
      name: "Tribulus Terrestris Extract", 
      mg: "10 ml", 
      desc: "Natural plant extract that supports testosterone production and athletic performance",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2120&auto=format&fit=crop" 
    },
    { 
      name: "Protodioscin", 
      mg: "170 mg", 
      desc: "Active compound that stimulates hormone production and enhances sexual function",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1470&auto=format&fit=crop"
    },
    { 
      name: "L-Arginine", 
      mg: "1000 mg", 
      desc: "Amino acid that expands blood vessels and improves blood flow throughout the body",
      image: "/LArginine.png"
    },
    { 
      name: "L-Carnitine", 
      mg: "400 mg", 
      desc: "Essential for energy metabolism, fat burning, and muscle recovery",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop"
    },
    { 
      name: "Vitamin C", 
      mg: "500 mg", 
      desc: "Powerful antioxidant that strengthens immunity and reduces inflammation",
      image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=1335&auto=format&fit=crop"
    },
  ];

  return (
    <section id="composition" className="py-32 bg-brand-gray/50 border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-grid-white/5 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <Badge className="bg-brand-lime text-black font-black uppercase mb-6 md:mb-10 px-4 py-2 md:px-8 md:py-3 text-sm md:text-lg italic shadow-[0_0_20px_rgba(173,255,47,0.4)]">Ingredient Breakdown</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-8 uppercase leading-tight italic">
              PREMIUM <span className="text-brand-lime">COMPOSITION</span>
            </h2>
            <p className="text-white/60 mb-12 italic text-lg uppercase tracking-widest border-l-4 border-brand-lime pl-4">
              Scientific dosage for maximum potency
            </p>
            
            <div className="space-y-4">
              {ingredients.map((ingredient, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setActiveTab(i)}
                  className={`cursor-pointer group rounded-2xl p-6 transition-all border-2 ${activeTab === i ? 'bg-brand-lime/10 border-brand-lime' : 'bg-white/5 border-transparent hover:border-white/10'}`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className={`text-xl font-bold transition-all ${activeTab === i ? 'text-brand-lime' : 'text-white'}`}>
                      {ingredient.name}
                    </h4>
                    <span className="text-brand-lime font-mono text-2xl font-black">{ingredient.mg}</span>
                  </div>
                  <AnimatePresence mode="wait">
                    {activeTab === i && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-white/60 italic mb-4">
                          {ingredient.desc}
                        </p>
                        {/* Mobile-only Image */}
                        <div className="lg:hidden aspect-video rounded-xl overflow-hidden border-2 border-brand-lime/30 mb-2">
                          <img 
                            src={ingredient.image} 
                            className="w-full h-full object-cover" 
                            alt={ingredient.name} 
                            referrerPolicy="no-referrer" 
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative group hidden lg:block">
            <AnimatePresence>
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(10px)", scale: 1.1, position: "absolute" }}
                transition={{ duration: 0.5 }}
                className="relative aspect-square rounded-[3rem] overflow-hidden border-4 border-white/10 shadow-[0_0_100px_rgba(173,255,47,0.1)] w-full"
              >
                <img 
                  src={ingredients[activeTab].image} 
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" 
                  alt={ingredients[activeTab].name} 
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="text-brand-lime text-xs font-black uppercase tracking-[0.3em] mb-2">Focus Ingredient</div>
                  <div className="text-white text-3xl font-black italic uppercase">{ingredients[activeTab].name}</div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Floating decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-lime/20 blur-[80px] rounded-full animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-lime/10 blur-[80px] rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { icon: Zap, title: "Hormonal Balance", num: "1", desc: "Tribulus terrestris and protodioscin support natural testosterone production" },
    { icon: Activity, title: "Blood Circulation", num: "2", desc: "L-arginine dilates blood vessels and improves nutrient delivery" },
    { icon: Flame, title: "Energy Production", num: "3", desc: "L-carnitine boosts stamina and accelerates fat metabolism" },
    { icon: Shield, title: "Immune Protection", num: "4", desc: "Vitamin C strengthens immunity and reduces inflammation" },
    { icon: CheckCircle2, title: "Complete Results", num: "5", desc: "All components create synergistic effects for peak performance" },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-brand-dark">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 italic">
          <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase">
            HOW IT <span className="text-brand-lime">WORKS</span>
          </h2>
          <p className="text-white/50 uppercase tracking-widest text-sm">The science behind maximum performance</p>
        </div>

        <div className="relative mb-20">
          {/* Progress Line Background */}
          <div className="absolute top-6 left-0 right-0 h-px bg-white/10 hidden md:block" />
          
          {/* Animated Progress Line with extra glow */}
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 2, ease: "linear" }}
            className="absolute top-6 left-0 h-px bg-brand-lime shadow-[0_0_20px_rgba(173,255,47,0.8)] hidden md:block z-0"
          />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-16 md:gap-8 relative text-center">
            {steps.map((step, i) => (
              <div 
                key={i} 
                className={`relative z-10 flex flex-col items-center 
                  ${i % 2 === 0 ? "max-[764px]:col-start-1" : "max-[764px]:col-start-2"}
                  ${i === 0 ? "max-[764px]:row-start-1" : 
                    i === 1 ? "max-[764px]:row-start-2" : 
                    i === 2 ? "max-[764px]:row-start-3" : 
                    i === 3 ? "max-[764px]:row-start-4" : 
                    "max-[764px]:row-start-5"}
                `}
              >
                {/* Mobile Connecting Line (Snake Style) */}
                {i < steps.length - 1 && (
                  <motion.div 
                    initial={{ opacity: 0.1, borderColor: "rgba(173,255,47,0.1)" }}
                    whileInView={{ 
                      opacity: 1, 
                      borderColor: "rgba(173,255,47,0.4)"
                    }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.4, duration: 0.5 }}
                    className={`absolute top-6 h-[calc(100%+4rem)] w-full hidden max-[764px]:block -z-10
                      ${i % 2 === 0 
                        ? "left-1/2 border-t-2 border-r-2 rounded-tr-[3rem]" 
                        : "right-1/2 border-t-2 border-l-2 rounded-tl-[3rem]"
                      }
                    `} 
                  />
                )}

                <motion.div 
                  initial={{ backgroundColor: "rgba(255, 255, 255, 0.05)", scale: 0.8 }}
                  whileInView={{ backgroundColor: "#ADFF2F", scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: i * 0.4, duration: 0.3 }}
                  className="w-12 h-12 text-black font-black rounded-full flex items-center justify-center mb-6 text-xl shadow-[0_0_20px_rgba(173,255,47,0.5)] border-2 border-brand-lime/0"
                >
                  <motion.span
                    initial={{ opacity: 0.5 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: i * 0.4 }}
                  >
                    {step.num}
                  </motion.span>
                </motion.div>
                <motion.h4 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.4 + 0.2 }}
                  className="text-white font-bold mb-3 italic"
                >
                  {step.title}
                </motion.h4>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.4 + 0.3 }}
                  className="text-white/40 text-xs leading-relaxed max-w-[150px]"
                >
                  {step.desc}
                </motion.p>
              </div>
            ))}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden relative"
        >
          <div className="absolute top-0 bottom-0 right-0 w-2/3 bg-brand-lime/5 blur-[100px] -z-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-brand-lime mb-8 uppercase tracking-wider italic">Recommended Usage</h3>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-1 rounded bg-brand-lime h-12" />
                  <div>
                    <div className="text-white font-bold uppercase text-sm mb-1">Dosage:</div>
                    <div className="text-white/60">1-2 bottles per day after meals</div>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-1 rounded bg-brand-lime h-12" />
                  <div>
                    <div className="text-white font-bold uppercase text-sm mb-1">Course Duration:</div>
                    <div className="text-white/60">1-3 months for optimal results</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Zap className="w-16 h-16 text-brand-lime mb-4 opacity-50" />
              <p className="text-center text-white/40 italic">Consult a healthcare professional before starting any new supplement regimen.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const AudienceSection = () => (
  <section id="who-is-it-for" className="py-24 bg-brand-gray/30">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase italic italic">
          WHO IS IT <span className="text-brand-lime">FOR?</span>
        </h2>
        <p className="text-white/50 uppercase tracking-wider">Designed for active men who demand peak performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { emoji: "💪", label: "Bodybuilders", desc: "Maximize muscle growth, strength gains, and recovery between intense training sessions", bg: "https://images.unsplash.com/photo-1583454110551-21f2fa2ec617?q=80&w=1470&auto=format&fit=crop" },
          { emoji: "⚡", label: "Athletes", desc: "Enhance endurance, performance, and competitive edge in any sport or physical activity", bg: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1470&auto=format&fit=crop" },
          { emoji: "🏋️", label: "Fitness Enthusiasts", desc: "Support your fitness journey with increased energy, stamina, and faster results", bg: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop" },
          { emoji: "🕺", label: "Active Men 18+", desc: "Maintain vitality, energy, and male health in your daily life and work", bg: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1470&auto=format&fit=crop" },
        ].map((item, i) => (
          <Card key={i} className="bg-brand-dark border-white/10 overflow-hidden text-center hover:bg-brand-gray transition-all relative group h-full cursor-pointer">
            <div 
              className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-cover bg-center"
              style={{ backgroundImage: `url(${item.bg})` }}
            />
            {/* Overlay for readability */}
            <div className="absolute inset-0 z-10 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <CardContent className="p-8 relative z-20 h-full flex flex-col justify-center items-center">
              <div className="text-5xl mb-6 group-hover:opacity-0 transition-opacity duration-300 transform group-hover:scale-110">
                {item.emoji}
              </div>
              <h4 className="text-xl font-bold text-white mb-3 italic uppercase tracking-tight group-hover:text-brand-lime transition-colors">
                {item.label}
              </h4>
              <p className="text-white/50 text-sm group-hover:text-white transition-colors">
                {item.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const Reviews = () => (
    <section className="py-24 bg-brand-dark italic">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black uppercase mb-4 italic">
            CLIENT <span className="text-brand-lime">REVIEWS</span>
          </h2>
          <p className="text-white/50">Real results from real people</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Michael R.", role: "Bodybuilder", text: "Amazing product! My energy levels have skyrocketed and my gym performance has improved significantly. Highly recommend for anyone serious about fitness." },
            { name: "James T.", role: "Professional Athlete", text: "I've tried many supplements but this one actually delivers. Better endurance, faster recovery, and the green lemon taste is great!" },
            { name: "David K.", role: "Fitness Coach", text: "Perfect for my training routine. I feel stronger, more energized, and my overall vitality has improved dramatically after just one month." },
          ].map((review, i) => (
            <Card key={i} className="bg-white/5 border-white/10 p-8 italic">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-yellow-500 text-yellow-500" />)}
              </div>
              <p className="text-white text-sm mb-6 leading-relaxed">"{review.text}"</p>
              <div className="flex flex-col">
                <span className="text-brand-lime font-bold">{review.name}</span>
                <span className="text-white/40 text-xs uppercase tracking-wider">{review.role}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );

const OrderSection = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <section className="py-24 bg-brand-gray/20 relative" id="order-now">
      <div className="container mx-auto px-6">
        <div className="bg-brand-dark rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 md:p-20 flex flex-col justify-center">
              <h2 className="text-5xl font-black text-white italic uppercase italic mb-8">
                ORDER <span className="text-brand-lime underline decoration-brand-lime underline-offset-8 decoration-4">NOW</span>
              </h2>
              <p className="text-white/60 mb-12 text-lg italic">Get your Tribulus Power today and transform your performance</p>
              
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 bg-brand-lime/10 border border-brand-lime rounded-2xl text-center"
                  >
                    <CheckCircle2 className="w-16 h-16 text-brand-lime mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Order Request Sent!</h3>
                    <p className="text-white/60">Our manager will contact you shortly to confirm the order.</p>
                    <Button variant="ghost" className="mt-4 text-brand-lime underline hover:bg-transparent" onClick={() => setSuccess(false)}>Send another request</Button>
                  </motion.div>
                ) : (
                  <motion.form 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <Label className="text-white/70 uppercase text-xs tracking-widest italic">Your Name *</Label>
                      <Input required className="bg-white/5 border-white/10 h-14 italic" placeholder="Enter your full name" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white/70 uppercase text-xs tracking-widest italic">Phone Number *</Label>
                      <Input required type="tel" className="bg-white/5 border-white/10 h-14 italic" placeholder="+1 (000) 000-0000" />
                    </div>
                    <Button disabled={loading} size="lg" className="w-full bg-brand-lime text-black font-black text-lg py-8 uppercase italic tracking-widest shadow-[0_0_20px_rgba(173,255,47,0.3)]">
                      {loading ? "Processing..." : "Submit Order Request"}
                    </Button>
                    <p className="text-[10px] text-white/30 text-center uppercase tracking-wider italic">
                      By submitting this form, you agree to be contacted regarding your order
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>

              <div className="mt-12 pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-center gap-4">
                  <Phone className="text-brand-lime w-5 h-5" />
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-widest">Call Us</p>
                    <p className="text-white font-bold">+1 (800) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="text-brand-lime w-5 h-5" />
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-widest">Email Us</p>
                    <p className="text-white font-bold">info@tribuluspower.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black relative overflow-hidden flex items-center justify-center p-12">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand-lime/20 blur-[120px] rounded-full pointer-events-none" />
               <img src='/product-box.png' className="w-full max-w-sm relative z-10 drop-shadow-[0_45px_45px_rgba(0,0,0,0.6)] rounded-3xl scale-130" alt="" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-20 bg-brand-dark border-t border-white/5">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div>
          <div className="flex items-center gap-3 mb-6 group cursor-pointer">
            <div className="relative w-12 h-12">
              <img src="/input_file_0.png" className="w-full h-full object-contain relative z-10" alt="Logo" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-brand-lime/20 blur-xl rounded-full opacity-50" />
            </div>
            <div className="flex flex-col leading-none italic font-black uppercase">
              <div className="flex items-center gap-0.5 text-2xl tracking-tighter text-white">
                <span>TR</span>
                <div className="relative flex items-center justify-center -mx-0.5">
                  <Zap className="w-6 h-6 text-brand-lime fill-brand-lime transform -translate-y-0.5" />
                  <div className="absolute inset-0 bg-brand-lime blur-[6px] opacity-40" />
                </div>
                <span className="-ml-0.5">BULUS</span>
              </div>
              <div className="text-brand-lime text-[10px] sm:text-xs tracking-[0.4em] -mt-1 font-bold">POWER</div>
            </div>
          </div>
          <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-8">
            Premium dietary supplement for peak male performance. Natural ingredients, professional results.
          </p>
          <div className="flex gap-4">
            {["Facebook", "Instagram", "YouTube"].map(sm => (
              <a key={sm} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-brand-lime hover:border-brand-lime transition-all">
                <Activity className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs italic">Quick Links</h4>
          <ul className="space-y-4">
            {["Benefits", "Composition", "How It Works", "Order Now"].map(link => (
              <li key={link}><a href="#" className="text-white/50 text-sm hover:text-brand-lime transition-colors">{link}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs italic">Information</h4>
          <ul className="space-y-4">
            {["Quality Guarantee", "Certificates", "Usage Instructions", "Privacy Policy"].map(link => (
              <li key={link}><a href="#" className="text-white/50 text-sm hover:text-brand-lime transition-colors">{link}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs italic">Contact</h4>
          <ul className="space-y-4">
            <li className="flex gap-3 items-center text-white/50 text-sm"><Phone className="w-4 h-4 text-brand-lime" /> +1 (800) 123-4567</li>
            <li className="flex gap-3 items-center text-white/50 text-sm"><Mail className="w-4 h-4 text-brand-lime" /> info@tribuluspower.com</li>
            <li className="flex gap-3 items-center text-white/50 text-sm"><MapPin className="w-4 h-4 text-brand-lime" /> Available worldwide</li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-white/5 text-center text-[10px] text-white/30 uppercase tracking-[0.2em] italic">
        © 2026 Tribulus Power. All rights reserved. This is a dietary supplement and is not intended to diagnose, treat, cure, or prevent any disease.
      </div>
    </div>
  </footer>
);

const AboutProduct = () => {
  const stats = [
    { label: "STRENGTH & ENDURANCE", val: "BOOST", icon: Flame },
    { label: "SEXUAL PERFORMANCE", val: "ENHANCEMENT", icon: Droplet },
    { label: "HEALTHY TESTOSTERONE", val: "LEVELS", icon: Zap },
    { label: "BODY PROTECTION", val: "SYSTEM", icon: Shield },
  ];

  const patternIcons = [Flame, Droplet, Zap, Shield, Trophy, Target, Activity, Dumbbell];
  
  // Generating a deterministic random pattern for the background
  const bgIcons = Array.from({ length: 20 }).map((_, i) => {
    const Icon = patternIcons[i % patternIcons.length];
    const top = (i * 27) % 100;
    const left = (i * 37) % 100;
    const size = 40 + ((i * 19) % 120);
    const opacity = 0.01 + ((i * 13) % 4) / 100;
    const rotate = (i * 45) % 360;
    
    return (
      <div 
        key={i}
        className="absolute pointer-events-none text-brand-lime"
        style={{
          top: `${top}%`,
          left: `${left}%`,
          opacity: opacity,
          transform: `rotate(${rotate}deg)`,
        }}
      >
        <Icon size={size} strokeWidth={0.5} />
      </div>
    );
  });

  return (
    <section id="about" className="py-32 bg-gradient-to-b from-zinc-900 to-brand-dark relative overflow-hidden">
      {/* Background Icon Pattern */}
      <div className="absolute inset-0 z-0">
        {bgIcons}
      </div>

      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(173,255,47,0.05),transparent)] pointer-events-none z-0" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <Badge className="bg-brand-lime text-black font-black uppercase mb-6 md:mb-10 px-4 py-2 md:px-8 md:py-3 text-sm md:text-lg italic shadow-[0_0_20px_rgba(173,255,47,0.4)]">About the Product</Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 uppercase italic leading-tight">
              TRIBULUS <span className="text-brand-lime">POWER</span> — YOUR <br className="hidden sm:block" />
              ULTIMATE STRENGTH PARTNER!
            </h2>
            <p className="text-white/60 mb-10 leading-relaxed italic max-w-xl">
              A specialized supplement designed for men seeking maximum strength, natural energy boost, and overall body vitality. This premium complex combines natural ingredients to support testosterone levels, enhance endurance, and improve overall performance.
            </p>
            
            <div className="space-y-6">
              <h3 className="text-brand-lime font-black uppercase tracking-widest text-sm mb-6 border-b border-brand-lime/20 pb-2 inline-block italic">Key Benefits:</h3>
              {[
                { icon: Trophy, title: "For Athletic Performance", desc: "Enhances strength, stamina, and workout performance" },
                { icon: Zap, title: "Testosterone Regulation & Enhancement", desc: "Supports natural hormone balance and male vitality" },
                { icon: Activity, title: "Male Strength Enhancement", desc: "Improves libido and sexual health naturally" },
                { icon: Shield, title: "Immune System Strengthening", desc: "Boosts immunity with powerful antioxidants" },
                { icon: Target, title: "Prostate Health Support", desc: "Promotes healthy prostate function" },
              ].map((benefit, i) => (
                <div key={i} className="flex gap-4 group cursor-default">
                  <div className="w-10 h-10 rounded-full bg-brand-lime/10 flex-shrink-0 flex items-center justify-center text-brand-lime group-hover:bg-brand-lime group-hover:text-black transition-all">
                    <benefit.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold italic group-hover:text-brand-lime transition-colors">{benefit.title}</h4>
                    <p className="text-white/40 text-xs">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative">
            <div className="absolute inset-0 bg-brand-lime/5 blur-[100px] rounded-full animate-pulse" />
            
            <img 
              src={ATHLETE_VISUAL} 
              className="w-full rounded-[3rem] border-4 border-white/5 relative z-10 shadow-2xl filter grayscale contrast-125 brightness-75 hover:grayscale-0 transition-all duration-700" 
              alt="Performance" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-6 -right-4 md:bottom-10 md:right-10 bg-brand-dark/90 backdrop-blur-xl border border-brand-lime/30 p-4 md:p-8 rounded-2xl md:rounded-3xl z-20 shadow-2xl scale-90 md:scale-100">
              <div className="grid grid-cols-2 gap-4 md:gap-8">
                {stats.map((m, i) => (
                  <div key={i} className="text-center group cursor-pointer">
                    <div className="w-8 h-8 md:w-12 md:h-12 bg-brand-lime/10 rounded-full flex items-center justify-center text-brand-lime mx-auto mb-2 md:mb-3 group-hover:bg-brand-lime group-hover:text-black transition-all">
                      <m.icon className="w-4 h-4 md:w-6 md:h-6" />
                    </div>
                    <div className="text-[7px] md:text-[8px] text-white/30 font-black uppercase tracking-widest leading-tight mb-1">{m.label}</div>
                    <div className="text-brand-lime font-black text-[10px] md:text-xs italic tracking-tighter">{m.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


const QualityGuaranteed = () => (
  <section id="quality" className="py-24 bg-brand-dark relative">
    <div className="container mx-auto px-6">
      <div className="text-center mb-16 italic">
        <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase">
          QUALITY <span className="text-brand-lime">GUARANTEED</span>
        </h2>
        <p className="text-white/50 uppercase tracking-widest text-xs">Certified and tested for your safety</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { icon: Trophy, label: "Quality Certified", sub: "GMP certified production facility" },
          { icon: FlaskConical, label: "Lab Tested", sub: "Third-party laboratory verified" },
          { icon: CheckCircle2, label: "100% Natural", sub: "Premium natural ingredients" },
        ].map((item, i) => (
          <div key={i} className="bg-white/5 rounded-3xl p-8 border border-white/10 flex flex-col items-center text-center group hover:bg-brand-lime/5 transition-all">
            <div className="w-16 h-16 bg-brand-lime/10 rounded-2xl flex items-center justify-center mb-6 text-brand-lime group-hover:scale-110 transition-transform">
              <item.icon className="w-8 h-8" />
            </div>
            <h4 className="text-white font-bold mb-2 italic text-lg">{item.label}</h4>
            <p className="text-white/40 text-sm leading-relaxed">{item.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-brand-gray/30 border border-brand-lime/10 rounded-3xl p-8 md:p-12">
        <h4 className="text-brand-lime font-black uppercase text-center mb-10 tracking-[0.2em] italic">Important Information</h4>
        <div className="space-y-6 max-w-4xl mx-auto">
          {[
            { label: "Storage", val: "Store at temperature up to 25°C (77°F)" },
            { label: "Shelf Life", val: "2 years from manufacturing date" },
            { label: "Warning", val: "Not recommended for individuals under 18 years old or with individual intolerance to components" },
            { label: "Note", val: "This is a dietary supplement, not a medicine. Consult with healthcare professional before use." },
          ].map((info, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-2 md:gap-4 border-b border-white/5 pb-4">
              <span className="text-brand-lime font-bold uppercase text-[10px] tracking-widest min-w-[120px] italic">{info.label}:</span>
              <span className="text-white/70 text-sm font-medium italic">{info.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const ConsumingInstructions = () => (
  <section id="usage" className="py-24 bg-brand-dark relative overflow-hidden">
    <div className="container mx-auto px-6">
      <div className="bg-brand-gray/30 border border-white/5 rounded-[3rem] p-8 md:p-16 relative">
        <div className="flex items-center justify-center mb-8 md:mb-16">
           <Badge className="bg-[#ADFF2F] text-black font-black uppercase py-2 px-6 md:py-4 md:px-16 text-sm md:text-xl italic tracking-widest shadow-[0_0_40px_rgba(173,255,47,0.6)] rounded-full text-center">
             Consuming Instructions
           </Badge>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {[
            { 
              num: "1", 
              title: "IMMUNITET VA QUVVATNI OSHIRISH, PROFILAKTIKA UCHUN", 
              dose: "1 flakondan kuniga 1 mahal.", 
              visuals: (
                <div className="flex items-center justify-center w-full h-full relative">
                  <motion.img 
                    variants={{
                      hover: { rotate: -15, x: -10, y: -5, scale: 1.04 }
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    src={PRODUCT_BOTTLE} 
                    className="w-40 -rotate-12 drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] absolute left-0 scale-200" 
                    alt="" 
                  />
                  <motion.div 
                    variants={{
                      hover: { scale: 1.05, rotate: 2, y: -2 }
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative z-10"
                  >
                    <div className="absolute inset-0 bg-brand-lime blur-[40px] opacity-20" />
                    <Shield className="w-32 h-32 text-brand-lime drop-shadow-[0_0_25px_rgba(173,255,47,0.5)]" strokeWidth={1} />
                  </motion.div>
                  <motion.img 
                    variants={{
                      hover: { rotate: 15, x: 15, y: -8, scale: 1.04 }
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    src={PRODUCT_BOTTLE} 
                    className="w-44 rotate-12 drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] absolute right-0 scale-200" 
                    alt="" 
                  />
                </div>
              )
            },
            { 
              num: "2", 
              title: "ERKAKLIK QUVVATI, TESTESTERONNI OSHIRISH, PROSTATA BEZI FAOLIYATINI YAXSHILASH UCHUN", 
              dose: "1 flakondan kuniga 2 mahal.", 
              visuals: (
                <div className="flex items-center justify-center w-full h-full relative px-4">
                   <motion.div 
                    variants={{
                      hover: { scale: 1.08, rotate: -5, y: -3 }
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative z-10 mr-auto"
                   >
                      <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#ADFF2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_25px_rgba(173,255,47,0.5)]">
                        <path d="M12 12m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0" />
                        <path d="M16.5 7.5l4.5 -4.5" />
                        <path d="M15 3h6v6" />
                      </svg>
                      <div className="absolute inset-0 bg-brand-lime blur-[35px] opacity-15" />
                   </motion.div>
                   <div className="flex -space-x-24 absolute right-0 items-center">
                     <motion.img 
                        variants={{
                          hover: { rotate: 8, y: -15, x: -10, scale: 1.08 }
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        src={PRODUCT_BOTTLE} 
                        className="w-44 rotate-[5deg] z-10 drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] scale-200" 
                        alt="" 
                      />
                     <motion.img 
                        variants={{
                          hover: { rotate: -12, y: -5, x: 10, scale: 1.08 }
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        src={PRODUCT_BOTTLE} 
                        className="w-44 -rotate-[8deg] drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] scale-200" 
                        alt="" 
                      />
                   </div>
                </div>
              )
            },
            { 
              num: "3", 
              title: "SPORT VA OG'IR JISMONIY MEHNAT QILUVCHILAR UCHUN", 
              dose: "1 flakondan 3 mahal yoki 2 flakondan 2 mahal ichiladi.", 
              visuals: (
                <div className="flex items-center justify-center w-full h-full relative">
                  <motion.div 
                    variants={{
                      hover: { scale: 1.08, rotate: -10, y: -3 }
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="mr-auto pl-4"
                  >
                    <Dumbbell className="w-32 h-32 text-brand-lime drop-shadow-[0_0_25px_rgba(173,255,47,0.5)] -rotate-45" strokeWidth={1} />
                  </motion.div>
                  <div className="flex -space-x-24 absolute right-0 items-center">
                    <motion.img 
                      variants={{
                        hover: { rotate: 18, y: -15, scale: 1.08 }
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      src={PRODUCT_BOTTLE} 
                      className="w-44 rotate-[12deg] z-10 drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] scale-200" 
                      alt="" 
                    />
                    <motion.img 
                      variants={{
                        hover: { rotate: -10, y: -10, x: 10, scale: 1.08 }
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      src={PRODUCT_BOTTLE} 
                      className="w-44 -rotate-[3deg] drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] scale-200" 
                      alt="" 
                    />
                  </div>
                </div>
              )
            },
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover="hover"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-black/40 border-2 border-brand-lime/20 rounded-[2.5rem] p-8 relative h-[520px] overflow-hidden group hover:border-brand-lime/50 transition-all flex flex-col"
            >
               {/* Hexagonal Number Badge */}
               <div className="absolute top-6 left-6 z-20">
                 <div className="relative w-12 h-12 flex items-center justify-center">
                    <div className="absolute inset-0 border-2 border-brand-lime rotate-45 rounded-lg" />
                    <span className="text-white font-black text-xl relative z-10">{item.num}</span>
                 </div>
               </div>

               {/* Text Content */}
               <div className="pl-16 relative z-20 mb-4">
                 <h4 className="text-white font-black text-[13px] leading-tight mb-6 tracking-wide uppercase italic">
                   {item.title}
                 </h4>
                 <div className="text-brand-lime font-bold text-sm italic leading-relaxed">
                    {item.dose}
                 </div>
               </div>

               {/* Visual Elements - Centered Vertically */}
               <div className="flex-1 relative z-0 flex items-center justify-center py-10">
                 {item.visuals}
               </div>

               {/* Subtle Bottom Glow */}
               <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-brand-lime/5 to-transparent pointer-events-none" />
            </motion.div>
          ))}
        </div>

        <div className="bg-brand-gray/50 rounded-2xl p-6 flex flex-col md:flex-row gap-8 justify-between items-center border border-white/5">
          <div className="flex items-center gap-4">
             <CheckCircle2 className="text-brand-lime w-6 h-6" />
             <span className="text-white/70 text-sm italic">Consume after meals</span>
          </div>
          <div className="flex items-center gap-4">
             <CheckCircle2 className="text-brand-lime w-6 h-6" />
             <span className="text-white/70 text-sm italic">Keep refrigerated for best results</span>
          </div>
          <div className="flex items-center gap-4">
             <CheckCircle2 className="text-brand-lime w-6 h-6" />
             <span className="text-white/70 text-sm italic">Consult doctor if needed</span>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-3xl font-black italic text-white uppercase mb-2">STRENGTH. ENDURANCE. NATURE.</h3>
          <p className="text-brand-lime font-bold uppercase tracking-widest text-sm italic">TRIBULUS POWER — YOUR ULTIMATE STRENGTH PARTNER!</p>
        </div>
      </div>
    </div>
  </section>
);

export default function App() {
  useEffect(() => {
    // Apply scroll snapping to the html element
    document.documentElement.classList.add('snap-y', 'snap-proximity', 'scroll-smooth');
    return () => {
      document.documentElement.classList.remove('snap-y', 'snap-proximity', 'scroll-smooth');
    };
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark text-foreground selection:bg-brand-lime selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <Benefits />
        <PremiumComposition />
        <HowItWorks />
        <AboutProduct />
        <ConsumingInstructions />
        <AudienceSection />
        <Reviews />
        <QualityGuaranteed />
        <OrderSection />
      </main>
      <Footer />
    </div>
  );
}
