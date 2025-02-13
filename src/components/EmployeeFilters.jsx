import styled from "styled-components";
import theme from "../constants/theme";

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;

  button:first-child {
    border-radius: 10px 0 0 10px;
  }

  button:last-child {
    border-left: none;
    border-radius: 0 10px 10px 0;
  }
`;

const Button = styled.button`
  background-color: ${(props) =>
    props.active ? theme.colors.accentColor : "#eee"};
  border: 1px solid
    ${(props) => (props.active ? theme.colors.accentColor : "#ccc")};
  border-left: none;
  border-radius: 0;
  color: ${(props) => (props.active ? "#fff" : "#333")};
  cursor: pointer;
  margin: 5px 0;
  padding: 5px 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${theme.colors.accentColor};
    border-color: ${theme.colors.accentColor};
    color: #fff;
  }
`;

const EmployeeFilters = ({
  certifications,
  certificationFilter,
  setCertificationFilter,
  departments,
  departmentFilter,
  setDepartmentFilter,
  employees,
}) => {
  if (employees.length === 0) return <div>No available employees</div>;

  return (
    <>
      <FilterContainer>
        <Button
          active={departmentFilter === "All"}
          onClick={() => setDepartmentFilter("All")}
        >
          {"   "}All{"   "}
        </Button>
        {departments &&
          departments.map((department) => (
            <Button
              active={departmentFilter === department}
              key={department}
              onClick={() => setDepartmentFilter(department)}
            >
              {department}
            </Button>
          ))}
      </FilterContainer>
      <FilterContainer>
        <Button
          active={certificationFilter.value === "All"}
          onClick={() => setCertificationFilter({ value: "All" })}
        >
          {"   "}All{"   "}
        </Button>
        {certifications &&
          certifications.map((certification) => (
            <Button
              active={certificationFilter.value === certification.value}
              key={certification.value}
              onClick={() => setCertificationFilter(certification)}
            >
              {certification.text}
            </Button>
          ))}
      </FilterContainer>
    </>
  );
};

export default EmployeeFilters;
