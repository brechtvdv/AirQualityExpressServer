﻿import { JSONLDConfig } from "./JSONLDconfig";
import { Tile } from "../utils/GeoHashUtils";

export class JSONLDDocumentBuilder {
    private json: string="";
    private zoom: number;
    private longitudeTile: number;
    private latitudeTile: number;
    private observationTimeQuery: string;
    constructor(tile:Tile,observationTimeQuery:string) {
        this.zoom = tile.zoom;
        this.latitudeTile = tile.y;
        this.longitudeTile = tile.x;
        this.observationTimeQuery = observationTimeQuery;
    }
    private buildTilesInfo():string {
        let ti: string = "";
        ti += '"@id":"' + JSONLDConfig.openobeliskAddress + this.zoom.toString() + '/' + this.longitudeTile.toString() + '/' + this.latitudeTile.toString() + '/' + this.observationTimeQuery + '"';
        ti += ',"tiles:zoom":' + this.zoom.toString();
        ti += ',"tiles:longitudeTile":' + this.longitudeTile.toString();
        ti += ',"tiles:latitudeTile":' + this.latitudeTile.toString();
        ti += ',"ts:observationTimeQuery":"' + this.observationTimeQuery + '"';
        return ti;
    }
    private buildHydraMapping(): string {
        let hm: string = "";
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
    private buildDctermsInfo(): string {
        let di: string = "";
        di += '"dcterms:isPartOf":{';
        di += '"@id":"' + JSONLDConfig.openobeliskAddress + '"';
        di += ',"@type":"hydra:Collection"';
        di += ',"dcterms:license":"' + JSONLDConfig.dctermsLicense + '"';
        di += ',"dcterms:rights":"' + JSONLDConfig.dctermsRights + '"';
        di += ',"hydra:search":{';
        di += '   "@type":"hydraIriTemplate"';
        di += '    ,"hydra:template":"https://tiles.openplanner.team/planet/14/{x}/{y}/{t}"';
        di += '    ,"hydra:variableRepresentation":"hydra:BasicRepresentation"';
        di += '    ,' + this.buildHydraMapping();
        di += '}';//hydrasearch
        di += '}';
        return di;
    }
    public buildDocument():void {
        this.json += this.buildTilesInfo();
        this.json += ','+this.buildDctermsInfo();
    }
    public getJSONLD(): string {
        return this.json;
    }
}