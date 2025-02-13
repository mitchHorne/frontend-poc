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

import { checkExpired } from "../utils/dates";

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
  }
`;

function formatDate(stringDate) {
  if (stringDate === "Invalid Date") return "Invalid Date";
  const date = new Date(stringDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
}

function selectCertificateColor(certDate, today, todayPlusThreeMonths) {
  const date = new Date(certDate);
  const almostExpiry = date < todayPlusThreeMonths;
  const expired = date < today;

  return expired
    ? { color: "#F32013" }
    : almostExpiry
    ? { color: "#F0D500" }
    : { color: "green" };
}

const EmployeeRows = ({ employees, selectedEmployee, setSelectedEmployee }) => {
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

  const sortedEmployees = employees.sort((a, b) => {
    if (sort.value === "initials") {
      if (sort.direction === "asc") {
        return a.initials.localeCompare(b.initials);
      } else {
        return b.initials.localeCompare(a.initials);
      }
    }

    if (sort.value === "surname") {
      if (sort.direction === "asc") {
        return a.surname.localeCompare(b.surname);
      }
      return b.surname.localeCompare(a.surname);
    }

    if (sort.value === "status") {
      const aStatus = checkExpired([
        a.fire,
        a.firstAid,
        a.forklift,
        a.mobileCrane,
        a.overheadCrane,
        a.siteRep,
        a.tractor,
        a.workingHeights,
      ]);
      const bStatus = checkExpired([
        b.fire,
        b.firstAid,
        b.forklift,
        b.mobileCrane,
        b.overheadCrane,
        b.siteRep,
        b.tractor,
        b.workingHeights,
      ]);

      if (sort.direction === "asc") {
        if (aStatus === "Valid" && bStatus !== "Valid") return -1;
        if (aStatus !== "Valid" && bStatus === "Valid") return 1;
        if (aStatus === "Expiring" && bStatus === "Expired") return -1;
        if (aStatus === "Expired" && bStatus === "Expiring") return 1;
        return a.surname.localeCompare(b.surname);
      }

      if (sort.direction === "dec") {
        if (aStatus === "Valid" && bStatus !== "Valid") return 1;
        if (aStatus !== "Valid" && bStatus === "Valid") return -1;
        if (aStatus === "Expiring" && bStatus === "Expired") return 1;
        if (aStatus === "Expired" && bStatus === "Expiring") return -1;
        return a.surname.localeCompare(b.surname);
      }
    }
  });

  return (
    <>
      <Header>
        <div onClick={() => chooseSort("initials")}>
          Initials
          {sort.value !== "initials" && <SwapVert fontSize="sm" />}
          {sort.value === "initials" && sort.direction === "asc" && (
            <KeyboardDoubleArrowDown fontSize="sm" />
          )}
          {sort.value === "initials" && sort.direction === "dec" && (
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
            const {
              fire,
              firstAid,
              forklift,
              mobileCrane,
              overheadCrane,
              siteRep,
              tractor,
              workingHeights,
            } = employee;

            const expiring = checkExpired([
              fire,
              firstAid,
              forklift,
              mobileCrane,
              overheadCrane,
              siteRep,
              tractor,
              workingHeights,
            ]);

            const today = new Date();
            const todayPlusThreeMonths = new Date(
              new Date(today).setMonth(today.getMonth() + 3)
            );

            return (
              <>
                <EmployeeRow
                  key={`${employee.surname}_${employee.clockNumber}`}
                  onClick={() =>
                    selectedEmployee === employee.id
                      ? setSelectedEmployee()
                      : setSelectedEmployee(employee.id)
                  }
                >
                  <StyledArrowForwardIos
                    active={selectedEmployee === employee.id}
                    sx={{ fontSize: 10 }}
                  />
                  <div style={{ minWidth: "50px" }}>{employee.initials}</div>
                  <div style={{ minWidth: "120px" }}>{employee.surname}</div>
                  <div style={{ minWidth: "110px" }}>
                    {employee.clockNumber}
                  </div>
                  {expiring === "Expired" && (
                    <Error sx={{ fontSize: 30 }} style={{ color: "#F32013" }} />
                  )}
                  {expiring === "Expiring" && (
                    <Warning
                      sx={{ fontSize: 30 }}
                      style={{ color: "#F0D500" }}
                    />
                  )}
                  {expiring === "Valid" && (
                    <CheckCircle
                      sx={{ fontSize: 30 }}
                      style={{ color: "green" }}
                    />
                  )}
                </EmployeeRow>
                <EmployeeRowContent active={selectedEmployee === employee.id}>
                  {fire && (
                    <div>
                      <LocalFireDepartment
                        style={selectCertificateColor(
                          fire,
                          today,
                          todayPlusThreeMonths
                        )}
                      />
                      <CertificationDetail>
                        <div>Fire:</div>
                        <div>{fire ? formatDate(fire) : ""}</div>
                      </CertificationDetail>
                    </div>
                  )}
                  {firstAid && (
                    <div>
                      <LocalHospital
                        style={selectCertificateColor(
                          firstAid,
                          today,
                          todayPlusThreeMonths
                        )}
                      />
                      <CertificationDetail>
                        <div>First Aid:</div>
                        <div>{firstAid ? formatDate(firstAid) : ""}</div>
                      </CertificationDetail>
                    </div>
                  )}
                  {forklift && (
                    <div>
                      <DeliveryDining
                        style={selectCertificateColor(
                          forklift,
                          today,
                          todayPlusThreeMonths
                        )}
                      />
                      <CertificationDetail>
                        <div>Forklift:</div>
                        <div>{forklift ? formatDate(forklift) : ""}</div>
                      </CertificationDetail>
                    </div>
                  )}
                  {mobileCrane && (
                    <div>
                      <PrecisionManufacturing
                        style={selectCertificateColor(
                          mobileCrane,
                          today,
                          todayPlusThreeMonths
                        )}
                      />
                      <CertificationDetail>
                        <div>Mobile Crane:</div>
                        <div>{mobileCrane ? formatDate(mobileCrane) : ""}</div>
                      </CertificationDetail>
                    </div>
                  )}
                  {overheadCrane && (
                    <div>
                      <PrecisionManufacturing
                        style={selectCertificateColor(
                          overheadCrane,
                          today,
                          todayPlusThreeMonths
                        )}
                      />
                      <CertificationDetail>
                        <div>Overhead Crane:</div>
                        <div>
                          {overheadCrane ? formatDate(overheadCrane) : ""}
                        </div>
                      </CertificationDetail>
                    </div>
                  )}
                  {siteRep && (
                    <div>
                      <Factory
                        style={selectCertificateColor(
                          siteRep,
                          today,
                          todayPlusThreeMonths
                        )}
                      />
                      <CertificationDetail>
                        <div>Site Rep:</div>
                        <div>{siteRep ? formatDate(siteRep) : ""}</div>
                      </CertificationDetail>
                    </div>
                  )}
                  {tractor && (
                    <div>
                      <Agriculture
                        style={selectCertificateColor(
                          tractor,
                          today,
                          todayPlusThreeMonths
                        )}
                      />
                      <CertificationDetail>
                        <div>Tractor:</div>
                        <div>{tractor ? formatDate(tractor) : ""}</div>
                      </CertificationDetail>
                    </div>
                  )}
                  {workingHeights && (
                    <div>
                      <Paragliding
                        style={selectCertificateColor(
                          workingHeights,
                          today,
                          todayPlusThreeMonths
                        )}
                      />
                      <CertificationDetail>
                        <div>Working@Heights:</div>
                        <div>
                          {workingHeights ? formatDate(workingHeights) : ""}
                        </div>
                      </CertificationDetail>
                    </div>
                  )}
                </EmployeeRowContent>
              </>
            );
          })}
      </EmployeeContainer>
    </>
  );
};

export default EmployeeRows;
