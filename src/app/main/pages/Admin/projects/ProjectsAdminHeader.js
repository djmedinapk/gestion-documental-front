import { Hidden, Icon, IconButton, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ProjectsAdminHeader = (props) => {
    const { t } = useTranslation('projectAdminPage');
      return (
      <div className="flex flex-1 items-center justify-between p-4 sm:p-24">
        <div className="flex shrink items-center">
          <Hidden lgUp>
            <IconButton
              onClick={(ev) => {
                props.pageLayout.current.toggleLeftSidebar();
              }}
              aria-label="open left sidebar"
              size="large"
            >
              <Icon>menu</Icon>
            </IconButton>
          </Hidden>
  
          <div className="flex items-center">
            <Icon
              component={motion.span}
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { delay: 0.2 } }}
              className="text-24 md:text-32"
            >
              account_tree
            </Icon>
            <Typography
              component={motion.span}
              initial={{ x: -20 }}
              animate={{ x: 0, transition: { delay: 0.2 } }}
              delay={300}
              className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold"
            >
              {t('PROJECTS')}
            </Typography>
          </div>
        </div>
      </div>
    );
};

export default ProjectsAdminHeader;