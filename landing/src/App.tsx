import { Footer } from '#/components/footer';
import { Hero } from '#/components/hero';
import { Nav } from '#/components/nav';
import { Studies } from '#/components/studies';
import { PAGE_GRID_MOBILE } from '#/lib/constants';

export default function App() {
  return (
    <div className="relative min-h-dvh overflow-x-clip">
      {PAGE_GRID_MOBILE && (
        <div
          aria-hidden
          className="bg-grid-page pointer-events-none absolute inset-0 desktop:hidden"
        />
      )}
      <div className="relative">
        <Nav />
        <Hero />
        <Studies />
        <Footer />
      </div>
    </div>
  );
}
