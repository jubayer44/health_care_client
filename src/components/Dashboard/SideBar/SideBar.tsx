import assets from '@/assets';
import { TUserRole } from "@/types";
import { drawerItems } from "@/utils/drawerItems";
import { Box, List, Stack, Typography } from "@mui/material";
import Image from "next/image";
import SideBarItem from "./SideBarItem";
import { useEffect, useState } from 'react';
import { getUserInfo } from '@/services/auth.services';

const SideBar = () => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const {role} = getUserInfo();
    setUserRole(role);
  }, [])

    return (
        <Box>
            <Stack direction="row" gap={1} alignItems="center" justifyContent="center" py={2}>
                <Image src={assets.svgs.logo} alt="logo" height={40} width={40}/>
                <Typography variant="h6" fontWeight={400} component="h1">SN Health Care</Typography>
            </Stack>
            <List>
            {drawerItems(userRole as TUserRole).map((item, index) => (
              <SideBarItem key={index} item={item}/>
            ))}
          </List>
        </Box>
    );
};

export default SideBar;