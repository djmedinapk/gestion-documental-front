import Hidden from "@mui/material/Hidden";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import StyledIcon from "./StyledIcon";
import { useEffect, useState } from "react";
import withRouter from "@fuse/core/withRouter";
import { useParams } from "react-router";
import { setSelectedItem } from "./store/explorerSlice";
import { useTranslation } from "react-i18next";

function FileList(props) {
  const dispatch = useDispatch();
  const routeParams = useParams();
  const { t } = useTranslation("searchPage");
  const isFolder = useSelector(
    ({ explorerApp }) => explorerApp.explorer.isFolder
  );
  const files = useSelector(
    ({ explorerApp }) => explorerApp.explorer.projectData
  );
  const filesFolder = useSelector(
    ({ explorerApp }) => explorerApp.explorer.folderData
  );
  const selectedItemId = useSelector(
    ({ explorerApp }) => explorerApp.explorer.selectedItemId
  );

  const [filesList, setFilesList] = useState([]);

  useEffect(() => {
    let totalFiles = [];
    let data = isFolder ? filesFolder : files;
    let fiForm = data?.folders?.map((folder) => {
      return {
        id: folder.id,
        name: folder.name,
        description: folder.description,
        modified: new Date(folder.lastUpdated).toDateString(),
        type: "folder",
        metadata: folder,
      };
    });
    let filesDocs = data?.files?.map((file) => {
      return {
        id: file.id,
        name: file.name,
        description: file.description,
        modified: new Date(file.lastUpdated).toDateString(),
        type: file.documentType.icon,
        metadata: file,
      };
    });

    if (isFolder && data.folderId) {
      totalFiles.push({
        id: data.folderId,
        name: "..",
        description: "",
        modified: "",
        type: "folder",
      });
    }
    if (isFolder && data.projectId) {
      totalFiles.push({
        id: data.projectId,
        name: "..",
        description: "",
        modified: "",
        type: "folder",
        defaultUrl: "project",
      });
    }

    totalFiles = fiForm ? totalFiles.concat(fiForm) : totalFiles;
    totalFiles = filesDocs ? totalFiles.concat(filesDocs) : totalFiles;
    setFilesList(totalFiles);
    dispatch(setSelectedItem(null));
  }, [files, filesFolder, routeParams]);

  const handleClick = (event, item) => {
    switch (event.detail) {
      case 1:
        dispatch(setSelectedItem(item));
        break;
      case 2:
        if (item.type == "folder" && !item.defaultUrl) {
          dispatch(setSelectedItem(null));
          props.navigate(`/explorer/folder/${item.id}`);
        }
        if (item.type == "folder" && item.defaultUrl == "project") {
          dispatch(setSelectedItem(null));
          props.navigate(`/explorer/project/${item.id}`);
        }
        break;
      default:
        return;
    }
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0.8 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
    >
      <Table className="simple borderless">
        <TableHead>
          <TableRow>
            <TableCell className="max-w-64 w-64 p-0 text-center"> </TableCell>
            <TableCell>{t("NAME")}</TableCell>
            <TableCell className="hidden sm:table-cell">{t("TYPE")}</TableCell>
            <TableCell className="hidden sm:table-cell">{t("OWNER")}</TableCell>
            {/* <TableCell className="text-center hidden sm:table-cell">Size</TableCell> */}
            <TableCell className="hidden sm:table-cell">
              {t("MODIFIED")}
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filesList?.map((item) => {
            return item.metadata?.deletedAt === null || !item.metadata ? (
              <TableRow
                key={item.id}
                hover
                onClick={(event) => {
                  handleClick(event, item);
                }}
                selected={item.id === selectedItemId}
                className="cursor-pointer h-64"
              >
                <TableCell className="max-w-64 w-64 p-0 text-center">
                  <StyledIcon type={item.type} />
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {item.type === "folder"
                    ? t("FOLDER")
                    : item.type.toUpperCase()}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {item.owner}
                </TableCell>
                {/* <TableCell className="text-center hidden sm:table-cell">
                  {item.size === '' ? '-' : item.size}
                </TableCell> */}
                <TableCell className="hidden sm:table-cell">
                  {item.modified}
                </TableCell>
                <Hidden lgUp>
                  <TableCell>
                    <IconButton
                      onClick={(ev) =>
                        props.pageLayout.current.toggleRightSidebar()
                      }
                      aria-label="open right sidebar"
                      size="large"
                    >
                      <Icon>info</Icon>
                    </IconButton>
                  </TableCell>
                </Hidden>
              </TableRow>
            ) : (
              false
            );
          })}
        </TableBody>
      </Table>
    </motion.div>
  );
}

export default withRouter(FileList);
