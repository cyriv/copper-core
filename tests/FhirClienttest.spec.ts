import {HttpModule, RequestOptions, Response, HttpContent, RequestHeaders} from "../src/HttpModule";
import {FHIRClient, ResourceName} from "../src/FHIRClient";
import { expect } from "chai";
import { describe, it } from "mocha";

describe("FHIRClient PatientRead Test", () => {
    let headers: RequestHeaders;
    let url: string;
    let mockHttpModule: HttpModule = {
        request: (options: RequestOptions):  Promise<Response> => {
            headers = options.headers||{};
            url = options.url;
            return new Promise((resolve, reject) => { 
                resolve({ status: 200, headers: {}, content: new MockHttpContent('{"data": { "test": true }}') });
            });
        }
    }
    let client = new FHIRClient("test", mockHttpModule);
    client.setAuthToken("TTT");

    it("should return data", ()=> {
        return client.read({ type: 'Patient', id: '1'}).then(function(res){
            expect(res.data.test).to.equal(true);
        });
    });
    it("should use Patient path with provided id", ()=> {
        return expect(url).to.equal("test/Patient/1");
    });
    it("should have application/json Content-Type header", ()=> {
        return expect(headers["Content-Type"]).to.equal("application/json");
    });
    it("should have version 4.0 Accept header", ()=> {
        return expect(headers["Accept"]).to.equal("application/fhir+json; fhirVersion=4.0");
    });
    it("should have Authorization header", ()=> {
        return expect(headers["Authorization"]).to.equal("Bearer TTT");
    });
});

describe("FHIRClient No Authtoken Test", () => {
    let headers: RequestHeaders;
    let url: string;
    let mockHttpModule: HttpModule = {
        request: (options: RequestOptions):  Promise<Response> => {
            headers = options.headers||{};
            url = options.url;
            return new Promise((resolve, reject) => { 
                resolve({ status: 200, headers: {}, content: new MockHttpContent('{"data": { "test": true }}') });
            });
        }
    }
    let client = new FHIRClient("test", mockHttpModule);
    client.read({ type: 'Patient', id: '1'});
    
    it("should have application/json Content-Type header", ()=> {
        return expect(headers["Content-Type"]).to.equal("application/json");
    });
    it("should have version 4.0 Accept header", ()=> {
        return expect(headers["Accept"]).to.equal("application/fhir+json; fhirVersion=4.0");
    });
    it("should not have Authorization header", ()=> {
        return expect(headers["Authorization"]).to.be.undefined;
    });
});

class MockHttpContent implements HttpContent {
    constructor(data: string)
    {
        this.raw = data;
    }
    raw : any;
    toJSON(): any {
        return JSON.parse(this.raw);
    }
    toArrayBuffer(): ArrayBuffer {
        return new ArrayBuffer(0);
    }
}