import { useState } from 'react';

import DataField from './DataField';

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
            <DataField value={levelValues.sb} handleChange={handleChange} name="sb" />
            <DataField value={levelValues.bb} handleChange={handleChange} name="bb" />
            <DataField value={levelValues.ante} handleChange={handleChange} name="ante" />
            <DataField value={levelCost} handleChange={handleChange} name="levelCost" />
            <DataField value={totalCost} handleChange={handleChange} name="totalCost" />
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

    const DataFieldWithLabel = ({label, value, handleChange, name, type = "text"}) => {
        const [ vv, setVv ] = useState(value);

        const valueChanged = (e) => {
            setVv(e.target.value);
            //handleChange(e);
        };
        return (
            <div className="flex">
                <div>{label}</div>
                <DataField
                    type={type}
                    value={vv}
                    handleChange={valueChanged}
                    handleBlur={() => handleChange(vv)}
                    name={name} />
            </div>
        );
    };
    return (
        <>
            <DataFieldWithLabel
                label="Tournament name: "
                value={tournament.name}
                handleChange={(value) => setTournament({...tournament, name: value})}
                name="tournamentName" />

            <DataFieldWithLabel
                label="Players per table: "
                value={tournament.playersPerTable}
                handleChange={(value) => setTournament({...tournament, playersPerTable: value})}
                name="playersPerTable" />

            <DataFieldWithLabel
                type="checkbox"
                label="Online: "
                value={tournament.online}
                handleChange={(value) => setTournament({...tournament, online: value})}
                name="online" />

            <DataFieldWithLabel
                type="checkbox"
                label="Rebuy: "
                value={tournament.rebuy}
                handleChange={(value) => setTournament({...tournament, rebuy: value})}
                name="rebuy" />
                
            <DataFieldWithLabel
                label="Hands per hour: "
                value={tournament.handsPerHour}
                handleChange={(value) => setTournament({...tournament, handsPerHour: value})}
                name="handsPerHour" />

            <DataFieldWithLabel
                label="Starting stack: "
                value={tournament.startingStack}
                handleChange={(value) => setTournament({...tournament, startingStack: value})}
                name="startingStack" />

            <DataFieldWithLabel
                label="Minutes per level: "
                value={tournament.minutesPerLevel}
                handleChange={(value) => setTournament({...tournament, minutesPerLevel: value})}
                name="minutesPerLevel" />

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
