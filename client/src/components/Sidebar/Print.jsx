import React, { useState } from 'react';
import { IoIosPrint } from 'react-icons/io';

const PrintMap = ({ mapPropertyId }) => {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true);
        const response = await fetch(`/api/download_map/${mapPropertyId}/`);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'map.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        setLoading(false);
    };

    return (
        <button onClick={handleDownload} disabled={loading}>
            {loading ? 'Generating...' : 'Print Map'}
            <IoIosPrint className='align-center'/>
        </button>
    );
};

export default PrintMap;
