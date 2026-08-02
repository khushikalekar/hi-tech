import { useEffect, useState } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { whatsappLink } from '@/data/business';

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* WhatsApp */}
      <a
        href={whatsappLink('Hello Hitech Solutions, I would like to know more about your products and services.')}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-strong hover:shadow-lg transition-all duration-300 hover:scale-110 animate-pulse-slow"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7" />
      </a>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-40 p-3.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white shadow-medium transition-all duration-300 hover:scale-110 animate-fade-in"
          aria-label="Back to top"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </>
  );
}
