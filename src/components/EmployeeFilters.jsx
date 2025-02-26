import styled from "styled-components";
import theme from "../constants/theme";

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 1rem;
  width: 80vw;

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
  flex-grow: 1;
  font-size: 1.2 rem;
  margin: 0;
  min-width: 100px;
  padding: 5px 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${theme.colors.accentColor};
    border-color: ${theme.colors.accentColor};
    color: #fff;
  }
`;

const EmployeeFilters = ({
  categories,
  departments,
  selectedDepartmentFilter,
  selectedTrainingFilter,
  setSelectedTrainingFilter,
  setSelectedDepartmentFilter,
}) => {
  return (
    <>
      <FilterContainer>
        <Button
          active={selectedDepartmentFilter === "All"}
          onClick={() => setSelectedDepartmentFilter("All")}
        >
          {"   "}All{"   "}
        </Button>
        {departments &&
          departments.map((department) => (
            <Button
              active={selectedDepartmentFilter === department}
              key={department}
              onClick={() => setSelectedDepartmentFilter(department)}
            >
              {department}
            </Button>
          ))}
      </FilterContainer>
      <FilterContainer>
        <Button
          active={selectedTrainingFilter.value === "all"}
          onClick={() => setSelectedTrainingFilter({ value: "all" })}
        >
          {"   "}All{"   "}
        </Button>
        {categories &&
          categories.map((trainingCategory) => (
            <Button
              active={selectedTrainingFilter.value === trainingCategory.value}
              key={trainingCategory.value}
              onClick={() => setSelectedTrainingFilter(trainingCategory)}
            >
              {trainingCategory.text}
            </Button>
          ))}
      </FilterContainer>
    </>
  );
};

export default EmployeeFilters;
