const classNames = (classes) => {
    const outputClassName = [];

    for (const [key, value] of Object.entries(classes)) {
        if (!value) continue;

        outputClassName.push(key);
    }

    if (!outputClassName.length) return undefined;

    return outputClassName.join(' ');
};

export default classNames;
