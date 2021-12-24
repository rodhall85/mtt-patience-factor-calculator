import { useState } from 'react';

import NumberField from './NumberField';

const Level = ({level, sb, bb, ante, levelCost, totalCost, levelChanged}) => {
    const [levelValues, setLevelValues] = useState({sb, bb, ante});

    const handleChange = (e) => {
        const newValues = {
            ...levelValues,
        }
        newValues[e.target.name] = parseInt(e.target.value, 10) || 0;
        setLevelValues(newValues);
        levelChanged(level, newValues);
    };

    return (
        <div className="flex">
            <div>{level}</div>
            <NumberField value={levelValues.sb} handleChange={handleChange} name="sb" />
            <NumberField value={levelValues.bb} handleChange={handleChange} name="bb" />
            <NumberField value={levelValues.ante} handleChange={handleChange} name="ante" />
            <NumberField value={levelCost} handleChange={handleChange} name="levelCost" />
            <NumberField value={totalCost} handleChange={handleChange} name="totalCost" />
        </div>
    );
};

const Editor = ({tournament, setTournament, enrichedTournament}) => {
    console.log('tour', enrichedTournament);
    if (!tournament) {
        return <div>Loading...</div>;
    }

    const { levels } = enrichedTournament || tournament;
    const levelChanged = (level, {sb, bb, ante}) => {
        console.log('level changed');
        const newTournament = {
            ...tournament,
            levels: [
                ...levels.slice(0, level - 1),
                {
                    ...levels[level - 1],
                    sb,
                    bb,
                    ante,
                },
                ...levels.slice(level),
            ]
        };
        setTournament(newTournament);
        console.log('nt', newTournament);
    };

    return (
        <>
            { levels && (
                <>
                    <div className="flex">
                        <div>Level</div>
                        <div>SB</div>
                        <div>BB</div>
                        <div>Ante</div>
                        <div>Level Cost</div>
                        <div>Total Cost</div>
                    </div>
                    {levels.map(({ sb, bb, ante, levelCost, totalCost }, index) => (
                        <Level
                            key={`level-${index}`}
                            level={index + 1}
                            sb={sb}
                            bb={bb}
                            ante={ante}
                            levelCost={levelCost}
                            totalCost={totalCost}
                            levelChanged={levelChanged}
                        />
                    ))}
                </>
            )}
        </>
    );
};

export default Editor;
