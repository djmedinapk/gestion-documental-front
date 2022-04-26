import Hidden from '@mui/material/Hidden';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getProjectsTransaction } from 'app/actions/ProjectAction';

const ProjectTable = (props) => {
  const [project, setProject]  = useState([]);
  useEffect(()=>{
    getProjects();
  },[])

  const getProjects = async () => {
    const { data, status } = await getProjectsTransaction();
    console.log("sdas",data, status)
    if (status === 200) {
    
      setProject(data);
    } else {
        setProject([]);
    }
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0.8 }} // y = 50 
      animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
    >
      <Table className="simple borderless">
        <TableHead>
          <TableRow>
            <TableCell className="hidden sm:table-cell">Name</TableCell>
            <TableCell className="hidden sm:table-cell">Owner</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {project.map((item) => {
            return (
              <TableRow
                key={item.name}
                hover
                onClick={(event) => dispatch(setSelectedItem(item.name))}
                className="cursor-pointer h-64"
              >
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="hidden sm:table-cell">{item.owner}</TableCell>
                <Hidden lgUp>
                  <TableCell>
                    <IconButton
                      onClick={(ev) => props.pageLayout.current.toggleRightSidebar()}
                      aria-label="open right sidebar"
                      size="large"
                    >
                      <Icon>info</Icon>
                    </IconButton>
                  </TableCell>
                </Hidden>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default ProjectTable;
