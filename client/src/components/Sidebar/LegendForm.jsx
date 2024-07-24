import React, { useState } from 'react';

const LegendForm = () => {
    const [title, setTitle] = useState('');
    const [color, setColor] = useState('#000000');
    const [legendText, setLegendText] = useState('');
    const [scale, setScale] = useState(1.0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/map_properties/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, color, legend_text: legendText, scale }),
        });
        const data = await response.json();
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label>
                Color:
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
            </label>
            <label>
                Legend Text:
                <input type="text" value={legendText} onChange={(e) => setLegendText(e.target.value)} />
            </label>
            <label>
                Scale:
                <input type="number" value={scale} onChange={(e) => setScale(e.target.value)} step="0.1" />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default LegendForm;
