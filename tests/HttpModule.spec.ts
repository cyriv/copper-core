import {HttpModule, RequestOptions, Response} from "../src/HttpModule";
import { expect } from "chai";
import { describe, it } from "mocha";

describe("Test", () => {
    let mockHttpModule: HttpModule = {
        request: (options: RequestOptions):  Promise<Response> => {
            return new Promise((resolve, reject) => { 
                resolve({ status: 200, headers: {} });
            });
        }
    }

    it("should return success", ()=> {
        return mockHttpModule.request({method: 'GET', url: '' }).then(function(res){
            expect(res.status).to.equal(200);
        });
    });
});