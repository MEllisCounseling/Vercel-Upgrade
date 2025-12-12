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
            <div className="flex justify-end pt-2">
              <a
                href="https://weblaunchacademy.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-block', textDecoration: 'none' }}
              >
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    backgroundColor: '#0a1840',
                    height: '40px',
                    padding: '4px 12px 4px 44px',
                    borderRadius: '6px',
                    position: 'relative',
                    borderLeft: '3px solid #ffdb57',
                    transition: 'box-shadow 0.3s',
                    cursor: 'pointer',
                  }}
                  onMouseOver={(e) => {
                    const target = e.currentTarget as HTMLDivElement;
                    target.style.boxShadow = '0 0 25px rgba(255, 219, 87, 0.8)';
                  }}
                  onMouseOut={(e) => {
                    const target = e.currentTarget as HTMLDivElement;
                    target.style.boxShadow = 'none';
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: '6px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '32px',
                      height: '32px',
                    }}
                  >
                    <img
                      src="/images/wla-logo.png"
                      alt="Web Launch Academy Logo"
                      width="32"
                      height="32"
                      style={{ borderRadius: '50%', display: 'block' }}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      lineHeight: '1.2',
                      marginLeft: '8px',
                    }}
                  >
                    <span
                      style={{
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                      }}
                    >
                      Built with
                    </span>
                    <span
                      style={{
                        color: '#ffdb57',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                      }}
                    >
                      Web Launch Academy
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}