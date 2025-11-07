import { useConfig } from "@/contexts/ConfigContext";

export const Footer = () => {
  const config = useConfig();
  const brand = config?.siteIdentity?.name || config?.app_name || "BrillPack";
  const slogan =
    config?.slogan ||
    "Brilliance in every box – creating custom packaging solutions that elevate your brand.";
  const contactEmail = config?.contact?.email || "info@brillpack.com";
  const contactPhone = config?.contact?.phone || "+1 (555) 123-4567";
  const contactAddress = config?.contact?.address || "123 Packaging Lane\nBusiness District, NY 10001";
  const year = new Date().getFullYear();
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">{brand}</h3>
            <p className="text-primary-foreground/80">{slogan}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#products" className="text-primary-foreground/80 hover:text-accent transition-colors">
                  Products
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-primary-foreground/80">Custom Design</li>
              <li className="text-primary-foreground/80">Premium Finishes</li>
              <li className="text-primary-foreground/80">Brand Enhancement</li>
              <li className="text-primary-foreground/80">Fast Delivery</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>{contactEmail}</li>
              <li>{contactPhone}</li>
              {contactAddress.split("\n").map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-primary-foreground/60">
          <p>© {year} {brand}. All rights reserved. {slogan}</p>
        </div>
      </div>
    </footer>
  );
};
