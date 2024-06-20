import React, { useContext, useState, useMemo, useCallback } from 'react';
import Select from 'react-select';
import { EditContext } from '../../Context/EditDataContext';

const LayerStyleControls = () => {
    const { data, updateFeatureStyle} = useContext(EditContext);
    const [selectedFeature, setSelectedFeature] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [color, setColor] = useState('#3388ff');

    const handleApplyStyle = useCallback(() => {
        if (selectedFeature) {
            const style = { color };
            updateFeatureStyle(selectedFeature.value, style);
        }
    }, [selectedFeature, color, updateFeatureStyle]);
    
    
    const featureOptions = useMemo(() => {
        return data ? data.features.map(feature => ({
            value: feature.id,
            label: `${feature.properties.feature} (${feature.properties.division})`
        })) : [];
    }, [data]);

    return (
        <div>
            <h2>Feature Styling Controls</h2>
            <Select
                options={featureOptions}
                onChange={setSelectedFeature}
                value={selectedFeature}
                placeholder="Select Feature"
            />
            <div>
                <label>Color: </label>
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
            <button onClick={handleApplyStyle}>Apply Style</button>
        </div>
    );
};

export default LayerStyleControls;
