export default class LOTMItemSheet extends ItemSheet {
    static get defaultOptions(){
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["lotmsystem", "sheet", "item"],
            width: 600,
            height: 400,
            submitOnChange: true,
            submitOnClose: true,
            closeOnSubmit: false
        });
    }

    get template() {
        return `systems/lotmsystem/templates/sheets/items/item-${this.item.type}-sheet.html`;
    }

    getData() {
        const context = super.getData();

        context.config = CONFIG.lotmsystem;

        return context;
    }
}