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
function getStringImage(name){
    return `https://poulpi41.github.io/DQMJ2/images/${name}.png`;
}
function compareSynthProp(a, b){
    return propVal[synthProp[b['st']]][synthProp[b['rt']]] - propVal[synthProp[a['st']]][synthProp[a['rt']]];
}
export default {propVal, getStringImage, compareSynthProp};