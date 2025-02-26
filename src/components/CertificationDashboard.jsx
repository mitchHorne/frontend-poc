import styled from "styled-components";
import {
  Error,
  CheckCircle,
  Emergency,
  PrecisionManufacturing,
  LocalFireDepartment,
  LocalHospital,
  DeliveryDining,
  Agriculture,
  Factory,
  Paragliding,
} from "@mui/icons-material";
import theme from "../constants/theme";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;
  margin-left: 15vw;
  width: 70vw;
`;

const DataContainer = styled.div`
  align-items: center;
  background: ${(props) => (props.active ? theme.colors.accentColor : "#eee")};
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: 3rem;
  justify-content: center;
  padding: 2rem 0;
  width: 20vw;

  ${(props) =>
    props.active &&
    `
      svg{
        color: white;
      }

      color: white;
      box-shadow: 0 0 15px ${theme.colors.accentColor};
      text-shadow: 0 0 10px white;
    `}
`;

const displayFilterIcon = (filter) => {
  switch (filter) {
    case "all":
      return <Emergency sx={{ color: "Blue", fontSize: 60 }} />;
    case "fire":
      return <LocalFireDepartment sx={{ color: "Blue", fontSize: 60 }} />;
    case "firstAid":
      return <LocalHospital sx={{ color: "Blue", fontSize: 60 }} />;
    case "forklift":
      return <DeliveryDining sx={{ color: "Blue", fontSize: 60 }} />;
    case "mobileCrane":
      return <PrecisionManufacturing sx={{ color: "Blue", fontSize: 60 }} />;
    case "overheadCrane":
      return <PrecisionManufacturing sx={{ color: "Blue", fontSize: 60 }} />;
    case "siteRep":
      return <Factory sx={{ color: "Blue", fontSize: 60 }} />;
    case "tractor":
      return <Agriculture sx={{ color: "Blue", fontSize: 60 }} />;
    case "workingHeights":
      return <Paragliding sx={{ color: "Blue", fontSize: 60 }} />;
    default:
      return null;
  }
};

const CertificationDashboard = ({
  selectedTrainingFilter,
  setStatusFilter,
  statutoryTrainingDashboard,
  statusFilter,
}) => {
  if (!statutoryTrainingDashboard) return null;
  const { value: trainingFilter } = selectedTrainingFilter;

  return (
    <Container>
      <DataContainer
        active={statusFilter === "all"}
        onClick={() => setStatusFilter("all")}
      >
        {displayFilterIcon(trainingFilter)}
        {statutoryTrainingDashboard[trainingFilter].count}
      </DataContainer>
      <DataContainer
        active={statusFilter === "valid"}
        onClick={() => setStatusFilter("valid")}
      >
        <CheckCircle sx={{ color: "green", fontSize: 60 }} />
        {statutoryTrainingDashboard[trainingFilter].valid}
      </DataContainer>
      <DataContainer
        active={statusFilter === "expired"}
        onClick={() => setStatusFilter("expired")}
      >
        <Error sx={{ color: "#F32013", fontSize: 60 }} />
        {statutoryTrainingDashboard[trainingFilter].expired}
      </DataContainer>
    </Container>
  );
};

export default CertificationDashboard;
