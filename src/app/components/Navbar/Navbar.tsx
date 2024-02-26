import React from 'react'
import styles from './Navbar.module.css'
import Image from 'next/image'

const Navbar = () => {
  const navOptions: string[] = [
    'services',
    'work',
    'about',
    'blog',
    'contact',
  ]
  return (
    <div className={styles.navbarContainer}>
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