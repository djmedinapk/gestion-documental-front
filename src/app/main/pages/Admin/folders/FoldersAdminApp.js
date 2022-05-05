import FusePageSimple from '@fuse/core/FusePageSimple';
import { useDeepCompareEffect } from '@fuse/hooks';
import { styled } from '@mui/styles';
import withReducer from 'app/store/withReducer';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import FoldersAdminHeader from './FoldersAdminHeader';
import FoldersAdminList from './FoldersAdminList';
import FoldersAdminSidebarContent from './FoldersAdminSidebarContent';
import FoldersAdminDialog from './FoldersAdminDialog';
import reducer from './store';
import { getFolders } from './store/foldersAdminSlice';


const Root = styled(FusePageSimple)(({ theme }) => ({
    '& .FusePageSimple-header': {
      minHeight: 72,
      height: 72,
      [theme.breakpoints.up('lg')]: {
        minHeight: 136,
        height: 136,
      },
    },
    '& .FusePageSimple-wrapper': {
      minHeight: 0,
    },
    '& .FusePageSimple-contentWrapper': {
      padding: 0,
      [theme.breakpoints.up('sm')]: {
        padding: 24,
        height: '100%',
      },
    },
    '& .FusePageSimple-content': {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    '& .FusePageSimple-sidebar': {
      width: 256,
      border: 0,
    },
  }));

const FoldersAdminApp = (props) => {
    const dispatch = useDispatch();
    const pageLayout = useRef(null);
    const routeParams = useParams();
  
    useDeepCompareEffect(() => {
      dispatch(getFolders(routeParams));
    }, [dispatch, routeParams]);


    return (
        <>
        <Root
            header={<FoldersAdminHeader pageLayout={pageLayout} />}
            content={<FoldersAdminList/>}
            leftSidebarContent={<FoldersAdminSidebarContent />}
            sidebarInner
            ref={pageLayout}
            innerScroll
        />
        <FoldersAdminDialog/>
    </>
    );
};

export default withReducer('foldersAdminApp', reducer)(FoldersAdminApp);