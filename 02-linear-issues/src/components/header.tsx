import { Navbar } from './navbar';
import { TopBar } from './top-bar';

export function Header() {
  return (
    <header>
      <TopBar />
      <Navbar />
    </header>
  );
}
