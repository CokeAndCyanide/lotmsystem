export class LOTMActor extends Actor {
    prepareData() {
        super.prepareData();
    }

    prepareBaseData() {};

    prepareDerivedData() {
        const actorData = this;
        const systemData = actorData.system;
        const flags = actorData.flags.lotmsystem || {};

        this._prepareCharacterData(actorData);
        this._prepareNpcData(actorData);
    }

    _prepareCharacterData(actorData) {
        if (actorData.type != "character") return;

        const systemData = actorData.system;

        // asigns modifiers
        for (let [key, stat] of Object.entries(systemData.stats)) {
            stat.mod = Math.floor((stat.value - 10) / 2);
        }
    }

    _prepareNpcData(actorData) {
        if ( actorData.type != "npc" ) return;

        const systemData = actorData.system;

        // assigns an XP value
        systemData.xp = (systemData.cr * systemData.cr) * 100;
    }

    getRollData() {
        const data = super.getRollData();

        // prepare character rolls
        this._getCharacterRollData(data);
        this._getNPCRollData(data);

        return data;
    }

    _getCharacterRollData(data) {
        if (this.type != "character") return;

        if (data.stats) {
            for (let[key, value] of Object.entries(data.stats)) {
                data[key] = foundry.utils.deepClone(value);
            }
        }
        
        if (data.attributes.sequence) {
            data.sequence = data.attributes.sequence.value ?? 10;
        }
    }

    _getNPCRollData(data) {
        if (this.type != "npc") return;
    }
}