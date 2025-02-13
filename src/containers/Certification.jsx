import { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import axios from "axios";

import {
  UploadInput,
  LoadingComponent,
  PageHeaderContainer,
  EmployeeRows,
  EmployeeFilters,
} from "../components";
import { Delete } from "@mui/icons-material";

import { certifications } from "../constants/certifications";

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

const Certification = () => {
  const [loading, setLoading] = useState(false);
  const [fileSelected, setFileSelected] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  // Filters
  const [certificationFilter, setCertificationFilter] = useState({
    value: "All",
  });
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get("/api/employees").then((response) => {
      setEmployees(Object.values(response.data));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (fileSelected) {
      uploadFile(fileSelected).then((uploaded) => {
        if (uploaded < 299) {
          axios.get("/api/employees").then((response) => {
            setEmployees(Object.values(response.data));
          });
        }
      });
    }
  }, [fileSelected]);

  useEffect(() => {
    if (employees.length) {
      const departments = employees.map((employee) => employee.department);
      setDepartments([...new Set(departments)]);
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
      <EmployeeRows
        employees={filteredEmployees}
        selectedEmployee={selectedEmployee}
        setSelectedEmployee={setSelectedEmployee}
      />
    </>
  );
};

export default Certification;
