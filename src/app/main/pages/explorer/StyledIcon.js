import { styled } from '@mui/material/styles';
import Icon from '@mui/material/Icon';

const StyledIcon = styled(Icon)(({ theme, type }) => ({
  '&:before': {
    ...(type === 'folder' && {
      content: "'folder'",
      color: '#FFB300',
    }),    
    ...(type === 'excel' && {
      content: "'insert_chart'",
      color: '#4CAF50',
    }),
    ...(type === 'pdf' && {
      content: "'picture_as_pdf'",
      color: '#FF0000',
    }),
    ...(type === 'image' && {
      content: "'photo'",
      color: '#1565C0',
    }),
    ...(type === 'word' && {
      content: "'description'",
      color: '#1565C0',
    }),
    ...(type === 'texto' && {
      content: "'description'",
      color: '#FFB300',
    }),
    ...(type === 'xml' && {
      content: "'text_snippet'",
      color: '#FFB300',
    }),
    ...(type === 'generic' && {
      content: "'insert_drive_file'",
      color: '#1565C0',
    }),
  },
}));

export default StyledIcon;
