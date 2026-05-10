// import document classes
// import { LOTMItem } from "./documents/item.mjs";
import { LOTMActor } from "./documents/actor.mjs";
// import sheet classes
// import { LOTMItemSheet } from "./sheets/LOTMItemSheet.mjs";
import { LOTMActorSheet } from "./sheets/LOTMActorSheet.mjs";
// import extra/lib
// import { preloadHandlebarsTemplates } from "./helpers/templates.mjs"
import { LOTMSYSTEM } from "./helpers/config.mjs";


Hooks.once("init", function() {
    // Utility classes
    game.lotmsystem = {
        LOTMActor,
        //LOTMItem,
        // rollItemMacro
    };

    // constant config
    CONFIG.LOTMSYSTEM = LOTMSYSTEM;

    // Initiative formula
    CONFIG.Combat.initiative = {
        formula: "1d20 + @stats.dex.mod",
        decimals: 2
    };

    // Document Classes
    CONFIG.Actor.documentClass = LOTMActor;
    // CONFIG.Item.documentClass = LOTMItem;

    CONFIG.ActiveEffect.legacyTransferral = false;

    // Register sheet application classes
    console.log("loading Actor Sheet...")
    foundry.documents.collections.Actors.registerSheet("lotmsystem", LOTMActorSheet, {
        types: ["character", "npc"],
        makeDefault: true,
        label: "LOTMSYSTEM.SheetLabels.ActorSheet"
    });
    console.log(`LotmActorSheet: ${LOTMActorSheet}`);
    console.log(`Config actor classes: ${CONFIG.Actor.sheetClasses}`)
    console.log(`Actor Sheet: ${foundry.documents.collections.Actors.registeredSheets}`);
    /* Items.registerSheet("lotmsystem", LOTMItemSheet, {
        makeDefault: true,
        label: "LOTMSYSTEM.SheetLabels.Item"
    }); */

    // Preload handlebar templates
    // return preloadHandlebarsTemplates();
});