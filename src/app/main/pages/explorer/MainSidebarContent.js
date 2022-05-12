import Icon from '@mui/material/Icon';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { removeProject } from './store/explorerSlice';

const MainSidebarContent = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const project = useSelector(({explorerApp})=> explorerApp.explorer.projectData);

  const deleteProject = () => {
    if (project && project.id) {
      dispatch(removeProject(project.id)).then(() => {
        navigate('/projects');
        dispatch(showMessage({
          message: 'Project Deleted',
          autoHideDuration: 6000,
          anchorOrigin: {
              vertical  : 'bottom',
              horizontal: 'center'
          },
          variant: 'success'
        }));
      });    
      
    }
  }


  return (
    <List component="nav">
      <ListItem button dense onClick={deleteProject}>
        <ListItemIcon className="min-w-40">
          <Icon className="text-20">delete</Icon>
        </ListItemIcon>
        <ListItemText primary="Delete" />
      </ListItem>      
    </List>
  );
}

export default MainSidebarContent;
