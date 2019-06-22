import TableSize from './TableSize';
import Template from './Template';

export default class EngravingTemplate {
    constructor(
        private tablesize: TableSize,
        private template: Template,
        private version?: string
        // Would private version: string = "2.0" be better? The value will likely
        // always be "2.0", but I want to let them specify it just in case.
    ) {}
    create () {
        if ( this.version == null) {
            this.version = "2.0"
        }
        return {
            "@": {
                "version": this.version || "2.0"
            },
            "table_size": this.tablesize,
            "template": this.template
        };
    }
}
