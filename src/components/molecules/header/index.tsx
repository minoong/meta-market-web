import React, { useEffect, useRef, useState } from 'react'
import { BiLineChart } from 'react-icons/bi'
import { BsFillCreditCardFill } from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import Profile from '~/components/molecules/profile'
// import { ReactComponent as Profile } from '~/assets/svgs/profile.svg'

function Header() {
 const [visible, setVisible] = useState<boolean>(false)
 const [pageY, setPageY] = useState<number>(0)
 const headerRef = useRef<HTMLElement>(null)

 //  useEffect(() => {
 //   const handleScroll = () => {
 //    const { pageYOffset } = window
 //    const deltaY = pageYOffset - pageY
 //    const hide = pageYOffset !== 0 && deltaY >= 0

 //    setVisible(hide)
 //    setPageY(pageYOffset)
 //   }
 //   document.addEventListener('scroll', handleScroll)
 //   return () => document.removeEventListener('scroll', handleScroll)
 //  }, [pageY])

 return (
  <header
   ref={headerRef}
   className={`bg-[#093687] px-4 py-3 backdrop-blur-sm fixed z-[989898] w-full transition-all duration-300 ${
    visible ? `-translate-y-full` : `translate-y-0`
   }`}
  >
   <nav className="w-full flex justify-between items-center">
    <section className="flex justify-between items-center">
     <div className="px-3 scale-110 sm:scale-100 transition-all duration-300">
      <NavLink to="/" className="custom-hover">
       META MARKET
      </NavLink>
     </div>
     <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
      <ul className="hidden sm:flex items-center space-x-6 ml-20">
       <li>
        <NavLink
         to="/exchange"
         className={({ isActive }) =>
          `custom-hover flex items-center gap-1 ${isActive ? 'text-white' : '!text-gray-400'}`
         }
        >
         <BiLineChart />
         거래소
        </NavLink>
       </li>
       <li>
        <NavLink
         to="/balances"
         className={({ isActive }) =>
          `custom-hover flex items-center gap-1 ${isActive ? 'text-white' : '!text-gray-400'}`
         }
        >
         <BsFillCreditCardFill />
         입출금
        </NavLink>
       </li>
      </ul>
     </motion.div>
    </section>
    <section>
     <Profile />
     {/* <div>
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
     </div> */}
    </section>
   </nav>
  </header>
 )
}

export default Header
