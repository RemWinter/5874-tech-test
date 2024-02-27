'use client'
import React, { useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import Image from 'next/image'

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);
  const [atTop, setAtTop] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setAtTop(window.scrollY > 50 ? false : true)
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos, visible]);

  const navOptions: string[] = [
    'services',
    'work',
    'about',
    'blog',
    'contact',
  ]
  return (
    <div className={styles.navbarContainer} style={{ top: visible ? '0' : '-200px', backgroundColor: atTop ? 'rgba(0,0,0,0)' : '#506473'}}>
      <div>
        <Image
          src='/Digital Spaniel logo01-01.png'
          alt='Logo'
          width={197/1.3}
          height={90/1.3}
        />
      </div>
      <NavItems navOptions={navOptions}/>
    </div>
  )
}

interface NavItemsProps {
  navOptions: string[]
}

const NavItems: React.FC<NavItemsProps> = ({navOptions}) => {
  return (
    <div className={styles.navItemsContainer}>
      { navOptions.map((option) => (
        <div>
          <h1 className={styles.navOption}>
            {option}
          </h1>
        </div>
      ))
      }
    </div>
  )
}

export default Navbar