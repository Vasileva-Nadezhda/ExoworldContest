export function weightedRandomString(items: Array<string>, weights: Array<number>) {
    let i;
    let newWeights = [weights[0]];
    for (i = 1; i < items.length; ++i) {
        newWeights[i] = weights[i] + newWeights[i - 1];
    }
    const randomNumber = Math.random() * newWeights[newWeights.length - 1];
    for (i = 0; i < newWeights.length; ++i) {
        if (newWeights[i] > randomNumber)
            break;
    }
    return items[i];
}

export function weightedRandomBoolean(items: Array<boolean>, weights: Array<number>) {
    let i;
    let newWeights = [weights[0]];
    for (i = 1; i < items.length; ++i) {
        newWeights[i] = weights[i] + newWeights[i - 1];
    }
    const randomNumber = Math.random() * newWeights[newWeights.length - 1];
    for (i = 0; i < newWeights.length; ++i) {
        if (newWeights[i] > randomNumber)
            break;
    }
    return items[i];
}