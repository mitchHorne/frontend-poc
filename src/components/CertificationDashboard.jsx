import styled from "styled-components";
import {
  Error,
  Warning,
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

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2rem 0;
  margin-left: 5vw;
  width: 90vw;
`;

const DataContainer = styled.div`
  align-items: center;
  background: #eee;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  font-size: 3rem;
  justify-content: center;
  padding: 2rem 0;
  width: 20vw;
`;

const CertificationDashboard = ({ certifications, certificationFilter }) => {
  if (!certifications) return null;
  const { value: certFilter } = certificationFilter;

  return (
    <Container>
      <DataContainer>
        {certFilter === "All" ? (
          <Emergency sx={{ color: "Blue", fontSize: 60 }} />
        ) : certFilter === "fire" ? (
          <LocalFireDepartment sx={{ color: "Blue", fontSize: 60 }} />
        ) : certFilter === "firstAid" ? (
          <LocalHospital sx={{ color: "Blue", fontSize: 60 }} />
        ) : certFilter === "forklift" ? (
          <DeliveryDining sx={{ color: "Blue", fontSize: 60 }} />
        ) : certFilter === "mobileCrane" ? (
          <PrecisionManufacturing sx={{ color: "Blue", fontSize: 60 }} />
        ) : certFilter === "overheadCrane" ? (
          <PrecisionManufacturing sx={{ color: "Blue", fontSize: 60 }} />
        ) : certFilter === "siteRep" ? (
          <Factory sx={{ color: "Blue", fontSize: 60 }} />
        ) : certFilter === "tractor" ? (
          <Agriculture sx={{ color: "Blue", fontSize: 60 }} />
        ) : (
          <Paragliding sx={{ color: "Blue", fontSize: 60 }} />
        )}
        {certifications[certFilter].count}
      </DataContainer>
      <DataContainer>
        <CheckCircle sx={{ color: "green", fontSize: 60 }} />
        {certifications[certFilter].valid}
      </DataContainer>
      <DataContainer>
        <Warning sx={{ color: "#F0D500", fontSize: 60 }} />
        {certifications[certFilter].almostExpired}
      </DataContainer>
      <DataContainer>
        <Error sx={{ color: "#F32013", fontSize: 60 }} />
        {certifications[certFilter].expired}
      </DataContainer>
    </Container>
  );
};

export default CertificationDashboard;
