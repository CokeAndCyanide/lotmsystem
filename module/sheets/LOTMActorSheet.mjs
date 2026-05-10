import { systemPath } from "../helpers/constants.mjs";

const { api, sheets } = foundry.applications;

export class LOTMActorSheet extends api.HandlebarsApplicationMixin(sheets.ActorSheet) {
    static DEFAULT_OPTIONS = {
        id: "actor-sheet",
        classes: ["lotmsystem", "actor", "standard-form"],
        form: {
            submitOnChange: true
        },
        position: {
            width: 600,
            height: "auto"
        },
        window: {
            title: "LOTMSYSTEM.form.title"
        }
    }

    /*
    get title() {
        return `My module: ${game.i18n.localize(this.options.window.title)}`
    }
    */

    static PARTS = {
        main: {
            template: `${systemPath}/module/templates/actors/actor-sheet.html`
        }
    }

    get actor() {
        return this.document;
    }

    _getTemplatePath() {
        return `${systemPath}/module/templates/actors/actor-${this.actor.type}-sheet.html`;
    }

    async _prepareContext(options) {
        const context = await super._prepareContext(options);
        
        const actorData = this.actor;

        context.actor = actorData;
        context.items = actorData.items;
        context.system = actorData.system;
        context.flags = actorData.flags;

        if (actorData.type == "character") {
            this._prepareItems(context);
            this._prepareCharacterData(context);
        }

        if (actorData.type == "npc") {
            this._prepareItems(context);
        }

        context.rollData = actorData.getRollData();

        context.effects = prepareActiveEffectCategories(this.actor.AllApplicableEffects());

        return context;
    }

    _prepareItems(context) {
        const gear = [], features = [];
        
        for (let i of context.items){
            i.img = i.img || DEFAULT_TOKEN;

            switch (i.type) {
                case "item":
                    gear.push(i);
                    break;
                case "feature":
                    features.push(i);
                    break;
            }
        }

        context.actor.gear = gear;
        context.actor.features = features;
    }


    _prepareCharacterData(context) {
        for (let [key, value] of Object.entries(context.system.stats)) {
            value.label = game.i18n.localize(CONFIG.LOTMSYSTEM.stats[key]) ?? key;
        }
    }

    async _onRender(context, options) {
        await super._onRender(context, options);
    }

    async _onItemCreate(event) {
        event.preventDefault();
        const header = event.currentTarget;
        const type = header.dataset.type;
        const data = duplicate(header.dataset);
        const name = `New ${type.capitalize()}`;
        const itemData = {
            name: name,
            type: type,
            data: data
        };
        delete itemData.data["type"];

        return await Item.create(itemData, {parent: this.actor});
    }
}

function prepareActiveEffectCategories() {
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