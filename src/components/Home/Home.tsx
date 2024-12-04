import { Banner } from '../Banner/Banner';
import { ProductSlider } from '../ProductSlider/ProductSlider';
import { PromoBanner } from '../PromoBanner/PromoBanner';

export function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Banner />
      <PromoBanner />
      <main className="container mx-auto px-4 py-6">
        <ProductSlider />
      </main>
    </div>
  );
} 