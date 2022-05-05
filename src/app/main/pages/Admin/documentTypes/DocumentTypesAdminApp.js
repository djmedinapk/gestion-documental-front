import FusePageSimple from '@fuse/core/FusePageSimple';
import { useDeepCompareEffect } from '@fuse/hooks';
import { styled } from '@mui/styles';
import withReducer from 'app/store/withReducer';
import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import DocumentTypesAdminHeader from './DocumentTypesAdminHeader';
import DocumentTypesAdminList from './DocumentTypesAdminList';
import DocumentTypesAdminSidebarContent from './DocumentTypesAdminSidebarContent';
import DocumentTypesAdminDialog from './DocumentTypesAdminDialog';
import reducer from './store';
import { getDocumentTypes } from './store/documentTypesAdminSlice';


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

const DocumentTypesAdminApp = (props) => {
    const dispatch = useDispatch();
    const pageLayout = useRef(null);
    const routeParams = useParams();
  
    useDeepCompareEffect(() => {
      dispatch(getDocumentTypes(routeParams));
    }, [dispatch, routeParams]);


    return (
        <>
        <Root
            header={<DocumentTypesAdminHeader pageLayout={pageLayout} />}
            content={<DocumentTypesAdminList/>}
            leftSidebarContent={<DocumentTypesAdminSidebarContent />}
            sidebarInner
            ref={pageLayout}
            innerScroll
        />
        <DocumentTypesAdminDialog/>
    </>
    );
};

export default withReducer('documentTypesAdminApp', reducer)(DocumentTypesAdminApp);