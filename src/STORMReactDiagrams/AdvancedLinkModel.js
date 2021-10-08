import {DefaultLinkModel} from "storm-react-diagrams";

export class AdvancedLinkModel extends DefaultLinkModel {
    constructor() {
        super({
            type: 'advanced', // <-- here we give it a new type
            width: 10 // we specifically want this to also be width 10
        });
    }
}