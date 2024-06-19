import React, { useContext, useState } from 'react';
import Select from 'react-select';
import { EditContext } from '../../Context/EditDataContext';

const LayerStyleControls = () => {
    const { data, updateLayerStyles } = useContext(EditContext);
    const [selectedLayers, setSelectedLayers] = useState([]);
    const [color, setColor] = useState('#3388ff');
    const [weight, setWeight] = useState(2);
    const [fillOpacity, setFillOpacity] = useState(0.2);

    const handleApplyStyle = () => {
        const layerIds = selectedLayers.map(layer => layer.value);
        const style = { color, weight, fillOpacity };
        updateLayerStyles(layerIds, style);
    };

    const layerOptions = data ? data.features.map((feature) => ({
        value: feature.properties.division,
        label: feature.properties.feature || feature.id
    })) : [];

    return (
        <div>
            <h2>Layer Styling Controls</h2>
            <Select
                isMulti
                options={layerOptions}
                onChange={setSelectedLayers}
                value={selectedLayers}
                placeholder="Select Layers"
            />
            <div>
                <label>Color: </label>
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
            <div>
                <label>Weight: </label>
                <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
            </div>
            <div>
                <label>Fill Opacity: </label>
                <input type="number" step="0.1" value={fillOpacity} onChange={(e) => setFillOpacity(Number(e.target.value))} />
            </div>
            <button onClick={handleApplyStyle}>Apply Style</button>
        </div>
    );
};

export default LayerStyleControls;
