import styles from './HeroContent.module.css';
import appStyles from '../App.module.css';

export default function HeroContent() {
  return (
    <div className={appStyles.container}>
      <h1 className={styles.heading}>
        More than authentication, craft that matters
      </h1>
      <p className={styles.description}>
        A hands-on study of Clerk's navigation bar. Replicating patterns from
        developers with great taste and care, in the era of AI-generated UI
        slop.
      </p>
    </div>
  );
}
