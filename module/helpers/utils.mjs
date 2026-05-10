export function prepareActiveEffectCategories() {
    const categories = {
        temporary: {
            type: "temporary",
            label: game.i18n.localize(`LOTMSYSTEM.Effect.Temporary`),
            effects: []
        },
        passive: {
            type: "passive",
            label: game.i18n.localize(`LOTMSYSTEM.Effect.Passive`),
           effects: []
        },
        inactive: {
            type: "inactive",
            label: game.i18n.localize(`LOTMSYSTEM.Effect.Inactive`),
            effects: []
        }
    };

    for (let e of effects) {
        if (e.disabled) categories.inactive.push(e);
        else if (e.isTemporary) categories.temporary.push(e);
        else categories.passive.push(e);
    }

    return categories;
}