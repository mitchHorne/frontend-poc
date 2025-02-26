import { useState } from "react";
import styled from "styled-components";
import {
  ArrowForwardIos,
  Error,
  Warning,
  CheckCircle,
  PrecisionManufacturing,
  LocalFireDepartment,
  LocalHospital,
  DeliveryDining,
  Agriculture,
  Factory,
  Paragliding,
  SwapVert,
  KeyboardDoubleArrowDown,
  KeyboardDoubleArrowUp,
} from "@mui/icons-material";

// import { checkExpired } from "../utils/dates";

const Header = styled.div`
  align-items: center;
  background: #c0c0c0;
  border-radius: 10px 10px 0 0;
  display: flex;
  margin-left: 25vw;
  overflow-y: scroll;
  padding: 10px 0;
  width: 50vw;

  div {
    border-right: 1px solid #888;
    cursor: pointer;
    padding: 0 10px;

    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  div:nth-child(3) {
    cursor: default;
  }
`;

const EmployeeContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 25vw;
  max-height: 70vh;
  overflow-y: scroll;
  width: 50vw;
`;

const EmployeeRow = styled.div`
  align-items: center;
  background: #eee;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  display: flex;
  padding: 10px 10px;

  svg {
    margin-right: 10px;
  }

  div {
    display: flex;
    justify-content: flex-start;
    padding-left: 10px;
  }
`;

const EmployeeRowContent = styled.div`
  align-items: flex-start;
  background: #eee;
  border-bottom: 1px solid #ccc;
  display: ${(props) => (props.active ? "flex" : "none")};
  flex-direction: column;
  padding: 10px;

  div {
    align-items: center;
    display: flex;
    padding-left: 30px;
  }

  svg {
    margin-right: 10px;
  }
`;

const StyledArrowForwardIos = styled(ArrowForwardIos)`
  transform: ${(props) => (props.active ? "rotate(90deg)" : "rotate(0deg)")};
`;

const CertificationDetail = styled.span`
  display: flex;
  flex-grow: 1;
  padding-bottom; 10px;

  div {
  padding-left: 0;
  padding-right: 10px;
  min-width: 120px;
  }

  div:first-child {
    width 50px;
  }
`;

const TrainingRow = styled.div`
  display: flex;
  padding: 5px 0;
`;

function renderIcon(type, expired) {
  const colorStyle = expired ? { color: "#F32013" } : { color: "green" };

  switch (type) {
    case "fire":
      return <LocalFireDepartment style={colorStyle} />;
    case "firstAid":
      return <LocalHospital style={colorStyle} />;
    case "forklift":
      return <DeliveryDining style={colorStyle} />;
    case "mobileCrane":
      return <PrecisionManufacturing style={colorStyle} />;
    case "overheadCrane":
      return <PrecisionManufacturing style={colorStyle} />;
    case "siteRep":
      return <Factory style={colorStyle} />;
    case "tractor":
      return <Agriculture style={colorStyle} />;
    case "workingHeights":
      return <Paragliding style={colorStyle} />;
    default:
      return null;
  }
}

function renderTrainings(statutoryTraining) {
  const trainings = statutoryTraining.map((training) => {
    const { id, type, text, expiry, expired } = training;
    return (
      <TrainingRow key={`training_${type}_${id}`}>
        {renderIcon(type, expired)}
        <CertificationDetail>
          <div>{text}:</div>
          <div>{expiry}</div>
        </CertificationDetail>
      </TrainingRow>
    );
  });

  return trainings;
}

const EmployeeRows = ({ employees, selectedEmployee, setSelectedEmployee }) => {
  if (!employees.length) return null;
  const [sort, setSort] = useState({ value: "surname", direction: "asc" });

  const chooseSort = (value) => {
    if (sort.value === value) {
      setSort({
        value: value,
        direction: sort.direction === "asc" ? "dec" : "asc",
      });
    } else {
      setSort({ value: value, direction: "asc" });
    }
  };

  employees.sort((a, b) => {
    if (sort.value === "name") {
      if (sort.direction === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    }

    if (sort.value === "surname") {
      if (sort.direction === "asc") {
        return a.surname.localeCompare(b.surname);
      }
      return b.surname.localeCompare(a.surname);
    }

    if (sort.value === "status") {
      const aStatus = a.statutoryTraining.some((training) => training.expired);
      const bStatus = b.statutoryTraining.some((training) => training.expired);

      if (sort.direction === "asc") {
        if (aStatus && !bStatus) return -1;
        if (!aStatus && bStatus) return 1;
        return a.surname.localeCompare(b.surname);
      }

      if (sort.direction === "dec") {
        if (aStatus && !bStatus) return 1;
        if (!aStatus && bStatus) return -1;
        return a.surname.localeCompare(b.surname);
      }
    }
  });

  return (
    <>
      <Header>
        <div onClick={() => chooseSort("name")}>
          Name
          {sort.value !== "name" && <SwapVert fontSize="sm" />}
          {sort.value === "name" && sort.direction === "asc" && (
            <KeyboardDoubleArrowDown fontSize="sm" />
          )}
          {sort.value === "name" && sort.direction === "dec" && (
            <KeyboardDoubleArrowUp fontSize="sm" />
          )}
        </div>
        <div onClick={() => chooseSort("surname")}>
          Surname
          {sort.value !== "surname" && <SwapVert fontSize="sm" />}
          {sort.value === "surname" && sort.direction === "asc" && (
            <KeyboardDoubleArrowDown fontSize="sm" />
          )}
          {sort.value === "surname" && sort.direction === "dec" && (
            <KeyboardDoubleArrowUp fontSize="sm" />
          )}
        </div>
        <div>Clock Number</div>
        <div onClick={() => chooseSort("status")}>
          Status
          {sort.value !== "status" && <SwapVert fontSize="sm" />}
          {sort.value === "status" && sort.direction === "asc" && (
            <KeyboardDoubleArrowDown fontSize="sm" />
          )}
          {sort.value === "status" && sort.direction === "dec" && (
            <KeyboardDoubleArrowUp fontSize="sm" />
          )}
        </div>
      </Header>
      <EmployeeContainer>
        {employees &&
          employees.map((employee) => {
            const { id, name, surname, clockNumber, statutoryTraining } =
              employee;

            const expired = statutoryTraining.some(
              (training) => training.expired
            );

            return (
              <div key={`employee_row_${id}`}>
                <EmployeeRow
                  key={`${employee.surname}_${employee.clockNumber}`}
                  onClick={() =>
                    selectedEmployee === id
                      ? setSelectedEmployee()
                      : setSelectedEmployee(id)
                  }
                >
                  <StyledArrowForwardIos
                    active={selectedEmployee === id}
                    sx={{ fontSize: 10 }}
                  />
                  <div style={{ minWidth: "50px" }}>{name}</div>
                  <div style={{ minWidth: "120px" }}>{surname}</div>
                  <div style={{ minWidth: "110px" }}>{clockNumber}</div>
                  {expired && (
                    <Error sx={{ fontSize: 30 }} style={{ color: "#F32013" }} />
                  )}
                  {!expired && (
                    <CheckCircle
                      sx={{ fontSize: 30 }}
                      style={{ color: "green" }}
                    />
                  )}
                </EmployeeRow>
                <EmployeeRowContent active={selectedEmployee === id}>
                  {renderTrainings(statutoryTraining)}
                </EmployeeRowContent>
              </div>
            );
          })}
      </EmployeeContainer>
    </>
  );
};

export default EmployeeRows;
