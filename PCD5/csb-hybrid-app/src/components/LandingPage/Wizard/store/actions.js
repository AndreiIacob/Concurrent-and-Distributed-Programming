export const SET_MASTER_CSB_SEED = "SET_MASTER_CSB_SEED";
export const TOGGLE_SAVE_SEED = "TOGGLE_SAVE_SEED";

export const setMasterCSBSeed = (seed) => {
    return {
        type: SET_MASTER_CSB_SEED,
        seed: seed
    };
};

export const toggleSaveSeedConsent = () => {
    return {
        type: TOGGLE_SAVE_SEED
    };
};