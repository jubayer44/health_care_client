import { TDrawerItem } from '@/types';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SideBarItem = ({item}: {item: TDrawerItem}) => {
    const linkPath = `/dashboard/${item.path}`;
    const pathname = usePathname();
return (
    <Link href={linkPath}>
        <ListItem disablePadding sx={{
            mb:1,
            ...(pathname === linkPath ? {
                borderRight: "3px solid #1586FD",
                "& svg": {
                    color: "#1586FD"
                }
            } : {})
        }}>
            <ListItemButton>
                <ListItemIcon>
                   {item?.icon && <item.icon /> }
                </ListItemIcon>
                <ListItemText primary={item.title} />
            </ListItemButton>
        </ListItem>
    </Link>
)
};

export default SideBarItem;