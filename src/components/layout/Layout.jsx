import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartDrawer } from '../cart/CartDrawer';
import { GuidedShopper } from '../features/GuidedShopper';

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-white selection:bg-luxury selection:text-white">
      <Navbar />
      <CartDrawer />
      <GuidedShopper />
      <main className="flex-grow pt-20 md:pt-24 pb-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};
