import { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import axios from "axios";

import {
  UploadInput,
  LoadingComponent,
  PageHeaderContainer,
  EmployeeRows,
  EmployeeFilters,
  CertificationDashboard,
} from "../components";
import { Delete } from "@mui/icons-material";

import { certifications } from "../constants/certifications";
import { checkExpired } from "../utils/dates";

async function uploadFile(file) {
  const formData = new FormData();
  formData.append("data_file", file);

  try {
    const response = await axios.post("/api/upload/employees", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.status;
  } catch (error) {
    return error;
  }
}

async function deleteData(setEmployees) {
  try {
    const response = await axios.delete("/api/employees");
    if (response.data === "OK") setEmployees([]);
  } catch (error) {
    return error;
  }
}

function formatDates(employees) {
  const today = new Date();
  const oneMonthAgo = new Date(today.setMonth(today.getMonth() - 1));
  return employees.map((employee) => {
    const formattedEmployee = { ...employee };
    Object.keys(formattedEmployee).forEach((key) => {
      if (formattedEmployee[key] && formattedEmployee[key] === "Invalid Date") {
        formattedEmployee[key] = new Date(oneMonthAgo);
      }
    });

    return formattedEmployee;
  });
}

function saveExpiryStatus(certification, status, all) {
  certification.count++;
  all.count++;

  console.log(certification);

  if (status === "Valid") {
    certification.valid++;
    all.valid++;
  }
  if (status === "Expired") {
    certification.expired++;
    all.expired++;
  }
  if (status === "Expiring") {
    certification.almostExpired++;
    all.almostExpired++;
  }
}

function createFilteredCertifications(employees) {
  const certificationStructure = {
    count: 0,
    valid: 0,
    expired: 0,
    almostExpired: 0,
  };
  const all = { ...certificationStructure },
    fire = { ...certificationStructure },
    firstAid = { ...certificationStructure },
    forklift = { ...certificationStructure },
    mobileCrane = { ...certificationStructure },
    overheadCrane = { ...certificationStructure },
    siteRep = { ...certificationStructure },
    tractor = { ...certificationStructure },
    workingHeights = { ...certificationStructure };

  employees.forEach((employee) => {
    if (employee.fire)
      saveExpiryStatus(fire, checkExpired([employee.fire]), all);
    if (employee.firstAid)
      saveExpiryStatus(firstAid, checkExpired([employee.firstAid]), all);
    if (employee.forklift)
      saveExpiryStatus(forklift, checkExpired([employee.forkLift]), all);
    if (employee.mobileCrane)
      saveExpiryStatus(mobileCrane, checkExpired([employee.mobileCrane]), all);
    if (employee.overheadCrane)
      saveExpiryStatus(
        overheadCrane,
        checkExpired([employee.overheadCrane]),
        all
      );
    if (employee.siteRep)
      saveExpiryStatus(siteRep, checkExpired([employee.siteRep]), all);
    if (employee.tractor)
      saveExpiryStatus(tractor, checkExpired([employee.tractor]), all);
    if (employee.workingHeights)
      saveExpiryStatus(
        workingHeights,
        checkExpired([employee.workingHeights]),
        all
      );
  });

  return {
    All: all,
    fire,
    firstAid,
    forklift,
    mobileCrane,
    overheadCrane,
    siteRep,
    tractor,
    workingHeights,
  };
}

const Certification = () => {
  const [loading, setLoading] = useState(false);
  const [fileSelected, setFileSelected] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [filteredCertifications, setFilteredCertifications] = useState();

  // Filters
  const [certificationFilter, setCertificationFilter] = useState({
    value: "All",
  });
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get("/api/employees").then((response) => {
      setEmployees(formatDates(Object.values(response.data)));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (fileSelected) {
      uploadFile(fileSelected).then((uploaded) => {
        if (uploaded < 299) {
          axios.get("/api/employees").then((response) => {
            setEmployees(formatDates(Object.values(response.data)));
          });
        }
      });
    }
  }, [fileSelected]);

  useEffect(() => {
    if (employees.length) {
      const departments = employees.map((employee) => employee.department);
      setDepartments([...new Set(departments)]);
      setFilteredCertifications(createFilteredCertifications(employees));
      return setFilteredEmployees(employees);
    }

    setFilteredEmployees([]);
  }, [employees]);

  useEffect(() => {
    if (employees.length) {
      let filterEmployees = employees;

      if (certificationFilter.value !== "All")
        filterEmployees = filterEmployees.filter(
          (employee) => !!employee[certificationFilter.value]
        );

      if (departmentFilter !== "All")
        filterEmployees = filterEmployees.filter(
          (employee) => employee.department === departmentFilter
        );

      setFilteredCertifications(createFilteredCertifications(filterEmployees));
      setFilteredEmployees(filterEmployees);
    }
  }, [certificationFilter, departmentFilter]);

  return (
    <>
      <Tooltip id="my-tooltip" place="right" />
      {loading && <LoadingComponent />}

      <PageHeaderContainer>
        <h1 className="my-anchor-element">Employee certifications</h1>

        <a
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Upload employee file"
        >
          <UploadInput
            className="my-anchor-element"
            handleFileUpload={setFileSelected}
          />
        </a>
        <a data-tooltip-id="my-tooltip" data-tooltip-content="Clear Data">
          <Delete
            className="my-anchor-element"
            fontSize="large"
            onClick={() => deleteData(setEmployees)}
          />
        </a>
      </PageHeaderContainer>
      <EmployeeFilters
        certifications={certifications}
        certificationFilter={certificationFilter}
        setCertificationFilter={setCertificationFilter}
        departments={departments}
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        employees={employees}
      />
      <CertificationDashboard
        certifications={filteredCertifications}
        certificationFilter={certificationFilter}
      />
      <EmployeeRows
        employees={filteredEmployees}
        selectedEmployee={selectedEmployee}
        setSelectedEmployee={setSelectedEmployee}
      />
    </>
  );
};

export default Certification;
