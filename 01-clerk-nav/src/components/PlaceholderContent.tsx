import popupStyles from './Popup.module.css';

interface PlaceholderContentProps {
  contentLabel: string;
}

function PlaceholderContent({ contentLabel }: PlaceholderContentProps) {
  return (
    <div className={popupStyles.popupInner}>
      <div className={popupStyles.popupContentHeader}>{contentLabel}</div>
    </div>
  );
}

export { PlaceholderContent };
