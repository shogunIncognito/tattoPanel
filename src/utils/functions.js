import { apiResponses } from "./apiResponses";

export function getApiErrorMessage(errorMessages) {
    const finalMessage = Array.isArray(errorMessages) ? errorMessages.reduce((acc, curr) => {
        const msg = apiResponses[curr];

        if (!msg) {
            return acc;
        }

        return acc + apiResponses[curr] + ". ";
    }, "") : apiResponses[errorMessages];

    return finalMessage;
}

export function deleteEmptyValues(obj) {
    if (!obj) return {}
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => {
            if (value === null || value === undefined || value === "") {
                return false;
            }
            if (Array.isArray(value) && value.length === 0) {
                return false;
            }
            if (typeof value === "object" && Object.keys(value).length === 0) {
                return false;
            }
            return true;
        })
    );
}

export function checkIfValidsSocialsURL(url) {
    const socials = Object.keys(url) || [];

    const invalidSocials = socials.filter((social) => {
        // si esta vacia la url, quiere decir que no va a agregar la red social
        if (url[social] === "") {
            return false;
        }

        const socialSplit = url[social].split(".")[1];
        return !url[socialSplit]
    });

    return invalidSocials.length === 0 ? { message: '', valid: true } : { valid: false, message: `La url de ${invalidSocials.join(", ")} no es válida` };
}