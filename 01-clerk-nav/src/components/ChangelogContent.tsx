import { NavigationMenu } from '@base-ui/react/navigation-menu';
import styles from './ChangelogContent.module.css';

interface ChangelogContentProps {
  entries: { date: string; title: string; href: string }[];
}

function ChangelogContent({ entries }: ChangelogContentProps) {
  return (
    <ul className={styles.dropdownList}>
      {entries.map((entry) => (
        <li key={entry.href}>
          <NavigationMenu.Link
            className={styles.changelogLink}
            render={<a href={entry.href} />}
          >
            <div className={styles.changelogDate}>{entry.date}</div>
            <div className={styles.changelogTitle}>{entry.title}</div>
          </NavigationMenu.Link>
        </li>
      ))}
    </ul>
  );
}

export { ChangelogContent };
