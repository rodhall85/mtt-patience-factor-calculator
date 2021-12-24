const calculate = ({name, handsPerHour, minutesPerLevel, playersPerTable, startingStack, levels, rebuy }) => {
    const handsPerLevel = handsPerHour / 60 * minutesPerLevel;
    const orbitsPerLevel = handsPerLevel / playersPerTable;

    let totalCost = 0;
    let levelOfDeath = 0;
    //console.log('levels', levels);

    const enrichedStructure = levels.map((level, index) => {
        const { sb, bb, ante } = level;
        const levelCost = (sb + bb + ante) * orbitsPerLevel;
        totalCost += levelCost;
        //console.log('totalCost', totalCost, index);
        if (levelOfDeath === 0 && totalCost > startingStack) {
            //console.log('levelOfDeath', index);
            levelOfDeath = index;
        }

        return {
            ...level,
            levelCost,
            totalCost,
        }
    });

    const chipsBeforeDeath =  startingStack - (enrichedStructure[levelOfDeath - 1].totalCost);
    const percentOfDeathLevel = chipsBeforeDeath / enrichedStructure[levelOfDeath].levelCost;
    const minutesOfDeathLevel = percentOfDeathLevel * minutesPerLevel;

    //console.log('bb', (levelOfDeath), minutesPerLevel, minutesOfDeathLevel)
    const blindOffTime = ((levelOfDeath) * minutesPerLevel + minutesOfDeathLevel) / 60;
    const patienceFactor = blindOffTime * blindOffTime * (rebuy ? 0.8 : 1);

    //console.log("levelOfDeath", chipsBeforeDeath, levelOfDeath, enrichedStructure, minutesOfDeathLevel);

    return {
        name,
        handsPerLevel,
        orbitsPerLevel: Math.round(orbitsPerLevel * 100) / 100,
        blindOffTime: Math.round(blindOffTime * 100) / 100,
        patienceFactor: Math.round(patienceFactor * 100) / 100,
        enrichedStructure,
    };
};

export default calculate;
