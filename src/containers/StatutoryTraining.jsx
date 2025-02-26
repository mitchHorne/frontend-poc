import { useState, useEffect } from "react";
import axios from "axios";

import { Tooltip } from "react-tooltip";
import { Delete } from "@mui/icons-material";

import {
  UploadInput,
  LoadingComponent,
  PageHeaderContainer,
  EmployeeRows,
  EmployeeFilters,
  CertificationDashboard,
} from "../components";

import {
  GET_STATUTORY_TRAINING,
  IMPORT_STATUTORY_TRAINING,
} from "../constants/statutoryTraining/api";
import { statutoryTrainingCategories } from "../constants/statutoryTraining/categories";
import { getDisplayDateAndExpiredStatus, getTextFromType } from "../utils";

async function uploadFile(file) {
  const formData = new FormData();
  formData.append("data_file", file);

  try {
    const response = await axios.post(IMPORT_STATUTORY_TRAINING, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.status;
  } catch (error) {
    return error;
  }
}

function formatEmployees(employees) {
  return employees.map((employee) => {
    if (!employee.statutoryTraining.length) return employee;

    const statutoryTraining = employee.statutoryTraining.map((training) => {
      const { type, expiry } = training;
      const { displayDate, expired } = getDisplayDateAndExpiredStatus(expiry);
      const text = getTextFromType(type);

      return { text, type, expiry: displayDate, expired };
    });

    return { ...employee, statutoryTraining };
  });
}

function saveExpiryStatus(training, status, all) {
  training.count++;
  all.count++;

  if (!status) {
    training.valid++;
    all.valid++;
    return;
  }
  training.expired++;
  all.expired++;
}

function createStatutoryTrainingDashboardBreakdown(employees) {
  const statutoryTrainingStructure = {
    count: 0,
    valid: 0,
    expired: 0,
  };

  const all = { ...statutoryTrainingStructure },
    fire = { ...statutoryTrainingStructure },
    firstAid = { ...statutoryTrainingStructure },
    forklift = { ...statutoryTrainingStructure },
    mobileCrane = { ...statutoryTrainingStructure },
    overheadCrane = { ...statutoryTrainingStructure },
    siteRep = { ...statutoryTrainingStructure },
    tractor = { ...statutoryTrainingStructure },
    workingHeights = { ...statutoryTrainingStructure };

  employees.forEach((employee) => {
    employee.statutoryTraining.forEach((training) => {
      const { type, expired } = training;

      switch (type) {
        case "fire":
          saveExpiryStatus(fire, expired, all);
          break;
        case "firstAid":
          saveExpiryStatus(firstAid, expired, all);
          break;
        case "forklift":
          saveExpiryStatus(forklift, expired, all);
          break;
        case "mobileCrane":
          saveExpiryStatus(mobileCrane, expired, all);
          break;
        case "overheadCrane":
          saveExpiryStatus(overheadCrane, expired, all);
          break;
        case "siteRep":
          saveExpiryStatus(siteRep, expired, all);
          break;
        case "tractor":
          saveExpiryStatus(tractor, expired, all);
          break;
        case "workingHeights":
          saveExpiryStatus(workingHeights, expired, all);
          break;
      }
    });
  });

  return {
    all,
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
  const [statutoryTrainingDashboard, setStatutoryTrainingDashboard] =
    useState();

  // Filters
  const [selectedTrainingFilter, setSelectedTrainingFilter] = useState({
    value: "all",
  });
  const [selectedDepartmentFilter, setSelectedDepartmentFilter] =
    useState("All");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get(GET_STATUTORY_TRAINING).then((response) => {
      setEmployees(formatEmployees(response.data));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (fileSelected) {
      uploadFile(fileSelected).then((uploaded) => {
        if (uploaded < 299) {
          axios.get(GET_STATUTORY_TRAINING).then((response) => {
            setEmployees(formatEmployees(Object.values(response.data)));
          });
        }
      });
    }
  }, [fileSelected]);

  useEffect(() => {
    if (employees.length) {
      const departments = employees.map((employee) => employee.department);
      setDepartments([...new Set(departments)]);
      setStatutoryTrainingDashboard(
        createStatutoryTrainingDashboardBreakdown(employees)
      );
      return setFilteredEmployees(employees);
    }

    setDepartments([]);
    setFilteredEmployees([]);
  }, [employees]);

  useEffect(() => {
    if (employees.length) {
      let filterEmployees = employees;

      if (selectedTrainingFilter.value !== "all")
        filterEmployees = filterEmployees.filter((employee) =>
          employee.statutoryTraining.some(
            (training) => training.type === selectedTrainingFilter.value
          )
        );

      if (selectedDepartmentFilter !== "All")
        filterEmployees = filterEmployees.filter(
          (employee) => employee.department === selectedDepartmentFilter
        );

      if (statusFilter !== "all")
        filterEmployees = filterEmployees.filter((employee) =>
          employee.statutoryTraining.some((training) => {
            if (statusFilter === "expired") return training.expired;
            return !training.expired;
          })
        );

      setStatutoryTrainingDashboard(
        createStatutoryTrainingDashboardBreakdown(filterEmployees)
      );
      setFilteredEmployees(filterEmployees);
    }
  }, [selectedTrainingFilter, selectedDepartmentFilter, statusFilter]);

  return (
    <>
      <Tooltip id="my-tooltip" place="right" />
      {loading && <LoadingComponent />}

      <PageHeaderContainer>
        <h1 className="my-anchor-element">Statutory Training</h1>

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
        categories={statutoryTrainingCategories}
        departments={departments}
        selectedDepartmentFilter={selectedDepartmentFilter}
        selectedTrainingFilter={selectedTrainingFilter}
        setSelectedTrainingFilter={setSelectedTrainingFilter}
        setSelectedDepartmentFilter={setSelectedDepartmentFilter}
      />
      <CertificationDashboard
        selectedTrainingFilter={selectedTrainingFilter}
        setStatusFilter={setStatusFilter}
        statutoryTrainingDashboard={statutoryTrainingDashboard}
        statusFilter={statusFilter}
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
