import React, { useContext, useMemo } from 'react';
import Select from 'react-select';
import { EditContext } from '../../Context/EditDataContext';

const DivisionFilter = () => {
    const { data, selectedDivision, setSelectedDivision } = useContext(EditContext);
    const divisionOptions = useMemo(() => {
        if (!data) return [];
        const divisions = Array.from(new Set(data.features.map(feature => feature.properties.division)));
        return divisions.map(division => ({ value: division, label: division }));
    }, [data]);
    console.log(selectedDivision)

    return (
        <div>
            <h2>Filter by Division</h2>
            <Select
                options={divisionOptions}
                onChange={setSelectedDivision}
                value={selectedDivision}
                placeholder="Select Division"
            />
        </div>
    );
};

export default DivisionFilter;
