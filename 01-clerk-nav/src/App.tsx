import styles from './App.module.css';
import ClerkNav from './components/ClerkNav';

function App() {
  return (
    <>
      <ClerkNav />
      <main style={{ height: '3000px' }}>
        <div className={styles.container}></div>
      </main>
    </>
  );
}

export default App;
