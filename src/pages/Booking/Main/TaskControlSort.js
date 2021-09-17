import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const StyledMenu = withStyles({
	paper: {
		border: '1px solid #d3d4d5',
	},
})((props) => (
	<Menu
		elevation={0}
		getContentAnchorEl={null}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'center',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'center',
		}}
		{...props}
	/>
));

const StyledMenuItem = withStyles((theme) => ({
	root: {
		'&:focus': {
			backgroundColor: theme.palette.primary.main,
			'& .MuiListItemIcon-root, & .MuiListItemText-primary': {
				color: theme.palette.common.white,
			},
		},
	},
}))(MenuItem);

export default function TaskSortControl(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const onClick = (sortBy, sortValue) => {
		props.onSort(sortBy, sortValue);
	}

	return (
		<span style={{ display: 'inline-block' }} >
			<Button
				aria-controls="customized-menu"
				aria-haspopup="true"
				variant="contained"
				color="primary"
				onClick={handleClick}
			>
				Open Menu
			</Button>
			<StyledMenu
				id="customized-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<StyledMenuItem>
					<Button onClick={() => onClick('name', 1)} >A-Z</Button>
				</StyledMenuItem>
				<StyledMenuItem>
					<Button onClick={() => onClick('name', -1)} >Z-A</Button>
				</StyledMenuItem>
				<StyledMenuItem>
					<Button onClick={() => onClick('status', 1)} >Active</Button>
				</StyledMenuItem>
				<StyledMenuItem>
					<Button onClick={() => onClick('status', -1)} >Hide</Button>
				</StyledMenuItem>
			</StyledMenu>
		</span>
	);
}
