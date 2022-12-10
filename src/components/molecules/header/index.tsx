import { Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { ReactComponent as Profile } from '~/assets/svgs/profile.svg'

function Header() {
 const [visible, setVisible] = useState<boolean>(false)
 const [pageY, setPageY] = useState<number>(0)
 const headerRef = useRef<HTMLElement>(null)

 useEffect(() => {
  const handleScroll = () => {
   const { pageYOffset } = window
   const deltaY = pageYOffset - pageY
   const hide = pageYOffset !== 0 && deltaY >= 0

   setVisible(hide)
   setPageY(pageYOffset)
  }
  document.addEventListener('scroll', handleScroll)
  return () => document.removeEventListener('scroll', handleScroll)
 }, [pageY])

 return (
  <header
   ref={headerRef}
   className={`bg-sky-600/80 px-4 py-3 backdrop-blur-sm sticky top-0 transition-all duration-300 ${
    visible ? `-translate-y-full` : `translate-y-0`
   }`}
  >
   <nav className="w-full flex justify-between items-center">
    <section className="flex justify-between items-center">
     <div className="px-3 scale-110 sm:scale-100 transition-all duration-300">
      <a href="/" className="custom-hover">
       META MARKET
      </a>
     </div>
     <ul className="hidden sm:flex items-center space-x-6 ml-20">
      <li>
       <a href="/exchange" className="custom-hover">
        거래소
       </a>
      </li>
      <li>
       <a href="/exchange" className="custom-hover">
        입출금
       </a>
      </li>
     </ul>
    </section>
    <section>
     <div>
      <Menu>
       <MenuButton className="custom-hover" _expanded={{ bg: 'blue.500' }} transition="all 0.2s">
        <Profile fill="white" width={30} />
       </MenuButton>
       <MenuList>
        <MenuGroup title="Profile">
         <MenuItem>My Account</MenuItem>
         <MenuItem>Payments </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Help">
         <MenuItem>Docs</MenuItem>
         <MenuItem>FAQ</MenuItem>
        </MenuGroup>
       </MenuList>
      </Menu>
     </div>
    </section>
   </nav>
  </header>
 )
}

export default Header
