import React, { useContext } from 'react';
import Select from 'react-select';
import { EditContext } from '../../Context/EditDataContext';
import './DivisionFilter.css'; // Import CSS file for styling

const DivisionFilter = () => {
  const { setFilter } = useContext(EditContext);

  const options = [
    { value: '', label: 'Select Data' },
    { value: 'taiData', label: 'Taito Division' },
    { value: 'mokData', label: 'Mokong Division' },
    { value: 'kapData', label: 'Kapsiwon Division' },
  ];

  const handleFilterChange = (selectedOption) => {
    setFilter(selectedOption.value);
  };

  return (
    <div className="division-filter">
      <h3 className='text-center mb-2 font-semibold'>Filter Data</h3>
      <Select options={options} onChange={handleFilterChange} />
    </div>
  );
};

export default DivisionFilter;
