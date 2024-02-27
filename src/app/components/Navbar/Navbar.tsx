'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './Navbar.module.css'
import Image from 'next/image'
import { slide as Menu } from 'react-burger-menu'
import { IoMenuSharp } from "react-icons/io5";
import { useAppDispatch } from '../redux/store'
import { setDimensions } from '../redux/landingSlice'

interface Dimentions {
  x:number;
  y:number;
}
const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);
  const [atTop, setAtTop] = useState<boolean>(true);
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false)
  const mobileNavOpenRef = useRef<boolean>(false)
  const [windowDimensions, setWindowDimension] = useState<Dimentions>({x:1920, y:1080})
  const dispatch = useAppDispatch()
  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    setAtTop(window.scrollY > 50 ? false : true)
    mobileNavOpenRef.current ? setVisible(true) : setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
    setPrevScrollPos(currentScrollPos);
  };
  
  const handleResize = () => {
    const dimension = {x: window.innerWidth, y: window.innerHeight}
    setWindowDimension(dimension)
    dispatch(setDimensions(dimension))
  };

  const toggleMobileNav = () => {
    setMobileNavOpen(prev => !prev)
  }

  useEffect(() => {
    const dimensions = {x:window.innerWidth, y:window.innerHeight}
    dispatch(setDimensions(dimensions))
    setWindowDimension(dimensions)
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  useEffect(() => {

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos, visible]);

  useEffect(() => {
    mobileNavOpenRef.current = mobileNavOpen
  }, [mobileNavOpen])

  const navOptions: string[] = [
    'services',
    'work',
    'about',
    'blog',
    'contact',
  ]
  return (
    <div 
      className={styles.navbarContainer} 
      style={{ 
        top: visible ? '0' : '-200px', 
        backgroundColor: atTop ? 'rgba(0,0,0,0)' : '#506473',
      }}>
        <div 
          className={styles.logoContainer} 
          style={{
            filter: (windowDimensions?.x <= 1050) && atTop ? 'drop-shadow(#C0345E 1px 1px 1px)' : 'none',
            transition:'all 0.5s'
          }}
        >
          <Image
            src='/Digital Spaniel logo01-01.png'
            alt='Logo'
            width={197/1.3}
            height={90/1.3}
          />
        </div>
        {windowDimensions && windowDimensions.x > 1050 ? 
          <NavItems navOptions={navOptions}/> :
          <MobileNav open={mobileNavOpen} 
            toggleOpen={toggleMobileNav} 
            navOptions={navOptions} 
            windowDimensions={windowDimensions}
          />
        }
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

interface MobileNavProps {
  open: boolean;
  toggleOpen: Function;
  navOptions: string[];
  windowDimensions: Dimentions;
}

const MobileNav: React.FC<MobileNavProps> = ({open, toggleOpen, navOptions, windowDimensions}) => {

  return (
    <>
      <div className={styles.menuIconContainer}>
        <IoMenuSharp 
        onClick={() => toggleOpen()}
          color='#fff'
          size={30}
      />
      </div>
        <div 
          style={{
            right: open ? '0' : windowDimensions.x < 1050 ? '-100%' : '-50%', 
            backgroundColor: open ? '#C0345E' : 'rgba(0,0,0,0)'}}
          className={styles.mobileNavContainer}
        >
          <div className={styles.menuItemsContainer}>
            {navOptions.map((item) => (
              <div onClick={() => toggleOpen()}>
                <a href="#">{item}</a>
              </div>
            ))}
          </div>
        </div>
      
    </>
  )
}

export default Navbar