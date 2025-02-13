import { useRef } from "react";
import styled from "styled-components";
import UploadFileIcon from "@mui/icons-material/UploadFile";

import theme from "../constants/theme";

const UploadInput = styled.input`
  display: block;
  visibility: hidden;
  height: 0;
  width: 0;
`;

const StyledIcon = styled(UploadFileIcon)`
  cursor: pointer;
  margin-left: 5px;

  &:hover {
    color: ${theme.colors.accentColor};
  }
`;

const UploadFileButton = ({ handleFileUpload }) => {
  const inputRef = useRef(null);

  return (
    <>
      <StyledIcon fontSize="large" onClick={() => inputRef.current.click()} />
      <UploadInput
        onChange={(event) => handleFileUpload(event.target.files[0])}
        ref={inputRef}
        type="file"
      />
    </>
  );
};

export default UploadFileButton;
