import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Michael Chen",
    role: "Founder, Zenith Media",
    content: "GoHighLevel transformed our company workflows — everything runs in one place! We moved from 5 different tools to just CompanyFlow.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "Sarah Johnson",
    role: "CEO, Growth Partners",
    content: "The automation capabilities are unmatched. We're saving 20 hours a week on manual follow-ups alone. It's a game changer.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    name: "David Miller",
    role: "Director, ScaleUp Digital",
    content: "Best CRM for companies, hands down. The pipeline management is intuitive and the landing page builder is incredibly fast.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">Loved by Companies Worldwide</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div key={index} className="bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-800 hover:border-slate-700 transition-all relative">
              <Quote className="absolute top-8 right-8 w-8 h-8 text-slate-800 fill-current" />
              <div className="flex text-yellow-500 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-slate-300 mb-8 leading-relaxed text-lg">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-800" />
                <div>
                  <h4 className="font-bold text-white">{t.name}</h4>
                  <p className="text-slate-500 text-sm">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}