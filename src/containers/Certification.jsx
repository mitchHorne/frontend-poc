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

import { certifications } from "../constants/certifications";

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
    }
  }, [fileSelected]);

  useEffect(() => {
    if (employees.length) {
      const departments = employees.map((employee) => employee.department);
      setDepartments([...new Set(departments)]);
      setFilteredEmployees(employees);
    }
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
