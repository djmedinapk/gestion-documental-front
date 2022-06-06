import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { extraMainURLFrontend } from "./../../AppParams";

const Root = styled('div')(({ theme }) => ({
  '& > .logo-icon': {
    transition: theme.transitions.create(['width', 'height'], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  '& > .badge, & > .logo-text': {
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
}));

function Logo() {
  return (
    <Root className="flex items-center">
      <img className="logo-icon h-28" src={extraMainURLFrontend+"assets/images/logos/logo_tekmovil_full.png"} alt="logo" />
    </Root>
  );
}

export default Logo;
