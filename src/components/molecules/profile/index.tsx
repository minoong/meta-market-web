import { Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from '@chakra-ui/react'
import { Button, Spinner } from 'flowbite-react'
import React from 'react'
import Avatar from '~/components/atoms/avatar'
import useAuth from '~/hooks/useAuth'

function Profile() {
 const { auth, handleGoogleLogin, signOut, isPending } = useAuth()
 return (
  <div>
   {auth ? (
    <Menu>
     <MenuButton className="hover:scale-105" _expanded={{ transform: 'scale(1.05, 1.05)' }} transition="all 0.2s">
      <Avatar name={auth.email ?? ''} imageUrl={auth.photoURL ?? ''} />
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
       <MenuItem onClick={() => signOut()}>로그아웃</MenuItem>
      </MenuGroup>
     </MenuList>
    </Menu>
   ) : (
    <Button disabled={isPending} onClick={() => handleGoogleLogin()} color="transport" outline={isPending}>
     {isPending && (
      <>
       <div className="mr-3">
        <Spinner size="sm" light />
       </div>
       Loading ...
      </>
     )}
     {!isPending && <div className="text-white font-bold">로그인</div>}
    </Button>
   )}
  </div>
 )
}

export default Profile
