import ClerkNav from './components/ClerkNav';
import HeroContent from './components/HeroContent';
import { useNavbarTheme } from './hooks/useNavbarTheme';

const SECTIONS = [
  { height: 'auto', theme: 'light' },
  { height: '120vh', theme: 'dark' },
  { height: '60vh', theme: 'light' },
  { height: '100vh', theme: 'dark' },
  { height: '70vh', theme: 'light' },
  { height: '90vh', theme: 'dark' },
] as const;

function App() {
  const { theme, navbarRef } = useNavbarTheme();

  return (
    <>
      <ClerkNav theme={theme} ref={navbarRef} />
      <main>
        {SECTIONS.map((section, i) => (
          <section
            key={i}
            data-section={section.theme}
            style={{
              height: section.height,
              backgroundColor:
                section.theme === 'light' ? '#f7f7f8' : '#131316',
              display: i === 0 ? 'flex' : undefined,
              alignItems: i === 0 ? 'center' : undefined,
              paddingTop: i === 0 ? '192px' : undefined,
              paddingBottom: i === 0 ? '128px' : undefined,
            }}
          >
            {i === 0 && <HeroContent />}
          </section>
        ))}
      </main>
    </>
  );
}

export default App;
