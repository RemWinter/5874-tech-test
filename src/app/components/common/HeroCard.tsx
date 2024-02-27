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
  };
  subHeader?: boolean;
  darkMode?:boolean;
  isMobile?: boolean;
}

export const HeroCard: React.FC<HeroCardProps> = ({data, subHeader, darkMode, isMobile}) => {
  return (
    <>
      {subHeader !== false && 
        <h1 className={styles.subHeading}>{data.subHeader}</h1>
      }
      <h1 className={styles.heading} style={{color:darkMode ? '#fff' : 'black'}}>
        {data.headerTop}<br/><span style={{color: darkMode ? 'rgb(199 139 193)' : '#506473'}}>{data.headerBottom}</span>
      </h1>
      <p 
        className={styles.description} 
        style={{color:darkMode ? '#fff' : '#506473', marginLeft: isMobile ? 'auto': '0', marginRight: isMobile ? 'auto': '0'}}
      >{data.description}</p>
      <a className={styles.link} style={{color:darkMode ? '#fff' : 'black'}} href={data.linkHref}>{data.link}</a>
    </>
  )
}
