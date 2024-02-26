import React from 'react'
import styles from './HeroCard.module.css'

interface HeroCardProps {
  data: {
    subHeader: string
    headerTop: string;
    headerBottom: string;
    description: string;
    link: string;
    linkHref: string
  },
  subHeader?: boolean
}

export const HeroCard: React.FC<HeroCardProps> = ({data, subHeader}) => {
  return (
    <>
      {subHeader !== false && 
        <h1 className={styles.subHeading}>{data.subHeader}</h1>
      }
      <h1 className={styles.heading}>{data.headerTop}<br/><span style={{color:'#506473'}}>{data.headerBottom}</span></h1>
      <p className={styles.description}>{data.description}</p>
      <a className={styles.link} href={data.linkHref}>{data.link}</a>
    </>
  )
}
