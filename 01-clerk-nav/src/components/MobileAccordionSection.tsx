import { Accordion } from '@base-ui/react/accordion';
import styles from './MobileMenu.module.css';
import { ChevronDownMobileIcon } from './icons';

interface MobileAccordionSectionProps {
  value: string;
  label: string;
  isFirst?: boolean;
  panelClassName?: string;
  children: React.ReactNode;
}

function MobileAccordionSection({
  value,
  label,
  isFirst,
  panelClassName,
  children,
}: MobileAccordionSectionProps) {
  return (
    <Accordion.Item value={value}>
      <Accordion.Header render={<div />}>
        <Accordion.Trigger
          className={
            isFirst ? styles.sectionTriggerFirst : styles.sectionTrigger
          }
        >
          <span>{label}</span>
          <ChevronDownMobileIcon className={styles.chevron} />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Panel className={panelClassName ?? styles.sectionPanel}>
        <div className={styles.sectionContent}>{children}</div>
      </Accordion.Panel>
    </Accordion.Item>
  );
}

export { MobileAccordionSection };
