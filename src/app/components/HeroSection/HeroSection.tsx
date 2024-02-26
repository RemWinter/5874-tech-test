import React from 'react'
import styles from './HeroSection.module.css'
import stylesHeroCard from '../common/HeroCard.module.css'
import Image from 'next/image'
import { HeroCard } from '../common'

interface heroCardData {
  subHeader:string
  headerTop: string;
  headerBottom: string;
  description: string;
  link: string;
  linkHref: string;
}

const HeroSection = () => {
  const heroCardText: heroCardData = {
    subHeader: 'BRAND, DEV, ECOM, MARKETING',
    headerTop: 'We unleash',
    headerBottom: 'business potential',
    description: 'We create brand experiences which are memorable and distinct. Our experienced team create and develop brands with personality and resonance.',
    link: "Let's talk",
    linkHref: "#",
  }
  return (
    <div className={styles.heroContainer}>
      <div className={`${styles.heroItem} ${styles.heroLeft}`}>
      <div className={styles.stylesHeroCard}>
          <HeroCard data={heroCardText}/>
        </div>
      </div>
      <div className={`${styles.heroItem} ${styles.heroRight}`}>
        <Image
          src='/Spaniel01_gradient.png'
          alt='Hero Image'
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: '100%', objectFit:'cover' }}
        />
      </div>
    </div>
  )
}

export default HeroSection