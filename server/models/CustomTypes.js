const FertilityStatus = {
    FERTILE: "fertile",
    SPAYED: "spayed",
    NEUTERED: "neutered"
};
  
const Sex = {
MALE: "M",
FEMALE: "F",
UNDETERMINED: "U"
};

const Status = {
ON_CAMPUS: 'on-campus',
ADOPTED: 'adopted',
OWNED: 'owned',
RAINBOW_BRIDGE: 'rainbow-bridge',
// add transient
};

const Species = {
DOG: 'dog',
CAT: 'cat'
};

const FemaleAnimalStatus = {
    LACTATING : 'lactating',
    PREGNANT: 'pregnant',
    NORMAL: 'normal'

}

const EmptyAttributeFiller = {
    UNKNOWN: 'unknown',
    NA: 'NA'
}

module.exports =  {Species, Sex, Status, FemaleAnimalStatus, EmptyAttributeFiller}

