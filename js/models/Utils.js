import synthProp from './fetchers/DQMJ2/synthProp.js';

const propVal = {
    "generic": {
        "rank decrease": 1,
        "same rank": 2,
        "rank increase": 3
    },
    "special": {
        "rank decrease": 4,
        "same rank": 5,
        "rank increase": 6
    }
}
const gameVersions = [
    "DQMJ2",
    "DQMJ2Pro"
];
function getStringImage(name){
    return `https://poulpi41.github.io/resources/DQMJ2_InComon/images/${name}.png`;
}
function compareSynthProp(a, b){
    return propVal[synthProp[b['st']]][synthProp[b['rt']]] - propVal[synthProp[a['st']]][synthProp[a['rt']]];
}
export default {propVal, getStringImage, compareSynthProp, gameVersions};