import React, { useEffect, useState } from 'react'
import styles from './CapabilitesSection.module.css'
import stylesHeroCard from '../common/HeroCard.module.css'
import { HeroCard } from '../common'
import { useAppSelector } from '../redux/store'

interface heroCardData {
  subHeader:string
  headerTop: string;
  headerBottom: string;
  description: string;
  link: string;
  linkHref: string;
}

interface ListItem {
  item: string,
  link: string
}

const CapabilitiesSection = () => {
  const { dimensions } = useAppSelector(state => state.landingSlice)
  const [isMobile, setIsMobile] = useState<boolean>()
  const heroCardText: heroCardData = {
    subHeader: '',
    headerTop: 'What are',
    headerBottom: 'we capable of',
    description: 'By focusing on design as an enabler and putting a huge emphasis on our clients as co-producers, we create innovative, sustainable marketing that enhances brand experience and user engagement.',
    link: "Our process",
    linkHref: "#",
  }

  useEffect(() => {
    setIsMobile(!!((dimensions.x) <= 1050))
  }, [dimensions])

  const brandItems: ListItem[] = [
    {item: 'Brand Strategy', link:'#'},
    {item: 'Logo & Name', link:'#'},
    {item: 'Identity & Collatral', link:'#'},
  ]
  const developmentItem: ListItem[]= [
    {item: 'eCommerce', link:'#'},
    {item: 'Web Development', link:'#'},
    {item: 'Mobile Apps', link:'#'},
  ] 
  const marketingItem: ListItem[] = [
    {item: 'Digital', link:'#'},
    {item: 'Market Research', link:'#'},
  ] 

  return (
    <div className={styles.capabilitiesContainer} style={{flexDirection: isMobile ? 'column' : 'row'}}>
      <div 
        className={stylesHeroCard.heroTextContainer} 
        style={isMobile ? {width: '100%', maxWidth: '100%', textAlign: 'center'} : {width: '50%'}}
      >
        <HeroCard data={heroCardText} subHeader={false} isMobile={isMobile}/>
      </div>
      <div 
        className={styles.containerRight}
        style={isMobile ? {
          paddingLeft: '0',
          justifyContent: 'center',
          textAlign: 'center'
        } : {}}
      >
        <div className={styles.listContainer} style={{
          flexDirection: isMobile ? 'row' : 'column', 
          marginTop: isMobile ? '70px' : 'unset' 
        }}>
          <List header='Brand' listItems={brandItems} isMobile={isMobile}/>
          <List header='Development' listItems={developmentItem} isMobile={isMobile}/>
          {dimensions.x <= 1050 &&
            <List header='Marketing' listItems={marketingItem} isMobile={isMobile}/>
          }
        </div>
        {dimensions.x > 1050 &&
          <div style={{marginLeft:'100px'}}>
            <List header='Marketing' listItems={marketingItem}/>
          </div>
        }
      </div>
    </div>
  )
}

interface ListProps {
  header: string,
  listItems: ListItem[],
  isMobile?: boolean
}

const List: React.FC<ListProps> = (props:ListProps) => { // Would normally destructure props but demonstrating I'm comfortable with both methods. See HeroCard for destructured example
  return (
    <div>
      <h1 className={styles.listHeader}>{props.header}</h1>
        <div style={props.isMobile ? {margin: '0 30px'} : {}}>
          <ul className={styles.list}>
            {props.listItems.map((item, index) => (
              <li key={index} className={styles.listItem}>
                <a  href={item.link}>{item.item}</a>
              </li>
            ))}
          </ul>
        </div>
    </div>
  )
}

export default CapabilitiesSection