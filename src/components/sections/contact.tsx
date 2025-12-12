'use client';

export default function Contact() {
  return (
    <footer id="contact" className="bg-primary text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6 ml-24">
            <div>
              <h4 className="text-xl font-semibold mb-4">Location</h4>
              <address className="not-italic text-white/90 leading-relaxed">
                1220 Amherst Street, Floor 2<br />
                Winchester, VA 22601
              </address>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-white/90">
                <p>
                  <a 
                    href="mailto:Michaelfellislcsw@gmail.com" 
                    className="hover:text-white transition-colors"
                  >
                    Michaelfellislcsw@gmail.com
                  </a>
                </p>
                <p>
                  <a 
                    href="tel:5404317376" 
                    className="hover:text-white transition-colors"
                  >
                    (540) 431-7376
                  </a>
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-right space-y-3 mr-24">
            <p className="text-white/95">
              © {new Date().getFullYear()} Winchester Therapy Services LLC. All rights reserved.
            </p>
            <p className="text-white/90">
              Michael Ellis, LCSW | Licensed Clinical Social Worker
            </p>
            <p className="text-white/85 text-sm">
              Website Created by{' '}
              <a
                href="https://www.weblaunchacademy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/95 transition-colors underline font-medium"
              >
                Web Launch Academy LLC
              </a>
              {' '}with Claude AI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}