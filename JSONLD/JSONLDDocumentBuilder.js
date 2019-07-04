"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JSONLDconfig_1 = require("./JSONLDconfig");
class JSONLDDocumentBuilder {
    constructor(tile, observationTimeQuery) {
        this.json = "";
        this.zoom = tile.zoom;
        this.latitudeTile = tile.y;
        this.longitudeTile = tile.x;
        this.observationTimeQuery = observationTimeQuery;
    }
    buildTilesInfo() {
        let ti = "";
        ti += '"@id":"' + JSONLDconfig_1.JSONLDConfig.openobeliskAddress + this.zoom.toString() + '/' + this.longitudeTile.toString() + '/' + this.latitudeTile.toString() + '/' + this.observationTimeQuery + '"';
        ti += ',"tiles:zoom":' + this.zoom.toString();
        ti += ',"tiles:longitudeTile":' + this.longitudeTile.toString();
        ti += ',"tiles:latitudeTile":' + this.latitudeTile.toString();
        ti += ',"ts:observationTimeQuery":"' + this.observationTimeQuery + '"';
        return ti;
    }
    buildHydraMapping() {
        let hm = "";
        hm += '"hydra:mapping":[';
        hm += '{';
        hm += '"@type":"hydra:IriTemplateMapping"';
        hm += ',"hydra:variable":"x"';
        hm += ',"hydra:property":"tiles:longitudeTile"';
        hm += ',"hydra:required":true';
        hm += '}';
        hm += ',{';
        hm += '"@type":"hydra:IriTemplateMapping"';
        hm += ',"hydra:variable":"y"';
        hm += ',"hydra:property":"tiles:latitudeTile"';
        hm += ',"hydra:required":true';
        hm += '}';
        hm += ',{';
        hm += '"@type":"hydra:IriTemplateMapping"';
        hm += ',"hydra:variable":"t"';
        hm += ',"hydra:property":"ts:observationTimeQuery"';
        hm += ',"hydra:required":true';
        hm += '}';
        hm += ']';
        return hm;
    }
    buildDctermsInfo() {
        let di = "";
        di += '"dcterms:isPartOf":{';
        di += '"@id":"' + JSONLDconfig_1.JSONLDConfig.openobeliskAddress + '"';
        di += ',"@type":"hydra:Collection"';
        di += ',"dcterms:license":"' + JSONLDconfig_1.JSONLDConfig.dctermsLicense + '"';
        di += ',"dcterms:rights":"' + JSONLDconfig_1.JSONLDConfig.dctermsRights + '"';
        di += ',"hydra:search":{';
        di += '   "@type":"hydraIriTemplate"';
        di += '    ,"hydra:template":"https://tiles.openplanner.team/planet/14/{x}/{y}/{t}"';
        di += '    ,"hydra:variableRepresentation":"hydra:BasicRepresentation"';
        di += '    ,' + this.buildHydraMapping();
        di += '}'; //hydrasearch
        di += '}';
        return di;
    }
    buildDocument() {
        this.json += this.buildTilesInfo();
        this.json += ',' + this.buildDctermsInfo();
    }
    getJSONLD() {
        return this.json;
    }
}
exports.JSONLDDocumentBuilder = JSONLDDocumentBuilder;
//# sourceMappingURL=JSONLDDocumentBuilder.js.map