import React from 'react'
import Link from 'next/link'
import theme from '@/styles/theme'
import { MenuItem } from '@mui/material'
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded'
import { Menu } from '@/components/_header/styles/RenderMenuItems'

interface MenuItemProps {
    label: string
    path?: string
    type?: string
    children?: MenuItemProps[]
}

export const RenderMenuItems = (
    items: MenuItemProps[],
    handleClose: () => void,
    handleSubMenuClick: (event: React.MouseEvent<HTMLElement>) => void,
    subMenuAnchorEl: HTMLElement | null
) => {
    return items.map(({ label, path, type, children }, index) => {
        if (type === 'nav') {
            return (
                <Link
                    href={path || '#'}
                    passHref
                    key={index}
                    style={{ textDecoration: 'none' }}
                >
                    <MenuItem
                        sx={{
                            color: label === 'PCOS Yoga' ? '#EE1C5B' : 'white',
                            textDecoration: 'none',
                            fontSize: '18px',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                        onClick={handleClose}
                    >
                        {label}
                        {label === 'PCOS Yoga' && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="13"
                                viewBox="0 0 28 13"
                                fill="none"
                            >
                                <path
                                    d="M27.7144 11.7731L24.5294 6.39438L27.6819 1.235C27.7567 1.11205 27.7976 0.971428 27.8002 0.827513C27.8029 0.683598 27.7673 0.541559 27.697 0.415929C27.6268 0.290298 27.5244 0.185587 27.4004 0.112506C27.2764 0.039425 27.1352 0.000598931 26.9913 0H1.625C1.19402 0 0.780698 0.171205 0.475951 0.475952C0.171205 0.780698 0 1.19402 0 1.625L0 11.375C0 11.806 0.171205 12.2193 0.475951 12.524C0.780698 12.8288 1.19402 13 1.625 13H27.0156C27.159 13 27.2999 12.962 27.4239 12.8899C27.5478 12.8178 27.6505 12.7142 27.7215 12.5896C27.7925 12.465 27.8292 12.3238 27.828 12.1804C27.8267 12.037 27.7875 11.8965 27.7144 11.7731ZM8.53938 9.08375H7.62938L4.98063 5.5575V9.09188H4.0625V4.0625H4.98063L7.6375 7.59688V4.0625H8.5475L8.53938 9.08375ZM13.6825 4.875H10.8144V6.08562H13.4144V6.89812H10.8144V8.20625H13.6825V9.01875H9.89625V4.0625H13.6744L13.6825 4.875ZM20.4181 9.0675H19.5L18.2406 5.33812L16.9812 9.08375H16.0713L14.4463 4.0625H15.4375L16.51 7.66188L17.745 4.0625H18.7362L19.9225 7.66188L21.0031 4.0625H22.0025L20.4181 9.0675Z"
                                    fill="#34AB29"
                                />
                            </svg>
                        )}
                    </MenuItem>
                </Link>
            )
        } else if (type === 'menu' && children) {
            return [
                <MenuItem
                    onClick={handleSubMenuClick}
                    aria-haspopup="true"
                    aria-controls={`submenu-${index}`}
                    key={`submenu-item-${index}`}
                    sx={{
                        color: 'white',
                        fontSize: '18px',
                        '& .Mui-selected': {
                            color: theme.palette.primary.main,
                        },
                    }}
                >
                    {label} <ArrowRightRoundedIcon />{' '}
                </MenuItem>,
                <Menu
                    id={`submenu-${index}`}
                    anchorEl={subMenuAnchorEl}
                    open={Boolean(subMenuAnchorEl)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                    }}
                    onClose={handleClose}
                    sx={{}}
                    MenuListProps={{
                        'aria-labelledby': `submenu-button-${index}`,
                    }}
                    key={`submenu-menu-${index}`}
                >
                    {RenderMenuItems(
                        children,
                        handleClose,
                        handleSubMenuClick,
                        subMenuAnchorEl
                    )}
                </Menu>,
            ]
        }
    })
}
