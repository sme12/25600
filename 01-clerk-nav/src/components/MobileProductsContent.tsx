import styles from './MobileMenu.module.css';
import productStyles from './ProductsContent.module.css';
import { productsNav } from './products.data';
import { DashedHLine, DashedVLine } from './icons';
import { LABELS } from './nav.labels';

function MobileProductsContent() {
  return (
    <>
      {/* Product links */}
      <div>
        <div className={styles.sectionHeadingProducts}>
          {LABELS.productsHeader}
        </div>
        <ul className={styles.productList}>
          {productsNav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className={styles.productLink}>
                <div
                  className={`${productStyles.iconWrap} ${styles.productIconWrap}`}
                >
                  <div className={productStyles.iconGradient} />
                  <span className={productStyles.iconSvg}>{item.icon}</span>
                </div>
                <div className={styles.productText}>
                  <div className={styles.productLabel}>
                    {item.label}
                    {item.tag && (
                      <span className={productStyles.betaBadge}>
                        {item.tag}
                        <span className={productStyles.betaBadgeBorderTop}>
                          <DashedHLine />
                        </span>
                        <span className={productStyles.betaBadgeBorderBottom}>
                          <DashedHLine />
                        </span>
                        <span className={productStyles.betaBadgeBorderLeft}>
                          <DashedVLine />
                        </span>
                        <span className={productStyles.betaBadgeBorderRight}>
                          <DashedVLine />
                        </span>
                      </span>
                    )}
                  </div>
                  <div className={styles.productDesc}>{item.description}</div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* Sub-sections */}
      <div className={styles.subSections}>
        {productsNav.map((item) => (
          <div key={item.href} className={styles.subSection}>
            <div className={styles.subSectionHeading}>
              {item.subSection.heading}
            </div>
            <ul className={styles.subItemGrid}>
              {item.subSection.items.map((sub) => (
                <li key={sub.href}>
                  <a href={sub.href} className={styles.subItemLink}>
                    {sub.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}

export { MobileProductsContent };
