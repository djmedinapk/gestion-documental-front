import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const MainSidebarHeader = () => {
  
  const [projectName, setProjectName ] = useState("");
  
  const project = useSelector(({explorerApp})=> explorerApp.explorer.projectData);

  useEffect(()=>{
    if (project && project.name) {
      setProjectName(project.name)
    }

  },[project])
  
    return (
      <div className="flex items-center h-full p-12">
        <Icon
          component={motion.span}
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { delay: 0.2 } }}
          className="text-24 md:text-32"
        >
          folder
        </Icon>
        <Typography
          component={motion.span}
          initial={{ x: -20 }}
          animate={{ x: 0, transition: { delay: 0.2 } }}
          delay={300}
          className="text-16 md:text-24 mx-12 font-semibold"
        >
          {projectName}
        </Typography>
      </div>
    );
}

export default MainSidebarHeader;
