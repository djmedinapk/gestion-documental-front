import FusePageSimple from '@fuse/core/FusePageSimple';
import { useDeepCompareEffect } from '@fuse/hooks';
import { styled } from '@mui/styles';
import withReducer from 'app/store/withReducer';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import VersionsAdminHeader from './VersionsAdminHeader';
import VersionsAdminList from './VersionsAdminList';
import VersionsAdminSidebarContent from './VersionsAdminSidebarContent';
import VersionsAdminDialog from './VersionsAdminDialog';
import reducer from './store';
import { getVersions } from './store/versionsAdminSlice';


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

const VersionsAdminApp = (props) => {
    const dispatch = useDispatch();
    const pageLayout = useRef(null);
    const routeParams = useParams();
  
    useDeepCompareEffect(() => {
      dispatch(getVersions(routeParams));
    }, [dispatch, routeParams]);


    return (
        <>
        <Root
            header={<VersionsAdminHeader pageLayout={pageLayout} />}
            content={<VersionsAdminList/>}
            leftSidebarContent={<VersionsAdminSidebarContent />}
            sidebarInner
            ref={pageLayout}
            innerScroll
        />
        <VersionsAdminDialog/>
    </>
    );
};

export default withReducer('versionsAdminApp', reducer)(VersionsAdminApp);