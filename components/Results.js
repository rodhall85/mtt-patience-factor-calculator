import fetch from 'isomorphic-fetch';
import { useEffect, useState } from 'react';

const Results = ({tournament, setEnrichedTournament}) => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const calculatePatienceFactor = async () => {
            const response = await fetch('/api/calculate', {
                method: 'POST',
                body: JSON.stringify(tournament),
            });
            const data = await response.json();
            console.log('et', data.enrichedStructure);
            setResults(data);
            setEnrichedTournament({ ...tournament, levels: data.enrichedStructure });
        };
        
        calculatePatienceFactor();
    }, [tournament, setEnrichedTournament]);
    
    const { name, handsPerLevel, orbitsPerLevel, blindOffTime, patienceFactor } = results;
    return (
        <>
            <h1>{name}</h1>
            <div>Hands per level: {handsPerLevel}</div>
            <div>Orbits per level: {orbitsPerLevel}</div>
            <div>Blind off time: {blindOffTime}</div>
            <div>Patience Factor: {patienceFactor}</div>
        </>
    )
};

export default Results;
