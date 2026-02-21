import ClerkNav from './components/ClerkNav';
import { useNavbarTheme } from './hooks/useNavbarTheme';

const SECTIONS = [
  { height: '80vh', theme: 'light' },
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
            }}
          />
        ))}
      </main>
    </>
  );
}

export default App;
