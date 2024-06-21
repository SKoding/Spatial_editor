import React, { useContext, useState, useMemo, useCallback } from 'react';
import Select from 'react-select';
import { EditContext } from '../../Context/EditDataContext';

const LayerStyleControls = () => {
    const { data, kapData, taiData, taiFeatData, mokData, mokFeatData, updateFeatureStyle} = useContext(EditContext);
    const [selectedFeature, setSelectedFeature] = useState(null);
    const [selectedFeat, setSelectedFeat] = useState(null);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [colorKap, setColorKap] = useState('#3388ff');
    const [colorKapFeat, setColorKapFeat] = useState('#3388ff');

    const handleApplyStyle = useCallback(() => {
        if (selectedFeature) {
            const style = { color };
            updateFeatureStyle(selectedFeature.value, style);
        }
    }, [selectedFeature, colorKap, updateFeatureStyle]);
    
    
    const featureOptionsKap = useMemo(() => {
        return data ? data.features.map(feature => ({
            value: feature.properties.feature,
            label: `${feature.properties.feature} (${feature.properties.field_code})`
        })) : [];
    }, [data]);

    const featureOptionsKapFeat = useMemo(() => {
        return kapData ? kapData.features.map(feature => ({
            value: feature.properties.name,
            label: `${feature.properties.name}`
        })) : [];
    }, [kapData]);

    const featureOptionsTai = useMemo(() => {
        return taiData ? taiData.features.map(feature => ({
            value: feature.properties.feature,
            label: `${feature.properties.feature} (${feature.properties.field_code})`
        })) : [];
    }, [taiData]);

    return (
        <div >
            <h2>Feature Styling Controls</h2>
            <Select
                options={featureOptionsKap}
                onChange={setSelectedFeature}
                value={selectedFeature}
                placeholder="Select Feature"
            />
            <div className='mt-4' >
                <label className='align-middle'>Color: </label>
                <input type="color" value={colorKap} onChange={(e) => setColorKap(e.target.value)} />
            </div>
            <Select
                options={featureOptionsKapFeat}
                onChange={setSelectedFeat}
                value={selectedFeat}
                placeholder="Select Feature"
            />
            <div className='mt-4' >
                <label className='text-middle'>Color: </label>
                <input type="color" className='rounded w-16' value={colorKapFeat} onChange={(e) => setColorKapFeat(e.target.value)} />
            </div>
            <button className='mt-4 text-white bg-blue-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={handleApplyStyle}>Apply Style</button>
        </div>
    );
};

export default LayerStyleControls;
